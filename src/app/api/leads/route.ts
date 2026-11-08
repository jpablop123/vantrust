import { NextRequest, NextResponse, after } from "next/server";
import { getResend } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase";
import { HORARIO_LABELS } from "@/lib/horarios";
import {
  leadEmailHtml,
  confirmationEmailHtml,
  escapeHtml,
} from "@/lib/email-templates";
import { normalizarCelular, celularValido } from "@/lib/validacion";
import { sendCapiLead } from "@/lib/meta-capi";
import { getAsesor } from "@/lib/asesor";
import { enviarTelegram } from "@/lib/telegram";
import { asignarYAvisar } from "@/lib/panel/asignacion";

// Flujo en dos pasos:
//   POST  → paso 1 (nombre + WhatsApp + ramo). Crea el lead "parcial" y avisa
//           al equipo de una vez: un lead a medias ya se puede llamar.
//   PATCH → paso 2 (datos del ramo). Marca el lead "completo" y reenvía el
//           detalle. Se identifica por el id que devolvió el POST.
// Un cliente puede mandar estado "completo" en el POST si ya tiene todo.

// Anti-spam: track recent submissions by phone number
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

// Clean up old entries periodically to prevent memory leak
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > RATE_LIMIT_MS) {
      recentSubmissions.delete(key);
    }
  }
}

const INSURANCE_LABELS: Record<string, string> = {
  vehiculo: "Seguro de Automóvil",
  salud: "Seguro de Salud",
  hogar: "Seguro de Hogar",
  vivienda: "Seguro de Hogar",
  vida: "Seguro de Vida",
  accidentes: "Accidentes Personales",
  exequial: "Seguro Exequial",
  viajes: "Seguro de Viajes",
  mascotas: "Seguro de Mascotas",
  pyme: "Seguro Pyme",
  cumplimiento: "Póliza de Cumplimiento",
  rc: "Responsabilidad Civil",
  transporte: "Transporte de Mercancías",
  todo_riesgo: "Todo Riesgo Daños Materiales",
  otro: "Otro / No está seguro",
};

// Ramos de empresa: los que más facturan, se marcan con 🔥 en Telegram.
const RAMOS_PYME = new Set(["pyme", "cumplimiento", "rc", "transporte", "todo_riesgo"]);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Estado = "parcial" | "completo";

interface Atribucion {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
}

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipoSeguro: string;
  horario: string;
  placa: string;
  mensaje: string;
  marca_carro?: string;
  modelo_carro?: string;
  anno_carro?: string;
  uso_diario?: string;
  fuente?: string;
  // Campos específicos por ramo (salud, hogar, vida, etc.) como pares clave-valor
  detalles?: Record<string, string>;
  atribucion?: Atribucion;
  autorizacion?: boolean;
  event_id?: string;
  fbp?: string;
  fbc?: string;
}

// ── Saneado ───────────────────────────────────────────────────────────────

const str = (v: unknown, max = 300) =>
  typeof v === "string" ? v.trim().slice(0, max) : typeof v === "number" ? String(v) : "";

function sanitize(raw: Record<string, unknown>): LeadData {
  const detalles: Record<string, string> = {};
  if (raw.detalles && typeof raw.detalles === "object") {
    for (const [k, v] of Object.entries(raw.detalles as Record<string, unknown>)) {
      const val = str(v, 1000);
      if (val) detalles[str(k, 120)] = val;
    }
  }
  const a = (raw.atribucion && typeof raw.atribucion === "object"
    ? raw.atribucion
    : {}) as Record<string, unknown>;
  const atribucion: Atribucion = {
    utm_source: str(a.utm_source, 200),
    utm_medium: str(a.utm_medium, 200),
    utm_campaign: str(a.utm_campaign, 200),
    utm_content: str(a.utm_content, 200),
    utm_term: str(a.utm_term, 200),
    gclid: str(a.gclid, 200),
    fbclid: str(a.fbclid, 200),
    landing_page: str(a.landing_page, 200),
    referrer: str(a.referrer, 300),
  };
  return {
    nombre: str(raw.nombre, 120),
    email: str(raw.email, 200),
    telefono: normalizarCelular(str(raw.telefono, 30)),
    ciudad: str(raw.ciudad, 80),
    tipoSeguro: str(raw.tipoSeguro, 40),
    horario: str(raw.horario, 40),
    placa: str(raw.placa, 10).toUpperCase().replace(/[^A-Z0-9]/g, ""),
    mensaje: str(raw.mensaje, 1000),
    marca_carro: str(raw.marca_carro, 60),
    modelo_carro: str(raw.modelo_carro, 60),
    anno_carro: str(raw.anno_carro, 4),
    uso_diario: str(raw.uso_diario, 60),
    fuente: str(raw.fuente, 80),
    detalles,
    atribucion,
    autorizacion: raw.autorizacion === true,
    event_id: str(raw.event_id, 100),
    fbp: str(raw.fbp, 200),
    fbc: str(raw.fbc, 300),
  };
}

