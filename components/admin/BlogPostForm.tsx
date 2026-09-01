"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import Toast from "@/components/admin/Toast";
import MarkdownContent from "@/components/MarkdownContent";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import { formatDate, slugify } from "@/lib/format";
import type { BlogPost } from "@/lib/supabase";
import { useToast } from "@/lib/useToast";

const fieldClasses =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors hover:border-gray-300 focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky";
const labelClasses = "mb-1.5 block text-sm font-medium text-navy";

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

function ToolbarButton({
  icon,
  label,
  onClick,
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-lg p-2 text-navy/70 transition-colors hover:bg-white hover:text-sky"
    >
      <Icon name={icon} className="h-4 w-4" />
    </button>
  );
}

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
  const [bodyTab, setBodyTab] = useState<"write" | "preview">("write");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const pendingSelectionRef = useRef<[number, number] | null>(null);
  const initialRef = useRef({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    coverImage: post?.cover_image ?? "",
    bodyMarkdown: post?.body_markdown ?? "",
    published: post?.published ?? false,
  });

  // Re-focus the textarea and restore the cursor/selection a toolbar action
  // set, once the value it just changed has actually re-rendered.
  useEffect(() => {
    if (pendingSelectionRef.current && bodyRef.current) {
      const [start, end] = pendingSelectionRef.current;
      bodyRef.current.focus();
      bodyRef.current.setSelectionRange(start, end);
      pendingSelectionRef.current = null;
    }
  }, [bodyMarkdown]);

  function handleTitleChange(value: string) {
    setTitle(value);
    // Keep the slug in sync with the title until the admin edits it by hand.
    if (!slugTouched) setSlug(slugify(value));
  }

  function isDirty() {
    const i = initialRef.current;
    return (
      title !== i.title ||
      slug !== i.slug ||
      excerpt !== i.excerpt ||
      coverImage !== i.coverImage ||
      bodyMarkdown !== i.bodyMarkdown ||
      published !== i.published
    );
  }

  function handleBack() {
    if (isDirty() && !window.confirm("Discard changes?")) return;
    router.push("/admin/blog");
  }

  function applyWrap(before: string, after: string, placeholder: string) {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const hasSelection = selectionEnd > selectionStart;
    const selected = hasSelection
      ? value.slice(selectionStart, selectionEnd)
      : placeholder;
    const newValue =
      value.slice(0, selectionStart) +
      before +
      selected +
      after +
      value.slice(selectionEnd);
    setBodyMarkdown(newValue);
    const start = selectionStart + before.length;
    pendingSelectionRef.current = [start, start + selected.length];
  }

  function applyLinePrefix(prefix: string) {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const searchEnd = value.indexOf("\n", selectionEnd);
    const lineEnd = searchEnd === -1 ? value.length : searchEnd;
    const block = value.slice(lineStart, lineEnd);
    const prefixed = block
      .split("\n")
      .map((line) => `${prefix}${line}`)
      .join("\n");
    const newValue =
      value.slice(0, lineStart) + prefixed + value.slice(lineEnd);
    setBodyMarkdown(newValue);
    pendingSelectionRef.current = [lineStart, lineStart + prefixed.length];
  }

  function applyNumberedList() {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const searchEnd = value.indexOf("\n", selectionEnd);
    const lineEnd = searchEnd === -1 ? value.length : searchEnd;
    const block = value.slice(lineStart, lineEnd);
    const numbered = block
      .split("\n")
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");
    const newValue =
      value.slice(0, lineStart) + numbered + value.slice(lineEnd);
    setBodyMarkdown(newValue);
    pendingSelectionRef.current = [lineStart, lineStart + numbered.length];
  }

  function applyLink() {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const hasSelection = selectionEnd > selectionStart;
    const linkText = hasSelection
      ? value.slice(selectionStart, selectionEnd)
      : "link text";
    const urlPlaceholder = "url";
    const insertion = `[${linkText}](${urlPlaceholder})`;
    const newValue =
      value.slice(0, selectionStart) + insertion + value.slice(selectionEnd);
    setBodyMarkdown(newValue);

    if (hasSelection) {
      // Selection already had the label — jump straight to the URL.
      const urlStart = selectionStart + linkText.length + 3;
      pendingSelectionRef.current = [urlStart, urlStart + urlPlaceholder.length];
    } else {
      const textStart = selectionStart + 1;
      pendingSelectionRef.current = [textStart, textStart + linkText.length];
    }
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
    <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-hidden">
      {/* Editor header — pinned to the top of the panel, never scrolls. */}
      <div className="shrink-0 border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="mb-1 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy"
            >
              <Icon name="ChevronLeft" className="h-4 w-4" />
              Back to Blog Posts
            </button>
            <h1 className="truncate text-xl font-semibold text-navy sm:text-2xl">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Published
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

            <Button type="button" variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </div>
      </div>

      {/* Everything below the header lives in its own scroll region, so the
          header never moves and the body editor can flex to fill the rest
          of the panel instead of leaving empty space under a short page. */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-5 py-6 sm:px-8 sm:py-8">
          {error && (
            <div className="mb-6 flex shrink-0 items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <Icon name="AlertCircle" className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:items-stretch">
            {/* Main column */}
            <div className="flex min-h-0 flex-col space-y-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <div>
              <label htmlFor="title" className={labelClasses}>
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="e.g. 5 Tips for a Spotless Office"
                className={`${fieldClasses} text-lg font-semibold text-navy sm:text-xl`}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label htmlFor="slug" className="text-sm font-medium text-navy">
                  Slug
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSlugTouched(false);
                    setSlug(slugify(title));
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky hover:underline"
                >
                  <Icon name="RotateCcw" className="h-3 w-3" />
                  Regenerate from title
                </button>
              </div>
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
              <p className="mt-1.5 truncate text-xs text-muted">
                /blog/{slug || "…"}
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label htmlFor="excerpt" className="text-sm font-medium text-navy">
                  Excerpt{" "}
                  <span className="font-normal text-muted">
                    (shown on the blog listing)
                  </span>
                </label>
                <span
                  className={`shrink-0 text-xs font-medium ${
                    excerpt.length > 160 ? "text-amber-600" : "text-muted"
                  }`}
                >
                  {excerpt.length} / 160
                </span>
              </div>
              <textarea
                id="excerpt"
                rows={3}
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="A one or two sentence summary…"
                className={`${fieldClasses} resize-y`}
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="mb-1.5 flex shrink-0 items-center justify-between gap-3">
                <label htmlFor="body" className="text-sm font-medium text-navy">
                  Body <span className="font-normal text-muted">(Markdown)</span>
                </label>
                <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setBodyTab("write")}
                    className={`rounded-md border px-3 py-1.5 transition-colors ${
                      bodyTab === "write"
                        ? "border-gray-200 bg-white text-navy"
                        : "border-transparent text-muted hover:text-navy"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setBodyTab("preview")}
                    className={`rounded-md border px-3 py-1.5 transition-colors ${
                      bodyTab === "preview"
                        ? "border-gray-200 bg-white text-navy"
                        : "border-transparent text-muted hover:text-navy"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {bodyTab === "write" ? (
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="mb-2 flex shrink-0 flex-wrap items-center gap-0.5 rounded-xl border border-gray-200 bg-gray-50 p-1.5">
                    <ToolbarButton
                      icon="Bold"
                      label="Bold"
                      onClick={() => applyWrap("**", "**", "bold text")}
                    />
                    <ToolbarButton
                      icon="Italic"
                      label="Italic"
                      onClick={() => applyWrap("*", "*", "italic text")}
                    />
                    <span className="mx-1 h-5 w-px bg-navy/10" aria-hidden="true" />
                    <ToolbarButton
                      icon="Heading2"
                      label="Heading 2"
                      onClick={() => applyLinePrefix("## ")}
                    />
                    <ToolbarButton
                      icon="Heading3"
                      label="Heading 3"
                      onClick={() => applyLinePrefix("### ")}
                    />
                    <span className="mx-1 h-5 w-px bg-navy/10" aria-hidden="true" />
                    <ToolbarButton
                      icon="List"
                      label="Bulleted list"
                      onClick={() => applyLinePrefix("- ")}
                    />
                    <ToolbarButton
                      icon="ListOrdered"
                      label="Numbered list"
                      onClick={applyNumberedList}
                    />
                    <ToolbarButton
                      icon="Quote"
                      label="Quote"
                      onClick={() => applyLinePrefix("> ")}
                    />
                    <span className="mx-1 h-5 w-px bg-navy/10" aria-hidden="true" />
                    <ToolbarButton icon="Link2" label="Link" onClick={applyLink} />
                  </div>
                  <textarea
                    id="body"
                    ref={bodyRef}
                    value={bodyMarkdown}
                    onChange={(event) => setBodyMarkdown(event.target.value)}
                    placeholder={
                      "## A heading\n\nWrite the post in Markdown — **bold**, *italic*, lists, links…"
                    }
                    className={`${fieldClasses} min-h-[320px] flex-1 resize-none font-mono text-[13px] leading-relaxed`}
                  />
                </div>
              ) : (
                <div className="min-h-[320px] flex-1 overflow-y-auto rounded-2xl border border-gray-200 bg-white px-5 py-4">
                  {bodyMarkdown.trim() ? (
                    <MarkdownContent markdown={bodyMarkdown} />
                  ) : (
                    <p className="text-sm text-muted">
                      Nothing to preview yet — write some Markdown first.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Side column — post settings */}
          <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
                Post settings
              </h2>

              <label htmlFor="cover_image" className={labelClasses}>
                Cover image URL
              </label>
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
              <p className="mt-1.5 text-xs text-muted">
                Paste an image URL (e.g. from Unsplash). Replace with a real
                Bilic photo when available.
              </p>

              <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {coverImage.trim() && !coverImageBroken ? (
                  <Image
                    src={coverImage.trim()}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                    onError={() => setCoverImageBroken(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-sky/50">
                    <Icon name="Image" className="h-8 w-8" />
                    <span className="text-xs font-medium text-muted">
                      No cover image yet
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Status</span>
                <StatusPill published={published} />
              </div>
              {post && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Created</span>
                    <span className="text-ink">{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Updated</span>
                    <span className="text-ink">{formatDate(post.updated_at)}</span>
                  </div>
                </>
              )}
              {!post && (
                <p className="text-xs text-muted">
                  Created and updated dates appear here once the post is saved.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      <Toast toast={toast} />
    </form>
  );
}
