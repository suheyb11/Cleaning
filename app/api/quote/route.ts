import { NextResponse } from "next/server";
import { Resend } from "resend";

import { brandedEmailHtml, escapeHtml } from "@/lib/email";
import { supabase } from "@/lib/supabase";

/**
 * Handles the "Request a Free Quote" form. On a valid submission, in order:
 *   1. Saves it to the `quote_requests` table (so it shows up in /admin).
 *   2. Emails the owner (QUOTE_TO_EMAIL) with the details.
 *   3. If the customer gave an email, sends them an auto thank-you.
 *
 * Steps 1 and 3 are best-effort: if the database or the thank-you email
 * fails, we still notify the owner and report success — the whole point of
 * this form is that a lead never gets lost. Failures are only logged.
 *
 * Required env vars (see `.env.local` and the README for how to get them):
 *   RESEND_API_KEY   — from resend.com
 *   QUOTE_TO_EMAIL   — the business inbox that should receive quote requests
 *   QUOTE_FROM_EMAIL — a sender address verified in Resend
 *                      (onboarding@resend.dev works for testing only — see
 *                      the README for why the customer thank-you needs a
 *                      verified domain to reach real customers)
 *   NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY — from Supabase
 *
 * If Resend doesn't work for you, a simpler no-backend alternative is
 * Web3Forms (https://web3forms.com): point a plain <form> at their endpoint
 * with an access key — you'd then handle saving to Supabase separately.
 */

type QuoteRequestBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  /** Honeypot — invisible to real visitors, bots often fill every field. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: QuoteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const { name, phone, email, service, message, company } = body;

  // Honeypot: real visitors never see or fill this field. If it's filled,
  // quietly report success without actually sending anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (
    !name?.trim() ||
    !phone?.trim() ||
    !service?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fill in your name, phone, service and message.",
      },
      { status: 400 },
    );
  }

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Quote form: missing RESEND_API_KEY / QUOTE_TO_EMAIL / QUOTE_FROM_EMAIL env var(s).",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Sorry, the quote form isn't set up yet — please reach us on WhatsApp instead.",
      },
      { status: 500 },
    );
  }

  // ---------- 1. Save to the database (best-effort — see file header) ----------
  try {
    const { error } = await supabase.from("quote_requests").insert({
      name,
      phone,
      email: email || null,
      service,
      message,
      status: "new",
    });
    if (error) console.error("Supabase insert error:", error);
  } catch (err) {
    console.error("Supabase insert failed:", err);
  }

  // ---------- 2. Notify the owner ----------
  const ownerHtml = `
    <div style="font-family: sans-serif; color: #0B2545; line-height: 1.6;">
      <h2 style="color: #0B2545; margin-bottom: 16px;">New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${email ? escapeHtml(email) : "Not provided"}</p>
      <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email || undefined,
      subject: `New Quote Request — ${service} — ${name}`,
      html: ownerHtml,
    });

    if (error) {
      console.error("Resend error (owner notification):", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your request. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Quote form send failed (owner notification):", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your request. Please try again." },
      { status: 500 },
    );
  }

  // ---------- 3. Auto thank-you to the customer (best-effort) ----------
  // Requires a Resend domain verified for QUOTE_FROM_EMAIL to reach real
  // customer inboxes — see the README. Never let this fail the request:
  // the owner has already been notified, which is what actually matters.
  if (email) {
    try {
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Thank you for contacting Bilic Cleaning Company",
        html: customerThankYouHtml({ name, service }),
      });
      if (error) console.error("Resend error (customer thank-you):", error);
    } catch (err) {
      console.error("Customer thank-you email failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function customerThankYouHtml({ name, service }: { name: string; service: string }) {
  return brandedEmailHtml(`
    <p>Hi ${escapeHtml(name)},</p>
    <p>
      Thank you for contacting <strong>Bilic Cleaning Company</strong>. We've
      received your request for <strong>${escapeHtml(service)}</strong> and
      our team will get back to you shortly with a quotation.
    </p>
    <p>
      If it's urgent, you're welcome to message us on WhatsApp in the
      meantime — just reply to this email or reach out directly and
      we'll pick it up right away.
    </p>
    <p style="margin-top: 24px;">
      Best regards,<br />
      <strong>Bilic Cleaning Company</strong>
    </p>
  `);
}
