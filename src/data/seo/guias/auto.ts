// Guías de auto (todo riesgo y flotas). Ver docs/brief-guias.md.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FUENTE_CCO =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102";
const FUENTE_FASECOLDA_FAQ =
  "https://www.fasecolda.com/ramos/automoviles/preguntas-frecuentes/";
const FUENTE_FASECOLDA_GUIA = "https://www.fasecolda.com/guia-de-valores/";

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
        titulo: "Los amparos de un todo riesgo",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cada aseguradora arma su producto con nombres distintos, pero en muchas pólizas encuentras estos amparos:",
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
        titulo: "Qué cubre y qué no suele cubrir",
        bloques: [
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
        titulo: "Cuándo un choque es pérdida total",
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
        titulo: "Cómo revisar tu póliza en diez minutos",
        bloques: [
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
          "Depende de la póliza. Muchas aseguradoras trabajan con talleres en convenio y algunas permiten otros talleres con condiciones. Pregúntalo al cotizar.",
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
        titulo: "Qué es el deducible",
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
        titulo: "Cómo se calcula: un ejemplo con números",
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
        titulo: "Prima o deducible: cómo encontrar el equilibrio",
        bloques: [
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
        titulo: "Preguntas para hacerle al asesor",
        bloques: [
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
          "Depende de la aseguradora. Lo más común es ajustarlo en la renovación. Pregunta a tu asesor qué opciones tienes.",
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
        titulo: "Los factores que mueven la prima",
        bloques: [
          {
            tipo: "p",
            texto:
              "Fasecolda explica que el valor del carro no es la única variable para fijar el precio de un seguro, y que para el asegurador la variable más significativa no es el carro sino la persona. Estos son los factores que suelen pesar:",
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
        titulo: "La guía de valores de Fasecolda y el valor asegurado",
        bloques: [
          {
            tipo: "p",
            texto:
              "Fasecolda publica una guía de valores con el valor comercial promedio de los vehículos que circulan en Colombia. Se actualiza cada mes y su uso es voluntario: es una referencia, no una norma. Cada carro tiene un código Fasecolda que aparece en la póliza.",
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
        titulo: "Cómo bajar la prima sin quedar mal cubierto",
        bloques: [
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
        titulo: "Por qué no te damos un precio aquí",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cualquier precio publicado en una página sería un número que no aplica a tu carro ni a ti. Con los datos de tu vehículo, quién lo maneja y cómo lo usas, un asesor de VanTrust te cotiza con varias de las aseguradoras con las que trabajamos y te explica por qué una cuesta más que otra.",
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
        titulo: "Póliza colectiva o pólizas individuales",
        bloques: [
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
        titulo: "Qué revisar antes de asegurar la flota",
        bloques: [
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
        titulo: "Qué pasa con los conductores",
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
        titulo: "Mantener la póliza al día",
        bloques: [
          {
            tipo: "p",
            texto:
              "Una flota cambia: entran vehículos, salen otros y cambian los usos. El artículo 1060 del Código de Comercio obliga a avisar por escrito a la aseguradora los cambios que agraven el riesgo. Si el cambio depende de ti, el aviso es con al menos diez días de anticipación.",
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
          "No. El seguro de auto cubre el vehículo y los daños a terceros. Para la carga necesitas un seguro de transporte de mercancías.",
      },
      {
        pregunta: "¿Puedo asegurar en la misma póliza carros y camiones?",
        respuesta:
          "Muchas veces sí, aunque cada tipo de vehículo puede tener condiciones y tarifas distintas dentro de la misma póliza. Depende de la aseguradora.",
      },
      {
        pregunta: "¿Qué pasa si un vehículo de reparto está asegurado como particular?",
        respuesta:
          "Es un riesgo. Si la aseguradora encuentra que el uso real era distinto al declarado, puede objetar la reclamación. Corrige el uso cuanto antes.",
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
];
