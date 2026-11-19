import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { site } from "@/lib/site";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** Slim footer strip — lives inside the Contact panel so the page stays one screen. */
export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="pointer-events-auto relative z-10 border-t border-line/70 bg-cream/90 backdrop-blur">
      <div className="shell flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 text-[11px] text-muted sm:py-2.5 sm:text-xs">
        <div className="flex items-center gap-2">
          <a
            href="#top"
            className="brand-link group inline-flex items-center gap-1.5 text-ink transition-opacity hover:opacity-95"
          >
            <span className="brand-logo-badge inline-flex shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110">
              <LogoMark className="size-5 sm:size-6" />
            </span>
            <span className="text-xs font-medium tracking-tight">
              {site.name}
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 sm:gap-x-4">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1 text-ink/75 transition-colors hover:text-ink"
            >
              {social.label}
              <ArrowUpRight
                className="size-3 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          ))}
          <span>
            © {year} {site.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
