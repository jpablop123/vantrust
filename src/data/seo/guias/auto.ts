// Guías de auto (todo riesgo y flotas). Ver docs/brief-guias.md.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FUENTE_CCO =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102";
const FUENTE_FASECOLDA_FAQ =
  "https://www.fasecolda.com/ramos/automoviles/preguntas-frecuentes/";
const FUENTE_FASECOLDA_GUIA = "https://www.fasecolda.com/guia-de-valores/";
// Fuentes de las guías 5 a 8.
const FUENTE_CCO_1107 = "https://leyes.co/codigo_de_comercio/1107.htm";
const FUENTE_CCO_ALCALDIA =
  "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=41102";
const FUENTE_LEY_769 =
  "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=5557";
const FUENTE_D673 =
  "https://normograma.com/keralty/compilacion/docs/decreto_0673_2014.htm";
const FUENTE_D673_FP =
  "https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=57097";
const FUENTE_SFC_2002 = "https://www.superfinanciera.gov.co/publicaciones/18801";
const FUENTE_SFC_2023 =
  "https://normograma.com/keralty/compilacion/docs/concepto_superfinanciera_0054877_2023.htm";
const FUENTE_FASECOLDA_RC_OBLIGATORIOS =
  "https://www.fasecolda.com/wp-content/uploads/SEGUROS-OBLIGATORIOS-DE-RESPONSABILIDAD-CIVIL-EN-COLOMBIA-ACTUALIZADO-1.pdf";

