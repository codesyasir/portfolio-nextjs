"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { T, SITE } from "@/lib/config";
import { SectionHeader, ProjectCard, BlogCard } from "@/components/Cards";

export default function HomeContent({ hero, projects, blogs }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  const firstName = (hero.name || SITE.name).split(" ")[0];
  const marqueeText = " DEVELOPER · WEB DEVELOPER · WORDPRESS EXPERT · PHP · JAVASCRIPT ";

  return (
    <>
      <section className="hero-section mobile-pad" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 40px 80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${T.border} 1px, transparent 1px)`, backgroundSize: "30px 30px", opacity: 0.25 }} />
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${T.accent}06, transparent 70%)`, filter: "blur(80px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }} className="mobile-col">
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="mono" style={{ fontSize: 13, color: T.accent, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, letterSpacing: 1 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.green, display: "inline-block", animation: "pulse 2s infinite" }} />
              Available for work
            </div>
            <h1 className="hero-title" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2.5, marginBottom: 20 }}>
              Hi, I'm <span style={{ color: T.accent }}>{firstName}</span><span style={{ color: T.gray }}>.</span><br />
              <span style={{ fontSize: "0.6em", fontWeight: 700, color: T.grayLight }}>{hero.title || "I build things for the web"}</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: 17, color: T.gray, maxWidth: 500, lineHeight: 1.7, marginBottom: 36 }}>{hero.tagline || SITE.tagline}</p>
            <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/projects"><button className="btn-primary">See my work ↗</button></Link>
              <a href="/resume.pdf" download><button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </button></a>
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
              {[{ val: "150+", label: "Projects" }, { val: `${blogs.length}+`, label: "Articles" }, { val: "5+", label: "Plugins" }].map((s, i) => (
                <div key={`stat-${i}`} style={{ animation: `fadeUp 0.8s ${0.3 + i * 0.15}s both` }}>
                  <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1 }}>{s.val}</div>
                  <div className="mono" style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-photo-wrap" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px) scale(0.95)", transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}>
            <div className="hero-photo-container" style={{ width: 320, height: 380, position: "relative" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: 20, background: `linear-gradient(135deg, ${T.accent}44, ${T.accent}11, ${T.purple}22, ${T.accent}44)`, animation: "glow 3s ease-in-out infinite" }} />
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 18, overflow: "hidden", background: T.s2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/profile.jpg" alt={SITE.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: `linear-gradient(135deg, ${T.s2}, ${T.s1})`, position: "absolute", inset: 0 }}>
                  <div style={{ fontSize: 72, fontWeight: 900, color: T.accent }}>YM</div>
                  <div className="mono" style={{ fontSize: 12, color: T.gray, marginTop: 8 }}>Add profile.jpg</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -12, right: -12, background: T.accent, color: T.bg, padding: "8px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13, boxShadow: `0 4px 20px ${T.accent}44` }}>{SITE.brand}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "16px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "marquee 20s linear infinite" }}>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 4, color: T.gray }}>{marqueeText.repeat(4)}</span>
        </div>
      </div>

      <section style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }} className="mobile-pad">
        <SectionHeader label="Featured" title="Selected Work" action="View all" actionHref="/projects" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }} className="mobile-col">
          {projects.filter(p => p.featured).slice(0, 4).map((p, i) => <ProjectCard key={`fp-${p.id || i}`} project={p} index={i} />)}
        </div>
      </section>

      <section style={{ padding: "60px 40px 100px", maxWidth: 1200, margin: "0 auto" }} className="mobile-pad">
        <SectionHeader label="Blog" title="Latest Writings" action="All posts" actionHref="/blog" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 48 }} className="mobile-col">
          {blogs.slice(0, 3).map((b, i) => <BlogCard key={`hb-${b.id || i}`} post={b} index={i} />)}
        </div>
      </section>

      <section className="cta-section mobile-pad" style={{ padding: "80px 40px", margin: "0 40px 80px", border: `1px solid ${T.border}`, borderRadius: 16, background: `linear-gradient(135deg, ${T.s2}, ${T.s1})`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${T.accent}08, transparent 70%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, marginBottom: 16 }}>Have a project in mind?</h2>
          <p style={{ color: T.gray, fontSize: 16, marginBottom: 32 }}>Let's build something great together.</p>
          <Link href="/contact"><button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Get in touch →</button></Link>
        </div>
      </section>
    </>
  );
}