"use client";

import { useState } from "react";
import { Pencil, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Selector from "@/components/panel/Selector";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import { enlaceWhatsApp, plantillasPara } from "@/lib/panel/mensajes";

/** Aseguradoras de la última cotización registrada, si hay. */
function aseguradorasCotizadas(eventos: EventoLead[]): string {
  const e = eventos.find((x) => x.tipo === "cotizado" && x.detalle?.aseguradoras);
  return e ? String(e.detalle.aseguradoras) : "";
}

/**
 * Mensaje de WhatsApp listo para enviar: plantilla sugerida según la etapa,
 * vista previa como burbuja y edición antes de abrir WhatsApp.
 */
export default function MensajeWhatsApp({
  lead,
  eventos,
  nombreMiembro,
  onContacto,
  grande = false,
}: {
  lead: LeadCola;
  eventos: EventoLead[];
  nombreMiembro: string;
  /** Se llama al abrir WhatsApp o llamar (registra el intento). */
  onContacto: (medio: "whatsapp" | "llamada") => void;
  grande?: boolean;
}) {
  const plantillas = plantillasPara(lead, nombreMiembro, aseguradorasCotizadas(eventos));
  const [clave, setClave] = useState(plantillas[0].clave);
  const [texto, setTexto] = useState(plantillas[0].texto);
  const [editando, setEditando] = useState(false);
  const tel = lead.telefono.replace(/\D/g, "").slice(-10);
  // Si la plantilla trae espacios para llenar ("1. "), se abre en edición.
  const incompleta = /^\d\.\s*$/m.test(texto);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Selector
          etiqueta="Mensaje"
          valor={clave}
          ancho="w-auto min-w-0 max-w-[70%]"
          opciones={plantillas.map((p, i) => ({ valor: p.clave, texto: p.titulo, nota: i === 0 ? "sugerido" : undefined }))}
          onCambio={(v) => {
            const p = plantillas.find((x) => x.clave === v)!;
            setClave(v);
            setTexto(p.texto);
            setEditando(/^\d\.\s*$/m.test(p.texto));
          }}
        />
        <button
          type="button"
          onClick={() => setEditando((v) => !v)}
          aria-pressed={editando}
          className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary/60 hover:text-primary px-2 py-1.5"
        >
          <Pencil className="w-3.5 h-3.5" />
          {editando ? "Listo" : "Editar"}
        </button>
      </div>

      {editando ? (
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={6}
          aria-label="Texto del mensaje"
          className="mt-2 w-full px-3.5 py-3 rounded-2xl border border-green-600/30 bg-[#effae8] text-primary text-[15px] leading-snug outline-none focus:ring-2 focus:ring-green-600/30 resize-y"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditando(true)}
          title="Toca para editar"
          className="mt-2 w-full text-left px-3.5 py-3 rounded-2xl rounded-tr-md bg-[#effae8] border border-green-600/15 text-primary text-[14px] leading-snug whitespace-pre-line"
        >
          {texto}
        </button>
      )}
      {incompleta && <p className="mt-1 text-xs text-amber-700">Completa las opciones antes de enviar.</p>}

      <div className="mt-3 flex gap-2">
        <a
          href={enlaceWhatsApp(lead, texto)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onContacto("whatsapp")}
          className={`flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold transition-colors shadow-md shadow-green-900/15 ${
            grande ? "py-3.5 rounded-2xl" : "py-2.5 rounded-xl text-sm"
          }`}
        >
          <WhatsAppIcon className={grande ? "w-5 h-5" : "w-4 h-4"} />
          Enviar por WhatsApp
        </a>
        <a
          href={`tel:+57${tel}`}
          onClick={() => onContacto("llamada")}
          aria-label={`Llamar a ${lead.nombre} (${lead.telefono})`}
          title={lead.telefono}
          className={`shrink-0 inline-flex items-center justify-center border-2 border-primary/10 text-primary hover:border-accent transition-colors ${
            grande ? "w-14 rounded-2xl" : "w-11 rounded-xl"
          }`}
        >
          <Phone className={grande ? "w-5 h-5" : "w-4 h-4"} />
        </a>
      </div>
    </div>
  );
}
