import "server-only";
import { getSupabase } from "@/lib/supabase";
import type { Miembro } from "@/lib/panel/sesion";
import type { Etapa } from "@/lib/panel/etiquetas";

export interface LeadCola {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  email: string | null;
  ciudad: string | null;
  tipo_seguro: string;
  placa: string | null;
  mensaje: string | null;
  detalles: Record<string, string>;
  fuente: string | null;
  utm_campaign: string | null;
  estado: "parcial" | "completo";
  etapa: Etapa;
  asignado_a: string | null;
  asesor_nombre: string | null;
  primer_contacto_at: string | null;
  ultimo_contacto_at: string | null;
  resultado_contacto: string | null;
  proximo_seguimiento: string | null;
  nota_seguimiento: string | null;
  prima_valor: number | null;
  aseguradora_cierre: string | null;
  cerrado_at: string | null;
  motivo_perdida: string | null;
}

export interface EventoLead {
  id: number;
  lead_id: string;
  created_at: string;
  tipo: string;
  nota: string | null;
  detalle: Record<string, unknown>;
  asesor_nombre: string | null;
}

const COLUMNAS = `id, created_at, nombre, telefono, email, ciudad, tipo_seguro, placa, mensaje,
  detalles, fuente, utm_campaign, estado, etapa, asignado_a, primer_contacto_at,
  ultimo_contacto_at, resultado_contacto, proximo_seguimiento, nota_seguimiento,
  prima_valor, aseguradora_cierre, cerrado_at, motivo_perdida,
  asesor:asesores!leads_asignado_a_fkey(nombre)`;

type FilaLead = Omit<LeadCola, "asesor_nombre"> & { asesor: { nombre: string } | null };

const aLead = ({ asesor, ...f }: FilaLead): LeadCola => ({
  ...f,
  detalles: (f.detalles ?? {}) as Record<string, string>,
  prima_valor: f.prima_valor === null ? null : Number(f.prima_valor),
  asesor_nombre: asesor?.nombre ?? null,
});

/**
 * Leads de la cola. Un asesor solo recibe los suyos (el filtro va en la
 * consulta, no en el navegador); el admin ve los de todos. Incluye los
 * cerrados de los últimos 14 días para el historial reciente.
 */
export async function leadsDeCola(miembro: Miembro): Promise<LeadCola[]> {
  const db = getSupabase();
  if (!db) return [];
  const hace14 = new Date(Date.now() - 14 * 864e5).toISOString();
  let q = db
    .from("leads")
    .select(COLUMNAS)
    .or(`etapa.in.(nuevo,contactado,cotizado),updated_at.gte.${hace14}`)
    .order("created_at", { ascending: false })
    .limit(500);
  if (miembro.rol !== "admin") q = q.eq("asignado_a", miembro.id);
  const { data, error } = await q;
  if (error) throw new Error(`leadsDeCola: ${error.message}`);
  return (data as unknown as FilaLead[]).map(aLead);
}

/** Historial de varios leads de una vez (para no consultar uno por uno). */
export async function eventosDe(leadIds: string[]): Promise<Record<string, EventoLead[]>> {
  const db = getSupabase();
  if (!db || leadIds.length === 0) return {};
  const { data, error } = await db
    .from("lead_eventos")
    .select("id, lead_id, created_at, tipo, nota, detalle, asesor:asesores(nombre)")
    .in("lead_id", leadIds)
    .order("created_at", { ascending: false })
    .limit(3000);
  if (error) throw new Error(`eventosDe: ${error.message}`);
  const porLead: Record<string, EventoLead[]> = {};
  for (const e of data as unknown as (Omit<EventoLead, "asesor_nombre"> & { asesor: { nombre: string } | null })[]) {
    const { asesor, ...resto } = e;
    (porLead[e.lead_id] ??= []).push({ ...resto, asesor_nombre: asesor?.nombre ?? null });
  }
  return porLead;
}

/** Un lead para modificarlo, solo si el miembro puede tocarlo. */
export async function leadEditable(id: string, miembro: Miembro) {
  const db = getSupabase();
  if (!db) return null;
  const { data } = await db
    .from("leads")
    .select("id, etapa, asignado_a, primer_contacto_at")
    .eq("id", id)
    .maybeSingle();
  if (!data) return null;
  if (miembro.rol !== "admin" && data.asignado_a !== miembro.id) return null;
  return data as { id: string; etapa: Etapa; asignado_a: string | null; primer_contacto_at: string | null };
}
