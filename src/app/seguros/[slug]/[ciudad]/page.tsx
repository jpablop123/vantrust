import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaLocalVista, { metadataLocal } from "@/components/seo/PaginaLocalVista";
import { getCiudad } from "@/data/ciudades";
import { getPaginaRamo, slugDeRuta } from "@/data/seo/paginas";
import { PAGINAS_LOCALES, getPaginaLocal } from "@/data/seo/locales";

type Params = Promise<{ slug: string; ciudad: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGINAS_LOCALES.filter((l) => l.rutaMadre.startsWith("/seguros/")).map((l) => ({
    slug: slugDeRuta(l.rutaMadre),
    ciudad: l.ciudad,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, ciudad } = await params;
  const local = getPaginaLocal(`/seguros/${slug}`, ciudad);
  return local ? metadataLocal(local) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { slug, ciudad } = await params;
  const local = getPaginaLocal(`/seguros/${slug}`, ciudad);
  const madre = getPaginaRamo(`/seguros/${slug}`);
  const c = getCiudad(ciudad);
  if (!local || !madre || !c) notFound();
  return (
    <PaginaLocalVista
      local={local}
      madre={madre}
      ciudad={c}
      migaSeccion={{ nombre: "Seguros", path: "/seguros" }}
    />
  );
}
