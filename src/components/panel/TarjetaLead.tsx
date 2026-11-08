"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Phone, ChevronDown, MessageCircleQuestion, History, StickyNote, Trophy, XCircle, FileCheck2, MessageSquareText, RotateCcw } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { actuarSobreLead, registrarVista, type EstadoAccion } from "@/app/panel/cola/acciones";
import { reasignarLead } from "@/app/panel/admin/acciones";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";
import {
  ETIQUETA_ETAPA,
  MOTIVOS_PERDIDA,
  RESULTADOS,
  etiquetaRamo,
  textoMotivo,
  textoResultado,
} from "@/lib/panel/etiquetas";
import { hace } from "@/lib/panel/reglas";
import { nombreCorto, proximaAccion, type Tono } from "@/lib/panel/proxima";
import { useIntento } from "@/components/panel/useIntento";
import Selector from "@/components/panel/Selector";
import Avatar, { IconoRamo } from "@/components/panel/Avatar";
import MensajeWhatsApp from "@/components/panel/MensajeWhatsApp";
import { enlaceWhatsApp, plantillasPara } from "@/lib/panel/mensajes";
import { COLOR_CANAL, canalDe, capturaDe } from "@/lib/panel/origen";
import { INSURERS } from "@/lib/site";

type Modo = null | "contacto" | "cotizado" | "ganado" | "perdido" | "nota";

const COLOR_ETAPA: Record<string, string> = {
  nuevo: "bg-accent/15 text-accent-dark",
  contactado: "bg-sky-100 text-sky-800",
  cotizado: "bg-violet-100 text-violet-800",
  ganado: "bg-green-100 text-green-800",
  perdido: "bg-red-100 text-red-700",
  archivado: "bg-gray-100 text-gray-600",
};

const TEXTO_TONO: Record<Tono, string> = {
  verde: "text-green-700",
  ambar: "text-amber-700",
  rojo: "text-red-600",
  gris: "text-muted",
  azul: "text-sky-700",
};
const BARRA_TONO: Record<Tono, string> = {
  verde: "bg-green-500",
  ambar: "bg-amber-400",
  rojo: "bg-red-500",
  gris: "bg-transparent",
  azul: "bg-sky-400",
};
const COLOR_TONO: Record<Tono, string> = {
  verde: "bg-green-50 text-green-800",
  ambar: "bg-amber-50 text-amber-900",
  rojo: "bg-red-50 text-red-700",
  gris: "bg-gray-100 text-gray-600",
  azul: "bg-sky-50 text-sky-800",
};

const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

const fechaCorta = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
    .format(new Date(iso))
    // Node y el navegador usan espacios distintos ("a. m."): se igualan para hidratar sin error.
    .replace(/\s/g, " ");

const TEXTO_EVENTO: Record<string, string> = {
  creado: "Llegó el lead",
  asignado: "Asignado",
  reasignado: "Reasignado",
  contactado: "Primer contacto",
  resultado: "Nuevo contacto",
  seguimiento: "Seguimiento",
  nota: "Nota",
  cotizado: "Cotizado",
  ganado: "Ganado",
  perdido: "Perdido",
  archivado: "Archivado",
  reabierto: "Reabierto",
  visto: "Vio los datos",
  whatsapp: "Intento de contacto · WhatsApp",
  llamada: "Intento de contacto · llamada",
};

function detalleEvento(e: EventoLead): string {
  const d = e.detalle as Record<string, string | number | undefined>;
  if (e.tipo === "creado") return [etiquetaRamo(String(d.tipo_seguro ?? "")), d.fuente].filter(Boolean).join(" · ");
  if (e.tipo === "asignado") return d.regla === "mismo_cliente" ? "mismo asesor de antes" : "por turno";
  if (e.tipo === "reasignado")
    return d.regla === "sin_atender" ? "automático: nadie lo atendió en 1 h" : d.masivo ? "en bloque" : d.a_nombre ? `a ${d.a_nombre}` : "";
  if (d.resultado) return textoResultado(String(d.resultado));
  if (d.motivo) return textoMotivo(String(d.motivo));
  if (d.prima) return `${pesos(Number(d.prima))} · ${d.aseguradora ?? ""}`;
  if (d.aseguradoras) return String(d.aseguradoras);
  return "";
}

