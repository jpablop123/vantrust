// Preguntas frecuentes del home. Viven aquí (no en el componente cliente)
// para poder generar el FAQPage en el servidor.

export type Faq = {
  cat: "General" | "Personas" | "Empresas";
  question: string;
  answer: string;
  list?: string[];
};

export const FAQS_HOME: Faq[] = [
  // ── General ──
  {
    cat: "General",
    question: "¿Por qué usar VanTrust y no ir directo a la aseguradora?",
    answer:
      "Porque comparamos entre 10 aseguradoras aliadas para encontrarte la mejor cobertura al mejor precio. Si vas directo, solo ves una opción; con nosotros ves varias y eliges la que más te conviene, con un asesor que te acompaña en todo el proceso.",
  },
  {
    cat: "General",
    question: "¿El precio es el mismo si compro a través de ustedes?",
    answer:
      "Exactamente el mismo. Por ley, el precio del seguro es igual si lo compras directo o a través de un intermediario. La diferencia es que con nosotros tienes asesoría gratuita, comparación entre aseguradoras y alguien que te ayuda cuando necesitas usar tu póliza.",
  },
  {
    cat: "General",
    question: "¿Cuánto tiempo toma todo el proceso?",
    answer:
      "Cotizar te toma pocos minutos en nuestra web. Un asesor te contacta en un plazo aproximado de 1 hora con opciones reales. Si decides comprar, la póliza puede quedar activa el mismo día.",
  },
  {
    cat: "General",
    question: "¿Es seguro darles mis datos personales?",
    answer:
      "Totalmente. Estamos registrados ante la Superintendencia Financiera con RUI vigente. Tus datos se usan exclusivamente para cotizar tu seguro y están protegidos bajo la Ley 1581 de 2012 de protección de datos personales de Colombia.",
  },
  {
    cat: "General",
    question: "¿Qué es un deducible?",
    answer:
      "El deducible es el valor que debe asumir el asegurado cuando ocurre un siniestro cubierto por la póliza. Por ejemplo: si el daño asciende a $20.000.000 y el deducible es de $2.000.000, la aseguradora indemniza $18.000.000 y el asegurado asume los $2.000.000 restantes. Puede establecerse como un valor fijo, un porcentaje, o el mayor entre ambos, según las condiciones de la póliza.",
  },

  // ── Personas ──
  {
    cat: "Personas",
    question: "¿Puedo cancelar mi seguro cuando quiera?",
    answer:
      "Sí. Puedes cancelar en cualquier momento y la aseguradora te devuelve la parte proporcional del periodo que no usaste. Nosotros te ayudamos con el proceso.",
  },
  {
    cat: "Personas",
    question: "¿Cómo funciona un seguro de salud?",
    answer:
      "Un seguro de salud brinda acceso a servicios médicos adicionales o complementarios al sistema de salud obligatorio. Dependiendo del plan contratado, puede incluir:",
    list: [
      "Consultas con especialistas",
      "Hospitalización",
      "Cirugías",
      "Exámenes diagnósticos",
      "Urgencias",
      "Maternidad",
      "Medicina preventiva",
      "Red de clínicas y hospitales",
    ],
  },
  {
    cat: "Personas",
    question: "¿Qué pasa si vendo mi vehículo asegurado?",
    answer:
      "Si vendes tu vehículo, es importante informar a la aseguradora lo antes posible. Dependiendo del caso, podrás cancelar la póliza y solicitar la devolución de la prima no consumida (si aplica), ceder la póliza al nuevo propietario cuando la aseguradora lo permita, o trasladar el saldo a un nuevo vehículo. No informar la venta puede generar inconvenientes en caso de un siniestro.",
  },
  {
    cat: "Personas",
    question: "¿Qué hacer en caso de accidente?",
    answer: "Si sufres un accidente, te recomendamos:",
    list: [
      "Mantener la calma y verificar que todas las personas estén bien",
      "Comunicarte con la línea de asistencia de tu aseguradora",
      "No admitir responsabilidades en el lugar del accidente",
      "Tomar fotografías de los vehículos y de la escena",
      "Recopilar los datos de los involucrados y testigos",
      "Seguir las instrucciones de la aseguradora para la atención del siniestro",
    ],
  },

  // ── Empresas ──
  {
    cat: "Empresas",
    question: "¿Qué seguro necesita una empresa?",
    answer:
      "Depende de su actividad económica, tamaño, número de empleados y riesgos a los que está expuesta. Algunas de las pólizas más comunes son: Seguro Pyme, Todo Riesgo Daños Materiales, Responsabilidad Civil Extracontractual, Cumplimiento, Transporte de Mercancías, Manejo Global, Riesgos Cibernéticos, Vida Grupo, Salud Empresarial y D&O. En VanTrust analizamos cada empresa para recomendar las coberturas que realmente necesita, evitando sobrecostos y vacíos de protección.",
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre un seguro Pyme?",
    answer:
      "El Seguro Pyme ofrece protección integral para pequeñas y medianas empresas mediante una sola póliza. Puede incluir:",
    list: [
      "Incendio y terremoto",
      "Robo",
      "Equipo electrónico",
      "Dinero en efectivo",
      "Transporte de valores",
      "Lucro cesante",
      "Responsabilidad Civil",
      "Infidelidad de empleados",
      "Asistencias empresariales",
    ],
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre un seguro Todo Riesgo?",
    answer:
      "El Seguro Todo Riesgo Daños Materiales protege los activos físicos de una empresa frente a pérdidas o daños ocasionados por eventos accidentales. Generalmente cubre:",
    list: [
      "Incendio",
      "Explosión",
      "Terremoto",
      "Inundación",
      "Robo",
      "Daños por fenómenos naturales",
      "Actos malintencionados de terceros (según condiciones)",
      "Daños accidentales",
    ],
  },
  {
    cat: "Empresas",
    question: "¿Qué es una póliza de cumplimiento?",
    answer:
      "Es un seguro que garantiza el cumplimiento de las obligaciones adquiridas en un contrato. Protege al contratante frente a posibles incumplimientos del contratista y puede amparar el cumplimiento del contrato, la correcta inversión del anticipo, el pago de salarios y prestaciones sociales, la calidad de bienes o servicios, la estabilidad de la obra y el correcto funcionamiento de equipos. Es ampliamente utilizada en contratos con entidades públicas y privadas.",
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre una póliza de transporte de mercancías?",
    answer:
      "Protege la carga durante su movilización frente a pérdidas o daños ocasionados por eventos accidentales. Dependiendo de la póliza, puede cubrir incendio, robo, volcamiento, colisión, avería, saqueo, daños durante el cargue y descargue (según condiciones) y riesgos durante el transporte nacional o internacional. Ideal para empresas que movilizan mercancías con frecuencia.",
  },
  {
    cat: "Empresas",
    question: "¿Qué es una ARL?",
    answer:
      "La Administradora de Riesgos Laborales (ARL) protege a los trabajadores frente a accidentes de trabajo y enfermedades laborales. Entre sus beneficios: atención médica, incapacidades, rehabilitación, pensión por invalidez cuando corresponda, indemnizaciones, prestaciones por fallecimiento de origen laboral y asesoría en Seguridad y Salud en el Trabajo. En Colombia la afiliación a una ARL es obligatoria para los empleadores.",
  },
  {
    cat: "Empresas",
    question: "¿Cómo afilio a mis trabajadores a una ARL?",
    answer:
      "La afiliación es obligatoria y debe hacerse antes de que el trabajador inicie labores. El proceso generalmente incluye:",
    list: [
      "Elegir la ARL que mejor se adapte a las necesidades de la empresa",
      "Diligenciar el formulario de afiliación de la empresa y de los trabajadores",
      "Suministrar la documentación requerida (RUT, Cámara de Comercio, documento del representante legal)",
      "Clasificar correctamente el nivel de riesgo de la actividad económica",
      "Formalizar la afiliación para que los trabajadores tengan cobertura desde el inicio",
    ],
  },
];

/** Versión plana para JSON-LD (respuesta + lista en una sola cadena). */
export function faqsHomeLd() {
  return FAQS_HOME.map((f) => ({
    pregunta: f.question,
    respuesta: f.list?.length ? `${f.answer} ${f.list.join(", ")}.` : f.answer,
  }));
}
