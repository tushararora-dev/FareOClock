"use client";

import { useSyncExternalStore } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

export type MapController = {
  map: MapLibreMap | null;
  fit: () => void;
};

const EMPTY: MapController = { map: null, fit: () => {} };

let snapshot: MapController = EMPTY;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

export function setMapController(map: MapLibreMap, fit: () => void) {
  snapshot = { map, fit };
  emit();
}

export function clearMapController(map: MapLibreMap) {
  if (snapshot.map !== map) return;
  snapshot = EMPTY;
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

/**
 * The map canvas is page-level and fixed; the hero-only HUD lives inside the
 * hero. This tiny store is the bridge between the two.
 */
export function useMapController() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
