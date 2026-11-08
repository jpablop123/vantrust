import { exigirMiembro } from "@/lib/panel/sesion";
import { eventosDe, leadsDeCola } from "@/lib/panel/leads";
import BarraPanel from "@/components/panel/BarraPanel";
import ColaCliente from "@/components/panel/ColaCliente";

// Siempre con datos frescos: es una cola de trabajo.
export const dynamic = "force-dynamic";

export default async function PanelInicio() {
  const miembro = await exigirMiembro();
  const leads = await leadsDeCola(miembro);
  const eventos = await eventosDe(leads.map((l) => l.id));
  const esAdmin = miembro.rol === "admin";
  return (
    <>
      <BarraPanel miembro={miembro} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight">{esAdmin ? "Todos los leads" : "Mi cola"}</h1>
        <p className="text-muted mt-1 mb-6">
          {esAdmin
            ? "Los leads de todo el equipo. Los filtros y la gestión del equipo llegan en la parte 3."
            : "Tus leads asignados. Escríbeles, registra cómo te fue y el panel te recuerda cuándo volver."}
        </p>
        <ColaCliente
          leads={leads}
          eventos={eventos}
          ahora={new Date().toISOString()}
          esAdmin={esAdmin}
          nombreMiembro={miembro.nombre}
        />
      </main>
    </>
  );
}
