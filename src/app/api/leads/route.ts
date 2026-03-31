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
  vehiculo: "Seguro Vehicular",
  salud: "Seguro de Salud",
  vivienda: "Seguro de Vivienda",
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
}

async function sendEmail(data: LeadData) {
  const resend = getResend();
  const commercialEmail = process.env.COMMERCIAL_EMAIL;
  if (!resend || !commercialEmail) {
    console.warn("Email not configured, skipping");
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

async function saveToGoogleSheets(data: LeadData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn("Google Sheets not configured, skipping");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Leads!A:N:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  const tipoLabel = INSURANCE_LABELS[data.tipoSeguro] || data.tipoSeguro;
  const horarioLabel = HORARIO_LABELS[data.horario] || data.horario || "";
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      values: [[fecha, data.nombre, data.email, data.telefono, data.ciudad, tipoLabel, data.placa, horarioLabel, data.mensaje, data.marca_carro || "", data.modelo_carro || "", data.anno_carro || "", data.uso_diario || "", data.fuente || ""]],
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
    ]);

    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const names = ["Email", "Google Sheets", "WhatsApp"];
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
