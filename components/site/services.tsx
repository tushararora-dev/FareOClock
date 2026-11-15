import Image from "next/image";
import { ArrowUpRight, Check, MapPinned, Video, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { places, process, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  MapPinned,
  Video,
};

const covers: Record<string, string> = {
  itinerary: "india",
  session: "thailand",
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 min-\[880px\]:flex-row min-[880px]:items-end">
          <SectionHeading
            eyebrow="03 · What you can book"
            title={
              <>
                A plan, or a{" "}
                <span className="font-serif italic text-brand">
                  conversation.
                </span>
              </>
            }
            description="Both start with your budget and your dates — not with a template. Pick the one that fits where you're stuck."
          />
          <p className="text-sm text-muted">
            Most people start with one,{" "}
            <span className="text-ink">come back for the other.</span>
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? MapPinned;
            const cover = places.find((place) => place.slug === covers[service.id]);

            return (
              <Reveal key={service.id} delay={index * 0.06} className="h-full">
                <article
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface",
                    service.badge
                      ? "border-brand/25 shadow-[0_30px_70px_-58px_rgba(20,32,27,0.7)]"
                      : "border-line",
                  )}
                >
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    {cover ? (
                      <Image
                        src={`/places/${cover.slug}.jpg`}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 92vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                    />
                    <span className="absolute left-5 top-4 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-ink/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                      <Icon className="size-3" strokeWidth={2} aria-hidden />
                      {service.kicker}
                    </span>
                    <p className="num absolute bottom-4 right-5 rounded-full bg-cream px-3 py-1 text-sm font-medium text-ink shadow-sm">
                      {service.price}{" "}
                      <span className="text-[10px] font-normal text-muted">
                        {service.unit}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-medium tracking-tight">
                        {service.title}
                      </h3>
                      {service.badge ? (
                        <span className="mt-1 shrink-0 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-ink">
                          {service.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>

                    <ul className="mt-5 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[13px] leading-snug text-ink/85"
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

                    <a
                      href="#contact"
                      className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink"
                    >
                      {service.cta}
                      <ArrowUpRight
                        className="size-4 text-brand transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* process — one compact strip instead of its own section */}
        <Reveal delay={0.06}>
          <div className="mt-12 border-t border-line pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted">
                From &ldquo;I want to go&rdquo; to boarding
              </h3>
              <p className="text-xs text-muted">First draft in 48 hours</p>
            </div>

            <ol className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {process.map((step) => (
                <li key={step.step} className="border-t border-line pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="num text-[10px] text-brand">
                      {step.step}
                    </span>
                    <h4 className="text-sm font-medium tracking-tight">
                      {step.title}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
