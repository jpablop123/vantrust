import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeguroCTA, { SeguroBotones } from "@/components/seguros/SeguroCTA";
import RamoForm from "@/components/cotizador/RamoForm";
import { SeguroIcon } from "@/components/seguros/icons";
import PaginaHeader from "@/components/seo/PaginaHeader";
import RamoCuerpo from "@/components/seo/RamoCuerpo";
import { WhatsAppCTA } from "@/components/seo/Contenido";
import { SEGUROS, getSeguro } from "@/data/seguros";
import { RAMO_FIELDS } from "@/data/formFields";
import { PAGINAS_RAMO, getPaginaRamo, getPaginaPorSeguro, slugDeRuta } from "@/data/seo/paginas";
import { buildMetadata, descripcionConCta, publicable } from "@/lib/seo";

// Mapea slug de producto → clave del esquema de campos
const FORM_KEY: Record<string, string> = {
  "accidentes-personales": "accidentes",
};

// Solo se generan las rutas conocidas; cualquier otro slug es 404.
export const dynamicParams = false;

// Los productos que viven en /pymes/* redirigen allá (next.config.ts), así que
// aquí van los de personas/empresas restantes + ramos que solo existen como
// página SEO (p. ej. arriendo).
export function generateStaticParams() {
  const enPymes = new Set(
    PAGINAS_RAMO.filter((p) => p.ruta.startsWith("/pymes/")).map((p) => p.seguroSlug)
  );
  const slugs = SEGUROS.filter((s) => !enPymes.has(s.slug)).map((s) => s.slug);
  const soloSeo = PAGINAS_RAMO.filter((p) => p.ruta.startsWith("/seguros/") && !p.seguroSlug).map(
    (p) => slugDeRuta(p.ruta)
  );
  return [...slugs, ...soloSeo].map((slug) => ({ slug }));
}

function resolver(slug: string) {
  const seguro = getSeguro(slug);
  const pagina = seguro ? getPaginaPorSeguro(slug) : getPaginaRamo(`/seguros/${slug}`);
  return { seguro, pagina };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { seguro, pagina } = resolver(slug);
  if (pagina) {
    return buildMetadata({
      title: pagina.title,
      description: pagina.description,
      path: pagina.ruta,
      noindex: !publicable(pagina.todo),
    });
  }
  if (!seguro) return { title: "Seguro no encontrado | VanTrust" };
  const empresa = seguro.categoria === "empresas";
  return buildMetadata({
    title: `Seguro ${seguro.nombre} en Colombia | VanTrust`.length <= 60
      ? `Seguro ${seguro.nombre} en Colombia | VanTrust`
      : `${seguro.nombre} | VanTrust`,
    description: descripcionConCta(
      seguro.descripcion,
      empresa ? "Asesoría gratis por WhatsApp." : "Cotiza gratis con VanTrust."
    ),
    path: `/seguros/${seguro.slug}`,
  });
}

export default async function SeguroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { seguro, pagina } = resolver(slug);
  if (!seguro && !pagina) notFound();

  const nombre = seguro?.nombre ?? pagina?.nombre ?? "";
  const migaCategoria =
    seguro?.categoria === "empresas"
      ? { nombre: "Seguros para empresas", path: "/seguros" }
      : { nombre: "Seguros", path: "/seguros" };

  return (
    <>
      <Navbar />

      <PaginaHeader
        migas={[migaCategoria, { nombre, path: pagina?.ruta ?? `/seguros/${slug}` }]}
        h1={pagina?.h1 ?? `Seguro de ${nombre}`}
        respuesta={pagina?.respuesta ?? seguro?.descripcion ?? ""}
        icono={<SeguroIcon name={seguro?.icon ?? "ShieldCheck"} className="w-8 h-8" />}
      >
        {seguro && (
          <div className="mt-8">
            <SeguroBotones seguro={seguro} />
          </div>
        )}
      </PaginaHeader>

      {/* Body */}
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <RamoCuerpo seguro={seguro} pagina={pagina} />

          {!seguro && pagina && <WhatsAppCTA mensaje={pagina.waMensaje} />}

          {seguro?.quote.type === "form" &&
            (() => {
              const key = FORM_KEY[seguro.slug] ?? seguro.slug;
              const fields = RAMO_FIELDS[key];
              if (!fields) return null;
              return (
                <div
                  id="cotizar-form"
                  className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-6 sm:p-10 scroll-mt-28"
                >
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_70%)]" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white text-center mb-1">
                      Solicita tu cotización de {seguro.nombre}
                    </h2>
                    <p className="text-white/50 text-sm text-center mb-6">
                      Completa tus datos y un asesor te contacta en aproximadamente 1 hora
                    </p>
                    <RamoForm
                      tipoSeguro={key}
                      fields={fields}
                      fuente={`producto_${seguro.slug}`}
                    />
                  </div>
                </div>
              );
            })()}

          {seguro && (
            <div className="pt-4">
              <SeguroCTA seguro={seguro} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
