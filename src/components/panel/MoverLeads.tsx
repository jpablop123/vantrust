"use client";

import { useActionState, useState } from "react";
import { Shuffle } from "lucide-react";
import { reasignarMasivo } from "@/app/panel/admin/acciones";

/** Mover todos los leads abiertos de un asesor (vacaciones, salida). */
export default function MoverLeads({ asesores }: { asesores: { id: string; nombre: string; abiertos: number }[] }) {
  const [abierto, setAbierto] = useState(false);
  const [estado, accion, enviando] = useActionState(reasignarMasivo, undefined);
  const control = "px-3 py-2.5 rounded-xl border border-primary/15 bg-white text-sm text-primary outline-none focus:border-accent";
  if (!abierto)
    return (
      <button type="button" onClick={() => setAbierto(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary/70 hover:text-primary">
        <Shuffle className="w-4 h-4" /> Mover los leads de un asesor
      </button>
    );
  return (
    <form
      action={accion}
      onSubmit={(e) => { if (!confirm("¿Mover todos los leads abiertos de ese asesor?")) e.preventDefault(); }}
      className="bg-white border border-primary/10 rounded-2xl p-4 flex flex-wrap items-center gap-2 text-sm"
    >
      <span className="font-semibold text-primary">Mover los leads abiertos de</span>
      <select name="de" required aria-label="De" className={control} defaultValue="">
        <option value="" disabled>elige asesor</option>
        {asesores.map((a) => <option key={a.id} value={a.id}>{a.nombre} ({a.abiertos})</option>)}
      </select>
      <span className="text-primary/70">a</span>
      <select name="a" required aria-label="A" className={control} defaultValue="repartir">
        <option value="repartir">repartir entre los demás</option>
        {asesores.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
      </select>
      <button type="submit" disabled={enviando} className="bg-primary text-white font-bold px-4 py-2.5 rounded-xl disabled:opacity-60">
        {enviando ? "Moviendo…" : "Mover"}
      </button>
      <button type="button" onClick={() => setAbierto(false)} className="text-primary/60 px-2">Cerrar</button>
      {estado?.error && <p role="alert" className="w-full text-red-700">{estado.error}</p>}
      {estado?.ok && <p className="w-full text-green-700">{estado.ok}</p>}
    </form>
  );
}
