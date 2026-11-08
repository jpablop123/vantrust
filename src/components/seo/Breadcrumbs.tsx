import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbLd, type Miga } from "@/lib/seo";

/**
 * Migas de pan visibles + BreadcrumbList. La primera miga es siempre Inicio;
 * la última es la página actual y no lleva enlace.
 */
export default function Breadcrumbs({
  migas,
  tono = "oscuro",
}: {
  migas: Miga[];
  tono?: "oscuro" | "claro";
}) {
  const todas: Miga[] = [{ nombre: "Inicio", path: "/" }, ...migas];
  const base = tono === "oscuro" ? "text-white/50" : "text-muted";
  const hover = tono === "oscuro" ? "hover:text-accent" : "hover:text-primary";
  const actual = tono === "oscuro" ? "text-white/80" : "text-primary";

  return (
    <>
      <nav aria-label="Migas de pan" className={`text-sm ${base}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {todas.map((m, i) => {
            const ultima = i === todas.length - 1;
            return (
              <li key={m.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden />}
                {ultima ? (
                  <span aria-current="page" className={actual}>
                    {m.nombre}
                  </span>
                ) : (
                  <Link href={m.path} className={`${hover} transition-colors`}>
                    {m.nombre}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(todas)} />
    </>
  );
}
