"use client";

import { useRef } from "react";

import Icon from "@/components/ui/Icon";
import { ATTACHMENT_ACCEPT, ATTACHMENT_HINT, formatBytes } from "@/lib/attachments";

/**
 * "Attach file" button + the list of chosen files (name, size, remove).
 * State lives in the parent via the `useAttachments` hook so the send
 * handler can read the files — this component is purely the UI.
 */
export default function AttachmentField({
  files,
  error,
  onAdd,
  onRemove,
  disabled = false,
}: {
  files: File[];
  error: string | null;
  onAdd: (list: FileList | null) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ATTACHMENT_ACCEPT}
        className="hidden"
        onChange={(event) => {
          onAdd(event.target.files);
          // Reset so picking the same file again still fires onChange.
          event.target.value = "";
        }}
      />

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky disabled:pointer-events-none disabled:opacity-60"
        >
          <Icon name="Paperclip" className="h-3.5 w-3.5" />
          Attach file
        </button>
        <span className="text-xs text-muted">{ATTACHMENT_HINT}</span>
      </div>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs"
            >
              <Icon name="FileText" className="h-3.5 w-3.5 shrink-0 text-sky" />
              <span className="min-w-0 flex-1 truncate text-ink">{file.name}</span>
              <span className="shrink-0 text-muted">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-gray-200 hover:text-navy"
              >
                <Icon name="X" className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
