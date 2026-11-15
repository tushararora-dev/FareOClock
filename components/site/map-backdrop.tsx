"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import worldCountries from "@/lib/world-countries.json";
import { places } from "@/lib/site";
import { cn } from "@/lib/utils";

type Country = { n: string; l: [number, number]; r: [number, number][][] };

const COUNTRIES = worldCountries as Country[];

const MAP_W = 900;
const MAP_H = 360;
const TOP_LAT = 85;
const SPAN_LAT = 143; // 85°N → 58°S
const MAX_SCALE = 7;

const FOCUS = { lat: 22, lon: 88 };
const FOCUS_AT = { x: 0.7, y: 0.5 };

const ROUTE = ["india", "nepal", "thailand", "vietnam", "hongkong", "philippines"];
const bySlug = new Map(places.map((place) => [place.slug, place]));

/** Equirectangular, cropped to 85°N → 58°S. */
function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((TOP_LAT - lat) / SPAN_LAT) * MAP_H,
  };
}

/** One path per country: fill for land, stroke for borders and coast. */
const COUNTRY_SHAPES = COUNTRIES.map((country) => {
  const d = country.r
    .map(
      (ring) =>
        ring
          .map(([x, y], index) => {
            const px = (x * MAP_W).toFixed(1);
            const py = (y * MAP_H).toFixed(1);
            return `${index === 0 ? "M" : "L"}${px} ${py}`;
          })
          .join(" ") + "Z",
    )
    .join(" ");

  return {
    name: country.n,
    label: {
      x: (country.l[0] / MAP_W) * 100,
      y: (country.l[1] / MAP_H) * 100,
    },
    d,
  };
});

const shapeByName = new Map(COUNTRY_SHAPES.map((shape) => [shape.name, shape]));

/** Labels worth showing around the focus. Small countries appear later. */
const COUNTRY_LABELS: { name: string; size: "lg" | "sm" }[] = [
  { name: "India", size: "lg" },
  { name: "China", size: "lg" },
  { name: "Russia", size: "lg" },
  { name: "Australia", size: "lg" },
  { name: "Indonesia", size: "lg" },
  { name: "Saudi Arabia", size: "lg" },
  { name: "Pakistan", size: "sm" },
  { name: "Iran", size: "sm" },
  { name: "Afghanistan", size: "sm" },
  { name: "Kazakhstan", size: "sm" },
  { name: "Mongolia", size: "sm" },
  { name: "Japan", size: "sm" },
  { name: "Thailand", size: "sm" },
  { name: "Vietnam", size: "sm" },
  { name: "Myanmar", size: "sm" },
  { name: "Malaysia", size: "sm" },
  { name: "Philippines", size: "sm" },
  { name: "Nepal", size: "sm" },
  { name: "Bangladesh", size: "sm" },
  { name: "Sri Lanka", size: "sm" },
  { name: "United Arab Emirates", size: "sm" },
  { name: "Oman", size: "sm" },
];

const SEA_LABELS = [
  { name: "Arabian Sea", lat: 15, lon: 63 },
  { name: "Bay of Bengal", lat: 12, lon: 89 },
  { name: "Indian Ocean", lat: -12, lon: 78 },
  { name: "South China Sea", lat: 10, lon: 115 },
];

/** Spherical interpolation, so the flight route curves like a real one. */
function greatCircle(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
  steps = 28,
) {
  const rad = Math.PI / 180;
  const a = [
    Math.cos(from.lat * rad) * Math.cos(from.lon * rad),
    Math.cos(from.lat * rad) * Math.sin(from.lon * rad),
    Math.sin(from.lat * rad),
  ];
  const b = [
    Math.cos(to.lat * rad) * Math.cos(to.lon * rad),
    Math.cos(to.lat * rad) * Math.sin(to.lon * rad),
    Math.sin(to.lat * rad),
  ];
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let v: [number, number, number];
    if (omega < 1e-6) {
      v = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    } else {
      const sinOmega = Math.sin(omega);
      const ka = Math.sin((1 - t) * omega) / sinOmega;
      const kb = Math.sin(t * omega) / sinOmega;
      v = [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
    }
    const lat = Math.atan2(v[2], Math.hypot(v[0], v[1])) / rad;
    const lon = Math.atan2(v[1], v[0]) / rad;
    points.push(project(lat, lon));
  }
  return points;
}

