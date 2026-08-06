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
        <div className="flex items-center gap-3">
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent hover:text-primary text-white/60 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.02 8h4.96v14H.02V8zm7.5 0h4.75v1.9h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.92 3.29 5.92 7.57V22h-4.96v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.52V8z" />
            </svg>
          </a>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent hover:text-primary text-white/60 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.64 4.13.34 4.9.14 5.77.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.77.3 1.64.5 2.92.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56.79-.31 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92-.31-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.95 19.87.64c-.77-.3-1.64-.5-2.92-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
            </svg>
          </a>
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent hover:text-primary text-white/60 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.68 4.53-4.68 1.31 0 2.68.23 2.68.23v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79v8.44C19.61 23.08 24 18.09 24 12.07z" />
            </svg>
          </a>
        </div>
        <p className="text-white/30">Hecho en Colombia 🇨🇴</p>
      </div>
    </footer>
  );
}
