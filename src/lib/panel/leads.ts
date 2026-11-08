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

// ── Vista del admin ────────────────────────────────────────────────────────

export const POR_PAGINA = 50;
const PESTANAS = ["abiertos", "nuevo", "contactado", "cotizado", "ganado", "perdido", "todos"] as const;
export type Pestana = (typeof PESTANAS)[number];
const RANGOS = ["hoy", "7d", "30d", "todo"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export interface FiltrosAdmin {
  etapa: Pestana;
  asesor: string; // uuid, "sin" o ""
  ramo: string;
  rango: (typeof RANGOS)[number];
  desde: string;
  hasta: string;
  campana: string;
  q: string;
  pagina: number;
}

/** Lee los filtros de la URL. Todo lo que no esté en la lista blanca se ignora. */
export function leerFiltros(sp: Record<string, string | string[] | undefined>): FiltrosAdmin {
  const v = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : sp[k]) ?? "";
  const etapa = PESTANAS.includes(v("etapa") as Pestana) ? (v("etapa") as Pestana) : "abiertos";
  const asesor = v("asesor") === "sin" || UUID.test(v("asesor")) ? v("asesor") : "";
  const rango = RANGOS.includes(v("rango") as FiltrosAdmin["rango"]) ? (v("rango") as FiltrosAdmin["rango"]) : "todo";
  return {
    etapa,
    asesor,
    ramo: /^[a-z_-]{2,40}$/.test(v("ramo")) ? v("ramo") : "",
    rango,
    desde: FECHA.test(v("desde")) ? v("desde") : "",
    hasta: FECHA.test(v("hasta")) ? v("hasta") : "",
    campana: v("campana").slice(0, 80),
    q: v("q").slice(0, 60),
    pagina: Math.max(1, Math.min(200, parseInt(v("pagina")) || 1)),
  };
}

/** Quita lo que rompería un filtro .or() de PostgREST. */
const limpiar = (s: string) => s.replace(/[,()*%"\\:]/g, " ").trim();

/** Inicio de un día de Colombia (UTC-5) en ISO. */
const inicioDiaCo = (fecha: string, sumarDias = 0) => {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d + sumarDias, 5)).toISOString();
};
const hoyCo = () => new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 10);

export async function leadsAdmin(f: FiltrosAdmin) {
  const db = getSupabase();
  if (!db) return { leads: [] as LeadCola[], total: 0, conteos: {} as Record<Pestana, number> };

  // Filtros comunes a la lista y a los conteos de cada pestaña.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aplicar = (q: any) => {
    if (f.asesor === "sin") q = q.is("asignado_a", null);
    else if (f.asesor) q = q.eq("asignado_a", f.asesor);
    if (f.ramo) q = q.eq("tipo_seguro", f.ramo);
    if (f.campana) q = q.ilike("utm_campaign", `%${limpiar(f.campana)}%`);
    const hoy = hoyCo();
    if (f.rango === "hoy") q = q.gte("created_at", inicioDiaCo(hoy));
    if (f.rango === "7d") q = q.gte("created_at", inicioDiaCo(hoy, -6));
    if (f.rango === "30d") q = q.gte("created_at", inicioDiaCo(hoy, -29));
    if (f.desde) q = q.gte("created_at", inicioDiaCo(f.desde));
    if (f.hasta) q = q.lt("created_at", inicioDiaCo(f.hasta, 1));
    const texto = limpiar(f.q);
    if (texto) {
      const digitos = texto.replace(/\D/g, "");
      q = digitos.length >= 3
        ? q.like("telefono_norm", `%${digitos}%`)
        : q.ilike("nombre", `%${texto}%`);
    }
    return q;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const porEtapa = (q: any, etapa: Pestana) =>
    etapa === "todos" ? q : etapa === "abiertos" ? q.in("etapa", ["nuevo", "contactado", "cotizado"]) : q.eq("etapa", etapa);

  const desde = (f.pagina - 1) * POR_PAGINA;
  const [lista, ...conteos] = await Promise.all([
    porEtapa(aplicar(db.from("leads").select(COLUMNAS, { count: "exact" })), f.etapa)
      .order("created_at", { ascending: false })
      .range(desde, desde + POR_PAGINA - 1),
    ...PESTANAS.map((p) =>
      porEtapa(aplicar(db.from("leads").select("id", { count: "exact", head: true })), p)
    ),
  ]);
  if (lista.error) throw new Error(`leadsAdmin: ${lista.error.message}`);
  return {
    leads: (lista.data as unknown as FilaLead[]).map(aLead),
    total: lista.count ?? 0,
    conteos: Object.fromEntries(PESTANAS.map((p, i) => [p, conteos[i].count ?? 0])) as Record<Pestana, number>,
  };
}

export interface MiembroEquipo {
  id: string;
  email: string;
  nombre: string;
  rol: "admin" | "asesor";
  activo: boolean;
  acceso: boolean;
  telegram_chat_id: string | null;
  created_at: string;
  abiertos: number;
}

/** Equipo con cuántos leads abiertos tiene cada uno. */
export async function equipo(): Promise<MiembroEquipo[]> {
  const db = getSupabase();
  if (!db) return [];
  const [{ data: filas }, { data: abiertos }] = await Promise.all([
    db.from("asesores").select("id, email, nombre, rol, activo, acceso, telegram_chat_id, created_at").order("created_at"),
    db.from("leads").select("asignado_a").in("etapa", ["nuevo", "contactado", "cotizado"]).not("asignado_a", "is", null).limit(10000),
  ]);
  const n: Record<string, number> = {};
  for (const l of abiertos ?? []) n[l.asignado_a as string] = (n[l.asignado_a as string] ?? 0) + 1;
  return (filas ?? []).map((m) => ({ ...(m as Omit<MiembroEquipo, "abiertos">), abiertos: n[m.id] ?? 0 }));
}
