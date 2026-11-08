"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Phone, ArrowLeft } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

// Los datos del lead viajan por sessionStorage y no por la URL: el nombre y el
// ramo son datos personales y en la URL quedarían en el historial, en los logs
// del servidor y en cualquier herramienta de analítica.
export const GRACIAS_KEY = "vt-gracias";

export interface GraciasInfo {
  nombre?: string;
  tipoSeguro?: string;
  resumen?: { label: string; value: string }[];
}

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// sessionStorage es estado externo a React. useSyncExternalStore lo lee sin
// provocar un desajuste de hidratación: en el servidor devuelve null y el
// cliente rellena los datos tras montar.
const subscribe = () => () => {};
const leerSesion = () => {
  try {
    return sessionStorage.getItem(GRACIAS_KEY);
  } catch {
    return null; // sessionStorage bloqueado
  }
};
const enServidor = () => null;

export default function GraciasContent() {
  const raw = useSyncExternalStore(subscribe, leerSesion, enServidor);

  const info = useMemo<GraciasInfo | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as GraciasInfo;
    } catch {
      return null;
    }
  }, [raw]);

  const firstName = (info?.nombre || "").trim().split(" ")[0];

  return (
    <section className="min-h-screen bg-primary bg-grid relative overflow-hidden flex items-center py-20">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-80 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-7 sm:p-11 text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-[72px] h-[72px] mx-auto rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            ¡Gracias por contactarnos
            {firstName ? (
              <>
                ,{" "}
                <span className="text-gold-gradient italic">{firstName}</span>
              </>
            ) : null}
            !
          </h1>

          <p className="text-white/60 mt-4 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Recibimos tu solicitud
            {info?.tipoSeguro ? ` de ${info.tipoSeguro}` : ""}. Muy pronto un
            asesor se comunicará contigo con opciones reales.
          </p>

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-full px-5 py-2.5 text-green-400 text-sm font-semibold mt-6">
            <Clock className="w-4 h-4" />
            Respuesta en aproximadamente {SITE.responseTime}
          </div>

          {info?.resumen && info.resumen.length > 0 && (
            <div className="mt-8 text-left bg-white/[0.04] border border-white/10 rounded-2xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-white/40 mb-3">
                Lo que nos enviaste
              </p>
              <dl className="space-y-2.5">
                {info.resumen.map((r) => (
                  <div key={r.label} className="flex gap-3 text-sm">
                    <dt className="text-white/45 w-28 shrink-0">{r.label}</dt>
                    <dd className="text-white/85 font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-8 pt-7 border-t border-white/10">
            <p className="text-white font-semibold text-lg mb-1">
              ¿No quieres esperar? Escríbenos ya
            </p>
            <p className="text-white/50 text-sm mb-4">
              Te llevamos a WhatsApp con tu solicitud ya escrita: solo dale enviar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waLink({
                  lead: {
                    nombre: info?.nombre,
                    tipoSeguro: info?.tipoSeguro,
                    resumen: info?.resumen,
                  },
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                {WA_ICON}
                Escríbenos ya por WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mt-7 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </motion.div>

        <p className="text-center text-white/25 text-xs mt-6">
          Cotizar no tiene costo ni te compromete a nada.
        </p>
      </div>
    </section>
  );
}
