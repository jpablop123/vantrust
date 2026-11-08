"use server";

import { randomBytes } from "node:crypto";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { enviarTelegram } from "@/lib/telegram";
import { miembroActual, type Miembro } from "@/lib/panel/sesion";
import { avisarAsesor } from "@/lib/panel/asignacion";

export type EstadoAdmin = { ok?: string; error?: string; clave?: string } | undefined;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ABIERTAS = ["nuevo", "contactado", "cotizado"];

/** Toda acción de esta página exige rol admin, verificado aquí y no en la interfaz. */
async function admin(): Promise<{ yo: Miembro; db: NonNullable<ReturnType<typeof getSupabase>> } | { error: string }> {
  const r = await miembroActual();
  if (!r.ok) return { error: "Tu sesión venció. Vuelve a entrar." };
  if (r.miembro.rol !== "admin") return { error: "Solo el administrador puede hacer esto." };
  const db = getSupabase();
  if (!db) return { error: "El panel no está conectado a la base de datos." };
  return { yo: r.miembro, db };
}

/** 16 caracteres legibles (sin 0/O ni 1/l), para dictarla sin errores. */
function claveTemporal() {
  const alfabeto = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return [...randomBytes(16)].map((b) => alfabeto[b % alfabeto.length]).join("");
}

/** Asesor que puede recibir leads: rol asesor y con acceso. */
async function asesorValido(db: NonNullable<ReturnType<typeof getSupabase>>, id: string) {
  if (!UUID.test(id)) return null;
  const { data } = await db.from("asesores").select("id, nombre, rol, acceso").eq("id", id).maybeSingle();
  return data && data.rol === "asesor" && data.acceso ? data : null;
}

// ── Reasignar ──────────────────────────────────────────────────────────────

export async function reasignarLead(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const leadId = String(form.get("leadId") || "");
  const destino = await asesorValido(a.db, String(form.get("asesorId") || ""));
  if (!destino) return { error: "Elige un asesor con acceso al panel." };
  if (!UUID.test(leadId)) return { error: "Lead no válido." };

  const { data: lead } = await a.db.from("leads").select("id, asignado_a").eq("id", leadId).maybeSingle();
  if (!lead) return { error: "No encontramos ese lead." };
  if (lead.asignado_a === destino.id) return { ok: "Ya era de ese asesor." };

  const { error } = await a.db
    .from("leads")
    .update({ asignado_a: destino.id, asignado_at: new Date().toISOString() })
    .eq("id", leadId);
  if (error) return { error: "No se pudo reasignar. Intenta de nuevo." };
  await a.db.from("lead_eventos").insert({
    lead_id: leadId,
    asesor_id: a.yo.id,
    tipo: "reasignado",
    detalle: { de: lead.asignado_a, a: destino.id, a_nombre: destino.nombre },
  });
  after(() => avisarAsesor(leadId, destino.id, true).catch(() => {}));
  revalidatePath("/panel");
  return { ok: `Reasignado a ${destino.nombre}.` };
}

/**
 * Mueve todos los leads abiertos de un asesor a otro, o los reparte por
 * turnos entre los demás asesores activos (para vacaciones o salidas).
 */
export async function reasignarMasivo(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const de = String(form.get("de") || "");
  const hacia = String(form.get("a") || "");
  if (!UUID.test(de)) return { error: "Elige de quién se mueven los leads." };
  if (hacia === de) return { error: "Elige un asesor distinto." };

  let destinos: { id: string; nombre: string }[];
  if (hacia === "repartir") {
    const { data } = await a.db
      .from("asesores")
      .select("id, nombre")
      .eq("rol", "asesor")
      .eq("activo", true)
      .eq("acceso", true)
      .neq("id", de)
      .order("created_at");
    destinos = data ?? [];
    if (!destinos.length) return { error: "No hay otros asesores activos para repartir." };
  } else {
    const d = await asesorValido(a.db, hacia);
    if (!d) return { error: "Elige un asesor con acceso al panel." };
    destinos = [d];
  }

  const { data: leads } = await a.db
    .from("leads")
    .select("id")
    .eq("asignado_a", de)
    .in("etapa", ABIERTAS)
    .order("created_at")
    .limit(2000);
  if (!leads?.length) return { ok: "Ese asesor no tiene leads abiertos." };

  const ahora = new Date().toISOString();
  const porDestino: Record<string, number> = {};
  for (const [i, l] of leads.entries()) {
    const d = destinos[i % destinos.length];
    await a.db.from("leads").update({ asignado_a: d.id, asignado_at: ahora }).eq("id", l.id);
    await a.db.from("lead_eventos").insert({
      lead_id: l.id,
      asesor_id: a.yo.id,
      tipo: "reasignado",
      detalle: { de, a: d.id, a_nombre: d.nombre, masivo: true },
    });
    porDestino[d.id] = (porDestino[d.id] ?? 0) + 1;
  }

  // Un solo aviso por asesor, no uno por lead.
  after(async () => {
    const { data } = await a.db.from("asesores").select("id, telegram_chat_id").in("id", Object.keys(porDestino));
    for (const m of data ?? []) {
      if (m.telegram_chat_id)
        await enviarTelegram(`🔁 <b>Te pasaron ${porDestino[m.id]} leads</b>\nRevísalos en tu cola del panel.`, m.telegram_chat_id).catch(() => {});
    }
  });
  revalidatePath("/panel");
  revalidatePath("/panel/equipo");
  return { ok: `Movidos ${leads.length} leads.` };
}

