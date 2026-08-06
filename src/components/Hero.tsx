"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldCheck, BarChart3, DollarSign, Headphones } from "lucide-react";
import { INSURERS, waLink } from "@/lib/site";
import ShieldMotif from "@/components/ShieldMotif";

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
    const controls = animate(count, target, { duration: 2.2, ease: "easeOut" });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 1, suffix: "h", label: "Tiempo de respuesta" },
  { value: 10, suffix: "", label: "Aseguradoras aliadas" },
  { value: 500, suffix: "+", label: "Clientes protegidos" },
  { value: 98, suffix: "%", label: "Satisfacción" },
];

const trustSignals = [
  { icon: ShieldCheck, text: "Registro RUI Superfinanciera" },
  { icon: BarChart3, text: "10 aseguradoras comparadas" },
  { icon: DollarSign, text: "Mismo precio que ir directo" },
  { icon: Headphones, text: "Asesor humano asignado" },
];

function HeroCard() {
  return (
    <div className="conic-border relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] backdrop-blur-xl p-7 sm:p-8 shadow-2xl shadow-black/40">
      {/* Badge flotante */}
      <div className="absolute -top-3 right-6 bg-accent text-primary text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-accent/30">
        RUI · Superfinanciera
      </div>

      <div className="flex items-center gap-4 mb-6">
        <ShieldMotif className="w-12 h-14 shrink-0" />
        <div>
          <p className="text-white font-bold text-lg leading-tight">
            Protección VanTrust
          </p>
          <p className="text-white/45 text-sm">Personas y empresas</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-primary/40 px-4 py-5 text-center">
            <div className="text-3xl xl:text-4xl font-bold text-gold-gradient mb-1">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-white/45 text-xs leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium mb-2.5">
          Trabajamos con
        </p>
        <div className="flex flex-wrap gap-x-2.5 gap-y-1.5">
          {INSURERS.slice(0, 6).map((name) => (
            <span key={name} className="text-white/45 text-xs font-medium">
              {name}
            </span>
          ))}
          <span className="text-accent/70 text-xs font-medium">+4 más</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-primary bg-grid"
    >
      {/* Capas de fondo premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-[#001a33]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.13] mix-blend-overlay pointer-events-none" />
      {/* Escudo watermark (profundidad) */}
      <ShieldMotif className="absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[620px] opacity-[0.04] hidden lg:block" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#001a33] to-transparent" />

      {/* Orbs */}
      <motion.div
        className="absolute top-20 right-[8%] w-80 h-80 bg-accent/12 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-[4%] w-64 h-64 bg-accent/8 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/5 border border-accent/25 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-7 backdrop-blur-sm">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Agencia de seguros en Colombia
              </span>
            </motion.div>

            <motion.h1
              className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold text-white mb-7 tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Protege lo que{" "}
              <span className="relative inline-block italic text-gold-gradient">
                más importa
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-accent/20 blur-2xl rounded-full" />
              </span>
              <br />
              al mejor precio
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/55 max-w-lg mb-9 leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
            >
              Comparamos las principales aseguradoras del país y nos comunicamos
              contigo en un plazo aproximado de 1 hora con opciones reales. Sin
              costo extra.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <a
                href="#cotizar"
                className="btn-shine glow-accent bg-gradient-to-r from-accent-light via-accent to-accent-dark text-primary font-bold px-8 py-4 rounded-full text-lg text-center transition-all duration-200 hover:scale-105"
              >
                Cotizar Gratis
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-white/15 hover:border-white/35 bg-white/[0.03] text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar con asesor
              </a>
            </motion.div>
          </div>

          {/* Right — premium card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <HeroCard />
          </motion.div>
        </div>

        {/* Trust signals */}
        <motion.div
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {trustSignals.map((signal) => (
            <div
              key={signal.text}
              className="glass-card group flex items-center gap-3 rounded-xl px-4 py-3.5"
            >
              <signal.icon className="w-4 h-4 text-accent/70 group-hover:text-accent shrink-0 transition-colors" />
              <span className="text-white/50 group-hover:text-white/70 text-xs leading-tight transition-colors">
                {signal.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
