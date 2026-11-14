"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 sm:h-18">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${site.legalName} — back to top`}
        >
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:rotate-12">
            <span className="font-serif text-lg italic leading-none">
              {site.name.charAt(0).toLowerCase()}
            </span>
          </span>
          <span className="text-[15px] font-medium tracking-tight">
            {site.name.toLowerCase()}
            <span className="text-muted">®</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fog"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-fog px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-full border border-line text-fog md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-line transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-fog"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-accent-ink"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
