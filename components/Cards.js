"use client";
import Link from "next/link";
import { T, STRAPI_URL } from "@/lib/config";

function getImageUrl(img) {
  if (!img) return null;
  // Strapi v5: img.url directly
  if (typeof img === "string") return img.startsWith("http") ? img : STRAPI_URL + img;
  // Strapi v4/v5 object
  const url = img.url || img?.data?.attributes?.url || null;
  if (!url) return null;
  return url.startsWith("http") ? url : STRAPI_URL + url;
}

export function SectionHeader({ label, title, action, actionHref }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <span className="mono" style={{ fontSize: 12, color: T.accent, letterSpacing: 2 }}>{label}</span>
        <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, marginTop: 4, lineHeight: 1 }}>
          {title}<span style={{ color: T.accent }}>.</span>
        </h2>
      </div>
      {action && actionHref && (
        <Link href={actionHref} className="link-hover mono" style={{ color: T.gray, fontSize: 12, letterSpacing: 0.5, paddingBottom: 4 }}>
          {action} →
        </Link>
      )}
    </div>
  );
}

export function ProjectCard({ project, index = 0 }) {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const imageUrl = getImageUrl(project.image || project.screenshot || project.cover);

  return (
    <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, animation: `fadeUp 0.6s ${index * 0.1}s both`, position: "relative", overflow: "hidden" }}>
      {imageUrl && (
        <div style={{ width: "100%", height: 180, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
          <img src={imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
        </div>
      )}
      <div style={{ padding: 28 }}>
        {project.featured && (
          <div style={{ position: "absolute", top: imageUrl ? 12 : 16, right: 16 }}>
            <span className="mono" style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: T.accentSoft, color: T.accent, border: `1px solid ${T.accentMid}` }}>FEATURED</span>
          </div>
        )}
        <div className="mono" style={{ fontSize: 11, color: T.gray, marginBottom: 12, letterSpacing: 1 }}>PROJECT</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3, marginBottom: 10 }}>{project.title}</h3>
        <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.7 }}>{project.desc || project.description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
          {tags.map((t, j) => <span key={`pt-${index}-${j}`} className="tag">{t}</span>)}
        </div>
      </div>
    </a>
  );
}

export function BlogCard({ post, index = 0 }) {
  return (
    <Link href={`/blog/${post.slug || post.id}`} className="card-hover" style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", animation: `fadeUp 0.6s ${index * 0.1}s both` }}>
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {post.category && <span className="tag tag-accent">{post.category}</span>}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>{(post.excerpt || "").substring(0, 100)}...</p>
      </div>
      <div className="mono" style={{ fontSize: 11, color: T.gray, marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}

// Export so other files can use it
export { getImageUrl };