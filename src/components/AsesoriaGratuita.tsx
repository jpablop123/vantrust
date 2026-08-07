"use client";

import { motion } from "framer-motion";
import RamoForm, { type FieldDef } from "@/components/cotizador/RamoForm";

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

export default function AsesoriaGratuita() {
  return (
    <section id="asesoria" className="py-24 bg-primary bg-grid relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_70%)]" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Asesoría sin costo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-3">
            Solicita una asesoría{" "}
            <span className="text-gold-gradient italic">gratuita</span>
          </h2>
          <p className="text-white/50">
            Déjanos tus datos y elige cómo prefieres que te contactemos. Nos
            comunicamos contigo en un plazo aproximado de 1 hora.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <RamoForm
            tipoSeguro="otro"
            fields={fields}
            fuente="asesoria_gratuita"
            submitLabel="Solicita una asesoría gratuita"
          />
        </motion.div>
      </div>
    </section>
  );
}
