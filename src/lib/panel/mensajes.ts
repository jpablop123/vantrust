// Mensajes de WhatsApp para el cliente, armados con lo que ya sabemos de él.
// Regla: retomar lo que hizo (placa, cotizador, asesoría), ofrecer algo
// concreto y cerrar con UNA pregunta fácil de contestar.

import type { LeadCola } from "@/lib/panel/leads";
import { etiquetaRamo } from "@/lib/panel/etiquetas";
import { capturaDe } from "@/lib/panel/origen";
import { esEmpresa, nombreCorto } from "@/lib/panel/proxima";

export interface Plantilla {
  clave: string;
  titulo: string;
  texto: string;
}

/** Busca un dato del formulario sin importar mayúsculas ni tildes. */
function dato(lead: LeadCola, ...claves: string[]): string {
  const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const buscadas = claves.map(norm);
  for (const [k, v] of Object.entries(lead.detalles ?? {})) {
    if (v && buscadas.some((b) => norm(k).includes(b))) return String(v).trim();
  }
  return "";
}

/** Pregunta de arranque según el ramo, saltando lo que el cliente ya contó. */
function preguntaInicial(lead: LeadCola): string {
  switch (lead.tipo_seguro) {
    case "vehiculo":
    case "auto":
      return dato(lead, "uso")
        ? "¿Te parece si te comparto por aquí las opciones?"
        : "Para afinarte el precio: ¿el carro es de uso particular o de trabajo?";
    case "salud":
      return dato(lead, "personas", "integrantes", "beneficiarios")
        ? "¿Tienes alguna EPS o prepagada en este momento?"
        : "¿El plan sería solo para ti o también para tu familia?";
    case "hogar":
    case "vivienda":
      return "¿La vivienda es propia o arrendada?";
    case "vida":
      return "¿Lo buscas para proteger a tu familia o para respaldar un crédito?";
    case "pyme":
      return "¿A qué se dedica la empresa y cuántas personas trabajan en ella?";
    case "cumplimiento":
      return "¿Para qué contrato es la póliza y para cuándo la necesitas?";
    case "mascotas":
      return dato(lead, "edad") ? "¿Es perro o gato?" : "¿Es perro o gato, y qué edad tiene?";
    case "viajes":
      return dato(lead, "destino") ? "¿En qué fechas viajas?" : "¿A dónde viajas y en qué fechas?";
    case "exequial":
      return "¿Cuántas personas te gustaría incluir en el plan?";
    case "transporte":
      return "¿Qué tipo de mercancía transportas y en qué rutas?";
    default:
      return "¿Me cuentas un poco qué necesitas asegurar?";
  }
}

/** Qué hizo el cliente para llegar, en una frase. */
function contexto(lead: LeadCola, ramo: string): string {
  const vehiculo = [dato(lead, "marca"), dato(lead, "modelo"), dato(lead, "año", "ano")].filter(Boolean).join(" ");
  if (lead.placa) return `Vi que consultaste el seguro para la placa ${lead.placa}${vehiculo ? ` (${vehiculo})` : ""}.`;
  switch (capturaDe(lead.fuente)) {
    case "Cotizador":
      return `Recibí lo que llenaste en nuestro cotizador de ${ramo}.`;
    case "Asesoría gratuita":
      return `Recibí tu solicitud de asesoría gratuita sobre seguro de ${ramo}.`;
    case "Botón de WhatsApp":
    case "Llamada":
      return `Te escribo por tu interés en el seguro de ${ramo}.`;
    default:
      return `Recibí tu solicitud de seguro de ${ramo}.`;
  }
}

/**
 * Plantillas para este lead, la sugerida primero. `aseguradoras` son las que
 * ya se le cotizaron (del historial), si las hay.
 */
