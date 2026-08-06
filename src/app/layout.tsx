import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Tipografía secundaria y de apoyo: Montserrat (Regular + Bold Italic)
// Tipografía principal (Nourd W05 Bold) requiere self-hosting — añadir via @font-face en globals.css
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vantrust.vercel.app"),
  title: "VanTrust | Agencia de Seguros en Colombia",
  description:
    "Soluciones seguras para proteger lo que más valoras. Comparamos las principales aseguradoras del país para ayudarte a encontrar la mejor opción en precio y cobertura. Cotiza gratis para personas y empresas.",
  keywords: [
    "seguros Colombia",
    "seguro vehicular",
    "seguro de salud",
    "seguro de hogar",
    "seguro de vida",
    "seguros empresariales",
    "cotizar seguros",
    "agencia de seguros",
    "Allianz",
    "AXA Colpatria",
    "Seguros Bolívar",
    "Sura",
    "Zurich",
  ],
  openGraph: {
    title: "VanTrust | Agencia de Seguros en Colombia",
    description:
      "Soluciones seguras para proteger lo que más valoras. Comparamos las principales aseguradoras del país. Asesoría gratuita.",
    siteName: "VanTrust",
    images: [{ url: "/vantrust-banner.jpeg", width: 1920, height: 1080 }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VanTrust | Agencia de Seguros en Colombia",
    description:
      "Comparamos las principales aseguradoras del país para proteger lo que más valoras.",
    images: ["/vantrust-banner.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
