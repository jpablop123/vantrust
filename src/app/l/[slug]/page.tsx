import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import logoWhite from "../../../../public/vantrust-logo-white.png";
import ShieldMotif from "@/components/ShieldMotif";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import LandingForm from "@/components/landings/LandingForm";
import { LANDINGS, getLanding } from "@/data/landings";
import { SITE, waLink } from "@/lib/site";

// Landing de pauta: sin menú ni enlaces de salida. El robots noindex viene de
// src/app/l/layout.tsx.

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) return {};
  return { title: l.metaTitle, description: l.metaDescription };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) notFound();

  const wa = waLink({ ramo: l.waRamo, mensaje: l.waMensaje });

  return (
    <div className="min-h-screen bg-primary bg-grid relative overflow-hidden pb-24 sm:pb-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-[#001a33]" />
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_60%)]" />
      <ShieldMotif className="absolute -right-24 top-10 w-[420px] h-[500px] opacity-[0.05] hidden md:block" />

      <div className="relative z-10">
        {/* Solo el logo: sin menú, nada que distraiga de la oferta */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Image src={logoWhite} alt="VanTrust" className="h-9 w-auto" priority />
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Escríbenos
          </a>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-16 grid lg:grid-cols-[1fr_minmax(0,460px)] gap-8 lg:gap-14 items-start">
          <div className="lg:pt-6">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-accent/25 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-accent rounded-full" />
              {l.etiqueta}
            </span>
            <h1 className="text-[2.1rem] leading-[1.1] sm:text-5xl font-bold text-white tracking-tight mb-5">
              {l.titulo}{" "}
              <span className="italic text-gold-gradient">{l.tituloDestacado}</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
              {l.subtitulo}
            </p>

            {/* En móvil el formulario va primero; los beneficios, debajo */}
            <ul className="hidden lg:block space-y-5 max-w-xl">
              {l.beneficios.map((b) => (
                <li key={b.titulo} className="flex gap-3.5">
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">{b.titulo}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{b.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="cotizar-form"
            className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">{l.formTitulo}</h2>
            <LandingForm tipo={l.form} fuente={`l_${l.slug}`} />
            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-white/45 text-sm mb-3">¿Prefieres escribir de una vez?</p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <WhatsAppIcon />
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          <ul className="lg:hidden space-y-5">
            {l.beneficios.map((b) => (
              <li key={b.titulo} className="flex gap-3.5">
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{b.titulo}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{b.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>

        <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 text-center text-xs text-white/35 space-y-1">
          <p>
            {SITE.legalName} · NIT {SITE.nit} · {SITE.city}
          </p>
          <p>
            <Link href="/politica-privacidad" className="hover:text-accent underline-offset-2 hover:underline">
              Política de tratamiento de datos personales
            </Link>
          </p>
        </footer>
      </div>

      {/* Barra fija de WhatsApp en móvil (reemplaza al botón flotante en /l) */}
      <div
        className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-primary/95 backdrop-blur border-t border-white/10 px-4 pt-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl"
        >
          <WhatsAppIcon />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
