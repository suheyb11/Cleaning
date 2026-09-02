import BlogPostForm from "@/components/admin/BlogPostForm";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div className="h-full">
      <BlogPostForm />
    </div>
  );
}
