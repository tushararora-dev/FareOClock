"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import worldDots from "@/lib/world-dots.json";
import worldOutline from "@/lib/world-outline.json";
import { places } from "@/lib/site";
import { cn } from "@/lib/utils";

const DOTS = worldDots as [number, number][];
const RINGS = worldOutline as [number, number][][];

const MAP_W = 900;
const MAP_H = 360;
const TOP_LAT = 85;
const SPAN_LAT = 143; // 85°N → 58°S
const MAX_SCALE = 7;

const FOCUS = { lat: 22, lon: 88 };
const FOCUS_AT = { x: 0.7, y: 0.5 };

const ROUTE = ["india", "nepal", "thailand", "vietnam", "hongkong", "philippines"];
const bySlug = new Map(places.map((place) => [place.slug, place]));

function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((TOP_LAT - lat) / SPAN_LAT) * MAP_H,
  };
}

/** One path for every coast, so fill and stroke stay in sync. */
const LAND_PATH = RINGS.map(
  (ring) =>
    ring
      .map(([x, y], index) => {
        const px = (x * MAP_W).toFixed(1);
        const py = (y * MAP_H).toFixed(1);
        return `${index === 0 ? "M" : "L"}${px} ${py}`;
      })
      .join(" ") + " Z",
).join(" ");

/** Dot radius shrinks towards the poles so the field reads evenly. */
const DOTS_WITH_RADIUS = DOTS.map(([x, y]) => {
  const lat = TOP_LAT - y * SPAN_LAT;
  return {
    x: x * MAP_W,
    y: y * MAP_H,
    r: 1.55 + 0.85 * Math.max(0, Math.cos((lat * Math.PI) / 180)) ** 2,
  };
});

