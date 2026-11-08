// Datos compartidos de renovaciones (cliente y servidor).

export const RAMOS_RENOVACION: { value: string; label: string }[] = [
  { value: "vehiculo", label: "Automóvil" },
  { value: "hogar", label: "Hogar" },
  { value: "salud", label: "Salud" },
  { value: "pyme", label: "Empresa / pyme" },
];

export const RAMO_RENOVACION_LABEL: Record<string, string> = Object.fromEntries(
  RAMOS_RENOVACION.map((r) => [r.value, r.label])
);

/** Hoy en Colombia como YYYY-MM-DD (el servidor corre en UTC). */
export function hoyBogota(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

/** Días entre hoy (Bogotá) y una fecha YYYY-MM-DD. Negativo si ya pasó. */
export function diasHasta(fecha: string): number {
  const a = Date.parse(`${hoyBogota()}T00:00:00Z`);
  const b = Date.parse(`${fecha}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

/** Una póliza dura un año: más de ~13 meses no es una fecha de vencimiento real. */
export const MAX_DIAS_VENCIMIENTO = 400;
export const DIAS_AVISO = 30;
