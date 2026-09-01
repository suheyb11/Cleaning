"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import Toast from "@/components/admin/Toast";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { slugify } from "@/lib/format";
import type { BlogPost } from "@/lib/supabase";
import { useToast } from "@/lib/useToast";

const fieldClasses =
  "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-sky focus:outline-none";
const labelClasses = "mb-1.5 block text-sm font-medium text-navy";

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const isEditing = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [coverImageBroken, setCoverImageBroken] = useState(false);
  const [bodyMarkdown, setBodyMarkdown] = useState(post?.body_markdown ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  function handleTitleChange(value: string) {
    setTitle(value);
    // Keep the slug in sync with the title until the admin edits it by hand.
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !slug.trim() || !bodyMarkdown.trim()) {
      setError("Title, slug and body are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: title.trim(),
      slug: slugify(slug),
      excerpt: excerpt.trim() || null,
      cover_image: coverImage.trim() || null,
      body_markdown: bodyMarkdown,
      published,
    };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/blog/${post!.id}` : "/api/admin/blog",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not save the post.");
      }

      showToast("success", isEditing ? "Post updated." : "Post created.");
      // Brief pause so the success toast is visible before the list swaps in.
      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 700);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not save the post.";
      setError(message);
      showToast("error", message);
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-soft sm:p-8"
    >
      <div>
        <label htmlFor="title" className={labelClasses}>
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="e.g. 5 Tips for a Spotless Office"
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClasses}>
          Slug{" "}
          <span className="font-normal text-muted">
            — the post&apos;s URL: /blog/{slug || "…"}
          </span>
        </label>
        <input
          id="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
          placeholder="5-tips-for-a-spotless-office"
          className={fieldClasses}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClasses}>
          Excerpt <span className="font-normal text-muted">(shown on the blog listing)</span>
        </label>
        <textarea
          id="excerpt"
          rows={2}
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="A one or two sentence summary…"
          className={`${fieldClasses} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="cover_image" className={labelClasses}>
          Cover image URL
        </label>
        <div className="flex items-start gap-4">
          <input
            id="cover_image"
            value={coverImage}
            onChange={(event) => {
              setCoverImage(event.target.value);
              setCoverImageBroken(false);
            }}
            placeholder="https://…"
            className={fieldClasses}
          />
          {/* Live preview so a typo or dead link is obvious immediately,
              instead of only showing up once the post is published. */}
          {coverImage.trim() && !coverImageBroken && (
            <div className="relative h-[52px] w-20 shrink-0 overflow-hidden rounded-xl border border-navy/10 bg-offwhite">
              <Image
                src={coverImage.trim()}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                onError={() => setCoverImageBroken(true)}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="body" className={labelClasses}>
          Body <span className="font-normal text-muted">(Markdown)</span>
        </label>
        <textarea
          id="body"
          rows={18}
          value={bodyMarkdown}
          onChange={(event) => setBodyMarkdown(event.target.value)}
          placeholder={"## A heading\n\nWrite the post in Markdown — **bold**, *italic*, lists, links…"}
          className={`${fieldClasses} resize-y font-mono text-[13px]`}
        />
      </div>

      <label className="flex items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-offwhite/60 px-4 py-3.5">
        <span className="text-sm font-medium text-navy">
          Published{" "}
          <span className="font-normal text-muted">
            — visible on the public blog
          </span>
        </span>
        <span
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            published ? "bg-sky" : "bg-navy/15"
          }`}
        >
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              published ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </span>
      </label>

      {error && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <Icon name="AlertCircle" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-navy/10 pt-5">
        <Button type="submit" loading={saving}>
          {isEditing ? "Save Changes" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </Button>
      </div>

      <Toast toast={toast} />
    </form>
  );
}
