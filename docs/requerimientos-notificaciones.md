# Solicitud de accesos para activar las notificaciones de leads

Correo listo para enviar al cliente / administrador del dominio.

Contexto: el sitio está publicado y los formularios funcionan, pero **ningún
canal de notificación está configurado**, así que los leads no llegan a nadie.

---

**Asunto:** Solicitud de accesos para activar la llegada de leads — VanTrust

Buen día,

La página de VanTrust ya está publicada y los formularios de cotización están
funcionando correctamente. Sin embargo, falta habilitar el último tramo: hoy la
web recibe la solicitud del cliente, pero **no tiene por dónde notificarla**, así
que esa información no le está llegando al equipo comercial.

Para dejarlo operativo necesito acceso a dos herramientas. Les detallo qué
necesito de cada una y para qué.

---

### 1. Acceso al DNS del dominio (GoDaddy)

**Para qué:** habilitar que la página envíe los correos de cotización desde
`vantrust.com.co`.

**Qué necesito:** permiso para agregar 3 registros DNS.

Quiero ser explícito en esto: **el correo actual de la agencia no se ve
afectado**. Los tres registros se crean en subdominios nuevos (`send` y
`resend._domainkey`) que hoy no existen. El registro MX de Microsoft 365 y el
SPF del dominio principal quedan exactamente como están hoy — no se modifican ni
se reemplazan.

La forma más limpia de darme el acceso es el **Acceso delegado** de GoDaddy, que
no implica compartir la contraseña de la cuenta:

> GoDaddy → *Configuración de la cuenta* → **Acceso delegado** → *Invitar a
> alguien* → mi correo → permiso **"Administrar productos"**

Si prefieren no delegar el acceso, la alternativa es que me indiquen quién
administra el DNS y yo le envío los tres valores exactos para que los cargue.
Cualquiera de las dos funciona.

---

### 2. Acceso al bot de Telegram

**Para qué:** que los asesores reciban el aviso del lead en el celular al
instante, con los datos del cliente listos para llamarlo.

Aquí hay dos caminos, según lo que les resulte más cómodo:

**Opción A — ustedes lo crean** (unos 10 minutos):

1. En Telegram, buscar el contacto **@BotFather** y enviarle `/newbot`
2. Asignarle un nombre (ej. *VanTrust Leads*) y un usuario (ej. *vantrust_leads_bot*)
3. BotFather devuelve un **token**: una línea larga tipo `8123456789:AAH...`
4. Crear un **grupo** con los asesores que deben recibir los leads
5. Agregar el bot a ese grupo y escribir cualquier mensaje dentro del grupo
6. Enviarme el token y avisarme que el grupo ya está creado

**Opción B — lo creo yo:** me agregan como administrador al grupo de asesores (o
me indican quiénes deben estar) y yo me encargo del resto.

En ambos casos, la ventaja de usar un grupo es que después pueden **agregar o
quitar asesores sin tener que tocar la página**.

Sobre el token: les pido que me lo compartan por WhatsApp o por llamada, no por
correo. Un correo con una credencial queda archivado de forma permanente en dos
buzones. Si en algún momento se llegara a filtrar, se puede revocar y generar
uno nuevo desde BotFather.

---

### Qué va a pasar una vez tengamos los accesos

Por cada persona que llene un formulario en la web:

- **Aviso inmediato en el grupo de Telegram**, con nombre, teléfono, ciudad,
  tipo de seguro, valores asegurados y horario preferido de contacto. El
  teléfono queda como enlace, así que el asesor puede llamar desde el mismo chat.
- **Correo al asesor** con el detalle completo de la solicitud.
- **Correo de confirmación al cliente**, avisándole que su solicitud fue
  recibida y que lo contactarán dentro de la hora siguiente.

Este último envío es el que depende del punto 1: sin los registros DNS no se
puede enviar correo desde el dominio de la agencia.

---

### Sugerencia de orden

Si quieren avanzar por partes, **empecemos por Telegram**. No depende del DNS ni
de permisos de terceros, y con eso los leads empiezan a llegarle al equipo hoy
mismo. El acceso a GoDaddy lo podemos gestionar en paralelo, sin afán.

Quedo atento a cualquiera de los dos accesos para dejarlo funcionando.

Cordial saludo,

**Juan Pablo Pinto**
Desarrollo — vantrust.com.co

---

## Notas internas (no enviar)

- La cuenta de Resend la creo yo; de ellos solo necesito los DNS.
- Verificar antes y después con: `node scripts/check-notificaciones.mjs --dns`
- **Regla de oro** al revisar lo que pida Resend: si algún registro tiene `@`
  como nombre, o pide cambiar el MX existente, o pide un segundo SPF — parar.
  Ninguno de los tres hace falta y cualquiera tumba el correo de Microsoft 365.
- Error típico de GoDaddy: en el campo *Name* va solo `resend._domainkey`, no el
  nombre completo. GoDaddy le añade el dominio automáticamente.
- Estado actual del dominio (verificado con `dig`):
  - MX → `vantrust-com-co.mail.protection.outlook.com` (Microsoft 365)
  - SPF → `v=spf1 include:spf.protection.outlook.com -all` (rechazo duro)
  - DMARC → `p=quarantine`, alineación relajada
