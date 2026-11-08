import { redirect } from "next/navigation";
import TarjetaAcceso from "@/components/panel/TarjetaAcceso";
import { miembroActual } from "@/lib/panel/sesion";
import { cerrarSesion } from "@/app/panel/acciones";
import { botonAcceso } from "@/components/panel/campos";

export default async function SinAccesoPage() {
  const r = await miembroActual();
  if (r.ok) redirect("/panel");
  if (r.motivo === "sin_sesion") redirect("/panel/login");
  return (
    <TarjetaAcceso
      titulo="Tu cuenta no tiene acceso"
      subtitulo={
        r.motivo === "acceso_desactivado"
          ? "El administrador desactivó tu acceso al panel."
          : "Tu correo no está registrado en el equipo. Pídele acceso al administrador."
      }
    >
      {r.email && <p className="text-white/50 text-sm mb-5">Entraste como {r.email}.</p>}
      <form action={cerrarSesion}>
        <button type="submit" className={botonAcceso}>Salir</button>
      </form>
    </TarjetaAcceso>
  );
}
