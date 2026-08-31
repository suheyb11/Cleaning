"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating — use for staggering grids. */
  delay?: number;
  /** How far the element travels vertically, in pixels. */
  y?: number;
  /** How far the element travels horizontally, in pixels — for elements
   *  that should slide in from a side (e.g. an alternating timeline). */
  x?: number;
  className?: string;
};

/**
 * The standard scroll-reveal animation used across the whole site:
 * fade in + slide once, the first time the element enters the viewport.
 * Users with "reduce motion" enabled simply see the content, no animation.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
