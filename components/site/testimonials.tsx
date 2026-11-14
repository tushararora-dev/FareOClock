import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section border-y border-line bg-ink-2/40"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Client words"
            align="center"
            className="mx-auto max-w-2xl items-center text-center"
            title={
              <>
                Teams keep coming{" "}
                <span className="font-serif italic text-fog/60">back</span>.
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-ink p-6 sm:p-7">
                <Quote className="size-6 text-accent/70" strokeWidth={1.5} />
                <blockquote className="mt-5 flex-1 text-pretty text-[15px] leading-relaxed text-fog/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid size-9 place-items-center rounded-full border border-line bg-white/[0.04] text-[11px] font-medium text-muted">
                    {item.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
