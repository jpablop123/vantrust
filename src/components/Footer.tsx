import Link from "next/link";
import Image from "next/image";
import logoWhite from "../../public/vantrust-logo-white.png";
import { ShieldCheck, Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { INSURERS, SITE, waLink } from "@/lib/site";
import { urlSeguro } from "@/data/seo/paginas";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ShieldMotif from "@/components/ShieldMotif";

const REGISTRO_INTERMEDIARIO = process.env.NEXT_PUBLIC_REGISTRO_INTERMEDIARIO || "";

// Los ramos más buscados: además de ayudar a navegar, son enlaces internos
// para SEO desde todas las páginas.
const SEGUROS_TOP: { nombre: string; slug: string }[] = [
  { nombre: "Seguro de carro", slug: "automoviles" },
  { nombre: "Seguro de salud", slug: "salud" },
  { nombre: "Seguro de hogar", slug: "hogar" },
  { nombre: "Seguro de vida", slug: "vida" },
  { nombre: "Seguro Pyme", slug: "pyme" },
  { nombre: "Póliza de cumplimiento", slug: "cumplimiento" },
];

const VANTRUST_LINKS: { nombre: string; href: string }[] = [
  { nombre: "Todos los seguros", href: "/seguros" },
  { nombre: "Cómo funciona", href: "/#como-funciona" },
  { nombre: "Sobre VanTrust", href: "/sobre-vantrust" },
  { nombre: "Aseguradoras aliadas", href: "/aseguradoras" },
  { nombre: "¿Tuviste un siniestro?", href: "/siniestros" },
  { nombre: "Renueva tu póliza", href: "/renovacion" },
  { nombre: "Guías", href: "/guias" },
];

const linkCls = "hover:text-accent transition-colors duration-200";
const tituloCls = "text-white font-semibold mb-5 text-sm uppercase tracking-wider";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white/60 overflow-hidden">
      <ShieldMotif className="absolute -right-24 top-24 w-[460px] h-[560px] opacity-[0.04] hidden md:block pointer-events-none" />

      {/* Cierre: última oportunidad de contacto en cualquier página. Los dos
          botones pasan por la ventana de captura de leads (CapturaLead). */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-6 py-7 sm:px-10 sm:py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ¿Hablamos?{" "}
              <span className="text-gold-gradient italic">
                Te respondemos en {SITE.responseTime.replace(" ", "\u00a0")}
              </span>
            </p>
            <p className="text-white/50 text-sm mt-1.5">
              Un asesor humano compara {INSURERS.length} aseguradoras por ti. Sin costo y sin compromiso.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Escríbenos por WhatsApp
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-x-6 gap-y-10 lg:gap-12">
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Image
                src={logoWhite}
                alt="VanTrust"
                style={{ height: "52px", width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              {SITE.tagline} Comparamos las principales aseguradoras del país
              para ayudarte a encontrar la mejor opción en precio y cobertura.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                RUI Vigente · Superfinanciera
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                {INSURERS.length} aseguradoras aliadas
              </span>
            </div>
          </div>

          {/* Seguros */}
          <div>
            <p className={tituloCls}>Seguros</p>
            <ul className="space-y-2.5 text-sm">
              {SEGUROS_TOP.map((s) => (
                <li key={s.slug}>
                  <Link href={urlSeguro(s.slug)} className={linkCls}>
                    {s.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* VanTrust */}
          <div>
            <p className={tituloCls}>VanTrust</p>
            <ul className="space-y-2.5 text-sm">
              {VANTRUST_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 lg:col-span-1">
            <p className={tituloCls}>Contacto</p>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href={`tel:${SITE.phoneTel}`} className={`flex items-center gap-3 ${linkCls}`}>
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`flex items-center gap-3 break-all ${linkCls}`}>
                  <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="pt-1.5">
                  {SITE.address}, {SITE.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                {SITE.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Separador dorado */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      {/* Barra legal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-center sm:text-left space-y-1">
          <p>
            &copy; {new Date().getFullYear()} {SITE.legalName} · NIT {SITE.nit} ·
            Todos los derechos reservados
          </p>
          {/* TODO: número real de registro como intermediario de seguros. Solo se
              muestra cuando NEXT_PUBLIC_REGISTRO_INTERMEDIARIO está definido,
              para no publicar un número inventado. */}
          {REGISTRO_INTERMEDIARIO && (
            <p className="text-white/40">
              Intermediario de seguros · Registro {REGISTRO_INTERMEDIARIO}
            </p>
          )}
          <p className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1">
            <Link
              href="/politica-privacidad"
              className="hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              Política de tratamiento de datos personales (Ley 1581 de 2012)
            </Link>
            <Link
              href="/terminos-de-uso"
              className="hover:text-accent transition-colors underline-offset-2 hover:underline"
            >
              Términos de uso
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {SITE.social.instagram && (
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de VanTrust"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent hover:text-primary text-white/60 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.64 4.13.34 4.9.14 5.77.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.77.3 1.64.5 2.92.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56.79-.31 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92-.31-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.95 19.87.64c-.77-.3-1.64-.5-2.92-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
            </a>
          )}
          <p className="text-white/40">Hecho en {SITE.city}, Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
