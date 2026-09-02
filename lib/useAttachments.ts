"use client";

import { useState } from "react";

import {
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENTS_TOTAL_BYTES,
  type OutgoingAttachment,
} from "./attachments";

/** Reads a File as a base64 string with no `data:...;base64,` prefix. */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error(`Could not read "${file.name}".`));
    reader.readAsDataURL(file);
  });
}

/**
 * Small state helper for "pick a few files, show them, remove one, send them"
 * shared by the admin reply box and the Compose modal. Validation matches
 * lib/attachments.ts so the server and client agree on the limits.
 */
export function useAttachments() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function addFiles(list: FileList | null) {
    const incoming = list ? Array.from(list) : [];
    if (incoming.length === 0) return;

    const oversized = incoming.find((file) => file.size > MAX_ATTACHMENT_BYTES);
    if (oversized) {
      setError(`"${oversized.name}" is over the 5 MB limit.`);
      return;
    }

    const next = [...files, ...incoming];
    if (next.length > MAX_ATTACHMENTS) {
      setError(`You can attach at most ${MAX_ATTACHMENTS} files.`);
      return;
    }
    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_ATTACHMENTS_TOTAL_BYTES) {
      setError("Attachments are too large in total (max 12 MB).");
      return;
    }

    setError(null);
    setFiles(next);
  }

  function removeFile(index: number) {
    setFiles((previous) => previous.filter((_, i) => i !== index));
    setError(null);
  }

  function reset() {
    setFiles([]);
    setError(null);
  }

  /** Convert the chosen files to the payload the send routes expect. */
  async function toPayload(): Promise<OutgoingAttachment[]> {
    return Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: await fileToBase64(file),
        contentType: file.type || undefined,
        size: file.size,
      })),
    );
  }

  return { files, error, addFiles, removeFile, reset, toPayload };
}
