// Placa escrita en el hero que el cotizador debe precargar.
// Si el formulario ya está montado le llega por el evento; si se monta después
// (p. ej. la persona venía en la pestaña Salud), la lee al iniciar.

export const EVENTO_PLACA = "vt-placa";

let pendiente = "";

export function enviarPlaca(placa: string) {
  pendiente = placa;
  window.dispatchEvent(new CustomEvent(EVENTO_PLACA, { detail: placa }));
}

/** Devuelve la placa pendiente y la consume. */
export function tomarPlacaPendiente(): string {
  const p = pendiente;
  pendiente = "";
  return p;
}
