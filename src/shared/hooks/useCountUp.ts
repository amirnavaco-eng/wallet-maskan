"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a number from 0 up to `target` using an eased requestAnimationFrame loop. */
export function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const startTime = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setValue(Math.round(target * easeOutExpo(progress)));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs]);

  return value;
}
