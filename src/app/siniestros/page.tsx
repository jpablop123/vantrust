import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaginaHeader from "@/components/seo/PaginaHeader";
import { FaqSeccion, Secciones, TodoPendiente, WhatsAppCTA } from "@/components/seo/Contenido";
import { buildMetadata, publicable } from "@/lib/seo";
import type { Seccion } from "@/data/seo/tipos";
import { TODO_SINIESTROS } from "@/data/seo/pendientes";

// Diferenciador: qué hacer en un siniestro y cómo te acompaña tu asesor.
const TODO = TODO_SINIESTROS;

const SECCIONES: Seccion[] = [
  {
    titulo: "Si chocas",
    bloques: [
      {
        tipo: "pasos",
        items: [
          "Ponte a salvo y señaliza el lugar. Si hay heridos, llama al 123.",
          "Toma fotos de los vehículos, las placas, los daños y el lugar.",
          "Pide los datos del otro conductor: nombre, cédula, licencia, placa y aseguradora.",
          "Llama a la línea de asistencia de tu aseguradora y anota el número del reporte.",
          "Escríbele a tu asesor de VanTrust por WhatsApp con las fotos y el número del reporte.",
          "No aceptes responsabilidad ni firmes acuerdos de pago sin hablar antes con la aseguradora.",
        ],
      },
    ],
  },
  {
    titulo: "Si te roban el carro o algo de tu casa",
    bloques: [
      {
        tipo: "pasos",
        items: [
          "Pon la denuncia ante la Policía o la Fiscalía; la aseguradora la pide para el reclamo.",
          "Avisa a la aseguradora lo antes posible.",
          "Envía a tu asesor la denuncia y la lista de lo robado con fotos o facturas si las tienes.",
        ],
      },
    ],
  },
  {
    titulo: "Si hay un daño en tu casa o tu negocio",
    bloques: [
      {
        tipo: "pasos",
        items: [
          "Evita que el daño crezca: cierra el agua o la luz si es seguro hacerlo.",
          "Toma fotos y video antes de mover o reparar algo.",
          "Reporta a la aseguradora y a tu asesor; no deseches lo dañado hasta que lo autoricen.",
        ],
      },
    ],
  },
  {
    titulo: "Qué hace tu asesor de VanTrust",
    bloques: [
      {
        tipo: "lista",
        items: [
          "Te dice qué documentos necesita la aseguradora para tu caso.",
          "Hace seguimiento al reclamo con la aseguradora.",
          "Te explica la liquidación y el deducible antes de que aceptes.",
        ],
      },
    ],
  },
];

const FAQS = [
  {
    pregunta: "¿Cuánto tiempo tengo para avisar un siniestro a la aseguradora?",
    respuesta:
      "Avisa lo antes posible. Cada póliza fija un plazo para el aviso; un aviso tardío puede complicar el reclamo. Tu asesor te confirma el plazo de tu póliza.",
  },
  {
    pregunta: "¿Tengo que pagar el deducible?",
    respuesta:
      "Si la póliza tiene deducible para esa cobertura, sí: la aseguradora paga el daño menos el deducible.",
  },
  {
    pregunta: "¿VanTrust me cobra por acompañarme en el siniestro?",
    respuesta: "No. El acompañamiento es parte del servicio para los clientes que aseguramos.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Qué hacer si chocas, te roban o hay un daño | VanTrust",
  description:
    "Pasos claros para reportar un choque, un robo o un daño a tu aseguradora, y cómo te acompaña tu asesor de VanTrust. Escríbenos por WhatsApp.",
  path: "/siniestros",
  noindex: !publicable(TODO),
});

export default function Siniestros() {
  return (
    <>
      <Navbar />
      <PaginaHeader
        migas={[{ nombre: "Siniestros", path: "/siniestros" }]}
        h1="Qué hacer si chocas, te roban o hay un daño"
        respuesta="Primero ponte a salvo; si hay heridos, llama al 123. Después reporta el hecho a la línea de asistencia de tu aseguradora y escríbele a tu asesor de VanTrust: te dice qué documentos necesitas y hace seguimiento al reclamo."
      />
      <main className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <TodoPendiente todo={TODO} />
          <Secciones secciones={SECCIONES} />
          <FaqSeccion faqs={FAQS} />
          <WhatsAppCTA
            mensaje="Hola, soy cliente de VanTrust y necesito reportar un siniestro."
            titulo="¿Tuviste un siniestro?"
            texto="Escríbenos por WhatsApp con tu nombre, la placa o el número de póliza y lo que pasó."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
