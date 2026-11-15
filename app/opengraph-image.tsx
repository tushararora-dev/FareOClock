import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Custom itineraries & 1:1 travel sessions`;
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
            "radial-gradient(circle at 88% 0%, #fdf0dc 0%, #faf6ee 52%)",
          color: "#14201b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 999,
              background: "#1f5a45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#faf6ee",
              fontSize: 26,
              fontStyle: "italic",
            }}
          >
            b
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div style={{ fontSize: 24, letterSpacing: "-0.02em" }}>
              {site.name}
            </div>
            <div style={{ fontSize: 15, color: "#6b756f" }}>{site.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              maxWidth: 900,
            }}
          >
            See the whole world.
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              fontStyle: "italic",
              color: "#1f5a45",
            }}
          >
            On a small budget.
          </div>
          <div style={{ fontSize: 26, color: "#6b756f", maxWidth: 760 }}>
            Custom itineraries and 1:1 travel sessions. Trips from INR 7,000,
            planned around your budget.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b756f",
          }}
        >
          <span>{site.domain}</span>
          <span>Itineraries · Visa help · Points · Volunteer travel</span>
        </div>
      </div>
    ),
    size,
  );
}
