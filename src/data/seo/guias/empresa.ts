// Guías de seguros empresariales para dueños de pymes de la Costa (SEO + AEO).
//
// Reglas del brief (docs/brief-guias.md): nada de cifras, tarifas ni
// testimonios inventados; cada guía abre con un caso ilustrativo rotulado;
// las normas citadas se verificaron en fuentes oficiales y quedan en `todo`
// para que el asesor las confirme. Sin SOAT. La ARL se menciona solo como
// sistema obligatorio, no como producto.

import type { Guia } from "../tipos";
import { PENDIENTE_CASO, PENDIENTE_REVISION } from "../guias-comun";

const FUENTE_CCO =
  "https://normativa.colpensiones.gov.co/colpens/docs/codigo_comercio.htm";
const FUENTE_L222 =
  "https://normativa.colpensiones.gov.co/colpens/docs/ley_0222_1995.htm";
const FUENTE_L1258 =
  "https://normativa.colpensiones.gov.co/colpens/docs/ley_1258_2008.htm";
const FUENTE_L1562 =
  "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=48365";
const FUENTE_L675 =
  "https://gestornormativo.creg.gov.co/Publicac.nsf/Indice01/Leyes-2001-Ley675-2001.html";

const CASO_ILUSTRATIVO =
  "Este es un ejemplo para explicar cómo funciona; no es un cliente real.";

