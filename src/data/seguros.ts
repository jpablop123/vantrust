// Catálogo central de seguros VanTrust — fuente única para "Nuestros Seguros".
// Cada producto se renderiza en /seguros/[slug] a partir de estos datos.

export type Categoria = "personas" | "empresas";

// Cómo se solicita la cotización de este ramo:
//  - "cotizador": redirige al Cotizador Express (con el ramo pre-seleccionado)
//  - "form": formulario propio del ramo (campos en `formFields`)
//  - "whatsapp": contacto directo por WhatsApp (ramos empresariales)
export type QuoteType = "cotizador" | "form" | "whatsapp";

export interface Seguro {
  slug: string;
  categoria: Categoria;
  nombre: string;
  icon: string; // nombre de icono lucide-react
  descripcion: string;
  protege?: string[]; // "¿Qué protege?"
  coberturas?: string[];
  beneficios?: string[];
  dirigidoA?: string;
  quote: { type: QuoteType; branch?: "auto" | "salud" | "hogar" };
  formFields?: string[]; // etiquetas de los campos del formulario propio
  destacado?: boolean;
}

export const SEGUROS: Seguro[] = [
  // ─────────────────────────── PERSONAS ───────────────────────────
  {
    slug: "automoviles",
    categoria: "personas",
    nombre: "Automóviles",
    icon: "Car",
    descripcion:
      "Protege el vehículo frente a daños, pérdidas y responsabilidades derivadas de accidentes.",
    protege: ["Vehículo asegurado", "Responsabilidad frente a terceros", "Ocupantes"],
    coberturas: [
      "Pérdida total",
      "Pérdida parcial",
      "Hurto",
      "Responsabilidad Civil",
      "Asistencia",
      "Grúa",
      "Carro de reemplazo",
      "Gastos de transporte",
      "Accidentes personales",
      "Pequeños accesorios",
    ],
    beneficios: [
      "Red de talleres",
      "Carro taller: llegamos a donde estés",
      "Asistencia 24/7",
      "Cobertura nacional",
    ],
    dirigidoA: "Propietarios de vehículos particulares o comerciales.",
    quote: { type: "cotizador", branch: "auto" },
    destacado: true,
  },
  {
    slug: "hogar",
    categoria: "personas",
    nombre: "Hogar",
    icon: "Home",
    descripcion:
      "Protege tu hogar frente a incendios, robos, terremotos y otros imprevistos con el respaldo de las principales aseguradoras del país.",
    protege: ["Construcción", "Contenidos"],
    coberturas: [
      "Incendio",
      "Terremoto",
      "Robo",
      "Daños por agua",
      "Responsabilidad Civil",
      "Asistencia hogar",
    ],
    beneficios: ["Protección integral", "Asistencia domiciliaria"],
    dirigidoA: "Propietarios e inquilinos.",
    quote: { type: "cotizador", branch: "hogar" },
    destacado: true,
  },
  {
    slug: "vida",
    categoria: "personas",
    nombre: "Vida",
    icon: "HeartPulse",
    descripcion:
      "Protege económicamente a la familia del asegurado o una deuda ante una entidad crediticia.",
    protege: ["La estabilidad financiera de los beneficiarios"],
    coberturas: [
      "Fallecimiento",
      "Incapacidad total y permanente",
      "Enfermedades graves (según plan)",
    ],
    beneficios: ["Tranquilidad financiera", "Protección familiar"],
    dirigidoA:
      "Toda persona con ingresos o personas a cargo. Personas con deudas con entidades crediticias que deseen minimizar el valor de su cuota mensual.",
    quote: { type: "form" },
    formFields: [
      "Nombre",
      "Documento",
      "Fecha de nacimiento",
      "Profesión",
      "Ciudad",
      "Correo",
      "Celular",
      "Valor asegurado",
    ],
  },
  {
    slug: "salud",
    categoria: "personas",
    nombre: "Salud",
    icon: "Stethoscope",
    descripcion:
      "Acceso a servicios médicos adicionales o complementarios al sistema de salud obligatorio, con la mejor red de clínicas y especialistas.",
    coberturas: [
      "Hospitalización",
      "Cirugías",
      "Consultas",
      "Maternidad",
      "Urgencias",
      "Medicina especializada",
    ],
    beneficios: [
      "Amplia red de clínicas y especialistas",
      "Planes individuales y familiares",
      "Cobertura complementaria a tu EPS",
    ],
    dirigidoA: "Personas y familias que buscan atención médica más ágil y completa.",
    quote: { type: "cotizador", branch: "salud" },
    destacado: true,
  },
  {
    slug: "accidentes-personales",
    categoria: "personas",
    nombre: "Accidentes Personales",
    icon: "ShieldPlus",
    descripcion:
      "Protección económica para el asegurado y su familia frente a accidentes inesperados, las 24 horas, dentro y fuera del trabajo.",
    coberturas: [
      "Indemnización por muerte accidental",
      "Incapacidad total y permanente por accidente",
      "Desmembración accidental",
      "Gastos médicos por accidente",
      "Gastos de hospitalización",
      "Gastos quirúrgicos",
      "Gastos farmacéuticos derivados del accidente (según el plan)",
      "Renta diaria por incapacidad temporal",
      "Auxilio funerario",
      "Cobertura las 24 horas, dentro y fuera del lugar de trabajo (según condiciones)",
    ],
    beneficios: [
      "Protección económica para el asegurado y su familia",
      "Respaldo financiero frente a accidentes inesperados",
      "Indemnización para afrontar gastos derivados del accidente",
      "Planes individuales, familiares y empresariales",
      "Prima accesible con amplias coberturas",
    ],
    quote: { type: "form" },
    formFields: ["Nombre", "Documento", "Edad", "Profesión", "Ciudad", "Correo", "Celular"],
  },
  {
    slug: "exequial",
    categoria: "personas",
    nombre: "Exequial",
    icon: "Flower2",
    descripcion:
      "Evita que la familia asuma altos costos funerarios de manera imprevista, con acompañamiento durante todo el proceso.",
    protege: [
      "Servicios funerarios",
      "Gastos derivados del fallecimiento del asegurado o de los beneficiarios inscritos",
      "Traslado del cuerpo",
      "Asistencia y acompañamiento durante el proceso funerario",
      "Auxilios adicionales, según las condiciones de la póliza",
    ],
    beneficios: [
      "Evita que la familia asuma altos costos funerarios de manera imprevista",
      "Brinda acompañamiento y asesoría durante todo el proceso",
      "Reduce la carga administrativa y logística en un momento difícil",
      "Acceso a una red de funerarias con cobertura nacional",
      "Planes familiares con posibilidad de incluir varios beneficiarios",
      "Atención disponible las 24 horas del día",
    ],
    quote: { type: "form" },
    formFields: ["Nombre", "Número de personas", "Ciudad", "Celular", "Correo"],
  },
  {
    slug: "viajes",
    categoria: "personas",
    nombre: "Viajes",
    icon: "Plane",
    descripcion:
      "Protección durante todo el viaje frente a emergencias médicas, accidentes e imprevistos, con asistencia 24/7 nacional e internacional.",
    protege: [
      "Emergencias médicas durante el viaje",
      "Accidentes personales",
      "Enfermedades no preexistentes",
      "Asistencia en caso de pérdida de documentos",
      "Repatriación médica o funeraria",
      "Responsabilidad civil durante el viaje (según el plan)",
    ],
    beneficios: [
      "Protección durante todo el viaje",
      "Atención médica en caso de emergencias",
      "Cobertura nacional e internacional, según el plan",
      "Asistencia disponible 24/7",
      "Respaldo ante imprevistos que puedan generar gastos inesperados",
      "Tranquilidad para disfrutar del viaje con mayor seguridad",
    ],
    quote: { type: "form" },
    formFields: [
      "Destino",
      "Fecha de salida",
      "Fecha de regreso",
      "Número de viajeros",
      "Edades",
      "Correo",
      "Celular",
    ],
  },
  {
    slug: "mascotas",
    categoria: "personas",
    nombre: "Mascotas",
    icon: "PawPrint",
    descripcion:
      "Protección financiera frente a gastos veterinarios inesperados, con acceso a atención de calidad para tu mascota.",
    protege: [
      "Accidentes",
      "Enfermedades",
      "Emergencias veterinarias",
      "Hospitalización",
      "Cirugías",
      "Gastos médicos",
      "Responsabilidad civil por daños a terceros (según el plan)",
      "Fallecimiento por accidente (según condiciones)",
    ],
    beneficios: [
      "Protección financiera frente a gastos veterinarios inesperados",
      "Acceso a atención veterinaria de calidad",
      "Respaldo económico en caso de accidentes o enfermedades",
      "Coberturas adaptadas a las necesidades de cada mascota",
      "Servicios de asistencia y orientación especializada",
      "Mayor tranquilidad para el propietario",
    ],
    quote: { type: "form" },
    formFields: ["Nombre de la mascota", "Especie", "Raza", "Edad", "Ciudad", "Correo", "Celular"],
  },

  // ─────────────────────────── EMPRESAS ───────────────────────────
  {
    slug: "pyme",
    categoria: "empresas",
    nombre: "Pyme",
    icon: "Store",
    descripcion:
      "Solución diseñada para proteger integralmente una pequeña o mediana empresa: toda la operación del negocio en una sola póliza.",
    coberturas: [
      "Incendio",
      "Robo",
      "Equipo electrónico",
      "Lucro cesante",
      "Responsabilidad Civil",
      "Infidelidad de empleados",
      "Transporte de valores",
      "Dinero en efectivo",
    ],
    beneficios: [
      "Protege el patrimonio y los activos de la empresa",
      "Permite personalizar las coberturas según el tipo de negocio",
      "Reduce el impacto económico de eventos inesperados",
      "Favorece la continuidad de la operación después de un siniestro",
      "Acceso a servicios de asistencia empresarial",
      "Respaldo financiero frente a reclamaciones de terceros",
    ],
    quote: { type: "whatsapp" },
    destacado: true,
  },
  {
    slug: "todo-riesgo-danos-materiales",
    categoria: "empresas",
    nombre: "Todo Riesgo Daños Materiales",
    icon: "Building2",
    descripcion:
      "Protege exclusivamente los activos físicos de la empresa frente a pérdidas o daños accidentales.",
    coberturas: ["Incendio", "Explosión", "Terremoto", "Inundación", "Robo"],
    beneficios: [
      "Protege los activos más importantes de la empresa",
      "Permite asegurar bienes de alto valor económico",
      "Coberturas adaptables según el tipo de empresa y el nivel de riesgo",
      "Reduce el impacto financiero ocasionado por un siniestro",
      "Facilita la recuperación y continuidad de la operación",
      "Posibilidad de complementar con Lucro Cesante o Responsabilidad Civil",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "cumplimiento",
    categoria: "empresas",
    nombre: "Cumplimiento",
    icon: "FileCheck2",
    descripcion:
      "Respalda al beneficiario del contrato frente a los perjuicios ocasionados por el incumplimiento de las obligaciones contractuales del contratista.",
    coberturas: [
      "Cumplimiento del contrato",
      "Correcta inversión del anticipo",
      "Pago de salarios y prestaciones sociales",
      "Estabilidad y calidad de la obra",
      "Calidad de los bienes o servicios suministrados",
      "Correcto funcionamiento de equipos o bienes entregados",
    ],
    beneficios: [
      "Brinda respaldo y confianza al contratante",
      "Facilita la participación en licitaciones y procesos de contratación",
      "Cumple con los requisitos de entidades públicas y privadas",
      "Protege el patrimonio del beneficiario frente a incumplimientos",
      "Fortalece la credibilidad y respaldo del contratista",
      "Se adapta a diferentes tipos de contratos y sectores",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "responsabilidad-civil-extracontractual",
    categoria: "empresas",
    nombre: "Responsabilidad Civil Extracontractual",
    icon: "Scale",
    descripcion:
      "Protege el patrimonio del asegurado frente a reclamaciones de terceros por daños ocasionados accidentalmente durante el desarrollo de sus actividades.",
    protege: [
      "Lesiones o muerte de terceros",
      "Daños materiales a bienes de terceros",
      "Perjuicios económicos derivados de daños materiales o lesiones (cuando estén cubiertos)",
      "Gastos de defensa jurídica",
      "Gastos judiciales y honorarios de abogados (según condiciones)",
    ],
    beneficios: [
      "Protege el patrimonio de la empresa frente a reclamaciones de terceros",
      "Respaldo económico ante demandas y procesos judiciales",
      "Cubre gastos de defensa legal según condiciones de la póliza",
      "Genera mayor confianza en clientes, proveedores y contratantes",
      "Se adapta a los riesgos específicos de cada actividad económica",
      "Complementa otros seguros empresariales (Pyme o Todo Riesgo)",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "transporte-de-mercancias",
    categoria: "empresas",
    nombre: "Transporte de Mercancías",
    icon: "Truck",
    descripcion:
      "Ampara las mercancías durante su transporte frente a riesgos accidentales que puedan afectar su integridad o generar pérdidas económicas.",
    protege: [
      "Materias primas",
      "Productos terminados",
      "Mercancías para comercialización",
      "Maquinaria y equipos",
      "Repuestos",
      "Bienes de importación y exportación",
      "Carga nacional e internacional",
    ],
    beneficios: [
      "Protege la inversión representada en la mercancía transportada",
      "Reduce el impacto económico por pérdidas o daños durante el transporte",
      "Tranquilidad en operaciones nacionales e internacionales",
      "Cobertura adaptable al tipo de mercancía y frecuencia de despachos",
      "Despachos individuales o pólizas automáticas para múltiples envíos",
      "Respaldo ante imprevistos que afecten la cadena logística",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "transporte-de-valores",
    categoria: "empresas",
    nombre: "Transporte de Valores",
    icon: "Banknote",
    descripcion:
      "Protege los recursos financieros de la empresa durante su traslado entre sedes, bancos o clientes.",
    protege: [
      "Dinero en efectivo",
      "Cheques",
      "Títulos valores",
      "Bonos",
      "Pagarés",
      "Documentos negociables",
      "Valores transportados entre sedes, bancos o clientes",
    ],
    beneficios: [
      "Protege los recursos financieros durante su traslado",
      "Reduce el impacto económico frente a pérdidas por robo o accidentes",
      "Mayor tranquilidad en operaciones de recaudo y consignación",
      "Se adapta a empresas con movilización frecuente de dinero o documentos",
      "Complementa la estrategia de gestión de riesgos financieros",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "manejo-global",
    categoria: "empresas",
    nombre: "Manejo Global",
    icon: "UserCog",
    descripcion:
      "Ampara las pérdidas económicas derivadas de actos deshonestos cometidos por empleados y otros riesgos relacionados con el manejo de recursos de la empresa.",
    coberturas: ["Fraude", "Hurto", "Falsificación", "Abuso de confianza"],
    beneficios: [
      "Protege el patrimonio frente a actos deshonestos de empleados",
      "Respaldo económico ante pérdidas por infidelidad",
      "Fortalece los controles internos de la organización",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "d-and-o",
    categoria: "empresas",
    nombre: "D&O (Directores y Administradores)",
    icon: "Briefcase",
    descripcion:
      "Protege el patrimonio personal de los directivos frente a responsabilidades legales y económicas derivadas de sus decisiones, así como a la empresa.",
    coberturas: ["Demandas", "Gastos de defensa", "Responsabilidad patrimonial"],
    beneficios: [
      "Protege el patrimonio personal de directivos y administradores",
      "Respaldo de una aseguradora ante reclamaciones",
      "Mayor confianza para quienes lideran la organización",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "copropiedades",
    categoria: "empresas",
    nombre: "Copropiedades",
    icon: "Building",
    descripcion:
      "Protege el patrimonio común de los copropietarios y cumple los requisitos legales de la propiedad horizontal.",
    protege: [
      "Edificios y áreas comunes",
      "Parqueaderos",
      "Ascensores",
      "Piscinas",
      "Salones sociales",
      "Gimnasios",
      "Porterías",
      "Plantas eléctricas",
      "Equipos de bombeo",
      "Equipos electrónicos",
      "Bienes de propiedad común",
      "Responsabilidad Civil de la copropiedad frente a terceros",
    ],
    beneficios: [
      "Protege el patrimonio común de los copropietarios",
      "Cumple los requisitos legales de la propiedad horizontal",
      "Reduce el impacto económico ocasionado por siniestros",
      "Protege a la administración frente a reclamaciones de terceros",
      "Recuperación más rápida de la infraestructura tras un evento cubierto",
      "Tranquilidad para propietarios, residentes y administradores",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "vida-grupo",
    categoria: "empresas",
    nombre: "Vida Grupo",
    icon: "Users",
    descripcion:
      "Brinda tranquilidad a los colaboradores y sus familias y fortalece el programa de beneficios corporativos.",
    protege: [
      "Fallecimiento por cualquier causa (según condiciones)",
      "Incapacidad total y permanente",
      "Enfermedades graves (cuando se contrate)",
      "Muerte accidental (cobertura adicional)",
      "Auxilio funerario (según el plan)",
    ],
    beneficios: [
      "Tranquilidad a los colaboradores y sus familias",
      "Fortalece el programa de beneficios corporativos",
      "Mejora el clima laboral y la fidelización del talento",
      "Coberturas personalizables según las necesidades de la empresa",
      "Posibilidad de incluir coberturas adicionales",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "salud-empresarial",
    categoria: "empresas",
    nombre: "Salud Empresarial",
    icon: "HeartHandshake",
    descripcion:
      "Acceso a una amplia red de clínicas y especialistas para los colaboradores, un beneficio diferenciador para atraer y retener talento.",
    protege: [
      "Consultas médicas especializadas",
      "Hospitalización",
      "Cirugías",
      "Exámenes diagnósticos",
      "Urgencias",
      "Atención médica especializada",
      "Maternidad (según el plan)",
      "Tratamientos médicos",
    ],
    beneficios: [
      "Acceso a una amplia red de clínicas y especialistas",
      "Disminución en los tiempos de atención",
      "Bienestar y satisfacción para los colaboradores",
      "Mayor productividad y reducción del ausentismo",
      "Beneficio diferenciador para atraer y retener talento",
      "Planes adaptados al tamaño y presupuesto de la empresa",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "flotas",
    categoria: "empresas",
    nombre: "Flotas / Colectiva de Autos",
    icon: "CarFront",
    descripcion:
      "Solución para asegurar los vehículos de la empresa bajo una sola póliza colectiva, con administración centralizada y tarifas preferenciales.",
    coberturas: [
      "Pérdida total y parcial",
      "Hurto",
      "Responsabilidad Civil",
      "Asistencia y grúa",
      "Vehículo de reemplazo (según plan)",
    ],
    beneficios: [
      "Administración centralizada de todo el parque automotor",
      "Tarifas preferenciales por volumen",
      "Inclusión y exclusión ágil de vehículos",
      "Cobertura nacional y asistencia 24/7",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "arl",
    categoria: "empresas",
    nombre: "ARL",
    icon: "HardHat",
    descripcion:
      "Protege a los trabajadores frente a los riesgos derivados de la actividad laboral. En Colombia la afiliación a una ARL es obligatoria para los empleadores.",
    protege: [
      "Accidentes de trabajo",
      "Enfermedades laborales",
      "Incapacidad temporal",
      "Incapacidad permanente parcial o total",
      "Invalidez",
      "Fallecimiento por causa laboral",
    ],
    beneficios: [
      "Cumplimiento de la legislación laboral colombiana",
      "Protección integral para los trabajadores",
      "Reducción del impacto económico por accidentes y enfermedades laborales",
      "Asesoría especializada en Seguridad y Salud en el Trabajo",
      "Acompañamiento en la gestión del riesgo laboral",
      "Promoción de ambientes de trabajo más seguros",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "maquinaria-y-equipo",
    categoria: "empresas",
    nombre: "Maquinaria y Equipo",
    icon: "Cog",
    descripcion:
      "Protege la maquinaria y los equipos de la empresa frente a daños accidentales, rotura y otros riesgos que afecten la operación.",
    coberturas: [
      "Rotura de maquinaria",
      "Daños accidentales",
      "Cortocircuito",
      "Errores de operación",
      "Fenómenos naturales (según condiciones)",
    ],
    beneficios: [
      "Protege activos críticos para la producción",
      "Reduce el impacto de paradas por daños",
      "Coberturas adaptables al tipo de maquinaria",
      "Favorece la continuidad operativa",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "equipo-electronico",
    categoria: "empresas",
    nombre: "Equipo Electrónico",
    icon: "MonitorSmartphone",
    descripcion:
      "Protege los equipos electrónicos de la empresa frente a daños, robo y otros riesgos, incluyendo la reposición de la información.",
    coberturas: [
      "Daños accidentales",
      "Robo",
      "Cortocircuito y sobretensión",
      "Daños por líquidos",
      "Reposición de portadores de datos (según plan)",
    ],
    beneficios: [
      "Protege equipos de cómputo y tecnología",
      "Reduce el impacto de daños y robos",
      "Cobertura para equipos fijos y portátiles",
      "Respaldo para la continuidad tecnológica",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "riesgos-ciberneticos",
    categoria: "empresas",
    nombre: "Riesgos Cibernéticos",
    icon: "ShieldAlert",
    descripcion:
      "Protege a la empresa frente a incidentes cibernéticos, robo o filtración de información y la responsabilidad frente a terceros por vulneración de datos.",
    protege: [
      "Ataques cibernéticos",
      "Robo o filtración de información",
      "Acceso no autorizado a sistemas",
      "Ransomware (secuestro de información)",
      "Virus informáticos y malware",
      "Interrupción de la operación por incidentes tecnológicos",
      "Responsabilidad frente a terceros por vulneración de datos",
      "Gastos de gestión y recuperación de un incidente cibernético",
    ],
    beneficios: [
      "Protege la estabilidad financiera frente a incidentes cibernéticos",
      "Reduce el impacto económico derivado de ataques informáticos",
      "Acceso a expertos en ciberseguridad y gestión de crisis",
      "Protege la reputación de la organización",
      "Ayuda a cumplir obligaciones de protección de datos personales",
      "Minimiza el tiempo de interrupción de las operaciones",
    ],
    quote: { type: "whatsapp" },
  },
  {
    slug: "responsabilidad-civil-profesional",
    categoria: "empresas",
    nombre: "Responsabilidad Civil Profesional",
    icon: "BadgeCheck",
    descripcion:
      "Protege frente a reclamaciones derivadas de errores, omisiones o negligencia en la prestación del servicio profesional.",
    protege: [
      "Errores profesionales",
      "Omisiones involuntarias",
      "Negligencia profesional",
      "Incumplimientos involuntarios en la prestación del servicio",
      "Daños patrimoniales ocasionados a clientes",
      "Gastos de defensa jurídica",
      "Costas judiciales e indemnizaciones",
    ],
    beneficios: [
      "Protege el patrimonio personal o empresarial",
      "Respaldo económico frente a reclamaciones de clientes",
      "Cubre los gastos de defensa jurídica",
      "Genera confianza y credibilidad frente a clientes y aliados",
      "Se adapta a diferentes profesiones y actividades económicas",
      "Permite ejercer la actividad profesional con mayor tranquilidad",
    ],
    quote: { type: "whatsapp" },
  },
];

export const PERSONAS = SEGUROS.filter((s) => s.categoria === "personas");
export const EMPRESAS = SEGUROS.filter((s) => s.categoria === "empresas");

export function getSeguro(slug: string): Seguro | undefined {
  return SEGUROS.find((s) => s.slug === slug);
}
