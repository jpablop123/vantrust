import TarjetaAcceso from "@/components/panel/TarjetaAcceso";
import FormNuevaClave from "./FormNuevaClave";

// Se llega con sesión (enlace del correo o desde el panel); proxy.ts manda al
// login a quien no la tenga.
export default function NuevaClavePage() {
  return (
    <TarjetaAcceso titulo="Crea tu contraseña" subtitulo="La usarás para entrar al panel.">
      <FormNuevaClave />
    </TarjetaAcceso>
  );
}
