"use client";
import { useState } from "react";
import { T, SITE } from "@/lib/config";
import { SectionHeader } from "@/components/Cards";

export default function AboutContent({ about }) {
  const [activeCat, setActiveCat] = useState("All");
  const techStack = about.techStack;
  const categories = ["All", ...new Set(techStack.map(t => t.cat).filter(Boolean))];
  const filtered = activeCat === "All" ? techStack : techStack.filter(t => t.cat === activeCat);

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 1100, margin: "0 auto" }} className="mobile-pad">
      <SectionHeader label="01" title="About" />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, marginTop: 48, alignItems: "start" }} className="mobile-col">
        <div>
          {about.bio ? (
            <div style={{ fontSize: 17, lineHeight: 1.8, color: T.grayLight }}>{about.bio}</div>
          ) : (
            <>
              <p style={{ fontSize: 20, lineHeight: 1.8, color: T.grayLight, fontWeight: 300 }}>
                I'm <strong style={{ color: T.white, fontWeight: 600 }}>{SITE.name}</strong> — a full-stack developer from Pakistan building modern web applications, themes, plugins, and open-source tools.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: T.gray, marginTop: 20 }}>I specialize in React, Next.js, Node.js, and headless CMS platforms like Strapi.</p>
            </>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            {[{ icon: "⑂", label: "GitHub", url: SITE.github }].map((s, i) => (
              <a key={`s-${i}`} href={s.url} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ padding: "10px 20px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.gray, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="bento-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {about.stats.map((s, i) => (
            <div key={`st-${i}`} style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{s.val}</div>
              <div className="mono" style={{ fontSize: 10, color: T.gray, marginTop: 4, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <h3 className="section-title" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, marginBottom: 24 }}>Tech Stack <span style={{ color: T.accent }}>.</span></h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {categories.map((c, i) => (
            <button key={`cat-${i}-${c}`} onClick={() => setActiveCat(c)} className="mono" style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: `1px solid ${activeCat === c ? T.accent : T.border}`, background: activeCat === c ? T.accentSoft : "transparent", color: activeCat === c ? T.accent : T.gray, transition: "all 0.3s" }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {filtered.map((t, i) => (
            <div key={`tech-${i}-${t.name}`} className="card-hover" style={{ padding: "14px 24px", background: T.s2, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div><div className="mono" style={{ fontSize: 10, color: T.gray }}>{t.cat}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <h3 className="section-title" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, marginBottom: 32 }}>Journey <span style={{ color: T.accent }}>.</span></h3>
        {about.journey.map((item, i) => (
          <div key={`j-${i}`} style={{ display: "flex", gap: 24, marginBottom: 32 }}>
            <div style={{ minWidth: 60 }}><span className="mono" style={{ fontSize: 13, color: T.accent, fontWeight: 600 }}>{item.year}</span></div>
            <div style={{ borderLeft: `2px solid ${T.border}`, paddingLeft: 24, paddingBottom: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}