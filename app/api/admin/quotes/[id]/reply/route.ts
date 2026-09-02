import { NextResponse } from "next/server";

import { validateAttachments } from "@/lib/attachments";
import { sendAdminEmail } from "@/lib/email";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Sends the owner's reply to a quote request by email, records it in
 * sent_emails and marks the request 'replied'. Protected by middleware.ts
 * (all of /api/admin/* requires the admin cookie), so this only ever runs
 * for a logged-in admin.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { message, attachments } = (await request.json().catch(() => ({}))) as {
    message?: string;
    attachments?: unknown;
  };

  if (!message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Write a reply before sending." },
      { status: 400 },
    );
  }

  const validatedAttachments = validateAttachments(attachments);
  if (!validatedAttachments.ok) {
    return NextResponse.json(
      { ok: false, error: validatedAttachments.error },
      { status: 400 },
    );
  }

  const supabase = getSupabase();

  const { data: quoteRequest, error: fetchError } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !quoteRequest) {
    return NextResponse.json(
      { ok: false, error: "Quote request not found." },
      { status: 404 },
    );
  }
  if (!quoteRequest.email) {
    return NextResponse.json(
      { ok: false, error: "This customer didn't leave an email address." },
      { status: 400 },
    );
  }

  const result = await sendAdminEmail({
    toEmail: quoteRequest.email,
    toName: quoteRequest.name,
    subject: "Re: your cleaning quote request — Bilic Cleaning Company",
    message,
    greeting: `Hi ${quoteRequest.name},`,
    requestId: id,
    attachments: validatedAttachments.attachments,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  const { error: updateError } = await supabase
    .from("quote_requests")
    .update({ status: "replied" })
    .eq("id", id);

  if (updateError) {
    console.error("Failed to mark quote request as replied:", updateError);
    // The email already sent — don't report failure over a status label.
  }

  return NextResponse.json({ ok: true });
}
