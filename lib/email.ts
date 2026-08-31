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
