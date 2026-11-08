// Contenido SEO/AEO de las páginas madre de cada ramo prioritario.
//
// Reglas (PLAN-SEO): nada de precios, cifras ni testimonios inventados. Si
// falta un dato real, va en `todo` y la página sale en noindex hasta que
// alguien lo complete. Ninguna página trata el SOAT como producto.

import type { PaginaRamo } from "./tipos";
import { PYME_A_SLUG } from "./pymes";

export const PAGINAS_RAMO: PaginaRamo[] = [
  // ───────────────────────────── PYMES ─────────────────────────────
  {
    ruta: "/pymes/polizas-de-cumplimiento",
    seguroSlug: "cumplimiento",
    serviceType: "Póliza de cumplimiento",
    title: "Póliza de cumplimiento para licitaciones | VanTrust",
    description:
      "Tramitamos tu póliza de cumplimiento para licitaciones y contratos con varias aseguradoras. Envíanos el pliego por WhatsApp y te asesoramos gratis.",
    h1: "Póliza de cumplimiento para licitaciones y contratos",
    respuesta:
      "La póliza de cumplimiento es un seguro que garantiza a la entidad o empresa contratante que el contratista cumplirá lo pactado. Si no cumple, la aseguradora indemniza los perjuicios hasta el valor asegurado. En VanTrust la tramitamos con varias aseguradoras a partir del pliego o del contrato.",
    secciones: [
      {
        titulo: "¿Qué amparos puede incluir una póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Una misma póliza agrupa varios amparos. El pliego de condiciones o el contrato dice cuáles se exigen, por qué valor y con qué vigencia.",
          },
          {
            tipo: "tabla",
            caption: "Amparos frecuentes de la póliza de cumplimiento",
            columnas: ["Amparo", "Qué garantiza"],
            filas: [
              ["Seriedad de la oferta", "Que el proponente mantenga su oferta y firme el contrato si se lo adjudican."],
              ["Buen manejo y correcta inversión del anticipo", "Que el dinero entregado como anticipo se use en el objeto del contrato."],
              ["Cumplimiento del contrato", "Que el contratista ejecute las obligaciones pactadas."],
              ["Pago de salarios y prestaciones sociales", "Que el contratista pague a los trabajadores que emplea en el contrato."],
              ["Estabilidad y calidad de la obra", "Que la obra entregada no presente daños imputables al contratista."],
              ["Calidad y correcto funcionamiento de los bienes", "Que los bienes suministrados cumplan lo pactado y funcionen."],
              ["Calidad del servicio", "Que el servicio contratado se preste en las condiciones exigidas."],
            ],
          },
        ],
      },
      {
        titulo: "¿Quién pide la póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Las entidades públicas la exigen en licitaciones y contratos estatales; las garantías de la contratación pública están reguladas por la Ley 80 de 1993, la Ley 1150 de 2007 y el Decreto 1082 de 2015. Las empresas privadas también la piden en contratos de obra, suministro o prestación de servicios.",
          },
        ],
      },
      {
        titulo: "Cómo tramitamos tu póliza",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Nos envías por WhatsApp el pliego de condiciones o la minuta del contrato.",
              "Revisamos los amparos, valores y vigencias que exige el contratante.",
              "Te pedimos la documentación de la empresa para el estudio de la aseguradora.",
              "Presentamos tu caso a varias aseguradoras y te mostramos las opciones.",
              "Se expide la póliza a favor del beneficiario que indica el contrato.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Quién es el tomador y quién el beneficiario de la póliza de cumplimiento?",
        respuesta:
          "El tomador (o afianzado) es el contratista que se obliga a cumplir. El asegurado y beneficiario es la entidad o empresa contratante, que es quien recibe la indemnización si hay incumplimiento.",
      },
      {
        pregunta: "¿Una persona natural puede sacar una póliza de cumplimiento?",
        respuesta:
          "Sí. Tanto empresas como personas naturales que firman un contrato pueden ser afianzados. La aseguradora estudia la capacidad financiera y la experiencia de quien la solicita.",
      },
      {
        pregunta: "¿Qué pasa con la póliza si el contrato se prorroga o se adiciona?",
        respuesta:
          "Hay que modificar la póliza para ampliar la vigencia o el valor asegurado según el otrosí. Si no se ajusta, la garantía puede quedar por debajo de lo que exige el contrato.",
      },
      {
        pregunta: "¿La póliza de cumplimiento es lo mismo que una garantía bancaria?",
        respuesta:
          "No. Ambas pueden servir como garantía en la contratación estatal, pero la póliza la expide una aseguradora y la garantía bancaria un banco. El contrato o el pliego indica cuáles acepta.",
      },
    ],
    guias: [
      "que-es-poliza-de-cumplimiento-licitacion",
      "requisitos-poliza-de-cumplimiento",
      "cuanto-cuesta-poliza-de-cumplimiento",
      "poliza-de-cumplimiento-contrato-entre-particulares",
      "poliza-de-cumplimiento-vs-responsabilidad-civil",
    ],
    waMensaje: "Hola, necesito una póliza de cumplimiento para una licitación.",
  },
  {
    ruta: "/pymes/responsabilidad-civil",
    seguroSlug: "responsabilidad-civil-extracontractual",
    serviceType: "Seguro de responsabilidad civil extracontractual",
    title: "Póliza de responsabilidad civil para empresas | VanTrust",
    description:
      "Protege tu empresa frente a reclamaciones de terceros con una póliza de responsabilidad civil extracontractual. Cotiza gratis con un asesor de VanTrust.",
    h1: "Póliza de responsabilidad civil extracontractual para empresas",
    respuesta:
      "La póliza de responsabilidad civil extracontractual cubre lo que tu empresa tendría que pagar a terceros por daños o lesiones que les cause sin querer durante su actividad, incluidos los gastos de defensa según las condiciones. Muchos contratos la exigen junto con la póliza de cumplimiento.",
    secciones: [
      {
        titulo: "¿Qué diferencia hay entre responsabilidad civil contractual y extracontractual?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La responsabilidad contractual nace de incumplir un contrato con alguien. La extracontractual nace de causar un daño a una persona con la que no hay contrato: un transeúnte, un vecino o un visitante. Esta póliza se ocupa de la segunda.",
          },
        ],
      },
      {
        titulo: "¿Qué empresas la necesitan?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Negocios con atención al público: locales, restaurantes, consultorios.",
              "Contratistas de obra o de servicios, cuando el contrato la exige.",
              "Empresas que trabajan en instalaciones de sus clientes.",
              "Organizadores de eventos y actividades con asistentes.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿La póliza de responsabilidad civil cubre los daños a mis propios bienes?",
        respuesta:
          "No. Cubre daños causados a terceros. Para los bienes de la empresa se usa un seguro de daños materiales o un seguro Pyme.",
      },
      {
        pregunta: "¿Por qué un contrato me pide póliza de responsabilidad civil y de cumplimiento?",
        respuesta:
          "Porque protegen cosas distintas: la de cumplimiento respalda al contratante si no cumples el contrato; la de responsabilidad civil responde por daños a terceros mientras lo ejecutas.",
      },
      {
        pregunta: "¿Cubre los gastos de abogado si me demandan?",
        respuesta:
          "Muchas pólizas incluyen gastos de defensa y costas judiciales, con los límites y condiciones que fije cada aseguradora. Tu asesor te muestra esa cláusula antes de contratar.",
      },
    ],
    guias: [
      "poliza-responsabilidad-civil-extracontractual-negocio",
      "poliza-de-cumplimiento-vs-responsabilidad-civil",
    ],
    waMensaje:
      "Hola, necesito una póliza de responsabilidad civil extracontractual para mi empresa.",
  },
  {
    ruta: "/pymes/transporte-de-mercancias",
    seguroSlug: "transporte-de-mercancias",
    serviceType: "Seguro de transporte de mercancías",
    title: "Seguro de transporte de mercancías | VanTrust",
    description:
      "Asegura tu carga nacional o internacional con pólizas por despacho o automáticas. Compara opciones de varias aseguradoras con VanTrust. Cotiza gratis.",
    h1: "Seguro de transporte de mercancías",
    respuesta:
      "El seguro de transporte de mercancías cubre la pérdida o el daño de la carga mientras se transporta, desde que sale del origen hasta que llega al destino pactado. Puede tomarse por un solo despacho o como póliza automática para todos los envíos de un periodo.",
    secciones: [
      {
        titulo: "Póliza específica o póliza automática",
        bloques: [
          {
            tipo: "tabla",
            caption: "Modalidades del seguro de transporte",
            columnas: ["Modalidad", "Para quién sirve"],
            filas: [
              ["Específica (por despacho)", "Empresas que envían carga de vez en cuando o un embarque puntual."],
              ["Automática", "Empresas con despachos frecuentes: los envíos quedan cubiertos y se reportan periódicamente."],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de la transportadora cubre mi mercancía?",
        respuesta:
          "No necesariamente. La póliza de la transportadora protege su responsabilidad y tiene sus propios límites. Tener tu propio seguro de transporte protege el valor de tu carga.",
      },
      {
        pregunta: "¿Sirve para importaciones y exportaciones?",
        respuesta:
          "Sí. Se puede asegurar carga nacional e internacional. Las condiciones dependen del medio de transporte y del término de negociación pactado con tu comprador o proveedor.",
      },
      {
        pregunta: "¿Qué necesito para cotizarlo?",
        respuesta:
          "El tipo de mercancía, su valor, el origen y destino, el medio de transporte y la frecuencia de los despachos.",
      },
    ],
    guias: [
      "seguro-transporte-de-mercancias-que-cubre",
      "seguro-para-flota-de-vehiculos-empresa",
    ],
    waMensaje: "Hola, necesito asegurar el transporte de mercancías de mi empresa.",
  },
  {
    ruta: "/pymes/todo-riesgo-pyme",
    seguroSlug: "todo-riesgo-danos-materiales",
    serviceType: "Seguro todo riesgo daños materiales",
    title: "Seguro todo riesgo para pymes | VanTrust",
    description:
      "Protege los activos de tu empresa frente a incendio, terremoto, inundación y robo con un seguro todo riesgo. Cotiza gratis con un asesor de VanTrust.",
    h1: "Seguro todo riesgo daños materiales para pymes",
    respuesta:
      "El seguro todo riesgo daños materiales protege los bienes físicos de la empresa, como edificio, maquinaria, equipos e inventario, frente a pérdidas o daños accidentales como incendio, explosión, terremoto, inundación o robo. Se puede complementar con lucro cesante y responsabilidad civil.",
    secciones: [
      {
        titulo: "¿Todo riesgo o seguro Pyme?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El todo riesgo se concentra en los activos físicos. El seguro Pyme agrupa en una sola póliza los activos y otras coberturas del negocio, como responsabilidad civil, infidelidad de empleados o dinero en efectivo. La elección depende del tamaño de la empresa y de lo que ya tenga asegurado.",
          },
        ],
      },
      {
        titulo: "¿Qué bienes se pueden asegurar?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Edificios y mejoras locativas",
              "Maquinaria y equipos",
              "Equipo electrónico",
              "Muebles y enseres",
              "Mercancías e inventarios",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué es el lucro cesante?",
        respuesta:
          "Es una cobertura que reconoce la utilidad que la empresa deja de percibir mientras está parada por un daño cubierto, por ejemplo un incendio. Se contrata como complemento del todo riesgo.",
      },
      {
        pregunta: "¿Puedo asegurar los bienes si el local es arrendado?",
        respuesta:
          "Sí. El arrendatario puede asegurar sus contenidos, maquinaria e inventario, y las mejoras que haya hecho al local.",
      },
      {
        pregunta: "¿Cómo se define el valor asegurado?",
        respuesta:
          "Debe reflejar lo que cuesta reponer los bienes. Si se asegura por menos, la indemnización puede reducirse en proporción (infraseguro). Tu asesor te ayuda a fijarlo.",
      },
    ],
    guias: [
      "seguro-para-pyme-que-cubre",
      "lucro-cesante-seguro-negocio",
    ],
    waMensaje: "Hola, quiero cotizar un seguro todo riesgo para los activos de mi empresa.",
  },

  // ──────────────────────────── PERSONAS ────────────────────────────
  {
    ruta: "/seguros/automoviles",
    seguroSlug: "automoviles",
    serviceType: "Seguro de automóviles",
    title: "Seguro de carro todo riesgo: cotiza y compara | VanTrust",
    description:
      "Compara el seguro todo riesgo de tu carro entre varias aseguradoras. Te asesoramos gratis y te acompañamos si tienes un choque o un robo. Cotiza hoy.",
    h1: "Seguro de carro todo riesgo",
    respuesta:
      "Un seguro de carro todo riesgo cubre los daños a tu vehículo (pérdida parcial o total), el hurto y la responsabilidad civil frente a terceros, además de asistencias como grúa o carro de reemplazo según el plan. En VanTrust comparamos opciones de varias aseguradoras y te acompañamos si tienes un siniestro.",
    secciones: [
      {
        titulo: "¿Qué influye en el precio del seguro de tu carro?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Marca, línea, modelo y valor comercial del vehículo (la referencia es la Guía de Valores de Fasecolda).",
              "La ciudad donde circula y el uso: particular o comercial.",
              "El deducible que elijas: a mayor deducible, menor prima.",
              "Las coberturas y asistencias que incluyas.",
              "La edad y el historial del conductor.",
            ],
          },
        ],
      },
      {
        titulo: "Cómo cotizamos tu seguro",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Nos das la placa y los datos del conductor principal.",
              "Cotizamos con varias aseguradoras aliadas.",
              "Te explicamos las diferencias de cobertura y deducible, no solo el precio.",
              "Eliges y te ayudamos a expedir la póliza.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué es el deducible en el seguro de carro?",
        respuesta:
          "Es la parte del daño que asumes tú cuando usas el seguro. Puede ser un valor fijo, un porcentaje del daño o el mayor entre ambos, según la póliza.",
      },
      {
        pregunta: "¿Puedo cambiar de aseguradora cuando renuevo?",
        respuesta:
          "Sí. Lo ideal es cotizar antes del vencimiento para que la nueva póliza empiece el mismo día en que termina la anterior y el carro no quede sin cobertura.",
      },
      {
        pregunta: "¿Qué hago si choco?",
        respuesta:
          "Ponte a salvo, revisa si hay heridos (si los hay, llama al 123), toma fotos y datos del otro conductor, llama a la línea de asistencia de tu aseguradora y avísale a tu asesor.",
      },
    ],
    guias: [
      "que-cubre-seguro-todo-riesgo-carro",
      "deducible-seguro-de-carro",
      "precio-seguro-todo-riesgo-barranquilla",
      "que-hacer-si-chocas",
      "carro-inundado-arroyo-barranquilla-seguro",
      "que-hacer-si-roban-tu-carro-seguro",
      "aseguradora-no-paga-siniestro-que-hacer",
      "cambiar-de-aseguradora-al-renovar",
    ],
    waMensaje: "Hola, quiero cotizar el seguro de mi carro. Placa: ",
  },
  {
    ruta: "/seguros/salud",
    seguroSlug: "salud",
    serviceType: "Seguro de salud",
    title: "Seguro de salud complementario a tu EPS | VanTrust",
    description:
      "Compara seguros de salud individuales y familiares que complementan tu EPS: consultas, hospitalización y cirugías. Asesoría gratis con VanTrust.",
    h1: "Seguro de salud complementario a la EPS",
    respuesta:
      "Un seguro de salud te da acceso a una red privada de clínicas y especialistas, adicional a lo que ofrece tu EPS. Según el plan, cubre consultas, hospitalización, cirugías, urgencias y maternidad. Hay planes individuales y familiares.",
    secciones: [
      {
        titulo: "Póliza de salud, plan complementario y medicina prepagada",
        bloques: [
          {
            tipo: "tabla",
            caption: "Opciones de salud adicionales a la EPS en Colombia",
            columnas: ["Opción", "Quién la ofrece"],
            filas: [
              ["Póliza de salud", "Una aseguradora."],
              ["Plan complementario", "La misma EPS, como un plan adicional."],
              ["Medicina prepagada", "Una empresa de medicina prepagada."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Las tres se suman a la EPS. Cambian la red de prestadores, las coberturas, los copagos y las condiciones de ingreso, así que conviene compararlas según tu caso.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de salud cubre enfermedades que ya tengo?",
        respuesta:
          "Depende de la aseguradora y del plan. Las enfermedades preexistentes se declaran en la solicitud y pueden quedar excluidas o con condiciones especiales.",
      },
      {
        pregunta: "¿Puedo usar el seguro desde el primer día?",
        respuesta:
          "Algunas coberturas sí, pero muchos planes tienen periodos de carencia para servicios como maternidad o ciertas cirugías. Tu asesor te muestra esos plazos antes de elegir.",
      },
      {
        pregunta: "¿Puedo incluir a mi familia?",
        respuesta: "Sí. Hay planes familiares que incluyen a cónyuge e hijos en una misma póliza.",
      },
    ],
    guias: ["seguro-de-salud-si-ya-tengo-eps"],
    waMensaje: "Hola, quiero cotizar un seguro de salud.",
  },
  {
    ruta: "/seguros/vida",
    seguroSlug: "vida",
    serviceType: "Seguro de vida",
    title: "Seguro de vida: protege a tu familia | VanTrust",
    description:
      "Seguro de vida para proteger a tu familia o respaldar una deuda. Te ayudamos a calcular cuánto asegurar y comparamos aseguradoras. Asesoría gratis.",
    h1: "Seguro de vida",
    respuesta:
      "Un seguro de vida paga una suma de dinero a tus beneficiarios si falleces, y según el plan también si quedas con una incapacidad total y permanente o te diagnostican una enfermedad grave. Sirve para que tu familia mantenga su nivel de vida o para respaldar una deuda.",
    secciones: [
      {
        titulo: "¿Cuánto asegurar?",
        bloques: [
          {
            tipo: "p",
            texto:
              "No hay una cifra única. Un punto de partida es sumar lo que tu familia necesitaría para cubrir:",
          },
          {
            tipo: "lista",
            items: [
              "Las deudas pendientes, como el crédito de vivienda o del carro.",
              "Los gastos del hogar durante los años en que dependerían de tu ingreso.",
              "La educación de tus hijos.",
              "Gastos finales.",
            ],
          },
          {
            tipo: "p",
            texto: "A ese total se le resta lo que ya tengas: ahorros, otros seguros o pensiones.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué diferencia hay entre seguro de vida y seguro de vida deudor?",
        respuesta:
          "El de vida deudor protege al banco: paga el saldo del crédito si falleces. El seguro de vida individual le paga a los beneficiarios que tú eliges.",
      },
      {
        pregunta: "¿Puedo elegir a mis beneficiarios?",
        respuesta:
          "Sí, puedes designar libremente a tus beneficiarios y cambiarlos durante la vigencia de la póliza.",
      },
      {
        pregunta: "¿Piden exámenes médicos?",
        respuesta:
          "Depende de tu edad y del valor asegurado. Para valores bajos suele bastar una declaración de salud; para valores altos la aseguradora puede pedir exámenes.",
      },
    ],
    guias: ["seguro-de-vida-cuanto-asegurar"],
    waMensaje: "Hola, quiero asesoría para un seguro de vida.",
  },
  {
    ruta: "/seguros/hogar",
    seguroSlug: "hogar",
    serviceType: "Seguro de hogar",
    title: "Seguro de hogar: casa y contenidos | VanTrust",
    description:
      "Protege tu vivienda y lo que hay dentro frente a incendio, terremoto, robo y daños por agua. Para propietarios e inquilinos. Cotiza gratis con VanTrust.",
    h1: "Seguro de hogar",
    respuesta:
      "El seguro de hogar protege la construcción de tu vivienda y lo que hay dentro (contenidos) frente a incendio, terremoto, robo y daños por agua, e incluye responsabilidad civil y asistencia domiciliaria según el plan. Sirve tanto a propietarios como a inquilinos.",
    secciones: [
      {
        titulo: "Construcción y contenidos",
        bloques: [
          {
            tipo: "tabla",
            caption: "Qué se asegura en un seguro de hogar",
            columnas: ["Parte", "Qué incluye", "Quién la asegura"],
            filas: [
              ["Construcción", "Muros, pisos, techos e instalaciones fijas.", "El propietario."],
              ["Contenidos", "Muebles, electrodomésticos, ropa y objetos personales.", "Propietario o inquilino."],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de hogar cubre terremoto?",
        respuesta:
          "Sí, el terremoto es una de las coberturas del seguro de hogar que comparamos. Revisa el deducible de esta cobertura, que suele ser distinto al de las demás.",
      },
      {
        pregunta: "Vivo en arriendo, ¿me sirve un seguro de hogar?",
        respuesta:
          "Sí. Como inquilino puedes asegurar tus contenidos y tu responsabilidad civil frente al propietario y los vecinos.",
      },
      {
        pregunta: "Mi banco ya me cobra un seguro con la hipoteca, ¿necesito otro?",
        respuesta:
          "El seguro que exige el banco suele cubrir la construcción frente a incendio y terremoto para proteger el crédito. Los contenidos y otras coberturas normalmente no están incluidos.",
      },
    ],
    guias: ["seguro-de-hogar-que-cubre"],
    waMensaje: "Hola, quiero cotizar un seguro de hogar para mi vivienda.",
  },
  {
    ruta: "/seguros/arriendo",
    nombre: "Arriendo",
    serviceType: "Seguro de arrendamiento",
    title: "Seguro de arrendamiento para propietarios | VanTrust",
    description:
      "Protege el canon de tu inmueble arrendado si el inquilino deja de pagar. Te explicamos coberturas y requisitos. Asesoría gratis con VanTrust.",
    h1: "Seguro de arrendamiento para propietarios",
    respuesta:
      "El seguro de arrendamiento le paga al propietario el canon que el inquilino deje de pagar y, según el plan, las cuotas de administración y los servicios públicos pendientes. La aseguradora estudia al inquilino antes de firmar el contrato.",
    secciones: [],
    faqs: [],
    guias: ["seguro-de-arrendamiento-que-cubre"],
    waMensaje: "Hola, quiero información sobre el seguro de arrendamiento para mi inmueble.",
    todo: [
      "Confirmar que VanTrust comercializa el seguro de arrendamiento y con qué aseguradoras.",
      "Coberturas reales del producto (canon, administración, servicios, daños, gastos jurídicos).",
      "Preguntas frecuentes con las condiciones del producto que se vende.",
      "Agregar el ramo a seguros.ts si se confirma.",
    ],
  },
];

export function getPaginaRamo(ruta: string): PaginaRamo | undefined {
  return PAGINAS_RAMO.find((p) => p.ruta === ruta);
}

export function getPaginaPorSeguro(slug: string): PaginaRamo | undefined {
  return PAGINAS_RAMO.find((p) => p.seguroSlug === slug);
}

/** Productos de seguros.ts que viven en /pymes/* y no en /seguros/*. */
export const PYMES = PAGINAS_RAMO.filter((p) => p.ruta.startsWith("/pymes/"));

export function slugDeRuta(ruta: string): string {
  return ruta.split("/").pop()!;
}

/** URL canónica de un producto de seguros.ts (algunos viven en /pymes). */
export function urlSeguro(slug: string): string {
  return getPaginaPorSeguro(slug)?.ruta ?? `/seguros/${slug}`;
}

// Si alguien agrega una página /pymes sin actualizar PYME_A_SLUG, el build falla.
for (const p of PYMES) {
  if (PYME_A_SLUG[slugDeRuta(p.ruta)] !== p.seguroSlug) {
    throw new Error(`PYME_A_SLUG desincronizado para ${p.ruta}`);
  }
}
