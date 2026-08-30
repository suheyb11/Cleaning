import Image from "next/image";

import { industries } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/**
 * Four industry groups. The group itself is a card, but the sub-items are
 * short keywords so they are shown as light chips rather than one box each.
 */
export default function Industries() {
  return (
    <section id="industries" className="section-y bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Who We Serve"
          title="Industries We Serve"
          subtitle="From family homes to hotels, schools and managed properties — we adapt our service to the type of space you run."
        />

        <div className="grid gap-7 md:grid-cols-2">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} delay={index * 0.08}>
              <div className="group h-full overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift">
                {/* ---------- Image banner with the title on top ---------- */}
                <div className="relative aspect-[16/7] w-full overflow-hidden">
                  {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20"
                  />

                  <div className="absolute inset-0 flex items-center gap-4 p-6">
                    <AnimatedIcon
                      name={industry.icon}
                      delay={index * 0.08}
                      wrapperClassName="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky text-white shadow-soft"
                      className="h-6 w-6"
                    />
                    <h3 className="text-xl font-semibold !text-white">
                      {industry.title}
                    </h3>
                  </div>
                </div>

                {/* ---------- Chips ---------- */}
                <div className="flex flex-wrap gap-2 p-6">
                  {industry.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-offwhite px-3.5 py-1.5 text-xs font-medium text-navy transition-colors duration-300 group-hover:bg-sky/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
