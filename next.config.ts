import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La política de tratamiento de datos (Ley 1581) vive en una sola página.
      { source: "/politica-de-datos", destination: "/politica-privacidad", permanent: true },
    ];
  },
};

export default nextConfig;
