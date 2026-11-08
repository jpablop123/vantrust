import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  User,
  Building2,
  Scale,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SeguroIcon } from "@/components/seguros/icons";
import ShieldMotif from "@/components/ShieldMotif";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { PERSONAS, EMPRESAS, getSeguro, type Seguro } from "@/data/seguros";
import { urlSeguro } from "@/data/seo/paginas";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { INSURERS, SITE, waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Seguros para personas y empresas | VanTrust",
  description:
    "Seguros de carro, hogar, vida, salud y pólizas empresariales. Comparamos 10 aseguradoras para darte la mejor opción. Cotiza gratis con VanTrust.",
  path: "/seguros",
});

// ── Página de ventas ──
// 25 tarjetas iguales paralizan (demasiadas opciones con el mismo peso). Aquí:
// 1) el visitante se autoselecciona (persona o empresa), 2) ve primero lo que
// más se cotiza, con acceso directo a WhatsApp, y 3) el resto queda en filas
// compactas agrupadas por necesidad, fáciles de escanear.

/** Lo más cotizado, con el gancho de venta de cada uno. */
const DESTACADOS: { slug: string; gancho: string }[] = [
  {
    slug: "automoviles",
    gancho:
      "Choques, robo, daños a terceros y asistencia en carretera. Y si tienes un siniestro, no lo enfrentas solo.",
  },
  {
    slug: "salud",
    gancho: "Especialistas, clínicas y urgencias en la red privada, sin depender solo de la EPS.",
  },
  {
    slug: "hogar",
    gancho: "Incendio, robo, terremoto y daños por agua. Para propietarios e inquilinos.",
  },
  {
    slug: "pyme",
    gancho:
      "Una sola póliza para tu local, mercancía, equipos y responsabilidad civil. Para que un mal día no cierre tu negocio.",
  },
];

/** Seguros para empresas agrupados por lo que protegen. */
const GRUPOS_EMPRESA: { titulo: string; texto: string; slugs: string[] }[] = [
  {
    titulo: "Tus activos y tu operación",
    texto: "Lo que tu empresa necesita para seguir funcionando.",
    slugs: [
      "todo-riesgo-danos-materiales",
      "maquinaria-y-equipo",
      "equipo-electronico",
      "transporte-de-mercancias",
      "transporte-de-valores",
      "flotas",
      "copropiedades",
    ],
  },
  {
    titulo: "Contratos, responsabilidad y riesgos",
    texto: "Para licitar, firmar y operar sin quedar expuesto.",
    slugs: [
      "cumplimiento",
      "responsabilidad-civil-extracontractual",
      "responsabilidad-civil-profesional",
      "d-and-o",
      "riesgos-ciberneticos",
      "manejo-global",
    ],
  },
  {
    titulo: "Tu equipo de trabajo",
    texto: "Beneficios que retienen talento y obligaciones al día.",
    slugs: ["vida-grupo", "salud-empresarial", "arl"],
  },
];

const DESTACADO_SLUGS = new Set(DESTACADOS.map((d) => d.slug));

function FilaSeguro({ seguro }: { seguro: Seguro }) {
  return (
    <Link
      href={urlSeguro(seguro.slug)}
      className="group min-w-0 flex items-center gap-4 bg-white rounded-xl border border-primary/10 hover:border-accent/50 px-4 py-3.5 transition-colors"
    >
      <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors">
        <SeguroIcon name={seguro.icon} className="w-5 h-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-primary text-[15px] leading-tight">
          {seguro.nombre}
        </span>
        <span className="block text-muted text-[13px] leading-snug truncate">
          {seguro.descripcion}
        </span>
      </span>
      <ChevronRight className="w-5 h-5 text-primary/30 group-hover:text-accent shrink-0 transition-colors" />
    </Link>
  );
}

