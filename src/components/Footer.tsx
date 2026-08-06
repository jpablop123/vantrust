import Image from "next/image";
import logoWhite from "../../public/vantrust-logo-white.png";
import { ShieldCheck, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="mb-5">
              <Image
                src={logoWhite}
                alt="VanTrust"
                style={{ height: "52px", width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {SITE.tagline} Comparamos las principales aseguradoras del país
              para ayudarte a encontrar la mejor opción en precio y cobertura.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-xs px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              RUI Vigente · Superfinanciera
            </span>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Información
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#inicio"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Cómo funciona
                </a>
              </li>
              <li>
                <a
                  href="/politica-privacidad"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terminos-de-uso"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Términos de uso
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contáctanos
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="flex items-center gap-2.5 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 hover:text-accent transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors duration-200 mt-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp directo
                </a>
              </li>
              <li className="text-white/30 text-xs pt-1">{SITE.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gold separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>
          &copy; {new Date().getFullYear()} {SITE.legalName} · NIT {SITE.nit} ·
          Todos los derechos reservados
        </p>
        <p className="text-white/30">Hecho en Colombia 🇨🇴</p>
      </div>
    </footer>
  );
}
