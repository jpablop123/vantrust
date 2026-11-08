"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SelectDropdown from "@/components/cotizador/SelectDropdown";
import CurrencyInput from "@/components/cotizador/CurrencyInput";
import { copForSubmit } from "@/lib/currency";
import { GRACIAS_KEY } from "@/app/gracias/GraciasContent";
import PasoContacto, { type LeadCreado } from "@/components/cotizador/PasoContacto";
import { completarLead } from "@/lib/leads-client";

export interface FieldDef {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "date"
    | "number"
    | "select"
    | "textarea"
    | "currency";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  half?: boolean; // ocupa media columna en desktop
  // Límites nativos para inputs de tipo number/date (ej. no nacer en el futuro)
  min?: string | number;
  max?: string | number;
  // Muestra un campo adicional solo cuando este campo tiene cierto valor
  // (ej. un select "¿Tiene EPS?" que al elegir "Sí" revela "¿Cuál EPS?").
  reveal?: { when: string; field: FieldDef };
}

// Detecta los campos estándar que van al nivel raíz del lead
function isStandard(name: string) {
  return ["nombre", "email", "correo", "celular", "telefono", "ciudad"].includes(
    name.toLowerCase()
  );
}

const isEmailField = (name: string) =>
  ["email", "correo"].includes(name.toLowerCase());
const isTelField = (name: string) =>
  ["celular", "telefono"].includes(name.toLowerCase());
// Nombre y celular ya se pidieron en el paso 1.
const isPaso1 = (name: string) =>
  isTelField(name) || name.toLowerCase() === "nombre";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Nombre legible del ramo para el mensaje de la página de gracias.
const RAMO_LABELS: Record<string, string> = {
  salud: "Seguro de Salud",
  hogar: "Seguro de Hogar",
  vida: "Seguro de Vida",
  accidentes: "Accidentes Personales",
  exequial: "Seguro Exequial",
  viajes: "Seguro de Viajes",
  mascotas: "Seguro de Mascotas",
  vehiculo: "Seguro de Automóvil",
  cumplimiento: "Póliza de Cumplimiento",
  pyme: "Seguro para tu empresa",
  rc: "Póliza de Responsabilidad Civil",
  transporte: "Seguro de Transporte de Mercancías",
  todo_riesgo: "Póliza Todo Riesgo",
  otro: "asesoría",
};

/**
 * Tipos cuyo valor necesita el ancho completo en móvil aunque el campo sea
 * `half`: un correo o un monto en pesos no caben en media columna a 360px.
 */
const WIDE_ON_MOBILE = new Set(["date", "email", "currency"]);

/** Mensaje de error de un campo, o null si está bien. */
function fieldError(f: FieldDef, raw: string): string | null {
  const v = (raw || "").trim();
  if (f.required && !v) return "Este campo es obligatorio";
  if (!v) return null;

  if (isEmailField(f.name) && !EMAIL_RE.test(v))
    return "El correo no parece válido (ej: nombre@correo.com)";

  if (isTelField(f.name) && v.replace(/\D/g, "").length < 7)
    return "Ingresa un número de contacto válido";

  if (f.name.toLowerCase() === "nombre" && v.length < 3)
    return "Ingresa tu nombre completo";

  return null;
}

