import { NextResponse } from "next/server";

import { sendAdminEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends a normal, composed email (not tied to a quote request) and records
 * it in sent_emails. Protected by middleware.ts (/api/admin/* requires the
 * admin cookie).
 */
export async function POST(request: Request) {
  const { toEmail, toName, subject, message } = (await request
    .json()
    .catch(() => ({}))) as {
    toEmail?: string;
    toName?: string;
    subject?: string;
    message?: string;
  };

  if (!toEmail?.trim() || !EMAIL_RE.test(toEmail.trim())) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (!subject?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Subject is required." },
      { status: 400 },
    );
  }
  if (!message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Write a message before sending." },
      { status: 400 },
    );
  }

  const trimmedToName = toName?.trim() || null;

  const result = await sendAdminEmail({
    toEmail: toEmail.trim(),
    toName: trimmedToName,
    subject: subject.trim(),
    message: message.trim(),
    greeting: trimmedToName ? `Hi ${trimmedToName},` : undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