// fetch() solo rechaza ante fallos de red, no ante un 4xx/5xx. Sin esto un
// token vencido de Telegram/Sheets haría que el lead se perdiera en silencio.
async function throwIfNotOk(res: Response, servicio: string) {
  if (res.ok) return;
  const detalle = await res.text().catch(() => "");
  throw new Error(`${servicio} respondió ${res.status}: ${detalle.slice(0, 300)}`);
}

// ── Base de datos ─────────────────────────────────────────────────────────

/** Columnas del lead tal como van a la tabla public.leads. */
function toRow(data: LeadData, estado: Estado) {
  // Los datos del carro van dentro de detalles para no abrir una columna por
  // cada campo de cada ramo.
  const detalles = { ...data.detalles };
  if (data.marca_carro) detalles["Marca"] = data.marca_carro;
  if (data.modelo_carro) detalles["Modelo"] = data.modelo_carro;
  if (data.anno_carro) detalles["Año"] = data.anno_carro;
  if (data.uso_diario) detalles["Uso diario"] = data.uso_diario;
  const at = data.atribucion || {};
  return {
    estado,
    nombre: data.nombre,
    telefono: data.telefono,
    email: data.email || null,
    ciudad: data.ciudad || null,
    tipo_seguro: data.tipoSeguro,
    placa: data.placa || null,
    horario: data.horario || null,
    mensaje: data.mensaje || null,
    detalles,
    fuente: data.fuente || null,
    utm_source: at.utm_source || null,
    utm_medium: at.utm_medium || null,
    utm_campaign: at.utm_campaign || null,
    utm_content: at.utm_content || null,
    utm_term: at.utm_term || null,
    gclid: at.gclid || null,
    fbclid: at.fbclid || null,
    landing_page: at.landing_page || null,
    referrer: at.referrer || null,
  };
}

async function insertLead(id: string, data: LeadData, estado: Estado) {
  const db = getSupabase();
  if (!db) return;
  const { error } = await db.from("leads").insert({
    id,
    ...toRow(data, estado),
    autorizacion_datos: data.autorizacion === true,
    autorizacion_at: data.autorizacion ? new Date().toISOString() : null,
    event_id: data.event_id || null,
  });
  if (error) throw new Error(`Supabase insert: ${error.message}`);
}

/**
 * Pasa el lead a "completo". Devuelve false si no existe o ya estaba completo,
 * para que el PATCH no sirva para llenar Telegram de mensajes con ids al azar.
 * Sin BD no hay cómo verificarlo y se acepta (devuelve true).
 */
async function completeLead(id: string, data: LeadData): Promise<boolean> {
  const db = getSupabase();
  if (!db) return true;
  const row = toRow(data, "completo");
  // La atribución y el consentimiento quedan como se guardaron en el paso 1:
  // solo se actualiza lo que el paso 2 puede cambiar.
  const cambios = {
    estado: row.estado,
    nombre: row.nombre,
    email: row.email,
    ciudad: row.ciudad,
    tipo_seguro: row.tipo_seguro,
    placa: row.placa,
    horario: row.horario,
    mensaje: row.mensaje,
    detalles: row.detalles,
  };
  const { data: filas, error } = await db
    .from("leads")
    .update(cambios)
    .eq("id", id)
    .eq("estado", "parcial")
    .select("id");
  if (error) throw new Error(`Supabase update: ${error.message}`);
  return (filas?.length ?? 0) > 0;
}

// ── Notificaciones ────────────────────────────────────────────────────────

async function sendEmail(data: LeadData, estado: Estado) {
  const resend = getResend();
  // Admite varios destinatarios separados por coma, para que más de un asesor
  // reciba el lead sin tener que tocar el código.
  const destinatarios = (
    process.env.COMMERCIAL_EMAIL || "coordinador@vantrust.com.co"
  )
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!resend) {
    console.warn("Email not configured (missing RESEND_API_KEY), skipping");
    return;
  }

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel =
    HORARIO_LABELS[data.horario] || data.horario || "No especificado";
  const fecha = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const etiqueta = estado === "parcial" ? "Nuevo lead (parcial)" : "Lead completo";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: destinatarios,
    replyTo: data.email || undefined,
    subject: `${etiqueta} - ${tipoLabel} | ${data.nombre.replace(/[\r\n]+/g, " ").slice(0, 80)}`,
    html: leadEmailHtml(data, tipoLabel, horarioLabel, fecha),
  });
}

