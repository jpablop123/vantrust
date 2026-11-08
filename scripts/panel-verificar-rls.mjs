#!/usr/bin/env node
// Verifica que la API pública de Supabase no expone los datos del panel.
// Solo usa la anon key (que no es secreta): se puede correr contra producción
// sin tocar la service role.
//
// Uso:
//   SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/panel-verificar-rls.mjs
//   (opcional) PRUEBA_EMAIL=... PRUEBA_CLAVE=...  -> repite la prueba con la
//   sesión de un asesor real, como si se saltara el panel.

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;
if (!url || !anonKey) {
  console.error("Faltan SUPABASE_URL y SUPABASE_ANON_KEY.");
  process.exit(1);
}

const TABLAS = ["leads", "renovaciones", "asesores", "panel_accesos", "lead_eventos"];
let fallas = 0;

async function probar(nombre, cliente) {
  console.log(`\n== ${nombre}`);
  for (const t of TABLAS) {
    const r = await cliente.from(t).select("*").limit(1);
    const expuesto = !r.error && (r.data ?? []).length > 0;
    if (expuesto) fallas++;
    console.log(`  leer ${t.padEnd(14)} ${expuesto ? "EXPUESTO ✗" : "bloqueado ✓"}`);
  }
  const ins = await cliente.from("leads").insert({ nombre: "rls", telefono: "3000000000", tipo_seguro: "otro" }).select();
  const insOk = !ins.error && (ins.data ?? []).length > 0;
  if (insOk) fallas++;
  console.log(`  insertar lead       ${insOk ? "PERMITIDO ✗" : "bloqueado ✓"}`);
  const upd = await cliente.from("asesores").update({ rol: "admin" }).neq("email", "").select();
  const updOk = !upd.error && (upd.data ?? []).length > 0;
  if (updOk) fallas++;
  console.log(`  volverse admin      ${updOk ? "PERMITIDO ✗" : "bloqueado ✓"}`);
  const rpc = await cliente.rpc("asignar_lead", { p_lead: "00000000-0000-0000-0000-000000000000" });
  if (!rpc.error) fallas++;
  console.log(`  ejecutar asignación ${rpc.error ? "bloqueado ✓" : "PERMITIDO ✗"}`);
}

const opciones = { auth: { persistSession: false, autoRefreshToken: false } };
await probar("anon key, sin sesión", createClient(url, anonKey, opciones));

if (process.env.PRUEBA_EMAIL && process.env.PRUEBA_CLAVE) {
  const conSesion = createClient(url, anonKey, opciones);
  const { error } = await conSesion.auth.signInWithPassword({
    email: process.env.PRUEBA_EMAIL,
    password: process.env.PRUEBA_CLAVE,
  });
  if (error) console.log(`\nNo se pudo entrar con ${process.env.PRUEBA_EMAIL}: ${error.message}`);
  else await probar(`sesión de ${process.env.PRUEBA_EMAIL} (sin pasar por el panel)`, conSesion);
}

console.log(fallas ? `\n✗ ${fallas} problemas` : "\n✓ La API pública no expone nada");
process.exit(fallas ? 1 : 0);
