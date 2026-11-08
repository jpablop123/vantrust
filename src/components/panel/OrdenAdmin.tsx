"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Selector from "@/components/panel/Selector";
import type { Orden } from "@/lib/panel/leads";

export const OPCIONES_ORDEN: { valor: Orden; texto: string }[] = [
  { valor: "recientes", texto: "Más recientes primero" },
  { valor: "antiguos", texto: "Más antiguos primero" },
  { valor: "seguimiento", texto: "Próximo seguimiento" },
  { valor: "contacto", texto: "Último contacto" },
  { valor: "nombre", texto: "Nombre (A-Z)" },
];

/** Orden de la lista del admin; vive en la URL como los filtros. */
export default function OrdenAdmin({ valor }: { valor: Orden }) {
  const router = useRouter();
  const ruta = usePathname();
  const sp = useSearchParams();
  return (
    <Selector
      etiqueta="Ordenar por"
      valor={valor}
      ancho="w-56"
      opciones={OPCIONES_ORDEN}
      onCambio={(v) => {
        const p = new URLSearchParams(sp.toString());
        if (v === "recientes") p.delete("orden");
        else p.set("orden", v);
        p.delete("pagina");
        p.delete("lead");
        router.push(`${ruta}${p.toString() ? `?${p}` : ""}`);
      }}
    />
  );
}
