"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { clearMapController, setMapController } from "@/lib/map-controller";
import {
  DEFAULT_MAP_PROVIDER,
  MAPBOX_TOKEN,
  MAPTILER_KEY,
  useMapProvider,
  type MapProvider,
} from "@/lib/map-provider";

const FOCUS = { lat: 22.5, lon: 88 };
/** Where the focus sits across the viewport. */
const FOCUS_X = 0.69;
/** Degrees of longitude visible: the wide Asia view picked in review. */
const spanFor = (width: number) => (width >= 720 ? 104 : 62);

/** MapLibre renders the world 512px wide at zoom 0. */
const WORLD_PX = 512;

/** The default camera for a given viewport width. */
const viewFor = (width: number) => {
  const span = spanFor(width);
  return {
    center: [
      FOCUS.lon - (FOCUS_X - 0.5) * span,
      FOCUS.lat,
    ] as [number, number],
    zoom: Math.log2((width * 360) / span / WORLD_PX),
  };
};

type ProviderStyle = string | import("maplibre-gl").StyleSpecification;

/**
 * MapLibre can't read Mapbox's `mapbox://` style URLs, so the Mapbox option
 * is a raster style pointed at Mapbox's own pre-rendered tiles. It is the
 * same cartography, just delivered as images.
 */
const MAPBOX_STYLES = [
  "light-v11",
  "streets-v12",
  "outdoors-v12",
  "satellite-v9",
  "satellite-streets-v12",
  "dark-v11",
  "navigation-day-v1",
] as const;
type MapboxStyle = (typeof MAPBOX_STYLES)[number];
const DEFAULT_MAPBOX_STYLE: MapboxStyle = "streets-v12";

