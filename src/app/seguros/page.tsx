import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, User, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSeguroIcon } from "@/components/seguros/icons";
import { PERSONAS, EMPRESAS, type Seguro } from "@/data/seguros";

export const metadata: Metadata = {
  title: "Nuestros Seguros | VanTrust",
  description:
    "Seguros para personas y empresas: automóviles, hogar, vida, salud, empresariales y más. Comparamos las principales aseguradoras del país para proteger lo que más valoras.",
};

function SeguroCard({ seguro }: { seguro: Seguro }) {
  const Icon = getSeguroIcon(seguro.icon);
  return (
    <Link
      href={`/seguros/${seguro.slug}`}
      className="group relative bg-white rounded-2xl border border-primary/10 hover:border-accent/40 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {seguro.destacado && (
        <span className="absolute top-4 right-4 bg-accent/10 text-accent-dark text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
          Popular
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-primary mb-1.5">{seguro.nombre}</h3>
      <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">
        {seguro.descripcion}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
        Ver detalle
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

export default function SegurosIndex() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <header className="relative bg-primary bg-grid overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-primary" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.14),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Nuestros Seguros
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Soluciones para{" "}
            <span className="text-gold-gradient italic">personas y empresas</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comparamos las principales aseguradoras del país para ayudarte a
            encontrar la mejor opción en precio y cobertura.
          </p>
        </div>
      </header>

      <main className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Personas */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Seguros para personas</h2>
              <p className="text-muted text-sm">Protección para ti y tu familia</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {PERSONAS.map((s) => (
              <SeguroCard key={s.slug} seguro={s} />
            ))}
          </div>

          {/* Empresas */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Seguros para empresas</h2>
              <p className="text-muted text-sm">
                Protegemos tu operación, tu patrimonio y tu equipo
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EMPRESAS.map((s) => (
              <SeguroCard key={s.slug} seguro={s} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
