"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { waLink } from "@/lib/site";

import { FAQS_HOME as faqs } from "@/data/faqs";

const CATS = ["General", "Personas", "Empresas"] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Lo que todo cliente{" "}
            <span className="text-gold-gradient italic">pregunta</span>
          </h2>
          <p className="text-muted mt-4 text-lg">
            Las respuestas que necesitas antes de tomar una decisión.
          </p>
        </motion.div>

        <div className="space-y-8">
          {CATS.map((cat) => {
            const items = faqs
              .map((f, i) => ({ f, i }))
              .filter((x) => x.f.cat === cat);
            return (
              <div key={cat}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent-dark mb-3 pl-1">
                  {cat}
                </h3>
                <div className="space-y-3">
                  {items.map(({ f, i }) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={f.question}
                        className="bg-white rounded-xl border border-primary/10 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-${i}`}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="font-semibold text-primary text-sm sm:text-base">
                            {f.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {/* La respuesta siempre está en el HTML (SEO/FAQPage);
                            solo se colapsa con CSS. */}
                        <div
                          id={`faq-${i}`}
                          inert={!isOpen}
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                              <div className="px-5 pb-5 text-muted text-sm leading-relaxed">
                                <p>{f.answer}</p>
                                {f.list && (
                                  <ul className="mt-3 grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                                    {f.list.map((item) => (
                                      <li
                                        key={item}
                                        className="flex items-start gap-2"
                                      >
                                        <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA de cierre */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-primary bg-grid p-8 sm:p-10 text-center">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)]" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              ¿No encontró la respuesta que buscaba?
            </h3>
            <p className="text-white/60 max-w-xl mx-auto mb-4">
              Nuestro equipo está listo para resolver sus dudas y ayudarle a
              elegir el seguro que mejor se adapte a sus necesidades.
            </p>
            <p className="text-white/40 text-xs flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-7">
              <span>✔ Atención personalizada</span>
              <span>✔ Cotización con varias aseguradoras</span>
              <span>✔ Acompañamiento durante todo el proceso</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#cotizar"
                className="btn-shine glow-accent bg-gradient-to-r from-accent-light via-accent to-accent-dark text-primary font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
              >
                Solicitar cotización
              </a>
              <a
                href={waLink({ mensaje: "Hola, tengo una duda sobre los seguros de VanTrust" })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
