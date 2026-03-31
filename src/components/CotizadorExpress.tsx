"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Route,
  MapPin,
  User,
  CheckCircle,
  Phone,
  Clock,
  ChevronDown,
  Search,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | "loading" | "result";

interface FormData {
  marca: string;
  modelo: string;
  year: number;
  usage: string;
  usageLabel: string;
  city: string;
  nombre: string;
  celular: string;
  email: string;
  horario: string;
  horarioLabel: string;
  mensaje: string;
}

interface FieldErrors {
  nombre?: string;
  celular?: string;
  email?: string;
}

interface TouchedFields {
  nombre?: boolean;
  celular?: boolean;
  email?: boolean;
}

// --- Validators ---

function validateNombre(v: string): string | null {
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimmed))
    return "Ingresa tu nombre y apellido";
  if (trimmed.length < 3) return "Ingresa tu nombre y apellido";
  if (trimmed.split(/\s+/).filter(Boolean).length < 2)
    return "Ingresa tu nombre y apellido";
  return null;
}

function validateCelular(v: string): string | null {
  const digits = v.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length !== 10)
    return "Ingresa un celular colombiano válido (ej: 3001234567)";
  if (!digits.startsWith("3"))
    return "Ingresa un celular colombiano válido (ej: 3001234567)";
  return null;
}

function validateEmail(v: string): string | null {
  const trimmed = v.trim();
  if (!trimmed) return "El correo es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    return "El correo no parece válido";
  return null;
}

function isEmailValid(v: string): boolean {
  return !!v.trim() && !validateEmail(v);
}

function isNombreValid(v: string): boolean {
  const trimmed = v.trim();
  return (
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimmed) &&
    trimmed.length >= 3 &&
    trimmed.split(/\s+/).filter(Boolean).length >= 2
  );
}

function isCelularValid(v: string): boolean {
  const digits = v.replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("3");
}

function isOffHours(): boolean {
  const now = new Date();
  const bogota = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Bogota" })
  );
  const hour = bogota.getHours();
  const day = bogota.getDay();
  return hour >= 18 || day === 0 || day === 6;
}

function capitalizeWords(str: string): string {
  return str.replace(/(?:^|\s)[a-záéíóúñü]/g, (c) => c.toUpperCase());
}

// --- Constants ---

const carBrands = [
  "Chevrolet", "Renault", "Mazda", "Kia", "Hyundai", "Toyota", "Nissan",
  "Ford", "Volkswagen", "Suzuki", "BMW", "Mercedes-Benz", "Audi",
  "Fiat", "Mitsubishi", "Peugeot", "Citroën", "Jeep", "Dodge", "Ram",
  "Honda", "Subaru", "Volvo", "Mini", "Land Rover", "Porsche",
  "Chery", "JAC", "DFSK", "Great Wall", "BYD", "MG",
  "Alfa Romeo", "Seat", "Skoda", "Lexus", "Jaguar",
  "Foton", "JMC", "Tesla", "Otra",
];

const usageOptions = [
  { id: "poco", label: "Poco", desc: "Menos de 20 km/día" },
  { id: "normal", label: "Normal", desc: "20 a 60 km/día" },
  { id: "mucho", label: "Mucho", desc: "Más de 60 km/día" },
];

const cities = [
  "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
  "Cúcuta", "Bucaramanga", "Pereira", "Santa Marta", "Ibagué",
  "Pasto", "Manizales", "Neiva", "Villavicencio", "Armenia",
  "Valledupar", "Montería", "Popayán", "Sincelejo", "Tunja",
  "Florencia", "Riohacha", "Quibdó", "Yopal", "Mocoa",
  "Leticia", "Mitú", "Puerto Carreño", "Inírida", "San José del Guaviare",
  "Arauca", "San Andrés", "Sogamoso", "Duitama", "Girardot",
  "Barrancabermeja", "Palmira", "Buga", "Tuluá", "Cartago",
  "Buenaventura", "Zipaquirá", "Facatativá", "Chía", "Soacha",
  "Envigado", "Itagüí", "Bello", "Rionegro", "Apartadó",
  "Turbo", "Caucasia", "Magangué", "Lorica", "Sahagún",
  "Soledad", "Malambo", "Maicao", "Ciénaga", "Fundación",
  "Fusagasugá", "Girón", "Piedecuesta", "Floridablanca",
  "Dosquebradas", "La Virginia", "Santa Rosa de Cabal",
  "Otra",
];

