"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import SelectDropdown from "@/components/cotizador/SelectDropdown";
import { crearLead } from "@/lib/leads-client";
import { trackInicioCotizacion } from "@/lib/tracking";
import { EVENTO_PLACA, tomarPlacaPendiente } from "@/lib/placa-pendiente";
import {
  CELULAR_ERROR,
  celularValido,
  normalizarCelular,
  normalizarPlaca,
  placaValida,
} from "@/lib/validacion";

// Paso 1 de todo formulario: lo mínimo para poder llamar a alguien. El lead se
// crea aquí ("parcial"); los datos del ramo vienen después y son opcionales.

/** Ramos que se pueden elegir cuando el formulario no tiene uno fijo. */
export const RAMOS_ELEGIBLES: { value: string; label: string }[] = [
  { value: "vehiculo", label: "Automóvil" },
  { value: "cumplimiento", label: "Póliza de cumplimiento (licitaciones)" },
  { value: "pyme", label: "Seguro para mi empresa (pyme)" },
  { value: "salud", label: "Salud" },
  { value: "hogar", label: "Hogar" },
  { value: "vida", label: "Vida" },
  { value: "otro", label: "Otro / no estoy seguro" },
];

export interface LeadCreado {
  id: string;
  nombre: string;
  telefono: string;
  tipoSeguro: string;
  placa: string;
}

const NOMBRE_RE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'’.-]+$/;

function nombreError(v: string): string | null {
  const t = v.trim();
  if (!t) return "Escribe tu nombre";
  if (t.length < 3 || !NOMBRE_RE.test(t)) return "Escribe tu nombre (solo letras)";
  return null;
}

