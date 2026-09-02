"use client";

import { useMemo, useState } from "react";

import AttachmentField from "@/components/admin/AttachmentField";
import Toast from "@/components/admin/Toast";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import { customerWhatsAppLink, formatDate } from "@/lib/format";
import type { QuoteRequest } from "@/lib/supabase";
import { useAttachments } from "@/lib/useAttachments";
import { useToast } from "@/lib/useToast";

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky/10 text-sm font-semibold text-sky">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

function StatusPill({ status }: { status: QuoteRequest["status"] }) {
  const isNew = status === "new";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isNew ? "bg-sky/10 text-sky" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {isNew ? "New" : "Replied"}
    </span>
  );
}

function EmptyState({
  icon,
  title,
  text,
  className = "",
}: {
  icon: IconName;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}>
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky/10 text-sky">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <p className="font-semibold text-navy">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}

export default function QuoteRequestsView({
  initialRequests,
}: {
  initialRequests: QuoteRequest[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { toast, showToast } = useToast();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q) ||
        (r.email ?? "").toLowerCase().includes(q),
    );
  }, [requests, query]);

  const active = requests.find((r) => r.id === activeId) ?? null;
  const newCount = requests.filter((r) => r.status === "new").length;

  function handleStatusChange(id: string, status: QuoteRequest["status"]) {
    setRequests((previous) =>
      previous.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  }

  return (
    <div className="flex h-full min-h-0">
      {/* List column */}
      <div
        className={`${
          active ? "hidden" : "flex"
        } h-full min-h-0 w-full flex-col border-r border-gray-200 bg-white md:flex md:w-[360px] md:shrink-0`}
      >
        <div className="shrink-0 border-b border-gray-200 px-5 py-4">
          <h1 className="text-lg font-semibold text-navy">Inbox</h1>
          <p className="mt-0.5 text-xs text-muted">
            {requests.length} request{requests.length === 1 ? "" : "s"}
            {newCount > 0 && ` · ${newCount} new`}
          </p>
          <div className="relative mt-3">
            <Icon
              name="Search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, service, email…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-ink transition-colors hover:border-gray-300 focus:border-sky focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <EmptyState
              icon="Inbox"
              title={requests.length === 0 ? "No quote requests yet" : "No matches"}
              text={
                requests.length === 0
                  ? "New submissions from the contact form will show up here."
                  : "Try a different search."
              }
            />
          ) : (
            <ul className="divide-y divide-gray-200">
              {filtered.map((request) => (
                <li key={request.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(request.id)}
                    className={`flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50 ${
                      activeId === request.id ? "bg-sky/5" : ""
                    }`}
                  >
                    <Avatar name={request.name} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-navy">
                          {request.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {formatDate(request.created_at)}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5">
                        {request.status === "new" && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate text-sm font-medium text-ink">
                          {request.service}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {request.message}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reading pane */}
      <div
        className={`${
          active ? "flex" : "hidden"
        } h-full min-h-0 w-full flex-col md:flex`}
      >
        {active ? (
          <RequestReadingPane
            key={active.id}
            request={active}
            onBack={() => setActiveId(null)}
            onStatusChange={(status) => handleStatusChange(active.id, status)}
            onToast={showToast}
          />
        ) : (
          <EmptyState
            icon="Mail"
            title="Select a request"
            text="Choose a quote request from the list to read it."
            className="h-full"
          />
        )}
      </div>

      <Toast toast={toast} />
    </div>
  );
}

function RequestReadingPane({
  request,
  onBack,
  onStatusChange,
  onToast,
}: {
  request: QuoteRequest;
  onBack: () => void;
  onStatusChange: (status: QuoteRequest["status"]) => void;
  onToast: (type: "success" | "error", text: string) => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [marking, setMarking] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const attachments = useAttachments();

  async function handleSendReply() {
    if (!replyText.trim()) {
      setReplyError("Write a reply before sending.");
      return;
    }
    setSending(true);
    setReplyError(null);

    try {
      const files = await attachments.toPayload();
      const response = await fetch(`/api/admin/quotes/${request.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText, attachments: files }),
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send the reply.");
      }

      onStatusChange("replied");
      onToast("success", "Reply sent to the customer.");
      setReplyText("");
      attachments.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not send the reply.";
      setReplyError(message);
      onToast("error", message);
    } finally {
      setSending(false);
    }
  }

  async function handleMarkReplied() {
    setMarking(true);

    try {
      const response = await fetch(`/api/admin/quotes/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "replied" }),
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not update the status.");
      }

      onStatusChange("replied");
      onToast("success", "Marked as replied.");
    } catch (err) {
      onToast(
        "error",
        err instanceof Error ? err.message : "Could not update the status.",
      );
    } finally {
      setMarking(false);
    }
  }

  const whatsappHref = customerWhatsAppLink(
    request.phone,
    `Hi ${request.name}, thank you for contacting Bilic Cleaning Company about ${request.service}. `,
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="shrink-0 border-b border-gray-200 px-5 py-4 sm:px-7">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy md:hidden"
        >
          <Icon name="ChevronLeft" className="h-4 w-4" />
          Back to Inbox
        </button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar name={request.name} />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-navy">
                {request.name}
              </h2>
              <p className="truncate text-sm text-muted">
                {request.email || request.phone}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <StatusPill status={request.status} />
            <span className="text-xs text-muted">
              {formatDate(request.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Service
            </dt>
            <dd className="mt-0.5 text-ink">{request.service}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Phone
            </dt>
            <dd className="mt-0.5 text-ink">{request.phone}</dd>
          </div>
        </dl>

        <div className="mt-5">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Message
          </p>
          <p className="whitespace-pre-wrap rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-ink">
            {request.message}
          </p>
        </div>

        {/* Quick actions — jump straight to the customer's preferred channel. */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={`tel:${request.phone}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="Phone" className="h-3.5 w-3.5" />
            Call
          </a>
          {request.email && (
            <a
              href={`mailto:${request.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
            >
              <Icon name="Mail" className="h-3.5 w-3.5" />
              Email
            </a>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="MessageCircle" className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>

        {/* Reply — email if we have one, WhatsApp otherwise. */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          {request.email ? (
            <>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Reply to {request.email}
              </label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder="Type your reply — this will be emailed to the customer."
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink transition-colors hover:border-gray-300 focus:border-sky focus:outline-none focus:ring-1 focus:ring-sky"
              />
              {replyError && (
                <p className="mt-2 text-sm text-red-700">{replyError}</p>
              )}

              <div className="mt-3">
                <AttachmentField
                  files={attachments.files}
                  error={attachments.error}
                  onAdd={attachments.addFiles}
                  onRemove={attachments.removeFile}
                  disabled={sending}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleSendReply} loading={sending}>
                  <Icon name="Send" className="h-4 w-4" />
                  Send Reply
                </Button>
                {request.status === "new" && (
                  <Button
                    variant="outline"
                    onClick={handleMarkReplied}
                    loading={marking}
                  >
                    Mark as Replied
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="mb-3 text-sm text-muted">
                This customer didn&apos;t leave an email — reply on WhatsApp
                instead:
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
                >
                  <Icon name="MessageCircle" className="h-4 w-4" />
                  Reply on WhatsApp
                </a>
                {request.status === "new" && (
                  <Button
                    variant="outline"
                    onClick={handleMarkReplied}
                    loading={marking}
                  >
                    Mark as Replied
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
