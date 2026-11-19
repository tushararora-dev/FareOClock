import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Custom travel itineraries`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="8" y="10" width="24" height="22" rx="4" fill="#1f5a45"/><path d="M8 14.2A4.2 4.2 0 0 1 12.2 10h15.6A4.2 4.2 0 0 1 32 14.2v3H8v-3Z" fill="#f2a33c"/><rect x="13" y="6.4" width="2.7" height="7" rx="1.35" fill="#1f5a45"/><rect x="24.3" y="6.4" width="2.7" height="7" rx="1.35" fill="#1f5a45"/><g transform="translate(8.6 14.46) scale(.95)"><path d="M12 3.2c.8 0 1.45.65 1.45 1.45v3l5.4 3.3v1.45l-5.4-1.65v2.55l1.75 1.35v1.3L12 15.3l-3.2 1.55v-1.3l1.75-1.35v-2.55L5.15 11.9V10.45l5.4-3.3v-3c0-.8.65-1.45 1.45-1.45Z" fill="#faf6ee"/></g></svg>`;

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(logoMark)}`}
            width={46}
            height={46}
            alt=""
          />
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
            Custom travel itineraries — every plan built
            around your budget, not a package price.
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
