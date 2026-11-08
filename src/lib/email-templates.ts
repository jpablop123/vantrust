// Plantillas HTML de los correos de leads.
//
// Reglas de correo, distintas a las de la web: maquetación con <table>, estilos
// en línea (Gmail borra las hojas de estilo), ancho máximo 600px y nada de
// flex/grid. Las imágenes necesitan URL absoluta y muchos clientes las bloquean
// por defecto, así que el logo siempre lleva un alt legible como respaldo.

import { SITE, waLink } from "@/lib/site";

// El logo se sirve desde el sitio. Mientras el dominio no apunte a Vercel,
// vantrust.com.co todavía muestra la página de GoDaddy y la imagen daría 404.
const BASE = process.env.SITE_URL || "https://vantrust.vercel.app";
const LOGO = `${BASE}/vantrust-logo-white.png`;

const NAVY = "#0A1628";
const NAVY_SOFT = "#162240";
const GOLD = "#C9A84C";
const INK = "#1a2438";
const MUTED = "#6b7280";
const LINE = "#e8eaef";

/** Escapa datos del usuario antes de meterlos en HTML. */
export function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Cabecera azul con el logo. `badge` sale a la derecha (tipo de seguro). */
function header(badge?: string, centrado = false): string {
  return `
  <tr>
    <td style="background: ${NAVY}; background-image: linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%); padding: 26px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="${centrado ? "center" : "left"}" style="vertical-align: middle;">
            <img src="${LOGO}" width="150" alt="VanTrust"
                 style="display: block; width: 150px; max-width: 150px; height: auto; border: 0; ${centrado ? "margin: 0 auto;" : ""}" />
            ${
              centrado
                ? `<p style="margin: 10px 0 0; font-family: ${FONT}; color: rgba(255,255,255,.65); font-size: 13px;">${SITE.tagline}</p>`
                : `<p style="margin: 8px 0 0; font-family: ${FONT}; color: rgba(255,255,255,.6); font-size: 12px; letter-spacing: .04em; text-transform: uppercase;">Nuevo lead recibido</p>`
            }
          </td>
          ${
            badge
              ? `<td align="right" style="vertical-align: middle;">
                   <span style="display: inline-block; background: ${GOLD}; color: ${NAVY}; font-family: ${FONT}; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 20px; white-space: nowrap;">${escapeHtml(badge)}</span>
                 </td>`
              : ""
          }
        </tr>
      </table>
    </td>
  </tr>`;
}

function footer(extra?: string): string {
  return `
  <tr>
    <td style="background: #f7f8fa; border-top: 1px solid ${LINE}; padding: 18px 28px; text-align: center;">
      <p style="margin: 0; font-family: ${FONT}; color: #9aa2b1; font-size: 11px; line-height: 1.6;">
        ${SITE.legalName} · ${SITE.phoneDisplay} · ${SITE.email}<br />
        ${SITE.address}, ${SITE.city}
        ${extra ? `<br />${extra}` : ""}
      </p>
    </td>
  </tr>`;
}

/** Fila etiqueta/valor de las tablas de datos. */
function row(label: string, value: string, destacado = false): string {
  return `
  <tr>
    <td style="padding: 11px 16px 11px 0; border-top: 1px solid ${LINE}; font-family: ${FONT}; color: ${MUTED}; font-size: 13px; vertical-align: top; width: 155px;">${escapeHtml(label)}</td>
    <td style="padding: 11px 0; border-top: 1px solid ${LINE}; font-family: ${FONT}; color: ${destacado ? GOLD : INK}; font-size: 14px; font-weight: ${destacado ? "700" : "400"};">${value}</td>
  </tr>`;
}

function sectionTitle(t: string): string {
  return `<p style="margin: 26px 0 2px; font-family: ${FONT}; color: ${MUTED}; font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;">${t}</p>`;
}

function boton(href: string, texto: string, fondo: string, color: string): string {
  return `<a href="${href}" style="display: inline-block; background: ${fondo}; color: ${color}; font-family: ${FONT}; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 22px; border-radius: 8px;">${texto}</a>`;
}

function wrapper(contenido: string): string {
  return `
<div style="background: #eef0f4; padding: 24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="width: 600px; max-width: 100%; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid ${LINE};">
        ${contenido}
      </table>
    </td></tr>
  </table>
</div>`;
}

export interface LeadEmailData {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  placa: string;
  mensaje: string;
  marca_carro?: string;
  modelo_carro?: string;
  anno_carro?: string;
  uso_diario?: string;
  fuente?: string;
  detalles?: Record<string, string>;
}

