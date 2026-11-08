import { exigirMiembro } from "@/lib/panel/sesion";
import { eventosDe, leadsDeCola, leerFiltros } from "@/lib/panel/leads";
import BarraPanel from "@/components/panel/BarraPanel";
import ColaCliente from "@/components/panel/ColaCliente";
import VistaAdmin from "@/components/panel/VistaAdmin";

// Siempre con datos frescos: es una cola de trabajo.
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function PanelInicio({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const miembro = await exigirMiembro();
  const sp = await searchParams;

  if (miembro.rol === "admin") {
    return (
      <>
        <BarraPanel miembro={miembro} actual="leads" />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Todos los leads</h1>
          <VistaAdmin filtros={leerFiltros(sp)} sp={sp} nombreMiembro={miembro.nombre} />
        </main>
      </>
    );
  }

  const leads = await leadsDeCola(miembro);
  const lead = typeof sp.lead === "string" && UUID.test(sp.lead) ? sp.lead : "";
  const eventos = await eventosDe(leads.map((l) => l.id));
  return (
    <>
      <BarraPanel miembro={miembro} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mi cola</h1>
        <p className="hidden sm:block text-muted mt-1 mb-3">
          Tus leads asignados. Escríbeles, registra cómo te fue y el panel te recuerda cuándo volver.
        </p>
        <ColaCliente leads={leads} eventos={eventos} ahora={new Date().toISOString()} esAdmin={false} nombreMiembro={miembro.nombre} abrir={lead} />
      </main>
    </>
  );
}
