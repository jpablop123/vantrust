import { Check, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import type { Seguro } from "@/data/seguros";

function ListCard({
  title,
  icon,
  items,
  accent = false,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  accent?: boolean;
}) {
  return (
    <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent ? "bg-accent/15 text-accent-dark" : "bg-primary/5 text-primary"
          }`}
        >
          {icon}
        </div>
        <h2 className="text-lg font-bold text-primary">{title}</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Tarjetas de "¿Qué protege?", coberturas, beneficios y público, desde seguros.ts. */
export default function RamoCards({ seguro }: { seguro: Seguro }) {
  return (
    <>
      {seguro.protege && seguro.protege.length > 0 && (
        <ListCard
          title={`¿Qué protege el seguro de ${seguro.nombre.toLowerCase()}?`}
          icon={<ShieldCheck className="w-5 h-5" />}
          items={seguro.protege}
        />
      )}
      {seguro.coberturas && seguro.coberturas.length > 0 && (
        <ListCard
          title="Principales coberturas"
          icon={<Sparkles className="w-5 h-5" />}
          items={seguro.coberturas}
          accent
        />
      )}
      {seguro.beneficios && seguro.beneficios.length > 0 && (
        <ListCard
          title="Beneficios"
          icon={<Target className="w-5 h-5" />}
          items={seguro.beneficios}
        />
      )}
      {seguro.dirigidoA && (
        <section className="bg-white rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-primary">¿Para quién es?</h2>
          </div>
          <p className="text-muted text-sm leading-relaxed">{seguro.dirigidoA}</p>
        </section>
      )}
    </>
  );
}
