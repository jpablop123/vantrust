import "server-only";
import { createHash } from "node:crypto";

// Meta Conversions API: manda el Lead desde el servidor. iOS y los
// bloqueadores se comen buena parte de los eventos del Pixel; este envío los
// recupera. El event_id es el mismo que usó el Pixel en el navegador, así que
// Meta deduplica y el lead cuenta una sola vez.
//
// Variables: NEXT_PUBLIC_META_PIXEL_ID + META_CAPI_TOKEN (obligatorias),
// META_TEST_EVENT_CODE (opcional, para ver los eventos en "Probar eventos").

const API_VERSION = process.env.META_API_VERSION || "v23.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export interface CapiLead {
  eventId: string;
  telefono: string; // 10 dígitos, sin indicativo
  email?: string;
  nombre?: string;
  ciudad?: string;
  tipoSeguro: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  ip?: string;
  userAgent?: string;
  url?: string;
}

export async function sendCapiLead(lead: CapiLead) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) {
    console.warn("Meta CAPI no configurado, se salta");
    return;
  }
  if (!lead.eventId) return; // sin event_id duplicaría el Lead del Pixel

  // Si no hay cookie _fbc pero sí llegó el fbclid del anuncio, se arma igual
  // (formato documentado por Meta: fb.1.<timestamp>.<fbclid>).
  const fbc = lead.fbc || (lead.fbclid ? `fb.1.${Date.now()}.${lead.fbclid}` : undefined);

  // Normalización que pide Meta antes del hash: teléfono con indicativo y solo
  // dígitos; correo y nombre en minúscula y sin espacios sobrantes.
  const [primerNombre, ...resto] = (lead.nombre || "").trim().toLowerCase().split(/\s+/);
  const user_data: Record<string, unknown> = {
    ph: [sha256(`57${lead.telefono}`)],
    country: [sha256("co")],
    ...(lead.email ? { em: [sha256(lead.email.trim().toLowerCase())] } : {}),
    ...(primerNombre ? { fn: [sha256(primerNombre)] } : {}),
    ...(resto.length ? { ln: [sha256(resto.join(" "))] } : {}),
    ...(lead.ciudad
      ? { ct: [sha256(lead.ciudad.toLowerCase().normalize("NFD").replace(/[^a-z]/g, ""))] }
      : {}),
    ...(lead.ip ? { client_ip_address: lead.ip } : {}),
    ...(lead.userAgent ? { client_user_agent: lead.userAgent } : {}),
    ...(lead.fbp ? { fbp: lead.fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        ...(lead.url ? { event_source_url: lead.url } : {}),
        user_data,
        custom_data: { content_category: lead.tipoSeguro },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`Meta CAPI respondió ${res.status}: ${detalle.slice(0, 300)}`);
  }
}
