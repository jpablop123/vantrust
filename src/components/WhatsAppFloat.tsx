"use client";

import { usePathname } from "next/navigation";
import { waLink } from "@/lib/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { PYME_A_SLUG } from "@/data/seo/pymes";

/**
 * Botón flotante de WhatsApp en todo el sitio. En una página de producto abre
 * el chat con el mensaje de ese ramo. El evento Contact lo registra el
 * listener global de <Tracking />.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname() || "/";

  // /gracias ya tiene su propio botón con el resumen del lead.
  // Las landings de anuncios (/l/*) tienen su propia barra con el mensaje de la landing.
  if (pathname.startsWith("/gracias") || pathname.startsWith("/l/")) return null;

  // /seguros/<slug> y /pymes/<poliza> (que se traduce al slug de seguros.ts).
  const [, seccion, slug] = pathname.match(/^\/(seguros|pymes)\/([^/]+)/) ?? [];
  const ramo = seccion === "pymes" ? PYME_A_SLUG[slug] : slug;

  return (
    <a
      href={waLink({ ramo })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      className="fixed right-4 sm:right-6 z-40 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold rounded-full pl-4 pr-5 h-14 shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon className="w-6 h-6" />
      <span className="text-[15px]">
        <span className="sm:hidden">WhatsApp</span>
        <span className="hidden sm:inline">Cotiza por WhatsApp</span>
      </span>
    </a>
  );
}
