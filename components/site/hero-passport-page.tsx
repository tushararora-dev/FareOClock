"use client";

import { useId } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { BackpackerAvatar } from "@/components/site/backpacker-avatar";
import { useCurrency } from "@/lib/currency";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const heroSpecs = [
  {
    code: "01 · TIPS PDF",
    value: 99,
    label: "Top 100 tips PDF",
    href: "#tips",
    ariaLabel: "Jump to 02 · Inside the PDF (₹99)",
  },
  {
    code: "02 · 1:1 SECRETS",
    value: 499,
    label: "1:1 Travel secrets",
    href: "#service-travel-talk",
    ariaLabel: "Jump to 1:1 Travel secrets (₹499)",
  },
  {
    code: "03 · ITINERARY",
    value: 999,
    label: "Custom travel plan",
    href: "#plan",
    ariaLabel: "Jump to 03 · A Plan (₹999)",
  },
];

export function HeroPassportPage({ className }: { className?: string }) {
  const { money } = useCurrency();
  const id = useId();
  const guillocheId = `${id}-guilloche`;
  const paperGrainId = `${id}-paper-grain`;
  const centerSealId = `${id}-center-seal`;

  const renderSubCards = (variant: "mobile" | "desktop") =>
    heroSpecs.map((spec) => {
      const formattedValue =
        typeof spec.value === "number" ? money(spec.value) : spec.value;

      return (
        <a
          key={`${variant}-${spec.code}`}
          href={spec.href}
          title={spec.ariaLabel}
          aria-label={spec.ariaLabel}
          className="group relative flex min-w-0 flex-col justify-between rounded-lg border border-ink/15 bg-cream/75 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:bg-cream hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand sm:p-2.5 cursor-pointer"
        >
          <span className="truncate font-mono text-[7.5px] font-bold tracking-wider text-muted group-hover:text-brand sm:text-[9px]">
            {spec.code}
          </span>
          <div className="my-0.5 flex items-baseline justify-between gap-1">
            <span className="block font-mono text-xs font-bold tracking-tight text-ink group-hover:text-brand sm:text-base lg:text-lg">
              {formattedValue}
            </span>
            <ArrowUpRight className="size-2.5 text-muted/60 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-brand group-hover:translate-x-0.5 sm:size-3" />
          </div>
          <span className="block truncate text-[9px] font-medium leading-tight text-ink/85 group-hover:text-ink sm:text-[11px]">
            {spec.label}
          </span>
        </a>
      );
    });

  return (
    <div
      className={cn(
        "pointer-events-auto relative w-full max-w-[34.5rem] lg:max-w-[36.5rem] sm:page-breeze rotate-0 sm:rotate-[-1.25deg]",
        className,
      )}
      aria-label="Travel Document: See the whole world"
    >
      {/* 3D Notebook Wire Spirals (6 Realistic, Large Circular Metallic Binder Rings) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-2.5 z-30 flex flex-col justify-between py-7 sm:-left-4.5 sm:py-9"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative flex items-center">
            <svg
              viewBox="0 0 52 38"
              className="h-7 w-11 overflow-visible filter drop-shadow-[0_3px_4px_rgba(0,0,0,0.28)] sm:h-9 sm:w-13 sm:drop-shadow-[0_4px_5px_rgba(0,0,0,0.32)]"
            >
              <defs>
                <linearGradient
                  id={`${id}-wire-metal-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="14%" stopColor="#94a3b8" />
                  <stop offset="30%" stopColor="#e2e8f0" />
                  <stop offset="46%" stopColor="#ffffff" />
                  <stop offset="62%" stopColor="#cbd5e1" />
                  <stop offset="82%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Punched hole cutout in the paper */}
              <rect x="35" y="4" width="7" height="30" rx="3.5" fill="#0d1410" />
              {/* Bottom paper thickness highlight */}
              <path
                d="M 35 29 A 3.5 3.5 0 0 0 42 29"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1"
                fill="none"
              />
              {/* Top inner hole shadow */}
              <path
                d="M 35 9 A 3.5 3.5 0 0 1 42 9"
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="1"
                fill="none"
              />

              {/* Back wire segment completing the loop through the hole */}
              <path
                d="M 38 7 C 42 10, 43 14, 43 19 C 43 24, 42 28, 38 31"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3.6"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Cast shadow of the wire onto the paper */}
              <path
                d="M 38 33 C 18 36, 4 30, 4 19 C 4 8, 18 3, 38 5"
                fill="none"
                stroke="rgba(20, 32, 27, 0.28)"
                strokeWidth="4.8"
                strokeLinecap="round"
              />

              {/* Main 3D Metallic Wire Coil (Circular, realistic proportions) */}
              <path
                d="M 38 31 C 18 34, 2 28, 2 19 C 2 10, 18 5, 38 7"
                fill="none"
                stroke={`url(#${id}-wire-metal-${i})`}
                strokeWidth="3.8"
                strokeLinecap="round"
              />

              {/* Specular White Highlight Glint along the curvature */}
              <path
                d="M 35 30 C 16 33, 3 26.5, 3 19 C 3 10.5, 16 5.5, 35 6.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.94"
              />

              {/* Underside ambient paper reflection */}
              <path
                d="M 30 31.5 C 16 33.5, 5 28, 3.5 21"
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Main Notebook Paper Document Card (Translucent parchment like Section 01 Trips) */}
      <div className="relative overflow-hidden rounded-3xl border border-[#d2be9b] bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.65),transparent_42%),radial-gradient(ellipse_at_80%_70%,rgba(235,206,145,0.45),transparent_48%),linear-gradient(180deg,rgba(254,249,236,0.96),rgba(247,233,196,0.96))] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_16px_36px_-18px_rgba(20,32,27,0.28)] backdrop-blur-[6px] transition-all">
        {/* Background Guilloche Security Pattern & Paper Grain (Sprinkles) */}
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 850 720"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Authentic paper grain sprinkles filter */}
            <filter id={paperGrainId} x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                seed="42"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0.35 0 0 0 -0.05"
              />
            </filter>

            {/* Sinusoidal security wavy pattern */}
            <pattern
              id={guillocheId}
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(20)"
            >
              <path
                d="M 0 30 Q 15 10 30 30 T 60 30"
                fill="none"
                stroke="#1f5a45"
                strokeWidth="0.55"
                opacity="0.09"
              />
              <path
                d="M 0 30 Q 15 50 30 30 T 60 30"
                fill="none"
                stroke="#1f5a45"
                strokeWidth="0.55"
                opacity="0.09"
              />
            </pattern>
          </defs>

          {/* Paper texture sprinkles */}
          <rect
            width="100%"
            height="100%"
            opacity="0.27"
            filter={`url(#${paperGrainId})`}
          />

          {/* Security pattern fill */}
          <rect
            width="100%"
            height="100%"
            fill={`url(#${guillocheId})`}
            opacity="0.6"
          />

          {/* Circular National / Authority Seal Watermark (in center, like real biodata page) */}
          <g
            id={centerSealId}
            transform="translate(420 280)"
            fill="none"
            stroke="#f2a33c"
            strokeWidth="1"
            opacity="0.16"
          >
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((angle) => (
              <ellipse
                key={angle}
                rx="155"
                ry="95"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="125" stroke="#1f5a45" strokeWidth="1.2" opacity="0.25" />
            <circle r="135" strokeDasharray="3 3" />
            <circle r="145" />
          </g>
        </svg>

        {/* Inner stitched perimeter */}
        <div className="pointer-events-none absolute inset-2 rounded-[20px] border border-dashed border-ink/20" />

        {/* Spiral Notebook Perforated Spine Crease */}
        <div className="pointer-events-none absolute inset-y-0 left-7.5 sm:left-10 z-10 border-r border-dashed border-ink/20" />

        {/* Spine paper shadow gradient along the inner edge */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-7.5 bg-gradient-to-r from-ink/[0.04] to-transparent sm:w-10" />

        {/* Main Biodata Body: Headline + Narrative on Top, Avatar beside Buttons & Specs below */}
        <div className="relative pt-5.5 pr-3.5 pb-3 pl-8.5 sm:pt-6.5 sm:pr-6 sm:pb-3.5 sm:pl-12 lg:pt-7 lg:pr-7 lg:pb-3.5 lg:pl-13">
          {/* Top Section: Eyebrow, Main Headline, and Story (Matching Passport Section Typography) */}
          <div className="min-w-0">
            {/* Section Eyebrow */}
            <div className="mb-2.5">
              <span className="eyebrow text-xs sm:text-[13px] tracking-[0.18em]">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                00 · OFFICIAL ENTRY RECORD
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-balance text-[clamp(1.95rem,4.4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
              See the whole world.{" "}
              <span className="block text-brand">
                On a small budget.
              </span>
            </h1>

            {/* Lead Narrative with yellow tape highlights */}
            <p className="mt-3.5 text-pretty text-[15px] leading-relaxed text-[#3a4a3e] sm:text-[16px]">
              <span className="marker-yellow font-semibold text-ink">
                I don&apos;t sell packages
              </span>{" "}
              and{" "}
              <span className="marker-yellow font-semibold text-ink">
                I don&apos;t book on commission
              </span>
              . Tell me where you want to go and what you want to spend. We
              uncover the{" "}
              <span className="marker-yellow font-semibold text-ink">
                real flight deals
              </span>
              , points hacks, and visa routes — crafting a{" "}
              <span className="marker-yellow font-semibold text-ink">
                field-tested travel blueprint
              </span>{" "}
              you can book with total confidence.
            </p>
          </div>

          {/* Bottom Section: Avatar on the Left, Buttons + Price Cards on the Right */}
          {/* Bottom Section: Avatar beside Buttons & Specs, filling all horizontal space on mobile & desktop */}
          <div className="mt-4.5 grid grid-cols-[90px_1fr] gap-3 border-t border-line-strong/60 pt-4 sm:grid-cols-[115px_1fr] sm:gap-4">
            {/* Left Column: Official ID Photo */}
            <div className="flex flex-col items-start justify-start">
              {/* Official Passport Specimen Photo Frame */}
              <div className="relative aspect-[3/3.8] w-full shrink-0 overflow-hidden rounded-xl border-2 border-cream bg-gradient-to-b from-[#f5eee2] via-[#ebe1cf] to-[#decfae] shadow-[0_6px_20px_-4px_rgba(20,32,27,0.25)] ring-1 ring-ink/15">
                {/* Photo Registration Corner Marks */}
                <div className="pointer-events-none absolute inset-1.5 flex flex-col justify-between text-ink/30">
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] leading-none">⌜</span>
                    <span className="font-mono text-[9px] leading-none">⌝</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] leading-none">⌞</span>
                    <span className="font-mono text-[9px] leading-none">⌟</span>
                  </div>
                </div>

                {/* Illustrated Backpacker Traveller Avatar */}
                <div className="size-full">
                  <BackpackerAvatar />
                </div>

                {/* Security watermark across photo */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="rotate-[-25deg] font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand/10 select-none">
                    FAREO&apos;CLOCK
                  </span>
                </div>

                {/* Verified badge pill */}
                <div className="pointer-events-none absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded bg-brand px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-cream shadow-xs">
                  <Check className="size-2.5" strokeWidth={3} />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Right Column: Buttons & Micro-Specs */}
            <div className="flex min-w-0 flex-col justify-between gap-2 sm:justify-start sm:gap-2.5">
              {/* Mobile-only micro header to give context and fill vertical height beside avatar */}
              <div className="flex flex-col gap-0.5 sm:hidden">
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-brand">
                  AUTHENTIC TRAVEL ROUTE
                </span>
                <span className="text-[11.5px] font-medium leading-tight text-ink/85">
                  Direct flights, stays & verified budgets.
                </span>
              </div>

              {/* Action Button: Unified with the site-wide button UI */}
              <div className="flex items-center">
                {/* Build My Route Button: Expands with full breathing room */}
                <a
                  href="#contact"
                  className="group inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-brand bg-brand px-4 py-2 text-xs font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto sm:min-h-11 sm:px-6 sm:py-2.5 sm:text-[13.5px]"
                >
                  <span>Build My Route</span>
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* On Desktop: 3 sub cards render inside column 2 */}
              <div className="hidden sm:grid sm:grid-cols-3 sm:gap-2">
                {renderSubCards("desktop")}
              </div>
            </div>

            {/* On Mobile: 3 sub cards span full width across bottom of card */}
            <div className="col-span-2 grid grid-cols-3 gap-1.5 pt-1 sm:hidden">
              {renderSubCards("mobile")}
            </div>
          </div>
        </div>

        {/* Machine Readable Zone (MRZ) across bottom - Single compact line */}
        <div className="relative border-t border-ink/10 bg-cream/60 py-2 pr-3.5 pl-8.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink/55 select-none backdrop-blur-xs sm:pr-6 sm:pl-12 sm:text-[10px] sm:tracking-[0.16em]">
          <div className="truncate">
            P&lt;INDFARE&lt;&lt;OCLOCK&lt;&lt;099&lt;&lt;499&lt;&lt;999&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </div>
        </div>
      </div>
    </div>
  );
}
