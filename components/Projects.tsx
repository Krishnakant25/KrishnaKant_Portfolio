"use client";

import { useEffect, useRef } from "react";

interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;       // optional — not all projects have GitHub
  liveUrl?: string;         // optional — Streamlit / Power BI deployed link
  presentationUrl?: string; // optional — Google Drive presentation
  period: string;
  type: string;
}

// ── Section 1: Data Analyst Projects ─────────────────────────────────────────
const dataAnalystProjects: Project[] = [
  {
    num: "01",
    title: "AUTOMATED DATA HEALTH GOVERNANCE SYSTEM",
    description:
      "Stop letting 'data debt' compromise your analytics. Data Health Governor automates the tedious cycle of database cleanup by combining LLM-powered detection with a 'Human-in-the-Loop' workflow for ironclad data integrity.",
    tags: ["n8n", "PostgreSQL", "Groq", "Google Gemini", "Google Docs/Drive"],
    image: "/images/DataGovernance.png",
    githubUrl: "https://github.com/Krishnakant25/DATA-ANALYTICS/tree/main/Data_Health_Governor",
    period: "2025",
    type: "Data Analytics",
  },
  {
    num: "02",
    title: "EV SALES INSIGHTS DASHBOARD",
    description:
      "Data-driven clarity for the green revolution: AtliQ Motors EV Analytics provides a 360-degree strategic view of the Indian EV landscape, transforming raw registration and revenue data into actionable expansion roadmaps.",
    tags: ["Python", "FastAPI", "Power BI"],
    image: "/images/AtliQMotors.png",
    liveUrl: "https://app.powerbi.com/view?r=eyJrIjoiZDVlNWRiMTgtMzM2OC00YmJiLWJkMTItYjY3MGVmZTU0NjZhIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9",
    presentationUrl: "https://drive.google.com/file/d/15EpP-pMTuFO0bkFuIf2s4W0mCZTKodgL/view",
    period: "2025",
    type: "Data Analytics",
  },
  {
    num: "03",
    title: "VENDOR PERFORMANCE ANALYSIS – RETAIL INVENTORY & SALES",
    description:
      "From p-values to LLMs: this project bridges the gap between deep statistical exploration and the future of AI-driven BI. After identifying key margin disparities in a massive retail dataset, I deployed a local Llama 3.3 agent to automate SQL and visualization via natural language.",
    tags: ["SQL", "PostgreSQL", "Tableau", "Python", "Pandas"],
    image: "/images/VendorsSales.png",
    githubUrl: "https://github.com/krishnakantsahu/sales-dashboard",
    period: "2026",
    type: "Data Analytics",
  },
];

// ── Section 2: Generative AI Projects ────────────────────────────────────────
const genAIProjects: Project[] = [
  {
    num: "01",
    title: "FINANCIAL KNOWLEDGE HYBRID SEARCH",
    description:
      "Bridging the gap between vast financial datasets and instant insights, this system achieves an 86.7% Hit Rate@5 using hybrid search to replace hours of manual research with sub-300ms retrieval. By fusing BM25 precision with semantic embeddings, it provides a scalable, cost-efficient engine for context-aware investment research and enterprise Q&A.",
    tags: ["Hugging Face Transformers", "Pinecone", "Retrieval-Augmented Generation", "Python", "LangChain", "Wikipedia API", "ArXiv API"],
    image: "/images/Thumbnail_Hybrid_Search.png",
    liveUrl: "https://krishnakant25-generativeai-projects-hybrid-searchapp-9h0a6s.streamlit.app/",
    githubUrl: "https://github.com/krishnakantsahu/ai-voice-agent",
    period: "2026",
    type: "Generative AI",
  },
  {
    num: "02",
    title: "BUSINESS INTELLIGENCE CHAT ASSISTANT (NL-TO-SQL AGENT)",
    description:
      "Bridging the gap between natural language and relational databases, this dual-engine (SQLite/MySQL) interface maintains full conversational context while ensuring transparent, read-only query execution. It provides a secure, localized environment pre-configured for Indian business entities.",
    tags: ["Python", "LangChain", "GROQ – Llama 3.3 70B", "LangChain SQL Agent", "Streamlit", "SQLite / MySQL"],
    image: "/images/Chat_SQLDB.png",
    liveUrl: "https://generativeaiprojects-vdzwjgbgfzskbwyntgmezc.streamlit.app/",
    githubUrl: "https://github.com/Krishnakant25/GenerativeAI_Projects/tree/main/Chat_With_SQLDB",
    period: "2026",
    type: "Generative AI",
  },
];

// ── Helper: pick the best link for a project ──────────────────────────────────
function getPrimaryUrl(p: Project): string {
  return p.liveUrl || p.githubUrl || p.presentationUrl || "#";
}

