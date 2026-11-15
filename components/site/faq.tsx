import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="section border-t border-line">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="07 · Questions"
            title={
              <>
                The things{" "}
                <span className="font-serif italic text-brand">everyone</span>{" "}
                asks.
              </>
            }
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Still unsure? Send a two-line email. I answer every one myself.
          </p>
        </div>

        <div className="mt-8 grid gap-x-10 sm:mt-10 sm:grid-cols-2">
          {faqs.map((faq) => (
            <Reveal key={faq.question} y={12}>
              <details className="group border-t border-line py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px] font-medium leading-snug tracking-tight">
                    {faq.question}
                  </span>
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 group-open:border-brand/40 group-open:bg-brand-soft group-open:text-brand">
                    <Plus className="size-3.5 transition-transform duration-300 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="mt-2.5 max-w-xl pr-8 text-sm leading-relaxed text-muted">
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
