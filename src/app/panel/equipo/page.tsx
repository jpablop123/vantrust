import { exigirMiembro } from "@/lib/panel/sesion";
import { equipo } from "@/lib/panel/leads";
import BarraPanel from "@/components/panel/BarraPanel";
import EquipoCliente from "@/components/panel/EquipoCliente";

export const dynamic = "force-dynamic";

export default async function EquipoPage() {
  const yo = await exigirMiembro("admin");
  const miembros = await equipo();
  return (
    <>
      <BarraPanel miembro={yo} actual="equipo" />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Equipo</h1>
        <p className="text-muted mt-1 mb-6">
          Quién entra al panel y quién recibe leads. Los leads nuevos se reparten por turnos entre los asesores que reciben leads.
        </p>
        <EquipoCliente miembros={miembros} yo={yo.id} />
      </main>
    </>
  );
}