export default function PasoContacto({
  tipoSeguro,
  fuente,
  conPlaca = false,
  submitLabel = "Quiero mi cotización",
  onCreado,
}: {
  /** Ramo fijo. Si no se pasa, la persona lo elige en un selector. */
  tipoSeguro?: string;
  fuente: string;
  /** Para autos: la placa es la entrada principal ("Escribe tu placa"). */
  conPlaca?: boolean;
  submitLabel?: string;
  onCreado: (lead: LeadCreado) => void;
}) {
  const uid = useId();
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  // La placa puede venir del campo del hero (ver lib/placa-pendiente).
  const [placa, setPlaca] = useState(() => (conPlaca ? tomarPlacaPendiente() : ""));
  const [ramo, setRamo] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [intentado, setIntentado] = useState(false);
  const [tocado, setTocado] = useState<Record<string, boolean>>({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  useEffect(() => {
    if (!conPlaca) return;
    const onPlaca = (e: Event) => {
      tomarPlacaPendiente();
      setPlaca(normalizarPlaca(String((e as CustomEvent).detail || "")));
      // Lo siguiente que falta es el nombre: el cursor queda ahí.
      document.getElementById(`${uid}-nombre`)?.focus({ preventScroll: true });
    };
    window.addEventListener(EVENTO_PLACA, onPlaca);
    return () => window.removeEventListener(EVENTO_PLACA, onPlaca);
  }, [conPlaca, uid]);

  const ramoFinal = tipoSeguro ?? ramo;

  const errores: Record<string, string | null> = {
    nombre: nombreError(nombre),
    celular: celularValido(celular) ? null : CELULAR_ERROR,
    // La placa ayuda pero no es obligatoria: muchos no la tienen a mano.
    placa: conPlaca && placa && !placaValida(placa) ? "Placa no válida (ej: ABC123)" : null,
    ramo: tipoSeguro || ramo ? null : "Elige qué quieres asegurar",
    autoriza: autoriza ? null : "Necesitamos tu autorización para contactarte",
  };
  const ver = (k: string) => (intentado || tocado[k] ? errores[k] : null);
  const tocar = (k: string) => setTocado((p) => ({ ...p, [k]: true }));
  const valido = Object.values(errores).every((e) => !e);

  const empezar = () => trackInicioCotizacion(ramoFinal || "sin_ramo", fuente);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!valido) {
      setIntentado(true);
      return;
    }
    setEnviando(true);
    setErrorEnvio("");
    const lead = {
      nombre: nombre.trim().replace(/\s+/g, " "),
      telefono: normalizarCelular(celular),
      tipoSeguro: ramoFinal,
      placa: conPlaca ? normalizarPlaca(placa) : "",
      fuente,
    };
    const r = await crearLead(lead, { autorizacion: autoriza });
    setEnviando(false);
    if (!r.ok) {
      setErrorEnvio(r.error);
      return;
    }
    onCreado({ id: r.id, ...lead });
  };

  const inputCls = (err: string | null | undefined) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white/[0.07] text-white placeholder-white/30 outline-none focus:bg-white/[0.1] transition-all text-[16px] ${
      err
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/25"
        : "border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/25"
    }`;
  const labelCls = "block text-[13px] font-medium text-white/55 mb-1.5";
  const errCls = "mt-1.5 text-[12px] text-red-400 leading-snug";

  return (
    <form onSubmit={enviar} onFocusCapture={empezar} noValidate className="space-y-4">
      {errorEnvio && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
          <p className="text-red-400 text-sm font-medium">{errorEnvio}</p>
        </div>
      )}

      {conPlaca && (
        <div>
          <label htmlFor={`${uid}-placa`} className={labelCls}>
            Escribe tu placa y te cotizamos{" "}
            <span className="text-white/35">(opcional)</span>
          </label>
          <input
            id={`${uid}-placa`}
            value={placa}
            onChange={(e) => setPlaca(normalizarPlaca(e.target.value))}
            onBlur={() => tocar("placa")}
            placeholder="ABC123"
            autoCapitalize="characters"
            autoComplete="off"
            className={`${inputCls(ver("placa"))} uppercase tracking-[0.25em] font-semibold text-center text-xl`}
          />
          {ver("placa") && <p className={errCls}>{ver("placa")}</p>}
        </div>
      )}

      {!tipoSeguro && (
        <div>
          <label htmlFor={`${uid}-ramo`} className={labelCls}>
            ¿Qué quieres asegurar? <span className="text-accent">*</span>
          </label>
          <SelectDropdown
            id={`${uid}-ramo`}
            value={RAMOS_ELEGIBLES.find((r) => r.value === ramo)?.label || ""}
            onChange={(label) => {
              setRamo(RAMOS_ELEGIBLES.find((r) => r.label === label)?.value || "");
              tocar("ramo");
            }}
            options={RAMOS_ELEGIBLES.map((r) => r.label)}
            placeholder="Selecciona…"
            invalid={!!ver("ramo")}
          />
          {ver("ramo") && <p className={errCls}>{ver("ramo")}</p>}
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-nombre`} className={labelCls}>
          Tu nombre <span className="text-accent">*</span>
        </label>
        <input
          id={`${uid}-nombre`}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onBlur={() => tocar("nombre")}
          autoComplete="name"
          placeholder="Nombre y apellido"
          aria-invalid={!!ver("nombre")}
          className={inputCls(ver("nombre"))}
        />
        {ver("nombre") && <p className={errCls}>{ver("nombre")}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-celular`} className={labelCls}>
          Tu WhatsApp <span className="text-accent">*</span>
        </label>
        <input
          id={`${uid}-celular`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={celular}
          onChange={(e) => setCelular(normalizarCelular(e.target.value))}
          onBlur={() => tocar("celular")}
          placeholder="3001234567"
          aria-invalid={!!ver("celular")}
          className={inputCls(ver("celular"))}
        />
        {ver("celular") && <p className={errCls}>{ver("celular")}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoriza}
            onChange={(e) => setAutoriza(e.target.checked)}
            className="mt-0.5 w-5 h-5 shrink-0 accent-[#BFA15C] cursor-pointer"
            aria-invalid={!!ver("autoriza")}
          />
          <span className="text-[12.5px] text-white/60 leading-relaxed">
            Autorizo a Vantrust Agencia de Seguros LTDA. a tratar mis datos
            personales para contactarme y cotizar seguros, según su{" "}
            <Link
              href="/politica-privacidad"
              target="_blank"
              className="text-accent underline underline-offset-2 hover:text-accent-light"
            >
              Política de Tratamiento de Datos
            </Link>{" "}
            (Ley 1581 de 2012). <span className="text-accent">*</span>
          </span>
        </label>
        {ver("autoriza") && <p className={errCls}>{ver("autoriza")}</p>}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className={`w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all text-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          valido ? "hover:scale-[1.01]" : "opacity-70"
        }`}
      >
        {enviando ? (
          <>
            <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            Enviando…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p className="text-white/35 text-xs text-center">
        Un asesor humano te escribe por WhatsApp · Sin costo · Sin compromiso
      </p>
    </form>
  );
}
