// Guías de seguros para personas y familias: salud, vida, hogar, arriendo,
// cambio de aseguradora e intermediarios. Ver docs/brief-guias.md.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

export const GUIAS_PERSONAS: Guia[] = [
  // 1. Salud complementaria a la EPS
  {
    slug: "seguro-de-salud-si-ya-tengo-eps",
    titulo: "¿Vale la pena un seguro de salud si ya tengo EPS?",
    title: "¿Vale la pena un seguro de salud si ya tengo EPS?",
    description:
      "Plan complementario, prepagada o póliza de salud: en qué se diferencian, qué pasa con las preexistencias y para quién conviene. Te asesoramos gratis.",
    respuesta:
      "Un seguro de salud no reemplaza a tu EPS: se suma a ella y te da otra red de clínicas y especialistas, con condiciones distintas de acceso y comodidad. Vale la pena si quieres más opciones para atenderte y puedes pagarlo sin descuidar tu cotización, pero antes debes revisar tres cosas: qué preexistencias te excluyen, qué periodos de carencia tiene y qué red de prestadores incluye en tu ciudad.",
    secciones: [
      {
        titulo: "Caso ilustrativo: Mariana y la cita con el especialista",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Mariana tiene 38 años, es contadora y vive en el norte de Barranquilla. Cotiza a su EPS desde que empezó a trabajar y nunca pensó en otro plan. Un día empezó a sentir dolores en la rodilla después de jugar fútbol los sábados y quiso ver a un ortopedista lo antes posible.",
          },
          {
            tipo: "p",
            texto:
              "Por la EPS el proceso pasaba por la consulta de medicina general y la autorización. Ella quería escoger la clínica y el especialista. Ahí entendió que no tenía esa opción. Meses después contrató una póliza de salud. En la solicitud declaró que tenía hipotiroidismo, diagnosticado años atrás. La aseguradora lo dejó como preexistencia excluida y le explicó que algunas coberturas, como maternidad, tenían un periodo de carencia.",
          },
          {
            tipo: "p",
            texto:
              "Lección práctica: el seguro de salud sí le dio más opciones para atenderse, pero no cubre todo desde el primer día ni cubre lo que ya tenías. Por eso conviene contratarlo cuando estás sano y leer la lista de exclusiones antes de firmar, no después.",
          },
        ],
      },
      {
        titulo: "¿Qué diferencia hay entre plan complementario, prepagada y póliza de salud?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Los tres son planes voluntarios que se suman a tu EPS; cambian en quién los ofrece, quién los vigila y cómo funcionan. En Colombia estas tres opciones se llaman planes voluntarios de salud. El Decreto 780 de 2016 dice que los pagan los particulares con su propio dinero y que los ofrecen las EPS, las empresas de medicina prepagada y las aseguradoras. Las tres se suman a tu EPS; ninguna la reemplaza.",
          },
          {
            tipo: "tabla",
            caption: "Las tres opciones de salud voluntaria, en términos generales",
            columnas: ["", "Plan complementario", "Medicina prepagada", "Póliza de salud"],
            filas: [
              ["Quién lo ofrece", "Tu propia EPS.", "Una empresa de medicina prepagada.", "Una compañía de seguros."],
              ["Quién lo vigila", "Superintendencia Nacional de Salud.", "Superintendencia Nacional de Salud.", "Superintendencia Financiera, como a toda aseguradora."],
              ["Cómo funciona", "Mejora condiciones de la EPS: comodidad, red de prestadores o servicios adicionales.", "Te da acceso a una red de médicos y clínicas adscritos al plan.", "Paga o reembolsa los gastos médicos cubiertos, según la póliza."],
              ["Qué revisar", "Si la red adicional incluye clínicas de tu ciudad.", "El directorio médico, los copagos y las exclusiones.", "Las coberturas, los topes, el deducible si lo hay y las exclusiones."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Un punto que poca gente conoce: según el mismo decreto, el usuario de un plan voluntario puede escoger, en el momento de atenderse, si usa la EPS o el plan adicional, y la entidad no puede obligarte a pasar primero por el otro.",
          },
        ],
      },
      {
        titulo: "¿Qué es una preexistencia en un seguro de salud?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Una preexistencia es una enfermedad, malformación o afección que ya existía cuando empezó el contrato. Así la define el Decreto 780 de 2016 para los planes voluntarios. Lo normal es que la entidad la excluya o la cubra con condiciones especiales.",
          },
          {
            tipo: "lista",
            items: [
              "Declara todo con sinceridad. En los seguros, el Código de Comercio sanciona la reticencia o la inexactitud en la declaración del estado del riesgo y puede anular el contrato.",
              "Las exclusiones deben estar escritas en el contrato. Si una exclusión no está escrita, no te la pueden oponer.",
              "Al renovar con la misma entidad, no te pueden agregar como preexistencias enfermedades distintas a las que tenías antes del contrato inicial.",
              "Los factores de riesgo, como hábitos o condiciones genéticas, no pueden ser el único fundamento para calificar algo como preexistencia.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Esto explica por qué conviene entrar joven y sano: lo que te diagnostiquen después de entrar ya no es preexistencia frente a esa entidad.",
          },
        ],
      },
      {
        titulo: "¿Qué es el periodo de carencia en un seguro de salud?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El periodo de carencia es el tiempo que debe pasar desde que entras al plan hasta que puedes usar ciertas coberturas. En muchos planes aplica a maternidad, a algunas cirugías programadas o a tratamientos específicos. Las urgencias suelen tener reglas distintas.",
          },
          {
            tipo: "p",
            texto:
              "Los plazos cambian de un plan a otro, así que no hay una cifra general. Pide que te los muestren por escrito antes de firmar y compáralos entre opciones. Si piensas tener un hijo pronto, este punto pesa más que el precio.",
          },
        ],
      },
      {
        titulo: "¿Para quién conviene?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Para quien quiere escoger clínica y especialista con más libertad.",
              "Para familias con niños pequeños, que van seguido al pediatra.",
              "Para quien puede pagar la cuota mes a mes sin dejar de cotizar a la EPS. El Decreto 780 de 2016 exige estar afiliado al régimen contributivo o a un régimen de excepción para tomar o renovar estos planes.",
              "Para quien está sano hoy y quiere entrar antes de tener diagnósticos que queden como preexistencias.",
            ],
          },
          {
            tipo: "p",
            texto:
              "No conviene si la cuota te obliga a sacrificar gastos básicos, o si la red del plan no tiene buenas opciones en tu ciudad. En Barranquilla y la Costa, revisa qué clínicas de la zona están en la red, no solo las de Bogotá o Medellín.",
          },
          {
            tipo: "pasos",
            items: [
              "Define qué buscas: especialistas, hospitalización, maternidad o atención para los niños.",
              "Pide el directorio de clínicas y médicos de tu ciudad en cada opción.",
              "Compara exclusiones, preexistencias y periodos de carencia por escrito.",
              "Revisa copagos, topes y cómo sube la cuota con la edad.",
              "Llena la declaración de salud completa y guarda una copia.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de salud reemplaza la EPS?",
        respuesta:
          "No. Los planes voluntarios se suman a la EPS. Además, para tomarlos o renovarlos debes estar afiliado al régimen contributivo, como cotizante o beneficiario, o a un régimen de excepción.",
      },
      {
        pregunta: "¿Me cubren una enfermedad que ya tengo?",
        respuesta:
          "Por lo general, lo que ya tenías al firmar queda como preexistencia, excluida o con condiciones. Debe quedar escrito en el contrato. Lo que te diagnostiquen después de entrar sí entra según las condiciones del plan.",
      },
      {
        pregunta: "¿Qué es mejor, prepagada o póliza de salud?",
        respuesta:
          "Depende de la red de prestadores en tu ciudad, las exclusiones, los copagos y el precio. Ninguna es mejor para todos. Lo útil es compararlas lado a lado con tu caso.",
      },
      {
        pregunta: "¿Al renovar me pueden poner nuevas preexistencias?",
        respuesta:
          "Con la misma entidad, no te pueden incluir como preexistencias enfermedades distintas a las que tenías antes del contrato inicial. Si te cambias a otra entidad, empiezas un contrato nuevo y lo que tengas puede quedar como preexistencia.",
      },
    ],
    ramoRuta: "/seguros/salud",
    waMensaje:
      "Hola, leí la guía del seguro de salud y quiero comparar opciones para complementar mi EPS.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Decreto 780 de 2016, arts. 2.2.4.1 a 2.2.4.6 (planes voluntarios, tipos, libre elección EPS/plan, afiliación al contributivo, renovación sin nuevas preexistencias) — https://normograma.supersalud.gov.co/compilacion/docs/decreto_0780_2016.htm",
      "Verificar con el asesor: Decreto 780 de 2016, arts. 2.2.4.1.5, 2.2.4.1.17 y 2.2.4.1.18 (vigilancia de la Supersalud a la prepagada, definición de preexistencia, exclusiones expresas) — https://normograma.supersalud.gov.co/compilacion/docs/decreto_0780_2016.htm",
      "Verificar con el asesor: Código de Comercio, art. 1058 (declaración del estado del riesgo, reticencia) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr032.html",
      "Confirmar con el asesor qué tipos de plan de salud comercializa VanTrust (pólizas de salud, prepagada o ambos) y con qué aseguradoras.",
      "Periodos de carencia: no se encontró norma general que los fije; el asesor puede agregar los de los planes que vende, con su fuente.",
    ],
  },

  // 2. Seguro de vida: cuánto asegurar
  {
    slug: "seguro-de-vida-cuanto-asegurar",
    titulo: "¿Cuánto seguro de vida necesito y quién lo necesita?",
    title: "Seguro de vida: cuánto asegurar y quién lo necesita",
    description:
      "Cuánto seguro de vida necesitas según tus deudas, tus gastos y la educación de tus hijos, y cómo se diferencia del vida deudor del banco. Asesoría gratis.",
    respuesta:
      "Necesitas un seguro de vida si alguien depende de tu ingreso o si dejarías deudas a tu familia. Para calcular cuánto asegurar, suma tus deudas, los gastos del hogar durante los años en que tu familia dependería de ti y la educación de tus hijos, y réstale tus ahorros y otros seguros. El seguro de vida deudor del banco no reemplaza este cálculo: solo paga la deuda.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la familia de Jorge en Soledad",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Jorge tenía 42 años, un taller de motos en Soledad y dos hijos en el colegio. Su esposa trabajaba medio tiempo. Habían comprado casa con un crédito hipotecario y, como lo exigía el banco, Jorge tenía un seguro de vida deudor. Él creía que con eso su familia estaba protegida.",
          },
          {
            tipo: "p",
            texto:
              "Jorge falleció en un accidente en la vía a Cartagena. El seguro de vida deudor pagó el saldo del crédito y la casa quedó libre de deuda. Eso ayudó mucho. Pero el ingreso del taller desapareció de un día para otro, y la familia siguió teniendo que pagar comida, servicios, colegio y transporte. No había otro seguro ni ahorros suficientes.",
          },
          {
            tipo: "p",
            texto:
              "Lección práctica: el vida deudor protege la deuda, que es lo que le interesa al banco. Para proteger a la familia hace falta un seguro de vida individual con un valor calculado sobre lo que esa familia necesitaría para seguir adelante.",
          },
        ],
      },
      {
        titulo: "¿Quién necesita un seguro de vida?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Quien tiene hijos o padres que dependen de su ingreso.",
              "La pareja cuyo ingreso sostiene una parte importante de los gastos del hogar.",
              "Quien tiene deudas que pasarían a su familia o que dejarían sin patrimonio a sus herederos.",
              "Dueños de negocio cuyo trabajo personal es lo que genera el ingreso de la familia.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si nadie depende de ti y no tienes deudas, probablemente no es tu prioridad. Hay planes que además cubren incapacidad total y permanente o enfermedades graves, que pueden ser útiles aunque no tengas dependientes. Eso varía según la póliza.",
          },
        ],
      },
      {
        titulo: "¿Cómo calcular cuánto seguro de vida necesitas?",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Suma tus deudas: crédito de vivienda, del carro, tarjetas y préstamos. Si alguna ya tiene seguro de vida deudor, anótalo aparte.",
              "Calcula los gastos mensuales del hogar y multiplícalos por los años en que tu familia dependería de tu ingreso. Por ejemplo, hasta que el hijo menor termine sus estudios.",
              "Suma la educación de tus hijos: lo que falta de colegio y, si quieres, la universidad.",
              "Agrega gastos finales y un colchón para imprevistos.",
              "Resta lo que ya existe: ahorros, otros seguros de vida, deudas que ya tengan seguro de vida deudor y lo que tu pareja pueda seguir aportando.",
              "El resultado es un punto de partida para el valor asegurado. Ajústalo a lo que puedas pagar de prima.",
            ],
          },
          {
            tipo: "tabla",
            caption: "Ejemplo con cifras hipotéticas: supongamos una familia con dos hijos",
            columnas: ["Concepto", "Supongamos"],
            filas: [
              ["Deudas sin seguro de vida deudor", "20 millones"],
              ["Gastos del hogar: 3 millones al mes durante 10 años", "360 millones"],
              ["Educación pendiente de los dos hijos", "100 millones"],
              ["Gastos finales e imprevistos", "20 millones"],
              ["Total de necesidades", "500 millones"],
              ["Menos ahorros y otros seguros", "100 millones"],
              ["Valor asegurado de referencia", "400 millones"],
            ],
          },
          {
            tipo: "p",
            texto:
              "Los números de la tabla son inventados para mostrar la cuenta; no son una recomendación ni un promedio. Tu cifra depende de tus gastos reales y de cuántos años quieras cubrir. Si la prima de ese valor no te cabe en el presupuesto, es mejor asegurar menos que no asegurar nada.",
          },
        ],
      },
      {
        titulo: "¿Qué diferencia hay entre el seguro de vida individual y el de vida deudor?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Diferencias entre el seguro de vida individual y el de vida deudor",
            columnas: ["", "Vida individual", "Vida deudor"],
            filas: [
              ["A quién le paga", "A los beneficiarios que tú designas.", "Al banco o entidad que te prestó."],
              ["Cuánto paga", "El valor asegurado que escogiste.", "El saldo de la deuda, según la póliza."],
              ["Para qué sirve", "Para que tu familia mantenga su nivel de vida.", "Para que la deuda no pase a tu familia."],
              ["Quién lo exige", "Nadie: es voluntario.", "Normalmente el banco, como condición del crédito."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Los dos se complementan. Si tienes crédito de vivienda, el vida deudor evita que tu familia herede la deuda; el individual cubre todo lo demás. En los créditos hipotecarios, la norma del sector financiero permite que el deudor contrate el seguro con otra aseguradora si cumple como mínimo las condiciones que pidió el banco en su licitación.",
          },
        ],
      },
      {
        titulo: "¿Qué debes saber sobre los beneficiarios del seguro de vida?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Designar y revocar beneficiarios es un derecho del asegurado que no se puede transferir ni delegar. Lo dice el Código de Comercio.",
              "Si no designas beneficiario, la ley lo define: la mitad para el cónyuge y la otra mitad para los herederos.",
              "La aseguradora no puede revocar unilateralmente un seguro de vida. Tú sí puedes terminarlo.",
              "Declara tu estado de salud con sinceridad. Según la edad y el valor asegurado, la aseguradora puede pedir exámenes médicos.",
              "Revisa el valor asegurado cada cierto tiempo: cuando nace un hijo, cambias de casa o adquieres una deuda nueva.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Con el seguro de vida deudor del banco es suficiente?",
        respuesta:
          "Solo si tu única preocupación es la deuda. El vida deudor le paga al banco el saldo del crédito; no le deja dinero a tu familia para vivir.",
      },
      {
        pregunta: "¿Cuántas veces mi salario debo asegurar?",
        respuesta:
          "No hay una regla fija que sirva para todos. Es mejor hacer la cuenta con tus deudas, los gastos del hogar por los años que tu familia dependería de ti y la educación de tus hijos, y restar lo que ya tienes.",
      },
      {
        pregunta: "¿Puedo cambiar a mis beneficiarios?",
        respuesta:
          "Sí. Hacer y revocar la designación de beneficiarios es un derecho del asegurado. La excepción es cuando el beneficiario se designó a título oneroso, por ejemplo como garantía de un crédito.",
      },
      {
        pregunta: "¿Me pueden cancelar el seguro de vida si me enfermo?",
        respuesta:
          "El Código de Comercio prohíbe que la aseguradora revoque unilateralmente un seguro de vida. Eso sí, tu declaración de salud al contratarlo debe ser completa y veraz.",
      },
      {
        pregunta: "¿Puedo tener más de un seguro de vida?",
        respuesta:
          "Sí. Puedes tener un vida deudor por el crédito y uno o más seguros individuales. Al calcular cuánto asegurar, suma lo que ya tienes para no quedarte corto ni pagar de más.",
      },
    ],
    ramoRuta: "/seguros/vida",
    waMensaje:
      "Hola, leí la guía de cuánto asegurar y quiero ayuda para calcular mi seguro de vida.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Código de Comercio, arts. 1142, 1146 y 1159 (beneficiarios por defecto, designación intransferible, prohibición de revocación por el asegurador en vida) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr035.html",
      "Verificar con el asesor: Decreto 2555 de 2010, art. 2.36.2.2.5 (sustituido por el Decreto 673 de 2014): el deudor hipotecario puede contratar con otra aseguradora si cumple las condiciones del pliego — https://normograma.com/keralty/compilacion/docs/decreto_0673_2014.htm",
      "Confirmar con el asesor si los productos de vida que comercializa VanTrust incluyen incapacidad total y permanente y enfermedades graves.",
    ],
  },

  // 3. Seguro de hogar: qué cubre
  {
    slug: "seguro-de-hogar-que-cubre",
    titulo: "¿Qué cubre un seguro de hogar y qué no?",
    title: "Seguro de hogar: qué cubre y qué no cubre en Colombia",
    description:
      "Estructura, contenidos, incendio, terremoto, agua, hurto y RC: qué cubre el seguro de hogar y por qué el del banco no basta. Cotiza tu hogar con nosotros.",
    respuesta:
      "Un seguro de hogar cubre la estructura de la vivienda (muros, techos, pisos e instalaciones fijas) y los contenidos (muebles, electrodomésticos y objetos personales) frente a riesgos como incendio, terremoto, daños por agua, fenómenos de la naturaleza y hurto, según la póliza. Muchas incluyen responsabilidad civil familiar y asistencias. El seguro que exige el banco en un crédito hipotecario suele cubrir solo la estructura frente a incendio y terremoto.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el vendaval y el techo de la familia Pérez",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Los Pérez viven en una casa de dos pisos en el norte de Barranquilla, comprada con crédito hipotecario. Pagaban cada mes el seguro que venía con la cuota del banco y daban por hecho que la casa estaba asegurada para todo.",
          },
          {
            tipo: "p",
            texto:
              "Una tarde de lluvias fuertes, un vendaval levantó parte de las tejas del patio. El agua entró al cuarto de los niños y a la sala, y dañó un colchón, un televisor y un mueble. Cuando llamaron al banco, supieron que su póliza era la que exige el crédito y que, en su caso, no cubría los contenidos. Pagaron de su bolsillo los muebles y el arreglo.",
          },
          {
            tipo: "p",
            texto:
              "Después tomaron un seguro de hogar que incluía contenidos y revisaron que la póliza cubriera los daños por vendaval y por agua. Lección práctica: el seguro del banco protege la garantía del crédito; tu nevera, tu ropa y tus muebles se aseguran aparte.",
          },
        ],
      },
      {
        titulo: "¿Qué partes de la vivienda asegura un seguro de hogar?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Qué se asegura en un seguro de hogar",
            columnas: ["Parte", "Qué incluye", "Quién la asegura"],
            filas: [
              ["Estructura o inmueble", "Muros, techos, pisos, puertas, ventanas e instalaciones fijas como las eléctricas y las de agua.", "El propietario."],
              ["Contenidos", "Muebles, electrodomésticos, ropa, equipos y objetos personales.", "El propietario o el inquilino."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Si vives en arriendo, no necesitas asegurar la estructura, pero sí puedes asegurar tus contenidos y tu responsabilidad civil. Para objetos de alto valor, como joyas, obras de arte o equipos costosos, muchas pólizas piden declararlos por separado.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre y qué no cubre el seguro de hogar, riesgo por riesgo?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Coberturas habituales del seguro de hogar y exclusiones típicas (según la póliza)",
            columnas: ["Riesgo", "Qué suele cubrir", "Qué suele quedar por fuera"],
            filas: [
              ["Incendio y rayo", "Daños por fuego, humo y rayo en estructura y contenidos asegurados.", "Daños causados a propósito por el asegurado."],
              ["Terremoto", "Daños por sismo, temblor y erupción volcánica.", "Tiene su propio deducible, que suele ser distinto al de las demás coberturas."],
              ["Daños por agua", "Rotura accidental de tubos, desbordes y filtraciones súbitas.", "Humedad lenta o daños por falta de mantenimiento."],
              ["Vendaval, granizo, inundación", "Daños por fenómenos de la naturaleza, si la póliza los incluye.", "Lo que la póliza excluya o limite; revísalo en el texto."],
              ["Hurto", "Robo con violencia o entrada forzada a la vivienda.", "Pérdidas sin señales de violencia o descuidos, en muchas pólizas."],
              ["Responsabilidad civil familiar", "Daños que tú o tu familia causen a terceros, como un vecino.", "Daños a tus propios bienes o a tu familia."],
              ["Asistencias", "Plomería, cerrajería, electricidad o vidrios en emergencia.", "Lo que exceda los límites o el número de servicios del plan."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Cada aseguradora redacta sus coberturas y exclusiones a su manera. La tabla resume lo habitual, no las condiciones de una póliza concreta. Antes de firmar, lee las condiciones generales y pregunta por cada riesgo que te preocupe.",
          },
        ],
      },
      {
        titulo: "¿Qué revisar en el seguro de hogar por lluvias y arroyos en Barranquilla?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Revisa que tu póliza cubra el vendaval, los daños por lluvia y la inundación, y cómo los trata. En Barranquilla las lluvias llegan de golpe, con brisa fuerte, y en muchas zonas se forman arroyos en minutos. Eso hace que para una casa en la Costa importen tanto los daños por agua y los fenómenos de la naturaleza como el incendio o el terremoto.",
          },
          {
            tipo: "lista",
            items: [
              "Pregunta si la póliza cubre vendaval y daños por lluvia que entra por un techo dañado por el viento.",
              "Pregunta cómo trata la inundación y el agua que entra desde la calle.",
              "Mantén techos, canales y bajantes limpios: los daños por falta de mantenimiento suelen estar excluidos.",
              "Toma fotos de tu casa y de tus bienes ahora, cuando no ha pasado nada. Te sirven como prueba si tienes que reclamar.",
              "Si ocurre un daño, toma fotos y avisa pronto a la aseguradora, antes de botar lo dañado.",
            ],
          },
        ],
      },
      {
        titulo: "¿El seguro que exige el banco es un seguro de hogar completo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "No. Cuando compras vivienda con crédito hipotecario o leasing habitacional, el banco exige un seguro sobre el inmueble, normalmente contra incendio y terremoto, para proteger su garantía. La norma del sector financiero obliga a los bancos a licitar estos seguros cuando los toman por cuenta del deudor, y te permite contratar con otra aseguradora si la póliza cumple como mínimo las condiciones de esa licitación.",
          },
          {
            tipo: "tabla",
            caption: "Seguro exigido por el banco vs. seguro de hogar",
            columnas: ["", "Seguro del crédito hipotecario", "Seguro de hogar"],
            filas: [
              ["Qué protege", "La estructura, que es la garantía del crédito.", "La estructura y, si lo escoges, los contenidos."],
              ["Riesgos", "Normalmente incendio y terremoto.", "Incendio, terremoto, agua, naturaleza, hurto y RC, según la póliza."],
              ["Beneficiario", "El banco, hasta el saldo de la deuda.", "Tú, salvo lo que corresponda al banco."],
              ["Asistencias en casa", "Por lo general no incluye.", "Muchas pólizas las incluyen."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Tienes dos caminos: mantener el seguro del banco y sumar una póliza de contenidos, o contratar un seguro de hogar completo que cumpla las condiciones del banco y presentarlo para que lo acepte. El asesor te ayuda a comparar.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de hogar cubre las goteras?",
        respuesta:
          "Depende del origen. Un daño súbito, como un tubo que se rompe o un techo que se levanta con el viento, suele estar cubierto si la póliza lo incluye. La humedad lenta o la falta de mantenimiento normalmente no.",
      },
      {
        pregunta: "Vivo en arriendo, ¿me sirve un seguro de hogar?",
        respuesta:
          "Sí. Si vives en arriendo, puedes asegurar tus contenidos (muebles, electrodomésticos y objetos personales) y tu responsabilidad civil frente al propietario y los vecinos, sin asegurar la estructura, que le corresponde al propietario.",
      },
      {
        pregunta: "¿Puedo usar mi propio seguro en lugar del que ofrece el banco?",
        respuesta:
          "Sí, en los créditos hipotecarios y de leasing habitacional puedes contratar con otra aseguradora si la póliza cumple como mínimo las condiciones de la licitación del banco. Si el banco la rechaza, debe explicarte por escrito por qué.",
      },
      {
        pregunta: "¿Cubre el robo de cosas que dejo en el carro o en la calle?",
        respuesta:
          "Por lo general el seguro de hogar cubre los bienes dentro de la vivienda. Algunas pólizas tienen coberturas para objetos fuera de casa, con límites. Revísalo en tu póliza.",
      },
    ],
    ramoRuta: "/seguros/hogar",
    waMensaje:
      "Hola, leí la guía del seguro de hogar y quiero asegurar mi casa y lo que hay dentro.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Decreto 2555 de 2010, arts. 2.36.2.2.1 y 2.36.2.2.5 (sustituidos por el Decreto 673 de 2014): licitación de seguros asociados a créditos hipotecarios y derecho del deudor a contratar con otra aseguradora — https://normograma.com/keralty/compilacion/docs/decreto_0673_2014.htm",
      "Confirmar con el asesor cómo tratan vendaval, inundación y agua desde la calle las pólizas de hogar que comercializa VanTrust.",
    ],
  },

  // 4. Seguro de arrendamiento
  {
    slug: "seguro-de-arrendamiento-que-cubre",
    titulo: "¿Qué cubre el seguro de arrendamiento para propietarios?",
    title: "Seguro de arrendamiento: qué cubre al propietario",
    description:
      "Canon, administración, servicios y daños: qué cubre el seguro de arrendamiento y qué dice la Ley 820 de 2003 sobre garantías. Pregúntanos sin compromiso.",
    respuesta:
      "El seguro de arrendamiento le paga al propietario el canon que el inquilino deje de pagar y, según la póliza, también las cuotas de administración, los servicios públicos pendientes y algunos daños al inmueble. Antes, la aseguradora estudia al inquilino y a sus codeudores. En vivienda urbana es una forma de respaldar el contrato, porque la Ley 820 de 2003 prohíbe exigir depósitos en efectivo u otras cauciones reales.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el apartamento de Rosa",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Rosa es pensionada y tiene un apartamento en Barranquilla que arrienda para completar sus ingresos. La primera vez lo arrendó a un conocido de un vecino, con un contrato sencillo y sin seguro. Al principio todo iba bien.",
          },
          {
            tipo: "p",
            texto:
              "A los pocos meses el inquilino dejó de pagar. Rosa siguió pagando la administración para no quedar en mora con el edificio, y además le llegaron recibos de servicios atrasados. Recuperar el apartamento le tomó tiempo, abogado y mucho desgaste. Supongamos que en ese tiempo dejó de recibir cinco meses de canon: para alguien que vive de ese ingreso, es un golpe fuerte.",
          },
          {
            tipo: "p",
            texto:
              "Para el siguiente contrato tomó un seguro de arrendamiento. La aseguradora estudió al nuevo inquilino y a su codeudor antes de firmar. Lección práctica: el seguro no solo paga si hay mora; el estudio previo del inquilino ya filtra parte del riesgo.",
          },
        ],
      },
      {
        titulo: "¿Qué coberturas puede tener un seguro de arrendamiento?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Coberturas habituales del seguro de arrendamiento",
            columnas: ["Cobertura", "Qué es", "Cómo suele funcionar"],
            filas: [
              ["Canon de arrendamiento", "El arriendo mensual que el inquilino deja de pagar.", "Es la cobertura básica. La póliza fija desde cuándo paga y por cuántos meses."],
              ["Cuotas de administración", "Las expensas comunes del edificio o conjunto.", "Se incluye en muchas pólizas, a veces como cobertura adicional."],
              ["Servicios públicos", "Agua, luz y gas que el inquilino deja sin pagar al irse.", "Según la póliza, con un tope."],
              ["Daños al inmueble", "Daños que deja el inquilino, más allá del desgaste normal.", "Cobertura adicional en algunas pólizas, con límites."],
              ["Gastos jurídicos", "Abogado para la restitución del inmueble.", "Algunas pólizas lo incluyen o lo prestan como asistencia."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Cada aseguradora arma su producto distinto. Pregunta qué coberturas trae la póliza básica, cuáles son adicionales, cuántos meses paga como máximo y qué tienes que hacer para reclamar.",
          },
        ],
      },
      {
        titulo: "¿Qué dice la Ley 820 de 2003 sobre las garantías del arriendo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La Ley 820 de 2003 regula el arrendamiento de vivienda urbana. Su artículo 16 dice que en estos contratos no se pueden exigir depósitos en dinero efectivo ni otras cauciones reales para garantizar las obligaciones del arrendatario. Tampoco se pueden pactar de forma indirecta, por medio de otra persona, en un documento aparte o con otro nombre.",
          },
          {
            tipo: "lista",
            items: [
              "Lo que sí permite el artículo 15: pedir garantías o fianzas para respaldar ante las empresas de servicios públicos el pago de las facturas, con un tope que fija la misma ley.",
              "El artículo 14 dice que el contrato de arrendamiento presta mérito ejecutivo para cobrar las sumas de dinero, y que el arrendador puede cobrarle al inquilino los servicios o la administración que haya tenido que pagar.",
              "La ley aplica a vivienda urbana. Los locales comerciales tienen otras reglas.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Por eso, en vivienda, el respaldo del contrato se busca con codeudores o con un seguro de arrendamiento, en lugar de un depósito en efectivo. Si tienes dudas sobre cómo redactar las garantías de tu contrato, consulta a un abogado.",
          },
        ],
      },
      {
        titulo: "¿Cómo funciona el seguro de arrendamiento, paso a paso?",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Antes de firmar el contrato, el inquilino y sus codeudores llenan la solicitud y entregan los documentos que pide la aseguradora.",
              "La aseguradora estudia ingresos, historial de pagos y respaldo, y aprueba o niega.",
              "Si aprueba, firmas el contrato de arrendamiento y la póliza queda vigente.",
              "Si el inquilino deja de pagar, avisas a la aseguradora dentro del plazo que fije la póliza.",
              "La aseguradora paga el canon y lo demás cubierto, según las condiciones, y se encarga del cobro al inquilino.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El aviso a tiempo es clave. Si dejas pasar los plazos de la póliza, puedes perder la cobertura de esos meses. Lleva un registro de los pagos y avisa apenas haya un atraso.",
          },
        ],
      },
      {
        titulo: "¿Para quién conviene?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Para propietarios que dependen del canon para vivir, como pensionados.",
              "Para quien arrienda a personas que no conoce y quiere un estudio serio del inquilino.",
              "Para quien vive lejos del inmueble y no puede estar pendiente del cobro.",
              "Para quien tiene un crédito hipotecario sobre el inmueble y necesita el canon para pagar la cuota.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si arriendas a un familiar o el canon no es clave para tu presupuesto, quizás un buen contrato con codeudor sea suficiente. Lo importante es decidirlo antes de firmar, no cuando ya hay mora.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo pedirle al inquilino un depósito en efectivo?",
        respuesta:
          "En vivienda urbana, el artículo 16 de la Ley 820 de 2003 prohíbe exigir depósitos en efectivo u otras cauciones reales para garantizar el contrato. La excepción son las garantías para servicios públicos del artículo 15.",
      },
      {
        pregunta: "¿Quién paga el seguro de arrendamiento?",
        respuesta:
          "Depende de lo que pacten las partes y de cómo esté diseñado el producto. Lo usual es que lo tome el propietario o la inmobiliaria. Revísalo antes de firmar el contrato.",
      },
      {
        pregunta: "¿El seguro paga desde el primer mes de mora?",
        respuesta:
          "No siempre: depende de la póliza. Cada seguro de arrendamiento fija desde cuándo empieza a pagar, cuántos meses cubre y qué plazos tienes para avisar de la mora. Pídelos por escrito antes de firmar.",
      },
      {
        pregunta: "¿Sirve para locales comerciales?",
        respuesta:
          "Algunas aseguradoras ofrecen pólizas para inmuebles comerciales. Las condiciones pueden ser distintas a las de vivienda. La Ley 820 de 2003 aplica solo a vivienda urbana.",
      },
    ],
    ramoRuta: "/seguros/arriendo",
    waMensaje:
      "Hola, leí la guía del seguro de arrendamiento y quiero información para mi inmueble.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Ley 820 de 2003, arts. 1, 14, 15 y 16 (objeto: vivienda urbana; mérito ejecutivo; garantías de servicios públicos; prohibición de depósitos y cauciones reales) — http://www.secretariasenado.gov.co/senado/basedoc/ley_0820_2003.html",
      "Confirmar que VanTrust comercializa el seguro de arrendamiento y con qué aseguradoras (ver todo de /seguros/arriendo en paginas.ts).",
      "Coberturas reales del producto: desde qué mes de mora paga, número máximo de cánones, administración, servicios, daños y gastos jurídicos.",
      "Confirmar quién suele tomar y pagar la póliza en los productos que vende VanTrust (propietario, inmobiliaria o inquilino).",
    ],
  },

  // 5. Cambiar de aseguradora al renovar
  {
    slug: "cambiar-de-aseguradora-al-renovar",
    titulo: "¿Cómo cambiar de aseguradora sin quedarme desprotegido?",
    title: "Cambiar de aseguradora al renovar sin quedar sin cobertura",
    description:
      "Fechas, inspección del carro, preexistencias en salud y devolución de prima si cancelas: cómo cambiar de aseguradora sin baches. Te ayudamos a comparar.",
    respuesta:
      "Para cambiar de aseguradora sin quedar desprotegido, haz que la póliza nueva empiece el mismo día y a la misma hora en que vence la anterior, y no canceles la vieja hasta tener la nueva expedida. En carros, haz la inspección con tiempo; en salud, revisa qué preexistencias te excluiría la nueva entidad. Si cancelas antes, puedes revocar por escrito y recuperar parte de la prima no devengada.",
    secciones: [
      {
        titulo: "Caso ilustrativo: los dos días sin seguro de Andrés",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Andrés vive en Barranquilla y usa su carro todos los días por la Circunvalar. Su seguro todo riesgo vencía un viernes. Le llegó la renovación más cara de lo que esperaba y decidió buscar otra aseguradora, pero empezó a cotizar el mismo jueves.",
          },
          {
            tipo: "p",
            texto:
              "La nueva aseguradora le pidió inspección del carro antes de expedir. No alcanzó a hacerla el viernes y la póliza nueva empezó el lunes. El sábado, en un trancón, otro carro le pegó por detrás al suyo y el conductor se fue. Andrés tuvo que pagar el arreglo de su bolsillo: ese fin de semana no tenía seguro.",
          },
          {
            tipo: "p",
            texto:
              "Lección práctica: cambiar de aseguradora está bien, pero se planea con semanas de anticipación. La fecha de inicio de la nueva póliza debe coincidir con el vencimiento de la anterior.",
          },
        ],
      },
      {
        titulo: "¿Cuándo empezar a cambiar de aseguradora para no quedar sin cobertura?",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Mira en la carátula de tu póliza la fecha y la hora exactas de vencimiento. La ley exige que la póliza las indique.",
              "Empieza a cotizar con varias semanas de anticipación, no la última semana.",
              "Compara coberturas, deducibles y exclusiones, no solo el precio.",
              "Cumple los requisitos de la nueva aseguradora: inspección del vehículo, declaración de salud o documentos.",
              "Pide que la póliza nueva empiece exactamente cuando vence la anterior.",
              "No canceles la póliza vieja hasta tener la nueva expedida y en tus manos.",
              "Paga la prima nueva a tiempo: la mora en el pago termina el contrato automáticamente.",
              "Si tenías la renovación automática, avisa por escrito a la aseguradora anterior que no vas a renovar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El pago a tiempo importa más de lo que parece. El Código de Comercio dice que, salvo pacto distinto, la prima se paga a más tardar dentro del mes siguiente a la entrega de la póliza, y que la mora produce la terminación automática del contrato. Una póliza nueva sin pagar puede dejarte igual de desprotegido que no tenerla.",
          },
        ],
      },
      {
        titulo: "¿Qué revisar al cambiar la aseguradora del carro?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Muchas aseguradoras piden inspeccionar el vehículo antes de asegurarlo con una compañía nueva. Agenda la inspección con días de margen.",
              "Si el carro tiene golpes sin reparar, la inspección los deja anotados y pueden quedar fuera de la cobertura.",
              "Si el carro está financiado, el banco suele figurar como beneficiario. Avísale del cambio y entrega la póliza nueva para que no te cobre un seguro por su cuenta.",
              "Revisa que la nueva póliza tenga al menos las coberturas que tenías: pérdidas parciales y totales, hurto, responsabilidad civil y asistencias.",
            ],
          },
        ],
      },
      {
        titulo: "¿Por qué cambiar de plan de salud pide más cuidado?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Porque con otra entidad empiezas un contrato nuevo, y lo que te diagnosticaron en los últimos años puede quedar como preexistencia excluida. En cambio, según el Decreto 780 de 2016, al renovar con la misma entidad no te pueden agregar preexistencias distintas a las que tenías antes del contrato inicial.",
          },
          {
            tipo: "lista",
            items: [
              "Antes de cancelar tu plan actual, pide a la nueva entidad que te diga por escrito qué te excluiría.",
              "Revisa los periodos de carencia del plan nuevo: puedes volver a esperar para ciertas coberturas.",
              "Si estás en un tratamiento, piensa dos veces antes de cambiarte.",
              "Recuerda que la medicina prepagada tiene reglas de permanencia y renovación propias. Pregunta por ellas antes de decidir.",
            ],
          },
        ],
      },
      {
        titulo: "¿Qué pasa con la prima si cancelas la póliza antes del vencimiento?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Te devuelven la prima no devengada, calculada con la tarifa a corto plazo, que suele ser menor que la parte proporcional del tiempo que falta. El artículo 1071 del Código de Comercio permite que el asegurado revoque el seguro en cualquier momento, con un aviso escrito a la aseguradora. La aseguradora, en cambio, solo puede revocarlo con aviso escrito de al menos diez días, salvo en los seguros de vida, que no puede revocar.",
          },
          {
            tipo: "tabla",
            caption: "Qué te devuelven si se termina la póliza antes de tiempo",
            columnas: ["Quién termina", "Qué dice el artículo 1071"],
            filas: [
              ["La aseguradora", "Te devuelve la prima no devengada: la del tiempo que va desde que la revocación surte efecto hasta el vencimiento."],
              ["Las dos partes, de mutuo acuerdo", "La devolución se calcula igual que cuando revoca la aseguradora."],
              ["Tú, el asegurado", "La prima devengada y la devolución se calculan con la tarifa de seguros a corto plazo."],
            ],
          },
          {
            tipo: "p",
            texto:
              "En la práctica, si eres tú quien cancela, la devolución suele ser menor que la parte proporcional exacta del tiempo que falta, porque se aplica la tarifa a corto plazo. Además, si en esa vigencia ya hubo un siniestro indemnizado, el artículo 1070 tiene por devengada toda la prima (si fue pérdida total) o la parte que corresponde a lo indemnizado (si fue parcial). Pide a la aseguradora la liquidación por escrito antes de decidir.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo cambiar de aseguradora antes de que se venza mi póliza?",
        respuesta:
          "Sí. Puedes revocar la póliza en cualquier momento con aviso escrito. Te devuelven la prima no devengada calculada con la tarifa a corto plazo, que suele ser menor que la parte proporcional.",
      },
      {
        pregunta: "¿Pierdo algo al cambiar de aseguradora del carro?",
        respuesta:
          "Puedes perder beneficios de antigüedad o de buena siniestralidad que te daba la anterior. Pregunta si la nueva los reconoce y compara coberturas, no solo precio.",
      },
      {
        pregunta: "¿Qué pasa si la póliza nueva empieza un día después?",
        respuesta:
          "Ese día no tienes cobertura. Si pasa algo, no hay seguro que responda. Por eso la nueva debe empezar a la misma fecha y hora en que vence la anterior.",
      },
      {
        pregunta: "¿Si me cambio de plan de salud me cubren lo que ya tengo?",
        respuesta:
          "No necesariamente. Con una entidad nueva empiezas un contrato nuevo y tus diagnósticos previos pueden quedar como preexistencias. Pide por escrito las exclusiones antes de cancelar tu plan actual.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía para cambiar de aseguradora. Mi póliza vence pronto y quiero comparar sin quedar sin cobertura.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Código de Comercio, art. 1071 (revocación unilateral, prima no devengada, tarifa a corto plazo) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr032.html",
      "Verificar con el asesor: Código de Comercio, arts. 1047 (fechas y horas de vigencia en la póliza), 1066 (plazo de pago de la prima), 1068 (terminación automática por mora) y 1070 (prima devengada en caso de siniestro) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr032.html",
      "Verificar con el asesor: Código de Comercio, art. 1159 (el asegurador no puede revocar el seguro de vida) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr035.html",
      "Verificar con el asesor: Decreto 780 de 2016, art. 2.2.4.5 parágrafo y art. 2.2.4.1.16 (renovación sin nuevas preexistencias; renovación y permanencia en prepagada) — https://normograma.supersalud.gov.co/compilacion/docs/decreto_0780_2016.htm",
      "Confirmar con el asesor qué aseguradoras con las que trabaja VanTrust exigen inspección para vehículos que llegan de otra compañía y si reconocen la antigüedad o la buena siniestralidad.",
    ],
  },

  // 6. Agencia o corredor vs. comprar directo
  {
    slug: "agencia-de-seguros-vs-aseguradora-directa",
    titulo: "¿Es mejor comprar el seguro con una agencia, un corredor o directo a la aseguradora?",
    title: "Agencia o corredor de seguros vs. comprar directo",
    description:
      "Qué hace un intermediario de seguros, cómo se regula y se remunera en Colombia, y cuándo conviene comprar directo. Ventajas y límites, sin rodeos.",
    respuesta:
      "Comprar directo a la aseguradora puede bastar si tu necesidad es simple y ya sabes qué quieres; una agencia de seguros, un agente o un corredor aporta más cuando necesitas comparar varias opciones o que alguien te acompañe en un siniestro. El intermediario te ayuda a comparar, a entender la póliza y a hacer los trámites, y su comisión la pactan él y la aseguradora.",
    secciones: [
      {
        titulo: "Caso ilustrativo: Laura y las dos pólizas",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Laura tiene una ferretería en el centro de Barranquilla y un carro particular. El seguro del carro lo compró en línea, directo con una aseguradora: sabía qué coberturas quería, comparó un par de páginas y lo resolvió en una tarde. Le funcionó bien.",
          },
          {
            tipo: "p",
            texto:
              "Cuando un cliente grande le pidió una póliza para un contrato de suministro y además quiso asegurar la mercancía del local, la cosa se complicó. No sabía qué amparos pedían, ni qué aseguradora le daría el cupo, ni qué preguntar sobre las exclusiones. Ahí buscó un intermediario que le presentó el caso a varias aseguradoras y le explicó las diferencias.",
          },
          {
            tipo: "p",
            texto:
              "Lección práctica: no hay una respuesta única. Para algo sencillo que ya entiendes, comprar directo puede ser suficiente. Cuando el seguro es más complejo o quieres comparar varias compañías, un intermediario te ahorra tiempo y errores.",
          },
        ],
      },
      {
        titulo: "¿Qué es un agente, una agencia y un corredor de seguros?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Son los tres tipos de intermediarios de seguros que reconoce la ley en Colombia. En Colombia los intermediarios de seguros están definidos en el Código de Comercio y en el Estatuto Orgánico del Sistema Financiero (Decreto 663 de 1993). Hay tres figuras:",
          },
          {
            tipo: "tabla",
            caption: "Tipos de intermediarios de seguros en Colombia",
            columnas: ["Figura", "Qué es", "A quién representa", "Quién la vigila"],
            filas: [
              ["Agente", "Persona natural que promueve seguros de una o varias aseguradoras. Puede ser dependiente o independiente.", "A la aseguradora o aseguradoras con las que trabaja.", "No la vigila directamente la Superintendencia Financiera; la aseguradora debe velar por su idoneidad."],
              ["Agencia", "Empresa que representa a una o varias aseguradoras en un territorio.", "A las aseguradoras con las que tiene contrato.", "Igual que el agente, según la Superintendencia Financiera."],
              ["Corredor", "Sociedad cuyo único objeto es ofrecer seguros y obtener su renovación como intermediaria entre asegurado y aseguradora.", "No representa a una aseguradora: intermedia entre las dos partes.", "La Superintendencia Financiera, con inscripción y certificado vigente."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Según un concepto de la Superintendencia Financiera de 2022, hoy solo los corredores están bajo su vigilancia directa, y lo que hacen los agentes y las agencias obliga a la aseguradora que representan. Para comprobar con quién hablas: a un corredor pídele su certificado de inscripción ante la Superintendencia Financiera; a una agencia o agente, pregúntale con qué aseguradoras tiene contrato y confírmalo con la aseguradora.",
          },
        ],
      },
      {
        titulo: "¿Cómo se les paga a los intermediarios de seguros?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Los intermediarios reciben una comisión por su labor. Según la Superintendencia Financiera, esa comisión se rige por los convenios que celebran libremente el intermediario y la aseguradora. El Estatuto Orgánico prohíbe a los intermediarios ceder sus comisiones al asegurado, es decir, no te pueden ofrecer devolverte parte de la comisión para ganar el negocio.",
          },
          {
            tipo: "p",
            texto:
              "Lo que debes preguntar es simple: cuánto pagas tú por la póliza y qué incluye. Compara ese valor y esas condiciones con lo que te ofrecen otras vías. Si alguien te propone un pago aparte o un descuento que suena raro, pide que te lo explique por escrito.",
          },
        ],
      },
      {
        titulo: "¿Qué ventajas tiene comprar con intermediario o directo?",
        bloques: [
          {
            tipo: "tabla",
            caption: "Comprar con un intermediario vs. comprar directo",
            columnas: ["", "Con intermediario", "Directo a la aseguradora"],
            filas: [
              ["Comparar", "Puede mostrarte opciones de las aseguradoras con las que trabaja.", "Ves solo los productos de esa aseguradora; para comparar tienes que cotizar en cada una."],
              ["Asesoría", "Te explica coberturas, exclusiones y deducibles según tu caso.", "Depende de los canales de la aseguradora: asesor, línea o página."],
              ["Siniestros", "Puede acompañarte en el trámite y en la documentación.", "Tratas directamente con la aseguradora."],
              ["Rapidez para algo simple", "Puede tomar más pasos.", "Comprar en línea puede ser rápido si ya sabes qué quieres."],
              ["Límites", "Una agencia trabaja con las aseguradoras que representa, no con todo el mercado.", "No tienes a alguien de tu lado que compare por ti."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Un intermediario no decide si te pagan un siniestro: eso lo define la aseguradora según la póliza. Lo que sí puede hacer es ayudarte a reunir los documentos, a presentar el reclamo bien y a entender la respuesta. Desconfía de quien te garantice resultados.",
          },
        ],
      },
      {
        titulo: "¿Tienes los mismos derechos si compras directo o con intermediario?",
        bloques: [
          {
            tipo: "lista",
            items: [
              "Sí. La Ley 1328 de 2009 te da derecho a información transparente, clara, veraz y oportuna sobre el producto que compras.",
              "Esa misma ley exige que, antes de contratar, la información te permita comparar las opciones del mercado.",
              "Las entidades vigiladas que defina el Gobierno deben tener un Defensor del Consumidor Financiero, que atiende tus quejas de forma gratuita.",
              "Compres como compres, la póliza la expide la aseguradora y es ella la que responde por las coberturas.",
            ],
          },
          {
            tipo: "pasos",
            items: [
              "Define qué quieres asegurar y qué te preocupa perder.",
              "Si es algo simple, cotiza directo en dos o tres aseguradoras.",
              "Si es algo complejo o quieres comparar más, pide a un intermediario que te muestre opciones lado a lado.",
              "En cualquier caso, lee las condiciones generales y las exclusiones antes de pagar.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Sale más caro comprar con una agencia de seguros?",
        respuesta:
          "No necesariamente. La comisión del intermediario la pactan él y la aseguradora. Lo útil es comparar el valor final de la póliza y sus condiciones por cada vía.",
      },
      {
        pregunta: "¿Qué diferencia hay entre una agencia y un corredor?",
        respuesta:
          "La agencia representa a una o varias aseguradoras. El corredor es una sociedad que intermedia entre asegurado y aseguradora sin representar a ninguna, y está vigilado por la Superintendencia Financiera.",
      },
      {
        pregunta: "¿Cómo sé si un corredor de seguros es legal?",
        respuesta:
          "Solo pueden usar el título de corredor de seguros las sociedades inscritas en la Superintendencia Financiera con certificado vigente. Pídele ese certificado antes de contratar y verifica que esté al día.",
      },
      {
        pregunta: "Si compro con un intermediario, ¿a quién reclamo en un siniestro?",
        respuesta:
          "El reclamo se presenta a la aseguradora, que es la que paga según la póliza. El intermediario puede ayudarte con el trámite y los documentos.",
      },
    ],
    ramoRuta: "/seguros/automoviles",
    waMensaje:
      "Hola, leí la guía sobre agencias y aseguradoras y quiero comparar opciones para el seguro de mi carro.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Código de Comercio, arts. 1347 a 1351 (corredores: definición, vigilancia, inscripción y certificado) — http://www.secretariasenado.gov.co/senado/basedoc/codigo_comercio_pr041.html",
      "Verificar con el asesor: Estatuto Orgánico del Sistema Financiero (Decreto 663 de 1993), arts. 40 y 41 (corredores; agentes y agencias) — http://www.secretariasenado.gov.co/senado/basedoc/estatuto_organico_sistema_financiero.html",
      "Verificar con el asesor: Superintendencia Financiera, Concepto 2022147590-003 del 23-09-2022 (solo vigila corredores; agencias y agentes obligan a la aseguradora; numeral 4 del art. 41 EOSF tácitamente derogado) — https://normograma.com/keralty/compilacion/docs/concepto_superfinanciera_0147590_2022.htm",
      "Verificar con el asesor: Superintendencia Financiera, Concepto 2008041575-001 (comisiones según convenio intermediario-aseguradora, Decreto 2605 de 1993 art. 4; prohibición de ceder comisiones, art. 207 num. 3 EOSF) — https://www.superfinanciera.gov.co/publicaciones/15971",
      "Verificar con el asesor: Ley 1328 de 2009, arts. 5, 9 y 13 (derechos del consumidor financiero, información para comparar, Defensor del Consumidor Financiero) — http://www.secretariasenado.gov.co/senado/basedoc/ley_1328_2009.html",
      "RUI: no se encontró un Registro Único de Intermediarios de la Superintendencia Financiera para seguros generales; el RUI hallado es del Ministerio del Trabajo para riesgos laborales. No se cita. El asesor puede indicar cómo verificar la agencia (por ejemplo, con las aseguradoras que representa).",
      "No se afirma en la guía que VanTrust tenga un registro vigente. Si el asesor quiere mencionarlo, que aporte el soporte.",
    ],
  },

  // 7. Seguro de viaje
  {
    slug: "seguro-de-viaje-que-cubre",
    titulo: "¿Qué cubre un seguro de viaje y cuándo es obligatorio?",
    title: "Qué cubre un seguro de viaje y cuándo es obligatorio",
    description:
      "Qué cubre un seguro de viaje, cuándo lo exige Europa y por qué la tarjeta de crédito no siempre basta. Escríbenos antes de viajar y cotiza el tuyo.",
    respuesta:
      "Un seguro de viaje cubre, según la póliza, los gastos médicos por accidente o enfermedad durante el viaje, la repatriación, la pérdida de equipaje y, si lo incluye, la cancelación. Es obligatorio, por ejemplo, para pedir visa Schengen, con una cobertura médica mínima de 30.000 euros. La tarjeta de crédito puede traer un beneficio, pero con condiciones que conviene revisar.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el tobillo torcido en Madrid",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Carolina, docente en Barranquilla, viaja a España a visitar a su hermana con una amiga. Antes de salir, le pregunta a su asesor y compra un seguro de viaje con gastos médicos y asistencia. Su amiga decide no comprarlo porque cree que su tarjeta de crédito ya la cubre.",
          },
          {
            tipo: "p",
            texto:
              "El tercer día, Carolina se tuerce el tobillo bajando unas escaleras. Llama a la línea de asistencia que aparece en su póliza; le indican a qué centro médico ir y la atención se coordina desde ahí, según las condiciones de su plan. Días después, la amiga tiene una infección y descubre que el beneficio de su tarjeta solo aplicaba si había pagado los tiquetes con esa tarjeta, y ella los había pagado con otra. Termina pagando la consulta de su bolsillo.",
          },
          {
            tipo: "p",
            texto:
              "La lección: el seguro de viaje sirve si lo compras antes de salir, lees qué cubre y llamas a la asistencia antes de ir al médico. Y el beneficio de una tarjeta existe solo si cumples sus condiciones.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre un seguro de viaje?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un seguro de viaje es una póliza que te protege durante un viaje frente a gastos imprevistos de salud, problemas con el equipaje y, en algunos planes, la cancelación del viaje. Lo que cubre depende del plan que compres; la tabla resume lo habitual, no las condiciones de una póliza concreta.",
          },
          {
            tipo: "tabla",
            caption: "Coberturas habituales de un seguro de viaje (según la póliza)",
            columnas: ["Cobertura", "Qué suele incluir", "Qué revisar"],
            filas: [
              ["Gastos médicos por accidente", "Consultas, urgencias, hospitalización y medicamentos por un accidente en el viaje.", "El monto máximo y si hay deducible."],
              ["Gastos médicos por enfermedad", "Atención por una enfermedad que aparece durante el viaje.", "Si excluye las enfermedades que ya tenías."],
              ["Repatriación", "El traslado a Colombia por razones médicas o, en caso de muerte, de los restos.", "Que esté incluida y con qué límite."],
              ["Equipaje", "Pérdida, daño o demora de la maleta documentada por la aerolínea.", "Límites por maleta y por objeto, y qué documentos piden."],
              ["Cancelación o interrupción", "Gastos no reembolsables si cancelas por causas que la póliza define.", "La lista exacta de causas cubiertas; no es cualquier motivo."],
              ["Asistencia", "Una línea para orientarte y coordinar la atención.", "Que funcione las 24 horas y en tu destino."],
            ],
          },
        ],
      },
      {
        titulo: "¿Cuándo es obligatorio el seguro de viaje para ir a Europa?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Es obligatorio cuando pides una visa Schengen: el artículo 15 del Reglamento (CE) 810/2009, el Código de visados de la Unión Europea, exige demostrar un seguro médico de viaje con una cobertura mínima de 30.000 euros. Debe ser válido en todo el territorio de los Estados miembros y durante toda la estancia o el tránsito.",
          },
          {
            tipo: "p",
            texto:
              "La Comisión Europea explica que ese seguro debe cubrir la atención médica de urgencia, la hospitalización y la repatriación, incluida la repatriación en caso de muerte.",
          },
          {
            tipo: "p",
            texto:
              "¿Y si tienes pasaporte colombiano? Hoy Colombia está en la lista de países cuyos nacionales no necesitan visa para estancias cortas, según el Anexo II del Reglamento (UE) 2018/1806. En ese caso no tramitas la visa, pero viajar a Europa sin seguro médico es un riesgo grande. El requisito de visa sí aplica, por ejemplo, a quienes viven en Barranquilla con otra nacionalidad que sí necesita visa Schengen.",
          },
          {
            tipo: "p",
            texto:
              "Las reglas de entrada cambian y cada país puede pedir lo suyo. Antes de comprar los tiquetes, revisa los requisitos en la página oficial del consulado o de la embajada del país al que vas.",
          },
        ],
      },
      {
        titulo: "¿Por qué la tarjeta de crédito no siempre basta como seguro de viaje?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Porque el beneficio de la tarjeta tiene condiciones, y si no las cumples, no te cubre. Muchas tarjetas incluyen asistencia en viaje, pero cada banco y cada franquicia la define a su manera. Antes de confiarte, pide por escrito las condiciones y revisa estos puntos:",
          },
          {
            tipo: "lista",
            items: [
              "Si se activa solo cuando pagas los tiquetes, o una parte, con esa tarjeta.",
              "Si cubre solo al titular o también a tu pareja y tus hijos.",
              "El monto máximo de gastos médicos y si alcanza lo que pide tu destino.",
              "Si pagan directamente al hospital o te toca pagar y después pedir el reembolso.",
              "Si cubre enfermedades que ya tenías, embarazo o deportes.",
              "Cuántos días de viaje cubre y si hay que activarla antes de salir.",
              "Si te sirve como certificado para un trámite de visa.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si alguno de esos puntos no te cuadra, un seguro de viaje aparte te da condiciones claras a tu nombre y un certificado para mostrar.",
          },
        ],
      },
      {
        titulo: "¿Qué revisar antes de comprar un seguro de viaje?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Revisa que el plan se ajuste a tu viaje, no solo el precio. Estas son las preguntas que conviene hacer:",
          },
          {
            tipo: "pasos",
            items: [
              "¿Cuánto cubre en gastos médicos y es suficiente para el país al que vas?",
              "¿Cubre las fechas exactas del viaje, incluidos los días de ida y regreso?",
              "¿Qué pasa con las enfermedades que ya tengo?",
              "¿Hay límite de edad o cambian las condiciones para adultos mayores?",
              "¿Cubre los deportes o actividades que voy a hacer?",
              "¿Cómo funciona la asistencia: a qué número llamo y qué debo hacer antes de ir al médico?",
              "¿Qué documentos piden para reclamar el equipaje o los gastos?",
            ],
          },
          {
            tipo: "p",
            texto:
              "Declara tu estado de salud con sinceridad si te lo preguntan. El artículo 1058 del Código de Comercio dice que callar o declarar mal hechos que habrían cambiado la decisión de la aseguradora produce la nulidad relativa del seguro. Si vas a ver a la familia por varios meses, revisa también ¿Vale la pena un seguro de salud si ya tengo EPS?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuándo debo comprar el seguro de viaje?",
        respuesta:
          "Lo ideal es comprarlo apenas pagas los tiquetes. Si te interesa la cobertura de cancelación, muchas pólizas solo la dan si el seguro se compró antes de que apareciera la causa. Y en todo caso debe estar vigente desde el día en que sales de Colombia.",
      },
      {
        pregunta: "¿Qué hago si me enfermo estando de viaje?",
        respuesta:
          "Llama primero a la línea de asistencia de tu póliza, salvo una urgencia vital. Ellos te dicen a dónde ir y cómo se paga. Guarda facturas, fórmulas e informes médicos, porque los vas a necesitar si te toca pedir un reembolso.",
      },
      {
        pregunta: "¿Necesito seguro para viajar a Europa con pasaporte colombiano?",
        respuesta:
          "Para estancias cortas, con pasaporte colombiano hoy no se pide visa Schengen y, por eso, no hay un trámite de visa que te exija el seguro. Aun así, la atención médica en Europa puede ser muy costosa sin seguro. Revisa los requisitos vigentes en el consulado antes de viajar.",
      },
      {
        pregunta: "¿El seguro de viaje sirve para un viaje de trabajo?",
        respuesta:
          "Muchos planes cubren viajes de negocios o turismo, pero algunos excluyen el trabajo manual o ciertos oficios. Dile al asesor el motivo del viaje y qué vas a hacer allá, para que la póliza que compres lo cubra.",
      },
    ],
    ramoRuta: "/seguros/viajes",
    waMensaje:
      "Hola, leí la guía de qué cubre un seguro de viaje y quiero cotizar uno para mi próximo viaje.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Reglamento (CE) 810/2009 (Código de visados), art. 15: seguro médico de viaje con cobertura mínima de 30.000 euros, válido en todos los Estados miembros y por toda la estancia — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R0810",
      "Verificar con el asesor: Comisión Europea, el seguro debe cubrir atención médica de urgencia, hospitalización y repatriación, incluida en caso de muerte — https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en",
      "Verificar con el asesor: Reglamento (UE) 2018/1806, Anexo II: Colombia exenta de visa para estancias cortas (revisar antes de publicar, porque la lista puede cambiar y hay un mecanismo de suspensión) — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32018R1806",
      "Verificar con el asesor: Código de Comercio, art. 1058 (declaración del estado del riesgo) — https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr032.htm",
      "Verificar con el asesor: qué planes de viaje ofrece VanTrust, sus montos de gastos médicos y si sirven como certificado para visa Schengen. No se mencionó ETIAS ni otros requisitos de entrada de países concretos por no tener fecha ni fuente oficial verificada.",
    ],
  },

  // 8. Seguro exequial
  {
    slug: "seguro-exequial-que-cubre",
    titulo: "¿Qué cubre un seguro exequial y en qué se diferencia de un plan exequial?",
    title: "Qué cubre un seguro exequial y cómo se diferencia del plan",
    description:
      "Qué cubre un seguro exequial, en qué se diferencia de un plan de funeraria, a quién protege y qué preguntar antes de firmar. Habla con tu asesor.",
    respuesta:
      "Un seguro exequial cubre los gastos del funeral de las personas aseguradas y lo expide una aseguradora vigilada por la Superintendencia Financiera, que indemniza en dinero. Un plan exequial, en cambio, lo vende una funeraria o una cooperativa y entrega los servicios en especie. Antes de firmar, revisa a quién cubre, desde cuándo y con qué límites.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el plan de la familia Ortiz en Malambo",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Doña Ruth vive en Malambo y lleva años pagando cada mes un plan exequial con una funeraria. Siempre le dijo a su familia que estaban todos asegurados. Nadie leyó el contrato.",
          },
          {
            tipo: "p",
            texto:
              "Cuando muere su hermano, que vivía con ella, la familia llama a la funeraria. Ahí descubren que el plan cubría a Doña Ruth, a su esposo y a sus hijos, pero no a su hermano: él nunca había sido inscrito. La familia termina pagando el servicio por su cuenta, con prisa y sin comparar.",
          },
          {
            tipo: "p",
            texto:
              "Después, con su asesor, Doña Ruth revisa qué tiene, quiénes están inscritos y si le conviene un plan o un seguro exequial para el resto de la familia. La lección: lo que importa no es solo pagar la cuota, sino saber qué compraste, quién está cubierto y cómo se usa el día que se necesita.",
          },
        ],
      },
      {
        titulo: "¿Qué diferencia hay entre un plan exequial y un seguro exequial?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La diferencia está en quién lo ofrece y cómo responde: el plan exequial lo presta una funeraria o una cooperativa en especie; el seguro exequial lo expide una aseguradora y paga en dinero. La base es el artículo 111 de la Ley 795 de 2003, adicionado por el artículo 86 de la Ley 1328 de 2009.",
          },
          {
            tipo: "p",
            texto:
              "Ese artículo dice que no constituyen actividad aseguradora los servicios funerarios mediante los cuales una persona o un grupo de personas adquiere el derecho de recibir en especie servicios exequiales, pagando cuotas fijadas con antelación. Esos servicios los pueden prestar cooperativas, mutuales, entidades sin ánimo de lucro y sociedades comerciales, con excepción de las aseguradoras. Su parágrafo 3 dice que las aseguradoras autorizadas por la Superintendencia Financiera que exploten el seguro exequial deben indemnizar únicamente en dinero al tomador o a sus beneficiarios, previa comprobación del pago del servicio funerario, prestado por entidades legalmente constituidas para eso.",
          },
          {
            tipo: "tabla",
            caption: "Plan exequial vs. seguro exequial",
            columnas: ["", "Plan exequial", "Seguro exequial"],
            filas: [
              ["Quién lo ofrece", "Funerarias, cooperativas, mutuales y otras entidades que no son aseguradoras.", "Aseguradoras autorizadas por la Superintendencia Financiera."],
              ["Cómo responde", "Presta el servicio funerario directamente, en especie.", "Paga en dinero, previa comprobación del pago del servicio funerario."],
              ["¿Es un seguro?", "No. La ley dice que no es actividad aseguradora.", "Sí. Es un contrato de seguro."],
              ["Quién lo vigila", "La Superintendencia Financiera ha dicho que las funerarias no están bajo su vigilancia; las cooperativas las vigila la Superintendencia de la Economía Solidaria.", "La Superintendencia Financiera."],
            ],
          },
        ],
      },
      {
        titulo: "¿Qué cubre un seguro exequial?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cubre los gastos del servicio funerario de las personas aseguradas, hasta el valor y con las condiciones que diga la póliza. Para entender qué entra en un servicio funerario, sirve la definición del parágrafo 1 del mismo artículo 111:",
          },
          {
            tipo: "lista",
            items: [
              "Servicios básicos: preparación del cuerpo, obtención de licencias de inhumación o cremación, traslado del cuerpo, carroza fúnebre, cofre, sala de velación y trámites civiles y eclesiásticos.",
              "Servicios complementarios: arreglos florales, avisos murales y de prensa, transporte de acompañantes y acompañamiento musical.",
              "Destino final: inhumación o cremación del cuerpo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Cada póliza define cuáles de esos servicios reconoce y hasta qué valor. Pregunta también si cubre el traslado del cuerpo desde otra ciudad o desde el exterior, el lote o la bóveda, y si hay coberturas adicionales. Si buscas dejarle a tu familia dinero para vivir, eso no lo hace un seguro exequial; lo explicamos en ¿Cuánto seguro de vida necesito y quién lo necesita?",
          },
        ],
      },
      {
        titulo: "¿A quién cubre un seguro exequial?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cubre a las personas inscritas en la póliza, nada más. Por eso lo primero es revisar la lista de asegurados y no dar por hecho que toda la familia está incluida.",
          },
          {
            tipo: "lista",
            items: [
              "En muchas pólizas se puede asegurar al titular y a un grupo familiar: pareja, hijos y, a veces, padres, hermanos u otros parientes.",
              "Suele haber límites de edad para entrar y, en algunos casos, para seguir cubierto. Pregunta qué pasa cuando un hijo cumple cierta edad.",
              "Muchas pólizas tienen un periodo de carencia: un tiempo desde la contratación durante el cual la muerte por enfermedad no se cubre o se cubre parcialmente. La muerte por accidente suele cubrirse desde el inicio, según la póliza.",
              "Si alguien se va de la casa o cambia la composición de la familia, actualiza la lista.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Declara con sinceridad la información que te pidan al contratar. El artículo 1058 del Código de Comercio dice que callar o declarar mal hechos que habrían cambiado la decisión de la aseguradora produce la nulidad relativa del seguro.",
          },
        ],
      },
      {
        titulo: "¿Qué preguntar antes de contratar un plan o un seguro exequial?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Pregunta por escrito qué cubre, a quién y cómo se usa el día que se necesita. Estas preguntas te ahorran sorpresas:",
          },
          {
            tipo: "pasos",
            items: [
              "¿Es un plan exequial o un seguro exequial? ¿Quién lo vigila?",
              "¿Quiénes quedan cubiertos y cómo se agrega o se retira a alguien?",
              "¿Hay periodo de carencia y límites de edad?",
              "¿Qué servicios incluye y hasta qué valor? ¿Incluye el destino final?",
              "¿Funciona en otras ciudades, como Cartagena o Santa Marta, y si la muerte ocurre fuera del país?",
              "¿A qué número llama la familia y qué documentos debe presentar?",
              "Si es un seguro: ¿cómo se hace el pago y en qué plazo?",
              "¿Qué pasa si dejo de pagar una cuota o la prima?",
            ],
          },
          {
            tipo: "p",
            texto:
              "Guarda el contrato o la póliza donde tu familia lo encuentre y cuéntales a quién llamar. Si tienes dudas, tu asesor te ayuda a revisar lo que ya tienes.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El plan de la funeraria es un seguro?",
        respuesta:
          "No. El artículo 111 de la Ley 795 de 2003 dice que los servicios funerarios que se pagan por cuotas y se reciben en especie no son actividad aseguradora. El seguro exequial, en cambio, lo expide una aseguradora vigilada por la Superintendencia Financiera.",
      },
      {
        pregunta: "¿Puedo tener un seguro exequial y un plan exequial al mismo tiempo?",
        respuesta:
          "Sí, no hay nada que lo impida. Pero revisa si te conviene: puedes terminar pagando dos veces por lo mismo. Muchas veces es mejor un solo producto bien escogido que cubra a toda la familia que dos a medias.",
      },
      {
        pregunta: "¿Qué pasa si la persona fallece en otra ciudad?",
        respuesta:
          "Depende de tu póliza o de tu plan. Algunos incluyen el traslado del cuerpo dentro del país o desde el exterior, con límites, y otros no. Pregúntalo antes de firmar, sobre todo si alguien de tu familia viaja o vive lejos de Barranquilla.",
      },
      {
        pregunta: "¿Desde cuándo queda cubierta una persona que acabo de inscribir?",
        respuesta:
          "Depende del periodo de carencia que fije la póliza o el plan. En muchos casos la muerte por accidente se cubre desde el inicio y la muerte por enfermedad después de un tiempo. Pide que te lo confirmen por escrito al inscribirla.",
      },
    ],
    ramoRuta: "/seguros/exequial",
    waMensaje:
      "Hola, leí la guía de qué cubre un seguro exequial y quiero revisar cuál le conviene a mi familia.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Ley 795 de 2003, art. 111 (adicionado por el art. 86 de la Ley 1328 de 2009): servicios funerarios en especie no son actividad aseguradora; definición de servicios funerarios (par. 1); aseguradoras indemnizan solo en dinero (par. 3) — https://normativa.colpensiones.gov.co/colpens/docs/ley_0795_2003.htm",
      "Verificar con el asesor: Superintendencia Financiera, Concepto 2013010872-002 del 22-03-2013 (servicios funerarios no son actividad aseguradora; las funerarias no están bajo su vigilancia; las cooperativas, bajo la Superintendencia de la Economía Solidaria) — https://www.superfinanciera.gov.co/publicaciones/10081626",
      "Verificar con el asesor: Código de Comercio, art. 1058 (declaración del estado del riesgo) — https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr032.htm",
      "Verificar con el asesor: cómo opera en la práctica el pago del seguro exequial en las aseguradoras con las que trabaja VanTrust (reembolso a la familia o pago coordinado con la funeraria), dado que la ley dice que se indemniza en dinero previa comprobación del pago del servicio.",
      "Verificar con el asesor: periodos de carencia, límites de edad, grupo familiar asegurable y traslados en los seguros exequiales que comercializa VanTrust (se dejó en general).",
    ],
  },

  // 9. Accidentes personales vs. vida
  {
    slug: "seguro-accidentes-personales-vs-vida",
    titulo: "¿Seguro de accidentes personales o seguro de vida: cuál necesito?",
    title: "Seguro de accidentes personales vs. seguro de vida",
    description:
      "Seguro de accidentes personales vs. seguro de vida: qué cubre cada uno, para quién conviene y cómo se complementan. Pregúntale a tu asesor cuál te sirve.",
    respuesta:
      "El seguro de accidentes personales paga solo si el daño viene de un accidente: muerte accidental, incapacidad o desmembración y, en muchas pólizas, gastos médicos. El seguro de vida paga a tus beneficiarios si mueres por casi cualquier causa, incluida una enfermedad. Al independiente que se mueve en moto o hace deporte le sirve el primero; a quien tiene una familia que depende de él, el segundo.",
    secciones: [
      {
        titulo: "Caso ilustrativo: dos hermanos y dos pólizas distintas",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Kevin es domiciliario independiente en Barranquilla y anda todo el día en moto. Por consejo de su asesor tomó un seguro de accidentes personales. Su hermano Daniel trabaja en una oficina, tiene dos hijos y tomó un seguro de vida.",
          },
          {
            tipo: "p",
            texto:
              "Un día un carro le cierra el paso a Kevin en la Murillo y se fractura la muñeca. No puede trabajar por varias semanas. Su póliza incluía gastos médicos por accidente y una indemnización por incapacidad, y con eso cubrió parte de lo que dejó de ganar, según la tabla de su póliza. Meses después, a Daniel le diagnostican una enfermedad. Si hubiera tenido solo un seguro de accidentes, no le habría servido de nada, porque la enfermedad no es un accidente.",
          },
          {
            tipo: "p",
            texto:
              "La lección: los dos seguros protegen cosas distintas. El de accidentes cubre el golpe que te saca de la calle; el de vida protege a tu familia si faltas, sea por lo que sea. Escoger depende de qué riesgo pesa más en tu vida.",
          },
        ],
      },
      {
        titulo: "¿Qué diferencia hay entre un seguro de accidentes personales y uno de vida?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La diferencia es la causa que cubren. El seguro de accidentes personales es una póliza que paga cuando sufres un accidente: un hecho súbito, externo, violento e involuntario, como suelen definirlo muchas pólizas. El seguro de vida es una póliza que paga a tus beneficiarios si mueres, por accidente o por enfermedad, según sus condiciones.",
          },
          {
            tipo: "tabla",
            caption: "Seguro de accidentes personales vs. seguro de vida (según la póliza)",
            columnas: ["", "Accidentes personales", "Vida"],
            filas: [
              ["Qué cubre", "Solo eventos causados por un accidente.", "La muerte por casi cualquier causa, incluida la enfermedad."],
              ["Coberturas típicas", "Muerte accidental, incapacidad total o parcial, desmembración y, en muchas pólizas, gastos médicos por accidente.", "Muerte y, si se contrata, incapacidad total y permanente o enfermedades graves."],
              ["A quién le paga", "A ti, si quedas incapacitado o te accidentas; a tus beneficiarios, si mueres.", "A tus beneficiarios."],
              ["Precio", "Suele ser más bajo, porque cubre menos riesgos.", "Suele ser más alto, porque cubre más causas."],
              ["Requisitos", "Suele pedir menos preguntas de salud.", "Según la edad y el valor, puede pedir declaración de salud y exámenes."],
              ["Qué revisar", "Exclusiones por actividad: deportes de riesgo, moto, alcohol.", "Exclusiones, periodo de carencia y valor asegurado."],
            ],
          },
        ],
      },
      {
        titulo: "¿Para quién conviene el seguro de accidentes personales?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Conviene a quien está muy expuesto a accidentes y depende de su cuerpo para ganarse la vida. Algunos ejemplos:",
          },
          {
            tipo: "lista",
            items: [
              "Independientes y trabajadores por cuenta propia, que si no trabajan no ganan y no tienen quién les pague los días de incapacidad.",
              "Motociclistas y domiciliarios. El SOAT de la moto atiende a los lesionados en accidentes de tránsito con sus propias reglas; el seguro de accidentes personales es voluntario y aparte, y puede cubrir accidentes de cualquier tipo, no solo de tránsito.",
              "Deportistas aficionados que entrenan fútbol, ciclismo o deportes de contacto. Revisa que tu deporte no esté excluido.",
              "Jóvenes sin personas a cargo, para quienes un seguro de vida grande no es prioridad pero un accidente sí los dejaría sin ingresos.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Si te accidentas trabajando como empleado, tu ARL atiende el accidente de trabajo. El seguro de accidentes personales sirve también para lo que pasa fuera de la jornada: el fin de semana, en la casa o en la cancha.",
          },
        ],
      },
      {
        titulo: "¿Para quién conviene el seguro de vida?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Conviene a quien tiene personas que dependen de sus ingresos o deudas que no quiere dejarle a su familia. Si tienes hijos, una pareja a cargo, padres que mantienes o un crédito de vivienda, el seguro de vida es el que protege a tu familia si faltas por cualquier causa.",
          },
          {
            tipo: "p",
            texto:
              "La enfermedad es una causa frecuente de muerte que el seguro de accidentes no cubre. Por eso, si tu prioridad es tu familia, el seguro de accidentes solo no basta. Para hacer la cuenta de cuánto asegurar, lee ¿Cuánto seguro de vida necesito y quién lo necesita?",
          },
        ],
      },
      {
        titulo: "¿Cómo se complementan el seguro de accidentes personales y el de vida?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Se complementan porque cubren huecos distintos: el de vida protege a tu familia si mueres; el de accidentes te protege a ti si un accidente te deja sin trabajar o con una lesión. Tenerlos juntos es común y no hay norma que lo impida.",
          },
          {
            tipo: "pasos",
            items: [
              "Empieza por lo que más te preocupa: tu familia (vida) o tu ingreso si te lesionas (accidentes).",
              "Revisa lo que ya tienes: un vida grupo de la empresa, un vida deudor del crédito o asistencias de la tarjeta.",
              "Pregunta si el seguro de vida que estás mirando permite agregar coberturas de incapacidad o de muerte accidental.",
              "Declara tu ocupación y tus actividades reales: si andas en moto o practicas un deporte, dilo.",
              "Revisa cada año si tu situación cambió: hijos, deudas, trabajo nuevo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Lo de declarar no es un detalle. El artículo 1058 del Código de Comercio obliga al tomador a declarar sinceramente los hechos que determinan el estado del riesgo; callar o declarar mal algo que habría cambiado la decisión de la aseguradora produce la nulidad relativa del seguro. Tu asesor en VanTrust te ayuda a comparar las opciones y a llenar bien la solicitud.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de accidentes personales paga si me muero de un infarto?",
        respuesta:
          "Por lo general no, porque un infarto se considera una enfermedad y no un accidente. Para cubrir la muerte por enfermedad necesitas un seguro de vida. Revisa la definición de accidente en tu póliza, que es la que manda.",
      },
      {
        pregunta: "¿Me cubre el seguro de accidentes si me caigo de la moto?",
        respuesta:
          "Muchas pólizas cubren los accidentes en moto, pero algunas los excluyen o los limitan, sobre todo si es tu herramienta de trabajo. Dile al asesor que usas moto antes de contratar, para que la póliza que escojas sí lo cubra.",
      },
      {
        pregunta: "¿Puedo tener un seguro de vida y uno de accidentes al mismo tiempo?",
        respuesta:
          "Sí. Son seguros de personas y puedes tener varios. Si mueres en un accidente, en principio pueden pagar los dos, según sus condiciones. Al calcular cuánto asegurar, suma lo que ya tienes para no pagar de más.",
      },
      {
        pregunta: "¿Necesito exámenes médicos para un seguro de accidentes personales?",
        respuesta:
          "Normalmente piden menos requisitos de salud que un seguro de vida, porque solo cubre accidentes. Aun así, debes responder con la verdad lo que te pregunten sobre tu salud, tu ocupación y tus actividades.",
      },
    ],
    ramoRuta: "/seguros/accidentes-personales",
    waMensaje:
      "Hola, leí la guía de seguro de accidentes personales vs. vida y quiero saber cuál me conviene.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Código de Comercio, art. 1058 (declaración del estado del riesgo, reticencia) — https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr032.htm",
      "Verificar con el asesor: definición de accidente (súbito, externo, violento e involuntario) y exclusiones por moto y deportes en las pólizas de accidentes personales que comercializa VanTrust (se dejó como \"muchas pólizas\").",
      "Verificar con el asesor: la mención del SOAT y de la ARL es informativa y general; no se citaron normas ni coberturas por no haberlas verificado. VanTrust no vende SOAT.",
    ],
  },

  // 10. Seguro de vida deudor
  {
    slug: "seguro-vida-deudor-puedo-cambiarlo",
    titulo: "¿Puedo cambiar el seguro de vida deudor del banco por mi propia póliza?",
    title: "Seguro de vida deudor: ¿puedes cambiarlo por el tuyo?",
    description:
      "Seguro de vida deudor: cuándo puedes llevar tu propia póliza endosada al banco, qué dice la norma y qué revisar en la declaración de salud. Te asesoramos.",
    respuesta:
      "Sí, puedes cambiar el seguro de vida deudor del banco por una póliza propia endosada a su favor. En créditos hipotecarios y de leasing habitacional, el Decreto 2555 de 2010 dice que el banco no puede rechazarla si cumple, como mínimo, las condiciones de su licitación. En otros créditos, la ley protege tu libertad de escoger aseguradora. Revisa bien la declaración de salud.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el apartamento en Puerto Colombia",
        bloques: [
          {
            tipo: "p",
            texto:
              "Este es un ejemplo para explicar cómo funciona; no es un cliente real.",
          },
          {
            tipo: "p",
            texto:
              "Andrea y Mauricio compran apartamento en Puerto Colombia con un crédito hipotecario. El banco les incluye en la cuota el seguro de vida deudor que contrató por licitación. Mauricio ya tenía un seguro de vida individual y se pregunta si está pagando dos veces.",
          },
          {
            tipo: "p",
            texto:
              "Con su asesor piden al banco las condiciones del seguro, comparan y cotizan una póliza que cumple, como mínimo, lo mismo que pide el banco. Al llenar la solicitud, Mauricio declara que toma medicamento para la presión; la aseguradora lo acepta con esa información. Presentan la póliza endosada al banco, que la revisa y la acepta.",
          },
          {
            tipo: "p",
            texto:
              "La lección: cambiar el vida deudor es un derecho, pero la póliza nueva debe cumplir lo que pide el banco, y la declaración de salud debe ser completa. Si Mauricio hubiera callado lo de la presión para que le salieran mejores condiciones, habría puesto en riesgo el pago justo cuando su familia lo necesitara.",
          },
        ],
      },
      {
        titulo: "¿Qué es el seguro de vida deudor?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El seguro de vida deudor es una póliza que paga al banco el saldo de tu deuda si mueres o, si así se contrata, si quedas con una incapacidad total y permanente. Su objetivo es que tu familia no herede la deuda. No le deja dinero a tu familia para vivir: para eso existe el seguro de vida individual, como explicamos en ¿Cuánto seguro de vida necesito y quién lo necesita?",
          },
          {
            tipo: "p",
            texto:
              "Endosar una póliza es designar al banco como beneficiario de tu seguro hasta el saldo de la deuda, para que esa póliza le sirva de garantía en lugar de la que contrató él. Lo que sobre del valor asegurado, después de pagar la deuda, queda para los beneficiarios que tú designes, según la póliza.",
          },
        ],
      },
      {
        titulo: "¿Puedo llevar mi propia póliza de vida deudor endosada al banco?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Sí. En créditos hipotecarios y de leasing habitacional lo dice de forma expresa la norma; en los demás créditos, la ley protege tu libertad de escoger aseguradora.",
          },
          {
            tipo: "p",
            texto:
              "Para créditos con hipoteca o leasing habitacional, el Decreto 673 de 2014 adicionó al Decreto 2555 de 2010 el artículo 2.36.2.2.5, sobre libertad de elección. Dice que el deudor puede contratar con otra aseguradora siempre que las condiciones del seguro sean, cuando menos, iguales a las del pliego de la licitación. El banco no puede rechazar pólizas que cumplan esas condiciones ni cobrar por revisarlas o aceptarlas. Si la rechaza por no cumplir, debe informarte las causales por escrito dentro de los diez días hábiles siguientes a tu solicitud.",
          },
          {
            tipo: "p",
            texto:
              "Además, según el artículo 2.36.2.2.8 del mismo decreto, modificado por el Decreto 1534 de 2016, cuando el banco adjudica la licitación debe informarte el resultado, con el nombre de la aseguradora y el cambio de la tasa, y tu derecho a escoger otra aseguradora, indicándote la totalidad de las condiciones del seguro.",
          },
          {
            tipo: "p",
            texto:
              "Para otros créditos, como consumo o vehículo, la Superintendencia Financiera, en su Concepto 54877 de 2023, recuerda que el numeral 2 del artículo 100 del Estatuto Orgánico del Sistema Financiero reconoce la libertad de escogencia del asegurador cuando el banco exige un seguro, y que la Circular Básica Jurídica obliga al banco a informarte por escrito cómo puedes acreditar esa garantía y sus condiciones de aceptación o rechazo.",
          },
        ],
      },
      {
        titulo: "¿Cómo cambiar el seguro de vida deudor paso a paso?",
        bloques: [
          {
            tipo: "pasos",
            items: [
              "Pide al banco, por escrito, las condiciones mínimas que debe cumplir la póliza: coberturas, valor asegurado, vigencia y requisitos del endoso.",
              "Cotiza con tu asesor una póliza que cumpla, como mínimo, esas condiciones. Compara la prima, no solo la cobertura.",
              "Llena la solicitud y la declaración de salud con toda la verdad.",
              "Cuando la aseguradora la expida, pide el endoso a favor del banco.",
              "Radica la póliza y el endoso en el banco y guarda la constancia con fecha.",
              "Espera la respuesta. En hipotecario y leasing habitacional, si la rechazan, deben decirte por escrito por qué, dentro de diez días hábiles.",
              "No canceles nada hasta que el banco confirme que aceptó tu póliza y que deja de cobrarte la suya.",
              "Mantén la póliza al día y renuévala a tiempo; si se vence, el banco puede volver a incluirte en su seguro.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Para que el cambio no te deje días sin cobertura, revisa también ¿Cómo cambiar de aseguradora sin quedarme desprotegido?",
          },
        ],
      },
      {
        titulo: "¿Qué revisar en la declaración de salud del seguro de vida deudor?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Revisa que esté completa y sea verdadera, porque de ella depende que el seguro pague. La declaración de asegurabilidad es el cuestionario en el que cuentas tu estado de salud a la aseguradora antes de que te acepte.",
          },
          {
            tipo: "lista",
            items: [
              "Artículo 1058 del Código de Comercio: debes declarar sinceramente los hechos que determinan el estado del riesgo. Callar o declarar mal algo que habría hecho que la aseguradora no te asegurara, o te cobrara más, produce la nulidad relativa del seguro.",
              "Si el error fue inculpable, el contrato no se anula, pero la aseguradora paga solo un porcentaje, en proporción entre la prima que pagaste y la que correspondía al riesgo real.",
              "Las sanciones no aplican si la aseguradora conocía o debía conocer los hechos antes de firmar, o si después los aceptó.",
              "Artículo 1158: aunque la aseguradora no te pida examen médico, no quedas exento de declarar con la verdad.",
              "Artículo 1160: pasados dos años en vida del asegurado desde que se perfeccionó el contrato, el valor del seguro de vida no puede reducirse por error en la declaración de asegurabilidad.",
            ],
          },
          {
            tipo: "p",
            texto:
              "En la práctica: lee cada pregunta, no firmes un formulario en blanco o llenado por otro, menciona diagnósticos, tratamientos y medicamentos, y guarda copia de lo que firmaste. Si te objetan después, revisa ¿Qué hacer si la aseguradora no quiere pagar tu reclamación?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El banco me puede obligar a tomar su seguro de vida deudor?",
        respuesta:
          "Te puede exigir que el crédito tenga un seguro, pero no que sea el suyo. En hipotecario y leasing habitacional puedes presentar otra póliza que cumpla al menos las condiciones de la licitación, y el banco no puede rechazarla ni cobrarte por revisarla.",
      },
      {
        pregunta: "¿Es más barato llevar mi propia póliza de vida deudor?",
        respuesta:
          "A veces sí y a veces no. Depende de tu edad, tu salud, el saldo de la deuda y la tasa del seguro del banco. Lo correcto es pedir las condiciones del banco y cotizar con las mismas coberturas antes de decidir.",
      },
      {
        pregunta: "¿Puedo usar el seguro de vida que ya tenía para el crédito?",
        respuesta:
          "Puede servir si cumple las condiciones que pide el banco y lo endosas a su favor hasta el saldo de la deuda. Ten en cuenta que esa parte del valor asegurado irá al banco y no a tu familia, así que revisa si te sigue alcanzando.",
      },
      {
        pregunta: "¿Qué pasa si no declaré una enfermedad en el seguro del crédito?",
        respuesta:
          "Si callaste algo que habría cambiado la decisión de la aseguradora, puede alegar nulidad relativa y negar el pago. Si fue un error inculpable, paga un porcentaje. Habla con tu asesor cuanto antes para revisar tu caso y tus opciones.",
      },
    ],
    ramoRuta: "/seguros/vida",
    waMensaje:
      "Hola, leí la guía del seguro de vida deudor y quiero cotizar mi propia póliza para endosarla al banco.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      "Verificar con el asesor: Decreto 2555 de 2010, arts. 2.36.2.2.1, 2.36.2.2.5 (adicionados por el Decreto 673 de 2014: libertad de elección, no rechazo, sin cobro, rechazo por escrito en 10 días hábiles) y 2.36.2.2.8 (modificado por el Decreto 1534 de 2016: información del resultado de la licitación y del derecho a escoger otra aseguradora) — https://normativa.colpensiones.gov.co/colpens/docs/decreto_2555_2010_pr035.htm",
      "Verificar con el asesor: Superintendencia Financiera, Concepto 54877 del 05-07-2023 (art. 100 num. 2 del EOSF, libertad de escogencia del asegurador; Circular Básica Jurídica, Parte I, Título III, Capítulo I, num. 1.3.2.4) — https://normograma.com/keralty/compilacion/docs/concepto_superfinanciera_0054877_2023.htm",
      "Verificar con el asesor: Código de Comercio, art. 1058 (reticencia, error inculpable, excepciones) — https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr032.htm",
      "Verificar con el asesor: Código de Comercio, arts. 1158 (examen médico no exime de declarar) y 1160 (irreductibilidad tras dos años) — https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio_pr035.htm",
      "Verificar con el asesor: no se citó el Decreto 1084 de 2021 (seguros tomados por cuenta de deudores en otros créditos) porque no se pudo leer su texto en una fuente oficial. Si aplica, el asesor puede añadirlo.",
      "Verificar con el asesor: requisitos de endoso y canal de radicación de los bancos con que trabajan los clientes de VanTrust (la Superfinanciera dijo que no hay norma que obligue a un canal digital de endosos).",
    ],
  },
];
