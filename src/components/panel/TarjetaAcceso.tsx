import Image from "next/image";
import logoWhite from "../../../public/vantrust-logo-white.png";

/** Marco de las pantallas de acceso (login, restablecer, nueva contraseña). */
export default function TarjetaAcceso({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-primary bg-grid relative overflow-hidden flex items-center justify-center px-4 py-16">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-80 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src={logoWhite} alt="VanTrust" style={{ height: 48, width: "auto" }} priority />
        </div>
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-7 sm:p-9">
          <h1 className="text-2xl font-bold text-white">{titulo}</h1>
          {subtitulo && <p className="text-white/55 text-sm mt-1.5 mb-6">{subtitulo}</p>}
          {!subtitulo && <div className="mb-6" />}
          {children}
        </div>
        <p className="text-center text-white/30 text-xs mt-6">Panel interno de VanTrust · Solo para el equipo</p>
      </div>
    </main>
  );
}
