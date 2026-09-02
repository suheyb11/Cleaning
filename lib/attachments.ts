/**
 * Shared rules for email attachments — used by the admin reply box and the
 * Compose modal on the client, and by the reply / emails routes on the
 * server. Attachments are sent to Resend as `{ filename, content }` where
 * `content` is a base64 string (no `data:` prefix).
 */

/** Max size of a single attachment. */
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB
/** Max combined size of all attachments on one email. */
export const MAX_ATTACHMENTS_TOTAL_BYTES = 12 * 1024 * 1024; // 12 MB
/** Max number of attachments on one email. */
export const MAX_ATTACHMENTS = 5;

/** Private Supabase Storage bucket that holds files sent with admin emails. */
export const ATTACHMENTS_BUCKET = "email-attachments";

/** `accept` attribute for the file picker: PDF, images, Word and Excel. */
export const ATTACHMENT_ACCEPT =
  ".pdf,.png,.jpg,.jpeg,.webp,.gif,.doc,.docx,.xls,.xlsx";

export const ATTACHMENT_HINT = "PDF, images, Word or Excel — max 5 MB each";

export type OutgoingAttachment = {
  filename: string;
  /** base64, no `data:` prefix. */
  content: string;
  /** MIME type, when the browser reported one. */
  contentType?: string;
  /** Original file size in bytes. */
  size?: number;
};

/** Human-readable file size, e.g. "1.4 MB". */
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Approx. decoded byte size of a base64 string, without decoding it. */
function base64Bytes(content: string) {
  const padding = content.endsWith("==") ? 2 : content.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((content.length * 3) / 4) - padding);
}

/**
 * Server-side check on the attachments array received in a request body.
 * Mirrors the limits the client enforces, so an oversized or malformed
 * payload is rejected with a clear message rather than failing at Resend.
 */
export function validateAttachments(
  input: unknown,
):
  | { ok: true; attachments: OutgoingAttachment[] }
  | { ok: false; error: string } {
  if (input == null) return { ok: true, attachments: [] };
  if (!Array.isArray(input)) {
    return { ok: false, error: "Attachments are in an unexpected format." };
  }
  if (input.length > MAX_ATTACHMENTS) {
    return { ok: false, error: `Too many attachments (max ${MAX_ATTACHMENTS}).` };
  }

  const attachments: OutgoingAttachment[] = [];
  let total = 0;

  for (const item of input) {
    if (
      !item ||
      typeof item.filename !== "string" ||
      typeof item.content !== "string" ||
      !item.filename.trim() ||
      !item.content
    ) {
      return { ok: false, error: "An attachment could not be read." };
    }
    const bytes = base64Bytes(item.content);
    if (bytes > MAX_ATTACHMENT_BYTES) {
      return { ok: false, error: `"${item.filename}" is over the 5 MB limit.` };
    }
    total += bytes;
    attachments.push({
      filename: item.filename,
      content: item.content,
      contentType:
        typeof item.contentType === "string" && item.contentType
          ? item.contentType
          : undefined,
      size: typeof item.size === "number" ? item.size : bytes,
    });
  }

  if (total > MAX_ATTACHMENTS_TOTAL_BYTES) {
    return { ok: false, error: "Attachments are too large in total (max 12 MB)." };
  }

  return { ok: true, attachments };
}
