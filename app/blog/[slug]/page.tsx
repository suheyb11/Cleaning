import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import MarkdownContent from "@/components/MarkdownContent";
import { formatDate } from "@/lib/format";
import { getSupabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getPublishedPost(slug: string) {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load blog post:", error);
    return null;
  }
  return data as BlogPost | null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPublishedPost(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPublishedPost(params.slug);

  // Covers both a slug that doesn't exist and one that exists but is
  // unpublished — either way, this reader shouldn't see it.
  if (!post) notFound();

  return (
    <article className="section-y bg-white">
      <div className="container-x max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky hover:underline"
          >
            <Icon name="ChevronLeft" className="h-4 w-4" />
            Back to blog
          </Link>

          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
            {formatDate(post.created_at)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            {post.title}
          </h1>
        </Reveal>

        {post.cover_image && (
          <Reveal delay={0.08}>
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.12} className="mt-10">
          <MarkdownContent markdown={post.body_markdown} />
        </Reveal>

        <div className="mt-12 border-t border-navy/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky hover:underline"
          >
            <Icon name="ChevronLeft" className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}
