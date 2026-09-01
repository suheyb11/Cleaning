import BlogPostsList from "@/components/admin/BlogPostsList";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { getSupabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getAllPosts() {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load blog posts:", error);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export default async function AdminBlogPage() {
  const posts = await getAllPosts();
  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-navy">
              Blog Posts
            </h1>
            <p className="text-sm text-muted">
              {posts.length} post{posts.length === 1 ? "" : "s"} ·{" "}
              {publishedCount} published · {draftCount} draft
              {draftCount === 1 ? "" : "s"}
            </p>
          </div>

          <Button href="/admin/blog/new">
            <Icon name="FileText" className="h-4 w-4" />
            New Post
          </Button>
        </div>

        <BlogPostsList posts={posts} />
      </div>
    </div>
  );
}
