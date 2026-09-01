import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container-x py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-semibold text-navy">New Post</h1>
        <BlogPostForm />
      </div>
    </div>
  );
}
