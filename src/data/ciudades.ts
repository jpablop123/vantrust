// Ciudades con páginas locales. Se arranca solo con Barranquilla; se abre otra
// ciudad cuando Barranquilla ya esté rankeando (PLAN-SEO, estrategia).

export interface Ciudad {
  slug: string;
  nombre: string;
  departamento: string;
}

export const CIUDADES: Ciudad[] = [
  { slug: "barranquilla", nombre: "Barranquilla", departamento: "Atlántico" },
];

export function getCiudad(slug: string): Ciudad | undefined {
  return CIUDADES.find((c) => c.slug === slug);
}
