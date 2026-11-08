import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Tracking from "@/components/Tracking";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/seo/JsonLd";
import { NEGOCIO } from "@/lib/negocio";
import { OG_IMAGE, SITE_URL, insuranceAgencyLd, websiteLd } from "@/lib/seo";
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

// Base de metadata. Sin canonical aquí: cada página declara el suyo con
// buildMetadata() (si no, heredarían el canonical del home).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VanTrust | Agencia de seguros en Barranquilla",
  description: NEGOCIO.descripcion,
  openGraph: { siteName: "VanTrust", locale: "es_CO", type: "website", images: [OG_IMAGE] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[insuranceAgencyLd(), websiteLd()]} />
        {children}
        <WhatsAppFloat />
        <Tracking />
        <Analytics />
      </body>
    </html>
  );
}