export const GUIAS_EMPRESA: Guia[] = [
  // ───────────── 1. Manejo global ─────────────
  {
    slug: "seguro-de-manejo-global-empleados",
    titulo: "¿Qué cubre el seguro de manejo global si un empleado roba o hace fraude?",
    title: "Seguro de manejo global: robo y fraude de empleados",
    description:
      "El seguro de manejo global cubre lo que te roban o defraudan tus propios empleados. Qué ampara, en qué se diferencia de la sustracción y cómo se prueba.",
    respuesta:
      "El seguro de manejo global es la póliza que le paga a tu empresa las pérdidas de dinero o bienes causadas por actos deshonestos de tus empleados, como hurto, abuso de confianza, falsificación o desfalco. No cubre el robo de un extraño que entra al local: eso es sustracción. Para cobrarlo debes demostrar la pérdida y que la causó un trabajador, según las condiciones de la póliza.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el faltante que nadie vio venir",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Ricardo tiene una distribuidora de repuestos en la Calle 30 de Barranquilla. Su auxiliar contable llevaba años en la empresa, manejaba la caja, los pagos a proveedores y la conciliación del banco. Nadie revisaba su trabajo porque era de toda confianza. Un día el contador externo notó pagos repetidos a un proveedor que no existía.",
          },
          {
            tipo: "p",
            texto:
              "La auditoría mostró que durante meses la auxiliar había desviado dinero a una cuenta propia. Ricardo tenía un seguro para pyme con sustracción, pero esa cobertura atiende el robo con fuerza de un tercero, no lo que hace un empleado desde adentro. No tenía manejo global, así que la pérdida la asumió la empresa completa.",
          },
          {
            tipo: "p",
            texto:
              "Si hubiera tenido la póliza, habría podido reclamar con la denuncia penal, la auditoría y los soportes contables, hasta el valor asegurado y descontando el deducible. La lección: en una pyme, el riesgo más grande de dinero a veces no está en la calle sino en la confianza sin control.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre el seguro de manejo global?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El seguro de manejo global cubre la apropiación indebida de dinero, títulos o bienes de la empresa por parte de sus empleados. Un amparo es cada riesgo que la póliza se compromete a pagar, y en manejo los amparos más comunes son estos, según la póliza:",
          },
          {
            tipo: "tabla",
            caption: "Amparos frecuentes en una póliza de manejo global",
            columnas: ["Amparo", "Ejemplo en una pyme"],
            filas: [
              ["Hurto y hurto calificado por empleados", "El bodeguero saca mercancía del inventario y la vende por su cuenta."],
              ["Abuso de confianza", "El mensajero recibe un recaudo de un cliente y no lo entrega."],
              ["Falsedad y falsificación", "Un empleado altera cheques, facturas o soportes de pago."],
              ["Estafa", "El encargado de compras simula un proveedor para desviar pagos."],
              ["Empleados no identificados", "Se prueba que el faltante lo causó personal de la empresa, aunque no se sepa quién. Solo si la póliza lo incluye."],
              ["Empleados temporales o de firmas especializadas", "Personal en misión que maneja caja o inventario. Solo si se pacta."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Muchas pólizas incluyen también gastos de rendición de cuentas o de auditoría para cuantificar la pérdida, con sublímites. Las coberturas varían entre aseguradoras: revisa la definición de empleado y la lista de delitos amparados antes de firmar.",
          },
        ],
      },
      {
        titulo: "¿Cuál es la diferencia entre manejo global y sustracción?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La diferencia está en quién comete el acto. El manejo global cubre lo que hacen tus empleados; la sustracción cubre el robo de terceros que entran al local, por lo general con violencia o fuerza.",
          },
          {
            tipo: "tabla",
            caption: "Manejo global vs. sustracción",
            columnas: ["Tema", "Manejo global", "Sustracción"],
            filas: [
              ["Quién causa la pérdida", "Un empleado de la empresa.", "Un tercero ajeno a la empresa."],
              ["Cómo ocurre", "Desde adentro y muchas veces poco a poco: desvíos, faltantes, documentos falsos.", "En un solo hecho: entran forzando una puerta o con violencia."],
              ["Cuándo se descubre", "A veces meses después, en una auditoría o un inventario.", "Casi siempre de inmediato."],
              ["Prueba principal", "Auditoría, soportes contables, denuncia penal contra el empleado.", "Denuncia, señales de fuerza, inventario de lo robado."],
              ["Dónde suele venir", "Póliza propia o amparo dentro de un seguro para pyme.", "Amparo del seguro para pyme o de daños."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Los faltantes de inventario que no se pueden explicar ni atribuir a nadie suelen quedar por fuera de las dos. Si quieres ver qué incluye un seguro para tus bienes, lee ¿Qué cubre un seguro para pyme y cómo definir el valor asegurado?",
          },
        ],
      },
      {
        titulo: "¿Cómo se prueba un fraude de empleados ante la aseguradora?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Se prueba con documentos que muestren qué se perdió, cuánto y que lo hizo un empleado. El artículo 1077 del Código de Comercio dice que le corresponde al asegurado demostrar la ocurrencia del siniestro y la cuantía de la pérdida.",
          },
          {
            tipo: "pasos",
            items: [
              "Apenas descubras el hecho, avisa a la aseguradora o al asesor. El artículo 1075 del Código de Comercio da tres días desde que lo conociste o debiste conocerlo, y la póliza puede ampliar ese plazo.",
              "Pon la denuncia penal ante la Fiscalía. La mayoría de pólizas de manejo la exigen.",
              "Conserva sin alterar los libros, extractos, facturas, correos y registros del sistema contable.",
              "Haz o contrata una auditoría que cuantifique la pérdida, periodo por periodo.",
              "Reúne la hoja de vida, el contrato y las funciones del empleado: muestran que manejaba esos recursos.",
              "Entrega la reclamación con todo el soporte y lleva registro de lo que envías.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Ojo con los tiempos: el artículo 1081 del Código de Comercio fija una prescripción ordinaria de dos años desde que conociste o debiste conocer el hecho. Si la aseguradora objeta, revisa ¿Qué hacer si la aseguradora no quiere pagar tu reclamación?",
          },
        ],
      },
      {
        titulo: "¿Cuánto debo asegurar y qué controles pide la aseguradora?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El valor asegurado debe reflejar el dinero y los bienes que tus empleados manejan en el periodo en que un fraude podría pasar sin ser detectado. No hay un monto estándar: depende de tu caja, tus recaudos, tu inventario y tus controles.",
          },
          {
            tipo: "lista",
            items: [
              "Cuántos empleados manejan dinero, pagos o inventario, y qué cargos tienen.",
              "Cuánto efectivo y recaudo se mueve al mes, y cada cuánto se concilia.",
              "Si hay doble firma o doble aprobación para pagos y transferencias.",
              "Si se hacen inventarios periódicos y auditorías, internas o externas.",
              "Si haces verificación de antecedentes al contratar.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Mejores controles no solo bajan el riesgo: también facilitan probar una pérdida. Un asesor te ayuda a definir el valor asegurado y a revisar si conviene una póliza propia o un amparo dentro del seguro de la empresa.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro de manejo cubre si el empleado ya se fue de la empresa?",
        respuesta:
          "Depende de la póliza. Muchas cubren pérdidas causadas mientras la persona era empleada y descubiertas durante la vigencia o en un plazo posterior pactado. Revisa las condiciones de descubrimiento y de retroactividad antes de contratar o de cambiar de aseguradora.",
      },
      {
        pregunta: "¿Tengo que saber cuál empleado fue para poder reclamar?",
        respuesta:
          "No siempre. Algunas pólizas incluyen un amparo para empleados no identificados, siempre que demuestres que la pérdida la causó personal de la empresa. Si tu póliza no lo trae, normalmente debes identificar al responsable y denunciarlo.",
      },
      {
        pregunta: "¿Cubre los faltantes que aparecen en el inventario de fin de año?",
        respuesta:
          "Un faltante de inventario por sí solo no suele bastar. La aseguradora pide pruebas de que hubo un acto deshonesto de un empleado. Las mermas normales, los errores de registro y las diferencias sin explicación por lo general quedan excluidas.",
      },
      {
        pregunta: "¿Una empresa pequeña con pocos empleados necesita esta póliza?",
        respuesta:
          "Puede necesitarla más que una grande. En las pymes una sola persona suele manejar caja, pagos y bancos sin que nadie la revise. Si alguien de tu equipo maneja dinero o inventario valioso, vale la pena cotizarla.",
      },
      {
        pregunta: "¿La aseguradora le cobra al empleado lo que me pagó?",
        respuesta:
          "Sí puede intentarlo. Después de pagarte, la aseguradora queda en tu lugar para cobrarle al responsable lo que indemnizó. Por eso es importante la denuncia penal y que colabores con el proceso.",
      },
    ],
    ramoRuta: "/seguros/manejo-global",
    waMensaje:
      "Hola, leí la guía del seguro de manejo global y quiero proteger mi empresa contra fraudes de empleados.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1075 (aviso en tres días), 1077 (carga de la prueba) y 1081 (prescripción de dos y cinco años) — ${FUENTE_CCO}`,
      "Confirmar con el asesor los nombres de los amparos de manejo (hurto, abuso de confianza, falsedad, estafa, empleados no identificados, temporales) y las condiciones de descubrimiento y retroactividad en las aseguradoras con las que trabaja VanTrust.",
      "Confirmar con el asesor si la denuncia penal es requisito en todas las pólizas de manejo que ofrece VanTrust.",
    ],
  },

  // ───────────── 2. D&O ─────────────
  {
    slug: "seguro-d-and-o-directivos",
    titulo: "¿Qué es el seguro D&O y quién responde con su patrimonio en una empresa?",
    title: "Seguro D&O: protege a directores y administradores",
    description:
      "El seguro D&O protege el patrimonio de gerentes y juntas directivas ante reclamos por sus decisiones. Qué dice la Ley 222 de 1995 y qué cubre. Asesórate.",
    respuesta:
      "El seguro D&O es la póliza de responsabilidad civil de directores y administradores: paga la defensa y, según la póliza, las condenas cuando demandan a un gerente o a un miembro de junta por decisiones de su cargo. Importa porque la Ley 222 de 1995 hace responder a los administradores de forma solidaria e ilimitada, con su propio patrimonio, por los daños que causen con dolo o culpa.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la gerente que firmó por todos",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Liliana es representante legal de una SAS familiar de logística en el Parque Industrial de Malambo. Ella y sus dos hermanos forman la junta directiva. La empresa firmó un contrato grande con un cliente y, para cumplirlo, Liliana aprobó una compra de equipos sin consultar a la junta, pensando que era lo mejor para el negocio.",
          },
          {
            tipo: "p",
            texto:
              "El contrato salió mal, la empresa entró en problemas de caja y un socio minoritario, primo de la familia, la demandó a ella personalmente por haberse extralimitado en sus funciones. De un día para otro, Liliana tuvo que contratar abogados con su plata y vio en riesgo su casa y sus ahorros, aunque nunca se quedó con un peso.",
          },
          {
            tipo: "p",
            texto:
              "Con un seguro D&O, la aseguradora habría atendido los gastos de defensa desde el principio y, si hubiera condena cubierta, la habría pagado hasta el límite contratado. La lección: en una empresa, la responsabilidad del administrador es personal, aunque la empresa sea pequeña y familiar.",
          },
        ],
      },
      {
        titulo: "¿Quién es administrador y por qué responde con su patrimonio?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un administrador es quien dirige o representa la sociedad: el artículo 22 de la Ley 222 de 1995 nombra al representante legal, el liquidador, el factor, los miembros de juntas o consejos directivos y quienes, según los estatutos, ejerzan esas funciones. Responde con su patrimonio porque el artículo 24 de esa ley lo hace responsable solidaria e ilimitadamente.",
          },
          {
            tipo: "lista",
            items: [
              "Deberes (artículo 23): obrar de buena fe, con lealtad y con la diligencia de un buen hombre de negocios, en interés de la sociedad. Entre otros, cumplir la ley y los estatutos, no usar indebidamente información privilegiada, dar trato equitativo a los socios y no competir con la sociedad ni actuar con conflicto de intereses sin autorización.",
              "Responsabilidad (artículo 24): responden solidaria e ilimitadamente por los perjuicios que por dolo o culpa ocasionen a la sociedad, a los socios o a terceros.",
              "Presunción de culpa: se presume la culpa del administrador si incumple o se extralimita en sus funciones, o viola la ley o los estatutos. Él tiene que demostrar que no actuó con culpa.",
              "Exoneración: no responden quienes no conocieron la acción u omisión o votaron en contra, siempre que no la ejecuten.",
              "Cláusulas de los estatutos que eximan de responsabilidad a los administradores o la limiten al monto de sus cauciones se tienen por no escritas.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Solidaria quiere decir que a cualquiera de los administradores responsables le pueden cobrar el total. Ilimitada quiere decir que no hay tope: responde con todos sus bienes.",
          },
        ],
      },
      {
        titulo: "¿Para qué empresas aplica el seguro D&O?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Aplica a cualquier sociedad con administradores, no solo a las grandes. La Ley 1258 de 2008 (artículo 27) extiende las reglas de responsabilidad de la Ley 222 al representante legal y a la junta directiva de las SAS, que es la forma que usa la mayoría de pymes en Colombia.",
          },
          {
            tipo: "lista",
            items: [
              "Empresas familiares con socios que no están en la gerencia y pueden reclamar.",
              "Sociedades con socios inversionistas o con planes de recibir inversión.",
              "Empresas que contratan con el Estado, tienen deuda bancaria importante o atraviesan una reestructuración.",
              "Empresas con muchos empleados, proveedores o clientes que podrían reclamar por decisiones de la gerencia.",
              "Personas que integran juntas directivas de varias empresas.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El parágrafo del mismo artículo 27 dice que quien sin ser administrador se meta en la gestión o dirección de la SAS asume las mismas responsabilidades. Es común en las empresas familiares: el fundador que ya no es gerente pero sigue dando órdenes.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre un seguro D&O?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Una póliza D&O cubre principalmente los gastos de defensa y las indemnizaciones a cargo de los directivos por reclamaciones derivadas de su gestión, hasta el valor asegurado. El alcance exacto depende de cada clausulado.",
          },
          {
            tipo: "tabla",
            caption: "Coberturas y exclusiones frecuentes en un seguro D&O",
            columnas: ["Tema", "Qué suele incluir o excluir, según la póliza"],
            filas: [
              ["Gastos de defensa", "Abogados y costos del proceso desde que llega la reclamación, en muchas pólizas con anticipo antes del fallo."],
              ["Condenas y acuerdos", "Las indemnizaciones a cargo del directivo por actos de su cargo, y los acuerdos aprobados por la aseguradora."],
              ["Reembolso a la sociedad", "Lo que la empresa le adelante al directivo para defenderse, cuando la póliza lo pacta."],
              ["Cobertura de la sociedad", "En algunas pólizas, reclamaciones contra la propia empresa, por lo general limitadas."],
              ["Investigaciones", "Gastos de atender investigaciones de autoridades como las superintendencias, si se pacta."],
              ["Dolo y beneficio indebido", "Excluidos. El artículo 1055 del Código de Comercio hace inasegurable el dolo."],
              ["Multas y sanciones", "Por lo general excluidas; el artículo 1055 no permite amparar sanciones penales o policivas."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Sobre la culpa grave: el artículo 1127 del Código de Comercio dice que en el seguro de responsabilidad es asegurable la culpa grave, con la restricción del artículo 1055. Pregunta al asesor cómo la trata tu póliza. Y el artículo 1128 obliga a la aseguradora a responder por los costos del proceso que promueva el tercero, aun en exceso de la suma asegurada, con salvedades como el dolo.",
          },
        ],
      },
      {
        titulo: "¿Cómo funciona la reclamación en un D&O?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Un D&O se activa cuando le formulan una reclamación al directivo, no cuando tomó la decisión. El artículo 1131 del Código de Comercio dice que, frente al asegurado, el siniestro ocurre desde que la víctima le formula la petición judicial o extrajudicial.",
          },
          {
            tipo: "pasos",
            items: [
              "Revisa que la póliza cubra a todas las personas que deben estar: gerente, suplentes, junta, liquidador y quienes ejerzan funciones de administración.",
              "Pregunta por la fecha de retroactividad: define desde cuándo deben haber ocurrido los actos para estar cubiertos.",
              "Pregunta qué pasa con reclamaciones que lleguen después de terminar la vigencia o si la empresa cambia de dueños.",
              "Ante una carta, una citación o una demanda, avisa a la aseguradora de inmediato y no designes abogado ni negocies sin su visto bueno.",
              "Guarda actas de junta y soportes de tus decisiones: son la mejor defensa para mostrar diligencia.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El D&O no reemplaza la responsabilidad civil de la empresa frente a clientes y terceros. Para eso, lee ¿Qué cubre la póliza de responsabilidad civil extracontractual de un negocio?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Si la empresa es una SAS, los socios pueden perder su patrimonio personal?",
        respuesta:
          "Como socios, por regla general responden hasta sus aportes. Pero quien actúa como representante legal, miembro de junta o se inmiscuye en la gestión responde como administrador, con su patrimonio, según la Ley 222 de 1995 y la Ley 1258 de 2008.",
      },
      {
        pregunta: "¿Quién paga la prima del seguro D&O, la empresa o el gerente?",
        respuesta:
          "Normalmente la toma y la paga la empresa a favor de sus directores y administradores. Así protege a las personas que la dirigen y le resulta más fácil conseguir y conservar buenos gerentes y miembros de junta.",
      },
      {
        pregunta: "¿El D&O cubre si me demandan por algo que decidí hace años?",
        respuesta:
          "Puede cubrirlo si el acto ocurrió después de la fecha de retroactividad de la póliza y la reclamación llega durante la vigencia. Por eso conviene no dejar vencer la póliza ni perder la retroactividad al cambiar de aseguradora.",
      },
      {
        pregunta: "¿Me cubre si la Superintendencia de Sociedades me abre una investigación?",
        respuesta:
          "Algunas pólizas D&O incluyen los gastos de defensa en investigaciones administrativas cuando se pacta. Las multas o sanciones que te impongan casi siempre quedan excluidas. Revisa esa cobertura con el asesor antes de contratar.",
      },
    ],
    ramoRuta: "/seguros/d-and-o",
    waMensaje:
      "Hola, leí la guía del seguro D&O y quiero proteger a los directivos de mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Ley 222 de 1995, arts. 22 (quiénes son administradores), 23 (deberes) y 24 (responsabilidad solidaria e ilimitada, presunción de culpa, exoneración, cláusulas no escritas) — ${FUENTE_L222}`,
      `Verificar con el asesor: Ley 1258 de 2008, art. 27 (responsabilidad de administradores en la SAS y de quien se inmiscuya en la gestión) — ${FUENTE_L1258}`,
      `Verificar con el asesor: Código de Comercio, arts. 1055 (dolo, culpa grave y sanciones penales o policivas inasegurables), 1127 (culpa grave asegurable en RC con la restricción del 1055), 1128 (costos del proceso) y 1131 (ocurrencia del siniestro en RC) — ${FUENTE_CCO}`,
      "Confirmar con el asesor si las pólizas D&O de las aseguradoras con las que trabaja VanTrust incluyen reembolso a la sociedad, cobertura de la entidad, investigaciones administrativas, anticipo de gastos de defensa y cómo tratan la culpa grave y la retroactividad.",
    ],
  },

  // ───────────── 3. Equipo electrónico y maquinaria ─────────────
  {
    slug: "seguro-equipo-electronico-y-maquinaria",
    titulo: "¿Qué cubre el seguro de equipo electrónico y en qué se diferencia de rotura de maquinaria?",
    title: "Seguro de equipo electrónico y rotura de maquinaria",
    description:
      "El seguro de equipo electrónico cubre daños por voltaje o accidentes; rotura de maquinaria, fallas internas. Diferencias y el riesgo de la Costa. Cotiza.",
    respuesta:
      "El seguro de equipo electrónico cubre los daños súbitos y accidentales de computadores, servidores, equipos médicos o de control, incluidos, según la póliza, los causados por variaciones de voltaje. La rotura de maquinaria cubre las fallas internas, eléctricas o mecánicas de máquinas como compresores, plantas o equipos de producción. Ninguno de los dos cubre el desgaste normal ni la falta de mantenimiento.",
    secciones: [
      {
        titulo: "Caso ilustrativo: la tormenta y la planta de hielo",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Germán tiene una pequeña fábrica de hielo y bebidas en el barrio Rebolo, cerca del río. Una noche de aguacero hubo varios cortes y regresos bruscos de energía. Al otro día, el tablero de control de la línea de envasado no prendía y el compresor principal hacía un ruido extraño.",
          },
          {
            tipo: "p",
            texto:
              "Germán tenía un seguro de incendio para la bodega, y pensó que con eso bastaba. No era así: el daño del tablero por la variación de voltaje correspondía a equipo electrónico, y la falla interna del compresor a rotura de maquinaria, amparos que no tenía. Pagó las reparaciones de su bolsillo y estuvo días sin producir en plena temporada de calor.",
          },
          {
            tipo: "p",
            texto:
              "Con los dos amparos, habría reclamado cada daño en su cobertura, con el informe técnico del daño y descontando los deducibles. La lección: un seguro contra incendio no protege contra lo que le pasa a tus equipos por dentro.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre el seguro de equipo electrónico?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El seguro de equipo electrónico cubre los daños materiales súbitos e imprevistos de los equipos electrónicos de la empresa mientras están en el lugar asegurado. Súbito e imprevisto es un daño que pasa de repente y que no se podía anticipar, no un deterioro lento.",
          },
          {
            tipo: "lista",
            items: [
              "Cortocircuito, sobretensión, variaciones de voltaje y descargas eléctricas, según la póliza.",
              "Caídas, golpes y errores de manejo, como un servidor que se cae durante un traslado interno.",
              "Daños por agua o líquidos, como una gotera sobre el rack o un vaso derramado sobre un equipo.",
              "Incendio, rayo y, según la póliza, hurto con violencia.",
              "Amparos adicionales que se pueden pactar: equipos portátiles fuera del local, reposición de portadores de datos y gastos adicionales por alquilar un equipo de reemplazo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Entran computadores, servidores, redes, cajas registradoras, cámaras y alarmas, equipos de laboratorio o de consultorios, y los tableros de control de las máquinas. Revisa la lista de bienes asegurados: lo que no esté declarado, no está cubierto.",
          },
        ],
      },
      {
        titulo: "¿Cuál es la diferencia entre equipo electrónico y rotura de maquinaria?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La diferencia está en el tipo de bien y de daño. Equipo electrónico protege aparatos electrónicos frente a daños accidentales, internos o externos; rotura de maquinaria protege máquinas frente a fallas internas súbitas mientras funcionan, se limpian o se reparan.",
          },
          {
            tipo: "tabla",
            caption: "Equipo electrónico vs. rotura de maquinaria",
            columnas: ["Tema", "Equipo electrónico", "Rotura de maquinaria"],
            filas: [
              ["Bienes típicos", "Computadores, servidores, equipos médicos, tableros de control, cámaras.", "Compresores, motores, transformadores, plantas eléctricas, bombas, montacargas, líneas de producción."],
              ["Daños típicos", "Variación de voltaje, cortocircuito, golpes, líquidos.", "Falla mecánica o eléctrica interna, error de operación, falta de lubricación súbita, fuerza centrífuga."],
              ["Dónde ocurre", "Adentro o afuera del equipo, de forma accidental.", "Adentro de la máquina, mientras opera o en mantenimiento."],
              ["Suele excluir", "Desgaste, fallas cubiertas por la garantía del fabricante, daños estéticos.", "Desgaste, piezas de cambio frecuente como correas o herramientas, fallas por falta de mantenimiento."],
              ["Lucro cesante", "Se pacta aparte, si aplica.", "Se pacta aparte como pérdida de beneficios por rotura, si aplica."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Muchas empresas necesitan los dos. Un aire acondicionado industrial, por ejemplo, tiene un compresor (maquinaria) y una tarjeta de control (electrónico). Muchas veces ambos vienen dentro de un seguro para pyme; lo explicamos en ¿Qué cubre un seguro para pyme y cómo definir el valor asegurado?",
          },
        ],
      },
      {
        titulo: "¿Cómo afectan el calor, la humedad y la salinidad de la Costa?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El clima de la Costa acelera el deterioro de los equipos, y la mayoría de pólizas no cubre el deterioro gradual. El artículo 1104 del Código de Comercio excluye del seguro el vicio propio de las cosas: el germen de deterioro que llevan por su naturaleza.",
          },
          {
            tipo: "p",
            texto:
              "En la práctica, la corrosión por la brisa salina en zonas cerca del mar o del río, el óxido por humedad y el recalentamiento por trabajar sin ventilación suelen quedar excluidos cuando son graduales. En cambio, un daño súbito, como una tarjeta que se quema por una sobretensión durante un aguacero, sí puede estar cubierto según la póliza. La diferencia la decide el informe técnico.",
          },
          {
            tipo: "pasos",
            items: [
              "Instala reguladores, UPS o protecciones contra sobretensión y polo a tierra en los equipos críticos.",
              "Mantén aire acondicionado y deshumidificación en el cuarto de servidores y en tableros sensibles.",
              "Lleva un plan de mantenimiento preventivo con registros firmados por el técnico.",
              "Guarda facturas, fichas técnicas y año de fabricación de cada equipo.",
              "Ante un daño, no repares ni deseches piezas antes de que la aseguradora lo autorice o lo inspeccione.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Los registros de mantenimiento no son un trámite: son la prueba de que el daño fue súbito y no descuido. Muchas pólizas exigen el mantenimiento como condición.",
          },
        ],
      },
      {
        titulo: "¿Cómo se define el valor asegurado de los equipos?",
        bloques: [
          {
            tipo: "p",
            texto:
              "El valor asegurado de los equipos suele ser el valor de reposición a nuevo: lo que cuesta hoy comprar un equipo nuevo de iguales características, con fletes, impuestos e instalación. El artículo 1090 del Código de Comercio permite pactar la indemnización por valor de reposición, sujeta a la suma asegurada.",
          },
          {
            tipo: "p",
            texto:
              "Si aseguras por menos, el artículo 1102 del Código de Comercio permite a la aseguradora pagar solo en proporción entre lo asegurado y lo que no lo está. Si tus máquinas son importadas, ten en cuenta la tasa de cambio y el tiempo de envío. Y si una parada te frena la producción, pregunta por lucro cesante: lo explicamos en ¿Qué es el lucro cesante en un seguro y cuándo vale la pena para tu negocio?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿El seguro cubre si se me daña un equipo porque se fue la luz?",
        respuesta:
          "Muchas pólizas de equipo electrónico cubren los daños por variaciones de voltaje, sobretensión o cortocircuito, a veces con un deducible especial. Lo que no se cubre es la pérdida de producción por el corte, salvo que tengas lucro cesante pactado.",
      },
      {
        pregunta: "¿Puedo asegurar maquinaria vieja o usada?",
        respuesta:
          "Por lo general sí, pero la aseguradora revisa el año de fabricación, el estado y el mantenimiento. En equipos muy antiguos puede pedir inspección, aplicar depreciación o limitar la cobertura. Cuéntale al asesor la edad real de tus máquinas.",
      },
      {
        pregunta: "¿Cubre el portátil que mis empleados llevan a la calle?",
        respuesta:
          "Solo si se pacta la cobertura de equipos móviles o portátiles fuera del predio. Suele tener condiciones especiales para el hurto, como no dejarlo a la vista dentro de un carro. Si no lo pactas, el equipo solo está cubierto en el lugar asegurado.",
      },
      {
        pregunta: "¿La garantía del fabricante reemplaza este seguro?",
        respuesta:
          "No. La garantía cubre defectos de fabricación por un tiempo limitado. El seguro cubre accidentes y daños súbitos, como un golpe o una sobretensión, que la garantía no atiende. Lo que cubre la garantía suele estar excluido de la póliza.",
      },
    ],
    ramoRuta: "/seguros/maquinaria-y-equipo",
    waMensaje:
      "Hola, leí la guía de equipo electrónico y rotura de maquinaria y quiero asegurar los equipos de mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Código de Comercio, arts. 1090 (valor de reposición), 1102 (infraseguro) y 1104 (vicio propio) — ${FUENTE_CCO}`,
      "Confirmar con el asesor cómo tratan las aseguradoras con las que trabaja VanTrust la corrosión, la humedad y la salinidad en la Costa, si hay deducible especial por variación de voltaje y qué exigen de mantenimiento y protecciones eléctricas.",
      "Confirmar con el asesor si equipo electrónico y rotura de maquinaria se ofrecen como pólizas separadas, dentro del seguro pyme o en ambas modalidades.",
    ],
  },

  // ───────────── 4. Vida grupo ─────────────
  {
    slug: "seguro-vida-grupo-empleados",
    titulo: "¿Qué es el seguro de vida grupo para empleados y en qué se diferencia de la ARL?",
    title: "Seguro de vida grupo para empleados: qué es y cómo funciona",
    description:
      "El seguro de vida grupo protege a tus empleados por muerte o incapacidad por cualquier causa, no solo laboral como la ARL. Cómo estructurarlo. Asesórate.",
    respuesta:
      "El seguro de vida grupo es una póliza que una empresa toma para asegurar a varios empleados bajo un mismo contrato, por muerte e incapacidad total y permanente por cualquier causa, según la póliza. Se diferencia de la ARL en que esta es obligatoria y solo atiende accidentes de trabajo y enfermedades laborales, mientras que vida grupo cubre también la enfermedad común y los accidentes fuera del trabajo.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el accidente un domingo en la vía a Puerto Colombia",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Alberto es el jefe de bodega de una comercializadora de alimentos en Barranquilla. Un domingo, de paseo con su familia por la vía a Puerto Colombia, tuvo un accidente de moto y murió. La empresa tenía a todos sus trabajadores afiliados a la ARL, como exige la ley, y la gerente pensó que eso cubría a la familia.",
          },
          {
            tipo: "p",
            texto:
              "No era así. La ARL atiende los accidentes de trabajo y las enfermedades laborales, y un paseo familiar de domingo no tenía relación con el trabajo. La viuda y los hijos quedaron solo con las prestaciones que correspondieran por otros sistemas y con la liquidación del contrato.",
          },
          {
            tipo: "p",
            texto:
              "Si la empresa hubiera tenido un seguro de vida grupo, la aseguradora habría pagado el valor asegurado a los beneficiarios que Alberto designó, porque la cobertura era por muerte por cualquier causa. La lección: la ARL protege el riesgo laboral; vida grupo protege a la persona en cualquier momento.",
          },
        ],
      },
      {
        titulo: "¿Qué cubre la ARL según la Ley 1562 de 2012?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La ARL cubre a los trabajadores frente a los accidentes de trabajo y las enfermedades laborales, y nada más. El artículo 1 de la Ley 1562 de 2012 define el Sistema General de Riesgos Laborales como el conjunto de entidades, normas y procedimientos destinados a prevenir, proteger y atender a los trabajadores de los efectos de las enfermedades y los accidentes que puedan ocurrirles con ocasión o como consecuencia del trabajo.",
          },
          {
            tipo: "lista",
            items: [
              "Accidente de trabajo (artículo 3): todo suceso repentino que sobrevenga por causa o con ocasión del trabajo y que produzca una lesión, una perturbación funcional o psiquiátrica, una invalidez o la muerte. Incluye, entre otros, el que ocurre en el traslado entre la casa y el trabajo cuando el transporte lo suministra el empleador.",
              "Enfermedad laboral (artículo 4): la contraída como resultado de la exposición a factores de riesgo de la actividad laboral o del medio en el que el trabajador ha tenido que trabajar.",
              "Afiliación obligatoria (artículo 2, que modifica el artículo 13 del Decreto-ley 1295 de 1994): entre otros, los trabajadores dependientes con contrato de trabajo escrito o verbal.",
            ],
          },
          {
            tipo: "p",
            texto:
              "La ARL es obligatoria y no es un beneficio opcional: es el sistema de riesgos laborales. Lo que queda fuera es todo lo que no tiene origen laboral: la enfermedad común, el accidente de fin de semana, el infarto en la casa.",
          },
        ],
      },
      {
        titulo: "¿Cuál es la diferencia entre el seguro de vida grupo y la ARL?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La ARL es obligatoria y solo cubre el origen laboral; el seguro de vida grupo es voluntario y cubre cualquier causa, según la póliza. Se complementan: uno no reemplaza al otro.",
          },
          {
            tipo: "tabla",
            caption: "Seguro de vida grupo vs. ARL",
            columnas: ["Tema", "ARL", "Seguro de vida grupo"],
            filas: [
              ["Naturaleza", "Sistema obligatorio de riesgos laborales.", "Seguro voluntario que contrata la empresa."],
              ["Qué riesgos atiende", "Solo accidentes de trabajo y enfermedades laborales.", "Muerte e incapacidad total y permanente por cualquier causa, según la póliza."],
              ["Quién recibe el pago por muerte", "Los beneficiarios que señala la ley del sistema.", "Los beneficiarios que el empleado designa, o los de ley si no designa."],
              ["Coberturas extra", "Las del sistema; no se escogen.", "Se pueden sumar enfermedades graves, muerte accidental, auxilio funerario, según el plan."],
              ["Valor", "Lo definen las normas del sistema.", "Lo define la empresa: una suma fija o un número de salarios por empleado."],
            ],
          },
          {
            tipo: "p",
            texto:
              "Si el accidente laboral ocurre por culpa comprobada del empleador, hay otra capa: la responsabilidad civil patronal, que explicamos en ¿Qué cubre la póliza de responsabilidad civil extracontractual de un negocio?",
          },
        ],
      },
      {
        titulo: "¿Cómo se estructura un seguro de vida grupo en una pyme?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Se estructura definiendo a quién se asegura, por cuánto y quién paga. El tomador es la empresa, que firma la póliza; los asegurados son los empleados; y los beneficiarios son las personas que recibirán el pago.",
          },
          {
            tipo: "pasos",
            items: [
              "Define el grupo: todos los empleados, solo los de contrato indefinido o grupos por cargo. Las aseguradoras suelen pedir un número mínimo de personas.",
              "Escoge el valor asegurado: una suma igual para todos o un número de salarios de cada uno. Sin un valor claro, el beneficio genera confusión.",
              "Decide quién paga: no contributivo si la empresa paga toda la prima, o contributivo si el empleado aporta una parte.",
              "Elige los amparos: muerte e incapacidad total y permanente como base; enfermedades graves, muerte accidental o auxilio funerario como adicionales.",
              "Pide que cada empleado diligencie su formulario de ingreso y designe sus beneficiarios por escrito.",
              "Reporta ingresos y retiros a tiempo para que nadie quede por fuera ni pagues por quien ya no trabaja contigo.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Según el tamaño del grupo y el valor asegurado, la aseguradora puede pedir declaración de salud o exámenes a algunas personas. Pregunta también qué pasa con el seguro cuando el empleado se retira de la empresa.",
          },
        ],
      },
      {
        titulo: "¿Por qué vale la pena como beneficio para los empleados?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Vale la pena porque protege a la familia del trabajador en lo que la ARL no cubre y es un beneficio que se nota. En la Costa, donde muchas pymes compiten por buenos operarios, conductores y vendedores, un beneficio así ayuda a retenerlos.",
          },
          {
            tipo: "lista",
            items: [
              "Le da a la familia un respaldo económico si el trabajador muere o queda incapacitado por cualquier causa.",
              "Evita que la empresa termine haciendo colectas o pagos voluntarios sin respaldo ante una tragedia.",
              "Se administra en una sola póliza, con altas y bajas en lugar de un seguro por persona.",
              "Puede combinarse con un seguro de salud para empleados, si el presupuesto lo permite.",
            ],
          },
          {
            tipo: "p",
            texto:
              "Para el seguro de vida personal o familiar, fuera de la empresa, lee ¿Cuánto seguro de vida necesito y quién lo necesita?",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Es obligatorio que una empresa tenga seguro de vida grupo?",
        respuesta:
          "No hay una norma general que lo imponga a las empresas privadas. Lo obligatorio es afiliar a los trabajadores a la ARL. Vida grupo es un beneficio voluntario, aunque algunas convenciones o contratos lo pueden exigir.",
      },
      {
        pregunta: "¿Qué pasa con el seguro de vida grupo cuando un empleado renuncia?",
        respuesta:
          "Por lo general deja de estar asegurado cuando sale del grupo. Algunas pólizas permiten que el empleado continúe con un seguro individual sin nuevos requisitos de salud, dentro de un plazo. Revisa esa condición con el asesor.",
      },
      {
        pregunta: "¿El empleado puede escoger a quién le pagan?",
        respuesta:
          "Sí. Cada asegurado designa sus beneficiarios por escrito y puede cambiarlos. Si no designa a nadie, el pago va a los beneficiarios que señale la ley. Por eso es importante que cada empleado llene y actualice su formulario.",
      },
      {
        pregunta: "¿Se pueden asegurar empleados con enfermedades previas?",
        respuesta:
          "Muchas pólizas de grupo aceptan a los empleados hasta cierto valor asegurado sin declaración de salud. Por encima de ese límite pueden pedir requisitos médicos. Cuéntale al asesor el tamaño de tu grupo y los valores que quieres.",
      },
    ],
    ramoRuta: "/seguros/vida-grupo",
    waMensaje:
      "Hola, leí la guía del seguro de vida grupo y quiero ofrecerlo como beneficio a los empleados de mi empresa.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Ley 1562 de 2012, arts. 1 (Sistema General de Riesgos Laborales), 2 (afiliados obligatorios, modifica el art. 13 del Decreto-ley 1295 de 1994), 3 (accidente de trabajo) y 4 (enfermedad laboral) — ${FUENTE_L1562}`,
      "Confirmar con el asesor el número mínimo de asegurados, los límites sin requisitos médicos, la continuidad al retiro y los amparos adicionales de vida grupo en las aseguradoras con las que trabaja VanTrust.",
      `Verificar con el asesor: Código de Comercio, art. 1142 (a falta de designación, beneficiarios son el cónyuge en la mitad y los herederos en la otra mitad; aparte condicionalmente exequible) — ${FUENTE_CCO}`,
    ],
  },

  // ───────────── 5. Copropiedad ─────────────
  {
    slug: "seguro-de-copropiedad-propiedad-horizontal",
    titulo: "¿Qué cubre el seguro de copropiedad y es obligatorio en un conjunto o edificio?",
    title: "Seguro de copropiedad: qué exige la Ley 675 y qué cubre",
    description:
      "El seguro de copropiedad es obligatorio para los bienes comunes según la Ley 675 de 2001. Qué cubre, RC, manejo y el rol del consejo. Cotiza con un asesor.",
    respuesta:
      "El seguro de copropiedad es la póliza que protege los bienes comunes de un conjunto o edificio y, según lo que se contrate, la responsabilidad civil de la copropiedad y el manejo de sus recursos. Sí es obligatorio en parte: el artículo 15 de la Ley 675 de 2001 exige asegurar contra incendio y terremoto los bienes comunes susceptibles de ser asegurados. Lo demás es recomendable, pero voluntario.",
    secciones: [
      {
        titulo: "Caso ilustrativo: el ascensor, la piscina y la asamblea",
        bloques: [
          { tipo: "p", texto: CASO_ILUSTRATIVO },
          {
            tipo: "p",
            texto:
              "Un conjunto de apartamentos en el norte de Barranquilla, cerca del Corredor Universitario, tenía una póliza de áreas comunes que cubría incendio y terremoto, la que exige la ley. Para ahorrar, el consejo de administración había decidido no incluir responsabilidad civil ni equipo electrónico.",
          },
          {
            tipo: "p",
            texto:
              "En una misma temporada de lluvias pasaron dos cosas. Una descarga eléctrica dañó la tarjeta del ascensor y el sistema de bombeo. Y un visitante resbaló en el borde de la piscina, se fracturó el tobillo y reclamó a la copropiedad. Ninguno de los dos hechos estaba cubierto, y la asamblea tuvo que aprobar una cuota extraordinaria que nadie quería pagar.",
          },
          {
            tipo: "p",
            texto:
              "Con equipo electrónico y RC en la póliza, la administración habría reclamado los dos casos y el asesor la habría acompañado en el trámite. La lección: cumplir el mínimo de la ley no es lo mismo que estar bien asegurado.",
          },
        ],
      },
      {
        titulo: "¿Es obligatorio el seguro de copropiedad según la Ley 675 de 2001?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Sí, en lo que dice el artículo 15 de la Ley 675 de 2001: los bienes comunes susceptibles de ser asegurados deben tener póliza contra incendio y terremoto. La ley permite además que el edificio o conjunto tome pólizas que garanticen su reconstrucción total.",
          },
          {
            tipo: "lista",
            items: [
              "Bienes comunes son las partes del edificio o conjunto que pertenecen en común a todos los propietarios, como estructura, fachadas, ascensores, porterías, piscinas, zonas verdes y equipos de bombeo, según el reglamento.",
              "Lo obligatorio son dos riesgos: incendio y terremoto. La responsabilidad civil, el manejo, los daños por agua o el equipo electrónico no hacen parte de ese mínimo legal.",
              "Si hay siniestro y el inmueble se reconstruye, la indemnización se destina primero a la reconstrucción. Si no se reconstruye, se distribuye entre los propietarios según sus coeficientes de copropiedad.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El seguro de áreas comunes no protege lo que hay dentro de cada apartamento. Para eso cada propietario necesita su propia póliza; lo explicamos en ¿Qué cubre un seguro de hogar y qué no?",
          },
        ],
      },
      {
        titulo: "¿Qué cubre el seguro de copropiedad además de incendio y terremoto?",
        bloques: [
          {
            tipo: "p",
            texto:
              "Además del mínimo legal, el seguro de copropiedad puede cubrir los equipos, la responsabilidad civil frente a terceros y el manejo del dinero, según lo que se contrate.",
          },
          {
            tipo: "tabla",
            caption: "Coberturas frecuentes en un seguro de copropiedad",
            columnas: ["Cobertura", "Qué protege", "Obligatoria por la Ley 675"],
            filas: [
              ["Incendio y terremoto", "Estructura y bienes comunes asegurables.", "Sí, para los bienes comunes asegurables."],
              ["Daños por agua, anegación y vendaval", "Daños por lluvias, filtraciones súbitas, tubos rotos o vientos fuertes, según la póliza.", "No."],
              ["Equipo electrónico y maquinaria", "Ascensores, bombas, plantas eléctricas, citófonos, cámaras y portones eléctricos.", "No."],
              ["Sustracción", "Robo con violencia de bienes comunes, como equipos del gimnasio o del salón social.", "No."],
              ["Responsabilidad civil", "Daños que la copropiedad cause a residentes, visitantes o vecinos por sus bienes comunes o su operación.", "No."],
              ["Manejo", "Pérdidas por apropiación indebida de dinero de la copropiedad por parte de empleados o administración, según la póliza.", "No."],
            ],
          },
          {
            tipo: "p",
            texto:
              "En Barranquilla conviene revisar con lupa los daños por agua y los equipos: los aguaceros fuertes, las variaciones de voltaje y la humedad afectan bombas, ascensores y tableros. Para entender los daños de equipos, lee ¿Qué cubre el seguro de equipo electrónico y en qué se diferencia de rotura de maquinaria?",
          },
        ],
      },
      {
        titulo: "¿Por qué la copropiedad necesita responsabilidad civil y manejo?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La copropiedad necesita responsabilidad civil porque, como persona jurídica, puede tener que indemnizar a quien se lesione o sufra un daño por los bienes comunes. Y necesita manejo porque administra cuotas de muchos propietarios que pueden perderse por un acto deshonesto.",
          },
          {
            tipo: "lista",
            items: [
              "RC de la copropiedad: un visitante se cae en una escalera mal iluminada, una rama de un árbol común cae sobre un carro, una filtración del tanque daña el apartamento de abajo o el local vecino, según la póliza.",
              "RC por la piscina, el gimnasio o el parque infantil: son las zonas donde más lesiones ocurren.",
              "Manejo: un empleado o un tercero encargado de la contabilidad desvía cuotas de administración o fondos de reserva. Pregunta si cubre a la administración externa y bajo qué condiciones.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El artículo 50 de la Ley 675 de 2001 dice que el administrador responde por los perjuicios que cause por dolo, culpa leve o grave, y que la culpa leve se presume cuando incumple sus funciones o viola la ley o el reglamento. Su parágrafo 3 prevé que el Gobierno pueda exigir pólizas que garanticen las obligaciones de los administradores. Para el manejo en general, lee ¿Qué cubre el seguro de manejo global si un empleado roba o hace fraude?",
          },
        ],
      },
      {
        titulo: "¿Qué papel tienen la administración y el consejo en el seguro?",
        bloques: [
          {
            tipo: "p",
            texto:
              "La administración ejecuta y el consejo decide. El artículo 51 de la Ley 675 de 2001 le asigna al administrador, entre otras funciones, cuidar y vigilar los bienes comunes y representar a la persona jurídica; el artículo 55 le da al consejo de administración las determinaciones necesarias para que la copropiedad cumpla sus fines, según el reglamento.",
          },
          {
            tipo: "pasos",
            items: [
              "Revisa el reglamento: puede fijar quién aprueba la póliza, el valor asegurado y las coberturas adicionales.",
              "Pide un avalúo o un cálculo técnico del valor de reconstrucción de los bienes comunes. Asegurar por menos puede llevar a que la aseguradora pague solo en proporción.",
              "Compara opciones con las mismas coberturas y deducibles y presenta al consejo una recomendación clara.",
              "Lleva el resumen de la póliza a la asamblea: los propietarios deben saber qué está cubierto y qué no.",
              "Ante un siniestro, avisa a la aseguradora dentro del plazo, toma fotos y guarda facturas y reportes técnicos.",
              "Revisa el seguro cada año, en especial si se hicieron obras o se compraron equipos.",
            ],
          },
          {
            tipo: "p",
            texto:
              "El artículo 53 de la misma ley hace obligatorio el consejo de administración en edificios o conjuntos de uso comercial o mixto con más de 30 bienes privados, sin contar parqueaderos ni depósitos; en los demás casos es potestativo. Si no hay consejo, las decisiones siguen el reglamento y la asamblea.",
          },
        ],
      },
    ],
    faqs: [
      {
        pregunta: "¿Si el conjunto no tiene seguro de áreas comunes, quién paga un incendio?",
        respuesta:
          "Sin póliza, la reparación de los bienes comunes la asumen los propietarios con cuotas extraordinarias, según sus coeficientes. Además, no tener el seguro de incendio y terremoto incumple el artículo 15 de la Ley 675 de 2001.",
      },
      {
        pregunta: "¿El seguro del conjunto cubre los daños dentro de mi apartamento?",
        respuesta:
          "No. La póliza de copropiedad protege los bienes comunes. Lo que está dentro de tu apartamento, y los acabados privados, necesitan tu propio seguro de hogar. Si una filtración común daña tu apartamento, puede responder la RC de la copropiedad, según la póliza.",
      },
      {
        pregunta: "¿El seguro de copropiedad cubre los carros en el parqueadero?",
        respuesta:
          "Por lo general no cubre el carro como bien. Si el daño lo causa un bien común, como un portón eléctrico que cae sobre el carro, puede responder la responsabilidad civil de la copropiedad. El hurto de carros suele tener reglas especiales o quedar excluido.",
      },
      {
        pregunta: "¿Se puede cambiar de aseguradora en mitad del año?",
        respuesta:
          "Sí, pero conviene hacerlo al vencimiento y sin dejar un solo día sin cobertura, porque incendio y terremoto son obligatorios. Si cancelas antes, pregunta por la devolución de la prima no devengada. El consejo o la asamblea deben aprobarlo según el reglamento.",
      },
    ],
    ramoRuta: "/seguros/copropiedades",
    waMensaje:
      "Hola, leí la guía del seguro de copropiedad y quiero cotizar la póliza de áreas comunes de nuestro conjunto.",
    autor: null,
    revisadoPor: null,
    publicado: "2026-11-08",
    actualizado: "2026-11-08",
    todo: [
      ...PENDIENTE_REVISION,
      PENDIENTE_CASO,
      `Verificar con el asesor: Ley 675 de 2001, art. 15 (seguro obligatorio de incendio y terremoto para bienes comunes asegurables, destino de la indemnización) — ${FUENTE_L675}`,
      `Verificar con el asesor: Ley 675 de 2001, arts. 50 (responsabilidad del administrador por dolo, culpa leve o grave; parágrafo 3 sobre pólizas de los administradores), 51 (funciones del administrador), 53 (obligatoriedad del consejo) y 55 (funciones del consejo) — ${FUENTE_L675}`,
      "Confirmar con el asesor si existe reglamentación vigente del parágrafo 3 del art. 50 de la Ley 675 que haga exigible una póliza para los administradores de propiedad horizontal; mientras tanto el texto solo dice que la ley lo prevé.",
      "Confirmar con el asesor si la póliza de manejo para copropiedades de las aseguradoras con las que trabaja VanTrust cubre a la administración externa (persona natural o jurídica) y al contador.",
      "Confirmar con el asesor cómo tratan las pólizas de copropiedad el hurto de vehículos en parqueaderos y los daños por agua en la Costa.",
    ],
  },
];
