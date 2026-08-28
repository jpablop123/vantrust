// Formato de moneda colombiana (COP).
//
// Colombia usa el punto como separador de miles: $ 350.000.000
// Estas utilidades se usan en los campos de "valor asegurado" de los
// formularios para que el usuario vea el monto formateado mientras escribe
// (formateo retroactivo) y para que el asesor reciba el valor ya legible.

/** Máximo de dígitos aceptados en un campo de dinero (999.999.999.999). */
export const MAX_COP_DIGITS = 12;

/** Deja solo dígitos y recorta a MAX_COP_DIGITS. Ignora ceros a la izquierda. */
export function copDigits(raw: string): string {
  const digits = (raw || "").replace(/\D/g, "").slice(0, MAX_COP_DIGITS);
  const trimmed = digits.replace(/^0+(?=\d)/, "");
  return trimmed;
}

/** "50000000" -> "50.000.000". Devuelve "" si no hay dígitos. */
export function formatCOPDigits(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Formatea cualquier entrada del usuario al formato COP colombiano.
 * Acepta "50000000", "50.000.000", "50,000,000", "$ 50000000" y pegados sucios.
 */
export function formatCOPInput(raw: string): string {
  return formatCOPDigits(copDigits(raw));
}

/** Valor numérico del campo, o null si está vacío. */
export function copToNumber(raw: string): number | null {
  const digits = copDigits(raw);
  if (!digits) return null;
  return Number(digits);
}

/** Valor listo para enviar al asesor: "$ 350.000.000 COP". */
export function copForSubmit(raw: string): string {
  const formatted = formatCOPInput(raw);
  return formatted ? `$ ${formatted} COP` : "";
}

// ─────────────────────── Monto en palabras ───────────────────────
// Confirmar el monto en letras evita el error clásico de un cero de más.

const UNIDADES = [
  "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho",
  "nueve", "diez", "once", "doce", "trece", "catorce", "quince",
  "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
  "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco",
  "veintiséis", "veintisiete", "veintiocho", "veintinueve",
];

const DECENAS = [
  "", "", "veinte", "treinta", "cuarenta", "cincuenta",
  "sesenta", "setenta", "ochenta", "noventa",
];

const CENTENAS = [
  "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
  "seiscientos", "setecientos", "ochocientos", "novecientos",
];

/** Convierte 0–999 a palabras. */
function grupoEnPalabras(n: number): string {
  if (n === 0) return "";
  if (n === 100) return "cien";
  if (n < 30) return UNIDADES[n];
  if (n < 100) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? DECENAS[d] : `${DECENAS[d]} y ${UNIDADES[u]}`;
  }
  const c = Math.floor(n / 100);
  const resto = n % 100;
  return resto === 0
    ? CENTENAS[c]
    : `${CENTENAS[c]} ${grupoEnPalabras(resto)}`;
}

/** "uno" -> "un" cuando acompaña a mil/millón ("veintiún millones"). */
function apocopar(texto: string): string {
  if (texto === "uno") return "un";
  if (texto.endsWith("veintiuno")) return texto.replace(/veintiuno$/, "veintiún");
  if (texto.endsWith(" uno")) return texto.replace(/ uno$/, " un");
  return texto;
}

/**
 * Monto en palabras, en minúsculas y sin la moneda.
 * 350000000 -> "trescientos cincuenta millones"
 */
export function copEnPalabras(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "";
  if (n === 0) return "cero";

  const millones = Math.floor(n / 1_000_000);
  const resto = n % 1_000_000;
  const miles = Math.floor(resto / 1000);
  const unidades = resto % 1000;

  const partes: string[] = [];

  if (millones > 0) {
    if (millones === 1) partes.push("un millón");
    else partes.push(`${apocopar(copEnPalabras(millones))} millones`);
  }
  if (miles > 0) {
    partes.push(miles === 1 ? "mil" : `${apocopar(grupoEnPalabras(miles))} mil`);
  }
  if (unidades > 0) {
    partes.push(grupoEnPalabras(unidades));
  }

  return partes.join(" ");
}

/** Texto de ayuda bajo el campo: "Trescientos cincuenta millones de pesos". */
export function copAyuda(raw: string): string {
  const n = copToNumber(raw);
  if (n === null || n === 0) return "";
  if (n === 1) return "Un peso";

  const palabras = copEnPalabras(n);
  if (!palabras) return "";
  const capitalizado = palabras.charAt(0).toUpperCase() + palabras.slice(1);

  // "de pesos" solo aplica a cifras exactas en millones ("un millón de pesos");
  // en cualquier otro caso el sustantivo va directo ("mil quinientos pesos").
  const exactoEnMillones = n >= 1_000_000 && n % 1_000_000 === 0;
  return exactoEnMillones ? `${capitalizado} de pesos` : `${capitalizado} pesos`;
}
