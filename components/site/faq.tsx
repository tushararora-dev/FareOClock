import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="section border-t border-line bg-ink-2/40">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  The stuff{" "}
                  <span className="font-serif italic text-fog/60">
                    everyone
                  </span>{" "}
                  asks.
                </>
              }
              description="Still unsure about something? Send a two-line email — we answer every one."
            />
          </Reveal>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group border-t border-line py-5 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-medium tracking-tight sm:text-lg">
                    {faq.question}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 group-open:border-accent/40 group-open:text-accent">
                    <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="mt-3 max-w-xl text-pretty pb-1 pr-12 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
