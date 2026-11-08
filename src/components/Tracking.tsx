"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  GA4_ID,
  META_PIXEL_ID,
  capturarAtribucion,
  track,
} from "@/lib/tracking";

/**
 * Carga Meta Pixel y GA4 (solo si sus IDs existen), guarda la atribución de la
 * primera visita y registra "Contact" en cualquier enlace de WhatsApp o de
 * llamada del sitio, sin tener que cablear cada botón.
 */
export default function Tracking() {
  const pathname = usePathname();
  const primeraCarga = useRef(true);

  useEffect(() => {
    capturarAtribucion();

    // Un solo listener para todos los botones de contacto, presentes y futuros.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("https://wa.me/")) {
        track("Contact", { method: "whatsapp", page: window.location.pathname });
      } else if (href.startsWith("tel:")) {
        track("Contact", { method: "phone", page: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // El pixel registra el PageView inicial solo; las navegaciones del lado del
  // cliente no recargan la página, así que se reportan aquí. GA4 ya las mide
  // con la medición mejorada (cambios del historial).
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  // El panel interno no se mide: son empleados, no visitantes.
  if (pathname?.startsWith("/panel")) return null;

  return (
    <>
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(META_PIXEL_ID)});
fbq('track', 'PageView');`}
        </Script>
      )}
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA4_ID)});`}
          </Script>
        </>
      )}
    </>
  );
}
