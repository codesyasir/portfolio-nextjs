"use client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { T, SITE } from "@/lib/config";

export default function BlogPostContent({ post }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 900, margin: "0 auto" }} className="mobile-pad">
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

      {/* Blog content with markdown rendering */}
      <div className="blog-content">
        {post.excerpt && <p style={{ marginBottom: 32, fontSize: 19, fontWeight: 400, color: T.white, lineHeight: 1.7 }}>{post.excerpt}</p>}
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 style={{ fontSize: 32, fontWeight: 800, color: T.white, marginTop: 48, marginBottom: 16, letterSpacing: -1 }}>{children}</h1>,
            h2: ({ children }) => <h2 style={{ fontSize: 26, fontWeight: 700, color: T.white, marginTop: 40, marginBottom: 14, letterSpacing: -0.5 }}>{children}</h2>,
            h3: ({ children }) => <h3 style={{ fontSize: 22, fontWeight: 700, color: T.white, marginTop: 32, marginBottom: 12 }}>{children}</h3>,
            h4: ({ children }) => <h4 style={{ fontSize: 18, fontWeight: 700, color: T.accent, marginTop: 28, marginBottom: 10 }}>{children}</h4>,
            p: ({ children }) => <p style={{ fontSize: 17, lineHeight: 1.9, color: T.grayLight, marginBottom: 20 }}>{children}</p>,
            ul: ({ children }) => <ul style={{ paddingLeft: 24, marginBottom: 20 }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ paddingLeft: 24, marginBottom: 20 }}>{children}</ol>,
            li: ({ children }) => <li style={{ fontSize: 16, lineHeight: 1.8, color: T.grayLight, marginBottom: 8 }}>{children}</li>,
            strong: ({ children }) => <strong style={{ color: T.white, fontWeight: 600 }}>{children}</strong>,
            em: ({ children }) => <em style={{ color: T.grayLight, fontStyle: "italic" }}>{children}</em>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "underline", textUnderlineOffset: 3 }}>{children}</a>,
            blockquote: ({ children }) => <blockquote style={{ borderLeft: `3px solid ${T.accent}`, paddingLeft: 20, margin: "24px 0", fontStyle: "italic", color: T.gray }}>{children}</blockquote>,
            code: ({ inline, className, children }) => {
              if (inline) {
                return <code style={{ background: T.s2, color: T.accent, padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>{children}</code>;
              }
              return (
                <div style={{ background: T.s1, border: `1px solid ${T.border}`, borderRadius: 10, padding: 24, marginBottom: 24, overflowX: "auto" }}>
                  <pre style={{ margin: 0 }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, lineHeight: 1.7, color: T.grayLight, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{children}</code>
                  </pre>
                </div>
              );
            },
            pre: ({ children }) => <>{children}</>,
            hr: () => <hr style={{ border: "none", borderTop: `1px solid ${T.border}`, margin: "32px 0" }} />,
            img: ({ src, alt }) => <img src={src} alt={alt} style={{ width: "100%", borderRadius: 12, marginBottom: 20, border: `1px solid ${T.border}` }} />,
            table: ({ children }) => <div style={{ overflowX: "auto", marginBottom: 24 }}><table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table></div>,
            th: ({ children }) => <th style={{ background: T.s2, padding: "10px 16px", textAlign: "left", fontSize: 14, fontWeight: 600, color: T.white, borderBottom: `2px solid ${T.border}` }}>{children}</th>,
            td: ({ children }) => <td style={{ padding: "10px 16px", fontSize: 14, color: T.grayLight, borderBottom: `1px solid ${T.border}` }}>{children}</td>,
          }}
        >
          {post.content || ""}
        </ReactMarkdown>
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