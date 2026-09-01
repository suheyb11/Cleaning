"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import ComposeModal from "@/components/admin/ComposeModal";
import Toast from "@/components/admin/Toast";
import Icon, { type IconName } from "@/components/ui/Icon";
import { useToast } from "@/lib/useToast";

const NAV: { label: string; href: string; icon: IconName }[] = [
  { label: "Inbox", href: "/admin", icon: "Inbox" },
  { label: "Sent", href: "/admin/sent", icon: "Send" },
  { label: "Blog", href: "/admin/blog", icon: "FileText" },
];

/**
 * The email-client shell for the whole /admin portal: a navy sidebar (top
 * bar + hamburger on mobile) with folder nav, a Compose button and log out,
 * wrapping whichever page is active. The login page has no session, so it
 * renders on its own with no chrome — same as the old AdminHeader did.
 */
export default function AdminShell({
  children,
  newCount,
}: {
  children: ReactNode;
  newCount: number;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { toast, showToast } = useToast();

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  function openCompose() {
    setComposeOpen(true);
    setMobileNavOpen(false);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-offwhite lg:flex-row">
      {/* Mobile top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-navy/10 bg-navy px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-white/80 hover:bg-white/10"
        >
          <Icon name="Menu" className="h-5 w-5" />
        </button>
        <span className="font-heading text-sm font-semibold text-white">
          Bilic Admin
        </span>
        <button
          type="button"
          onClick={openCompose}
          aria-label="Compose"
          className="rounded-lg bg-sky p-2 text-white"
        >
          <Icon name="Pencil" className="h-4 w-4" />
        </button>
      </header>

      {mobileNavOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-navy/40 lg:hidden"
        />
      )}

      {/* Sidebar — always visible on desktop, a slide-in overlay on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col overflow-hidden bg-navy transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex shrink-0 items-center gap-2.5 px-5 py-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky text-white">
            <Icon name="ShieldCheck" className="h-5 w-5" />
          </span>
          <span className="font-heading text-base font-semibold text-white">
            Bilic Admin
          </span>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
            className="ml-auto rounded-lg p-1.5 text-white/70 hover:bg-white/10 lg:hidden"
          >
            <Icon name="X" className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={openCompose}
          className="mx-4 mb-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-skyDark"
        >
          <Icon name="Pencil" className="h-4 w-4" />
          Compose
        </button>

        <nav
          className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3"
          aria-label="Admin sections"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </span>
              {item.href === "/admin" && newCount > 0 && (
                <span className="rounded-full bg-sky px-2 py-0.5 text-xs font-semibold text-white">
                  {newCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Account footer — always its own row, never squeezed by the nav above. */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              A
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/90">
              Admin
            </span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Log out"
              title="Log out"
              className="shrink-0 rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
            >
              <Icon name="LogOut" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <main className="min-h-0 min-w-0 flex-1">{children}</main>

      {composeOpen && (
        <ComposeModal
          onClose={() => setComposeOpen(false)}
          onToast={showToast}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
