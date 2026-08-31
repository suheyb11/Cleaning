import { NextResponse } from "next/server";

import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type BlogPostBody = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  cover_image?: string | null;
  body_markdown?: string;
  published?: boolean;
};

/** Creates a blog post. Protected by middleware.ts (/api/admin/* requires the admin cookie). */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as BlogPostBody;

  if (!body.title?.trim() || !body.slug?.trim() || !body.body_markdown?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Title, slug and body are required." },
      { status: 400 },
    );
  }

  const { error } = await getSupabase().from("blog_posts").insert({
    title: body.title.trim(),
    slug: body.slug.trim(),
    excerpt: body.excerpt || null,
    cover_image: body.cover_image || null,
    body_markdown: body.body_markdown,
    published: Boolean(body.published),
  });

  if (error) {
    console.error("Failed to create blog post:", error);
    const message =
      error.code === "23505"
        ? "That slug is already used by another post."
        : "Could not save the post.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
