"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PartyPopper, Search } from "lucide-react";
import TarjetaLead from "@/components/panel/TarjetaLead";
import Selector from "@/components/panel/Selector";
import Paginacion from "@/components/panel/Paginacion";
import SiguienteLead from "@/components/panel/SiguienteLead";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import { etiquetaRamo } from "@/lib/panel/etiquetas";
import { IconoRamo } from "@/components/panel/Avatar";

/** "auto" y "vehiculo" son el mismo ramo: se agrupan por su etiqueta. */
const claveRamo = (tipo: string) => etiquetaRamo(tipo);

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
  const [ramo, setRamo] = useState("");
  // Leads del ramo elegido (o todos): de aquí sale todo lo demás.
  const delRamo = useMemo(() => (ramo ? leads.filter((l) => claveRamo(l.tipo_seguro) === ramo) : leads), [leads, ramo]);

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
      ? delRamo.filter(
          (l) =>
            l.nombre.toLowerCase().includes(q) ||
            (digitos.length >= 3 && l.telefono.replace(/\D/g, "").includes(digitos)) ||
            etiquetaRamo(l.tipo_seguro).toLowerCase().includes(q) ||
            (l.placa ?? "").toLowerCase().includes(q)
        )
      : delRamo;
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
  }, [delRamo, busqueda, ahora, orden]);

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

  // El que toca ahora: nuevos que no se han enfriado (el que más lleva
  // esperando), luego los seguimientos de hoy, luego los nuevos fríos.
  const siguiente = useMemo(() => {
    if (busqueda.trim()) return undefined;
    const ref = new Date(ahora).getTime();
    const abiertosTodos = delRamo.filter((l) => ["nuevo", "contactado", "cotizado"].includes(l.etapa));
    const nuevos = abiertosTodos.filter((l) => l.etapa === "nuevo").sort((a, b) => t(a.created_at) - t(b.created_at));
    const tibio = nuevos.find((l) => ref - t(l.created_at) <= 864e5);
    const fin = finDeHoy(new Date(ahora)).getTime();
    const hoy = abiertosTodos
      .filter((l) => l.etapa !== "nuevo" && t(l.proximo_seguimiento) < fin)
      .sort((a, b) => t(a.proximo_seguimiento) - t(b.proximo_seguimiento))[0];
    return tibio ?? hoy ?? nuevos[nuevos.length - 1];
  }, [delRamo, ahora, busqueda]);

  // Avance del día: leads con un resultado registrado hoy vs. lo que falta.
  const diaHoy = new Date(new Date(ahora).getTime() - 5 * 3600e3).toISOString().slice(0, 10);
  const atendidosHoy = Object.values(eventos).filter((evs) =>
    evs.some(
      (e) =>
        ["contactado", "resultado", "cotizado", "ganado", "perdido"].includes(e.tipo) &&
        new Date(new Date(e.created_at).getTime() - 5 * 3600e3).toISOString().slice(0, 10) === diaHoy
    )
  ).length;
  // El avance es del día completo, sin importar el ramo elegido abajo.
  const finDia = finDeHoy(new Date(ahora)).getTime();
  const faltanHoy = leads.filter(
    (l) => l.etapa === "nuevo" || (["contactado", "cotizado"].includes(l.etapa) && t(l.proximo_seguimiento) < finDia)
  ).length;
  const totalHoy = atendidosHoy + faltanHoy;

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

  const horaCo = new Date(new Date(ahora).getTime() - 5 * 3600e3).getUTCHours();
  const saludo = horaCo < 12 ? "Buenos días" : horaCo < 19 ? "Buenas tardes" : "Buenas noches";
  const fecha = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", weekday: "long", day: "numeric", month: "long" })
    .format(new Date(ahora))
    .replace(/\s/g, " ");
  // ¿En qué pestaña cae un lead? (sin búsqueda ni filtro de ramo)
  const finHoy = finDeHoy(new Date(ahora)).getTime();
  const enPestana = (l: LeadCola, p: Pestana) => {
    const abierto = ["nuevo", "contactado", "cotizado"].includes(l.etapa);
    if (p === "cerrados") return !abierto;
    if (!abierto) return false;
    if (p === "nuevos") return l.etapa === "nuevo";
    if (l.etapa === "nuevo") return false;
    const hoy = t(l.proximo_seguimiento) < finHoy;
    return p === "hoy" ? hoy : !hoy;
  };

  // Ramos de la pestaña actual con su conteo (sin el filtro de ramo, para
  // poder cambiar de uno a otro).
  const ramosPestana = (() => {
    const n = new Map<string, { clave: string; n: number; tipo: string }>();
    for (const l of leads) {
      if (!enPestana(l, pestana)) continue;
      const k = claveRamo(l.tipo_seguro);
      const r = n.get(k) ?? { clave: k, n: 0, tipo: l.tipo_seguro };
      r.n++;
      n.set(k, r);
    }
    return [...n.values()].sort((a, b) => b.n - a.n || a.clave.localeCompare(b.clave, "es"));
  })();

  const cambiarPestana = (p: Pestana) => {
    setPestana(p);
    // Si el ramo elegido no tiene leads en la otra pestaña, vuelve a "Todos".
    if (ramo && !leads.some((l) => enPestana(l, p) && claveRamo(l.tipo_seguro) === ramo)) setRamo("");
  };

  const visibles = (k: Pestana) => listas[k].filter((l) => l.id !== siguiente?.id);

  return (
    <div>
      {/* Encabezado: saludo y avance del día */}
      <section className="bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-20">
          <p className="text-sm text-white/50 first-letter:uppercase">{fecha}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            {saludo}, <span className="italic text-gold-gradient">{nombreMiembro.split(" ")[0]}</span>
          </h1>
          <div className="mt-5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/70">
                {totalHoy === 0 ? "No tienes pendientes para hoy" : <>Hoy llevas <b className="text-white">{atendidosHoy}</b> de {totalHoy}</>}
              </span>
              {faltanHoy > 0 && <span className="text-accent font-semibold">{faltanHoy} por atender</span>}
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={totalHoy} aria-valuenow={atendidosHoy} aria-label="Avance del día">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${totalHoy ? (atendidosHoy / totalHoy) * 100 : 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-14 pb-10">
        {abrir && !buscado && (
          <p role="status" className="mb-4 text-sm bg-amber-50 text-amber-900 border border-amber-200 rounded-xl px-4 py-3">
            Ese lead ya no está en tu cola (lo reasignaron o se cerró hace más de 14 días).
          </p>
        )}

        {siguiente ? (
          <SiguienteLead key={siguiente.id} lead={siguiente} eventos={eventos[siguiente.id] ?? []} ahora={ahora} nombreMiembro={nombreMiembro} />
        ) : !busqueda.trim() ? (
          <section className="bg-white rounded-3xl border border-primary/10 shadow-xl shadow-primary/10 p-6 text-center">
            <PartyPopper className="w-10 h-10 text-accent-dark mx-auto" />
            <p className="mt-2 text-lg font-bold text-primary">Estás al día</p>
            <p className="text-sm text-muted">No tienes leads por atender ahora. Te avisamos por Telegram cuando llegue uno.</p>
          </section>
        ) : null}

        {/* Pestañas: control segmentado, fijo arriba al bajar */}
        <nav aria-label="Secciones de la cola" className="sticky top-0 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 pt-5 pb-2 bg-surface/95 backdrop-blur">
          <div className="grid grid-cols-4 gap-1 p-1 bg-white rounded-2xl border border-primary/10 shadow-sm">
            {PESTANAS.map((p) => {
              const activa = p.clave === pestana;
              const n = listas[p.clave].length;
              const alerta = p.clave === "nuevos" && n > 0 && !activa;
              return (
                <button
                  key={p.clave}
                  type="button"
                  onClick={() => cambiarPestana(p.clave)}
                  aria-current={activa ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center py-2 rounded-xl transition-colors ${
                    activa ? "bg-primary text-white shadow-sm" : "text-primary/60 hover:bg-background"
                  }`}
                >
                  <span className={`text-lg font-bold leading-none tabular-nums ${activa ? "text-accent" : alerta ? "text-accent-dark" : ""}`}>{n}</span>
                  <span className="mt-1 text-[11px] sm:text-xs font-semibold leading-none">{p.texto}</span>
                  {alerta && <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Por tipo de seguro: solo los ramos que hay en esta pestaña */}
        {ramosPestana.length > 1 && (
          <div role="group" aria-label="Tipo de seguro" className="mt-1 mb-1 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {[{ clave: "", n: ramosPestana.reduce((s, r) => s + r.n, 0), tipo: "" }, ...ramosPestana].map((r) => {
              const activo = ramo === r.clave;
              return (
                <button
                  key={r.clave || "todos"}
                  type="button"
                  onClick={() => setRamo(activo && r.clave ? "" : r.clave)}
                  aria-pressed={activo}
                  className={`shrink-0 inline-flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                    activo ? "bg-primary text-white border-primary" : "bg-white text-primary/75 border-primary/10 hover:border-accent/50"
                  }`}
                >
                  {r.tipo && <IconoRamo tipo={r.tipo} className={`w-3.5 h-3.5 ${activo ? "text-accent" : "text-primary/50"}`} />}
                  {r.clave ? r.clave.split(" ")[0] : "Todos"}
                  <span className={`text-xs tabular-nums ${activo ? "text-white/70" : "text-primary/40"}`}>{r.n}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-2 flex gap-2">
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
          <Selector etiqueta="Ordenar por" valor={orden} onCambio={(v) => setOrden(v as OrdenCola)} opciones={ORDENES_COLA} ancho="w-36 sm:w-48" />
        </div>

        {pestana === "cerrados" && ganados.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            {ganados.length} {ganados.length === 1 ? "ganado" : "ganados"} en 14 días · <b className="text-primary">{pesos(primaGanada)}</b> en primas
          </p>
        )}

        <section className="mt-3" aria-label={actual.texto}>
          {visibles(pestana).length ? (
            <ListaPaginada key={pestana} leads={visibles(pestana)} render={tarjeta} abrir={abrir} />
          ) : (
            <p className="text-muted text-sm bg-white border border-dashed border-primary/15 rounded-2xl p-5 text-center">
              {busqueda ? "Nada coincide con la búsqueda en esta pestaña." : listas[pestana].length ? "El único lead de aquí es el de arriba." : actual.vacio}
            </p>
          )}
        </section>
      </div>
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
