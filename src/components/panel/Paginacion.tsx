import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Números a mostrar: 1 … 4 5 6 … 12 */
function numeros(pagina: number, paginas: number): (number | "…")[] {
  const set = new Set([1, paginas, pagina - 1, pagina, pagina + 1].filter((n) => n >= 1 && n <= paginas));
  const orden = [...set].sort((a, b) => a - b);
  const r: (number | "…")[] = [];
  orden.forEach((n, i) => {
    if (i > 0 && n - orden[i - 1] > 1) r.push("…");
    r.push(n);
  });
  return r;
}

/**
 * Paginación numerada. Con `href` usa enlaces (vista del admin, en la URL);
 * con `onIr` usa botones (cola del asesor, en el navegador).
 */
export default function Paginacion({
  pagina,
  paginas,
  total,
  porPagina,
  href,
  onIr,
}: {
  pagina: number;
  paginas: number;
  total: number;
  porPagina: number;
  href?: (n: number) => string;
  onIr?: (n: number) => void;
}) {
  if (paginas <= 1) return null;
  const desde = (pagina - 1) * porPagina + 1;
  const hasta = Math.min(total, pagina * porPagina);
  const base = "min-w-9 h-9 px-2 inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors";

  const ir = (n: number, label: string, children: React.ReactNode, actual = false) => {
    const cls = `${base} ${actual ? "bg-primary text-white" : "text-primary/70 hover:bg-white hover:text-primary border border-transparent hover:border-primary/10"}`;
    if (href)
      return (
        <Link key={label} href={href(n)} aria-label={label} aria-current={actual ? "page" : undefined} className={cls} scroll={false}>
          {children}
        </Link>
      );
    return (
      <button key={label} type="button" onClick={() => onIr?.(n)} aria-label={label} aria-current={actual ? "page" : undefined} className={cls}>
        {children}
      </button>
    );
  };

  return (
    <nav aria-label="Páginas" className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <span className="text-muted">
        {desde}–{hasta} de {total}
      </span>
      <div className="flex items-center gap-1">
        {pagina > 1 ? (
          ir(pagina - 1, "Página anterior", <ChevronLeft className="w-4 h-4" />)
        ) : (
          <span className={`${base} text-primary/20`} aria-hidden="true"><ChevronLeft className="w-4 h-4" /></span>
        )}
        {numeros(pagina, paginas).map((n, i) =>
          n === "…" ? (
            <span key={`e${i}`} className="px-1 text-primary/40">…</span>
          ) : (
            ir(n, `Página ${n}`, n, n === pagina)
          )
        )}
        {pagina < paginas ? (
          ir(pagina + 1, "Página siguiente", <ChevronRight className="w-4 h-4" />)
        ) : (
          <span className={`${base} text-primary/20`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></span>
        )}
      </div>
    </nav>
  );
}
