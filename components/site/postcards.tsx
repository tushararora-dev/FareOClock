import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { places } from "@/lib/site";

export function Postcards() {
  return (
    <section
      id="postcards"
      className="border-y border-line bg-surface/40 py-10 sm:py-14"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              02 · Postcards
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-tight tracking-[-0.03em]">
              Every postcard{" "}
              <span className="font-serif italic text-brand">
                has a price on it.
              </span>
            </h2>
          </div>
          <p className="text-xs text-muted">
            Straight off the camera roll · real trips, real numbers
          </p>
        </div>
      </div>

      <Reveal delay={0.08}>
        <div className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[max(1.25rem,calc((100vw-76rem)/2+1.25rem))] pb-2">
          {places.map((place, index) => (
            <figure
              key={place.slug}
              className="group relative aspect-[3/4] w-[10.5rem] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-cream-2 sm:w-[12.5rem]"
            >
              <Image
                src={`/places/${place.slug}.jpg`}
                alt={place.alt}
                fill
                sizes="(min-width: 640px) 200px, 168px"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
              />
              <span className="num absolute left-3 top-3 text-[10px] font-medium tracking-[0.12em] text-cream/70">
                N°{String(index + 1).padStart(2, "0")}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 p-3">
                <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-cream/70">
                  <MapPin className="size-2.5" strokeWidth={2.4} aria-hidden />
                  {place.country}
                </span>
                <span className="mt-0.5 block font-serif text-base italic leading-tight text-cream">
                  {place.name}
                </span>
              </figcaption>
              <span className="absolute right-2.5 top-2.5 rounded-full border border-cream/25 bg-ink/25 px-2 py-0.5 text-[9px] font-medium text-cream/90 backdrop-blur-sm">
                {place.cost}
              </span>
            </figure>
          ))}

          <Link
            href="/credits"
            className="group grid aspect-[3/4] w-[8rem] shrink-0 snap-start place-items-center rounded-xl border border-dashed border-line-strong bg-cream text-center text-xs text-muted transition-colors hover:border-brand/40 hover:text-ink"
          >
            <span className="flex flex-col items-center gap-2 px-3">
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Photo credits
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
