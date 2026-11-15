import { ArrowRight, Video } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { principles, questions, site } from "@/lib/site";

export function Ask() {
  return (
    <section id="ask" className="relative overflow-hidden bg-ink text-on-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
      />
      <div
        aria-hidden
        className="glow pointer-events-none absolute -right-40 top-0 size-[30rem] opacity-25"
      />

      <div className="shell relative py-[clamp(3.5rem,7vw,5.5rem)]">
        <div className="grid gap-10 min-[880px]:grid-cols-[0.95fr_1.05fr] min-[880px]:gap-14">
          <div className="min-[880px]:sticky min-[880px]:top-28 min-[880px]:self-start">
            <Reveal>
              <span className="eyebrow text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                04 · Not a travel blog
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-5 max-w-lg font-serif text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.08] tracking-[-0.02em] text-on-dark">
                {site.mission}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-on-dark-muted sm:text-base">
                This isn&apos;t a list of places I&apos;ve been. It&apos;s a
                service: you bring the trip you&apos;re stuck on, and on a 1:1
                call we work through it — visa, points, volunteer stays, routes,
                money, all of it.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/12 pt-5">
                {principles.map((principle) => (
                  <li
                    key={principle.title}
                    className="flex items-baseline gap-3 text-sm text-on-dark-muted"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {principle.title}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-on-dark"
                >
                  <Video className="size-4" strokeWidth={2} aria-hidden />
                  Book the 1:1 · ₹999
                </a>
                <span className="text-xs text-on-dark-muted">
                  60 min · recording + notes
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-2">
                <h2 className="text-[11px] uppercase tracking-[0.16em] text-accent">
                  Questions I answer on the call
                </h2>
                <span className="num text-[10px] text-on-dark-muted">
                  {questions.length} of many
                </span>
              </div>

              <dl className="mt-1 grid gap-x-8">
                {questions.map((item) => (
                  <div
                    key={item.question}
                    className="border-b border-white/10 py-3.5"
                  >
                    <dt className="text-sm font-medium tracking-tight text-on-dark">
                      {item.question}
                    </dt>
                    <dd className="mt-1 text-xs leading-relaxed text-on-dark-muted">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#contact"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                Ask yours
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
