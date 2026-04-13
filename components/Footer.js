"use client";
import Link from "next/link";
import { T, SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer style={{ padding: "60px 40px", borderTop: `1px solid ${T.border}`, maxWidth: 1200, margin: "0 auto" }} className="mobile-pad">
      <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 40 }}>
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, background: T.accent, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: T.bg }}>Y</div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.5 }}>{SITE.brand}<span style={{ color: T.accent }}>.</span></span>
          </Link>
          <p className="mono" style={{ fontSize: 11, color: T.gray, maxWidth: 300, lineHeight: 1.6 }}>
            Building products, shipping code, writing about it.
          </p>
        </div>
        <div className="footer-links" style={{ display: "flex", gap: 40 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: T.gray, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Pages</div>
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Work", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "Creations", href: "/creations" },
            ].map(p => (
              <Link key={p.href} href={p.href} style={{ display: "block", color: T.gray, fontSize: 13, padding: "4px 0", transition: "color 0.3s" }}>
                {p.label}
              </Link>
            ))}
          </div>
          {/* <div>
            <div className="mono" style={{ fontSize: 10, color: T.gray, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Social</div>
            {[
              { label: "GitHub", url: SITE.github },
              { label: "LinkedIn", url: SITE.linkedin },
              { label: "Twitter", url: SITE.twitter },
              { label: "Email", url: `mailto:${SITE.email}` },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: T.gray, fontSize: 13, padding: "4px 0", transition: "color 0.3s" }}>
                {s.label} ↗
              </a>
            ))}
          </div> */}
        </div>
      </div>
      <div className="footer-bottom" style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 11, color: T.gray }}>© 2026 {SITE.name}</span>
        <span className="mono" style={{ fontSize: 11, color: T.gray }}></span>
      </div>
    </footer>
  );
}