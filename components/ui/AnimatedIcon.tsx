"use client";

import { motion, useReducedMotion } from "framer-motion";

import Icon from "./Icon";

type AnimatedIconProps = {
  /** Icon name, e.g. "Sparkles". See components/ui/Icon.tsx for the full list. */
  name: string;
  /** Classes for the coloured badge around the icon (background, size, colour). */
  wrapperClassName?: string;
  /** Classes for the icon itself (usually just its size). */
  className?: string;
  /** Seconds to wait before the entrance animation — used to stagger grids. */
  delay?: number;
  /** Adds a slow, continuous up-and-down float (used for hero accents). */
  float?: boolean;
};

/**
 * The one place icon motion is defined, so every icon on the site behaves
 * the same way:
 *
 *  - Entrance: springs up from 0.6 → 1 scale the first time it scrolls into view.
 *  - Hover:    when the parent card (a `.group`) is hovered, the icon scales up
 *              and tilts slightly. This is done with CSS on an inner span so it
 *              never fights with the Framer Motion transform on the outer span.
 *  - Float:    optional slow looping drift for decorative hero icons.
 *
 * Users with "reduce motion" enabled get a completely still icon.
 */
export default function AnimatedIcon({
  name,
  wrapperClassName = "",
  className = "h-6 w-6",
  delay = 0,
  float = false,
}: AnimatedIconProps) {
  const reduceMotion = useReducedMotion();

  // Still, immediate icon for anyone who asked for reduced motion.
  if (reduceMotion) {
    return (
      <span className={wrapperClassName}>
        <Icon name={name} className={className} />
      </span>
    );
  }

  return (
    <motion.span
      className={wrapperClassName}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={
        float
          ? { opacity: 1, scale: 1, y: [0, -12, 0] }
          : { opacity: 1, scale: 1 }
      }
      viewport={{ once: true, amount: 0.4 }}
      transition={
        float
          ? {
              opacity: { duration: 0.4, delay },
              scale: { type: "spring", stiffness: 260, damping: 14, delay },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              },
            }
          : { type: "spring", stiffness: 260, damping: 14, delay }
      }
    >
      {/* Inner span handles hover motion via CSS so it can't clash with
          the Framer Motion transform applied to the parent. */}
      <span className="block transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
        <Icon name={name} className={className} />
      </span>
    </motion.span>
  );
}
