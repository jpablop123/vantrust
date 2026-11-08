// Qué tiene que hacer el asesor con cada lead, en una frase, y si quedó un
// intento de contacto sin registrar. Sin dependencias de servidor.

import type { LeadCola } from "@/lib/panel/leads";
import { textoMotivo } from "@/lib/panel/etiquetas";
import { hace, urgenciaNuevo } from "@/lib/panel/reglas";

export type Tono = "verde" | "ambar" | "rojo" | "gris" | "azul";

const INTENTOS = ["whatsapp", "llamada"];
const REGISTROS = ["contactado", "resultado", "cotizado", "ganado", "perdido", "reabierto"];

/**
 * Último intento de contacto (WhatsApp o llamada) que todavía no tiene
 * resultado registrado después. null si no hay ninguno pendiente.
 */
export function intentoSinRegistrar(eventos: { tipo: string; created_at: string }[]): string | null {
  let intento = 0;
  let registro = 0;
  let iso: string | null = null;
  for (const e of eventos) {
    const t = Date.parse(e.created_at);
    if (INTENTOS.includes(e.tipo) && t > intento) {
      intento = t;
      iso = e.created_at;
    }
    if (REGISTROS.includes(e.tipo) && t > registro) registro = t;
  }
  return intento > registro ? iso : null;
}

const DIA = 864e5;
/** Día calendario de Colombia (UTC-5) como AAAA-MM-DD. */
const diaCo = (d: Date) => new Date(d.getTime() - 5 * 3600e3).toISOString().slice(0, 10);
const hora = (d: Date) =>
  new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", hour: "numeric", minute: "2-digit" })
    .format(d)
    // Espacio duro: "9:00 a. m." no se parte en dos líneas.
    .replace(/\s/g, "\u00a0");

/** "hoy 9:00 a. m.", "mañana 9:00 a. m.", "ayer", "jueves", "12 nov". */
export function cuando(iso: string, ahora: Date): { texto: string; dias: number } {
  const d = new Date(iso);
  const dias = Math.round((Date.parse(diaCo(d)) - Date.parse(diaCo(ahora))) / DIA);
  let texto: string;
  if (dias === 0) texto = `hoy ${hora(d)}`;
  else if (dias === 1) texto = `mañana ${hora(d)}`;
  else if (dias === -1) texto = "ayer";
  else if (dias < -1) texto = `${-dias} días`;
  else if (dias < 7)
    texto = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", weekday: "long" }).format(d);
  else
    texto = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", day: "numeric", month: "short" })
      .format(d)
      .replace(/\s/g, " ");
  return { texto, dias };
}

const duracion = (min: number) => hace(min).replace(/^hace /, "");
const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n).replace(/\s/g, " ");

const VERBO: Record<string, string> = {
  no_contesto: "Vuelve a intentar",
  interesado: "Envíale la cotización",
  lo_va_a_pensar: "Retoma la conversación",
  precio_alto: "Ofrécele otra opción",
  ya_tiene: "Pregunta cuándo vence su póliza",
};

/** La frase de la fila: qué hacer ahora con este lead. */
export function proximaAccion(lead: LeadCola, ahora: Date, intento: string | null): { texto: string; tono: Tono } {
  if (lead.etapa === "ganado")
    return {
      texto: ["Ganado", lead.prima_valor ? pesos(lead.prima_valor) : "", lead.aseguradora_cierre ?? ""].filter(Boolean).join(" · "),
      tono: "verde",
    };
  if (lead.etapa === "perdido" || lead.etapa === "archivado")
    return { texto: `Perdido${lead.motivo_perdida ? ` · ${textoMotivo(lead.motivo_perdida)}` : ""}`, tono: "gris" };

  if (intento) {
    const min = Math.max(0, Math.round((ahora.getTime() - Date.parse(intento)) / 60000));
    return { texto: `Le escribiste ${hace(min)}`, tono: "azul" };
  }

  if (lead.etapa === "nuevo") {
    const u = urgenciaNuevo(new Date(lead.created_at), ahora);
    if (u.nivel === "frio") return { texto: `Sin contactar hace ${duracion(u.minutos)}`, tono: "gris" };
    const tono: Tono = u.nivel === "reciente" ? "verde" : u.nivel === "atender" ? "ambar" : "rojo";
    return { texto: `Escríbele ya · lleva ${duracion(u.minutos)}`, tono };
  }

  const verbo =
    lead.etapa === "cotizado" ? "Pregunta por la cotización" : VERBO[lead.resultado_contacto ?? ""] ?? "Haz seguimiento";
  if (!lead.proximo_seguimiento) return { texto: verbo, tono: "ambar" };
  const c = cuando(lead.proximo_seguimiento, ahora);
  if (c.dias < 0) return { texto: `${verbo} · atrasado ${c.dias === -1 ? "desde ayer" : c.texto}`, tono: "rojo" };
  if (c.dias === 0) return { texto: `${verbo} · ${c.texto}`, tono: "ambar" };
  return { texto: `${verbo} · ${c.texto}`, tono: "gris" };
}
