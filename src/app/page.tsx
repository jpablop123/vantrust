import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ComoFunciona from "@/components/ComoFunciona";
import Nosotros from "@/components/Nosotros";
import Testimonials from "@/components/Testimonials";
import CotizadorExpress from "@/components/CotizadorExpress";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <ComoFunciona />
      <CotizadorExpress />
      <Nosotros />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
