import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Car, Clock, LifeBuoy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { GRUPOS_GUIAS, GUIAS, guiaPublicable, minutosLectura } from "@/data/seo/guias";
import { buildMetadata } from "@/lib/seo";

const publicadas = GUIAS.filter(guiaPublicable);

// Fuera de producción (previews y local) se listan también los borradores,
// rotulados, para que el equipo los pueda revisar. En producción, solo las
// publicadas.
const verBorradores = process.env.VERCEL_ENV !== "production";

const grupos = GRUPOS_GUIAS.map((g) => ({
  ...g,
  guias: verBorradores ? g.guias : g.guias.filter(guiaPublicable),
})).filter((g) => g.guias.length > 0);

const ICONOS = {
  empresa: Building2,
  carro: Car,
  siniestros: LifeBuoy,
  personas: Users,
} as const;

export const metadata: Metadata = buildMetadata({
  title: "Guías de seguros: respuestas claras | VanTrust",
  description:
    "Guías de VanTrust sobre pólizas de cumplimiento, seguros de carro, salud, vida y hogar en Colombia, revisadas por asesores. Resuelve tus dudas aquí.",
  path: "/guias",
  // Un índice vacío es contenido delgado: se indexa cuando haya guías publicadas.
  noindex: publicadas.length === 0,
});

export default function GuiasIndex() {
  return (
    <>
      <Navbar />
      <PaginaHeader
        amplio
        migas={[{ nombre: "Guías", path: "/guias" }]}
        h1="Guías de seguros"
        respuesta="Respuestas cortas y claras a las preguntas que más nos hacen sobre seguros en Colombia, escritas y revisadas por asesores de VanTrust."
      >
        {grupos.length > 1 && (
          <nav aria-label="Temas" className="mt-8 -mx-4 px-4 overflow-x-auto">
            <ul className="flex gap-2.5 w-max">
              {grupos.map((g) => {
                const Icono = ICONOS[g.id];
                return (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] hover:border-accent/50 px-4 py-2 text-sm text-white/85 transition-colors"
                    >
                      <Icono className="w-4 h-4 text-accent" aria-hidden />
                      {g.titulo}
                      <span className="text-white/40">{g.guias.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </PaginaHeader>

      <main className="bg-surface py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {grupos.length === 0 ? (
            <p className="text-muted max-w-4xl mx-auto">Pronto publicaremos las primeras guías.</p>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {grupos.map((grupo) => {
                const Icono = ICONOS[grupo.id];
                return (
                  <section key={grupo.id} id={grupo.id} aria-labelledby={`${grupo.id}-titulo`} className="scroll-mt-28">
                    <div className="flex items-start gap-4 mb-7 pb-5 border-b border-primary/10">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-primary text-accent flex items-center justify-center">
                        <Icono className="w-6 h-6" aria-hidden />
                      </div>
                      <div>
                        <h2 id={`${grupo.id}-titulo`} className="text-2xl sm:text-3xl font-bold text-primary">
                          {grupo.titulo}
                        </h2>
                        <p className="text-muted mt-1">{grupo.descripcion}</p>
                      </div>
                    </div>

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                      {grupo.guias.map((g) => (
                        <li key={g.slug}>
                          <Link
                            href={`/guias/${g.slug}`}
                            className="group flex flex-col h-full bg-white rounded-2xl border border-primary/10 hover:border-accent/50 hover:shadow-lg hover:-translate-y-0.5 p-5 sm:p-6 shadow-sm transition-all"
                          >
                            <h3 className="text-[16px] sm:text-[17px] font-bold text-primary leading-snug mb-3 sm:mb-2">
                              {g.titulo}
                            </h3>
                            <p className="hidden sm:block text-muted text-sm leading-relaxed line-clamp-3 mb-5">
                              {g.description}
                            </p>
                            <div className="mt-auto flex items-center justify-between text-sm">
                              <span className="inline-flex items-center gap-1.5 text-muted/80">
                                <Clock className="w-4 h-4" aria-hidden />
                                {minutosLectura(g)} min
                                {!guiaPublicable(g) && (
                                  <span className="ml-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded-full px-2 py-0.5">
                                    Borrador
                                  </span>
                                )}
                              </span>
                              <span className="inline-flex items-center gap-1 font-semibold text-accent-dark group-hover:gap-2 transition-all">
                                Leer guía
                                <ArrowRight className="w-4 h-4" aria-hidden />
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
