import { NextResponse, type NextRequest } from "next/server";
import { supabaseAuth } from "@/lib/panel/sesion";

// Destino del enlace de "olvidé mi contraseña": cambia el código del correo
// por una sesión y sigue a la página indicada (solo rutas del panel).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/panel";
  const destino = next.startsWith("/panel") ? next : "/panel";

  const auth = await supabaseAuth();
  if (code && auth) {
    const { error } = await auth.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${destino}`);
  }
  return NextResponse.redirect(`${origin}/panel/restablecer?error=enlace`);
}
