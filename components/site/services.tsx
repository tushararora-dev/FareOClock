import {
  ArrowUpRight,
  Layers,
  PenTool,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  Sparkles,
  Layers,
  PenTool,
  Zap,
};

export function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Four disciplines,{" "}
                  <span className="font-serif italic text-fog/60">
                    one team
                  </span>
                  .
                </>
              }
              description="No hand-offs between agencies. Strategy, design and code sit in the same room, so the idea survives all the way to launch."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fog"
            >
              Discuss your project
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Sparkles;

            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-300 hover:border-accent/30 sm:p-8">
                  <div
                    aria-hidden
                    className="glow pointer-events-none absolute -right-20 -top-24 size-52 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex items-start justify-between gap-6">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-muted/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-xl font-medium tracking-tight">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-pretty text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
