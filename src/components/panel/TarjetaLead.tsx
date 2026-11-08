"use client";

import { useActionState, useState } from "react";
import { Phone, ChevronDown, History, StickyNote, Trophy, XCircle, FileCheck2, MessageSquareText, RotateCcw } from "lucide-react";
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
import { hace, urgenciaNuevo } from "@/lib/panel/reglas";

type Modo = null | "contacto" | "cotizado" | "ganado" | "renovacion" | "perdido" | "nota";

const COLOR_ETAPA: Record<string, string> = {
  nuevo: "bg-accent/15 text-accent-dark",
  contactado: "bg-sky-100 text-sky-800",
  cotizado: "bg-violet-100 text-violet-800",
  ganado: "bg-green-100 text-green-800",
  perdido: "bg-red-100 text-red-700",
  archivado: "bg-gray-100 text-gray-600",
};

const COLOR_URGENCIA = {
  reciente: "bg-green-100 text-green-800",
  atender: "bg-amber-100 text-amber-800",
  urgente: "bg-red-100 text-red-700 animate-pulse",
  frio: "bg-gray-100 text-gray-600",
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
  }).format(new Date(iso));

const TEXTO_EVENTO: Record<string, string> = {
  creado: "Llegó el lead",
  asignado: "Asignado",
  reasignado: "Reasignado",
  contactado: "Primer contacto",
  resultado: "Nuevo contacto",
  seguimiento: "Seguimiento",
  nota: "Nota",
  cotizado: "Cotizado",
  ganado: "Vendido",
  perdido: "Perdido",
  archivado: "Archivado",
  reabierto: "Reabierto",
  renovado: "Renovó la póliza",
  visto: "Vio los datos",
  whatsapp: "Abrió WhatsApp",
  llamada: "Llamó",
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
function whatsappCliente(lead: LeadCola, asesor: string) {
  const tel = lead.telefono.replace(/\D/g, "").slice(-10);
  const saludo = `Hola ${lead.nombre.split(" ")[0]}, te habla ${asesor.split(" ")[0]} de VanTrust. Recibimos tu solicitud de seguro de ${etiquetaRamo(lead.tipo_seguro).toLowerCase()} y quiero ayudarte a comparar opciones. ¿Tienes un momento?`;
  return `https://wa.me/57${tel}?text=${encodeURIComponent(saludo)}`;
}

export default function TarjetaLead({
  lead,
  eventos,
  ahora,
  verAsesor,
  nombreMiembro,
  solicitudes = 1,
  asesores,
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
}) {
  const [modo, setModo] = useState<Modo>(null);
  const [verHistorial, setVerHistorial] = useState(false);
  const [verDetalles, setVerDetalles] = useState(false);
  // Al guardar bien se cierra el formulario abierto.
  const [estado, accion, enviando] = useActionState(
    async (previo: EstadoAccion, form: FormData) => {
      const r = await actuarSobreLead(previo, form);
      if (r?.ok) setModo(null);
      return r;
    },
    undefined
  );

  const abierto = ["nuevo", "contactado", "cotizado"].includes(lead.etapa);
  const urgencia = lead.etapa === "nuevo" ? urgenciaNuevo(new Date(lead.created_at), new Date(ahora)) : null;
  const detalles = Object.entries(lead.detalles || {});
  const vencido = lead.proximo_seguimiento && new Date(lead.proximo_seguimiento) <= new Date(ahora);

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
    <article className="bg-white rounded-2xl border border-primary/10 p-4 sm:p-5">
      {/* Encabezado */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-primary text-lg leading-tight">{lead.nombre}</h3>
          <p className="text-sm text-muted mt-0.5">
            {etiquetaRamo(lead.tipo_seguro)}
            {lead.ciudad ? ` · ${lead.ciudad}` : ""}
            {verAsesor && <> · <span className="font-semibold text-primary/70">{lead.asesor_nombre ?? "Sin asignar"}</span></>}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {solicitudes > 1 && (
            <span
              title="Mismo teléfono: es la misma persona"
              className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-white"
            >
              {solicitudes} solicitudes
            </span>
          )}
          {urgencia && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${COLOR_URGENCIA[urgencia.nivel]}`}>
              Sin contactar · {hace(urgencia.minutos)}
            </span>
          )}
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${COLOR_ETAPA[lead.etapa]}`}>
            {ETIQUETA_ETAPA[lead.etapa]}
          </span>
        </div>
      </div>

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

      {/* Contacto directo */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          href={whatsappCliente(lead, nombreMiembro)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarVista(lead.id, "whatsapp")}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href={`tel:+57${lead.telefono.replace(/\D/g, "").slice(-10)}`}
          onClick={() => registrarVista(lead.id, "llamada")}
          className="inline-flex items-center gap-2 border border-primary/15 hover:border-accent/50 text-primary font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4" />
          {lead.telefono}
        </a>
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
          <Dato k="Llegó" v={`${fechaCorta(lead.created_at)} (${hace(Math.round((new Date(ahora).getTime() - new Date(lead.created_at).getTime()) / 60000))})`} />
          <Dato k="Formulario" v={lead.estado === "completo" ? "Completo" : "Solo paso 1"} />
          {lead.email && <Dato k="Correo" v={lead.email} />}
          {lead.placa && <Dato k="Placa" v={lead.placa} />}
          {lead.fuente && <Dato k="Fuente" v={lead.fuente} />}
          {lead.utm_campaign && <Dato k="Campaña" v={lead.utm_campaign} />}
          {detalles.map(([k, v]) => <Dato key={k} k={k} v={String(v)} />)}
          {lead.mensaje && <Dato k="Mensaje" v={lead.mensaje} />}
        </dl>
      )}

      {/* Acciones */}
      <div className="mt-4 pt-4 border-t border-primary/10 flex flex-wrap gap-2">
        {abierto && botonModo("contacto", MessageSquareText, "Registrar contacto")}
        {abierto && lead.etapa !== "cotizado" && botonModo("cotizado", FileCheck2, "Cotizado")}
        {abierto && botonModo("ganado", Trophy, "Vendido")}
        {lead.etapa === "ganado" && botonModo("renovacion", RotateCcw, "Registrar renovación")}
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
        <form action={accion} className="mt-4 bg-background rounded-xl p-4 space-y-3">
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
            <Campo label="¿Qué aseguradoras le cotizaste? (opcional)" name="aseguradoras" placeholder="Ej: Sura, Bolívar y AXA" />
          )}

          {(modo === "ganado" || modo === "renovacion") && (
            <div className="grid sm:grid-cols-2 gap-3">
              <Campo label="Valor de la prima (COP)" name="prima" placeholder="1.850.000" inputMode="numeric" required />
              <Campo label="Aseguradora" name="aseguradora" placeholder="Ej: Sura" required />
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
  return (
    <form action={accion} className="inline-flex items-center gap-2">
      <input type="hidden" name="leadId" value={leadId} />
      <label className="sr-only" htmlFor={`reasignar-${leadId}`}>Reasignar a</label>
      <select
        id={`reasignar-${leadId}`}
        name="asesorId"
        defaultValue={actual ?? ""}
        disabled={enviando}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary/80 outline-none focus:border-accent"
      >
        <option value="" disabled>Sin asignar</option>
        {asesores.map((a) => (
          <option key={a.id} value={a.id}>{a.nombre}</option>
        ))}
      </select>
      {estado?.error && <span role="alert" className="text-xs text-red-700">{estado.error}</span>}
      {estado?.ok && <span className="text-xs text-green-700">{estado.ok}</span>}
    </form>
  );
}