/** Enlace de WhatsApp al cliente con un saludo ya escrito. */
/** Enlace de WhatsApp con el mensaje sugerido para la etapa del lead. */
export function whatsappCliente(lead: LeadCola, asesor: string, eventos: EventoLead[] = []) {
  const cot = eventos.find((e) => e.tipo === "cotizado" && e.detalle?.aseguradoras);
  return enlaceWhatsApp(lead, plantillasPara(lead, asesor, cot ? String(cot.detalle.aseguradoras) : "")[0].texto);
}

export default function TarjetaLead({
  lead,
  eventos,
  ahora,
  verAsesor,
  nombreMiembro,
  solicitudes = 1,
  asesores,
  abrirInicial = false,
  soloDetalle = false,
}: {
  lead: LeadCola;
  eventos: EventoLead[];
  ahora: string;
  verAsesor: boolean;
  nombreMiembro: string;
  /** Cuántas solicitudes hay de este mismo teléfono en la cola. */
  solicitudes?: number;
  /** Solo para el admin: a quién se puede reasignar. */
  asesores?: { id: string; nombre: string }[];
  /** Abrir y mostrar este lead al cargar (enlace desde Telegram). */
  abrirInicial?: boolean;
  /** Solo el detalle, sin la fila (dentro de la tarjeta "Siguiente"). */
  soloDetalle?: boolean;
}) {
  const [expandido, setExpandido] = useState(abrirInicial || soloDetalle);
  const fila = useRef<HTMLElement>(null);
  const { pendiente, medio, intentoIso, intentar, preguntar, marcarRegistrado } = useIntento(lead, eventos);
  const [modo, setModo] = useState<Modo>(null);
  const [verHistorial, setVerHistorial] = useState(false);
  const [verDetalles, setVerDetalles] = useState(soloDetalle);
  // Al guardar bien se cierra el formulario abierto.
  const [estado, accion, enviando] = useActionState(
    async (previo: EstadoAccion, form: FormData) => {
      const r = await actuarSobreLead(previo, form);
      if (r?.ok) {
        setModo(null);
        if (form.get("accion") !== "nota") marcarRegistrado();
      }
      return r;
    },
    undefined
  );

  const abierto = ["nuevo", "contactado", "cotizado"].includes(lead.etapa);
  const detalles = Object.entries(lead.detalles || {});
  const vencido = lead.proximo_seguimiento && new Date(lead.proximo_seguimiento) <= new Date(ahora);
  const canal = canalDe(lead);
  const minutos = Math.round((new Date(ahora).getTime() - new Date(lead.created_at).getTime()) / 60000);
  const chip = "text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap";

  const frase = proximaAccion(lead, new Date(ahora), intentoIso);

  // Enlace directo (Telegram): lleva la vista hasta el lead.
  useEffect(() => {
    if (abrirInicial) fila.current?.scrollIntoView({ block: "center" });
  }, [abrirInicial]);

  const botonModo = (m: Exclude<Modo, null>, Icono: typeof Phone, txt: string) => (
    <button
      type="button"
      onClick={() => setModo(modo === m ? null : m)}
      aria-expanded={modo === m}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
        modo === m ? "bg-primary text-white border-primary" : "border-primary/15 text-primary/80 hover:border-accent/50"
      }`}
    >
      <Icono className="w-4 h-4" />
      {txt}
    </button>
  );

  return (
    <article
      ref={fila}
      id={`lead-${lead.id}`}
      className={`transition-colors scroll-mt-24 ${expandido ? "bg-background/50" : "hover:bg-background/40"} ${abrirInicial ? "ring-2 ring-accent ring-inset" : ""}`}
    >
{soloDetalle ? null : verAsesor ? (
<>
      {/* Fila compacta: al tocarla se abre el detalle */}
      <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3">
        <button
          type="button"
          onClick={() => {
            if (!expandido) registrarVista(lead.id, "visto");
            setExpandido((v) => !v);
          }}
          aria-expanded={expandido}
          className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1.5 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-primary truncate">{lead.nombre}</span>
              {solicitudes > 1 && (
                <span title="Mismo teléfono: es la misma persona" className={`${chip} bg-primary text-white`}>
                  {solicitudes} solicitudes
                </span>
              )}
            </span>
            <span className="block text-sm text-muted truncate">
              {etiquetaRamo(lead.tipo_seguro)}
              {lead.ciudad ? ` · ${lead.ciudad}` : ""}
              {verAsesor && <> · <span className="font-semibold text-primary/70">{lead.asesor_nombre ?? "Sin asignar"}</span></>}
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-1.5 sm:justify-end shrink-0">
            {verAsesor && (
              <span className={`${chip} ${COLOR_CANAL[canal]}`} title={`Llegó por: ${canal} · ${capturaDe(lead.fuente)}`}>{canal}</span>
            )}
            {!pendiente && <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${COLOR_TONO[frase.tono]}`}>{frase.texto}</span>}
            {verAsesor && <span className={`${chip} ${COLOR_ETAPA[lead.etapa]}`}>{ETIQUETA_ETAPA[lead.etapa]}</span>}
            <span className="hidden sm:inline text-xs text-muted w-20 text-right">{hace(minutos)}</span>
          </span>
        </button>
        <a
          href={whatsappCliente(lead, nombreMiembro, eventos)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => intentar("whatsapp")}
          aria-label={`WhatsApp a ${lead.nombre}`}
          title="Abrir WhatsApp"
          className="shrink-0 w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
        <ChevronDown aria-hidden="true" className={`shrink-0 w-5 h-5 text-primary/40 transition-transform ${expandido ? "rotate-180" : ""}`} />
      </div>

