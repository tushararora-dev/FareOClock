import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { work } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <section id="work" className="section border-t border-line bg-ink-2/40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Proof, not{" "}
                  <span className="font-serif italic text-fog/60">
                    promises
                  </span>
                  .
                </>
              }
              description="A few recent engagements. Metrics are from the first 90 days after launch."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <span className="text-sm text-muted">
              Full case studies on request
            </span>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
          {work.map((project, index) => (
            <Reveal key={project.client} delay={index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink transition-colors duration-300 hover:border-white/20">
                <div
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden bg-gradient-to-br",
                    project.gradient,
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute -right-14 -top-16 size-64 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                    style={{ backgroundColor: project.accent }}
                  />
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.07)_50%,transparent_65%)]"
                  />

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                    <span className="font-serif text-3xl italic leading-none text-fog">
                      {project.client}
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-fog/80 backdrop-blur">
                      {project.sector}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted">
                    <span>{project.year}</span>
                    <span>{project.tags.join(" · ")}</span>
                  </div>

                  <h3 className="mt-4 text-pretty text-lg font-medium leading-snug tracking-tight">
                    {project.title}
                  </h3>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <div>
                      <p className="text-3xl font-medium tracking-tight text-accent">
                        {project.metric}
                      </p>
                      <p className="text-xs text-muted">{project.metricLabel}</p>
                    </div>
                    <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
