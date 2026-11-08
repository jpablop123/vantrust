import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { GUIAS, guiaPublicable } from "@/data/seo/guias";
import { buildMetadata } from "@/lib/seo";

const publicadas = GUIAS.filter(guiaPublicable);

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
        migas={[{ nombre: "Guías", path: "/guias" }]}
        h1="Guías de seguros"
        respuesta="Respuestas cortas y claras a las preguntas que más nos hacen sobre seguros en Colombia, escritas y revisadas por asesores de VanTrust."
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {publicadas.length === 0 ? (
            <p className="text-muted">Pronto publicaremos las primeras guías.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-5">
              {publicadas.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guias/${g.slug}`}
                    className="block h-full bg-white rounded-2xl border border-primary/10 hover:border-accent/40 p-6 shadow-sm transition-colors"
                  >
                    <BookOpen className="w-6 h-6 text-accent mb-3" aria-hidden />
                    <h2 className="text-lg font-bold text-primary mb-1.5">{g.titulo}</h2>
                    <p className="text-muted text-sm">{g.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
