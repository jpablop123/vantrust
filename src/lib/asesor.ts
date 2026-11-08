import "server-only";

// Asesor que aparece en la respuesta automática al cliente. Se configura por
// variables de entorno para cambiarlo sin tocar código:
//   ASESOR_NOMBRE   "Laura Gómez"          (sin esto, el correo sale genérico)
//   ASESOR_CARGO    "Asesora de seguros"   (opcional)
//   ASESOR_FOTO     "/asesor.jpg" o URL     (opcional; ruta en /public o URL absoluta)
//   ASESOR_WHATSAPP "573001234567"          (opcional; si no, el número del sitio)
//
// Nada inventado: si falta el nombre, no se muestra ninguna persona.

const BASE = process.env.SITE_URL || "https://vantrust.vercel.app";

export interface Asesor {
  nombre: string;
  cargo: string;
  foto?: string; // URL absoluta, lista para un <img> de correo
  whatsapp?: string; // solo dígitos con indicativo
}

export function getAsesor(): Asesor | null {
  const nombre = process.env.ASESOR_NOMBRE?.trim();
  if (!nombre) return null;
  const foto = process.env.ASESOR_FOTO?.trim();
  return {
    nombre,
    cargo: process.env.ASESOR_CARGO?.trim() || "Asesor de seguros",
    foto: foto ? (/^https?:\/\//.test(foto) ? foto : `${BASE}${foto.startsWith("/") ? "" : "/"}${foto}`) : undefined,
    whatsapp: process.env.ASESOR_WHATSAPP?.replace(/\D/g, "") || undefined,
  };
}
