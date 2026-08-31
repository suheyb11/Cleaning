import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default OpenNext-on-Cloudflare config. No caching overrides — the app
// already sets `export const dynamic = "force-dynamic"` on everything that
// reads from Supabase, so there is nothing to cache at the edge.
export default defineCloudflareConfig();
