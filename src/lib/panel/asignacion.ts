import "server-only";
import { getSupabase } from "@/lib/supabase";
import { enviarTelegram } from "@/lib/telegram";
import { etiquetaRamo } from "@/lib/panel/etiquetas";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Asigna el lead por turnos (función asignar_lead en la BD) y avisa por
 * Telegram al asesor que lo recibe, si tiene su chat configurado. Sin BD no
 * hace nada: el lead igual llegó al grupo por Telegram y correo.
 */
export async function asignarYAvisar(leadId: string) {
  const db = getSupabase();
  if (!db) return;
  const { data: asesorId, error } = await db.rpc("asignar_lead", { p_lead: leadId });
  if (error) throw new Error(`asignar_lead: ${error.message}`);
  if (!asesorId) return; // no hay asesores activos: queda sin asignar
  await avisarAsesor(leadId, asesorId as string);
}

/** Telegram privado al asesor: "te asignaron un lead". Si no tiene chat, nada. */
export async function avisarAsesor(leadId: string, asesorId: string, reasignado = false) {
  const db = getSupabase();
  if (!db) return;
  const [{ data: asesor }, { data: lead }] = await Promise.all([
    db.from("asesores").select("nombre, telegram_chat_id").eq("id", asesorId).maybeSingle(),
    db.from("leads").select("nombre, tipo_seguro, telefono, fuente").eq("id", leadId).maybeSingle(),
  ]);
  if (!asesor?.telegram_chat_id || !lead) return;

  const base = process.env.SITE_URL || "";
  await enviarTelegram(
    [
      reasignado ? `🔁 <b>Te pasaron un lead</b>` : `🔔 <b>Te asignaron un lead</b>`,
      ``,
      `<b>${esc(lead.nombre)}</b> · ${esc(etiquetaRamo(lead.tipo_seguro))}`,
      `📱 ${esc(lead.telefono)}`,
      lead.fuente ? `🔗 ${esc(lead.fuente)}` : "",
      base ? `\nÁbrelo en el panel: ${base}/panel` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    asesor.telegram_chat_id
  );
}
