"use client";

import { useEffect, useId, useRef } from "react";
import "./passport-stamp.css";

export type PassportStampVariant = "round" | "triangle" | "rectangular" | "octagonal";
export type PassportStampInk = "red" | "green" | "blue" | "plum";

type PassportStampProps = {
  number?: string;
  label?: string;
  status?: string;
  upperText?: string;
  lowerText?: string;
  seriesText?: string;
  variant?: PassportStampVariant;
  ink?: PassportStampInk;
  className?: string;
};

export function PassportStamp({
  number = "01",
  label = "TRIPS",
  status = "BUDGET VERIFIED",
  upperText = "FARE'O'CLOCK · TRAVEL",
  lowerText = "EXPLORE THE WORLD",
  seriesText = "PASSPORT SERIES",
  variant = "round",
  ink = "red",
  className = "",
}: PassportStampProps) {
  const id = useId();
  const stampRef = useRef<HTMLSpanElement>(null);
  const upperArc = `${id}-upper`;
  const lowerArc = `${id}-lower`;
  const seriesArc = `${id}-series`;
  const inkFilter = `${id}-ink`;
  const arcPaths = {
    round: {
      upper: "M 56,150 A 94,94 0 0,1 244,150",
      lower: "M 56,150 A 94,94 0 0,0 244,150",
      series: "M 52,150 A 98,98 0 0,0 248,150",
    },
    triangle: {
      upper: "M 74,180 Q 150,75 226,180",
      lower: "M 56,238 H 244",
      series: "M 68,214 H 232",
    },
    rectangular: {
      upper: "M 43,121 Q 150,68 257,121",
      lower: "M 43,179 Q 150,232 257,179",
      series: "M 55,216 H 245",
    },
    octagonal: {
      upper: "M 45,145 A 106,96 0 0,1 255,145",
      lower: "M 45,174 A 106,96 0 0,0 255,174",
      series: "M 58,168 A 92,84 0 0,0 242,168",
    },
  }[variant];

  useEffect(() => {
    const stamp = stampRef.current;
    if (!stamp || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          stamp.dataset.pressed = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(stamp);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={stampRef}
      className={`passport-stamp passport-stamp--${variant} passport-stamp--${ink} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="passport-stamp__impression"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        width="300"
        height="300"
        fill="none"
        focusable="false"
      >
        <defs>
          <path id={upperArc} d={arcPaths.upper} />
          <path id={lowerArc} d={arcPaths.lower} />
          <path id={seriesArc} d={arcPaths.series} />
          <filter
            id={inkFilter}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            {/* Fine paper-fiber and rubber chatter */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              seed="17"
              result="fineGrain"
            />
            {/* Uneven ink bleed / porous edges */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="fineGrain"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
              result="raggedEdges"
            />
            {/* Weathering / gaps where ink didn't adhere */}
            <feColorMatrix
              in="fineGrain"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  7 0 0 0 -1.9"
              result="inkVoids"
            />
            <feComposite in="raggedEdges" in2="inkVoids" operator="in" result="distressed" />
            {/* Uneven hand-stamp pressure gradient across the rubber pad */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed="7"
              result="handPressure"
            />
            <feColorMatrix
              in="handPressure"
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.45 0 0 0 0.58"
              result="pressureAlpha"
            />
            <feComposite in="distressed" in2="pressureAlpha" operator="in" />
          </filter>
        </defs>

        <g stroke="currentColor" filter={`url(#${inkFilter})`}>
          {variant === "round" ? (
            <>
              {/* Outer double borders with authentic rubber stamp wear gaps */}
              <circle cx="150" cy="150" r="122" strokeWidth="3.8" strokeDasharray="140 3 60 4 95 2 180 5 45 3" />
              <circle cx="150" cy="150" r="113" strokeWidth="1.6" strokeDasharray="50 3 130 2 80 4 210 2" />
              <circle cx="150" cy="150" r="80" strokeWidth="1.9" strokeDasharray="110 3 70 2 160 4 90 2" />
              <path d="M 76,180 Q 150,190 224,180" strokeWidth="1.6" strokeDasharray="70 2 60 3" />
              <path d="M 82,188 Q 150,197 218,188" strokeWidth="1.2" strokeDasharray="90 3 40 2" />
              {/* Tiny star accents common on border patrol / consular stamps */}
              <g fill="currentColor" stroke="none" transform="translate(68, 147) scale(0.65)">
                <polygon points="0,-7 2.1,-2.2 7.3,-2.2 3.1,1.1 4.7,6.1 0,3.1 -4.7,6.1 -3.1,1.1 -7.3,-2.2 -2.1,-2.2" />
              </g>
              <g fill="currentColor" stroke="none" transform="translate(232, 147) scale(0.65)">
                <polygon points="0,-7 2.1,-2.2 7.3,-2.2 3.1,1.1 4.7,6.1 0,3.1 -4.7,6.1 -3.1,1.1 -7.3,-2.2 -2.1,-2.2" />
              </g>
            </>
          ) : null}

          {variant === "triangle" ? (
            <>
              <polygon points="150,18 284,260 16,260" strokeWidth="3.5" strokeLinejoin="round" strokeDasharray="165 3 82 2 145 4 250 3" />
              <polygon points="150,34 266,248 34,248" strokeWidth="1.8" strokeLinejoin="round" strokeDasharray="75 2 190 3 225 2" />
              <polygon points="150,72 232,226 68,226" strokeWidth="2" strokeLinejoin="round" strokeDasharray="120 3 66 2 180 3" />
              <path d="M 67,192 H 233" strokeWidth="1.7" />
              <path d="M 58,226 H 242" strokeWidth="1.1" />
            </>
          ) : null}

          {variant === "rectangular" ? (
            <>
              <rect x="24" y="48" width="252" height="204" rx="20" strokeWidth="3.5" strokeDasharray="165 3 65 2 130 4 190 3" />
              <rect x="35" y="59" width="230" height="182" rx="14" strokeWidth="1.8" strokeDasharray="50 2 180 3 210 2" />
              {/* Clean separator lines positioned to cleanly frame the text */}
              <path d="M 35,96 H 265" strokeWidth="1.4" strokeDasharray="90 3 70 2" />
              <path d="M 35,198 H 265" strokeWidth="1.4" strokeDasharray="90 3 70 2" />
            </>
          ) : null}

          {variant === "octagonal" ? (
            <>
              <polygon points="91,25 209,25 275,91 275,209 209,275 91,275 25,209 25,91" strokeWidth="3.5" strokeDasharray="130 3 72 2 115 4 245 3" />
              <polygon points="98,38 202,38 262,98 262,202 202,262 98,262 38,202 38,98" strokeWidth="1.8" strokeDasharray="95 2 155 3 220 2" />
              <circle cx="150" cy="150" r="82" strokeWidth="2" strokeDasharray="145 3 86 2 210 3" />
              <path d="M 84,181 L 216,181 M 94,189 L 206,189" strokeWidth="1.4" />
            </>
          ) : null}

          <g
            fill="currentColor"
            stroke="none"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            textAnchor="middle"
          >
            {variant === "rectangular" ? (
              /* Straight, horizontal layout for rectangular visa stamp */
              <>
                <text x="150" y="86" fontSize="11" letterSpacing="3">
                  {upperText.toUpperCase()}
                </text>
                <text x="150" y="132" fontSize="58" fontWeight="900" letterSpacing="-2">
                  {number}
                </text>
                <text x="150" y="156" fontSize="16" letterSpacing="4">
                  {label.toUpperCase()}
                </text>
                <text x="150" y="172" fontSize="7.5" letterSpacing="2">
                  {status.toUpperCase()}
                </text>
                {/* READY TO BOARD: straight, shifted slightly down */}
                <text x="150" y="214" fontSize="10.5" letterSpacing="2.5">
                  {lowerText.toUpperCase()}
                </text>
                {/* ITINERARY SERIES: straight, below ready to board */}
                <text x="150" y="232" fontSize="8" letterSpacing="2">
                  {seriesText.toUpperCase()}
                </text>
              </>
            ) : (
              /* Curved layout for round & other stamp styles */
              <>
                <text fontSize="13" letterSpacing="2.3">
                  <textPath href={`#${upperArc}`} startOffset="50%">
                    {upperText.toUpperCase()}
                  </textPath>
                </text>
                <text fontSize="12" letterSpacing="2">
                  <textPath href={`#${lowerArc}`} startOffset="50%">
                    {lowerText.toUpperCase()}
                  </textPath>
                </text>
                <text x="150" y="135" fontSize="66" fontWeight="900" letterSpacing="-3">
                  {number}
                </text>
                <text x="150" y="160" fontSize="18" letterSpacing="5">
                  {label.toUpperCase()}
                </text>
                <text x="150" y="174" fontSize="8" letterSpacing="2.5">
                  {status.toUpperCase()}
                </text>
                <text fontSize="8" letterSpacing="2.2" dy="2">
                  <textPath href={`#${seriesArc}`} startOffset="50%">
                    {seriesText.toUpperCase()}
                  </textPath>
                </text>
              </>
            )}
          </g>
        </g>
      </svg>
    </span>
  );
}
