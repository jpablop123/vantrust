import { waMensajeDe } from "@/data/seguros";

// Configuración central de VanTrust — fuente única de verdad para contacto y marca.

export const SITE = {
  name: "VanTrust",
  legalName: "Vantrust Agencia de Seguros LTDA.",
  nit: "902.039.863-0", // DV calculado con algoritmo DIAN — confirmar con RUT
  city: "Barranquilla",
  tagline: "Soluciones seguras para proteger lo que más valoras.",

  // Contacto
  phoneDisplay: "+57 310 608 3637",
  phoneTel: "+573106083637",
  whatsapp: "573106083637", // formato wa.me (sin +, sin espacios)
  email: "coordinador@vantrust.com.co",
  agencyEmail: "agencia@vantrust.com.co",

  // Dirección
  address: "Calle 77b No. 59-61, oficina 612",

  // Horario / respuesta
  responseTime: "1 hora",
  responseTimePhrase:
    "Nos comunicaremos contigo en un plazo aproximado de 1 hora.",
  hours: "Lun - Vie · 8am - 7pm",

  // Redes sociales (solo las cuentas oficiales confirmadas)
  social: {
    instagram: "https://www.instagram.com/vantrustseguros",
    linkedin: "",
    facebook: "",
  },

  // Portal de clientes
  portal: "https://vantrust.aswebseguros.co/index.php",
} as const;

// Aseguradoras aliadas (listado oficial vigente)
export const INSURERS = [
  "Allianz",
  "AXA Colpatria",
  "Coomeva",
  "Equidad Seguros",
  "HDI Seguros",
  "Mundial Seguros",
  "SBS Seguros",
  "Seguros Bolívar",
  "Sura",
  "Zurich",
] as const;

// Número de WhatsApp: variable de entorno si existe, si no el oficial.
const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE.whatsapp
).replace(/\D/g, "");

export const WA_DEFAULT = "Hola, quiero cotizar un seguro con VanTrust";

export interface WaLead {
  nombre?: string;
  tipoSeguro?: string; // etiqueta legible: "Seguro de Automóvil"
  resumen?: { label: string; value: string }[];
}

/** Mensaje para quien acaba de dejar sus datos y no quiere esperar. */
function mensajeDeLead(lead: WaLead): string {
  const nombre = (lead.nombre || "").trim().split(/\s+/)[0];
  const lineas = [
    `Hola${nombre ? `, soy ${nombre}` : ""}. Acabo de enviar una solicitud${
      lead.tipoSeguro ? ` de ${lead.tipoSeguro}` : ""
    } en la web y no quiero esperar.`,
    ...(lead.resumen || [])
      .filter((r) => r.value)
      .map((r) => `• ${r.label}: ${r.value}`),
  ];
  return lineas.join("\n");
}

/**
 * Enlace de WhatsApp con mensaje prellenado. Prioridad del texto:
 * `mensaje` explícito > resumen del `lead` > mensaje del `ramo` > genérico.
 * `ramo` acepta el slug del producto o la clave del formulario ("vehiculo").
 */
export function waLink(
  opts: { ramo?: string; mensaje?: string; lead?: WaLead } = {}
): string {
  const text =
    opts.mensaje ||
    (opts.lead ? mensajeDeLead(opts.lead) : "") ||
    (opts.ramo ? waMensajeDe(opts.ramo) : "") ||
    WA_DEFAULT;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Enlace mailto con asunto opcional.
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${SITE.email}${qs ? `?${qs}` : ""}`;
}
