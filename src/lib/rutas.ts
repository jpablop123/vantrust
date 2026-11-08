// Inventario de rutas públicas y si se pueden indexar. Lo usan sitemap.ts y
// llms.txt, para que lo que se anuncia coincida con los noindex de cada página.

import { SEGUROS } from "@/data/seguros";
import { PAGINAS_RAMO, getPaginaPorSeguro, urlSeguro } from "@/data/seo/paginas";
import { PAGINAS_LOCALES } from "@/data/seo/locales";
import { GUIAS, guiaPublicable } from "@/data/seo/guias";
import { TODO_SINIESTROS, TODO_SOBRE } from "@/data/seo/pendientes";
import { publicable } from "@/lib/seo";

export interface Ruta {
  path: string;
  titulo: string;
  indexable: boolean;
  grupo: "principal" | "personas" | "empresas" | "local" | "guia" | "legal";
  actualizado?: string;
}

export function todasLasRutas(): Ruta[] {
  const rutas: Ruta[] = [
    { path: "/", titulo: "Inicio", indexable: true, grupo: "principal" },
    { path: "/seguros", titulo: "Todos los seguros", indexable: true, grupo: "principal" },
    { path: "/pymes", titulo: "Seguros y pólizas para pymes", indexable: true, grupo: "principal" },
    { path: "/aseguradoras", titulo: "Aseguradoras aliadas", indexable: true, grupo: "principal" },
    { path: "/renovacion", titulo: "Renovación de pólizas", indexable: true, grupo: "principal" },
    { path: "/siniestros", titulo: "Qué hacer en un siniestro", indexable: publicable(TODO_SINIESTROS), grupo: "principal" },
    { path: "/sobre-vantrust", titulo: "Sobre VanTrust", indexable: publicable(TODO_SOBRE), grupo: "principal" },
    { path: "/guias", titulo: "Guías de seguros", indexable: GUIAS.some(guiaPublicable), grupo: "principal" },
  ];

  for (const s of SEGUROS) {
    const pagina = getPaginaPorSeguro(s.slug);
    rutas.push({
      path: urlSeguro(s.slug),
      titulo: pagina?.h1 ?? `Seguro de ${s.nombre}`,
      indexable: publicable(pagina?.todo),
      grupo: s.categoria,
    });
  }
  for (const p of PAGINAS_RAMO.filter((p) => !p.seguroSlug)) {
    rutas.push({ path: p.ruta, titulo: p.h1, indexable: publicable(p.todo), grupo: "personas" });
  }
  for (const l of PAGINAS_LOCALES) {
    rutas.push({
      path: `${l.rutaMadre}/${l.ciudad}`,
      titulo: l.h1,
      indexable: publicable(l.todo) && Boolean(l.asesor),
      grupo: "local",
    });
  }
  for (const g of GUIAS) {
    rutas.push({
      path: `/guias/${g.slug}`,
      titulo: g.titulo,
      indexable: guiaPublicable(g),
      grupo: "guia",
      actualizado: g.actualizado,
    });
  }
  rutas.push(
    { path: "/politica-privacidad", titulo: "Política de privacidad", indexable: true, grupo: "legal" },
    { path: "/terminos-de-uso", titulo: "Términos de uso", indexable: true, grupo: "legal" }
  );
  return rutas;
}
