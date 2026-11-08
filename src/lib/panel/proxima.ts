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

export interface Proxima {
  /** Frase completa: "Pregunta por la cotización · hoy 9:00 a. m." */
  texto: string;
  tono: Tono;
  /** Solo la acción: "Pregunta por la cotización". */
  accion: string;
  /** Solo el cuándo: "Hoy 9:00 a. m.", "Atrasado 2 días", "38 min". */
  cuando: string;
  /** El cuándo para la fila, lo más corto posible: "9:00 a. m.", "2 d tarde". */
  corto: string;
}

const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Qué hacer ahora con este lead (la frase de la fila). */
export function proximaAccion(lead: LeadCola, ahora: Date, intento: string | null): Proxima {
  const p = (accion: string, cuando: string, tono: Tono, corto = cuando): Proxima => ({
    texto: cuando ? `${accion} · ${cuando.charAt(0).toLowerCase()}${cuando.slice(1)}` : accion,
    tono,
    accion,
    cuando,
    corto,
  });

  if (lead.etapa === "ganado")
    return p(["Ganado", lead.prima_valor ? pesos(lead.prima_valor) : ""].filter(Boolean).join(" · "), lead.aseguradora_cierre ?? "", "verde");
  if (lead.etapa === "perdido" || lead.etapa === "archivado")
    return p("Perdido", lead.motivo_perdida ? textoMotivo(lead.motivo_perdida) : "", "gris");

  if (intento) {
    const min = Math.max(0, Math.round((ahora.getTime() - Date.parse(intento)) / 60000));
    return { ...p("Le escribiste", mayuscula(hace(min)), "azul", duracion(min)), texto: `Le escribiste ${hace(min)}` };
  }

  if (lead.etapa === "nuevo") {
    const u = urgenciaNuevo(new Date(lead.created_at), ahora);
    if (u.nivel === "frio") return { ...p("Sin contactar", duracion(u.minutos), "gris"), texto: `Sin contactar hace ${duracion(u.minutos)}` };
    const tono: Tono = u.nivel === "reciente" ? "verde" : u.nivel === "atender" ? "ambar" : "rojo";
    return { ...p("Escríbele ya", duracion(u.minutos), tono), texto: `Escríbele ya · lleva ${duracion(u.minutos)}` };
  }

  const verbo =
    lead.etapa === "cotizado" ? "Sigue la cotización" : VERBO[lead.resultado_contacto ?? ""] ?? "Haz seguimiento";
  if (!lead.proximo_seguimiento) return p(verbo, "", "ambar");
  const c = cuando(lead.proximo_seguimiento, ahora);
  if (c.dias < 0)
    return p(verbo, c.dias === -1 ? "Atrasado desde ayer" : `Atrasado ${c.texto}`, "rojo", c.dias === -1 ? "Ayer" : `${-c.dias} d tarde`);
  const corto = c.dias === 0 ? c.texto.replace(/^hoy\s/, "") : c.dias === 1 ? "Mañana" : mayuscula(c.texto);
  return p(verbo, mayuscula(c.texto), c.dias === 0 ? "ambar" : "gris", corto);
}

/** ¿El nombre es de una empresa? (SAS, S.A.S., S.A., E.U. en mayúscula; Ltda.) */
export function esEmpresa(nombre: string): boolean {
  const n = nombre.trim();
  return /\b(S\.?\s?A\.?\s?S|S\.\s?A|SA|E\.?\s?U)\.?$/.test(n) || /\bltda\.?$/i.test(n);
}

/** Cómo nombrar al cliente en una frase: primer nombre, o completo si es empresa. */
export function nombreCorto(nombre: string): string {
  const n = nombre.trim();
  return esEmpresa(n) ? n : n.split(/\s+/)[0];
}
