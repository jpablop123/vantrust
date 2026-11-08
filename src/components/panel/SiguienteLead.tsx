"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import MensajeWhatsApp from "@/components/panel/MensajeWhatsApp";
import Avatar, { IconoRamo } from "@/components/panel/Avatar";
import TarjetaLead from "@/components/panel/TarjetaLead";
import { useIntento } from "@/components/panel/useIntento";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import { etiquetaRamo } from "@/lib/panel/etiquetas";
import { nombreCorto, proximaAccion, type Tono } from "@/lib/panel/proxima";
import { datosParaCotizar } from "@/lib/panel/mensajes";

const PILDORA: Record<Tono, string> = {
  verde: "bg-green-50 text-green-800",
  ambar: "bg-amber-50 text-amber-900",
  rojo: "bg-red-50 text-red-700",
  gris: "bg-gray-100 text-gray-600",
  azul: "bg-sky-50 text-sky-800",
};

/** El lead que toca atender ahora, en grande y con un solo botón. */
export default function SiguienteLead({
  lead,
  eventos,
  ahora,
  nombreMiembro,
}: {
  lead: LeadCola;
  eventos: EventoLead[];
  ahora: string;
  nombreMiembro: string;
}) {
  const [verTodo, setVerTodo] = useState(false);
  const { pendiente, intentoIso, intentar, preguntar } = useIntento(lead, eventos);
  const frase = proximaAccion(lead, new Date(ahora), intentoIso);
  const datos = datosParaCotizar(lead).filter((d) => d.k !== "Correo");

  return (
    // Sin overflow-hidden: el selector de mensaje despliega por fuera.
    <section aria-label="Siguiente lead" className="relative bg-white rounded-3xl border border-accent/30 shadow-xl shadow-primary/10">
      <div className="h-1 rounded-t-3xl bg-gradient-to-r from-accent via-accent-light to-accent" aria-hidden="true" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-dark">Siguiente</p>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${PILDORA[frase.tono]}`}>{frase.texto}</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Avatar nombre={lead.nombre} grande />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-primary leading-tight break-words">{lead.nombre}</h2>
            <p className="text-sm text-muted mt-0.5 inline-flex items-center gap-1.5">
              <IconoRamo tipo={lead.tipo_seguro} className="w-3.5 h-3.5" />
              Seguro de {etiquetaRamo(lead.tipo_seguro).toLowerCase()}
            </p>
          </div>
        </div>

        {/* Lo que dejó el cliente: a la vista para cotizar sin abrir nada */}
        {(datos.length > 0 || lead.mensaje) && (
          <div className="mt-4 rounded-2xl bg-background px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary/40">Para cotizar</p>
            {datos.length > 0 && (
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                {datos.slice(0, 8).map((d) => (
                  <div key={d.k} className="min-w-0">
                    <dt className="text-[11px] text-muted truncate">{d.k}</dt>
                    <dd className="text-sm font-semibold text-primary break-words">{d.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {lead.mensaje && <p className="mt-2 text-sm text-primary/80 italic">“{lead.mensaje}”</p>}
          </div>
        )}
        {lead.nota_seguimiento && (
          <p className="mt-3 text-sm text-primary/80 bg-accent/10 rounded-xl px-3.5 py-2.5">Tu nota: “{lead.nota_seguimiento}”</p>
        )}

        <div className="mt-5">
          {pendiente ? (
            <button
              type="button"
              onClick={() => preguntar()}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-2xl transition-colors"
            >
              <MessageCircleQuestion className="w-5 h-5 text-accent" />
              ¿Cómo te fue con {nombreCorto(lead.nombre)}?
            </button>
          ) : (
            <MensajeWhatsApp lead={lead} eventos={eventos} nombreMiembro={nombreMiembro} onContacto={intentar} grande />
          )}
        </div>

        <button
          type="button"
          onClick={() => setVerTodo((v) => !v)}
          aria-expanded={verTodo}
          className="mt-3 w-full text-center text-sm font-semibold text-primary/50 hover:text-primary py-1"
        >
          {verTodo ? "Ocultar detalle" : "Ver datos y acciones"}
        </button>
      </div>
      {verTodo && (
        <div className="border-t border-primary/10">
          <TarjetaLead lead={lead} eventos={eventos} ahora={ahora} verAsesor={false} nombreMiembro={nombreMiembro} soloDetalle />
        </div>
      )}
    </section>
  );
}
