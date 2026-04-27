import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YasirCodes — Developer & Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#08080a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid dots background */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.15, display: "flex", flexWrap: "wrap" }}>
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#c8ff00", margin: "12px" }} />
          ))}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, background: "#c8ff00", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#08080a" }}>
            Y
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f7" }}>
            YasirCodes
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize: 64, fontWeight: 900, color: "#f5f5f7", lineHeight: 1.1, letterSpacing: -2, maxWidth: 800, marginBottom: 20 }}>
          Full-Stack Developer
          <br />
          <span style={{ color: "#c8ff00" }}>& Creator</span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 24, color: "#8e8e99", maxWidth: 600, lineHeight: 1.5 }}>
          Building products, crafting themes, shipping plugins — and writing about all of it.
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 40, left: 80, display: "flex", gap: 32, fontSize: 18, color: "#8e8e99" }}>
          <span>yasircodes.online</span>
          <span>·</span>
          <span>WordPress Developer</span>
          <span>·</span>
          <span>Pakistan</span>
        </div>
      </div>
    ),
    { ...size }
  );
}