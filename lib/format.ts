/** Shared date formatting for blog posts and the admin dashboard. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Turns a post title into a URL-safe slug, e.g. "5 Tips!" → "5-tips". */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A wa.me link to a *customer's* phone number (unlike `whatsappLink` in
 * data/content.ts, which always messages the business number). wa.me needs
 * digits only, so any `+`, spaces or dashes in the stored phone are stripped.
 */
export function customerWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
