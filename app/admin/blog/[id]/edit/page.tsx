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
    <div className="h-full overflow-y-auto">
      <div className="container-x py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-semibold text-navy">Edit Post</h1>
        <BlogPostForm post={data as BlogPost} />
      </div>
    </div>
  );
}
