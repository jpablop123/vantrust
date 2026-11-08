// Piezas del layout de lectura de las guías: texto corrido (sin una caja por
// sección), índice lateral fijo en escritorio y plegable en móvil, el caso
// ilustrativo destacado y las guías relacionadas como tarjetas.

import Link from "next/link";
import { ArrowRight, ChevronDown, Clock, MessageCircle } from "lucide-react";
import { RenderBloque, anclaSeccion, waHref } from "@/components/seo/Contenido";
import type { Guia, Seccion } from "@/data/seo/tipos";

const esCaso = (s: Seccion) => s.titulo.startsWith("Caso ilustrativo");

/** Las secciones de la guía como un artículo continuo. */
export function ArticuloSecciones({ secciones }: { secciones: Seccion[] }) {
  return (
    <div className="space-y-12">
      {secciones.map((s) =>
        esCaso(s) ? (
          <section
            key={s.titulo}
            id={anclaSeccion(s.titulo)}
            className="scroll-mt-28 rounded-2xl bg-accent/[0.07] border-l-4 border-accent p-6 sm:p-7 space-y-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-dark">
              Caso ilustrativo
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-primary leading-snug">
              {s.titulo.replace(/^Caso ilustrativo:\s*/, "")}
            </h2>
            {s.bloques.map((b, i) => (
              <RenderBloque key={i} b={b} />
            ))}
          </section>
        ) : (
          <section key={s.titulo} id={anclaSeccion(s.titulo)} className="scroll-mt-28 space-y-4">
            <h2 className="text-2xl font-bold text-primary leading-snug">{s.titulo}</h2>
            {s.bloques.map((b, i) => (
              <RenderBloque key={i} b={b} />
            ))}
          </section>
        )
      )}
    </div>
  );
}

function ItemsIndice({ secciones, conFaq }: { secciones: Seccion[]; conFaq: boolean }) {
  return (
    <ol className="space-y-1">
      {secciones.map((s, i) => (
        <li key={s.titulo}>
          <a
            href={`#${anclaSeccion(s.titulo)}`}
            className="flex gap-3 rounded-lg px-3 py-2 text-[14px] leading-snug text-muted hover:text-primary hover:bg-primary/[0.04] transition-colors"
          >
            <span className="text-accent-dark font-semibold tabular-nums">{i + 1}</span>
            <span>{esCaso(s) ? "Caso ilustrativo" : s.titulo}</span>
          </a>
        </li>
      ))}
      {conFaq && (
        <li>
          <a
            href="#preguntas-frecuentes"
            className="flex gap-3 rounded-lg px-3 py-2 text-[14px] leading-snug text-muted hover:text-primary hover:bg-primary/[0.04] transition-colors"
          >
            <span className="text-accent-dark font-semibold">?</span>
            <span>Preguntas frecuentes</span>
          </a>
        </li>
      )}
    </ol>
  );
}

/** Índice plegable, solo en móvil y tablet. */
export function IndiceMovil({ secciones, conFaq }: { secciones: Seccion[]; conFaq: boolean }) {
  return (
    <details className="lg:hidden group rounded-2xl border border-primary/10 bg-white shadow-sm mb-10">
      <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 font-semibold text-primary">
        En esta guía
        <ChevronDown className="w-5 h-5 text-accent transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <nav aria-label="En esta guía" className="px-2 pb-3">
        <ItemsIndice secciones={secciones} conFaq={conFaq} />
      </nav>
    </details>
  );
}

/** Columna lateral fija en escritorio: índice + WhatsApp. */
export function LateralGuia({
  secciones,
  conFaq,
  minutos,
  waMensaje,
}: {
  secciones: Seccion[];
  conFaq: boolean;
  minutos: number;
  waMensaje: string;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        <nav aria-label="En esta guía">
          <p className="flex items-center justify-between px-3 mb-2 text-xs font-bold uppercase tracking-[0.14em] text-primary/50">
            En esta guía
            <span className="inline-flex items-center gap-1 normal-case tracking-normal font-medium">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {minutos} min
            </span>
          </p>
          <ItemsIndice secciones={secciones} conFaq={conFaq} />
        </nav>
        <div className="rounded-2xl bg-primary p-5">
          <p className="font-bold text-white leading-snug">¿Tienes un caso parecido?</p>
          <p className="text-white/60 text-sm mt-1.5 mb-4">
            Un asesor de VanTrust te responde por WhatsApp, sin costo.
          </p>
          <a
            href={waHref(waMensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}

/** Guías del mismo tema, como tarjetas. */
export function RelacionadasTarjetas({ guias }: { guias: Guia[] }) {
  if (!guias.length) return null;
  return (
    <section aria-labelledby="relacionadas" className="mt-16">
      <h2 id="relacionadas" className="text-2xl font-bold text-primary mb-5">
        Sigue leyendo
      </h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {guias.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guias/${g.slug}`}
              className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm hover:border-accent/50 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-primary leading-snug group-hover:text-accent-dark transition-colors">
                {g.titulo}
              </span>
              <ArrowRight
                className="w-5 h-5 mt-0.5 shrink-0 text-accent/60 group-hover:text-accent-dark group-hover:translate-x-1 transition-all"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
