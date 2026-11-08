"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { destinoSeguro, miembroActual, registrarAcceso, supabaseAuth } from "@/lib/panel/sesion";

export type EstadoForm = { error?: string; ok?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function origenYCliente() {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || (host?.startsWith("localhost") ? "http" : "https");
  return {
    origen: host ? `${proto}://${host}` : process.env.SITE_URL || "",
    ip: h.get("x-forwarded-for"),
    userAgent: h.get("user-agent"),
  };
}

export async function iniciarSesion(_: EstadoForm, form: FormData): Promise<EstadoForm> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  if (!EMAIL_RE.test(email) || !password) return { error: "Escribe tu correo y tu contraseña." };

  const auth = await supabaseAuth();
  if (!auth) return { error: "El panel todavía no está conectado a la base de datos." };
  const { ip, userAgent } = await origenYCliente();

  const { error } = await auth.auth.signInWithPassword({ email, password });
  if (error) {
    await registrarAcceso("login_fallido", email, { ip, userAgent });
    // El motivo va al log del servidor (nunca la contraseña) para diagnosticar.
    console.warn("panel login fallido:", { email, codigo: error.code, estado: error.status });
    // Supabase solo responde "no confirmado" si la contraseña era correcta,
    // así que este mensaje no le revela nada a quien no la sabe.
    if (error.code === "email_not_confirmed")
      return { error: "Tu cuenta existe pero no está confirmada. En Supabase > Authentication > Users, confírmala (o créala con Auto Confirm User)." };
    // Mismo mensaje para correo inexistente y contraseña errada.
    return { error: "Correo o contraseña incorrectos." };
  }

  const r = await miembroActual();
  if (!r.ok) {
    await auth.auth.signOut();
    await registrarAcceso("login_fallido", email, { ip, userAgent });
    return { error: "Tu cuenta no tiene acceso al panel. Pídele acceso al administrador." };
  }
  await registrarAcceso("login", email, { asesorId: r.miembro.id, ip, userAgent });
  redirect(destinoSeguro(form.get("next")));
}

export async function cerrarSesion() {
  const auth = await supabaseAuth();
  const r = await miembroActual();
  if (r.ok) {
    const { ip, userAgent } = await origenYCliente();
    await registrarAcceso("logout", r.miembro.email, { asesorId: r.miembro.id, ip, userAgent });
  }
  await auth?.auth.signOut();
  redirect("/panel/login");
}

export async function pedirRestablecer(_: EstadoForm, form: FormData): Promise<EstadoForm> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Escribe un correo válido." };
  const auth = await supabaseAuth();
  if (!auth) return { error: "El panel todavía no está conectado a la base de datos." };
  const { origen } = await origenYCliente();
  await auth.auth.resetPasswordForEmail(email, {
    redirectTo: `${origen}/panel/auth/callback?next=/panel/nueva-clave`,
  });
  // Misma respuesta exista o no la cuenta, para no revelar correos del equipo.
  return { ok: "Si el correo pertenece al equipo, te llegó un enlace para crear una contraseña nueva." };
}

export async function cambiarClave(_: EstadoForm, form: FormData): Promise<EstadoForm> {
  const password = String(form.get("password") || "");
  const confirmar = String(form.get("confirmar") || "");
  if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." };
  if (password !== confirmar) return { error: "Las contraseñas no coinciden." };
  const auth = await supabaseAuth();
  if (!auth) return { error: "El panel todavía no está conectado a la base de datos." };
  const { error } = await auth.auth.updateUser({ password });
  if (error) return { error: "El enlace venció o ya se usó. Pide uno nuevo." };
  redirect("/panel");
}