const PARALLELS = [
  { lat: 23.4367, label: "Tropic of Cancer" },
  { lat: 0, label: "Equator" },
  { lat: -23.4367, label: "Tropic of Capricorn" },
];

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
      const km = ((120 / s / MAP_W) * 360 * 111.32 * Math.cos((lat * Math.PI) / 180));
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
    const x = (w * FOCUS_AT.x - w / 2) - (point.x - MAP_W / 2) * s;
    const y = (h * FOCUS_AT.y - h / 2) - (point.y - MAP_H / 2) * s;
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

  const route = ROUTE.map((slug) => bySlug.get(slug))
    .filter((place): place is (typeof places)[number] => Boolean(place))
    .map((place) => project(place.lat, place.lon));

  const routePath = route.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = route[index - 1];
    const midX = (previous.x + point.x) / 2;
    const midY = (previous.y + point.y) / 2 - 22;
    return `${path} Q ${midX} ${midY} ${point.x} ${point.y}`;
  }, "");

  const [planeStart] = route;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Interactive map background. Drag to pan, arrow keys to move, plus and minus to zoom."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      onDoubleClick={() => zoom(1.3)}
      style={{ touchAction: "pan-y" }}
      className="absolute inset-0 z-0 cursor-grab touch-pan-y overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30 active:cursor-grabbing"
    >
      <div
        ref={layerRef}
        data-dragging={dragging ? "true" : "false"}
        className="map-layer absolute left-1/2 top-1/2"
        style={{ width: MAP_W, height: MAP_H }}
      >
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-full w-full" aria-hidden>
          {/* graticule */}
          <g stroke="#1f5a45" opacity="0.055">
            {Array.from({ length: 13 }, (_, i) => i * 30 - 180)
              .filter((lon) => project(0, lon).x > 0 && project(0, lon).x < MAP_W)
              .map((lon) => {
                const x = project(0, lon).x;
                return <line key={`m${lon}`} x1={x} x2={x} y1="0" y2={MAP_H} />;
              })}
            {Array.from({ length: 7 }, (_, i) => 60 - i * 20).map((lat) => {
              const y = project(lat, 0).y;
              return <line key={`p${lat}`} x1="0" x2={MAP_W} y1={y} y2={y} />;
            })}
          </g>

          {/* land: soft wash, dashed coastline, dotted interior */}
          <path d={LAND_PATH} fill="#1f5a45" opacity="0.055" fillRule="evenodd" />
          <path
            d={LAND_PATH}
            fill="none"
            stroke="#1f5a45"
            strokeWidth="0.9"
            strokeDasharray="2.4 2.4"
            opacity="0.32"
            fillRule="evenodd"
          />
          <g fill="#1f5a45" opacity="0.16">
            {DOTS_WITH_RADIUS.map(({ x, y, r }, index) => (
              <circle key={index} cx={x} cy={y} r={r} />
            ))}
          </g>

          {/* map parallels, chart style */}
          <g>
            {PARALLELS.map((line) => {
              const y = ((TOP_LAT - line.lat) / SPAN_LAT) * MAP_H;
              return (
                <g key={line.label}>
                  <line
                    x1="0"
                    x2={MAP_W}
                    y1={y}
                    y2={y}
                    stroke="#f2a33c"
                    strokeWidth="0.8"
                    strokeDasharray="1 5"
                    opacity="0.55"
                  />
                  <text
                    x="6"
                    y={y - 3}
                    fill="#a98a53"
                    fontSize="6.5"
                    letterSpacing="0.6"
                    className="uppercase"
                  >
                    {line.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* route */}
          <path
            d={routePath}
            fill="none"
            stroke="#1f5a45"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="3 6"
            opacity="0.55"
            className="map-route"
          />

          {/* plane gliding the route */}
          {planeStart && !calm ? (
            <g>
              <path
                d="M0 0 L-7 3 L-2.6 0 L-7 -3 Z"
                fill="#1f5a45"
                opacity="0.75"
              />
              <animateMotion
                dur="16s"
                repeatCount="indefinite"
                rotate="auto"
                path={routePath}
              />
            </g>
          ) : null}

          {/* compass, tucked into the Atlantic */}
          <g
            transform={`translate(${project(44, -34).x} ${project(44, -34).y})`}
            opacity="0.42"
          >
            <circle r="20" fill="none" stroke="#1f5a45" strokeWidth="0.7" strokeDasharray="1.5 3.5" />
            <circle r="14" fill="none" stroke="#1f5a45" strokeWidth="0.5" opacity="0.6" />
            <path d="M0 -13 L3.6 3 L0 0.5 L-3.6 3 Z" fill="#1f5a45" />
            <path d="M0 13 L2.4 5 L0 6.4 L-2.4 5 Z" fill="#1f5a45" opacity="0.5" />
            <text
              y="-23"
              textAnchor="middle"
              fill="#1f5a45"
              fontSize="6"
              letterSpacing="1"
            >
              N
            </text>
            <text x="24" y="2.5" fill="#1f5a45" fontSize="5" letterSpacing="1">
              E
            </text>
            <text x="-29" y="2.5" fill="#1f5a45" fontSize="5" letterSpacing="1">
              W
            </text>
          </g>

          {/* water labels, the way an old chart sets them */}
          <g
            fill="#1f5a45"
            opacity="0.3"
            fontSize="5.4"
            letterSpacing="1.5"
            textAnchor="middle"
            className="uppercase"
          >
            {[
              { name: "Arabian Sea", lat: 14, lon: 64 },
              { name: "Bay of Bengal", lat: 12, lon: 89 },
              { name: "Indian Ocean", lat: -12, lon: 78 },
              { name: "South China Sea", lat: 10, lon: 114 },
            ].map((sea) => {
              const point = project(sea.lat, sea.lon);
              return (
                <text key={sea.name} x={point.x} y={point.y}>
                  {sea.name}
                </text>
              );
            })}
          </g>

          <text
            x={project(31, 84).x}
            y={project(31, 84).y}
            fill="#1f5a45"
            opacity="0.34"
            fontSize="5.4"
            letterSpacing="2.2"
            textAnchor="middle"
            className="uppercase"
          >
            Himalaya
          </text>
        </svg>

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
              {/* stamped ring around each stop */}
              <span className="relative grid size-7 place-items-center">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-full border border-dashed transition-colors",
                    isActive
                      ? "map-ping border-brand/70 bg-brand/10"
                      : "border-ink/25 bg-cream/40 group-hover/pin:border-brand/50",
                  )}
                />
                <span
                  className={cn(
                    "relative size-1.5 rounded-full",
                    isActive ? "bg-brand" : "bg-ink/45 group-hover/pin:bg-ink/70",
                  )}
                />
              </span>

              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-cream/95 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-ink shadow-[0_6px_16px_-12px_rgba(20,32,27,0.9)] backdrop-blur transition-opacity duration-200",
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
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--color-cream)_0%,rgba(250,246,238,0.97)_26%,rgba(250,246,238,0.82)_40%,rgba(250,246,238,0.38)_55%,rgba(250,246,238,0.04)_72%)]"
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

      {/* passport stamp */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[58%] top-[13%] hidden lg:block"
      >
        <div className="relative size-24 xl:size-28">
          <div className="stamp-ring absolute inset-0 rounded-full border-2 border-dashed border-brand/25" />
          <div className="absolute inset-1.5 grid place-items-center rounded-full border border-brand/15 bg-cream/70 text-center backdrop-blur">
            <span className="text-[9px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-brand/80">
              itinerary
              <br />
              1:1 calls
            </span>
          </div>
        </div>
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
