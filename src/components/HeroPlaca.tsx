"use client";

import { useState } from "react";
import { normalizarPlaca, placaValida } from "@/lib/validacion";
import { enviarPlaca } from "@/lib/placa-pendiente";

/**
 * Primera acción del hero: escribir la placa. Al enviar, lleva al cotizador
 * de autos con la placa ya puesta y el cursor en "Tu nombre". La placa es
 * opcional: sin ella, el botón solo lleva al cotizador.
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
    window.dispatchEvent(new CustomEvent("vt-ramo", { detail: "auto" }));
    if (placa) enviarPlaca(placa);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={enviar} noValidate className="w-full max-w-xl">
      <label htmlFor="hero-placa" className="block text-white/70 text-sm font-medium mb-3">
        Escribe tu placa y te cotizamos con 10 aseguradoras
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
          Revisa la placa (ej: ABC123 o ABC12D para moto).
        </p>
      )}
    </form>
  );
}
