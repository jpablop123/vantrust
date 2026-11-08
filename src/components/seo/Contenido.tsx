// Bloques de contenido SEO renderizados en el servidor: el texto queda en el
// HTML (SSG), sin depender de JavaScript del lado del cliente.

import Link from "next/link";
import { ArrowRight, BookOpen, Check, ChevronDown, MessageCircle, TriangleAlert } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { waLink } from "@/lib/site";
import { faqLd, type Pregunta } from "@/lib/seo";
import type { Bloque, Seccion } from "@/data/seo/tipos";
import type { Guia } from "@/data/seo/tipos";

/** Único punto que arma enlaces de WhatsApp en las plantillas SEO. */
export function waHref(mensaje: string): string {
  return waLink({ mensaje });
}

export function RenderBloque({ b }: { b: Bloque }) {
  switch (b.tipo) {
    case "p":
      return <p className="text-muted leading-relaxed">{b.texto}</p>;
    case "lista":
      return (
        <ul className="space-y-2">
          {b.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-muted">
              <Check className="w-4 h-4 text-accent shrink-0 mt-1" aria-hidden />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "pasos":
      return (
        <ol className="space-y-3">
          {b.items.map((it, i) => (
            <li key={it} className="flex items-start gap-3 text-muted">
              <span className="w-7 h-7 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{it}</span>
            </li>
          ))}
        </ol>
      );
    case "tabla":
      return (
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm border-collapse min-w-[480px]">
            <caption className="sr-only">{b.caption}</caption>
            <thead>
              <tr>
                {b.columnas.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="text-left font-semibold text-primary bg-primary/5 px-3 py-2.5 border-b border-primary/10"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.filas.map((fila) => (
                <tr key={fila.join("|")} className="border-b border-primary/5 align-top">
                  {fila.map((celda, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="text-left font-semibold text-primary px-3 py-2.5">
                        {celda}
                      </th>
                    ) : (
                      <td key={i} className="text-muted px-3 py-2.5">
                        {celda}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Ancla estable para el título de una sección ("¿Qué cubre…?" → "que-cubre"). */
export function anclaSeccion(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

export function Secciones({ secciones }: { secciones: Seccion[] }) {
  return (
    <>
      {secciones.map((s) => (
        <section
          key={s.titulo}
          id={anclaSeccion(s.titulo)}
          className="scroll-mt-28 bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm space-y-4"
        >
          <h2 className="text-xl font-bold text-primary">{s.titulo}</h2>
          {s.bloques.map((b, i) => (
            <RenderBloque key={i} b={b} />
          ))}
        </section>
      ))}
    </>
  );
}

/** FAQ con <details>: funciona sin JS y el texto está en el HTML. + FAQPage. */
export function FaqSeccion({
  faqs,
  titulo = "Preguntas frecuentes",
}: {
  faqs: Pregunta[];
  titulo?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section
      id="preguntas-frecuentes"
      className="scroll-mt-28 bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm"
    >
      <h2 className="text-xl font-bold text-primary mb-4">{titulo}</h2>
      <div className="divide-y divide-primary/10">
        {faqs.map((f) => (
          <details key={f.pregunta} className="group py-3">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <h3 className="font-semibold text-primary text-base">{f.pregunta}</h3>
              <ChevronDown
                className="w-5 h-5 text-accent shrink-0 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="text-muted leading-relaxed mt-2">{f.respuesta}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(faqs)} />
    </section>
  );
}

export function GuiasRelacionadas({ guias }: { guias: Guia[] }) {
  if (!guias.length) return null;
  return (
    <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-primary mb-4">Guías relacionadas</h2>
      <ul className="space-y-2">
        {guias.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guias/${g.slug}`}
              className="flex items-center gap-2.5 text-primary hover:text-accent-dark font-medium"
            >
              <BookOpen className="w-4 h-4 text-accent shrink-0" aria-hidden />
              {g.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EnlacesLocales({ enlaces }: { enlaces: { href: string; texto: string }[] }) {
  if (!enlaces.length) return null;
  return (
    <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-primary mb-4">Atención en tu ciudad</h2>
      <ul className="space-y-2">
        {enlaces.map((e) => (
          <li key={e.href}>
            <Link href={e.href} className="inline-flex items-center gap-2 text-primary hover:text-accent-dark font-medium">
              <ArrowRight className="w-4 h-4 text-accent" aria-hidden />
              {e.texto}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** CTA de WhatsApp con el mensaje del ramo. */
export function WhatsAppCTA({
  mensaje,
  titulo = "¿Hablamos por WhatsApp?",
  texto = "Un asesor de VanTrust revisa tu caso y te muestra opciones de varias aseguradoras, sin costo.",
}: {
  mensaje: string;
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-10 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{titulo}</h2>
      <p className="text-white/60 max-w-xl mx-auto mb-6">{texto}</p>
      <a
        href={waHref(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
        Escribir por WhatsApp
      </a>
    </section>
  );
}

/**
 * Datos pendientes. Solo se ven en desarrollo; en producción la página ya
 * sale en noindex y el visitante no ve notas internas.
 */
export function TodoPendiente({ todo }: { todo?: readonly string[] }) {
  if (!todo?.length || process.env.NODE_ENV === "production") return null;
  return (
    <aside className="rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-bold flex items-center gap-2 mb-2">
        <TriangleAlert className="w-4 h-4" aria-hidden />
        TODO: página en noindex hasta completar estos datos reales
      </p>
      <ul className="list-disc pl-5 space-y-1">
        {todo.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}