async function sendConfirmationToCustomer(data: LeadData) {
  const resend = getResend();
  if (!resend || !data.email) return;

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || "seguro";

  const asesor = getAsesor();
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: data.email,
    subject: asesor
      ? `${asesor.nombre.split(" ")[0]} de VanTrust recibió tu solicitud`
      : "¡Gracias por confiar en VanTrust! Recibimos tu solicitud",
    html: confirmationEmailHtml(data.nombre, tipoLabel, asesor),
  });
}

async function saveToGoogleSheets(data: LeadData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn("Google Sheets not configured, skipping");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Leads!A:O:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "";
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
  const detallesStr = data.detalles
    ? Object.entries(data.detalles)
        .filter(([, v]) => v && String(v).trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
    : "";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      values: [[fecha, data.nombre, data.email, data.telefono, data.ciudad, tipoLabel, data.placa, horarioLabel, data.mensaje, data.marca_carro || "", data.modelo_carro || "", data.anno_carro || "", data.uso_diario || "", data.fuente || "", detallesStr]],
    }),
  });
  await throwIfNotOk(res, "Google Sheets");
}

async function sendWhatsAppNotification(data: LeadData) {
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const token = process.env.WHATSAPP_TOKEN;
  const commercialPhone = process.env.WHATSAPP_COMMERCIAL_PHONE;

  if (!phoneId || !token || !commercialPhone) {
    console.warn("WhatsApp not configured, skipping");
    return;
  }

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || "No especificado";
  const vehiculo = [data.marca_carro, data.modelo_carro, data.anno_carro].filter(Boolean).join(" ");
  const message = `*Nuevo Lead VanTrust*\n\n*${data.nombre}*\nEmail: ${data.email || "N/A"}\nTel: ${data.telefono}\nCiudad: ${data.ciudad || "N/A"}\nSeguro: ${tipoLabel}${data.placa ? `\nPlaca: ${data.placa}` : ""}${vehiculo ? `\nVehículo: ${vehiculo}` : ""}${data.uso_diario ? `\nUso: ${data.uso_diario}` : ""}\nHorario: ${horarioLabel}\n${data.mensaje ? `Mensaje: ${data.mensaje}` : ""}${data.fuente ? `\nFuente: ${data.fuente}` : ""}`;

  const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: commercialPhone,
      type: "text",
      text: { body: message },
    }),
  });
  await throwIfNotOk(res, "WhatsApp");
}

/** Líneas de campaña para Telegram; vacío si el lead llegó sin UTM. */
function atribucionLines(at: Atribucion = {}): string[] {
  const canal = [at.utm_source, at.utm_medium].filter(Boolean).join(" / ");
  const lines = [
    canal ? `📣 Canal: ${escapeHtml(canal)}` : "",
    at.utm_campaign ? `🎯 Campaña: ${escapeHtml(at.utm_campaign)}` : "",
    at.utm_content ? `🧩 Anuncio: ${escapeHtml(at.utm_content)}` : "",
    at.utm_term ? `🔎 Término: ${escapeHtml(at.utm_term)}` : "",
    at.gclid ? "🟦 Clic de Google Ads (gclid)" : "",
    at.fbclid ? "🟪 Clic de Meta Ads (fbclid)" : "",
    at.landing_page ? `🛬 Entró por: ${escapeHtml(at.landing_page)}` : "",
  ].filter(Boolean);
  return lines.length ? lines : ["📣 Sin campaña (orgánico o directo)"];
}

async function sendTelegramNotification(data: LeadData, estado: Estado) {
  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "No especificado";
  const vehiculo = [data.marca_carro, data.modelo_carro, data.anno_carro]
    .filter(Boolean)
    .join(" ");

  const detalleLines = data.detalles
    ? Object.entries(data.detalles)
        .filter(([, v]) => v && String(v).trim())
        .map(([k, v]) => `• ${escapeHtml(k)}: ${escapeHtml(String(v))}`)
        .join("\n")
    : "";

  const prioridad = RAMOS_PYME.has(data.tipoSeguro) ? "🔥 " : "";
  const header =
    estado === "parcial"
      ? `🟡 ${prioridad}<b>Lead parcial</b> · solo dejó contacto, llámalo ya`
      : `🟢 ${prioridad}<b>Lead completo</b>`;

  const lines = [
    // El filter() va solo sobre las líneas opcionales: aplicarlo al arreglo
    // completo se comía los separadores en blanco, que también son falsy.
    header,
    "",
    ...[
      `👤 <b>${escapeHtml(data.nombre)}</b>`,
      `📱 ${escapeHtml(data.telefono)} · <a href="https://wa.me/57${escapeHtml(data.telefono)}">WhatsApp</a>`,
      data.email ? `📧 ${escapeHtml(data.email)}` : "",
      data.ciudad ? `📍 ${escapeHtml(data.ciudad)}` : "",
      `🛡️ ${escapeHtml(tipoLabel)}`,
      data.placa ? `🚗 Placa: ${escapeHtml(data.placa)}` : "",
      vehiculo ? `🚙 Vehículo: ${escapeHtml(vehiculo)}` : "",
      data.uso_diario ? `📊 Uso: ${escapeHtml(data.uso_diario)}` : "",
    ].filter(Boolean),
    ...(detalleLines ? ["", detalleLines] : []),
    "",
    ...[
      data.horario ? `🕒 Horario: ${escapeHtml(horarioLabel)}` : "",
      data.mensaje ? `💬 ${escapeHtml(data.mensaje)}` : "",
      data.fuente ? `🔗 Formulario: ${escapeHtml(data.fuente)}` : "",
    ].filter(Boolean),
    "",
    ...atribucionLines(data.atribucion),
  ];

  await enviarTelegram(lines.join("\n"));
}

