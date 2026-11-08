"use client";

import { useState } from "react";
import { MessageCircleQuestion, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Avatar, { IconoRamo } from "@/components/panel/Avatar";
import TarjetaLead, { whatsappCliente } from "@/components/panel/TarjetaLead";
import { useIntento } from "@/components/panel/useIntento";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import { etiquetaRamo } from "@/lib/panel/etiquetas";
import { nombreCorto, proximaAccion, type Tono } from "@/lib/panel/proxima";

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
  const tel = lead.telefono.replace(/\D/g, "").slice(-10);
  // Lo que ayuda a cotizar, en una línea: placa, ciudad o lo que escribió.
  const extra = [lead.placa ? `Placa ${lead.placa}` : "", lead.ciudad ?? ""].filter(Boolean).join(" · ");

  return (
    <section aria-label="Siguiente lead" className="relative bg-white rounded-3xl border border-accent/30 shadow-xl shadow-primary/10 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-accent" aria-hidden="true" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-dark">Siguiente</p>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${PILDORA[frase.tono]}`}>{frase.texto}</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Avatar nombre={lead.nombre} grande />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-primary leading-tight break-words">{lead.nombre}</h2>
            <p className="text-sm text-muted mt-0.5">
              <IconoRamo tipo={lead.tipo_seguro} className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
              Seguro de {etiquetaRamo(lead.tipo_seguro).toLowerCase()}
              {extra && <> · {extra}</>}
            </p>
          </div>
        </div>

        {lead.mensaje && (
          <p className="mt-4 text-sm text-primary/80 bg-background rounded-xl px-3.5 py-2.5 line-clamp-2">“{lead.mensaje}”</p>
        )}
        {!lead.mensaje && lead.nota_seguimiento && (
          <p className="mt-4 text-sm text-primary/80 bg-background rounded-xl px-3.5 py-2.5 line-clamp-2">Tu nota: “{lead.nota_seguimiento}”</p>
        )}

        {pendiente ? (
          <button
            type="button"
            onClick={() => preguntar()}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-2xl transition-colors"
          >
            <MessageCircleQuestion className="w-5 h-5 text-accent" />
            ¿Cómo te fue con {nombreCorto(lead.nombre)}?
          </button>
        ) : (
          <div className="mt-5 flex gap-2">
            <a
              href={whatsappCliente(lead, nombreMiembro)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => intentar("whatsapp")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md shadow-green-900/15"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
            <a
              href={`tel:+57${tel}`}
              onClick={() => intentar("llamada")}
              aria-label={`Llamar a ${lead.nombre}`}
              title={lead.telefono}
              className="shrink-0 w-14 inline-flex items-center justify-center rounded-2xl border-2 border-primary/10 text-primary hover:border-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        )}

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
