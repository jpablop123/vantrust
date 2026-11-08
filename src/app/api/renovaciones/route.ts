import { NextRequest, NextResponse, after } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { enviarTelegram } from "@/lib/telegram";
import { sendCapiLead } from "@/lib/meta-capi";
import { escapeHtml } from "@/lib/email-templates";
import { celularValido, normalizarCelular, normalizarPlaca } from "@/lib/validacion";
import {
  DIAS_AVISO,
  MAX_DIAS_VENCIMIENTO,
  RAMO_RENOVACION_LABEL,
  diasHasta,
} from "@/lib/renovaciones";

// Registro en la base de renovaciones (/renovacion). Si la póliza ya vence en
// menos de 30 días se avisa de una vez como urgente y no espera al cron.

const recientes = new Map<string, number>();
const RATE_LIMIT_MS = 10 * 60 * 1000;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const ATRIB = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "fbclid", "landing_page", "referrer",
] as const;

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
    if (!raw || typeof raw !== "object") throw new Error();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const nombre = str(raw.nombre, 120);
  const telefono = normalizarCelular(str(raw.telefono, 30));
  const ramo = str(raw.ramo, 20);
  const aseguradora = str(raw.aseguradora, 80);
  const placa = ramo === "vehiculo" ? normalizarPlaca(str(raw.placa, 10)) : "";
  const fecha = str(raw.fecha_vencimiento, 10);

  if (!nombre || !RAMO_RENOVACION_LABEL[ramo]) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
  }
  if (!celularValido(telefono)) {
    return NextResponse.json(
      { error: "Ingresa un celular colombiano válido (ej: 3001234567)" },
      { status: 400 }
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha))) {
    return NextResponse.json({ error: "Fecha de vencimiento inválida" }, { status: 400 });
  }
  const dias = diasHasta(fecha);
  if (dias < 0 || dias > MAX_DIAS_VENCIMIENTO) {
    return NextResponse.json(
      { error: "La fecha de vencimiento debe estar dentro de los próximos 13 meses" },
      { status: 400 }
    );
  }
  if (raw.autorizacion !== true) {
    return NextResponse.json(
      { error: "Debes autorizar el tratamiento de tus datos para continuar" },
      { status: 400 }
    );
  }

  const ahora = Date.now();
  for (const [k, t] of recientes) if (ahora - t > RATE_LIMIT_MS) recientes.delete(k);
  if (recientes.has(telefono)) {
    return NextResponse.json(
      { error: "Ya registramos tu renovación, te avisamos antes del vencimiento" },
      { status: 429 }
    );
  }
  recientes.set(telefono, ahora);

  const a = (raw.atribucion && typeof raw.atribucion === "object"
    ? raw.atribucion
    : {}) as Record<string, unknown>;
  const atribucion = Object.fromEntries(ATRIB.map((k) => [k, str(a[k], 300) || null]));
  const urgente = dias <= DIAS_AVISO;
  const eventId = str(raw.event_id, 100);

  const db = getSupabase();
  if (db) {
    const { error } = await db.from("renovaciones").insert({
      nombre,
      telefono,
      ramo,
      aseguradora_actual: aseguradora || null,
      placa: placa || null,
      fecha_vencimiento: fecha,
      // Si ya está dentro de la ventana se avisa ahora y el cron no la repite.
      avisado_at: urgente ? new Date().toISOString() : null,
      ...atribucion,
      autorizacion_datos: true,
      autorizacion_at: new Date().toISOString(),
      event_id: eventId || null,
    });
    if (error) console.error("Supabase renovaciones failed:", error.message);
  }

  const fechaLabel = new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-CO", {
    dateStyle: "long",
    timeZone: "UTC",
  });
  const canal = [atribucion.utm_source, atribucion.utm_medium].filter(Boolean).join(" / ");
  const lineas = [
    urgente
      ? `⏰ <b>Renovación urgente</b> · vence en ${dias} día${dias === 1 ? "" : "s"}, contactar ya`
      : "🔁 <b>Nueva renovación registrada</b> · te aviso 30 días antes",
    "",
    `👤 <b>${escapeHtml(nombre)}</b>`,
    `📱 ${telefono} · <a href="https://wa.me/57${telefono}">WhatsApp</a>`,
    `🛡️ ${escapeHtml(RAMO_RENOVACION_LABEL[ramo])}${aseguradora ? ` con ${escapeHtml(aseguradora)}` : ""}`,
    placa ? `🚗 Placa: ${placa}` : "",
    `📅 Vence: ${fechaLabel}`,
    "",
    canal ? `📣 Canal: ${escapeHtml(canal)}` : "📣 Sin campaña (orgánico o directo)",
    atribucion.utm_campaign ? `🎯 Campaña: ${escapeHtml(String(atribucion.utm_campaign))}` : "",
  ].filter((l, i, arr) => l || (i > 0 && arr[i - 1]));

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  const url = req.headers.get("referer") || undefined;

  after(async () => {
    const r = await Promise.allSettled([
      enviarTelegram(lineas.join("\n")),
      sendCapiLead({
        eventId,
        telefono,
        nombre,
        tipoSeguro: `renovacion_${ramo}`,
        fbp: str(raw.fbp, 200) || undefined,
        fbc: str(raw.fbc, 300) || undefined,
        fbclid: (atribucion.fbclid as string) || undefined,
        ip,
        userAgent,
        url,
      }),
    ]);
    r.forEach((x, i) => {
      if (x.status === "rejected")
        console.error(`${["Telegram", "Meta CAPI"][i]} failed:`, x.reason);
    });
  });

  return NextResponse.json({ success: true, urgente });
}
