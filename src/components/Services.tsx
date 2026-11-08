"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, Building2 } from "lucide-react";
import { waLink } from "@/lib/site";
import { EMPRESAS, SEGUROS } from "@/data/seguros";
import { urlSeguro } from "@/data/seo/paginas";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const services = [
  {
    id: "vehiculo",
    slug: "automoviles",
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
    insurers: ["Seguros Bolívar", "Sura", "AXA Colpatria"],
  },
  {
    id: "salud",
    slug: "salud",
    title: "Seguro de Salud",
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
    insurers: ["Sura", "Allianz", "Coomeva"],
  },
  {
    id: "vivienda",
    slug: "hogar",
    title: "Seguro de Vivienda",
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
    insurers: ["AXA Colpatria", "Allianz", "HDI Seguros"],
  },
];

/** Botón dorado del diseño (CTA principal). */
const btnOro =
  "btn-shine glow-accent inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-light via-accent to-accent-dark text-primary font-bold rounded-full transition-all duration-200 hover:scale-105";

export default function Services() {
  const handleSelect = (serviceId: string) => {
    const ramoMap: Record<string, string> = {
      vehiculo: "auto",
      salud: "salud",
      vivienda: "hogar",
    };
    const ramo = ramoMap[serviceId] || "auto";
    window.dispatchEvent(new CustomEvent("vt-ramo", { detail: ramo }));
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  };

  const [auto, ...otros] = services;

  return (
    <section id="servicios" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Soluciones para{" "}
            <span className="text-gold-gradient italic">cada necesidad</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Comparamos entre las mejores aseguradoras para darte la cobertura
            perfecta al mejor precio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-5">
          {/* El más cotizado: bloque grande */}
          <article className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-10 lg:row-span-2 flex flex-col">
            <div className="absolute -top-20 -right-10 w-80 h-80 bg-[radial-gradient(circle,rgba(191,161,92,0.22),transparent_65%)]" />
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-8">
                <span className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                  {auto.icon}
                </span>
                <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                  {auto.badge}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {auto.title}
              </h3>
              <p className="text-white/65 text-lg leading-relaxed mb-7">{auto.description}</p>
              <ul className="space-y-3 mb-8">
                {auto.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/85">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-white/45 text-sm mb-8">
                Con {auto.insurers.join(", ")} y más.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={() => handleSelect(auto.id)}
                  className={`${btnOro} px-8 py-4 text-lg`}
                >
                  Cotizar mi carro
                </button>
                <Link
                  href={urlSeguro(auto.slug)}
                  className="inline-flex items-center gap-1 text-white/70 hover:text-accent font-medium transition-colors"
                >
                  Ver coberturas
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Salud y hogar */}
          {otros.map((s) => (
            <article
              key={s.id}
              className="group relative bg-white rounded-3xl border border-primary/10 hover:border-accent/40 p-7 sm:p-8 shadow-[0_2px_12px_rgba(0,44,85,0.05)] hover:shadow-[0_20px_50px_-16px_rgba(0,44,85,0.25)] transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="w-14 h-14 shrink-0 rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors duration-300">
                  {s.icon}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">{s.title}</h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">{s.description}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 mb-6">
                {s.features.map((f) => (
                  <li key={f} className="bg-background text-primary/70 text-xs font-medium px-3 py-1.5 rounded-full">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto text-muted/80 text-xs mb-5">
                Con {s.insurers.join(", ")} y más.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={() => handleSelect(s.id)}
                  className={`${btnOro} px-6 py-3`}
                >
                  Cotizar
                </button>
                <Link
                  href={urlSeguro(s.slug)}
                  className="inline-flex items-center gap-1 text-primary/60 hover:text-accent-dark font-medium text-sm transition-colors"
                >
                  Ver coberturas
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}

          {/* Empresas: antes no aparecían en el home */}
          <article className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-background border-2 border-accent/30 p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <span className="w-14 h-14 shrink-0 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <Building2 className="w-7 h-7" />
            </span>
            <div className="flex-1">
              <p className="text-accent-dark text-xs font-bold uppercase tracking-wider mb-1">
                ¿Tienes empresa?
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-primary">Seguros para tu empresa</h3>
              <p className="text-muted text-sm mt-1">
                Pyme, cumplimiento para licitaciones, ARL, responsabilidad civil y{" "}
                {EMPRESAS.length - 4} pólizas más.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={waLink({ ramo: "pyme" })}
                data-lead-ramo="pyme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Hablar con un asesor
              </a>
              <Link
                href="/seguros#empresas"
                className="inline-flex items-center justify-center gap-1 text-primary/60 hover:text-accent-dark font-medium text-sm transition-colors"
              >
                Ver seguros para empresas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/seguros"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent-dark transition-colors"
          >
            Ver los {SEGUROS.length} seguros
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
