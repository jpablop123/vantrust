import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { getSupabase } from "@/lib/supabase";

// Sesión del panel. La autorización real vive aquí (no en proxy.ts, que solo
// redirige rápido): cada página y cada API del panel llama a miembroActual().

export type Rol = "admin" | "asesor";

export interface Miembro {
  id: string;
  email: string;
  nombre: string;
  rol: Rol;
}

export type MotivoSinAcceso = "sin_sesion" | "sin_fila" | "acceso_desactivado" | "sin_configurar";

/** Cliente de Supabase Auth con las cookies de la petición actual. */
export async function supabaseAuth() {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  const store = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (lista) => {
        try {
          for (const { name, value, options } of lista) store.set(name, value, options);
        } catch {
          // Desde un Server Component no se pueden escribir cookies; proxy.ts
          // ya refrescó la sesión en esta misma petición.
        }
      },
    },
  });
}

/**
 * Miembro del equipo con sesión activa, o el motivo por el que no lo es.
 * Falla cerrado: sin fila en `asesores` no hay acceso, aunque la cuenta de
 * Auth sea válida. El rol sale de la tabla, nunca de user_metadata.
 */
export const miembroActual = cache(async (): Promise<
  { ok: true; miembro: Miembro } | { ok: false; motivo: MotivoSinAcceso; email?: string }
> => {
  const auth = await supabaseAuth();
  const db = getSupabase();
  if (!auth || !db) return { ok: false, motivo: "sin_configurar" };

  // getUser() valida el token con Supabase; getSession() solo lee la cookie.
  const { data } = await auth.auth.getUser();
  const email = data.user?.email?.trim().toLowerCase();
  if (!email) return { ok: false, motivo: "sin_sesion" };

  const { data: fila } = await db
    .from("asesores")
    .select("id, email, nombre, rol, acceso")
    .eq("email", email)
    .maybeSingle();
  if (!fila) return { ok: false, motivo: "sin_fila", email };
  if (!fila.acceso) return { ok: false, motivo: "acceso_desactivado", email };

  return {
    ok: true,
    miembro: {
      id: fila.id,
      email: fila.email,
      nombre: fila.nombre,
      rol: fila.rol === "admin" ? "admin" : "asesor",
    },
  };
});

/** Para páginas: devuelve el miembro o redirige. */
export async function exigirMiembro(rol?: Rol): Promise<Miembro> {
  const r = await miembroActual();
  if (!r.ok) redirect(r.motivo === "sin_sesion" ? "/panel/login" : "/panel/sin-acceso");
  if (rol === "admin" && r.miembro.rol !== "admin") redirect("/panel");
  return r.miembro;
}

/** Registra entradas y salidas del panel. Nunca bloquea el flujo. */
export async function registrarAcceso(
  evento: "login" | "logout" | "login_fallido",
  email: string,
  extra: { asesorId?: string; ip?: string | null; userAgent?: string | null } = {}
) {
  try {
    await getSupabase()
      ?.from("panel_accesos")
      .insert({
        evento,
        email: email.trim().toLowerCase().slice(0, 200),
        asesor_id: extra.asesorId ?? null,
        ip: extra.ip?.split(",")[0]?.trim().slice(0, 64) ?? null,
        user_agent: extra.userAgent?.slice(0, 300) ?? null,
      });
  } catch {
    // el registro de accesos es informativo
  }
}
