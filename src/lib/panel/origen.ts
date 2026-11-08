// De dónde viene cada lead, en dos dimensiones:
//  - canal: cómo llegó la persona al sitio (anuncio, buscador, IA…)
//  - captura: en qué formulario o botón dejó sus datos
// Sin dependencias de servidor: lo usan la lista y las métricas.

export interface DatosOrigen {
  fuente: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer?: string | null;
}

export const CANALES = [
  "Meta Ads",
  "Google Ads",
  "Otra campaña",
  "Buscador orgánico",
  "Asistente de IA",
  "Referido",
  "Directo",
] as const;
export type Canal = (typeof CANALES)[number];

const IA = /chatgpt|openai|perplexity|gemini|copilot|claude/i;
const META = /^(facebook|instagram|meta|fb|ig|messenger)$/i;
const BUSCADORES = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|ecosia\.org|search\.brave\.com)$/i;
const ASISTENTES = /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)$/i;

export function canalDe(l: DatosOrigen): Canal {
  const src = (l.utm_source ?? "").trim();
  if (IA.test(src)) return "Asistente de IA";
  if (l.fbclid || META.test(src)) return "Meta Ads";
  if (l.gclid || /^google$/i.test(src)) return "Google Ads";
  if (src) return "Otra campaña";
  let host = "";
  try {
    host = l.referrer ? new URL(l.referrer).hostname : "";
  } catch {
    host = "";
  }
  if (!host || /vantrust/i.test(host)) return "Directo";
  if (ASISTENTES.test(host)) return "Asistente de IA";
  if (BUSCADORES.test(host)) return "Buscador orgánico";
  return "Referido";
}

export const CAPTURAS = [
  "Placa del hero",
  "Cotizador",
  "Asesoría gratuita",
  "Página de ramo",
  "Landing de anuncios",
  "Botón de WhatsApp",
  "Llamada",
  "Renovación",
  "Otro",
] as const;
export type Captura = (typeof CAPTURAS)[number];

export function capturaDe(fuente: string | null): Captura {
  const f = (fuente ?? "").toLowerCase();
  if (f === "hero_placa") return "Placa del hero";
  if (f.startsWith("cotizador")) return "Cotizador";
  if (f.startsWith("asesoria")) return "Asesoría gratuita";
  if (f.startsWith("producto_") || f.startsWith("form_")) return "Página de ramo";
  if (f.startsWith("l_")) return "Landing de anuncios";
  if (f.startsWith("cta_whatsapp")) return "Botón de WhatsApp";
  if (f.startsWith("cta_llamada") || f.startsWith("cta_solicitar")) return "Llamada";
  if (f.startsWith("renovacion")) return "Renovación";
  return "Otro";
}

/** Color de la etiqueta de cada canal (clases de Tailwind). */
export const COLOR_CANAL: Record<Canal, string> = {
  "Meta Ads": "bg-blue-50 text-blue-700",
  "Google Ads": "bg-amber-50 text-amber-800",
  "Otra campaña": "bg-violet-50 text-violet-700",
  "Buscador orgánico": "bg-green-50 text-green-700",
  "Asistente de IA": "bg-fuchsia-50 text-fuchsia-700",
  Referido: "bg-teal-50 text-teal-700",
  Directo: "bg-gray-100 text-gray-600",
};
