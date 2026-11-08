// Guías informativas (SEO + AEO).
//
// Formato obligatorio: respuesta directa en los 2–3 primeros renglones,
// después detalle/tablas/pasos, FAQ de 3–5 preguntas, autor real y fecha, y
// CTA de WhatsApp del ramo. Claude redacta; un asesor de VanTrust revisa.
// Sin `revisadoPor` y `autor`, la guía queda en noindex y no se enlaza.

import type { Guia } from "./tipos";

const PENDIENTE_REVISION = [
  "Autor: asesor real de VanTrust con nombre, cargo y foto.",
  "Revisión y aprobación del texto por un asesor (llenar `revisadoPor`).",
];

export const GUIAS: Guia[] = [
  {
    slug: "que-es-poliza-de-cumplimiento-licitacion",
    titulo: "¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación?",
    title: "Qué es una póliza de cumplimiento y cuándo la piden",
    description:
      "Qué es la póliza de cumplimiento, qué amparos tiene y en qué momento de una licitación te la piden. Guía clara para contratistas y pymes en Colombia.",
    respuesta:
      "Una póliza de cumplimiento es un seguro que garantiza a la entidad contratante que el contratista cumplirá el contrato; si no lo hace, la aseguradora paga los perjuicios hasta el valor asegurado. En una licitación se pide dos veces: la de seriedad de la oferta al presentar la propuesta y la de cumplimiento después de la adjudicación, antes de ejecutar el contrato.",
    secciones: [
      {
        titulo: "Las partes de la póliza",
        bloques: [
          {
            tipo: "tabla",
            caption: "Quién es quién en una póliza de cumplimiento",
            columnas: ["Parte", "Quién es"],
            filas: [
              ["Tomador o afianzado", "El contratista que se obliga a cumplir."],
              ["Asegurado y beneficiario", "La entidad o empresa contratante."],
              ["Aseguradora", "La compañía que respalda la obligación y paga si hay incumplimiento."],
            ],
          },
        ],
      },
      {
        titulo: "¿En qué momento de la licitación la piden?",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Al presentar la oferta: garantía de seriedad de la oferta. Respalda que mantendrás tu propuesta y firmarás si te adjudican.",
              "Después de la adjudicación: garantía de cumplimiento con los amparos del contrato. Su aprobación por la entidad es requisito para empezar a ejecutarlo.",
              "Durante la ejecución: si el contrato se prorroga o se adiciona, la póliza se modifica.",
              "Al terminar: algunos amparos, como estabilidad de la obra o pago de salarios, siguen vigentes después de la entrega.",
            ],
          },
        ],
      },
      {
        titulo: "Amparos más comunes",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Seriedad de la oferta.",
              "Buen manejo y correcta inversión del anticipo.",
              "Devolución del pago anticipado.",
              "Cumplimiento del contrato.",
              "Pago de salarios, prestaciones sociales e indemnizaciones laborales.",
              "Estabilidad y calidad de la obra.",
              "Calidad y correcto funcionamiento de los bienes.",
              "Calidad del servicio.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El pliego de condiciones fija qué amparos se exigen, por qué porcentaje del valor y con qué vigencia. Los mínimos de la contratación estatal están en el Decreto 1082 de 2015.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Todas las licitaciones piden póliza de cumplimiento?",
        respuesta:
          "La mayoría de procesos de contratación estatal exigen garantías. En algunos, como los de mínima cuantía, la entidad puede decidir no pedirlas. El pliego lo dice.",
      },
      {
        pregunta: "¿Cuánto tiempo antes debo tramitar la póliza de seriedad de la oferta?",
        respuesta:
          "Con margen antes del cierre del proceso, porque la aseguradora necesita estudiar la documentación de la empresa. Si es tu primera póliza con esa aseguradora, el estudio toma más tiempo.",
      },
      {
        pregunta: "¿Qué pasa si no presento la póliza?",
        respuesta:
          "Sin la garantía de seriedad la oferta puede ser rechazada, y sin la garantía de cumplimiento aprobada el contrato no puede empezar a ejecutarse.",
      },
      {
        pregunta: "¿La aseguradora puede negarme la póliza?",
        respuesta:
          "Sí. La aseguradora evalúa la capacidad financiera y la experiencia del contratista. Por eso conviene presentar el caso a varias aseguradoras.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje: "Hola, necesito una póliza de cumplimiento para una licitación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      "Verificar con el asesor las referencias normativas (Ley 80 de 1993, Ley 1150 de 2007, Decreto 1082 de 2015) y la regla de mínima cuantía.",
    ],
  },
  {
    slug: "requisitos-poliza-de-cumplimiento",
    titulo: "Requisitos para sacar una póliza de cumplimiento",
    title: "Requisitos para sacar una póliza de cumplimiento",
    description:
      "Documentos que piden las aseguradoras para expedir una póliza de cumplimiento a una empresa o persona natural. Lista completa y consejos para no demorarte.",
    respuesta:
      "Para sacar una póliza de cumplimiento necesitas el pliego o el contrato que la exige y la documentación de quien la toma: certificado de existencia y representación legal reciente, RUT, estados financieros, cédula del representante legal y el formulario de conocimiento del cliente de la aseguradora. Cada aseguradora puede pedir documentos adicionales.",
    secciones: [
      {
        titulo: "Documentos de la empresa",
        bloques: [
          {
            tipo: "tabla",
            caption: "Documentos que suelen pedir las aseguradoras",
            columnas: ["Documento", "Para qué sirve"],
            filas: [
              ["Pliego de condiciones o minuta del contrato", "Define amparos, valores, vigencias y beneficiario."],
              ["Certificado de existencia y representación legal (Cámara de Comercio)", "Acredita la empresa y quién la representa."],
              ["RUT", "Identificación tributaria."],
              ["Estados financieros con notas", "Permiten a la aseguradora estudiar la capacidad financiera."],
              ["Cédula del representante legal", "Identificación de quien firma."],
              ["Formulario de conocimiento del cliente (SARLAFT)", "Requisito de prevención de lavado de activos."],
              ["Experiencia: contratos ejecutados o en ejecución", "Respaldo técnico, sobre todo en obra."],
            ],
          },
        ],
      },
      {
        titulo: "Si eres persona natural",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Cédula de ciudadanía.",
              "RUT.",
              "Soportes de ingresos o declaración de renta.",
              "Formulario de conocimiento del cliente.",
              "El contrato o pliego.",
            ],
          },
        ],
      },
      {
        titulo: "Cómo evitar demoras",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Ten el certificado de Cámara de Comercio actualizado.",
              "Prepara los estados financieros del último cierre firmados por contador.",
              "Envía el pliego completo, no solo el anexo de garantías.",
              "Si la aseguradora pide contragarantía (por ejemplo, un pagaré), tenla lista para firmar.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Una empresa recién creada puede sacar póliza de cumplimiento?",
        respuesta:
          "Puede intentarlo, pero sin historia financiera la aseguradora tiene menos información para estudiarla y puede pedir más respaldo o negar el cupo. Presentar el caso a varias aseguradoras ayuda.",
      },
      {
        pregunta: "¿Qué es el cupo en una póliza de cumplimiento?",
        respuesta:
          "Es el monto máximo que una aseguradora está dispuesta a garantizarle a un contratista, según su estudio financiero. Las pólizas que tenga vigentes consumen ese cupo.",
      },
      {
        pregunta: "¿Qué es la contragarantía?",
        respuesta:
          "Es el documento con el que el contratista se compromete a devolverle a la aseguradora lo que esta pague si hay un incumplimiento. Suele ser un pagaré con carta de instrucciones.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje: "Hola, necesito una póliza de cumplimiento. ¿Qué documentos debo enviar?",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      "Confirmar con el asesor la lista de documentos que piden las aseguradoras con las que trabaja VanTrust.",
    ],
  },
  {
    slug: "poliza-de-cumplimiento-vs-responsabilidad-civil",
    titulo: "Póliza de cumplimiento vs. póliza de responsabilidad civil: diferencias",
    title: "Póliza de cumplimiento vs. responsabilidad civil",
    description:
      "La póliza de cumplimiento y la de responsabilidad civil protegen cosas distintas. Te explicamos a quién protege cada una y cuándo te piden las dos.",
    respuesta:
      "La póliza de cumplimiento protege al contratante si el contratista no cumple el contrato. La póliza de responsabilidad civil extracontractual protege al contratista frente a reclamaciones de terceros por daños que cause mientras trabaja. Por eso muchos contratos exigen las dos.",
    secciones: [
      {
        titulo: "Diferencias principales",
        bloques: [
          {
            tipo: "tabla",
            caption: "Comparación entre póliza de cumplimiento y de responsabilidad civil",
            columnas: ["", "Cumplimiento", "Responsabilidad civil extracontractual"],
            filas: [
              ["Qué cubre", "El incumplimiento de las obligaciones del contrato.", "Daños o lesiones causados a terceros."],
              ["A quién indemniza", "A la entidad o empresa contratante.", "Al tercero afectado."],
              ["Quién la toma", "El contratista.", "El contratista o la empresa."],
              ["Cuándo se usa", "Cuando el contratista no cumple.", "Cuando un tercero reclama por un daño."],
              ["Recobro al contratista", "Sí: la aseguradora puede cobrarle lo pagado.", "No, salvo casos excluidos."],
            ],
          },
        ],
      },
      {
        titulo: "Un ejemplo",
        bloques: [
          {
            tipo: "p",
            texto:
              "Una empresa contrata la remodelación de una sede. Si el contratista abandona la obra, se afecta la póliza de cumplimiento. Si durante la obra cae material sobre un carro estacionado en la calle, el dueño del carro reclama a la póliza de responsabilidad civil.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo tener las dos pólizas con la misma aseguradora?",
        respuesta: "Sí, y suele facilitar el trámite porque la aseguradora ya conoce a la empresa.",
      },
      {
        pregunta: "¿La póliza de cumplimiento cubre los daños a terceros?",
        respuesta:
          "No. Los daños a terceros se cubren con la póliza de responsabilidad civil extracontractual.",
      },
      {
        pregunta: "¿Por qué la aseguradora me puede cobrar lo que pagó en una póliza de cumplimiento?",
        respuesta:
          "Porque la póliza de cumplimiento funciona como una garantía de tu obligación: si la aseguradora paga por tu incumplimiento, tiene derecho a recobrarte. Por eso piden contragarantía.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje: "Hola, necesito asesoría sobre pólizas de cumplimiento y responsabilidad civil.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [...PENDIENTE_REVISION],
  },
];

/** Las 12 guías del plan que aún no tienen borrador (slugs reservados). */
export const GUIAS_PENDIENTES = [
  { slug: "que-cubre-seguro-todo-riesgo-carro", titulo: "¿Qué cubre un seguro todo riesgo de carro en Colombia?" },
  { slug: "que-hacer-si-chocas", titulo: "Qué hacer si chocas: paso a paso" },
  { slug: "deducible-seguro-de-carro", titulo: "Deducible del seguro de carro: qué es y cómo elegirlo" },
  { slug: "seguro-de-salud-si-ya-tengo-eps", titulo: "¿Vale la pena un seguro de salud complementario si ya tengo EPS?" },
  { slug: "seguro-de-vida-cuanto-asegurar", titulo: "Seguro de vida: cuánto asegurar y quién lo necesita" },
  { slug: "seguro-de-arrendamiento-que-cubre", titulo: "Seguro de arrendamiento: qué cubre para propietarios" },
  { slug: "seguro-de-hogar-que-cubre", titulo: "Seguro de hogar: qué cubre y qué no" },
  { slug: "cambiar-de-aseguradora-al-renovar", titulo: "Cómo cambiar de aseguradora sin quedarte desprotegido al renovar" },
  { slug: "agencia-de-seguros-vs-aseguradora-directa", titulo: "Corredor/agencia de seguros vs. comprar directo a la aseguradora" },
];

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}

export function guiaPublicable(g: Guia): boolean {
  return Boolean(g.autor && g.revisadoPor) && (!g.todo || g.todo.length === 0);
}

/** Guías que se pueden enlazar desde otras páginas (solo las publicadas). */
export function guiasEnlazables(slugs: string[] = []): Guia[] {
  return slugs
    .map(getGuia)
    .filter((g): g is Guia => Boolean(g && guiaPublicable(g)));
}
