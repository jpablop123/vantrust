"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Por qué usar VanTrust y no ir directo a la aseguradora?",
    answer:
      "Porque nosotros comparamos entre 8+ aseguradoras para encontrarte la mejor cobertura al mejor precio. Si vas directo, solo ves una opción. Con nosotros ves todas y eliges la que más te conviene, con un asesor que te acompaña en todo el proceso.",
  },
  {
    question: "¿El precio es el mismo si compro a través de ustedes?",
    answer:
      "Exactamente el mismo. Por ley, el precio del seguro es igual si lo compras directo o a través de un intermediario. La diferencia es que con nosotros tienes asesoría gratuita, comparación entre aseguradoras y alguien que te ayuda cuando necesitas usar tu póliza.",
  },
  {
    question: "¿Qué pasa si tengo un accidente o necesito usar el seguro?",
    answer:
      "Nos llamas a nosotros primero. Tu asesor se encarga de reportar el siniestro a la aseguradora, coordinar el peritaje y hacer seguimiento hasta que todo quede resuelto. No te dejan solo con un call center.",
  },
  {
    question: "¿Cuánto tiempo toma todo el proceso?",
    answer:
      "Cotizar te toma menos de 3 minutos en nuestra web. Un asesor te contacta en máximo 2 horas con opciones reales. Si decides comprar, la póliza puede quedar activa el mismo día.",
  },
  {
    question: "¿Es seguro darles mis datos personales?",
    answer:
      "Totalmente. Estamos registrados ante la Superfinanciera con RUI vigente. Tus datos se usan exclusivamente para cotizar tu seguro y están protegidos bajo la Ley 1581 de protección de datos personales de Colombia.",
  },
  {
    question: "¿Puedo cancelar mi seguro cuando quiera?",
    answer:
      "Sí. Puedes cancelar en cualquier momento y la aseguradora te devuelve la parte proporcional del periodo que no usaste. Nosotros te ayudamos con el proceso para que no tengas que hacer nada.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Preguntas frecuentes
          </span>
          <div className="w-10 h-[3px] bg-accent rounded-full mx-auto mt-4 mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Lo que todo cliente pregunta
          </h2>
          <p className="text-muted mt-4 text-lg">
            Las respuestas que necesitas antes de tomar una decisión.
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-surface/50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-primary text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
