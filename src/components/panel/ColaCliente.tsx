"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import TarjetaLead from "@/components/panel/TarjetaLead";
import Selector from "@/components/panel/Selector";
import Paginacion from "@/components/panel/Paginacion";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import { etiquetaRamo } from "@/lib/panel/etiquetas";

const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

/** Fin del día de hoy en Colombia (UTC-5). */
function finDeHoy(ahora: Date) {
  const bogota = new Date(ahora.getTime() - 5 * 3600e3);
  return new Date(Date.UTC(bogota.getUTCFullYear(), bogota.getUTCMonth(), bogota.getUTCDate() + 1, 5));
}

const t = (iso: string | null) => (iso ? new Date(iso).getTime() : Infinity);

type OrdenCola = "prioridad" | "recientes" | "antiguos" | "nombre";
const ORDENES_COLA: { valor: OrdenCola; texto: string; nota?: string }[] = [
  { valor: "prioridad", texto: "Prioridad", nota: "recomendado" },
  { valor: "recientes", texto: "Más recientes primero" },
  { valor: "antiguos", texto: "Más antiguos primero" },
  { valor: "nombre", texto: "Nombre (A-Z)" },
];
const POR_SECCION = 10;

type Pestana = "nuevos" | "hoy" | "enCurso" | "cerrados";
const PESTANAS: { clave: Pestana; texto: string; vacio: string }[] = [
  { clave: "nuevos", texto: "Nuevos", vacio: "No hay leads nuevos. Cuando llegue uno te avisamos por Telegram." },
  { clave: "hoy", texto: "Hoy", vacio: "No tienes seguimientos para hoy." },
  { clave: "enCurso", texto: "En curso", vacio: "Nada en curso." },
  { clave: "cerrados", texto: "Cerrados", vacio: "No hay cierres en los últimos 14 días." },
];

