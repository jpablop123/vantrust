"use client";

import { motion } from "framer-motion";
import { Phone, Check, ShieldCheck } from "lucide-react";
import RamoForm, { type FieldDef } from "@/components/cotizador/RamoForm";
import { INSURERS, SITE } from "@/lib/site";

const fields: FieldDef[] = [
  { name: "nombre", label: "Nombre completo", required: true },
  { name: "celular", label: "Celular", type: "tel", required: true, half: true },
  { name: "correo", label: "Correo (opcional)", type: "email", half: true },
  {
    name: "preferencia",
    label: "¿Cómo prefieres que te contactemos?",
    type: "select",
    options: ["WhatsApp", "Llamada", "Correo"],
    required: true,
  },
];

const BENEFICIOS = [
  `Comparamos ${INSURERS.length} aseguradoras por ti`,
  "Te explicamos coberturas, exclusiones y deducibles en palabras simples",
  "Pagas lo mismo que si fueras directo a la aseguradora",
  "Sin compromiso: tú decides si compras",
];

const PASOS = [
  "Dejas tus datos",
  `Te contactamos en ~${SITE.responseTime}`,
  "Recibes tus opciones",
];

export default function AsesoriaGratuita() {
  return (
    <section id="asesoria" className="py-24 bg-primary bg-grid relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_70%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_minmax(0,480px)] gap-10 lg:gap-16 items-center">
        {/* Argumento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Asesoría sin costo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-5 tracking-tight">
            Recibe asesoría experta{" "}
            <span className="text-gold-gradient italic">sin pagar un peso</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
            Cuéntanos qué quieres proteger. Un asesor revisa tu caso y te
            contacta en aproximadamente {SITE.responseTime} por el medio que prefieras.
          </p>

          <ul className="space-y-3.5 mb-6 sm:mb-10">
            {BENEFICIOS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/85">
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Qué pasa después: saberlo quita el miedo a dejar el número. */}
          <ol className="hidden sm:flex items-center gap-3 text-sm">
            {PASOS.map((paso, i) => (
              <li key={paso} className="flex items-center gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-accent text-primary font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-white/70 whitespace-nowrap">{paso}</span>
                </span>
                {i < PASOS.length - 1 && <span className="w-6 h-px bg-white/20" />}
              </li>
            ))}
          </ol>

          <p className="sm:mt-8 inline-flex items-center gap-2 text-white/45 text-xs">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Intermediario autorizado · RUI vigente ante la Superfinanciera
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-6">
            <p className="text-white font-bold text-xl">Empieza aquí</p>
            <p className="text-white/45 text-sm">Toma menos de 30 segundos.</p>
          </div>
          <RamoForm
            tipoSeguro="otro"
            fields={fields}
            fuente="asesoria_gratuita"
            submitLabel="Quiero mi asesoría gratis"
          />
          <div className="mt-5 pt-5 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm mb-3">¿Prefieres que te llamemos?</p>
            <a
              href={`tel:${SITE.phoneTel}`}
              data-lead-accion="solicitar-llamada"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-accent hover:text-accent text-white font-semibold px-6 py-3 rounded-full transition-all w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              Solicita una llamada
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
