"use client";

import Accordion from "@/components/Accordion";

export default function PrivacyContent() {
  const sections = [
    {
      title: "1. Responsable del Tratamiento de Datos Personales",
      content: (
        <div className="space-y-3">
          <p>
            El responsable del tratamiento de los datos personales recolectados a través de este sitio web es:
          </p>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-primary w-44">Razón Social:</td>
                <td className="py-2">VanTrust S.A.S.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-primary">NIT:</td>
                <td className="py-2">[Pendiente de registro]</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-primary">Actividad:</td>
                <td className="py-2">Agencia de seguros — intermediación en seguros de vehículo, salud y vivienda</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-primary">Domicilio:</td>
                <td className="py-2">Bogotá D.C., Colombia</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-primary">Correo electrónico:</td>
                <td className="py-2">privacidad@vantrust.co</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-primary">Teléfono:</td>
                <td className="py-2">+57 300 000 0000</td>
              </tr>
            </tbody>
          </table>
          <p>
            VanTrust actúa como agencia de seguros debidamente inscrita ante la Superintendencia
            Financiera de Colombia en el Registro Único de Intermediarios (RUI), en cumplimiento de lo
            dispuesto en el Estatuto Orgánico del Sistema Financiero y la normativa aplicable a los
            intermediarios de seguros.
          </p>
        </div>
      ),
    },
    {
      title: "2. Marco Legal Aplicable",
      content: (
        <div className="space-y-3">
          <p>
            La presente Política de Tratamiento de Datos Personales se rige por la normativa colombiana
            vigente, en particular:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Ley 1581 de 2012:</strong> Por la cual se dictan disposiciones generales para la
              protección de datos personales.
            </li>
            <li>
              <strong>Decreto 1377 de 2013:</strong> Por el cual se reglamenta parcialmente la Ley 1581
              de 2012 en lo relacionado con la autorización del titular, políticas de tratamiento,
              ejercicio de derechos y transferencias de datos.
            </li>
            <li>
              <strong>Decreto 1074 de 2015 (Título 2, Parte 2, Libro 2, Capítulo 25 y 26):</strong>{" "}
              Decreto Único Reglamentario del Sector Comercio, Industria y Turismo que compiló las
              disposiciones del Decreto 1377 de 2013.
            </li>
            <li>
              <strong>Ley 527 de 1999:</strong> Sobre comercio electrónico, firmas digitales y mensajes
              de datos.
            </li>
            <li>
              <strong>Ley 1480 de 2011:</strong> Estatuto del Consumidor.
            </li>
            <li>
              <strong>Ley 2300 de 2023:</strong> Por medio de la cual se establecen medidas para la
              protección de los derechos de los consumidores frente a contactos no autorizados
              (&quot;Ley Dejen de Fregar&quot;).
            </li>
            <li>
              <strong>Circular Externa 029 de 2014 de la Superintendencia Financiera de Colombia:</strong>{" "}
              Instrucciones relativas a la administración del riesgo de lavado de activos y financiación
              del terrorismo (SARLAFT/SAGRILAFT) aplicables a intermediarios de seguros.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Datos Personales que Recolectamos",
      content: (
        <div className="space-y-3">
          <p>
            VanTrust recolecta los siguientes datos personales según la etapa de interacción con el
            usuario:
          </p>
          <h4 className="font-semibold text-primary mt-4">3.1. Datos de contacto y cotización (formulario web)</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre completo</li>
            <li>Número de celular / WhatsApp</li>
            <li>Correo electrónico</li>
            <li>Ciudad de residencia</li>
            <li>Placa del vehículo (cuando el seguro solicitado es vehicular)</li>
            <li>Tipo de seguro de interés (vehículo, salud, vivienda u otro)</li>
            <li>Horario preferido de contacto</li>
            <li>Mensaje adicional (opcional)</li>
          </ul>

          <h4 className="font-semibold text-primary mt-4">3.2. Datos para formalización del seguro</h4>
          <p>
            Cuando el usuario decide formalizar la adquisición de un seguro, se recolectarán adicionalmente:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Número de cédula de ciudadanía o cédula de extranjería</li>
            <li>Fecha de nacimiento</li>
            <li>Dirección de residencia completa</li>
            <li>Información financiera relevante para la póliza</li>
            <li>Datos del vehículo (marca, línea, modelo, cilindraje, clase — cuando aplique)</li>
            <li>Información de beneficiarios (cuando aplique)</li>
            <li>Historial de siniestros previos (cuando aplique)</li>
          </ul>

          <h4 className="font-semibold text-primary mt-4">3.3. Datos de navegación</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dirección IP</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>Cookies técnicas y de rendimiento (ver sección 10)</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Finalidades del Tratamiento",
      content: (
        <div className="space-y-3">
          <p>Los datos personales recolectados serán utilizados para las siguientes finalidades:</p>

          <h4 className="font-semibold text-primary mt-4">4.1. Finalidades principales (necesarias para la prestación del servicio)</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestionar las solicitudes de cotización de seguros realizadas a través del sitio web.</li>
            <li>Contactar al usuario por los canales autorizados (correo electrónico, WhatsApp, llamada telefónica) para brindar asesoría personalizada sobre los productos de seguros disponibles.</li>
            <li>Comparar y presentar opciones de pólizas de seguros ofrecidas por las aseguradoras aliadas (Bolívar, Sura, AXA, Allianz, entre otras).</li>
            <li>Tramitar la formalización, emisión y administración de pólizas de seguros ante las compañías aseguradoras.</li>
            <li>Verificar la identidad del titular y realizar consultas en listas restrictivas, vinculantes y bases de datos para el cumplimiento de las obligaciones derivadas del Sistema de Autocontrol y Gestión del Riesgo de Lavado de Activos, Financiación del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva (SAGRILAFT), conforme a la Circular Externa 029 de la Superintendencia Financiera de Colombia.</li>
            <li>Dar cumplimiento a obligaciones legales, regulatorias y contractuales.</li>
          </ul>

          <h4 className="font-semibold text-primary mt-4">4.2. Finalidades secundarias (requieren autorización expresa)</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enviar comunicaciones comerciales, promociones y novedades sobre productos de seguros que puedan ser de interés del titular.</li>
            <li>Realizar encuestas de satisfacción y estudios de mercado.</li>
            <li>Compartir datos con aseguradoras aliadas para la elaboración de cotizaciones personalizadas.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Base Legal del Tratamiento",
      content: (
        <div className="space-y-3">
          <p>El tratamiento de datos personales por parte de VanTrust se fundamenta en:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Autorización previa, expresa e informada del titular:</strong> Al enviar el
              formulario de cotización, el usuario otorga su autorización para el tratamiento de sus
              datos conforme a esta política, en los términos del artículo 9 de la Ley 1581 de 2012.
            </li>
            <li>
              <strong>Ejecución de un contrato o medidas precontractuales:</strong> El tratamiento es
              necesario para gestionar la solicitud de cotización y, en su caso, formalizar la póliza
              de seguro solicitada.
            </li>
            <li>
              <strong>Obligación legal:</strong> VanTrust está obligada a verificar la identidad de sus
              clientes y realizar controles SAGRILAFT conforme a la normativa aplicable a intermediarios
              de seguros.
            </li>
            <li>
              <strong>Interés legítimo:</strong> Para garantizar la seguridad del sitio web y prevenir
              actividades fraudulentas.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "6. Autorización de Canales de Contacto y Ley 2300 de 2023",
      content: (
        <div className="space-y-3">
          <p>
            En cumplimiento de la <strong>Ley 2300 de 2023</strong> (&quot;Ley Dejen de Fregar&quot;),
            VanTrust informa que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Al enviar el formulario de cotización, el usuario <strong>autoriza expresamente</strong>{" "}
              a VanTrust para contactarlo a través de los siguientes canales: correo electrónico,
              WhatsApp y llamada telefónica al número celular proporcionado.
            </li>
            <li>
              Los contactos comerciales se realizarán exclusivamente en{" "}
              <strong>horarios hábiles</strong>: de lunes a viernes de 8:00 a.m. a 7:00 p.m. y sábados
              de 8:00 a.m. a 3:00 p.m. (hora colombiana, GMT-5). No se realizarán contactos en domingos
              ni festivos, salvo solicitud expresa del titular.
            </li>
            <li>
              El usuario podrá revocar la autorización de contacto por cualquier canal específico en
              cualquier momento, sin necesidad de revocar la totalidad del tratamiento de sus datos.
              Para ello, podrá enviar un correo a{" "}
              <strong>privacidad@vantrust.co</strong> indicando el canal o canales que desea desactivar.
            </li>
            <li>
              VanTrust atenderá las solicitudes de exclusión en un plazo máximo de{" "}
              <strong>cinco (5) días hábiles</strong> y confirmará al titular por escrito la
              desactivación del canal solicitado.
            </li>
            <li>
              VanTrust no realizará más de <strong>un (1) contacto comercial al día</strong> por cada
              canal autorizado, salvo que el titular lo solicite expresamente o exista una comunicación
              pendiente relacionada con una cotización activa.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "7. Derechos del Titular de los Datos",
      content: (
        <div className="space-y-3">
          <p>
            De conformidad con los artículos 8 y 15 de la Ley 1581 de 2012, el titular de los datos
            personales tiene los siguientes derechos:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Acceso:</strong> Conocer, actualizar y rectificar sus datos personales. El titular
              podrá solicitar en cualquier momento una copia de la información que VanTrust tiene
              almacenada sobre él.
            </li>
            <li>
              <strong>Corrección:</strong> Solicitar la actualización o corrección de datos que resulten
              parciales, inexactos, incompletos, fraccionados o que induzcan a error.
            </li>
            <li>
              <strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando considere que no
              están siendo tratados conforme a los principios, deberes y obligaciones previstas en la
              Ley 1581 de 2012, salvo que exista un deber legal o contractual de conservarlos.
            </li>
            <li>
              <strong>Revocatoria:</strong> Revocar la autorización otorgada para el tratamiento de sus
              datos personales, siempre y cuando no exista un deber legal o contractual que impida su
              eliminación.
            </li>
            <li>
              <strong>Oposición:</strong> Oponerse al tratamiento de sus datos para finalidades
              específicas, en particular las relacionadas con mercadeo y comunicaciones comerciales.
            </li>
            <li>
              <strong>Portabilidad:</strong> Solicitar la entrega de sus datos en un formato
              estructurado, de uso común y lectura mecánica.
            </li>
            <li>
              <strong>Queja ante la SIC:</strong> Presentar quejas ante la Superintendencia de Industria
              y Comercio por presuntas infracciones a la normativa de protección de datos personales,
              previo trámite de consulta o reclamo ante VanTrust.
            </li>
          </ul>

          <h4 className="font-semibold text-primary mt-4">Cómo ejercer sus derechos</h4>
          <p>Para ejercer cualquiera de estos derechos, el titular o su representante legal podrá:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Enviar un correo electrónico a <strong>privacidad@vantrust.co</strong> con el asunto
              &quot;Ejercicio de derechos — [nombre del derecho]&quot;.
            </li>
            <li>
              Escribir al WhatsApp +57 300 000 0000 indicando su solicitud.
            </li>
          </ul>
          <p>
            La solicitud deberá incluir: (i) nombre completo del titular, (ii) número de cédula,
            (iii) descripción de la solicitud, (iv) dirección de correo electrónico o teléfono para
            recibir respuesta. VanTrust responderá en un plazo máximo de <strong>quince (15) días
            hábiles</strong> contados a partir de la recepción de la solicitud completa, prorrogable
            por ocho (8) días hábiles adicionales cuando las circunstancias lo justifiquen, informando
            al titular dentro de los primeros quince días.
          </p>
        </div>
      ),
    },
    {
      title: "8. Tiempo de Conservación de los Datos",
      content: (
        <div className="space-y-3">
          <p>Los datos personales serán conservados durante los siguientes períodos:</p>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface">
                <th className="text-left px-4 py-2 font-semibold text-primary">Tipo de dato</th>
                <th className="text-left px-4 py-2 font-semibold text-primary">Período</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Datos de cotización (leads)</td>
                <td className="px-4 py-2">Hasta 2 años desde la última interacción, o hasta que el titular solicite su eliminación</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Datos de pólizas activas</td>
                <td className="px-4 py-2">Durante la vigencia de la póliza y hasta 5 años después de su vencimiento, conforme a la normativa de seguros y SAGRILAFT</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Datos SAGRILAFT (cédula, validación en listas)</td>
                <td className="px-4 py-2">10 años desde la terminación de la relación comercial, conforme a la Circular 029 de la SFC</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Datos de navegación y cookies</td>
                <td className="px-4 py-2">Máximo 13 meses</td>
              </tr>
            </tbody>
          </table>
          <p>
            Al vencer los períodos indicados, los datos serán eliminados de forma segura o anonimizados
            de manera que no permitan la identificación del titular.
          </p>
        </div>
      ),
    },
    {
      title: "9. Encargados del Tratamiento y Compartición de Datos",
      content: (
        <div className="space-y-3">
          <p>
            VanTrust podrá compartir los datos personales del titular con las siguientes categorías
            de terceros, en calidad de encargados del tratamiento o en cumplimiento de obligaciones
            legales:
          </p>

          <h4 className="font-semibold text-primary mt-4">9.1. Aseguradoras aliadas</h4>
          <p>
            Los datos del titular podrán ser compartidos con las compañías aseguradoras con las que
            VanTrust tiene convenio de intermediación (incluyendo, de manera enunciativa y no
            limitativa: Seguros Bolívar, Suramericana S.A. (Sura), AXA Colpatria y Allianz Seguros
            S.A.) con el fin de generar cotizaciones comparativas, emitir pólizas y gestionar siniestros.
          </p>

          <h4 className="font-semibold text-primary mt-4">9.2. Proveedores de tecnología</h4>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface">
                <th className="text-left px-4 py-2 font-semibold text-primary">Proveedor</th>
                <th className="text-left px-4 py-2 font-semibold text-primary">Finalidad</th>
                <th className="text-left px-4 py-2 font-semibold text-primary">Ubicación</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Resend, Inc.</td>
                <td className="px-4 py-2">Envío de correos electrónicos transaccionales y notificaciones al equipo comercial</td>
                <td className="px-4 py-2">Estados Unidos</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Google LLC (Google Sheets)</td>
                <td className="px-4 py-2">Almacenamiento temporal de leads para gestión comercial interna</td>
                <td className="px-4 py-2">Estados Unidos</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Vercel, Inc.</td>
                <td className="px-4 py-2">Alojamiento y despliegue del sitio web</td>
                <td className="px-4 py-2">Estados Unidos</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-2">Meta Platforms, Inc. (WhatsApp Business)</td>
                <td className="px-4 py-2">Envío de notificaciones al equipo comercial vía WhatsApp</td>
                <td className="px-4 py-2">Estados Unidos</td>
              </tr>
            </tbody>
          </table>

          <h4 className="font-semibold text-primary mt-4">9.3. Autoridades competentes</h4>
          <p>
            VanTrust podrá compartir datos personales con la Superintendencia Financiera de Colombia,
            la Superintendencia de Industria y Comercio, la UIAF (Unidad de Información y Análisis
            Financiero) u otras autoridades cuando exista una obligación legal o requerimiento judicial
            que así lo exija.
          </p>
        </div>
      ),
    },
    {
      title: "10. Transferencias Internacionales de Datos",
      content: (
        <div className="space-y-3">
          <p>
            En desarrollo de las finalidades descritas, los datos personales del titular podrán ser
            transferidos a servidores ubicados en <strong>Estados Unidos de América</strong>, donde
            operan los proveedores de tecnología mencionados en la sección anterior (Resend, Google,
            Vercel, Meta).
          </p>
          <p>
            Estas transferencias se realizan con fundamento en el{" "}
            <strong>artículo 26 de la Ley 1581 de 2012</strong>, dado que:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              El titular ha otorgado su autorización expresa al enviar el formulario de cotización.
            </li>
            <li>
              Los proveedores cuentan con políticas de protección de datos que garantizan niveles
              adecuados de seguridad, incluyendo cumplimiento de estándares internacionales (SOC 2,
              ISO 27001 y/o equivalentes).
            </li>
            <li>
              Se han suscrito acuerdos de tratamiento de datos con cada proveedor que establecen
              obligaciones de confidencialidad, seguridad y uso limitado de la información.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "11. Uso de Cookies",
      content: (
        <div className="space-y-3">
          <p>
            El sitio web de VanTrust utiliza cookies técnicas esenciales para el correcto
            funcionamiento del sitio. Estas cookies son necesarias para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mantener la sesión del usuario activa durante la navegación.</li>
            <li>Garantizar el correcto funcionamiento de los formularios.</li>
            <li>Recopilar datos anonimizados de rendimiento del sitio web.</li>
          </ul>
          <p>
            No se utilizan cookies de publicidad ni cookies de terceros con fines de rastreo
            publicitario. El usuario puede desactivar las cookies a través de la configuración de
            su navegador; sin embargo, esto podría afectar la funcionalidad del sitio web.
          </p>
        </div>
      ),
    },
    {
      title: "12. SAGRILAFT — Prevención de Lavado de Activos",
      content: (
        <div className="space-y-3">
          <p>
            En cumplimiento de la <strong>Circular Externa 029 de 2014</strong> de la Superintendencia
            Financiera de Colombia y las disposiciones aplicables a intermediarios de seguros, VanTrust
            informa que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Los datos personales recolectados, en particular el número de cédula de ciudadanía o
              extranjería, podrán ser utilizados para realizar <strong>verificación de identidad</strong>{" "}
              y <strong>consulta en listas restrictivas, vinculantes y de control</strong>, incluyendo
              las listas OFAC (Office of Foreign Assets Control), listas de las Naciones Unidas,
              listados nacionales de la UIAF y cualquier otra lista que la normativa exija consultar.
            </li>
            <li>
              VanTrust se reserva el derecho de declinar o terminar una relación comercial cuando el
              resultado de las verificaciones SAGRILAFT arroje alertas que impidan continuar con la
              gestión del seguro, conforme a las políticas internas de administración de riesgos.
            </li>
            <li>
              Los registros derivados de las verificaciones SAGRILAFT serán conservados por un período
              mínimo de <strong>diez (10) años</strong>, contados a partir de la última transacción
              realizada o la terminación de la relación comercial, lo que ocurra después.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "13. Medidas de Seguridad",
      content: (
        <div className="space-y-3">
          <p>
            VanTrust implementa medidas de seguridad técnicas, administrativas y físicas razonables
            para proteger los datos personales contra acceso no autorizado, pérdida, alteración o
            destrucción, incluyendo:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Comunicaciones cifradas mediante protocolo HTTPS/TLS.</li>
            <li>Acceso restringido a bases de datos mediante credenciales seguras.</li>
            <li>Almacenamiento de datos en proveedores con certificaciones de seguridad (SOC 2, ISO 27001).</li>
            <li>Capacitación del personal en materia de protección de datos personales.</li>
            <li>Revisión periódica de las medidas de seguridad implementadas.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "14. Vigencia y Actualizaciones de la Política",
      content: (
        <div className="space-y-3">
          <p>
            La presente Política de Privacidad entra en vigor a partir de su publicación en el sitio
            web de VanTrust y permanecerá vigente mientras VanTrust continúe realizando actividades
            de tratamiento de datos personales.
          </p>
          <p>
            VanTrust se reserva el derecho de modificar esta política en cualquier momento. Las
            modificaciones sustanciales serán comunicadas a los titulares a través de:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Publicación en el sitio web con indicación de la fecha de última actualización.</li>
            <li>Notificación por correo electrónico cuando los cambios afecten significativamente el tratamiento de datos.</li>
          </ul>
          <p>
            El uso continuado del sitio web después de la publicación de cambios se entenderá como
            aceptación de la política actualizada.
          </p>
          <p className="mt-4 font-semibold text-primary">
            Fecha de última actualización: Marzo 2025
          </p>
        </div>
      ),
    },
    {
      title: "15. Contacto del Oficial de Protección de Datos",
      content: (
        <div className="space-y-3">
          <p>
            Para cualquier consulta, solicitud o reclamo relacionado con el tratamiento de datos
            personales, el titular podrá contactar al responsable del tratamiento a través de:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Correo electrónico:</strong> privacidad@vantrust.co</li>
            <li><strong>WhatsApp:</strong> +57 300 000 0000</li>
            <li><strong>Dirección:</strong> Bogotá D.C., Colombia [dirección completa pendiente]</li>
          </ul>
          <p>
            Si el titular considera que VanTrust no ha atendido adecuadamente su solicitud, podrá
            acudir ante la <strong>Superintendencia de Industria y Comercio</strong> (Delegatura para
            la Protección de Datos Personales) para presentar la queja correspondiente.
          </p>
        </div>
      ),
    },
  ];

  return <Accordion items={sections} defaultOpen={0} />;
}
