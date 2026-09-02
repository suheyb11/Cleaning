import type { Metadata } from "next";

import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import StatsBand from "@/components/StatsBand";
import WhyChoose from "@/components/WhyChoose";
import { sectionText } from "@/data/content";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Why choose Bilic Cleaning Company: professional people, reliable service, quality results, flexible schedules and fair pricing in Mogadishu, Somalia.",
};

/**
 * Standalone "Why Us" page. It reuses the same <WhyChoose /> section that
 * appears on the home page (with its own heading hidden, since the page
 * banner already carries the title), plus the stats band and the shared
 * "Request a Free Quote" CTA.
 */
export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        eyebrow={sectionText.whyUs.eyebrow}
        title={sectionText.whyUs.title}
        subtitle={sectionText.whyUs.subtitle}
      />

      <WhyChoose showHeading={false} />
      <StatsBand />
      <CtaBand />
    </>
  );
}
