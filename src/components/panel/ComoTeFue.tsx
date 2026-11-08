"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";
import { actuarSobreLead } from "@/app/panel/cola/acciones";
import { cuando, nombreCorto } from "@/lib/panel/proxima";

type Opcion = { clave: string; texto: string; campos: Record<string, string>; peligro?: boolean };

const OPCIONES: Opcion[] = [
  { clave: "no_contesto", texto: "No contestó", campos: { accion: "contacto", resultado: "no_contesto" } },
  { clave: "interesado", texto: "Interesado", campos: { accion: "contacto", resultado: "interesado" } },
  { clave: "lo_va_a_pensar", texto: "Lo va a pensar", campos: { accion: "contacto", resultado: "lo_va_a_pensar" } },
  { clave: "cotizado", texto: "Le coticé", campos: { accion: "cotizado" } },
  { clave: "no_interesa", texto: "No le interesa", campos: { accion: "perdido", motivo: "no_le_interesa" }, peligro: true },
];

/**
 * Hoja de "¿Cómo te fue?": aparece al volver de WhatsApp o de una llamada.
 * Un toque registra el resultado y el seguimiento se programa solo.
 */
export default function ComoTeFue({
  leadId,
  nombre,
  medio,
  onCerrar,
  onGuardado,
}: {
  leadId: string;
  nombre: string;
  medio: "whatsapp" | "llamada";
  onCerrar: () => void;
  onGuardado: () => void;
}) {
  const [enviando, iniciar] = useTransition();
  const [error, setError] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [verNota, setVerNota] = useState(false);
  const [nota, setNota] = useState("");
  const [listo, setListo] = useState<string | null>(null);
  const primero = useRef<HTMLButtonElement>(null);
  const primerNombre = nombreCorto(nombre);

  useEffect(() => {
    primero.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [onCerrar]);

  // Después de guardar se muestra la confirmación un momento y se cierra.
  useEffect(() => {
    if (listo === null) return;
    const t = setTimeout(onGuardado, 1800);
    return () => clearTimeout(t);
  }, [listo, onGuardado]);

  const elegir = (o: Opcion) => {
    if (o.peligro && !confirmar) return setConfirmar(true);
    const f = new FormData();
    f.set("leadId", leadId);
    for (const [k, v] of Object.entries(o.campos)) f.set(k, v);
    if (nota.trim()) f.set("nota", nota.trim());
    setError("");
    iniciar(async () => {
      const r = await actuarSobreLead(undefined, f);
      if (r?.error) return setError(r.error);
      if (o.campos.accion === "perdido") setListo(`${primerNombre} quedó como perdido.`);
      else if (r?.seguimiento)
        setListo(`Próximo contacto: ${cuando(r.seguimiento, new Date()).texto}. Te lo recordamos.`);
      else setListo("Quedó registrado.");
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button type="button" aria-label="Cerrar" onClick={onCerrar} className="absolute inset-0 bg-primary/50 backdrop-blur-[2px] cursor-default" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`ctf-${leadId}`}
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6"
      >
        <div className="sm:hidden mx-auto mb-3 h-1.5 w-10 rounded-full bg-primary/15" aria-hidden="true" />
        {listo !== null ? (
          <div className="py-6 text-center" role="status">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <p className="mt-3 text-lg font-bold text-primary">Listo</p>
            <p className="mt-1 text-sm text-muted">{listo}</p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id={`ctf-${leadId}`} className="text-xl font-bold text-primary leading-tight">
                  ¿Cómo te fue con {primerNombre}?
                </h2>
                <p className="text-sm text-muted mt-1">
                  {medio === "whatsapp" ? "Le escribiste por WhatsApp." : "Lo llamaste."} Toca una opción y queda registrado.
                </p>
              </div>
              <button type="button" onClick={onCerrar} aria-label="Cerrar" className="shrink-0 w-9 h-9 -mr-1 rounded-full hover:bg-background flex items-center justify-center text-primary/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {OPCIONES.map((o, i) => (
                <button
                  key={o.clave}
                  ref={i === 0 ? primero : undefined}
                  type="button"
                  disabled={enviando}
                  onClick={() => elegir(o)}
                  className={`min-h-14 px-3 rounded-2xl border-2 text-[15px] font-bold transition-colors disabled:opacity-60 ${
                    o.peligro
                      ? `col-span-2 ${confirmar ? "bg-red-600 border-red-600 text-white" : "border-red-200 text-red-700 hover:bg-red-50"}`
                      : "border-primary/10 text-primary hover:border-accent hover:bg-accent/10 active:bg-accent/20"
                  }`}
                >
                  {o.peligro && confirmar ? "Toca otra vez para cerrarlo como perdido" : o.texto}
                </button>
              ))}
            </div>

            {verNota ? (
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                rows={2}
                maxLength={1000}
                autoFocus
                aria-label="Nota"
                placeholder="Ej: quiere el plan para ella y su mamá"
                className="mt-3 w-full px-3 py-2 rounded-xl border border-primary/15 text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 text-[15px] resize-none"
              />
            ) : (
              <button type="button" onClick={() => setVerNota(true)} className="mt-3 text-sm font-semibold text-primary/60 hover:text-primary">
                + Agregar una nota
              </button>
            )}

            {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}

            <button type="button" onClick={onCerrar} className="mt-4 w-full text-center text-sm text-primary/50 hover:text-primary py-2">
              Lo registro después
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
