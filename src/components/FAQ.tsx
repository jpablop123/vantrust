"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { waLink } from "@/lib/site";

type Faq = {
  cat: "General" | "Personas" | "Empresas";
  question: string;
  answer: string;
  list?: string[];
};

const faqs: Faq[] = [
  // ── General ──
  {
    cat: "General",
    question: "¿Por qué usar VanTrust y no ir directo a la aseguradora?",
    answer:
      "Porque comparamos entre 10 aseguradoras aliadas para encontrarte la mejor cobertura al mejor precio. Si vas directo, solo ves una opción; con nosotros ves varias y eliges la que más te conviene, con un asesor que te acompaña en todo el proceso.",
  },
  {
    cat: "General",
    question: "¿El precio es el mismo si compro a través de ustedes?",
    answer:
      "Exactamente el mismo. Por ley, el precio del seguro es igual si lo compras directo o a través de un intermediario. La diferencia es que con nosotros tienes asesoría gratuita, comparación entre aseguradoras y alguien que te ayuda cuando necesitas usar tu póliza.",
  },
  {
    cat: "General",
    question: "¿Cuánto tiempo toma todo el proceso?",
    answer:
      "Cotizar te toma pocos minutos en nuestra web. Un asesor te contacta en un plazo aproximado de 1 hora con opciones reales. Si decides comprar, la póliza puede quedar activa el mismo día.",
  },
  {
    cat: "General",
    question: "¿Es seguro darles mis datos personales?",
    answer:
      "Totalmente. Estamos registrados ante la Superintendencia Financiera con RUI vigente. Tus datos se usan exclusivamente para cotizar tu seguro y están protegidos bajo la Ley 1581 de 2012 de protección de datos personales de Colombia.",
  },
  {
    cat: "General",
    question: "¿Qué es un deducible?",
    answer:
      "El deducible es el valor que debe asumir el asegurado cuando ocurre un siniestro cubierto por la póliza. Por ejemplo: si el daño asciende a $20.000.000 y el deducible es de $2.000.000, la aseguradora indemniza $18.000.000 y el asegurado asume los $2.000.000 restantes. Puede establecerse como un valor fijo, un porcentaje, o el mayor entre ambos, según las condiciones de la póliza.",
  },

  // ── Personas ──
  {
    cat: "Personas",
    question: "¿Puedo cancelar mi seguro cuando quiera?",
    answer:
      "Sí. Puedes cancelar en cualquier momento y la aseguradora te devuelve la parte proporcional del periodo que no usaste. Nosotros te ayudamos con el proceso.",
  },
  {
    cat: "Personas",
    question: "¿Cómo funciona un seguro de salud?",
    answer:
      "Un seguro de salud brinda acceso a servicios médicos adicionales o complementarios al sistema de salud obligatorio. Dependiendo del plan contratado, puede incluir:",
    list: [
      "Consultas con especialistas",
      "Hospitalización",
      "Cirugías",
      "Exámenes diagnósticos",
      "Urgencias",
      "Maternidad",
      "Medicina preventiva",
      "Red de clínicas y hospitales",
    ],
  },
  {
    cat: "Personas",
    question: "¿Qué pasa si vendo mi vehículo asegurado?",
    answer:
      "Si vendes tu vehículo, es importante informar a la aseguradora lo antes posible. Dependiendo del caso, podrás cancelar la póliza y solicitar la devolución de la prima no consumida (si aplica), ceder la póliza al nuevo propietario cuando la aseguradora lo permita, o trasladar el saldo a un nuevo vehículo. No informar la venta puede generar inconvenientes en caso de un siniestro.",
  },
  {
    cat: "Personas",
    question: "¿Qué hacer en caso de accidente?",
    answer: "Si sufres un accidente, te recomendamos:",
    list: [
      "Mantener la calma y verificar que todas las personas estén bien",
      "Comunicarte con la línea de asistencia de tu aseguradora",
      "No admitir responsabilidades en el lugar del accidente",
      "Tomar fotografías de los vehículos y de la escena",
      "Recopilar los datos de los involucrados y testigos",
      "Seguir las instrucciones de la aseguradora para la atención del siniestro",
    ],
  },

  // ── Empresas ──
  {
    cat: "Empresas",
    question: "¿Qué seguro necesita una empresa?",
    answer:
      "Depende de su actividad económica, tamaño, número de empleados y riesgos a los que está expuesta. Algunas de las pólizas más comunes son: Seguro Pyme, Todo Riesgo Daños Materiales, Responsabilidad Civil Extracontractual, Cumplimiento, Transporte de Mercancías, Manejo Global, Riesgos Cibernéticos, Vida Grupo, Salud Empresarial y D&O. En VanTrust analizamos cada empresa para recomendar las coberturas que realmente necesita, evitando sobrecostos y vacíos de protección.",
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre un seguro Pyme?",
    answer:
      "El Seguro Pyme ofrece protección integral para pequeñas y medianas empresas mediante una sola póliza. Puede incluir:",
    list: [
      "Incendio y terremoto",
      "Robo",
      "Equipo electrónico",
      "Dinero en efectivo",
      "Transporte de valores",
      "Lucro cesante",
      "Responsabilidad Civil",
      "Infidelidad de empleados",
      "Asistencias empresariales",
    ],
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre un seguro Todo Riesgo?",
    answer:
      "El Seguro Todo Riesgo Daños Materiales protege los activos físicos de una empresa frente a pérdidas o daños ocasionados por eventos accidentales. Generalmente cubre:",
    list: [
      "Incendio",
      "Explosión",
      "Terremoto",
      "Inundación",
      "Robo",
      "Daños por fenómenos naturales",
      "Actos malintencionados de terceros (según condiciones)",
      "Daños accidentales",
    ],
  },
  {
    cat: "Empresas",
    question: "¿Qué es una póliza de cumplimiento?",
    answer:
      "Es un seguro que garantiza el cumplimiento de las obligaciones adquiridas en un contrato. Protege al contratante frente a posibles incumplimientos del contratista y puede amparar el cumplimiento del contrato, la correcta inversión del anticipo, el pago de salarios y prestaciones sociales, la calidad de bienes o servicios, la estabilidad de la obra y el correcto funcionamiento de equipos. Es ampliamente utilizada en contratos con entidades públicas y privadas.",
  },
  {
    cat: "Empresas",
    question: "¿Qué cubre una póliza de transporte de mercancías?",
    answer:
      "Protege la carga durante su movilización frente a pérdidas o daños ocasionados por eventos accidentales. Dependiendo de la póliza, puede cubrir incendio, robo, volcamiento, colisión, avería, saqueo, daños durante el cargue y descargue (según condiciones) y riesgos durante el transporte nacional o internacional. Ideal para empresas que movilizan mercancías con frecuencia.",
  },
  {
    cat: "Empresas",
    question: "¿Qué es una ARL?",
    answer:
      "La Administradora de Riesgos Laborales (ARL) protege a los trabajadores frente a accidentes de trabajo y enfermedades laborales. Entre sus beneficios: atención médica, incapacidades, rehabilitación, pensión por invalidez cuando corresponda, indemnizaciones, prestaciones por fallecimiento de origen laboral y asesoría en Seguridad y Salud en el Trabajo. En Colombia la afiliación a una ARL es obligatoria para los empleadores.",
  },
  {
    cat: "Empresas",
    question: "¿Cómo afilio a mis trabajadores a una ARL?",
    answer:
      "La afiliación es obligatoria y debe hacerse antes de que el trabajador inicie labores. El proceso generalmente incluye:",
    list: [
      "Elegir la ARL que mejor se adapte a las necesidades de la empresa",
      "Diligenciar el formulario de afiliación de la empresa y de los trabajadores",
      "Suministrar la documentación requerida (RUT, Cámara de Comercio, documento del representante legal)",
      "Clasificar correctamente el nivel de riesgo de la actividad económica",
      "Formalizar la afiliación para que los trabajadores tengan cobertura desde el inicio",
    ],
  },
];

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
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
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
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                href={waLink("Hola, tengo una duda sobre los seguros de VanTrust")}
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
