import {
  Briefcase,
  Car,
  FileCheck2,
  Flower2,
  HeartHandshake,
  HeartPulse,
  House,
  PawPrint,
  Plane,
  Shield,
  ShieldPlus,
  Truck,
  type LucideIcon,
} from "lucide-react";

const ICONO: Record<string, LucideIcon> = {
  vehiculo: Car,
  auto: Car,
  salud: HeartPulse,
  hogar: House,
  vivienda: House,
  vida: HeartHandshake,
  accidentes: ShieldPlus,
  exequial: Flower2,
  viajes: Plane,
  mascotas: PawPrint,
  pyme: Briefcase,
  cumplimiento: FileCheck2,
  transporte: Truck,
};

export function IconoRamo({ tipo, className = "w-4 h-4" }: { tipo: string; className?: string }) {
  const I = ICONO[tipo] ?? Shield;
  return <I className={className} aria-hidden="true" />;
}

/** Iniciales del cliente (el ramo va con su ícono en el texto, al lado). */
export default function Avatar({ nombre, grande = false }: { nombre: string; grande?: boolean }) {
  const partes = nombre.trim().split(/\s+/).filter((p) => /^[\p{L}]/u.test(p));
  const iniciales = ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase() || "?";
  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-accent font-bold tracking-wide ${grande ? "w-14 h-14 text-lg" : "w-11 h-11 text-sm"}`}
      aria-hidden="true"
    >
      {iniciales}
    </span>
  );
}
