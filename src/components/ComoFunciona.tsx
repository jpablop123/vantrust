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

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Solicita tu cotización",
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
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
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
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Así es nuestro proceso de atención, de principio a fin
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="group relative bg-surface rounded-2xl border border-primary/10 p-7 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="absolute top-5 right-6 text-5xl font-bold text-primary/5 group-hover:text-accent/10 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
