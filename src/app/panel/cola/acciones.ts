"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { miembroActual } from "@/lib/panel/sesion";
import { leadEditable } from "@/lib/panel/leads";
import { DESCANSO_DIAS, esMotivo, esResultado, puedePasar } from "@/lib/panel/reglas";
import type { Etapa } from "@/lib/panel/etiquetas";
import { INSURERS } from "@/lib/site";

const ES_ASEGURADORA = (v: string) => (INSURERS as readonly string[]).includes(v);
/** "Sura, Allianz y AXA Colpatria" */
const enLista = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`);

export type EstadoAccion = { ok?: string; error?: string } | undefined;

const ACCIONES = ["contacto", "cotizado", "ganado", "perdido", "nota", "reabrir"] as const;
type Accion = (typeof ACCIONES)[number];

/** 9:00 a. m. en Colombia (UTC-5, sin horario de verano), N días después de hoy. */
function nueveAm(dias: number): string {
  const ahora = new Date(Date.now() - 5 * 3600e3); // reloj de Bogotá
  const d = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() + dias, 14));
  return d.toISOString();
}

function fechaSeguimiento(valor: string): string | null | "invalida" {
  if (!valor) return null;
  if (valor === "manana") return nueveAm(1);
  if (valor === "3d") return nueveAm(3);
  if (valor === "7d") return nueveAm(7);
  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const d = new Date(`${valor}T14:00:00Z`); // 9:00 a. m. Colombia
    if (Number.isNaN(d.getTime())) return "invalida";
    if (d.getTime() < Date.now() - 864e5) return "invalida";
    return d.toISOString();
  }
  return "invalida";
}

const texto = (v: FormDataEntryValue | null, max = 1000) =>
  String(v ?? "").trim().replace(/\s+\n/g, "\n").slice(0, max);

export async function actuarSobreLead(_: EstadoAccion, form: FormData): Promise<EstadoAccion> {
  const sesion = await miembroActual();
  if (!sesion.ok) return { error: "Tu sesión venció. Vuelve a entrar." };
  const miembro = sesion.miembro;
  const db = getSupabase();
  if (!db) return { error: "El panel no está conectado a la base de datos." };

  const accion = String(form.get("accion")) as Accion;
  if (!ACCIONES.includes(accion)) return { error: "Acción no válida." };
  const lead = await leadEditable(String(form.get("leadId") || ""), miembro);
  // Mismo mensaje si no existe o si es de otro asesor: no se revela nada.
  if (!lead) return { error: "No encontramos ese lead en tu cola." };

  const nota = texto(form.get("nota"));
  const ahora = new Date().toISOString();
  const cambios: Record<string, unknown> = {};
  let evento: { tipo: string; detalle?: Record<string, unknown> } | null = null;
  const pasarA = (etapa: Etapa) => {
    if (!puedePasar(lead.etapa, etapa)) return false;
    cambios.etapa = etapa;
    return true;
  };

  switch (accion) {
    case "contacto": {
      const resultado = form.get("resultado");
      if (!esResultado(resultado)) return { error: "Elige cómo te fue con el contacto." };
      const elegido = fechaSeguimiento(String(form.get("seguimiento") || ""));
      if (elegido === "invalida") return { error: "La fecha de seguimiento no es válida." };
      const descanso = DESCANSO_DIAS[resultado];
      const seguimiento = elegido ?? (descanso ? nueveAm(descanso) : null);
      const primero = !lead.primer_contacto_at;
      if (lead.etapa === "nuevo") pasarA("contactado");
      Object.assign(cambios, {
        resultado_contacto: resultado,
        ultimo_contacto_at: ahora,
        proximo_seguimiento: seguimiento,
        nota_seguimiento: nota || null,
        ...(primero ? { primer_contacto_at: ahora } : {}),
      });
      evento = {
        tipo: primero ? "contactado" : "resultado",
        detalle: { resultado, seguimiento },
      };
      break;
    }
    case "cotizado": {
      if (!pasarA("cotizado")) return { error: "Este lead no se puede marcar como cotizado." };
      // Las de la lista se validan contra el catálogo; "otra" es texto libre.
      const elegidas = form.getAll("aseguradora_item").map(String).filter(ES_ASEGURADORA);
      const otra = texto(form.get("aseguradora_otra"), 80);
      const aseguradoras = enLista([...new Set(elegidas)].concat(otra ? [otra] : [])).slice(0, 200);
      evento = { tipo: "cotizado", detalle: aseguradoras ? { aseguradoras } : {} };
      cambios.proximo_seguimiento = fechaSeguimiento("3d");
      break;
    }
    case "ganado": {
      const prima = Number(String(form.get("prima") || "").replace(/[^\d]/g, ""));
      const elegida = String(form.get("aseguradora") || "");
      const aseguradora = ES_ASEGURADORA(elegida) ? elegida : elegida === "otra" ? texto(form.get("aseguradora_otra"), 80) : "";
      if (!prima || prima < 1000) return { error: "Escribe el valor de la prima." };
      if (!aseguradora) return { error: "Elige con qué aseguradora se cerró." };
      if (!pasarA("ganado")) return { error: "Este lead no se puede cerrar como ganado." };
      Object.assign(cambios, {
        prima_valor: prima,
        aseguradora_cierre: aseguradora,
        cerrado_at: ahora,
        proximo_seguimiento: null,
      });
      evento = { tipo: "ganado", detalle: { prima, aseguradora } };
      break;
    }
    case "perdido": {
      const motivo = form.get("motivo");
      if (!esMotivo(motivo)) return { error: "Elige por qué se perdió." };
      if (!pasarA("perdido")) return { error: "Este lead no se puede marcar como perdido." };
      Object.assign(cambios, { motivo_perdida: motivo, cerrado_at: ahora, proximo_seguimiento: null });
      evento = { tipo: "perdido", detalle: { motivo } };
      break;
    }
    case "reabrir": {
      if (!pasarA("contactado")) return { error: "Este lead no se puede reabrir." };
      Object.assign(cambios, { cerrado_at: null, motivo_perdida: null, proximo_seguimiento: nueveAm(0) });
      evento = { tipo: "reabierto" };
      break;
    }
    case "nota": {
      if (!nota) return { error: "Escribe la nota." };
      evento = { tipo: "nota" };
      break;
    }
  }

  if (Object.keys(cambios).length) {
    const { error } = await db.from("leads").update(cambios).eq("id", lead.id);
    if (error) return { error: "No se pudo guardar. Intenta de nuevo." };
  }
  if (evento) {
    await db.from("lead_eventos").insert({
      lead_id: lead.id,
      asesor_id: miembro.id,
      tipo: evento.tipo,
      nota: nota || null,
      detalle: evento.detalle ?? {},
    });
  }
  revalidatePath("/panel");
  return { ok: "Guardado" };
}

const ESPERA_MIN: Record<"visto" | "whatsapp" | "llamada", number> = { visto: 30, whatsapp: 2, llamada: 2 };

/**
 * Deja en el historial que alguien vio el lead o lo contactó (WhatsApp o
 * llamada). Sin repetir: la misma persona no suma otro "visto" del mismo lead
 * en 30 minutos. Nunca falla hacia la interfaz.
 */
export async function registrarVista(leadId: string, tipo: "visto" | "whatsapp" | "llamada") {
  if (!(tipo in ESPERA_MIN)) return;
  const sesion = await miembroActual();
  if (!sesion.ok) return;
  const db = getSupabase();
  if (!db) return;
  const lead = await leadEditable(leadId, sesion.miembro);
  if (!lead) return;
  const desde = new Date(Date.now() - ESPERA_MIN[tipo] * 60e3).toISOString();
  const { count } = await db
    .from("lead_eventos")
    .select("id", { count: "exact", head: true })
    .eq("lead_id", lead.id)
    .eq("asesor_id", sesion.miembro.id)
    .eq("tipo", tipo)
    .gte("created_at", desde);
  if (count) return;
  await db.from("lead_eventos").insert({ lead_id: lead.id, asesor_id: sesion.miembro.id, tipo });
}
