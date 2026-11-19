"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText, Lock } from "lucide-react";
import { PassportSection } from "@/components/passport-section";
import { useCurrency } from "@/lib/currency";
import { tips } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Tips() {
  const { money } = useCurrency();
  const [desktopPage, setDesktopPage] = useState(0); // 0 (1-4) or 1 (5-8)
  const [mobileIndex, setMobileIndex] = useState(0); // 0 to 7 on mobile
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-switch every 2 seconds:
  // Desktop: Page 1 [1,2,3,4] -> Page 2 [5,6,7,8] -> Page 1 [1,2,3,4] (no empty space)
  // Mobile: Card 1 -> 2 -> 3 ... 8 -> 1
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDesktopPage((prev) => (prev === 0 ? 1 : 0));
      setMobileIndex((prev) => (prev + 1) % tips.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % tips.length);
  };

  const handleDesktopPrev = () => {
    setDesktopPage((prev) => (prev === 0 ? 1 : 0));
  };

  const handleDesktopNext = () => {
    setDesktopPage((prev) => (prev === 0 ? 1 : 0));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleMobileNext();
    } else if (diff < -45) {
      handleMobilePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="tips"
      className="section pointer-events-auto"
    >
      <PassportSection
        number="02"
        tilt="left-up"
        eyebrow="02 · Inside the PDF"
        title={<>A hundred tips.</>}
        description={
          <>
            <span className="marker-yellow font-semibold text-ink">
              Eight chapters
            </span>
            <span className="text-ink">, </span>
            <span className="marker-yellow font-semibold text-ink">
              a hundred tips
            </span>
            <span className="text-ink">
              {" "}
              — the full list lives in the PDF, not on this page.
            </span>
          </>
        }
        action={
          <a
            href="#services"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Get all 100 tips · {money(99)}
            <FileText className="size-4" aria-hidden />
          </a>
        }
        fields={[
          { label: "Format", value: "Offline PDF" },
          { label: "Contents", value: "100 travel tips" },
          { label: "Updates", value: "Lifetime included" },
          { label: "Price", value: money(99) },
        ]}
        stampLabel="TIPS"
        stampStatus="100 INSIDE"
        stampUpperText=""
        stampLowerText="FARE'O'CLOCK TRAVEL"
        stampSeriesText="PDF SERIES"
        stampVariant="triangle"
        stampInk="green"
        machineText="FOC<<ONE<PDF<<ONE<HUNDRED<TIPS<<LIFETIME<UPDATES<<<<<<<<<<<<"
      />

      <div className="shell passport-content--tilt-left-up">
        {/* MOBILE & TABLET VIEW: Single card slider with same pagination as section 3 */}
        <div
          className="mt-5 block lg:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden px-1 py-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {tips.map((tip, index) => (
                <div key={tip.tag} className="w-full shrink-0 px-2">
                  <article
                    className={cn(
                      "group relative h-full rounded-2xl border border-line bg-surface p-4 pb-5 shadow-[0_1px_2px_rgba(20,32,27,0.05)] transition-all duration-300",
                      index % 2 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg]"
                    />
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2">
                      <Image
                        src={`/places/${tip.image}.jpg`}
                        alt=""
                        fill
                        sizes="90vw"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {tip.tag}
                      <span className="num text-muted">
                        N°{String(index + 1).padStart(2, "0")} / {String(tips.length).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight">
                      <span className="marker-underline">{tip.title}</span>
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {tip.body}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand">
                      <Lock className="size-3" strokeWidth={2.2} aria-hidden />
                      In the PDF
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Controls - Exactly matching Section 03 */}
          <div className="mt-3 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleMobilePrev}
              aria-label="Previous tip"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {tips.map((tip, idx) => (
                <button
                  key={tip.tag}
                  type="button"
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to tip ${idx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === mobileIndex
                      ? "w-6 bg-brand"
                      : "w-2 bg-line-strong hover:bg-brand/50",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleMobileNext}
              aria-label="Next tip"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW: Smooth sliding 4-card pages with Left / Right pagination controls */}
        <div
          className="relative mt-5 hidden lg:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Navigation Arrow on the Left side */}
          <button
            type="button"
            onClick={handleDesktopPrev}
            aria-label="Previous tips page"
            className="group absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 z-20 inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-[0_6px_20px_-4px_rgba(20,32,27,0.18)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-brand/40 hover:bg-cream hover:shadow-lg active:scale-95"
          >
            <ChevronLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Right Navigation Arrow & Vertical Pagination Dots on the Right side */}
          <div className="absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleDesktopNext}
              aria-label="Next tips page"
              className="group inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-[0_6px_20px_-4px_rgba(20,32,27,0.18)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-brand/40 hover:bg-cream hover:shadow-lg active:scale-95"
            >
              <ChevronRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Vertical Pagination Dots on the Right */}
            <div className="flex flex-col items-center gap-1.5 rounded-full border border-line/70 bg-surface/95 px-1.5 py-2 shadow-xs backdrop-blur-md">
              {[0, 1].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDesktopPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    idx === desktopPage
                      ? "h-4 w-1.5 bg-brand"
                      : "h-1.5 w-1.5 bg-line-strong hover:bg-brand/50",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden p-1">
            <div
              className="flex w-full transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${desktopPage * 100}%)`,
              }}
            >
              {/* Desktop Page 1: Items 1, 2, 3, 4 */}
              <div className="w-full min-w-full shrink-0 grid grid-cols-4 gap-4 p-2 box-border">
                {tips.slice(0, 4).map((tip, index) => (
                  <article
                    key={tip.tag}
                    className={cn(
                      "group relative h-full rounded-2xl border border-line bg-surface p-3 pb-4 shadow-[0_1px_2px_rgba(20,32,27,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(20,32,27,0.28)]",
                      index % 2 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-[2deg]"
                    />
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2">
                      <Image
                        src={`/places/${tip.image}.jpg`}
                        alt=""
                        fill
                        sizes="25vw"
                        quality={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {tip.tag}
                      <span className="num text-muted">
                        N°{String(index + 1).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-1.5 text-sm font-medium leading-snug tracking-tight">
                      <span className="marker-underline transition-[background-size] duration-300 group-hover:[background-size:100%_64%]">
                        {tip.title}
                      </span>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted">
                      {tip.body}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-brand">
                      <Lock className="size-3" strokeWidth={2.2} aria-hidden />
                      In the PDF
                    </p>
                  </article>
                ))}
              </div>

              {/* Desktop Page 2: Items 5, 6, 7, 8 */}
              <div className="w-full min-w-full shrink-0 grid grid-cols-4 gap-4 p-2 box-border">
                {tips.slice(4, 8).map((tip, index) => (
                  <article
                    key={tip.tag}
                    className={cn(
                      "group relative h-full rounded-2xl border border-line bg-surface p-3 pb-4 shadow-[0_1px_2px_rgba(20,32,27,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(20,32,27,0.28)]",
                      index % 2 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-[2deg]"
                    />
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2">
                      <Image
                        src={`/places/${tip.image}.jpg`}
                        alt=""
                        fill
                        sizes="25vw"
                        quality={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                      {tip.tag}
                      <span className="num text-muted">
                        N°{String(index + 5).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-1.5 text-sm font-medium leading-snug tracking-tight">
                      <span className="marker-underline transition-[background-size] duration-300 group-hover:[background-size:100%_64%]">
                        {tip.title}
                      </span>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted">
                      {tip.body}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-brand">
                      <Lock className="size-3" strokeWidth={2.2} aria-hidden />
                      In the PDF
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
