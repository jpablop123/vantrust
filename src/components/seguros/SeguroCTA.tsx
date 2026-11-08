import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";
import type { Seguro } from "@/data/seguros";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Destino del CTA secundario (formulario) según cómo se cotiza el ramo. */
export function formHref(seguro: Seguro): string | null {
  if (seguro.quote.type === "cotizador")
    return `/?ramo=${seguro.quote.branch ?? ""}#cotizar`;
  if (seguro.quote.type === "form") return "#cotizar-form";
  return null;
}

/**
 * Botones de un ramo: WhatsApp siempre como acción principal (es donde se
 * cierra la venta) y el formulario como alternativa para quien prefiere que lo
 * llamen. `compact` es la versión para el encabezado de la página.
 */
export function SeguroBotones({ seguro }: { seguro: Seguro }) {
  const form = formHref(seguro);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href={waLink({ ramo: seguro.slug })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
      >
        <WhatsAppIcon />
        Cotizar por WhatsApp
      </a>
      {form && (
        <a
          href={form}
          className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
        >
          Prefiero que me llamen
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export default function SeguroCTA({ seguro }: { seguro: Seguro }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-12 text-center">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Habla con un asesor, no con un formulario
        </h3>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Te respondemos por WhatsApp, comparamos varias aseguradoras por ti y
          te acompañamos si algún día tienes un siniestro.
        </p>
        <div className="flex justify-center">
          <SeguroBotones seguro={seguro} />
        </div>
        <p className="text-white/30 text-xs mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>✔ Asesor humano asignado</span>
          <span>✔ Cotización con varias aseguradoras</span>
          <span>✔ Acompañamiento en siniestros</span>
        </p>
      </div>
    </div>
  );
}
