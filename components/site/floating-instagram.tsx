"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingInstagram() {
  const [isAtContact, setIsAtContact] = useState(false);

  const instagramUrl =
    site.socials.find((s) => s.label === "Instagram")?.href ??
    "https://www.instagram.com/tushar.oclock/";

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const checkPosition = () => {
      const rect = contactEl.getBoundingClientRect();
      // Turns into "back to top" as soon as contact enters viewport or user reaches near bottom
      const inView = rect.top <= window.innerHeight * 0.75;
      setIsAtContact(inView);
    };

    // Initial check
    checkPosition();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsAtContact(entry.isIntersecting);
        }
      },
      {
        threshold: [0, 0.1, 0.25],
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(contactEl);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAtContact) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label={isAtContact ? "Scroll to top" : "Instagram"}
      className="pointer-events-auto fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6"
    >
      <a
        href={isAtContact ? "#top" : instagramUrl}
        target={isAtContact ? undefined : "_blank"}
        rel={isAtContact ? undefined : "noreferrer noopener"}
        onClick={handleClick}
        aria-label={
          isAtContact
            ? "Back to top of page"
            : "Follow Tushar on Instagram @tushar.oclock"
        }
        title={isAtContact ? "Back to top" : "Follow on Instagram: @tushar.oclock"}
        className="group relative flex size-11 items-center justify-center rounded-full border border-line-strong/80 bg-brand text-cream shadow-[0_8px_24px_-4px_rgba(20,32,27,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_12px_28px_-4px_rgba(20,32,27,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:size-12 active:scale-95 cursor-pointer"
      >
        {/* Instagram Camera Icon (visible when above contact) */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-300 ${
            isAtContact
              ? "scale-50 opacity-0 rotate-45 pointer-events-none"
              : "scale-100 opacity-100 rotate-0"
          }`}
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
        </div>

        {/* Scroll to Top Arrow Icon (visible when at contact) */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-300 ${
            isAtContact
              ? "scale-100 opacity-100 rotate-0"
              : "scale-50 opacity-0 -rotate-45 pointer-events-none"
          }`}
        >
          <ArrowUp className="size-5.5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
        </div>

        <span className="sr-only">
          {isAtContact ? "Back to top" : "Instagram"}
        </span>
      </a>
    </aside>
  );
}
