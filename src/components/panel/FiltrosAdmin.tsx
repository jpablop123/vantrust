"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { FiltrosAdmin as Filtros } from "@/lib/panel/leads";
import Selector from "@/components/panel/Selector";

const RAMOS: [string, string][] = [
  ["", "Todos los ramos"], ["vehiculo", "Automóvil"], ["salud", "Salud"], ["hogar", "Hogar"],
  ["vida", "Vida"], ["pyme", "Pyme"], ["cumplimiento", "Cumplimiento"], ["accidentes", "Accidentes"],
  ["exequial", "Exequial"], ["viajes", "Viajes"], ["mascotas", "Mascotas"], ["otro", "Sin definir"],
];
const RANGOS: [string, string][] = [["todo", "Siempre"], ["hoy", "Hoy"], ["7d", "Últimos 7 días"], ["30d", "Últimos 30 días"]];

const control = "px-3 py-2.5 rounded-xl border border-primary/15 bg-white text-sm text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25";

/** Filtros del admin: viven en la URL, así se pueden compartir y recargar. */
export default function FiltrosAdmin({ filtros, asesores }: { filtros: Filtros; asesores: { id: string; nombre: string }[] }) {
  const router = useRouter();
  const ruta = usePathname();
  const sp = useSearchParams();
  const [q, setQ] = useState(filtros.q);

  const poner = (cambios: Record<string, string>) => {
    const p = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(cambios)) { if (v) p.set(k, v); else p.delete(k); }
    p.delete("pagina");
    p.delete("lead");
    router.push(`${ruta}${p.toString() ? `?${p}` : ""}`);
  };

  // Búsqueda con espera corta para no consultar en cada tecla.
  useEffect(() => {
    if (q === filtros.q) return;
    const t = setTimeout(() => poner({ q }), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const hayFiltros = filtros.asesor || filtros.ramo || filtros.rango !== "todo" || filtros.desde || filtros.hasta || filtros.campana || filtros.q;

  return (
    <div className="bg-white border border-primary/10 rounded-2xl p-4 space-y-3">
      <label className="flex items-center gap-2 rounded-xl border border-primary/15 px-3 py-2.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
        <Search className="w-4 h-4 text-primary/40" aria-hidden="true" />
        <span className="sr-only">Buscar</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o teléfono" className="flex-1 bg-transparent outline-none text-primary text-[15px] placeholder-primary/35" />
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Selector
          etiqueta="Asesor"
          valor={filtros.asesor}
          onCambio={(v) => poner({ asesor: v })}
          opciones={[{ valor: "", texto: "Todos los asesores" }, { valor: "sin", texto: "Sin asignar" }, ...asesores.map((a) => ({ valor: a.id, texto: a.nombre }))]}
        />
        <Selector etiqueta="Ramo" valor={filtros.ramo} onCambio={(v) => poner({ ramo: v })} opciones={RAMOS.map(([valor, texto]) => ({ valor, texto }))} />
        <Selector
          etiqueta="Fecha"
          valor={filtros.desde || filtros.hasta ? "" : filtros.rango}
          placeholder="Fechas a mano"
          onCambio={(v) => poner({ rango: v === "todo" ? "" : v, desde: "", hasta: "" })}
          opciones={RANGOS.map(([valor, texto]) => ({ valor, texto }))}
        />
        <input aria-label="Campaña" defaultValue={filtros.campana} placeholder="Campaña (utm)" onBlur={(e) => e.target.value !== filtros.campana && poner({ campana: e.target.value })} onKeyDown={(e) => e.key === "Enter" && poner({ campana: e.currentTarget.value })} className={control} />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-primary/70">
        <span>Entre</span>
        <input type="date" aria-label="Desde" defaultValue={filtros.desde} onChange={(e) => poner({ desde: e.target.value, rango: "" })} className={control} />
        <span>y</span>
        <input type="date" aria-label="Hasta" defaultValue={filtros.hasta} onChange={(e) => poner({ hasta: e.target.value, rango: "" })} className={control} />
        {hayFiltros && (
          <button type="button" onClick={() => { setQ(""); router.push(ruta); }} className="ml-auto inline-flex items-center gap-1 text-primary/60 hover:text-primary font-semibold">
            <X className="w-4 h-4" /> Quitar filtros
          </button>
        )}
      </div>
    </div>
  );
}
