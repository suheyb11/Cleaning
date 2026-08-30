"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks, site } from "@/data/content";
import Icon from "./ui/Icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Add a shadow + blur to the navbar once the user scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always close the mobile menu after navigating to a new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 shadow-lift backdrop-blur-md"
          : "bg-navy shadow-none"
      }`}
    >
      <nav
        className="container-x flex items-center justify-between gap-4 py-3.5"
        aria-label="Main navigation"
      >
        {/* ---------- Logo ---------- */}
        {/* TODO: replace this text mark with the real Bilic logo,
            e.g. <Image src="/logo.svg" alt="Bilic Cleaning Company" width={150} height={40} /> */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-white shadow-soft">
            <Icon name="Droplets" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-semibold tracking-tight text-white">
              BILIC
            </span>
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-sky">
              Cleaning Company
            </span>
          </span>
        </Link>

        {/* ---------- Desktop links ---------- */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------- Desktop CTA ---------- */}
        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-2xl bg-sky px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-skyDark hover:shadow-lift lg:inline-flex"
        >
          Get a Quote
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Link>

        {/* ---------- Mobile hamburger ---------- */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name={menuOpen ? "X" : "Menu"} className="h-6 w-6" />
        </button>
      </nav>

      {/* ---------- Mobile menu panel ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-sky px-5 py-3.5 font-heading font-semibold text-white shadow-soft transition-colors hover:bg-skyDark"
                >
                  Get a Quote
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
