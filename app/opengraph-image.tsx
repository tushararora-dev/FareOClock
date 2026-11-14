import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — Brand, web & product design`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 15% 0%, #1a2410 0%, #07070a 55%)",
          color: "#f4f4ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#c9f75c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a1002",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
            {site.legalName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Design that earns attention.
          </div>
          <div style={{ fontSize: 28, color: "#9a9aa6", maxWidth: 720 }}>
            Brand identity, websites and product design for ambitious teams.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#9a9aa6",
          }}
        >
          <span>{site.domain}</span>
          <span>{site.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
