"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldCheck, BarChart3, DollarSign, Headphones } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    const controls = animate(count, target, {
      duration: 2.5,
      ease: "easeOut",
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 3, suffix: " min", label: "Tiempo de cotización" },
  { value: 10, suffix: "+", label: "Aseguradoras aliadas" },
  { value: 500, suffix: "+", label: "Clientes protegidos" },
  { value: 98, suffix: "%", label: "Satisfacción" },
];

const insurers = ["Bolívar", "Sura", "AXA", "Allianz", "Mapfre"];

const trustSignals = [
  { icon: ShieldCheck, text: "Registro RUI Superfinanciera" },
  { icon: BarChart3, text: "8+ aseguradoras comparadas" },
  { icon: DollarSign, text: "Mismo precio que ir directo" },
  { icon: Headphones, text: "Asesor humano asignado" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-primary bg-grid"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/80 to-primary" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 right-[10%] w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-60 h-60 bg-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-accent/20">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Agencia de seguros en Colombia
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Protege lo que{" "}
              <span className="text-accent italic">más importa</span>
              <br />
              al mejor precio
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/60 max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Responde 4 preguntas, comparamos entre las mejores aseguradoras y
              un asesor te llama en menos de 2 horas con opciones reales. Sin
              costo extra.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <a
                href="#cotizar"
                className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-accent/20"
              >
                Cotizar Gratis
              </a>
              <a
                href="https://wa.me/57300000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar con asesor
              </a>
            </motion.div>

            {/* Insurer row */}
            <motion.div
              className="mt-14 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-wider font-medium">
                Trabajamos con:
              </span>
              <div className="flex items-center gap-5 mt-3">
                {insurers.map((name, i) => (
                  <span
                    key={name}
                    className="text-white/35 text-sm font-medium flex items-center gap-5"
                  >
                    {i > 0 && (
                      <span className="text-white/15 mr-0">·</span>
                    )}
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - stats with separators */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-stretch gap-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`text-center px-6 xl:px-8 ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-3xl xl:text-4xl font-bold text-accent mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-white/40 text-sm whitespace-nowrap">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile stats */}
          <motion.div
            className="lg:hidden grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-4 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b border-white/10" : ""}`}
              >
                <div className="text-2xl font-bold text-accent mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust signals row */}
        <motion.div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {trustSignals.map((signal) => (
            <div
              key={signal.text}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
            >
              <signal.icon className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-white/40 text-xs leading-tight">
                {signal.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
