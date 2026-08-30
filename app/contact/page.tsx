import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Bilic Cleaning Company in Mogadishu, Somalia. Request a free quote for residential, office, deep, post-construction or janitorial cleaning services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a Free Quote"
        subtitle="Send us a message with the details of your space and the services you need. Our team will get back to you with a clear quotation."
      />

      <ContactSection />
      <ProcessTimeline />
    </>
  );
}
