import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import RamoCuerpo from "@/components/seo/RamoCuerpo";
import { WhatsAppCTA } from "@/components/seo/Contenido";
import PymeForm from "@/components/pymes/PymeForm";
import { SeguroIcon } from "@/components/seguros/icons";
import { getSeguro } from "@/data/seguros";
import { PYMES, getPaginaRamo, slugDeRuta } from "@/data/seo/paginas";
import { buildMetadata, publicable } from "@/lib/seo";

type Params = Promise<{ poliza: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return PYMES.map((p) => ({ poliza: slugDeRuta(p.ruta) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { poliza } = await params;
  const pagina = getPaginaRamo(`/pymes/${poliza}`);
  if (!pagina) return {};
  return buildMetadata({
    title: pagina.title,
    description: pagina.description,
    path: pagina.ruta,
    noindex: !publicable(pagina.todo),
  });
}

export default async function PymePage({ params }: { params: Params }) {
  const { poliza } = await params;
  const pagina = getPaginaRamo(`/pymes/${poliza}`);
  if (!pagina) notFound();
  const seguro = pagina.seguroSlug ? getSeguro(pagina.seguroSlug) : undefined;

  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[
          { nombre: "Pymes", path: "/pymes" },
          { nombre: seguro?.nombre ?? pagina.h1, path: pagina.ruta },
        ]}
        h1={pagina.h1}
        respuesta={pagina.respuesta}
        icono={<SeguroIcon name={seguro?.icon ?? "Briefcase"} className="w-8 h-8" />}
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <RamoCuerpo seguro={seguro} pagina={pagina} />
          {pagina.seguroSlug && (
            <section
              id="cotizar-form"
              className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-6 sm:p-10 scroll-mt-28"
            >
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white text-center mb-1">
                  Solicita tu póliza de {seguro?.nombre.toLowerCase()}
                </h2>
                <p className="text-white/50 text-sm text-center mb-6">
                  Déjanos los datos de tu empresa y un asesor te contacta
                </p>
                <PymeForm seguroSlug={pagina.seguroSlug} fuente={`pymes_${poliza}`} />
              </div>
            </section>
          )}
          <WhatsAppCTA mensaje={pagina.waMensaje} />
        </div>
      </main>
      <Footer />
    </>
  );
}
