"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoWhite from "../../public/vantrust-logo-white.png";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cotizar", href: "#cotizar" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">

          <a href="#inicio" className="flex items-center">
            <Image
              src={logoWhite}
              alt="VanTrust"
              style={{ height: "44px", width: "auto" }}
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/75 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://vantrust.aswebseguros.co/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-primary transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Iniciar Sesión
            </a>
            <a
              href="#cotizar"
              className="bg-accent hover:bg-accent-light text-primary font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            >
              Cotizar Ahora
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "top-2.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-2.5 h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "top-2.5 -rotate-45" : "top-5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-background border-t border-primary/10"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-muted hover:text-primary py-2.5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-primary/10 mt-2 space-y-3">
                <a
                  href="https://vantrust.aswebseguros.co/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold text-sm px-5 py-3 rounded-full transition-colors hover:bg-primary hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Iniciar Sesión
                </a>
                <a
                  href="#cotizar"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-accent text-primary font-semibold text-sm px-5 py-3 rounded-full"
                >
                  Cotizar Ahora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
