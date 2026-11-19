"use client";

import { useSyncExternalStore } from "react";

export type MapProvider = "mapbox" | "maptiler" | "openfreemap";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim();
export const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY?.trim();

/**
 * MapTiler is the default because its quieter vector cartography lets the
 * cream palette lead. Mapbox is denser and punchier; OpenFreeMap keeps the
 * page working without any keys.
 */
/**
 * Mapbox is the default when its key is set, because the original design
 * asked for both providers to be comparible and the user requested
 * "dono dikho" (show both). Mapbox streets-v12 renders as raster tiles
 * because MapLibre v6 cannot read mapbox:// style URLs.
 *
 * MapTiler remains the calmer, vector-crisp fallback when Mapbox is not
 * configured, because its quieter label density suits the cream palette.
 */
export const DEFAULT_MAP_PROVIDER: MapProvider = MAPBOX_TOKEN
  ? "mapbox"
  : MAPTILER_KEY
    ? "maptiler"
    : "openfreemap";

const AVAILABLE: Record<MapProvider, boolean> = {
  mapbox: Boolean(MAPBOX_TOKEN),
  maptiler: Boolean(MAPTILER_KEY),
  openfreemap: true,
};

export const MAP_CREDITS: Record<
  MapProvider,
  { label: string; href: string }[]
> = {
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

let requestedProvider: MapProvider | null = null;
let requestedResolved = false;

const subscribe = () => () => {};
const getServerProvider = () => DEFAULT_MAP_PROVIDER;

const getClientProvider = () => {
  if (!requestedResolved) {
    requestedResolved = true;
    const picked = new URLSearchParams(window.location.search).get("map");
    if (picked && picked in AVAILABLE) {
      const provider = picked as MapProvider;
      if (AVAILABLE[provider]) requestedProvider = provider;
    }
  }
  return requestedProvider ?? DEFAULT_MAP_PROVIDER;
};

/** Resolve `?map=` once on the client, without hydration mismatches. */
export function useMapProvider() {
  return useSyncExternalStore(
    subscribe,
    getClientProvider,
    getServerProvider,
  );
}
