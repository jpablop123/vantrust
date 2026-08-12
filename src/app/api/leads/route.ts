import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

// Anti-spam: track recent submissions by phone number
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

// Clean up old entries periodically to prevent memory leak
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > RATE_LIMIT_MS) {
      recentSubmissions.delete(key);
    }
  }
}

const INSURANCE_LABELS: Record<string, string> = {
  vehiculo: "Seguro de Automóvil",
  salud: "Seguro de Salud",
  hogar: "Seguro de Hogar",
  vivienda: "Seguro de Hogar",
  vida: "Seguro de Vida",
  accidentes: "Accidentes Personales",
  exequial: "Seguro Exequial",
  viajes: "Seguro de Viajes",
  mascotas: "Seguro de Mascotas",
  otro: "Otro / No está seguro",
};

const HORARIO_LABELS: Record<string, string> = {
  manana: "Mañana (8am - 12pm)",
  tarde: "Tarde (12pm - 5pm)",
  noche: "Noche (5pm - 8pm)",
  cualquiera: "Cualquier horario",
};

interface LeadData {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipoSeguro: string;
  horario: string;
  placa: string;
  mensaje: string;
  marca_carro?: string;
  modelo_carro?: string;
  anno_carro?: string;
  uso_diario?: string;
  fuente?: string;
  // Campos específicos por ramo (salud, hogar, vida, etc.) como pares clave-valor
  detalles?: Record<string, string>;
}

function renderDetalleRows(detalles?: Record<string, string>): string {
  if (!detalles) return "";
  return Object.entries(detalles)
    .filter(([, v]) => v && String(v).trim())
    .map(
      ([k, v]) => `
      <tr style="border-top: 1px solid #f3f4f6;">
        <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">${k}</td>
        <td style="padding: 10px 0; color: #0A1628; font-size: 14px;">${v}</td>
      </tr>`
    )
    .join("");
}

async function sendEmail(data: LeadData) {
  const resend = getResend();
  const commercialEmail =
    process.env.COMMERCIAL_EMAIL || "coordinador@vantrust.com.co";
  if (!resend) {
    console.warn("Email not configured (missing RESEND_API_KEY), skipping");
    return;
  }

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "No especificado";
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: commercialEmail,
    subject: `Nuevo Lead - ${tipoLabel} | ${data.nombre}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0A1628 0%, #162240 100%); padding: 28px 24px;">
          <table style="width: 100%;">
            <tr>
              <td>
                <h1 style="color: #C9A84C; margin: 0; font-size: 22px; font-weight: 700;">VanTrust</h1>
                <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">Nuevo lead recibido</p>
              </td>
              <td style="text-align: right;">
                <span style="background: #C9A84C; color: #0A1628; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">${tipoLabel}</span>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding: 28px 24px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 150px; vertical-align: top;">Nombre</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0A1628; font-size: 14px;">${data.nombre}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px;"><a href="mailto:${data.email}" style="color: #0A1628;">${data.email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Teléfono</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px;"><a href="tel:${data.telefono}" style="color: #0A1628;">${data.telefono}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Ciudad</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px;">${data.ciudad || "No especificada"}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Tipo de seguro</td>
              <td style="padding: 10px 0; font-weight: 600; color: #C9A84C; font-size: 14px;">${tipoLabel}</td>
            </tr>
            ${data.placa ? `
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Placa</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0A1628; font-size: 14px; font-family: monospace; letter-spacing: 2px;">${data.placa}</td>
            </tr>
            ` : ""}
            ${data.marca_carro ? `
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Vehículo</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0A1628; font-size: 14px;">${data.marca_carro}${data.modelo_carro ? ` ${data.modelo_carro}` : ""}</td>
            </tr>
            ` : ""}
            ${data.anno_carro ? `
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Año del vehículo</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0A1628; font-size: 14px;">${data.anno_carro}</td>
            </tr>
            ` : ""}
            ${data.uso_diario ? `
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Uso diario</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px;">${data.uso_diario}</td>
            </tr>
            ` : ""}
            ${renderDetalleRows(data.detalles)}
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Horario preferido</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px;">${horarioLabel}</td>
            </tr>
            ${data.mensaje ? `
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; color: #0A1628; font-size: 14px; line-height: 1.5;">${data.mensaje}</td>
            </tr>
            ` : ""}
          </table>

          <div style="margin-top: 20px; padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
            <p style="margin: 0; color: #166534; font-size: 13px; font-weight: 600;">Acción requerida</p>
            <p style="margin: 4px 0 0; color: #166534; font-size: 12px;">Contactar al cliente en el horario: ${horarioLabel}</p>
          </div>
        </div>
        <div style="padding: 16px 24px; background: #f8f9fb; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 11px; margin: 0; text-align: center;">
            Recibido el ${fecha} | VanTrust - Agencia de Seguros
          </p>
        </div>
      </div>
    `,
  });
}

