"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/** Equator metres per pixel at zoom 0 for a 512px world. */
const EQUATOR_M_PER_PX = 78271.51696;

const formatLat = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "N" : "S"}`;
const formatLon = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "E" : "W"}`;

/**
 * Map furniture that belongs to the hero, not the page background: the
 * coordinate chip, scale bar, zoom buttons and provider attribution all
 * scroll away with the hero while the map itself stays pinned.
 */
export function MapHud({
  controller,
}: {
  controller: import("@/lib/map-controller").MapController,
}) {
  const hudRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef<HTMLSpanElement>(null);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    const map = controller.map;
    if (!map) return;

    const sync = () => {
      const center = map.getCenter();
      if (readoutRef.current) {
        readoutRef.current.textContent = `${formatLat(center.lat)} · ${formatLon(center.lng)}`;
      }
      if (scaleRef.current) {
        const metresPerPixel =
          (EQUATOR_M_PER_PX * Math.cos((center.lat * Math.PI) / 180)) /
          Math.pow(2, map.getZoom());
        const km = (metresPerPixel * 120) / 1000;
        scaleRef.current.textContent = `${Math.max(1, Math.round(km / 10) * 10)} km`;
      }
    };

    const onDrag = () => setHinted(true);

    sync();
    map.on("move", sync);
    map.on("resize", sync);
    map.on("dragstart", onDrag);

    return () => {
      map.off("move", sync);
      map.off("resize", sync);
      map.off("dragstart", onDrag);
    };
  }, [controller]);

  /**
   * The HUD is hero furniture. Fade it as the hero travels so the controls
   * never float over the ticker and the route section.
   */
  useEffect(() => {
    const hud = hudRef.current;
    if (!hud) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const hero = document.getElementById("top");
      if (!hero) return;
      const distance = Math.max(1, hero.offsetHeight * 0.5);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      hud.style.opacity = (1 - progress).toFixed(3);
      hud.style.visibility = progress >= 1 ? "hidden" : "";
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
      hud.style.opacity = "";
      hud.style.visibility = "";
    };
  }, []);

  function zoom(factor: number) {
    const map = controller.map;
    if (!map) return;
    map.easeTo({
      zoom: map.getZoom() + factor,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : 220,
    });
  }

  return (
    <div ref={hudRef} className="pointer-events-none absolute inset-0 z-20">
      {/* cartography chips */}
      <div className="absolute bottom-5 left-[max(1.25rem,calc((100vw-76rem)/2+1.25rem))] hidden items-end gap-3 sm:flex">
        <span className="flex flex-col gap-1 rounded-full border border-line bg-cream/85 px-3 py-1.5 backdrop-blur">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
            <span ref={readoutRef} data-readout className="num text-ink">
              22.5°N · 68.2°E
            </span>
          </span>
        </span>

        <span className="hidden items-center gap-2 pb-0.5 lg:flex" aria-hidden>
          <span className="relative block h-1.5 w-[120px] rounded-full bg-ink/20">
            <span className="absolute inset-y-0 left-0 w-px bg-ink/40" />
            <span className="absolute inset-y-0 right-0 w-px bg-ink/40" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-ink/30" />
          </span>
          <span ref={scaleRef} data-scale-label className="num text-[10px] text-muted">
            840 km
          </span>
        </span>
      </div>

      {/* controls + required map attribution */}
      <div className="pointer-events-auto absolute bottom-4 right-4 flex flex-col items-end gap-2 sm:right-8">
        <span
          aria-hidden
          className={cn(
            "hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur transition-opacity duration-300",
            hinted ? "sm:hidden" : "sm:pointer-fine:inline-flex",
          )}
        >
          <Move className="size-3" strokeWidth={2.2} />
          Drag to pan · double-click to zoom
        </span>

        <div className="flex overflow-hidden rounded-full border border-line bg-cream/90 shadow-[0_10px_30px_-22px_rgba(20,32,27,0.8)] backdrop-blur">
          <MapButton label="Zoom in" onClick={() => zoom(0.75)}>
            <Plus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton label="Zoom out" onClick={() => zoom(-0.75)}>
            <Minus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton
            label="Reset the map"
            onClick={() => controller.fit()}
            last
          >
            <RotateCcw className="size-3" strokeWidth={2.4} />
          </MapButton>
        </div>
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
