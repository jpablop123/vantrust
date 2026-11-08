import Link from "next/link";
import { exigirMiembro } from "@/lib/panel/sesion";
import { comisionesPorRamo, pendienteDePago, ventasDelMes } from "@/lib/panel/ventas";
import { RAMOS_COMISION } from "@/lib/panel/etiquetas";
import BarraPanel from "@/components/panel/BarraPanel";
import { TablaComisiones, TablaVentas } from "@/components/panel/VentasCliente";

export const dynamic = "force-dynamic";

const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

/** Mes actual de Colombia como YYYY-MM. */
const mesActual = () => new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 7);
const mover = (mes: string, d: number) => {
  const [a, m] = mes.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1 + d, 1)).toISOString().slice(0, 7);
};
const nombreMes = (mes: string) =>
  new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${mes}-01T00:00:00Z`));

export default async function VentasPage({ searchParams }: { searchParams: Promise<{ mes?: string }> }) {
  const yo = await exigirMiembro("admin");
  const { mes: pedido } = await searchParams;
  const mes = /^\d{4}-(0[1-9]|1[0-2])$/.test(pedido ?? "") ? pedido! : mesActual();
  const [ventas, pendiente, pcts] = await Promise.all([ventasDelMes(mes), pendienteDePago(), comisionesPorRamo()]);

  const primas = ventas.reduce((s, v) => s + v.prima, 0);
  const comision = ventas.reduce((s, v) => s + (v.comision_valor ?? 0), 0);
  const parte = ventas.reduce((s, v) => s + (v.participacion_valor ?? 0), 0);
  const ramos = [...new Set([...RAMOS_COMISION, ...ventas.map((v) => v.ramo)])];

  return (
    <>
      <BarraPanel miembro={yo} actual="ventas" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventas y comisión</h1>
          <p className="text-muted mt-1">Cada venta y renovación, la comisión de la aseguradora y la parte que le corresponde a la página.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl p-4 bg-primary text-white col-span-2 lg:col-span-1">
            <p className="text-3xl font-bold text-accent">{pesos(pendiente.valor)}</p>
            <p className="text-sm text-white/70">Te deben (todas las ventas sin pagar)</p>
            {pendiente.sinPct > 0 && <p className="text-xs text-amber-300 mt-1">{pendiente.sinPct} ventas sin % de comisión todavía</p>}
          </div>
          {[
            [pesos(primas), `Primas de ${nombreMes(mes)}`],
            [pesos(comision), "Comisión del mes"],
            [pesos(parte), "Tu parte del mes"],
          ].map(([v, t]) => (
            <div key={t} className="rounded-2xl p-4 bg-white border border-primary/10">
              <p className="text-2xl font-bold text-primary">{v}</p>
              <p className="text-sm text-muted">{t}</p>
            </div>
          ))}
        </div>

        <nav aria-label="Mes" className="flex items-center gap-3">
          <Link href={`/panel/ventas?mes=${mover(mes, -1)}`} className="px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm font-semibold">← Anterior</Link>
          <p className="font-bold text-primary">
            {nombreMes(mes).replace(/^./, (c) => c.toUpperCase())} · {ventas.length} {ventas.length === 1 ? "venta" : "ventas"}
          </p>
          {mes < mesActual() && (
            <Link href={`/panel/ventas?mes=${mover(mes, 1)}`} className="px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm font-semibold">Siguiente →</Link>
          )}
        </nav>

        <TablaVentas ventas={ventas} />
        <TablaComisiones ramos={ramos} pcts={pcts} />
      </main>
    </>
  );
}
