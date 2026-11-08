// Guías de siniestros: qué hacer cuando ya pasó algo. Es el diferencial de
// VanTrust: el asesor acompaña el trámite. Casos ilustrativos rotulados; las
// normas citadas se verificaron en Función Pública (ver `todo` de cada guía).

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FP_CODIGO_COMERCIO =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102";
const FP_LEY_769 = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5557";
const FP_LEY_1328 = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=36841";
const FP_LEY_1480 = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306";

export const GUIAS_SINIESTROS: Guia[] = [
  // 1. Qué hacer si chocas
  {
    slug: "que-hacer-si-chocas",
    titulo: "¿Qué hacer si chocas? Paso a paso para no complicar la reclamación",
    title: "Qué hacer si chocas: paso a paso con tu seguro",
    description:
      "Qué hacer después de un choque: seguridad, fotos, acuerdo en choques simples y aviso a la aseguradora en 3 días. Si chocaste, escríbele a tu asesor.",
    respuesta:
      "Si chocas, primero ponte a salvo y revisa si hay heridos. Si solo hay daños materiales, toma fotos y datos, retira los carros de la vía y no aceptes culpa ni firmes acuerdos sin consultar. Luego avisa a tu aseguradora: la ley te da tres días desde que conociste el siniestro.",
    secciones: [
      {
        titulo: "Caso ilustrativo: un choque por detrás en la Circunvalar",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Andrés vive en Barranquilla y va a su trabajo por la Circunvalar. Tiene una póliza de autos con cobertura de daños y de responsabilidad civil. Una tarde de tráfico pesado frena y el carro de atrás le pega en el bómper. Nadie sale herido.",
          },
          {
            tipo: "p",
            texto:
              "El otro conductor se baja nervioso y le propone arreglarlo \"entre los dos\" y firmar un papel en ese momento. Andrés prefiere no firmar nada. Toma fotos de los dos carros, de las placas y del lugar, anota los datos del otro conductor y su aseguradora, y los dos orillan los carros para no bloquear la vía. Esa misma noche le escribe a su asesor y avisa a la aseguradora.",
          },
          {
            tipo: "p",
            texto:
              "Con las fotos y los datos, la aseguradora puede estudiar el caso sin discusiones sobre cómo fue el golpe. La lección: en un choque los primeros minutos definen qué pruebas vas a tener. Lo que no fotografías ni anotas allí, después es difícil de demostrar.",
          },
        ],
      },
      {
        titulo: "Paso a paso después de un choque",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Ponte a salvo. Prende las luces de parqueo, pon las señales de carretera si estás en una vía rápida y sal del carro solo si es seguro.",
              "Revisa si hay heridos. Si los hay, llama a la línea de emergencias 123 y no muevas a nadie. En ese caso no retires los vehículos hasta que llegue la autoridad.",
              "Si solo hay daños, toma fotos y datos antes de mover los carros (ver la lista de abajo).",
              "Retira los carros de la vía. En choques sin heridos la ley obliga a hacerlo de inmediato, después de recoger las pruebas.",
              "No aceptes culpa ni firmes acuerdos en el sitio. Di lo que pasó, sin juicios.",
              "Avisa a tu aseguradora y a tu asesor lo antes posible, dentro de los tres días siguientes.",
              "Guarda todo: fotos, videos, datos de testigos, el informe de tránsito si lo hubo y los mensajes con el otro conductor.",
            ],
          },
        ],
      },
      {
        titulo: "Choques simples: sin heridos, el acuerdo es entre las partes",
        bloques: [
          {
            tipo: "p",
            texto:
              "El Código Nacional de Tránsito (Ley 769 de 2002), en su artículo 143, modificado por el artículo 16 de la Ley 2251 de 2022, regula los accidentes en los que solo hay daños materiales. Dice que los conductores, las aseguradoras y demás interesados recogen las pruebas con herramientas técnicas y tecnológicas, como fotos y videos, y que ese material reemplaza el informe de accidente de tránsito (el IPAT, conocido como croquis).",
          },
          {
            tipo: "p",
            texto:
              "La misma norma dice que, estén o no asegurados los carros, los conductores deben retirarlos de inmediato junto con todo lo que interrumpa el tránsito, y acudir a un centro de conciliación autorizado por el Ministerio de Justicia si no se ponen de acuerdo. Si la conciliación fracasa, cualquiera puede acudir a los demás mecanismos de justicia. Para esa conciliación no se necesita el informe de tránsito.",
          },
          {
            tipo: "p",
            texto:
              "Si no hay conciliación posible en el sitio, el agente de tránsito que atienda el caso levanta el informe (artículo 144). Cuando el choque puede constituir un delito, como pasa si hay heridos o muertos, el artículo 149 manda al agente a levantar el informe con sus detalles. Según la Corte Constitucional, firmarlo no significa aceptar los hechos y puedes dejar tus observaciones por escrito.",
          },
          {
            tipo: "p",
            texto:
              "Si hay lesionados, el SOAT del vehículo atiende los gastos médicos de las víctimas; es un dato para que sepas qué pasa con ellos, aparte de tu póliza voluntaria.",
          },
        ],
      },
      {
        titulo: "Fotos y datos que debes tomar",
        bloques: [
          {
            tipo: "tabla",
            caption: "Qué registrar en el sitio del choque",
            columnas: ["Qué", "Para qué sirve"],
            filas: [
              ["Foto general de los carros en la posición en que quedaron", "Muestra cómo fue el golpe antes de moverlos."],
              ["Fotos de cerca de cada daño, en los dos carros", "Permite estimar la reparación y descartar daños viejos."],
              ["Placas de todos los vehículos", "Identifica a los involucrados."],
              ["Señales, semáforos, marcas en la vía y el sitio exacto", "Ayuda a entender quién tenía la prelación."],
              ["Nombre, cédula, teléfono y licencia del otro conductor", "Para contactarlo y para la reclamación."],
              ["Aseguradora y número de póliza del otro carro, si tiene", "La reclamación puede ir contra su seguro de responsabilidad civil."],
              ["Datos de testigos", "Un tercero da peso a tu versión."],
              ["Video corto del lugar y, si tienes, de la cámara del carro", "Complementa las fotos."],
            ],
          },
        ],
      },
      {
        titulo: "Avisar a la aseguradora: el plazo de tres días",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 1075 del Código de Comercio dice que el asegurado debe avisar a la aseguradora la ocurrencia del siniestro dentro de los tres días siguientes a la fecha en que lo conoció o debió conocerlo. Las partes pueden ampliar ese plazo en la póliza, pero no reducirlo. Revisa en tu póliza si tienes un plazo mayor.",
          },
          {
            tipo: "p",
            texto:
              "El aviso no es lo mismo que la reclamación. El aviso cuenta que pasó algo; la reclamación es cuando presentas los documentos para que te paguen. Si te demoras en avisar, el artículo 1078 permite a la aseguradora descontar de la indemnización los perjuicios que ese retraso le haya causado. Por eso conviene avisar rápido aunque todavía no tengas todos los papeles.",
          },
          {
            tipo: "p",
            texto:
              "Si tienes asesor, escríbele también. En VanTrust el asesor te acompaña en el aviso y en la reclamación, te dice qué documentos pide tu aseguradora y hace seguimiento al trámite.",
          },
        ],
      },
      {
        titulo: "Lo que no debes hacer",
        bloques: [
          {
            tipo: "lista",
            items: [
              "No aceptes culpa en el sitio ni por escrito. Que la culpa la definan las pruebas o la conciliación.",
              "No firmes acuerdos de pago ni compromisos sin consultar con tu aseguradora o tu asesor. Muchas pólizas dicen que no debes reconocer responsabilidad, pagar o transigir con el otro sin autorización de la aseguradora.",
              "No pagues en efectivo al otro conductor para \"arreglar ahí mismo\" si piensas usar tu seguro.",
              "No dejes los carros bloqueando la vía en un choque sin heridos; puede costarte un comparendo.",
              "No muevas los carros si hay heridos.",
              "No mandes el carro a reparar antes de que la aseguradora lo autorice, salvo lo que la póliza permita.",
              "No te vayas del lugar sin los datos del otro conductor.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Tengo que esperar al agente de tránsito si el choque fue simple?",
        respuesta:
          "No, si solo hay daños materiales. La ley pide recoger las pruebas, retirar los carros y, si no hay acuerdo, ir a un centro de conciliación. Si hay heridos, sí debe intervenir la autoridad.",
      },
      {
        pregunta: "¿Cuánto tiempo tengo para avisar a la aseguradora?",
        respuesta:
          "El Código de Comercio fija tres días desde que conociste o debiste conocer el siniestro. Tu póliza puede darte más tiempo, nunca menos.",
      },
      {
        pregunta: "¿Puedo arreglar el choque con el otro conductor sin usar el seguro?",
        respuesta:
          "Sí, pero antes de firmar algo consulta con tu asesor. Si después quieres usar la póliza, un acuerdo hecho sin la aseguradora puede complicar la reclamación.",
      },
      {
        pregunta: "¿Qué pasa si el otro conductor no tiene seguro?",
        respuesta:
          "Si tu póliza tiene cobertura de daños a tu carro, puedes reclamar por ella, pagando el deducible si aplica. La aseguradora podrá luego cobrarle al responsable lo que pagó.",
      },
      {
        pregunta: "¿Firmar el informe de tránsito es aceptar la culpa?",
        respuesta:
          "No. La Corte Constitucional aclaró que firmarlo no significa aceptar los hechos y que puedes escribir tus observaciones.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje: "Hola, leí la guía de qué hacer si chocas. Tuve un choque y necesito ayuda con el aviso a la aseguradora.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Ley 769 de 2002, art. 143 (modificado por el art. 16 de la Ley 2251 de 2022), arts. 144 y 149 y la nota de la Sentencia C-429 de 2003 sobre la firma del informe — ${FP_LEY_769}`,
      `Verificar con el asesor: Código de Comercio, arts. 1075 (aviso en tres días) y 1078 (reducción por incumplimiento) — ${FP_CODIGO_COMERCIO}`,
      "Verificar con el asesor: la cláusula de no reconocer responsabilidad ni transigir sin autorización, en las pólizas de las aseguradoras con las que trabaja VanTrust (se dejó en general: \"muchas pólizas\").",
      "Verificar con el asesor: el tipo de comparendo por no retirar el vehículo en un choque simple (se omitió el código y el valor por no tener fuente oficial).",
    ],
  },

  // 2. Carro inundado en un arroyo de Barranquilla
  {
    slug: "carro-inundado-arroyo-barranquilla-seguro",
    titulo: "¿El seguro cubre si un arroyo de Barranquilla daña tu carro?",
    title: "¿El seguro cubre si un arroyo daña tu carro?",
    description:
      "Si un arroyo de Barranquilla daña tu carro, la cobertura depende de tu póliza y de cómo pasó. Qué hacer y qué evitar. Revisa tu póliza con tu asesor.",
    respuesta:
      "Depende de tu póliza: muchas pólizas de autos todo riesgo cubren los daños por eventos de la naturaleza, como inundaciones, pero cada una tiene sus condiciones y exclusiones. Si el arroyo arrastró o inundó el carro sin que tú lo expusieras, la reclamación suele ser más clara; si decidiste meterte al arroyo, la aseguradora puede discutir que hubo culpa grave. No enciendas el motor, documenta y avisa en tres días.",
    secciones: [
      {
        titulo: "Caso ilustrativo: dos carros, el mismo aguacero",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Una familia del norte de Barranquilla tiene dos carros asegurados con póliza todo riesgo. Un aguacero fuerte convierte la calle en arroyo. El primer carro está parqueado frente a la casa: el agua sube, entra a la cabina y lo mueve contra un andén. El segundo lo maneja el hijo, que viene de la universidad, ve el arroyo corriendo y decide cruzarlo \"porque otros pasaron\". El carro se apaga a mitad de camino.",
          },
          {
            tipo: "p",
            texto:
              "Con el carro parqueado, la familia no lo enciende, toma fotos y videos del agua y del nivel que alcanzó, y avisa a la aseguradora al otro día. Con el segundo carro, el hijo intenta prenderlo varias veces para salir del agua. Los dos reclaman. El primero se estudia como un evento de la naturaleza según la póliza. En el segundo, la aseguradora pregunta por qué entró al arroyo y por qué lo encendió, y esas respuestas pesan en la decisión.",
          },
          {
            tipo: "p",
            texto:
              "La lección: con el mismo aguacero, lo que hiciste antes y después cambia la reclamación. No te metas al arroyo y, si el agua ya alcanzó el carro, no lo prendas.",
          },
        ],
      },
      {
        titulo: "Cómo suelen tratar las pólizas la inundación y los eventos de la naturaleza",
        bloques: [
          {
            tipo: "p",
            texto:
              "No hay una respuesta única: depende de lo que diga tu póliza. En general, las pólizas de autos todo riesgo incluyen una cobertura de daños al carro que puede abarcar eventos de la naturaleza como inundación, terremoto o caída de árboles. Las pólizas básicas, en cambio, a veces solo cubren responsabilidad civil y no los daños a tu propio carro.",
          },
          {
            tipo: "p",
            texto:
              "El Código de Comercio, en su artículo 1105, dice que se entienden excluidos del seguro, entre otros, los daños por erupciones volcánicas, temblores de tierra u otras convulsiones de la naturaleza. Por eso las pólizas que sí cubren estos eventos lo dicen de forma expresa. Busca en tu póliza la sección de coberturas y la de exclusiones, y fíjate en estas palabras: eventos de la naturaleza, inundación, anegación, fenómenos naturales.",
          },
          {
            tipo: "tabla",
            caption: "Qué revisar en tu póliza antes del invierno",
            columnas: ["Qué buscar", "Por qué importa"],
            filas: [
              ["Si tienes cobertura de daños al carro (pérdida parcial y total)", "Sin ella, la póliza no paga los daños de tu propio vehículo."],
              ["Si los eventos de la naturaleza o la inundación están cubiertos", "Algunas pólizas los incluyen y otras no."],
              ["Exclusiones relacionadas con agua o con el motor", "Algunas pólizas limitan los daños al motor por entrada de agua."],
              ["Deducible para pérdida parcial y total", "Es la parte del daño que pagas tú."],
              ["Plazo para avisar el siniestro", "La ley fija tres días, la póliza puede dar más."],
            ],
          },
        ],
      },
      {
        titulo: "Por qué meterte en un arroyo puede complicar la reclamación",
        bloques: [
          {
            tipo: "p",
            texto:
              "En Barranquilla los arroyos son un riesgo conocido: cuando llueve fuerte, las autoridades piden no cruzarlos. Si decides entrar con el carro, la aseguradora puede analizar si esa decisión fue una imprudencia grave.",
          },
          {
            tipo: "p",
            texto:
              "El artículo 1055 del Código de Comercio dice que el dolo, la culpa grave y los actos meramente potestativos del asegurado son inasegurables, y que cualquier pacto en contrario no produce efecto. En palabras simples: el seguro cubre lo inesperado, no lo que provocas con una imprudencia grave. Si la aseguradora considera que meterte al arroyo fue culpa grave, puede objetar la reclamación. Cada caso se estudia con sus hechos, por eso no se puede decir de antemano cómo terminará.",
          },
          {
            tipo: "p",
            texto:
              "Además, el artículo 1074 obliga al asegurado, una vez ocurrido el siniestro, a evitar que el daño se extienda. Encender el motor inundado puede agravar el daño, y el artículo 1078 permite a la aseguradora descontar los perjuicios que cause el incumplimiento de las obligaciones del asegurado.",
          },
        ],
      },
      {
        titulo: "Qué hacer si el agua alcanzó tu carro",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Ponte a salvo primero. Un arroyo puede arrastrar un carro; tu vida vale más que el vehículo.",
              "No enciendas el motor ni intentes prenderlo otra vez si se apagó. El agua dentro del motor puede dañarlo más al encenderlo.",
              "Cuando el agua baje, toma fotos y videos: el nivel que alcanzó el agua en el carro y en la calle, el interior, el tablero y el lugar.",
              "Guarda pruebas del aguacero, como noticias o alertas de ese día, y anota la hora y el sitio.",
              "Avisa a tu aseguradora y a tu asesor dentro de los tres días siguientes. Pregunta si envían grúa y a qué taller llevarlo.",
              "No lleves el carro a un taller por tu cuenta antes de que la aseguradora lo autorice, salvo que tu póliza lo permita.",
              "Cuenta los hechos tal como pasaron. Decir la verdad protege tu reclamación.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Mi póliza todo riesgo cubre inundación?",
        respuesta:
          "Muchas pólizas todo riesgo incluyen eventos de la naturaleza, pero no todas ni con las mismas condiciones. Revisa coberturas y exclusiones con tu asesor.",
      },
      {
        pregunta: "¿Qué pasa si el carro estaba parqueado cuando lo inundó el arroyo?",
        respuesta:
          "Si tu póliza cubre eventos de la naturaleza, ese caso suele ser más claro porque tú no te expusiste. Igual debes documentar y avisar a tiempo.",
      },
      {
        pregunta: "¿Me pueden negar la reclamación si crucé el arroyo?",
        respuesta:
          "Pueden objetarla si consideran que hubo culpa grave, que la ley declara inasegurable. Depende de los hechos de cada caso.",
      },
      {
        pregunta: "¿Puedo intentar prender el carro para sacarlo del agua?",
        respuesta:
          "No es recomendable. Encender un motor con agua puede agravar el daño, y la ley te obliga a evitar que el daño crezca.",
      },
      {
        pregunta: "¿Cuánto tiempo tengo para avisar?",
        respuesta:
          "Tres días desde que conociste el siniestro, según el Código de Comercio, salvo que tu póliza te dé más.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje: "Hola, leí la guía de los arroyos y quiero revisar si mi póliza de carro cubre inundación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1055 (culpa grave inasegurable), 1074 (evitar extensión del siniestro), 1075 (aviso), 1078 (reducción) y 1105 (riesgos catastróficos excluidos salvo pacto) — ${FP_CODIGO_COMERCIO}`,
      "Verificar con el asesor: cómo tratan la inundación, los eventos de la naturaleza y el daño al motor por entrada de agua las pólizas de autos de las aseguradoras con las que trabaja VanTrust (se dejó en general).",
      "Verificar con el asesor: si cabe citar alguna alerta oficial de la Alcaldía de Barranquilla sobre no cruzar arroyos (se dejó sin cita por no tener fuente).",
    ],
  },

  // 3. Robo del carro
  {
    slug: "que-hacer-si-roban-tu-carro-seguro",
    titulo: "¿Qué hacer si te roban el carro y tienes seguro?",
    title: "Qué hacer si te roban el carro y tienes seguro",
    description:
      "Si te roban el carro: denuncia, aviso a la aseguradora, documentos, pérdida total por hurto y traspaso. Te explicamos los tiempos. Habla con tu asesor.",
    respuesta:
      "Si te roban el carro, llama al 123, pon la denuncia ante la autoridad y avisa a tu aseguradora dentro de los tres días siguientes. Si tu póliza cubre hurto y el carro no aparece en el plazo que fija la póliza, se tramita como pérdida total: entregas los documentos, traspasas el carro a la aseguradora y ella paga dentro del mes siguiente a que acredites tu derecho.",
    secciones: [
      {
        titulo: "Caso ilustrativo: un carro que no amaneció en Soledad",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Luis tiene un negocio en Soledad y usa su carro todos los días. Lo deja parqueado en la calle una noche y en la mañana ya no está. Tiene una póliza todo riesgo con cobertura de hurto.",
          },
          {
            tipo: "p",
            texto:
              "Ese mismo día llama al 123, pone la denuncia y le escribe a su asesor, que le explica qué sigue y le manda la lista de documentos de su aseguradora. Luis los va reuniendo mientras corre el plazo que fija su póliza para ver si el carro aparece. Como no aparece, firma los formularios de traspaso a la aseguradora y le pagan la indemnización según la póliza, descontando el deducible.",
          },
          {
            tipo: "p",
            texto:
              "Si Luis solo hubiera tenido responsabilidad civil, nadie le habría pagado el carro. La lección: el hurto se cubre solo si lo contrataste, y el trámite avanza más rápido si denuncias y avisas el mismo día.",
          },
        ],
      },
      {
        titulo: "Los primeros pasos",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Confirma que no fue una grúa de tránsito o un parqueadero. Si no, llama al 123 para reportar el hurto lo antes posible.",
              "Pon la denuncia penal ante la autoridad competente. Describe cómo, cuándo y dónde pasó, e identifica el carro: marca, línea, placa, número de motor y de chasis.",
              "Avisa a tu aseguradora dentro de los tres días siguientes y pide el número del caso.",
              "Escríbele a tu asesor para que te acompañe en el trámite.",
              "Si en el carro había documentos, tarjetas o llaves de tu casa, toma medidas: bloquea tarjetas y cambia guardas si hace falta.",
              "Si el carro tiene crédito o leasing, avisa al banco.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El plazo de tres días para avisar está en el artículo 1075 del Código de Comercio y corre desde que conociste o debiste conocer el hurto. La póliza puede darte más tiempo, nunca menos.",
          },
        ],
      },
      {
        titulo: "Documentos que suelen pedir",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cada aseguradora tiene su lista y puede pedir documentos adicionales. Estos son los que se piden con frecuencia en una reclamación por hurto total:",
          },
          {
            tipo: "tabla",
            caption: "Documentos habituales en una reclamación por hurto del carro",
            columnas: ["Documento", "Para qué sirve"],
            filas: [
              ["Copia de la denuncia penal", "Prueba el hurto y sus circunstancias."],
              ["Certificación de la Fiscalía con el número del caso y si el carro se recuperó", "Confirma que el carro sigue sin aparecer."],
              ["Licencia de tránsito (tarjeta de propiedad) o documento que acredite la propiedad", "Muestra quién es el dueño."],
              ["Cédula del asegurado; si es empresa, certificado de Cámara de Comercio", "Identifica a quien reclama."],
              ["Formularios firmados de traspaso a la aseguradora y de cancelación de la matrícula", "Permiten pasarle el carro a la aseguradora."],
              ["Paz y salvo o recibos de impuestos del vehículo", "El traspaso exige estar al día."],
              ["Las llaves del carro", "Muchas aseguradoras las piden."],
              ["Si hay crédito o leasing, certificación del saldo de la deuda", "Define cuánto se le paga al banco y cuánto a ti."],
              ["Formulario de conocimiento del cliente (SARLAFT) y datos de la cuenta", "Requisitos para hacer el pago."],
            ],
          },
        ],
      },
      {
        titulo: "Cómo funciona la pérdida total por hurto y el traspaso",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cuando el carro no aparece, la reclamación se tramita como pérdida total por hurto. En muchas pólizas hay un plazo de espera desde la denuncia para ver si la autoridad recupera el carro; ese plazo lo fija cada póliza. Mientras tanto, reúne los documentos para no perder tiempo.",
          },
          {
            tipo: "p",
            texto:
              "Para pagar, la aseguradora pide que el carro pase a su nombre. Por eso firmas el traspaso a favor de ella. La lógica es simple: si te paga el carro, el carro pasa a ser suyo, y si aparece después, la aseguradora decide qué hacer con él. El artículo 1096 del Código de Comercio dice además que la aseguradora que paga queda con tus derechos contra los responsables del siniestro, hasta lo que pagó.",
          },
          {
            tipo: "p",
            texto:
              "El valor que te pagan depende de lo que diga tu póliza: el valor asegurado, el valor de referencia del carro según la póliza y el deducible de pérdida total por hurto. Si el carro tiene crédito o leasing, primero se paga al banco y el saldo, si queda, te llega a ti.",
          },
        ],
      },
      {
        titulo: "Los tiempos del trámite",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Aviso: dentro de los tres días siguientes a que conociste el hurto (art. 1075 del Código de Comercio).",
              "Espera para ver si el carro aparece: según lo que fije tu póliza.",
              "Reclamación: cuando entregas los documentos que prueban el hurto y el valor de la pérdida (art. 1077).",
              "Pago: la aseguradora debe pagar dentro del mes siguiente a la fecha en que acreditas tu derecho; si se demora, debe pagar intereses de mora (art. 1080).",
              "Plazo para reclamar judicialmente: la prescripción ordinaria es de dos años desde que conociste el hecho (art. 1081). No dejes pasar el tiempo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si la aseguradora te pide más documentos, entrégalos rápido y por escrito, y guarda la constancia. Si la reclamación se objeta, revisa la guía sobre qué hacer si la aseguradora no quiere pagar.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Mi seguro cubre el robo del carro?",
        respuesta:
          "Solo si tu póliza incluye la cobertura de hurto. Las pólizas que solo tienen responsabilidad civil no pagan tu carro.",
      },
      {
        pregunta: "¿Cuánto se demora el pago por robo?",
        respuesta:
          "Primero corre el plazo de espera que fije tu póliza. Después, la aseguradora tiene un mes para pagar desde que acreditas tu derecho con los documentos completos.",
      },
      {
        pregunta: "¿Qué pasa si encuentran el carro después de que me pagaron?",
        respuesta:
          "Como lo traspasaste a la aseguradora, el carro es de ella. Si aparece antes del pago, la póliza dice cómo sigue el trámite.",
      },
      {
        pregunta: "¿Por qué tengo que traspasar el carro a la aseguradora?",
        respuesta:
          "Porque la aseguradora te paga el valor del carro. Si te paga, el carro pasa a ser suyo.",
      },
      {
        pregunta: "¿Qué pasa si el carro tiene crédito?",
        respuesta:
          "La indemnización se paga primero al banco hasta el saldo de la deuda, si el banco figura como beneficiario. Lo que sobre es para ti.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje: "Hola, leí la guía de robo de carro. Me robaron el carro y necesito ayuda con la reclamación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1075 (aviso), 1077 (carga de la prueba), 1080 (pago en un mes e intereses de mora), 1081 (prescripción) y 1096 (subrogación) — ${FP_CODIGO_COMERCIO}`,
      "Verificar con el asesor: la lista de documentos para hurto total de las aseguradoras con las que trabaja VanTrust. La tabla se basó en el checklist público de indemnizaciones de autos de La Previsora (https://www.previsora.gov.co/documents/d/guest/fogsa006-checklistindemnizacionessegurodeautomvilesdaoshurtoyobligacionesfinancierasv2); lo de las llaves es práctica común, confirmarlo.",
      "Verificar con el asesor: el plazo de espera antes de declarar la pérdida total por hurto en las pólizas con las que trabaja VanTrust (se omitió el número de días por no tener fuente oficial).",
      "Verificar con el asesor: el canal exacto para poner la denuncia por hurto de vehículo en Barranquilla (Fiscalía, Policía, denuncia virtual). Se dejó como \"la autoridad competente\".",
    ],
  },

  // 4. La aseguradora no quiere pagar
  {
    slug: "aseguradora-no-paga-siniestro-que-hacer",
    titulo: "¿Qué hacer si la aseguradora no quiere pagar tu reclamación?",
    title: "Qué hacer si la aseguradora no quiere pagar",
    description:
      "Si tu aseguradora objetó o no responde: plazos, cómo responder, Defensor del Consumidor Financiero, Superfinanciera y prescripción. Habla con tu asesor.",
    respuesta:
      "Primero pide la objeción por escrito y revisa sus razones contra tu póliza: muchas se resuelven entregando el documento o la prueba que faltaba. Si no estás de acuerdo, puedes acudir gratis al Defensor del Consumidor Financiero de la aseguradora, poner una queja ante la Superintendencia Financiera o demandar. Hazlo a tiempo: la acción prescribe, por regla general, a los dos años.",
    secciones: [
      {
        titulo: "Caso ilustrativo: una papelería del centro y una reclamación objetada",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Marta tiene una papelería en el centro de Barranquilla, asegurada con una póliza para su negocio. Una noche le roban mercancía y equipos. Avisa a la aseguradora, presenta la reclamación y, semanas después, recibe una carta: la reclamación se objeta porque no demostró el valor de lo robado.",
          },
          {
            tipo: "p",
            texto:
              "Marta piensa en dejarlo así. Su asesor lee la carta con ella y ve que el problema es de pruebas: faltaban facturas y el inventario. Marta las consigue, el asesor ayuda a armar una respuesta por escrito, punto por punto, y la aseguradora vuelve a estudiar el caso. Si la aseguradora hubiera mantenido la objeción, Marta todavía tenía el Defensor del Consumidor Financiero y la Superintendencia Financiera.",
          },
          {
            tipo: "p",
            texto:
              "La lección: una objeción no siempre es el final. Lee las razones, responde con pruebas y no dejes que se venzan los plazos.",
          },
        ],
      },
      {
        titulo: "Qué te deben demostrar y qué debes demostrar tú",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 1077 del Código de Comercio reparte la carga de la prueba. A ti te toca demostrar que el siniestro ocurrió y cuánto perdiste. A la aseguradora le toca demostrar los hechos que la eximen, por ejemplo una exclusión de la póliza.",
          },
          {
            tipo: "p",
            texto:
              "Según el artículo 1080, la aseguradora debe pagar dentro del mes siguiente a la fecha en que acreditas tu derecho, aun fuera de un juicio, es decir, cuando demuestras la ocurrencia y la cuantía. Si no paga en ese plazo, debe reconocer intereses de mora.",
          },
          {
            tipo: "p",
            texto:
              "Si la aseguradora no quiere pagar, debe objetar. El artículo 1053 dice que, si pasa un mes desde que entregaste la reclamación con los comprobantes que pide la póliza y la aseguradora no la objeta de manera seria y fundada, la póliza presta mérito ejecutivo: puedes cobrarla con un proceso ejecutivo. Por eso es importante tener constancia de la fecha en que entregaste la reclamación completa.",
          },
        ],
      },
      {
        titulo: "Razones frecuentes de objeción",
        bloques: [
          {
            tipo: "tabla",
            caption: "Por qué se objeta una reclamación y qué puedes hacer",
            columnas: ["Razón", "Qué hacer"],
            filas: [
              ["Faltan pruebas de la ocurrencia o del valor de la pérdida", "Entrega lo que falta: facturas, fotos, peritajes, denuncia, cotizaciones."],
              ["El evento está en una exclusión de la póliza", "Lee la exclusión exacta y compárala con los hechos. La aseguradora debe probar que aplica."],
              ["Aviso tardío", "Por regla general, la ley permite descontar los perjuicios que causó el retraso, no negar todo por eso solo; la mala fe sí hace perder el derecho. Revisa el caso con tu asesor."],
              ["Reticencia o inexactitud al contratar", "Revisa qué te preguntaron al contratar y qué respondiste (ver la sección siguiente)."],
              ["Póliza no vigente o prima sin pagar", "Revisa fechas de vigencia, pagos y comunicaciones de la aseguradora."],
            ],
          },
        ],
      },
      {
        titulo: "La reticencia: cuando la objeción es por lo que declaraste",
        bloques: [
          {
            tipo: "p",
            texto:
              "Al contratar, debes declarar con sinceridad los hechos que determinan el riesgo, según el cuestionario que te presente la aseguradora. Así lo dice el artículo 1058 del Código de Comercio. Si callaste u omitiste algo (reticencia) o lo dijiste de forma inexacta, y eso habría hecho que la aseguradora no contratara o cobrara más, el seguro puede ser anulado (nulidad relativa).",
          },
          {
            tipo: "p",
            texto:
              "Hay matices importantes. Si el error fue inculpable, el contrato no es nulo, pero la aseguradora paga solo un porcentaje según la prima que correspondía. Y las sanciones no aplican si la aseguradora conocía o debía conocer esos hechos antes de contratar, o si después los aceptó. Esto aplica a cualquier tipo de seguro: autos, vida, salud, hogar o pymes. Por eso, al contratar, responde completo y guarda copia de tu declaración.",
          },
        ],
      },
      {
        titulo: "Paso a paso si te objetan o no te pagan",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Pide la respuesta por escrito, con las razones y las cláusulas de la póliza en que se basa.",
              "Revisa tu póliza completa, incluidas las condiciones generales y las exclusiones. Tu asesor puede leerla contigo.",
              "Responde por escrito a la aseguradora, punto por punto, con las pruebas que falten. Guarda la constancia de entrega.",
              "Si sigues en desacuerdo, presenta una queja ante el Defensor del Consumidor Financiero de la aseguradora. Es gratis para ti y puede actuar como conciliador.",
              "También puedes poner una queja ante la Superintendencia Financiera de Colombia, que vigila a las aseguradoras.",
              "Si quieres una decisión de fondo, puedes demandar ante un juez o ante la Superintendencia Financiera, que tiene funciones jurisdiccionales para estos conflictos. Para eso conviene un abogado.",
              "Lleva la cuenta del tiempo: la prescripción no espera.",
            ],
          },
        ],
      },
      {
        titulo: "Defensor del Consumidor Financiero, Superfinanciera y prescripción",
        bloques: [
          {
            tipo: "p",
            texto:
              "La Ley 1328 de 2009, en su artículo 13, obliga a las entidades vigiladas a tener un Defensor del Consumidor Financiero. Debe atender de forma oportuna, resolver gratis y con objetividad las quejas sobre posibles incumplimientos de la entidad, ser tu vocero ante ella y actuar como conciliador si lo pides. El artículo 14 excluye algunos asuntos, entre ellos los que ya estén en un juicio, los hechos de hace tres años o más y los que superen cien salarios mínimos mensuales.",
          },
          {
            tipo: "p",
            texto:
              "La misma ley reconoce tu derecho a presentar quejas ante la entidad, el Defensor y la Superintendencia Financiera. Además, el artículo 57 de la Ley 1480 de 2011 permite a los consumidores financieros llevar a la Superintendencia Financiera, con facultades de juez, las controversias sobre el cumplimiento de los contratos de seguro.",
          },
          {
            tipo: "p",
            texto:
              "Ojo con los plazos. El artículo 1081 del Código de Comercio fija una prescripción ordinaria de dos años, que corre desde que tuviste o debiste tener conocimiento del hecho, y una extraordinaria de cinco años desde que nace el derecho. Las partes no pueden cambiar esos plazos. Si el tiempo corre, consulta a un abogado sobre cómo interrumpirlo.",
          },
          {
            tipo: "p",
            texto:
              "En VanTrust el asesor te acompaña: lee la objeción contigo, te ayuda a reunir las pruebas y hace seguimiento con la aseguradora. No podemos garantizarte el resultado, pero sí que no vas a hacer el trámite solo.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuánto tiempo tiene la aseguradora para pagarme?",
        respuesta:
          "Un mes desde que acreditas la ocurrencia del siniestro y la cuantía de la pérdida. Si se pasa, debe pagar intereses de mora.",
      },
      {
        pregunta: "¿Qué es una objeción de la reclamación?",
        respuesta:
          "Es la respuesta en la que la aseguradora dice por qué no va a pagar. La ley exige que sea seria y fundada.",
      },
      {
        pregunta: "¿Cuánto cobra el Defensor del Consumidor Financiero?",
        respuesta:
          "Nada. La Ley 1328 de 2009 dice que resuelve las quejas de forma gratuita para el consumidor.",
      },
      {
        pregunta: "¿Hasta cuándo puedo reclamar?",
        respuesta:
          "Por regla general, dos años desde que conociste el hecho (prescripción ordinaria), con un máximo de cinco años desde que nació el derecho (extraordinaria).",
      },
      {
        pregunta: "¿Me pueden anular la póliza por algo que no dije al contratar?",
        respuesta:
          "Sí, si callaste o dijiste mal algo que habría cambiado la decisión de la aseguradora. Si fue un error inculpable, el contrato sigue, pero te pagan menos.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje: "Hola, leí la guía de reclamaciones. La aseguradora objetó mi reclamación y quiero que me ayuden a revisarla.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1053 num. 3 (mérito ejecutivo si no hay objeción seria y fundada en un mes), 1058 (reticencia), 1077 (carga de la prueba), 1078 (reducción por incumplimiento), 1080 (pago en un mes e intereses de mora) y 1081 (prescripción) — ${FP_CODIGO_COMERCIO}`,
      `Verificar con el asesor: Ley 1328 de 2009, arts. 5 (derecho a presentar quejas), 13 (funciones del Defensor) y 14 (asuntos exceptuados, incluido el tope de 100 SMMLV; confirmar que siga vigente así) — ${FP_LEY_1328}`,
      `Verificar con el asesor: Ley 1480 de 2011, art. 57 (funciones jurisdiccionales de la Superintendencia Financiera) — ${FP_LEY_1480}`,
      "Verificar con el asesor: el canal actual para poner quejas ante la Superintendencia Financiera y los plazos del Defensor para responder (se omitieron por no tener fuente oficial a la mano).",
      "Guía transversal (autos, vida, salud, hogar, pymes). Se dejó ramoRuta en /seguros/automoviles por instrucción; evaluar si conviene otro ramo o enlazarla desde las páginas de pymes.",
    ],
  },

  // 5. Qué hacer si se incendia tu negocio
  {
    slug: "que-hacer-si-se-incendia-tu-negocio",
    titulo: "¿Qué hacer si se incendia tu negocio? Las primeras horas y el seguro",
    title: "Qué hacer si se incendia tu negocio: guía con tu seguro",
    description:
      "Qué hacer si se incendia tu negocio: seguridad, evitar más daños, inventario, aviso en 3 días y ajustador. Si te pasó, escríbele a tu asesor de VanTrust.",
    respuesta:
      "Si se incendia tu negocio, lo primero es sacar a las personas y llamar a los bomberos por la línea de emergencias 123. Cuando el fuego esté controlado, protege lo que quedó para que el daño no crezca, toma fotos antes de mover nada, haz el inventario de lo perdido y avisa a la aseguradora dentro de los tres días siguientes.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el cortocircuito en una tienda del centro",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Hernando tiene una tienda de ropa en el centro de Barranquilla. Hace un año tomó un seguro para pyme con cobertura de incendio para el local y la mercancía. No incluyó lucro cesante porque le pareció un gasto de más.",
          },
          {
            tipo: "p",
            texto:
              "Un domingo en la noche, un cortocircuito prende la bodega del fondo. El vigilante de la cuadra llama al 123 y los bomberos controlan el fuego. A la mañana siguiente, Hernando encuentra el techo con huecos y medio inventario mojado. En vez de botar todo, toma fotos y videos, cubre lo que quedó seco con plásticos, contrata a un cerrajero para asegurar la puerta y le escribe a su asesor, que lo ayuda a dar el aviso a la aseguradora ese mismo día.",
          },
          {
            tipo: "p",
            texto:
              "Con las facturas de proveedores y el inventario del sistema de caja, el ajustador pudo estimar la mercancía perdida, y los gastos para proteger lo que quedó entraron en la reclamación. Lo que no recuperó fueron las semanas con el local cerrado: eso solo lo cubre el lucro cesante, que no había contratado. La lección: en un incendio, lo que haces en las primeras horas y los papeles que guardas pesan tanto como la póliza.",
          },
        ],
      },
      {
        titulo: "¿Qué hacer en las primeras horas si se incendia tu negocio?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Primero las personas, después los bienes y por último el seguro. Este es el orden que conviene seguir:",
          },
          {
            tipo: "pasos",
            items: [
              "Saca a todos del local y no vuelvas a entrar por mercancía, plata o documentos. Ninguna póliza vale más que una vida.",
              "Llama a la línea de emergencias 123 para que lleguen los bomberos. Si puedes hacerlo sin riesgo, corta la energía desde el tablero principal.",
              "Cuando los bomberos den permiso, protege lo que quedó: tapa huecos en el techo o en las vitrinas, saca el agua, separa lo mojado de lo seco y pon vigilancia si el local quedó abierto.",
              "Toma fotos y videos de todo antes de mover o botar nada: fachada, techo, estantes, mercancía, máquinas y el punto donde empezó el fuego.",
              "Avisa a la aseguradora y a tu asesor. Tienes tres días desde que conociste el siniestro, pero entre antes, mejor.",
              "Pregunta a los bomberos cómo obtener una constancia de su atención; muchas aseguradoras la piden en la reclamación.",
              "Guarda las facturas de todo lo que gastes para proteger el local y la mercancía.",
              "No botes los bienes dañados hasta que el ajustador los vea o la aseguradora te autorice.",
            ],
          },
        ],
      },
      {
        titulo: "¿Qué dice la ley sobre evitar que el daño crezca?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La ley te obliga a evitar que el daño crezca y, a cambio, la aseguradora te reconoce lo que gastes razonablemente en eso. El artículo 1074 del Código de Comercio dice que, ocurrido el siniestro, el asegurado debe evitar su extensión y propagación y proveer al salvamento de las cosas aseguradas. La aseguradora se hace cargo de los gastos razonables que hagas para cumplir esa obligación, dentro de las reglas del valor de la indemnización.",
          },
          {
            tipo: "p",
            texto:
              "Si no lo haces, el artículo 1078 permite a la aseguradora descontar de la indemnización los perjuicios que te haya causado ese incumplimiento. Dicho fácil: si la mercancía que quedó seca se daña porque nadie tapó el techo antes del aguacero, esa parte puede quedar por fuera.",
          },
          {
            tipo: "lista",
            items: [
              "Plásticos, lonas y tablas para tapar techos, puertas y vitrinas.",
              "Cerrajero o vigilancia para que no se roben lo que quedó.",
              "Bombas o personal para sacar el agua que dejaron los bomberos.",
              "Traslado de la mercancía buena a otro sitio seguro.",
            ],
          },
        ],
      },
      {
        titulo: "¿Qué inventario y documentos necesitas para reclamar?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Necesitas probar qué tenías y cuánto perdiste. El artículo 1077 del Código de Comercio pone en el asegurado la carga de demostrar la ocurrencia del siniestro y la cuantía de la pérdida; la aseguradora, por su parte, debe demostrar los hechos que la excluyen.",
          },
          {
            tipo: "tabla",
            caption: "Qué reunir para la reclamación por incendio",
            columnas: ["Documento o prueba", "Para qué sirve"],
            filas: [
              ["Fotos y videos del daño, antes de limpiar", "Muestran el alcance real del incendio."],
              ["Inventario de lo perdido, con cantidades", "Es la base para calcular la mercancía afectada."],
              ["Facturas de compra y de proveedores", "Prueban qué tenías y cuánto costó."],
              ["Reportes del sistema de caja o del programa contable", "Respaldan el inventario y las ventas."],
              ["Constancia de atención de los bomberos", "Confirma el hecho, la fecha y la hora."],
              ["Cotizaciones de reparación del local y de las máquinas", "Ayudan a estimar el daño a la estructura y los equipos."],
              ["Facturas de los gastos para proteger lo que quedó", "Para que te los reconozcan según el artículo 1074."],
              ["Copia de la póliza y de sus anexos", "Para revisar coberturas, valores asegurados y deducibles."],
            ],
          },
        ],
      },
      {
        titulo: "¿Qué hace el ajustador y qué pasa con el salvamento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El ajustador revisa la pérdida y le recomienda a la aseguradora cuánto pagar según la póliza. El ajustador es el profesional que la aseguradora designa para inspeccionar el siniestro, revisar tus documentos y estimar el daño. Te visitará, te pedirá papeles y puede hacer preguntas sobre cómo empezó el fuego.",
          },
          {
            tipo: "p",
            texto:
              "El salvamento es lo que queda de los bienes asegurados después del siniestro y todavía tiene algún valor, como mercancía chamuscada que se puede rematar o una máquina que sirve por partes. En muchas pólizas, si la aseguradora paga un bien como pérdida total, ese salvamento pasa a ser de ella; si tú te lo quedas, se descuenta su valor. Revísalo en tu póliza.",
          },
          {
            tipo: "p",
            texto:
              "El artículo 1110 del Código de Comercio dice que la indemnización se paga en dinero o mediante la reposición, reparación o reconstrucción de la cosa asegurada, a opción de la aseguradora. Y el artículo 1080 le da un mes para pagar desde que acreditas tu derecho; si se pasa, debe intereses de mora.",
          },
          {
            tipo: "p",
            texto:
              "Si aseguraste por menos de lo que valían tus bienes, la indemnización baja en proporción. Lo explicamos en la guía ¿Qué cubre un seguro para pyme y cómo definir el valor asegurado?",
          },
        ],
      },
      {
        titulo: "¿El seguro cubre los días que el negocio queda cerrado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Solo si contrataste lucro cesante. El lucro cesante es la cobertura que reconoce la utilidad que dejas de ganar y los gastos fijos que sigues pagando mientras el negocio no puede operar por un daño cubierto. El artículo 1088 del Código de Comercio dice que la indemnización puede comprender el lucro cesante, pero que este debe ser objeto de un acuerdo expreso.",
          },
          {
            tipo: "p",
            texto:
              "Si no está en tu póliza, la aseguradora paga el daño material, pero no los arriendos, nóminas ni ventas perdidas mientras reparas. Para entender cuándo vale la pena, lee ¿Qué es el lucro cesante en un seguro y cuándo vale la pena para tu negocio? Y si después del incendio te objetan la reclamación, revisa ¿Qué hacer si la aseguradora no quiere pagar tu reclamación?",
          },
          {
            tipo: "p",
            texto:
              "En VanTrust el asesor te acompaña desde el aviso hasta el pago: te dice qué documentos pide tu aseguradora, está pendiente de la visita del ajustador y hace seguimiento al trámite.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo limpiar el local antes de que llegue el ajustador?",
        respuesta:
          "Puedes y debes hacer lo necesario para que el daño no crezca, como tapar el techo o sacar el agua. Pero antes toma fotos y videos de todo, y no botes los bienes dañados hasta que la aseguradora los vea o te autorice a hacerlo.",
      },
      {
        pregunta: "¿Me pagan si el incendio empezó por un cortocircuito?",
        respuesta:
          "En muchas pólizas el incendio accidental se cubre aunque haya empezado por una falla eléctrica. Lo que suele necesitar una cobertura aparte es el daño interno de equipos eléctricos o electrónicos sin que haya fuego. Revisa las exclusiones de tu póliza con el asesor.",
      },
      {
        pregunta: "¿Qué pasa si el fuego vino del local de al lado?",
        respuesta:
          "Tu aseguradora responde por tu daño según tu póliza. Si paga, la ley le permite cobrarle después al responsable lo que pagó, porque se subroga en tus derechos. No tienes que esperar a que el vecino o su seguro te paguen primero.",
      },
      {
        pregunta: "¿Me descuentan algo de lo que pagan por el incendio?",
        respuesta:
          "Normalmente sí: el deducible que dice tu póliza y, si aseguraste por debajo del valor real, la proporción del infraseguro. También puede descontarse el salvamento que te quedes. Pídele al asesor que te explique la cuenta antes de firmar el finiquito.",
      },
    ],
    ramoRuta: "/pymes/todo-riesgo-pyme",
    waMensaje:
      "Hola, leí la guía de qué hacer si se incendia tu negocio. Tuve un incendio en mi local y necesito ayuda con la reclamación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1074 (evitar la extensión del siniestro y gastos razonables), 1075 (aviso en tres días), 1077 (carga de la prueba), 1078 (reducción por incumplimiento), 1080 (pago en un mes), 1088 (lucro cesante por acuerdo expreso), 1096 (subrogación) y 1110 (pago en dinero o reposición a opción del asegurador) — ${FP_CODIGO_COMERCIO} (texto consultado en https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr033.htm y https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr034.htm)`,
      "Verificar con el asesor: que el 123 sea la línea para pedir bomberos en Barranquilla y el área metropolitana, y si los bomberos expiden una constancia o informe de atención y cómo se pide (se dejó en general).",
      "Verificar con el asesor: cómo tratan el salvamento y el daño eléctrico sin incendio las pólizas pyme de las aseguradoras con las que trabaja VanTrust (se dejó en general: \"en muchas pólizas\").",
    ],
  },

  // 6. Daños por agua en casa
  {
    slug: "reclamar-seguro-de-hogar-danos-por-agua",
    titulo: "¿El seguro de hogar cubre los daños por agua en casa y cómo se reclaman?",
    title: "Daños por agua en casa: qué cubre el seguro y cómo reclamar",
    description:
      "Daños por agua en casa: cuándo los cubre el seguro de hogar, por qué el desgaste se excluye y cómo documentar la reclamación. Pregúntale a tu asesor.",
    respuesta:
      "Los daños por agua en casa suelen estar cubiertos por el seguro de hogar cuando vienen de un hecho súbito y accidental, como un tubo que se revienta o un techo que el viento levanta. La humedad lenta, el desgaste y la falta de mantenimiento normalmente quedan por fuera. Para reclamar, corta el agua, toma fotos, guarda la pieza dañada y avisa en tres días.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el tubo roto en un apartamento del norte",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Patricia y su esposo viven en un apartamento en el norte de Barranquilla. Tienen un seguro de hogar con contenidos. Un sábado en la madrugada se revienta el tubo que alimenta el sanitario y el agua corre por el pasillo hasta la sala. Se mojan el piso de madera, un sofá y el mueble del televisor.",
          },
          {
            tipo: "p",
            texto:
              "Patricia cierra la llave de paso, baja los tacos de la luz y toma fotos y videos antes de secar. El plomero cambia el tubo y ella guarda el pedazo roto y la factura. El lunes le escribe a su asesor y avisa a la aseguradora. Al revisar, el ajustador también ve una mancha vieja de humedad en el clóset de la habitación, que venía de meses atrás por una junta mal sellada.",
          },
          {
            tipo: "p",
            texto:
              "La aseguradora estudió el daño del tubo roto según la póliza, pero la mancha del clóset quedó por fuera: era un daño lento que nadie había arreglado. La lección: el seguro responde por lo súbito, no por lo que se deteriora con el tiempo. Y guardar la pieza rota y las fotos del primer momento hace más fácil demostrar qué pasó.",
          },
        ],
      },
      {
        titulo: "¿Qué daños por agua en casa cubre el seguro de hogar?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Por lo general cubre los daños por agua en casa que son súbitos e imprevistos, y deja por fuera los que se van formando poco a poco. Un daño súbito es el que ocurre de repente y sin que lo pudieras prever, como la rotura de un tubo. Cada póliza redacta sus coberturas a su manera, así que la tabla resume lo habitual, no una póliza concreta.",
          },
          {
            tipo: "tabla",
            caption: "Daños por agua: lo que suele cubrirse y lo que suele excluirse (según la póliza)",
            columnas: ["Origen del agua", "Suele cubrirse", "Suele quedar por fuera"],
            filas: [
              ["Tubería que se rompe", "La rotura súbita y los daños que causa el agua en pisos, paredes y contenidos.", "Fugas lentas que llevaban meses o tuberías en mal estado conocido."],
              ["Filtración", "Una filtración repentina por una avería accidental.", "Humedad, moho y manchas que se formaron con el tiempo."],
              ["Lluvia", "El agua que entra porque un vendaval o granizo dañó techo, ventanas o puertas, si la póliza cubre esos eventos.", "Goteras por impermeabilización vencida o canales tapados."],
              ["Inundación o agua desde la calle", "Lo que la póliza cubra como evento de la naturaleza.", "Lo que la póliza excluya o limite; revísalo en el texto."],
              ["Electrodomésticos", "El daño del agua sobre otros bienes por una rotura accidental, en muchas pólizas.", "La pieza que falló por desgaste, como la manguera vieja de la lavadora."],
              ["Agua que daña al vecino", "La responsabilidad civil familiar, si la tienes contratada.", "Daños que no te sean imputables o que excedan el límite."],
            ],
          },
        ],
      },
      {
        titulo: "¿Por qué el seguro no cubre el desgaste ni la falta de mantenimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Porque el seguro cubre riesgos, es decir, hechos inciertos, y el deterioro de una tubería vieja o de un techo sin mantenimiento es algo que se sabe que va a pasar. El artículo 1104 del Código de Comercio dice que la avería, merma o pérdida de una cosa que proviene de su vicio propio no está comprendida en el riesgo que asume la aseguradora.",
          },
          {
            tipo: "p",
            texto:
              "El vicio propio es, según ese mismo artículo, el germen de destrucción o deterioro que llevan las cosas por su propia naturaleza o destino. El desgaste normal de un tubo o de una impermeabilización entra en esa idea. Además, la mayoría de las pólizas de hogar excluyen de forma expresa los daños por falta de mantenimiento.",
          },
          {
            tipo: "p",
            texto:
              "En Barranquilla esto pesa en temporada de lluvias: los aguaceros llegan de golpe y encuentran techos con canales y bajantes tapados. Limpiarlos antes del invierno no es solo prevención; también evita una objeción. Para el panorama completo de coberturas, lee ¿Qué cubre un seguro de hogar y qué no?",
          },
        ],
      },
      {
        titulo: "¿Qué hacer apenas descubres el daño por agua?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Detén el agua, protege tu casa y deja pruebas. La ley te obliga a evitar que el daño crezca (artículo 1074 del Código de Comercio), y la aseguradora reconoce los gastos razonables que hagas para eso.",
          },
          {
            tipo: "pasos",
            items: [
              "Cierra la llave de paso del apartamento o de la casa.",
              "Si el agua llegó a enchufes o aparatos, baja los tacos de la luz antes de tocar nada.",
              "Toma fotos y videos del origen del agua y de todo lo mojado antes de secar o mover.",
              "Saca el agua y pon a secar lo que se pueda; levanta muebles y tapetes del piso.",
              "Llama a un plomero o usa la asistencia de tu póliza, si la tienes. Pídele que deje por escrito la causa del daño.",
              "Guarda la pieza que se rompió: el tubo, la manguera o el registro.",
              "Avisa a la aseguradora y a tu asesor dentro de los tres días siguientes (artículo 1075).",
              "Si el agua pasó al apartamento de un vecino, avísale y avisa también a la administración del edificio.",
            ],
          },
        ],
      },
      {
        titulo: "¿Cómo documentar la reclamación para que no te la objeten?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Demuestra que el daño fue súbito y cuánto vale. El artículo 1077 del Código de Comercio pone en ti la carga de probar la ocurrencia del siniestro y la cuantía de la pérdida.",
          },
          {
            tipo: "lista",
            items: [
              "Fotos y videos con fecha del momento del daño, no solo de después.",
              "La pieza rota y el informe o la factura del plomero que diga la causa.",
              "Lista de los bienes afectados con marca, referencia y, si tienes, factura o foto de compra.",
              "Cotizaciones de reparación del piso, las paredes o los muebles.",
              "Facturas de los gastos de emergencia, como plomería o secado.",
              "Si vives en edificio, la comunicación con la administración, sobre todo si el tubo es de una zona común.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si el tubo que se rompió es de una zona común del edificio, puede responder el seguro de la copropiedad en vez del tuyo; pregúntalo en la administración. Y si te objetan la reclamación, revisa ¿Qué hacer si la aseguradora no quiere pagar tu reclamación? En VanTrust el asesor te acompaña en el aviso y en el trámite.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Me pagan la impermeabilización del techo si hay goteras?",
        respuesta:
          "Por lo general no. Impermeabilizar es mantenimiento, y la mayoría de las pólizas excluyen los daños por desgaste o falta de cuidado. Distinto es si un vendaval levantó el techo y entró agua: ese daño súbito puede estar cubierto si la póliza incluye ese evento.",
      },
      {
        pregunta: "¿Puedo llamar al plomero sin esperar a la aseguradora?",
        respuesta:
          "Sí. Detener el agua es tu obligación y no tienes que esperar. Antes toma fotos, guarda la pieza rota y pide factura. Si tu póliza tiene asistencia de plomería, usarla deja el servicio registrado y puede ahorrarte el pago, según los límites del plan.",
      },
      {
        pregunta: "¿Qué pasa si el agua vino del apartamento de arriba?",
        respuesta:
          "Tu seguro de hogar puede pagar tu daño según tu póliza y después cobrarle al responsable. También puedes reclamarle al vecino o a su seguro de responsabilidad civil. Toma fotos del techo, avisa a la administración y deja todo por escrito.",
      },
      {
        pregunta: "Vivo en arriendo, ¿quién responde si se moja el apartamento?",
        respuesta:
          "Los daños al inmueble suelen tocarle al seguro del propietario, si lo tiene. Tus muebles y electrodomésticos los cubre un seguro de contenidos a tu nombre. Si el daño lo causaste tú, entra tu responsabilidad civil. Avisa siempre al propietario de inmediato.",
      },
    ],
    ramoRuta: "/seguros/hogar",
    waMensaje:
      "Hola, leí la guía de daños por agua en casa. Se me rompió un tubo y quiero saber si mi seguro de hogar lo cubre.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1074 (evitar la extensión del siniestro), 1075 (aviso en tres días), 1077 (carga de la prueba) y 1104 (vicio propio) — ${FP_CODIGO_COMERCIO} (texto consultado en https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr033.htm y https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr034.htm)`,
      "Verificar con el asesor: cómo tratan las pólizas de hogar que comercializa VanTrust la rotura de tuberías, las filtraciones, la lluvia por techo dañado y el agua desde la calle (la tabla se dejó en general).",
      "Verificar con el asesor: cuándo responde el seguro de la copropiedad por tuberías de zonas comunes. No se citó la Ley 675 de 2001 por no haberla verificado.",
    ],
  },

  // 7. Siniestro de la póliza de cumplimiento
  {
    slug: "siniestro-poliza-de-cumplimiento-que-pasa",
    titulo: "¿Qué pasa en un siniestro de la póliza de cumplimiento cuando la entidad declara el incumplimiento?",
    title: "Siniestro de la póliza de cumplimiento: qué pasa ahora",
    description:
      "Siniestro de la póliza de cumplimiento: audiencia, multas, cláusula penal, recursos y qué te cobra la aseguradora después. Habla con tu asesor de VanTrust.",
    respuesta:
      "El siniestro de la póliza de cumplimiento ocurre cuando la entidad estatal, por acto administrativo, declara el incumplimiento, impone una multa o declara la caducidad, y ordena el pago al contratista y a la aseguradora. Antes debe citarte a una audiencia donde te defiendes. Si la aseguradora paga, después puede cobrarte a ti lo que pagó.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la obra en Soledad que se atrasó con las lluvias",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Javier es contratista de obras en Soledad. Gana un contrato con una entidad municipal para adecuar un parque y entrega la póliza de cumplimiento que le piden. En plena temporada de lluvias, la obra se atrasa varias semanas y la supervisión reporta el retraso.",
          },
          {
            tipo: "p",
            texto:
              "La entidad lo cita a una audiencia por un posible incumplimiento y cita también a la aseguradora. Javier le avisa a su asesor ese mismo día y llega a la audiencia con la bitácora de obra, las actas donde quedaron registrados los días de lluvia y los correos en los que había pedido ajustar el cronograma.",
          },
          {
            tipo: "p",
            texto:
              "La entidad aceptó parte de la justificación e impuso una multa solo por los días que no estaban soportados. Javier la pagó directamente, así que la aseguradora no tuvo que pagar ni cobrarle después, y su historial con ella quedó limpio para las siguientes pólizas. La lección: el siniestro se decide en la audiencia, y quien llega con pruebas tiene con qué defenderse.",
          },
        ],
      },
      {
        titulo: "¿Qué es el siniestro de la póliza de cumplimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El siniestro de la póliza de cumplimiento es, en la contratación estatal, el acto administrativo con el que la entidad declara el incumplimiento, impone multas o declara la caducidad del contrato. Así lo dice el artículo 2.2.1.2.3.1.19 del Decreto 1082 de 2015, que regula cómo se hacen efectivas las garantías.",
          },
          {
            tipo: "p",
            texto:
              "Dos términos que vas a oír: la multa es la sanción en dinero pactada en el contrato para presionar al contratista a cumplir mientras el contrato sigue; la cláusula penal es el valor pactado de antemano como estimación de los perjuicios si el contratista incumple. Las dos se pueden cobrar con cargo a la póliza si así se pactaron.",
          },
          {
            tipo: "tabla",
            caption: "Cómo se hace efectiva la garantía según el Decreto 1082 de 2015",
            columnas: ["Situación", "Qué hace la entidad", "Qué significa para la póliza"],
            filas: [
              ["Caducidad", "Declara la caducidad por acto administrativo y ordena el pago al contratista y al garante.", "Ese acto constituye el siniestro."],
              ["Multas", "Impone las multas por acto administrativo y ordena el pago al contratista y al garante.", "Ese acto constituye el siniestro."],
              ["Incumplimiento", "Declara el incumplimiento, cuantifica los perjuicios y puede hacer efectiva la cláusula penal si está pactada.", "Ese acto es la reclamación a la aseguradora."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Si quieres repasar cómo funciona la póliza antes de llegar a este punto, lee ¿Qué es una póliza de cumplimiento y cuándo la piden en una licitación?",
          },
        ],
      },
      {
        titulo: "¿Cómo es la audiencia por incumplimiento del artículo 86 de la Ley 1474 de 2011?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Es el procedimiento que la entidad debe seguir antes de imponer una multa, una sanción o declarar el incumplimiento, y en él puedes defenderte. El artículo 86 de la Ley 1474 de 2011 lo organiza así:",
          },
          {
            tipo: "pasos",
            items: [
              "Citación: cuando hay un posible incumplimiento, la entidad cita al contratista a audiencia. La citación debe describir los hechos, acompañar el informe de interventoría o supervisión y señalar las normas o cláusulas posiblemente violadas y sus consecuencias. Si la garantía es una póliza, la aseguradora también se cita.",
              "Audiencia: el jefe de la entidad o su delegado presenta los hechos. Después, tú y la aseguradora pueden presentar descargos, rendir explicaciones, aportar pruebas y controvertir las de la entidad.",
              "Decisión: la entidad decide en la misma audiencia, con resolución motivada, si impone o no la multa, la sanción o la declaratoria de incumplimiento.",
              "Recurso: contra esa decisión solo procede el recurso de reposición, que se interpone, sustenta y decide en la misma audiencia.",
              "Suspensión o cierre: la entidad puede suspender la audiencia para practicar pruebas, y puede dar por terminado el procedimiento si sabe que cesó el incumplimiento.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Ese último punto importa: si logras ponerte al día mientras avanza el procedimiento, la entidad puede terminarlo.",
          },
        ],
      },
      {
        titulo: "¿Qué puedes hacer cuando te citan a audiencia?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Prepárate con pruebas y no vayas solo. La audiencia es tu oportunidad de explicar el retraso o el incumplimiento, y lo que no presentes ahí es difícil de hacer valer después.",
          },
          {
            tipo: "lista",
            items: [
              "Avísale de inmediato a tu asesor y a la aseguradora; ella también fue citada y le conviene que la defensa sea coordinada.",
              "Reúne la bitácora de obra, las actas de comité, los informes de supervisión y los correos con la entidad.",
              "Documenta las causas que no dependían de ti: lluvias, cambios de diseño, demoras en pagos o en permisos.",
              "Considera acompañarte de un abogado en contratación estatal.",
              "Si puedes corregir el incumplimiento, hazlo y demuéstralo durante el procedimiento.",
              "En la audiencia, si no estás de acuerdo, interpón y sustenta el recurso de reposición ahí mismo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si la decisión queda en firme y sigues en desacuerdo, el camino es la jurisdicción de lo contencioso administrativo. Los plazos para demandar son cortos, así que consúltalo pronto con tu abogado.",
          },
        ],
      },
      {
        titulo: "¿Qué hace la aseguradora con el contratista después de pagar?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Te cobra lo que pagó. El artículo 1096 del Código de Comercio dice que la aseguradora que paga una indemnización se subroga, por ministerio de la ley y hasta el monto pagado, en los derechos del asegurado contra los responsables del siniestro. En la póliza de cumplimiento, el responsable es el contratista.",
          },
          {
            tipo: "p",
            texto:
              "La subrogación es el derecho que adquiere la aseguradora, al pagar, de cobrarle al responsable lo que pagó. La contragarantía es el respaldo que el contratista le firma a la aseguradora al expedir la póliza, por ejemplo un pagaré o un contrato con codeudores, para que ese cobro sea más fácil. Por eso el estudio para expedir la póliza revisa tu capacidad financiera, como se explica en Requisitos para sacar una póliza de cumplimiento.",
          },
          {
            tipo: "p",
            texto:
              "Además, si la garantía se reduce porque la entidad la hizo efectiva, el artículo 2.2.1.2.3.1.18 del Decreto 1082 de 2015 dice que la entidad debe pedirte que la restablezcas a su valor inicial. Un siniestro pagado también pesa en tu historial cuando pidas nuevas pólizas. Por eso, si puedes pagar tú la multa o corregir el incumplimiento a tiempo, suele ser mejor que dejar que pague la aseguradora.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿La aseguradora puede negarse a pagar si la entidad ya declaró el incumplimiento?",
        respuesta:
          "Tiene poco margen. El artículo 2.2.1.2.3.2.6 del Decreto 1082 de 2015 dice que la aseguradora no puede defenderse de la entidad alegando la conducta del contratista, como inexactitudes al contratar el seguro, ni otras excepciones que tenga contra él. Por eso su defensa se juega en la audiencia.",
      },
      {
        pregunta: "¿Me pueden multar si el atraso fue por las lluvias?",
        respuesta:
          "Te pueden citar, pero en la audiencia puedes demostrar que el retraso no dependió de ti. Las actas, la bitácora y los reportes que dejen constancia de los días de lluvia son tu mejor prueba. La entidad decide con lo que se presente ahí.",
      },
      {
        pregunta: "Si pago la multa yo mismo, ¿la aseguradora queda por fuera?",
        respuesta:
          "Si pagas lo que ordenó la entidad, la aseguradora no tiene que pagar y no hay nada que cobrarte después. Avísale a la aseguradora y a tu asesor, y guarda el soporte del pago para cerrar el tema con todos.",
      },
      {
        pregunta: "¿Qué pasa con mis contragarantías si no hubo siniestro?",
        respuesta:
          "Siguen respaldando la póliza mientras esté vigente, incluidos los amparos que duran después de terminar el contrato. Cuando la póliza vence sin reclamaciones, pregúntale a la aseguradora cómo se liberan, según lo que firmaste.",
      },
    ],
    ramoRuta: "/pymes/polizas-de-cumplimiento",
    waMensaje:
      "Hola, leí la guía del siniestro de la póliza de cumplimiento. Me citaron a una audiencia por incumplimiento y necesito orientación.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Ley 1474 de 2011, art. 86 (procedimiento para multas, sanciones y declaratorias de incumplimiento: citación al contratista y al garante, audiencia, resolución motivada, solo recurso de reposición, suspensión y terminación si cesa el incumplimiento) — https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=43292 (texto consultado en https://normativa.colpensiones.gov.co/colpens/docs/ley_1474_2011.htm)",
      "Verificar con el asesor: Decreto 1082 de 2015, arts. 2.2.1.2.3.1.18 (restablecimiento de la garantía), 2.2.1.2.3.1.19 (efectividad de las garantías: caducidad, multas e incumplimiento con cláusula penal) y 2.2.1.2.3.2.6 (inoponibilidad de excepciones de la aseguradora; en la copia consultada aparece impreso como 2.2.1.1.3.2.6) — https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77653 (texto consultado en https://normativa.colpensiones.gov.co/colpens/docs/decreto_1082_2015.htm)",
      `Verificar con el asesor: Código de Comercio, art. 1096 (subrogación del asegurador que paga) — ${FP_CODIGO_COMERCIO} (texto consultado en https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr033.htm)`,
      "Verificar con el asesor: el plazo para demandar ante lo contencioso administrativo (no se puso por no haber verificado el CPACA).",
      "Verificar con el asesor: el tipo de contragarantías que piden las aseguradoras con las que trabaja VanTrust y cómo se liberan (se dejó en general).",
    ],
  },
];
