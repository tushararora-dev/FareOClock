"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

const FOCUS = { lat: 22, lon: 88 };
/** Where the focus sits across the hero. */
const FOCUS_X = 0.7;

/**
 * Two keyed basemaps for comparison, plus a keyless OpenFreeMap fallback so
 * the hero never ships broken. Pick one with `?map=mapbox|maptiler`; MapTiler
 * is the default when its key is set because its quieter vector cartography
 * lets the cream palette lead.
 */
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim();
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY?.trim();

type Provider = "mapbox" | "maptiler" | "openfreemap";
type ProviderStyle = string | import("maplibre-gl").StyleSpecification;

/**
 * MapLibre can't read Mapbox's `mapbox://` style URLs, so the Mapbox option
 * is a raster style pointed at Mapbox's own pre-rendered tiles. It is the
 * same cartography, just delivered as images.
 */
const MAPBOX_STYLE: ProviderStyle | null = MAPBOX_TOKEN
  ? {
      version: 8,
      sources: {
        mapbox: {
          type: "raster",
          tileSize: 512,
          tiles: [
            `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
          ],
        },
      },
      layers: [{ id: "mapbox", type: "raster", source: "mapbox" }],
    }
  : null;

const PROVIDERS: Record<Provider, ProviderStyle | null> = {
  mapbox: MAPBOX_STYLE,
  maptiler: MAPTILER_KEY
    ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`
    : null,
  openfreemap: "https://tiles.openfreemap.org/styles/positron",
};

const DEFAULT_PROVIDER: Provider = MAPTILER_KEY
  ? "maptiler"
  : MAPBOX_TOKEN
    ? "mapbox"
    : "openfreemap";

const CREDITS: Record<Provider, { label: string; href: string }[]> = {
  mapbox: [
    { label: "Mapbox", href: "https://www.mapbox.com/about/maps/" },
    {
      label: "OpenStreetMap",
      href: "https://www.openstreetmap.org/copyright",
    },
  ],
  maptiler: [
    { label: "MapTiler", href: "https://www.maptiler.com/copyright/" },
    {
      label: "OpenStreetMap",
      href: "https://www.openstreetmap.org/copyright",
    },
  ],
  openfreemap: [
    { label: "OpenMapTiles", href: "https://www.openmaptiles.org/" },
    {
      label: "OpenStreetMap",
      href: "https://www.openstreetmap.org/copyright",
    },
    { label: "OpenFreeMap", href: "https://openfreemap.org" },
  ],
};

let requestedProvider: Provider | null = null;
let requestedResolved = false;

const subscribe = () => () => {};
const getServerProvider = () => DEFAULT_PROVIDER;
const getClientProvider = () => {
  if (!requestedResolved) {
    requestedResolved = true;
    const picked = new URLSearchParams(window.location.search).get("map");
    if (picked && Object.keys(PROVIDERS).includes(picked)) {
      const provider = picked as Provider;
      if (PROVIDERS[provider]) requestedProvider = provider;
    }
  }
  return requestedProvider ?? DEFAULT_PROVIDER;
};

/** Degrees of longitude visible at the current breakpoint. */
const spanFor = (width: number) => (width >= 720 ? 74 : 44);

/** MapLibre renders the world 512px wide at zoom 0. */
const WORLD_PX = 512;
/** Equator metres per pixel at zoom 0 for a 512px world. */
const EQUATOR_M_PER_PX = 78271.51696;

const formatLat = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "N" : "S"}`;
const formatLon = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "E" : "W"}`;

export function MapBackdrop() {
  const provider = useSyncExternalStore(
    subscribe,
    getClientProvider,
    getServerProvider,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const fitRef = useRef<() => void>(() => {});

  const [hinted, setHinted] = useState(false);
  const touchedRef = useRef(false);

  useEffect(() => {
    let disposed = false;
    let map: import("maplibre-gl").Map | null = null;
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
        const metresPerPixel =
          (EQUATOR_M_PER_PX * Math.cos((center.lat * Math.PI) / 180)) /
          Math.pow(2, map.getZoom());
        const km = (metresPerPixel * 120) / 1000;
        bar.textContent = `${Math.max(1, Math.round(km / 10) * 10)} km`;
      }
    };

    (async () => {
      const maplibre = await import("maplibre-gl");
      if (disposed || !mapElRef.current) return;

      // The worker ships as a static file so Turbopack never rewrites it.
      maplibre.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

      const instance = new maplibre.Map({
        container: mapElRef.current,
        style: PROVIDERS[provider] ?? PROVIDERS.openfreemap!,
        center: [FOCUS.lon, FOCUS.lat],
        zoom: 4,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        boxZoom: false,
        minZoom: 2,
        maxZoom: 9,
        fadeDuration: 0,
        renderWorldCopies: true,
        // MapTiler's style carries a top-level `name` that MapLibre v6's
        // runtime validator rejects; the style itself renders fine.
        validateStyle: false,
      });
      map = instance;
      mapRef.current = instance;

      instance.scrollZoom.disable();
      instance.boxZoom.disable();
      instance.doubleClickZoom.enable();
      instance.keyboard.enable();
      if (!finePointer) {
        instance.dragPan.disable();
        instance.touchZoomRotate.disable();
      }

      const fit = () => {
        const root = rootRef.current;
        if (!root) return;
        const span = spanFor(root.clientWidth || 1);
        // Show `span` degrees across the hero, with India at FOCUS_X.
        const zoom = Math.log2((root.clientWidth * 360) / span / WORLD_PX);
        const lon = FOCUS.lon - (FOCUS_X - 0.5) * span;
        instance.jumpTo({ center: [lon, FOCUS.lat], zoom });
        sync();
      };
      fitRef.current = fit;
      fit();

      instance.on("move", sync);
      instance.on("resize", sync);
      instance.on("dragstart", () => {
        touchedRef.current = true;
        setHinted(true);
      });
      instance.once("load", () => {
        const root = rootRef.current;
        if (root) root.dataset.mapReady = "true";
        // Re-frame once the style and the final layout are in place.
        if (!touchedRef.current) fit();
        sync();
      });

      instance
        .getContainer()
        .setAttribute(
          "aria-label",
          "Map of Asia. Drag to pan, use the plus and minus buttons to zoom.",
        );

      observer = new ResizeObserver(() => {
        instance.resize();
        if (touchedRef.current) sync();
        else fit();
      });
      if (rootRef.current) observer.observe(rootRef.current);
    })();

    return () => {
      disposed = true;
      observer?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [provider]);

  /**
   * Keep the map pinned to the viewport while the hero scrolls past. The
   * hero's `overflow-hidden` clips it at the section edge, so it never
   * leaks behind the cream sections below.
   */
  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.parentElement;
    if (!root || !hero) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const offset = Math.min(
        Math.max(0, window.scrollY - hero.offsetTop),
        hero.offsetHeight,
      );
      root.style.transform = offset
        ? `translate3d(0, ${offset}px, 0)`
        : "";
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.transform = "";
    };
  }, []);

  function zoom(factor: number) {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({
      zoom: map.getZoom() + factor,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : 220,
    });
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
        tabIndex={0}
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
          {CREDITS[provider].map((credit, index) => (
            <span key={credit.href}>
              {index > 0 && " · "}
              <a
                href={credit.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line-strong underline-offset-2 hover:text-ink"
              >
                {credit.label}
              </a>
            </span>
          ))}
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
