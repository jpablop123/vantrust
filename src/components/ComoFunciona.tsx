"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Search,
  ListChecks,
  MousePointerClick,
  FileSignature,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

const steps: { title: string; description: string; icon: LucideIcon; quien?: "tu" }[] = [
  {
    title: "Solicita tu cotización",
    quien: "tu",
    description:
      "Cuéntanos qué necesitas a través del cotizador o de un asesor. Sin papeleo ni demoras.",
    icon: FileText,
  },
  {
    title: "Un asesor analiza tu necesidad",
    description:
      "Estudiamos tu perfil y tus prioridades para entender qué cobertura te conviene.",
    icon: Search,
  },
  {
    title: "Recibes varias propuestas",
    description:
      "Comparamos las principales aseguradoras del país y te presentamos las mejores opciones.",
    icon: ListChecks,
  },
  {
    title: "Eliges la mejor opción",
    quien: "tu",
    description:
      "Te acompañamos para que elijas la alternativa ideal en precio y cobertura, sin presión.",
    icon: MousePointerClick,
  },
  {
    title: "Emitimos tu póliza",
    description:
      "Gestionamos todo el proceso de emisión para que tu protección quede activa cuanto antes.",
    icon: FileSignature,
  },
  {
    title: "Te acompañamos durante toda la vigencia",
    description:
      "Renovaciones, asistencia y respaldo en caso de siniestro. Estamos contigo siempre.",
    icon: HeartHandshake,
  },
];

export default function ComoFunciona() {
  const irACotizar = () =>
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
        {/* Encabezado: en desktop acompaña al recorrido mientras se lee */}
        <motion.div
          className="lg:sticky lg:top-28 self-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Nuestro Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            ¿Cómo{" "}
            <span className="text-gold-gradient italic">funciona?</span>
          </h2>
          <p className="text-muted mt-4 text-lg">
            Así es nuestro proceso de atención, de principio a fin.
          </p>
          <p className="mt-8 text-2xl sm:text-3xl font-bold text-primary leading-snug tracking-tight">
            Tú pides y eliges.{" "}
            <span className="text-gold-gradient italic">Nosotros hacemos el resto.</span>
          </p>
          <button
            type="button"
            onClick={irACotizar}
            className="mt-8 btn-shine glow-accent inline-flex items-center justify-center bg-gradient-to-r from-accent-light via-accent to-accent-dark text-primary font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
          >
            Empezar ahora
          </button>
        </motion.div>

        {/* Recorrido: línea de tiempo con quién hace cada paso */}
        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-accent via-accent/50 to-accent/10"
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const tu = step.quien === "tu";
            return (
              <motion.li
                key={step.title}
                className="relative flex gap-5 sm:gap-6 pb-9 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <span
                  className={`relative z-10 w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-bold text-lg ${
                    tu
                      ? "bg-gradient-to-br from-accent-light via-accent to-accent-dark text-primary shadow-lg shadow-accent/30"
                      : "bg-primary text-accent ring-4 ring-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-primary flex items-center gap-2">
                      <Icon className="w-5 h-5 text-accent-dark shrink-0" />
                      {step.title}
                    </h3>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        tu ? "bg-accent/15 text-accent-dark" : "bg-primary/5 text-primary/60"
                      }`}
                    >
                      {tu ? "Tú" : "Nosotros"}
                    </span>
                  </div>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
