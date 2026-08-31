"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import WhatsAppButton from "./WhatsAppButton";

/**
 * The public marketing chrome (navbar, footer, WhatsApp button, scroll
 * progress bar) wraps every page — except the admin portal, which has its
 * own simple, utilitarian layout and should not show marketing nav/links
 * a staff member could accidentally wander off through.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip link so keyboard users can jump past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-sky focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
