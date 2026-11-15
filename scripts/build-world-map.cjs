/**
 * Builds the real world map used behind the hero.
 *
 *   node scripts/build-world-map.cjs
 *
 * Output: lib/world-countries.json
 *
 * Each entry is one country:
 *   { n: "India", l: [x, y], r: [[[x, y], …], …] }
 *
 *   n  display name
 *   l  label anchor (Natural Earth LABEL_X / LABEL_Y, projected)
 *   r  rings: outer ring first, then holes (evenodd fill)
 *
 * Coordinates are normalised to 0–1 on the cropped equirectangular
 * projection the map component uses (85°N → 58°S), so x * 900 and y * 360
 * give the SVG viewBox position directly.
 *
 * Source: Natural Earth 1:50m Admin 0 – Countries (public domain).
 */
const fs = require("node:fs");
const path = require("node:path");

const SOURCE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";

const TOP_LAT = 85;
const BOTTOM_LAT = -58;
const SPAN_LAT = TOP_LAT - BOTTOM_LAT;

/** Simplification tolerance in normalised units (≈ 0.5 px at fit zoom). */
const EPSILON = 0.0006;
/** Skip rings smaller than this (normalised diagonal) — specks and atolls. */
const MIN_RING = 0.0022;
/** Drop everything this far south (Antarctica and its islands). */
const SOUTH_CUT = -56;

const OUT = path.join(__dirname, "..", "lib", "world-countries.json");

const project = (lon, lat) => [(lon + 180) / 360, (TOP_LAT - lat) / SPAN_LAT];

/** Douglas–Peucker, iterative. Closed rings are opened first. */
function simplify(points, epsilon) {
  if (points.length < 4) return points;

  const first = points[0];
  const last = points[points.length - 1];
  const closed =
    Math.abs(first[0] - last[0]) < 1e-9 && Math.abs(first[1] - last[1]) < 1e-9;
  const open = closed ? points.slice(0, -1) : points;
  if (open.length < 4) return points;

  const keep = new Uint8Array(open.length);
  keep[0] = 1;
  keep[open.length - 1] = 1;

  const stack = [[0, open.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    const [x1, y1] = open[start];
    const [x2, y2] = open[end];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    let farthest = -1;
    let distance = 0;

    for (let i = start + 1; i < end; i++) {
      const [px, py] = open[i];
      const d = Math.abs(dy * px - dx * py + x2 * y1 - y2 * x1) / length;
      if (d > distance) {
        distance = d;
        farthest = i;
      }
    }

    if (distance > epsilon && farthest !== -1) {
      keep[farthest] = 1;
      stack.push([start, farthest], [farthest, end]);
    }
  }

  return open.filter((_, index) => keep[index]);
}

const round = (value) => Math.round(value * 1e4) / 1e4;

function bbox(points) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

function ringArea(points) {
  let area = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    area += points[j][0] * points[i][1] - points[i][0] * points[j][1];
  }
  return Math.abs(area / 2);
}

function toRing(raw) {
  const clipped = [];
  for (const [lon, lat] of raw) {
    if (lat < SOUTH_CUT) continue;
    clipped.push(project(lon, Math.min(lat, TOP_LAT)));
  }
  if (clipped.length < 4) return null;

  const reduced = simplify(clipped, EPSILON);
  if (reduced.length < 4) return null;

  const box = bbox(reduced);
  if (Math.hypot(box.maxX - box.minX, box.maxY - box.minY) < MIN_RING) {
    return null;
  }
  if (ringArea(reduced) < MIN_RING * MIN_RING * 0.2) return null;

  return reduced.map(([x, y]) => [round(x), round(y)]);
}

async function main() {
  const res = await fetch(SOURCE);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const geo = await res.json();

  const countries = [];
  let points = 0;
  let rings = 0;

  for (const feature of geo.features) {
    const { properties: props, geometry } = feature;
    if (!geometry) continue;

    const name = props.NAME || props.NAME_EN;
    if (!name || name === "Antarctica") continue;

    const polygons =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.type === "MultiPolygon"
          ? geometry.coordinates
          : [];

    const kept = [];
    for (const polygon of polygons) {
      for (const raw of polygon) {
        const ring = toRing(raw);
        if (ring) kept.push(ring);
      }
    }
    if (!kept.length) continue;

    const [lx, ly] = project(props.LABEL_X, props.LABEL_Y);
    countries.push({
      n: name,
      l: [round(lx), round(ly)],
      r: kept,
    });

    rings += kept.length;
    points += kept.reduce((n, ring) => n + ring.length, 0);
  }

  countries.sort((a, b) => a.n.localeCompare(b.n));
  const json = JSON.stringify(countries);
  fs.writeFileSync(OUT, `${json}\n`);

  console.log(
    `countries ${countries.length}, rings ${rings}, points ${points}, ` +
      `${(json.length / 1024).toFixed(1)} KB → ${path.relative(process.cwd(), OUT)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
