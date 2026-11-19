"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { PassportSection } from "@/components/passport-section";
import { Reveal } from "@/components/reveal";
import { useCurrency } from "@/lib/currency";
import { process } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Plan() {
  const { money } = useCurrency();
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % process.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + process.length) % process.length);
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % process.length);
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
    <section id="plan" className="section pointer-events-auto">
      <PassportSection
        number="03"
        tilt="right-down"
        eyebrow="03 · How a plan is made"
        title={<>A Plan.</>}
        description={
          <span className="lg:whitespace-nowrap">
            <span className="marker-yellow font-semibold text-ink">
              Four steps
            </span>{" "}
            between your dates and a boarding pass — the{" "}
            <span className="marker-yellow font-semibold text-ink">
              first draft
            </span>{" "}
            lands in 48 hours.
          </span>
        }
        action={
          <a
            href="#services"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Custom itinerary · {money(999)}
            <Compass className="size-4" aria-hidden />
          </a>
        }
        fields={[
          { label: "First draft", value: "Within 48 hours" },
          { label: "Revision", value: "One full round" },
          { label: "Final file", value: "PDF + saved map" },
          { label: "Support", value: "Week you land" },
        ]}
        stampLabel="PLAN"
        stampStatus="ROUTE VERIFIED"
        stampLowerText="READY TO BOARD"
        stampSeriesText="ITINERARY SERIES"
        stampVariant="rectangular"
        stampInk="blue"
        machineText="FOC<<FROM<IDEA<TO<BOARDING<<FIRST<DRAFT<48<HOURS<<<<<<<<<<<<"
      />

      <div className="shell passport-content--tilt-right-down">
        {/* Desktop View (grid) */}
        <Reveal delay={0.06} className="hidden sm:block">
          <ol className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <li key={step.step} className="h-full">
                <article
                  className={cn(
                    "group relative h-full rounded-2xl border border-line bg-surface p-4 pb-5 shadow-[0_1px_2px_rgba(20,32,27,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:border-brand/40 hover:shadow-[0_18px_40px_-22px_rgba(20,32,27,0.28)]",
                    index % 2 ? "rotate-[0.75deg]" : "rotate-[-0.75deg]",
                  )}
                >
                  <span
                    aria-hidden
                    className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-[2deg]"
                  />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-2">
                    <Image
                      src={`/places/${step.image}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, 45vw"
                      quality={90}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="mt-4 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                    Step {step.step}
                    <span className="num text-muted">{step.meta}</span>
                  </p>
                  <h3 className="mt-1.5 text-[15px] font-medium leading-snug tracking-tight">
                    <span className="marker-underline transition-[background-size] duration-300 group-hover:[background-size:100%_64%]">
                      {step.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Mobile View with swipe and pagination */}
        <div
          className="mt-5 block sm:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden px-1 py-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {process.map((step, index) => (
                <div key={step.step} className="w-full shrink-0 px-2">
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
                        src={`/places/${step.image}.jpg`}
                        alt=""
                        fill
                        sizes="90vw"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                      Step {step.step}
                      <span className="num text-muted">{step.meta}</span>
                    </p>
                    <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight">
                      <span className="marker-underline">{step.title}</span>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Controls */}
          <div className="mt-3 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handleMobilePrev}
              aria-label="Previous step"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {process.map((step, idx) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to step ${step.step}`}
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
              aria-label="Next step"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
