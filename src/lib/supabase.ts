import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de servidor con la service role key: salta RLS, así que NUNCA se
// importa desde un componente de cliente ("server-only" lo hace fallar en build).
// Si faltan las variables devuelve null y el lead sigue llegando por Telegram y
// correo, como antes.

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;
  if (!client) console.warn("Supabase no configurado: el lead no se guarda en BD");
  return client;
}
