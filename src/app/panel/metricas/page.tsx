import { exigirMiembro } from "@/lib/panel/sesion";
import { leerFiltrosMetricas, metricas } from "@/lib/panel/metricas";
import BarraPanel from "@/components/panel/BarraPanel";
import FiltrosMetricas from "@/components/panel/FiltrosMetricas";
import { Cifra, Desglose, Embudo, LeadsPorDia, pct, pesos, pesosCorto, tiempo } from "@/components/panel/GraficosMetricas";

export const dynamic = "force-dynamic";

const fechaLarga = (d: string) =>
  new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

export default async function PanelMetricas({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const miembro = await exigirMiembro("admin");
  const filtros = leerFiltrosMetricas(await searchParams);
  const m = await metricas(filtros);

  return (
    <>
      <BarraPanel miembro={miembro} actual="metricas" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Métricas</h1>
            {m && <p className="text-muted mt-1">Leads que llegaron del {fechaLarga(m.desde)} al {fechaLarga(m.hasta)}.</p>}
          </div>
          <FiltrosMetricas filtros={filtros} />
        </div>

        {!m ? (
          <p className="text-muted">El panel todavía no está conectado a la base de datos.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <Cifra texto="Leads" valor={String(m.total)} nota={`${m.abiertosSinContactar} siguen sin contactar`} />
              <Cifra texto="Contactados" valor={pct(m.embudo[1].n, m.total)} nota={`${m.embudo[1].n} de ${m.total}`} />
              <Cifra texto="Conversión" valor={pct(m.embudo[3].n, m.total)} nota={`${m.embudo[3].n} ganados`} />
              <Cifra texto="Prima ganada" valor={pesosCorto(m.prima)} nota={pesos(m.prima)} />
              <Cifra
                texto="Tiempo de respuesta"
                valor={tiempo(m.respuesta.mediana)}
                nota={m.respuesta.contactados ? `mediana · ${pct(m.respuesta.en15, m.respuesta.contactados)} en 15 min o menos` : "mediana"}
              />
            </div>

            <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
              <section className="min-w-0 bg-white border border-primary/10 rounded-2xl p-4 sm:p-5 pl-8 sm:pl-10">
                <h2 className="font-bold text-primary -ml-4 sm:-ml-5 mb-4">Leads por {m.agrupado === "semana" ? "semana" : "día"}</h2>
                <LeadsPorDia datos={m.porDia} agrupado={m.agrupado} />
              </section>
              <section className="bg-white border border-primary/10 rounded-2xl p-4 sm:p-5">
                <h2 className="font-bold text-primary mb-4">Embudo</h2>
                <Embudo etapas={m.embudo} />
              </section>
            </div>

            <Desglose titulo="¿Por dónde llegaron? (canal)" columna="Canal" filas={m.canal} />
            <Desglose titulo="¿Dónde dejaron sus datos? (punto de captura)" columna="Punto de captura" filas={m.captura} />
            <Desglose titulo="Por campaña (utm_campaign)" columna="Campaña" filas={m.campana} />
            <Desglose titulo="Por asesor" columna="Asesor" filas={m.asesor} />
            <Desglose titulo="Por ramo" columna="Ramo" filas={m.ramo} />
            <p className="text-xs text-muted">
              Respuesta: mediana entre la llegada del lead y su primer contacto registrado (cuenta noches y fines de semana).
              Cotizados incluye los que se perdieron después de cotizar. El canal sale de utm_source, gclid/fbclid y el sitio de donde venía la persona.
            </p>
          </>
        )}
      </main>
    </>
  );
}
