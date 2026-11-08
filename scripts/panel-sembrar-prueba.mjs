#!/usr/bin/env node
// Carga leads de prueba realistas en la base LOCAL para ver el panel con vida.
// Se niega a correr contra una base que no sea local.
//
// Uso:  node --env-file=.env.local scripts/panel-sembrar-prueba.mjs
//       (borra todos los leads de la base local y siembra unos nuevos)

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(url)) {
  console.error("Solo se puede sembrar la base local (SUPABASE_URL de localhost). No se tocó nada.");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const ahora = Date.now();
const min = (m) => new Date(ahora - m * 60e3).toISOString();
const dia = 24 * 60;
/** 9:00 a. m. de Colombia, N días desde hoy (negativo = vencido). */
const nueveAm = (d) => {
  const b = new Date(ahora - 5 * 3600e3);
  return new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate() + d, 14)).toISOString();
};

// nombre, ramo, minutos atrás, fuente, campaña, avance, extras
const LEADS = [
  ["Valentina Ríos", "vehiculo", 3, "hero_placa", "meta-autos-nov", "nuevo", { placa: "KFR392" }],
  ["Andrés Felipe Mora", "salud", 9, "cotizador_salud", "google-salud", "nuevo", {}],
  ["Camila Herrera", "vehiculo", 38, "cta_whatsapp:/seguros/automoviles", "meta-autos-nov", "nuevo", { placa: "JXN58D" }],
  ["Distribuciones El Caribe SAS", "pyme", 95, "l_seguro-pyme", "google-pymes", "nuevo", { email: "compras@elcaribe.co" }],
  ["Sebastián Ortiz", "hogar", 3 * 60, "cotizador_hogar", "", "nuevo", {}],
  ["Laura Patricia Gómez", "vida", 2 * dia, "producto_vida", "organico", "nuevo", {}],
  ["Jorge Iván Castro", "vehiculo", 26 * 60, "cotizador_express", "meta-autos-nov", "contactado", { placa: "HTR105", resultado: "no_contesto", seg: 0 }],
  ["María José Vargas", "salud", 30 * 60, "asesoria_gratuita", "google-salud", "contactado", { resultado: "interesado", seg: -1, nota: "Quiere plan para ella y su mamá de 62 años." }],
  ["Constructora Atlántico Ltda", "cumplimiento", 2 * dia, "l_cumplimiento-licitaciones", "google-licitaciones", "contactado", { resultado: "interesado", seg: 0, nota: "Licitación de la Gobernación, cierra el viernes." }],
  ["Ricardo Peña", "vehiculo", 3 * dia, "hero_placa", "meta-autos-nov", "contactado", { placa: "BYK731", resultado: "lo_va_a_pensar", seg: 2 }],
  ["Daniela Suárez", "mascotas", 4 * dia, "producto_mascotas", "organico", "contactado", { resultado: "precio_alto", seg: 3 }],
  ["Óscar Lozano", "hogar", 5 * dia, "cotizador_hogar", "", "cotizado", { aseg: "Sura, Seguros Bolívar y Allianz", seg: 1, nota: "Le mandé las 3 opciones por WhatsApp." }],
  ["Inversiones Santa Marta SAS", "pyme", 6 * dia, "cta_whatsapp:/seguros", "google-pymes", "cotizado", { aseg: "AXA Colpatria y Sura", seg: -2 }],
  ["Paola Andrea Ruiz", "salud", 7 * dia, "asesoria_gratuita", "google-salud", "cotizado", { aseg: "Sura y Coomeva", seg: 4 }],
  ["Felipe Arango", "vehiculo", 8 * dia, "cotizador_express", "meta-autos-nov", "ganado", { placa: "DPL220", prima: 2350000, aseguradora: "Sura" }],
  ["Natalia Mejía", "vida", 9 * dia, "producto_vida", "organico", "ganado", { prima: 980000, aseguradora: "Seguros Bolívar" }],
  ["Transportes Costa Norte SAS", "transporte", 10 * dia, "l_transporte", "google-pymes", "ganado", { prima: 6800000, aseguradora: "HDI Seguros" }],
  ["Juliana Restrepo", "salud", 11 * dia, "cotizador_salud", "google-salud", "perdido", { motivo: "precio" }],
  ["Hernán Duarte", "vehiculo", 12 * dia, "hero_placa", "meta-autos-nov", "perdido", { placa: "QWE118", motivo: "ya_tiene" }],
  ["Carolina Pardo", "exequial", 13 * dia, "producto_exequial", "organico", "perdido", { motivo: "no_contesta" }],
  ["Mateo Salazar", "viajes", 15, "producto_viajes", "", "nuevo", {}],
  ["Alejandra Torres", "vehiculo", 6 * 60, "cotizador_express", "meta-autos-nov", "nuevo", { placa: "MNO902" }],
];

