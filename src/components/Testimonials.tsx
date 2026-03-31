"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendoza",
    initials: "CM",
    city: "Bogotá",
    type: "Seguro Vehicular",
    text: "Llamaron a los 40 minutos. Me ahorraron $180.000 al año comparado con lo que tenía con Sura. Mismo todo riesgo, misma cobertura, menos plata.",
  },
  {
    name: "Andrea Gómez",
    initials: "AG",
    city: "Medellín",
    type: "Seguro Vehicular",
    text: "Tuve un choque en la 80 y el asesor de VanTrust me acompañó en todo. Llamó a la aseguradora por mí, gestionó el peritaje y me tuvo al día. Eso no lo haces solo.",
  },
  {
    name: "Julián Restrepo",
    initials: "JR",
    city: "Cali",
    type: "Seguro de Salud",
    text: "Llevaba 2 años sin seguro de salud porque pensé que era carísimo. Me cotizaron en 3 minutos y encontraron un plan con Allianz que me costó menos que el cable.",
  },
  {
    name: "María Fernanda López",
    initials: "ML",
    city: "Barranquilla",
    type: "Seguro de Vivienda",
    text: "Compré mi apto nuevo y no tenía ni idea de seguros de vivienda. Me explicaron todo sin usar palabras raras y aseguré el apartamento en el mismo día.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Lo que dicen nuestros clientes
          </span>
          <div className="w-10 h-[3px] bg-accent rounded-full mx-auto mt-4 mb-4" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Historias reales
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Más de 500 personas ya confían en VanTrust para proteger lo que más
            les importa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-surface border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-primary text-sm sm:text-base leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-primary font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-muted text-xs">
                    {t.city} · {t.type}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
