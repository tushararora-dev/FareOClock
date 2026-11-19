import { cn } from "@/lib/utils";

/**
 * FareO'Clock mark: a departure calendar — a green calendar page with an
 * orange header and an airliner taking off from the date grid. Calendar reads
 * as "plan the dates", the plane as "the flight". No badge or background:
 * the icon itself is the mark, so it sits cleanly on cream, photography or
 * the map. Pure SVG so it stays crisp from favicon size to the footer.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <rect x="8" y="10" width="24" height="22" rx="4" fill="#1f5a45" />
      <path
        d="M8 14.2A4.2 4.2 0 0 1 12.2 10h15.6A4.2 4.2 0 0 1 32 14.2v3H8v-3Z"
        fill="#f2a33c"
      />
      <rect x="13" y="6.4" width="2.7" height="7" rx="1.35" fill="#1f5a45" />
      <rect x="24.3" y="6.4" width="2.7" height="7" rx="1.35" fill="#1f5a45" />
      <g transform="translate(8.6 14.46) scale(.95)">
        <path
          d="M12 3.2c.8 0 1.45.65 1.45 1.45v3l5.4 3.3v1.45l-5.4-1.65v2.55l1.75 1.35v1.3L12 15.3l-3.2 1.55v-1.3l1.75-1.35v-2.55L5.15 11.9V10.45l5.4-3.3v-3c0-.8.65-1.45 1.45-1.45Z"
          fill="#faf6ee"
        />
      </g>
    </svg>
  );
}
