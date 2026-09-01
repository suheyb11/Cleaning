import type { Metadata } from "next";
import type { ReactNode } from "react";

import AdminShell from "@/components/admin/AdminShell";
import { getSupabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function getNewRequestCount() {
  const { count, error } = await getSupabase()
    .from("quote_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  if (error) {
    console.error("Failed to load new-request count:", error);
    return 0;
  }
  return count ?? 0;
}

/**
 * Shared chrome for the whole /admin portal — a slim email-client shell
 * (sidebar with Inbox/Sent/Blog/Compose). The login page also lives under
 * /admin but is excluded in middleware.ts, not here — AdminShell itself
 * renders it with no chrome, since there's no session to show nav for.
 */
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const newCount = await getNewRequestCount();

  return <AdminShell newCount={newCount}>{children}</AdminShell>;
}
