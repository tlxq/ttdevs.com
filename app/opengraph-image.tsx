import { ImageResponse } from "next/og";

// Shared link-preview image (1200x630), generated at build time.
export const alt = "TTDEVS: Tom and Therese, software developers";
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
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, #2e1065 0%, #09090b 60%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 180, fontWeight: 700, letterSpacing: -8 }}>TTDEVS</div>
        <div style={{ fontSize: 40, color: "#a1a1aa", marginTop: 16 }}>Tom &amp; Therese · Software developers</div>
      </div>
    ),
    size,
  );
}
