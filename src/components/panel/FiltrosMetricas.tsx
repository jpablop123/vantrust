"use client";

import { usePathname, useRouter } from "next/navigation";
import Selector from "@/components/panel/Selector";
import type { FiltrosMetricas as Filtros } from "@/lib/panel/metricas";

const RANGOS = [
  { valor: "7d", texto: "Últimos 7 días" },
  { valor: "30d", texto: "Últimos 30 días" },
  { valor: "90d", texto: "Últimos 90 días" },
  { valor: "mes", texto: "Este mes" },
  { valor: "todo", texto: "Desde el inicio" },
];
const control = "px-3 py-2.5 rounded-xl border border-primary/15 bg-white text-sm text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25";

/** Periodo de las métricas: un rango rápido o fechas a mano. Vive en la URL. */
export default function FiltrosMetricas({ filtros }: { filtros: Filtros }) {
  const router = useRouter();
  const ruta = usePathname();
  const ir = (p: Record<string, string>) => {
    const q = new URLSearchParams(Object.entries(p).filter(([, v]) => v));
    router.push(`${ruta}${q.toString() ? `?${q}` : ""}`);
  };
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-primary/70">
      <Selector
        etiqueta="Periodo"
        valor={filtros.rango}
        placeholder="Fechas a mano"
        ancho="w-52"
        opciones={RANGOS}
        onCambio={(v) => ir({ rango: v === "30d" ? "" : v })}
      />
      <span className="ml-1">o entre</span>
      <input type="date" aria-label="Desde" defaultValue={filtros.desde} onChange={(e) => ir({ desde: e.target.value, hasta: filtros.hasta })} className={control} />
      <span>y</span>
      <input type="date" aria-label="Hasta" defaultValue={filtros.hasta} onChange={(e) => ir({ desde: filtros.desde, hasta: e.target.value })} className={control} />
    </div>
  );
}