export default function ColaCliente({
  leads,
  eventos,
  ahora,
  esAdmin,
  nombreMiembro,
  abrir = "",
}: {
  leads: LeadCola[];
  eventos: Record<string, EventoLead[]>;
  ahora: string;
  esAdmin: boolean;
  nombreMiembro: string;
  /** Lead a abrir al cargar (enlace de Telegram). */
  abrir?: string;
}) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState<OrdenCola>("prioridad");

  // Se actualiza sola cada minuto mientras la pestaña está a la vista.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, 60_000);
    const alVolver = () => document.visibilityState === "visible" && router.refresh();
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, [router]);

  const grupos = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const digitos = q.replace(/\D/g, "");
    const filtrados = q
      ? leads.filter(
          (l) =>
            l.nombre.toLowerCase().includes(q) ||
            (digitos.length >= 3 && l.telefono.replace(/\D/g, "").includes(digitos)) ||
            etiquetaRamo(l.tipo_seguro).toLowerCase().includes(q) ||
            (l.placa ?? "").toLowerCase().includes(q)
        )
      : leads;
    const fin = finDeHoy(new Date(ahora)).getTime();
    const abiertos = filtrados.filter((l) => ["nuevo", "contactado", "cotizado"].includes(l.etapa));
    const paraHoy = abiertos
      .filter((l) => l.etapa !== "nuevo" && t(l.proximo_seguimiento) < fin)
      .sort((a, b) => t(a.proximo_seguimiento) - t(b.proximo_seguimiento));
    const idsHoy = new Set(paraHoy.map((l) => l.id));
    // Nuevos: primero los que llevan más tiempo esperando dentro del último
    // día; los de más de un día (fríos) al final.
    const dia = 864e5;
    const ref = new Date(ahora).getTime();
    const nuevos = abiertos
      .filter((l) => l.etapa === "nuevo")
      .sort((a, b) => {
        const fa = ref - t(a.created_at) > dia, fb = ref - t(b.created_at) > dia;
        if (fa !== fb) return fa ? 1 : -1;
        return fa ? t(b.created_at) - t(a.created_at) : t(a.created_at) - t(b.created_at);
      });
    const enCurso = abiertos
      .filter((l) => l.etapa !== "nuevo" && !idsHoy.has(l.id))
      .sort((a, b) => t(a.proximo_seguimiento) - t(b.proximo_seguimiento));
    const cerrados = filtrados
      .filter((l) => !["nuevo", "contactado", "cotizado"].includes(l.etapa))
      .sort((a, b) => t(b.cerrado_at ?? b.created_at) - t(a.cerrado_at ?? a.created_at));
    if (orden === "prioridad") return { paraHoy, nuevos, enCurso, cerrados };
    const cmp = (a: LeadCola, b: LeadCola) =>
      orden === "nombre"
        ? a.nombre.localeCompare(b.nombre, "es")
        : orden === "recientes"
          ? t(b.created_at) - t(a.created_at)
          : t(a.created_at) - t(b.created_at);
    return { paraHoy: paraHoy.sort(cmp), nuevos: nuevos.sort(cmp), enCurso: enCurso.sort(cmp), cerrados: cerrados.sort(cmp) };
  }, [leads, busqueda, ahora, orden]);

  // Misma persona (últimos 10 dígitos del teléfono) con varias solicitudes.
  const solicitudes = useMemo(() => {
    const n: Record<string, number> = {};
    for (const l of leads) {
      const k = l.telefono.replace(/\D/g, "").slice(-10);
      n[k] = (n[k] ?? 0) + 1;
    }
    return n;
  }, [leads]);

  const ganados = leads.filter((l) => l.etapa === "ganado");
  const primaGanada = ganados.reduce((s, l) => s + (l.prima_valor ?? 0), 0);

  const listas: Record<Pestana, LeadCola[]> = {
    nuevos: grupos.nuevos,
    hoy: grupos.paraHoy,
    enCurso: grupos.enCurso,
    cerrados: grupos.cerrados,
  };
  const buscado = abrir ? leads.find((l) => l.id === abrir) : undefined;
  // Pestaña inicial: la del lead del enlace, o la primera con trabajo.
  const [pestana, setPestana] = useState<Pestana>(() => {
    if (buscado) return (Object.keys(listas) as Pestana[]).find((k) => listas[k].some((l) => l.id === abrir)) ?? "nuevos";
    return (["nuevos", "hoy", "enCurso"] as Pestana[]).find((k) => listas[k].length) ?? "nuevos";
  });
  const actual = PESTANAS.find((p) => p.clave === pestana)!;

  const tarjeta = (l: LeadCola) => (
    <TarjetaLead
      key={l.id}
      lead={l}
      eventos={eventos[l.id] ?? []}
      ahora={ahora}
      verAsesor={esAdmin}
      nombreMiembro={nombreMiembro}
      solicitudes={solicitudes[l.telefono.replace(/\D/g, "").slice(-10)] ?? 1}
      abrirInicial={l.id === abrir}
    />
  );

  return (
    <div>
      {abrir && !buscado && (
        <p role="status" className="mb-4 text-sm bg-amber-50 text-amber-900 border border-amber-200 rounded-xl px-4 py-3">
          Ese lead ya no está en tu cola (lo reasignaron o se cerró hace más de 14 días).
        </p>
      )}

      {/* Pestañas: lo urgente primero. Quedan fijas arriba al bajar. */}
      <nav
        aria-label="Secciones de la cola"
        className="sticky top-0 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-surface/95 backdrop-blur flex gap-1.5 overflow-x-auto"
      >
        {PESTANAS.map((p) => {
          const activa = p.clave === pestana;
          const n = listas[p.clave].length;
          const alerta = p.clave === "nuevos" && n > 0;
          return (
            <button
              key={p.clave}
              type="button"
              onClick={() => setPestana(p.clave)}
              aria-current={activa ? "page" : undefined}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold border transition-colors ${
                activa ? "bg-primary text-white border-primary" : "bg-white text-primary/70 border-primary/10 hover:border-accent/50"
              }`}
            >
              {p.texto}
              <span
                className={`min-w-5 h-5 px-1.5 rounded-full text-xs inline-flex items-center justify-center tabular-nums ${
                  alerta ? "bg-accent text-primary" : activa ? "bg-white/15 text-white" : "bg-primary/5 text-primary/50"
                }`}
              >
                {n}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-3 flex gap-2">
        <label className="flex-1 min-w-0 flex items-center gap-2 bg-white border border-primary/10 rounded-xl px-3.5 py-2.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
          <Search className="w-4 h-4 shrink-0 text-primary/40" aria-hidden="true" />
          <span className="sr-only">Buscar</span>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar nombre, teléfono, placa"
            className="flex-1 min-w-0 bg-transparent outline-none text-primary placeholder-primary/35 text-[15px]"
          />
        </label>
        <Selector etiqueta="Ordenar por" valor={orden} onCambio={(v) => setOrden(v as OrdenCola)} opciones={ORDENES_COLA} ancho="w-36 sm:w-56" />
      </div>

      {pestana === "cerrados" && ganados.length > 0 && (
        <p className="mt-4 text-sm text-muted">
          {ganados.length} {ganados.length === 1 ? "ganado" : "ganados"} en 14 días · <b className="text-primary">{pesos(primaGanada)}</b> en primas
        </p>
      )}

      <section className="mt-4" aria-label={actual.texto}>
        {listas[pestana].length ? (
          <ListaPaginada key={pestana} leads={listas[pestana]} render={tarjeta} abrir={abrir} />
        ) : (
          <p className="text-muted text-sm bg-white border border-dashed border-primary/15 rounded-2xl p-5">
            {busqueda ? "Nada coincide con la búsqueda en esta pestaña." : actual.vacio}
          </p>
        )}
      </section>
    </div>
  );
}

/** Filas de una sección, de a POR_SECCION por página. */
function ListaPaginada({ leads, render, abrir = "" }: { leads: LeadCola[]; render: (l: LeadCola) => React.ReactNode; abrir?: string }) {
  // Si viene un lead del enlace, arranca en la página donde está.
  const [pagina, setPagina] = useState(() => {
    const i = leads.findIndex((l) => l.id === abrir);
    return i >= 0 ? Math.floor(i / POR_SECCION) + 1 : 1;
  });
  const paginas = Math.max(1, Math.ceil(leads.length / POR_SECCION));
  // Si la búsqueda deja menos páginas, se queda en la última que existe.
  const actual = Math.min(pagina, paginas);
  const visibles = leads.slice((actual - 1) * POR_SECCION, actual * POR_SECCION);
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-primary/10 divide-y divide-primary/10">{visibles.map(render)}</div>
      <Paginacion pagina={actual} paginas={paginas} total={leads.length} porPagina={POR_SECCION} onIr={setPagina} />
    </div>
  );
}
