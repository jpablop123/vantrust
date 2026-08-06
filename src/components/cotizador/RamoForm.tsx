"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { waLink } from "@/lib/site";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  half?: boolean; // ocupa media columna en desktop
}

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Detecta los campos estándar que van al nivel raíz del lead
function isStandard(name: string) {
  return ["nombre", "email", "correo", "celular", "telefono", "ciudad"].includes(
    name.toLowerCase()
  );
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
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const set = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const getByRole = (roles: string[]) => {
    const f = fields.find((x) => roles.includes(x.name.toLowerCase()));
    return f ? values[f.name] || "" : "";
  };

  const emailVal = getByRole(["email", "correo"]);
  const celularVal = getByRole(["celular", "telefono"]);
  const nombreVal = getByRole(["nombre"]);

  const missingRequired = fields.some(
    (f) => f.required && !(values[f.name] || "").trim()
  );
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim());
  const celOk = celularVal.replace(/\D/g, "").length >= 7;
  const canSubmit = !missingRequired && emailOk && celOk && nombreVal.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    // Construye detalles con todos los campos no-estándar
    const detalles: Record<string, string> = {};
    for (const f of fields) {
      if (!isStandard(f.name)) {
        const v = (values[f.name] || "").trim();
        if (v) detalles[f.label] = v;
      }
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreVal.trim(),
          email: emailVal.trim(),
          telefono: celularVal.replace(/\D/g, ""),
          ciudad: getByRole(["ciudad"]).trim(),
          tipoSeguro,
          horario: "",
          placa: "",
          mensaje: "",
          detalles,
          fuente: fuente || `form_${tipoSeguro}`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (res.status === 429) {
          setErrorMsg(body?.error || "Ya tenemos tu solicitud, te contactamos pronto");
          setStatus("error");
          return;
        }
        throw new Error("Error");
      }
      setStatus("success");
    } catch {
      setErrorMsg("Hubo un problema, intenta de nuevo o escríbenos por WhatsApp");
      setStatus("error");
    }
  };

  if (status === "success") {
    const firstName = nombreVal.trim().split(" ")[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-5">
          <CheckCircle className="w-9 h-9 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          ¡Gracias por confiar en VanTrust{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="text-white/60 max-w-md mx-auto mb-2">
          Hemos recibido tu solicitud. Uno de nuestros asesores se comunicará
          contigo en menos de una hora hábil.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm font-semibold my-4">
          <Clock className="w-4 h-4" />
          Respuesta en un plazo aproximado de 1 hora
        </div>
        <p className="text-white/50 text-sm mb-5">
          Mientras tanto, puedes escribirnos directamente por WhatsApp.
        </p>
        <a
          href={waLink(`Hola, acabo de enviar una solicitud de ${tipoSeguro} en la web`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          {WA_ICON}
          Escribir por WhatsApp
        </a>
      </motion.div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm";

  return (
    <div>
      {status === "error" && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
          <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              {f.label} {f.required && <span className="text-accent">*</span>}
            </label>
            {f.type === "select" ? (
              <select
                value={values[f.name] || ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={`${inputCls} appearance-none`}
              >
                <option value="" className="bg-[#162240]">
                  Selecciona…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o} className="bg-[#162240]">
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                value={values[f.name] || ""}
                onChange={(e) => set(f.name, e.target.value)}
                rows={2}
                placeholder={f.placeholder}
                className={`${inputCls} resize-none`}
              />
            ) : (
              <input
                type={f.type || "text"}
                inputMode={f.type === "tel" ? "numeric" : undefined}
                value={values[f.name] || ""}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                className={inputCls}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit || status === "loading"}
        className="mt-6 w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.01] text-lg disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            Enviando…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p className="text-white/25 text-xs text-center mt-3">
        Sin costo · Sin compromiso · Respuesta en aproximadamente 1 hora
      </p>
    </div>
  );
}
