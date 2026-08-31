"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Icon from "@/components/ui/Icon";

const TABS = [
  { label: "Quote Requests", href: "/admin", icon: "Inbox" as const },
  { label: "Blog Posts", href: "/admin/blog", icon: "FileText" as const },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  // The login page has no session to show a "Log out" button or tabs for.
  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <header className="bg-navy shadow-soft">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-white">
            <Icon name="ShieldCheck" className="h-5 w-5" />
          </span>
          <span className="font-heading text-base font-semibold text-white">
            Bilic Admin
          </span>
        </div>

        <nav
          className="flex items-center gap-1 rounded-2xl bg-white/5 p-1"
          aria-label="Admin sections"
        >
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive(tab.href) ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(tab.href)
                  ? "bg-sky text-white shadow-soft"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon name={tab.icon} className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
        >
          <Icon name="X" className="h-4 w-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}
