import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { pricing } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Engagements"
            align="center"
            className="mx-auto max-w-2xl items-center text-center"
            title={
              <>
                Clear scope,{" "}
                <span className="font-serif italic text-fog/60">
                  fixed price
                </span>
                .
              </>
            }
            description="No hourly billing, no scope creep. Pick the shape of engagement that fits where you are right now."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {pricing.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 sm:p-7",
                  tier.featured
                    ? "border-accent/40 bg-ink-2"
                    : "border-line bg-ink-2/50",
                )}
              >
                {tier.featured ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-accent-ink">
                    Most popular
                  </span>
                ) : null}

                <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-medium tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-muted">{tier.cadence}</span>
                </div>

                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                  {tier.description}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-fog/85"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-accent" : "text-muted",
                        )}
                        strokeWidth={2}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors",
                    tier.featured
                      ? "bg-accent text-accent-ink hover:bg-accent/90"
                      : "border border-line text-fog hover:border-white/25 hover:bg-white/5",
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs text-muted">
            All engagements include a kickoff workshop, source files and a
            handover session.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
