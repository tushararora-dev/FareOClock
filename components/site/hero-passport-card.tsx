"use client";

import { useId } from "react";
import { useCurrency } from "@/lib/currency";
import { stats } from "@/lib/site";
import { cn } from "@/lib/utils";

const statMeta: Record<
  string,
  { code: string; tag: string; label: string; highlight?: boolean }
> = {
  "First draft of your plan": {
    code: "01 · DISPATCH",
    tag: "GUARANTEED",
    label: "First draft of your plan",
  },
  "The Top 100 tips PDF": {
    code: "02 · STARTER GUIDE",
    tag: "INSTANT ACCESS",
    label: "The Top 100 tips PDF",
  },
  "Custom itinerary": {
    code: "03 · FULL ITINERARY",
    tag: "DAY-BY-DAY",
    label: "Custom travel itinerary",
  },
  "Mark-ups on your flights": {
    code: "04 · FLIGHT MARK-UP",
    tag: "ZERO COMMISSION",
    label: "Mark-ups on your flights",
    highlight: true,
  },
};

export function HeroPassportCard({ className }: { className?: string }) {
  const { money } = useCurrency();
  const id = useId();
  const guillocheId = `${id}-guilloche`;
  const paperGrainId = `${id}-paper-grain`;

  return (
    <div
      className={cn(
        "pointer-events-auto relative mt-6 overflow-hidden rounded-2xl border border-line-strong/90 bg-[#fbf7ee]/95 text-ink shadow-[0_18px_45px_-20px_rgba(20,32,27,0.45)] backdrop-blur-md transition-all sm:mt-7",
        className,
      )}
      aria-label="Passport Travel Specification"
    >
      {/* Background Guilloche Security Pattern & Paper Texture */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 700 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={paperGrainId} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="2"
              seed="23"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0.3 0 0 0 -0.05"
            />
          </filter>
          <pattern
            id={guillocheId}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(25)"
          >
            <path
              d="M 0 30 Q 15 10 30 30 T 60 30"
              fill="none"
              stroke="#1f5a45"
              strokeWidth="0.6"
              opacity="0.12"
            />
            <path
              d="M 0 30 Q 15 50 30 30 T 60 30"
              fill="none"
              stroke="#1f5a45"
              strokeWidth="0.6"
              opacity="0.12"
            />
          </pattern>
        </defs>

        {/* Paper grain noise */}
        <rect
          width="100%"
          height="100%"
          opacity="0.25"
          filter={`url(#${paperGrainId})`}
        />

        {/* Guilloche wavy pattern background */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${guillocheId})`}
          opacity="0.6"
        />

        {/* Large security rosette (watermark) */}
        <g
          transform="translate(560 120)"
          fill="none"
          stroke="#1f5a45"
          strokeWidth="0.8"
          opacity="0.12"
        >
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((angle) => (
            <ellipse
              key={angle}
              rx="110"
              ry="65"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle r="85" />
          <circle r="95" />
        </g>
      </svg>

      {/* Inner stitched passport perimeter */}
      <div className="pointer-events-none absolute inset-1.5 rounded-[12px] border border-dashed border-ink/20" />

      {/* Passport Document Header Bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-line-strong/60 bg-cream/70 px-4 py-2 sm:px-5">
        <div className="flex items-center gap-2">
          {/* Miniature Passport Crest / Plane Emblem */}
          <span className="grid size-5 place-items-center rounded bg-brand text-cream shadow-xs">
            <svg
              viewBox="0 0 24 24"
              className="size-3 text-cream"
              fill="currentColor"
              aria-hidden="true"
            >
              <g transform="translate(12 12) rotate(90) translate(-12 -10.25)">
                <path d="M12 3.2c.8 0 1.45.65 1.45 1.45v3l5.4 3.3v1.45l-5.4-1.65v2.55l1.75 1.35v1.3L12 15.3l-3.2 1.55v-1.3l1.75-1.35v-2.55L5.15 11.9V10.45l5.4-3.3v-3c0-.8.65-1.45 1.45-1.45Z" />
              </g>
            </svg>
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            PASSPORT SPECIFICATION · OFFICIAL TRAVEL RECORD
          </span>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-[9px] font-medium uppercase tracking-wider text-muted">
          <span>DOC: FOC-2026-IND</span>
          <span className="hidden text-ink/30 sm:inline">|</span>
          <span className="hidden sm:inline">CLASS: INDEPENDENT</span>
        </div>
      </div>

      {/* The 4 Stats as Official Passport Visa Endorsement Stamps */}
      <div className="relative grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-2.5 sm:p-4">
        {stats.map((stat) => {
          const meta = statMeta[stat.label] ?? {
            code: "SPEC",
            tag: "OFFICIAL",
            label: stat.label,
          };
          const formattedValue =
            typeof stat.value === "number" ? money(stat.value) : stat.value;

          return (
            <div
              key={stat.label}
              className={cn(
                "group relative flex flex-col justify-between rounded-lg border border-ink/10 bg-cream/75 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-cream hover:shadow-sm sm:p-3",
                meta.highlight && "border-brand/30 bg-brand/[0.04]",
              )}
            >
              {/* Top mono code */}
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[9px] font-semibold tracking-wider text-muted group-hover:text-brand">
                  {meta.code}
                </span>
                <span
                  className={cn(
                    "rounded px-1 py-0.5 font-mono text-[8px] font-bold tracking-tight",
                    meta.highlight
                      ? "bg-brand/15 text-brand"
                      : "bg-ink/[0.05] text-ink/70",
                  )}
                >
                  {meta.tag}
                </span>
              </div>

              {/* Large Passport Stat Value */}
              <div className="my-1.5">
                <span
                  className={cn(
                    "block font-mono text-xl font-bold tracking-tight text-ink sm:text-2xl",
                    meta.highlight && "text-brand",
                  )}
                >
                  {formattedValue}
                </span>
              </div>

              {/* Label */}
              <span className="block text-[11px] leading-tight text-ink/80">
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Machine Readable Zone (MRZ) Line */}
      <div className="relative border-t border-dashed border-ink/20 bg-cream/80 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55 select-none sm:text-[10px]">
        <div className="truncate">
          P&lt;INDFARE&lt;&lt;OCLOCK&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </div>
        <div className="truncate text-ink/45">
          FOC&lt;&lt;48H&lt;&lt;099&lt;&lt;999&lt;&lt;0ZERO&lt;COMMISSION&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </div>
      </div>

      {/* Authentic Red Immigration Passport Stamp in top-right corner */}
      <div
        className="pointer-events-none absolute -right-2 -top-2 size-20 rotate-[-8deg] opacity-80 sm:-right-1 sm:-top-1 sm:size-24"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 120 120"
          className="size-full text-[#b23b2b]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {/* Double ring */}
          <circle cx="60" cy="60" r="54" strokeDasharray="3 2" />
          <circle cx="60" cy="60" r="50" />
          <circle cx="60" cy="60" r="38" strokeWidth="1.2" />

          {/* Stamp Text along path or centered */}
          <g className="text-center font-mono text-[7.5px] font-bold uppercase tracking-wider fill-current stroke-none">
            <text x="60" y="32" textAnchor="middle">
              FAREO&apos;CLOCK
            </text>
            <text x="60" y="56" textAnchor="middle" className="text-[9px]">
              ★ VERIFIED ★
            </text>
            <text
              x="60"
              y="68"
              textAnchor="middle"
              className="text-[6.5px] fill-current/90"
            >
              BUDGET FIRST
            </text>
            <text x="60" y="90" textAnchor="middle" className="text-[7px]">
              ENTRY PERMITTED
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
