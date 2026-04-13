"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, SITE } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/creations", label: "Creations" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileNav(false); }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNav]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 40px" : "20px 40px",
        background: scrolled ? `${T.bg}ee` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "all 0.4s",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, zIndex: 1001 }}>
          <div style={{
            width: 32, height: 32, background: T.accent, borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 14, color: T.bg,
          }}>Y</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: T.white, letterSpacing: -0.5 }}>
            {SITE.brand}<span style={{ color: T.accent }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="mono" style={{
              background: isActive(l.href) ? T.accentSoft : "none",
              border: isActive(l.href) ? `1px solid ${T.accentMid}` : "1px solid transparent",
              color: isActive(l.href) ? T.accent : T.gray,
              padding: "7px 16px", borderRadius: 6, fontSize: 12,
              letterSpacing: 0.5, transition: "all 0.3s",
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNav(!mobileNav)}
          style={{
            display: "none", background: "none",
            border: `1px solid ${mobileNav ? T.accent : T.border}`,
            borderRadius: 6, padding: "8px 14px", cursor: "pointer",
            color: mobileNav ? T.accent : T.white, fontSize: 18,
            zIndex: 1001, transition: "all 0.3s",
          }}
          className="mobile-burger"
        >{mobileNav ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile fullscreen nav */}
      {mobileNav && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: T.bg, backdropFilter: "blur(30px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          animation: "fadeIn 0.2s",
        }}>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} style={{
              color: isActive(l.href) ? T.accent : T.white,
              fontSize: 32, fontWeight: 800, letterSpacing: -1, padding: "12px 0",
              opacity: 0, animation: `fadeUp 0.4s ${i * 0.06}s forwards`,
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 24, display: "flex", gap: 20 }}>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 12, color: T.gray }}>GitHub ↗</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 12, color: T.gray }}>LinkedIn ↗</a>
            <a href={SITE.twitter} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 12, color: T.gray }}>Twitter ↗</a>
          </div>
        </div>
      )}

      <style>{`
        .mobile-burger { display: none !important; }
        @media (max-width: 768px) { .mobile-burger { display: block !important; } }
      `}</style>
    </>
  );
}