"use client";

import { useState, type FormEvent } from "react";

import Icon from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data: { ok: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Incorrect password.");
      }

      // Full navigation so the freshly-set cookie is sent on the next request.
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-8">
      <div className="w-full max-w-sm rounded-2xl border border-navy/10 bg-white p-8 shadow-soft">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
            <Icon name="ShieldCheck" className="h-6 w-6" />
          </span>
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">
            Bilic Cleaning Company — staff only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink transition-colors focus:border-sky focus:outline-none"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <Icon name="AlertCircle" className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky px-6 py-3 font-heading text-sm font-semibold text-white shadow-soft transition-colors hover:bg-skyDark disabled:pointer-events-none disabled:opacity-70"
          >
            {submitting ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
