import { NextResponse } from "next/server";
import { Resend } from "resend";

import { brandedEmailHtml, escapeHtml } from "@/lib/email";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Sends the owner's reply to a quote request by email and marks it
 * 'replied'. Protected by middleware.ts (all of /api/admin/* requires the
 * admin cookie), so this only ever runs for a logged-in admin.
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { message } = (await request.json().catch(() => ({}))) as {
    message?: string;
  };

  if (!message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Write a reply before sending." },
      { status: 400 },
    );
  }

  const supabase = getSupabase();

  const { data: quoteRequest, error: fetchError } = await supabase
    .from("quote_requests")
    .select("*")
    .eq("id", params.id)
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

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: "Email isn't configured (RESEND_API_KEY / QUOTE_FROM_EMAIL)." },
      { status: 500 },
    );
  }

  const html = brandedEmailHtml(`
    <p>Hi ${escapeHtml(quoteRequest.name)},</p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    <p style="margin-top: 24px;">
      Best regards,<br />
      <strong>Bilic Cleaning Company</strong>
    </p>
  `);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: quoteRequest.email,
      // Any reply the customer sends lands in the business inbox, not the
      // (often unmonitored) sending address.
      replyTo: process.env.QUOTE_TO_EMAIL || undefined,
      subject: "Re: your cleaning quote request — Bilic Cleaning Company",
      html,
    });

    if (error) {
      console.error("Resend error (admin reply):", error);
      return NextResponse.json(
        { ok: false, error: "Could not send the reply email." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Admin reply send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send the reply email." },
      { status: 500 },
    );
  }

  const { error: updateError } = await supabase
    .from("quote_requests")
    .update({ status: "replied" })
    .eq("id", params.id);

  if (updateError) {
    console.error("Failed to mark quote request as replied:", updateError);
    // The email already sent — don't report failure over a status label.
  }

  return NextResponse.json({ ok: true });
}
