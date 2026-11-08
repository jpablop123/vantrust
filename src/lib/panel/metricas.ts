import "server-only";
import { getSupabase } from "@/lib/supabase";
import { canalDe, capturaDe } from "@/lib/panel/origen";
import { etiquetaRamo } from "@/lib/panel/etiquetas";

// ── Filtros de fecha (en la URL) ───────────────────────────────────────────

export const RANGOS_METRICAS = ["7d", "30d", "90d", "mes", "todo"] as const;
export type RangoMetricas = (typeof RANGOS_METRICAS)[number];
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export interface FiltrosMetricas {
  rango: RangoMetricas | "";
  desde: string;
  hasta: string;
}

export function leerFiltrosMetricas(sp: Record<string, string | string[] | undefined>): FiltrosMetricas {
  const v = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : sp[k]) ?? "";
  const desde = FECHA.test(v("desde")) ? v("desde") : "";
  const hasta = FECHA.test(v("hasta")) ? v("hasta") : "";
  const rango = RANGOS_METRICAS.includes(v("rango") as RangoMetricas) ? (v("rango") as RangoMetricas) : "";
  return { rango: desde || hasta ? "" : rango || "30d", desde, hasta };
}

const DIA = 864e5;
/** Fecha de hoy en Colombia (UTC-5), AAAA-MM-DD. */
const hoyCo = () => new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 10);
const sumarDias = (fecha: string, n: number) => {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d + n)).toISOString().slice(0, 10);
};
/** Inicio de un día de Colombia, en ISO UTC. */
const inicioDia = (fecha: string) => {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d, 5)).toISOString();
};
const diaCo = (iso: string) => new Date(new Date(iso).getTime() - 5 * 3600e3).toISOString().slice(0, 10);

/** Primer y último día (inclusive) del periodo. null = desde el primer lead. */
function periodo(f: FiltrosMetricas): { desde: string | null; hasta: string } {
  const hoy = hoyCo();
  if (f.desde || f.hasta) return { desde: f.desde || null, hasta: f.hasta || hoy };
  if (f.rango === "7d") return { desde: sumarDias(hoy, -6), hasta: hoy };
  if (f.rango === "90d") return { desde: sumarDias(hoy, -89), hasta: hoy };
  if (f.rango === "mes") return { desde: `${hoy.slice(0, 8)}01`, hasta: hoy };
  if (f.rango === "todo") return { desde: null, hasta: hoy };
  return { desde: sumarDias(hoy, -29), hasta: hoy };
}

// ── Cálculo ────────────────────────────────────────────────────────────────

export interface Fila {
  clave: string;
  leads: number;
  contactados: number;
  cotizados: number;
  ganados: number;
  prima: number;
  /** Mediana de minutos hasta el primer contacto (null si nadie fue contactado). */
  respuesta: number | null;
}

export interface Metricas {
  desde: string;
  hasta: string;
  total: number;
  embudo: { etapa: string; n: number }[];
  respuesta: { mediana: number | null; en15: number; contactados: number };
  abiertosSinContactar: number;
  prima: number;
  porDia: { dia: string; n: number; etiqueta: string }[];
  agrupado: "dia" | "semana";
  canal: Fila[];
  captura: Fila[];
  campana: Fila[];
  asesor: Fila[];
  ramo: Fila[];
}

const mediana = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

interface LeadMetrica {
  id: string;
  created_at: string;
  tipo_seguro: string;
  fuente: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  etapa: string;
  primer_contacto_at: string | null;
  prima_valor: number | null;
  asesor: { nombre: string } | null;
}

