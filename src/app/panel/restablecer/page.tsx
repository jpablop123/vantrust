import TarjetaAcceso from "@/components/panel/TarjetaAcceso";
import FormRestablecer from "./FormRestablecer";

export default async function RestablecerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <TarjetaAcceso
      titulo="¿Olvidaste tu contraseña?"
      subtitulo="Te enviamos un enlace para crear una nueva."
    >
      <FormRestablecer enlaceVencido={error === "enlace"} />
    </TarjetaAcceso>
  );
}
