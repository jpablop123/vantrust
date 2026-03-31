"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "vehiculo",
    num: "01",
    title: "Seguro Vehicular",
    badge: "Más popular",
    description:
      "Protege tu vehículo contra accidentes, robo y daños a terceros con las mejores aseguradoras de Colombia.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h0M21 14.25h0M3.375 14.25L6 6.75h12l2.625 7.5M3.375 14.25h17.25"
        />
      </svg>
    ),
    features: [
      "Todo riesgo",
      "Responsabilidad civil",
      "Asistencia en carretera",
      "Hurto y pérdida total",
    ],
    insurers: ["Bolívar", "Sura", "AXA"],
  },
  {
    id: "salud",
    num: "02",
    title: "Seguro de Salud",
    badge: "Esencial",
    description:
      "Planes de salud y medicina prepagada con acceso a la mejor red de clínicas y especialistas del país.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    features: [
      "Medicina prepagada",
      "Pólizas complementarias",
      "Cobertura internacional",
      "Sin preexistencias",
    ],
    insurers: ["Sura", "Allianz", "Bolívar"],
  },
  {
    id: "vivienda",
    num: "03",
    title: "Seguro de Vivienda",
    badge: "Tranquilidad",
    description:
      "Protección integral para tu hogar ante incendios, desastres naturales, robo y responsabilidad civil.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    features: [
      "Incendio y terremoto",
      "Robo y vandalismo",
      "Contenidos del hogar",
      "Responsabilidad civil",
    ],
    insurers: ["AXA", "Allianz", "Sura"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  const handleSelect = (serviceId: string) => {
    const formSelect = document.getElementById(
      "tipoSeguro"
    ) as HTMLSelectElement | null;
    if (formSelect) {
      formSelect.value = serviceId;
      formSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
    document
      .getElementById("cotizar")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicios" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Nuestros Servicios
          </span>
          <div className="w-10 h-[3px] bg-accent rounded-full mx-auto mt-4 mb-4" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Soluciones para cada necesidad
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Comparamos entre las mejores aseguradoras para darte la cobertura
            perfecta al mejor precio.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onClick={() => handleSelect(service.id)}
              className="card-accent-top relative bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-accent/30 cursor-pointer"
            >
              {/* Decorative number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-primary/[0.04] leading-none select-none pointer-events-none">
                {service.num}
              </span>

              <span className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                {service.badge}
              </span>

              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-primary mt-6 mb-3">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed mb-5 text-sm">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-xs text-muted/60 pt-4 border-t border-gray-50">
                <span>Aseguradoras:</span>
                {service.insurers.map((ins) => (
                  <span
                    key={ins}
                    className="bg-surface px-2 py-0.5 rounded text-muted"
                  >
                    {ins}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Cotizar este seguro
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
