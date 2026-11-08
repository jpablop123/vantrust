// Medición en el navegador: Meta Pixel + GA4 con un solo helper.
//
// Todo es tolerante a fallos: si un ID no está configurado, el script no se
// carga y `window.fbq` / `window.gtag` no existen, así que track() no hace nada.
// Nunca debe romper un formulario por culpa de la analítica.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

/** Eventos estándar de Meta que usa el sitio. */
export type TrackEvent = "Lead" | "Contact" | "InitiateCheckout";

// Nombre equivalente en GA4 (eventos recomendados).
const GA4_NAME: Record<TrackEvent, string> = {
  Lead: "generate_lead",
  Contact: "contact",
  InitiateCheckout: "begin_checkout",
};

/** Id único compartido entre Pixel y Conversions API para deduplicar. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Dispara el evento en Meta Pixel y GA4 a la vez.
 * `eventId` solo importa en Meta: es lo que evita contar dos veces un Lead que
 * también se envía desde el servidor por Conversions API.
 */
export function track(
  event: TrackEvent,
  params: Record<string, string | number | undefined> = {},
  eventId?: string
) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  );
  try {
    window.fbq?.("track", event, clean, eventId ? { eventID: eventId } : undefined);
  } catch {
    /* el pixel nunca debe romper la página */
  }
  try {
    const canal = canalPrimerToque();
    window.gtag?.("event", GA4_NAME[event], canal ? { ...clean, canal_primer_toque: canal } : clean);
    // SEO (Fase 6): lead cuyo primer toque fue búsqueda orgánica. Los que
    // llegaron desde un asistente de IA se miden aparte para seguir el AEO.
    if (event === "Lead" && canal === "organico") {
      window.gtag?.("event", "organic_lead", clean);
    } else if (event === "Lead" && canal === "ia") {
      window.gtag?.("event", "ai_lead", clean);
    }
  } catch {
    /* idem */
  }
}

// InitiateCheckout se cuenta una vez por pestaña, no cada vez que alguien
// toca un campo distinto.
let checkoutIniciado = false;
export function trackInicioCotizacion(ramo: string, fuente?: string) {
  if (checkoutIniciado) return;
  checkoutIniciado = true;
  track("InitiateCheckout", { content_category: ramo, fuente });
}

// ── Atribución (primer toque) ────────────────────────────────────────────

const ATRIB_KEY = "vt-atribucion";
export const ATRIB_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type Atribucion = Partial<
  Record<(typeof ATRIB_PARAMS)[number] | "landing_page" | "referrer" | "first_seen", string>
>;

/**
 * Guarda los UTM y click ids de la PRIMERA visita que los trae. Si alguien
 * llegó por un anuncio y vuelve después por Google orgánico, el lead se
 * atribuye a la campaña. Una visita sin parámetros nunca pisa lo guardado.
 */
export function capturarAtribucion() {
  capturarPrimerToque();
  try {
    if (localStorage.getItem(ATRIB_KEY)) return;
    const qs = new URLSearchParams(window.location.search);
    const datos: Atribucion = {};
    for (const p of ATRIB_PARAMS) {
      const v = qs.get(p);
      if (v) datos[p] = v.slice(0, 200);
    }
    if (!Object.keys(datos).length) return;
    datos.landing_page = window.location.pathname.slice(0, 200);
    if (document.referrer) datos.referrer = document.referrer.slice(0, 300);
    datos.first_seen = new Date().toISOString();
    localStorage.setItem(ATRIB_KEY, JSON.stringify(datos));
  } catch {
    /* localStorage bloqueado: el lead sale sin atribución */
  }
}

/** Atribución guardada, o al menos la página actual si no hay. */
export function leerAtribucion(): Atribucion {
  let datos: Atribucion = {};
  try {
    datos = JSON.parse(localStorage.getItem(ATRIB_KEY) || "{}") as Atribucion;
  } catch {
    /* sin datos */
  }
  if (!datos.landing_page && typeof window !== "undefined") {
    datos.landing_page = window.location.pathname;
  }
  return datos;
}

/** Cookies de Meta que mejoran el emparejamiento en Conversions API. */
export function leerCookiesMeta(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const get = (n: string) =>
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${n}=`))
      ?.slice(n.length + 1);
  return { fbp: get("_fbp"), fbc: get("_fbc") };
}

// ── Primer toque por canal (SEO / AEO) ───────────────────────────────────
//
// Independiente de vt-atribucion (que solo guarda visitas con UTM): aquí se
// guarda la primera visita sin importar de dónde venga, para saber si un lead
// empezó en Google orgánico, en un asistente de IA o en una campaña.

const TOQUE_KEY = "vt-primer-toque";

export type Canal = "pago" | "organico" | "ia" | "referido" | "directo";

const BUSCADORES = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com|ecosia\.org|search\.brave\.com)$/i;
const ASISTENTES_IA = /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)$/i;

export function clasificarCanal(qs: URLSearchParams, referrer: string): Canal {
  if (ATRIB_PARAMS.some((p) => qs.get(p))) {
    // utm_source=chatgpt.com lo agrega ChatGPT a sus enlaces: es IA, no pago.
    const src = (qs.get("utm_source") || "").toLowerCase();
    if (/chatgpt|openai|perplexity|gemini|copilot|claude/.test(src)) return "ia";
    return "pago";
  }
  if (!referrer) return "directo";
  let host = "";
  try {
    host = new URL(referrer).hostname;
  } catch {
    return "directo";
  }
  if (host === window.location.hostname) return "directo";
  if (ASISTENTES_IA.test(host)) return "ia";
  if (BUSCADORES.test(host)) return "organico";
  return "referido";
}

function capturarPrimerToque() {
  try {
    if (localStorage.getItem(TOQUE_KEY)) return;
    const canal = clasificarCanal(new URLSearchParams(window.location.search), document.referrer);
    localStorage.setItem(
      TOQUE_KEY,
      JSON.stringify({
        canal,
        referrer: document.referrer.slice(0, 300) || undefined,
        landing_page: window.location.pathname.slice(0, 200),
        first_seen: new Date().toISOString(),
      })
    );
  } catch {
    /* sin localStorage no hay primer toque */
  }
}

export function canalPrimerToque(): Canal | undefined {
  try {
    return (JSON.parse(localStorage.getItem(TOQUE_KEY) || "{}") as { canal?: Canal }).canal;
  } catch {
    return undefined;
  }
}
