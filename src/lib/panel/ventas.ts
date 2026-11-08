import "server-only";
import { getSupabase } from "@/lib/supabase";

// Ventas, comisión y participación de la página. Solo el servidor toca estas
// tablas; los valores de comisión y participación solo se muestran al admin.

type Db = NonNullable<ReturnType<typeof getSupabase>>;

/** % de la comisión que le corresponde a la página (hoy 40). */
export async function participacionPct(db: Db): Promise<number> {
  const { data } = await db.from("panel_config").select("valor").eq("clave", "participacion_pct").maybeSingle();
  const n = Number(data?.valor);
  return Number.isFinite(n) && n >= 0 && n <= 100 ? n : 40;
}

/** % de comisión configurado para el ramo, o null si falta. */
export async function pctDelRamo(db: Db, ramo: string): Promise<number | null> {
  const { data } = await db.from("comisiones_ramo").select("pct").eq("ramo", ramo).maybeSingle();
  return data ? Number(data.pct) : null;
}

/** Registra una venta (inicial o renovación) con el % del ramo y la participación vigente. */
export async function registrarVenta(
  db: Db,
  v: { leadId: string; tipo: "nueva" | "renovacion"; ramo: string; aseguradora: string; prima: number; por: string }
) {
  const [pct, part] = await Promise.all([pctDelRamo(db, v.ramo), participacionPct(db)]);
  const { error } = await db.from("ventas").insert({
    lead_id: v.leadId,
    tipo: v.tipo,
    ramo: v.ramo,
    aseguradora: v.aseguradora,
    prima: v.prima,
    comision_pct: pct,
    participacion_pct: part,
    registrado_por: v.por,
  });
  if (error) throw new Error(`registrarVenta: ${error.message}`);
}

export interface Venta {
  id: string;
  fecha_venta: string;
  tipo: "nueva" | "renovacion";
  ramo: string;
  aseguradora: string;
  prima: number;
  comision_pct: number | null;
  participacion_pct: number;
  comision_valor: number | null;
  participacion_valor: number | null;
  pagada: boolean;
  lead_id: string;
  cliente: string;
  asesor: string | null;
}

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

/** Ventas de un mes (YYYY-MM), las más recientes primero. */
export async function ventasDelMes(mes: string): Promise<Venta[]> {
  const db = getSupabase();
  if (!db) return [];
  const [a, m] = mes.split("-").map(Number);
  const desde = `${mes}-01`;
  const hasta = new Date(Date.UTC(a, m, 1)).toISOString().slice(0, 10);
  const { data, error } = await db
    .from("ventas")
    .select(
      "id, fecha_venta, tipo, ramo, aseguradora, prima, comision_pct, participacion_pct, comision_valor, participacion_valor, pagada, lead_id, lead:leads(nombre), asesor:asesores!ventas_registrado_por_fkey(nombre)"
    )
    .gte("fecha_venta", desde)
    .lt("fecha_venta", hasta)
    .order("fecha_venta", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(`ventasDelMes: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((v: any) => ({
    ...v,
    prima: Number(v.prima),
    comision_pct: num(v.comision_pct),
    participacion_pct: Number(v.participacion_pct),
    comision_valor: num(v.comision_valor),
    participacion_valor: num(v.participacion_valor),
    cliente: v.lead?.nombre ?? "—",
    asesor: v.asesor?.nombre ?? null,
  }));
}

/** Lo que la agencia le debe a la página: participación de ventas no pagadas (todas las fechas). */
export async function pendienteDePago(): Promise<{ valor: number; ventas: number; sinPct: number }> {
  const db = getSupabase();
  if (!db) return { valor: 0, ventas: 0, sinPct: 0 };
  const { data } = await db.from("ventas").select("participacion_valor, comision_pct").eq("pagada", false).limit(10000);
  let valor = 0, sinPct = 0;
  for (const v of data ?? []) {
    if (v.comision_pct === null) sinPct++;
    else valor += Number(v.participacion_valor ?? 0);
  }
  return { valor, ventas: data?.length ?? 0, sinPct };
}

export async function comisionesPorRamo(): Promise<Record<string, number>> {
  const db = getSupabase();
  if (!db) return {};
  const { data } = await db.from("comisiones_ramo").select("ramo, pct");
  return Object.fromEntries((data ?? []).map((r) => [r.ramo, Number(r.pct)]));
}
