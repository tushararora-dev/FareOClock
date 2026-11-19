"use client";

import { useEffect, useRef } from "react";
import { DIP, measureSegs, waveY } from "@/components/site/header-wave";

type Shape = "bar" | "wave";

/**
 * The single paint layer behind the header bar (bg + blur), JS-clipped to
 * the bar or to the bar + scalloped bottom hem. Three scallops hang below
 * the bar under the content groups (logo, nav links, currency + CTA) and the
 * hem's tips sweep up to the header's top corners. Visibility is opacity-only
 * — the bg, blur, height and clip never change with visibility or the fade
 * flashes.
 */
export function HeaderHem({ opaque, shape }: { opaque: boolean; shape: Shape }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const bar = layer?.nextElementSibling as HTMLElement | null;
    if (!layer || !bar) return;

    const apply = () => {
      const w = layer.clientWidth;
      const barH = bar.offsetHeight;
      if (!w || !barH) return;
      layer.style.height = `${barH + DIP}px`;
      let points = `0 0, ${w}px 0, ${w}px ${barH}px, 0 ${barH}px`;
      if (shape === "wave") {
        const segs = measureSegs();
        points = `0 0, ${w}px 0, ${w}px ${(barH + waveY(w, segs, w, barH)).toFixed(1)}px`;
        const steps = Math.max(48, Math.round(w / 6));
        for (let i = steps; i >= 0; i--) {
          const x = (i / steps) * w;
          points += `, ${x.toFixed(1)}px ${(barH + waveY(x, segs, w, barH)).toFixed(1)}px`;
        }
      }
      layer.style.clipPath = `polygon(${points})`;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(layer);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
      layer.style.clipPath = "";
      layer.style.height = "";
    };
  }, [shape]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 bg-cream/85 backdrop-blur-xl transition-opacity duration-300 ${
        opaque ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