export function plantillasPara(lead: LeadCola, asesor: string, aseguradoras = ""): Plantilla[] {
  // A una persona se le saluda por su nombre; a una empresa, sin nombre
  // ("Hola Inversiones Santa Marta SAS" suena a robot).
  const hola = esEmpresa(lead.nombre) ? "Hola" : `Hola ${nombreCorto(lead.nombre)}`;
  const yo = asesor.trim().split(/\s+/)[0];
  const ramo = etiquetaRamo(lead.tipo_seguro).toLowerCase();
  const de = aseguradoras ? ` de ${aseguradoras}` : "";

  const todas: Record<string, Plantilla> = {
    primero: {
      clave: "primero",
      titulo: "Primer contacto",
      texto: `${hola}, te habla ${yo} de VanTrust 👋 ${contexto(lead, ramo)}\n\nTe comparo opciones de varias aseguradoras (Sura, Bolívar, Allianz y más) para que elijas la que más te conviene, sin costo.\n\n${preguntaInicial(lead)}`,
    },
    reintento: {
      clave: "reintento",
      titulo: "No contestó",
      texto: `${hola}, te escribo de nuevo de VanTrust por tu seguro de ${ramo}. Sé que a veces el día se complica 🙂\n\n¿Te queda mejor que te escriba más tarde o mañana?`,
    },
    cotizacion: {
      clave: "cotizacion",
      titulo: "Enviar cotización",
      texto: `${hola}, ya tengo las opciones para tu seguro de ${ramo}${lead.placa ? ` (placa ${lead.placa})` : ""}. Te las resumo:\n\n1. \n2. \n3. \n\n¿Cuál te llama más la atención?`,
    },
    seguimiento: {
      clave: "seguimiento",
      titulo: "¿Revisó la cotización?",
      texto: `${hola}, ¿pudiste revisar las opciones${de} que te envié? Si quieres las vemos juntos en 5 minutos por llamada.`,
    },
    retomar: {
      clave: "retomar",
      titulo: "Lo va a pensar",
      texto: `${hola}, ¿cómo vas con la decisión del seguro de ${ramo}? Si te queda alguna duda sobre coberturas o precio, te la resuelvo sin compromiso.`,
    },
    otra: {
      clave: "otra",
      titulo: "Precio alto",
      texto: `${hola}, estuve buscando otra alternativa para tu seguro de ${ramo} que se ajuste mejor a tu presupuesto. ¿Te la comparto?`,
    },
    vencimiento: {
      clave: "vencimiento",
      titulo: "Ya tiene seguro",
      texto: `${hola}, ¿en qué fecha se te vence la póliza actual? Te escribo unos días antes y te comparo opciones para que no pagues de más.`,
    },
  };

  const r = lead.resultado_contacto;
  const sugerida =
    lead.etapa === "nuevo"
      ? "primero"
      : lead.etapa === "cotizado"
        ? "seguimiento"
        : r === "no_contesto"
          ? "reintento"
          : r === "interesado"
            ? "cotizacion"
            : r === "lo_va_a_pensar"
              ? "retomar"
              : r === "precio_alto"
                ? "otra"
                : r === "ya_tiene"
                  ? "vencimiento"
                  : "retomar";
  return [todas[sugerida], ...Object.values(todas).filter((p) => p.clave !== sugerida)];
}

/** Enlace de WhatsApp al cliente con el texto ya escrito. */
export function enlaceWhatsApp(lead: LeadCola, texto: string): string {
  const tel = lead.telefono.replace(/\D/g, "").slice(-10);
  return `https://wa.me/57${tel}?text=${encodeURIComponent(texto)}`;
}

/** Datos del lead que sirven para cotizar, en orden de utilidad. */
export function datosParaCotizar(lead: LeadCola): { k: string; v: string }[] {
  const r: { k: string; v: string }[] = [];
  if (lead.placa) r.push({ k: "Placa", v: lead.placa });
  for (const [k, v] of Object.entries(lead.detalles ?? {})) if (v) r.push({ k, v: String(v) });
  if (lead.ciudad) r.push({ k: "Ciudad", v: lead.ciudad });
  if (lead.email) r.push({ k: "Correo", v: lead.email });
  return r;
}
