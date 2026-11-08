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
        titulo: "Plan complementario, medicina prepagada y póliza de salud",
        bloques: [
          {
            tipo: "p",
            texto:
              "En Colombia estas tres opciones se llaman planes voluntarios de salud. El Decreto 780 de 2016 dice que los pagan los particulares con su propio dinero y que los ofrecen las EPS, las empresas de medicina prepagada y las aseguradoras. Las tres se suman a tu EPS; ninguna la reemplaza.",
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
        titulo: "Preexistencias: lo que ya tenías antes de firmar",
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
        titulo: "Periodos de carencia",
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
      "Necesitas un seguro de vida si alguien depende de tu ingreso o si dejarías deudas que tu familia tendría que pagar. Para calcular cuánto asegurar, suma tus deudas, los gastos de tu hogar durante los años en que tu familia dependería de ti y la educación de tus hijos; luego réstale lo que ya tienes en ahorros y otros seguros. El seguro de vida deudor del banco no reemplaza este cálculo, porque solo paga la deuda.",
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
        titulo: "Cómo calcular cuánto asegurar, paso a paso",
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
        titulo: "Vida individual vs. seguro de vida deudor",
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
        titulo: "Beneficiarios y otros puntos que debes saber",
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
    title: "Seguro de hogar: qué cubre y qué no cubre",
    description:
      "Estructura, contenidos, incendio, terremoto, agua, hurto y RC: qué cubre el seguro de hogar y por qué el del banco no basta. Cotiza tu hogar con nosotros.",
    respuesta:
      "Un seguro de hogar cubre dos cosas: la estructura de la vivienda (muros, techos, pisos e instalaciones fijas) y los contenidos (muebles, electrodomésticos y objetos personales), frente a riesgos como incendio, terremoto, daños por agua, fenómenos de la naturaleza y hurto, según la póliza. Muchas pólizas incluyen responsabilidad civil familiar y asistencias en casa. El seguro que exige el banco en un crédito hipotecario suele cubrir solo la estructura frente a incendio y terremoto.",
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
        titulo: "Estructura y contenidos: las dos partes del seguro",
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
        titulo: "Qué cubre y qué no, riesgo por riesgo",
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
        titulo: "Lluvias, vendavales y arroyos en Barranquilla",
        bloques: [
          {
            tipo: "p",
            texto:
              "En Barranquilla las lluvias llegan de golpe, con brisa fuerte, y en muchas zonas se forman arroyos en minutos. Eso hace que para una casa en la Costa importen tanto los daños por agua y los fenómenos de la naturaleza como el incendio o el terremoto.",
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
        titulo: "El seguro del banco no es un seguro de hogar completo",
        bloques: [
          {
            tipo: "p",
            texto:
              "Cuando compras vivienda con crédito hipotecario o leasing habitacional, el banco exige un seguro sobre el inmueble, normalmente contra incendio y terremoto, para proteger su garantía. La norma del sector financiero obliga a los bancos a licitar estos seguros cuando los toman por cuenta del deudor, y te permite contratar con otra aseguradora si la póliza cumple como mínimo las condiciones de esa licitación.",
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
          "Sí. Puedes asegurar tus contenidos y tu responsabilidad civil frente al propietario y los vecinos, sin asegurar la estructura.",
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
      "El seguro de arrendamiento le paga al propietario el canon que el inquilino deje de pagar y, según la póliza, también las cuotas de administración, los servicios públicos pendientes y algunos daños al inmueble. Antes de expedirlo, la aseguradora estudia al inquilino y a sus codeudores. En vivienda urbana es una forma de respaldar el contrato, porque la Ley 820 de 2003 prohíbe exigir depósitos en efectivo u otras cauciones reales.",
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
        titulo: "Qué puede cubrir, según la póliza",
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
        titulo: "Qué dice la Ley 820 de 2003 sobre las garantías",
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
        titulo: "Cómo funciona, paso a paso",
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
          "Depende de la póliza. Cada una fija cuándo empieza a pagar, cuántos meses cubre y qué plazos tienes para avisar. Pídelos por escrito.",
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
      "Para cambiar de aseguradora sin quedar desprotegido, haz que la póliza nueva empiece el mismo día y a la misma hora en que vence la anterior, y no canceles la vieja hasta tener la nueva expedida. En carros, haz la inspección con tiempo; en salud, revisa antes qué preexistencias te excluiría la nueva entidad. Si cancelas antes del vencimiento, el Código de Comercio te permite revocar el seguro por escrito y recuperar parte de la prima no devengada.",
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
        titulo: "El calendario para cambiarte sin baches",
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
        titulo: "Carros: la inspección y la prenda",
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
        titulo: "Salud: el cambio que más cuidado pide",
        bloques: [
          {
            tipo: "p",
            texto:
              "En salud, cambiarse no es igual que en carros. Según el Decreto 780 de 2016, al renovar con la misma entidad no te pueden agregar preexistencias distintas a las que tenías antes del contrato inicial. Pero con otra entidad empiezas un contrato nuevo, y lo que te diagnosticaron en los últimos años puede quedar como preexistencia excluida.",
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
        titulo: "Si cancelas antes del vencimiento: la prima no devengada",
        bloques: [
          {
            tipo: "p",
            texto:
              "El artículo 1071 del Código de Comercio permite que el asegurado revoque el seguro en cualquier momento, con un aviso escrito a la aseguradora. La aseguradora, en cambio, solo puede revocarlo con aviso escrito de al menos diez días, salvo en los seguros de vida, que no puede revocar.",
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
      "Puedes comprar un seguro directo a la aseguradora o por medio de un intermediario: un agente, una agencia o un corredor. El intermediario te ayuda a comparar, a entender la póliza y a hacer los trámites, y su comisión la pactan él y la aseguradora. Comprar directo puede bastar si tu necesidad es simple y ya sabes qué quieres; un intermediario aporta más cuando necesitas comparar varias opciones o que alguien te acompañe en un siniestro.",
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
        titulo: "Agente, agencia y corredor: quién es quién",
        bloques: [
          {
            tipo: "p",
            texto:
              "En Colombia los intermediarios de seguros están definidos en el Código de Comercio y en el Estatuto Orgánico del Sistema Financiero (Decreto 663 de 1993). Hay tres figuras:",
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
        titulo: "Cómo se les paga",
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
        titulo: "Ventajas y límites, sin rodeos",
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
        titulo: "Tus derechos son los mismos por cualquier vía",
        bloques: [
          {
            tipo: "lista",
            items: [
              "La Ley 1328 de 2009 te da derecho a información transparente, clara, veraz y oportuna sobre el producto que compras.",
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
          "Solo pueden usar el título de corredor las sociedades inscritas en la Superintendencia Financiera con certificado vigente. Pídele ese certificado.",
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
];
