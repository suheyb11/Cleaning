import type { Metadata } from "next";

import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import { sectionText } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Bilic Cleaning Company works: eight clear steps from your first message to the feedback that helps us improve.",
};

/**
 * Standalone "Process" page. It reuses the same <ProcessTimeline /> section
 * that appears on the home page (with its own heading hidden, since the page
 * banner already carries the title), plus the shared "Request a Free Quote"
 * CTA.
 */
export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow={sectionText.process.eyebrow}
        title={sectionText.process.title}
        subtitle={sectionText.process.subtitle}
      />

      <ProcessTimeline showHeading={false} />
      <CtaBand />
    </>
  );
}
