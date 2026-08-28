"use client";

import { useRef } from "react";
import { formatCOPInput, copAyuda } from "@/lib/currency";

/**
 * Campo de dinero en pesos colombianos.
 *
 * Formatea el valor mientras el usuario escribe ("50000000" -> "50.000.000"),
 * conserva la posición del cursor al editar en medio del número y muestra el
 * monto en letras debajo para confirmar que no sobra ni falta un cero.
 */
export default function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
  className = "",
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    // Cuántos dígitos hay a la izquierda del cursor antes de reformatear.
    const digitsBeforeCaret = el.value.slice(0, caret).replace(/\D/g, "").length;

    const formatted = formatCOPInput(el.value);
    onChange(formatted);

    // Reubica el cursor después del mismo dígito, ya con los puntos puestos.
    requestAnimationFrame(() => {
      const node = inputRef.current;
      if (!node) return;
      let seen = 0;
      let pos = 0;
      if (digitsBeforeCaret > 0) {
        pos = formatted.length;
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) seen++;
          if (seen === digitsBeforeCaret) {
            pos = i + 1;
            break;
          }
        }
      }
      node.setSelectionRange(pos, pos);
    });
  };

  const ayuda = copAyuda(value);

  return (
    <div>
      <div className="relative">
        <span
          aria-hidden="true"
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-[15px] pointer-events-none ${
            value ? "text-accent" : "text-white/30"
          }`}
        >
          $
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${className} pl-8 pr-14 tabular-nums`}
        />
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold tracking-wide text-white/30 pointer-events-none"
        >
          COP
        </span>
      </div>
      {ayuda && (
        <p className="mt-1.5 text-[12px] text-accent/70 leading-snug">{ayuda}</p>
      )}
    </div>
  );
}
