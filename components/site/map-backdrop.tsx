"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

const FOCUS = { lat: 22, lon: 88 };
/** Where the focus sits across the hero. */
const FOCUS_X = 0.7;

/** Degrees of longitude visible at the current breakpoint. */
const spanFor = (width: number) => (width >= 720 ? 74 : 44);

const formatLat = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "N" : "S"}`;
const formatLon = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "E" : "W"}`;

export function MapBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const fitRef = useRef<() => void>(() => {});

  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    let disposed = false;
    let map: import("leaflet").Map | null = null;
    let observer: ResizeObserver | null = null;

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const sync = () => {
      const root = rootRef.current;
      if (!root || !map) return;
      const chip = root.querySelector<HTMLElement>("[data-readout]");
      const bar = root.querySelector<HTMLElement>("[data-scale-label]");
      const center = map.getCenter();
      if (chip) {
        chip.textContent = `${formatLat(center.lat)} · ${formatLon(center.lng)}`;
      }
      if (bar) {
        const size = map.getSize();
        const from = map.containerPointToLatLng([
          size.x / 2 - 60,
          size.y / 2,
        ]);
        const to = map.containerPointToLatLng([size.x / 2 + 60, size.y / 2]);
        const km = map.distance(from, to) / 1000;
        bar.textContent = `${Math.max(1, Math.round(km / 10) * 10)} km`;
      }
    };

    (async () => {
      const L = (await import("leaflet")).default;
      if (disposed || !mapElRef.current) return;

      map = L.map(mapElRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: true,
        dragging: finePointer,
        touchZoom: finePointer,
        inertia: finePointer,
        worldCopyJump: true,
        zoomSnap: 0.25,
        zoomDelta: 0.75,
        minZoom: 2,
        maxZoom: 9,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 20,
          detectRetina: true,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      const fit = () => {
        const root = rootRef.current;
        if (!root || !map) return;
        const width = root.clientWidth || 1;
        const span = spanFor(width);
        // Show `span` degrees across the hero, with India at FOCUS_X.
        const zoom = Math.log2((width * 360) / span / 256);
        const lon = FOCUS.lon - (FOCUS_X - 0.5) * span;
        map.setView([FOCUS.lat, lon], zoom, { animate: false });
        sync();
      };
      fitRef.current = fit;
      fit();

      map.on("move zoom resize", sync);
      map.on("dragstart", () => setHinted(true));

      map.getContainer().setAttribute(
        "aria-label",
        "Map background. Drag to pan, use the plus and minus buttons to zoom.",
      );

      observer = new ResizeObserver(() => {
        if (!map) return;
        map.invalidateSize();
        sync();
      });
      if (rootRef.current) observer.observe(rootRef.current);
    })();

    const root = rootRef.current;
    const onPointerMove = (event: PointerEvent) => {
      if (!root) return;
      const rect = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      root.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    root?.addEventListener("pointermove", onPointerMove);

    return () => {
      disposed = true;
      observer?.disconnect();
      root?.removeEventListener("pointermove", onPointerMove);
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  function zoom(factor: number) {
    mapRef.current?.zoomIn(factor, { animate: true });
  }

  return (
    <div
      ref={rootRef}
      className="hero-map absolute inset-0 z-0 overflow-hidden bg-[#dbe7e0]"
    >
      <div
        ref={mapElRef}
        className="absolute inset-0 h-full w-full"
        role="region"
        aria-label="Map of Asia"
      />

      <div
        aria-hidden
        className="map-light pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--color-cream)_0%,rgba(250,246,238,0.97)_26%,rgba(250,246,238,0.86)_40%,rgba(250,246,238,0.46)_55%,rgba(250,246,238,0.05)_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream to-transparent"
      />

      {/* floating photos */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[24%] hidden md:block"
      >
        {[
          { slug: "thailand", className: "rotate-[-6deg] float-slow" },
          { slug: "vietnam", className: "-mt-10 ml-16 rotate-[7deg] float-slower" },
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
              sizes="160px"
              loading="eager"
              className="object-cover"
            />
          </span>
        ))}
      </div>

      {/* cartography chips */}
      <div className="pointer-events-none absolute bottom-5 left-[max(1.25rem,calc((100vw-76rem)/2+1.25rem))] z-20 hidden items-end gap-3 sm:flex">
        <span className="hidden flex-col gap-1 rounded-full border border-line bg-cream/85 px-3 py-1.5 backdrop-blur md:flex">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
            <span data-readout className="num text-ink">
              22.0°N · 88.0°E
            </span>
          </span>
        </span>

        <span className="hidden items-center gap-2 pb-0.5 lg:flex" aria-hidden>
          <span className="relative block h-1.5 w-[120px] rounded-full bg-ink/20">
            <span className="absolute inset-y-0 left-0 w-px bg-ink/40" />
            <span className="absolute inset-y-0 right-0 w-px bg-ink/40" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-ink/30" />
          </span>
          <span data-scale-label className="num text-[10px] text-muted">
            400 km
          </span>
        </span>
      </div>

      {/* controls + required map attribution */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2 sm:right-8">
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur transition-opacity duration-300",
            hinted ? "hidden" : "hidden pointer-fine:inline-flex",
          )}
        >
          <Move className="size-3" strokeWidth={2.2} />
          Drag the map
        </span>

        <div className="flex overflow-hidden rounded-full border border-line bg-cream/90 shadow-[0_10px_30px_-22px_rgba(20,32,27,0.8)] backdrop-blur">
          <MapButton label="Zoom in" onClick={() => zoom(0.75)}>
            <Plus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton label="Zoom out" onClick={() => zoom(-0.75)}>
            <Minus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton label="Reset the map" onClick={() => fitRef.current()} last>
            <RotateCcw className="size-3" strokeWidth={2.4} />
          </MapButton>
        </div>

        <span className="rounded-full bg-cream/80 px-2 py-0.5 text-[9px] leading-relaxed text-muted backdrop-blur">
          ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            OpenStreetMap
          </a>{" "}
          ·{" "}
          <a
            href="https://carto.com/attributions"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            CARTO
          </a>
        </span>
      </div>
    </div>
  );
}

function MapButton({
  label,
  onClick,
  children,
  last = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center text-ink transition-colors hover:bg-cream",
        !last && "border-r border-line",
      )}
    >
      {children}
    </button>
  );
}
