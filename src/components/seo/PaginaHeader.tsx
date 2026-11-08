import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ShieldMotif from "@/components/ShieldMotif";
import type { Miga } from "@/lib/seo";

/**
 * Cabecera de las páginas internas: migas visibles, un solo H1 y la respuesta
 * directa como primer párrafo (lo primero que leen Google y la IA).
 */
export default function PaginaHeader({
  migas,
  h1,
  respuesta,
  icono,
  children,
}: {
  migas: Miga[];
  h1: string;
  respuesta: string;
  icono?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative bg-primary bg-grid overflow-hidden pt-32 pb-14">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-[#001a33]" />
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.15),transparent_60%)]" />
      <ShieldMotif className="absolute -right-20 -top-8 w-[380px] h-[460px] opacity-[0.05] hidden md:block" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs migas={migas} />
        </div>
        <div className="flex items-start gap-5">
          {icono && (
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/15 border border-accent/30 hidden sm:flex items-center justify-center text-accent">
              {icono}
            </div>
          )}
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">{h1}</h1>
            <p className="text-white/75 text-lg mt-5 max-w-2xl leading-relaxed">{respuesta}</p>
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
