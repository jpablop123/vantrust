"use client";

import { useActionState, useState } from "react";
import { Copy, KeyRound, UserPlus } from "lucide-react";
import {
  actualizarMiembro,
  alternarMiembro,
  crearMiembro,
  nuevaClaveTemporal,
  type EstadoAdmin,
} from "@/app/panel/admin/acciones";
import type { MiembroEquipo } from "@/lib/panel/leads";

const control = "w-full px-3 py-2.5 rounded-xl border border-primary/15 bg-white text-sm text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25";

/** Mensaje de resultado; si trae contraseña temporal, la muestra para copiarla. */
function Resultado({ estado }: { estado: EstadoAdmin }) {
  const [copiada, setCopiada] = useState(false);
  if (!estado) return null;
  if (estado.error) return <p role="alert" className="text-sm text-red-700">{estado.error}</p>;
  return (
    <div className="text-sm text-green-800">
      <p>{estado.ok}</p>
      {estado.clave && (
        <div className="mt-2 flex items-center gap-2">
          <code className="px-3 py-2 rounded-lg bg-primary text-accent font-mono text-base tracking-wider select-all">{estado.clave}</code>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(estado.clave!).then(() => setCopiada(true))}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-primary/15 text-primary font-semibold"
          >
            <Copy className="w-4 h-4" /> {copiada ? "Copiada" : "Copiar"}
          </button>
          <span className="text-xs text-muted">Se muestra solo esta vez.</span>
        </div>
      )}
    </div>
  );
}

function NuevoMiembro() {
  const [estado, accion, enviando] = useActionState(crearMiembro, undefined);
  return (
    <form action={accion} className="bg-white border border-primary/10 rounded-2xl p-5 space-y-3">
      <h2 className="font-bold text-primary flex items-center gap-2"><UserPlus className="w-5 h-5 text-accent-dark" /> Agregar al equipo</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <input name="nombre" required placeholder="Nombre completo" aria-label="Nombre completo" className={control} />
        <input name="email" type="email" required placeholder="correo@vantrust.com.co" aria-label="Correo" className={control} />
        <select name="rol" aria-label="Rol" defaultValue="asesor" className={control}>
          <option value="asesor">Asesor</option>
          <option value="admin">Administrador</option>
        </select>
        <input name="telegram" placeholder="Chat de Telegram (opcional)" aria-label="Chat de Telegram" className={control} />
      </div>
      <button type="submit" disabled={enviando} className="bg-accent hover:bg-accent-light text-primary font-bold px-5 py-2.5 rounded-xl disabled:opacity-60">
        {enviando ? "Creando…" : "Crear y generar contraseña"}
      </button>
      <Resultado estado={estado} />
    </form>
  );
}

function FilaMiembro({ m, soyYo }: { m: MiembroEquipo; soyYo: boolean }) {
  const [editando, setEditando] = useState(false);
  const [estado, accion, enviando] = useActionState(async (p: EstadoAdmin, f: FormData) => {
    const r = await actualizarMiembro(p, f);
    if (r?.ok) setEditando(false);
    return r;
  }, undefined);
  const [estadoAlt, alternar] = useActionState(alternarMiembro, undefined);
  const [estadoClave, clave, generando] = useActionState(nuevaClaveTemporal, undefined);

  return (
    <li className={`bg-white border rounded-2xl p-5 ${m.acceso ? "border-primary/10" : "border-dashed border-primary/20 opacity-75"}`}>
      {editando ? (
        <form action={accion} className="space-y-3">
          <input type="hidden" name="id" value={m.id} />
          <div className="grid sm:grid-cols-3 gap-2">
            <input name="nombre" defaultValue={m.nombre} required aria-label="Nombre" className={control} />
            <select name="rol" defaultValue={m.rol} aria-label="Rol" className={control}>
              <option value="asesor">Asesor</option>
              <option value="admin">Administrador</option>
            </select>
            <input name="telegram" defaultValue={m.telegram_chat_id ?? ""} placeholder="Chat de Telegram" aria-label="Chat de Telegram" className={control} />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={enviando} className="bg-primary text-white font-bold px-4 py-2 rounded-lg text-sm">Guardar</button>
            <button type="button" onClick={() => setEditando(false)} className="text-sm text-primary/60 px-2">Cancelar</button>
          </div>
          <Resultado estado={estado} />
        </form>
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-bold text-primary">
              {m.nombre} {soyYo && <span className="text-xs font-normal text-muted">(tú)</span>}
            </p>
            <p className="text-sm text-muted">{m.email}</p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-bold">
              <span className={`px-2.5 py-1 rounded-full ${m.rol === "admin" ? "bg-primary text-white" : "bg-primary/5 text-primary/70"}`}>
                {m.rol === "admin" ? "Administrador" : "Asesor"}
              </span>
              {m.rol === "asesor" && (
                <span className={`px-2.5 py-1 rounded-full ${m.activo && m.acceso ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                  {m.activo && m.acceso ? "Recibe leads" : "Fuera de la rotación"}
                </span>
              )}
              {!m.acceso && <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700">Sin acceso</span>}
              {m.rol === "asesor" && <span className="px-2.5 py-1 rounded-full bg-background text-primary/70">{m.abiertos} abiertos</span>}
              <span className="px-2.5 py-1 rounded-full bg-background text-primary/70">{m.telegram_chat_id ? "Telegram ✓" : "Sin Telegram"}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setEditando(true)} className="px-3 py-2 rounded-lg border border-primary/15 text-sm font-semibold text-primary/80">Editar</button>
            {m.rol === "asesor" && (
              <form action={alternar}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="campo" value="activo" />
                <button type="submit" className="px-3 py-2 rounded-lg border border-primary/15 text-sm font-semibold text-primary/80">
                  {m.activo ? "Sacar de la rotación" : "Volver a la rotación"}
                </button>
              </form>
            )}
            {!soyYo && (
              <form action={alternar} onSubmit={(e) => { if (m.acceso && !confirm(`¿Quitarle el acceso al panel a ${m.nombre}?`)) e.preventDefault(); }}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="campo" value="acceso" />
                <button type="submit" className={`px-3 py-2 rounded-lg border text-sm font-semibold ${m.acceso ? "border-red-200 text-red-700" : "border-primary/15 text-primary/80"}`}>
                  {m.acceso ? "Quitar acceso" : "Devolver acceso"}
                </button>
              </form>
            )}
            <form action={clave} onSubmit={(e) => { if (!confirm(`¿Generar una contraseña nueva para ${m.nombre}? La actual deja de funcionar.`)) e.preventDefault(); }}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" disabled={generando} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary/15 text-sm font-semibold text-primary/80">
                <KeyRound className="w-4 h-4" /> Contraseña nueva
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-2 space-y-1">
        <Resultado estado={estadoAlt} />
        <Resultado estado={estadoClave} />
      </div>
    </li>
  );
}

export default function EquipoCliente({ miembros, yo }: { miembros: MiembroEquipo[]; yo: string }) {
  return (
    <div className="space-y-6">
      <NuevoMiembro />
      <ul className="space-y-3">
        {miembros.map((m) => <FilaMiembro key={m.id} m={m} soyYo={m.id === yo} />)}
      </ul>
    </div>
  );
}
