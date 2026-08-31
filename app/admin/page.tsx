import QuoteRequestsView from "@/components/admin/QuoteRequestsView";
import { getSupabase, type QuoteRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getQuoteRequests() {
  const { data, error } = await getSupabase()
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load quote requests:", error);
    return [];
  }
  return (data ?? []) as QuoteRequest[];
}

export default async function AdminQuotesPage() {
  const requests = await getQuoteRequests();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-navy">
        Quote Requests
      </h1>
      <p className="mb-6 text-sm text-muted">
        Click a request to read the full message and reply.
      </p>

      <QuoteRequestsView initialRequests={requests} />
    </div>
  );
}
