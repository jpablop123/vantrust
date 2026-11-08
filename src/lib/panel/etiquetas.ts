// Textos del panel: ramos, etapas, resultados y motivos.

const RAMOS: Record<string, string> = {
  vehiculo: "Automóvil",
  auto: "Automóvil",
  salud: "Salud",
  hogar: "Hogar",
  vivienda: "Hogar",
  vida: "Vida",
  accidentes: "Accidentes personales",
  exequial: "Exequial",
  viajes: "Viajes",
  mascotas: "Mascotas",
  pyme: "Pyme",
  cumplimiento: "Cumplimiento",
  rc: "Responsabilidad civil",
  transporte: "Transporte de mercancías",
  todo_riesgo: "Todo riesgo",
  otro: "Sin definir",
};

export function etiquetaRamo(tipo: string | null | undefined): string {
  if (!tipo) return "Sin definir";
  return RAMOS[tipo] ?? tipo.replace(/[-_]/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export const ETAPAS = ["nuevo", "contactado", "cotizado", "ganado", "perdido", "archivado"] as const;
export type Etapa = (typeof ETAPAS)[number];

export const ETIQUETA_ETAPA: Record<Etapa, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cotizado: "Cotizado",
  ganado: "Ganado",
  perdido: "Perdido",
  archivado: "Archivado",
};

export const RESULTADOS = [
  { valor: "interesado", texto: "Interesado" },
  { valor: "no_contesto", texto: "No contestó" },
  { valor: "lo_va_a_pensar", texto: "Lo va a pensar" },
  { valor: "precio_alto", texto: "Precio alto" },
  { valor: "ya_tiene", texto: "Ya tiene seguro" },
  { valor: "otro", texto: "Otro" },
] as const;
export type Resultado = (typeof RESULTADOS)[number]["valor"];

export const MOTIVOS_PERDIDA = [
  { valor: "precio", texto: "Precio" },
  { valor: "ya_tiene", texto: "Ya tiene seguro" },
  { valor: "no_contesta", texto: "No contesta" },
  { valor: "no_califica", texto: "No califica" },
  { valor: "no_le_interesa", texto: "No le interesa" },
  { valor: "otro", texto: "Otro" },
] as const;
export type MotivoPerdida = (typeof MOTIVOS_PERDIDA)[number]["valor"];

export const textoResultado = (v: string | null) =>
  RESULTADOS.find((r) => r.valor === v)?.texto ?? "";
export const textoMotivo = (v: string | null) =>
  MOTIVOS_PERDIDA.find((m) => m.valor === v)?.texto ?? "";
