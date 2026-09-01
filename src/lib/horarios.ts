// Franjas de contacto preferido.
//
// Fuente única: lo que el cliente ve en el formulario y lo que se le informa al
// asesor salen de aquí. Tenerlo duplicado hacía que el cliente eligiera
// "Noche (6pm - 8pm)" y al asesor le llegara "Noche (5pm - 8pm)", con una hora
// de diferencia a favor de llamar antes de lo acordado.

export interface Horario {
  id: string;
  label: string;
  rango: string;
  /** Hora en que vence la franja, para el mensaje de "te llamamos antes de…". */
  limite: string;
}

export const HORARIOS: Horario[] = [
  { id: "manana", label: "Mañana", rango: "8am - 12pm", limite: "12:00 p.m." },
  { id: "tarde", label: "Tarde", rango: "12pm - 6pm", limite: "6:00 p.m." },
  { id: "noche", label: "Noche", rango: "6pm - 8pm", limite: "8:00 p.m." },
];

/** "tarde" -> "Tarde (12pm - 6pm)". Usado en el correo y en Telegram. */
export const HORARIO_LABELS: Record<string, string> = {
  ...Object.fromEntries(HORARIOS.map((h) => [h.id, `${h.label} (${h.rango})`])),
  cualquiera: "Cualquier horario",
};

export function limiteDe(id: string): string {
  return HORARIOS.find((h) => h.id === id)?.limite ?? "aproximadamente 1 hora";
}
