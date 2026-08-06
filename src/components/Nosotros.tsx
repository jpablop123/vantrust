"use client";

import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  LifeBuoy,
  RefreshCw,
  Building2,
  Zap,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { INSURERS } from "@/lib/site";

const diferenciales = [
  { icon: Search, text: "Analizamos varias aseguradoras para encontrar la mejor opción" },
  { icon: UserCheck, text: "Asesoría personalizada" },
  { icon: LifeBuoy, text: "Acompañamiento en caso de siniestro" },
  { icon: RefreshCw, text: "Renovaciones oportunas" },
  { icon: Building2, text: "Más de 9 aseguradoras aliadas" },
  { icon: Zap, text: "Atención rápida" },
  { icon: MapPin, text: "Cobertura nacional" },
  { icon: ShieldCheck, text: "Más que vender seguros, protegemos su patrimonio" },
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
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-primary">
            ¿Por qué elegir VanTrust?
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {diferenciales.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.text}
                className="bg-white rounded-2xl border border-primary/10 p-6 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-primary text-sm font-medium leading-snug">
                  {d.text}
                </p>
              </motion.div>
            );
          })}
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            {INSURERS.map((name) => (
              <span
                key={name}
                className="bg-white border border-primary/10 text-primary/80 font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