async function sendConfirmationToCustomer(data: LeadData) {
  const resend = getResend();
  if (!resend || !data.email) return;

  const waHref = `https://wa.me/573106083637?text=${encodeURIComponent(
    "Hola, acabo de enviar una solicitud de cotización en la web"
  )}`;
  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || "seguro";
  const firstName = (data.nombre || "").trim().split(" ")[0] || "";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "VanTrust <onboarding@resend.dev>",
    to: data.email,
    subject: "¡Gracias por confiar en VanTrust! Recibimos tu solicitud",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #002C55 0%, #003F7A 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #BFA15C; margin: 0; font-size: 24px; font-weight: 700;">VanTrust</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">Soluciones seguras para proteger lo que más valoras</p>
        </div>
        <div style="padding: 32px 28px; background: #ffffff; color: #1f2937;">
          <h2 style="color: #002C55; font-size: 20px; margin: 0 0 12px;">¡Gracias por confiar en VanTrust${firstName ? `, ${firstName}` : ""}!</h2>
          <p style="font-size: 15px; line-height: 1.6; margin: 0 0 8px;">Hemos recibido tu solicitud de cotización de <strong>${tipoLabel}</strong>.</p>
          <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px;">Uno de nuestros asesores se comunicará contigo en un plazo aproximado de <strong>1 hora hábil</strong>.</p>
          <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0 0 20px;">Mientras tanto, puedes escribirnos directamente por WhatsApp:</p>
          <div style="text-align: center; margin: 0 0 8px;">
            <a href="${waHref}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 999px;">Escribir por WhatsApp</a>
          </div>
        </div>
        <div style="padding: 16px 24px; background: #f8f9fb; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 11px; margin: 0; text-align: center;">Vantrust Agencia de Seguros LTDA. · +57 310 608 3637 · coordinador@vantrust.com.co</p>
        </div>
      </div>
    `,
  });
}

async function saveToGoogleSheets(data: LeadData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn("Google Sheets not configured, skipping");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Leads!A:O:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "";
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
  const detallesStr = data.detalles
    ? Object.entries(data.detalles)
        .filter(([, v]) => v && String(v).trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
    : "";

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      values: [[fecha, data.nombre, data.email, data.telefono, data.ciudad, tipoLabel, data.placa, horarioLabel, data.mensaje, data.marca_carro || "", data.modelo_carro || "", data.anno_carro || "", data.uso_diario || "", data.fuente || "", detallesStr]],
    }),
  });
}

async function sendWhatsAppNotification(data: LeadData) {
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const token = process.env.WHATSAPP_TOKEN;
  const commercialPhone = process.env.WHATSAPP_COMMERCIAL_PHONE;

  if (!phoneId || !token || !commercialPhone) {
    console.warn("WhatsApp not configured, skipping");
    return;
  }

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || "No especificado";
  const vehiculo = [data.marca_carro, data.modelo_carro, data.anno_carro].filter(Boolean).join(" ");
  const message = `*Nuevo Lead VanTrust*\n\n*${data.nombre}*\nEmail: ${data.email || "N/A"}\nTel: ${data.telefono}\nCiudad: ${data.ciudad || "N/A"}\nSeguro: ${tipoLabel}${data.placa ? `\nPlaca: ${data.placa}` : ""}${vehiculo ? `\nVehículo: ${vehiculo}` : ""}${data.uso_diario ? `\nUso: ${data.uso_diario}` : ""}\nHorario: ${horarioLabel}\n${data.mensaje ? `Mensaje: ${data.mensaje}` : ""}${data.fuente ? `\nFuente: ${data.fuente}` : ""}`;

  await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: commercialPhone,
      type: "text",
      text: { body: message },
    }),
  });
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramNotification(data: LeadData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram not configured, skipping");
    return;
  }

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "No especificado";
  const vehiculo = [data.marca_carro, data.modelo_carro, data.anno_carro]
    .filter(Boolean)
    .join(" ");

  const detalleLines = data.detalles
    ? Object.entries(data.detalles)
        .filter(([, v]) => v && String(v).trim())
        .map(([k, v]) => `• ${escapeHtml(k)}: ${escapeHtml(String(v))}`)
        .join("\n")
    : "";

  const lines = [
    "🔔 <b>Nuevo Lead VanTrust</b>",
    "",
    `👤 <b>${escapeHtml(data.nombre)}</b>`,
    `📧 ${escapeHtml(data.email || "N/A")}`,
    `📱 ${escapeHtml(data.telefono)}`,
    data.ciudad ? `📍 ${escapeHtml(data.ciudad)}` : "",
    `🛡️ ${escapeHtml(tipoLabel)}`,
    data.placa ? `🚗 Placa: ${escapeHtml(data.placa)}` : "",
    vehiculo ? `🚙 Vehículo: ${escapeHtml(vehiculo)}` : "",
    data.uso_diario ? `📊 Uso: ${escapeHtml(data.uso_diario)}` : "",
    detalleLines,
    data.horario ? `🕒 Horario: ${escapeHtml(horarioLabel)}` : "",
    data.mensaje ? `💬 ${escapeHtml(data.mensaje)}` : "",
    data.fuente ? `🔗 Fuente: ${escapeHtml(data.fuente)}` : "",
  ].filter(Boolean);

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadData = await req.json();

    if (!data.nombre || !data.telefono || !data.tipoSeguro || !data.email) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Anti-spam check
    cleanupOldEntries();
    const phone = data.telefono.replace(/\D/g, "");
    const lastSubmission = recentSubmissions.get(phone);
    if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Ya tenemos tu solicitud, te contactamos pronto" },
        { status: 429 }
      );
    }
    recentSubmissions.set(phone, Date.now());

    const results = await Promise.allSettled([
      sendEmail(data),
      saveToGoogleSheets(data),
      sendWhatsAppNotification(data),
      sendTelegramNotification(data),
      sendConfirmationToCustomer(data),
    ]);

    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const names = [
          "Email",
          "Google Sheets",
          "WhatsApp",
          "Telegram",
          "Confirmación cliente",
        ];
        console.error(`${names[i]} failed:`, result.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
