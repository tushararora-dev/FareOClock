import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site, stats } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="glow pointer-events-none absolute -top-48 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 opacity-70"
      />

      <div className="shell relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {site.availability}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 max-w-5xl text-balance text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.94] tracking-[-0.045em]">
            Design that earns{" "}
            <span className="font-serif italic text-accent">attention</span> —
            and revenue.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {site.legalName} is a small design studio for ambitious teams. We
            build brands, websites and products that people remember — and buy
            from.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a 20-min call
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-fog transition-colors hover:border-white/25 hover:bg-white/5"
            >
              See selected work
              <ArrowUpRight className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 bg-ink px-5 py-5 sm:px-6 sm:py-6"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-medium tracking-tight sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="text-xs text-muted sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
