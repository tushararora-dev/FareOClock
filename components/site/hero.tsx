"use client";

import Image from "next/image";
import { HeroPassportPage } from "@/components/site/hero-passport-page";
import { MapHud } from "@/components/site/map-hud";
import { useMapController } from "@/lib/map-controller";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="top"
      className="pointer-events-none relative isolate min-h-[calc(100dvh-3rem)] overflow-hidden pb-6 pt-9 sm:min-h-[calc(100dvh-3.5rem)] sm:pb-8 sm:pt-11 lg:min-h-[calc(100dvh-3.75rem)] lg:pb-10 lg:pt-13"
    >
      <MapHud controller={useMapController()} />

      {/* floating photos stay with the hero while the map stays pinned */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[24%] z-0 hidden md:block"
      >
        {[
          { slug: "thailand", className: "rotate-[-6deg] float-slow" },
          {
            slug: "disneyland-day",
            className: "-mt-30 ml-24 rotate-[-4deg] float-slower",
          },
          {
            slug: "banahills",
            className: "-mt-30 ml-48 rotate-[5deg] float-sway",
          },
        ].map(({ slug, className }) => (
          <span
            key={slug}
            className={cn(
              "relative block h-32 w-24 overflow-hidden rounded-md border-2 border-cream bg-cream shadow-[0_24px_50px_-30px_rgba(20,32,27,0.75)] xl:h-40 xl:w-32",
              className,
            )}
          >
            <Image
              src={`/places/${slug}.jpg`}
              alt=""
              fill
              sizes="256px"
              quality={90}
              loading="eager"
              className="object-cover"
            />
          </span>
        ))}
      </div>

      <div className="shell pointer-events-none relative z-10 pl-5 pr-3 sm:px-6">
        <HeroPassportPage />
      </div>
    </section>
  );
}
