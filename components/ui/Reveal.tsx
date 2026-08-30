"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating — use for staggering grids. */
  delay?: number;
  /** How far the element travels, in pixels. */
  y?: number;
  className?: string;
};

/**
 * The standard scroll-reveal animation used across the whole site:
 * fade in + slide up once, the first time the element enters the viewport.
 * Users with "reduce motion" enabled simply see the content, no animation.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
