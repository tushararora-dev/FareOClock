/**
 * Generates the two data files behind the hero map:
 *
 *   lib/world-dots.json     dotted land mask (even texture)
 *   lib/world-outline.json  simplified coastlines (dashed chart lines)
 *
 *   node scripts/build-world-dots.cjs
 *
 * Source: Natural Earth 110m land (public domain) via natural-earth-vector.
 * Coordinates are normalised to 0–1 on the same cropped equirectangular
 * projection the map uses (85°N → 60°S), so the component can multiply by its
 * viewBox size.
 */
const fs = require("node:fs");
const path = require("node:path");

const SOURCE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson";

const STEP = 4; // degrees between sampled dots
const TOP_LAT = 85;
const BOTTOM_LAT = -58;
const SPAN = TOP_LAT - BOTTOM_LAT;
const EPSILON = 0.0016; // simplification tolerance, in map units (0–1)

const DOTS_OUT = path.join(__dirname, "..", "lib", "world-dots.json");
const OUTLINE_OUT = path.join(__dirname, "..", "lib", "world-outline.json");

const project = (lon, lat) => [
  Math.round(((lon + 180) / 360) * 1e4) / 1e4,
  Math.round(((TOP_LAT - lat) / SPAN) * 1e4) / 1e4,
];

function pointInRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function inPolygon(point, polygon) {
  if (!pointInRing(point, polygon[0])) return false;
  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) return false;
  }
  return true;
}

/** Douglas–Peucker, iterative. Closed rings are opened first. */
function simplify(points, epsilon) {
  if (points.length < 3) return points;

  const first = points[0];
  const last = points[points.length - 1];
  const closed =
    Math.abs(first[0] - last[0]) < 1e-6 && Math.abs(first[1] - last[1]) < 1e-6;
  const open = closed ? points.slice(0, -1) : points;
  if (open.length < 3) return points;

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

  const reduced = open.filter((_, index) => keep[index]);
  return closed ? [...reduced, first] : reduced;
}

async function main() {
  const res = await fetch(SOURCE);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const geo = await res.json();

  const polygons = [];
  for (const feature of geo.features) {
    const { type, coordinates } = feature.geometry;
    if (type === "Polygon") polygons.push(coordinates);
    else if (type === "MultiPolygon") polygons.push(...coordinates);
  }

  // --- dots ------------------------------------------------------------
  const dots = [];
  for (let lat = BOTTOM_LAT + STEP / 2; lat < 84; lat += STEP) {
    for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
      if (!polygons.some((poly) => inPolygon([lon, lat], poly))) continue;
      const [x, y] = project(lon, lat);
      dots.push([x, y, lat]);
    }
  }
  fs.writeFileSync(DOTS_OUT, `${JSON.stringify(dots.map(([x, y]) => [x, y]))}\n`);

  // --- coastlines ------------------------------------------------------
  const rings = [];
  for (const polygon of polygons) {
    for (const ring of polygon) {
      const points = ring.map(([lon, lat]) =>
        project(lon, Math.max(lat, BOTTOM_LAT)),
      );
      const reduced = simplify(points, EPSILON);
      if (reduced.length < 6) continue;
      rings.push(reduced.map(([x, y]) => [x, y]));
    }
  }
  fs.writeFileSync(OUTLINE_OUT, `${JSON.stringify(rings)}\n`);

  console.log(
    `dots ${dots.length} → ${path.relative(process.cwd(), DOTS_OUT)}`,
  );
  console.log(
    `rings ${rings.length} (${rings.reduce((n, r) => n + r.length, 0)} pts) → ${path.relative(process.cwd(), OUTLINE_OUT)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
