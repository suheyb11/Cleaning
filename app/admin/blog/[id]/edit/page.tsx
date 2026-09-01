import { notFound } from "next/navigation";

import BlogPostForm from "@/components/admin/BlogPostForm";
import { getSupabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div className="h-full">
      <BlogPostForm post={data as BlogPost} />
    </div>
  );
}
