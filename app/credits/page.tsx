import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import credits from "@/lib/place-credits.json";
import { places } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution and licences for the landmark photographs used on FareO'Clock.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="glow pointer-events-none absolute -top-40 right-0 size-[28rem] opacity-50"
      />

      <div className="shell relative py-16 sm:py-24">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to the site
        </Link>

        <span className="eyebrow mt-10 flex">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          Attribution
        </span>

        <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2.2rem,5.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em]">
          Photo{" "}
          <span className="font-serif italic text-brand">credits.</span>
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          Every landmark photo on this site comes from Wikimedia Commons, made
          available by photographers who share their work for free. Each one is
          credited below with its licence and original file.
        </p>

        <ol className="mt-12 border-t border-line">
          {credits.map((credit) => {
            const place = places.find((item) => item.slug === credit.slug);

            return (
              <li
                key={credit.slug}
                className="grid gap-4 border-b border-line py-5 sm:grid-cols-[6.5rem_1fr_auto] sm:items-center sm:gap-6"
              >
                <div className="relative aspect-[4/3] w-28 overflow-hidden rounded-lg border border-line bg-cream-2 sm:w-full">
                  <Image
                    src={`/places/${credit.slug}.jpg`}
                    alt={place?.alt ?? credit.title}
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium tracking-tight">
                    {place?.name ?? credit.title}
                    {place ? (
                      <span className="font-normal text-muted">
                        {" "}
                        · {place.country}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    &ldquo;{credit.title}&rdquo; by {credit.author}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {credit.licenseUrl ? (
                      <a
                        href={credit.licenseUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                      >
                        {credit.license}
                      </a>
                    ) : (
                      credit.license
                    )}
                    <span className="mx-2 text-line-strong">·</span>
                    <a
                      href={credit.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                    >
                      Original file
                      <ArrowUpRight className="size-3" />
                    </a>
                  </p>
                </div>

                <span className="num self-start rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted sm:self-center">
                  {credit.width}×{credit.height}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
          <p>
            Images have been cropped and resized for the web; no other edits were
            made. Licences cover the photograph only — the photographers do not
            endorse this site or its services.
          </p>
          <p className="mt-3">
            Country flags use{" "}
            <a
              href="https://github.com/jdecked/twemoji"
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink underline-offset-4 hover:underline"
            >
              Twemoji
            </a>{" "}
            artwork, licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink underline-offset-4 hover:underline"
            >
              CC BY 4.0
            </a>
            .
          </p>
          <p className="mt-3">
            Text, layout and code on this site are © {""}
            FareO&apos;Clock. If you spot a credit that needs correcting, email{" "}
            <a
              href="mailto:tushar.ai.dev@gmail.com"
              className="text-ink underline-offset-4 hover:underline"
            >
              tushar.ai.dev@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
