import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Solo para /panel: refresca la sesión de Supabase (las cookies vencen) y
// manda al login a quien no tenga sesión. Es un chequeo optimista: quién es
// miembro y con qué rol se verifica en el servidor (lib/panel/sesion.ts).

const PUBLICAS = ["/panel/login", "/panel/restablecer", "/panel/auth/callback"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return response; // sin configurar: las páginas lo explican

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (lista) => {
        for (const { name, value } of lista) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of lista) response.cookies.set(name, value, options);
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const ruta = request.nextUrl.pathname;
  if (!data.user && !PUBLICAS.some((p) => ruta.startsWith(p))) {
    const login = request.nextUrl.clone();
    login.pathname = "/panel/login";
    login.search = "";
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = {
  matcher: ["/panel", "/panel/:path*"],
};
