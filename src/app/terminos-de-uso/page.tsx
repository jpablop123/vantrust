import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalLayout from "@/components/LegalLayout";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Términos de Uso | VanTrust",
  description:
    "Términos y condiciones de uso del sitio web de VanTrust, agencia de seguros en Colombia.",
};

export default function TerminosDeUso() {
  return (
    <>
      <Navbar />
      <LegalLayout
        title="Términos y Condiciones de Uso"
        subtitle="Condiciones generales de uso del sitio web de VanTrust"
        lastUpdated="Marzo 2025"
      >
        <TermsContent />
      </LegalLayout>
      <Footer />
    </>
  );
}
