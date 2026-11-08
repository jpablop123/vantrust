"use client";

import { useActionState } from "react";
import { alternarPagada, guardarComisionRamo, pctDeVenta } from "@/app/panel/admin/acciones";
import type { Venta } from "@/lib/panel/ventas";
import { etiquetaRamo } from "@/lib/panel/etiquetas";

const pesos = (n: number | null) =>
  n === null ? "—" : new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
const fecha = (d: string) =>
  new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

function PctVenta({ v }: { v: Venta }) {
  const [estado, accion, enviando] = useActionState(pctDeVenta, undefined);
  return (
    <form action={accion} className="flex items-center gap-1">
      <input type="hidden" name="id" value={v.id} />
      <input
        name="pct"
        defaultValue={v.comision_pct ?? ""}
        placeholder="falta"
        inputMode="decimal"
        aria-label={`% de comisión de la venta de ${v.cliente}`}
        className={`w-16 px-2 py-1 rounded-md border text-right text-sm ${v.comision_pct === null ? "border-red-300 bg-red-50 placeholder-red-500" : "border-primary/15"}`}
      />
      <span className="text-primary/50 text-sm">%</span>
      <button type="submit" disabled={enviando} className="text-xs font-semibold text-primary/60 hover:text-primary px-1">Guardar</button>
      {estado?.error && <span role="alert" className="text-xs text-red-700">{estado.error}</span>}
    </form>
  );
}

function Pagada({ v }: { v: Venta }) {
  const [estado, accion, enviando] = useActionState(alternarPagada, undefined);
  return (
    <form action={accion}>
      <input type="hidden" name="id" value={v.id} />
      <button
        type="submit"
        disabled={enviando}
        className={`px-3 py-1.5 rounded-full text-xs font-bold ${v.pagada ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
      >
        {v.pagada ? "Pagada" : "Pendiente"}
      </button>
      {estado?.error && <p role="alert" className="text-xs text-red-700 mt-1">{estado.error}</p>}
    </form>
  );
}

function PctRamo({ ramo, pct }: { ramo: string; pct: number | undefined }) {
  const [estado, accion, enviando] = useActionState(guardarComisionRamo, undefined);
  return (
    <form action={accion} className="flex flex-wrap items-center gap-2 py-2 border-b border-primary/10 last:border-0">
      <input type="hidden" name="ramo" value={ramo} />
      <span className="w-44 text-sm font-semibold text-primary">{etiquetaRamo(ramo)}</span>
      <input
        name="pct"
        defaultValue={pct ?? ""}
        placeholder="sin definir"
        inputMode="decimal"
        aria-label={`% de comisión de ${etiquetaRamo(ramo)}`}
        className="w-24 px-3 py-1.5 rounded-lg border border-primary/15 text-right text-sm"
      />
      <span className="text-primary/50 text-sm">%</span>
      <button type="submit" disabled={enviando} className="text-sm font-semibold text-primary/70 hover:text-primary px-2">Guardar</button>
      {estado?.error && <span role="alert" className="text-xs text-red-700">{estado.error}</span>}
      {estado?.ok && <span className="text-xs text-green-700">{estado.ok}</span>}
    </form>
  );
}

export function TablaVentas({ ventas }: { ventas: Venta[] }) {
  if (!ventas.length)
    return <p className="text-muted text-sm bg-white border border-dashed border-primary/15 rounded-2xl p-6">No hay ventas en este mes.</p>;
  return (
    <div className="bg-white border border-primary/10 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-primary/60 border-b border-primary/10">
          <tr>
            {["Fecha", "Cliente", "Ramo", "Aseguradora", "Prima", "% comisión", "Comisión", "Tu parte", "Pago"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v.id} className="border-b border-primary/5 last:border-0 align-middle">
              <td className="px-4 py-3 whitespace-nowrap">{fecha(v.fecha_venta)}</td>
              <td className="px-4 py-3">
                <p className="font-semibold text-primary">{v.cliente}</p>
                <p className="text-xs text-muted">{v.tipo === "renovacion" ? "Renovación" : "Venta nueva"}{v.asesor ? ` · ${v.asesor}` : ""}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{etiquetaRamo(v.ramo)}</td>
              <td className="px-4 py-3">{v.aseguradora}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">{pesos(v.prima)}</td>
              <td className="px-4 py-3"><PctVenta v={v} /></td>
              <td className="px-4 py-3 text-right whitespace-nowrap">{pesos(v.comision_valor)}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap font-bold text-primary">
                {pesos(v.participacion_valor)}
                <span className="block text-xs font-normal text-muted">{v.participacion_pct} % de la comisión</span>
              </td>
              <td className="px-4 py-3"><Pagada v={v} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TablaComisiones({ ramos, pcts }: { ramos: readonly string[]; pcts: Record<string, number> }) {
  return (
    <div className="bg-white border border-primary/10 rounded-2xl p-5">
      <h2 className="font-bold text-primary">% de comisión por ramo</h2>
      <p className="text-sm text-muted mb-3">
        Lo que paga la aseguradora sobre la prima. Se aplica a cada venta nueva; si un ramo no tiene %, sus ventas quedan
        &quot;sin %&quot; hasta que lo definas aquí.
      </p>
      {ramos.map((r) => <PctRamo key={r} ramo={r} pct={pcts[r]} />)}
    </div>
  );
}
