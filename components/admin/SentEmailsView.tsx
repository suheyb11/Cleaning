"use client";

import { useMemo, useState } from "react";

import Icon, { type IconName } from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { SentEmail } from "@/lib/supabase";

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-sm font-semibold text-navy">
      {name.trim().charAt(0).toUpperCase() || "?"}
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

export default function SentEmailsView({
  initialEmails,
}: {
  initialEmails: SentEmail[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialEmails;
    return initialEmails.filter(
      (e) =>
        (e.to_name ?? "").toLowerCase().includes(q) ||
        e.to_email.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q),
    );
  }, [initialEmails, query]);

  const active = initialEmails.find((e) => e.id === activeId) ?? null;

  return (
    <div className="flex h-full min-h-0">
      {/* List column */}
      <div
        className={`${
          active ? "hidden" : "flex"
        } h-full min-h-0 w-full flex-col border-r border-gray-200 bg-white md:flex md:w-[360px] md:shrink-0`}
      >
        <div className="shrink-0 border-b border-gray-200 px-5 py-4">
          <h1 className="text-lg font-semibold text-navy">Sent</h1>
          <p className="mt-0.5 text-xs text-muted">
            {initialEmails.length} email{initialEmails.length === 1 ? "" : "s"} sent
          </p>
          <div className="relative mt-3">
            <Icon
              name="Search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search recipient, subject…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-ink transition-colors hover:border-gray-300 focus:border-sky focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <EmptyState
              icon="Send"
              title={initialEmails.length === 0 ? "No sent emails yet" : "No matches"}
              text={
                initialEmails.length === 0
                  ? "Replies and composed emails you send will show up here."
                  : "Try a different search."
              }
            />
          ) : (
            <ul className="divide-y divide-gray-200">
              {filtered.map((email) => (
                <li key={email.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(email.id)}
                    className={`flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50 ${
                      activeId === email.id ? "bg-sky/5" : ""
                    }`}
                  >
                    <Avatar name={email.to_name || email.to_email} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-navy">
                          {email.to_name || email.to_email}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {formatDate(email.created_at)}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-ink">
                        {email.subject}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {email.body}
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
          <SentEmailReadingPane
            key={active.id}
            email={active}
            onBack={() => setActiveId(null)}
          />
        ) : (
          <EmptyState
            icon="Mail"
            title="Select an email"
            text="Choose a sent email from the list to read it."
            className="h-full"
          />
        )}
      </div>
    </div>
  );
}

function SentEmailReadingPane({
  email,
  onBack,
}: {
  email: SentEmail;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="shrink-0 border-b border-gray-200 px-5 py-4 sm:px-7">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy md:hidden"
        >
          <Icon name="ChevronLeft" className="h-4 w-4" />
          Back to Sent
        </button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar name={email.to_name || email.to_email} />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-navy">
                {email.to_name || email.to_email}
              </h2>
              {email.to_name && (
                <p className="truncate text-sm text-muted">{email.to_email}</p>
              )}
            </div>
          </div>
          <span className="shrink-0 text-xs text-muted">
            {formatDate(email.created_at)}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Subject
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-navy">
            {email.subject}
          </dd>
        </div>

        <div className="mt-5">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Message
          </p>
          <p className="whitespace-pre-wrap rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-ink">
            {email.body}
          </p>
        </div>
      </div>
    </div>
  );
}
