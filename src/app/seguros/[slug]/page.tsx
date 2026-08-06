import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Target, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeguroCTA from "@/components/seguros/SeguroCTA";
import { getSeguroIcon } from "@/components/seguros/icons";
import { SEGUROS, getSeguro } from "@/data/seguros";

export function generateStaticParams() {
  return SEGUROS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seguro = getSeguro(slug);
  if (!seguro) return { title: "Seguro no encontrado | VanTrust" };
  return {
    title: `Seguro ${seguro.nombre} | VanTrust`,
    description: seguro.descripcion,
  };
}

function ListCard({
  title,
  icon,
  items,
  accent = false,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent ? "bg-accent/15 text-accent-dark" : "bg-primary/5 text-primary"
          }`}
        >
          {icon}
        </div>
        <h2 className="text-lg font-bold text-primary">{title}</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SeguroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seguro = getSeguro(slug);
  if (!seguro) notFound();

  const Icon = getSeguroIcon(seguro.icon);
  const categoriaLabel =
    seguro.categoria === "personas" ? "Seguros para personas" : "Seguros para empresas";

  return (
    <>
      <Navbar />

      {/* Header */}
      <header className="relative bg-primary bg-grid overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-primary" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.14),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/seguros"
            className="inline-flex items-center gap-2 text-white/50 hover:text-accent text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {categoriaLabel}
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                {seguro.nombre}
              </h1>
              <p className="text-white/60 text-lg mt-4 max-w-2xl leading-relaxed">
                {seguro.descripcion}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {seguro.protege && seguro.protege.length > 0 && (
            <ListCard
              title="¿Qué protege?"
              icon={<ShieldCheck className="w-5 h-5" />}
              items={seguro.protege}
            />
          )}
          {seguro.coberturas && seguro.coberturas.length > 0 && (
            <ListCard
              title="Principales coberturas"
              icon={<Sparkles className="w-5 h-5" />}
              items={seguro.coberturas}
              accent
            />
          )}
          {seguro.beneficios && seguro.beneficios.length > 0 && (
            <ListCard
              title="Beneficios"
              icon={<Target className="w-5 h-5" />}
              items={seguro.beneficios}
            />
          )}
          {seguro.dirigidoA && (
            <div className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-primary">Dirigido a</h2>
              </div>
              <p className="text-muted text-sm leading-relaxed">{seguro.dirigidoA}</p>
            </div>
          )}

          <div className="pt-4">
            <SeguroCTA seguro={seguro} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
