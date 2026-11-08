// Guías de pólizas de cumplimiento (SEO + AEO).
//
// Reglas del brief (docs/brief-guias.md): nada de cifras, tarifas ni
// testimonios inventados; cada guía abre con un caso ilustrativo rotulado;
// las normas citadas se verificaron en Función Pública o la Secretaría del
// Senado y quedan en `todo` para que el asesor las confirme. Sin SOAT.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FUENTE_D1082 =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77653";
const FUENTE_CCO =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102";
const FUENTE_L1150 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_1150_2007.html";
const FUENTE_L80 = "http://www.secretariasenado.gov.co/senado/basedoc/ley_0080_1993.html";
const FUENTE_L1474 =
  "http://www.secretariasenado.gov.co/senado/basedoc/ley_1474_2011_pr001.html";

const CASO_ILUSTRATIVO =
  "Este es un ejemplo para explicar cómo funciona; no es un cliente real.";

export const GUIAS_CUMPLIMIENTO: Guia[] = [
  // ───────────── 1. Qué es la póliza de cumplimiento ─────────────
  {
    slug: "que-es-poliza-de-cumplimiento-licitacion",
    titulo: "¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación?",
    title: "Qué es una póliza de cumplimiento y cuándo la piden",
    description:
      "Qué es la póliza de cumplimiento, qué amparos tiene y en qué momento de una licitación te la piden en Colombia. Guía clara para contratistas. Asesórate.",
    respuesta:
      "Una póliza de cumplimiento es un seguro que garantiza a la entidad contratante que el contratista cumplirá el contrato; si no lo hace, la aseguradora paga los perjuicios hasta el valor asegurado. En una licitación se pide dos veces: la de seriedad de la oferta al presentar la propuesta y la de cumplimiento después de la adjudicación, antes de ejecutar el contrato.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la primera licitación de una constructora de Soledad",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Ricardo tiene una pequeña constructora en Soledad. Durante años trabajó solo para particulares: casas, locales y remodelaciones. Un día vio en el SECOP un proceso de un municipio del Atlántico para pavimentar unas calles y decidió presentarse. Armó la propuesta técnica con cuidado, pero dejó la póliza para el final porque pensó que era un trámite de un día.",
          },
          {
            tipo: "p",
            texto:
              "Dos días antes del cierre llamó a una aseguradora y descubrió que no tenía cupo: nunca lo habían estudiado. Además, no sabía que primero le pedían una garantía de seriedad de la oferta y, si ganaba, otra distinta de cumplimiento con varios amparos. Con ayuda de un asesor reunió los estados financieros, presentó el caso a varias aseguradoras y alcanzó a radicar la oferta con su garantía de seriedad. Semanas después, cuando le adjudicaron, ya tenía cupo y la póliza de cumplimiento salió a tiempo.",
          },
          {
            tipo: "p",
            texto:
              "La lección: la póliza de cumplimiento no se compra el día del cierre. Se prepara desde que decides participar, porque la aseguradora estudia a tu empresa antes de respaldarte.",
          },
        ],
      },
      {
        titulo: "¿Quién es quién en una póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "En la póliza de cumplimiento hay tres partes: el contratista que la toma, la entidad que queda protegida y la aseguradora que respalda la obligación. A diferencia de otros seguros, el que paga la prima no es el protegido.",
          },
          {
            tipo: "tabla",
            caption: "Las partes de una póliza de cumplimiento",
            columnas: ["Parte", "Quién es", "Qué hace"],
            filas: [
              ["Tomador o afianzado", "El contratista o proponente.", "Paga la prima y se obliga a cumplir el contrato."],
              ["Asegurado y beneficiario", "La entidad estatal o la empresa contratante.", "Recibe la indemnización si el contratista incumple."],
              ["Aseguradora o garante", "La compañía de seguros.", "Estudia al contratista, expide la póliza y paga si hay siniestro."],
            ],
          },
          {
            tipo: "p",
            texto:
              "El amparo es cada riesgo que cubre la póliza, con su propio valor asegurado y su propia vigencia. El valor asegurado es el máximo que paga la aseguradora por ese amparo. La vigencia es el tiempo durante el cual el amparo está activo.",
          },
        ],
      },
      {
        titulo: "¿En qué momento de la licitación piden la póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La piden en dos momentos: al presentar la oferta y después de la adjudicación. La Ley 1150 de 2007 (artículo 7) dice que los proponentes prestan garantía de seriedad de sus ofrecimientos y los contratistas, garantía única de cumplimiento.",
          },
          {
            tipo: "pasos",
            items: [
              "Al presentar la oferta: garantía de seriedad de la oferta. Respalda que mantendrás tu propuesta y firmarás si te adjudican.",
              "Después de la adjudicación: garantía de cumplimiento con los amparos que pide el pliego. La entidad la revisa y la aprueba antes de iniciar la ejecución.",
              "Durante la ejecución: si el contrato se prorroga o se adiciona, la entidad debe exigir que amplíes el valor o la vigencia de la garantía.",
              "Después de la entrega: algunos amparos, como estabilidad de la obra o pago de salarios, siguen vigentes años después.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El detalle de la primera etapa está en nuestra guía ¿Qué es la garantía de seriedad de la oferta y cuánto debe valer?",
          },
        ],
      },
      {
        titulo: "¿Qué amparos tiene la póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza de cumplimiento puede tener hasta siete amparos, y el pliego dice cuáles exige cada contrato. Los define el Decreto 1082 de 2015, artículo 2.2.1.2.3.1.7.",
          },
          {
            tipo: "tabla",
            caption: "Amparos de la garantía de cumplimiento en la contratación estatal",
            columnas: ["Amparo", "Qué cubre"],
            filas: [
              ["Buen manejo y correcta inversión del anticipo", "Que el anticipo no se invierta, se use mal o se apropie indebidamente."],
              ["Devolución del pago anticipado", "Que no se devuelva el dinero pagado por adelantado cuando haya lugar."],
              ["Cumplimiento del contrato", "Incumplimiento total o parcial, cumplimiento tardío o defectuoso, multas y cláusula penal."],
              ["Pago de salarios, prestaciones e indemnizaciones laborales", "Que el contratista no pague a los trabajadores que usó en el contrato."],
              ["Estabilidad y calidad de la obra", "Daños o deterioro de la obra entregada a satisfacción, imputables al contratista."],
              ["Calidad del servicio", "Perjuicios por la mala calidad del servicio prestado."],
              ["Calidad y correcto funcionamiento de los bienes", "Bienes que no cumplen las especificaciones o fallan."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Según el mismo decreto, los amparos son independientes: la entidad solo puede usar el valor de un amparo para cubrir el riesgo de ese amparo. Si quieres profundizar en dos de ellos, lee ¿Qué es la póliza de buen manejo del anticipo y cómo funciona? y ¿Qué es la póliza de estabilidad de obra y cuántos años dura?",
          },
        ],
      },
      {
        titulo: "¿Todas las licitaciones exigen póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "No todas. La Ley 1150 de 2007 dice que las garantías no son obligatorias en los contratos de empréstito, los interadministrativos, los de seguro y los de valor inferior al 10 % de la menor cuantía, donde la entidad decide si la pide.",
          },
          {
            tipo: "lista",
            items: [
              "Mínima cuantía: el Decreto 1082 de 2015 (artículo 2.2.1.2.1.5.5) deja a la entidad libre de exigir o no garantías.",
              "Contratación directa: las garantías no son obligatorias y la entidad debe justificar en los estudios previos si las pide (artículo 2.2.1.2.1.4.5).",
              "Licitación pública, selección abreviada y concurso de méritos: lo normal es que el pliego las exija.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Además de la póliza de seguro, el decreto acepta como garantía el patrimonio autónomo y la garantía bancaria. En la práctica, la póliza es la más usada por pymes y contratistas. Y una regla que protege a la entidad: la póliza a favor de entidades estatales no expira por falta de pago de la prima ni se puede revocar unilateralmente.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuánto tiempo antes del cierre debo tramitar la póliza?",
        respuesta:
          "Con varios días de margen. Si es tu primera póliza con una aseguradora, primero te estudian y te asignan un cupo, y eso toma más tiempo que expedir la póliza. Si ya tienes cupo vigente, el trámite suele ser más rápido.",
      },
      {
        pregunta: "¿Qué pasa si mi garantía de cumplimiento no sale a tiempo después de la adjudicación?",
        respuesta:
          "Sin la garantía aprobada el contrato no puede empezar a ejecutarse. Si no la entregas, la entidad puede hacer efectiva tu garantía de seriedad de la oferta, porque no otorgar la garantía de cumplimiento es uno de los riesgos que esta cubre.",
      },
      {
        pregunta: "¿La aseguradora me puede negar la póliza de cumplimiento?",
        respuesta:
          "Sí. La aseguradora estudia tu capacidad financiera, tu experiencia y los contratos que ya tienes. Si no le convence el riesgo, puede negarla o pedir más contragarantías. Por eso conviene presentar el caso a varias aseguradoras a través de un asesor.",
      },
      {
        pregunta: "¿Si la aseguradora paga, quedo libre de deuda?",
        respuesta:
          "No. En los seguros de cumplimiento la aseguradora puede cobrarte lo que pagó. El Código de Comercio (artículo 1099) excluye este ramo de la regla que limita la subrogación. Por eso te piden un pagaré o contragarantía.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de qué es la póliza de cumplimiento y necesito una para una licitación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Ley 1150 de 2007, art. 7 (garantía de seriedad y garantía única; no expiran por falta de pago; casos en que no son obligatorias) — ${FUENTE_L1150}`,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.2 (clases de garantías), 2.2.1.2.3.1.7 (amparos), 2.2.1.2.3.1.18 (ampliación por prórroga o adición), 2.2.1.2.3.2.1 (amparos independientes) y 2.2.1.2.3.2.5 (no expira por falta de pago) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.1.5.5 (mínima cuantía) y 2.2.1.2.1.4.5 (contratación directa) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Código de Comercio, art. 1099 (subrogación en seguros de cumplimiento) — ${FUENTE_CCO}`,
    ],
  },

  // ───────────── 2. Requisitos ─────────────
  {
    slug: "requisitos-poliza-de-cumplimiento",
    titulo: "¿Cuáles son los requisitos para sacar una póliza de cumplimiento?",
    title: "Requisitos para sacar una póliza de cumplimiento",
    description:
      "Requisitos para sacar una póliza de cumplimiento en Colombia: documentos de la empresa o persona natural, cupo y contragarantía. Prepáralos con un asesor.",
    respuesta:
      "Los requisitos para sacar una póliza de cumplimiento son el pliego o contrato que la exige y los documentos de quien la toma: certificado de existencia y representación legal reciente, RUT, estados financieros, cédula del representante legal y el formulario de conocimiento del cliente. Con eso la aseguradora estudia tu empresa, te asigna un cupo y suele pedir una contragarantía, como un pagaré.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la empresa de aseo que cotizó tarde",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Paola dirige una empresa de aseo y cafetería en Barranquilla con unos años en el mercado. Una universidad privada de la ciudad le adjudicó un contrato y le dio pocos días hábiles para entregar la póliza de cumplimiento. Paola envió a la aseguradora solo la cláusula de garantías del contrato y unos estados financieros que el contador todavía no había firmado.",
          },
          {
            tipo: "p",
            texto:
              "La aseguradora le devolvió la solicitud: necesitaba el contrato completo para ver el plazo y las obligaciones, los estados financieros firmados con sus notas y el certificado de Cámara de Comercio actualizado. Paola perdió días corriendo detrás de cada papel. Con un asesor organizó la carpeta completa, la envió de una vez a varias aseguradoras y entregó la póliza dentro del plazo, aunque con el agua al cuello.",
          },
          {
            tipo: "p",
            texto:
              "La lección: si tu empresa contrata con frecuencia, ten la carpeta lista antes de necesitarla. La póliza sale más rápido cuando la aseguradora recibe todo completo la primera vez.",
          },
        ],
      },
      {
        titulo: "¿Qué documentos piden para una póliza de cumplimiento a una empresa?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Para una empresa, las aseguradoras suelen pedir el contrato o pliego, los documentos legales de la sociedad y la información financiera. Cada aseguradora puede pedir algo adicional según el tamaño del contrato.",
          },
          {
            tipo: "tabla",
            caption: "Documentos que suelen pedir las aseguradoras a una empresa",
            columnas: ["Documento", "Para qué sirve"],
            filas: [
              ["Pliego de condiciones o contrato completo", "Define amparos, porcentajes, vigencias y beneficiario."],
              ["Certificado de existencia y representación legal reciente (Cámara de Comercio)", "Acredita que la empresa existe, su objeto y quién la representa."],
              ["RUT", "Identificación tributaria de la empresa."],
              ["Estados financieros del último cierre, con notas y firmados", "Permiten estudiar liquidez, endeudamiento y patrimonio."],
              ["Cédula del representante legal", "Identifica a quien firma la solicitud y la contragarantía."],
              ["Formulario de conocimiento del cliente (SARLAFT)", "Requisito de prevención de lavado de activos y financiación del terrorismo."],
              ["Relación de contratos ejecutados o en ejecución", "Muestra experiencia y cuánto cupo ya está comprometido."],
            ],
          },
        ],
      },
      {
        titulo: "¿Qué piden si eres persona natural?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Si eres persona natural, la lista es más corta pero la aseguradora igual estudia tus ingresos y tu patrimonio. Estos son los documentos más comunes:",
          },
          {
            tipo: "lista",
            items: [
              "Cédula de ciudadanía.",
              "RUT.",
              "Soportes de ingresos, como la declaración de renta o certificados.",
              "Formulario de conocimiento del cliente.",
              "El contrato, la orden de servicio o el pliego que exige la póliza.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Un profesional independiente que firma un contrato de prestación de servicios con una entidad, por ejemplo, suele necesitar una póliza más sencilla que una constructora, pero los documentos de identidad e ingresos no se los salta nadie.",
          },
        ],
      },
      {
        titulo: "¿Qué es el cupo y qué es la contragarantía?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El cupo es el monto máximo que una aseguradora está dispuesta a garantizarte, según el estudio de tu empresa. La contragarantía es el documento con el que te comprometes a devolverle a la aseguradora lo que pague si incumples.",
          },
          {
            tipo: "p",
            texto:
              "Las pólizas que tengas vigentes consumen ese cupo hasta que vencen o se liberan. Por eso una empresa con muchos contratos al mismo tiempo puede quedarse sin cupo en una aseguradora y necesitar otra. La contragarantía suele ser un pagaré con carta de instrucciones; en contratos grandes o perfiles más débiles pueden pedir codeudores u otros respaldos. Existe porque, en cumplimiento, la aseguradora puede recobrarte lo que pagó: el Código de Comercio (artículo 1099) excluye este ramo de la regla que limita la subrogación.",
          },
        ],
      },
      {
        titulo: "¿Cómo cumplir los requisitos para sacar una póliza de cumplimiento sin demoras?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La forma más segura de evitar demoras es enviar todo completo y con tiempo. Estos pasos ayudan:",
          },
          {
            tipo: "pasos",
            items: [
              "Pide el certificado de Cámara de Comercio con fecha reciente; muchas aseguradoras no aceptan uno viejo.",
              "Prepara los estados financieros del último cierre firmados por el contador y, si aplica, por el revisor fiscal.",
              "Envía el pliego o el contrato completo, no solo el anexo de garantías.",
              "Revisa que el nombre y el NIT del beneficiario estén bien escritos antes de pedir la expedición.",
              "Ten listo al representante legal para firmar la contragarantía.",
              "Cuando la recibas, compárala con el pliego: amparos, porcentajes, vigencias y beneficiario.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En la contratación estatal, el Decreto 1082 de 2015 (artículo 2.2.1.2.3.2.7) prohíbe que la aseguradora te exija comprar amparos que la entidad no pidió. Si quieres entender de qué depende el precio una vez tengas los documentos, revisa ¿Cuánto cuesta una póliza de cumplimiento y de qué depende el precio?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Una empresa recién creada puede sacar póliza de cumplimiento?",
        respuesta:
          "Puede intentarlo, pero sin historia financiera la aseguradora tiene poca información para estudiarla. Puede pedir más contragarantías, codeudores o negar el cupo. Presentar el caso a varias aseguradoras y mostrar la experiencia de los socios ayuda.",
      },
      {
        pregunta: "¿Me piden los mismos documentos cada vez que saco una póliza?",
        respuesta:
          "No siempre. Si ya tienes cupo vigente con una aseguradora, para cada nueva póliza suelen bastar el contrato y la solicitud. Al renovar el cupo, normalmente una vez al año, te piden otra vez los estados financieros actualizados.",
      },
      {
        pregunta: "¿Puedo sacar la póliza de cumplimiento si estoy reportado en centrales de riesgo?",
        respuesta:
          "Es posible que sea más difícil. La aseguradora revisa tu comportamiento financiero como parte del estudio, y un reporte negativo puede llevar a una negativa o a exigencias mayores. Cada aseguradora decide según su política.",
      },
      {
        pregunta: "¿Un consorcio o unión temporal puede tomar la póliza?",
        respuesta:
          "Sí. En ese caso la aseguradora suele estudiar a cada integrante y pedir el documento de constitución del consorcio o la unión temporal, con la participación de cada uno. La póliza se expide a nombre del consorcio o unión temporal.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje: "Hola, leí la guía de requisitos y necesito una póliza de cumplimiento. ¿Qué documentos les envío?",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Confirmar con el asesor la lista de documentos, la antigüedad aceptada del certificado de Cámara de Comercio y la periodicidad de renovación del cupo en las aseguradoras con las que trabaja VanTrust.",
      "Confirmar con el asesor cómo estudian las aseguradoras a los consorcios y uniones temporales.",
      `Verificar con el asesor: Código de Comercio, art. 1099 (subrogación en seguros de cumplimiento) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.3.2.7 (no pueden exigir amparos no pedidos por la entidad) — ${FUENTE_D1082}`,
    ],
  },

  // ───────────── 3. Cumplimiento vs. responsabilidad civil ─────────────
  {
    slug: "poliza-de-cumplimiento-vs-responsabilidad-civil",
    titulo: "¿Qué diferencia hay entre la póliza de cumplimiento y la de responsabilidad civil?",
    title: "Póliza de cumplimiento y responsabilidad civil: diferencias",
    description:
      "La póliza de cumplimiento y la de responsabilidad civil protegen cosas distintas. Mira a quién protege cada una y por qué un contrato de obra pide las dos.",
    respuesta:
      "La póliza de cumplimiento y la de responsabilidad civil cubren riesgos distintos: la de cumplimiento protege al contratante si el contratista no cumple el contrato, y la de responsabilidad civil extracontractual protege al contratista frente a reclamos de terceros por daños que cause mientras trabaja. Por eso los contratos de obra en Colombia suelen exigir las dos.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la grieta en la casa del vecino",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Hernán tiene una empresa de obras civiles en Puerto Colombia. Un conjunto residencial de Barranquilla lo contrató para construir un tanque de agua y le pidió póliza de cumplimiento. Hernán la sacó y pensó que con eso estaba cubierto para todo.",
          },
          {
            tipo: "p",
            texto:
              "Durante la excavación, la vibración agrietó la pared de una casa vecina, que no hacía parte del conjunto. El dueño le reclamó a Hernán por la reparación. Hernán llamó a la aseguradora y le explicaron que la póliza de cumplimiento protege al conjunto si él no termina o hace mal el tanque, pero no cubre los daños a un tercero. Para eso necesitaba una póliza de responsabilidad civil extracontractual, que no había tomado. Terminó pagando la reparación de su bolsillo.",
          },
          {
            tipo: "p",
            texto:
              "En la siguiente obra tomó las dos pólizas desde el principio. La lección: cumplir el contrato y no hacerle daño a nadie son dos riesgos distintos, y cada uno tiene su póliza.",
          },
        ],
      },
      {
        titulo: "¿En qué se diferencian la póliza de cumplimiento y la de responsabilidad civil?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Se diferencian en qué riesgo cubren, a quién le pagan y si la aseguradora puede cobrarte después. La tabla lo resume:",
          },
          {
            tipo: "tabla",
            caption: "Póliza de cumplimiento vs. póliza de responsabilidad civil extracontractual",
            columnas: ["Tema", "Cumplimiento", "Responsabilidad civil extracontractual"],
            filas: [
              ["Qué cubre", "El incumplimiento de las obligaciones del contrato.", "Daños o lesiones que el contratista causa a terceros."],
              ["A quién protege", "A la entidad o empresa contratante.", "Al patrimonio del contratista y, en contratos estatales, a la entidad; indemniza al tercero afectado."],
              ["Quién la toma", "El contratista.", "El contratista."],
              ["Cuándo se usa", "Cuando el contratista no cumple, cumple tarde o mal.", "Cuando un tercero reclama por un daño."],
              ["Recobro al contratista", "Sí: la aseguradora puede cobrarle lo que pagó.", "No, porque es el seguro del propio contratista, salvo casos como el dolo."],
              ["Contragarantía", "Suele pedirse un pagaré.", "Normalmente no se pide."],
            ],
          },
        ],
      },
      {
        titulo: "¿Por qué la póliza de cumplimiento se parece más a una garantía?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza de cumplimiento funciona como una garantía porque, si la aseguradora paga, tiene derecho a recobrarle al contratista. El Código de Comercio (artículo 1099) dice que la limitación de la subrogación no aplica en los seguros de cumplimiento.",
          },
          {
            tipo: "p",
            texto:
              "La subrogación es el derecho de la aseguradora a cobrarle a otro lo que ella pagó. En cumplimiento, ese otro eres tú, el contratista. En cambio, el seguro de responsabilidad, según el artículo 1127 del Código de Comercio, impone a la aseguradora la obligación de indemnizar los perjuicios que cause el asegurado por la responsabilidad en que incurra según la ley. Es tu seguro: paga para que tú no pagues.",
          },
        ],
      },
      {
        titulo: "¿Cuándo te piden las dos pólizas?",
        bloques: [
          {
            tipo: "p",
            texto:
              "En los contratos estatales de obra te piden las dos siempre. El Decreto 1082 de 2015 (artículo 2.2.1.2.3.1.8) obliga a la entidad a exigir póliza de responsabilidad civil extracontractual en los contratos de obra y en otros cuando el riesgo lo justifique.",
          },
          {
            tipo: "p",
            texto:
              "El mismo decreto (artículo 2.2.1.2.3.1.5) dice que este riesgo solo puede ampararse con un contrato de seguro, no con garantía bancaria. También fija valores mínimos según el tamaño del contrato, expresados en salarios mínimos mensuales vigentes (artículo 2.2.1.2.3.1.17), y pide que la póliza esté vigente durante la ejecución del contrato.",
          },
          {
            tipo: "tabla",
            caption: "Valor asegurado mínimo de la póliza de RC extracontractual en contratos estatales (Decreto 1082 de 2015)",
            columnas: ["Valor del contrato", "Valor asegurado mínimo"],
            filas: [
              ["Hasta 1.500 SMMLV", "200 SMMLV"],
              ["Más de 1.500 y hasta 2.500 SMMLV", "300 SMMLV"],
              ["Más de 2.500 y hasta 5.000 SMMLV", "400 SMMLV"],
              ["Más de 5.000 y hasta 10.000 SMMLV", "500 SMMLV"],
              ["Más de 10.000 SMMLV", "5 % del contrato, con un máximo de 75.000 SMMLV"],
            ],
          },
          {
            tipo: "p",
            texto:
              "En contratos privados, cada contratante decide si pide una, la otra o las dos. Mantenimiento, montajes, vigilancia y obras en zonas con vecinos o tráfico, como las de Barranquilla y su área metropolitana, suelen pedir las dos.",
          },
        ],
      },
      {
        titulo: "¿Cómo saber si estás bien cubierto?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Estás bien cubierto si cada riesgo del contrato tiene su póliza y cada póliza coincide con lo que pide el contrato. Revisa esto antes de empezar:",
          },
          {
            tipo: "pasos",
            items: [
              "Lee la cláusula de garantías y separa lo que es cumplimiento de lo que es responsabilidad civil.",
              "Verifica que la póliza de RC incluya a la entidad o empresa contratante como asegurada adicional cuando el contrato lo pide.",
              "Si vas a subcontratar, revisa si la póliza debe cubrir a los subcontratistas; el Decreto 1082 lo exige en los contratos estatales.",
              "Confirma vigencias: la RC durante la ejecución y los amparos de cumplimiento según el pliego.",
              "Si te reclama un tercero, avisa a la aseguradora de inmediato y no reconozcas responsabilidad sin hablar con ella.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Para conocer a fondo la póliza de daños a terceros de un negocio, lee ¿Qué cubre la póliza de responsabilidad civil extracontractual de un negocio?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo tener las dos pólizas con la misma aseguradora?",
        respuesta:
          "Sí, y suele facilitar el trámite porque la aseguradora ya conoce tu empresa y tus contratos. Aun así, conviene comparar: una aseguradora puede tener buen cupo de cumplimiento para ti y otra mejores condiciones en responsabilidad civil.",
      },
      {
        pregunta: "¿La póliza de cumplimiento paga si un trabajador mío se accidenta?",
        respuesta:
          "No. El accidente de un trabajador lo atiende primero el sistema de riesgos laborales. Si el trabajador reclama perjuicios adicionales al empleador, eso se cubre con el amparo de responsabilidad civil patronal, cuando la póliza de RC lo incluye.",
      },
      {
        pregunta: "¿Qué pasa si un contratista sin póliza de RC daña algo de un tercero?",
        respuesta:
          "Responde con su propio patrimonio. El tercero puede reclamarle directamente y, según el caso, también al contratante. Por eso muchas empresas no dejan entrar a la obra a un contratista que no presente su póliza de RC vigente.",
      },
      {
        pregunta: "¿La póliza de responsabilidad civil cubre los daños a la obra que estoy construyendo?",
        respuesta:
          "Por lo general no. La RC extracontractual cubre daños a terceros. Los daños a la propia obra en construcción suelen cubrirse con un seguro de todo riesgo construcción, que es una póliza distinta.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de cumplimiento y responsabilidad civil y necesito las dos pólizas para un contrato.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1099 (subrogación en cumplimiento) y 1127 (definición del seguro de responsabilidad) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.5 (RC solo con seguro), 2.2.1.2.3.1.8 (RC obligatoria en obra y subcontratistas) y 2.2.1.2.3.1.17 (valores mínimos y vigencia) — ${FUENTE_D1082}`,
      "Confirmar con el asesor si las pólizas de RC que maneja VanTrust incluyen RC patronal y cómo tratan a los subcontratistas.",
    ],
  },

  // ───────────── 4. Seriedad de la oferta ─────────────
  {
    slug: "garantia-de-seriedad-de-la-oferta",
    titulo: "¿Qué es la garantía de seriedad de la oferta y cuánto debe valer?",
    title: "Garantía de seriedad de la oferta: valor y vigencia",
    description:
      "La garantía de seriedad de la oferta respalda tu propuesta en una licitación. Mira cuánto debe valer, cuánto dura y qué pasa si no firmas. Asesórate.",
    respuesta:
      "La garantía de seriedad de la oferta es la póliza que respalda que mantendrás tu propuesta en un proceso de contratación y firmarás el contrato si te lo adjudican. Según el Decreto 1082 de 2015, debe valer por lo menos el 10 % del valor de la oferta y estar vigente desde que la presentas hasta que la entidad aprueba la garantía de cumplimiento.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el suministro que ya no parecía buen negocio",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Mauricio tiene una distribuidora de materiales eléctricos en Santa Marta. Se presentó a un proceso de una entidad del Magdalena para suministrar luminarias y adjuntó su garantía de seriedad de la oferta. Entre el cierre y la adjudicación pasaron varias semanas, y en ese tiempo su proveedor le subió los precios.",
          },
          {
            tipo: "p",
            texto:
              "Cuando le adjudicaron, Mauricio pensó en no firmar: con los nuevos costos, el contrato le dejaba muy poco margen. Antes de decidir llamó a su asesor, que le explicó lo que le costaría retirarse sin justa causa: la entidad podía quedarse con el valor de la garantía de seriedad como sanción, la aseguradora pagaría ese valor y después se lo cobraría a él, y además quedaría inhabilitado para contratar con el Estado por cinco años. Mauricio negoció con otro proveedor, firmó y cumplió el contrato con un margen menor del que esperaba.",
          },
          {
            tipo: "p",
            texto:
              "La lección: la garantía de seriedad no es un papel para pasar el filtro. Es un compromiso con consecuencias. Antes de ofertar, amarra tus costos por el tiempo que puede tomar la adjudicación.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre la garantía de seriedad de la oferta?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La garantía de seriedad de la oferta cubre la sanción que se causa cuando el proponente incumple su oferta. El Decreto 1082 de 2015 (artículo 2.2.1.2.3.1.6) enumera cuatro eventos:",
          },
          {
            tipo: "tabla",
            caption: "Eventos que cubre la garantía de seriedad de la oferta",
            columnas: ["Evento", "En palabras simples"],
            filas: [
              ["No ampliar la vigencia de la garantía cuando se prorroga el plazo de adjudicación o de firma, si la prórroga es inferior a tres meses", "La entidad corrió el cronograma y no extendiste la póliza."],
              ["Retirar la oferta después de vencido el plazo para presentar ofertas", "Te echaste para atrás después del cierre."],
              ["No suscribir el contrato sin justa causa", "Te adjudicaron y no firmaste."],
              ["No otorgar la garantía de cumplimiento del contrato", "Firmaste, pero no entregaste la póliza de cumplimiento."],
            ],
          },
          {
            tipo: "p",
            texto:
              "La Ley 1150 de 2007 (artículo 7) es la que obliga a los proponentes a prestar esta garantía. La póliza de seguro es la forma más usada, pero también se aceptan garantía bancaria y patrimonio autónomo.",
          },
        ],
      },
      {
        titulo: "¿Cuánto debe valer y cuánto dura la garantía de seriedad?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Por regla general, la garantía de seriedad debe valer por lo menos el 10 % del valor de la oferta y estar vigente desde la presentación de la oferta hasta la aprobación de la garantía de cumplimiento. Así lo dice el artículo 2.2.1.2.3.1.9 del Decreto 1082 de 2015.",
          },
          {
            tipo: "tabla",
            caption: "Valor mínimo de la garantía de seriedad según el Decreto 1082 de 2015",
            columnas: ["Tipo de proceso o tamaño", "Valor mínimo"],
            filas: [
              ["Regla general", "10 % del valor de la oferta."],
              ["Subasta inversa y concurso de méritos", "10 % del presupuesto oficial estimado del proceso."],
              ["Acuerdo Marco de Precios", "1.000 SMMLV."],
              ["Ofertas de más de 1.000.000 y hasta 5.000.000 SMMLV", "La entidad puede aceptar al menos el 2,5 %."],
              ["Ofertas de más de 5.000.000 y hasta 10.000.000 SMMLV", "La entidad puede aceptar al menos el 1 %."],
              ["Ofertas de más de 10.000.000 SMMLV", "La entidad puede aceptar al menos el 0,5 %."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Los tramos reducidos aplican a contratos muy grandes; para la mayoría de pymes rige el 10 %. El pliego puede fijar una vigencia en días o meses: cumple lo que diga, y si la entidad prorroga el cronograma, amplía la póliza a tiempo.",
          },
        ],
      },
      {
        titulo: "¿Qué pasa si no firmas el contrato después de la adjudicación?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Si no firmas sin justa causa, la entidad se queda con el valor de la garantía como sanción y puedes quedar inhabilitado para contratar con el Estado. Son tres consecuencias que se suman:",
          },
          {
            tipo: "lista",
            items: [
              "Sanción: según la Ley 80 de 1993 (artículo 30, numeral 12), el valor de la garantía queda a favor de la entidad, sin perjuicio de que reclame los perjuicios que esa suma no cubra. El Decreto 1082 de 2015 (artículo 2.2.1.2.3.2.8) dice que la aseguradora responde por el total del valor asegurado.",
              "Recobro: la aseguradora que paga puede cobrarte lo pagado, porque en los seguros de cumplimiento no aplica la limitación de subrogación del artículo 1099 del Código de Comercio.",
              "Inhabilidad: la Ley 80 de 1993 (artículo 8, literal e) inhabilita por cinco años a quien sin justa causa se abstiene de suscribir el contrato estatal adjudicado.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Además, la entidad puede adjudicar el contrato, dentro de los 15 días siguientes, al proponente que quedó en segundo lugar, si su oferta es igual de favorable. Qué cuenta como justa causa depende de cada caso; si crees tenerla, documéntala y consúltalo con un abogado antes de decidir.",
          },
        ],
      },
      {
        titulo: "¿Cómo tramitar la garantía de seriedad sin errores?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La clave es tramitarla con anticipación y revisarla contra el pliego antes de radicar. La Ley 1150 de 2007 (artículo 5, parágrafo 3, adicionado por la Ley 1882 de 2018) dice que no entregar la garantía de seriedad junto con la propuesta no es subsanable y es causal de rechazo.",
          },
          {
            tipo: "pasos",
            items: [
              "Lee en el pliego el valor, la vigencia y el beneficiario exactos de la garantía.",
              "Pide la póliza con días de margen: si no tienes cupo, la aseguradora primero te estudia.",
              "Verifica que el tomador sea exactamente quien oferta: la empresa, o el consorcio o unión temporal con todos sus integrantes.",
              "Revisa que el número del proceso y el objeto coincidan con el pliego.",
              "Adjunta la póliza y su soporte a la oferta. Sin ella, la propuesta se rechaza.",
              "Si la entidad prorroga el cronograma, pide la ampliación de la vigencia antes de que venza.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Para ver el resto del proceso, lee ¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación? y, si vas a preparar documentos por primera vez, ¿Cuáles son los requisitos para sacar una póliza de cumplimiento?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Me devuelven la garantía de seriedad si no gano la licitación?",
        respuesta:
          "No hay nada que devolver: la póliza simplemente no se afecta y vence. Lo que pagaste fue la prima por el respaldo durante el proceso. Si no ganas, la garantía no genera ninguna obligación adicional para ti.",
      },
      {
        pregunta: "¿Puedo corregir la garantía de seriedad si tiene un error?",
        respuesta:
          "Depende del error. No entregarla es causal de rechazo y no se subsana, pero algunos errores en una póliza que sí entregaste pueden aclararse si el pliego y la entidad lo permiten. Lo seguro es revisarla bien antes de radicar.",
      },
      {
        pregunta: "¿Los procesos de mínima cuantía piden garantía de seriedad?",
        respuesta:
          "No necesariamente. En la mínima cuantía, el Decreto 1082 de 2015 deja a la entidad libre de exigir o no garantías. Revisa la invitación del proceso: allí dice si la piden y en qué condiciones.",
      },
      {
        pregunta: "¿La garantía de seriedad se pide en contratos entre particulares?",
        respuesta:
          "Puede pedirse si la empresa contratante lo exige en su invitación, pero no se rige por el Decreto 1082. En ese caso, el valor, la vigencia y los eventos cubiertos los define la empresa en su proceso de selección.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de la garantía de seriedad de la oferta y necesito una para presentarme a un proceso.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.6 (eventos cubiertos), 2.2.1.2.3.1.9 (valor y vigencia) y 2.2.1.2.3.2.8 (la aseguradora responde por el total a título de sanción) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.1.5.5 (mínima cuantía: libre de exigir garantías) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Ley 1150 de 2007, art. 7 (obligación de garantía de seriedad) y art. 5, parágrafo 3, adicionado por la Ley 1882 de 2018 (no entregarla no es subsanable) — ${FUENTE_L1150}`,
      `Verificar con el asesor: Ley 80 de 1993, art. 30, num. 12 (sanción y adjudicación al segundo en 15 días) y art. 8, lit. e (inhabilidad de cinco años) — ${FUENTE_L80}`,
      `Verificar con el asesor: Código de Comercio, art. 1099 (subrogación en cumplimiento) — ${FUENTE_CCO}`,
    ],
  },

  // ───────────── 5. Buen manejo del anticipo ─────────────
  {
    slug: "poliza-buen-manejo-del-anticipo",
    titulo: "¿Qué es la póliza de buen manejo del anticipo y cómo funciona?",
    title: "Póliza de buen manejo del anticipo: cómo funciona",
    description:
      "La póliza de buen manejo del anticipo protege el dinero que te adelantan en un contrato. Mira cuánto debe valer y en qué se diferencia del pago anticipado.",
    respuesta:
      "La póliza de buen manejo del anticipo es el amparo que protege a la entidad contratante si el contratista no invierte el anticipo, lo usa mal o se apropia de él. En la contratación estatal debe cubrir el 100 % del anticipo, según el Decreto 1082 de 2015, y estar vigente hasta la liquidación del contrato o hasta que el anticipo se amortice.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el anticipo que tapó otro hueco",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Jaime tiene una empresa de obras en Sabanalarga. Firmó con un municipio del Atlántico un contrato para mejorar una vía terciaria y recibió un anticipo. Supongamos que fue de 100 millones de pesos, una cifra redonda solo para el ejemplo. Al mismo tiempo, en otra obra privada, un cliente le debía varias cuentas y Jaime tenía nómina y proveedores atrasados.",
          },
          {
            tipo: "p",
            texto:
              "Usó una parte del anticipo para ponerse al día en la otra obra, convencido de que lo repondría en pocas semanas. El cliente privado no pagó, la vía no avanzó al ritmo del plan de inversión y el interventor reportó que el dinero no estaba en materiales ni en maquinaria de esa obra. La entidad inició el proceso para declarar el siniestro del amparo de anticipo. La aseguradora respondió por la parte mal invertida y luego le cobró a Jaime con base en el pagaré que había firmado.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el anticipo no es plata de la empresa para resolver la caja. Es dinero del contrato y solo puede ir a ese contrato, de acuerdo con el plan de inversión.",
          },
        ],
      },
      {
        titulo: "¿Qué diferencia hay entre anticipo y pago anticipado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El anticipo es un adelanto que sigue siendo dinero de la entidad y que el contratista debe invertir en el contrato. El pago anticipado es parte del precio que se paga antes y que pasa a ser del contratista. Por eso cada uno tiene su propio amparo.",
          },
          {
            tipo: "tabla",
            caption: "Anticipo vs. pago anticipado en un contrato estatal",
            columnas: ["Tema", "Anticipo", "Pago anticipado"],
            filas: [
              ["Qué es", "Un adelanto para financiar la ejecución del contrato.", "Un pago por adelantado de parte del precio."],
              ["De quién es el dinero", "Sigue siendo de la entidad hasta que se amortiza.", "Es del contratista desde que lo recibe."],
              ["Cómo se usa", "Solo en el contrato, según el plan de inversión.", "El contratista lo administra, pero debe devolverlo si no cumple."],
              ["Cómo se descuenta", "Se amortiza: se descuenta de cada pago parcial.", "Se cruza contra la entrega de bienes, obras o servicios."],
              ["Amparo que lo protege", "Buen manejo y correcta inversión del anticipo.", "Devolución del pago anticipado."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Amortizar el anticipo es descontar de cada acta o factura una parte del anticipo hasta completarlo. La Ley 80 de 1993 (artículo 40, parágrafo) permite pactar anticipos y pagos anticipados en los contratos estatales, pero su monto no puede pasar del 50 % del valor del contrato.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre la póliza de buen manejo del anticipo y cuánto debe valer?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El amparo de buen manejo y correcta inversión del anticipo cubre tres hechos, según el artículo 2.2.1.2.3.1.7 del Decreto 1082 de 2015: que el anticipo no se invierta, que se use indebidamente o que alguien se apropie de él.",
          },
          {
            tipo: "tabla",
            caption: "Suficiencia de los amparos de anticipo y pago anticipado (Decreto 1082 de 2015)",
            columnas: ["Amparo", "Valor", "Vigencia"],
            filas: [
              ["Buen manejo y correcta inversión del anticipo (art. 2.2.1.2.3.1.10)", "100 % del anticipo, en dinero o en especie.", "Hasta la liquidación del contrato o la amortización del anticipo, según determine la entidad."],
              ["Devolución del pago anticipado (art. 2.2.1.2.3.1.11)", "100 % del monto pagado por adelantado.", "Hasta la liquidación o hasta que la entidad verifique las entregas asociadas al pago."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Como el valor asegurado es igual al anticipo completo, este amparo pesa mucho en el cupo que te asigna la aseguradora. Tenlo en cuenta si tienes varios contratos al tiempo. Para entender de qué depende el precio, revisa ¿Cuánto cuesta una póliza de cumplimiento y de qué depende el precio?",
          },
        ],
      },
      {
        titulo: "¿Cuándo debe manejarse el anticipo en una fiducia?",
        bloques: [
          {
            tipo: "p",
            texto:
              "En los contratos estatales de obra, concesión, salud o los que se hacen por licitación pública, el anticipo debe manejarse en una fiducia o patrimonio autónomo irrevocable, salvo que el contrato sea de menor o mínima cuantía. Lo dice la Ley 1474 de 2011, artículo 91.",
          },
          {
            tipo: "p",
            texto:
              "La fiducia es un contrato con una sociedad fiduciaria que administra el dinero y solo lo libera para pagos del contrato. La comisión la paga el contratista. La fiducia no reemplaza la póliza: la entidad sigue exigiendo el amparo de buen manejo del anticipo, y la fiducia ayuda a demostrar que el dinero se usó bien.",
          },
        ],
      },
      {
        titulo: "¿Cuáles son los errores más comunes al invertir el anticipo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El error más común es mezclar el anticipo con la caja de la empresa. Estos son los que más problemas causan con la entidad, el interventor y la aseguradora:",
          },
          {
            tipo: "lista",
            items: [
              "Usarlo para pagar deudas, nómina o proveedores de otra obra.",
              "Gastarlo en conceptos que no están en el plan de inversión aprobado.",
              "No guardar facturas, comprobantes y extractos que muestren a dónde fue cada peso.",
              "Comprar materiales o equipos que no llegan a la obra o quedan a nombre de otra persona.",
              "Dejar la obra quieta con el anticipo girado: la falta de inversión también es un siniestro.",
              "No ampliar la póliza cuando el contrato se prorroga y el anticipo aún no se ha amortizado.",
            ],
          },
          {
            tipo: "pasos",
            items: [
              "Pide que el plan de inversión del anticipo quede aprobado por escrito antes de recibir el dinero.",
              "Maneja el anticipo en una cuenta o fiducia exclusiva para el contrato.",
              "Paga a proveedores directamente desde esa cuenta y archiva los soportes.",
              "Reporta al interventor o supervisor cómo vas invirtiendo y pide que lo deje en las actas.",
              "Si el contrato cambia, informa a tu asesor para ajustar la póliza a tiempo.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué pasa si la entidad declara el siniestro del anticipo?",
        respuesta:
          "La entidad expide un acto administrativo que declara el siniestro y lo notifica a la aseguradora, como dice la Ley 1150 de 2007. La aseguradora paga hasta el valor del amparo por la parte mal invertida y después puede cobrarte lo que pagó.",
      },
      {
        pregunta: "¿Puedo usar el anticipo para comprar maquinaria?",
        respuesta:
          "Solo si la maquinaria está en el plan de inversión aprobado y se usa en ese contrato. Comprar equipos para la empresa en general, aunque los uses después en la obra, puede considerarse uso indebido. Revísalo con el supervisor antes de comprar.",
      },
      {
        pregunta: "¿El amparo de anticipo se reduce a medida que lo amortizo?",
        respuesta:
          "El decreto fija el valor en el 100 % del anticipo. Algunas pólizas permiten ajustar el valor a medida que se amortiza, pero depende de lo que acepte la entidad y del clausulado. Pregúntalo antes de pedir la modificación.",
      },
      {
        pregunta: "¿En un contrato privado también piden póliza de anticipo?",
        respuesta:
          "Sí, es común cuando una empresa entrega un adelanto a un proveedor o contratista. En ese caso el valor y la vigencia los pactan las partes en el contrato, porque el Decreto 1082 de 2015 solo aplica a la contratación estatal.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía del buen manejo del anticipo y necesito la póliza para un contrato con anticipo.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.7 (qué cubren los amparos de anticipo y pago anticipado), 2.2.1.2.3.1.10 (anticipo: 100 % y vigencia) y 2.2.1.2.3.1.11 (pago anticipado: 100 % y vigencia) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Ley 80 de 1993, art. 40, parágrafo (anticipos y pagos anticipados hasta el 50 % del contrato) — ${FUENTE_L80}`,
      `Verificar con el asesor: Ley 1474 de 2011, art. 91 (fiducia o patrimonio autónomo para el anticipo) — ${FUENTE_L1474}`,
      `Verificar con el asesor: Ley 1150 de 2007, art. 7 (el siniestro se comunica con la notificación del acto administrativo) — ${FUENTE_L1150}`,
      "La diferencia conceptual entre anticipo y pago anticipado se explica en términos generales (es doctrina y jurisprudencia, no un artículo concreto). Confirmar con el asesor o un abogado.",
      "Confirmar con el asesor si las aseguradoras con las que trabaja VanTrust permiten reducir el valor del amparo de anticipo a medida que se amortiza.",
    ],
  },

  // ───────────── 6. Estabilidad de la obra ─────────────
  {
    slug: "poliza-de-estabilidad-de-obra",
    titulo: "¿Qué es la póliza de estabilidad de obra y cuántos años dura?",
    title: "Póliza de estabilidad de obra: qué cubre y cuánto dura",
    description:
      "La póliza de estabilidad de obra cubre daños en la obra después de entregarla. Mira cuántos años dura según el Decreto 1082 y qué pasa si aparecen fallas.",
    respuesta:
      "La póliza de estabilidad de obra es el amparo que protege a la entidad contratante si la obra entregada a satisfacción sufre daños o deterioro imputables al contratista. En la contratación estatal debe durar por lo menos cinco años desde el recibo a satisfacción, según el Decreto 1082 de 2015; solo con justificación técnica puede ser menor, y nunca inferior a un año.",
    secciones: [
      {
        titulo: "Caso ilustrativo: las grietas de la cancha después del invierno",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Lucía es socia de una constructora de Barranquilla. Su empresa construyó una cancha múltiple con cubierta para un municipio de la Costa y la entregó con acta de recibo a satisfacción. Como lo pedía el pliego, tomó el amparo de estabilidad y calidad de la obra por cinco años.",
          },
          {
            tipo: "p",
            texto:
              "Dos temporadas de lluvias después, la placa empezó a agrietarse y una parte de la cubierta se desprendió. La entidad le pidió a la constructora reparar y le avisó que, si no lo hacía, iniciaría el proceso para declarar el siniestro. Lucía revisó con su equipo la bitácora de obra, los ensayos de concreto y el manual de mantenimiento que había entregado. Las pruebas mostraron que la cubierta había fallado por falta del mantenimiento que le correspondía a la entidad, pero las grietas de la placa sí venían de un problema en la compactación del terreno. La constructora reparó la placa por su cuenta y discutió, con soportes, la parte de la cubierta.",
          },
          {
            tipo: "p",
            texto:
              "La lección: la estabilidad no termina con el acta de recibo. Guarda los soportes técnicos de la obra durante toda la vigencia del amparo y entrega por escrito las instrucciones de mantenimiento.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre la póliza de estabilidad de obra?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza de estabilidad de obra cubre los perjuicios que sufre la entidad por cualquier tipo de daño o deterioro, imputable al contratista, en la obra entregada a satisfacción. Así la define el Decreto 1082 de 2015, artículo 2.2.1.2.3.1.7, numeral 5.",
          },
          {
            tipo: "p",
            texto:
              "Imputable al contratista quiere decir que el daño viene de cómo se diseñó, se construyó o de los materiales que puso el contratista. Por eso este amparo no cubre todo lo que se dañe en la obra. El mismo decreto (artículo 2.2.1.2.3.2.3) solo admite estas exclusiones en las pólizas a favor de entidades estatales:",
          },
          {
            tipo: "tabla",
            caption: "Qué suele cubrir y qué no el amparo de estabilidad y calidad de la obra",
            columnas: ["Situación", "¿Lo cubre?"],
            filas: [
              ["Fisuras estructurales por mala compactación o mal diseño del contratista", "Sí, si es imputable al contratista."],
              ["Hundimientos, filtraciones o desprendimientos por defectos de construcción o materiales", "Sí, si es imputable al contratista."],
              ["Daños por fuerza mayor, caso fortuito, hecho de un tercero o culpa exclusiva de la víctima", "No: es una exclusión admitida."],
              ["Daños por uso indebido o falta del mantenimiento preventivo que le tocaba a la entidad", "No: es una exclusión admitida."],
              ["Deterioro normal por el paso del tiempo", "No: es una exclusión admitida."],
              ["Daños a bienes de la entidad que no estaban destinados al contrato", "No: es una exclusión admitida."],
            ],
          },
        ],
      },
      {
        titulo: "¿Cuántos años dura la póliza de estabilidad de obra?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza de estabilidad de obra dura por lo menos cinco años contados desde que la entidad recibe la obra a satisfacción. Lo dice el artículo 2.2.1.2.3.1.14 del Decreto 1082 de 2015, modificado por el Decreto 399 de 2021.",
          },
          {
            tipo: "p",
            texto:
              "La entidad puede aceptar una vigencia menor, de mínimo un año, solo con la justificación técnica de un experto en la materia del contrato, que debe constar en los documentos del proceso. Esa justificación considera el tipo de actividades, la experticia técnica requerida y el alcance físico de las obras, no solo la cuantía. El valor asegurado no tiene un porcentaje fijo en el decreto: la entidad lo define en los documentos del proceso según el objeto, la cuantía y la naturaleza del contrato.",
          },
          {
            tipo: "tabla",
            caption: "Cuándo empieza y cuánto dura el amparo de estabilidad",
            columnas: ["Punto", "Regla del Decreto 1082 de 2015"],
            filas: [
              ["Desde cuándo cuenta", "Desde la fecha en que la entidad recibe a satisfacción la obra."],
              ["Vigencia mínima general", "Cinco años."],
              ["Vigencia reducida", "Menos de cinco años, con justificación técnica de un experto, y nunca menos de un año."],
              ["Valor asegurado", "Lo fija la entidad en los documentos del proceso."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Como el amparo se queda vigente años después de terminar la obra, influye en el precio de la póliza y en tu cupo. Lo explicamos en ¿Cuánto cuesta una póliza de cumplimiento y de qué depende el precio?",
          },
        ],
      },
      {
        titulo: "¿Qué pasa si aparecen daños en la obra después de entregarla?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Si aparecen daños durante la vigencia, la entidad normalmente le pide primero al contratista que repare. Si no lo hace o discute la responsabilidad, la entidad puede declarar el siniestro mediante acto administrativo y notificarlo a la aseguradora, como prevé la Ley 1150 de 2007 (artículo 7).",
          },
          {
            tipo: "pasos",
            items: [
              "La entidad detecta el daño y lo comunica al contratista y, según el caso, a la aseguradora.",
              "El contratista revisa el daño con soportes técnicos: bitácora, planos récord, ensayos y manual de mantenimiento.",
              "Si el daño es imputable a la obra, lo más rápido suele ser repararlo directamente.",
              "Si hay desacuerdo, el contratista y la aseguradora presentan sus argumentos dentro del procedimiento que adelante la entidad.",
              "Si la entidad declara el siniestro, la aseguradora paga hasta el valor del amparo y después puede recobrarle al contratista.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Ese recobro existe porque en los seguros de cumplimiento no aplica la limitación de subrogación del artículo 1099 del Código de Comercio. Si una reclamación se complica, también te puede servir ¿Qué hacer si la aseguradora no quiere pagar tu reclamación?",
          },
        ],
      },
      {
        titulo: "¿Cómo protegerte como contratista durante esos años?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La mejor protección es la prueba técnica. En la Costa, con lluvias fuertes, arroyos, calor y salinidad cerca del mar, muchos daños aparecen después de una o dos temporadas, y la discusión será si vienen de la construcción o del uso y el mantenimiento.",
          },
          {
            tipo: "lista",
            items: [
              "Guarda la bitácora, los ensayos de laboratorio y los planos récord durante toda la vigencia.",
              "Entrega a la entidad, con constancia de recibo, un manual de uso y mantenimiento.",
              "Deja en el acta de recibo cualquier observación o pendiente.",
              "Exige a tus subcontratistas y proveedores sus propias garantías de calidad.",
              "Lleva un control de las vigencias de estabilidad de todas tus obras: consumen cupo hasta que vencen.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Para ver cómo encaja este amparo con los demás, lee ¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuándo se toma el amparo de estabilidad de la obra?",
        respuesta:
          "Normalmente se incluye en la garantía de cumplimiento desde el inicio o se agrega al momento del recibo de la obra, según lo pida el pliego. Lo importante es que quede vigente desde el acta de recibo a satisfacción y por el tiempo exigido.",
      },
      {
        pregunta: "¿Una casa o un local construido para un particular también lleva póliza de estabilidad?",
        respuesta:
          "Puede llevarla si el contratante la pide en el contrato. Entre particulares no rige el Decreto 1082 de 2015, así que la vigencia y el valor se pactan. Si eres el dueño de la obra, pídela por escrito antes de firmar.",
      },
      {
        pregunta: "¿Puedo negociar que la estabilidad dure menos de cinco años?",
        respuesta:
          "En un contrato estatal no lo negocias tú: la entidad solo puede aceptar menos de cinco años con la justificación técnica de un experto en los documentos del proceso, y nunca menos de un año. En un contrato privado sí se negocia.",
      },
      {
        pregunta: "¿La aseguradora paga si los daños aparecen el sexto año?",
        respuesta:
          "Si el amparo solo estaba vigente por cinco años, los daños que aparezcan después no están cubiertos por esa póliza. Aun así, el contratista puede seguir respondiendo por la ley según el caso, así que conviene consultar con un abogado.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía de estabilidad de obra y necesito la póliza para una obra que voy a entregar.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.3.1.7, num. 5 (qué cubre la estabilidad) y art. 2.2.1.2.3.1.14, modificado por el Decreto 399 de 2021 (mínimo cinco años desde el recibo; menos con justificación técnica, mínimo un año; valor lo fija la entidad) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Decreto 1082 de 2015, art. 2.2.1.2.3.2.3 (exclusiones admitidas) — ${FUENTE_D1082}`,
      `Verificar con el asesor: Ley 1150 de 2007, art. 7 (siniestro declarado por acto administrativo) — ${FUENTE_L1150}`,
      `Verificar con el asesor: Código de Comercio, art. 1099 (subrogación en cumplimiento) — ${FUENTE_CCO}`,
      "Se quiso citar la responsabilidad del constructor por ruina del edificio en el Código Civil (art. 2060) y no se pudo verificar en la fuente oficial; el asesor o un abogado puede completarlo en la FAQ del sexto año.",
      "Confirmar con el asesor cómo manejan las aseguradoras el momento de expedición del amparo de estabilidad (desde el inicio o al recibo).",
    ],
  },
];
