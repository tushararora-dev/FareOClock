import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="section">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Six weeks.{" "}
                  <span className="font-serif italic text-fog/60">
                    No surprises.
                  </span>
                </>
              }
              description="A fixed rhythm with weekly reviews, so you always know what's happening and what's next."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-line bg-ink-2 p-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-fog">Typical timeline:</span> six weeks
                from kickoff to launch. We take on two projects at a time so
                nothing sits in a queue.
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="flex flex-col">
          {process.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.05}>
              <li className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-line py-8 last:border-b sm:grid-cols-[auto_1fr_auto] sm:gap-x-8">
                <span className="font-mono text-sm text-accent/80">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
                <span className="col-start-2 text-xs uppercase tracking-[0.14em] text-muted/70 sm:col-start-3 sm:text-right">
                  {step.duration}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
