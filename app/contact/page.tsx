import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import Faq from "@/components/Faq";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact, mapEmbed, site } from "@/data/content";

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

      {/* ---------------- Where we work ---------------- */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where We Work"
            title="Our Service Area"
            subtitle={`${site.serviceArea}. If you are just outside the city, contact us anyway — we will tell you honestly whether we can reach you.`}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* ---------- The map ---------- */}
            <Reveal className="lg:col-span-2">
              {/* TODO: set exact location/pin — replace mapEmbed.src in
                  data/content.ts with the embed URL Google Maps gives you for
                  your actual address (Share → Embed a map). */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-navy/10 shadow-soft">
                <iframe
                  title={mapEmbed.title}
                  src={mapEmbed.src}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </Reveal>

            {/* ---------- Details beside it ---------- */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-navy/10 bg-offwhite p-7">
                <h3 className="text-lg font-semibold">{site.name}</h3>
                <p className="mt-1 text-sm text-muted">{site.subBrand}</p>

                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-heading font-semibold text-navy">
                      Address
                    </dt>
                    <dd className="mt-0.5 text-muted">
                      {contact.address}
                      <br />
                      {contact.addressLine2}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-heading font-semibold text-navy">
                      Phone
                    </dt>
                    {/* TODO: replace the placeholder phone number in data/content.ts */}
                    <dd className="mt-0.5">
                      <a
                        href={contact.phoneHref}
                        className="text-muted transition-colors hover:text-sky"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="font-heading font-semibold text-navy">
                      WhatsApp
                    </dt>
                    {/* TODO: replace the placeholder WhatsApp number in data/content.ts */}
                    <dd className="mt-0.5">
                      <a
                        href={contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-sky"
                      >
                        {contact.whatsapp}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="font-heading font-semibold text-navy">
                      Availability
                    </dt>
                    <dd className="mt-0.5 text-muted">{contact.hours}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <Faq />
    </>
  );
}
