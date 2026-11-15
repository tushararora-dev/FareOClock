import { Check, Plane } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pricing } from "@/lib/site";
import { cn } from "@/lib/utils";

const barcode = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 3, 2, 1, 4, 1, 2];

const core = pricing.filter((tier) => tier.name !== "Trip partner");
const partner = pricing.find((tier) => tier.name === "Trip partner");

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="06 · Pricing"
            title={
              <>
                Two ways to{" "}
                <span className="font-serif italic text-brand">board.</span>
              </>
            }
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            You&apos;ll know the number before I start. No hourly billing, no
            mark-ups on flights.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {core.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.06} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-2xl border bg-surface",
                  tier.featured
                    ? "border-ink/20 shadow-[0_30px_60px_-50px_rgba(20,32,27,0.6)]"
                    : "border-line",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 px-5 py-2.5 text-[10px] uppercase tracking-[0.16em]",
                    tier.featured ? "bg-ink text-cream" : "bg-cream-2 text-muted",
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Plane className="size-3 -rotate-45" strokeWidth={2} aria-hidden />
                    Budget Banda
                  </span>
                  {tier.featured ? (
                    <span className="font-semibold text-accent">★ Most booked</span>
                  ) : (
                    <span className="num opacity-70">BP 01</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    {tier.name}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                    <span className="num text-4xl font-medium tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-muted">{tier.cadence}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {tier.description}
                  </p>

                  <div className="relative my-5">
                    <span
                      aria-hidden
                      className="absolute -left-[1.9rem] top-1/2 size-5 -translate-y-1/2 rounded-full bg-cream sm:-left-[2.15rem]"
                    />
                    <span
                      aria-hidden
                      className="absolute -right-[1.9rem] top-1/2 size-5 -translate-y-1/2 rounded-full bg-cream sm:-right-[2.15rem]"
                    />
                    <span className="block border-t border-dashed border-line-strong" />
                  </div>

                  <ul className="flex flex-1 flex-col gap-2.5">
                    {tier.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-ink/85"
                      >
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            tier.featured ? "text-brand" : "text-muted",
                          )}
                          strokeWidth={2.2}
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={cn(
                      "mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                      tier.featured
                        ? "bg-ink text-cream hover:bg-brand"
                        : "border border-line-strong text-ink hover:border-ink/25 hover:bg-cream",
                    )}
                  >
                    {tier.cta}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-2.5 sm:px-6">
                  <div className="flex h-5 items-end gap-[2px]" aria-hidden>
                    {barcode.map((width, i) => (
                      <span
                        key={i}
                        className={cn("h-full bg-ink/55", i % 3 === 0 && "bg-ink/30")}
                        style={{ width }}
                      />
                    ))}
                  </div>
                  <span className="num text-[10px] uppercase tracking-[0.16em] text-muted">
                    {tier.featured ? "Gate A1" : "Gate B2"}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {partner ? (
          <Reveal delay={0.1}>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong bg-surface/60 px-5 py-4">
              <p className="text-sm">
                <span className="font-medium">{partner.name}</span>
                <span className="text-muted"> — {partner.cadence}, plus WhatsApp support while you travel.</span>
              </p>
              <p className="flex items-center gap-4">
                <span className="num text-lg font-medium tracking-tight">
                  {partner.price}
                </span>
                <a
                  href="#contact"
                  className="text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  {partner.cta} →
                </a>
              </p>
            </div>
          </Reveal>
        ) : null}

        <p className="mt-6 text-xs text-muted">
          Session fee is adjusted against your itinerary if you book one within 7
          days. UPI, cards and international payments accepted.
        </p>
      </div>
    </section>
  );
}
