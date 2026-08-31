import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";
import { getSupabase, type BlogPost } from "@/lib/supabase";

// The list of posts lives in Supabase, not in the build — never prerender
// a stale copy at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Cleaning tips, guides and news from Bilic Cleaning Company, Mogadishu.",
};

async function getPublishedPosts() {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load blog posts:", error);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        eyebrow="Our Blog"
        title="Insights & Tips"
        subtitle="Practical cleaning advice, behind-the-scenes updates and news from the Bilic Cleaning Company team."
      />

      <section className="section-y bg-white">
        <div className="container-x">
          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-md text-center text-muted">
              <p>No posts yet — check back soon.</p>
            </Reveal>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={index * 0.06} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-offwhite">
                      {post.cover_image ? (
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sky/40">
                          <Icon name="Sparkles" className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-6">
                      <p className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
                        {formatDate(post.created_at)}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-sky">
                        Read more
                        <Icon
                          name="ArrowRight"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
