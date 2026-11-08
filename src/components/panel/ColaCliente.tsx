"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import TarjetaLead from "@/components/panel/TarjetaLead";
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

export default function ColaCliente({
  leads,
  eventos,
  ahora,
  esAdmin,
  nombreMiembro,
}: {
  leads: LeadCola[];
  eventos: Record<string, EventoLead[]>;
  ahora: string;
  esAdmin: boolean;
  nombreMiembro: string;
}) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

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
    return { paraHoy, nuevos, enCurso, cerrados };
  }, [leads, busqueda, ahora]);

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

  const tarjeta = (l: LeadCola) => (
    <TarjetaLead
      key={l.id}
      lead={l}
      eventos={eventos[l.id] ?? []}
      ahora={ahora}
      verAsesor={esAdmin}
      nombreMiembro={nombreMiembro}
      solicitudes={solicitudes[l.telefono.replace(/\D/g, "").slice(-10)] ?? 1}
    />
  );

  return (
    <div>
      {/* Resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Contador valor={grupos.nuevos.length} texto="Nuevos sin contactar" destacado={grupos.nuevos.length > 0} />
        <Contador valor={grupos.paraHoy.length} texto="Seguimientos para hoy" />
        <Contador valor={grupos.enCurso.length} texto="En curso" />
        <Contador valor={ganados.length} texto={ganados.length ? `Ganados · ${pesos(primaGanada)}` : "Ganados (14 días)"} />
      </div>

      <label className="mt-6 flex items-center gap-2 bg-white border border-primary/10 rounded-xl px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
        <Search className="w-4 h-4 text-primary/40" aria-hidden="true" />
        <span className="sr-only">Buscar</span>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, teléfono, ramo o placa"
          className="flex-1 bg-transparent outline-none text-primary placeholder-primary/35 text-[15px]"
        />
      </label>

      <Seccion titulo="Para hoy" vacio="No tienes seguimientos para hoy." leads={grupos.paraHoy} render={tarjeta} />
      <Seccion titulo="Nuevos" vacio="No hay leads nuevos. Cuando llegue uno te avisamos por Telegram." leads={grupos.nuevos} render={tarjeta} />
      <Seccion titulo="En curso" vacio="Nada en curso." leads={grupos.enCurso} render={tarjeta} />

      {grupos.cerrados.length > 0 && (
        <details className="mt-10 group">
          <summary className="cursor-pointer text-primary font-bold text-lg list-none flex items-center gap-2">
            Cerrados en los últimos 14 días ({grupos.cerrados.length})
            <span className="text-primary/40 text-sm font-normal group-open:hidden">Mostrar</span>
          </summary>
          <div className="mt-4 space-y-3">{grupos.cerrados.map(tarjeta)}</div>
        </details>
      )}
    </div>
  );
}

function Contador({ valor, texto, destacado = false }: { valor: number; texto: string; destacado?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 border ${destacado ? "bg-primary text-white border-primary" : "bg-white border-primary/10"}`}>
      <p className={`text-3xl font-bold ${destacado ? "text-accent" : "text-primary"}`}>{valor}</p>
      <p className={`text-sm mt-0.5 ${destacado ? "text-white/70" : "text-muted"}`}>{texto}</p>
    </div>
  );
}

function Seccion({
  titulo,
  vacio,
  leads,
  render,
}: {
  titulo: string;
  vacio: string;
  leads: LeadCola[];
  render: (l: LeadCola) => React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-primary font-bold text-lg mb-4">
        {titulo} <span className="text-primary/40 font-normal">({leads.length})</span>
      </h2>
      {leads.length ? (
        <div className="space-y-3">{leads.map(render)}</div>
      ) : (
        <p className="text-muted text-sm bg-white border border-dashed border-primary/15 rounded-2xl p-5">{vacio}</p>
      )}
    </section>
  );
}
