# Solicitud de accesos para activar las notificaciones de leads

Correo listo para enviar al cliente / administrador del dominio.

Contexto: el sitio está publicado y los formularios funcionan, pero **ningún
canal de notificación está configurado**, así que los leads no llegan a nadie.

---

**Asunto:** Accesos para activar la llegada de leads — VanTrust

Buen día,

La página ya está publicada y los formularios funcionan, pero todavía no hay por
dónde notificar los leads: las solicitudes que entran no le están llegando al
equipo comercial.

Necesito dos accesos para dejarlo operativo.

**1. DNS del dominio, en GoDaddy** — para habilitar el envío de correos desde
`vantrust.com.co`.

El correo actual de la agencia **no se ve afectado**: los registros van en
subdominios nuevos y el MX de Microsoft 365 queda intacto.

La vía más simple es el Acceso delegado, que no implica compartir contraseñas:
*Configuración de la cuenta → Acceso delegado → Invitar a alguien → mi correo →
permiso "Administrar productos"*. Si prefieren no delegarlo, indíquenme quién
administra el DNS y le paso los tres valores.

**2. Bot de Telegram** — para que los asesores reciban el aviso en el celular al
instante.

Escríbanle a **@BotFather** en Telegram, envíen `/newbot` y me comparten el
token que devuelve (por WhatsApp, no por correo). Aparte, crear un grupo con los
asesores y agregar ahí el bot. Si prefieren, lo creo yo y solo me agregan al
grupo.

Con Telegram basta para que los leads empiecen a llegar hoy mismo. El DNS lo
vemos en paralelo, sin afán.

Quedo atento.

**Juan Pablo Pinto**

---

## Notas internas (no enviar)

- La cuenta de Resend la creo yo; de ellos solo necesito los DNS.
- Verificar antes y después con: `node scripts/check-notificaciones.mjs --dns`
- **Regla de oro** al revisar lo que pida Resend: si algún registro tiene `@`
  como nombre, o pide cambiar el MX existente, o pide un segundo SPF — parar.
  Ninguno hace falta y cualquiera tumba el correo de Microsoft 365.
- Error típico de GoDaddy: en el campo *Name* va solo `resend._domainkey`, no el
  nombre completo. GoDaddy le añade el dominio automáticamente.
- Los 3 registros que pedirá Resend: MX en `send`, TXT (SPF) en `send`,
  TXT (DKIM) en `resend._domainkey`.
- Estado actual del dominio (verificado con `dig`):
  - MX → `vantrust-com-co.mail.protection.outlook.com` (Microsoft 365)
  - SPF → `v=spf1 include:spf.protection.outlook.com -all` (rechazo duro)
  - DMARC → `p=quarantine`, alineación relajada
