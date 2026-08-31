import { createClient } from "@supabase/supabase-js";

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
 */
const supabaseSecret =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseSecret!,
  { auth: { persistSession: false } },
);

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
