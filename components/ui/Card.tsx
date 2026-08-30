import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds the hover lift + shadow growth used on service / feature cards. */
  hover?: boolean;
};

/**
 * The standard white rounded card used across the site.
 * The `group` class lets child icons react to the card's hover state.
 */
export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  const hoverClasses = hover
    ? "transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift"
    : "";

  return (
    <div
      className={`group h-full rounded-2xl border border-navy/10 bg-white p-6 shadow-soft sm:p-7 ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
