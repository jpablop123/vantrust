import type { Fila, Metricas } from "@/lib/panel/metricas";

export const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n).replace(/\s/g, " ");
/** Pesos abreviados para cifras grandes: "$ 33,6 M". */
export const pesosCorto = (n: number) =>
  n >= 1e6 ? `$ ${(n / 1e6).toLocaleString("es-CO", { maximumFractionDigits: 1 })} M` : pesos(n);
export const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)} %` : "–");

/** Minutos legibles: "8 min", "2 h 10 min", "1,5 días". */
export function tiempo(min: number | null) {
  if (min === null) return "–";
  if (min < 60) return `${Math.round(min)} min`;
  if (min < 24 * 60) {
    const h = Math.floor(min / 60), m = Math.round(min % 60);
    return m ? `${h} h ${m} min` : `${h} h`;
  }
  return `${(min / 1440).toLocaleString("es-CO", { maximumFractionDigits: 1 })} días`;
}

/** Cifra destacada. */
export function Cifra({ valor, texto, nota }: { valor: string; texto: string; nota?: string }) {
  return (
    <div className="bg-white border border-primary/10 rounded-2xl p-4">
      <p className="text-sm text-muted">{texto}</p>
      <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 tabular-nums">{valor}</p>
      {nota && <p className="text-xs text-muted mt-1">{nota}</p>}
    </div>
  );
}

/** Leads por día (o semana): columnas de un solo color con el valor al pasar el cursor. */
export function LeadsPorDia({ datos, agrupado }: { datos: Metricas["porDia"]; agrupado: Metricas["agrupado"] }) {
  const max = Math.max(1, ...datos.map((d) => d.n));
  const tope = Math.max(1, Math.ceil(max / 5) * 5);
  const cadaCuanto = Math.ceil(datos.length / 8);
  return (
    <div>
      <div className="relative h-44 flex items-end gap-[2px] border-b border-primary/15">
        {/* Guías recesivas: mitad y tope */}
        {[0.5, 1].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-dashed border-primary/10 pointer-events-none" style={{ bottom: `${f * 100}%` }}>
            <span className="absolute -top-2 -left-0.5 -translate-x-full pr-1 text-[10px] text-muted tabular-nums">{Math.round(tope * f)}</span>
          </div>
        ))}
        {datos.map((d) => (
          <div key={d.dia} className="group relative flex-1 min-w-0 h-full flex items-end" tabIndex={0} aria-label={`${d.etiqueta}: ${d.n} leads`}>
            <div
              className="w-full rounded-t-[4px] bg-primary group-hover:bg-accent-dark group-focus:bg-accent-dark transition-colors"
              style={{ height: d.n ? `${(d.n / tope) * 100}%` : 0, minHeight: d.n ? 2 : 0 }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block group-focus:block z-10 whitespace-nowrap rounded-lg bg-primary text-white text-xs px-2.5 py-1.5 shadow-lg">
              <b>{d.n}</b> {d.n === 1 ? "lead" : "leads"} · {d.etiqueta}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-[2px] mt-1.5">
        {datos.map((d, i) => (
          <span key={d.dia} className="flex-1 min-w-0 text-[10px] text-muted text-center whitespace-nowrap overflow-visible">
            {i % cadaCuanto === 0 ? d.etiqueta.replace("Semana del ", "") : ""}
          </span>
        ))}
      </div>
      <p className="sr-only">Leads por {agrupado}.</p>
    </div>
  );
}

/** Embudo: barras horizontales con el % del total y el paso desde la etapa anterior. */
export function Embudo({ etapas }: { etapas: Metricas["embudo"] }) {
  const total = etapas[0]?.n || 1;
  return (
    <ol className="space-y-3">
      {etapas.map((e, i) => (
        <li key={e.etapa}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-semibold text-primary">{e.etapa}</span>
            <span className="font-bold text-primary tabular-nums">{e.n}</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-background overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(e.n / total) * 100}%`, minWidth: e.n ? 4 : 0 }} />
          </div>
          {i > 0 && (
            <p className="mt-1 text-xs text-muted tabular-nums">
              {pct(e.n, total)} del total · {pct(e.n, etapas[i - 1].n)} de {etapas[i - 1].etapa.toLowerCase()}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Tabla de desglose con barra de volumen. */
export function Desglose({ titulo, columna, filas, limite = 12 }: { titulo: string; columna: string; filas: Fila[]; limite?: number }) {
  const max = Math.max(1, ...filas.map((f) => f.leads));
  const visibles = filas.slice(0, limite);
  const resto = filas.slice(limite);
  return (
    <section className="bg-white border border-primary/10 rounded-2xl p-4 sm:p-5">
      <h2 className="font-bold text-primary">{titulo}</h2>
      {filas.length === 0 ? (
        <p className="text-sm text-muted mt-3">Sin leads en este periodo.</p>
      ) : (
        <div className="mt-3 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-primary/10">
                <th className="font-semibold py-2 pr-3">{columna}</th>
                <th className="font-semibold py-2 pr-3 w-[30%]">Leads</th>
                <th className="font-semibold py-2 pr-3 text-right" title="Contactados sobre el total">Contacto</th>
                <th className="font-semibold py-2 pr-3 text-right">Ganados</th>
                <th className="font-semibold py-2 pr-3 text-right" title="Ganados sobre el total">Conversión</th>
                <th className="font-semibold py-2 pr-3 text-right">Prima</th>
                <th className="font-semibold py-2 text-right" title="Mediana hasta el primer contacto">Respuesta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {visibles.map((f) => (
                <tr key={f.clave}>
                  <td className="py-2 pr-3 font-semibold text-primary max-w-[14rem] truncate" title={f.clave}>{f.clave}</td>
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(f.leads / max) * 100}%` }} />
                      </div>
                      <span className="w-8 text-right tabular-nums text-primary">{f.leads}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums text-primary/80">{pct(f.contactados, f.leads)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-primary/80">{f.ganados}</td>
                  <td className="py-2 pr-3 text-right tabular-nums font-semibold text-primary">{pct(f.ganados, f.leads)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-primary/80 whitespace-nowrap">{f.prima ? pesos(f.prima) : "–"}</td>
                  <td className="py-2 text-right tabular-nums text-primary/80 whitespace-nowrap">{tiempo(f.respuesta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resto.length > 0 && (
            <p className="text-xs text-muted mt-2">
              Y {resto.length} más con {resto.reduce((s, f) => s + f.leads, 0)} leads.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