function BloqueDestacado({
  seguro,
  gancho,
  grande = false,
  className = "",
}: {
  seguro: Seguro;
  gancho: string;
  grande?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-primary bg-grid p-7 sm:p-8 flex flex-col ${className}`}
    >
      <div className="absolute -top-20 -right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(191,161,92,0.22),transparent_65%)]" />
      <ShieldMotif className="absolute -right-10 -bottom-12 w-48 h-56 opacity-[0.07]" />
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-6">
          <span className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
            <SeguroIcon name={seguro.icon} className="w-7 h-7" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent/80">
            {seguro.categoria === "empresas" ? "Para tu empresa" : "Para ti"}
          </span>
        </div>
        <h3
          className={`font-bold text-white tracking-tight mb-3 ${
            grande ? "text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {seguro.nombre}
        </h3>
        <p className={`text-white/65 leading-relaxed mb-7 ${grande ? "text-lg max-w-md" : "text-sm"}`}>
          {gancho}
        </p>
        {grande && seguro.coberturas && (
          <ul className="space-y-2.5 mb-8">
            {seguro.coberturas.slice(0, 5).map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-white/80 text-[15px]">
                <Check className="w-4 h-4 text-accent shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={waLink({ ramo: seguro.slug })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            Cotizar por WhatsApp
          </a>
          <Link
            href={urlSeguro(seguro.slug)}
            className="inline-flex items-center gap-1 whitespace-nowrap text-white/70 hover:text-accent font-medium py-3 transition-colors"
          >
            Ver coberturas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SegurosIndex() {
  const destacados = DESTACADOS.map((d) => ({ ...d, seguro: getSeguro(d.slug) })).filter(
    (d): d is typeof d & { seguro: Seguro } => !!d.seguro
  );
  const [auto, ...otrosDestacados] = destacados;

  const personas = PERSONAS.filter((s) => !DESTACADO_SLUGS.has(s.slug));
  const agrupados = new Set(GRUPOS_EMPRESA.flatMap((g) => g.slugs));
  const grupos = GRUPOS_EMPRESA.map((g) => ({
    ...g,
    seguros: g.slugs
      .map((slug) => EMPRESAS.find((s) => s.slug === slug))
      .filter((s): s is Seguro => !!s && !DESTACADO_SLUGS.has(s.slug)),
  }));
  // Cualquier seguro nuevo de empresas que no esté en un grupo sigue apareciendo.
  const sinGrupo = EMPRESAS.filter(
    (s) => !agrupados.has(s.slug) && !DESTACADO_SLUGS.has(s.slug)
  );
  if (sinGrupo.length) {
    grupos.push({ titulo: "Otras pólizas", texto: "", slugs: [], seguros: sinGrupo });
  }

  return (
    <>
      <Navbar />

      {/* Header: autoselección */}
      <header className="relative bg-primary bg-grid overflow-hidden pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/70 to-[#001a33]" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[130%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay pointer-events-none" />
        <ShieldMotif className="absolute -right-24 -top-10 w-[420px] h-[500px] opacity-[0.05] hidden md:block" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <Breadcrumbs migas={[{ nombre: "Seguros", path: "/seguros" }]} />
          </div>
          <div className="text-center">
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-tight">
              Soluciones para{" "}
              <span className="text-gold-gradient italic">personas y empresas</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Comparamos {INSURERS.length} aseguradoras para encontrarte la mejor
              opción en precio y cobertura. ¿Qué quieres proteger hoy?
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <a
              href="#personas"
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] hover:border-accent/50 backdrop-blur-sm p-5 transition-all duration-200"
            >
              <span className="w-12 h-12 shrink-0 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <User className="w-6 h-6" />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-white font-bold text-lg">Para mí y mi familia</span>
                <span className="block text-white/50 text-sm">
                  Carro, salud, hogar, vida y {PERSONAS.length - 4} más
                </span>
              </span>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
            </a>
            <a
              href="#empresas"
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] hover:border-accent/50 backdrop-blur-sm p-5 transition-all duration-200"
            >
              <span className="w-12 h-12 shrink-0 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </span>
              <span className="flex-1 text-left">
                <span className="block text-white font-bold text-lg">Para mi empresa</span>
                <span className="block text-white/50 text-sm">
                  Pyme, cumplimiento, ARL y {EMPRESAS.length - 3} más
                </span>
              </span>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
            </a>
          </div>

          <p className="text-center text-white/55 text-sm mt-6">
            ¿No sabes cuál necesitas?{" "}
            <a
              href={waLink({ mensaje: "Hola, quiero que me ayuden a saber qué seguro necesito" })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold underline underline-offset-4 hover:text-accent-light"
            >
              Pregúntale a un asesor por WhatsApp
            </a>
          </p>
        </div>
      </header>

      <main className="bg-surface">
        {/* Lo más cotizado */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Los que más <span className="text-gold-gradient italic">cotizan</span>
            </h2>
            <p className="text-muted mt-3">
              Empieza por aquí: te respondemos por WhatsApp en aproximadamente {SITE.responseTime}.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-5">
            {auto && (
              <BloqueDestacado
                seguro={auto.seguro}
                gancho={auto.gancho}
                grande
                className="lg:row-span-2 min-h-[22rem]"
              />
            )}
            {otrosDestacados.map((d, i) => (
              <BloqueDestacado
                key={d.slug}
                seguro={d.seguro}
                gancho={d.gancho}
                className={i === 2 ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
        </section>

        {/* Personas */}
        <section id="personas" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Seguros para personas</h2>
              <p className="text-muted text-sm">Protección para ti y tu familia</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {personas.map((s) => (
              <FilaSeguro key={s.slug} seguro={s} />
            ))}
          </div>
        </section>

        {/* Garantías (rompe objeciones antes de la parte de empresas) */}
        <section className="bg-primary bg-grid relative overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Scale, titulo: "Mismo precio que ir directo", texto: "Comparar con nosotros no te cuesta más." },
              { icon: ShieldCheck, titulo: `${INSURERS.length} aseguradoras en una sola llamada`, texto: "Tú eliges; nosotros hacemos el trabajo." },
              { icon: Headphones, titulo: "Un asesor cuando más lo necesitas", texto: "Te acompañamos si algún día tienes un siniestro." },
            ].map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-accent/15 border border-accent/25 text-accent flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-white font-semibold">{titulo}</p>
                  <p className="text-white/50 text-sm">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empresas */}
        <section id="empresas" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent-dark flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Seguros para empresas</h2>
              <p className="text-muted text-sm">
                Protegemos tu operación, tu patrimonio y tu equipo
              </p>
            </div>
          </div>
          <div className="space-y-10">
            {grupos
              .filter((g) => g.seguros.length)
              .map((g) => (
                <div key={g.titulo}>
                  <h3 className="text-lg font-bold text-primary">{g.titulo}</h3>
                  {g.texto && <p className="text-muted text-sm mb-4">{g.texto}</p>}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {g.seguros.map((s) => (
                      <FilaSeguro key={s.slug} seguro={s} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Cierre */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-12 text-center">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />
            <ShieldMotif className="absolute -left-10 -bottom-14 w-48 h-56 opacity-[0.06]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                ¿Aún no sabes{" "}
                <span className="text-gold-gradient italic">cuál necesitas?</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Cuéntale a un asesor qué quieres proteger y te dice qué seguro te
                conviene. Gratis, sin compromiso y en aproximadamente {SITE.responseTime}.
              </p>
              <a
                href={waLink({ mensaje: "Hola, quiero que me ayuden a saber qué seguro necesito" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
              >
                <WhatsAppIcon />
                Hablar con un asesor
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