/** Corre las tareas, registra las que fallen y nunca lanza. */
async function settle(tareas: [string, Promise<unknown>][]) {
  const results = await Promise.allSettled(tareas.map(([, p]) => p));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`${tareas[i][0]} failed:`, r.reason);
  });
}

// ── Handlers ──────────────────────────────────────────────────────────────

async function readBody(req: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? body : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await readBody(req);
    if (!raw) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
    const data = sanitize(raw);
    const estado: Estado = raw.estado === "completo" ? "completo" : "parcial";

    // El correo NO es obligatorio: el contacto principal es WhatsApp.
    if (!data.nombre || !data.telefono || !data.tipoSeguro) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }
    if (!celularValido(data.telefono)) {
      return NextResponse.json(
        { error: "Ingresa un celular colombiano válido (ej: 3001234567)" },
        { status: 400 }
      );
    }
    // Ley 1581: sin autorización expresa no se puede tratar el dato.
    if (!data.autorizacion) {
      return NextResponse.json(
        { error: "Debes autorizar el tratamiento de tus datos para continuar" },
        { status: 400 }
      );
    }

    // Anti-spam check
    cleanupOldEntries();
    const lastSubmission = recentSubmissions.get(data.telefono);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Ya tenemos tu solicitud, te contactamos pronto" },
        { status: 429 }
      );
    }
    recentSubmissions.set(data.telefono, Date.now());

    // El id se genera aquí y no en la BD: así el paso 2 funciona aunque
    // Supabase no esté configurado (solo se pierde la actualización en BD).
    const id = crypto.randomUUID();

    // Guardar va antes de responder: es lo único que no puede perderse si la
    // función se corta. Si falla, igual se avisa por Telegram y correo.
    await settle([["Supabase", insertLead(id, data, estado)]]);

    // Datos de la petición para Conversions API (no se guardan en la BD).
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    const url = req.headers.get("referer") || undefined;

    // Avisos después de responder: la persona ve "listo" sin esperar a
    // Telegram, Resend, Google ni Meta.
    after(() =>
      settle([
        [
          "Meta CAPI",
          sendCapiLead({
            eventId: data.event_id || "",
            telefono: data.telefono,
            email: data.email,
            nombre: data.nombre,
            ciudad: data.ciudad,
            tipoSeguro: data.tipoSeguro,
            fbp: data.fbp,
            fbc: data.fbc,
            fbclid: data.atribucion?.fbclid,
            ip,
            userAgent,
            url,
          }),
        ],
        ["Email", sendEmail(data, estado)],
        ["Google Sheets", saveToGoogleSheets(data)],
        ["WhatsApp", sendWhatsAppNotification(data)],
        ["Telegram", sendTelegramNotification(data, estado)],
        ["Confirmación cliente", sendConfirmationToCustomer(data)],
        // Panel: reparte el lead por turnos y avisa al asesor.
        ["Asignación", asignarYAvisar(id)],
      ])
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const raw = await readBody(req);
    if (!raw) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
    const id = str(raw.id, 40);
    if (!UUID_RE.test(id)) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 400 });
    }
    const data = sanitize(raw);
    if (!data.nombre || !data.telefono || !data.tipoSeguro) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    let existe = true;
    try {
      existe = await completeLead(id, data);
    } catch (e) {
      // Falla de BD: se avisa igual para no perder el detalle del lead.
      console.error("Supabase failed:", e);
    }
    if (!existe) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
    }

    after(() =>
      settle([
        ["Email", sendEmail(data, "completo")],
        ["Telegram", sendTelegramNotification(data, "completo")],
        // Si el correo llegó recién en el paso 2, la confirmación sale ahora.
        ...(raw.emailNuevo === true
          ? [["Confirmación cliente", sendConfirmationToCustomer(data)] as [string, Promise<unknown>]]
          : []),
      ])
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Lead API PATCH error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
