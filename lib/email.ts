import { Resend } from "resend";

import { getSupabase } from "@/lib/supabase";

/** Escapes user input so it can't break an HTML email's layout or inject markup. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Wraps an email body in the one shared Bilic-branded shell (navy header +
 * white card) used by every outgoing email — the customer thank-you and the
 * admin's reply. Pass already-escaped/trusted HTML for the body.
 */
export function brandedEmailHtml(bodyHtml: string) {
  return `
    <div style="font-family: sans-serif; color: #0B2545; line-height: 1.6; max-width: 480px;">
      <div style="background: #0B2545; padding: 24px; border-radius: 12px 12px 0 0;">
        <span style="color: #ffffff; font-size: 18px; font-weight: 600;">Bilic Cleaning Company</span>
      </div>
      <div style="border: 1px solid #e5eaf0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        ${bodyHtml}
      </div>
    </div>
  `;
}

/**
 * Sends a branded email via Resend and — on success — records it in
 * `sent_emails` so it shows up in the admin's Sent folder. Shared by the
 * quote-request reply route and the compose route, the two places the admin
 * sends a normal email from.
 *
 * `greeting` (e.g. "Hi Jane,") is only used in the email body itself; the
 * stored `body` is the admin's raw message, so the Sent reading pane shows
 * exactly what was typed.
 */
export async function sendAdminEmail({
  toEmail,
  toName = null,
  subject,
  message,
  greeting,
  requestId = null,
}: {
  toEmail: string;
  toName?: string | null;
  subject: string;
  message: string;
  greeting?: string;
  requestId?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    return {
      ok: false,
      error: "Email isn't configured (RESEND_API_KEY / QUOTE_FROM_EMAIL).",
    };
  }

  const html = brandedEmailHtml(`
    ${greeting ? `<p>${escapeHtml(greeting)}</p>` : ""}
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
      to: toEmail,
      // Any reply lands in the business inbox, not the (often unmonitored)
      // sending address.
      replyTo: process.env.QUOTE_TO_EMAIL || undefined,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: "Could not send the email." };
    }
  } catch (err) {
    console.error("Email send failed:", err);
    return { ok: false, error: "Could not send the email." };
  }

  const { error: insertError } = await getSupabase().from("sent_emails").insert({
    to_email: toEmail,
    to_name: toName,
    subject,
    body: message,
    request_id: requestId,
  });

  if (insertError) {
    console.error("Failed to store sent email:", insertError);
    // The email already sent — don't report failure over a storage hiccup.
  }

  return { ok: true };
}
