"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-white text-primary text-sm font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap ${
          hovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        ¿Tienes dudas? Escríbenos
      </div>

      {/* Button */}
      <a
        href="https://wa.me/57300000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-green-500" />
      </a>
    </div>
  );
}
