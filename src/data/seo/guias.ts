// Guías informativas (SEO + AEO).
//
// Formato obligatorio: respuesta directa en los 2–3 primeros renglones,
// después detalle/tablas/pasos, FAQ de 3–5 preguntas, autor real y fecha, y
// CTA de WhatsApp del ramo. Claude redacta; un asesor de VanTrust revisa.
// Sin `revisadoPor` y `autor`, la guía queda en noindex y no se enlaza.

import type { Guia } from "./tipos";
import { GUIAS_AUTO } from "./guias/auto";
import { GUIAS_CUMPLIMIENTO } from "./guias/cumplimiento";
import { GUIAS_EMPRESA } from "./guias/empresa";
import { GUIAS_SINIESTROS } from "./guias/siniestros";
import { GUIAS_PYMES } from "./guias/pymes";
import { GUIAS_PERSONAS } from "./guias/personas";

// Cumplimiento primero (las más antiguas), luego por prioridad de negocio:
// pymes y auto, siniestros, personas.
export const GUIAS: Guia[] = [
  ...GUIAS_CUMPLIMIENTO,
  ...GUIAS_PYMES,
  ...GUIAS_EMPRESA,
  ...GUIAS_AUTO,
  ...GUIAS_SINIESTROS,
  ...GUIAS_PERSONAS,
];

/** Temas del índice /guias, en el orden en que se muestran. */
export const GRUPOS_GUIAS: {
  id: "empresa" | "carro" | "siniestros" | "personas";
  titulo: string;
  descripcion: string;
  guias: Guia[];
}[] = [
  {
    id: "empresa",
    titulo: "Para tu empresa",
    descripcion: "Pólizas de cumplimiento, responsabilidad civil, transporte, directivos, empleados y el seguro de tu negocio.",
    guias: [...GUIAS_CUMPLIMIENTO, ...GUIAS_PYMES, ...GUIAS_EMPRESA],
  },
  {
    id: "carro",
    titulo: "Tu carro",
    descripcion: "Qué cubre el todo riesgo, cómo elegir el deducible y de qué depende el precio.",
    guias: GUIAS_AUTO,
  },
  {
    id: "siniestros",
    titulo: "Si tuviste un siniestro",
    descripcion: "Qué hacer en un choque, un robo o un arroyo, y cómo reclamar si no te quieren pagar.",
    guias: GUIAS_SINIESTROS,
  },
  {
    id: "personas",
    titulo: "Tú y tu familia",
    descripcion: "Salud, vida, hogar y arriendo, y cómo elegir o cambiar de aseguradora.",
    guias: GUIAS_PERSONAS,
  },
];

/** Minutos de lectura aproximados (200 palabras por minuto). */
export function minutosLectura(g: Guia): number {
  const texto = [
    g.respuesta,
    ...g.secciones.flatMap((s) => [
      s.titulo,
      ...s.bloques.flatMap((b) =>
        b.tipo === "p" ? [b.texto] : b.tipo === "tabla" ? b.filas.flat() : b.items
      ),
    ]),
    ...g.faqs.flatMap((f) => [f.pregunta, f.respuesta]),
  ].join(" ");
  return Math.max(1, Math.round(texto.split(/\s+/).length / 200));
}

/** Otras guías del mismo tema, para el enlazado interno al final de cada guía. */
export function guiasDelMismoTema(slug: string, max = 4): Guia[] {
  const grupo = GRUPOS_GUIAS.find((g) => g.guias.some((x) => x.slug === slug));
  return (grupo?.guias ?? []).filter((x) => x.slug !== slug).slice(0, max);
}

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}

export function guiaPublicable(g: Guia): boolean {
  return Boolean(g.autor && g.revisadoPor) && (!g.todo || g.todo.length === 0);
}

/** Guías que se pueden enlazar desde otras páginas (solo las publicadas). */
export function guiasEnlazables(slugs: string[] = []): Guia[] {
  return slugs
    .map(getGuia)
    .filter((g): g is Guia => Boolean(g && guiaPublicable(g)));
}
