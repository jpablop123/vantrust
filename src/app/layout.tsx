import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VanTrust | Agencia de Seguros en Colombia",
  description:
    "Protege lo que más importa. Seguros de vehículo, salud y vivienda con asesoría personalizada. Cotiza gratis y compara entre las mejores aseguradoras de Colombia.",
  keywords: [
    "seguros Colombia",
    "seguro vehicular",
    "seguro de salud",
    "seguro de vivienda",
    "cotizar seguros",
    "agencia de seguros",
    "Bolívar",
    "Sura",
    "AXA",
    "Allianz",
  ],
  openGraph: {
    title: "VanTrust | Agencia de Seguros en Colombia",
    description:
      "Cotiza y compara seguros de vehículo, salud y vivienda con las mejores aseguradoras. Asesoría gratuita.",
    siteName: "VanTrust",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VanTrust | Agencia de Seguros en Colombia",
    description:
      "Cotiza y compara seguros con las mejores aseguradoras de Colombia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
