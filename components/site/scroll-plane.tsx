"use client";

import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import { DIP, measureBarH, measureSegs, waveY, type WaveSeg } from "@/components/site/header-wave";

/**
 * Dashed flight path tracing the header's scalloped bottom hem, with a plane
 * riding it as the page scrolls. The path starts at the header's TOP-left
 * corner, sweeps down to the bottom edge, hangs three scallops under the
 * content groups (logo, nav links, currency + CTA) and rises back to the
 * TOP-right corner. The plane starts at the center of the first scallop
 * (under the logo) and flies right. It stays exactly on the dashed path.
 */
export function ScrollPlane() {
  const svgRef = useRef<SVGSVGElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [barH, setBarH] = useState(0);
  const [segs, setSegs] = useState<WaveSeg[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const measure = () => {
      setWidth(svg.clientWidth || 0);
      setBarH(measureBarH());
      setSegs(measureSegs());
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width || !barH) return;
    const plane = planeRef.current;
    if (!plane) return;

    const startX = segs.length > 0 ? (segs[0].start + segs[0].end) / 2 : 16;
    const yAt = (x: number) => barH + waveY(x, segs, width, barH);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      plane.style.transform = `translate3d(${startX}px, ${yAt(startX).toFixed(2)}px, 0) translate(-50%, -50%)`;
      return;
    }

    let frame = 0;
    const current = { x: startX, y: yAt(startX) };
    const place = () => {
      plane.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
    };
    const step = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const x = startX + p * Math.max(0, width - startX - 16);
      const target = { x, y: yAt(x) };

      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      place();

      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx > 0.05 || dy > 0.05) {
        frame = window.requestAnimationFrame(step);
      }
    };
    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(step);
    };

    place();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      plane.style.transform = "";
    };
  }, [width, barH, segs]);

  let d = "";
  if (width > 0 && barH > 0) {
    const steps = Math.max(24, Math.round(width / 5));
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const y = barH + waveY(x, segs, width, barH);
      d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)} `;
    }
  }

  return (
    <div
      aria-hidden
      style={{ height: barH + DIP }}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] transition-opacity duration-300 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${barH + DIP}`}
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        {d ? (
          <path
            d={d}
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity={0.45}
            strokeWidth={1.5}
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        ) : null}
      </svg>

      {width > 0 ? (
        <div
          ref={planeRef}
          className="absolute left-0 top-0 will-change-transform"
        >
          <span className="grid size-7 place-items-center rounded-full bg-brand text-cream">
            <Plane className="size-3.5 rotate-45" strokeWidth={2.25} />
          </span>
        </div>
      ) : null}
    </div>
  );
}
