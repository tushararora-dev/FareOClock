"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Home,
  Lightbulb,
  Luggage,
  Mail,
  Menu,
  Plane,
  X,
  type LucideIcon,
} from "lucide-react";
import { CurrencyMenu } from "@/components/site/currency-menu";
import { LogoMark } from "@/components/site/logo-mark";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navIcons: Record<string, LucideIcon> = {
  Home,
  Plane,
  Lightbulb,
  Compass,
  Luggage,
  Mail,
};

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const planeRef = useRef<HTMLDivElement>(null);
  const planeTrackRef = useRef<HTMLDivElement>(null);
  const planeTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash.replace(/^#/, "") || "top";
      setActive(next);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Scrollspy: the highlighted nav item follows the section in view while
  // the page scrolls normally (wheel, trackpad or scrollbar).
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = 96;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      ) {
        current = sections[sections.length - 1].id;
      }

      setActive((previous) => (previous === current ? previous : current));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // The little plane rides the dashed rail under the navbar as the page
  // scrolls: parked on the left at the top, all the way right at the end.
  useEffect(() => {
    const plane = planeRef.current;
    const track = planeTrackRef.current;
    const trail = planeTrailRef.current;
    if (!plane || !track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const trackWidth = track.clientWidth || (window.innerWidth - 32);
      const currentX = progress * trackWidth;

      plane.style.transform = `translate3d(${currentX.toFixed(1)}px, 0, 0)`;
      if (trail) {
        trail.style.width = `${Math.max(0, currentX + 8)}px`;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto relative border-b border-line/80 bg-cream/85 shadow-[0_14px_38px_-34px_rgba(20,32,27,0.6)] backdrop-blur-xl">
        <div className="mx-auto grid h-12 max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:h-14 sm:px-6 lg:h-[60px]">
          <a
            href="#top"
            className="brand-link group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-95"
          >
            <span className="brand-logo-badge inline-flex shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110">
              <LogoMark className="size-8 sm:size-9" />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-medium leading-tight tracking-tight">
                {site.name}
              </span>
              <span className="mt-0.5 hidden text-[10px] leading-tight text-muted min-[1200px]:block">
                {site.tagline}
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center justify-center gap-1 xl:gap-1.5 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const current = active === item.href.slice(1);
              const Icon = navIcons[item.icon] ?? Home;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-150 xl:px-3 xl:text-sm",
                    current
                      ? "bg-brand/10 font-semibold text-brand shadow-xs"
                      : "text-ink/75 hover:bg-ink/[0.04] hover:text-ink",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-3.5 transition-colors duration-150",
                      current
                        ? "text-brand"
                        : "text-muted group-hover:text-brand",
                    )}
                    strokeWidth={current ? 2.2 : 1.8}
                    aria-hidden
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <CurrencyMenu />

            <a
              href="#contact"
              className="group/cta hidden items-center justify-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-medium text-cream shadow-sm transition-colors hover:bg-ink lg:flex xl:text-sm"
            >
              Plan my trip
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                strokeWidth={2.2}
                aria-hidden
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="pointer-events-auto grid size-10 place-items-center rounded-lg border border-line-strong text-ink transition-colors hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Scroll rail: dashed flight path with custom airliner flying left → right */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-0 transition-opacity duration-200",
            open ? "opacity-0 invisible" : "opacity-100 visible",
          )}
        >
          {/* Dashed upcoming flight route */}
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(31,90,69,0.3) 0 6px, transparent 6px 12px)",
            }}
          />

          {/* Active flight trail filled behind the plane */}
          <div
            ref={planeTrailRef}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand/20 via-brand/60 to-brand will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Flight track & plane */}
          <div ref={planeTrackRef} className="absolute inset-x-3.5 bottom-0 h-0">
            <div
              ref={planeRef}
              className="absolute left-0 top-0 will-change-transform"
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <span className="grid size-7 place-items-center rounded-full border-2 border-cream bg-brand text-cream shadow-[0_2px_8px_rgba(20,32,27,0.35)] transition-transform duration-100 ease-out hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-cream"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <g transform="translate(12 12) rotate(90) translate(-12 -10.25)">
                      <path d="M12 3.2c.8 0 1.45.65 1.45 1.45v3l5.4 3.3v1.45l-5.4-1.65v2.55l1.75 1.35v1.3L12 15.3l-3.2 1.55v-1.3l1.75-1.35v-2.55L5.15 11.9V10.45l5.4-3.3v-3c0-.8.65-1.45 1.45-1.45Z" />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={cn(
          "pointer-events-auto overflow-hidden border-b bg-cream/95 shadow-[0_26px_60px_-34px_rgba(20,32,27,0.5)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open
            ? "max-h-[calc(100svh-3rem)] border-line/80 opacity-100 sm:max-h-[calc(100svh-3.5rem)]"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <nav
          className="no-scrollbar mx-auto max-h-[calc(100svh-5rem)] max-w-[1600px] overflow-y-auto px-4 py-4 sm:max-h-[calc(100svh-5.5rem)] sm:px-6"
          aria-label="Mobile"
        >
          <p className="px-1 pb-2 pt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
            Sections
          </p>
          <div className="grid gap-1">
            {nav.map((item) => {
              const current = active === item.href.slice(1);
              const Icon = navIcons[item.icon] ?? Home;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors",
                    current
                      ? "bg-brand font-medium text-cream"
                      : "text-ink/80 hover:bg-cream-2/70 hover:text-ink",
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        current ? "text-cream" : "text-brand",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-3.5 shrink-0",
                      current ? "text-cream/70" : "text-muted",
                    )}
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-center text-sm font-medium text-cream"
          >
            Plan my trip
            <ArrowUpRight className="size-3.5" strokeWidth={2.2} aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