// ── Equipo ─────────────────────────────────────────────────────────────────

/** Siempre debe quedar al menos un admin con acceso. */
async function quedariaAdmin(db: NonNullable<ReturnType<typeof getSupabase>>, sinId: string) {
  const { count } = await db
    .from("asesores")
    .select("id", { count: "exact", head: true })
    .eq("rol", "admin")
    .eq("acceso", true)
    .neq("id", sinId);
  return (count ?? 0) > 0;
}

export async function crearMiembro(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const email = String(form.get("email") || "").trim().toLowerCase();
  const nombre = String(form.get("nombre") || "").trim().replace(/\s+/g, " ").slice(0, 80);
  const rol = form.get("rol") === "admin" ? "admin" : "asesor";
  const telegram = String(form.get("telegram") || "").trim().slice(0, 40) || null;
  if (!EMAIL.test(email)) return { error: "Escribe un correo válido." };
  if (nombre.length < 3) return { error: "Escribe el nombre completo." };

  const { data: existe } = await a.db.from("asesores").select("id").eq("email", email).maybeSingle();
  if (existe) return { error: "Ese correo ya está en el equipo." };

  const clave = claveTemporal();
  const { data: creado, error: errAuth } = await a.db.auth.admin.createUser({
    email,
    password: clave,
    email_confirm: true,
  });
  const yaTeniaCuenta = errAuth && /already|registered|exists/i.test(errAuth.message);
  if (errAuth && !yaTeniaCuenta) return { error: "No se pudo crear la cuenta." };

  const { error } = await a.db.from("asesores").insert({ email, nombre, rol, telegram_chat_id: telegram });
  if (error) {
    if (creado?.user) await a.db.auth.admin.deleteUser(creado.user.id);
    return { error: "No se pudo registrar en el equipo." };
  }
  revalidatePath("/panel/equipo");
  return yaTeniaCuenta
    ? { ok: `${nombre} ya tenía cuenta: entra con su contraseña de siempre.` }
    : { ok: `${nombre} quedó en el equipo. Pásale esta contraseña temporal:`, clave };
}

export async function actualizarMiembro(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const id = String(form.get("id") || "");
  if (!UUID.test(id)) return { error: "Miembro no válido." };
  const nombre = String(form.get("nombre") || "").trim().replace(/\s+/g, " ").slice(0, 80);
  const rol = form.get("rol") === "admin" ? "admin" : "asesor";
  const telegram = String(form.get("telegram") || "").trim().slice(0, 40) || null;
  if (nombre.length < 3) return { error: "Escribe el nombre completo." };
  if (rol === "asesor") {
    if (id === a.yo.id) return { error: "No puedes quitarte el rol de admin a ti mismo." };
    if (!(await quedariaAdmin(a.db, id))) return { error: "Debe quedar al menos un admin." };
  }
  const { error } = await a.db.from("asesores").update({ nombre, rol, telegram_chat_id: telegram }).eq("id", id);
  if (error) return { error: "No se pudo guardar." };
  revalidatePath("/panel/equipo");
  return { ok: "Guardado." };
}

