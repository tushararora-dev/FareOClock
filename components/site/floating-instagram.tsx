"use client";

import { site } from "@/lib/site";

export function FloatingInstagram() {
  const instagramUrl =
    site.socials.find((s) => s.label === "Instagram")?.href ??
    "https://www.instagram.com/tushar.oclock/";

  return (
    <aside
      aria-label="Instagram"
      className="pointer-events-auto fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6"
    >
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Follow Tushar on Instagram @tushar.oclock"
        title="Follow on Instagram: @tushar.oclock"
        className="group flex size-11 items-center justify-center rounded-full border border-line-strong/80 bg-brand text-cream shadow-[0_8px_24px_-4px_rgba(20,32,27,0.35)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_12px_28px_-4px_rgba(20,32,27,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:size-12"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5.5 transition-transform duration-200 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span className="sr-only">Instagram</span>
      </a>
    </aside>
  );
}
