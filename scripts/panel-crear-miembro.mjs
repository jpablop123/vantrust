#!/usr/bin/env node
// Crea un miembro del equipo del panel: la cuenta en Supabase Auth con una
// contraseña temporal y su fila en la tabla `asesores` (que define el rol).
//
// Uso:
//   node --env-file=.env.local scripts/panel-crear-miembro.mjs <correo> "<Nombre>" [admin|asesor]
//
// La contraseña temporal se muestra UNA vez y no se guarda en ningún lado. La
// persona la cambia desde "Olvidé mi contraseña" o se la cambia el admin.

import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const [correo, nombre, rol = "asesor"] = process.argv.slice(2);
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!correo || !nombre || !["admin", "asesor"].includes(rol)) {
  console.error('Uso: node --env-file=.env.local scripts/panel-crear-miembro.mjs <correo> "<Nombre>" [admin|asesor]');
  process.exit(1);
}
if (!url || !key) {
  console.error("Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (cárgalas con --env-file=.env.local).");
  process.exit(1);
}

const email = correo.trim().toLowerCase();
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

// 16 caracteres legibles, sin 0/O ni 1/l para dictarla sin errores.
const alfabeto = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const temporal = [...randomBytes(16)].map((b) => alfabeto[b % alfabeto.length]).join("");

const { data: creado, error: errAuth } = await db.auth.admin.createUser({
  email,
  password: temporal,
  email_confirm: true,
});
if (errAuth && !/already|registered|exists/i.test(errAuth.message)) {
  console.error("No se pudo crear la cuenta:", errAuth.message);
  process.exit(1);
}

const { error: errFila } = await db
  .from("asesores")
  .upsert({ email, nombre: nombre.trim(), rol }, { onConflict: "email" });
if (errFila) {
  console.error("La cuenta existe pero no se pudo registrar en el equipo:", errFila.message);
  process.exit(1);
}

console.log(`Listo: ${nombre} <${email}> como ${rol}.`);
if (creado?.user) {
  console.log(`Contraseña temporal (se muestra solo esta vez): ${temporal}`);
} else {
  console.log("La cuenta ya existía: se conservó su contraseña.");
}
