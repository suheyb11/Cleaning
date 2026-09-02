import SentEmailsView from "@/components/admin/SentEmailsView";
import {
  getSupabase,
  type SentEmailWithAttachments,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getSentEmails() {
  const { data, error } = await getSupabase()
    .from("sent_emails")
    .select("*, attachments:sent_email_attachments(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load sent emails:", error);
    return [];
  }
  return (data ?? []) as SentEmailWithAttachments[];
}

export default async function AdminSentPage() {
  const emails = await getSentEmails();

  return <SentEmailsView initialEmails={emails} />;
}
