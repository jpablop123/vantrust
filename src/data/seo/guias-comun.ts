// Pendientes que comparten todas las guías. Mientras una guía tenga `todo`,
// queda en noindex y fuera del sitemap (ver guiaPublicable en guias.ts).

export const PENDIENTE_REVISION = [
  "Autor: asesor real de VanTrust con nombre, cargo y foto.",
  "Revisión y aprobación del texto por un asesor (llenar `revisadoPor`).",
];

/** Para las guías que abren con un caso: nada de testimonios inventados. */
export const PENDIENTE_CASO =
  "El caso es ilustrativo (personaje y cifras hipotéticos, así rotulado). Reemplazarlo por un caso real solo con autorización escrita del cliente; si no, dejarlo rotulado como ilustrativo.";