const horarioOptions = [
  { id: "manana", label: "Mañana", desc: "8am - 12pm" },
  { id: "tarde", label: "Tarde", desc: "12pm - 6pm" },
  { id: "noche", label: "Noche", desc: "6pm - 8pm" },
];

const insurers = ["Bolívar", "Sura", "AXA", "Allianz"];

const stepIconComponents = [Car, Route, MapPin, User, CheckCircle];
const stepLabels = ["Carro", "Uso", "Ciudad", "Datos", "Listo"];

// --- Custom Dropdown ---

function SearchDropdown({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filtered = search
    ? options.filter((b) =>
        b.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border bg-white/5 text-sm transition-all cursor-pointer ${
          value
            ? "border-accent/40 text-white"
            : "border-white/10 text-white/25"
        } ${open ? "border-accent ring-2 ring-accent/20" : "hover:border-white/20"}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 w-full bg-[#162240] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="p-2 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-accent/40"
                />
              </div>
            </div>

            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-white/30 text-sm text-center">
                  {emptyMessage}
                </div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      value === opt
                        ? "bg-accent/15 text-accent font-medium"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- ProgressBar ---

function ProgressBar({ step }: { step: Step }) {
  const stepNum =
    step === "loading" || step === "result" ? 5 : (step as number);

  return (
    <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-10">
      {stepLabels.map((label, i) => {
        const idx = i + 1;
        const isActive = stepNum >= idx;
        const isCurrent = stepNum === idx;
        return (
          <div key={label} className="flex items-center gap-0.5 sm:gap-1">
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs transition-colors duration-300 ${
                  isActive
                    ? "bg-accent text-primary"
                    : "bg-white/10 text-white/30"
                } ${isCurrent ? "ring-2 ring-accent/40 ring-offset-2 ring-offset-[#0D1E35]" : ""}`}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {(() => {
                  if (stepNum > idx || step === "result") {
                    return (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    );
                  }
                  const IconComp = stepIconComponents[i];
                  return <IconComp className="w-4 h-4" />;
                })()}
              </motion.div>
              <span
                className={`text-[9px] sm:text-xs mt-1.5 transition-colors ${isActive ? "text-accent" : "text-white/30"}`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`w-5 sm:w-10 h-0.5 mb-5 rounded transition-colors duration-300 ${stepNum > idx ? "bg-accent" : "bg-white/10"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

// --- Validated Input ---

function ValidatedInput({
  value,
  error,
  touched,
  isValid,
  shake,
  inputRef,
  onBlur,
  onChange,
  type,
  id,
  inputMode,
  placeholder,
}: {
  value: string;
  error?: string;
  touched?: boolean;
  isValid: boolean;
  shake: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  inputMode?: "numeric" | "text" | "email" | "tel" | "search" | "none" | "url" | "decimal";
  placeholder?: string;
}) {
  const showError = touched && !!error;
  const showValid = touched && isValid && !error;

  let borderClass =
    "border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20";
  if (shake) borderClass = "border-red-400 ring-2 ring-red-400/30";
  else if (showError) borderClass = "border-red-400/60";
  else if (showValid) borderClass = "border-green-400/60";

  return (
    <div>
      <div className="relative">
        <motion.input
          ref={inputRef}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          type={type}
          id={id}
          inputMode={inputMode}
          placeholder={placeholder}
          animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`w-full px-4 py-3 pr-10 rounded-lg border bg-white/5 text-white placeholder-white/25 outline-none transition-all text-sm ${borderClass}`}
        />
        {showValid && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
        )}
      </div>
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// --- Main Component ---

export default function CotizadorExpress() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [submitError, setSubmitError] = useState<string | false>(false);
  const [shakeFields, setShakeFields] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const nombreRef = useRef<HTMLInputElement>(null);
  const celularRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<FormData>({
    marca: "",
    modelo: "",
    year: 2020,
    usage: "",
    usageLabel: "",
    city: "",
    nombre: "",
    celular: "",
    email: "",
    horario: "",
    horarioLabel: "",
    mensaje: "",
  });

  const update = (fields: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleBlur = useCallback(
    (field: "nombre" | "celular" | "email") => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      let err: string | null = null;
      if (field === "nombre") err = validateNombre(data.nombre);
      else if (field === "celular") err = validateCelular(data.celular);
      else if (field === "email") err = validateEmail(data.email);
      setErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
    },
    [data.nombre, data.celular, data.email]
  );

  const canSubmit =
    isNombreValid(data.nombre) && isCelularValid(data.celular) && isEmailValid(data.email);

  const goNext = () => {
    setDirection(1);
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const goBack = () => {
    setDirection(-1);
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  const validateAndSubmit = async () => {
    setTouched({ nombre: true, celular: true, email: true });

    const nombreErr = validateNombre(data.nombre);
    const celularErr = validateCelular(data.celular);
    const emailErr = validateEmail(data.email);
    setErrors({
      nombre: nombreErr ?? undefined,
      celular: celularErr ?? undefined,
      email: emailErr ?? undefined,
    });

    const missing: string[] = [];
    if (!isNombreValid(data.nombre)) missing.push("nombre");
    if (!isCelularValid(data.celular)) missing.push("celular");
    if (emailErr) missing.push("email");

    if (missing.length > 0) {
      setShakeFields(missing);
      setTimeout(() => setShakeFields([]), 600);
      if (missing.includes("nombre")) nombreRef.current?.focus();
      else if (missing.includes("celular")) celularRef.current?.focus();
      return;
    }

    setDirection(1);
    setStep("loading");
    setSubmitError(false);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre.trim(),
          telefono: data.celular.replace(/\D/g, ""),
          email: data.email.trim(),
          ciudad: data.city === "Otra" ? "" : data.city,
          tipoSeguro: "vehiculo",
          horario: data.horario,
          placa: "",
          mensaje: data.mensaje.trim(),
          marca_carro: data.marca,
          modelo_carro: data.modelo.trim(),
          anno_carro: data.year,
          uso_diario: data.usageLabel,
          fuente: "cotizador_express",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (res.status === 429) {
          setSubmitError(
            body?.error || "Ya tenemos tu solicitud, te contactamos pronto"
          );
          setStep(4);
          return;
        }
        throw new Error("Error");
      }
      setTimeout(() => setStep("result"), 2500);
    } catch {
      setSubmitError("Hubo un problema, intenta de nuevo");
      setStep(4);
    }
  };

  const getHorarioTime = () => {
    if (data.horario === "manana") return "12:00 p.m.";
    if (data.horario === "tarde") return "6:00 p.m.";
    if (data.horario === "noche") return "8:00 p.m.";
    return "las próximas 2 horas hábiles";
  };

  const firstName = data.nombre.trim().split(" ")[0] || "";

  const carSummary = [
    data.marca,
    data.modelo,
    data.year,
  ].filter(Boolean).join(" ");

  return (
    <section
      id="cotizar"
      className="py-24 bg-[#0D1E35] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Cotizador Express
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Tu seguro ideal en{" "}
            <span className="text-accent italic">minutos</span>
          </h2>
          <p className="text-white/40 mt-3 text-base">
            Sin precios sorpresa. Responde 4 preguntas y te contactamos con
            opciones reales.
          </p>
        </motion.div>

        <ProgressBar step={step} />

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 min-h-[380px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 1 - Brand + Model + Year */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
                  ¿Qué carro tienes?
                </h3>
                <p className="text-white/40 text-sm text-center mb-6">
                  Cuéntanos sobre tu vehículo
                </p>

                <div className="flex-1 space-y-4">
                  {/* Brand dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Marca *
                    </label>
                    <SearchDropdown
                      value={data.marca}
                      onChange={(brand) => update({ marca: brand })}
                      options={carBrands}
                      placeholder="Selecciona la marca"
                      searchPlaceholder="Buscar marca..."
                      emptyMessage="No se encontró la marca"
                    />
                  </div>

                  {/* Model input */}
                  <div>
                    <label
                      htmlFor="cot-modelo"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Modelo{" "}
                      <span className="text-white/20">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="cot-modelo"
                      value={data.modelo}
                      onChange={(e) => update({ modelo: e.target.value })}
                      placeholder="Ej: Spark, Sandero, CX-5, Tucson..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                    />
                  </div>

                  {/* Year slider */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Año
                    </label>
                    <div className="flex items-center gap-4">
                      <motion.span
                        key={data.year}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl sm:text-5xl font-bold text-accent tabular-nums shrink-0"
                      >
                        {data.year}
                      </motion.span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min={1970}
                          max={new Date().getFullYear() + 1}
                          value={data.year}
                          onChange={(e) => update({ year: Number(e.target.value) })}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125
                            [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-white/30 mt-1 px-1">
                          <span>1970</span>
                          <span>2000</span>
                          <span>{new Date().getFullYear() + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={goNext}
                  disabled={!data.marca}
                  className="mt-6 w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.02] text-lg disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </motion.div>
            )}

            {/* STEP 2 - Usage */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
                  ¿Cuánto manejas al día?
                </h3>
                <p className="text-white/40 text-sm text-center mb-8">
                  Selecciona la opción que más se ajuste
                </p>

                <div className="flex-1 grid grid-cols-3 gap-3 sm:gap-4 items-start">
                  {usageOptions.map((opt) => (
                    <motion.button
                      key={opt.id}
                      onClick={() =>
                        update({ usage: opt.id, usageLabel: opt.label })
                      }
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center p-4 sm:p-6 rounded-xl border transition-all duration-200 ${
                        data.usage === opt.id
                          ? "bg-accent/15 border-accent text-accent shadow-lg shadow-accent/10"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="font-bold text-base sm:text-lg mb-1">
                        {opt.label}
                      </span>
                      <span className="text-[10px] sm:text-xs opacity-60">
                        {opt.desc}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={goBack}
                    className="px-6 py-4 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all font-medium"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!data.usage}
                    className="flex-1 bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.02] text-lg disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Siguiente
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 - City */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
                  ¿En qué ciudad manejas?
                </h3>
                <p className="text-white/40 text-sm text-center mb-8">
                  Selecciona tu ciudad principal
                </p>

                <div className="flex-1">
                  <SearchDropdown
                    value={data.city}
                    onChange={(city) => update({ city })}
                    options={cities}
                    placeholder="Selecciona tu ciudad"
                    searchPlaceholder="Buscar ciudad..."
                    emptyMessage="No se encontró la ciudad"
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={goBack}
                    className="px-6 py-4 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all font-medium"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!data.city}
                    className="flex-1 bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.02] text-lg disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Siguiente
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 - Contact details */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-1">
                  ¿A dónde te enviamos las opciones?
                </h3>
                <p className="text-white/40 text-sm text-center mb-6">
                  Un asesor te contacta en menos de 2 horas
                </p>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
                  >
                    <p className="text-red-400 text-sm font-medium">
                      {submitError}
                    </p>
                  </motion.div>
                )}

                <div className="flex-1 space-y-4">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="cot-nombre"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Nombre completo *
                    </label>
                    <ValidatedInput
                      inputRef={nombreRef}
                      type="text"
                      id="cot-nombre"
                      value={data.nombre}
                      onChange={(e) => {
                        const raw = e.target.value.replace(
                          /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,
                          ""
                        );
                        update({ nombre: capitalizeWords(raw) });
                      }}
                      onBlur={() => handleBlur("nombre")}
                      error={errors.nombre}
                      touched={touched.nombre}
                      isValid={isNombreValid(data.nombre)}
                      shake={shakeFields.includes("nombre")}
                      placeholder="Tu nombre y apellido"
                    />
                  </div>

                  {/* Celular */}
                  <div>
                    <label
                      htmlFor="cot-celular"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Celular *
                    </label>
                    <ValidatedInput
                      inputRef={celularRef}
                      type="tel"
                      id="cot-celular"
                      inputMode="numeric"
                      value={data.celular}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                        update({ celular: v });
                      }}
                      onBlur={() => handleBlur("celular")}
                      error={errors.celular}
                      touched={touched.celular}
                      isValid={isCelularValid(data.celular)}
                      shake={shakeFields.includes("celular")}
                      placeholder="3001234567"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="cot-email"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Email <span className="text-accent">*</span>
                    </label>
                    <ValidatedInput
                      type="email"
                      id="cot-email"
                      value={data.email}
                      onChange={(e) => update({ email: e.target.value })}
                      onBlur={() => handleBlur("email")}
                      error={errors.email}
                      touched={touched.email}
                      isValid={
                        !!data.email.trim() && !validateEmail(data.email)
                      }
                      shake={shakeFields.includes("email")}
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Horario */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      ¿Cuándo podemos llamarte?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {horarioOptions.map((h) => (
                        <motion.button
                          key={h.id}
                          type="button"
                          onClick={() =>
                            update({ horario: h.id, horarioLabel: h.label })
                          }
                          whileTap={{ scale: 0.95 }}
                          className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 ${
                            data.horario === h.id
                              ? "bg-accent/15 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                          }`}
                        >
                          <span className="text-xs font-semibold">
                            {h.label}
                          </span>
                          <span className="text-[10px] opacity-60">
                            {h.desc}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    {isOffHours() && (
                      <p className="text-accent/70 text-xs mt-2 text-center">
                        Te contactaremos el próximo día hábil en el horario que
                        elegiste
                      </p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="cot-mensaje"
                      className="block text-sm font-medium text-white/60 mb-1.5"
                    >
                      Algo más?{" "}
                      <span className="text-white/20">(opcional)</span>
                    </label>
                    <textarea
                      id="cot-mensaje"
                      value={data.mensaje}
                      onChange={(e) =>
                        update({ mensaje: e.target.value.slice(0, 200) })
                      }
                      maxLength={200}
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/25 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm resize-none"
                      placeholder="Ej: también tengo moto, busco todo riesgo..."
                    />
                    <div
                      className={`text-right text-[10px] mt-0.5 ${data.mensaje.length >= 180 ? "text-accent" : "text-white/20"}`}
                    >
                      {data.mensaje.length}/200
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 sm:mt-8">
                  <button
                    onClick={goBack}
                    className="px-6 py-4 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all font-medium"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={validateAndSubmit}
                    disabled={!canSubmit}
                    className="flex-1 bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all hover:scale-[1.02] text-lg disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    Enviar y ver mi perfil
                  </button>
                </div>
              </motion.div>
            )}

            {/* LOADING */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center py-16"
              >
                <div className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full animate-spin mb-8" />

                <div className="space-y-3 w-full max-w-xs">
                  {[
                    "Registrando tu perfil",
                    "Buscando aseguradoras ideales",
                    "Asignando asesor disponible",
                  ].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.7 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.7 + 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </motion.div>
                      <span className="text-white/70 text-sm">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex flex-col"
              >
                <div className="bg-white/10 rounded-xl p-6 sm:p-8 border border-accent/20 mb-5">
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      ¡Tu perfil está listo!
                    </h3>
                  </div>

                  {/* Profile summary */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-white/80 text-sm">
                        {data.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-white/80 text-sm">
                        {data.celular}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-white/80 text-sm">
                        {data.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-white/80 text-sm">
                        {carSummary} · Uso {data.usageLabel}
                      </span>
                    </div>
                    {data.horarioLabel && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-white/80 text-sm">
                          Disponible: {data.horarioLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <p className="text-white/70 text-sm leading-relaxed text-center">
                      Listo{" "}
                      <strong className="text-accent">{firstName}</strong>, un
                      asesor de VanTrust te contactará al{" "}
                      <strong className="text-white">{data.celular}</strong>{" "}
                      antes de {getHorarioTime()} con opciones de:
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                      {insurers.map((name) => (
                        <span
                          key={name}
                          className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white/70 text-xs font-semibold"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Response badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-center mb-5"
                >
                  <span className="text-green-400 font-semibold text-sm flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Respuesta en menos de 2 horas hábiles
                  </span>
                </motion.div>

                <p className="text-white/25 text-xs text-center mb-5">
                  Sin costo · Sin compromiso · 100% confidencial
                </p>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/57300000000?text=Hola%2C%20acabo%20de%20cotizar%20en%20la%20web%20y%20quiero%20m%C3%A1s%20info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-green-500/30 text-green-400 hover:bg-green-500/10 font-semibold transition-all text-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Mientras tanto, escríbenos por WhatsApp →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
