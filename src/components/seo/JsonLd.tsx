// JSON-LD como <script> nativo (recomendación de la guía de Next).
// Se escapa "<" para que ningún texto del contenido pueda cerrar el script.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
