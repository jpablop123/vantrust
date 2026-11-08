// Validaciones compartidas entre cliente y servidor.

/** Quita el indicativo de país para que pegar "+57 300 123 4567" funcione. */
export function normalizarCelular(v: string): string {
  let digits = (v || "").replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("57")) digits = digits.slice(2);
  return digits.slice(0, 10);
}

/** Celular colombiano: 10 dígitos que empiezan por 3. */
export function celularValido(v: string): boolean {
  const d = normalizarCelular(v);
  return d.length === 10 && d.startsWith("3");
}

export const CELULAR_ERROR = "Ingresa un celular colombiano válido (ej: 3001234567)";

/**
 * Placa colombiana: carro ABC123, moto ABC12D. Se normaliza a mayúsculas y
 * sin espacios ni guiones. Devuelve "" si no tiene forma de placa.
 */
export function normalizarPlaca(v: string): string {
  return (v || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

export function placaValida(v: string): boolean {
  return /^[A-Z]{3}\d{3}$|^[A-Z]{3}\d{2}[A-Z]$/.test(normalizarPlaca(v));
}
