// Helpers de SEO: metadata por página, publicación condicionada a TODOs y
// constructores de JSON-LD (schema.org).

import type { Metadata } from "next";
import { NEGOCIO, SITE_URL } from "@/lib/negocio";

export { SITE_URL };

export const OG_IMAGE = { url: "/vantrust-banner.jpeg", width: 1920, height: 1080 };

export function abs(path: string): string {
  return new URL(path, SITE_URL).toString().replace(/\/$/, "") || SITE_URL;
}

/**
 * Una página se publica (index + sitemap) solo si no le falta ningún dato
 * real. Cualquier TODO pendiente la deja en noindex.
 */
export function publicable(todo?: readonly string[] | null): boolean {
  return !todo || todo.length === 0;
}

const TITLE_MAX = 60;
const DESC_MAX = 155;

/**
 * Descripción ≤ 155: texto + CTA. Si no cabe, se recorta el texto en un
 * límite de palabra (nunca a mitad de palabra) y se conserva el CTA.
 */
export function descripcionConCta(texto: string, cta: string): string {
  const completo = `${texto} ${cta}`;
  if (completo.length <= DESC_MAX) return completo;
  const max = DESC_MAX - cta.length - 2; // "… " + cta
  const corte = texto.slice(0, max).replace(/[\s,;:.]+\S*$/, "");
  return `${corte}… ${cta}`;
}

/**
 * Metadata completa de una página. Next sobrescribe `openGraph` entero en cada
 * segmento, así que siempre se arma aquí con imagen, URL y locale.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  type = "website",
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  image?: { url: string; width: number; height: number };
}): Metadata {
  if (process.env.NODE_ENV !== "production") {
    if (title.length > TITLE_MAX)
      console.warn(`[seo] title de ${title.length} caracteres en ${path}: ${title}`);
    if (description.length > DESC_MAX)
      console.warn(`[seo] description de ${description.length} caracteres en ${path}`);
  }
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: NEGOCIO.nombre,
      locale: "es_CO",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

// ── JSON-LD ──────────────────────────────────────────────────────────────

const AGENCY_ID = `${SITE_URL}/#agencia`;

export function insuranceAgencyLd() {
  const d = NEGOCIO.direccion;
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": AGENCY_ID,
    name: NEGOCIO.nombre,
    legalName: NEGOCIO.razonSocial,
    url: NEGOCIO.url,
    logo: NEGOCIO.logo,
    image: NEGOCIO.imagen,
    description: NEGOCIO.descripcion,
    telephone: NEGOCIO.telefono,
    email: NEGOCIO.email,
    taxID: NEGOCIO.nit,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.calle,
      addressLocality: d.ciudad,
      addressRegion: d.region,
      addressCountry: d.pais,
      ...(d.codigoPostal ? { postalCode: d.codigoPostal } : {}),
    },
    ...(NEGOCIO.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: NEGOCIO.geo.lat,
            longitude: NEGOCIO.geo.lng,
          },
        }
      : {}),
    openingHoursSpecification: NEGOCIO.horario.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
    areaServed: NEGOCIO.areaServed.map((name) => ({
      "@type": name === "Colombia" ? "Country" : "Place",
      name,
    })),
    sameAs: NEGOCIO.sameAs,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#web`,
    url: SITE_URL,
    name: NEGOCIO.nombre,
    inLanguage: "es-CO",
    publisher: { "@id": AGENCY_ID },
  };
}

export type Miga = { nombre: string; path: string };

export function breadcrumbLd(migas: Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: abs(m.path),
    })),
  };
}

export type Pregunta = { pregunta: string; respuesta: string };

export function faqLd(faqs: Pregunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  };
}

export function serviceLd({
  nombre,
  serviceType,
  descripcion,
  path,
  ciudad,
}: {
  nombre: string;
  serviceType: string;
  descripcion: string;
  path: string;
  ciudad?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nombre,
    serviceType,
    description: descripcion,
    url: abs(path),
    provider: { "@id": AGENCY_ID },
    areaServed: ciudad
      ? { "@type": "City", name: ciudad }
      : { "@type": "Country", name: "Colombia" },
  };
}

export function articleLd({
  titulo,
  descripcion,
  path,
  autor,
  publicado,
  actualizado,
}: {
  titulo: string;
  descripcion: string;
  path: string;
  autor: { nombre: string; cargo?: string } | null;
  publicado: string;
  actualizado: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titulo,
    description: descripcion,
    mainEntityOfPage: abs(path),
    image: abs(OG_IMAGE.url),
    datePublished: publicado,
    dateModified: actualizado,
    inLanguage: "es-CO",
    author: autor
      ? { "@type": "Person", name: autor.nombre, jobTitle: autor.cargo, worksFor: { "@id": AGENCY_ID } }
      : { "@id": AGENCY_ID },
    publisher: { "@id": AGENCY_ID },
  };
}
