"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Plane } from "lucide-react";

/**
 * Thin reading-progress line under the nav with a plane riding the tip.
 * Hidden on small screens and for reduced-motion users.
 */
export function ScrollPlane() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const left = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-16 z-40 hidden h-px sm:top-18 lg:block"
    >
      <div className="relative mx-6">
        <motion.span
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand/35"
          style={{ scaleX: progress }}
        />
        <motion.span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left }}
        >
          <span className="scroll-plane grid size-6 place-items-center rounded-full border border-line bg-cream text-brand shadow-[0_2px_8px_rgba(20,32,27,0.12)]">
            <Plane className="size-3 -rotate-45" strokeWidth={2} />
          </span>
        </motion.span>
      </div>
    </div>
  );
}
