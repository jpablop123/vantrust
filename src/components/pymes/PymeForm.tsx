"use client";

import RamoForm, { type FieldDef } from "@/components/cotizador/RamoForm";

// Formulario de las landings /pymes/*. Paso 1: nombre + WhatsApp + habeas data
// (crea el lead y Telegram lo marca 🔥). Paso 2, opcional: datos de la empresa
// y del contrato. La página la renderiza dentro de una sección de fondo oscuro.

/** Slug de seguros.ts → clave de ramo que usa /api/leads (todas son 🔥). */
const RAMO_DE_SLUG: Record<string, string> = {
  cumplimiento: "cumplimiento",
  "responsabilidad-civil-extracontractual": "rc",
  "transporte-de-mercancias": "transporte",
  "todo-riesgo-danos-materiales": "todo_riesgo",
};

const EMPRESA: FieldDef[] = [
  { name: "nombre", label: "Tu nombre", required: true },
  { name: "celular", label: "WhatsApp", type: "tel", required: true },
  { name: "empresa", label: "Empresa", half: true },
  { name: "nit", label: "NIT (opcional)", half: true, placeholder: "900.123.456-7" },
];

const CONTACTO_FINAL: FieldDef[] = [
  { name: "ciudad", label: "Ciudad", half: true },
  { name: "correo", label: "Correo", type: "email", half: true },
];

const CAMPOS: Record<string, FieldDef[]> = {
  cumplimiento: [
    {
      name: "tipo_contrato",
      label: "Tipo de contrato o licitación",
      type: "select",
      options: [
        "Licitación pública",
        "Contrato con entidad pública",
        "Contrato entre privados",
        "Arrendamiento",
        "Otro",
      ],
    },
    { name: "entidad", label: "Entidad o empresa contratante", placeholder: "Ej: Alcaldía de Barranquilla" },
    { name: "valor_contrato", label: "Valor aproximado del contrato", type: "currency", half: true },
    { name: "fecha_cierre", label: "Fecha de cierre o firma", type: "date", half: true },
  ],
  rc: [
    { name: "actividad", label: "Actividad de la empresa", placeholder: "Ej: construcción, restaurante, eventos" },
    { name: "empleados", label: "Número de empleados", type: "number", half: true, min: 1 },
    { name: "valor_asegurado", label: "Valor asegurado que buscas", type: "currency", half: true },
  ],
  transporte: [
    { name: "mercancia", label: "¿Qué mercancía transportas?" },
    { name: "rutas", label: "Origen y destino habituales", placeholder: "Ej: Barranquilla – Bogotá" },
    { name: "valor_anual", label: "Valor aproximado movilizado al año", type: "currency", half: true },
    {
      name: "vehiculos",
      label: "¿Vehículos propios?",
      type: "select",
      options: ["Propios", "Terceros", "Ambos"],
      half: true,
    },
  ],
  todo_riesgo: [
    { name: "actividad", label: "Actividad de la empresa" },
    { name: "valor_activos", label: "Valor aproximado de los activos", type: "currency", half: true },
    { name: "direccion", label: "Dirección del predio", half: true },
  ],
};

const SUBMIT: Record<string, string> = {
  cumplimiento: "Cotizar mi póliza de cumplimiento",
  rc: "Cotizar mi póliza de RC",
  transporte: "Cotizar el seguro de mi carga",
  todo_riesgo: "Cotizar mi póliza todo riesgo",
};

export default function PymeForm({
  seguroSlug,
  fuente,
}: {
  seguroSlug: string;
  fuente: string;
}) {
  const ramo = RAMO_DE_SLUG[seguroSlug] ?? "pyme";
  const fields = [...EMPRESA, ...(CAMPOS[ramo] ?? []), ...CONTACTO_FINAL];
  return (
    <RamoForm
      tipoSeguro={ramo}
      fields={fields}
      fuente={fuente}
      submitLabel={SUBMIT[ramo] ?? "Quiero que me asesoren"}
    />
  );
}
