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

export default async function AdminInboxPage() {
  const requests = await getQuoteRequests();

  return <QuoteRequestsView initialRequests={requests} />;
}
