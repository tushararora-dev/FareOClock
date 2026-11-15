import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-line">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-cream">
                <span className="font-serif text-lg italic leading-none">b</span>
              </span>
              <span className="text-[15px] font-medium tracking-tight">
                {site.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              {site.tagline} Custom itineraries and 1:1 sessions for people who
              want the whole world, not just the brochure version.
            </p>
            <p className="mt-4 font-serif text-lg italic text-brand">
              {site.mission}
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-ink/75 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-ink/75 transition-colors hover:text-ink"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Elsewhere
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 text-ink/75 transition-colors hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <a href="/credits" className="transition-colors hover:text-ink">
              Photo credits
            </a>
            <span aria-hidden>·</span>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top
            </a>
            <span aria-hidden>·</span>
            <span>{site.domain}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