/** Activa o desactiva la rotación ("activo") o la entrada al panel ("acceso"). */
export async function alternarMiembro(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const id = String(form.get("id") || "");
  const campo = form.get("campo") === "acceso" ? "acceso" : "activo";
  if (!UUID.test(id)) return { error: "Miembro no válido." };
  const { data: m } = await a.db.from("asesores").select("activo, acceso, rol").eq("id", id).maybeSingle();
  if (!m) return { error: "Miembro no válido." };
  const nuevo = !m[campo];
  if (campo === "acceso" && !nuevo) {
    if (id === a.yo.id) return { error: "No puedes quitarte el acceso a ti mismo." };
    if (m.rol === "admin" && !(await quedariaAdmin(a.db, id))) return { error: "Debe quedar al menos un admin." };
  }
  const { error } = await a.db.from("asesores").update({ [campo]: nuevo }).eq("id", id);
  if (error) return { error: "No se pudo guardar." };
  revalidatePath("/panel/equipo");
  return { ok: "Guardado." };
}

/** Nueva contraseña temporal para un miembro (se muestra una sola vez). */
export async function nuevaClaveTemporal(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const id = String(form.get("id") || "");
  if (!UUID.test(id)) return { error: "Miembro no válido." };
  const { data: m } = await a.db.from("asesores").select("email, nombre").eq("id", id).maybeSingle();
  if (!m) return { error: "Miembro no válido." };

  // La API de admin no busca por correo: se recorre la lista de cuentas.
  let userId: string | null = null;
  for (let page = 1; page <= 20 && !userId; page++) {
    const { data } = await a.db.auth.admin.listUsers({ page, perPage: 200 });
    userId = data?.users.find((u) => u.email?.toLowerCase() === m.email)?.id ?? null;
    if (!data || data.users.length < 200) break;
  }
  if (!userId) return { error: "Ese miembro no tiene cuenta de acceso todavía." };
  const clave = claveTemporal();
  const { error } = await a.db.auth.admin.updateUserById(userId, { password: clave });
  if (error) return { error: "No se pudo cambiar la contraseña." };
  return { ok: `Nueva contraseña temporal para ${m.nombre}:`, clave };
}

// ── Ventas y comisión ──────────────────────────────────────────────────────

const pctValido = (v: FormDataEntryValue | null) => {
  const n = Number(String(v ?? "").replace(",", "."));
  return String(v ?? "").trim() !== "" && Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n * 100) / 100 : null;
};

/**
 * Guarda el % de comisión de un ramo y completa las ventas de ese ramo que
 * estaban sin % (las que ya tenían uno no cambian).
 */
export async function guardarComisionRamo(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const ramo = String(form.get("ramo") || "");
  const pct = pctValido(form.get("pct"));
  if (!/^[a-z_]{2,40}$/.test(ramo)) return { error: "Ramo no válido." };
  if (pct === null) return { error: "Escribe un % entre 0 y 100." };
  const { error } = await a.db
    .from("comisiones_ramo")
    .upsert({ ramo, pct, updated_by: a.yo.id, updated_at: new Date().toISOString() });
  if (error) return { error: "No se pudo guardar." };
  const { data: completadas } = await a.db
    .from("ventas")
    .update({ comision_pct: pct })
    .eq("ramo", ramo)
    .is("comision_pct", null)
    .select("id");
  revalidatePath("/panel/ventas");
  return { ok: completadas?.length ? `Guardado. Se completaron ${completadas.length} ventas sin %.` : "Guardado." };
}

/** Corrige el % de una venta puntual (pólizas con comisión distinta a la del ramo). */
export async function pctDeVenta(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const id = String(form.get("id") || "");
  const pct = pctValido(form.get("pct"));
  if (!UUID.test(id)) return { error: "Venta no válida." };
  if (pct === null) return { error: "Escribe un % entre 0 y 100." };
  const { error } = await a.db.from("ventas").update({ comision_pct: pct }).eq("id", id);
  if (error) return { error: "No se pudo guardar." };
  revalidatePath("/panel/ventas");
  return { ok: "Guardado." };
}

/** Marca (o desmarca) que la participación de esa venta ya se pagó. */
export async function alternarPagada(_: EstadoAdmin, form: FormData): Promise<EstadoAdmin> {
  const a = await admin();
  if ("error" in a) return a;
  const id = String(form.get("id") || "");
  if (!UUID.test(id)) return { error: "Venta no válida." };
  const { data: v } = await a.db.from("ventas").select("pagada, comision_pct").eq("id", id).maybeSingle();
  if (!v) return { error: "Venta no válida." };
  if (!v.pagada && v.comision_pct === null) return { error: "Primero define el % de comisión." };
  const { error } = await a.db
    .from("ventas")
    .update({ pagada: !v.pagada, pagada_at: v.pagada ? null : new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: "No se pudo guardar." };
  revalidatePath("/panel/ventas");
  return { ok: v.pagada ? "Marcada como pendiente." : "Marcada como pagada." };
}
