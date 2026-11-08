// Páginas locales (ramo + ciudad).
//
// Regla anti-contenido delgado: una página local solo se publica con
// contenido propio de esa ciudad (aliados en convenio, riesgos locales, el
// asesor que atiende). Si falta, queda en noindex. Nunca se clona una página
// cambiando solo el nombre de la ciudad.

import type { PaginaLocal } from "./tipos";

export const PAGINAS_LOCALES: PaginaLocal[] = [
  {
    rutaMadre: "/pymes/polizas-de-cumplimiento",
    ciudad: "barranquilla",
    title: "Póliza de cumplimiento en Barranquilla | VanTrust",
    description:
      "Póliza de cumplimiento en Barranquilla para licitaciones y contratos públicos o privados. Envíanos el pliego por WhatsApp y te asesoramos gratis.",
    h1: "Póliza de cumplimiento en Barranquilla",
    respuesta:
      "En VanTrust, desde nuestra oficina en Barranquilla, tramitamos pólizas de cumplimiento para empresas y contratistas del Atlántico que se presentan a licitaciones o firman contratos públicos y privados. Nos envías el pliego y te decimos qué amparos necesitas.",
    secciones: [
      {
        titulo: "Contratación pública en Barranquilla y el Atlántico",
        bloques: [
          {
            tipo: "p",
            texto:
              "Los procesos de las entidades públicas de la ciudad y del departamento se publican en SECOP, y el pliego de cada uno indica las garantías que exige. Revisamos ese pliego contigo antes de la fecha de cierre para que la póliza de seriedad de la oferta llegue a tiempo.",
          },
        ],
      },
    ],
    faqs: [],
    aliados: [],
    asesor: null,
    todo: [
      "Asesor que atiende pymes en Barranquilla (nombre, cargo y foto).",
      "Experiencia local verificable: tipos de contratos o sectores en los que VanTrust ya tramitó pólizas en la ciudad.",
      "Preguntas frecuentes reales de clientes de Barranquilla.",
    ],
  },
  {
    rutaMadre: "/seguros/automoviles",
    ciudad: "barranquilla",
    title: "Seguro de carro en Barranquilla | VanTrust",
    description:
      "Cotiza el seguro todo riesgo de tu carro en Barranquilla con varias aseguradoras. Asesor local y acompañamiento si chocas o te roban. Cotiza gratis.",
    h1: "Seguro de carro en Barranquilla",
    respuesta:
      "En VanTrust cotizamos el seguro todo riesgo de tu carro en Barranquilla con varias aseguradoras y te atendemos desde nuestra oficina en la ciudad. Si tienes un choque o un robo, tu asesor te acompaña en la reclamación.",
    secciones: [
      {
        titulo: "Arroyos y lluvias: qué revisar en tu póliza",
        bloques: [
          {
            tipo: "p",
            texto:
              "En temporada de lluvias los arroyos de Barranquilla pueden arrastrar o inundar vehículos. Antes de elegir, revisa que la póliza cubra los daños por eventos de la naturaleza e inundación, y cuál es el deducible de esa cobertura.",
          },
        ],
      },
    ],
    faqs: [],
    aliados: [],
    asesor: null,
    todo: [
      "Talleres en convenio en Barranquilla (de las aseguradoras aliadas).",
      "Asesor de autos que atiende en Barranquilla (nombre, cargo y foto).",
      "Preguntas frecuentes reales de clientes de Barranquilla.",
    ],
  },
];

export function getPaginaLocal(rutaMadre: string, ciudad: string) {
  return PAGINAS_LOCALES.find((p) => p.rutaMadre === rutaMadre && p.ciudad === ciudad);
}

export function localesDe(rutaMadre: string) {
  return PAGINAS_LOCALES.filter((p) => p.rutaMadre === rutaMadre);
}
