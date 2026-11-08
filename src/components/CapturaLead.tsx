"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { crearLead, leadSesion } from "@/lib/leads-client";
import { CELULAR_ERROR, celularValido, normalizarCelular } from "@/lib/validacion";
import { PYME_A_SLUG } from "@/data/seo/pymes";
import { GRACIAS_KEY } from "@/app/gracias/GraciasContent";

/**
 * Todo CTA de contacto captura el lead. Intercepta los clics a WhatsApp
 * (wa.me) y a llamadas (tel:) en todo el sitio, pide nombre y celular con la
 * autorización de datos, crea el lead (Supabase, Telegram, correo y el evento
 * Lead en Meta/GA4 vía crearLead) y luego abre WhatsApp o la llamada.
 *
 * - Quien ya dejó sus datos en la pestaña (ver leadSesion) pasa directo.
 * - El ramo sale de `data-lead-ramo` en el enlace o, si no, de la URL.
 * - `data-lead-accion="solicitar-llamada"`: no marca el número; lleva a
 *   /gracias porque es el asesor quien llama.
 * - El evento "Contact" lo sigue registrando <Tracking /> en el clic.
 */

type Destino = {
  href: string;
  tipo: "whatsapp" | "llamada" | "solicitar-llamada";
  ramo: string;
};

// Slug de /seguros/<slug> → clave de tipo de seguro que usa /api/leads.
const SLUG_A_TIPO: Record<string, string> = {
  automoviles: "vehiculo",
  "accidentes-personales": "accidentes",
  "responsabilidad-civil-extracontractual": "rc",
  "transporte-de-mercancias": "transporte",
  "todo-riesgo-danos-materiales": "todo_riesgo",
};

function ramoDesdeUrl(pathname: string): string {
  const [, seccion, slug] = pathname.match(/^\/(seguros|pymes)\/([^/]+)/) ?? [];
  if (!slug) return "otro";
  const s = seccion === "pymes" ? PYME_A_SLUG[slug] ?? slug : slug;
  return SLUG_A_TIPO[s] ?? s;
}

/** `data-lead-ramo` admite el slug de la página del ramo (p. ej. "automoviles"). */
function ramoDeEnlace(v: string | null): string {
  return v ? SLUG_A_TIPO[v] ?? v : "";
}

const NOMBRE_RE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'’.-]+$/;

/** Pone el nombre en el mensaje prellenado de WhatsApp. */
function conNombre(href: string, nombre: string): string {
  try {
    const url = new URL(href);
    const texto = url.searchParams.get("text") || "";
    const primero = nombre.trim().split(/\s+/)[0];
    const resto = texto.replace(/^hola[,!.]?\s*/i, "");
    const nuevo = `Hola, soy ${primero}. ${resto.charAt(0).toUpperCase()}${resto.slice(1)}`.trim();
    // Igual que waLink: espacios como %20, no como "+".
    return `${url.origin}${url.pathname}?text=${encodeURIComponent(nuevo)}`;
  } catch {
    return href;
  }
}