/** Correo que recibe el asesor con el lead completo. */
export function leadEmailHtml(
  data: LeadEmailData,
  tipoLabel: string,
  horarioLabel: string,
  fecha: string
): string {
  const vehiculo = [data.marca_carro, data.modelo_carro, data.anno_carro]
    .filter(Boolean)
    .join(" ");

  const detalleRows = Object.entries(data.detalles || {})
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => row(k, escapeHtml(String(v))))
    .join("");

  const tel = escapeHtml(data.telefono);
  const waMsg = `Hola ${data.nombre.split(" ")[0] || ""}, te escribo de VanTrust por tu solicitud de ${tipoLabel}`;

  return wrapper(`
    ${header(tipoLabel)}

    <tr>
      <td style="padding: 28px 28px 0;">
        <h1 style="margin: 0; font-family: ${FONT}; color: ${INK}; font-size: 23px; font-weight: 700; line-height: 1.25;">${escapeHtml(data.nombre)}</h1>
        <p style="margin: 5px 0 0; font-family: ${FONT}; color: ${MUTED}; font-size: 13px;">
          ${data.ciudad ? escapeHtml(data.ciudad) + " · " : ""}${escapeHtml(fecha)}
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding: 18px 28px 0;">
        ${boton(`tel:${tel}`, "Llamar ahora", NAVY, "#ffffff")}
        &nbsp;
        ${boton(`https://wa.me/57${data.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`, "WhatsApp", "#16a34a", "#ffffff")}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 28px;">
        ${sectionTitle("Contacto")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row("Teléfono", `<a href="tel:${tel}" style="color: ${INK}; text-decoration: none; font-weight: 600;">${tel}</a>`)}
          ${row(
            "Correo",
            data.email
              ? `<a href="mailto:${escapeHtml(data.email)}" style="color: ${INK};">${escapeHtml(data.email)}</a>`
              : `<span style="color: ${MUTED};">No especificado</span>`
          )}
          ${row("Ciudad", escapeHtml(data.ciudad) || `<span style="color: ${MUTED};">No especificada</span>`)}
          ${row("Tipo de seguro", escapeHtml(tipoLabel), true)}
        </table>

        ${
          detalleRows || vehiculo || data.placa || data.uso_diario
            ? `${sectionTitle("Detalles de la solicitud")}
               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                 ${data.placa ? row("Placa", `<span style="font-family: monospace; letter-spacing: 2px; font-weight: 600;">${escapeHtml(data.placa)}</span>`) : ""}
                 ${vehiculo ? row("Vehículo", `<strong>${escapeHtml(vehiculo)}</strong>`) : ""}
                 ${data.uso_diario ? row("Uso diario", escapeHtml(data.uso_diario)) : ""}
                 ${detalleRows}
               </table>`
            : ""
        }

        ${
          data.mensaje
            ? `${sectionTitle("Mensaje del cliente")}
               <p style="margin: 8px 0 0; padding: 14px 16px; background: #f7f8fa; border-left: 3px solid ${GOLD}; border-radius: 0 8px 8px 0; font-family: ${FONT}; color: ${INK}; font-size: 14px; line-height: 1.6;">${escapeHtml(data.mensaje)}</p>`
            : ""
        }
      </td>
    </tr>

    <tr>
      <td style="padding: 24px 28px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px;">
          <tr>
            <td style="padding: 14px 16px;">
              <p style="margin: 0; font-family: ${FONT}; color: #166534; font-size: 13px; font-weight: 700;">Contactar en el horario preferido</p>
              <p style="margin: 3px 0 0; font-family: ${FONT}; color: #15803d; font-size: 13px;">${escapeHtml(horarioLabel)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${footer(data.fuente ? `Origen: ${escapeHtml(data.fuente)}` : undefined)}
  `);
}

/** Correo de confirmación que recibe el cliente. */
export function confirmationEmailHtml(
  nombre: string,
  tipoLabel: string
): string {
  const firstName = (nombre || "").trim().split(" ")[0] || "";

  return wrapper(`
    ${header(undefined, true)}

    <tr>
      <td style="padding: 32px 30px 0;">
        <h1 style="margin: 0; font-family: ${FONT}; color: ${NAVY}; font-size: 22px; font-weight: 700; line-height: 1.3;">
          ¡Gracias por confiar en VanTrust${firstName ? `, ${escapeHtml(firstName)}` : ""}!
        </h1>
        <p style="margin: 14px 0 0; font-family: ${FONT}; color: ${INK}; font-size: 15px; line-height: 1.65;">
          Recibimos tu solicitud de cotización de <strong>${escapeHtml(tipoLabel)}</strong>.
          Un asesor la está revisando y te contactará con opciones reales de nuestras
          aseguradoras aliadas.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding: 22px 30px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background: #f7f8fa; border: 1px solid ${LINE}; border-radius: 10px;">
          <tr>
            <td style="padding: 16px 18px;">
              <p style="margin: 0; font-family: ${FONT}; color: ${MUTED}; font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;">Tiempo de respuesta</p>
              <p style="margin: 5px 0 0; font-family: ${FONT}; color: ${NAVY}; font-size: 16px; font-weight: 700;">Aproximadamente ${SITE.responseTime} hábil</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 24px 30px 4px;">
        <p style="margin: 0 0 14px; font-family: ${FONT}; color: ${MUTED}; font-size: 14px; line-height: 1.6;">
          ¿Prefieres hablar ahora? Escríbenos y te atendemos de una vez.
        </p>
        ${boton(waLink({ mensaje: "Hola, acabo de enviar una solicitud de cotización en la web" }), "Escribir por WhatsApp", "#16a34a", "#ffffff")}
      </td>
    </tr>

    <tr>
      <td style="padding: 26px 30px 30px;">
        <p style="margin: 0; font-family: ${FONT}; color: #9aa2b1; font-size: 12px; line-height: 1.6;">
          Cotizar no tiene costo ni te compromete a nada. Si no solicitaste esta
          cotización, puedes ignorar este mensaje.
        </p>
      </td>
    </tr>

    ${footer()}
  `);
}
