"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Toast from "@/components/admin/Toast";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/supabase";
import { useToast } from "@/lib/useToast";

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        published ? "bg-emerald-50 text-emerald-700" : "bg-navy/5 text-muted"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default function BlogPostsList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { toast, showToast } = useToast();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(q));
  }, [posts, query]);

  async function handleDelete(post: BlogPost) {
    if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) {
      return;
    }

    setDeletingId(post.id);

    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "DELETE",
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not delete the post.");
      }

      showToast("success", `"${post.title}" deleted.`);
      router.refresh();
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Could not delete the post.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-white p-14 text-center shadow-soft">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky/10 text-sky">
          <Icon name="FileText" className="h-7 w-7" />
        </span>
        <p className="font-semibold text-navy">No posts yet</p>
        <p className="mt-1 text-sm text-muted">
          Write your first post to see it here.
        </p>
        <Button href="/admin/blog/new" className="mt-5">
          <Icon name="Pencil" className="h-4 w-4" />
          Create your first post
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-4 max-w-xs">
        <Icon
          name="Search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts by title…"
          className="w-full rounded-xl border border-navy/15 bg-white py-2 pl-9 pr-3 text-sm text-ink transition-colors focus:border-sky focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-navy/10 bg-white p-10 text-center text-sm text-muted shadow-soft">
          No posts match &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-3 shadow-soft transition-shadow hover:shadow-lift sm:p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-offwhite sm:h-20 sm:w-20">
                {post.cover_image ? (
                  <Image
                    src={post.cover_image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-sky/10 text-sky">
                    <Icon name="Image" className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate font-semibold text-navy">
                    {post.title}
                  </span>
                  <StatusPill published={post.published} />
                </div>
                <p className="mt-0.5 truncate text-sm text-muted">
                  {post.excerpt || "No excerpt"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formatDate(post.created_at)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {post.published && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on site"
                    title="View on site"
                    className="rounded-xl p-2 text-muted transition-colors hover:bg-sky/10 hover:text-sky"
                  >
                    <Icon name="Eye" className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  aria-label="Edit"
                  title="Edit"
                  className="rounded-xl p-2 text-muted transition-colors hover:bg-sky/10 hover:text-sky"
                >
                  <Icon name="Pencil" className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  disabled={deletingId === post.id}
                  aria-label="Delete"
                  title="Delete"
                  className="rounded-xl p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                >
                  <Icon
                    name={deletingId === post.id ? "Loader2" : "Trash2"}
                    className={`h-4 w-4 ${deletingId === post.id ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Toast toast={toast} />
    </div>
  );
}
