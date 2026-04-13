"use client";
import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/Cards";
import { T } from "@/lib/config";

export default function BlogContent({ blogs }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(blogs.map(b => b.category).filter(Boolean))];
  const filtered = filter === "All" ? blogs : blogs.filter(b => b.category === filter);

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 1000, margin: "0 auto" }} className="mobile-pad">
      <SectionHeader label="03" title="Blog" />
      <p style={{ color: T.gray, fontSize: 16, marginTop: 12, marginBottom: 32, maxWidth: 500 }}>Thoughts on development, design, and building products.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={`c-${c}`} onClick={() => setFilter(c)} className="mono" style={{ padding: "6px 16px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: `1px solid ${filter === c ? T.accent : T.border}`, background: filter === c ? T.accentSoft : "transparent", color: filter === c ? T.accent : T.gray, transition: "all 0.3s" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.map((post, i) => (
          <Link href={`/blog/${post.slug || post.id}`} key={`b-${post.id || i}`} className="card-hover" style={{ padding: "28px 0", borderBottom: `1px solid ${T.border}`, display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                {post.category && <span className="tag tag-accent">{post.category}</span>}
                {post.date && <span className="mono" style={{ fontSize: 12, color: T.gray }}>{post.date}</span>}
                {post.readTime && <span className="mono" style={{ fontSize: 12, color: T.gray }}>· {post.readTime}</span>}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h3>
              <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>
            <span style={{ fontSize: 20, color: T.gray }}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}