"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The real number is what renders on the server and before the animation
 * starts — counting up from a hardcoded 0 would mean anyone without JS (and
 * any crawler that doesn't run it) reads "0 Members", which is just wrong.
 * The animation is a progressive enhancement layered on top.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  // null means "not animating" — render the real value instead.
  const [animated, setAnimated] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic, so it decelerates into the final number.
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {animated ?? value}
      {suffix}
    </span>
  );
}
