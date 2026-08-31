import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

type BlogPostBody = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  cover_image?: string | null;
  body_markdown?: string;
  published?: boolean;
};

/** Updates a blog post. Protected by middleware.ts (/api/admin/* requires the admin cookie). */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = (await request.json().catch(() => ({}))) as BlogPostBody;

  if (!body.title?.trim() || !body.slug?.trim() || !body.body_markdown?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Title, slug and body are required." },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: body.title.trim(),
      slug: body.slug.trim(),
      excerpt: body.excerpt || null,
      cover_image: body.cover_image || null,
      body_markdown: body.body_markdown,
      published: Boolean(body.published),
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id);

  if (error) {
    console.error("Failed to update blog post:", error);
    const message =
      error.code === "23505"
        ? "That slug is already used by another post."
        : "Could not save the post.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

/** Deletes a blog post. Protected by middleware.ts (/api/admin/* requires the admin cookie). */
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", params.id);

  if (error) {
    console.error("Failed to delete blog post:", error);
    return NextResponse.json(
      { ok: false, error: "Could not delete the post." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
