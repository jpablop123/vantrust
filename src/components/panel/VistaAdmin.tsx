import Link from "next/link";
import TarjetaLead from "@/components/panel/TarjetaLead";
import FiltrosAdmin from "@/components/panel/FiltrosAdmin";
import MoverLeads from "@/components/panel/MoverLeads";
import OrdenAdmin from "@/components/panel/OrdenAdmin";
import Paginacion from "@/components/panel/Paginacion";
import { POR_PAGINA, equipo, eventosDe, leadsAdmin, type FiltrosAdmin as Filtros, type Pestana } from "@/lib/panel/leads";

const PESTANAS: [Pestana, string][] = [
  ["abiertos", "Abiertos"], ["nuevo", "Nuevos"], ["contactado", "Contactados"], ["cotizado", "Cotizados"],
  ["ganado", "Ganados"], ["perdido", "Perdidos"], ["todos", "Todos"],
];

/** Todos los leads para el admin, con filtros, reasignación y paginación. */
export default async function VistaAdmin({
  filtros,
  sp,
  nombreMiembro,
}: {
  filtros: Filtros;
  sp: Record<string, string | string[] | undefined>;
  nombreMiembro: string;
}) {
  const [{ leads, total, conteos }, miembros] = await Promise.all([leadsAdmin(filtros), equipo()]);
  const eventos = await eventosDe(leads.map((l) => l.id));
  const asesores = miembros.filter((m) => m.rol === "asesor" && m.acceso);

  const url = (cambios: Record<string, string>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) if (typeof v === "string" && v) p.set(k, v);
    for (const [k, v] of Object.entries(cambios)) { if (v) p.set(k, v); else p.delete(k); }
    return `/panel${p.toString() ? `?${p}` : ""}`;
  };
  const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const ahora = new Date().toISOString();

  return (
    <div className="space-y-5">
      <FiltrosAdmin filtros={filtros} asesores={asesores} />

      <nav aria-label="Etapas" className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {PESTANAS.map(([k, t]) => {
          const activa = filtros.etapa === k;
          return (
            <Link
              key={k}
              href={url({ etapa: k === "abiertos" ? "" : k, pagina: "" })}
              aria-current={activa ? "page" : undefined}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activa ? "bg-primary text-white border-primary" : "bg-white text-primary/70 border-primary/10 hover:border-accent/50"
              }`}
            >
              {t} <span className={activa ? "text-accent" : "text-primary/40"}>{conteos[k] ?? 0}</span>
            </Link>
          );
        })}
      </nav>

      <MoverLeads asesores={asesores.map((a) => ({ id: a.id, nombre: a.nombre, abiertos: a.abiertos }))} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <b className="text-primary">{total}</b> {total === 1 ? "lead" : "leads"}
        </p>
        <div className="flex items-center gap-2 text-sm text-primary/60">
          <span className="hidden sm:inline">Ordenar por</span>
          <OrdenAdmin valor={filtros.orden} />
        </div>
      </div>

      {leads.length ? (
        <div className="bg-white rounded-2xl border border-primary/10 divide-y divide-primary/10">
          {leads.map((l) => (
            <TarjetaLead
              key={l.id}
              lead={l}
              eventos={eventos[l.id] ?? []}
              ahora={ahora}
              verAsesor
              nombreMiembro={nombreMiembro}
              asesores={asesores}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted text-sm bg-white border border-dashed border-primary/15 rounded-2xl p-6">
          No hay leads con estos filtros.
        </p>
      )}

      <Paginacion
        pagina={filtros.pagina}
        paginas={paginas}
        total={total}
        porPagina={POR_PAGINA}
        href={(n) => url({ pagina: n > 1 ? String(n) : "" })}
      />
    </div>
  );
}