// Más leads generados en los últimos 30 días, para ver paginación y métricas.
// Pseudoaleatorio con semilla fija: siempre siembra lo mismo.
let semilla = 7;
const azar = () => ((semilla = (semilla * 16807) % 2147483647) / 2147483647);
const elegir = (arr) => arr[Math.floor(azar() * arr.length)];
const NOMBRES = ["Santiago", "Isabella", "Juan David", "Mariana", "Nicolás", "Sofía", "Samuel", "Gabriela", "Tomás", "Luciana", "Martín", "Manuela", "Emilio", "Antonella", "Diego", "Valeria"];
const APELLIDOS = ["García", "Martínez", "Rodríguez", "López", "Hernández", "Pérez", "Jiménez", "Romero", "Cárdenas", "Navarro", "Polo", "De la Hoz", "Barrios", "Charris"];
const RAMOS = ["vehiculo", "vehiculo", "vehiculo", "salud", "salud", "hogar", "vida", "pyme", "mascotas", "viajes"];
const ORIGENES = [
  { fuente: "hero_placa", campana: "meta-autos-nov", src: "facebook" },
  { fuente: "cotizador_express", campana: "meta-autos-nov", src: "facebook", fbclid: true },
  { fuente: "l_seguro-auto", campana: "google-autos", src: "google", gclid: true },
  { fuente: "cotizador_salud", campana: "google-salud", src: "google", gclid: true },
  { fuente: "asesoria_gratuita", referrer: "https://www.google.com/" },
  { fuente: "producto_hogar", referrer: "https://www.google.com/" },
  { fuente: "cta_whatsapp:/seguros", referrer: "https://chatgpt.com/" },
  { fuente: "cotizador_hogar", referrer: "https://www.instagram.com/" },
  { fuente: "cta_llamada:/contacto" },
  { fuente: "producto_vida", referrer: "https://www.bing.com/" },
];
for (let i = 0; i < 60; i++) {
  const o = elegir(ORIGENES);
  const hace = Math.round(30 + azar() * 30 * dia);
  const viejo = hace > 2 * dia;
  const r = azar();
  const avance = !viejo ? (r < 0.6 ? "nuevo" : "contactado") : r < 0.15 ? "nuevo" : r < 0.45 ? "contactado" : r < 0.65 ? "cotizado" : r < 0.82 ? "ganado" : "perdido";
  LEADS.push([
    `${elegir(NOMBRES)} ${elegir(APELLIDOS)}`,
    elegir(RAMOS),
    hace,
    o.fuente,
    o.campana ?? "",
    avance,
    {
      origen: o,
      resultado: elegir(["interesado", "no_contesto", "lo_va_a_pensar"]),
      seg: Math.floor(azar() * 6) - 2,
      aseg: "Sura y Seguros Bolívar",
      prima: Math.round((600 + azar() * 4000) * 1000),
      aseguradora: elegir(["Sura", "Seguros Bolívar", "Allianz", "AXA Colpatria"]),
      motivo: elegir(["precio", "ya_tiene", "no_contesta"]),
      // Minutos hasta el primer contacto: casi siempre rápido, a veces no.
      demora: azar() < 0.7 ? 3 + Math.round(azar() * 40) : 60 + Math.round(azar() * 600),
    },
  ]);
}

// Lo que llena cada cotizador (mismas etiquetas que guarda la web).
const DETALLES = {
  vehiculo: (i) => [
    { Marca: "Mazda", Modelo: "CX-30", "Año": "2022", "Uso diario": "Particular" },
    { Marca: "Chevrolet", Modelo: "Onix", "Año": "2021" },
    { Marca: "Renault", Modelo: "Duster", "Año": "2019", "Uso diario": "Trabajo" },
  ][i % 3],
  salud: (i) => [{ Edad: "34", "¿Para cuántas personas?": "2" }, { Edad: "52" }][i % 2],
  hogar: () => ({ "Tipo de vivienda": "Apartamento", "Valor comercial": "$ 280.000.000" }),
  vida: () => ({ Edad: "41", "Suma asegurada": "$ 200.000.000" }),
  mascotas: (i) => [{ Mascota: "Perro", Edad: "3 años" }, { Mascota: "Gato", Edad: "1 año" }][i % 2],
  viajes: () => ({ Destino: "España", "Fechas": "15 dic – 10 ene" }),
  pyme: () => ({ Actividad: "Comercio", Empleados: "12" }),
  cumplimiento: () => ({ Contrato: "Licitación Gobernación", Valor: "$ 450.000.000" }),
};
const MENSAJES = {
  vehiculo: "Quiero todo riesgo, el actual se me vence este mes.",
  salud: "¿Cubre preexistencias?",
  viajes: "¿Incluye cobertura COVID?",
};

// Celulares colombianos de 10 dígitos (3xx xxx xxxx).
const tel = (i) => `3${15 + (i % 7)}${String(4000000 + i * 13579).slice(-7)}`;

// 1) Limpieza de la base local y nombres reales para los asesores de prueba
const { error: errBorrar } = await db.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
if (errBorrar) throw new Error(`No se pudieron borrar los leads anteriores: ${errBorrar.message}`);
await db.from("asesores").update({ nombre: "Laura Gómez" }).eq("email", "asesora.prueba@vantrust.test");
await db.from("asesores").update({ nombre: "Carlos Rueda" }).eq("email", "asesor2.prueba@vantrust.test");

