import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { enviarTelegram, telegramConfigurado } from "@/lib/telegram";
import { escapeHtml } from "@/lib/email-templates";
import {
  DIAS_AVISO,
  RAMO_RENOVACION_LABEL,
  diasHasta,
  hoyBogota,
} from "@/lib/renovaciones";

// Cron diario (vercel.json, 8:00 a. m. Colombia). Manda a Telegram las
// renovaciones que vencen en los próximos 30 días y que aún no se avisaron, y
// las marca para no repetirlas. Vercel firma la llamada con CRON_SECRET.

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const db = getSupabase();
  if (!db || !telegramConfigurado()) {
    return NextResponse.json(
      { error: "Faltan Supabase o Telegram" },
      { status: 503 }
    );
  }

  const hoy = hoyBogota();
  const limite = new Date(Date.parse(`${hoy}T00:00:00Z`) + DIAS_AVISO * 86_400_000)
    .toISOString()
    .slice(0, 10);

  const { data: filas, error } = await db
    .from("renovaciones")
    .select("id, nombre, telefono, ramo, aseguradora_actual, placa, fecha_vencimiento, utm_campaign")
    .is("avisado_at", null)
    .gte("fecha_vencimiento", hoy)
    .lte("fecha_vencimiento", limite)
    .order("fecha_vencimiento", { ascending: true })
    .limit(200);

  if (error) {
    console.error("Cron renovaciones:", error.message);
    return NextResponse.json({ error: "Error de base de datos" }, { status: 500 });
  }
  if (!filas?.length) return NextResponse.json({ avisadas: 0 });

  const bloques = filas.map((r) => {
    const dias = diasHasta(r.fecha_vencimiento);
    return [
      `${dias <= 7 ? "🔴" : "🟠"} <b>${escapeHtml(r.nombre)}</b> · vence en ${dias} día${dias === 1 ? "" : "s"} (${r.fecha_vencimiento})`,
      `📱 ${r.telefono} · <a href="https://wa.me/57${r.telefono}">WhatsApp</a>`,
      `🛡️ ${escapeHtml(RAMO_RENOVACION_LABEL[r.ramo] || r.ramo)}${
        r.aseguradora_actual ? ` con ${escapeHtml(r.aseguradora_actual)}` : ""
      }${r.placa ? ` · 🚗 ${r.placa}` : ""}`,
      ...(r.utm_campaign ? [`🎯 ${escapeHtml(r.utm_campaign)}`] : []),
    ].join("\n");
  });

  const mensaje = [
    `📅 <b>Renovaciones por contactar</b> · ${filas.length} vence${filas.length === 1 ? "" : "n"} en los próximos ${DIAS_AVISO} días`,
    "",
    bloques.join("\n\n"),
  ].join("\n");

  try {
    await enviarTelegram(mensaje);
  } catch (e) {
    // Sin marcar: mañana se vuelven a intentar.
    console.error("Cron renovaciones Telegram:", e);
    return NextResponse.json({ error: "Telegram falló" }, { status: 502 });
  }

  const { error: errUpd } = await db
    .from("renovaciones")
    .update({ avisado_at: new Date().toISOString() })
    .in("id", filas.map((r) => r.id));
  if (errUpd) console.error("Cron renovaciones marcar:", errUpd.message);

  return NextResponse.json({ avisadas: filas.length });
}
