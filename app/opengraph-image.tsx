import { ImageResponse } from "next/og";

export const alt = "Texh Co. Your business. Connected.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#faf7ef",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 900, letterSpacing: -2 }}>
          te<span style={{ color: "#c8ff00" }}>x</span>hco
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -5, lineHeight: 1 }}>
            Your business.
          </div>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -5, lineHeight: 1, color: "#c8ff00" }}>
            Connected.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(250,247,239,0.7)" }}>
          Websites, software and automation for local businesses
        </div>
      </div>
    ),
    size,
  );
}
