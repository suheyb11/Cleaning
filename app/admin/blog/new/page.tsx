import Link from "next/link";

import BlogPostForm from "@/components/admin/BlogPostForm";
import Icon from "@/components/ui/Icon";

export default function NewBlogPostPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container-x py-8 sm:py-10">
        <Link
          href="/admin/blog"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy"
        >
          <Icon name="ChevronLeft" className="h-4 w-4" />
          Back to Blog Posts
        </Link>
        <h1 className="mb-6 text-2xl font-semibold text-navy">New Post</h1>
        <BlogPostForm />
      </div>
    </div>
  );
}
