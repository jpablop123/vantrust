// Tipos del contenido SEO. Las páginas son plantillas; el texto vive en datos.

import type { Pregunta } from "@/lib/seo";

export type { Pregunta };

export type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "pasos"; items: string[] }
  | { tipo: "tabla"; caption: string; columnas: string[]; filas: string[][] };

export interface Seccion {
  titulo: string;
  bloques: Bloque[];
}

export interface Persona {
  nombre: string;
  cargo: string;
  foto: string; // ruta en /public
}

/** Página madre de un ramo: /seguros/[slug] o /pymes/[poliza]. */
export interface PaginaRamo {
  ruta: string;
  /** Producto de seguros.ts que alimenta coberturas, beneficios y CTA. */
  seguroSlug?: string;
  /** Solo si el ramo no existe en seguros.ts. */
  nombre?: string;
  serviceType: string;
  title: string; // ≤ 60
  description: string; // ≤ 155, con CTA
  h1: string;
  /** Respuesta directa: 2–3 renglones, lo primero que se lee. */
  respuesta: string;
  secciones: Seccion[];
  faqs: Pregunta[];
  guias?: string[];
  /** Mensaje de WhatsApp del ramo. */
  waMensaje: string;
  todo?: string[];
}

/** Página local: /seguros/[slug]/[ciudad] o /pymes/[poliza]/[ciudad]. */
export interface PaginaLocal {
  rutaMadre: string;
  ciudad: string; // slug de ciudades.ts
  title: string;
  description: string;
  h1: string;
  respuesta: string;
  secciones: Seccion[];
  faqs: Pregunta[];
  /** Talleres, clínicas o aliados en convenio en esa ciudad. */
  aliados: string[];
  asesor: Persona | null;
  todo?: string[];
}

export interface Guia {
  slug: string;
  titulo: string; // H1: la pregunta
  title: string;
  description: string;
  respuesta: string;
  secciones: Seccion[];
  faqs: Pregunta[];
  /** Ruta del ramo relacionado (CTA y enlazado). */
  ramoRuta: string;
  waMensaje: string;
  autor: Persona | null;
  /** Asesor de VanTrust que aprobó el texto. Sin esto, noindex. */
  revisadoPor: string | null;
  publicado: string; // AAAA-MM-DD
  actualizado: string;
  todo?: string[];
}
