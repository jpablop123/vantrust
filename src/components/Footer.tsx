import Image from "next/image";
import logoDark from "../../public/vantrustfondoazul.png";
import { ShieldCheck, Phone, Mail, MessageCircle } from "lucide-react";

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
                src={logoDark}
                alt="VanTrust"
                style={{ height: "64px", width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Intermediario autorizado de seguros en Colombia. Protegemos lo que
              más importa para ti y tu familia.
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
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +57 300 000 0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                info@vantrust.co
              </li>
              <li>
                <a
                  href="https://wa.me/57300000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors duration-200 mt-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp directo
                </a>
              </li>
              <li className="text-white/30 text-xs pt-1">
                Lun - Vie · 8am - 7pm
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gold separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <p>
          &copy; {new Date().getFullYear()} VanTrust · Todos los derechos
          reservados
        </p>
        <p className="text-white/30">Hecho en Colombia 🇨🇴</p>
      </div>
    </footer>
  );
}
