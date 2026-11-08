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
            <div className="divide-y divide-primary/10">
              {grupos.map((grupo) => {
                const Icono = ICONOS[grupo.id];
                return (
                  <section
                    key={grupo.id}
                    id={grupo.id}
                    aria-labelledby={`${grupo.id}-titulo`}
                    className="scroll-mt-28 py-12 first:pt-0 last:pb-0 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16"
                  >
                    {/* Tema: fijo al hacer scroll en escritorio */}
                    <div className="mb-6 lg:mb-0">
                      <div className="lg:sticky lg:top-28">
                        <div className="w-11 h-11 rounded-xl bg-primary text-accent flex items-center justify-center mb-4">
                          <Icono className="w-5 h-5" aria-hidden />
                        </div>
                        <h2 id={`${grupo.id}-titulo`} className="text-2xl font-bold text-primary">
                          {grupo.titulo}
                        </h2>
                        <p className="text-muted mt-2 leading-relaxed">{grupo.descripcion}</p>
                        <p className="text-sm text-muted/70 mt-3">
                          {grupo.guias.length} {grupo.guias.length === 1 ? "guía" : "guías"}
                        </p>
                      </div>
                    </div>

                    {/* Guías del tema: filas, como un índice */}
                    <ol className="border-t border-primary/10">
                      {grupo.guias.map((g) => (
                        <li key={g.slug} className="border-b border-primary/10">
                          <Link
                            href={`/guias/${g.slug}`}
                            className="group flex items-start gap-4 py-5 -mx-3 px-3 rounded-lg hover:bg-white transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-primary leading-snug group-hover:text-accent-dark transition-colors">
                                {g.titulo}
                              </h3>
                              <p className="hidden sm:block text-muted text-sm mt-1 truncate">
                                {g.description}
                              </p>
                              <p className="flex items-center gap-2 text-xs text-muted/75 mt-2">
                                <Clock className="w-3.5 h-3.5" aria-hidden />
                                {minutosLectura(g)} min de lectura
                                {!guiaPublicable(g) && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded px-1.5 py-0.5">
                                    Borrador
                                  </span>
                                )}
                              </p>
                            </div>
                            <ArrowRight
                              className="w-5 h-5 mt-0.5 shrink-0 text-accent/60 group-hover:text-accent-dark group-hover:translate-x-1 transition-all"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ol>
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
