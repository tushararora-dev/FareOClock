import { Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="border-y border-line bg-cream-2/70 py-10 sm:py-12">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            05 · Trip notes
          </span>
          <p className="text-xs text-muted">
            Unedited, from people who paid for the work.
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05} y={12}>
              <figure className="flex h-full flex-col">
                <Quote
                  className="size-4 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
                <blockquote className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-ink/85">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 flex items-center gap-2.5">
                  <span className="grid size-7 place-items-center rounded-full bg-brand text-[10px] font-medium text-cream">
                    {item.initials}
                  </span>
                  <span className="text-xs">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted"> · {item.role}</span>
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
