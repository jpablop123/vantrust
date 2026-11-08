"use client";

import { useActionState } from "react";
import Link from "next/link";
import { pedirRestablecer } from "@/app/panel/acciones";
import { botonAcceso, errorAcceso, inputAcceso, labelAcceso, okAcceso } from "@/components/panel/campos";

export default function FormRestablecer({ enlaceVencido }: { enlaceVencido: boolean }) {
  const [estado, accion, enviando] = useActionState(pedirRestablecer, undefined);
  return (
    <form action={accion} className="space-y-4">
      {enlaceVencido && !estado && (
        <p role="alert" className={errorAcceso}>El enlace venció o ya se usó. Pide uno nuevo.</p>
      )}
      {estado?.error && <p role="alert" className={errorAcceso}>{estado.error}</p>}
      {estado?.ok ? (
        <p role="status" className={okAcceso}>{estado.ok}</p>
      ) : (
        <>
          <div>
            <label htmlFor="email" className={labelAcceso}>Correo</label>
            <input id="email" name="email" type="email" autoComplete="username" required className={inputAcceso} />
          </div>
          <button type="submit" disabled={enviando} className={botonAcceso}>
            {enviando ? "Enviando…" : "Enviarme el enlace"}
          </button>
        </>
      )}
      <p className="text-center">
        <Link href="/panel/login" className="text-white/50 hover:text-accent text-sm underline underline-offset-4">
          Volver a entrar
        </Link>
      </p>
    </form>
  );
}
