"use client";

import { useActionState } from "react";
import { cambiarClave } from "@/app/panel/acciones";
import { botonAcceso, errorAcceso, inputAcceso, labelAcceso } from "@/components/panel/campos";

export default function FormNuevaClave() {
  const [estado, accion, enviando] = useActionState(cambiarClave, undefined);
  return (
    <form action={accion} className="space-y-4">
      {estado?.error && <p role="alert" className={errorAcceso}>{estado.error}</p>}
      <div>
        <label htmlFor="password" className={labelAcceso}>Contraseña nueva (mínimo 8 caracteres)</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required className={inputAcceso} />
      </div>
      <div>
        <label htmlFor="confirmar" className={labelAcceso}>Repítela</label>
        <input id="confirmar" name="confirmar" type="password" autoComplete="new-password" minLength={8} required className={inputAcceso} />
      </div>
      <button type="submit" disabled={enviando} className={botonAcceso}>
        {enviando ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}
