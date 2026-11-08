"use client";

import { useActionState } from "react";
import Link from "next/link";
import { iniciarSesion } from "@/app/panel/acciones";
import { botonAcceso, errorAcceso, inputAcceso, labelAcceso } from "@/components/panel/campos";

export default function FormLogin() {
  const [estado, accion, enviando] = useActionState(iniciarSesion, undefined);
  return (
    <form action={accion} className="space-y-4">
      {estado?.error && <p role="alert" className={errorAcceso}>{estado.error}</p>}
      <div>
        <label htmlFor="email" className={labelAcceso}>Correo</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputAcceso} />
      </div>
      <div>
        <label htmlFor="password" className={labelAcceso}>Contraseña</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputAcceso} />
      </div>
      <button type="submit" disabled={enviando} className={botonAcceso}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
      <p className="text-center">
        <Link href="/panel/restablecer" className="text-white/50 hover:text-accent text-sm underline underline-offset-4">
          Olvidé mi contraseña
        </Link>
      </p>
    </form>
  );
}