// ── Helper: pick a label for the link ────────────────────────────────────────
function getLinkLabel(p: Project): string {
  if (p.liveUrl) return "Live Demo ↗";
  if (p.githubUrl) return "GitHub ↗";
  if (p.presentationUrl) return "Presentation ↗";
  return "View ↗";
}

// ── Reusable project list ─────────────────────────────────────────────────────
function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-0" aria-label="Project list" role="list">
      {projects.map((p, i) => (
        <li key={p.num} role="listitem">
          <a
            href={getPrimaryUrl(p)}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-item reveal reveal-delay-${Math.min(i + 1, 4)} group grid grid-cols-1 md:grid-cols-[auto_180px_1fr_auto] items-center gap-6 py-8 px-4 -mx-4`}
            aria-label={`View ${p.title}`}
          >
            {/* Index number */}
            <span
              className="hidden md:block font-mono-custom text-[var(--text-muted)] shrink-0"
              style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
              aria-hidden="true"
            >
              {p.num}
            </span>

            {/* Thumbnail — plain img works with Google Drive, Unsplash, any URL */}
            <div className="relative h-28 overflow-hidden bg-[var(--surface)] w-full md:w-44 shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={`${p.title} preview`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".img-fallback")) {
                    const fb = document.createElement("div");
                    fb.className = "img-fallback w-full h-full flex items-center justify-center";
                    fb.style.cssText = "background:var(--border);";
                    fb.innerHTML = `<span style="font-family:'DM Mono',monospace;font-size:0.6rem;color:var(--text-muted);letter-spacing:0.1em">${p.num}</span>`;
                    parent.appendChild(fb);
                  }
                }}
              />
            </div>

            {/* Title + description + tags */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-display font-medium mb-2 group-hover:text-[var(--accent)] transition-colors"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "-0.01em" }}
              >
                {p.title}
              </h3>
              <p
                className="text-[var(--text-secondary)] mb-3 line-clamp-2 pr-4"
                style={{ fontSize: "0.85rem", lineHeight: "1.6" }}
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
                {p.tags.map((t) => (
                  <span key={t} className="skill-tag" role="listitem" style={{ fontSize: "0.6rem" }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Extra links row — shows GitHub + Presentation if liveUrl is primary */}
              <div className="flex flex-wrap gap-3 mt-3">
                {p.liveUrl && p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono-custom text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.08em" }}
                    aria-label="View source on GitHub"
                  >
                    GitHub ↗
                  </a>
                )}
                {p.presentationUrl && (
                  <a
                    href={p.presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono-custom text-[var(--text-muted)] hover:text-[var(--accent-sage)] transition-colors"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.08em" }}
                    aria-label="View presentation"
                  >
                    Presentation ↗
                  </a>
                )}
              </div>
            </div>

            {/* Year + type + dynamic link label */}
            <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
              <span className="section-label">{p.period}</span>
              <span className="section-label">{p.type}</span>
              <span
                className="project-arrow font-mono-custom text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors mt-2 text-right"
                style={{ fontSize: "0.62rem", letterSpacing: "0.08em" }}
                aria-hidden="true"
              >
                {getLinkLabel(p)}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-28 md:py-40 bg-[var(--bg-secondary)]"
      aria-label="Projects section"
    >
      <div className="page-padding max-w-screen-xl mx-auto">

        {/* ── Top header ── */}
        <div className="mb-20 reveal">
          <p className="section-label mb-5">02 · Projects</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              Featured{" "}
              <span style={{ color: "var(--text-secondary)" }}>Work.</span>
            </h2>
            <a
              href="https://github.com/Krishnakant25"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link mb-2"
              aria-label="View all work on GitHub"
            >
              View all on GitHub ↗
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION A — Data Analyst Projects
        ══════════════════════════════════════════ */}
        <div className="mb-20">
          <div className="reveal flex items-center gap-5 mb-10">
            <div
              className="flex items-center gap-2 px-4 py-1.5 border"
              style={{ borderColor: "var(--accent-sage)", background: "rgba(122,171,138,0.06)" }}
            >
              <span className="font-mono-custom" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--accent-sage)" }}>◆</span>
              <span className="font-mono-custom" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--accent-sage)" }}>DATA ANALYTICS</span>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          </div>
          <ProjectList projects={dataAnalystProjects} />
        </div>

        {/* ══════════════════════════════════════════
            SECTION B — Generative AI Projects
        ══════════════════════════════════════════ */}
        <div>
          <div className="reveal flex items-center gap-5 mb-10">
            <div
              className="flex items-center gap-2 px-4 py-1.5 border"
              style={{ borderColor: "var(--accent)", background: "rgba(201,169,110,0.06)" }}
            >
              <span className="font-mono-custom" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--accent)" }}>◆</span>
              <span className="font-mono-custom" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--accent)" }}>GENERATIVE AI</span>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          </div>
          <ProjectList projects={genAIProjects} />
        </div>

      </div>
    </section>
  );
}
