"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { stats } from "@/data/content";

/** Shared entrance for both counted and static stats. */
const enter = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 } as const,
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/**
 * A single number that counts up to `value` the first time it scrolls into
 * view, then stays there.
 *
 * The count is driven by framer-motion's `animate()` rather than a hand-rolled
 * requestAnimationFrame loop, because that loop could be cancelled mid-flight
 * (an effect re-run, a Fast Refresh, a resize) and leave the number frozen on
 * whatever it had reached — 98 instead of 100. `onComplete` writes the exact
 * target as the last thing that happens, and `hasRun` makes sure a re-render
 * can never restart it from zero.
 */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);
  const stop = useRef<(() => void) | null>(null);

  // If the component goes away mid-count, stop the animation but leave the
  // final value behind rather than whatever frame it happened to be on.
  useEffect(() => () => stop.current?.(), []);

  function start() {
    if (hasRun.current) return;
    hasRun.current = true;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      // The animation is the decoration; this line is the guarantee.
      onComplete: () => setDisplay(value),
    });

    stop.current = () => {
      controls.stop();
      setDisplay(value);
    };
  }

  return (
    <motion.span
      className="inline-block tabular-nums"
      {...enter}
      onViewportEnter={start}
    >
      {display}
      {suffix}
    </motion.span>
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
              {stat.display !== undefined ? (
                <motion.span className="inline-block" {...enter}>
                  {stat.display}
                </motion.span>
              ) : (
                <Counter value={stat.value ?? 0} suffix={stat.suffix} />
              )}
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
