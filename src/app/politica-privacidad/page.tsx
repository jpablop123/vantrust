import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalLayout from "@/components/LegalLayout";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad | VanTrust",
  description:
    "Política de tratamiento de datos personales de VanTrust, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.",
  path: "/politica-privacidad",
});

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navbar />
      <LegalLayout
        title="Política de Privacidad"
        subtitle="Tratamiento de datos personales conforme a la Ley 1581 de 2012"
        lastUpdated="Marzo 2025"
      >
        <PrivacyContent />
      </LegalLayout>
      <Footer />
    </>
  );
}
