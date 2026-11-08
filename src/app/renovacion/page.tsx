import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BellRing, Scale, Headphones, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShieldMotif from "@/components/ShieldMotif";
import RenovacionForm from "@/components/RenovacionForm";

export const metadata: Metadata = buildMetadata({
  title: "Renueva tu póliza comparando aseguradoras | VanTrust",
  description:
    "¿Cuándo vence tu seguro de auto, hogar, salud o empresa? Te avisamos 30 días antes y te comparamos varias aseguradoras con un asesor humano. Sin costo.",
  path: "/renovacion",
});

const BENEFICIOS = [
  {
    icon: BellRing,
    titulo: "Te avisamos 30 días antes",
    texto: "Para que no renueves en automático ni a última hora.",
  },
  {
    icon: Scale,
    titulo: "Comparamos por ti",
    texto: "Varias aseguradoras, misma cobertura o mejor, y tú decides.",
  },
  {
    icon: Headphones,
    titulo: "Un asesor humano",
    texto: "Te escribe por WhatsApp y te acompaña si tienes un siniestro.",
  },
];

export default function RenovacionPage() {
  return (
    <>
      <Navbar />

      <main className="relative bg-primary bg-grid overflow-hidden pt-28 sm:pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-[#001a33]" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_60%)]" />
        <ShieldMotif className="absolute -right-24 -top-10 w-[420px] h-[500px] opacity-[0.05] hidden md:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_minmax(0,480px)] gap-10 lg:gap-14 items-start">
          <div className="lg:pt-6">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-accent/25 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Renovación sin sorpresas
            </span>
            <h1 className="text-[2.2rem] leading-[1.1] sm:text-5xl font-bold text-white tracking-tight mb-5">
              ¿Cuándo vence tu póliza?{" "}
              <span className="italic text-gold-gradient">
                Te avisamos 30 días antes
              </span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-9">
              Si ya tienes seguro de auto, hogar, salud o de tu empresa con otra
              agencia, déjanos la fecha. Antes de que venza te comparamos varias
              aseguradoras para que renueves con información, no por inercia.
            </p>

            <ul className="space-y-5 max-w-xl">
              {BENEFICIOS.map(({ icon: Icon, titulo, texto }) => (
                <li key={titulo} className="flex gap-4">
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-accent/15 border border-accent/25 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-white font-semibold">{titulo}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="cotizar-form"
            className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 scroll-mt-28"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Registra tu vencimiento
            </h2>
            <p className="text-white/45 text-sm mb-6">Toma menos de un minuto.</p>
            <RenovacionForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
