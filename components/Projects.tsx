"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  presentationUrl?: string;
  period: string;
  type: string;
}

// ── Data Analyst Projects ─────────────────────────────────────────────────────
const dataAnalystProjects: Project[] = [
  {
    num: "01",
    title: "AUTOMATED DATA HEALTH GOVERNANCE SYSTEM",
    description:"",
    tags: ["n8n", "PostgreSQL", "Groq", "Google Gemini", "Google Docs/Drive"],
    image: "/images/DataGovernance.png",
    githubUrl: "https://github.com/Krishnakant25/DATA-ANALYTICS/tree/main/Data_Health_Governor",
    period: "2025",
    type: "",
  },
  {
    num: "02",
    title: "EV SALES INSIGHTS DASHBOARD",
    description:"",
    tags: ["Python", "Power BI"],
    image: "/images/AtliQMotors.png",
    liveUrl: "https://app.powerbi.com/view?r=eyJrIjoiZDVlNWRiMTgtMzM2OC00YmJiLWJkMTItYjY3MGVmZTU0NjZhIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9",
    presentationUrl: "https://drive.google.com/file/d/15EpP-pMTuFO0bkFuIf2s4W0mCZTKodgL/view",
    period: "2025",
    type: "",
  },
  {
    num: "03",
    title: "VENDOR PERFORMANCE ANALYSIS – RETAIL INVENTORY & SALES",
    description:"",
    tags: ["SQL (SQLite, SQLAlchemy)", "MCP SDK", "Tableau", "Python (Pandas, SciPy)", "Groq API"],
    image: "/images/VendorsSales.png",
    githubUrl: "https://github.com/krishnakantsahu/sales-dashboard",
    period: "2026",
    type: "",
  },
];

// ── Generative AI Projects ────────────────────────────────────────────────────
const genAIProjects: Project[] = [
  {
    num: "01",
    title: "FINANCIAL KNOWLEDGE HYBRID SEARCH",
    description:"",
    tags: ["Hugging Face Transformers", "Pinecone (BM25)", "Wikipedia API", "ArXiv API", "Python", "LangChain"],
    image: "/images/Thumbnail_Hybrid_Search.png",
    liveUrl: "https://krishnakant25-generativeai-projects-hybrid-searchapp-9h0a6s.streamlit.app/",
    githubUrl: "https://github.com/krishnakantsahu/ai-voice-agent",
    period: "2026",
    type: "Generative AI",
  },
  {
    num: "02",
    title: "BUSINESS INTELLIGENCE CHAT ASSISTANT (NL-TO-SQL)",
    description:"",
    tags: ["Python", "LangChain", "GROQ Llama 3.3", "Streamlit", "SQLite / MySQL"],
    image: "/images/Chat_SQLDB.png",
    liveUrl: "https://generativeaiprojects-vdzwjgbgfzskbwyntgmezc.streamlit.app/",
    githubUrl: "https://github.com/Krishnakant25/GenerativeAI_Projects/tree/main/Chat_With_SQLDB",
    period: "2026",
    type: "Generative AI",
  },
];

function getPrimaryUrl(p: Project): string {
  return p.liveUrl || p.githubUrl || p.presentationUrl || "#";
}

function getLinkLabel(p: Project): string {
  if (p.liveUrl) return "Live Demo";
  if (p.githubUrl) return "GitHub";
  if (p.presentationUrl) return "Presentation";
  return "View";
}

