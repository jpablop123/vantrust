import type { Metadata } from "next";
import { buildMetadata, faqLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { faqsHomeLd } from "@/data/faqs";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ComoFunciona from "@/components/ComoFunciona";
import Nosotros from "@/components/Nosotros";
import CotizadorExpress from "@/components/CotizadorExpress";
import AsesoriaGratuita from "@/components/AsesoriaGratuita";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMetadata({
  title: "Agencia de seguros en Barranquilla | VanTrust",
  description:
    "Compara seguros de carro, salud, vida, hogar y pólizas para empresas con 10 aseguradoras. Asesoría gratis en Barranquilla. Cotiza en minutos.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <ComoFunciona />
      <CotizadorExpress />
      <Nosotros />
      <AsesoriaGratuita />
      <FAQ />
      <JsonLd data={faqLd(faqsHomeLd())} />
      <CTAFinal />
      <Footer />
    </>
  );
}
