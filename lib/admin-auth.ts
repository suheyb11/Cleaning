/**
 * A deliberately simple single-password gate for the one-owner admin portal
 * (see README → "Admin portal" for why this is enough and how to upgrade to
 * Supabase Auth later if more than one person ever needs a login).
 *
 * The cookie never stores the password itself — it stores a SHA-256 hash of
 * it, computed with the Web Crypto API so the exact same code runs in both
 * the Edge middleware and ordinary Node route handlers.
 */

export const ADMIN_COOKIE_NAME = "bilic_admin";

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** The cookie value a correctly-logged-in admin should have. */
export async function expectedAdminCookieValue() {
  return sha256Hex(`bilic-admin:${process.env.ADMIN_PASSWORD}`);
}

/** Checks a submitted login password against ADMIN_PASSWORD. */
export function isCorrectAdminPassword(password: string) {
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
}

/** For route handlers / server actions that must re-check the cookie themselves. */
export async function isValidAdminCookie(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  return cookieValue === (await expectedAdminCookieValue());
}