export default function CapturaLead() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const uid = useId();
  const [destino, setDestino] = useState<Destino | null>(null);
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [intentado, setIntentado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const nombreRef = useRef<HTMLInputElement>(null);

  // Un solo listener para todos los enlaces de contacto, presentes y futuros.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const accion = a.getAttribute("data-lead-accion");
      const tipo: Destino["tipo"] | null = href.startsWith("https://wa.me/")
        ? "whatsapp"
        : href.startsWith("tel:")
          ? accion === "solicitar-llamada"
            ? "solicitar-llamada"
            : "llamada"
          : null;
      if (!tipo) return;
      // En el panel los contactos son del equipo hacia el cliente: sin ventana.
      if (window.location.pathname.startsWith("/panel")) return;
      if (leadSesion() && tipo !== "solicitar-llamada") return; // ya tenemos sus datos
      e.preventDefault();
      setDestino({
        href,
        tipo,
        ramo: ramoDeEnlace(a.getAttribute("data-lead-ramo")) || ramoDesdeUrl(window.location.pathname),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const cerrar = useCallback(() => {
    setDestino(null);
    setErrorEnvio("");
    setIntentado(false);
  }, []);

  // Foco en el primer campo y Escape para cerrar.
  useEffect(() => {
    if (!destino) return;
    const sesion = leadSesion();
    if (sesion?.nombre && !nombre) setNombre(sesion.nombre);
    nombreRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destino, cerrar]);

  if (!destino) return null;

  const nombreLimpio = nombre.trim().replace(/\s+/g, " ");
  const errores = {
    nombre:
      nombreLimpio.length < 3 || !NOMBRE_RE.test(nombreLimpio)
        ? "Escribe tu nombre (solo letras)"
        : null,
    celular: celularValido(celular) ? null : CELULAR_ERROR,
    autoriza: autoriza ? null : "Necesitamos tu autorización para contactarte",
  };
  const valido = !errores.nombre && !errores.celular && !errores.autoriza;
  const ver = (k: keyof typeof errores) => (intentado ? errores[k] : null);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!valido) {
      setIntentado(true);
      return;
    }
    // WhatsApp se abre en una pestaña creada en este mismo clic: si se abriera
    // después de la respuesta del servidor, el navegador la bloquearía.
    const ventana = destino.tipo === "whatsapp" ? window.open("", "_blank") : null;
    setEnviando(true);
    setErrorEnvio("");
    const telefono = normalizarCelular(celular);
    const r = await crearLead(
      {
        nombre: nombreLimpio,
        telefono,
        tipoSeguro: destino.ramo,
        fuente: `cta_${destino.tipo.replace(/-/g, "_")}:${pathname}`.slice(0, 80),
      },
      { autorizacion: true }
    );
    setEnviando(false);
    if (!r.ok) {
      ventana?.close();
      setErrorEnvio(r.error);
      return;
    }
    if (destino.tipo === "whatsapp") {
      const url = conNombre(destino.href, nombreLimpio);
      if (ventana) ventana.location.href = url;
      else window.location.href = url;
    } else if (destino.tipo === "llamada") {
      window.location.href = destino.href;
    } else {
      try {
        sessionStorage.setItem(
          GRACIAS_KEY,
          JSON.stringify({ nombre: nombreLimpio, tipoSeguro: "una llamada de un asesor" })
        );
      } catch {
        // sin sessionStorage, /gracias muestra el mensaje genérico
      }
      router.push("/gracias");
    }
    cerrar();
  };

  const titulos = {
    whatsapp: {
      h: "Antes de abrir WhatsApp",
      p: "Déjanos tu nombre y número para que un asesor te atienda de una vez y no se pierda tu solicitud.",
      boton: "Continuar a WhatsApp",
    },
    llamada: {
      h: "Antes de llamar",
      p: "Déjanos tu nombre y número: si la línea está ocupada, un asesor te devuelve la llamada.",
      boton: "Continuar a la llamada",
    },
    "solicitar-llamada": {
      h: "Te llamamos nosotros",
      p: "Déjanos tu nombre y número y un asesor te llama en aproximadamente 1 hora.",
      boton: "Quiero que me llamen",
    },
  }[destino.tipo];

  const inputCls = (err: string | null) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white/[0.07] text-white placeholder-white/30 outline-none focus:bg-white/[0.1] transition-all text-[16px] ${
      err
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/25"
        : "border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/25"
    }`;
  const labelCls = "block text-[13px] font-medium text-white/55 mb-1.5";
  const errCls = "mt-1.5 text-[12px] text-red-400 leading-snug";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && cerrar()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-titulo`}
        className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-primary bg-grid border border-white/10 shadow-2xl shadow-black/40 p-6 sm:p-8"
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[radial-gradient(ellipse_at_top,rgba(191,161,92,0.18),transparent_70%)] pointer-events-none" />
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-9 h-9 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={enviar} noValidate className="relative z-10 space-y-4">
          <div className="pr-8">
            <h2 id={`${uid}-titulo`} className="text-2xl font-bold text-white mb-1.5">
              {titulos.h}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">{titulos.p}</p>
          </div>

          {errorEnvio && (
            <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <p className="text-red-400 text-sm font-medium">{errorEnvio}</p>
            </div>
          )}

          <div>
            <label htmlFor={`${uid}-nombre`} className={labelCls}>
              Tu nombre <span className="text-accent">*</span>
            </label>
            <input
              ref={nombreRef}
              id={`${uid}-nombre`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="name"
              placeholder="Nombre y apellido"
              aria-invalid={!!ver("nombre")}
              className={inputCls(ver("nombre"))}
            />
            {ver("nombre") && <p className={errCls}>{ver("nombre")}</p>}
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
              aria-invalid={!!ver("celular")}
              className={inputCls(ver("celular"))}
            />
            {ver("celular") && <p className={errCls}>{ver("celular")}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoriza}
                onChange={(e) => setAutoriza(e.target.checked)}
                className="mt-0.5 w-5 h-5 shrink-0 accent-[#BFA15C] cursor-pointer"
                aria-invalid={!!ver("autoriza")}
              />
              <span className="text-[12.5px] text-white/60 leading-relaxed">
                Autorizo a Vantrust Agencia de Seguros LTDA. a tratar mis datos
                personales para contactarme y cotizar seguros, según su{" "}
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
            {ver("autoriza") && <p className={errCls}>{ver("autoriza")}</p>}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className={`w-full font-bold py-4 rounded-xl transition-all text-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              destino.tipo === "whatsapp"
                ? "bg-green-600 hover:bg-green-500 text-white"
                : "bg-accent hover:bg-accent-light text-primary"
            } ${valido ? "hover:scale-[1.01]" : "opacity-70"}`}
          >
            {enviando ? (
              <>
                <span className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                {destino.tipo === "whatsapp" && <WhatsAppIcon className="w-5 h-5" />}
                {titulos.boton}
              </>
            )}
          </button>
          <p className="text-white/35 text-xs text-center">
            Sin costo · Sin compromiso · Tus datos solo se usan para atenderte
          </p>
        </form>
      </div>
    </div>
  );
}
