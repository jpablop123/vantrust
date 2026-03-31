"use client";

import Accordion from "@/components/Accordion";

export default function TermsContent() {
  const sections = [
    {
      title: "1. Objeto",
      content: (
        <div className="space-y-3">
          <p>
            Los presentes Términos y Condiciones de Uso (en adelante, los &quot;Términos&quot;) regulan
            el acceso y uso del sitio web de <strong>VanTrust S.A.S.</strong> (en adelante,
            &quot;VanTrust&quot; o el &quot;Sitio Web&quot;), disponible en el dominio vantrust.co y sus
            subdominios.
          </p>
          <p>
            VanTrust opera como <strong>agencia de seguros</strong> debidamente inscrita ante la
            Superintendencia Financiera de Colombia en el Registro Único de Intermediarios (RUI),
            dedicada a la intermediación de seguros de vehículo, salud y vivienda en el territorio
            colombiano.
          </p>
          <p>
            El Sitio Web tiene como finalidad proporcionar información sobre los servicios de
            intermediación de seguros ofrecidos por VanTrust, permitir al usuario solicitar cotizaciones
            de seguros y facilitar el contacto con el equipo comercial de VanTrust para la asesoría
            y eventual contratación de pólizas de seguros.
          </p>
          <p>
            El acceso y uso del Sitio Web implica la aceptación plena e incondicional de estos Términos.
            Si el usuario no está de acuerdo con alguna de estas condiciones, deberá abstenerse de
            utilizar el Sitio Web.
          </p>
        </div>
      ),
    },
    {
      title: "2. Naturaleza del Servicio — Intermediación de Seguros",
      content: (
        <div className="space-y-3">
          <p>
            El usuario reconoce y acepta que VanTrust actúa exclusivamente como{" "}
            <strong>intermediario de seguros</strong>, en los términos del artículo 41 del Estatuto
            Orgánico del Sistema Financiero (Decreto 663 de 1993) y la normativa complementaria
            aplicable. En consecuencia:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              VanTrust <strong>NO es una compañía aseguradora</strong>. No emite, suscribe ni garantiza
              pólizas de seguros. Las pólizas son emitidas directamente por las compañías aseguradoras
              legalmente constituidas y autorizadas por la Superintendencia Financiera de Colombia.
            </li>
            <li>
              VanTrust actúa como enlace entre el usuario y las aseguradoras, facilitando la
              comparación de productos, la asesoría personalizada y la gestión documental necesaria
              para la contratación del seguro.
            </li>
            <li>
              Las obligaciones derivadas de las pólizas de seguros contratadas a través de VanTrust
              son responsabilidad exclusiva de la compañía aseguradora emisora. VanTrust no asume
              responsabilidad por el cumplimiento, cobertura, rechazo de siniestros o cualquier
              decisión de la aseguradora respecto a la póliza contratada.
            </li>
            <li>
              El costo de las pólizas de seguros es{" "}
              <strong>exactamente el mismo</strong> que si el usuario las adquiriera directamente con
              la aseguradora. VanTrust recibe su remuneración a través de comisiones pagadas por las
              aseguradoras, sin que esto represente un sobrecosto para el usuario.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Condiciones de Uso del Cotizador",
      content: (
        <div className="space-y-3">
          <p>
            El Sitio Web pone a disposición del usuario un formulario de cotización que permite
            solicitar información sobre opciones de seguros. Respecto a este formulario, el usuario
            reconoce y acepta que:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>El envío de una solicitud de cotización NO constituye ni genera un contrato de
              seguro.</strong> La solicitud es únicamente una manifestación de interés del usuario para
              recibir información sobre productos de seguros disponibles.
            </li>
            <li>
              Los precios, coberturas y condiciones mostrados o comunicados durante el proceso de
              cotización son <strong>referenciales e indicativos</strong>. Los valores definitivos
              serán confirmados por un asesor de VanTrust después de verificar la información
              proporcionada y consultar las condiciones vigentes con las aseguradoras correspondientes.
            </li>
            <li>
              Las cotizaciones tienen un <strong>período de validez limitado</strong> que será indicado
              por el asesor. Transcurrido dicho período, las condiciones y precios podrán variar sin
              previo aviso.
            </li>
            <li>
              El usuario se compromete a proporcionar información <strong>veraz, completa y
              actualizada</strong> en el formulario de cotización. La inexactitud u omisión de datos
              relevantes (como la placa del vehículo, datos personales o historial de siniestros) podrá
              afectar la validez de la cotización y, eventualmente, la cobertura de la póliza contratada.
            </li>
            <li>
              La contratación efectiva del seguro estará sujeta a la{" "}
              <strong>aceptación del riesgo por parte de la aseguradora</strong>, la cual podrá
              declinar la emisión de la póliza conforme a sus políticas internas de suscripción.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Obligaciones del Usuario",
      content: (
        <div className="space-y-3">
          <p>El usuario del Sitio Web se compromete a:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Utilizar el Sitio Web de conformidad con la ley colombiana, la moral, las buenas
              costumbres y el orden público.
            </li>
            <li>
              No proporcionar información falsa, engañosa o de terceros sin autorización en los
              formularios del Sitio Web.
            </li>
            <li>
              No utilizar el Sitio Web para fines ilegales, abusivos o que puedan causar daños a
              VanTrust, a otros usuarios o a terceros.
            </li>
            <li>
              No intentar acceder a áreas restringidas del Sitio Web, a los servidores o a las bases
              de datos de VanTrust sin autorización.
            </li>
            <li>
              No reproducir, distribuir, modificar ni hacer uso comercial del contenido del Sitio Web
              sin autorización expresa de VanTrust.
            </li>
            <li>
              Ser mayor de dieciocho (18) años de edad para utilizar los servicios de cotización y
              contratación de seguros.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Propiedad Intelectual",
      content: (
        <div className="space-y-3">
          <p>
            Todos los contenidos del Sitio Web, incluyendo de manera enunciativa pero no limitativa:
            textos, gráficos, imágenes, fotografías, logotipos, iconos, diseño visual, código fuente,
            software, bases de datos, marcas, nombres comerciales y demás elementos protegibles por
            la legislación colombiana e internacional de propiedad intelectual, son propiedad exclusiva
            de VanTrust o de sus licenciantes, y están protegidos por:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>La Ley 23 de 1982 (Ley de Derechos de Autor de Colombia).</li>
            <li>La Decisión Andina 351 de 1993 (Régimen Común sobre Derecho de Autor y Derechos Conexos).</li>
            <li>La Decisión Andina 486 de 2000 (Régimen Común sobre Propiedad Industrial).</li>
            <li>Los tratados internacionales de propiedad intelectual ratificados por Colombia.</li>
          </ul>
          <p>
            Queda expresamente prohibida la reproducción, distribución, comunicación pública,
            transformación o cualquier forma de explotación, total o parcial, de los contenidos del
            Sitio Web sin autorización previa y por escrito de VanTrust.
          </p>
          <p>
            Las marcas y logotipos de las compañías aseguradoras mostrados en el Sitio Web
            (incluyendo Bolívar, Sura, AXA, Allianz, entre otros) son propiedad de sus respectivos
            titulares y se utilizan únicamente con fines informativos para identificar a las
            aseguradoras aliadas de VanTrust.
          </p>
        </div>
      ),
    },
    {
      title: "6. Limitación de Responsabilidad",
      content: (
        <div className="space-y-3">
          <p>VanTrust no será responsable por:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Interrupciones del servicio:</strong> La disponibilidad del Sitio Web no se
              garantiza de forma ininterrumpida. VanTrust podrá suspender temporal o definitivamente
              el acceso al Sitio Web por razones de mantenimiento, actualización, seguridad o fuerza
              mayor.
            </li>
            <li>
              <strong>Decisiones de las aseguradoras:</strong> VanTrust no garantiza la aprobación de
              cotizaciones, la emisión de pólizas ni el reconocimiento de siniestros por parte de las
              compañías aseguradoras. Estas decisiones son responsabilidad exclusiva de cada aseguradora.
            </li>
            <li>
              <strong>Información proporcionada por el usuario:</strong> Los daños o perjuicios
              derivados de la inexactitud, falsedad u omisión de la información proporcionada por el
              usuario en los formularios del Sitio Web.
            </li>
            <li>
              <strong>Contenidos de terceros:</strong> El Sitio Web podrá contener enlaces a sitios
              web de terceros (aseguradoras, entidades regulatorias, etc.) sobre los cuales VanTrust
              no tiene control. VanTrust no se responsabiliza por el contenido, políticas de
              privacidad ni prácticas de dichos sitios.
            </li>
            <li>
              <strong>Variaciones de precios:</strong> Los precios de las primas de seguros están
              determinados por las compañías aseguradoras y pueden variar sin previo aviso. Las
              cotizaciones proporcionadas a través del Sitio Web son orientativas hasta su confirmación
              formal por un asesor.
            </li>
            <li>
              <strong>Virus o programas maliciosos:</strong> VanTrust implementa medidas de seguridad
              razonables, pero no garantiza que el Sitio Web esté libre de virus, malware u otros
              elementos nocivos.
            </li>
          </ul>
          <p>
            En ningún caso la responsabilidad total de VanTrust frente al usuario excederá el monto
            efectivamente pagado por el usuario a VanTrust por los servicios prestados, si lo hubiere.
          </p>
        </div>
      ),
    },
    {
      title: "7. Protección de Datos Personales",
      content: (
        <div className="space-y-3">
          <p>
            El tratamiento de los datos personales recolectados a través del Sitio Web se rige por
            la <strong>Política de Privacidad</strong> de VanTrust, disponible en{" "}
            <a href="/politica-privacidad" className="text-accent hover:underline font-medium">
              vantrust.co/politica-privacidad
            </a>.
          </p>
          <p>
            Al utilizar el Sitio Web y proporcionar datos personales, el usuario declara haber leído,
            comprendido y aceptado dicha Política de Privacidad, la cual forma parte integral de
            estos Términos y Condiciones.
          </p>
        </div>
      ),
    },
    {
      title: "8. Modificaciones de los Términos",
      content: (
        <div className="space-y-3">
          <p>
            VanTrust se reserva el derecho de modificar los presentes Términos y Condiciones en
            cualquier momento, sin necesidad de previo aviso. Las modificaciones serán efectivas a
            partir de su publicación en el Sitio Web.
          </p>
          <p>
            El uso continuado del Sitio Web después de la publicación de cambios implica la aceptación
            de los Términos modificados. Se recomienda al usuario revisar periódicamente esta página
            para conocer las condiciones vigentes.
          </p>
          <p>
            Cuando las modificaciones sean sustanciales y afecten significativamente los derechos del
            usuario, VanTrust realizará esfuerzos razonables para notificar dichos cambios a través
            del Sitio Web o por los canales de comunicación disponibles.
          </p>
        </div>
      ),
    },
    {
      title: "9. Ley Aplicable y Jurisdicción",
      content: (
        <div className="space-y-3">
          <p>
            Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes
            de la <strong>República de Colombia</strong>, en particular:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Código Civil Colombiano y Código de Comercio.</li>
            <li>Ley 527 de 1999 sobre comercio electrónico.</li>
            <li>Ley 1480 de 2011 (Estatuto del Consumidor).</li>
            <li>Ley 1581 de 2012 (Protección de Datos Personales).</li>
            <li>Decreto 663 de 1993 (Estatuto Orgánico del Sistema Financiero).</li>
            <li>Demás normas concordantes y complementarias.</li>
          </ul>
          <p>
            Para cualquier controversia o disputa que surja en relación con estos Términos, las
            partes se someten a la jurisdicción de los{" "}
            <strong>jueces y tribunales de Bogotá D.C., Colombia</strong>, renunciando expresamente
            a cualquier otro fuero que pudiera corresponderles.
          </p>
          <p>
            Sin perjuicio de lo anterior, el usuario consumidor podrá acudir a los mecanismos de
            protección previstos en el Estatuto del Consumidor, incluyendo las acciones ante la
            Superintendencia de Industria y Comercio y la Superintendencia Financiera de Colombia.
          </p>
        </div>
      ),
    },
    {
      title: "10. Resolución de Conflictos y Reclamaciones",
      content: (
        <div className="space-y-3">
          <p>
            Antes de acudir a la jurisdicción ordinaria, el usuario podrá presentar sus reclamaciones
            directamente a VanTrust a través de los siguientes canales:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Correo electrónico:</strong> info@vantrust.co</li>
            <li><strong>WhatsApp:</strong> +57 300 000 0000</li>
            <li><strong>Dirección:</strong> Bogotá D.C., Colombia [dirección completa pendiente]</li>
          </ul>
          <p>
            VanTrust se compromete a atender las reclamaciones en un plazo máximo de{" "}
            <strong>quince (15) días hábiles</strong>, contados a partir de la recepción de la
            reclamación completa. Si la reclamación requiere un tiempo adicional, se informará al
            usuario dentro de los primeros quince días, indicando el plazo estimado de respuesta, el
            cual no excederá de treinta (30) días hábiles.
          </p>
          <p>
            En caso de que la reclamación esté relacionada con una póliza de seguro emitida por una
            aseguradora, VanTrust facilitará la comunicación entre el usuario y la aseguradora
            correspondiente y acompañará al usuario en el proceso de reclamación, sin que esto
            implique la asunción de responsabilidad por las decisiones de la aseguradora.
          </p>
          <p>
            Adicionalmente, el usuario podrá acudir ante:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Superintendencia Financiera de Colombia:</strong> Para quejas relacionadas con
              la actividad de intermediación de seguros.
            </li>
            <li>
              <strong>Superintendencia de Industria y Comercio:</strong> Para quejas relacionadas con
              protección al consumidor o tratamiento de datos personales.
            </li>
            <li>
              <strong>Defensoría del Consumidor Financiero:</strong> Para quejas contra las compañías
              aseguradoras con las que VanTrust intermedia.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "11. Disposiciones Finales",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Independencia de las cláusulas:</strong> Si alguna de las cláusulas de estos
            Términos fuese declarada nula, inválida o inaplicable por autoridad competente, las
            restantes cláusulas continuarán vigentes y surtirán plenos efectos legales.
          </p>
          <p>
            <strong>No renuncia:</strong> El hecho de que VanTrust no ejerza alguno de los derechos
            previstos en estos Términos no constituirá renuncia a los mismos, pudiendo ejercerlos en
            cualquier momento posterior.
          </p>
          <p>
            <strong>Totalidad del acuerdo:</strong> Estos Términos, junto con la Política de Privacidad,
            constituyen el acuerdo íntegro entre el usuario y VanTrust respecto al uso del Sitio Web,
            y reemplazan cualquier acuerdo, comunicación o propuesta anterior, ya sea oral o escrita,
            relacionada con el mismo objeto.
          </p>
          <p className="mt-4 font-semibold text-primary">
            Fecha de última actualización: Marzo 2025
          </p>
        </div>
      ),
    },
  ];

  return <Accordion items={sections} defaultOpen={0} />;
}
