# Requerimientos para activar las notificaciones de leads

Documento para enviar al cliente / administrador del dominio.
Estado a la fecha: el sitio está publicado y los formularios funcionan, pero
**ningún canal de notificación está configurado**, así que los leads no llegan
a nadie.

---

## Correo para enviar

**Asunto:** Activación de notificaciones de leads — requerimientos (DNS + Telegram)

Buen día,

La página de VanTrust ya está publicada y los formularios de cotización están
funcionando. Falta un último paso para que los leads lleguen efectivamente al
equipo comercial: hoy la web recibe la solicitud, pero **no tiene por dónde
notificarla**, así que esa información no le está llegando a nadie.

Necesito dos cosas de su lado. Ninguna afecta el correo actual de la agencia.

---

### 1. Registros DNS en GoDaddy

El dominio `vantrust.com.co` está en GoDaddy y su correo corre sobre Microsoft
365. Para que la página pueda enviar los correos de cotización necesito agregar
**3 registros DNS**.

**Esto no toca el correo de la agencia.** Los tres registros van en subdominios
nuevos (`send` y `resend._domainkey`) que hoy no existen. El registro MX de
Microsoft 365 y el SPF del dominio principal quedan exactamente como están.

| Tipo | Nombre | Para qué sirve |
|------|--------|----------------|
| MX | `send` | Manejo de rebotes |
| TXT | `send` | Autorización de envío (SPF) |
| TXT | `resend._domainkey` | Firma digital del correo (DKIM) |

Los valores exactos se los envío apenas tenga la cuenta creada.

**Necesito una de estas dos opciones:**

- **Opción A (más rápida):** acceso delegado a GoDaddy, que no implica
  compartir la contraseña. Se hace desde *Configuración de la cuenta → Acceso
  delegado → Invitar a alguien*, con permiso "Administrar productos".
- **Opción B:** me indican quién administra el DNS y le paso los tres valores
  para que los cargue.

---

### 2. Bot de Telegram para el equipo comercial

Para que los asesores reciban el aviso al instante en el celular, hay que crear
un bot de Telegram y un grupo. Son unos 10 minutos:

1. En Telegram, buscar el contacto **@BotFather** y enviarle `/newbot`
2. Ponerle un nombre (ej. *VanTrust Leads*) y un usuario (ej. *vantrust_leads_bot*)
3. BotFather devuelve un **token**, que es una línea larga tipo
   `8123456789:AAH...` → **ese token es lo que necesito**
4. Crear un **grupo** con los asesores que deben recibir los leads
5. Agregar el bot al grupo y escribir cualquier mensaje dentro del grupo
6. Avisarme cuando esté listo

Con eso configuro el envío. La ventaja del grupo es que después pueden agregar o
quitar asesores sin tener que tocar la página.

Sobre el token: por seguridad, prefiero que me lo compartan por un canal
distinto al correo (WhatsApp o una llamada). Si en algún momento se filtra,
BotFather permite revocarlo y generar uno nuevo con `/revoke`.

---

### Qué recibirán una vez activado

Por cada persona que llene un formulario:

- **Un mensaje en el grupo de Telegram**, al instante, con nombre, teléfono,
  ciudad, tipo de seguro, valores asegurados y horario preferido de contacto.
  El teléfono queda como enlace, así que se puede llamar desde el mismo chat.
- **Un correo al asesor** con el detalle completo.
- **Un correo de confirmación al cliente**, avisándole que su solicitud fue
  recibida y que lo contactarán dentro de la hora siguiente.

Ese tercer envío, el de confirmación al cliente, es el que depende de los
registros DNS del punto 1. Sin ellos no se puede enviar correo desde el dominio
de la agencia.

---

### Prioridad

Si quieren avanzar por partes, **Telegram es lo más urgente**: no depende de
DNS ni de permisos de terceros y se puede tener funcionando hoy mismo. El correo
puede quedar para cuando tengamos el acceso a GoDaddy.

Quedo atento.

---

## Notas internas (no enviar)

- La cuenta de Resend la creo yo; solo necesito que carguen los DNS.
- Verificar antes y después con: `node scripts/check-notificaciones.mjs --dns`
- Regla de oro al revisar lo que pida Resend: si algún registro tiene `@` como
  nombre, o pide cambiar el MX existente, o pide un segundo SPF — parar. Ninguno
  de los tres hace falta y cualquiera de ellos tumba el correo de Microsoft 365.
- Error típico de GoDaddy: en el campo *Name* va solo `resend._domainkey`, no el
  nombre completo. GoDaddy añade el dominio automáticamente.
- Compartir claves por correo deja copia permanente en dos buzones. Preferir un
  gestor de contraseñas o un canal aparte.
