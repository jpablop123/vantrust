"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const insuranceTypes = [
  { value: "vehiculo", label: "Seguro Vehicular" },
  { value: "salud", label: "Seguro de Salud" },
  { value: "vivienda", label: "Seguro de Vivienda" },
  { value: "otro", label: "Otro / No estoy seguro" },
];

const horarios = [
  { value: "manana", label: "Mañana (8am - 12pm)" },
  { value: "tarde", label: "Tarde (12pm - 5pm)" },
  { value: "noche", label: "Noche (5pm - 8pm)" },
  { value: "cualquiera", label: "Cualquier horario" },
];

interface FormData {
  placa: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipoSeguro: string;
  horario: string;
  mensaje: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    placa: "",
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    tipoSeguro: "",
    horario: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Listen for external service selection (from Services cards)
  useEffect(() => {
    const select = document.getElementById("tipoSeguro") as HTMLSelectElement | null;
    if (!select) return;

    const handler = () => {
      setFormData((prev) => ({ ...prev, tipoSeguro: select.value }));
    };
    select.addEventListener("change", handler);
    return () => select.removeEventListener("change", handler);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar");
      setStatus("success");
      setFormData({
        placa: "",
        nombre: "",
        email: "",
        telefono: "",
        ciudad: "",
        tipoSeguro: "",
        horario: "",
        mensaje: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="cotizar" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info - 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Cotización Gratuita
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-3 mb-6">
              Solicita tu cotización en minutos
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Llena el formulario y un asesor se comunicará contigo en
              menos de 2 horas con las mejores opciones personalizadas.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  title: "Sin compromiso",
                  text: "Cotiza gratis y sin obligación de compra",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Respuesta rápida",
                  text: "Te contactamos en menos de 2 horas",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  ),
                  title: "Datos seguros",
                  text: "Tu información está protegida y cifrada",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">{item.title}</h4>
                    <p className="text-muted text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-800 font-medium mb-2">
                ¿Prefieres WhatsApp?
              </p>
              <a
                href="https://wa.me/57300000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right form - 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100"
            >
              {/* Personal info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-primary mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-primary mb-1.5">
                    Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    placeholder="+57 300 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="ciudad" className="block text-sm font-medium text-primary mb-1.5">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    placeholder="Bogotá, Medellín..."
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="tipoSeguro" className="block text-sm font-medium text-primary mb-1.5">
                    Tipo de seguro *
                  </label>
                  <select
                    id="tipoSeguro"
                    name="tipoSeguro"
                    required
                    value={formData.tipoSeguro}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Selecciona una opción</option>
                    {insuranceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="horario" className="block text-sm font-medium text-primary mb-1.5">
                    Horario preferido de contacto
                  </label>
                  <select
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Selecciona horario</option>
                    {horarios.map((h) => (
                      <option key={h.value} value={h.value}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Placa - simple text field */}
              <div className="mb-4">
                <label htmlFor="placa" className="block text-sm font-medium text-primary mb-1.5">
                  Placa del vehículo (si aplica)
                </label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm uppercase font-mono tracking-wider"
                  placeholder="ABC123"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-sm font-medium text-primary mb-1.5">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm resize-none"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-lg shadow-lg shadow-accent/20"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Solicitar Cotización Gratis"
                )}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                  <p className="text-green-700 font-semibold">
                    ¡Solicitud enviada con éxito!
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Un asesor se comunicará contigo en menos de 2 horas.
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center"
                >
                  <p className="text-red-600 font-medium text-sm">
                    Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-muted text-center mt-4">
                Al enviar aceptas nuestra{" "}
                <a href="/politica-privacidad" target="_blank" className="text-accent hover:underline">política de privacidad</a>
                {" "}y{" "}
                <a href="/terminos-de-uso" target="_blank" className="text-accent hover:underline">términos de uso</a>.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
