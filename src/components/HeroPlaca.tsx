"use client";

import { useState } from "react";
import Link from "next/link";
import { normalizarPlaca, placaValida } from "@/lib/validacion";
import { enviarPlaca } from "@/lib/placa-pendiente";
import { trackInicioCotizacion } from "@/lib/tracking";

/** Lleva al cotizador del home en la pestaña de ese ramo. */
function irAlCotizador(ramo: "auto" | "salud" | "hogar") {
  window.dispatchEvent(new CustomEvent("vt-ramo", { detail: ramo }));
  document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Primera acción del hero: escribir la placa. Al enviar, lleva al cotizador
 * de autos con la placa ya puesta y el cursor en "Tu nombre" (luego viaja en
 * el lead). Acepta carro (ABC123) y moto (ABC12D). Es opcional: sin placa, el
 * botón solo lleva al cotizador. Al enviar se cuenta InitiateCheckout (una
 * vez por pestaña, ver lib/tracking).
 */
export default function HeroPlaca() {
  const [placa, setPlaca] = useState("");
  const [error, setError] = useState(false);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (placa && !placaValida(placa)) {
      setError(true);
      return;
    }
    trackInicioCotizacion("vehiculo", "hero_placa");
    if (placa) enviarPlaca(placa);
    irAlCotizador("auto");
  };

  return (
    <form onSubmit={enviar} noValidate className="w-full max-w-xl">
      <label htmlFor="hero-placa" className="block text-white/70 text-sm font-medium mb-3">
        Escribe la placa de tu carro o moto y te cotizamos con 10 aseguradoras
      </label>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Con forma de placa: el formato se reconoce de un vistazo. */}
        <div
          className={`relative sm:w-64 shrink-0 rounded-xl bg-background border-[3px] ${
            error ? "border-red-400" : "border-accent"
          } shadow-lg shadow-black/30`}
        >
          <span className="absolute top-1.5 inset-x-0 text-center text-[9px] font-bold tracking-[0.3em] text-primary/50 pointer-events-none">
            COLOMBIA
          </span>
          <input
            id="hero-placa"
            value={placa}
            onChange={(e) => {
              setPlaca(normalizarPlaca(e.target.value));
              setError(false);
            }}
            placeholder="ABC123"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error}
            aria-describedby={error ? "hero-placa-error" : undefined}
            className="w-full bg-transparent text-primary placeholder-primary/25 text-center font-bold text-3xl tracking-[0.18em] uppercase pt-5 pb-2 px-4 outline-none rounded-xl focus:ring-4 focus:ring-accent/40"
          />
        </div>
        <button
          type="submit"
          className="btn-shine glow-accent bg-gradient-to-r from-accent-light via-accent to-accent-dark text-primary font-bold px-8 py-4 rounded-full text-lg text-center transition-all duration-200 hover:scale-105"
        >
          Cotizar gratis
        </button>
      </div>
      {error && (
        <p id="hero-placa-error" className="mt-2 text-red-300 text-sm">
          Revisa la placa: ABC123 para carro o ABC12D para moto.
        </p>
      )}
      <p className="mt-4 text-sm text-white/55">
        ¿Otro seguro?{" "}
        <button
          type="button"
          onClick={() => irAlCotizador("salud")}
          className="text-accent font-semibold underline underline-offset-4 hover:text-accent-light"
        >
          Salud
        </button>
        <span className="mx-2 text-white/25">·</span>
        <button
          type="button"
          onClick={() => irAlCotizador("hogar")}
          className="text-accent font-semibold underline underline-offset-4 hover:text-accent-light"
        >
          Hogar
        </button>
        <span className="mx-2 text-white/25">·</span>
        <Link
          href="/seguros#empresas"
          className="text-accent font-semibold underline underline-offset-4 hover:text-accent-light"
        >
          Para mi empresa
        </Link>
      </p>
    </form>
  );
}