const { data: equipo } = await db.from("asesores").select("id, nombre, rol, activo, acceso");
console.log("Asesores en la rotación:", equipo.filter((a) => a.rol === "asesor" && a.activo && a.acceso).map((a) => a.nombre).join(", "));

// 2) Leads en orden de llegada, asignados por turnos como en la vida real
const ordenados = [...LEADS].sort((a, b) => b[2] - a[2]);
const sembrados = [];
let n = 0;
for (const [nombre, ramo, hace, fuente, campana, avance, x] of ordenados) {
  const creado = min(hace);
  const { data: lead, error } = await db
    .from("leads")
    .insert({
      nombre,
      telefono: tel(n++),
      tipo_seguro: ramo,
      fuente,
      utm_campaign: campana && campana !== "organico" ? campana : null,
      utm_source: x.origen ? x.origen.src ?? null : campana && campana !== "organico" ? (campana.startsWith("meta") ? "facebook" : "google") : null,
      utm_medium: (x.origen?.src ?? (campana && campana !== "organico")) ? "cpc" : null,
      gclid: x.origen?.gclid ? `demo-gclid-${n}` : null,
      fbclid: x.origen?.fbclid ? `demo-fbclid-${n}` : null,
      referrer: x.origen?.referrer ?? (campana === "organico" ? "https://www.google.com/" : null),
      placa: x.placa ?? null,
      email: x.email ?? null,
      detalles: DETALLES[ramo]?.(n) ?? {},
      mensaje: n % 3 === 1 ? MENSAJES[ramo] ?? "Lo necesito antes del viernes." : null,
      ciudad: "Barranquilla",
      estado: n % 3 ? "completo" : "parcial",
      autorizacion_datos: true,
      autorizacion_at: creado,
      created_at: creado,
      event_id: "demo-panel",
    })
    .select("id")
    .single();
  if (error) throw error;
  const { data: asesorId } = await db.rpc("asignar_lead", { p_lead: lead.id });
  sembrados.push({ id: lead.id, hace, creado, asesorId, avance, x });
}

// Las fechas se ajustan después de asignar todos: si se movieran antes, el
// turno vería otro "último asignado" y le daría todo al mismo asesor.
for (const { id: leadId, hace, creado, asesorId, avance, x } of sembrados) {
  const lead = { id: leadId };
  await db.from("lead_eventos").update({ created_at: creado }).eq("lead_id", lead.id).eq("tipo", "creado");
  const asignado = min(hace - 0.5);
  await db.from("leads").update({ asignado_at: asignado }).eq("id", lead.id);
  await db.from("lead_eventos").update({ created_at: asignado }).eq("lead_id", lead.id).eq("tipo", "asignado");

  // 3) Avance comercial con su historial
  if (avance === "nuevo") continue;
  const contacto = min(Math.max(hace - (x.demora ?? 25), 1));
  const ev = (tipo, cuando, detalle = {}, nota = null) =>
    db.from("lead_eventos").insert({ lead_id: lead.id, asesor_id: asesorId, tipo, created_at: cuando, detalle, nota });
  await ev("whatsapp", min(Math.max(hace - 20, 1)));
  const cambios = {
    etapa: avance,
    primer_contacto_at: contacto,
    ultimo_contacto_at: contacto,
    resultado_contacto: x.resultado ?? "interesado",
    proximo_seguimiento: x.seg !== undefined ? nueveAm(x.seg) : null,
    nota_seguimiento: x.nota ?? null,
  };
  await ev("contactado", contacto, { resultado: x.resultado ?? "interesado" }, x.nota ?? null);
  if (avance === "cotizado") await ev("cotizado", min(Math.max(hace - 60, 1)), { aseguradoras: x.aseg });
  if (avance === "ganado") {
    Object.assign(cambios, { prima_valor: x.prima, aseguradora_cierre: x.aseguradora, cerrado_at: min(hace - 2 * dia > 0 ? hace - 2 * dia : 5), proximo_seguimiento: null });
    await ev("ganado", cambios.cerrado_at, { prima: x.prima, aseguradora: x.aseguradora });
  }
  if (avance === "perdido") {
    Object.assign(cambios, { motivo_perdida: x.motivo, cerrado_at: min(hace - dia > 0 ? hace - dia : 5), proximo_seguimiento: null });
    await ev("perdido", cambios.cerrado_at, { motivo: x.motivo });
  }
  await db.from("leads").update(cambios).eq("id", lead.id);
}

const { data: resumen } = await db.from("leads").select("etapa, asesor:asesores!leads_asignado_a_fkey(nombre)");
const cuenta = {};
for (const l of resumen) {
  const k = `${l.asesor?.nombre ?? "Sin asignar"}`;
  cuenta[k] ??= {};
  cuenta[k][l.etapa] = (cuenta[k][l.etapa] ?? 0) + 1;
}
console.log(`Sembrados ${resumen.length} leads:`);
for (const [a, e] of Object.entries(cuenta)) console.log(`  ${a}: ${Object.entries(e).map(([k, v]) => `${v} ${k}`).join(", ")}`);
