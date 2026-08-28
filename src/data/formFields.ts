import type { FieldDef } from "@/components/cotizador/RamoForm";

// Esquemas de campos por ramo. Los nombres "nombre", "correo", "celular",
// "ciudad" se mapean a los campos estándar del lead; el resto va a "detalles".

const SEXO = ["Masculino", "Femenino", "Otro"];
const SI_NO = ["Sí", "No"];

// Nadie nace en el futuro: tope para los campos de fecha de nacimiento.
const HOY = new Date().toISOString().slice(0, 10);

export const RAMO_FIELDS: Record<string, FieldDef[]> = {
  salud: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "documento", label: "Documento", required: true, half: true },
    { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date", half: true, max: HOY },
    { name: "sexo", label: "Sexo", type: "select", options: SEXO, half: true },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    {
      name: "tiene_eps",
      label: "¿Actualmente tiene EPS?",
      type: "select",
      options: SI_NO,
      half: true,
      reveal: {
        when: "Sí",
        field: {
          name: "eps",
          label: "¿Cuál EPS?",
          placeholder: "Ej: Sura, Sanitas, Nueva EPS, Compensar…",
        },
      },
    },
    {
      name: "prepagada",
      label: "¿Tiene medicina prepagada?",
      type: "select",
      options: SI_NO,
      half: true,
      reveal: {
        when: "Sí",
        field: {
          name: "prepagada_cual",
          label: "¿Cuál medicina prepagada?",
          placeholder: "Ej: Colsanitas, Medisanitas, Coomeva…",
        },
      },
    },
    {
      name: "beneficiarios",
      label: "Beneficiarios (documento, fecha de nacimiento y parentesco)",
      type: "textarea",
      placeholder: "Ej: 1023456789 · 12/05/2015 · hijo",
    },
  ],
  hogar: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "documento", label: "Documento", required: true, half: true },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
    { name: "direccion", label: "Dirección" },
    { name: "valor_vivienda", label: "Valor asegurado de la vivienda", type: "currency", half: true },
    { name: "valor_muebles", label: "Valor asegurado de muebles y enseres", type: "currency", half: true },
    {
      name: "valor_electronicos",
      label: "Valor asegurado de equipos electrónicos",
      type: "currency",
      half: true,
    },
    {
      name: "tiene_joyas",
      label: "¿Tiene joyas?",
      type: "select",
      options: SI_NO,
      half: true,
      reveal: {
        when: "Sí",
        field: {
          name: "joyas_valor",
          label: "Valor asegurado de joyas",
          type: "currency",
        },
      },
    },
    {
      name: "tiene_arte",
      label: "¿Tiene obras de arte?",
      type: "select",
      options: SI_NO,
      half: true,
      reveal: {
        when: "Sí",
        field: {
          name: "arte_valor",
          label: "Valor asegurado de obras de arte",
          type: "currency",
        },
      },
    },
  ],
  vida: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "documento", label: "Documento", required: true, half: true },
    { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date", half: true, max: HOY },
    { name: "profesion", label: "Profesión", half: true },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
    { name: "valor_asegurado", label: "Valor asegurado", type: "currency", half: true },
  ],
  accidentes: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "documento", label: "Documento", required: true, half: true },
    { name: "edad", label: "Edad", type: "number", half: true, min: 0, max: 120 },
    { name: "profesion", label: "Profesión", half: true },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
  ],
  exequial: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "personas", label: "Número de personas", type: "number", half: true, min: 1, max: 20 },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
  ],
  viajes: [
    { name: "nombre", label: "Nombre completo", required: true },
    { name: "destino", label: "Destino", half: true },
    { name: "viajeros", label: "Número de viajeros", type: "number", half: true, min: 1, max: 20 },
    { name: "fecha_salida", label: "Fecha de salida", type: "date", half: true, min: HOY },
    { name: "fecha_regreso", label: "Fecha de regreso", type: "date", half: true, min: HOY },
    { name: "edades", label: "Edades de los viajeros", half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
  ],
  mascotas: [
    { name: "nombre", label: "Tu nombre completo", required: true },
    { name: "mascota", label: "Nombre de la mascota", half: true },
    { name: "especie", label: "Especie", half: true },
    { name: "raza", label: "Raza", half: true },
    { name: "edad", label: "Edad", half: true },
    { name: "ciudad", label: "Ciudad", half: true },
    { name: "correo", label: "Correo", type: "email", required: true, half: true },
    { name: "celular", label: "Celular", type: "tel", required: true, half: true },
  ],
};
