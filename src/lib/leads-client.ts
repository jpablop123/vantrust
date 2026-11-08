// Envío de leads desde el navegador. Centraliza lo que todo formulario debe
// mandar: atribución de campaña, id de evento para Meta y el consentimiento.

import {
  leerAtribucion,
  leerCookiesMeta,
  newEventId,
  track,
} from "@/lib/tracking";

export interface LeadPayload {
  nombre: string;
  telefono: string;
  tipoSeguro: string;
  email?: string;
  ciudad?: string;
  placa?: string;
  horario?: string;
  mensaje?: string;
  marca_carro?: string;
  modelo_carro?: string;
  anno_carro?: string | number;
  uso_diario?: string;
  detalles?: Record<string, string>;
  fuente?: string;
}

export type LeadResult =
  | { ok: true; id: string }
  | { ok: false; status: number; error: string };

async function enviar(
  method: "POST" | "PATCH",
  body: Record<string, unknown>,
  url = "/api/leads"
): Promise<LeadResult> {
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error:
          json?.error ||
          "Hubo un problema, intenta de nuevo o escríbenos por WhatsApp",
      };
    }
    return { ok: true, id: json?.id || "" };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Sin conexión. Intenta de nuevo o escríbenos por WhatsApp",
    };
  }
}

/**
 * Paso 1: crea el lead. Dispara "Lead" en Pixel/GA4 con el mismo event_id que
 * el servidor manda a Conversions API, para que Meta lo cuente una sola vez.
 */
export async function crearLead(
  payload: LeadPayload,
  opts: { autorizacion: boolean; estado?: "parcial" | "completo" }
): Promise<LeadResult> {
  const eventId = newEventId();
  const r = await enviar("POST", {
    ...payload,
    estado: opts.estado ?? "parcial",
    autorizacion: opts.autorizacion,
    atribucion: leerAtribucion(),
    event_id: eventId,
    ...leerCookiesMeta(),
  });
  if (r.ok) {
    track(
      "Lead",
      { content_category: payload.tipoSeguro, fuente: payload.fuente },
      eventId
    );
  }
  return r;
}

/** Paso 2: completa el lead con los datos del ramo. No vuelve a contar Lead. */
export function completarLead(
  id: string,
  payload: LeadPayload,
  opts: { emailNuevo?: boolean } = {}
): Promise<LeadResult> {
  return enviar("PATCH", { id, ...payload, emailNuevo: !!opts.emailNuevo });
}

export interface RenovacionPayload {
  nombre: string;
  telefono: string;
  ramo: string;
  aseguradora?: string;
  placa?: string;
  fecha_vencimiento: string; // YYYY-MM-DD
}

/** Registro en la base de renovaciones. Cuenta como Lead en Meta y GA4. */
export async function crearRenovacion(
  payload: RenovacionPayload,
  opts: { autorizacion: boolean }
): Promise<LeadResult> {
  const eventId = newEventId();
  const r = await enviar(
    "POST",
    {
      ...payload,
      autorizacion: opts.autorizacion,
      atribucion: leerAtribucion(),
      event_id: eventId,
      ...leerCookiesMeta(),
    },
    "/api/renovaciones"
  );
  if (r.ok) {
    track(
      "Lead",
      { content_category: `renovacion_${payload.ramo}`, fuente: "renovacion" },
      eventId
    );
  }
  return r;
}
