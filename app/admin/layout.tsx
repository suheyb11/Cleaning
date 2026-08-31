import type { Metadata } from "next";
import type { ReactNode } from "react";

import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Shared chrome for the whole /admin portal. The login page also lives
 * under /admin but is excluded in middleware.ts, not here — this layout
 * still wraps it, so it deliberately keeps just the header, no extra
 * assumptions about being logged in.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-offwhite">
      <AdminHeader />
      <main className="container-x py-8 sm:py-10">{children}</main>
    </div>
  );
}
