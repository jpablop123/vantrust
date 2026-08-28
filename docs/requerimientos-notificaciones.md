# Solicitud para activar las notificaciones de leads

Correo listo para enviar al cliente / administrador del dominio.

Contexto: el sitio está publicado y los formularios funcionan, pero **ningún
canal de notificación está configurado**, así que los leads no llegan a nadie.

---

**Asunto:** Dos pendientes para activar la llegada de leads — VanTrust

Buen día,

La página ya está publicada y los formularios funcionan, pero los leads todavía
no le están llegando al equipo comercial. Para activarlo necesito dos cosas de
su lado:

**1. Agregar tres registros DNS en GoDaddy.** Les envío los valores exactos en
los próximos días. No afectan el correo de la agencia: van en subdominios
nuevos y el MX de Microsoft 365 queda intacto.

**2. Crear un bot de Telegram.** Escribirle a **@BotFather** en Telegram,
enviarle `/newbot` y compartirme el token que devuelve (por WhatsApp, no por
correo). Aparte, crear un grupo con los asesores y agregar ahí el bot: a ese
grupo llegarán los avisos.

Con lo segundo los leads empiezan a llegar de una vez.

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
