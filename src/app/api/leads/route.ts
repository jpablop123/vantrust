import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { HORARIO_LABELS } from "@/lib/horarios";
import {
  leadEmailHtml,
  confirmationEmailHtml,
  escapeHtml,
} from "@/lib/email-templates";

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
  otro: "Otro / No está seguro",
};



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
}

// fetch() solo rechaza ante fallos de red, no ante un 4xx/5xx. Sin esto un
// token vencido de Telegram/Sheets haría que el lead se perdiera en silencio.
async function throwIfNotOk(res: Response, servicio: string) {
  if (res.ok) return;
  const detalle = await res.text().catch(() => "");
  throw new Error(`${servicio} respondió ${res.status}: ${detalle.slice(0, 300)}`);
}

async function sendEmail(data: LeadData) {
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

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: destinatarios,
    replyTo: data.email || undefined,
    subject: `Nuevo Lead - ${tipoLabel} | ${data.nombre.replace(/[\r\n]+/g, " ").slice(0, 80)}`,
    html: leadEmailHtml(data, tipoLabel, horarioLabel, fecha),
  });
}

async function sendConfirmationToCustomer(data: LeadData) {
  const resend = getResend();
  if (!resend || !data.email) return;

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || "seguro";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: data.email,
    subject: "¡Gracias por confiar en VanTrust! Recibimos tu solicitud",
    html: confirmationEmailHtml(data.nombre, tipoLabel),
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

async function sendTelegramNotification(data: LeadData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram not configured, skipping");
    return;
  }

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

  const lines = [
    // El filter() va solo sobre las líneas opcionales: aplicarlo al arreglo
    // completo se comía los separadores en blanco, que también son falsy.
    "🔔 <b>Nuevo Lead VanTrust</b>",
    "",
    ...[
      `👤 <b>${escapeHtml(data.nombre)}</b>`,
      `📧 ${escapeHtml(data.email || "N/A")}`,
      `📱 ${escapeHtml(data.telefono)}`,
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
      data.fuente ? `🔗 Fuente: ${escapeHtml(data.fuente)}` : "",
    ].filter(Boolean),
  ];

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  await throwIfNotOk(res, "Telegram");
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadData = await req.json();

    // El correo NO es obligatorio: formularios como "Asesoría gratuita" lo
    // ofrecen como opcional porque el contacto puede ser por WhatsApp o llamada.
    if (!data.nombre || !data.telefono || !data.tipoSeguro) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Anti-spam check
    cleanupOldEntries();
    const phone = data.telefono.replace(/\D/g, "");
    const lastSubmission = recentSubmissions.get(phone);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Ya tenemos tu solicitud, te contactamos pronto" },
        { status: 429 }
      );
    }
    recentSubmissions.set(phone, Date.now());

    const results = await Promise.allSettled([
      sendEmail(data),
      saveToGoogleSheets(data),
      sendWhatsAppNotification(data),
      sendTelegramNotification(data),
      sendConfirmationToCustomer(data),
    ]);

    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const names = [
          "Email",
          "Google Sheets",
          "WhatsApp",
          "Telegram",
          "Confirmación cliente",
        ];
        console.error(`${names[i]} failed:`, result.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
