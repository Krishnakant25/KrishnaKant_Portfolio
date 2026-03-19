"use client";

import { useEffect, useRef } from "react";

const certifications = [
  {
    code: "01",
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google · Coursera",
    year: "2026",
  },
  {
    code: "02",
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    year: "2026",
  },
  {
    code: "03",
    title: "Mathematics for Machine Learning Specialization",
    issuer: "Imperial College London · Coursera",
    year: "2026",
  },
  {
    code: "04",
    title: "Claude AI Developer Certification – Anthropic Academy",
    issuer: "Anthropic",
    year: "2026",
  },
  {
    code: "05",
    title: "●	Data Analytics Bootcamp 5.0 - Job Placement Support + AI Automation & Data Engineering",
    issuer: "Codebasics",
    year: "2025",
  },
];

const skills = [
  "Python (Pandas, NumPy, Scikit-Learn)", "SQL (PostgreSQL, MySQL)",
  "LangChain", "OpenAI API", "Groq API",
  "Streamlit", "TensorFlow", "PyTorch",
  "Power BI", "Tableau", "Excel",
  "n8n", "Git", "Docker",
];

// ── FIX: Capability pillars replacing stats boxes ──────────────────────────
const pillars = [
  {
    label: "Data Analytics",
    color: "var(--accent-sage)",
    bg: "rgba(122,171,138,0.06)",
    border: "rgba(122,171,138,0.25)",
    items: ["Dashboards", "SQL Pipelines", "Business Insights"],
    icon: "◈",
  },
  {
    label: "AI & GenAI Systems",
    color: "var(--accent)",
    bg: "rgba(201,169,110,0.06)",
    border: "rgba(201,169,110,0.25)",
    items: ["RAG Systems", "AI Agents", "LLM Apps"],
    icon: "◆",
  },
  {
    label: "Business Decision Making",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.25)",
    items: ["Strategy", "Financial Insights", "Reporting"],
    icon: "◉",
  },
];

export default function About() {
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
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-40"
      aria-label="About section"
    >
      <div className="page-padding max-w-screen-xl mx-auto">

        {/* ── FIX: Section number corrected to 01 ── */}
        <div className="mb-16 reveal">
          <p className="section-label mb-5">01 · About</p>
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            Every{" "}
            <em className="italic" style={{ color: "var(--accent)" }}>
              weak point
            </em>
            <br />
            is society&apos;s{" "}
            <span style={{ color: "var(--text-secondary)" }}>possibility.</span>
          </h2>
        </div>

        {/* ── Two column ── */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — Bio + Capability Pillars */}
          <div className="reveal reveal-delay-1">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6" style={{ fontSize: "0.92rem" }}>
              I&apos;m a{" "}
              <span className="text-[var(--text)] font-medium">Data Analyst &amp; AI Developer</span>{" "}
              with a focus on building intelligent systems that solve real business problems.
              My work bridges the gap between raw data and actionable AI-driven decisions.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6" style={{ fontSize: "0.92rem" }}>
              From crafting Generative AI pipelines and voice agents to automating complex
              workflows and building analytics dashboards — I bring a pragmatic,
              results-driven approach to every engagement.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10" style={{ fontSize: "0.92rem" }}>
              My philosophy: solve the smallest inconvenience to create the biggest impact.
              Turning data complexity into clarity is what drives me every day.
            </p>

            {/* ── FIX: Capability pillars replacing stats ── */}
            <p className="section-label mb-5">What I Build</p>
            <div className="space-y-3">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="p-4 border"
                  style={{
                    borderColor: p.border,
                    background: p.bg,
                    transition: "border-color 0.2s",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: p.color, fontSize: "0.7rem" }}>{p.icon}</span>
                    <p
                      className="font-mono-custom font-medium"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: p.color }}
                    >
                      {p.label}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono-custom text-[var(--text-secondary)]"
                        style={{ fontSize: "0.68rem", letterSpacing: "0.04em" }}
                      >
                        {item}
                        {p.items.indexOf(item) < p.items.length - 1 && (
                          <span className="ml-2 text-[var(--text-muted)]">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Certifications + Skills */}
          <div className="reveal reveal-delay-2 space-y-12">

            {/* Certifications */}
            <div>
              <p className="section-label mb-6">Certifications</p>
              <ul className="space-y-3" aria-label="Certifications list">
                {certifications.map((c) => (
                  <li key={c.code} className="cert-card p-4 flex gap-4 items-start">
                    <span
                      className="font-mono-custom shrink-0 mt-0.5"
                      style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
                    >
                      {c.code}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--text)] mb-1" style={{ fontSize: "0.85rem" }}>
                        {c.title}
                      </p>
                      <p
                        className="font-mono-custom text-[var(--text-muted)]"
                        style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
                      >
                        {c.issuer} · {c.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <p className="section-label mb-5">Tools &amp; Technologies</p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Technical skills">
                {skills.map((s) => (
                  <span key={s} className="skill-tag" role="listitem">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
