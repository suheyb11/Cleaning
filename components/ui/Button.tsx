import Link from "next/link";
import type { ReactNode } from "react";

import Icon from "./Icon";

type Variant = "primary" | "outline" | "white" | "navy" | "danger";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-heading font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  // Light-blue accent button — the main call to action.
  primary: "bg-sky text-white shadow-soft hover:bg-skyDark hover:shadow-lift",
  // Outlined button for secondary actions on light backgrounds.
  outline:
    "border-2 border-navy/20 bg-white text-navy hover:border-sky hover:text-sky hover:shadow-soft",
  // For use on dark navy backgrounds.
  white: "bg-white text-navy shadow-soft hover:bg-offwhite hover:shadow-lift",
  navy: "bg-navy text-white shadow-soft hover:bg-[#123A63] hover:shadow-lift",
  // Destructive actions — delete, remove.
  danger: "bg-red-600 text-white shadow-soft hover:bg-red-700 hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  children: ReactNode;
  /** If given, renders a link. Otherwise renders a <button>. */
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** Disables the button and swaps in a spinner ahead of `children`. */
  loading?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {loading && <Icon name="Loader2" className="h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
