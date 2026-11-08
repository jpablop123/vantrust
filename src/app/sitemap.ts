import type { MetadataRoute } from "next";
import { todasLasRutas } from "@/lib/rutas";
import { abs } from "@/lib/seo";

// Solo rutas indexables: una página en noindex dentro del sitemap es una
// señal contradictoria para Google.
export default function sitemap(): MetadataRoute.Sitemap {
  return todasLasRutas()
    .filter((r) => r.indexable)
    .map((r) => ({
      url: abs(r.path),
      ...(r.actualizado ? { lastModified: r.actualizado } : {}),
      changeFrequency: r.grupo === "legal" ? "yearly" : "monthly",
      priority: r.path === "/" ? 1 : r.grupo === "legal" ? 0.2 : r.grupo === "principal" ? 0.8 : 0.7,
    }));
}
