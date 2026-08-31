import { NextResponse } from "next/server";

import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Updates a quote request's status directly — used by "Mark as Replied" for
 * requests handled outside email (phone, WhatsApp). Protected by
 * middleware.ts (/api/admin/* requires the admin cookie).
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status } = (await request.json().catch(() => ({}))) as {
    status?: "new" | "replied";
  };

  if (status !== "new" && status !== "replied") {
    return NextResponse.json(
      { ok: false, error: "Invalid status." },
      { status: 400 },
    );
  }

  const { error } = await getSupabase()
    .from("quote_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update quote request status:", error);
    return NextResponse.json(
      { ok: false, error: "Could not update the status." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
