import type { NextConfig } from "next";
import { PYME_A_SLUG } from "./src/data/seo/pymes";

const DOMINIO = "https://vantrust.com.co";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // La política de tratamiento de datos (Ley 1581) vive en una sola página.
      { source: "/politica-de-datos", destination: "/politica-privacidad", permanent: true },

      // SEO: el dominio de Vercel no debe competir con el dominio final.
      // Solo el host de producción exacto; los previews (*-git-*.vercel.app) siguen funcionando.
      {
        source: "/:path*",
        has: [{ type: "host", value: "vantrust.vercel.app" }],
        destination: `${DOMINIO}/:path*`,
        statusCode: 301 as const,
      },
      // www → raíz, para que exista un solo host canónico.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vantrust.com.co" }],
        destination: `${DOMINIO}/:path*`,
        statusCode: 301 as const,
      },

      // Productos empresariales que ahora viven en /pymes/* (evita contenido duplicado).
      ...Object.entries(PYME_A_SLUG).map(([poliza, slug]) => ({
        source: `/seguros/${slug}`,
        destination: `/pymes/${poliza}`,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;
