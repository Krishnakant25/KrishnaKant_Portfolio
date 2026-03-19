"use client";

import { useEffect, useRef } from "react";

const contacts = [
  {
    label: "Email",
    value: "Krishnakantnew14@gmail.com",
    href: "mailto:Krishnakantnew14@gmail.com",
    sub: "Drop me a line",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/krishna-kant-sahu-ai",
    href: "https://www.linkedin.com/in/krishna-kant-sahu-ai/",
    sub: "Let's connect professionally",
  },
  {
    label: "GitHub",
    value: "github.com/krishnakantsahu25",
    href: "https://github.com/Krishnakant25",
    sub: "Browse my repositories",
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-28 md:py-40"
      aria-label="Contact and footer"
    >
      <div className="page-padding max-w-screen-xl mx-auto">

        {/* Heading */}
        <div className="mb-16 reveal">
          <p className="section-label mb-5">03 · Contact</p>
          <h2
            className="font-display font-light"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            Let&apos;s build{" "}
            <em className="italic" style={{ color: "var(--accent)" }}>
              something
            </em>
            <br />
            <span style={{ color: "var(--text-secondary)" }}>meaningful.</span>
          </h2>
        </div>

        {/* Contact links */}
        <div className="max-w-2xl reveal reveal-delay-1">
          <p className="text-[var(--text-secondary)] mb-10" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            I&apos;m open to new opportunities, collaborations, or just a thoughtful
            conversation about data, AI, or the next big idea. Reach out — I always respond.
          </p>

          <ul aria-label="Contact methods">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="contact-link"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="flex-1">
                    <span
                      className="font-mono-custom text-[var(--text-muted)] block mb-0.5"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}
                    >
                      {c.label}
                    </span>
                    <span className="font-medium" style={{ fontSize: "0.9rem" }}>
                      {c.value}
                    </span>
                  </div>
                  <span
                    className="contact-arrow font-display"
                    style={{ fontSize: "1.2rem" }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom bar ── */}
        <div className="reveal reveal-delay-2 mt-20 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p
              className="font-display font-light text-[var(--text-secondary)] mb-1"
              style={{ fontSize: "1.3rem", letterSpacing: "-0.01em" }}
            >
              Krishna Kant Sahu
            </p>
            <p className="section-label">Data Analyst &amp; AI Developer</p>
          </div>
          <div className="text-right">
            <p className="section-label mb-1">© {new Date().getFullYear()}</p>
            <p className="section-label">Built with Next.js &amp; Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
