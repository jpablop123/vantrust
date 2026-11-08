// Datos reales que faltan en páginas sueltas. Mientras haya algo aquí, la
// página sale en noindex y fuera del sitemap.
import { TODO_NEGOCIO } from "@/lib/negocio";

export const TODO_SINIESTROS = [
  "Tabla con la línea de asistencia de cada aseguradora aliada (número oficial verificado).",
  "Revisión del asesor: pasos y referencias legales para choques simples (sin heridos).",
  "Tiempo real de respuesta del asesor en un siniestro y horario de atención fuera de oficina.",
];

export const TODO_SOBRE = [
  "Número de inscripción en el Registro Único de Intermediarios (RUI).",
  "Año de fundación / años operando.",
  "Equipo con nombres reales, cargo y foto.",
  ...TODO_NEGOCIO,
];
