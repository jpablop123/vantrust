// Guías para pymes y contratistas (SEO + AEO).
//
// Reglas del brief (docs/brief-guias.md): nada de cifras, tarifas ni
// testimonios inventados; cada guía abre con un caso ilustrativo rotulado;
// las normas citadas se verificaron en Función Pública o la Secretaría del
// Senado y quedan en `todo` para que el asesor las confirme. Sin SOAT.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FUENTE_CCO =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102";
const FUENTE_D1082 =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77653";
const FUENTE_CCE_VALOR = "https://operaciones.colombiacompra.gov.co/node/20711";
const FUENTE_CC_2341 =
  "http://www.secretariasenado.gov.co/senado/basedoc/codigo_civil_pr072.html";
const FUENTE_CC_2347 =
  "http://www.secretariasenado.gov.co/senado/basedoc/codigo_civil_pr073.html";
const FUENTE_CST_216 =
  "http://www.secretariasenado.gov.co/senado/basedoc/codigo_sustantivo_trabajo_pr007.html";

const CASO_ILUSTRATIVO =
  "Este es un ejemplo para explicar cómo funciona; no es un cliente real.";

export const GUIAS_PYMES: Guia[] = [
  // ───────────── 1. Costo de la póliza de cumplimiento ─────────────
  {
    slug: "cuanto-cuesta-poliza-de-cumplimiento",
    titulo: "¿Cuánto cuesta una póliza de cumplimiento y de qué depende el precio?",
    title: "Cuánto cuesta una póliza de cumplimiento",
    description:
      "El precio de una póliza de cumplimiento depende del valor asegurado, la vigencia, los amparos y tu perfil. Te explicamos cada factor. Cotiza con un asesor.",
    respuesta:
      "No hay un precio fijo: la prima de una póliza de cumplimiento se calcula sobre el valor asegurado, que es un porcentaje del contrato, y cambia según la vigencia, los amparos que exige el contrato y el estudio que la aseguradora hace de tu empresa. El perfil financiero, la experiencia y las contragarantías que ofrezcas pesan tanto como el valor del contrato. Por eso el mismo contrato puede salir distinto en cada aseguradora.",
    secciones: [
      {
        titulo: "Caso ilustrativo: dos cotizaciones para el mismo contrato",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Andrés tiene una pequeña empresa de mantenimiento eléctrico en Soledad. Le adjudicaron un contrato con una clínica privada de Barranquilla y el contrato le exige póliza de cumplimiento, de calidad del servicio y de pago de salarios. Pidió precio en una sola aseguradora, le pareció alto y casi pierde el plazo para entregar la póliza mientras buscaba otra opción por su cuenta.",
          },
          {
            tipo: "p",
            texto:
              "Cuando revisó el contrato con un asesor descubrió dos cosas. Primero, había pedido una vigencia más larga que la que exigía el contrato, lo que encarecía la prima. Segundo, sus estados financieros del último cierre no estaban firmados por el contador, y la aseguradora lo había estudiado con información incompleta. Con los documentos en orden y el caso presentado a varias aseguradoras, recibió opciones distintas y escogió la que se ajustaba a lo que pedía la clínica.",
          },
          {
            tipo: "p",
            texto:
              "La lección: antes de comparar precios, revisa que estés cotizando exactamente lo que pide el contrato y que la aseguradora tenga tu información completa.",
          },
        ],
      },
      {
        titulo: "Cómo se calcula la prima",
        bloques: [
          {
            tipo: "p",
            texto:
              "La prima es el precio del seguro. En cumplimiento se obtiene aplicando una tasa al valor asegurado de cada amparo, según la vigencia. Según la aseguradora, a eso pueden sumarse gastos de expedición e impuestos. La tasa no es pública ni igual para todos: la fija cada aseguradora después de estudiar al contratista.",
          },
          {
            tipo: "p",
            texto:
              "El valor asegurado sale del contrato. En la contratación estatal, el Decreto 1082 de 2015 fija mínimos: la garantía de cumplimiento debe ser de por lo menos el 10 % del valor del contrato (con porcentajes menores para contratos muy grandes) y estar vigente hasta la liquidación; la de pago de salarios y prestaciones no puede ser inferior al 5 % del valor del contrato y va por el plazo del contrato y tres años más. En contratos privados, los porcentajes y vigencias los pactan las partes.",
          },
          {
            tipo: "tabla",
            caption: "Factores que mueven el precio de una póliza de cumplimiento",
            columnas: ["Factor", "Por qué cambia el precio"],
            filas: [
              ["Valor asegurado", "Es el porcentaje del contrato que pide cada amparo. A mayor valor, mayor prima."],
              ["Vigencia", "Un amparo que debe durar años después de la entrega, como estabilidad de la obra, cuesta más que uno de pocos meses."],
              ["Amparos exigidos", "Cada amparo (anticipo, cumplimiento, salarios, calidad, estabilidad) suma su propia prima."],
              ["Tipo de contrato", "Una obra civil no tiene el mismo riesgo que un suministro de papelería."],
              ["Perfil financiero", "La aseguradora revisa liquidez, endeudamiento y patrimonio en los estados financieros."],
              ["Experiencia", "Haber ejecutado contratos parecidos muestra que puedes cumplir este."],
              ["Contragarantías", "Un pagaré, codeudores u otros respaldos le dan a la aseguradora con qué recuperar lo que pague."],
              ["Cupo disponible", "Si ya tienes muchas pólizas vigentes con una aseguradora, tu cupo con ella puede no alcanzar."],
            ],
          },
        ],
      },
      {
        titulo: "Por qué el perfil del contratista pesa tanto",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza de cumplimiento no funciona como un seguro de carro. Si la aseguradora paga por tu incumplimiento, después te cobra lo que pagó. El Código de Comercio (artículo 1099) excluye los seguros de cumplimiento de la regla que limita esa subrogación. Por eso la aseguradora estudia tu empresa casi como lo haría un banco: quiere saber si eres capaz de cumplir y, si no, si podrá recuperar el dinero.",
          },
          {
            tipo: "p",
            texto:
              "Esto explica por qué una empresa nueva, con pérdidas en el último ejercicio o con mucho contrato encima puede recibir una tasa más alta, una exigencia de contragarantía más fuerte o incluso una negativa. No es nada personal: es cómo se suscribe este ramo. Si quieres saber qué documentos preparar para ese estudio, revisa nuestra guía Requisitos para sacar una póliza de cumplimiento.",
          },
        ],
      },
      {
        titulo: "Por qué conviene cotizar con varias aseguradoras",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cada aseguradora tiene su propia forma de evaluar el riesgo, sus propios cupos y su propio apetito por ciertos tipos de contrato. Una puede preferir contratos de suministro y otra sentirse cómoda con obra civil. Una puede pedir codeudor y otra aceptarte solo con pagaré. El resultado de presentar el mismo caso a varias puede ser distinto en precio, en contragarantía y en tiempo de respuesta.",
          },
          {
            tipo: "pasos",
            items: [
              "Envía el pliego o el contrato completo, no solo la cláusula de garantías.",
              "Verifica que cotizas los amparos, porcentajes y vigencias exactos que pide el contrato, ni más ni menos.",
              "Ten listos los estados financieros del último cierre, firmados, con sus notas.",
              "Pregunta qué contragarantía pide cada aseguradora antes de decidir por precio.",
              "Compara opciones con el mismo alcance y escoge con tiempo antes del plazo de entrega.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En la contratación estatal, el Decreto 1082 de 2015 prohíbe a las aseguradoras exigirle al contratista amparos que la entidad no pidió. Si te ofrecen algo adicional, pregunta si es obligatorio. Para entender primero qué es esta póliza y en qué momento de una licitación te la piden, lee ¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Existe una tarifa fija para la póliza de cumplimiento?",
        respuesta:
          "No. Cada aseguradora fija la tasa según su estudio del contratista, el tipo de contrato, los amparos y la vigencia. Por eso conviene comparar varias opciones con el mismo alcance.",
      },
      {
        pregunta: "¿La prima se paga una sola vez?",
        respuesta:
          "Por lo general se paga al expedir la póliza por toda la vigencia. Si el contrato se prorroga o se adiciona, la modificación de la póliza genera un cobro adicional.",
      },
      {
        pregunta: "¿Puedo bajar el precio pidiendo menos valor asegurado?",
        respuesta:
          "No por debajo de lo que exige el contrato o el pliego. Si la póliza no cumple esos mínimos, el contratante puede rechazarla. Lo que sí puedes evitar es asegurar más de lo exigido.",
      },
      {
        pregunta: "¿Por qué me piden contragarantía si ya pagué la prima?",
        respuesta:
          "Porque si la aseguradora paga por un incumplimiento tuyo tiene derecho a recobrarte. La contragarantía, normalmente un pagaré, respalda ese recobro.",
      },
      {
        pregunta: "¿Cuánto tarda la cotización?",
        respuesta:
          "Depende de si ya tienes cupo con la aseguradora y de que la documentación esté completa. Para una primera póliza, el estudio toma más tiempo; pide la cotización con margen.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de cuánto cuesta una póliza de cumplimiento y quiero cotizar para un contrato.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.12 (cumplimiento: mínimo 10 % y vigencia hasta la liquidación) y 2.2.1.2.3.1.13 (salarios: mínimo 5 %, plazo del contrato y tres años más) — ${FUENTE_D1082} y ${FUENTE_CCE_VALOR}`,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.3.2.7 (las aseguradoras no pueden exigir amparos no pedidos por la entidad) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Código de Comercio, art. 1099 (la limitación de subrogación no aplica a los seguros de cumplimiento) — ${FUENTE_CCO}`,
      "Confirmar con el asesor si la prima de cumplimiento lleva IVA y gastos de expedición en las aseguradoras con las que trabaja VanTrust.",
    ],
  },

  // ───────────── 2. Cumplimiento entre particulares ─────────────
  {
    slug: "poliza-de-cumplimiento-contrato-entre-particulares",
    titulo: "¿Cómo funciona la póliza de cumplimiento en un contrato entre particulares?",
    title: "Póliza de cumplimiento entre particulares",
    description:
      "Cuándo usar póliza de cumplimiento en contratos privados, con proveedores o arriendos comerciales, y en qué cambia frente a la estatal. Asesórate gratis.",
    respuesta:
      "Una póliza de cumplimiento entre particulares garantiza a una empresa o persona privada que su contraparte cumplirá un contrato, como una obra, un suministro o un arrendamiento comercial. A diferencia de la estatal, no se rige por el Decreto 1082 de 2015 sino por el Código de Comercio y por lo que pacten las partes, así que amparos, porcentajes y vigencias se negocian en el contrato. También cambia la forma de reclamar: el beneficiario debe demostrar el incumplimiento y su cuantía ante la aseguradora.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el proveedor que no entregó a tiempo",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Carolina es gerente de una distribuidora de alimentos en la zona industrial de la Vía 40. Contrató con un taller de Malambo la fabricación de estanterías para una bodega nueva y le entregó un anticipo. Supongamos que el anticipo fue de 50 millones de pesos. En el contrato pidió, además, que el taller tomara una póliza de cumplimiento con amparo de buen manejo del anticipo y de cumplimiento a favor de la distribuidora.",
          },
          {
            tipo: "p",
            texto:
              "El taller se atrasó meses y terminó entregando solo una parte. Como Carolina tenía el contrato firmado, las actas de avance y la correspondencia en la que había reclamado los atrasos, pudo presentar la reclamación ante la aseguradora con pruebas del incumplimiento y del perjuicio. El asesor la acompañó a armar el expediente.",
          },
          {
            tipo: "p",
            texto:
              "La lección: en un contrato privado, la póliza sirve si el contrato está bien escrito y si guardas pruebas. Sin actas ni comunicaciones, demostrar el incumplimiento es mucho más difícil.",
          },
        ],
      },
      {
        titulo: "¿En qué contratos privados se usa?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Obras y remodelaciones contratadas por empresas, conjuntos residenciales o personas.",
              "Suministro de bienes, cuando el comprador entrega anticipo o depende de la entrega para operar.",
              "Prestación de servicios: vigilancia, aseo, mantenimiento, software, transporte.",
              "Arrendamientos comerciales, para respaldar el pago del canon y las obligaciones del arrendatario cuando el contrato lo pide.",
              "Contratos con grandes empresas que exigen pólizas a todos sus proveedores como requisito para contratar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si eres el contratista, la póliza te abre puertas: muchas empresas no firman con proveedores que no la presenten. Si eres el contratante, te da un respaldo distinto al patrimonio de tu contraparte.",
          },
        ],
      },
      {
        titulo: "Diferencias con la póliza a favor de entidades estatales",
        bloques: [
          {
            tipo: "tabla",
            caption: "Póliza de cumplimiento estatal vs. entre particulares",
            columnas: ["Tema", "A favor de entidad estatal", "Entre particulares"],
            filas: [
              ["Norma principal", "Decreto 1082 de 2015, que reglamenta las garantías de la contratación estatal, además del Código de Comercio.", "Código de Comercio y lo que diga el contrato."],
              ["Amparos y porcentajes", "El decreto fija mínimos y el pliego los concreta.", "Se negocian libremente entre las partes."],
              ["Cómo se declara el siniestro", "La entidad lo declara mediante acto administrativo.", "El beneficiario debe demostrar el incumplimiento y la cuantía de la pérdida."],
              ["Falta de pago de la prima", "La garantía no expira por falta de pago ni puede revocarse unilateralmente.", "Se aplica la regla general: la mora en el pago de la prima termina el contrato de seguro."],
              ["Reticencias del tomador", "La aseguradora no puede oponerlas a la entidad.", "La aseguradora puede alegar la regla general de reticencia o inexactitud del Código de Comercio."],
              ["Texto de la póliza", "Clausulado para entidades estatales.", "Clausulado para particulares de cada aseguradora."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Dos efectos prácticos. Como contratante, exige ver el recibo de pago de la prima, porque en el ámbito privado una póliza sin pagar puede quedar sin efecto. Y como contratista, revisa que lo que te piden tenga sentido: porcentajes o vigencias exagerados encarecen la póliza sin necesidad.",
          },
        ],
      },
      {
        titulo: "Cómo pedirla bien en tu contrato",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Escribe en el contrato qué amparos se exigen: anticipo, cumplimiento, calidad, salarios o estabilidad, según el caso.",
              "Fija para cada amparo el valor asegurado (porcentaje del contrato) y la vigencia, incluido el tiempo después de la entrega si aplica.",
              "Indica quién es el asegurado y beneficiario: tu empresa, con su razón social y NIT.",
              "Pacta que el contratista debe ampliar la póliza si el contrato se prorroga o se adiciona.",
              "Al recibirla, revisa que coincida con el contrato y pide el soporte de pago de la prima.",
              "Durante la ejecución, guarda actas, entregas y correos: son tu prueba si hay que reclamar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si además te preocupan los daños que el contratista pueda causar a terceros mientras trabaja, eso no lo cubre la de cumplimiento; lo explicamos en Póliza de cumplimiento vs. póliza de responsabilidad civil: diferencias.",
          },
        ],
      },
      {
        titulo: "Qué pasa cuando hay que reclamar",
        bloques: [
          {
            tipo: "p",
            texto:
              "El Código de Comercio pone en cabeza del asegurado demostrar la ocurrencia del siniestro y la cuantía de la pérdida (artículo 1077). Cuando lo acredita, la aseguradora tiene un mes para pagar o, si no, reconoce intereses de mora (artículo 1080). Las acciones derivadas del seguro prescriben, por regla general, en dos años desde que el interesado conoció o debió conocer el hecho (artículo 1081), así que no conviene dejar pasar el tiempo.",
          },
          {
            tipo: "p",
            texto:
              "Si la aseguradora paga, después puede cobrarle al contratista lo que pagó. Por eso al contratista le piden contragarantía y por eso el estudio para expedir la póliza es exigente, igual que en la estatal.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Una persona natural puede pedirle póliza de cumplimiento a un contratista?",
        respuesta:
          "Sí. Cualquier persona o empresa que firma un contrato puede pactar que su contraparte tome una póliza de cumplimiento a su favor. Lo importante es que el contrato diga qué amparos, valores y vigencias exige.",
      },
      {
        pregunta: "¿Sirve para un local comercial en arriendo?",
        respuesta:
          "Puede servir para respaldar las obligaciones del arrendatario cuando el contrato lo pide. Hay también seguros de arrendamiento específicos; tu asesor te dice cuál encaja en tu caso.",
      },
      {
        pregunta: "¿Es obligatorio tomarla en un contrato privado?",
        respuesta:
          "Solo si el contrato lo exige. A diferencia de la contratación estatal, ninguna norma general la impone entre particulares; es un acuerdo entre las partes.",
      },
      {
        pregunta: "¿Puedo usar la póliza estatal que ya tengo para un cliente privado?",
        respuesta:
          "No. Cada póliza se expide para un contrato y un beneficiario concretos, y los clausulados para entidades estatales y para particulares son distintos.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de pólizas de cumplimiento entre particulares y necesito una para un contrato privado.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.19 (la entidad declara el siniestro por acto administrativo), 2.2.1.2.3.2.5 (no expira por falta de pago ni se revoca) y 2.2.1.2.3.2.6 (inoponibilidad de excepciones) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Código de Comercio, arts. 1058 (reticencia), 1068 (mora en la prima), 1077 (carga de la prueba), 1080 (plazo de pago) y 1081 (prescripción) — ${FUENTE_CCO}`,
      "Confirmar con el asesor si las aseguradoras con las que trabaja VanTrust expiden cumplimiento para arrendamientos comerciales o si se canaliza por el seguro de arrendamiento.",
    ],
  },

  // ───────────── 3. RC extracontractual del negocio ─────────────
  {
    slug: "poliza-responsabilidad-civil-extracontractual-negocio",
    titulo: "¿Qué cubre la póliza de responsabilidad civil extracontractual de un negocio?",
    title: "Qué cubre la responsabilidad civil de un negocio",
    description:
      "Qué cubre la RC extracontractual de tu negocio: daños a terceros en el local o la obra, RC patronal, subcontratistas y defensa. Cotiza con un asesor.",
    respuesta:
      "La póliza de responsabilidad civil extracontractual paga, hasta el valor asegurado, los perjuicios que tu negocio cause sin querer a personas con las que no tiene contrato, como un cliente que se lesiona en el local o un vecino al que se le daña la casa por una obra. Puede ampliarse con amparos como RC patronal, contratistas y subcontratistas, productos o vehículos propios y no propios. Además, por ley cubre los costos del proceso que el tercero promueva, con algunas salvedades.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la caída en el restaurante",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Luis tiene un restaurante en el barrio El Prado. Un domingo de lluvia, un cliente resbaló en la entrada mojada, se fracturó la muñeca y semanas después le envió una reclamación por gastos médicos, días sin trabajar y daño moral. Luis tenía seguro para el local y los equipos, pero no tenía responsabilidad civil: esa reclamación iba contra su bolsillo.",
          },
          {
            tipo: "p",
            texto:
              "Ahora imagina el mismo hecho con una póliza de RC extracontractual de predios, labores y operaciones. Luis avisa a la aseguradora, que analiza si hay responsabilidad, negocia con el cliente o asume la defensa si lo demandan, y paga lo que corresponda hasta el límite contratado, descontando el deducible si lo hay.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el seguro de daños protege tus cosas; la RC protege tu patrimonio frente a lo que le pase a otros por causa de tu negocio.",
          },
        ],
      },
      {
        titulo: "La base legal: por qué respondes por daños a terceros",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 2341 del Código Civil dice que quien ha cometido un delito o culpa que ha inferido daño a otro está obligado a indemnizarlo. El artículo 2347 agrega que respondes también por el hecho de quienes están a tu cuidado, y menciona expresamente a los empresarios frente a sus dependientes. Por eso un negocio puede tener que pagar por lo que hace un empleado durante su trabajo.",
          },
          {
            tipo: "p",
            texto:
              "El seguro de responsabilidad está regulado en el Código de Comercio. El artículo 1127 dice que su propósito es resarcir a la víctima, que se convierte en beneficiaria de la indemnización. El artículo 1133 le da a la víctima acción directa contra la aseguradora. Y el artículo 1128 obliga a la aseguradora a responder por los costos del proceso que promueva el tercero, aun en exceso de la suma asegurada, salvo dolo, riesgos excluidos, o si afrontas el proceso contra su orden expresa.",
          },
        ],
      },
      {
        titulo: "Ejemplos por tipo de negocio",
        bloques: [
          {
            tipo: "tabla",
            caption: "Situaciones que suele atender una póliza de RC extracontractual",
            columnas: ["Negocio", "Ejemplo de daño a un tercero", "Amparo que lo atiende"],
            filas: [
              ["Restaurante o local comercial", "Un cliente se cae en el piso mojado o se intoxica con un alimento.", "Predios, labores y operaciones; productos, si se pacta."],
              ["Taller mecánico", "Un carro de un cliente se daña mientras está bajo tu cuidado, o una chispa quema el local vecino.", "Predios y operaciones; bienes bajo cuidado, tenencia y control, si se pacta."],
              ["Constructora o contratista de obra", "Cae material sobre un carro parqueado o la excavación agrieta la casa vecina.", "Predios, labores y operaciones; contratistas y subcontratistas."],
              ["Evento", "Una tarima o una carpa se cae sobre los asistentes.", "RC para el evento, por la duración del mismo."],
              ["Cualquier empresa con empleados", "Un trabajador sufre un accidente laboral por culpa comprobada del empleador.", "RC patronal."],
            ],
          },
          {
            tipo: "p",
            texto:
              "En Barranquilla hay riesgos que se ven poco en otras ciudades: una obra que no maneja bien las aguas lluvias puede mandar un arroyo a los locales vecinos, y una tarima mal anclada sufre con la brisa de temporada. Cuéntale al asesor dónde y cómo trabajas para que la póliza responda a eso.",
          },
        ],
      },
      {
        titulo: "RC patronal, contratistas y subcontratistas",
        bloques: [
          {
            tipo: "p",
            texto:
              "Si un empleado se accidenta trabajando, el sistema de riesgos laborales (ARL) atiende sus prestaciones. Pero el artículo 216 del Código Sustantivo del Trabajo dice que, cuando hay culpa suficiente comprobada del empleador, este debe la indemnización total y ordinaria de perjuicios, descontando lo que ya pagó el sistema. El amparo de RC patronal está pensado para esa diferencia, según las condiciones de la póliza.",
          },
          {
            tipo: "p",
            texto:
              "El amparo de contratistas y subcontratistas cubre los daños a terceros que causen las personas que contrataste para una parte del trabajo. En la contratación estatal, el Decreto 1082 de 2015 exige póliza de RC extracontractual en los contratos de obra y pide que cubra también a los subcontratistas autorizados, o que estos tengan su propia póliza con la entidad como asegurada.",
          },
          {
            tipo: "lista",
            items: [
              "Revisa si tu póliza incluye vehículos propios y no propios, si tus empleados usan carro o moto para el trabajo.",
              "Pregunta por los límites por evento y por vigencia, y por los sublímites de cada amparo.",
              "Lee las exclusiones: suelen quedar por fuera los daños intencionales, las multas y las obligaciones que asumiste solo por contrato.",
            ],
          },
        ],
      },
      {
        titulo: "Cómo contratarla sin quedarte corto",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Describe la actividad real del negocio y dónde la haces: local, obras en sitio de clientes, eventos.",
              "Si un contrato te la exige, envía la cláusula: dice el valor asegurado, la vigencia y quién debe figurar como asegurado adicional.",
              "Define el valor asegurado pensando en el daño más grave que podrías causar, no solo en el mínimo del contrato.",
              "Agrega los amparos que tu operación necesita: patronal, contratistas, productos, vehículos.",
              "Ante cualquier reclamación, avisa a la aseguradora y no aceptes responsabilidad ni pagues sin consultarlo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si te piden esta póliza junto con la de cumplimiento en un contrato, revisa en qué se diferencian en nuestra guía Póliza de cumplimiento vs. póliza de responsabilidad civil: diferencias.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿La RC extracontractual cubre los daños a mi propio local?",
        respuesta:
          "No. Cubre daños a terceros. Para tus bienes necesitas un seguro de daños materiales o un seguro para pyme.",
      },
      {
        pregunta: "¿Cubre los gastos de abogado si me demandan?",
        respuesta:
          "El Código de Comercio obliga a la aseguradora a responder por los costos del proceso que promueva el tercero, con salvedades como el dolo o los riesgos excluidos. Además, muchas pólizas incluyen gastos de defensa con sus propias condiciones.",
      },
      {
        pregunta: "¿Qué pasa si el daño lo causa un empleado?",
        respuesta:
          "La ley te hace responder por el hecho de tus dependientes durante su trabajo, y la póliza de RC del negocio normalmente atiende esa reclamación según sus condiciones.",
      },
      {
        pregunta: "¿Puedo tomar una RC solo para un evento?",
        respuesta:
          "Sí. Existen pólizas de RC por la duración de un evento concreto. Necesitas el lugar, las fechas, el número estimado de asistentes y las actividades.",
      },
      {
        pregunta: "¿La víctima puede reclamarle directo a la aseguradora?",
        respuesta:
          "Sí. El Código de Comercio le da al damnificado acción directa contra la aseguradora en el seguro de responsabilidad civil.",
      },
    ],
    ramoRuta: "/pymes/responsabilidad-civil",
    waMensaje:
      "Hola, leí la guía de responsabilidad civil para negocios y quiero cotizar una póliza para mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código Civil, art. 2341 (responsabilidad extracontractual) — ${FUENTE_CC_2341}`,
      `Verificar con el asesor: Código Civil, art. 2347 (responsabilidad por el hecho de dependientes) — ${FUENTE_CC_2347}`,
      `Verificar con el asesor: Código de Comercio, arts. 1127 (seguro de responsabilidad), 1128 (costos del proceso) y 1133 (acción directa) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código Sustantivo del Trabajo, art. 216 (culpa del empleador) — ${FUENTE_CST_216}`,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.3.1.8 (RC extracontractual en contratos de obra y subcontratistas) — ${FUENTE_D1082}`,
      "Confirmar con el asesor los nombres de los amparos (predios, labores y operaciones; patronal; contratistas y subcontratistas; productos; vehículos propios y no propios; bienes bajo cuidado) tal como aparecen en los clausulados de las aseguradoras con las que trabaja VanTrust.",
    ],
  },

  // ───────────── 4. Transporte de mercancías ─────────────
  {
    slug: "seguro-transporte-de-mercancias-que-cubre",
    titulo: "¿Qué cubre el seguro de transporte de mercancías?",
    title: "Seguro de transporte de mercancías: qué cubre",
    description:
      "Seguro de transporte de mercancías: póliza automática o por despacho, volcamiento, hurto, saqueo y carga propia o de terceros. Cotiza con un asesor.",
    respuesta:
      "El seguro de transporte de mercancías cubre la pérdida o el daño de la carga por los riesgos del trayecto, como volcamiento, choque, incendio del vehículo o hurto, desde que el transportador la recibe hasta que la entrega al destinatario. Se toma por un solo despacho o como póliza automática para todos los envíos de un periodo. Lo puede tomar el dueño de la mercancía o quien responde por ella, como la empresa de transporte, indicando qué interés asegura.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el camión que no llegó a Santa Marta",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Mónica tiene una distribuidora de electrodomésticos en Barranquilla y despacha cada semana a tiendas de Santa Marta y Riohacha por la Troncal del Caribe. Usaba una transportadora conocida y daba por hecho que \"la carga iba asegurada\". Un camión se volcó en la vía y buena parte de la mercancía quedó dañada.",
          },
          {
            tipo: "p",
            texto:
              "Ahí aprendió dos cosas. La póliza de la transportadora protegía la responsabilidad de la transportadora, con sus propias condiciones y límites, y no necesariamente todo el valor de la carga. Y en la remesa ella no había declarado el valor real de la mercancía, lo que complicaba la reclamación. Después de eso tomó una póliza automática propia, declara cada despacho y revisa con el asesor las condiciones de seguridad que exige la aseguradora.",
          },
          {
            tipo: "p",
            texto:
              "La lección: si tu negocio depende de la carga, asegúrala a tu nombre y declara su valor real en cada despacho.",
          },
        ],
      },
      {
        titulo: "Póliza automática o por despacho",
        bloques: [
          {
            tipo: "tabla",
            caption: "Modalidades del seguro de transporte de mercancías",
            columnas: ["", "Específica (por despacho)", "Automática"],
            filas: [
              ["Para quién", "Quien envía carga de vez en cuando o un embarque puntual, como una importación.", "Quien despacha con frecuencia: distribuidoras, comercializadoras, fábricas."],
              ["Cómo funciona", "Se asegura un solo viaje, con su origen, destino y valor.", "Se fijan condiciones generales y cada despacho se reporta en declaraciones periódicas."],
              ["Límite", "El valor de ese despacho.", "Un límite máximo por despacho o por vehículo, fijado en la póliza."],
              ["Riesgo de olvido", "Si no la tomas, ese viaje va sin seguro.", "Los despachos quedan amparados dentro de las condiciones, pero debes declararlos."],
            ],
          },
          {
            tipo: "p",
            texto:
              "El Código de Comercio define la póliza automática como la que describe las condiciones generales y deja la identificación y el valor de cada envío para declaraciones posteriores (artículo 1050). Si declaras menos de lo que realmente movilizas, te expones a que la indemnización se reduzca.",
          },
        ],
      },
      {
        titulo: "¿Qué riesgos cubre y cuáles no?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El Código de Comercio dice que el seguro de transporte comprende todos los riesgos inherentes al transporte, salvo los deterioros por el simple paso del tiempo y los riesgos expresamente excluidos (artículo 1120). En la práctica, cada póliza define su amparo básico y sus amparos adicionales.",
          },
          {
            tipo: "lista",
            items: [
              "Accidentes del vehículo: volcamiento, choque, descarrilamiento o caída de la carga.",
              "Incendio o explosión del vehículo o de la carga.",
              "Hurto de toda la carga o del vehículo con la carga, según la definición de la póliza.",
              "Saqueo: el hurto de una parte del contenido del despacho; en muchas pólizas se pacta de forma expresa.",
              "Falta de entrega de bultos completos.",
              "Huelga, asonada, motín y actos terroristas: suelen ser amparos adicionales.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Suelen quedar por fuera el empaque inadecuado, el vicio propio de la mercancía, las mermas normales, la demora en la entrega y los daños por haber violado las condiciones de seguridad pactadas. Esas condiciones pueden incluir horarios de circulación, rutas, paradas autorizadas, escoltas o rastreo satelital para cargas de alto valor. Léelas antes de firmar: incumplirlas puede dejarte sin cobertura.",
          },
        ],
      },
      {
        titulo: "Carga propia o de terceros",
        bloques: [
          {
            tipo: "p",
            texto:
              "El seguro lo puede contratar el dueño de la mercancía y también quien responde por conservarla, como el comisionista o la empresa de transporte. La póliza debe decir si asegura la mercancía o la responsabilidad del transportador por la mercancía (artículo 1124 del Código de Comercio). No es lo mismo:",
          },
          {
            tipo: "tabla",
            caption: "Quién asegura qué en el transporte de carga",
            columnas: ["Situación", "Qué conviene revisar"],
            filas: [
              ["Mueves tu propia carga en tu propio camión", "Póliza de transporte de mercancías a tu nombre; el camión se asegura aparte."],
              ["Envías tu carga con una transportadora", "Tu propia póliza de mercancía; la de la transportadora protege su responsabilidad, no tu negocio."],
              ["Eres transportador y llevas carga de clientes", "Póliza que ampare tu responsabilidad por la mercancía de terceros."],
              ["Importas o exportas", "Quién asume el riesgo en cada tramo según el término de negociación con tu proveedor o cliente."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Declara siempre el valor de la carga al transportador. El Código de Comercio fija ese valor como el costo de la mercancía en el lugar de entrega, más embalajes, impuestos, fletes y seguros (artículo 1010). Si no lo declaras, la responsabilidad del transportador se limita a un porcentaje del valor que logres probar (artículo 1031), y en el transporte terrestre hecho por un tercero, salvo pacto en contrario, ese valor declarado también marca el límite de lo que paga el seguro por el daño a la mercancía (artículo 1122).",
          },
        ],
      },
      {
        titulo: "Contexto de la Costa: puerto y carreteras",
        bloques: [
          {
            tipo: "p",
            texto:
              "Barranquilla mueve carga por el puerto y por las vías hacia Cartagena (Vía al Mar o La Cordialidad), Santa Marta y La Guajira (Troncal del Caribe) y el interior. Esos trayectos combinan tramos largos de noche, lluvias fuertes en temporada y paradas que la aseguradora puede restringir. Si tu carga queda en una bodega del puerto o en tu centro de distribución antes de seguir viaje, pregunta si esa permanencia está cubierta: la ley permite extender la cobertura a los lugares inicial y final del trayecto si así se pacta (artículo 1118).",
          },
          {
            tipo: "pasos",
            items: [
              "Haz una lista del tipo de mercancía, su valor y cada cuánto despachas.",
              "Define rutas habituales, medios de transporte y si usas transportadora propia o de terceros.",
              "Cuéntale al asesor si hay importaciones o exportaciones y en qué término negocias.",
              "Revisa las condiciones de seguridad y comprométete solo con las que puedes cumplir.",
              "Ante un siniestro, avisa dentro de los tres días siguientes, toma fotos, deja constancia en la remesa y pide el informe de la autoridad si aplica.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de la transportadora cubre mi mercancía?",
        respuesta:
          "No necesariamente. Esa póliza protege la responsabilidad de la transportadora con sus propios límites y condiciones. Para proteger el valor de tu carga conviene tener tu propio seguro.",
      },
      {
        pregunta: "¿Cubre el robo en carretera?",
        respuesta:
          "El hurto de la carga suele estar cubierto según como lo defina la póliza. El saqueo o hurto parcial muchas veces se pacta aparte. Revisa también las condiciones de seguridad que exige la aseguradora.",
      },
      {
        pregunta: "¿Qué pasa si se me olvida declarar un despacho en la póliza automática?",
        respuesta:
          "Depende de las condiciones de la póliza, pero declarar menos de lo que movilizas puede reducir la indemnización. Lleva un registro de cada envío y repórtalo a tiempo.",
      },
      {
        pregunta: "¿Cubre la mercancía mientras está en bodega?",
        respuesta:
          "Solo si se pacta. La ley permite extender la cobertura a la permanencia en los lugares inicial y final del trayecto. Para la bodega permanente se usa un seguro de daños.",
      },
    ],
    ramoRuta: "/pymes/transporte-de-mercancias",
    waMensaje:
      "Hola, leí la guía del seguro de transporte de mercancías y quiero asegurar los despachos de mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1050 (póliza automática), 1075 (aviso en tres días), 1118 (inicio y fin de la responsabilidad del asegurador), 1120 (riesgos asegurables), 1122 (límite por valor declarado en transporte terrestre) y 1124 (quién puede contratarlo) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, arts. 1010 (valor que declara el remitente) y 1031 (indemnización a cargo del transportador) — ${FUENTE_CCO}`,
      "Confirmar con el asesor qué amparos son básicos y cuáles adicionales (saqueo, huelga y asonada, terrorismo) y qué condiciones de seguridad piden para las rutas de la Costa las aseguradoras con las que trabaja VanTrust.",
    ],
  },

  // ───────────── 5. Seguro para pyme (multirriesgo) ─────────────
  {
    slug: "seguro-para-pyme-que-cubre",
    titulo: "¿Qué cubre un seguro para pyme y cómo definir el valor asegurado?",
    title: "Seguro para pyme: qué cubre y cuánto asegurar",
    description:
      "Qué cubre un seguro multirriesgo para pyme: incendio, terremoto, robo, equipos, maquinaria, RC y lucro cesante, y cómo evitar el infraseguro. Asesórate.",
    respuesta:
      "Un seguro para pyme, o multirriesgo, agrupa en una póliza la protección de los bienes del negocio, como local, maquinaria, equipos e inventario, frente a incendio y riesgos aliados, terremoto, sustracción, daños de equipo electrónico y rotura de maquinaria, y puede sumar responsabilidad civil y lucro cesante. El valor asegurado debe reflejar lo que cuesta reponer los bienes. Si aseguras por menos, el Código de Comercio permite a la aseguradora pagar solo en proporción.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la ferretería que se aseguró por la mitad",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Jorge tiene una ferretería en el centro de Barranquilla. Hace años tomó un seguro y puso como valor del inventario lo que tenía en ese momento. Desde entonces el negocio creció, pero nunca actualizó la póliza. Un corto en la noche causó un incendio que dañó parte de la mercancía.",
          },
          {
            tipo: "p",
            texto:
              "Supongamos que el inventario realmente valía 400 millones de pesos y estaba asegurado por 200 millones, la mitad. Supongamos que el daño fue de 100 millones. Como solo estaba asegurada la mitad del valor, la aseguradora aplicó la regla proporcional y reconoció la mitad de la pérdida, 50 millones, antes de descontar el deducible. Jorge tenía póliza, pero por haberse quedado corto en el valor asumió la otra mitad.",
          },
          {
            tipo: "p",
            texto:
              "La lección: revisa los valores asegurados cada año, sobre todo si el negocio creció, compraste maquinaria o subiste el inventario.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre un seguro para pyme?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Coberturas frecuentes en un seguro multirriesgo para pyme",
            columnas: ["Cobertura", "Qué protege"],
            filas: [
              ["Incendio y aliadas", "Daños por incendio, rayo, explosión y, según la póliza, daños por agua, anegación, vendaval o actos malintencionados de terceros."],
              ["Terremoto", "Daños por temblor, maremoto o erupción volcánica, cuando la póliza lo incluye expresamente."],
              ["Sustracción", "Hurto de bienes del negocio, por lo general cuando hay violencia o fuerza para entrar."],
              ["Equipo electrónico", "Daños accidentales a computadores, servidores, cajas registradoras y equipos similares, incluidos los causados por variaciones de voltaje según la póliza."],
              ["Rotura de maquinaria", "Daños internos súbitos de máquinas: fallas eléctricas, mecánicas o errores de operación."],
              ["Responsabilidad civil", "Daños que el negocio cause a terceros en el local o por su actividad."],
              ["Lucro cesante", "La utilidad que deja de ganar el negocio mientras está detenido por un daño cubierto."],
              ["Otros amparos", "Según la aseguradora: dinero en efectivo, manejo o infidelidad de empleados, vidrios."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Dos detalles legales que vale la pena conocer. El Código de Comercio entiende excluidos el terremoto y otras convulsiones de la naturaleza, y también los motines, huelgas y conmociones populares (artículo 1105); por eso, cuando una póliza los cubre, es porque los incluye de forma expresa. Y el lucro cesante solo se indemniza si se pacta de manera expresa (artículo 1088). Si no aparecen en tu póliza, no los tienes.",
          },
          {
            tipo: "p",
            texto:
              "En la Costa conviene preguntar en especial por la anegación y los daños por agua, por los arroyos y los aguaceros de temporada, y por los daños de equipos por variaciones de voltaje. Para los daños a terceros, lee nuestra guía sobre qué cubre la responsabilidad civil de un negocio, y para la parada del negocio, la de lucro cesante.",
          },
        ],
      },
      {
        titulo: "Cómo definir el valor asegurado",
        bloques: [
          {
            tipo: "p",
            texto:
              "El valor asegurado es el tope de lo que te pueden pagar y la base para calcular la prima. En los seguros de daños, la indemnización no puede pasar del valor real del bien al momento del siniestro (artículo 1089 del Código de Comercio), aunque las partes pueden pactar que se pague por valor de reposición o reemplazo (artículo 1090). En la práctica, muchas pólizas para pyme se contratan a valor de reposición: lo que costaría comprar o construir hoy un bien nuevo equivalente.",
          },
          {
            tipo: "pasos",
            items: [
              "Haz un inventario por grupos: edificio o mejoras locativas, maquinaria, equipo electrónico, muebles y enseres, mercancías.",
              "Para cada grupo, estima cuánto costaría reponerlo hoy, con fletes, instalación e impuestos. Una cotización reciente sirve.",
              "Para el inventario, usa el valor que manejas en los meses más altos o pregunta por una cláusula para inventarios que suben y bajan.",
              "Si el local es arrendado, asegura tus contenidos y las mejoras que hiciste; el edificio lo asegura el dueño.",
              "Revisa los valores al renovar y cada vez que compres equipos o crezca el inventario.",
            ],
          },
        ],
      },
      {
        titulo: "Por qué el infraseguro castiga la indemnización",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 1102 del Código de Comercio dice que, si no está asegurado el valor íntegro del interés, la aseguradora solo indemniza el daño a prorrata entre la cantidad asegurada y la que no lo está. Es la llamada regla proporcional: si aseguraste la mitad del valor, te pagan la mitad de cada pérdida, aunque la pérdida sea pequeña.",
          },
          {
            tipo: "p",
            texto:
              "El mismo artículo permite que las partes pacten otra cosa: que el asegurado no soporte parte de la pérdida salvo que esta supere la suma asegurada. Algunas pólizas incluyen cláusulas de este tipo o márgenes de tolerancia para el infraseguro. Pregúntale al asesor si tu póliza las tiene y en qué condiciones, porque cambian mucho el resultado.",
          },
          {
            tipo: "p",
            texto:
              "Asegurar por más de lo que valen los bienes tampoco sirve: pagas más prima y la aseguradora no te va a indemnizar por encima del daño real, porque el seguro de daños no puede ser fuente de enriquecimiento.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué diferencia hay entre un seguro pyme y un todo riesgo daños materiales?",
        respuesta:
          "El todo riesgo se concentra en los bienes físicos. El seguro pyme agrupa los bienes con otras coberturas del negocio, como responsabilidad civil o dinero en efectivo, en una sola póliza. Cuál conviene depende del tamaño de la empresa.",
      },
      {
        pregunta: "¿El seguro para pyme cubre el robo?",
        respuesta:
          "Suele cubrir la sustracción con violencia o con fuerza para entrar al local. El hurto sin señales de violencia y las pérdidas que solo aparecen en un inventario muchas veces quedan por fuera.",
      },
      {
        pregunta: "¿Cubre inundaciones por arroyos?",
        respuesta:
          "Muchas pólizas incluyen anegación o daños por agua como amparo de incendio y aliadas o como amparo adicional. Verifica que esté en la tuya y con qué deducible.",
      },
      {
        pregunta: "¿Qué pasa si aseguro por menos de lo que vale mi negocio?",
        respuesta:
          "Si no hay una cláusula que lo evite, la aseguradora puede pagarte solo en proporción entre lo asegurado y el valor real, aunque la pérdida sea parcial.",
      },
    ],
    ramoRuta: "/pymes/todo-riesgo-pyme",
    waMensaje:
      "Hola, leí la guía del seguro para pyme y quiero cotizar la póliza de mi negocio.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 1102 (infraseguro y regla proporcional) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, arts. 1088 (carácter indemnizatorio y lucro cesante por acuerdo expreso), 1089 (límite máximo: valor real), 1090 (valor de reposición) y 1105 (riesgos catastróficos excluidos salvo inclusión) — ${FUENTE_CCO}`,
      "Confirmar con el asesor el alcance de incendio y aliadas, sustracción, anegación y cláusulas de tolerancia al infraseguro o de inventarios variables en las pólizas pyme de las aseguradoras con las que trabaja VanTrust.",
    ],
  },

  // ───────────── 6. Lucro cesante ─────────────
  {
    slug: "lucro-cesante-seguro-negocio",
    titulo: "¿Qué es el lucro cesante en un seguro y cuándo vale la pena para tu negocio?",
    title: "Lucro cesante: qué es y cuándo vale la pena",
    description:
      "El lucro cesante cubre la utilidad que pierde tu negocio mientras está parado tras un siniestro. Cómo se calcula y a quién le conviene. Asesórate gratis.",
    respuesta:
      "El lucro cesante es la cobertura que reconoce la utilidad que el negocio deja de ganar y los gastos fijos que sigue pagando mientras está parado por un daño cubierto, como un incendio. Se paga durante el período de indemnización que eliges al contratar, que debe alcanzar para reconstruir, reponer equipos y recuperar ventas. En Colombia solo se indemniza si se pacta de forma expresa en la póliza.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el incendio en la bodega",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Patricia tiene una comercializadora de productos de aseo con bodega en la zona industrial de Barranquilla. Tenía asegurados la bodega, la estantería y el inventario. Un incendio dejó la bodega inutilizable y el seguro de daños pagó la reparación y la mercancía, descontando el deducible.",
          },
          {
            tipo: "p",
            texto:
              "Pero la reparación tomó meses. Durante ese tiempo casi no vendió, y aun así tuvo que pagar la nómina de su equipo, el arriendo de una bodega provisional, las cuotas del crédito y los servicios. Esos meses sin ingresos casi la obligan a cerrar. Si hubiera tenido lucro cesante, la póliza habría reconocido la utilidad que dejó de ganar y esos gastos fijos durante el período pactado.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el seguro de daños repara las cosas; el lucro cesante mantiene vivo el negocio mientras las cosas se reparan.",
          },
        ],
      },
      {
        titulo: "Qué cubre el lucro cesante",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 1088 del Código de Comercio dice que en los seguros de daños la indemnización puede comprender el daño emergente y el lucro cesante, pero que este último debe ser objeto de un acuerdo expreso. Por eso no viene incluido por defecto: hay que contratarlo.",
          },
          {
            tipo: "lista",
            items: [
              "La utilidad que el negocio deja de ganar por la caída de ventas o de producción.",
              "Los gastos fijos que siguen corriendo aunque no vendas: nómina, arriendo, servicios, cuotas de créditos, según la póliza.",
              "Los gastos extra razonables para reducir la pérdida, como arrendar un local provisional o pagar horas extras para retomar la producción, según las condiciones.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Por lo general, el lucro cesante se activa solo cuando la parada viene de un daño material cubierto por tu póliza de daños, como incendio, terremoto o anegación si los tienes. Una caída de ventas por la economía, una temporada mala o un cliente que se va no son siniestros de lucro cesante.",
          },
        ],
      },
      {
        titulo: "Cómo se calcula el período de indemnización",
        bloques: [
          {
            tipo: "p",
            texto:
              "El período de indemnización es el tiempo máximo durante el cual la póliza reconoce la pérdida, contado desde el siniestro. Lo escoges al contratar y es la decisión más importante de esta cobertura: si te quedas corto, la póliza deja de pagar antes de que el negocio vuelva a la normalidad.",
          },
          {
            tipo: "pasos",
            items: [
              "Estima cuánto tardaría reparar o reconstruir tu local o bodega, incluidos permisos y diseños.",
              "Suma lo que tardaría reponer la maquinaria y los equipos clave. Si son importados, cuenta el tiempo de fabricación, envío, nacionalización en puerto e instalación.",
              "Agrega el tiempo para recuperar el nivel de ventas: clientes que se fueron con la competencia no vuelven el primer día.",
              "Compara el resultado con los períodos que ofrece la aseguradora y escoge uno que cubra el escenario realista, no el más optimista.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Ten en cuenta que muchas pólizas aplican un deducible en días: los primeros días de parada los asume el negocio. Pregunta cuántos son en tu póliza.",
          },
        ],
      },
      {
        titulo: "Cómo se define el valor asegurado",
        bloques: [
          {
            tipo: "p",
            texto:
              "El valor asegurado del lucro cesante sale de tu contabilidad: la utilidad bruta, entendida como ventas menos costos variables, o las utilidades y gastos fijos proyectados para el período de indemnización. Cada aseguradora tiene su forma de calcularlo, y tu contador es clave para este paso.",
          },
          {
            tipo: "tabla",
            caption: "Qué información necesitas para cotizar lucro cesante",
            columnas: ["Dato", "Para qué sirve"],
            filas: [
              ["Estados financieros recientes", "Calcular la utilidad bruta y los gastos fijos reales."],
              ["Proyección de ventas", "Ajustar el valor si el negocio está creciendo."],
              ["Estacionalidad", "Saber si hay meses de ventas altas, como diciembre o el Carnaval, que pesan más."],
              ["Tiempos de reposición", "Definir el período de indemnización."],
              ["Dependencia de un solo sitio", "Medir cuánto se paraliza el negocio si se daña la bodega o la planta."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Igual que en el seguro de daños, asegurar por debajo de la realidad puede reducir la indemnización en proporción. Lee la guía sobre qué cubre un seguro para pyme para entender cómo funciona el infraseguro. Y cuando ocurra un siniestro, lleva registro de ventas y gastos: el artículo 1077 del Código de Comercio pone en el asegurado la carga de demostrar la cuantía de la pérdida.",
          },
        ],
      },
      {
        titulo: "¿Para quién vale la pena?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Negocios que operan desde un solo local, bodega o planta y no pueden mudarse rápido.",
              "Empresas con maquinaria importada o especializada que tarda en reponerse.",
              "Negocios con gastos fijos altos, como nómina grande, arriendo o créditos.",
              "Empresas con contratos de suministro que perderían clientes si dejan de entregar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Puede pesar menos para un negocio que puede seguir operando desde otro lugar en pocos días, o que tiene pocos gastos fijos. Un asesor te ayuda a ver si la prima se justifica en tu caso, sin venderte algo que no necesitas.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El lucro cesante se puede contratar solo?",
        respuesta:
          "Por lo general se contrata junto con un seguro de daños o un seguro pyme, porque se activa cuando hay un daño material cubierto que detiene el negocio.",
      },
      {
        pregunta: "¿Cubre la caída de ventas por una crisis o una pandemia?",
        respuesta:
          "Normalmente no. El lucro cesante tradicional requiere un daño material cubierto en tus bienes. Las pérdidas sin daño físico suelen estar excluidas, salvo que la póliza diga otra cosa.",
      },
      {
        pregunta: "¿Cuánto tiempo debo elegir como período de indemnización?",
        respuesta:
          "El que realmente tardaría tu negocio en volver a su nivel normal: reconstrucción, reposición de equipos y recuperación de clientes. Es mejor calcularlo con un escenario realista.",
      },
      {
        pregunta: "¿Qué necesito para reclamar?",
        respuesta:
          "Aviso oportuno a la aseguradora y soportes contables: ventas antes y después del siniestro, nómina, arriendo y demás gastos. Sin contabilidad ordenada, demostrar la pérdida es difícil.",
      },
    ],
    ramoRuta: "/pymes/todo-riesgo-pyme",
    waMensaje:
      "Hola, leí la guía de lucro cesante y quiero saber si me conviene para mi negocio.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 1088 (el lucro cesante debe ser objeto de acuerdo expreso) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, arts. 1077 (carga de la prueba) y 1102 (infraseguro) — ${FUENTE_CCO}`,
      "Confirmar con el asesor cómo calculan el valor asegurado (utilidad bruta o gastos fijos más utilidad), qué períodos de indemnización ofrecen y el deducible en días en las aseguradoras con las que trabaja VanTrust.",
    ],
  },
];