// ── Horizontal card carousel with hover focus effect ─────────────────────────
function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      role="list"
      aria-label="Project cards"
    >
      {projects.map((p, i) => {
        const isHovered = hoveredIdx === i;
        const otherHovered = hoveredIdx !== null && !isHovered;

        return (
          <a
            key={p.num}
            href={getPrimaryUrl(p)}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={`View ${p.title}`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="snap-start shrink-0 relative flex flex-col overflow-hidden border border-[var(--border)] bg-[var(--card)]"
            style={{
              width: "clamp(240px, 28vw, 340px)",
              minHeight: "400px",
              // Hovered card scales up and comes forward
              transform: isHovered ? "scale(1.03) translateY(-6px)" : "scale(1) translateY(0)",
              // Non-hovered cards blur and dim
              filter: otherHovered ? "blur(1.5px) brightness(0.65)" : "none",
              opacity: otherHovered ? 0.7 : 1,
              zIndex: isHovered ? 10 : 1,
              transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease",
              boxShadow: isHovered
                ? "0 24px 60px rgba(0,0,0,0.35), 0 0 40px rgba(201,169,110,0.1)"
                : "none",
              cursor: "pointer",
            }}
          >
            {/* Thumbnail */}
            <div
              className="relative overflow-hidden"
              style={{ height: "180px", background: "var(--surface)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={`${p.title} preview`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                }}
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent && !parent.querySelector(".img-fb")) {
                    const fb = document.createElement("div");
                    fb.className = "img-fb";
                    fb.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--border);";
                    fb.innerHTML = `<span style="font-family:'DM Mono',monospace;font-size:0.65rem;color:var(--text-muted);letter-spacing:0.15em">${p.num}</span>`;
                    parent.appendChild(fb);
                  }
                }}
              />

              {/* Period badge */}
              <div
                className="absolute top-3 right-3 font-mono-custom"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {p.period}
              </div>

              {/* Hover overlay with link label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span
                  className="font-mono-custom"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "white",
                    padding: "6px 16px",
                    border: "1px solid rgba(255,255,255,0.4)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {getLinkLabel(p)} ↗
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="flex flex-col flex-1 p-5">
              {/* Number + type */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono-custom text-[var(--text-muted)]"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
                >
                  {p.num}
                </span>
                <span
                  className="font-mono-custom"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    color: p.type === "Generative AI" ? "var(--accent)" : "var(--accent-sage)",
                    padding: "2px 8px",
                    border: `1px solid ${p.type === "Generative AI" ? "rgba(201,169,110,0.3)" : "rgba(122,171,138,0.3)"}`,
                  }}
                >
                  {p.type.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-medium mb-3 leading-tight"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  letterSpacing: "-0.01em",
                  color: isHovered ? "var(--accent)" : "var(--text)",
                  transition: "color 0.3s ease",
                }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                className="text-[var(--text-secondary)] mb-4 flex-1"
                style={{ fontSize: "0.8rem", lineHeight: "1.65", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="skill-tag"
                    style={{ fontSize: "0.58rem" }}
                  >
                    {t}
                  </span>
                ))}
                {p.tags.length > 4 && (
                  <span className="skill-tag" style={{ fontSize: "0.58rem" }}>
                    +{p.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Extra links */}
              <div className="flex gap-4 pt-3 border-t border-[var(--border)]">
                {p.liveUrl && p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono-custom text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}
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
                    style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}
                  >
                    Slides ↗
                  </a>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.04 }
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

        {/* Header */}
        <div className="mb-16 reveal">
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
            >
              View all on GitHub ↗
            </a>
          </div>
        </div>

        {/* ── DATA ANALYTICS ── */}
        <div className="mb-16 reveal">
          <div className="flex items-center gap-5 mb-8">
            <div
              className="flex items-center gap-2 px-4 py-1.5 border"
              style={{ borderColor: "var(--accent-sage)", background: "rgba(122,171,138,0.06)" }}
            >
              <span style={{ fontSize: "0.6rem", color: "var(--accent-sage)" }}>◆</span>
              <span className="font-mono-custom" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--accent-sage)" }}>
                DATA ANALYTICS
              </span>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          </div>
          <ProjectCarousel projects={dataAnalystProjects} />
        </div>

        {/* ── GENERATIVE AI ── */}
        <div className="reveal">
          <div className="flex items-center gap-5 mb-8">
            <div
              className="flex items-center gap-2 px-4 py-1.5 border"
              style={{ borderColor: "var(--accent)", background: "rgba(201,169,110,0.06)" }}
            >
              <span style={{ fontSize: "0.6rem", color: "var(--accent)" }}>◆</span>
              <span className="font-mono-custom" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--accent)" }}>
                GENERATIVE AI
              </span>
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
          </div>
          <ProjectCarousel projects={genAIProjects} />
        </div>

      </div>
    </section>
  );
}
