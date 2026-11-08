import "server-only";

// Envío al grupo de asesores. Telegram corta en 4096 caracteres: los mensajes
// largos (el resumen diario de renovaciones) se parten por líneas.

const LIMITE = 4000;

export function telegramConfigurado(): boolean {
  return !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Envía HTML de Telegram. Lanza si Telegram responde con error. */
export async function enviarTelegram(html: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram not configured, skipping");
    return;
  }

  const partes: string[] = [];
  let actual = "";
  for (const linea of html.split("\n")) {
    if (actual && actual.length + linea.length + 1 > LIMITE) {
      partes.push(actual);
      actual = "";
    }
    actual = actual ? `${actual}\n${linea}` : linea;
  }
  if (actual) partes.push(actual);

  for (const text of partes) {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const detalle = await res.text().catch(() => "");
      throw new Error(`Telegram respondió ${res.status}: ${detalle.slice(0, 300)}`);
    }
  }
}
