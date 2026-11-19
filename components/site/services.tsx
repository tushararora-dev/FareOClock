"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  FileText,
  PhoneCall,
  Video,
  type LucideIcon,
} from "lucide-react";
import { PassportSection } from "@/components/passport-section";
import { Reveal } from "@/components/reveal";
import { useCurrency } from "@/lib/currency";
import { places, services } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  FileText,
  Video,
  PhoneCall,
};

const covers: Record<string, string> = {
  "tips-pdf": "banahills",
  "itinerary-session": "disneyland-day",
  "travel-talk": "thailand",
};

export function Services() {
  const { money } = useCurrency();

  return (
    <section id="services" className="section pointer-events-auto">
      <PassportSection
        number="04"
        tilt="left-up"
        eyebrow="04 · What you can book"
        title={<>Services.</>}
        description={
          <>
            Both start with your{" "}
            <span className="marker-yellow font-semibold text-ink">
              budget
            </span>{" "}
            and your dates — not with a{" "}
            <span className="marker-yellow font-semibold text-ink">
              template
            </span>
            . Pick the one that fits where you&apos;re stuck.
          </>
        }
        action={
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Contact
            <ArrowRight className="size-4" aria-hidden />
          </a>
        }
        fields={[
          { label: "Holder", value: "The independent traveller" },
          { label: "Issued for", value: "Your next adventure" },
          { label: "Budget / dates", value: "Set by you" },
          { label: "Planning approach", value: "Personal, not packaged" },
        ]}
        stampLabel="BOOKING"
        stampStatus="BUDGET FIRST"
        stampUpperText=""
        stampLowerText="YOUR NEXT CHAPTER"
        stampSeriesText=""
        stampVariant="octagonal"
        stampInk="plum"
        machineText="FOC<<YOUR<NEXT<CHAPTER<<BUDGET<FIRST<<YOUR<DATES<<YOUR<PLAN<<<<<<<<<<<<"
      />

      <div className="shell passport-content--tilt-left-up mt-5 grid gap-4 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[service.icon] ?? FileText;
          const cover = places.find((place) => place.slug === covers[service.id]);

          return (
            <Reveal key={service.id} delay={index * 0.06} className="h-full">
              <article
                id={`service-${service.id}`}
                className={
                  service.badge
                    ? "group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/25 bg-surface shadow-[0_30px_70px_-58px_rgba(20,32,27,0.7)] transition-[border-color,box-shadow] duration-300"
                    : "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300"
                }
              >
                <div className="relative h-32 overflow-hidden sm:h-36">
                  {cover ? (
                    <Image
                      src={`/places/${cover.slug}.jpg`}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      quality={90}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-ink/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                    <Icon className="size-3" strokeWidth={2} aria-hidden />
                    {service.kicker}
                  </span>
                  <p className="num absolute bottom-4 right-4 rounded-full bg-cream px-3 py-1 text-sm font-medium text-ink shadow-sm">
                    {money(service.price)}{" "}
                    <span className="text-[10px] font-normal text-muted">
                      {service.unit}
                    </span>
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                      {service.title}
                    </h3>
                    {service.badge ? (
                      <span className="mt-1 shrink-0 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-ink">
                        {service.badge}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                    {service.summary}
                  </p>

                  <ul className="mt-3 grid gap-2 border-t border-line pt-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-left text-[13px] leading-snug text-ink/85"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand"
                          strokeWidth={2.4}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
