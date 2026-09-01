"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClasses =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors hover:border-gray-300 focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function ComposeModal({
  onClose,
  onToast,
}: {
  onClose: () => void;
  onToast: (type: "success" | "error", text: string) => void;
}) {
  const [toEmail, setToEmail] = useState("");
  const [toName, setToName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (!EMAIL_RE.test(toEmail.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (!subject.trim()) {
      setError("Subject is required.");
      return;
    }
    if (!message.trim()) {
      setError("Write a message before sending.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: toEmail.trim(),
          toName: toName.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send the email.");
      }

      onToast("success", "Email sent.");
      onClose();
    } catch (err) {
      const text = err instanceof Error ? err.message : "Could not send the email.";
      setError(text);
      onToast("error", text);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Compose email"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-navy/40 sm:items-center sm:p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex h-[92vh] w-full flex-col overflow-y-auto border-gray-200 bg-white p-6 sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl sm:border sm:p-7"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-navy">New Message</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-2 text-muted transition-colors hover:bg-gray-50 hover:text-navy"
          >
            <Icon name="X" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="compose-to" className={labelClasses}>
              To
            </label>
            <input
              id="compose-to"
              type="email"
              value={toEmail}
              onChange={(event) => setToEmail(event.target.value)}
              placeholder="customer@example.com"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="compose-toname" className={labelClasses}>
              To name (optional)
            </label>
            <input
              id="compose-toname"
              value={toName}
              onChange={(event) => setToName(event.target.value)}
              placeholder="Jane Doe"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="compose-subject" className={labelClasses}>
              Subject
            </label>
            <input
              id="compose-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Subject"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="compose-body" className={labelClasses}>
              Message
            </label>
            <textarea
              id="compose-body"
              rows={8}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your message…"
              className={`${fieldClasses} resize-y`}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <Icon name="AlertCircle" className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2 border-t border-gray-200 pt-5">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend} loading={sending}>
            <Icon name="Send" className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
