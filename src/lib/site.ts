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

// Construye un enlace de WhatsApp con mensaje pre-cargado.
export function waLink(
  text = "Hola, quiero cotizar un seguro con VanTrust"
): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Enlace mailto con asunto opcional.
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${SITE.email}${qs ? `?${qs}` : ""}`;
}
