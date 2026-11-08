import { exigirMiembro } from "@/lib/panel/sesion";
import BarraPanel from "@/components/panel/BarraPanel";

export default async function PanelInicio() {
  const miembro = await exigirMiembro();
  const primerNombre = miembro.nombre.split(" ")[0];
  return (
    <>
      <BarraPanel miembro={miembro} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Hola, {primerNombre}</h1>
        <p className="text-muted mt-1">
          {miembro.rol === "admin"
            ? "Desde aquí vas a ver todos los leads, repartirlos y gestionar el equipo."
            : "Desde aquí vas a ver tus leads y registrar cada contacto."}
        </p>
        <div className="mt-8 bg-white border border-primary/10 rounded-2xl p-6 max-w-xl">
          <p className="font-semibold">{miembro.rol === "admin" ? "Leads y equipo" : "Mi cola"}</p>
          <p className="text-muted text-sm mt-1">Llega en la siguiente entrega del panel.</p>
        </div>
      </main>
    </>
  );
}
