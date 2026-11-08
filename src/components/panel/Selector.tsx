"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface Opcion {
  valor: string;
  texto: string;
  /** Texto secundario a la derecha (p. ej. un conteo). */
  nota?: string;
}

/**
 * Selector del panel: reemplaza al <select> nativo con el estilo de la marca.
 * Accesible con teclado (flechas, Inicio/Fin, Enter, Escape, letras para
 * saltar) y con `name` funciona dentro de un <form> como un select normal.
 */
export default function Selector({
  valor,
  opciones,
  onCambio,
  etiqueta,
  name,
  placeholder = "Elegir…",
  className = "",
  ancho = "w-full",
  deshabilitado = false,
}: {
  valor: string;
  opciones: Opcion[];
  onCambio?: (valor: string) => void;
  /** Nombre accesible (aria-label). */
  etiqueta: string;
  name?: string;
  placeholder?: string;
  className?: string;
  ancho?: string;
  deshabilitado?: boolean;
}) {
  const id = useId();
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(0);
  const caja = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const actual = opciones.find((o) => o.valor === valor);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (caja.current && !caja.current.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);

  useEffect(() => {
    if (abierto) lista.current?.querySelector<HTMLElement>(`[data-i="${activo}"]`)?.scrollIntoView({ block: "nearest" });
  }, [abierto, activo]);

  const abrir = () => {
    setActivo(Math.max(0, opciones.findIndex((o) => o.valor === valor)));
    setAbierto(true);
  };
  const elegir = (i: number) => {
    const o = opciones[i];
    if (!o) return;
    setAbierto(false);
    if (o.valor !== valor) onCambio?.(o.valor);
  };

  const teclas = (e: React.KeyboardEvent) => {
    if (deshabilitado) return;
    if (!abierto) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setAbierto(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActivo((i) => Math.min(opciones.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActivo((i) => Math.max(0, i - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActivo(0); }
    else if (e.key === "End") { e.preventDefault(); setActivo(opciones.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elegir(activo); }
    else if (e.key === "Tab") setAbierto(false);
    else if (e.key.length === 1) {
      const i = opciones.findIndex((o, j) => j > activo && o.texto.toLowerCase().startsWith(e.key.toLowerCase()));
      const j = i >= 0 ? i : opciones.findIndex((o) => o.texto.toLowerCase().startsWith(e.key.toLowerCase()));
      if (j >= 0) setActivo(j);
    }
  };

  return (
    <div ref={caja} className={`relative ${ancho} ${className}`}>
      {name && <input type="hidden" name={name} value={valor} />}
      <button
        type="button"
        role="combobox"
        aria-label={etiqueta}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={`${id}-lista`}
        aria-activedescendant={abierto ? `${id}-${activo}` : undefined}
        disabled={deshabilitado}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        onKeyDown={teclas}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border bg-white text-sm text-left transition-colors outline-none disabled:opacity-60 ${
          abierto ? "border-accent ring-2 ring-accent/25" : "border-primary/15 hover:border-primary/30 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
        }`}
      >
        <span className={`truncate ${actual ? "text-primary font-medium" : "text-primary/40"}`}>
          {actual?.texto ?? placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-primary/40 shrink-0 transition-transform ${abierto ? "rotate-180" : ""}`} />
      </button>
      {abierto && (
        <ul
          ref={lista}
          id={`${id}-lista`}
          role="listbox"
          aria-label={etiqueta}
          className="absolute z-40 mt-1.5 min-w-full w-max max-w-[min(22rem,90vw)] max-h-72 overflow-auto rounded-xl border border-primary/10 bg-white py-1.5 shadow-xl shadow-primary/10"
        >
          {opciones.map((o, i) => {
            const elegida = o.valor === valor;
            return (
              <li
                key={o.valor || "_"}
                id={`${id}-${i}`}
                data-i={i}
                role="option"
                aria-selected={elegida}
                onMouseEnter={() => setActivo(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => elegir(i)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm cursor-pointer ${
                  i === activo ? "bg-background" : ""
                } ${elegida ? "text-primary font-semibold" : "text-primary/80"}`}
              >
                <Check className={`w-4 h-4 shrink-0 ${elegida ? "text-accent-dark" : "opacity-0"}`} />
                <span className="flex-1 truncate">{o.texto}</span>
                {o.nota && <span className="text-xs text-primary/40">{o.nota}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Selector con estado propio para formularios (como un <select defaultValue>). */
export function SelectorCampo({
  inicial,
  onCambio,
  ...props
}: Omit<Parameters<typeof Selector>[0], "valor"> & { inicial: string }) {
  const [valor, setValor] = useState(inicial);
  return (
    <Selector
      {...props}
      valor={valor}
      onCambio={(v) => {
        setValor(v);
        onCambio?.(v);
      }}
    />
  );
}