const mapboxStyle = (style: MapboxStyle): ProviderStyle | null =>
  MAPBOX_TOKEN
    ? {
        version: 8,
        sources: {
          mapbox: {
            type: "raster",
            tileSize: 512,
            tiles: [
              `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
            ],
          },
        },
        layers: [{ id: "mapbox", type: "raster", source: "mapbox" }],
      }
    : null;

const PROVIDERS: Record<MapProvider, ProviderStyle | null> = {
  mapbox: mapboxStyle(DEFAULT_MAPBOX_STYLE),
  maptiler: MAPTILER_KEY
    ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`
    : null,
  openfreemap: "https://tiles.openfreemap.org/styles/positron",
};

export function MapBackdrop() {
  const provider = useMapProvider();
  const rootRef = useRef<HTMLDivElement>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const driftWrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const driftTarget = useRef({ x: 0, y: 0 });
  const depthVeilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let map: import("maplibre-gl").Map | null = null;
    let observer: ResizeObserver | null = null;
    let cleanupGlobalGestures = () => {};

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    (async () => {
      const maplibre = await import("maplibre-gl");
      if (disposed || !mapElRef.current) return;

      // The worker ships as a static file so Turbopack never rewrites it.
      maplibre.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

      // `?style=` previews Mapbox styles without touching the default
      // (only affects the Mapbox provider).
      const picked = new URLSearchParams(window.location.search).get("style");
      const style =
        provider === "mapbox" && picked
          ? (mapboxStyle(
              (MAPBOX_STYLES as readonly string[]).includes(picked)
                ? (picked as MapboxStyle)
                : DEFAULT_MAPBOX_STYLE,
            ) ?? PROVIDERS.openfreemap!)
          : (PROVIDERS[provider] ?? PROVIDERS.openfreemap!);

      const startView = viewFor(rootRef.current?.clientWidth || window.innerWidth);

      const instance = new maplibre.Map({
        container: mapElRef.current,
        style,
        center: startView.center,
        zoom: startView.zoom,
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

      // Wheel gestures belong to the page, so the map must never react to
      // them; scrolling over the map still moves the document.
      instance.scrollZoom.disable();
      instance.boxZoom.disable();
      instance.keyboard.enable();
      instance.touchZoomRotate.disable();

      // Unified Page-Wide Map Drag & Zoom Gestures
      // Works across the overall page, but ignores interactive buttons, cards with hover animations, and text fields
      if (finePointer) {
        instance.dragPan.disable();
        instance.doubleClickZoom.disable();

        const zoomBy = (delta: number) => {
          const targetZoom = Math.min(
            instance.getMaxZoom(),
            Math.max(instance.getMinZoom(), instance.getZoom() + delta),
          );
          instance.easeTo({
            zoom: targetZoom,
            duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? 0
              : 220,
          });
        };

        const isInteractive = (target: EventTarget | null): boolean => {
          if (!target || !(target instanceof Element)) return false;

          // 1. Explicit interactive elements, buttons, links, inputs, cards
          const el = target.closest(
            'button, a, input, textarea, select, label, option, form, ' +
            '[role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="dialog"], [role="combobox"], ' +
            'article, aside, nav, header, footer, ' +
            '.page-breeze-wrap, .tape, [data-interactive]',
          );
          if (el) return true;

          // 2. Computed cursor: pointer (interactive/clickable) or text (inputs)
          try {
            let curr: Element | null = target;
            let depth = 0;
            while (curr && depth < 4) {
              const cursor = window.getComputedStyle(curr).cursor;
              if (cursor === "pointer" || cursor === "text") {
                return true;
              }
              curr = curr.parentElement;
              depth++;
            }
          } catch {}

          return false;
        };

        let isDown = false;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let lastX = 0;
        let lastY = 0;
        let startTime = 0;

        const onMouseDown = (e: MouseEvent) => {
          if (e.button !== 0) return; // Only primary (left) button
          if (isInteractive(e.target)) return;

          isDown = true;
          isDragging = false;
          startX = e.clientX;
          startY = e.clientY;
          lastX = e.clientX;
          lastY = e.clientY;
          startTime = Date.now();
        };

        const onMouseMove = (e: MouseEvent) => {
          if (!isDragging) {
            if (!isInteractive(e.target)) {
              document.body.style.cursor = isDown ? "grabbing" : "grab";
            } else {
              document.body.style.cursor = "";
            }
          }

          if (!isDown) return;

          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

          if (!isDragging && dist > 4) {
            isDragging = true;
            draggingRef.current = true;
            document.body.style.cursor = "grabbing";
          }

          if (isDragging) {
            e.preventDefault();
            lastX = e.clientX;
            lastY = e.clientY;
            instance.panBy([-dx, -dy], { animate: false });
          }
        };

        const onMouseUp = (e: MouseEvent) => {
          if (!isDown || e.button !== 0) return;
          isDown = false;
          document.body.style.cursor = "";

          if (isDragging) {
            isDragging = false;
            setTimeout(() => {
              draggingRef.current = false;
            }, 50);
          } else {
            // Clean left click without dragging: zoom in!
            const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
            const duration = Date.now() - startTime;
            if (dist <= 4 && duration < 350) {
              zoomBy(0.85);
            }
          }
        };

        const onContextMenu = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          e.preventDefault();
          zoomBy(-0.85);
        };

        const onDblClick = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          e.preventDefault();
          zoomBy(1.2);
        };

        const onBlur = () => {
          isDown = false;
          isDragging = false;
          draggingRef.current = false;
          document.body.style.cursor = "";
        };

        window.addEventListener("mousedown", onMouseDown, { passive: false });
        window.addEventListener("mousemove", onMouseMove, { passive: false });
        window.addEventListener("mouseup", onMouseUp, { passive: false });
        window.addEventListener("contextmenu", onContextMenu, { passive: false });
        window.addEventListener("dblclick", onDblClick, { passive: false });
        window.addEventListener("blur", onBlur);

        cleanupGlobalGestures = () => {
          window.removeEventListener("mousedown", onMouseDown);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          window.removeEventListener("contextmenu", onContextMenu);
          window.removeEventListener("dblclick", onDblClick);
          window.removeEventListener("blur", onBlur);
          document.body.style.cursor = "";
        };
      } else {
        instance.dragPan.disable();
        instance.touchZoomRotate.disable();
      }

      const fit = () => {
        const root = rootRef.current;
        if (!root) return;
        instance.jumpTo(viewFor(root.clientWidth || 1));
      };
      fit();

      setMapController(instance, fit);

      instance.once("load", () => {
        const root = rootRef.current;
        if (root) root.dataset.mapReady = "true";
        // Re-frame once the style and the final layout are in place.
        fit();
      });

      instance
        .getContainer()
        .setAttribute(
          "aria-label",
          "Map of Asia. Drag to pan, double-click to zoom, right-click to zoom out.",
        );

      observer = new ResizeObserver(() => {
        instance.resize();
        fit();
      });
      if (rootRef.current) observer.observe(rootRef.current);
    })();

    return () => {
      disposed = true;
      observer?.disconnect();
      cleanupGlobalGestures();
      if (map) clearMapController(map);
      map?.remove();
    };
  }, [provider]);

  /**
   * A soft cream depth wash settles in as the page scrolls so the copy
   * stays readable while the map remains in view. At the top there is no
   * wash — the map shows straight through behind the hero and navbar.
   */
  useEffect(() => {
    const depthVeil = depthVeilRef.current;
    if (!depthVeil) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      const viewport = Math.max(1, window.innerHeight);

      const depth = Math.min(1, Math.max(0, y / (viewport * 2.2)));
      // Narrow screens have full-width copy, so they need a heavier wash.
      const maxWash = window.innerWidth < 640 ? 0.6 : 0.42;
      depthVeil.style.opacity = (depth * maxWash).toFixed(3);
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
      depthVeil.style.opacity = "";
    };
  }, []);

  /**
   * Scroll parallax: the map rides up a little slower than the page, so it
   * feels deeper than the content instead of a flat picture behind it.
   */
  useEffect(() => {
    const wrap = scrollWrapRef.current;
    if (!wrap) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const MAX_SHIFT = 120;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      wrap.style.transform = `translate3d(0, ${(-p * MAX_SHIFT).toFixed(2)}px, 0)`;
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
      wrap.style.transform = "";
    };
  }, []);

  /**
   * Cursor drift: the map leans a few pixels toward the cursor so visitors
   * can tell it's draggable without any hint. Eases back to rest when the
   * cursor leaves, and stays still while the user drags. Touch and
   * reduced-motion users get a static map.
   */
  useEffect(() => {
    const wrap = driftWrapRef.current;
    if (!wrap) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const MAX = 18;
    const current = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      frame = 0;
      const target = driftTarget.current;
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      wrap.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (
        dx > 0.05 ||
        dy > 0.05 ||
        Math.abs(current.x) > 0.05 ||
        Math.abs(current.y) > 0.05
      ) {
        frame = window.requestAnimationFrame(step);
      }
    };
    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(step);
    };

    const onMove = (event: MouseEvent) => {
      if (draggingRef.current) {
        driftTarget.current = { x: 0, y: 0 };
        kick();
        return;
      }
      driftTarget.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2 * MAX,
        y: (event.clientY / window.innerHeight - 0.5) * 2 * MAX,
      };
      kick();
    };
    const reset = () => {
      driftTarget.current = { x: 0, y: 0 };
      kick();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
      wrap.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-map-provider={provider ?? DEFAULT_MAP_PROVIDER}
      className="site-map fixed inset-0 z-0 overflow-hidden bg-[#dbe7e0]"
    >
      <div
        ref={scrollWrapRef}
        className="absolute -inset-32 will-change-transform"
      >
        <div
          ref={driftWrapRef}
          className="absolute -inset-6 will-change-transform"
        >
          <div
            ref={mapElRef}
            className="h-full w-full"
            role="region"
            aria-label="Map of Asia"
            tabIndex={0}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="map-light pointer-events-none absolute inset-0"
      />

      {/* depth wash: keeps the copy readable while the map stays in view */}
      <div
        ref={depthVeilRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cream opacity-0"
      />
    </div>
  );
}
