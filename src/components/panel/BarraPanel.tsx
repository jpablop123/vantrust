import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import logoWhite from "../../../public/vantrust-logo-white.png";
import { cerrarSesion } from "@/app/panel/acciones";
import type { Miembro } from "@/lib/panel/sesion";

/** Barra superior del panel. Las pestañas de admin solo se ven si el rol lo permite. */
export default function BarraPanel({ miembro, actual = "leads" }: { miembro: Miembro; actual?: "leads" | "equipo" | "ventas" }) {
  return (
    <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/panel" className="flex items-center gap-3 shrink-0">
          <Image src={logoWhite} alt="VanTrust" className="h-8 w-auto max-w-none" />
          <span className="hidden sm:inline text-white/40 text-sm border-l border-white/15 pl-3">Panel</span>
        </Link>
        {miembro.rol === "admin" && (
          <nav aria-label="Secciones del panel" className="flex items-center gap-1 mr-auto ml-2 sm:ml-6">
            {([["leads", "/panel", "Leads"], ["ventas", "/panel/ventas", "Ventas"], ["equipo", "/panel/equipo", "Equipo"]] as const).map(([k, href, txt]) => (
              <Link
                key={k}
                href={href}
                aria-current={actual === k ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  actual === k ? "bg-white/10 text-accent" : "text-white/60 hover:text-white"
                }`}
              >
                {txt}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-semibold">{miembro.nombre}</p>
            <p className="text-[11px] uppercase tracking-wider text-accent">
              {miembro.rol === "admin" ? "Administrador" : "Asesor"}
            </p>
          </div>
          <form action={cerrarSesion}>
            <button
              type="submit"
              aria-label="Salir"
              title="Salir"
              className="w-9 h-9 rounded-full border border-white/15 hover:border-accent hover:text-accent flex items-center justify-center transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
