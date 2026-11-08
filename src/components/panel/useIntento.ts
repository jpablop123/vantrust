"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { registrarVista } from "@/app/panel/cola/acciones";
import { useHojaContacto } from "@/components/panel/HojaContacto";
import { intentoSinRegistrar } from "@/lib/panel/proxima";
import type { EventoLead, LeadCola } from "@/lib/panel/leads";

type Medio = "whatsapp" | "llamada";

/**
 * Intento de contacto de un lead: tocar WhatsApp o llamar lo registra (frena
 * la alerta y la reasignación) y, al volver al panel, abre "¿Cómo te fue?".
 * Si no se registra el resultado, `pendiente` queda en true.
 */
export function useIntento(lead: LeadCola, eventos: EventoLead[]) {
  const router = useRouter();
  const abrirHoja = useHojaContacto();
  // Intento hecho en esta pantalla (antes de que llegue del servidor) y
  // momento del último resultado registrado aquí.
  const [intentoLocal, setIntentoLocal] = useState<{ medio: Medio; t: number } | null>(null);
  const [registradoLocal, setRegistradoLocal] = useState(0);
  const esperando = useRef<{ medio: Medio; seFue: boolean } | null>(null);

  const abierto = ["nuevo", "contactado", "cotizado"].includes(lead.etapa);
  const isoServidor = intentoSinRegistrar(eventos);
  const tServidor = isoServidor ? Date.parse(isoServidor) : 0;
  const tIntento = Math.max(tServidor, intentoLocal?.t ?? 0);
  const pendiente = abierto && tIntento > 0 && tIntento > registradoLocal;
  const medio: Medio =
    intentoLocal && intentoLocal.t >= tServidor
      ? intentoLocal.medio
      : eventos.find((e) => e.created_at === isoServidor)?.tipo === "llamada" ? "llamada" : "whatsapp";

  const preguntar = (m: Medio = medio) =>
    abrirHoja({
      leadId: lead.id,
      nombre: lead.nombre,
      medio: m,
      onGuardado: () => {
        setIntentoLocal(null);
        setRegistradoLocal(Date.now());
        router.refresh();
      },
    });

  const intentar = (m: Medio) => {
    registrarVista(lead.id, m).then(() => router.refresh());
    setIntentoLocal({ medio: m, t: Date.now() });
    esperando.current = { medio: m, seFue: false };
  };

  // El listener se registra una vez; siempre llama a la versión actual.
  const preguntarRef = useRef(preguntar);
  useEffect(() => {
    preguntarRef.current = preguntar;
  });

  useEffect(() => {
    const salir = () => {
      if (esperando.current && document.visibilityState === "hidden") esperando.current.seFue = true;
    };
    const desenfocar = () => {
      if (esperando.current) esperando.current.seFue = true;
    };
    const volver = () => {
      if (document.visibilityState !== "visible" || !esperando.current?.seFue) return;
      const m = esperando.current.medio;
      esperando.current = null;
      preguntarRef.current(m);
    };
    document.addEventListener("visibilitychange", salir);
    document.addEventListener("visibilitychange", volver);
    window.addEventListener("blur", desenfocar);
    window.addEventListener("focus", volver);
    return () => {
      document.removeEventListener("visibilitychange", salir);
      document.removeEventListener("visibilitychange", volver);
      window.removeEventListener("blur", desenfocar);
      window.removeEventListener("focus", volver);
    };
  }, []);

  return {
    pendiente,
    medio,
    /** Momento del intento pendiente, en ISO (o null). */
    intentoIso: pendiente ? new Date(tIntento).toISOString() : null,
    intentar,
    preguntar,
    marcarRegistrado: () => setRegistradoLocal(Date.now()),
  };
}
