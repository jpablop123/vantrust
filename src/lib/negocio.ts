// Datos de la entidad VanTrust para SEO, datos estructurados y AEO.
//
// Nombre, dirección y teléfono (NAP) tienen que ser idénticos en el sitio,
// Google Business, redes y directorios: la IA y Google "confían" en una
// entidad cuando la encuentran igual en todas partes. Todo sale de aquí.
//
// Regla: nada inventado. Lo que falte va en TODO_NEGOCIO y las páginas que
// dependen de ese dato (p. ej. /sobre-vantrust) quedan en noindex.

import { SITE, INSURERS } from "@/lib/site";

export const SITE_URL = "https://vantrust.com.co";

export const NEGOCIO = {
  nombre: SITE.name,
  razonSocial: SITE.legalName,
  nit: SITE.nit,
  url: SITE_URL,
  logo: `${SITE_URL}/vantrust-logo-nuevo.jpeg`,
  imagen: `${SITE_URL}/vantrust-banner.jpeg`,
  descripcion:
    "Agencia de seguros en Barranquilla. Compara opciones de varias aseguradoras para personas y empresas, con asesoría gratuita y acompañamiento en siniestros.",

  telefono: SITE.phoneTel, // E.164
  telefonoVisible: SITE.phoneDisplay,
  whatsapp: SITE.whatsapp,
  email: SITE.email,

  direccion: {
    calle: SITE.address,
    ciudad: "Barranquilla",
    region: "Atlántico",
    pais: "CO",
    codigoPostal: "", // TODO: código postal de la oficina
  },
  // TODO: coordenadas exactas de la oficina (las mismas del pin de Google Business).
  geo: null as { lat: number; lng: number } | null,

  // Debe coincidir con SITE.hours y con Google Business.
  horario: [
    {
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      abre: "08:00",
      cierra: "19:00",
    },
  ],
  horarioVisible: SITE.hours,

  areaServed: ["Barranquilla", "Atlántico", "Colombia"],

  // Perfiles oficiales. Solo cuentas confirmadas.
  sameAs: [
    SITE.social.instagram,
    SITE.social.linkedin,
    SITE.social.facebook,
    "", // TODO: URL del perfil de Google Business (maps.app.goo.gl/...)
  ].filter(Boolean),

  aseguradoras: INSURERS,
} as const;

/** Datos que faltan para completar la entidad (se muestran en el resumen SEO). */
export const TODO_NEGOCIO = [
  !NEGOCIO.direccion.codigoPostal && "Código postal de la oficina",
  !NEGOCIO.geo && "Coordenadas de la oficina (las del pin de Google Business)",
  "URL del perfil de Google Business para sameAs",
  "Confirmar el NIT con el RUT (en site.ts dice «confirmar con RUT»)",
].filter(Boolean) as string[];
