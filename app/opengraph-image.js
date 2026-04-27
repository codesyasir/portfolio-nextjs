import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YasirCodes — Developer & Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", background: "#08080a", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, background: "#c8ff00", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#08080a" }}>Y</div>
          <span style={{ fontSize: 26, fontWeight: 700, color: "#f5f5f7" }}>YasirCodes</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 900, color: "#f5f5f7", lineHeight: 1.1, marginBottom: 20 }}>WordPress Developer</div>
          <div style={{ fontSize: 60, fontWeight: 900, color: "#c8ff00", lineHeight: 1.1 }}>& Creator</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, color: "#8e8e99" }}>Building products, crafting themes, shipping plugins.</div>
          <div style={{ fontSize: 20, color: "#8e8e99" }}>yasircodes.online</div>
        </div>
      </div>
    ),
    { ...size }
  );
}