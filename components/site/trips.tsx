"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plane, Ticket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { places, trips } from "@/lib/site";
import { cn, inr } from "@/lib/utils";

const MAX_PER_DAY = 7500;

export function Trips() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trip = trips[active];

  /** Roving tabindex: move selection and keyboard focus together. */
  function moveTo(index: number) {
    const next = (index + trips.length) % trips.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }
  const place = places.find((item) => item.slug === trip.image);
  const perDay = Math.round(trip.cost / trip.days / 100) * 100;
  const bar = Math.max(6, Math.round((perDay / MAX_PER_DAY) * 100));

  return (
    <section id="trips" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="01 · The receipts"
            title={
              <>
                Pick a trip.{" "}
                <span className="font-serif italic text-brand">
                  See the whole price.
                </span>
              </>
            }
          />
          <p className="num shrink-0 text-sm text-muted">
            {inr(7000)} <span className="text-line-strong">→</span>{" "}
            {inr(100000)} <span className="text-xs">per person</span>
          </p>
        </div>

        <div className="mt-9 grid gap-8 min-[880px]:grid-cols-[0.8fr_1.2fr] min-[880px]:gap-12">
          {/* destination switcher */}
          <div
            role="tablist"
            aria-label="Trips priced on this page"
            aria-orientation="vertical"
            className="flex flex-col border-t border-line"
          >
            {trips.map((item, index) => (
              <button
                key={item.place}
                type="button"
                role="tab"
                id={`trip-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`trip-panel-${index}`}
                tabIndex={index === active ? 0 : -1}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    moveTo(index + 1);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveTo(index - 1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    moveTo(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    moveTo(trips.length - 1);
                  }
                }}
                className={cn(
                  "group flex items-center justify-between gap-4 border-b border-line py-4 text-left transition-colors",
                  index === active
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      "num text-[10px] transition-colors",
                      index === active ? "text-brand" : "text-muted",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span className="truncate text-[15px] font-medium tracking-tight sm:text-base">
                    {item.place}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="num text-sm tabular-nums">
                    {inr(item.cost)}
                  </span>
                  <Plane
                    aria-hidden
                    className={cn(
                      "size-3.5 transition-all duration-300",
                      index === active
                        ? "-rotate-12 text-brand opacity-100"
                        : "translate-x-1 opacity-0",
                    )}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* panel */}
          <div
            key={trip.place}
            id={`trip-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`trip-tab-${active}`}
            className="panel-in"
          >
            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] rounded-tl-[7rem] bg-cream-2 sm:rounded-tl-[10rem]">
                {place ? (
                  <Image
                    src={`/places/${place.slug}.jpg`}
                    alt={place.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    className="object-cover"
                  />
                ) : null}
                <span className="absolute right-4 top-4 grid size-16 -rotate-12 place-items-center rounded-full border-2 border-dashed border-cream/70 bg-ink/35 text-center text-[9px] font-medium uppercase leading-[1.4] tracking-[0.1em] text-cream backdrop-blur-sm">
                  {trip.days}
                  <br />
                  days
                </span>
              </div>

              <div className="absolute -bottom-5 left-4 max-w-[85%] rounded-xl border border-line bg-surface/95 px-4 py-2.5 backdrop-blur sm:left-6">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  {place?.country}
                </p>
                <p className="font-serif text-lg italic leading-tight">
                  {place?.name}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-muted">{trip.route}</p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {trip.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                <div className="bg-surface px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                    Total, per person
                  </p>
                  <p className="num mt-0.5 text-2xl font-medium tracking-tight">
                    {inr(trip.cost)}
                  </p>
                </div>
                <div className="bg-surface px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
                    <Ticket className="size-3 text-accent" aria-hidden />
                    Per day
                  </p>
                  <p className="num mt-0.5 text-2xl font-medium tracking-tight text-brand">
                    {inr(perDay)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div
                  className="h-1 w-full overflow-hidden rounded-full bg-line"
                  role="img"
                  aria-label={`${inr(perDay)} per day, ${bar}% of the highest daily spend`}
                >
                  <span
                    className="block h-full rounded-full bg-brand/70 transition-[width] duration-500 ease-out"
                    style={{ width: `${bar}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
                  <span>Daily spend</span>
                  <span>Lowest → highest</span>
                </div>
              </div>

              <a
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand"
              >
                Plan one like this
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted">
          Totals per person, not per day — flights from India, stays, food,
          transport and visas included. Your trip will differ; that&apos;s what
          the itinerary is for.
        </p>
      </div>
    </section>
  );
}
