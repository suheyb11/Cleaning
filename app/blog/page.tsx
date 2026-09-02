import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import {
  services,
  whatsappLink,
  whatsappMessages,
} from "@/data/content";
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

/** Shared post card — the site's standard blog card, reused across the grid. */
function PostCard({ post }: { post: BlogPost }) {
  return (
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
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
        <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
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
  );
}

/** The large horizontal hero card for the most recent post. */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:shadow-lift lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-offwhite lg:aspect-auto lg:min-h-[24rem]">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sky/40">
            <Icon name="Sparkles" className="h-14 w-14" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">
          Latest Article
        </span>
      </div>

      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
          {formatDate(post.created_at)}
        </p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{post.title}</h2>
        {post.excerpt && (
          <p className="mt-4 leading-relaxed text-muted">{post.excerpt}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-sky">
          Read more
          <Icon
            name="ArrowRight"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

/** Right-hand sidebar — fills the space with useful, on-brand blocks. */
function Sidebar({ recentPosts }: { recentPosts: BlogPost[] }) {
  const cardClass =
    "rounded-2xl border border-navy/10 bg-white p-6 shadow-soft";

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Free quote CTA */}
      <div className={cardClass}>
        <h3 className="text-lg font-semibold">Get a Free Quote</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tell us about your space and we will prepare a clear, fair quotation
          based on the scope of work you need.
        </p>
        <Button href="/contact" variant="primary" className="mt-4 w-full">
          Request a Free Quote
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Button>
      </div>

      {/* Browse services */}
      <div className={cardClass}>
        <h3 className="text-lg font-semibold">Browse Services</h3>
        <ul className="mt-4 space-y-1">
          {services.slice(0, 6).map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-navy transition-colors hover:bg-offwhite hover:text-sky"
              >
                <Icon
                  name={service.icon}
                  className="h-4 w-4 shrink-0 text-sky"
                />
                <span className="flex-1">{service.title}</span>
                <Icon
                  name="ChevronRight"
                  className="h-4 w-4 shrink-0 text-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-sky"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          className="mt-3 inline-flex items-center gap-1.5 px-2 font-heading text-sm font-semibold text-sky hover:underline"
        >
          View all services
          <Icon name="ArrowRight" className="h-4 w-4" />
        </Link>
      </div>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className={cardClass}>
          <h3 className="text-lg font-semibold">Recent Posts</h3>
          <ul className="mt-4 space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-sm font-medium leading-snug text-navy transition-colors group-hover:text-sky">
                    {post.title}
                  </p>
                  <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-wide text-muted">
                    {formatDate(post.created_at)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* WhatsApp */}
      <div className={cardClass}>
        <h3 className="text-lg font-semibold">Message Us on WhatsApp</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Have a quick question? Chat with our team directly.
        </p>
        <a
          href={whatsappLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-navy/20 bg-white px-5 py-2.5 font-heading text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-sky hover:text-sky"
        >
          <Icon name="MessageCircle" className="h-4 w-4" />
          Start a Chat
        </a>
      </div>
    </aside>
  );
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  const featured = posts[0];
  const rest = posts.slice(1);
  // The sidebar's "Recent Posts" list mirrors the newest handful of posts.
  const recentPosts = posts.slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Our Blog"
        title="Insights & Tips"
        subtitle="Practical cleaning advice, behind-the-scenes updates and news from the Bilic Cleaning Company team."
      />

      <section className="section-y bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-md text-center text-muted">
              <p>No posts yet — check back soon.</p>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <FeaturedPost post={featured} />
              </Reveal>

              <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-3">
                {/* Main column — the remaining posts in a responsive grid. */}
                <div className="lg:col-span-2">
                  {rest.length > 0 ? (
                    <div className="grid gap-7 sm:grid-cols-2">
                      {rest.map((post, index) => (
                        <Reveal
                          key={post.id}
                          delay={index * 0.06}
                          className="h-full"
                        >
                          <PostCard post={post} />
                        </Reveal>
                      ))}
                    </div>
                  ) : (
                    <Reveal className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-offwhite p-10 text-center">
                      <Icon
                        name="Sparkles"
                        className="h-10 w-10 text-sky/50"
                      />
                      <p className="mt-4 font-semibold text-navy">
                        More articles on the way
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        We are writing more cleaning guides and tips — check
                        back soon.
                      </p>
                    </Reveal>
                  )}
                </div>

                {/* Sidebar — fills the space with quote, services and recent posts. */}
                <Reveal delay={0.12} className="lg:col-span-1">
                  <Sidebar recentPosts={recentPosts} />
                </Reveal>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