</>
) : (
<>
      {/* Bandeja del asesor: iniciales, nombre, qué hacer y cuándo */}
      <div className="relative flex items-center gap-3 px-4 sm:px-5 py-3.5">
        {abierto && frase.tono !== "gris" && (
          <span aria-hidden="true" className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${BARRA_TONO[frase.tono]}`} />
        )}
        <button
          type="button"
          onClick={() => {
            if (!expandido) registrarVista(lead.id, "visto");
            setExpandido((v) => !v);
          }}
          aria-expanded={expandido}
          className="flex-1 min-w-0 flex items-center gap-3 text-left"
        >
          <Avatar nombre={lead.nombre} />
          <span className="flex-1 min-w-0">
            <span className="flex items-baseline justify-between gap-2">
              <span className="font-bold text-primary truncate">{lead.nombre}</span>
              {!pendiente && frase.cuando && (
                <span className={`shrink-0 text-xs font-semibold ${TEXTO_TONO[frase.tono]}`}>{frase.corto}</span>
              )}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-sm min-w-0">
              {solicitudes > 1 && (
                <span title="Mismo teléfono: es la misma persona" className="shrink-0 text-[11px] font-bold px-1.5 rounded bg-primary text-white">
                  ×{solicitudes}
                </span>
              )}
              <span className="text-muted shrink-0 inline-flex items-center gap-1">
                <IconoRamo tipo={lead.tipo_seguro} className="w-3.5 h-3.5" />
                {etiquetaRamo(lead.tipo_seguro).split(" ")[0]}
              </span>
              {!pendiente && (
                <>
                  <span className="text-primary/20" aria-hidden="true">·</span>
                  <span className={`truncate font-medium ${frase.tono === "gris" ? "text-primary/60" : TEXTO_TONO[frase.tono]}`}>{frase.accion}</span>
                </>
              )}
            </span>
          </span>
        </button>
        {abierto && (
          <a
            href={whatsappCliente(lead, nombreMiembro, eventos)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => intentar("whatsapp")}
            aria-label={`WhatsApp a ${lead.nombre}`}
            title="Abrir WhatsApp"
            className="shrink-0 w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-colors shadow-sm shadow-green-900/20"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
          </a>
        )}
      </div>

</>
)}
      {/* Intento sin resultado: queda marcado hasta que lo registren */}
      {pendiente && !soloDetalle && (
        <div className="px-4 sm:px-5 pb-3 -mt-1">
          <div className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 pl-3 pr-2 py-2">
            <MessageCircleQuestion className="w-5 h-5 shrink-0 text-accent-dark" aria-hidden="true" />
            <div className="flex-1 min-w-0 leading-tight">
              <p className="text-sm font-bold text-primary break-words">¿Cómo te fue con {nombreCorto(lead.nombre)}?</p>
              <p className="text-xs text-muted mt-0.5">{frase.texto}</p>
            </div>
            <button
              type="button"
              onClick={() => preguntar(medio)}
              className="shrink-0 bg-primary hover:bg-primary-light text-white text-sm font-bold px-3.5 py-2 rounded-lg transition-colors"
            >
              Registrar
            </button>
          </div>
        </div>
      )}

      {expandido && (
      <div className={`px-4 sm:px-5 pb-5 ${soloDetalle ? "pt-1" : ""}`}>
      {/* Estado del seguimiento */}
      {(lead.resultado_contacto || lead.proximo_seguimiento || lead.etapa === "ganado" || lead.etapa === "perdido") && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {lead.resultado_contacto && abierto && (
            <span className="text-primary/70">Último contacto: <b>{textoResultado(lead.resultado_contacto)}</b></span>
          )}
          {lead.proximo_seguimiento && abierto && (
            <span className={vencido ? "text-red-700 font-semibold" : "text-primary/70"}>
              Seguimiento: {fechaCorta(lead.proximo_seguimiento)}
            </span>
          )}
          {lead.etapa === "ganado" && lead.prima_valor !== null && (
            <span className="text-green-800 font-semibold">
              {pesos(lead.prima_valor)} · {lead.aseguradora_cierre}
            </span>
          )}
          {lead.etapa === "perdido" && <span className="text-red-700">Motivo: {textoMotivo(lead.motivo_perdida)}</span>}
        </div>
      )}
      {lead.nota_seguimiento && abierto && (
        <p className="mt-2 text-sm text-primary/70 bg-background rounded-lg px-3 py-2">“{lead.nota_seguimiento}”</p>
      )}

      {/* Mensaje listo para enviar (en "Siguiente" ya está arriba) */}
      {!soloDetalle && (
      <div className="mt-4 max-w-xl">
        <MensajeWhatsApp lead={lead} eventos={eventos} nombreMiembro={nombreMiembro} onContacto={intentar} />
      </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (!verDetalles) registrarVista(lead.id, "visto");
            setVerDetalles((v) => !v);
          }}
          aria-expanded={verDetalles}
          className="inline-flex items-center gap-1 text-sm text-primary/60 hover:text-primary px-2 py-2"
        >
          Datos
          <ChevronDown className={`w-4 h-4 transition-transform ${verDetalles ? "rotate-180" : ""}`} />
        </button>
      </div>

      {verDetalles && (
        <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm bg-background rounded-xl p-4">
          <Dato k="Llegó" v={`${fechaCorta(lead.created_at)} (${hace(minutos)})`} />
          <Dato k="Formulario" v={lead.estado === "completo" ? "Completo" : "Solo paso 1"} />
          {lead.email && <Dato k="Correo" v={lead.email} />}
          {lead.placa && <Dato k="Placa" v={lead.placa} />}
          {lead.fuente && <Dato k="Fuente" v={lead.fuente} />}
          <Dato k="Origen" v={`${canal} · ${capturaDe(lead.fuente)}`} />
          {lead.utm_campaign && <Dato k="Campaña" v={lead.utm_campaign} />}
          {detalles.map(([k, v]) => <Dato key={k} k={k} v={String(v)} />)}
          {lead.mensaje && <Dato k="Mensaje" v={lead.mensaje} />}
        </dl>
      )}

      {/* Acciones */}
      <div className="mt-4 pt-4 border-t border-primary/10 flex flex-wrap gap-2">
        {abierto && botonModo("contacto", MessageSquareText, "Registrar contacto")}
        {abierto && lead.etapa !== "cotizado" && botonModo("cotizado", FileCheck2, "Cotizado")}
        {abierto && botonModo("ganado", Trophy, "Ganado")}
        {abierto && botonModo("perdido", XCircle, "Perdido")}
        {botonModo("nota", StickyNote, "Nota")}
        {!abierto && lead.etapa !== "ganado" && (
          <form action={accion}>
            <input type="hidden" name="leadId" value={lead.id} />
            <input type="hidden" name="accion" value="reabrir" />
            <button type="submit" disabled={enviando} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border border-primary/15 text-primary/80 hover:border-accent/50">
              <RotateCcw className="w-4 h-4" />
              Volvió a escribir
            </button>
          </form>
        )}
        {asesores && <Reasignar leadId={lead.id} actual={lead.asignado_a} asesores={asesores} />}
        <button
          type="button"
          onClick={() => {
            if (!verHistorial) registrarVista(lead.id, "visto");
            setVerHistorial((v) => !v);
          }}
          aria-expanded={verHistorial}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary/60 hover:text-primary"
        >
          <History className="w-4 h-4" />
          Historial ({eventos.length})
        </button>
      </div>

      {modo && (
        <form
          // Sin action={}: React 19 vaciaría los campos al enviar y, si hay un
          // error, el asesor perdería lo que escribió. Al guardar bien, se cierra.
          onSubmit={(e) => {
            e.preventDefault();
            const datos = new FormData(e.currentTarget);
            startTransition(() => accion(datos));
          }}
          className="mt-4 bg-background rounded-xl p-4 space-y-3"
        >
          <input type="hidden" name="leadId" value={lead.id} />
          <input type="hidden" name="accion" value={modo} />

          {modo === "contacto" && (
            <>
              <fieldset>
                <legend className="text-sm font-semibold text-primary mb-2">¿Cómo te fue?</legend>
                <div className="flex flex-wrap gap-2">
                  {RESULTADOS.map((r) => (
                    <label key={r.valor} className="cursor-pointer">
                      <input type="radio" name="resultado" value={r.valor} className="peer sr-only" required />
                      <span className="inline-block px-3 py-1.5 rounded-full border border-primary/15 text-sm text-primary/80 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                        {r.texto}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold text-primary mb-2">¿Cuándo lo vuelves a contactar?</legend>
                <div className="flex flex-wrap items-center gap-2">
                  {[["", "Automático"], ["manana", "Mañana"], ["3d", "En 3 días"], ["7d", "En una semana"]].map(([v, t]) => (
                    <label key={v} className="cursor-pointer">
                      <input type="radio" name="seguimiento" value={v} defaultChecked={v === ""} className="peer sr-only" />
                      <span className="inline-block px-3 py-1.5 rounded-full border border-primary/15 text-sm text-primary/80 peer-checked:bg-accent peer-checked:text-primary peer-checked:border-accent">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {modo === "cotizado" && (
            <ElegirAseguradoras />
          )}

          {modo === "ganado" && (
            <div className="grid sm:grid-cols-2 gap-3">
              <Campo label="Valor de la prima (COP)" name="prima" placeholder="1.850.000" inputMode="numeric" required />
              <ElegirAseguradora />
            </div>
          )}

          {modo === "perdido" && (
            <fieldset>
              <legend className="text-sm font-semibold text-primary mb-2">¿Por qué se perdió?</legend>
              <div className="flex flex-wrap gap-2">
                {MOTIVOS_PERDIDA.map((m) => (
                  <label key={m.valor} className="cursor-pointer">
                    <input type="radio" name="motivo" value={m.valor} className="peer sr-only" required />
                    <span className="inline-block px-3 py-1.5 rounded-full border border-primary/15 text-sm text-primary/80 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600">
                      {m.texto}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div>
            <label htmlFor={`nota-${lead.id}-${modo}`} className="block text-sm font-semibold text-primary mb-1.5">
              {modo === "nota" ? "Nota" : "Nota (opcional)"}
            </label>
            <textarea
              id={`nota-${lead.id}-${modo}`}
              name="nota"
              rows={2}
              required={modo === "nota"}
              maxLength={1000}
              className="w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 text-[15px] resize-none"
            />
          </div>

          {estado?.error && <p role="alert" className="text-sm text-red-700">{estado.error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={enviando} className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-5 py-2.5 rounded-lg disabled:opacity-60">
              {enviando ? "Guardando…" : "Guardar"}
            </button>
            <button type="button" onClick={() => setModo(null)} className="text-sm text-primary/60 hover:text-primary px-3">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {verHistorial && (
        <ol className="mt-4 border-l-2 border-accent/30 pl-4 space-y-3">
          {eventos.map((e) => (
            <li key={e.id} className="text-sm">
              <p className="text-primary">
                <b>{TEXTO_EVENTO[e.tipo] ?? e.tipo}</b>
                {detalleEvento(e) && <span className="text-primary/70"> · {detalleEvento(e)}</span>}
              </p>
              <p className="text-xs text-muted">
                {fechaCorta(e.created_at)}
                {e.asesor_nombre ? ` · ${e.asesor_nombre}` : ""}
              </p>
              {e.nota && <p className="text-primary/70 mt-0.5">“{e.nota}”</p>}
            </li>
          ))}
        </ol>
      )}
      </div>
      )}
    </article>
  );
}

function Dato({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2 min-w-0">
      <dt className="text-muted shrink-0">{k}:</dt>
      <dd className="text-primary font-medium break-words min-w-0">{v}</dd>
    </div>
  );
}

function Campo({
  label,
  name,
  ...props
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-1.5">
        {label}
        <input
          name={name}
          {...props}
          className="mt-1.5 w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 text-[15px]"
        />
      </label>
    </div>
  );
}

/** Ganado: una sola aseguradora, de la lista o escrita a mano. */
function ElegirAseguradora() {
  const [valor, setValor] = useState("");
  return (
    <div>
      <span className="block text-sm font-semibold text-primary mb-1.5">Aseguradora</span>
      <Selector
        name="aseguradora"
        etiqueta="Aseguradora"
        valor={valor}
        onCambio={setValor}
        placeholder="Elige la aseguradora"
        opciones={[...INSURERS.map((a) => ({ valor: a, texto: a })), { valor: "otra", texto: "Otra…" }]}
      />
      {valor === "otra" && (
        <input
          name="aseguradora_otra"
          required
          maxLength={80}
          autoFocus
          aria-label="Nombre de la aseguradora"
          placeholder="Nombre de la aseguradora"
          className="mt-2 w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 text-[15px]"
        />
      )}
    </div>
  );
}

/** Cotizado: varias aseguradoras, se marcan tocándolas. */
function ElegirAseguradoras() {
  const [otra, setOtra] = useState(false);
  const pastilla =
    "inline-block px-3 py-1.5 rounded-full border border-primary/15 bg-white text-sm text-primary/80 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent";
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-primary mb-2">¿Qué aseguradoras le cotizaste? (opcional)</legend>
      <div className="flex flex-wrap gap-2">
        {INSURERS.map((a) => (
          <label key={a} className="cursor-pointer">
            <input type="checkbox" name="aseguradora_item" value={a} className="peer sr-only" />
            <span className={pastilla}>{a}</span>
          </label>
        ))}
        <label className="cursor-pointer">
          <input type="checkbox" checked={otra} onChange={(e) => setOtra(e.target.checked)} className="peer sr-only" />
          <span className={pastilla}>Otra…</span>
        </label>
      </div>
      {otra && (
        <input
          name="aseguradora_otra"
          maxLength={80}
          autoFocus
          aria-label="Otra aseguradora"
          placeholder="Nombre de la otra aseguradora"
          className="mt-2 w-full sm:w-80 px-3 py-2 rounded-lg border border-primary/15 bg-white text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 text-[15px]"
        />
      )}
    </fieldset>
  );
}

/** Selector de asesor para el admin. Se guarda al elegir. */
function Reasignar({
  leadId,
  actual,
  asesores,
}: {
  leadId: string;
  actual: string | null;
  asesores: { id: string; nombre: string }[];
}) {
  const [estado, accion, enviando] = useActionState(reasignarLead, undefined);
  const [valor, setValor] = useState(actual ?? "");
  return (
    <div className="inline-flex items-center gap-2">
      <Selector
        etiqueta="Reasignar a"
        valor={valor}
        placeholder="Sin asignar"
        ancho="w-44"
        deshabilitado={enviando}
        opciones={asesores.map((a) => ({ valor: a.id, texto: a.nombre }))}
        onCambio={(v) => {
          setValor(v);
          const f = new FormData();
          f.set("leadId", leadId);
          f.set("asesorId", v);
          startTransition(() => accion(f));
        }}
      />
      {estado?.error && <span role="alert" className="text-xs text-red-700">{estado.error}</span>}
      {estado?.ok && <span className="text-xs text-green-700">{estado.ok}</span>}
    </div>
  );
}
