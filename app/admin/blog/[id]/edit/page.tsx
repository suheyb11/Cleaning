import { notFound } from "next/navigation";

import BlogPostForm from "@/components/admin/BlogPostForm";
import { supabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-navy">Edit Post</h1>
      <BlogPostForm post={data as BlogPost} />
    </div>
  );
}
