import { redirect } from "next/navigation";
import TarjetaAcceso from "@/components/panel/TarjetaAcceso";
import { destinoSeguro, miembroActual } from "@/lib/panel/sesion";
import FormLogin from "./FormLogin";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const destino = destinoSeguro((await searchParams).next);
  const r = await miembroActual();
  if (r.ok) redirect(destino);
  return (
    <TarjetaAcceso titulo="Entrar al panel" subtitulo="Leads y seguimiento del equipo VanTrust.">
      {r.motivo === "sin_configurar" ? (
        <p className="text-white/70 text-sm">
          El panel todavía no está conectado a la base de datos. Faltan las variables
          SUPABASE_URL, SUPABASE_ANON_KEY y SUPABASE_SERVICE_ROLE_KEY.
        </p>
      ) : (
        <FormLogin destino={destino} />
      )}
    </TarjetaAcceso>
  );
}
