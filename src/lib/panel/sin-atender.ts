import "server-only";
import { getSupabase } from "@/lib/supabase";
import { enviarTelegram } from "@/lib/telegram";
import { avisarAsesor } from "@/lib/panel/asignacion";
import { etiquetaRamo } from "@/lib/panel/etiquetas";

// Leads sin atender: aviso al admin a los 5 minutos y reasignación a la hora.
// "Atender" = el asesor abrió WhatsApp, llamó o registró un contacto después
// de recibir el lead. El reloj solo corre en horario laboral.

export const MIN_ALERTA = 5;
export const MIN_REASIGNAR = 60;
export const MAX_REASIGNACIONES = 2;

/** Horario laboral en Colombia: lunes a viernes, 8:00 a 19:00. */
export const HORARIO = { dias: [1, 2, 3, 4, 5], desde: 8, hasta: 19 };

const BOGOTA = -5 * 3600e3; // UTC-5, sin horario de verano

/** Minutos de horario laboral entre dos instantes. */
export function minutosHabiles(desde: Date, hasta: Date): number {
  if (hasta <= desde) return 0;
  let total = 0;
  // Se recorre día por día en hora de Bogotá.
  const inicio = new Date(desde.getTime() + BOGOTA);
  const fin = new Date(hasta.getTime() + BOGOTA);
  const dia = new Date(Date.UTC(inicio.getUTCFullYear(), inicio.getUTCMonth(), inicio.getUTCDate()));
  for (let i = 0; dia <= fin && i < 60; i++, dia.setUTCDate(dia.getUTCDate() + 1)) {
    if (!HORARIO.dias.includes(dia.getUTCDay())) continue;
    const abre = dia.getTime() + HORARIO.desde * 3600e3;
    const cierra = dia.getTime() + HORARIO.hasta * 3600e3;
    const a = Math.max(abre, inicio.getTime());
    const b = Math.min(cierra, fin.getTime());
    if (b > a) total += (b - a) / 60e3;
  }
  return Math.floor(total);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Db = NonNullable<ReturnType<typeof getSupabase>>;

/** Telegram a los admin con chat; si ninguno tiene, al grupo del equipo. */
async function avisarAdmins(db: Db, html: string) {
  const { data } = await db
    .from("asesores")
    .select("telegram_chat_id")
    .eq("rol", "admin")
    .eq("acceso", true)
    .not("telegram_chat_id", "is", null);
  const chats = (data ?? []).map((a) => a.telegram_chat_id as string);
  if (!chats.length) return enviarTelegram(html); // grupo (TELEGRAM_CHAT_ID)
  for (const c of chats) await enviarTelegram(html, c);
}

export interface ResultadoRevision {
  revisados: number;
  alertas: string[];
  reasignados: string[];
  fueraDeHorario: boolean;
}

export async function revisarSinAtender(ahora = new Date()): Promise<ResultadoRevision> {
  const db = getSupabase();
  const r: ResultadoRevision = { revisados: 0, alertas: [], reasignados: [], fueraDeHorario: false };
  if (!db) return r;

  const hace7d = new Date(ahora.getTime() - 7 * 864e5).toISOString();
  const { data: leads, error } = await db
    .from("leads")
    .select("id, nombre, tipo_seguro, created_at, asignado_a, asignado_at, alerta_admin_at, reasignaciones_auto, asesor:asesores!leads_asignado_a_fkey(nombre)")
    .eq("etapa", "nuevo")
    .is("primer_contacto_at", null)
    .gte("created_at", hace7d)
    .limit(500);
  if (error) throw new Error(`sin atender: ${error.message}`);
  r.revisados = leads?.length ?? 0;
  if (!leads?.length) return r;

  // ¿Quién ya lo tomó? WhatsApp o llamada del asesor actual después de recibirlo.
  const { data: contactos } = await db
    .from("lead_eventos")
    .select("lead_id, asesor_id, created_at")
    .in("lead_id", leads.map((l) => l.id))
    .in("tipo", ["whatsapp", "llamada", "contactado", "resultado"]);
  const tomado = (l: (typeof leads)[number]) =>
    (contactos ?? []).some(
      (c) => c.lead_id === l.id && c.asesor_id === l.asignado_a && c.created_at >= (l.asignado_at ?? l.created_at)
    );

  const base = process.env.SITE_URL || "";
  for (const l of leads) {
    if (tomado(l)) continue;
    const desde = new Date(l.asignado_at ?? l.created_at);
    const min = minutosHabiles(desde, ahora);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const asesor = (l as any).asesor?.nombre as string | undefined;
    const quien = `<b>${esc(l.nombre)}</b> · ${esc(etiquetaRamo(l.tipo_seguro))}`;

    if (l.asignado_a && min >= MIN_REASIGNAR && l.reasignaciones_auto < MAX_REASIGNACIONES) {
      const { data: nuevo } = await db.rpc("reasignar_sin_atender", { p_lead: l.id });
      if (nuevo) {
        r.reasignados.push(l.id);
        const { data: n } = await db.from("asesores").select("nombre").eq("id", nuevo).maybeSingle();
        await avisarAsesor(l.id, nuevo as string, true).catch(() => {});
        await avisarAdmins(
          db,
          `🔁 <b>Lead reasignado por no atenderlo en 1 h</b>\n\n${quien}\nDe ${esc(asesor ?? "?")} a <b>${esc(n?.nombre ?? "?")}</b>.${base ? `\n${base}/panel` : ""}`
        ).catch(() => {});
      }
      continue;
    }

    if (min >= MIN_ALERTA && !l.alerta_admin_at) {
      const ultimo = l.reasignaciones_auto >= MAX_REASIGNACIONES;
      const html = l.asignado_a
        ? `⏰ <b>Lead sin atender hace ${min} min</b>\n\n${quien}\nAsignado a <b>${esc(asesor ?? "?")}</b>, que todavía no le escribe ni lo llama.\n${
            ultimo
              ? "Ya se reasignó dos veces: queda en tus manos."
              : "Si en 1 hora sigue sin atenderlo, se reasigna solo."
          }${base ? `\n${base}/panel` : ""}`
        : `⏰ <b>Lead sin asignar hace ${min} min</b>\n\n${quien}\nNo hay asesores activos para recibirlo. Asígnalo desde el panel.${base ? `\n${base}/panel` : ""}`;
      try {
        await avisarAdmins(db, html);
        await db.from("leads").update({ alerta_admin_at: ahora.toISOString() }).eq("id", l.id);
        r.alertas.push(l.id);
      } catch {
        // Telegram caído: se reintenta en la siguiente pasada.
      }
    }
  }
  r.fueraDeHorario = minutosHabiles(new Date(ahora.getTime() - 60e3), ahora) === 0;
  return r;
}
