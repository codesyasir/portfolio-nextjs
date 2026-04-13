"use client";
import { useState } from "react";
import { SectionHeader, getImageUrl } from "@/components/Cards";
import { T, STRAPI_URL } from "@/lib/config";

function getFileUrl(file) {
  if (!file) return null;
  if (typeof file === "string") return file.startsWith("http") ? file : STRAPI_URL + file;
  const url = file.url || file?.data?.attributes?.url || null;
  if (!url) return null;
  return url.startsWith("http") ? url : STRAPI_URL + url;
}

export default function CreationsContent({ plugins }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? plugins : plugins.filter(p => p.type === filter);

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 1100, margin: "0 auto" }} className="mobile-pad">
      <SectionHeader label="04" title="Creations" />
      <p style={{ color: T.gray, fontSize: 16, marginTop: 12, marginBottom: 32, maxWidth: 550 }}>Plugins, themes, and tools I've built. Free to use and open source.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
        {[{ id: "all", label: "All" }, { id: "plugin", label: "Plugins" }, { id: "theme", label: "Themes" }].map(f => (
          <button key={`f-${f.id}`} onClick={() => setFilter(f.id)} className="mono" style={{ padding: "8px 20px", borderRadius: 20, fontSize: 12, cursor: "pointer", border: `1px solid ${filter === f.id ? T.accent : T.border}`, background: filter === f.id ? T.accentSoft : "transparent", color: filter === f.id ? T.accent : T.gray, transition: "all 0.3s" }}>{f.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="mobile-col">
        {filtered.map((item, i) => {
          const screenshotUrl = getImageUrl(item.screenshot || item.image || item.cover);
          const downloadUrl = getFileUrl(item.file) || item.link || "#";

          return (
            <div key={`cr-${item.id || i}`} className="card-hover" style={{ background: T.s2, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {screenshotUrl && (
                <div style={{ width: "100%", height: 180, overflow: "hidden" }}>
                  <img src={screenshotUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  <span className="mono" style={{ fontSize: 10, padding: "4px 10px", borderRadius: 20, background: item.type === "plugin" ? T.blue + "18" : T.purple + "18", color: item.type === "plugin" ? T.blue : T.purple, border: `1px solid ${item.type === "plugin" ? T.blue + "33" : T.purple + "33"}`, textTransform: "uppercase", letterSpacing: 1 }}>{item.type === "plugin" ? "🔌 Plugin" : "🎨 Theme"}</span>
                  {item.version && <span className="mono" style={{ fontSize: 11, color: T.gray }}>v{item.version}</span>}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.7, marginBottom: 16 }}>{item.desc || item.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {(Array.isArray(item.tags) ? item.tags : []).map((t, j) => <span key={`tg-${i}-${j}`} className="tag">{t}</span>)}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", borderTop: `1px solid ${T.border}` }}>
                <span className="mono" style={{ fontSize: 12, color: T.gray }}>↓ {item.downloads || 0} downloads</span>
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); const link = document.createElement('a'); link.href = downloadUrl; link.download = item.title || 'download'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }} className="btn-primary" style={{ padding: "8px 20px", fontSize: 12, cursor: "pointer" }}>Download →</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}