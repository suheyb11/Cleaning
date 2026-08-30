import type { Metadata } from "next";
import Image from "next/image";

import CtaBand from "@/components/CtaBand";
import Industries from "@/components/Industries";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Residential, office, deep, post-construction, window, floor, carpet, restroom, janitorial and customised cleaning services in Mogadishu, Somalia.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Professional Cleaning & Facility Services"
        subtitle="Ten services covering everything from a single apartment to a full commercial facility. Every plan is arranged around your building, schedule and budget."
      />

      {/* ---------------- Quick jump chips ---------------- */}
      <section className="border-b border-navy/10 bg-offwhite py-8">
        <div className="container-x flex flex-wrap gap-2.5">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:text-sky"
            >
              <Icon name={service.icon} className="h-4 w-4 text-sky" />
              {service.title}
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Full service list ----------------
          Each service is an alternating "image + text" row rather than a
          card, and the sub-items are a light checklist rather than boxes. */}
      {services.map((service, index) => {
        const imageOnRight = index % 2 === 1;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 py-14 sm:py-16 ${
              index % 2 === 0 ? "bg-white" : "bg-offwhite"
            }`}
          >
            <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {/* ---------- Photo ---------- */}
              <Reveal className={imageOnRight ? "lg:order-2" : ""}>
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lift">
                  {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              {/* ---------- Text ---------- */}
              <Reveal delay={0.12} className="group">
                <div className="flex items-start gap-4">
                  <AnimatedIcon
                    name={service.icon}
                    wrapperClassName="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                    className="h-7 w-7"
                  />
                  <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
                    {service.title}
                  </h2>
                </div>

                <p className="mt-5 leading-relaxed text-muted">
                  {service.short}
                </p>

                <p className="mt-8 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                  {service.slug === "customized-cleaning"
                    ? "Plans are built around"
                    : "What is included"}
                </p>

                {/* Two-column checklist — icon + text on one line, no boxes. */}
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="CheckCircle2"
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                      />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}

      <Industries />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
