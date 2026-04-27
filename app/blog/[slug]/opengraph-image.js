import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YasirCodes Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;

  // Try to get blog title from Strapi
  let title = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  let category = "Blog";

  try {
    const res = await fetch(
      `https://portfolio-strapi-json.onrender.com/api/blogs?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=category`
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        const post = json.data[0];
        title = post.title || post.attributes?.title || title;
        category = post.category || post.attributes?.category || "Blog";
      }
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08080a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, background: "#c8ff00", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#08080a" }}>Y</div>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f7" }}>YasirCodes</span>
          </div>
          <div style={{ background: "#c8ff0022", border: "1px solid #c8ff0055", padding: "6px 16px", borderRadius: 20, fontSize: 16, color: "#c8ff00" }}>{category}</div>
        </div>

        {/* Title */}
        <div style={{ fontSize: 52, fontWeight: 800, color: "#f5f5f7", lineHeight: 1.15, letterSpacing: -1.5, maxWidth: 900 }}>
          {title}
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", gap: 24, fontSize: 18, color: "#8e8e99" }}>
          <span>yasircodes.online/blog</span>
          <span>·</span>
          <span>Yasir Malik</span>
        </div>
      </div>
    ),
    { ...size }
  );
}