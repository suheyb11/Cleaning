import type { Metadata } from "next";
import Image from "next/image";

import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import StatsBand from "@/components/StatsBand";
import VisionValues from "@/components/VisionValues";
import WhyChoose from "@/components/WhyChoose";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { about, partnerships, site } from "@/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Bilic Cleaning Company is a professional cleaning and facility services company in Mogadishu, Somalia, serving residential, commercial, institutional and corporate clients.",
};

/** The four "at a glance" facts, shown as a light icon row (not boxes). */
const quickFacts = [
  {
    icon: "MapPin",
    title: "Where we work",
    text: `${site.location} · ${site.serviceArea}`,
  },
  { icon: "Sparkles", title: "What we do", text: site.subBrand },
  { icon: "BadgeCheck", title: "Our promise", text: site.promise },
  {
    icon: "Users",
    title: "Who we serve",
    text: "Residential, commercial, institutional and corporate clients.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={about.heading}
        subtitle={site.tagline}
      />

      {/* ---------------- Story: image + text ---------------- */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lift">
              {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
              <Image
                src={about.secondaryImage}
                alt={about.secondaryImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lg leading-relaxed text-ink">{about.intro}</p>

            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            {/* Light checklist — no box per item. */}
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {about.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Icon
                    name="CheckCircle2"
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                  />
                  <span className="text-ink">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-4 border-sky pl-5">
              <p className="font-heading font-semibold text-navy">
                What the name means
              </p>
              <p className="mt-1 text-muted">{site.nameMeaning}</p>
            </div>
          </Reveal>
        </div>

        {/* ---------- At a glance: light icon row, no boxes ---------- */}
        <div className="container-x mt-16 border-t border-navy/10 pt-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((fact, index) => (
              <Reveal key={fact.title} delay={index * 0.06} className="group">
                <AnimatedIcon
                  name={fact.icon}
                  delay={index * 0.06}
                  wrapperClassName="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                  className="h-6 w-6"
                />
                <h3 className="text-base font-semibold">{fact.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {fact.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VisionValues />
      <WhyChoose />
      <StatsBand />

      {/* ---------------- Partnerships: chips, not boxes ---------------- */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Work With Us"
            title={partnerships.heading}
            subtitle={partnerships.text}
          />

          <Reveal className="flex flex-wrap justify-center gap-2.5">
            {partnerships.partners.map((partner) => (
              <span
                key={partner}
                className="rounded-full bg-offwhite px-4 py-2 text-sm font-medium text-navy transition-colors duration-200 hover:bg-sky/10 hover:text-sky"
              >
                {partner}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
