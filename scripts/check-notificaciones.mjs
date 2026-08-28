#!/usr/bin/env node
/**
 * Comprueba que los canales de notificación de leads estén bien configurados.
 *
 *   node scripts/check-notificaciones.mjs           # solo diagnostica
 *   node scripts/check-notificaciones.mjs --enviar  # además manda un lead de prueba
 *
 * Lee .env.local. No imprime ninguna credencial completa.
 */

import { readFileSync } from "node:fs";

const ENVIAR = process.argv.includes("--enviar");

// ── .env.local ────────────────────────────────────────────────────────────
let env = {};
try {
  for (const linea of readFileSync(".env.local", "utf8").split("\n")) {
    const m = linea.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
} catch {
  console.log("No encontré .env.local en la raíz del proyecto.");
  console.log("Cópialo desde la plantilla:  cp .env.example .env.local\n");
  process.exit(1);
}

const oculto = (v) => (v ? `${v.slice(0, 6)}…${v.slice(-4)} (${v.length} car.)` : "");
const ok = (m) => console.log(`  ✅ ${m}`);
const no = (m) => console.log(`  ❌ ${m}`);
const info = (m) => console.log(`  ·  ${m}`);

let listos = 0;
let fallos = 0;

// ── Telegram ──────────────────────────────────────────────────────────────
console.log("\n── Telegram ──");
const tgToken = env.TELEGRAM_BOT_TOKEN;
const tgChat = env.TELEGRAM_CHAT_ID;

if (!tgToken) {
  no("Falta TELEGRAM_BOT_TOKEN. Créalo con @BotFather > /newbot");
} else {
  info(`Token: ${oculto(tgToken)}`);
  try {
    const r = await fetch(`https://api.telegram.org/bot${tgToken}/getMe`);
    const j = await r.json();
    if (!j.ok) {
      no(`Token rechazado por Telegram: ${j.description}`);
      fallos++;
    } else {
      ok(`Bot válido: @${j.result.username}`);

      if (!tgChat) {
        no("Falta TELEGRAM_CHAT_ID. Buscando chats donde ya esté el bot…");
        const u = await (
          await fetch(`https://api.telegram.org/bot${tgToken}/getUpdates`)
        ).json();
        const chats = new Map();
        for (const upd of u.result || []) {
          const c = upd.message?.chat || upd.my_chat_member?.chat;
          if (c) chats.set(c.id, c.title || c.first_name || c.type);
        }
        if (chats.size === 0) {
          info("Ninguno. Agrega el bot a un grupo, escribe un mensaje y reintenta.");
        } else {
          for (const [id, nombre] of chats) {
            info(`Encontrado -> TELEGRAM_CHAT_ID=${id}   (${nombre})`);
          }
        }
        fallos++;
      } else if (ENVIAR) {
        const r2 = await fetch(
          `https://api.telegram.org/bot${tgToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: tgChat,
              text: "✅ <b>Prueba de VanTrust</b>\nSi ves esto, los leads llegarán a este chat.",
              parse_mode: "HTML",
            }),
          }
        );
        const j2 = await r2.json();
        if (j2.ok) {
          ok(`Mensaje de prueba enviado al chat ${tgChat}`);
          listos++;
        } else {
          no(`Telegram rechazó el envío: ${j2.description}`);
          if (/chat not found/i.test(j2.description || ""))
            info("El bot no está en ese chat, o el grupo pasó a supergrupo y cambió el id.");
          fallos++;
        }
      } else {
        ok(`Chat id configurado: ${tgChat} (usa --enviar para probarlo de verdad)`);
        listos++;
      }
    }
  } catch (e) {
    no(`No pude contactar a Telegram: ${e.message}`);
    fallos++;
  }
}

// ── Resend ────────────────────────────────────────────────────────────────
console.log("\n── Resend (correo) ──");
const reKey = env.RESEND_API_KEY;
const reFrom = env.RESEND_FROM_EMAIL;
const comercial = env.COMMERCIAL_EMAIL;

if (!reKey) {
  no("Falta RESEND_API_KEY. Créala en https://resend.com > API Keys");
} else {
  info(`API key: ${oculto(reKey)}`);
  try {
    const r = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${reKey}` },
    });
    if ([400, 401, 403].includes(r.status)) {
      no("La API key no es válida (mal copiada, revocada o aún es el placeholder)");
      info("Debe empezar por 're_' y copiarse completa desde Resend > API Keys");
      fallos++;
    } else if (!r.ok) {
      no(`Resend respondió ${r.status}`);
      fallos++;
    } else {
      const j = await r.json();
      const dominios = j.data || [];
      ok("API key válida");
      const verificados = dominios.filter((d) => d.status === "verified");
      if (verificados.length === 0) {
        no("No hay ningún dominio verificado");
        info("Solo podrás enviar desde onboarding@resend.dev, y ESE remitente");
        info("únicamente entrega al correo dueño de la cuenta: el correo de");
        info("confirmación al CLIENTE fallará en todos los casos reales.");
        info("Verifica vantrust.com.co en Resend > Domains.");
        fallos++;
      } else {
        ok(`Dominios verificados: ${verificados.map((d) => d.name).join(", ")}`);
        const dom = (reFrom || "").match(/@([^>\s]+)/)?.[1];
        if (dom && !verificados.some((d) => d.name === dom)) {
          no(`RESEND_FROM_EMAIL usa @${dom}, que no está verificado`);
          fallos++;
        } else {
          listos++;
        }
      }
    }
  } catch (e) {
    no(`No pude contactar a Resend: ${e.message}`);
    fallos++;
  }
}
info(`Remitente: ${reFrom || "(sin definir, usará onboarding@resend.dev)"}`);
info(`Leads llegan a: ${comercial || "(sin definir, usará coordinador@vantrust.com.co)"}`);

// ── Google Sheets ─────────────────────────────────────────────────────────
console.log("\n── Google Sheets (opcional) ──");
if (!env.GOOGLE_SHEET_ID || !env.GOOGLE_SHEETS_API_KEY) {
  info("Sin configurar. Es opcional: se salta sin romper nada.");
} else {
  info("⚠️  Ojo: este método exige que la hoja sea editable por cualquiera con");
  info("    el enlace. Ahí van nombres, cédulas, teléfonos y valores asegurados.");
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}?key=${env.GOOGLE_SHEETS_API_KEY}`
  );
  if (r.ok) {
    const j = await r.json();
    const hojas = (j.sheets || []).map((s) => s.properties.title);
    if (hojas.includes("Leads")) ok(`Hoja "Leads" encontrada en "${j.properties.title}"`);
    else no(`Falta una pestaña llamada "Leads". Hay: ${hojas.join(", ")}`);
  } else {
    no(`Google respondió ${r.status}: revisa el ID, la API key y los permisos`);
    fallos++;
  }
}

// ── WhatsApp ──────────────────────────────────────────────────────────────
console.log("\n── WhatsApp Business (opcional) ──");
if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_PHONE_ID) {
  info("Sin configurar. Con Telegram andando, es redundante.");
} else {
  info("Configurado. Recuerda que la API de Meta solo permite texto libre si el");
  info("destinatario escribió en las últimas 24h; si no, exige una plantilla aprobada.");
}

// ── Resumen ───────────────────────────────────────────────────────────────
console.log("\n────────────────────────────────");
if (listos === 0) {
  console.log("⚠️  NINGÚN canal está operativo: los leads se pierden en silencio.");
  process.exitCode = 1;
} else {
  console.log(`${listos} canal(es) operativo(s), ${fallos} con problemas.`);
}
console.log("Recuerda que estas variables también deben existir en Vercel:");
console.log("  vercel env add NOMBRE production   →   luego  vercel --prod\n");
