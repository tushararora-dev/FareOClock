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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
                <span className="font-serif text-lg italic leading-none">
                  {site.name.charAt(0).toLowerCase()}
                </span>
              </span>
              <span className="text-[15px] font-medium tracking-tight">
                {site.name.toLowerCase()}
                <span className="text-muted">®</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              A small design studio for ambitious teams. Brand, web and product
              — built to be remembered.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Studio
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-fog/80 transition-colors hover:text-fog"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-fog/80 transition-colors hover:text-fog"
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
                    className="group inline-flex items-center gap-1 text-fog/80 transition-colors hover:text-fog"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-muted underline-offset-4 hover:text-fog hover:underline"
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
            <a href="#top" className="transition-colors hover:text-fog">
              Back to top
            </a>
            <span aria-hidden>·</span>
            <span>Built with Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
