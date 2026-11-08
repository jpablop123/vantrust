"use client";

import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  LifeBuoy,
  RefreshCw,
} from "lucide-react";
import { INSURERS, waLink } from "@/lib/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Image, { type StaticImageData } from "next/image";
import logoAllianz from "../../public/aseguradoras/allianz.png";
import logoAxa from "../../public/aseguradoras/axa-colpatria.png";
import logoCoomeva from "../../public/aseguradoras/coomeva.png";
import logoEquidad from "../../public/aseguradoras/equidad.png";
import logoHdi from "../../public/aseguradoras/hdi.png";
import logoMundial from "../../public/aseguradoras/mundial.png";
import logoSbs from "../../public/aseguradoras/sbs.png";
import logoBolivar from "../../public/aseguradoras/bolivar.png";
import logoSura from "../../public/aseguradoras/sura.png";
import logoZurich from "../../public/aseguradoras/zurich.png";

// Logos de las aseguradoras aliadas (fuentes en docs/diseno/logos-aseguradoras.md).
// Si se agrega una aseguradora a INSURERS sin logo, se muestra su nombre.
const LOGOS: Record<string, StaticImageData> = {
  Allianz: logoAllianz,
  "AXA Colpatria": logoAxa,
  Coomeva: logoCoomeva,
  "Equidad Seguros": logoEquidad,
  "HDI Seguros": logoHdi,
  "Mundial Seguros": logoMundial,
  "SBS Seguros": logoSbs,
  "Seguros Bolívar": logoBolivar,
  Sura: logoSura,
  Zurich: logoZurich,
};

// Las 8 razones de antes, agrupadas en 4 para que se lean de un vistazo:
// comparación (+ aseguradoras aliadas y cobertura nacional), asesoría
// personalizada y rápida, siniestros, y renovaciones.
const razones = [
  {
    icon: Search,
    titulo: "Comparamos por ti",
    texto: "Analizamos más de 9 aseguradoras aliadas para encontrar la mejor opción en precio y cobertura, en todo el país.",
  },
  {
    icon: UserCheck,
    titulo: "Un asesor de verdad",
    texto: "Asesoría personalizada y atención rápida: una persona que conoce tu caso, no un call center.",
  },
  {
    icon: LifeBuoy,
    titulo: "Contigo en el siniestro",
    texto: "Cuando pasa algo, te acompañamos con la aseguradora de principio a fin.",
  },
  {
    icon: RefreshCw,
    titulo: "Renovaciones a tiempo",
    texto: "Te avisamos antes de que venza tu póliza y volvemos a comparar para que no pagues de más.",
  },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-24 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
              Quiénes{" "}
              <span className="text-gold-gradient italic">somos</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-4">
              En <strong className="text-primary">VanTrust Agencia de Seguros</strong>{" "}
              acompañamos a personas y empresas en Colombia para proteger lo que
              más valoran. Como intermediarios autorizados, ponemos a tu servicio
              la experiencia de un equipo de asesores y el respaldo de las
              principales aseguradoras del país.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Comparamos las principales aseguradoras del país para ayudarte a
              encontrar la mejor opción en precio y cobertura, con un
              acompañamiento cercano antes, durante y después de la compra.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-10">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />
              <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "10", label: "Aseguradoras aliadas" },
                  { value: "1h", label: "Tiempo de respuesta" },
                  { value: "100%", label: "Asesoría sin costo" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl sm:text-4xl font-bold text-gold-gradient mb-2">
                      {s.value}
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="relative z-10 text-white/70 text-center text-sm mt-8 pt-6 border-t border-white/10">
                Comparamos las principales aseguradoras del país para encontrar la
                mejor opción en precio y cobertura.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Diferenciales / Por qué elegir VanTrust */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 mb-20 lg:mb-24">
          <div className="lg:sticky lg:top-28 self-start">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-5">
              ¿Por qué elegir VanTrust?
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary/80 leading-snug tracking-tight">
              Más que vender seguros,{" "}
              <span className="text-gold-gradient italic">protegemos su patrimonio.</span>
            </p>
            <a
              href={waLink({ mensaje: "Hola, quiero hablar con un asesor de VanTrust" })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Hablar con un asesor
            </a>
          </div>

          <ol className="border-t border-primary/15">
            {razones.map((r, i) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.titulo}
                  className="group flex gap-5 sm:gap-6 py-6 sm:py-7 border-b border-primary/15"
                >
                  <span className="text-gold-gradient font-bold text-3xl sm:text-4xl leading-none tabular-nums w-12 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <Icon className="w-5 h-5 text-accent-dark shrink-0" />
                      <p className="text-primary text-lg sm:text-xl font-bold">{r.titulo}</p>
                    </div>
                    <p className="text-muted leading-relaxed">{r.texto}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Aseguradoras aliadas */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-primary mb-2">
            Aseguradoras aliadas
          </h3>
          <p className="text-muted text-sm mb-8">
            Trabajamos con las compañías más sólidas del mercado colombiano
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {INSURERS.map((name) => {
              const logo = LOGOS[name];
              return (
                <li
                  key={name}
                  title={name}
                  className="bg-white border border-primary/10 rounded-2xl shadow-sm h-24 sm:h-28 px-5 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-accent/40"
                >
                  {logo ? (
                    <Image
                      src={logo}
                      alt={name}
                      sizes="160px"
                      // Los logos casi cuadrados necesitan más alto para pesar
                      // lo mismo que los horizontales.
                      className={`w-auto h-auto max-w-full object-contain ${
                        logo.width / logo.height < 1.8
                          ? "max-h-14 sm:max-h-16"
                          : "max-h-10 sm:max-h-12"
                      }`}
                    />
                  ) : (
                    <span className="text-primary/80 font-semibold text-sm text-center">{name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