export default function RamoForm({
  tipoSeguro,
  fields,
  fuente,
  submitLabel = "Solicitar cotización",
}: {
  tipoSeguro: string;
  fields: FieldDef[];
  fuente?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  // Lead creado en el paso 1. Mientras sea null se muestra el paso 1.
  const [lead, setLead] = useState<LeadCreado | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const markTouched = (name: string) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  // Id único por campo para asociar <label htmlFor> con el input (a11y + área táctil).
  const fieldId = (name: string) =>
    `vt-${tipoSeguro}-${fuente || "form"}-${name}`.replace(/[^\w-]/g, "-");

  // Paso 2: todo menos nombre y celular, y nada es obligatorio.
  const fields2: FieldDef[] = fields
    .filter((f) => !isPaso1(f.name))
    .map((f) => ({ ...f, required: false }));

  const getByRole = (roles: string[]) => {
    const f = fields2.find((x) => roles.includes(x.name.toLowerCase()));
    return f ? values[f.name] || "" : "";
  };

  // Campos actualmente visibles (incluye los revelados cuyo padre cumple la condición)
  const activeFields: FieldDef[] = [];
  for (const f of fields2) {
    activeFields.push(f);
    if (f.reveal && values[f.name] === f.reveal.when) {
      activeFields.push(f.reveal.field);
    }
  }

  const emailVal = getByRole(["email", "correo"]);

  // Errores de todos los campos visibles, calculados en cada render.
  const errors: Record<string, string> = {};
  for (const f of activeFields) {
    const err = fieldError(f, values[f.name] || "");
    if (err) errors[f.name] = err;
  }
  const canSubmit = Object.keys(errors).length === 0;

  /** Muestra el error solo si el usuario ya tocó el campo o ya intentó enviar. */
  const visibleError = (name: string) =>
    attempted || touched[name] ? errors[name] : undefined;

  /** Guarda el resumen para /gracias y navega. */
  const irAGracias = (l: LeadCreado) => {
    try {
      sessionStorage.setItem(
        GRACIAS_KEY,
        JSON.stringify({
          nombre: l.nombre,
          tipoSeguro: RAMO_LABELS[l.tipoSeguro] || "tu seguro",
        })
      );
    } catch {
      // sessionStorage bloqueado: /gracias muestra el mensaje genérico.
    }
    // Se va a /gracias en vez de mostrar el mensaje aquí mismo: en móvil el
    // bloque de éxito quedaba fuera de pantalla y parecía que no pasó nada.
    router.push("/gracias");
  };

  const handleSubmit = async () => {
    if (status === "loading" || !lead) return;
    if (!canSubmit) {
      // En vez de un botón muerto, marca los campos y explica qué falta.
      setAttempted(true);
      const firstBad = activeFields.find((f) => errors[f.name]);
      if (firstBad) {
        document
          .getElementById(fieldId(firstBad.name))
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    // Construye detalles con todos los campos visibles no-estándar
    const detalles: Record<string, string> = {};
    for (const f of activeFields) {
      if (!isStandard(f.name)) {
        const raw = (values[f.name] || "").trim();
        if (!raw) continue;
        // Los montos viajan ya formateados: "$ 350.000.000 COP".
        detalles[f.label] = f.type === "currency" ? copForSubmit(raw) : raw;
      }
    }

    const email = emailVal.trim();
    const r = await completarLead(
      lead.id,
      {
        nombre: lead.nombre,
        telefono: lead.telefono,
        tipoSeguro: lead.tipoSeguro,
        placa: lead.placa,
        email,
        ciudad: getByRole(["ciudad"]).trim(),
        detalles,
        fuente: fuente || `form_${lead.tipoSeguro}`,
      },
      { emailNuevo: !!email }
    );
    if (!r.ok) {
      setErrorMsg(r.error);
      setStatus("error");
      return;
    }
    irAGracias(lead);
  };

  const baseInputCls =
    "w-full px-4 py-3.5 rounded-xl border bg-white/[0.07] text-white placeholder-white/40 outline-none focus:bg-white/[0.1] transition-all text-[15px]";

  const renderField = (f: FieldDef, forceFull = false) => {
    const isHalf =
      !forceFull &&
      f.half &&
      f.type !== "textarea" &&
      // 22 deja "¿Tiene obras de arte?" a media columna, en pareja con "¿Tiene joyas?"
      (f.label?.length ?? 0) <= 22;
    // Media columna en desktop, pero ancho completo en móvil para los tipos
    // cuyo contenido no cabe a 360px (correo, fecha, montos).
    const colSpan = !isHalf
      ? "col-span-2"
      : WIDE_ON_MOBILE.has(f.type ?? "")
        ? "col-span-2 sm:col-span-1"
        : "col-span-1";

    const id = fieldId(f.name);
    const err = visibleError(f.name);
    const value = values[f.name] || "";
    const inputCls = `${baseInputCls} ${
      err
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/25"
        : "border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/25"
    }`;

    return (
      <div className={colSpan}>
        <label
          htmlFor={id}
          className="block text-[13px] font-medium text-white/70 mb-1.5"
        >
          {f.label} {f.required && <span className="text-accent">*</span>}
        </label>
        {f.type === "select" ? (
          <SelectDropdown
            id={id}
            value={value}
            onChange={(v) => {
              set(f.name, v);
              markTouched(f.name);
            }}
            options={f.options || []}
            placeholder={f.placeholder || "Selecciona…"}
            invalid={!!err}
          />
        ) : f.type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => set(f.name, e.target.value)}
            onBlur={() => markTouched(f.name)}
            rows={2}
            placeholder={f.placeholder}
            className={`${inputCls} resize-none`}
          />
        ) : f.type === "currency" ? (
          <CurrencyInput
            id={id}
            value={value}
            onChange={(v) => set(f.name, v)}
            placeholder={f.placeholder || "0"}
            className={inputCls}
          />
        ) : (
          <input
            id={id}
            type={f.type || "text"}
            inputMode={
              f.type === "tel" || f.type === "number" ? "numeric" : undefined
            }
            max={f.max}
            min={f.min}
            value={value}
            onChange={(e) => set(f.name, e.target.value)}
            onBlur={() => markTouched(f.name)}
            placeholder={f.placeholder}
            aria-invalid={!!err}
            className={inputCls}
          />
        )}
        {err && (
          <p className="mt-1.5 text-[12px] text-red-400 leading-snug">{err}</p>
        )}
      </div>
    );
  };

  if (!lead) {
    return (
      <PasoContacto
        // "otro" = formulario general: la persona elige el ramo.
        tipoSeguro={tipoSeguro === "otro" ? undefined : tipoSeguro}
        fuente={fuente || `form_${tipoSeguro}`}
        submitLabel={submitLabel}
        onCreado={(l) => {
          // Si no hay nada más que preguntar, el lead ya está listo.
          if (!fields2.length) irAGracias(l);
          else setLead(l);
        }}
      />
    );
  }

  const firstName = lead.nombre.split(" ")[0];

  return (
    <div>
      <div className="mb-5 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
        <p className="text-sm text-white/80 leading-relaxed">
          <strong className="text-white">¡Listo, {firstName}!</strong> Un asesor
          ya tiene tu número. Si nos cuentas un poco más, te llamamos con
          opciones reales. <span className="text-white/50">Todo es opcional.</span>
        </p>
      </div>
      {status === "error" && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
          <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        {fields2.map((f) => {
          const revealActive =
            f.reveal && values[f.name] === f.reveal.when;
          return (
            <Fragment key={f.name}>
              {renderField(f)}
              <AnimatePresence>
                {revealActive && f.reveal && (
                  <motion.div
                    key={f.reveal.field.name}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="col-span-2 overflow-hidden"
                  >
                    {renderField(f.reveal.field, true)}
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>

      {attempted && !canSubmit && (
        <p className="mt-4 text-center text-[13px] text-red-400">
          Revisa los campos marcados en rojo para continuar.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className={`mt-4 w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          canSubmit ? "" : "opacity-60 hover:scale-100"
        }`}
      >
        {status === "loading" ? (
          <>
            <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            Enviando…
          </>
        ) : (
          "Enviar detalles"
        )}
      </button>
      <button
        type="button"
        onClick={() => irAGracias(lead)}
        className="mt-3 w-full text-white/50 hover:text-white text-sm py-2 transition-colors"
      >
        Omitir, prefiero que me llamen
      </button>
    </div>
  );
}
