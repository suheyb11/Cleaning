"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { stats } from "@/data/content";

/**
 * A single number that counts up from 0 to `value` the first time it
 * scrolls into view. Users with "reduce motion" see the final number at once.
 */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1400; // milliseconds
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the number slows down as it approaches the target.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 sm:py-16">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
      />

      <div className="container-x relative grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-4xl font-semibold !text-white sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-sky">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
