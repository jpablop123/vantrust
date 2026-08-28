# Solicitud para activar las notificaciones de leads

Correo listo para enviar al cliente / administrador del dominio.

Contexto: el sitio está publicado y los formularios funcionan, pero **ningún
canal de notificación está configurado**, así que los leads no llegan a nadie.

---

**Asunto:** Acceso al DNS de vantrust.com.co

Buen día,

Para activar el envío de correos de la página necesito acceso a los registros
DNS del dominio en GoDaddy.

La forma más simple es el Acceso delegado, que no implica compartir contraseñas:
*Configuración de la cuenta → Acceso delegado → Invitar a alguien → mi correo →
permiso "Administrar productos"*.

El correo de la agencia no se ve afectado: solo agrego subdominios nuevos, el MX
de Microsoft 365 queda intacto.

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
