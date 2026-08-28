# Solicitud para activar las notificaciones de leads

Correo listo para enviar al cliente / administrador del dominio.

Contexto: el sitio está publicado y los formularios funcionan, pero **ningún
canal de notificación está configurado**, así que los leads no llegan a nadie.

---

**Asunto:** Dos cosas para dejar la página funcionando — VanTrust

Buen día,

Necesito dos cosas de su lado para terminar:

**1. Acceso al DNS del dominio, en GoDaddy**

Para publicar la página en `vantrust.com.co` y habilitar el envío de correos.

La forma más simple es el Acceso delegado, que no implica compartir contraseñas:
*Configuración de la cuenta → Acceso delegado → Invitar a alguien → mi correo →
permiso "Administrar productos"*.

El correo de la agencia no se ve afectado: los registros de Microsoft 365 quedan
intactos.

**2. Crear el bot de Telegram**

Es por donde les van a llegar los leads al instante. Toma unos 10 minutos:

1. En Telegram, buscar el contacto **@BotFather** (tiene la marca de
   verificación azul)
2. Enviarle el mensaje `/newbot`
3. Les pide un nombre: escribir **VanTrust Leads**
4. Les pide un usuario: escribir **vantrust_leads_bot** (si está ocupado, probar
   otro que termine en `_bot`)
5. BotFather responde con un **token**: una línea larga tipo `8123456789:AAH...`
   → ese es el que necesito
6. Crear un **grupo** de Telegram con los asesores que deben recibir los leads
7. Agregar el bot a ese grupo, buscándolo por el usuario del paso 4
8. Escribir cualquier mensaje dentro del grupo

Cuando terminen, me pasan el token por WhatsApp (no por correo) y me avisan que
el grupo ya está creado.

Con esas dos cosas queda todo funcionando.

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
