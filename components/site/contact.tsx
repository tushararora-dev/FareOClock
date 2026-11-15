import { Calendar, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="glow pointer-events-none absolute -right-32 -top-40 size-96 opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid opacity-40"
          />

          <div className="relative grid gap-10 min-[880px]:grid-cols-[0.85fr_1.15fr] min-[880px]:gap-14">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  Start here
                </span>
                <h2 className="mt-5 max-w-md text-balance text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.03] tracking-[-0.04em]">
                  Tell me{" "}
                  <span className="font-serif italic text-brand">the trip.</span>
                </h2>
                <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted sm:text-base">
                  Two minutes now saves a week of wrong turns later. I reply
                  within one working day — with honest next steps, even if
                  you&apos;re better off figuring it out yourself.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <ul className="mt-9 flex flex-col gap-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group inline-flex items-center gap-3 text-ink"
                    >
                      <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-brand/40 group-hover:bg-brand-soft group-hover:text-brand">
                        <Mail className="size-4" />
                      </span>
                      <span className="underline-offset-4 group-hover:underline">
                        {site.email}
                      </span>
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-3 text-muted">
                    <span className="grid size-9 place-items-center rounded-full border border-line">
                      <MapPin className="size-4" />
                    </span>
                    {site.location}
                  </li>
                  <li className="inline-flex items-center gap-3 text-muted">
                    <span className="grid size-9 place-items-center rounded-full border border-line">
                      <Calendar className="size-4" />
                    </span>
                    {site.availability}
                  </li>
                </ul>

                <p className="mt-8 max-w-xs border-t border-line pt-5 text-xs leading-relaxed text-muted">
                  No deposit, no card up front. You get a quote and a start date
                  first. UPI and international cards accepted after that.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-line bg-cream/50 p-5 sm:p-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
