"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { PYME_A_SLUG } from "@/data/seo/pymes";

/**
 * Botón flotante de WhatsApp en todo el sitio. En una página de producto abre
 * el chat con el mensaje de ese ramo. El evento Contact lo registra el
 * listener global de <Tracking />.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname() || "/";
  const [hovered, setHovered] = useState(false);

  // /gracias ya tiene su propio botón con el resumen del lead.
  // Las landings de anuncios (/l/*) tienen su propia barra con el mensaje de la landing.
  if (pathname.startsWith("/gracias") || pathname.startsWith("/l/")) return null;

  // /seguros/<slug> y /pymes/<poliza> (que se traduce al slug de seguros.ts).
  const [, seccion, slug] = pathname.match(/^\/(seguros|pymes)\/([^/]+)/) ?? [];
  const ramo = seccion === "pymes" ? PYME_A_SLUG[slug] : slug;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-white text-primary text-sm font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap ${
          hovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        ¿Tienes dudas? Escríbenos
      </div>

      {/* Button */}
      <a
        href={waLink({ ramo })}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 hover:scale-110"
        aria-label="Cotizar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-green-500" />
      </a>
    </div>
  );
}