const ROUTE_POINTS = ROUTE.map((slug) => bySlug.get(slug)).filter(
  (place): place is (typeof places)[number] => Boolean(place),
);

const ROUTE_PATH = ROUTE_POINTS.reduce((path, point, index) => {
  const previous = ROUTE_POINTS[index - 1];
  if (!previous) {
    const start = project(point.lat, point.lon);
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
  }
  return (
    path +
    greatCircle(previous, point)
      .slice(1)
      .map((p) => ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join("")
  );
}, "");

const formatLat = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "N" : "S"}`;
const formatLon = (value: number) =>
  `${Math.abs(value).toFixed(1)}°${value >= 0 ? "E" : "W"}`;

export function MapBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const view = useRef({ x: 0, y: 0, s: 1 });
  const box = useRef({ w: 0, h: 0 });
  const fitScale = useRef(1);
  const started = useRef(false);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    fromX: number;
    fromY: number;
    moved: number;
  } | null>(null);

  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [active, setActive] = useState("india");
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /** Centre of the hero as lat/lon + a live scale bar. Written to the DOM. */
  const readout = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const chip = root.querySelector<HTMLElement>("[data-readout]");
    const bar = root.querySelector<HTMLElement>("[data-scale-label]");
    const { x, y, s } = view.current;
    const { w } = box.current;
    if (!chip || !w) return;

    const mapX = MAP_W / 2 - x / s;
    const mapY = MAP_H / 2 - y / s;
    const lon = (mapX / MAP_W) * 360 - 180;
    const lat = TOP_LAT - (mapY / MAP_H) * SPAN_LAT;
    chip.textContent = `${formatLat(lat)} · ${formatLon(lon)}`;

    if (bar) {
      const km = (120 / s / MAP_W) * 360 * 111.32 * Math.cos((lat * Math.PI) / 180);
      bar.textContent = `${Math.max(1, Math.round(km / 10) * 10)} km`;
    }
  }, []);

  const apply = useCallback(
    (x: number, y: number, s: number) => {
      view.current = { x, y, s };
      const layer = layerRef.current;
      if (layer) {
        layer.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
      }
      readout();
    },
    [readout],
  );

  const clamp = useCallback((x: number, y: number, s: number) => {
    const maxX = Math.max(0, (MAP_W * s - box.current.w) / 2);
    const maxY = Math.max(0, (MAP_H * s - box.current.h) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
      s,
    };
  }, []);

  const layout = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (!w || !h) return;
    box.current = { w, h };

    // Over-fill the hero so the map never shows a seam.
    const s = Math.max(w / MAP_W, h / MAP_H) * 1.06;
    fitScale.current = s;
    const point = project(FOCUS.lat, FOCUS.lon);
    const x = w * FOCUS_AT.x - w / 2 - (point.x - MAP_W / 2) * s;
    const y = h * FOCUS_AT.y - h / 2 - (point.y - MAP_H / 2) * s;
    const next = clamp(x, y, s);
    apply(next.x, next.y, next.s);
    setScale(next.s);
    started.current = true;
  }, [apply, clamp]);

  useEffect(() => {
    layout();
    const observer = new ResizeObserver(() => {
      if (!started.current) return;
      const root = rootRef.current;
      if (!root) return;
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w || !h || (w === box.current.w && h === box.current.h)) return;
      box.current = { w, h };
      const fit = Math.max(w / MAP_W, h / MAP_H) * 1.06;
      fitScale.current = fit;
      if (view.current.s < fit) {
        layout();
      } else {
        const next = clamp(view.current.x, view.current.y, view.current.s);
        apply(next.x, next.y, next.s);
      }
    });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [apply, clamp, layout]);

  function zoom(factor: number) {
    const { x, y, s } = view.current;
    const nextS = Math.min(MAX_SCALE, Math.max(fitScale.current, s * factor));
    const next = clamp(x, y, nextS);
    apply(next.x, next.y, next.s);
    setScale(next.s);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      fromX: view.current.x,
      fromY: view.current.y,
      moved: 0,
    };
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const root = rootRef.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      root.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }

    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;

    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    state.moved = Math.max(state.moved, Math.hypot(dx, dy));
    if (state.moved > 8 && !hinted) setHinted(true);

    const next = clamp(state.fromX + dx, state.fromY + dy, view.current.s);
    apply(next.x, next.y, next.s);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = 70;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };

    if (event.key in moves) {
      event.preventDefault();
      const [dx, dy] = moves[event.key];
      const next = clamp(
        view.current.x + dx,
        view.current.y + dy,
        view.current.s,
      );
      apply(next.x, next.y, next.s);
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoom(1.2);
    }
    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      zoom(1 / 1.2);
    }
    if (event.key === "0") {
      event.preventDefault();
      layout();
    }
  }

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Map background. Drag to pan, arrow keys to move, plus and minus to zoom."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      onDoubleClick={() => zoom(1.3)}
      style={{ touchAction: "pan-y" }}
      className="absolute inset-0 z-0 cursor-grab touch-pan-y overflow-hidden bg-[#dbe7e0] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30 active:cursor-grabbing"
    >
      <div
        ref={layerRef}
        data-dragging={dragging ? "true" : "false"}
        className="map-layer absolute left-1/2 top-1/2"
        style={{ width: MAP_W, height: MAP_H }}
      >
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="h-full w-full"
          aria-hidden
        >
          {/* ocean depth, very subtle */}
          <defs>
            <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d6e4dc" />
              <stop offset="0.55" stopColor="#dde9e2" />
              <stop offset="1" stopColor="#d3e2da" />
            </linearGradient>
          </defs>
          <rect width={MAP_W} height={MAP_H} fill="url(#ocean)" />

          {/* graticule */}
          <g stroke="#1f5a45" strokeWidth="0.7" opacity="0.06">
            {Array.from({ length: 11 }, (_, i) => (i + 1) * 30 - 180).map((lon) => {
              const x = project(0, lon).x;
              return <line key={`m${lon}`} x1={x} x2={x} y1="0" y2={MAP_H} />;
            })}
            {Array.from({ length: 7 }, (_, i) => 60 - i * 20).map((lat) => {
              const y = project(lat, 0).y;
              return <line key={`p${lat}`} x1="0" x2={MAP_W} y1={y} y2={y} />;
            })}
          </g>

          {/* real countries: cream land, hairline borders */}
          <g strokeLinejoin="round">
            {COUNTRY_SHAPES.map((country) => (
              <path
                key={country.name}
                d={country.d}
                fill="#fbf8f1"
                fillRule="evenodd"
                stroke="#1f5a45"
                strokeOpacity="0.22"
                strokeWidth="0.9"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          {/* sea names, the way a chart sets them */}
          <g
            fill="#1f5a45"
            opacity="0.28"
            fontSize="5.6"
            letterSpacing="1.6"
            textAnchor="middle"
            style={{ fontStyle: "italic" }}
            className="uppercase"
          >
            {SEA_LABELS.map((sea) => {
              const point = project(sea.lat, sea.lon);
              return (
                <text key={sea.name} x={point.x} y={point.y}>
                  {sea.name}
                </text>
              );
            })}
          </g>

          {/* flight route */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#1f5a45"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="5 5"
            opacity="0.6"
            className="map-route"
            vectorEffect="non-scaling-stroke"
          />

          {!calm ? (
            <g>
              <path d="M0 0 L-8 3.4 L-3 0 L-8 -3.4 Z" fill="#1f5a45" opacity="0.8" />
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                rotate="auto"
                path={ROUTE_PATH}
              />
            </g>
          ) : null}
        </svg>

        {/* country labels, constant size at every zoom */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {COUNTRY_LABELS.map(({ name, size }) => {
            const shape = shapeByName.get(name);
            if (!shape) return null;
            return (
              <span
                key={name}
                className={cn(
                  "absolute whitespace-nowrap font-medium uppercase text-ink/35",
                  size === "lg"
                    ? "text-[9px] tracking-[0.22em] sm:text-[10px]"
                    : "hidden text-[8px] tracking-[0.16em] sm:block",
                )}
                style={{
                  left: `${shape.label.x}%`,
                  top: `${shape.label.y}%`,
                  transform: `translate(-50%, -50%) scale(${1 / scale})`,
                }}
              >
                {name}
              </span>
            );
          })}
        </div>

        {places.map((place) => {
          const point = project(place.lat, place.lon);
          const isActive = place.slug === active;

          return (
            <button
              key={place.slug}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if ((drag.current?.moved ?? 0) > 8) return;
                setActive(place.slug);
              }}
              onPointerDown={(event) => event.stopPropagation()}
              aria-pressed={isActive}
              aria-label={`${place.name}, ${place.country} — ${place.cost}`}
              className="group/pin absolute z-10 grid place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              style={{
                left: `${(point.x / MAP_W) * 100}%`,
                top: `${(point.y / MAP_H) * 100}%`,
                transform: `translate(-50%, -50%) scale(${1 / scale})`,
              }}
            >
              <span className="relative grid size-6 place-items-center">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-full",
                    isActive ? "map-ping bg-brand/25" : "bg-transparent",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute size-3.5 rounded-full shadow-[0_1px_4px_rgba(20,32,27,0.35)] ring-1 transition-colors",
                    isActive
                      ? "bg-brand ring-cream"
                      : "bg-surface ring-ink/25 group-hover/pin:bg-cream",
                  )}
                />
                {isActive ? null : (
                  <span className="relative size-1 rounded-full bg-brand" />
                )}
              </span>

              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface/95 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink shadow-[0_10px_24px_-16px_rgba(20,32,27,0.9)] backdrop-blur transition-opacity duration-200",
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover/pin:opacity-100 group-focus-visible/pin:opacity-100",
                )}
              >
                {place.name}
                <span className="num ml-1.5 text-brand">{place.cost}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div aria-hidden className="map-light pointer-events-none absolute inset-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--color-cream)_0%,rgba(250,246,238,0.97)_26%,rgba(250,246,238,0.84)_40%,rgba(250,246,238,0.42)_55%,rgba(250,246,238,0.05)_72%)]"
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
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/85 py-1 pl-1 pr-3 backdrop-blur">
          <span className="relative size-7 overflow-hidden rounded-full border border-cream bg-cream-2">
            <Image
              src={`/places/${active}.jpg`}
              alt=""
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
            {(bySlug.get(active) ?? places[0]).country}
          </span>
        </span>

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

      {/* controls */}
      <div className="absolute bottom-5 right-4 z-20 flex flex-col items-end gap-2 sm:right-8">
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted backdrop-blur transition-opacity duration-300",
            hinted ? "opacity-0" : "opacity-100",
          )}
        >
          <Move className="size-3" strokeWidth={2.2} />
          Drag the map
        </span>

        <div className="flex overflow-hidden rounded-full border border-line bg-cream/90 shadow-[0_10px_30px_-22px_rgba(20,32,27,0.8)] backdrop-blur">
          <MapButton label="Zoom in" onClick={() => zoom(1.25)}>
            <Plus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton label="Zoom out" onClick={() => zoom(1 / 1.25)}>
            <Minus className="size-3.5" strokeWidth={2.4} />
          </MapButton>
          <MapButton label="Reset the map" onClick={layout} last>
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
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      className={cn(
        "grid size-8 place-items-center text-ink transition-colors hover:bg-cream",
        !last && "border-r border-line",
      )}
    >
      {children}
    </button>
  );
}
