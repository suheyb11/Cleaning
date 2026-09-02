import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, authenticated with the secret key.
 *
 * This key bypasses Row Level Security, so this file must never be imported
 * from a "use client" component or otherwise reach the browser — only server
 * components, route handlers, middleware and server actions.
 *
 * SUPABASE_SECRET_KEY is the current name (Supabase's new `sb_secret_...`
 * key). SUPABASE_SERVICE_ROLE_KEY is the old name it replaces — still
 * supported here as a fallback so nothing breaks mid-migration, but new
 * setups should use SUPABASE_SECRET_KEY (see README).
 *
 * The client is created lazily on first use rather than at import time, so
 * simply importing this module during the build (when env vars aren't
 * available) never throws.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY).",
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export type QuoteRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  message: string;
  status: "new" | "replied";
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  body_markdown: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type SentEmail = {
  id: string;
  to_email: string;
  to_name: string | null;
  subject: string;
  body: string;
  request_id: string | null;
  created_at: string;
};

export type SentEmailAttachment = {
  id: string;
  sent_email_id: string;
  filename: string;
  storage_path: string;
  content_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

/** A sent email with its stored attachments embedded (see /admin/sent). */
export type SentEmailWithAttachments = SentEmail & {
  attachments: SentEmailAttachment[];
};
