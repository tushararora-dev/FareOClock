"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import { CountryMapThumbnail } from "@/components/country-map-thumbnail";
import { PassportSection } from "@/components/passport-section";
import { Reveal } from "@/components/reveal";
import { useCurrency } from "@/lib/currency";
import { tripCountries } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Achievements() {
  const { money } = useCurrency();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 2 seconds on mobile
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tripCountries.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tripCountries.length) % tripCountries.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tripCountries.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section id="achievements" className="section pointer-events-auto">
      <PassportSection
        number="01"
        tilt="right-down"
        eyebrow="01 · Trips"
        title={<>Trips we pulled off.</>}
        description={
          <>
            <span className="marker-yellow font-semibold text-ink">
              Real Budgets
            </span>
            <span className="text-ink">, </span>
            <span className="marker-yellow font-semibold text-ink">
              Real Numbers
            </span>
            <span className="text-ink">
              {" "}
              — how I travelled to these countries for what they {" "}
            </span>
            <span className="marker-yellow font-semibold text-ink">
              actually cost
            </span>
            <span className="text-ink">
              . Get the route in 1:1 travel secrets for {money(499)}.
            </span>
          </>
        }
        action={
          <a
            href="#services"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            1:1 secrets · {money(499)}
            <PhoneCall className="size-4" aria-hidden />
          </a>
        }
        fields={[
          { label: "Record type", value: "Real trips" },
          { label: "Proof", value: "Actual budgets" },
          { label: "Includes", value: "Flights / stays / food" },
          { label: "Standard", value: "Honest numbers" },
        ]}
        stampLabel="TRIPS"
        stampStatus="BUDGET VERIFIED"
        stampLowerText=""
        stampSeriesText="PASSPORT SERIES"
        stampVariant="round"
        stampInk="red"
        machineText="FOC<<TRIPS<WE<PULLED<OFF<<REAL<BUDGETS<<REAL<NUMBERS<<<<<<<<<<"
      />

      <div className="shell passport-content--tilt-right-down">
        {/* Mobile View: Auto-sliding Carousel (2 sec interval) with left/right buttons & pagination */}
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
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {tripCountries.map((item, index) => (
                <div key={item.slug} className="w-full shrink-0 px-2">
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
                      <CountryMapThumbnail country={item.slug} index={index} />
                    </div>
                    <p className="mt-4 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                      Destination
                      <span className="num text-muted">
                        {String(index + 1).padStart(2, "0")} / {String(tripCountries.length).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-1.5 text-[16px] font-medium leading-snug tracking-tight">
                      <span className="inline-flex items-center gap-1.5">
                        <Image
                          src={item.flag}
                          alt=""
                          width={16}
                          height={16}
                          className="size-4 shrink-0"
                          unoptimized
                        />
                        {item.name}
                      </span>
                    </h3>
                    <p className="num mt-2 text-sm font-semibold leading-relaxed text-brand">
                      Approx. {money(item.amount)}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.details}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: Left/Right buttons & Dots Pagination */}
          <div className="mt-3 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous trip"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5">
              {tripCountries.map((item, idx) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === currentIndex
                      ? "w-6 bg-brand"
                      : "w-2 bg-line-strong hover:bg-brand/50",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next trip"
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-cream-2 active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Desktop / Tablet View: Grid view */}
        <div className="mt-5 hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tripCountries.map((item, index) => (
            <Reveal key={item.slug} delay={(index % 5) * 0.05}>
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
                  <CountryMapThumbnail country={item.slug} index={index} />
                </div>
                <p className="mt-4 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Destination
                  <span className="num text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </p>
                <h3 className="mt-1.5 text-[15px] font-medium leading-snug tracking-tight">
                  <span className="marker-underline inline-flex items-center gap-1.5 transition-[background-size] duration-300 group-hover:[background-size:100%_64%]">
                    <Image
                      src={item.flag}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 shrink-0"
                      unoptimized
                    />
                    {item.name}
                  </span>
                </h3>
                <p className="num mt-2 text-xs font-semibold leading-relaxed text-brand">
                  Approx. {money(item.amount)}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">
                  {item.details}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
