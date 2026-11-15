import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { MapBackdrop } from "@/components/site/map-backdrop";
import { site, stats } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32"
    >
      <MapBackdrop />

      <div className="shell pointer-events-none relative z-10">
        <div className="max-w-[35rem]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/80 px-3 py-1.5 text-xs text-muted backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              {site.availability}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-balance text-[clamp(2.6rem,6.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              See the whole world.{" "}
              <span className="block font-serif text-brand">
                <em className="italic">On a small budget.</em>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              I don&apos;t sell packages and I don&apos;t book on commission. You
              bring the dates and the budget; on a 1:1 call we work out the
              route, the visa, the points and the{" "}
              <span className="text-ink">real cost</span> — then I write it into
              an itinerary you can follow.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-brand"
              >
                Plan my trip
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#ask"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-cream/70 px-5 py-3 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-ink/25 hover:bg-surface"
              >
                1:1 calls, ₹999
                <ArrowUpRight className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-11 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/80 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 bg-cream/85 px-4 py-4 backdrop-blur sm:px-4 sm:py-4"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="num block text-xl font-medium tracking-tight">
                      {stat.value}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 block text-[11px] leading-tight text-muted"
                    >
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
