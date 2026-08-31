"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Toast from "@/components/admin/Toast";
import Icon from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/supabase";
import { useToast } from "@/lib/useToast";

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
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
  const { toast, showToast } = useToast();

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-white p-12 text-center shadow-soft">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky/10 text-sky">
          <Icon name="FileText" className="h-7 w-7" />
        </span>
        <p className="font-semibold text-navy">No posts yet</p>
        <p className="mt-1 text-sm text-muted">
          Create your first one to see it here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-navy/5 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
        <li
          aria-hidden="true"
          className="hidden bg-offwhite/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted sm:grid sm:grid-cols-[1.8fr_0.8fr_0.9fr_0.9fr]"
        >
          <span>Title</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </li>

        {posts.map((post) => (
          <li key={post.id}>
            <div className="flex flex-col gap-2.5 px-5 py-4 sm:grid sm:grid-cols-[1.8fr_0.8fr_0.9fr_0.9fr] sm:items-center sm:gap-4">
              <span className="font-semibold text-navy">{post.title}</span>

              <span className="flex items-center justify-between gap-3 sm:block">
                <span className="text-xs font-medium uppercase tracking-wide text-muted sm:hidden">
                  Status
                </span>
                <StatusPill published={post.published} />
              </span>

              <span className="flex items-center justify-between gap-3 sm:block">
                <span className="text-xs font-medium uppercase tracking-wide text-muted sm:hidden">
                  Date
                </span>
                <span className="text-sm text-muted">
                  {formatDate(post.created_at)}
                </span>
              </span>

              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky hover:underline"
                >
                  <Icon name="Pencil" className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  disabled={deletingId === post.id}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline disabled:opacity-60"
                >
                  <Icon name="Trash2" className="h-3.5 w-3.5" />
                  {deletingId === post.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Toast toast={toast} />
    </div>
  );
}
