// Landings para anuncios (/l/[slug]): una oferta, tres beneficios, el
// formulario corto y WhatsApp. Sin menú: el único camino es convertir.
// Son noindex (src/app/l/layout.tsx): no compiten con las páginas SEO.
//
// Para una landing nueva basta con agregar un objeto aquí y apuntar el anuncio
// a /l/<slug>?utm_source=...&utm_campaign=...

export type LandingForm = "auto" | "cumplimiento" | "renovacion";

export interface Landing {
  slug: string;
  /** <title> y descripción para la vista previa al compartir. */
  metaTitle: string;
  metaDescription: string;
  etiqueta: string;
  titulo: string;
  tituloDestacado: string; // parte del titular en dorado
  subtitulo: string;
  beneficios: [Beneficio, Beneficio, Beneficio];
  form: LandingForm;
  formTitulo: string;
  /** Ramo para el mensaje de WhatsApp (slug de seguros.ts). */
  waRamo?: string;
  waMensaje?: string;
}

export interface Beneficio {
  titulo: string;
  texto: string;
}

export const LANDINGS: Landing[] = [
  {
    slug: "seguro-carro-barranquilla",
    metaTitle: "Seguro de carro en Barranquilla con asesor | VanTrust",
    metaDescription:
      "Cotiza el seguro todo riesgo de tu carro en Barranquilla. Un asesor te escribe por WhatsApp con opciones de varias aseguradoras y te acompaña si chocas.",
    etiqueta: "Seguro de carro · Barranquilla",
    titulo: "Asegura tu carro con alguien",
    tituloDestacado: "que te contesta",
    subtitulo:
      "Escribe tu placa y tu WhatsApp. Un asesor de VanTrust en Barranquilla te escribe con opciones de varias aseguradoras, sin call center.",
    beneficios: [
      {
        titulo: "Asesor humano por WhatsApp",
        texto: "Una persona con nombre te atiende, no un bot ni un formulario eterno.",
      },
      {
        titulo: "Comparamos varias aseguradoras",
        texto: "Te mostramos coberturas y precios lado a lado para que decidas.",
      },
      {
        titulo: "Te acompañamos si chocas",
        texto: "Te guiamos en la reclamación con la aseguradora de principio a fin.",
      },
    ],
    form: "auto",
    formTitulo: "Cotiza tu carro",
    waRamo: "automoviles",
  },
  {
    slug: "cumplimiento-licitaciones",
    metaTitle: "Pólizas de cumplimiento para licitaciones y contratos | VanTrust",
    metaDescription:
      "¿Te pidieron póliza de cumplimiento para una licitación o contrato? Un asesor revisa los requisitos contigo y gestiona la póliza con la aseguradora.",
    etiqueta: "Pólizas de cumplimiento",
    titulo: "¿Te pidieron póliza para",
    tituloDestacado: "una licitación o contrato?",
    subtitulo:
      "Cuéntanos el contrato y la fecha de cierre. Un asesor revisa contigo los amparos que te exigen y gestiona la póliza con la aseguradora.",
    beneficios: [
      {
        titulo: "Revisamos los requisitos",
        texto: "Seriedad de la oferta, cumplimiento, anticipo, salarios: te decimos qué aplica.",
      },
      {
        titulo: "Trabajamos con tu fecha de cierre",
        texto: "Dinos para cuándo la necesitas y priorizamos tu solicitud.",
      },
      {
        titulo: "Un asesor para tu empresa",
        texto: "La misma persona te acompaña en esta y en tus próximas pólizas.",
      },
    ],
    form: "cumplimiento",
    formTitulo: "Solicita tu póliza",
    waRamo: "cumplimiento",
  },
  {
    slug: "renovacion-poliza",
    metaTitle: "¿Se vence tu póliza? Compara antes de renovar | VanTrust",
    metaDescription:
      "Déjanos la fecha de vencimiento de tu seguro de auto, hogar, salud o empresa. Te avisamos 30 días antes y te comparamos aseguradoras.",
    etiqueta: "Renovación de pólizas",
    titulo: "No renueves en automático:",
    tituloDestacado: "compara primero",
    subtitulo:
      "Déjanos la fecha de vencimiento. 30 días antes te escribimos con opciones de varias aseguradoras para que renueves con información.",
    beneficios: [
      {
        titulo: "Te avisamos 30 días antes",
        texto: "Con tiempo para comparar, no a última hora.",
      },
      {
        titulo: "Comparamos por ti",
        texto: "Varias aseguradoras, coberturas lado a lado.",
      },
      {
        titulo: "Asesor humano",
        texto: "Te escribe por WhatsApp y te acompaña si tienes un siniestro.",
      },
    ],
    form: "renovacion",
    formTitulo: "Registra tu vencimiento",
    waMensaje: "Hola, mi póliza está por vencer y quiero comparar opciones antes de renovar.",
  },
];

export function getLanding(slug: string): Landing | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}