export async function metricas(f: FiltrosMetricas): Promise<Metricas | null> {
  const db = getSupabase();
  if (!db) return null;
  const p = periodo(f);

  let q = db
    .from("leads")
    .select(
      "id, created_at, tipo_seguro, fuente, utm_source, utm_medium, utm_campaign, gclid, fbclid, referrer, etapa, primer_contacto_at, prima_valor, asesor:asesores!leads_asignado_a_fkey(nombre)"
    )
    .lt("created_at", inicioDia(sumarDias(p.hasta, 1)))
    .order("created_at")
    .limit(20000);
  if (p.desde) q = q.gte("created_at", inicioDia(p.desde));
  const { data, error } = await q;
  if (error) throw new Error(`metricas: ${error.message}`);
  const leads = (data ?? []) as unknown as LeadMetrica[];

  // Cotizado = llegó a cotizado o ganado, o se perdió después de cotizar.
  const cotizadosIds = new Set<string>();
  const ids = leads.map((l) => l.id);
  for (let i = 0; i < ids.length; i += 500) {
    const { data: ev } = await db
      .from("lead_eventos")
      .select("lead_id")
      .eq("tipo", "cotizado")
      .in("lead_id", ids.slice(i, i + 500));
    for (const e of ev ?? []) cotizadosIds.add(e.lead_id as string);
  }

  const filas = leads.map((l) => {
    const contactado = !!l.primer_contacto_at || l.etapa !== "nuevo";
    const cotizado = l.etapa === "cotizado" || l.etapa === "ganado" || cotizadosIds.has(l.id);
    const minutos = l.primer_contacto_at
      ? Math.max(0, (new Date(l.primer_contacto_at).getTime() - new Date(l.created_at).getTime()) / 60000)
      : null;
    return {
      l,
      contactado,
      cotizado,
      ganado: l.etapa === "ganado",
      prima: l.etapa === "ganado" ? Number(l.prima_valor ?? 0) : 0,
      minutos,
      canal: canalDe(l),
      captura: capturaDe(l.fuente),
      campana: l.utm_campaign?.trim() || "(sin campaña)",
      asesor: l.asesor?.nombre ?? "Sin asignar",
      ramo: etiquetaRamo(l.tipo_seguro),
    };
  });
  type F = (typeof filas)[number];

  const agrupar = (clave: (x: F) => string): Fila[] => {
    const m = new Map<string, F[]>();
    for (const x of filas) {
      const k = clave(x);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(x);
    }
    return [...m.entries()]
      .map(([k, xs]) => ({
        clave: k,
        leads: xs.length,
        contactados: xs.filter((x) => x.contactado).length,
        cotizados: xs.filter((x) => x.cotizado).length,
        ganados: xs.filter((x) => x.ganado).length,
        prima: xs.reduce((s, x) => s + x.prima, 0),
        respuesta: mediana(xs.flatMap((x) => (x.minutos === null ? [] : [x.minutos]))),
      }))
      .sort((a, b) => b.leads - a.leads || a.clave.localeCompare(b.clave, "es"));
  };

  // Leads por día (o por semana si el periodo es largo).
  const desde = p.desde ?? (leads[0] ? diaCo(leads[0].created_at) : p.hasta);
  const dias = Math.round((Date.parse(p.hasta) - Date.parse(desde)) / DIA) + 1;
  const agrupado = dias > 62 ? "semana" : "dia";
  const paso = agrupado === "semana" ? 7 : 1;
  const conteo = new Map<string, number>();
  for (const x of filas) {
    const d = diaCo(x.l.created_at);
    const idx = Math.floor((Date.parse(d) - Date.parse(desde)) / DIA / paso);
    const k = sumarDias(desde, idx * paso);
    conteo.set(k, (conteo.get(k) ?? 0) + 1);
  }
  const fmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", timeZone: "UTC" });
  const porDia = [];
  for (let d = desde; d <= p.hasta; d = sumarDias(d, paso)) {
    const etiqueta = fmt.format(new Date(`${d}T00:00:00Z`)).replace(/\s/g, " ");
    porDia.push({ dia: d, n: conteo.get(d) ?? 0, etiqueta: agrupado === "semana" ? `Semana del ${etiqueta}` : etiqueta });
  }

  const minutos = filas.flatMap((x) => (x.minutos === null ? [] : [x.minutos]));
  return {
    desde,
    hasta: p.hasta,
    total: filas.length,
    embudo: [
      { etapa: "Leads", n: filas.length },
      { etapa: "Contactados", n: filas.filter((x) => x.contactado).length },
      { etapa: "Cotizados", n: filas.filter((x) => x.cotizado).length },
      { etapa: "Ganados", n: filas.filter((x) => x.ganado).length },
    ],
    respuesta: { mediana: mediana(minutos), en15: minutos.filter((m) => m <= 15).length, contactados: minutos.length },
    abiertosSinContactar: filas.filter((x) => x.l.etapa === "nuevo").length,
    prima: filas.reduce((s, x) => s + x.prima, 0),
    porDia,
    agrupado,
    canal: agrupar((x) => x.canal),
    captura: agrupar((x) => x.captura),
    campana: agrupar((x) => x.campana),
    asesor: agrupar((x) => x.asesor),
    ramo: agrupar((x) => x.ramo),
  };
}
