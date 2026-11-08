"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { BellRing, CheckCircle } from "lucide-react";
import SelectDropdown from "@/components/cotizador/SelectDropdown";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { INSURERS, waLink } from "@/lib/site";
import { crearRenovacion } from "@/lib/leads-client";
import { trackInicioCotizacion } from "@/lib/tracking";
import { RAMOS_RENOVACION, RAMO_RENOVACION_LABEL } from "@/lib/renovaciones";
import {
  CELULAR_ERROR,
  celularValido,
  normalizarCelular,
  normalizarPlaca,
  placaValida,
} from "@/lib/validacion";

const ASEGURADORAS = [...INSURERS, "Otra", "No sé"];

/** YYYY-MM-DD local + n días. */
function fechaMas(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toLocaleDateString("en-CA");
}

export default function RenovacionForm() {
  const uid = useId();
  const okRef = useRef<HTMLDivElement>(null);
  const [ramo, setRamo] = useState("");
  const [aseguradora, setAseguradora] = useState("");
  const [placa, setPlaca] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [intentado, setIntentado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [listo, setListo] = useState<null | { urgente: boolean }>(null);

  // Límites del calendario: hoy → 13 meses. Se calculan en el cliente para no
  // desfasar la hidratación con la hora del servidor.
  const [rango, setRango] = useState({ min: "", max: "" });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende de la fecha del navegador
    setRango({ min: fechaMas(0), max: fechaMas(400) });
  }, []);

  useEffect(() => {
    if (listo) okRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [listo]);

  const errores: Record<string, string | null> = {
    ramo: ramo ? null : "Elige el tipo de póliza",
    fecha: fecha ? null : "Indica cuándo vence",
    nombre: nombre.trim().length >= 3 ? null : "Escribe tu nombre",
    celular: celularValido(celular) ? null : CELULAR_ERROR,
    placa:
      ramo === "vehiculo" && placa && !placaValida(placa) ? "Placa no válida (ej: ABC123)" : null,
    autoriza: autoriza ? null : "Necesitamos tu autorización para avisarte",
  };
  const ver = (k: string) => (intentado ? errores[k] : null);
  const valido = Object.values(errores).every((e) => !e);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!valido) {
      setIntentado(true);
      return;
    }
    setEnviando(true);
    setErrorEnvio("");
    const r = await crearRenovacion(
      {
        nombre: nombre.trim(),
        telefono: normalizarCelular(celular),
        ramo,
        aseguradora: aseguradora === "No sé" ? "" : aseguradora,
        placa: ramo === "vehiculo" ? normalizarPlaca(placa) : "",
        fecha_vencimiento: fecha,
      },
      { autorizacion: autoriza }
    );
    setEnviando(false);
    if (!r.ok) {
      setErrorEnvio(r.error);
      return;
    }
    // Vence en 30 días o menos: el equipo ya recibió el aviso urgente.
    const dias = Math.round((Date.parse(fecha) - Date.parse(fechaMas(0))) / 86_400_000);
    setListo({ urgente: dias <= 30 });
  };

  if (listo) {
    const firstName = nombre.trim().split(" ")[0];
    return (
      <div ref={okRef} className="text-center py-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-5">
          <CheckCircle className="w-9 h-9 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">¡Listo, {firstName}!</h3>
        <p className="text-white/65 max-w-md mx-auto mb-6 leading-relaxed">
          {listo.urgente
            ? "Tu póliza vence pronto, así que un asesor te va a escribir hoy por WhatsApp con opciones para comparar."
            : "Te escribimos por WhatsApp 30 días antes del vencimiento con opciones de varias aseguradoras para que compares con calma."}
        </p>
        <a
          href={waLink({
            mensaje: `Hola, soy ${firstName}. Me registré para la renovación de mi seguro de ${(
              RAMO_RENOVACION_LABEL[ramo] || ""
            ).toLowerCase()} y quiero comparar desde ya.`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
        >
          <WhatsAppIcon />
          ¿No quieres esperar? Escríbenos ya
        </a>
      </div>
    );
  }

  const inputCls = (err: string | null | undefined) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white/[0.07] text-white placeholder-white/30 outline-none focus:bg-white/[0.1] transition-all text-[16px] ${
      err
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/25"
        : "border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/25"
    }`;
  const labelCls = "block text-[13px] font-medium text-white/55 mb-1.5";
  const errCls = "mt-1.5 text-[12px] text-red-400 leading-snug";
  const err = (k: string) => ver(k) && <p className={errCls}>{ver(k)}</p>;

  return (
    <form
      onSubmit={enviar}
      onFocusCapture={() => trackInicioCotizacion("renovacion", "renovacion")}
      noValidate
      className="space-y-4"
    >
      {errorEnvio && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
          <p className="text-red-400 text-sm font-medium">{errorEnvio}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${uid}-ramo`} className={labelCls}>
            ¿Qué póliza tienes? <span className="text-accent">*</span>
          </label>
          <SelectDropdown
            id={`${uid}-ramo`}
            value={RAMO_RENOVACION_LABEL[ramo] || ""}
            onChange={(label) =>
              setRamo(RAMOS_RENOVACION.find((r) => r.label === label)?.value || "")
            }
            options={RAMOS_RENOVACION.map((r) => r.label)}
            invalid={!!ver("ramo")}
          />
          {err("ramo")}
        </div>
        <div>
          <label htmlFor={`${uid}-aseg`} className={labelCls}>
            Aseguradora actual
          </label>
          <SelectDropdown
            id={`${uid}-aseg`}
            value={aseguradora}
            onChange={setAseguradora}
            options={ASEGURADORAS}
          />
        </div>
      </div>

      {ramo === "vehiculo" && (
        <div>
          <label htmlFor={`${uid}-placa`} className={labelCls}>
            Placa <span className="text-white/35">(opcional)</span>
          </label>
          <input
            id={`${uid}-placa`}
            value={placa}
            onChange={(e) => setPlaca(normalizarPlaca(e.target.value))}
            placeholder="ABC123"
            autoCapitalize="characters"
            autoComplete="off"
            className={`${inputCls(ver("placa"))} uppercase tracking-[0.25em] font-semibold`}
          />
          {err("placa")}
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-fecha`} className={labelCls}>
          ¿Cuándo vence? <span className="text-accent">*</span>
        </label>
        <input
          id={`${uid}-fecha`}
          type="date"
          value={fecha}
          min={rango.min || undefined}
          max={rango.max || undefined}
          onChange={(e) => setFecha(e.target.value)}
          className={`${inputCls(ver("fecha"))} [color-scheme:dark]`}
        />
        <p className="mt-1.5 text-[12px] text-white/40">
          Está en tu póliza o en el correo de tu aseguradora. Si no la tienes exacta, pon la aproximada.
        </p>
        {err("fecha")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${uid}-nombre`} className={labelCls}>
            Tu nombre <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-nombre`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="name"
            placeholder="Nombre y apellido"
            className={inputCls(ver("nombre"))}
          />
          {err("nombre")}
        </div>
        <div>
          <label htmlFor={`${uid}-celular`} className={labelCls}>
            Tu WhatsApp <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-celular`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={celular}
            onChange={(e) => setCelular(normalizarCelular(e.target.value))}
            placeholder="3001234567"
            className={inputCls(ver("celular"))}
          />
          {err("celular")}
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoriza}
            onChange={(e) => setAutoriza(e.target.checked)}
            className="mt-0.5 w-5 h-5 shrink-0 accent-[#BFA15C] cursor-pointer"
          />
          <span className="text-[12.5px] text-white/60 leading-relaxed">
            Autorizo a Vantrust Agencia de Seguros LTDA. a tratar mis datos
            personales para avisarme del vencimiento de mi póliza y cotizar
            seguros, según su{" "}
            <Link
              href="/politica-privacidad"
              target="_blank"
              className="text-accent underline underline-offset-2 hover:text-accent-light"
            >
              Política de Tratamiento de Datos
            </Link>{" "}
            (Ley 1581 de 2012). <span className="text-accent">*</span>
          </span>
        </label>
        {err("autoriza")}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className={`w-full bg-accent hover:bg-accent-light text-primary font-bold py-4 rounded-xl transition-all text-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          valido ? "hover:scale-[1.01]" : "opacity-70"
        }`}
      >
        {enviando ? (
          <>
            <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            Guardando…
          </>
        ) : (
          <>
            <BellRing className="w-5 h-5" />
            Avísenme antes de que venza
          </>
        )}
      </button>
      <p className="text-white/35 text-xs text-center">
        Sin costo · Sin compromiso · Solo te escribimos para tu renovación
      </p>
    </form>
  );
}
