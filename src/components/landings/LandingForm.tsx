"use client";

import { useRouter } from "next/navigation";
import PasoContacto from "@/components/cotizador/PasoContacto";
import PymeForm from "@/components/pymes/PymeForm";
import RenovacionForm from "@/components/RenovacionForm";
import { GRACIAS_KEY } from "@/app/gracias/GraciasContent";
import type { LandingForm as Tipo } from "@/data/landings";

/** Formulario de una landing de anuncios según su oferta. */
export default function LandingForm({ tipo, fuente }: { tipo: Tipo; fuente: string }) {
  const router = useRouter();

  if (tipo === "cumplimiento") return <PymeForm seguroSlug="cumplimiento" fuente={fuente} />;
  if (tipo === "renovacion") return <RenovacionForm />;

  // Auto: solo el paso 1 (placa + nombre + WhatsApp). En una landing de pauta
  // cada campo extra cuesta leads; el asesor completa el resto por WhatsApp.
  return (
    <PasoContacto
      tipoSeguro="vehiculo"
      fuente={fuente}
      conPlaca
      submitLabel="Cotizar mi carro"
      onCreado={(l) => {
        try {
          sessionStorage.setItem(
            GRACIAS_KEY,
            JSON.stringify({
              nombre: l.nombre,
              tipoSeguro: "Seguro de Automóvil",
              resumen: [
                { label: "Placa", value: l.placa },
                { label: "WhatsApp", value: l.telefono },
              ].filter((r) => r.value),
            })
          );
        } catch {
          // sessionStorage bloqueado: /gracias muestra el mensaje genérico.
        }
        router.push("/gracias");
      }}
    />
  );
}