export const GUIAS_AUTO: Guia[] = [
  // 1. Qué cubre el todo riesgo
  {
    slug: "que-cubre-seguro-todo-riesgo-carro",
    titulo: "¿Qué cubre un seguro todo riesgo de carro en Colombia?",
    title: "Qué cubre un seguro todo riesgo de carro en Colombia",
    description:
      "Amparos, asistencias y exclusiones del seguro todo riesgo de carro, y cuándo hay pérdida total. Revísalo antes de firmar y resuelve tus dudas por WhatsApp.",
    respuesta:
      "Un seguro todo riesgo de carro cubre, según la póliza, los daños a tu vehículo (pérdida parcial y total), el hurto, la responsabilidad civil por los daños que causes a otras personas y unas asistencias como grúa o conductor elegido. No cubre todo: tiene deducibles, límites y exclusiones, como manejar sin licencia o en estado de embriaguez. Lo que te cubre de verdad está en el clausulado de tu póliza.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el choque en la Circunvalar",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Andrea vive en el norte de Barranquilla y usa su carro para ir al trabajo. Cuando lo compró, pensó en tomar solo lo obligatorio, pero un amigo le recomendó un todo riesgo. Lo tomó sin leer mucho el clausulado.",
          },
          {
            tipo: "p",
            texto:
              "Un viernes en la tarde, en el tráfico de la Circunvalar, se distrajo y golpeó por detrás a una camioneta. Su carro quedó con el frente dañado y la camioneta con el bómper y una luz rotos. Nadie salió herido.",
          },
          {
            tipo: "p",
            texto:
              "Andrea avisó a su aseguradora ese mismo día. La póliza respondió por dos cosas distintas: la reparación de su propio carro, por el amparo de pérdida parcial por daños, descontando el deducible, y los daños de la camioneta, por el amparo de responsabilidad civil extracontractual. Sin el seguro, habría tenido que pagar las dos reparaciones de su bolsillo.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el todo riesgo no es un solo amparo, son varios. Saber cuál responde por qué te ayuda a reclamar bien y a no llevarte sorpresas con el deducible.",
          },
        ],
      },
      {
        titulo: "¿Qué amparos tiene un seguro todo riesgo de carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un todo riesgo suele incluir daños al carro, hurto, responsabilidad civil y asistencias, aunque cada aseguradora arma su producto con nombres distintos. En muchas pólizas encuentras estos amparos:",
          },
          {
            tipo: "lista",
            items: [
              "Pérdida parcial por daños: reparación de tu carro después de un choque o un accidente, cuando el daño no llega al umbral de pérdida total. Aquí aplica el deducible.",
              "Pérdida total por daños: cuando repararlo cuesta tanto que la aseguradora indemniza el valor del carro en lugar de repararlo.",
              "Hurto total y hurto parcial: robo del carro completo o de partes, como espejos, llantas o el radio, según lo que diga la póliza.",
              "Responsabilidad civil extracontractual: los daños que le causes a otras personas, a sus bienes o a sus vehículos, hasta el límite contratado.",
              "Asistencias: grúa, carro taller, conductor elegido, asistencia jurídica y asistencia en el sitio del choque, entre otras, según la póliza.",
              "Gastos de transporte o carro de reemplazo: algunas pólizas te dan un auxilio diario o un vehículo mientras el tuyo está en el taller o después de una pérdida total o un hurto.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El Código de Comercio define el seguro de responsabilidad como el que indemniza los perjuicios que cause el asegurado, y dice que su propósito es resarcir a la víctima (artículo 1127). Por eso la persona afectada también puede reclamar directamente a tu aseguradora (artículo 1133).",
          },
          {
            tipo: "p",
            texto:
              "Si en el choque hay personas heridas, sus gastos médicos los atiende primero el SOAT del vehículo, que es obligatorio. En muchas pólizas, el amparo de responsabilidad civil por lesiones responde por lo que exceda lo que cubre el SOAT.",
          },
        ],
      },
      {
        titulo: "¿Qué no cubre un seguro todo riesgo de carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un todo riesgo no suele cubrir los daños por manejar embriagado o sin licencia, el desgaste o las fallas mecánicas, ni los daños causados a propósito. Esta tabla resume situaciones comunes:",
          },
          {
            tipo: "tabla",
            caption: "Situaciones comunes en un todo riesgo (siempre según la póliza)",
            columnas: ["Situación", "¿Suele estar cubierta?"],
            filas: [
              ["Choque con otro carro, con un poste o un muro", "Sí, por pérdida parcial o total por daños, con deducible."],
              ["Daños que le causas a otro vehículo o a una casa", "Sí, por responsabilidad civil extracontractual, hasta el límite contratado."],
              ["Robo del carro", "Sí, por hurto total, si denuncias y cumples lo que pide la póliza."],
              ["Robo de espejos, llantas o accesorios", "Depende: muchas pólizas lo cubren como hurto parcial; los accesorios no originales deben estar declarados."],
              ["Grúa después de una varada o un choque", "Sí, en las asistencias, con los límites de la póliza."],
              ["Daños por manejar en estado de embriaguez", "No suele cubrirse; es una exclusión común."],
              ["Manejar sin licencia o con una categoría que no corresponde", "No suele cubrirse."],
              ["Desgaste, fallas mecánicas o eléctricas propias del carro", "No; el seguro cubre accidentes, no mantenimiento."],
              ["Usar el carro particular para transporte de pasajeros por pago sin declararlo", "Muchas pólizas lo excluyen si el uso no fue declarado."],
              ["Daños causados a propósito", "No. La ley dice que el dolo no es asegurable."],
            ],
          },
          {
            tipo: "p",
            texto:
              "La última fila tiene base legal: el artículo 1055 del Código de Comercio dice que el dolo, la culpa grave y los actos meramente potestativos del tomador, asegurado o beneficiario son inasegurables. Para el seguro de responsabilidad, el artículo 1127 permite asegurar la culpa grave.",
          },
          {
            tipo: "p",
            texto:
              "En Barranquilla hay que pensar también en los arroyos. Si el carro se daña por agua, la respuesta depende de cómo esté redactada la póliza y de las circunstancias. Pregunta antes de firmar cómo trata tu póliza los daños por inundación o por entrar a una calle con corriente.",
          },
        ],
      },
      {
        titulo: "¿Cuándo un choque se considera pérdida total?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Fasecolda, el gremio de las aseguradoras, explica que un carro queda como salvamento por daños cuando el costo de repararlo después de un accidente supera el 75 por ciento de su valor comercial en el momento del accidente. Ese es el umbral habitual de pérdida total, pero el porcentaje y la forma de calcularlo los fija cada póliza.",
          },
          {
            tipo: "p",
            texto:
              "Según Fasecolda, las indemnizaciones por pérdida total o hurto total se hacen por el valor comercial del vehículo en el momento del siniestro, y su guía de valores es la referencia que se usa en el mercado. Por eso conviene que el valor asegurado de tu póliza esté al día con el valor real de tu carro.",
          },
          {
            tipo: "pasos",
            items: [
              "Avisa a la aseguradora apenas pase el choque. La ley da tres días desde que conoces el siniestro, y la póliza puede ampliar ese plazo, pero no reducirlo (artículo 1075 del Código de Comercio).",
              "Lleva el carro al taller que indique la aseguradora para el peritaje.",
              "La aseguradora compara el costo de la reparación con el valor comercial y decide si es pérdida parcial o total.",
              "Si es pérdida total, entregas los documentos y el carro pasa a la aseguradora como salvamento.",
              "Una vez acreditas tu derecho, la aseguradora tiene un mes para pagar (artículo 1080 del Código de Comercio).",
            ],
          },
        ],
      },
      {
        titulo: "¿Cómo revisar qué cubre tu póliza de todo riesgo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Empieza por la carátula y el capítulo de exclusiones: ahí están los amparos, los deducibles, los límites y lo que no te cubre. Revisa esto:",
          },
          {
            tipo: "lista",
            items: [
              "Busca la carátula: ahí están el valor asegurado, los amparos contratados y los deducibles de cada uno.",
              "Mira el límite de responsabilidad civil. Si es bajo, un choque con un carro de alta gama puede superarlo.",
              "Revisa si tienes carro de reemplazo o gastos de transporte, y por cuántos días.",
              "Lee el capítulo de exclusiones completo. Es corto y es donde están las sorpresas.",
              "Confirma que el uso declarado (particular, comercial) coincide con el uso real del carro.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si algo no te queda claro, pregúntalo antes de que pase algo. En VanTrust trabajamos con varias aseguradoras y un asesor te explica qué cubre cada opción y te acompaña en el trámite si tienes un siniestro.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El todo riesgo cubre si choco y yo tuve la culpa?",
        respuesta:
          "Sí. Los daños a tu carro se cubren por el amparo de daños, con deducible, y los daños al otro vehículo por responsabilidad civil. Las exclusiones, como manejar embriagado, aplican aunque hayas tenido la culpa o no.",
      },
      {
        pregunta: "¿El todo riesgo reemplaza al SOAT?",
        respuesta:
          "No. El SOAT es obligatorio y atiende a las personas lesionadas en un accidente de tránsito. El todo riesgo es voluntario y protege tu carro y tu patrimonio frente a los daños que causes.",
      },
      {
        pregunta: "¿Qué pasa si me roban el carro?",
        respuesta:
          "Denuncia ante la Policía Nacional, ojalá también ante la SIJIN, y avisa de inmediato a la aseguradora. Ten a mano la placa, los números de motor y chasis y tu cédula.",
      },
      {
        pregunta: "¿Puedo escoger el taller?",
        respuesta:
          "Según la póliza. Muchas aseguradoras trabajan con talleres en convenio y algunas permiten llevar el carro a otros talleres con ciertas condiciones. Pregúntalo al cotizar y revisa qué dice tu clausulado antes de tener un choque.",
      },
      {
        pregunta: "¿Qué hago si no estoy de acuerdo con lo que me pagan?",
        respuesta:
          "Puedes acudir al defensor del consumidor financiero de la aseguradora y a la Superintendencia Financiera. Tu asesor te ayuda a revisar la liquidación y a presentar la reclamación.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía de qué cubre el todo riesgo y quiero revisar o cotizar el seguro de mi carro.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: umbral de pérdida total del 75 % del valor comercial (Fasecolda, pregunta «¿Qué es un salvamento?») y valor comercial para indemnizar pérdida total o hurto — ${FUENTE_FASECOLDA_FAQ}`,
      `Verificar con el asesor: Código de Comercio, art. 1127 (seguro de responsabilidad) y art. 1133 (acción directa de la víctima) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, art. 1055 (riesgos inasegurables) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, art. 1075 (aviso del siniestro en tres días) y art. 1080 (pago en el mes siguiente) — ${FUENTE_CCO}`,
      "Verificar con el asesor: que la RC por lesiones opere en exceso del SOAT en las pólizas que ofrece VanTrust.",
      "Verificar con el asesor: cómo tratan las aseguradoras con las que trabaja VanTrust los daños por arroyos e inundación.",
    ],
  },

  // 2. Deducible
  {
    slug: "deducible-seguro-de-carro",
    titulo: "¿Qué es el deducible del seguro de carro y cómo elegirlo?",
    title: "Deducible del seguro de carro: qué es y cómo elegirlo",
    description:
      "Qué es el deducible del seguro de carro, cómo se calcula con un ejemplo y cómo equilibrarlo con la prima. Compara opciones con un asesor por WhatsApp.",
    respuesta:
      "El deducible es la parte de la pérdida que asumes tú cuando reclamas al seguro de tu carro; la aseguradora paga el resto. En muchas pólizas se expresa como un porcentaje de la pérdida con un mínimo en salarios mínimos (SMMLV), y se cobra el valor que resulte mayor. A menor deducible, más cara la póliza, y al revés.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el deducible que nadie miró",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Carlos tiene un taller de ornamentación en Soledad y un carro que usa para todo. Al renovar su seguro escogió la opción más barata sin preguntar por qué costaba menos. La diferencia estaba en el deducible: era más alto.",
          },
          {
            tipo: "p",
            texto:
              "Meses después, saliendo de un parqueadero, rozó una columna y dañó la puerta y el guardabarros. Cuando el taller hizo la cotización, el arreglo costaba menos que el deducible mínimo de su póliza. No tenía nada que reclamar: pagó todo él.",
          },
          {
            tipo: "p",
            texto:
              "En la siguiente renovación, Carlos le pidió a un asesor que le mostrara dos opciones lado a lado: una con deducible más bajo y prima más alta, y otra al revés. Escogió con números en la mano, pensando en cuánto podía pagar de su bolsillo si tenía un choque.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el deducible no es letra pequeña. Es lo que define cuánto pagas tú en cada reclamación, y conviene escogerlo a conciencia.",
          },
        ],
      },
      {
        titulo: "¿Qué es el deducible en un seguro de carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El deducible es la suma que queda a tu cargo cuando hay un siniestro. Si el daño es menor que el deducible, la aseguradora no paga nada. Si es mayor, paga la diferencia, hasta el valor asegurado.",
          },
          {
            tipo: "p",
            texto:
              "Fasecolda explica que la función principal del deducible es hacer al asegurado copartícipe del riesgo, que puede negociarse con la aseguradora y que, a menor deducible, mayor será el valor de la póliza.",
          },
          {
            tipo: "p",
            texto:
              "El Código de Comercio lo regula en el artículo 1103: salvo que la póliza diga otra cosa, no puedes contratar otro seguro para cubrir tu deducible, y si lo haces, el contrato original se termina. Por eso, si te ofrecen una protección para el deducible, revisa que venga dentro de la misma póliza o que esté expresamente permitida.",
          },
          {
            tipo: "p",
            texto:
              "Cada amparo puede tener su propio deducible. Es común que la pérdida parcial por daños tenga uno, el hurto otro y la pérdida total otro distinto. Todos aparecen en la carátula de la póliza.",
          },
        ],
      },
      {
        titulo: "¿Cómo se calcula el deducible del seguro de carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Muchas pólizas fijan el deducible así: un porcentaje del valor de la pérdida, con un mínimo expresado en salarios mínimos mensuales legales vigentes. Se paga el mayor de los dos. Los números de este ejemplo son inventados y redondos, solo para mostrar la cuenta.",
          },
          {
            tipo: "pasos",
            items: [
              "Supongamos que tu póliza dice: deducible del 10 % de la pérdida, mínimo 1 SMMLV, y supongamos que el salario mínimo fuera de 1.000.000 de pesos.",
              "Choque pequeño: supongamos una reparación de 3.000.000. El 10 % sería 300.000, pero el mínimo es 1.000.000. Pagas 1.000.000 y la aseguradora 2.000.000.",
              "Choque mediano: supongamos una reparación de 15.000.000. El 10 % sería 1.500.000, que es mayor que el mínimo. Pagas 1.500.000 y la aseguradora 13.500.000.",
              "Rayón: supongamos una reparación de 800.000. Es menos que el mínimo, así que no hay nada que reclamar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El salario mínimo cambia cada año, así que un deducible en SMMLV sube en pesos con cada renovación. Mira siempre el valor vigente cuando hagas la cuenta.",
          },
        ],
      },
      {
        titulo: "¿Conviene un deducible alto o bajo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un deducible bajo encarece la prima pero te deja reclamar casi cualquier choque; uno alto baja la prima pero te hace pagar más en cada reclamación. Así se comparan:",
          },
          {
            tipo: "tabla",
            caption: "Qué cambia según el deducible que escojas",
            columnas: ["", "Deducible bajo", "Deducible alto"],
            filas: [
              ["Prima (lo que pagas por el seguro)", "Más alta", "Más baja"],
              ["Lo que pagas en cada reclamación", "Menos", "Más"],
              ["Choques pequeños", "Casi siempre puedes reclamar", "Muchas veces los pagas tú"],
              ["Conviene a", "Quien maneja mucho, en ciudad, y no tiene un ahorro para imprevistos", "Quien maneja poco, es cuidadoso y puede pagar un arreglo pequeño"],
            ],
          },
          {
            tipo: "lista",
            items: [
              "Pregúntate cuánto podrías pagar de tu bolsillo mañana si chocas. Ese número es tu límite para el deducible.",
              "Piensa en tu uso. En el tráfico de Barranquilla, con parqueaderos estrechos y mucho roce, los golpes pequeños son más probables que en un carro que sale poco.",
              "Compara la diferencia de prima en un año con la diferencia de deducible. Si ahorras poco en prima y asumes mucho más en deducible, no vale la pena.",
              "No subas el deducible solo para bajar la prima. Bajar el precio quedando mal cubierto sale caro el día del choque.",
            ],
          },
        ],
      },
      {
        titulo: "¿Qué preguntar sobre el deducible antes de contratar?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Pregunta el deducible de cada amparo, cómo se fija el mínimo y cuánto cambia la prima si lo subes o lo bajas. En concreto:",
          },
          {
            tipo: "lista",
            items: [
              "¿Cuál es el deducible de cada amparo: daños parciales, pérdida total y hurto?",
              "¿El mínimo está en SMMLV o en pesos fijos?",
              "¿Hay algún caso en que no se cobre deducible, por ejemplo si el otro conductor tuvo la culpa y su seguro responde?",
              "¿Cuánto cambia la prima si subo o bajo el deducible un escalón?",
            ],
          },
          {
            tipo: "p",
            texto:
              "En VanTrust te mostramos las opciones de varias aseguradoras con sus deducibles a la vista para que compares antes de decidir.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El deducible se paga siempre?",
        respuesta:
          "Se aplica cada vez que reclamas por un amparo que tiene deducible. Si el daño es menor que el deducible, no hay pago de la aseguradora. Algunas pólizas tienen casos sin deducible; revisa las condiciones.",
      },
      {
        pregunta: "¿A quién le pago el deducible?",
        respuesta:
          "Normalmente lo pagas en el taller cuando recoges el carro reparado, y la aseguradora paga el resto. En una pérdida total o un hurto se descuenta de la indemnización.",
      },
      {
        pregunta: "¿Puedo sacar otro seguro para cubrir el deducible?",
        respuesta:
          "Por regla general no. El artículo 1103 del Código de Comercio lo prohíbe salvo que la póliza diga lo contrario, y si lo haces se termina el contrato original.",
      },
      {
        pregunta: "¿Puedo cambiar el deducible a mitad de la vigencia?",
        respuesta:
          "Eso lo decide cada aseguradora. Lo más común es ajustar el deducible en la renovación, cuando se revisan de nuevo la prima y los amparos. Pregunta a tu asesor qué opciones tienes con tu póliza actual.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía del deducible y quiero cotizar mi carro comparando deducibles.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 1103 (deducible y prohibición de asegurarlo aparte) — ${FUENTE_CCO}`,
      `Verificar con el asesor: definición y función del deducible según Fasecolda (pregunta «¿Qué es y para qué sirve el deducible?») — ${FUENTE_FASECOLDA_FAQ}`,
      "Verificar con el asesor: que el esquema porcentaje con mínimo en SMMLV sea el usual en las aseguradoras con las que trabaja VanTrust (el 10 % y 1 SMMLV del ejemplo son ilustrativos).",
      "Verificar con el asesor: casos sin deducible (ej.: cuando responde el seguro del tercero culpable) en las pólizas que ofrece VanTrust.",
    ],
  },

  // 3. Precio en Barranquilla
  {
    slug: "precio-seguro-todo-riesgo-barranquilla",
    titulo: "¿De qué depende el precio del seguro todo riesgo en Barranquilla?",
    title: "Precio del todo riesgo en Barranquilla: de qué depende",
    description:
      "Qué factores mueven el precio del seguro todo riesgo de tu carro en Barranquilla y cómo bajarlo sin quedar mal cubierto. Pide tu cotización por WhatsApp.",
    respuesta:
      "El precio del seguro todo riesgo depende del carro (marca, línea, modelo, año, valor comercial según la guía de Fasecolda, costo de repuestos), de quién lo maneja (edad, historial) y de cómo se usa (particular o comercial, ciudad, kilómetros). También influyen el deducible y los accesorios que declares. No hay un precio único: dos carros iguales pueden pagar primas distintas.",
    secciones: [
      {
        titulo: "Caso ilustrativo: dos vecinos, el mismo carro, dos precios",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Mario y Luis viven en el mismo conjunto en el norte de Barranquilla y compraron el mismo modelo de carro el mismo año. Al cotizar el seguro, a Luis le salió bastante más caro. Pensó que lo estaban cobrando de más.",
          },
          {
            tipo: "p",
            texto:
              "Cuando un asesor revisó las dos cotizaciones, las diferencias estaban claras: Luis tiene un hijo de 19 años que también maneja el carro, había tenido una reclamación el año anterior y escogió un deducible más bajo. Mario maneja solo, no ha reclamado y aceptó un deducible un poco más alto.",
          },
          {
            tipo: "p",
            texto:
              "Luis pensó en declarar que solo manejaba él, para pagar menos. El asesor le explicó que eso podía dejarlo sin cobertura si su hijo chocaba. Al final, Luis comparó varias aseguradoras con los datos reales y ajustó el deducible a lo que podía pagar.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el precio no depende solo del carro. Depende de ti, de cómo lo usas y de lo que escoges. Y declarar mal para pagar menos te puede costar la indemnización.",
          },
        ],
      },
      {
        titulo: "¿Qué factores influyen en el precio del seguro todo riesgo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Influyen el carro, quién lo maneja, cómo se usa, el deducible y los accesorios declarados. Fasecolda explica que el valor del carro no es la única variable para fijar el precio de un seguro, y que para el asegurador la variable más significativa no es el carro sino la persona. Estos son los factores que suelen pesar:",
          },
          {
            tipo: "tabla",
            caption: "Factores que suelen influir en el precio del todo riesgo",
            columnas: ["Factor", "Por qué influye"],
            filas: [
              ["Marca, línea y modelo", "Cada referencia tiene su propio historial de choques y de robos, y su costo de repuestos y mano de obra."],
              ["Año del carro", "Cambia el valor comercial y la facilidad para conseguir repuestos."],
              ["Valor comercial", "Es la base del valor asegurado. La guía de valores de Fasecolda es la referencia del mercado."],
              ["Uso", "Un carro particular no tiene el mismo riesgo que uno que trabaja todo el día haciendo domicilios, ventas o transporte."],
              ["Ciudad de circulación", "El riesgo de choques y de hurto cambia de una ciudad a otra."],
              ["Edad y experiencia del conductor", "Las aseguradoras miden el riesgo de quien maneja; un conductor joven suele pagar más."],
              ["Historial de reclamaciones e infracciones", "Reclamar seguido o tener multas por exceso de velocidad puede subir la prima."],
              ["Deducible", "A menor deducible, mayor prima."],
              ["Accesorios", "Rines, sonido, blindaje o equipos especiales suman al valor asegurado si los declaras."],
              ["Amparos y asistencias", "Carro de reemplazo, mayor límite de responsabilidad civil o más asistencias suben el precio."],
            ],
          },
        ],
      },
      {
        titulo: "¿Qué es la guía de valores de Fasecolda?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La guía de valores de Fasecolda es la lista que publica el gremio con el valor comercial promedio de los vehículos que circulan en Colombia. Se actualiza cada mes y su uso es voluntario: es una referencia, no una norma. Cada carro tiene un código Fasecolda que aparece en la póliza.",
          },
          {
            tipo: "p",
            texto:
              "Según Fasecolda, la guía sirve como base para fijar el valor asegurado y para calcular la indemnización en una pérdida total o un hurto. Si tu carro está asegurado por un valor más alto que el real, pagas una prima mayor sin recibir más en un siniestro, porque el seguro de daños no puede ser fuente de enriquecimiento (artículo 1088 del Código de Comercio). Si está por debajo, recibes menos de lo que vale tu carro.",
          },
          {
            tipo: "p",
            texto:
              "Por eso, en cada renovación, revisa que el valor asegurado coincida con el valor actual de tu carro en la guía.",
          },
        ],
      },
      {
        titulo: "¿Cómo bajar el precio del todo riesgo sin quedar mal cubierto?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Compara con los mismos amparos, ajusta el deducible a lo que puedes pagar y quita lo que no usas, pero sin bajar la responsabilidad civil. Paso a paso:",
          },
          {
            tipo: "pasos",
            items: [
              "Compara varias aseguradoras con los mismos amparos, el mismo valor asegurado y el mismo deducible. Si cambias todo a la vez, no sabes qué estás comparando.",
              "Ajusta el deducible a lo que de verdad puedes pagar de tu bolsillo, no más.",
              "Quita lo que no usas. Si ya tienes otra asistencia en carretera o no necesitas carro de reemplazo, pregunta cuánto cambia la prima sin eso.",
              "No bajes el límite de responsabilidad civil para ahorrar. Es el amparo que protege tu patrimonio si dañas un carro costoso o hieres a alguien.",
              "Mantén el valor asegurado al día con la guía de Fasecolda.",
              "Declara la verdad: quién maneja, para qué se usa y qué accesorios tiene.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Este último punto tiene peso legal. El artículo 1058 del Código de Comercio obliga a declarar sinceramente las circunstancias del riesgo. Si ocultas o declaras mal algo que habría hecho que la aseguradora no te asegurara o te cobrara más, el seguro puede quedar sin efecto. Y si durante la vigencia cambia algo que agrava el riesgo, como empezar a usar el carro para trabajar, debes avisarlo por escrito (artículo 1060).",
          },
        ],
      },
      {
        titulo: "¿Cuánto cuesta el seguro todo riesgo en Barranquilla?",
        bloques: [
          {
            tipo: "p",
            texto:
              "No hay una cifra única: el precio sale de cotizar con los datos de tu carro, quién lo maneja y cómo lo usas. Cualquier precio publicado en una página sería un número que no aplica a tu carro ni a ti. Con los datos de tu vehículo, quién lo maneja y cómo lo usas, un asesor de VanTrust te cotiza con varias de las aseguradoras con las que trabajamos y te explica por qué una cuesta más que otra.",
          },
          {
            tipo: "lista",
            items: [
              "Placa o tarjeta de propiedad del carro.",
              "Cédula y edad de quien lo maneja normalmente.",
              "Uso: particular o de trabajo.",
              "Accesorios que no vienen de fábrica.",
              "Si tienes póliza actual, la carátula para comparar.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro es más caro en Barranquilla que en otras ciudades?",
        respuesta:
          "La ciudad es uno de los factores que las aseguradoras tienen en cuenta, pero no el único. El modelo, el conductor y el deducible pesan igual o más. La única forma de saberlo para tu carro es cotizar.",
      },
      {
        pregunta: "¿Un carro más viejo paga menos seguro?",
        respuesta:
          "No siempre. Su valor comercial es menor, pero los repuestos pueden ser más difíciles de conseguir y algunas aseguradoras ponen límites de edad para el todo riesgo.",
      },
      {
        pregunta: "¿Si no reclamo, me baja el seguro?",
        respuesta:
          "El historial sin reclamaciones suele ayudar en la renovación, pero cada aseguradora lo aplica a su manera. Pregunta si tu póliza tiene algún beneficio por no reclamar.",
      },
      {
        pregunta: "¿Qué pasa si declaro un uso o un conductor distinto para pagar menos?",
        respuesta:
          "Te expones a que la aseguradora objete la reclamación o anule el seguro por reticencia o inexactitud, según el artículo 1058 del Código de Comercio. No vale la pena.",
      },
      {
        pregunta: "¿Dónde veo el valor Fasecolda de mi carro?",
        respuesta:
          "En la guía de valores de la página de Fasecolda, buscando por marca, modelo y referencia, o con el código Fasecolda que aparece en tu póliza.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía del precio del todo riesgo en Barranquilla y quiero cotizar mi carro.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: guía de valores de Fasecolda (valor comercial promedio, actualización mensual, uso voluntario, base para valor asegurado e indemnización) — ${FUENTE_FASECOLDA_GUIA} y ${FUENTE_FASECOLDA_FAQ}`,
      `Verificar con el asesor: Fasecolda, «la variable más significativa para el asegurador no es el carro en sí mismo, sino la persona» — ${FUENTE_FASECOLDA_FAQ}`,
      `Verificar con el asesor: Código de Comercio, art. 1058 (declaración del estado del riesgo, reticencia) y art. 1060 (aviso de agravación del riesgo) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, art. 1088 (carácter indemnizatorio del seguro de daños) — ${FUENTE_CCO}`,
      "Verificar con el asesor: si las aseguradoras con las que trabaja VanTrust ponen límite de edad del vehículo para todo riesgo y si dan beneficio por no reclamar.",
    ],
  },

  // 4. Flotas
  {
    slug: "seguro-para-flota-de-vehiculos-empresa",
    titulo: "¿Cómo asegurar la flota de vehículos de una empresa?",
    title: "Seguro para la flota de vehículos de tu empresa",
    description:
      "Póliza colectiva o pólizas individuales para los carros, camionetas y camiones de tu empresa, y qué pasa con los conductores. Habla con un asesor.",
    respuesta:
      "Una empresa con varios vehículos puede asegurarlos con pólizas individuales o con una póliza colectiva de flota, que reúne todos los vehículos en un solo contrato con una vigencia y unas condiciones comunes. La colectiva simplifica la administración y permite negociar condiciones para el grupo; las individuales dan más flexibilidad vehículo por vehículo. En ambos casos hay que declarar bien el uso de los vehículos y definir quién los maneja.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la distribuidora con cinco pólizas",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Una distribuidora de alimentos en la zona industrial de Barranquilla tenía cinco camionetas de reparto y dos carros de los vendedores. Cada vehículo tenía su propia póliza, tomada en momentos distintos y con aseguradoras distintas. Las renovaciones vencían en meses diferentes y nadie llevaba un control completo.",
          },
          {
            tipo: "p",
            texto:
              "Una de las camionetas chocó en la vía a Cartagena. Al reclamar, apareció el problema: esa póliza se había tomado como uso particular, y el vehículo hacía reparto todos los días. La aseguradora empezó a revisar si el uso declarado coincidía con el real, y el trámite se complicó.",
          },
          {
            tipo: "p",
            texto:
              "Después de ese susto, la gerente pidió revisar toda la flota con un asesor. Pasaron a una póliza colectiva con una sola fecha de renovación, el uso comercial declarado en todos los vehículos y una lista clara de conductores autorizados.",
          },
          {
            tipo: "p",
            texto:
              "La lección: en una flota, el riesgo no es solo el choque. Es el desorden administrativo: pólizas vencidas, usos mal declarados y conductores que nadie registró.",
          },
        ],
      },
      {
        titulo: "¿Conviene una póliza colectiva de flota o pólizas individuales?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza colectiva conviene a empresas con varios vehículos de uso similar; las individuales, a quienes tienen muy pocos vehículos o muy distintos entre sí. Estas son las diferencias prácticas:",
          },
          {
            tipo: "tabla",
            caption: "Diferencias prácticas entre las dos formas de asegurar una flota",
            columnas: ["Aspecto", "Póliza colectiva de flota", "Pólizas individuales"],
            filas: [
              ["Contrato", "Uno solo con todos los vehículos.", "Uno por vehículo."],
              ["Renovación", "Una fecha para toda la flota.", "Cada póliza vence en su fecha."],
              ["Condiciones", "Comunes para el grupo, negociadas en conjunto.", "Se negocian por separado."],
              ["Incluir o retirar vehículos", "Se hace con un anexo a la misma póliza.", "Hay que tomar o cancelar una póliza."],
              ["Historial", "La aseguradora mira la siniestralidad de toda la flota en la renovación.", "Cada vehículo tiene su propio historial."],
              ["Administración", "Más simple: una factura y un solo interlocutor.", "Más trabajo para llevar el control."],
              ["Conviene a", "Empresas con varios vehículos de uso similar.", "Empresas con muy pocos vehículos o muy distintos entre sí."],
            ],
          },
          {
            tipo: "p",
            texto:
              "No hay un número mínimo de vehículos fijado por la ley para una colectiva; cada aseguradora define desde cuántos vehículos la ofrece y con qué condiciones. Lo que conviene es comparar las dos opciones con los datos reales de tu flota.",
          },
        ],
      },
      {
        titulo: "¿Qué revisar antes de asegurar la flota de tu empresa?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Revisa el uso real y el tipo de cada vehículo, las rutas, el límite de responsabilidad civil y el valor asegurado. En detalle:",
          },
          {
            tipo: "lista",
            items: [
              "Uso real de cada vehículo: reparto, ventas, transporte de carga propia, transporte para terceros o uso de directivos. Cada uso tiene un riesgo distinto.",
              "Tipo de vehículo: carros, camionetas, furgones o camiones. Los vehículos de carga pueden necesitar condiciones especiales.",
              "Límite de responsabilidad civil: un vehículo de reparto que circula todo el día por la ciudad tiene más exposición a causar daños a terceros.",
              "Rutas: si los vehículos salen a Cartagena, Santa Marta o al interior, confirma que la cobertura y las asistencias funcionen en carretera.",
              "Carro de reemplazo o auxilio: un vehículo parado en el taller también es una pérdida para el negocio.",
              "Valor asegurado de cada vehículo, al día con la guía de valores de Fasecolda.",
              "Accesorios y equipos instalados: carrocerías, furgones, refrigeración o rastreo satelital, declarados para que estén cubiertos.",
            ],
          },
          {
            tipo: "p",
            texto:
              "La póliza de auto cubre el vehículo y la responsabilidad civil por los daños que cause. La mercancía que transportas no está cubierta por el seguro de auto: para eso existe el seguro de transporte de mercancías. Si eres transportador, ten en cuenta además que el artículo 994 del Código de Comercio dice que, cuando el Gobierno lo exija, el transportador debe tomar un seguro que cubra a las personas y las cosas transportadas.",
          },
        ],
      },
      {
        titulo: "¿Por qué los conductores son clave en el seguro de flota?",
        bloques: [
          {
            tipo: "p",
            texto:
              "En una flota, quien maneja casi nunca es el dueño del vehículo. Por eso los conductores son uno de los puntos más importantes de la póliza.",
          },
          {
            tipo: "pasos",
            items: [
              "Define quién puede manejar cada vehículo y pregunta si la póliza exige registrar a los conductores o cubre a cualquier conductor autorizado por la empresa.",
              "Verifica que cada conductor tenga licencia vigente y de la categoría que corresponde al vehículo. Manejar sin la licencia adecuada es una exclusión común.",
              "Establece reglas claras: cero alcohol, no prestar el vehículo a terceros y no usarlo para fines distintos a los de la empresa.",
              "Enseña a los conductores qué hacer en un choque: cómo avisar, qué fotos tomar y a quién llamar.",
              "Designa a una persona en la empresa que reciba los avisos y los pase a la aseguradora o al asesor. La ley da tres días para avisar del siniestro desde que se conoce (artículo 1075 del Código de Comercio).",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si un conductor de la empresa causa un accidente, la víctima puede reclamar directamente a la aseguradora, que responde por el amparo de responsabilidad civil (artículos 1127 y 1133 del Código de Comercio). Si hay personas heridas, el SOAT del vehículo atiende primero sus gastos médicos.",
          },
        ],
      },
      {
        titulo: "¿Qué hacer si cambian los vehículos de la flota?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Debes avisar por escrito a la aseguradora los cambios que agraven el riesgo, como lo exige el artículo 1060 del Código de Comercio. Y una flota cambia: entran vehículos, salen otros y cambian los usos. Si el cambio depende de ti, el aviso es con al menos diez días de anticipación.",
          },
          {
            tipo: "lista",
            items: [
              "Avisa cada vehículo nuevo antes de ponerlo a trabajar.",
              "Retira de la póliza los vehículos vendidos.",
              "Informa si un vehículo cambia de uso, por ejemplo de uso de un directivo a reparto.",
              "Revisa la siniestralidad de la flota antes de cada renovación para entender cómo puede cambiar la prima.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En VanTrust te ayudamos a ordenar la flota, comparar la colectiva con las pólizas individuales en varias aseguradoras y acompañar a tus conductores cuando haya un siniestro.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Desde cuántos vehículos se puede tomar una póliza colectiva?",
        respuesta:
          "No lo fija la ley; cada aseguradora define su mínimo y sus condiciones. Un asesor puede decirte qué opciones hay para el tamaño de tu flota.",
      },
      {
        pregunta: "¿La póliza cubre a cualquier empleado que maneje?",
        respuesta:
          "Depende de la póliza. Algunas cubren a cualquier conductor autorizado y otras piden registrarlos. En todos los casos el conductor debe tener licencia vigente de la categoría correcta.",
      },
      {
        pregunta: "¿El seguro de la flota cubre la mercancía que llevo?",
        respuesta:
          "No. El seguro de auto cubre el vehículo y los daños que causes a terceros, pero no la carga. Para proteger la mercancía que llevan los vehículos de la flota necesitas un seguro de transporte de mercancías.",
      },
      {
        pregunta: "¿Puedo asegurar en la misma póliza carros y camiones?",
        respuesta:
          "Muchas veces sí. Cada aseguradora decide si acepta distintos tipos de vehículo en una misma póliza, y cada tipo puede tener condiciones y tarifas distintas dentro de ella. Pregúntale a tu asesor cómo lo maneja cada opción.",
      },
      {
        pregunta: "¿Qué pasa si un vehículo de reparto está asegurado como particular?",
        respuesta:
          "Es un riesgo. Si la aseguradora encuentra que el uso real del vehículo era distinto al declarado, puede objetar la reclamación. Corrige el uso cuanto antes y avísalo por escrito a la aseguradora, como pide la ley para los cambios que agravan el riesgo.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía de seguros para flotas y quiero cotizar los vehículos de mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 994 (seguro que debe tomar el transportador cuando el Gobierno lo exija) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, art. 1060 (aviso de agravación del riesgo, diez días) y art. 1075 (aviso del siniestro) — ${FUENTE_CCO}`,
      `Verificar con el asesor: Código de Comercio, art. 1127 y art. 1133 (responsabilidad civil y acción directa) — ${FUENTE_CCO}`,
      "Verificar con el asesor: mínimo de vehículos y condiciones de la póliza colectiva de flota en las aseguradoras con las que trabaja VanTrust.",
      "Verificar con el asesor: si las pólizas de flota que ofrece VanTrust exigen registrar conductores o cubren a cualquier conductor autorizado.",
      "Evaluar enlace a /pymes/transporte-de-mercancias desde la sección de mercancía.",
    ],
  },

  // 5. Carro usado: el seguro al comprar
  {
    slug: "seguro-carro-usado-al-comprar",
    titulo: "¿Cómo sacar el seguro de carro usado desde el día de la compra?",
    title: "Seguro de carro usado: cómo asegurarlo desde la compra",
    description:
      "Seguro de carro usado: qué pasa con la póliza del dueño anterior, la inspección y el traspaso. Asegúralo desde el día de la entrega con un asesor.",
    respuesta:
      "El seguro de carro usado debes tomarlo a tu nombre antes de recibir el carro, porque la póliza del dueño anterior no pasa automáticamente a ti. Según el Código de Comercio, la venta extingue ese contrato salvo que la aseguradora consienta otra cosa. Pide la inspección, cotiza con los datos del carro y haz que la póliza empiece el día de la entrega.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el carro que venía «con seguro hasta diciembre»",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Carolina vive en Soledad y compró su primer carro usado a un particular. El vendedor le dijo que el carro tenía todo riesgo vigente hasta diciembre, así que ella no buscó un seguro propio. Firmaron la compraventa un sábado y acordaron hacer el traspaso la semana siguiente.",
          },
          {
            tipo: "p",
            texto:
              "El martes, de camino al trabajo por la Circunvalar, Carolina golpeó a otro carro en un frenazo. Llamó a la aseguradora del vendedor y ahí vino la sorpresa: la póliza estaba a nombre del dueño anterior, y con la venta ese contrato se había extinguido. La aseguradora no había aceptado ningún cambio de asegurado. Carolina tuvo que pagar de su bolsillo el arreglo de los dos carros.",
          },
          {
            tipo: "p",
            texto:
              "Con el segundo carro hizo distinto. Antes de pagar, pidió cotizar con un asesor, agendó la inspección y la póliza nueva empezó el mismo día en que le entregaron las llaves.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el seguro protege a una persona y un interés concretos. Cuando el carro cambia de dueño, el seguro del vendedor no te protege a ti. El tuyo debe arrancar cuando el carro empieza a ser tu responsabilidad.",
          },
        ],
      },
      {
        titulo: "¿Qué pasa con el seguro del dueño anterior cuando compras un carro usado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La póliza del dueño anterior se extingue con la venta, salvo que la aseguradora acepte expresamente que siga. Por eso no debes contar con ella para manejar el carro que acabas de comprar.",
          },
          {
            tipo: "p",
            texto:
              "Lo dice el artículo 1107 del Código de Comercio: la transferencia del interés asegurado o de la cosa asegurada por un acto entre vivos, como una venta, produce automáticamente la extinción del contrato de seguro. El interés asegurado es la relación económica que tiene una persona con el bien: quien pierde plata si el carro se daña. Cuando vendes el carro, ese interés pasa al comprador.",
          },
          {
            tipo: "lista",
            items: [
              "Hay una excepción: si la aseguradora da su consentimiento expreso, el contrato no se extingue. No lo supongas: pide que te lo confirmen por escrito.",
              "Cuando el contrato se extingue, la aseguradora debe devolverle al vendedor la prima no devengada, es decir, la parte de la prima que corresponde al tiempo que ya no va a cubrir.",
              "Para el vendedor también es importante: debe avisar a su aseguradora de la venta y pedir esa devolución.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Hay un punto que conviene aclarar con el asesor: desde cuándo cada aseguradora considera que el carro cambió de dueño, si desde la entrega o desde que se inscribe el traspaso. Lo más seguro es que tu póliza empiece el día en que recibes el carro, aunque el traspaso esté en trámite.",
          },
        ],
      },
      {
        titulo: "¿Cómo se asegura un carro usado antes de recibirlo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un carro usado se asegura con una póliza nueva a tu nombre, después de una inspección y con el valor asegurado que corresponde a ese carro. Estos son los pasos, en orden:",
          },
          {
            tipo: "pasos",
            items: [
              "Antes de pagar, pide la placa, la línea, el modelo y la versión del carro para cotizar. Con esos datos el asesor consulta su valor en la guía de valores de Fasecolda.",
              "Consulta el historial del carro en el RUNT: estado del registro, limitaciones como prendas o embargos y la revisión técnico-mecánica.",
              "Agenda la inspección del vehículo con la aseguradora que elijas. Es la revisión en la que la aseguradora verifica el estado del carro, sus accesorios y que los números de motor y chasis coincidan con los documentos.",
              "Elige los amparos: todo riesgo o una opción más básica. Si dudas, compara antes de firmar.",
              "Pregunta qué documentos acepta la aseguradora mientras sale el traspaso, como el contrato de compraventa y la tarjeta de propiedad del vendedor.",
              "Pide que la póliza empiece el día y la hora de la entrega, y recibe la póliza expedida antes de llevarte el carro.",
              "Paga la prima a tiempo. La mora en el pago termina el contrato, como se explica en la guía «¿Cómo cambiar de aseguradora sin quedarme desprotegido?».",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si la inspección encuentra golpes sin reparar, la aseguradora los anota y pueden quedar por fuera de la cobertura. Inspeccionar antes de cerrar el negocio también te sirve para negociar el precio.",
          },
        ],
      },
      {
        titulo: "¿Qué tiene que ver el traspaso con el seguro de carro usado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El traspaso es el registro del cambio de dueño en el organismo de tránsito, y es lo que te hace propietario ante la ley. Mientras no se haga, el vendedor sigue figurando como dueño, y eso puede complicar una reclamación.",
          },
          {
            tipo: "p",
            texto:
              "El artículo 47 de la Ley 769 de 2002, el Código Nacional de Tránsito, dice que la tradición del dominio de un vehículo requiere, además de la entrega material, su inscripción en el organismo de tránsito. La inscripción debe hacerse dentro de los sesenta días hábiles siguientes a la adquisición.",
          },
          {
            tipo: "tabla",
            caption: "Qué hacer antes, durante y después de comprar un carro usado",
            columnas: ["Momento", "Qué revisar o hacer", "Por qué importa para el seguro"],
            filas: [
              ["Antes de pagar", "Historial en el RUNT, prendas, embargos y estado de la revisión técnico-mecánica.", "Un carro con limitaciones puede retrasar el traspaso y la reclamación."],
              ["Antes de pagar", "Inspección del vehículo y cotización.", "Sabes qué cubre la póliza y en qué estado recibes el carro."],
              ["El día de la entrega", "Póliza nueva expedida a tu nombre.", "La del vendedor no te protege a ti."],
              ["En las semanas siguientes", "Traspaso en el organismo de tránsito, dentro del plazo legal.", "Quedas como dueño ante la ley y ante la aseguradora."],
              ["Después del traspaso", "Envía a la aseguradora la nueva tarjeta de propiedad.", "Los datos de la póliza quedan al día."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Si el carro tenía una prenda a favor de un banco, pide el levantamiento antes del traspaso. Y si tú vas a comprar con crédito, el banco entrará como beneficiario de tu póliza, lo que se explica en la guía «Seguro de carro financiado: ¿puedo elegir la aseguradora o me toca la del banco?».",
          },
        ],
      },
      {
        titulo: "¿Qué errores encarecen o complican el seguro de un carro usado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Los errores más comunes son asegurar por un valor que no corresponde, no declarar los accesorios y no decir el uso real del carro. Todos se evitan con información completa desde el principio.",
          },
          {
            tipo: "lista",
            items: [
              "Asegurar por lo que pagaste y no por el valor de referencia del carro. El precio de un negocio entre particulares puede ser distinto al valor comercial; la guía «¿De qué depende el precio del seguro todo riesgo en Barranquilla?» explica cómo se usa la guía de Fasecolda.",
              "No declarar accesorios como rines, sonido o blindaje. Lo que no está declarado puede no estar cubierto.",
              "Declarar uso particular si vas a usar el carro para trabajar con plataformas o para reparto.",
              "Ocultar golpes o reparaciones grandes. Lo que declaras al tomar el seguro importa: una declaración inexacta puede afectar la reclamación.",
              "Dejar el seguro para después del traspaso. Los primeros días con un carro que no conoces también son de riesgo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En VanTrust trabajamos con varias aseguradoras. Un asesor te ayuda a cotizar el carro antes de comprarlo, a coordinar la inspección y a que la póliza quede lista para el día de la entrega.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El vendedor me puede pasar su seguro todo riesgo?",
        respuesta:
          "Solo si la aseguradora del vendedor da su consentimiento expreso. Sin eso, la venta extingue la póliza según el artículo 1107 del Código de Comercio. Lo más seguro es tomar una póliza nueva a tu nombre que empiece el día de la entrega.",
      },
      {
        pregunta: "¿Puedo asegurar el carro antes de que salga el traspaso?",
        respuesta:
          "En muchos casos sí, con el contrato de compraventa y los documentos del carro, pero cada aseguradora define qué documentos acepta. Pregúntalo al cotizar para que la póliza empiece el mismo día en que recibes el carro.",
      },
      {
        pregunta: "¿Me pueden negar el seguro de un carro muy viejo?",
        respuesta:
          "Algunas aseguradoras ponen límites de antigüedad para el todo riesgo o piden condiciones especiales para carros con muchos años. Si no consigues un todo riesgo, existe la opción de una póliza de responsabilidad civil para cubrir los daños que causes a otros.",
      },
      {
        pregunta: "¿Quién paga la inspección del carro usado?",
        respuesta:
          "Depende de la aseguradora. En muchos casos la inspección para tomar la póliza no tiene costo para quien la solicita, pero conviene confirmarlo al cotizar. No la confundas con un peritaje privado que contrates para revisar el estado mecánico del carro.",
      },
      {
        pregunta: "¿El vendedor recupera algo del seguro que ya había pagado?",
        respuesta:
          "Sí. Cuando la póliza se extingue por la venta, la aseguradora debe devolverle la prima no devengada, es decir, la parte que corresponde al tiempo que ya no va a cubrir. El vendedor debe avisar de la venta y pedir esa devolución.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía del seguro de carro usado. Voy a comprar un carro y quiero asegurarlo desde el día de la entrega.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 1107 (la venta extingue el seguro, salvo consentimiento expreso del asegurador; devolución de la prima no devengada) — ${FUENTE_CCO_1107} y ${FUENTE_CCO}`,
      `Verificar con el asesor: Ley 769 de 2002, art. 47 (tradición: entrega más inscripción en el organismo de tránsito dentro de los 60 días hábiles siguientes) — ${FUENTE_LEY_769}`,
      `Verificar con el asesor: guía de valores de Fasecolda como referencia del valor asegurado — ${FUENTE_FASECOLDA_GUIA}`,
      "Verificar con el asesor: desde qué momento (entrega o inscripción del traspaso) las aseguradoras con las que trabaja VanTrust consideran transferido el interés asegurado, y qué documentos aceptan para asegurar antes del traspaso.",
      "Verificar con el asesor: si la inspección para tomar la póliza tiene costo en las aseguradoras con las que trabaja VanTrust y si hay límites de antigüedad del vehículo para todo riesgo.",
    ],
  },

  // 6. Carro financiado: elegir aseguradora
  {
    slug: "seguro-carro-financiado-puedo-elegir-aseguradora",
    titulo: "Seguro de carro financiado: ¿puedo elegir la aseguradora o me toca la del banco?",
    title: "Seguro de carro financiado: ¿puedes elegir aseguradora?",
    description:
      "Seguro de carro financiado: puedes elegir la aseguradora y endosar la póliza al banco. Te explicamos el endoso, la norma y los pasos. Cotiza con un asesor.",
    respuesta:
      "Sí, con un seguro de carro financiado puedes elegir la aseguradora. El Estatuto Orgánico del Sistema Financiero protege tu libertad de escoger aseguradora e intermediario, y el banco puede aceptar una póliza que tomes por tu cuenta, endosada a su favor como beneficiario oneroso. Debe cumplir las condiciones mínimas que el banco te informe por escrito.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la póliza que venía en la cuota",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Jaime y Luisa viven en el norte de Barranquilla y compraron una camioneta con crédito de vehículo. En el concesionario les dijeron que el seguro venía incluido en la cuota del banco. Firmaron todo el mismo día y no preguntaron más.",
          },
          {
            tipo: "p",
            texto:
              "Meses después, la camioneta pasó varios días en el taller por un choque menor. Ahí descubrieron que su póliza no tenía carro de reemplazo y que el deducible era más alto de lo que esperaban. Nadie les había dicho que podían comparar.",
          },
          {
            tipo: "p",
            texto:
              "Al llegar la renovación, hablaron con un asesor. Compararon opciones en varias aseguradoras, escogieron una póliza con las coberturas que necesitaban, la endosaron al banco como beneficiario y la entregaron antes del vencimiento. El banco la revisó con sus condiciones mínimas y la aceptó.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el seguro que ofrece el banco es una opción, no una obligación. Lo obligatorio es que el carro esté asegurado como pide el crédito.",
          },
        ],
      },
      {
        titulo: "¿Por qué el banco exige seguro para un carro financiado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El banco exige el seguro porque el carro es la garantía del crédito. Si el carro se pierde por un choque o un robo, el seguro paga y con esa plata se cubre primero la deuda.",
          },
          {
            tipo: "lista",
            items: [
              "La prenda es la garantía que tiene el banco sobre el carro mientras debes el crédito. Por lo general es una prenda sin tenencia: tú usas el carro y el banco conserva el derecho sobre él.",
              "El beneficiario oneroso es la persona que recibe primero la indemnización, hasta el saldo de la deuda. En un carro financiado es el banco.",
              "El endoso es la anotación en la póliza que pone al banco como beneficiario oneroso. Así el banco sabe que su garantía está protegida.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Un concepto de la Superintendencia Financiera de 2002 describe este esquema: el crédito exige una prenda sobre el vehículo, el deudor debe mantenerlo asegurado y la entidad figura como beneficiaria a título oneroso. Si hay pérdida total o hurto, la indemnización va primero al banco y el saldo, si queda, te llega a ti. La guía «¿Qué hacer si te roban el carro y tienes seguro?» explica ese trámite.",
          },
        ],
      },
      {
        titulo: "¿Qué dice la norma sobre elegir la aseguradora en un crédito?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La norma protege tu libertad de escoger la aseguradora. El artículo 100, numeral 2, del Estatuto Orgánico del Sistema Financiero (Decreto 663 de 1993) dice que la Superintendencia Financiera protege la libertad de tomadores y asegurados para decidir la contratación de los seguros y escoger sin limitaciones la aseguradora y, en su caso, el intermediario.",
          },
          {
            tipo: "tabla",
            caption: "Las reglas principales sobre seguros ligados a créditos en Colombia",
            columnas: ["Norma o documento", "Qué dice, en palabras simples"],
            filas: [
              ["Estatuto Orgánico del Sistema Financiero, art. 100, num. 2", "Puedes escoger sin limitaciones la aseguradora y el intermediario."],
              ["Decreto 673 de 2014, que modificó el Decreto 2555 de 2010 (art. 2.36.2.1.1)", "Si el banco toma el seguro por cuenta de sus deudores, debe invitar a las aseguradoras con mecanismos de amplia difusión, darles la misma información y escoger con criterios objetivos. Si escoge más de una aseguradora, solo el deudor elige cuál lo cubre. El proceso se repite al menos cada dos años."],
              ["Concepto de la Superfinanciera de 2002", "La entidad puede aceptar pólizas que el deudor contrate directamente, en ejercicio de su libertad de contratación."],
              ["Concepto de la Superfinanciera 2023054877 de 2023", "Las entidades deben tener procedimientos para que el deudor ejerza esa libertad, informar por escrito las condiciones de aceptación o rechazo, y no pueden usar esos trámites como excusa para rechazar pólizas individuales."],
            ],
          },
          {
            tipo: "p",
            texto:
              "En resumen: el banco puede pedir unas condiciones mínimas para la póliza, como los amparos, el valor asegurado y el endoso a su favor. Lo que no debería hacer es obligarte a tomar su seguro o rechazar tu póliza solo por el canal en que la presentaste.",
          },
        ],
      },
      {
        titulo: "¿Cómo endosar al banco el seguro de carro financiado que tomas por tu cuenta?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Para usar tu propia póliza, pides al banco sus condiciones por escrito, tomas una póliza que las cumpla con el endoso a su favor y la entregas antes de que venza la anterior. Estos son los pasos:",
          },
          {
            tipo: "pasos",
            items: [
              "Pide al banco, por escrito, las condiciones mínimas que debe tener la póliza: amparos, valor asegurado, deducibles máximos si los fija y cómo debe figurar como beneficiario oneroso.",
              "Cotiza con varias aseguradoras con esas condiciones. Compara también lo que el banco no exige pero a ti te sirve, como el carro de reemplazo o los límites de responsabilidad civil.",
              "Pide a la aseguradora que expida la póliza con el endoso a favor del banco.",
              "Entrega la póliza y el certificado de endoso por el canal que indique el banco, con tiempo antes del vencimiento.",
              "Guarda la constancia de entrega y confirma que el banco dejó de cobrarte su seguro en la cuota.",
              "Repite el proceso en cada renovación. Si la póliza vence y el banco no recibe la nueva, en muchos contratos de crédito puede incluir el carro en su propia póliza y cobrarla en la cuota.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si el banco rechaza tu póliza, pide que te diga por escrito qué condición no cumple. Si crees que el rechazo no tiene fundamento, puedes acudir al defensor del consumidor financiero del banco y a la Superintendencia Financiera.",
          },
        ],
      },
      {
        titulo: "¿Qué conviene revisar antes de cambiar el seguro de tu carro financiado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Antes de cambiarte, revisa que la nueva póliza cumpla lo que pide el banco y que no te deje días sin cobertura. El precio importa, pero no es lo único.",
          },
          {
            tipo: "lista",
            items: [
              "Coberturas: pérdida parcial y total por daños, hurto, responsabilidad civil y asistencias. La guía «¿Qué cubre un seguro todo riesgo de carro en Colombia?» explica cada amparo.",
              "Deducibles: compáralos con lo que puedes pagar de tu bolsillo en un choque. La guía «¿Qué es el deducible del seguro de carro y cómo elegirlo?» te ayuda a decidir.",
              "Fechas: la póliza nueva debe empezar exactamente cuando vence la anterior.",
              "Forma de pago: si pagabas el seguro en la cuota del banco, ahora lo pagas directo a la aseguradora o a plazos según la póliza.",
              "Inspección: muchas aseguradoras piden inspeccionar el carro antes de asegurarlo con ellas.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En VanTrust comparamos opciones en varias aseguradoras, gestionamos el endoso al banco y te acompañamos si hay un siniestro, también cuando el pago va primero a la entidad financiera.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El banco me puede obligar a tomar el seguro que ofrece?",
        respuesta:
          "No debería. El Estatuto Orgánico del Sistema Financiero protege tu libertad de escoger la aseguradora. El banco sí puede exigir que el carro esté asegurado con unas condiciones mínimas y con el endoso a su favor como beneficiario oneroso.",
      },
      {
        pregunta: "¿Puedo cambiar de aseguradora en la mitad del crédito?",
        respuesta:
          "Sí. Puedes cambiarte al renovar o incluso antes, siempre que la póliza nueva cumpla las condiciones del banco, quede endosada a su favor y empiece sin dejar días sin cobertura. Avisa al banco para que deje de cobrarte su seguro.",
      },
      {
        pregunta: "¿Qué pasa si se vence mi póliza y no la renuevo a tiempo?",
        respuesta:
          "El carro queda sin seguro y estarías incumpliendo una condición del crédito. En muchos contratos el banco puede asegurar el carro por su cuenta y cobrarte esa póliza en la cuota. Renueva y entrega el endoso antes del vencimiento.",
      },
      {
        pregunta: "Si hay pérdida total, ¿a quién le pagan?",
        respuesta:
          "Primero al banco, que es el beneficiario oneroso, hasta el saldo de la deuda. Si la indemnización es mayor que lo que debes, la diferencia te la pagan a ti. Por eso conviene que el valor asegurado esté al día con el valor del carro.",
      },
      {
        pregunta: "¿A quién me quejo si el banco rechaza mi póliza sin razón?",
        respuesta:
          "Primero pide al banco las razones del rechazo por escrito. Si no estás de acuerdo, puedes acudir al defensor del consumidor financiero de la entidad y presentar una queja ante la Superintendencia Financiera de Colombia.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía del seguro de carro financiado. Tengo crédito de vehículo y quiero cotizar una póliza para endosarla al banco.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Estatuto Orgánico del Sistema Financiero (Decreto 663 de 1993), art. 100, num. 2 (libertad de escoger aseguradora e intermediario), citado por la Superfinanciera en el concepto 2002007356-2 — ${FUENTE_SFC_2002}`,
      `Verificar con el asesor: concepto 2002007356-2 de 2002 de la Superfinanciera (prenda, beneficiario oneroso y aceptación de pólizas contratadas por el deudor) — ${FUENTE_SFC_2002}`,
      `Verificar con el asesor: Decreto 673 de 2014, que sustituyó el Título 2 del Libro 36 de la Parte 2 del Decreto 2555 de 2010; art. 2.36.2.1.1 (invitación a aseguradoras, información igual, selección objetiva, elección del deudor y repetición cada dos años) — ${FUENTE_D673} y ${FUENTE_D673_FP}`,
      `Verificar con el asesor: concepto 2023054877-001-000 del 5 de julio de 2023 de la Superfinanciera (procedimientos, condiciones de aceptación o rechazo por escrito y Circular Básica Jurídica, Parte I, Título III, Capítulo I, num. 1.3) — ${FUENTE_SFC_2023}`,
      "Verificar con el asesor: las causales de rechazo de pólizas del numeral 1.3.2.5 de la Circular Básica Jurídica (no se pudieron leer en la fuente consultada) y si existe un plazo para que el banco responda en créditos de vehículo.",
      "Verificar con el asesor: que en los créditos de vehículo de los bancos con que trabajan los clientes de VanTrust el banco pueda incluir el carro en su póliza colectiva si el deudor no entrega la renovación.",
    ],
  },

  // 7. Solo responsabilidad civil vs. todo riesgo
  {
    slug: "seguro-responsabilidad-civil-carro-sin-todo-riesgo",
    titulo: "¿Sirve un seguro de responsabilidad civil para carro en vez de un todo riesgo?",
    title: "Seguro de responsabilidad civil para carro vs. todo riesgo",
    description:
      "Seguro de responsabilidad civil para carro: qué cubre, qué no y cuándo conviene en vez del todo riesgo, como en carros antiguos. Compara con un asesor.",
    respuesta:
      "Un seguro de responsabilidad civil para carro sirve si lo que más te preocupa es dañar a otros y tu carro vale poco o es difícil de asegurar en todo riesgo. Paga los daños que causes a terceros hasta el límite contratado, pero no repara tu carro ni te paga si te lo roban. Por eso conviene sobre todo en carros antiguos o de bajo valor.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el carro viejo de don Álvaro",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Don Álvaro vive en Puerto Colombia y tiene un carro de hace más de veinte años que usa para hacer mandados y visitar a sus hijos en Barranquilla. Cuando preguntó por un todo riesgo, le dijeron que por la edad del carro las opciones eran pocas y caras. Pensó en quedarse solo con lo obligatorio.",
          },
          {
            tipo: "p",
            texto:
              "Un asesor le explicó que su mayor riesgo no era el carro, que valía poco, sino lo que podía dañarle a otro. Tomó una póliza solo de responsabilidad civil extracontractual.",
          },
          {
            tipo: "p",
            texto:
              "Meses después, saliendo de un parqueadero en el centro, golpeó la puerta de una camioneta casi nueva. La póliza respondió por la reparación de la camioneta, hasta el límite contratado. El arreglo de su propio carro lo pagó él, porque esa póliza no cubre daños propios.",
          },
          {
            tipo: "p",
            texto:
              "La lección: cuando el carro vale poco, el golpe grande para tu bolsillo es el daño que le haces a otro. Una póliza de responsabilidad civil protege justamente eso, y no más.",
          },
        ],
      },
      {
        titulo: "¿Qué es un seguro de responsabilidad civil para carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un seguro de responsabilidad civil para carro es una póliza que paga los daños que le causes a otras personas con tu vehículo: a sus carros, a sus bienes o a ellas mismas. No cubre los daños de tu propio carro.",
          },
          {
            tipo: "p",
            texto:
              "La responsabilidad civil extracontractual es la obligación de reparar el daño que le causas a alguien con quien no tienes un contrato, como el dueño del carro con el que chocas. El artículo 1127 del Código de Comercio define el seguro de responsabilidad como el que impone a la aseguradora la obligación de indemnizar los perjuicios patrimoniales que cause el asegurado, y dice que su propósito es resarcir a la víctima.",
          },
          {
            tipo: "lista",
            items: [
              "La víctima puede reclamar directamente a tu aseguradora (artículo 1133 del Código de Comercio).",
              "La aseguradora responde también por los costos del proceso que la víctima te haga, con las condiciones del artículo 1128 del Código de Comercio.",
              "El límite asegurado es el máximo que paga la póliza. Lo que pase de ese límite te toca a ti.",
              "En muchas pólizas se puede sumar asistencia jurídica y algunas asistencias en carretera, según la aseguradora.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si en el accidente hay personas heridas, sus gastos médicos los atiende primero el SOAT del vehículo, que es obligatorio. En muchas pólizas, la responsabilidad civil por lesiones responde por lo que exceda lo que cubre el SOAT.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre la responsabilidad civil sola frente a un todo riesgo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La responsabilidad civil sola cubre a los demás; el todo riesgo te cubre a ti y a los demás. Esta tabla muestra la diferencia en las situaciones más comunes, siempre según la póliza:",
          },
          {
            tipo: "tabla",
            caption: "Póliza solo de responsabilidad civil vs. todo riesgo (siempre según la póliza)",
            columnas: ["Situación", "Solo responsabilidad civil", "Todo riesgo"],
            filas: [
              ["Chocas otro carro y tú tienes la culpa", "Paga el daño del otro carro, hasta el límite.", "Paga el daño del otro carro y el del tuyo, con deducible."],
              ["Dañas una casa, un muro o un poste", "Sí, hasta el límite.", "Sí, hasta el límite."],
              ["Hieres a una persona", "Responde por lo que exceda el SOAT, según la póliza.", "Igual, según la póliza."],
              ["Te roban el carro", "No.", "Sí, por hurto total."],
              ["Te roban espejos o llantas", "No.", "Depende: muchas pólizas lo cubren como hurto parcial."],
              ["Tu carro queda destruido en un choque", "No.", "Sí, por pérdida total por daños."],
              ["Un arroyo daña tu carro", "No.", "Depende de cómo trate la póliza los eventos de la naturaleza."],
              ["Te chocan y el otro tiene la culpa", "Tu póliza no paga tu carro; reclamas al responsable o a su aseguradora.", "Puedes reclamar a tu póliza, que luego recobra al responsable."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Para ver con detalle qué incluye un todo riesgo, lee la guía «¿Qué cubre un seguro todo riesgo de carro en Colombia?». Y si te preocupan las lluvias, la guía «¿El seguro cubre si un arroyo de Barranquilla daña tu carro?» explica cómo se tratan esos daños.",
          },
        ],
      },
      {
        titulo: "¿Para quién tiene sentido asegurar solo la responsabilidad civil?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Tiene sentido para quien puede asumir la pérdida de su propio carro pero no podría pagar un daño grande a otra persona. Es una decisión de cuánto riesgo puedes cargar tú.",
          },
          {
            tipo: "lista",
            items: [
              "Carros antiguos o de bajo valor, en los que un todo riesgo cuesta mucho frente a lo que vale el carro o las aseguradoras ponen límites por la edad.",
              "Personas que podrían reparar o reemplazar su carro con sus ahorros, pero no una camioneta de alta gama ajena.",
              "Un segundo carro de la familia que se usa poco.",
              "Carros que no consiguen un todo riesgo por su antigüedad o por su estado.",
            ],
          },
          {
            tipo: "p",
            texto:
              "No tiene sentido si el carro es nuevo o de valor alto, si lo compraste con crédito, o si perderlo te dejaría sin cómo trabajar. Un carro financiado suele necesitar un todo riesgo endosado al banco, como explica la guía «Seguro de carro financiado: ¿puedo elegir la aseguradora o me toca la del banco?».",
          },
          {
            tipo: "p",
            texto:
              "Entre los dos extremos hay opciones intermedias. En el mercado se ofrecen planes que suman a la responsabilidad civil la pérdida total o el hurto, sin cubrir las pérdidas parciales. Pregunta al asesor qué ofrece cada aseguradora para tu carro.",
          },
        ],
      },
      {
        titulo: "¿Cómo elegir el límite de responsabilidad civil de tu carro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Elige el límite pensando en el daño más caro que podrías causar, no en lo que vale tu carro. En Barranquilla circulan a diario camionetas, buses y carros de alta gama, y un solo choque con uno de ellos puede costar mucho.",
          },
          {
            tipo: "pasos",
            items: [
              "Mira dónde manejas: la Circunvalar, la Vía al Mar o el tráfico del norte de la ciudad tienen vehículos de mucho valor.",
              "Pregunta qué límites ofrece cada aseguradora y cómo se reparten entre daños a bienes, lesiones a una persona y lesiones a varias personas.",
              "Revisa si la póliza tiene deducible en la responsabilidad civil y de cuánto.",
              "Confirma si incluye asistencia jurídica para el proceso y para las audiencias de tránsito.",
              "Lee las exclusiones: manejar sin licencia o bajo los efectos del alcohol suelen estar excluidos, igual que en un todo riesgo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si chocas, actúa igual que con cualquier póliza: la guía «¿Qué hacer si chocas? Paso a paso para no complicar la reclamación» explica los pasos. En VanTrust un asesor te ayuda a comparar opciones de responsabilidad civil y todo riesgo en varias aseguradoras y te acompaña si tienes un siniestro.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿La responsabilidad civil para carro es obligatoria en Colombia?",
        respuesta:
          "Para un carro particular, lo obligatorio es el SOAT, que atiende a las personas lesionadas en accidentes de tránsito. La póliza de responsabilidad civil es voluntaria, aunque en otros tipos de transporte, como el público, la ley sí exige pólizas de responsabilidad civil.",
      },
      {
        pregunta: "¿Si me chocan, mi póliza de responsabilidad civil me paga?",
        respuesta:
          "No. Esa póliza paga los daños que tú causas a otros. Si el responsable es el otro conductor, reclamas a él o a su aseguradora. Si quieres que tu propia póliza responda por tu carro, necesitas un todo riesgo o un amparo de daños propios.",
      },
      {
        pregunta: "¿Es más barata que un todo riesgo?",
        respuesta:
          "Por lo general sí, porque cubre menos cosas: no incluye daños propios ni hurto. El precio exacto depende de la aseguradora, del vehículo, del uso y del límite que elijas, así que conviene cotizar con los datos reales de tu carro.",
      },
      {
        pregunta: "¿Puedo pasar después de responsabilidad civil a todo riesgo?",
        respuesta:
          "Sí, al renovar o cuando quieras, si la aseguradora acepta el carro. Para el todo riesgo suelen pedir una inspección y pueden poner condiciones por la edad o el estado del vehículo. Pídelo con tiempo para no quedar días sin cobertura.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía del seguro de responsabilidad civil para carro y quiero comparar esa opción con un todo riesgo para mi carro.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1127 (seguro de responsabilidad), 1128 (costos del proceso) y 1133 (acción directa de la víctima) — ${FUENTE_CCO}`,
      "Verificar con el asesor: qué aseguradoras de las que trabaja VanTrust ofrecen pólizas solo de responsabilidad civil para carros particulares, con qué límites, deducibles y asistencias, y si las ofrecen para carros antiguos.",
      "Verificar con el asesor: planes intermedios disponibles (por ejemplo, RC más pérdida total o hurto) en las aseguradoras con las que trabaja VanTrust.",
      "Verificar con el asesor: que la RC por lesiones opere en exceso del SOAT en las pólizas que ofrece VanTrust.",
    ],
  },

  // 8. Camión de carga
  {
    slug: "seguro-para-camion-de-carga",
    titulo: "¿Qué cubre un seguro para camión de carga y qué se exige a los transportadores?",
    title: "Seguro para camión de carga: qué cubre y qué exige la ley",
    description:
      "Seguro para camión de carga, turbo o tractocamión: todo riesgo de pesados, responsabilidad civil y lo que la ley exige al transportador. Cotiza aquí.",
    respuesta:
      "Un seguro para camión de carga cubre el vehículo y los daños que cause a otros: pérdida parcial y total, hurto, responsabilidad civil extracontractual y asistencias para pesados, según la póliza. No cubre la mercancía que lleva, que necesita su propio seguro de transporte. Si transportas mercancías peligrosas, el Decreto 1079 de 2015 exige además una póliza de responsabilidad civil extracontractual.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el tractocamión de la Cordialidad",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Rafael vive en Malambo y tiene un tractocamión con el que mueve contenedores entre el puerto de Barranquilla y bodegas de la zona. La empresa que le da los viajes le pedía que la carga fuera asegurada, y él pensaba que con eso todo estaba cubierto.",
          },
          {
            tipo: "p",
            texto:
              "Una noche, en la Cordialidad, una llanta reventó y el tractocamión se salió de la vía. Golpeó la fachada de un local y el cabezote quedó muy dañado. La carga llegó bien a su destino en otro vehículo.",
          },
          {
            tipo: "p",
            texto:
              "Ahí entendió la diferencia. El seguro de la mercancía no tenía nada que ver con su vehículo ni con el local. Por suerte, unos meses antes un asesor le había recomendado un todo riesgo para pesados con responsabilidad civil. Esa póliza respondió por el daño a la fachada, con el amparo de responsabilidad civil, y por la reparación del cabezote, descontando el deducible. Sin ella, habría tenido que pagar el arreglo del vehículo y el daño a terceros mientras el tractocamión, su fuente de ingresos, estaba parado.",
          },
          {
            tipo: "p",
            texto:
              "La lección: en un vehículo de carga hay tres riesgos distintos: el vehículo, los daños a terceros y la mercancía. Cada uno se asegura por separado.",
          },
        ],
      },
      {
        titulo: "¿Qué es un seguro para camión de carga y en qué se diferencia del seguro de la mercancía?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El seguro para camión de carga es la póliza de automóviles que protege al vehículo pesado y a su dueño frente a los daños que cause. El seguro de transporte de mercancías protege la carga que el camión lleva. Son pólizas distintas y una no reemplaza a la otra.",
          },
          {
            tipo: "tabla",
            caption: "Los tres riesgos de un vehículo de carga y cómo se aseguran",
            columnas: ["Riesgo", "Qué protege", "Póliza que lo cubre"],
            filas: [
              ["El vehículo", "El camión, el turbo, el cabezote o el semirremolque frente a choques, volcamientos, hurto y otros eventos.", "Todo riesgo de vehículos pesados."],
              ["Los daños a terceros", "Carros, personas, casas, locales o infraestructura que el vehículo afecte.", "Responsabilidad civil extracontractual, incluida en el todo riesgo o como póliza aparte."],
              ["La mercancía", "La carga que se transporta, propia o de terceros.", "Seguro de transporte de mercancías."],
              ["Las personas lesionadas", "Gastos médicos de los heridos en un accidente de tránsito.", "El SOAT, que es obligatorio, y en exceso la responsabilidad civil según la póliza."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Para la carga, lee la guía «¿Qué cubre el seguro de transporte de mercancías?». Si tienes varios vehículos, la guía «¿Cómo asegurar la flota de vehículos de una empresa?» explica la póliza colectiva.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre un todo riesgo para vehículos pesados?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un todo riesgo para pesados cubre, según la póliza, los mismos riesgos que el de un carro: daños, hurto y responsabilidad civil, pero ajustados a un vehículo que trabaja en carretera y cuesta más repararlo. Estos son los amparos que encuentras en muchas pólizas:",
          },
          {
            tipo: "lista",
            items: [
              "Pérdida parcial por daños: reparación del vehículo después de un choque o un volcamiento, con deducible.",
              "Pérdida total por daños: cuando repararlo cuesta tanto que la aseguradora paga el valor del vehículo.",
              "Hurto total y parcial: robo del vehículo o de partes, según la póliza.",
              "Responsabilidad civil extracontractual: daños a otros vehículos, a bienes y a personas, hasta el límite contratado. En pesados conviene un límite alto, porque un vehículo grande puede causar daños grandes.",
              "Asistencias para pesados: grúa con capacidad para el vehículo, ayuda en carretera y asistencia jurídica, con los límites de la póliza.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Revisa también qué partes quedan cubiertas. En un tractocamión, el cabezote y el semirremolque son vehículos distintos: confirma si la póliza cubre los dos o si hay que declararlos por separado. Lo mismo con la carrocería, el furgón, la refrigeración o el rastreo satelital: lo que no esté declarado puede no estar cubierto.",
          },
          {
            tipo: "p",
            texto:
              "Si el vehículo es nuevo o lo compraste con crédito, la financiera pedirá que la póliza esté endosada a su favor. La guía «Seguro de carro financiado: ¿puedo elegir la aseguradora o me toca la del banco?» explica cómo funciona el endoso.",
          },
        ],
      },
      {
        titulo: "¿Qué seguros le exige la ley a un transportador de carga en Colombia?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Para cualquier vehículo es obligatorio el SOAT. Además, la ley exige seguros específicos en ciertos casos, como el transporte de mercancías peligrosas o de carga extradimensionada, y permite al Gobierno exigir otros al transportador.",
          },
          {
            tipo: "lista",
            items: [
              "El artículo 994 del Código de Comercio dice que, cuando el Gobierno lo exija, el transportador debe tomar, por cuenta propia o por cuenta del propietario de la carga, un seguro que cubra a las personas y las cosas transportadas contra los riesgos inherentes al transporte.",
              "Mercancías peligrosas: según el artículo 2.2.1.7.8.5.1 del Decreto 1079 de 2015, la empresa de servicio público de transporte de carga, o el remitente que usa vehículos propios, debe tener una póliza de responsabilidad civil extracontractual que cubra daños personales, daños materiales y contaminación causados por la mercancía en un accidente. Los artículos siguientes fijan la cobertura y los valores mínimos, expresados en salarios mínimos mensuales legales vigentes.",
              "Carga extradimensionada: para el permiso de transporte de carga extradimensionada, el artículo 9, literal h, de la Resolución 4959 de 2006 del Ministerio de Transporte pide una póliza de responsabilidad civil extracontractual.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Fuera de esos casos, muchas exigencias vienen de los contratos. Las empresas de transporte y los generadores de carga suelen pedir al dueño del vehículo que tenga responsabilidad civil con un límite mínimo, todo riesgo o pólizas específicas antes de darle viajes. Pide esas condiciones por escrito y verifica que tu póliza las cumpla.",
          },
        ],
      },
      {
        titulo: "¿Qué revisar antes de asegurar un camión, un turbo o una tractomula?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Antes de asegurar, ten claros el uso, las rutas, quién maneja y qué te exigen tus clientes. Con esa información el asesor puede comparar pólizas que de verdad te sirvan.",
          },
          {
            tipo: "pasos",
            items: [
              "Declara el uso real: carga propia, servicio público de carga para terceros o vinculación a una empresa de transporte.",
              "Indica las rutas habituales, por ejemplo puerto de Barranquilla, Cartagena, Santa Marta o viajes al interior, y confirma que las asistencias funcionen en carretera.",
              "Define el valor asegurado del vehículo, de la carrocería y de los equipos instalados, al día con su valor real.",
              "Elige un límite de responsabilidad civil acorde con lo que te exigen tus contratos y con el daño que podría causar un vehículo pesado.",
              "Verifica que cada conductor tenga licencia vigente de la categoría que corresponde al vehículo. Manejar sin la licencia adecuada es una exclusión común.",
              "Lee las exclusiones y pregunta cómo trata la póliza el sobrepeso, el transporte de mercancías peligrosas y el uso de conductores no autorizados.",
              "Si llevas carga de terceros, asegura la mercancía con su propia póliza.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si tienes un accidente, avisa a la aseguradora cuanto antes: la ley da tres días desde que conoces el siniestro y la póliza puede ampliar ese plazo (artículo 1075 del Código de Comercio). En VanTrust un asesor compara opciones para vehículos de carga en varias aseguradoras y te acompaña en el trámite si hay un siniestro.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de la mercancía cubre los daños de mi camión?",
        respuesta:
          "No. El seguro de transporte de mercancías protege la carga. Los daños del camión y los que este cause a otros se cubren con un todo riesgo para pesados o con una póliza de responsabilidad civil. Son pólizas distintas y conviene tener las dos.",
      },
      {
        pregunta: "¿Es obligatorio tener póliza de responsabilidad civil para un camión?",
        respuesta:
          "El SOAT sí es obligatorio. La responsabilidad civil es obligatoria por ley en casos como el transporte de mercancías peligrosas o de carga extradimensionada, y muchas empresas de transporte y generadores de carga la exigen en sus contratos aunque la ley no lo pida.",
      },
      {
        pregunta: "¿Se puede asegurar una tractomula vieja?",
        respuesta:
          "Muchas veces sí, aunque algunas aseguradoras ponen límites por la edad del vehículo o piden inspección y condiciones especiales. Si no consigues un todo riesgo, al menos asegura la responsabilidad civil, que es el riesgo más grande de un vehículo pesado.",
      },
      {
        pregunta: "¿La póliza del camión cubre a cualquier conductor?",
        respuesta:
          "Depende de la póliza. Algunas cubren a cualquier conductor autorizado por el dueño y otras piden registrar a los conductores. En todos los casos, el conductor debe tener licencia vigente de la categoría que corresponde al vehículo.",
      },
      {
        pregunta: "¿Puedo asegurar varios camiones en una sola póliza?",
        respuesta:
          "Sí, muchas aseguradoras ofrecen pólizas colectivas para flotas, con una sola fecha de renovación y condiciones comunes. Cada aseguradora define desde cuántos vehículos la ofrece, así que conviene comparar la colectiva con pólizas individuales.",
      },
    ],
    ramoRuta: "/pymes/transporte-de-mercancias",
    waMensaje:
      "Hola, leí la guía del seguro para camión de carga y quiero cotizar el seguro de mi vehículo de carga.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, art. 994 (seguro que debe tomar el transportador cuando el Gobierno lo exija) — ${FUENTE_CCO_ALCALDIA} y ${FUENTE_CCO}`,
      `Verificar con el asesor: Decreto 1079 de 2015, arts. 2.2.1.7.8.5.1 a 2.2.1.7.8.5.5 (RCE obligatoria para el transporte de mercancías peligrosas por carretera, cobertura y valores mínimos en SMMLV), según el listado de seguros obligatorios de RC de Fasecolda — ${FUENTE_FASECOLDA_RC_OBLIGATORIOS}`,
      `Verificar con el asesor: Resolución 4959 de 2006 del Ministerio de Transporte, art. 9, literal h (RCE para el permiso de carga extradimensionada), según el listado de Fasecolda — ${FUENTE_FASECOLDA_RC_OBLIGATORIOS}`,
      `Verificar con el asesor: Código de Comercio, art. 1075 (aviso del siniestro en tres días) — ${FUENTE_CCO}`,
      "Verificar con el asesor: si el listado de Fasecolda está vigente y si hay otras pólizas obligatorias para empresas de servicio público de transporte de carga por carretera (no se encontró una exigencia general en las fuentes consultadas).",
      "Verificar con el asesor: cómo tratan las aseguradoras con las que trabaja VanTrust el semirremolque, el sobrepeso, los límites de edad del vehículo y los conductores en las pólizas de pesados.",
    ],
  },
];
