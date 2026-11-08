"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ComoTeFue from "@/components/panel/ComoTeFue";

interface Pedido {
  leadId: string;
  nombre: string;
  medio: "whatsapp" | "llamada";
  onGuardado?: () => void;
}

const Contexto = createContext<(p: Pedido) => void>(() => {});

/** Abre la hoja "¿Cómo te fue?" para un lead. */
export const useHojaContacto = () => useContext(Contexto);

/**
 * La hoja vive arriba de la lista: al guardar, el lead cambia de pestaña y su
 * fila se desmonta, pero la confirmación sigue a la vista.
 */
export default function HojaContactoProvider({ children }: { children: React.ReactNode }) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const abrir = useCallback((p: Pedido) => setPedido(p), []);
  const cerrar = useCallback(() => setPedido(null), []);
  const guardado = useCallback(() => {
    pedido?.onGuardado?.();
    setPedido(null);
  }, [pedido]);
  return (
    <Contexto.Provider value={abrir}>
      {children}
      {pedido && (
        <ComoTeFue key={pedido.leadId} leadId={pedido.leadId} nombre={pedido.nombre} medio={pedido.medio} onCerrar={cerrar} onGuardado={guardado} />
      )}
    </Contexto.Provider>
  );
}
