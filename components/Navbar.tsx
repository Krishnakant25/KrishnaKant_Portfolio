"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="page-padding flex items-center justify-between h-14 max-w-screen-xl mx-auto">
        {/* ── FIX 1: Year updated to 2026 ── */}
        <span className="font-mono-custom text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          2026
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="font-mono-custom text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-[var(--border)] px-3 py-1.5"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          )}

          {/* ── FIX 2: Label updated ── */}
          <span className="hidden md:block font-mono-custom text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Data Analytics &amp; AI Engineering
          </span>

          {/* Mobile hamburger */}
          <button
            className="md:hidden font-mono-custom text-[10px] tracking-widest text-[var(--text-muted)] uppercase"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] px-6 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
