/**
 * Shared wave geometry for the header's scalloped bottom hem, used by both
 * header-hem.tsx (the clipped paint layer) and scroll-plane.tsx (the dashed
 * flight path + plane) so the two always match exactly.
 *
 * The line starts at the TOP-left corner of the header, sweeps down to the
 * bottom edge, hangs one scallop below the bar under each visible content
 * group — logo, nav links, currency + CTA — then rises back up to the
 * TOP-right corner. Between the scallops the hem sits flush with the bar's
 * bottom edge.
 */

export const DIP = 22;
const PAD = 10;

export type WaveSeg = { start: number; end: number };

const SHELL_SELECTOR = "header > div > .shell";

/** X-ranges of the visible groups in the header bar, padded a little. */
export function measureSegs(): WaveSeg[] {
  const shell = document.querySelector(SHELL_SELECTOR) as HTMLElement | null;
  if (!shell) return [];
  const segs: WaveSeg[] = [];
  for (const child of Array.from(shell.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.offsetWidth === 0) continue;
    // Hamburger (mobile-only) doesn't get a scallop.
    if (child.classList.contains("md:hidden")) continue;
    const rect = child.getBoundingClientRect();
    segs.push({
      start: Math.max(0, rect.left - PAD),
      end: Math.min(window.innerWidth, rect.right + PAD),
    });
  }
  return segs;
}

/** Height of the header bar (56 mobile / 64 sm+), needed to raise the tips to the top edge. */
export function measureBarH(): number {
  const shell = document.querySelector(SHELL_SELECTOR) as HTMLElement | null;
  return shell ? shell.offsetHeight : 0;
}

/**
 * y at x relative to the bar's bottom edge: positive hangs below (scallops
 * over the content groups), negative rises above. The left tip climbs all
 * the way to the header's top edge; the right tip does the same when a
 * right-side group exists (desktop) — on mobile the hem stays flush on the
 * right so the hamburger keeps its background.
 *
 * Every arch and ramp is a cosine ease with zero slope at both ends, so the
 * whole path (tip → scallop → flat → scallop → tip) is one smooth C1 curve
 * with no kinks.
 */
export function waveY(x: number, segs: WaveSeg[], width: number, barH: number): number {
  let y = 0;
  for (const seg of segs) {
    const w = seg.end - seg.start;
    if (w <= 0) continue;
    const t = (x - seg.start) / w;
    if (t >= 0 && t <= 1) {
      y = Math.max(y, (DIP / 2) * (1 - Math.cos(2 * Math.PI * t)));
    }
  }
  if (segs.length > 0) {
    const first = segs[0].start;
    const last = segs[segs.length - 1].end;
    if (first > 0 && x < first) {
      y = Math.min(y, -(barH / 2) * (1 + Math.cos((Math.PI * x) / first)));
    } else if (segs.length > 1 && last < width && x > last) {
      y = Math.min(y, -(barH / 2) * (1 + Math.cos((Math.PI * (width - x)) / (width - last))));
    }
  }
  return y;
}
