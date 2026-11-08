// Reglas del seguimiento comercial. Sin dependencias de servidor: las usan
// tanto las acciones (validación) como la interfaz (qué botones mostrar).

import type { Etapa, MotivoPerdida, Resultado } from "@/lib/panel/etiquetas";
import { MOTIVOS_PERDIDA, RESULTADOS } from "@/lib/panel/etiquetas";

export const esResultado = (v: unknown): v is Resultado =>
  RESULTADOS.some((r) => r.valor === v);
export const esMotivo = (v: unknown): v is MotivoPerdida =>
  MOTIVOS_PERDIDA.some((m) => m.valor === v);

/** Etapas abiertas: el lead sigue en la cola. */
export const ABIERTAS: Etapa[] = ["nuevo", "contactado", "cotizado"];

/** A qué etapas se puede pasar desde cada una. */
const TRANSICIONES: Record<Etapa, Etapa[]> = {
  nuevo: ["contactado", "cotizado", "ganado", "perdido"],
  contactado: ["cotizado", "ganado", "perdido"],
  cotizado: ["ganado", "perdido", "contactado"],
  ganado: [],
  perdido: ["contactado"], // "volvió a escribir"
  archivado: ["contactado"],
};

export function puedePasar(de: Etapa, a: Etapa): boolean {
  return de === a || TRANSICIONES[de].includes(a);
}

/** Días que un lead descansa según el resultado si no se fija seguimiento. */
export const DESCANSO_DIAS: Partial<Record<Resultado, number>> = {
  no_contesto: 1,
  interesado: 2,
  lo_va_a_pensar: 5,
  precio_alto: 3,
};

export type Urgencia = "urgente" | "atender" | "reciente" | "frio";

/**
 * Qué tan urgente es un lead sin contactar. La respuesta en la primera hora
 * es la que más convierte: menos de 15 min es "reciente", hasta 4 h hay que
 * atenderlo ya, y pasado un día se enfría.
 */
export function urgenciaNuevo(creado: Date, ahora: Date): { nivel: Urgencia; minutos: number } {
  const minutos = Math.max(0, Math.round((ahora.getTime() - creado.getTime()) / 60000));
  if (minutos < 15) return { nivel: "reciente", minutos };
  if (minutos < 60) return { nivel: "atender", minutos };
  if (minutos < 24 * 60) return { nivel: "urgente", minutos };
  return { nivel: "frio", minutos };
}

export function hace(minutos: number): string {
  if (minutos < 1) return "ahora";
  if (minutos < 60) return `hace ${minutos} min`;
  const h = Math.floor(minutos / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return d === 1 ? "hace 1 día" : `hace ${d} días`;
}
