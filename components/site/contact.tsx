import { Calendar, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="noise relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="glow pointer-events-none absolute -left-24 -top-32 size-96 opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid opacity-40"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  Start a project
                </span>
                <h2 className="mt-5 max-w-md text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                  Let&apos;s make something people{" "}
                  <span className="font-serif italic text-accent">
                    remember
                  </span>
                  .
                </h2>
                <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted sm:text-base">
                  Tell us where you are and where you want to be. We&apos;ll
                  reply within one business day with honest next steps — even if
                  we&apos;re not the right fit.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <ul className="mt-9 flex flex-col gap-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group inline-flex items-center gap-3 text-fog"
                    >
                      <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
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
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-line bg-ink/80 p-5 backdrop-blur sm:p-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
