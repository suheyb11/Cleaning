"use client";

import { useEffect, useState } from "react";

import Toast from "@/components/admin/Toast";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import { customerWhatsAppLink, formatDate } from "@/lib/format";
import type { QuoteRequest } from "@/lib/supabase";
import { useToast } from "@/lib/useToast";

function StatCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: IconName;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          accent ? "bg-sky/10 text-sky" : "bg-navy/5 text-navy"
        }`}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="font-heading text-2xl font-semibold leading-none text-navy">
          {value}
        </p>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: QuoteRequest["status"] }) {
  const isNew = status === "new";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isNew ? "bg-sky/10 text-sky" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {isNew ? "New" : "Replied"}
    </span>
  );
}

/** A field shown full-size on desktop, with its own label restored on mobile
 *  once the row collapses from a table into a stacked card. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-between gap-3 sm:block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted sm:hidden">
        {label}
      </span>
      <span className="truncate text-sm text-ink">{children}</span>
    </span>
  );
}

export default function QuoteRequestsView({
  initialRequests,
}: {
  initialRequests: QuoteRequest[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [openRequest, setOpenRequest] = useState<QuoteRequest | null>(null);
  const { toast, showToast } = useToast();

  const total = requests.length;
  const newCount = requests.filter((r) => r.status === "new").length;
  const repliedCount = total - newCount;

  function handleStatusChange(id: string, status: QuoteRequest["status"]) {
    setRequests((previous) =>
      previous.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    setOpenRequest((previous) =>
      previous && previous.id === id ? { ...previous, status } : previous,
    );
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon="Inbox" label="Total Requests" value={total} />
        <StatCard
          icon="Mail"
          label="New — Awaiting Reply"
          value={newCount}
          accent
        />
        <StatCard icon="CheckCircle2" label="Replied" value={repliedCount} />
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-white p-12 text-center shadow-soft">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky/10 text-sky">
            <Icon name="Inbox" className="h-7 w-7" />
          </span>
          <p className="font-semibold text-navy">No quote requests yet</p>
          <p className="mt-1 text-sm text-muted">
            New submissions from the contact form will show up here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-navy/5 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
          <li
            aria-hidden="true"
            className="hidden bg-offwhite/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted sm:grid sm:grid-cols-[1.3fr_1fr_1fr_1.3fr_1fr_0.8fr]"
          >
            <span>Name</span>
            <span>Service</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Date</span>
            <span>Status</span>
          </li>

          {requests.map((request) => (
            <li key={request.id}>
              <button
                type="button"
                onClick={() => setOpenRequest(request)}
                className="flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-offwhite focus-visible:bg-offwhite sm:grid sm:grid-cols-[1.3fr_1fr_1fr_1.3fr_1fr_0.8fr] sm:items-center sm:gap-4"
              >
                <span className="font-semibold text-navy">{request.name}</span>
                <Field label="Service">{request.service}</Field>
                <Field label="Phone">{request.phone}</Field>
                <Field label="Email">{request.email || "—"}</Field>
                <Field label="Date">{formatDate(request.created_at)}</Field>
                <span>
                  <StatusPill status={request.status} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {openRequest && (
        <RequestModal
          request={openRequest}
          onClose={() => setOpenRequest(null)}
          onStatusChange={(status) => handleStatusChange(openRequest.id, status)}
          onToast={showToast}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}

function RequestModal({
  request,
  onClose,
  onStatusChange,
  onToast,
}: {
  request: QuoteRequest;
  onClose: () => void;
  onStatusChange: (status: QuoteRequest["status"]) => void;
  onToast: (type: "success" | "error", text: string) => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [marking, setMarking] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  // Escape closes the modal, and the background shouldn't scroll behind it.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function handleSendReply() {
    if (!replyText.trim()) {
      setReplyError("Write a reply before sending.");
      return;
    }
    setSending(true);
    setReplyError(null);

    try {
      const response = await fetch(`/api/admin/quotes/${request.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText }),
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send the reply.");
      }

      onStatusChange("replied");
      onToast("success", "Reply sent to the customer.");
      setReplyText("");
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quote request from ${request.name}`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/40 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lift sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-navy">{request.name}</h2>
            <p className="text-sm text-muted">{formatDate(request.created_at)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-xl p-2 text-muted transition-colors hover:bg-offwhite hover:text-navy"
          >
            <Icon name="X" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3">
          <StatusPill status={request.status} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
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
          <div className="col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Email
            </dt>
            <dd className="mt-0.5 text-ink">{request.email || "Not provided"}</dd>
          </div>
        </dl>

        <div className="mt-5">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Message
          </p>
          <p className="whitespace-pre-wrap rounded-2xl border border-navy/10 bg-offwhite/60 p-4 text-sm text-ink">
            {request.message}
          </p>
        </div>

        {/* Quick actions — jump straight to the customer's preferred channel. */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={`tel:${request.phone}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="Phone" className="h-3.5 w-3.5" />
            Call
          </a>
          {request.email && (
            <a
              href={`mailto:${request.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
            >
              <Icon name="Mail" className="h-3.5 w-3.5" />
              Email
            </a>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="MessageCircle" className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>

        {/* Reply — email if we have one, WhatsApp otherwise. */}
        <div className="mt-6 border-t border-navy/10 pt-5">
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
                className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink transition-colors focus:border-sky focus:outline-none"
              />
              {replyError && (
                <p className="mt-2 text-sm text-red-700">{replyError}</p>
              )}
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
