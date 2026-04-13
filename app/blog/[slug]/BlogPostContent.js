"use client";
import Link from "next/link";
import { T, SITE } from "@/lib/config";

export default function BlogPostContent({ post }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 760, margin: "0 auto" }} className="mobile-pad">
      <Link href="/blog" className="mono" style={{ fontSize: 13, color: T.accent, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← Back to blog
      </Link>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        {post.category && <span className="tag tag-accent">{post.category}</span>}
        {post.date && <span className="mono" style={{ fontSize: 12, color: T.gray }}>{post.date}</span>}
        {post.readTime && <span className="mono" style={{ fontSize: 12, color: T.gray }}>· {post.readTime} read</span>}
      </div>

      <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 24 }}>
        {post.title}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 32, borderBottom: `1px solid ${T.border}`, marginBottom: 40 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: T.bg }}>Y</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{SITE.name}</div>
          <div className="mono" style={{ fontSize: 11, color: T.gray }}>@codesyasir</div>
        </div>
      </div>

      <div style={{ fontSize: 17, lineHeight: 1.9, color: T.grayLight }}>
        {post.excerpt && <p style={{ marginBottom: 24, fontSize: 19, fontWeight: 400, color: T.white }}>{post.excerpt}</p>}
        {(post.content || "").split("\n").filter(Boolean).map((para, i) => (
          <p key={`p-${i}`} style={{ marginBottom: 18 }}>{para}</p>
        ))}
      </div>

      <div className="share-bar" style={{ marginTop: 60, padding: "24px 0", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 14, color: T.gray }}>Enjoyed this? Share it.</span>
        <div style={{ display: "flex", gap: 8 }}>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12 }}>Twitter</a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12 }}>LinkedIn</a>
          <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12 }} onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy link</button>
        </div>
      </div>
    </section>
  );
}