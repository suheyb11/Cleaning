import { NextResponse } from "next/server";

import { ATTACHMENTS_BUCKET } from "@/lib/attachments";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Redirects to a short-lived signed URL for one stored email attachment.
 * The bucket is private; this route is under /api/admin/* so middleware.ts
 * has already checked the admin cookie before we get here.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = getSupabase();

  const { data: attachment, error } = await supabase
    .from("sent_email_attachments")
    .select("filename, storage_path")
    .eq("id", id)
    .maybeSingle();

  if (error || !attachment) {
    return NextResponse.json(
      { ok: false, error: "Attachment not found." },
      { status: 404 },
    );
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(ATTACHMENTS_BUCKET)
    .createSignedUrl(attachment.storage_path, 60, {
      download: attachment.filename,
    });

  if (signError || !signed) {
    console.error("Failed to sign attachment URL:", signError);
    return NextResponse.json(
      { ok: false, error: "Could not create a download link." },
      { status: 502 },
    );
  }

  return NextResponse.redirect(signed.signedUrl);
}
