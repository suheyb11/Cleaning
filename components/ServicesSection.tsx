import Image from "next/image";
import Link from "next/link";

import { services } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function ServicesSection() {
  return (
    <section id="services" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Cleaning Services"
          subtitle="Ten professional services covering homes, offices, institutions and construction projects — delivered by a reliable team with attention to detail."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            // A small staggered delay makes the grid appear row by row.
            <Reveal key={service.slug} delay={index * 0.06}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift"
                aria-label={`${service.title} — see full details`}
              >
                {/* ---------- Thumbnail ---------- */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Navy tint keeps the floating icon badge readable. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent"
                  />

                  <AnimatedIcon
                    name={service.icon}
                    delay={index * 0.06}
                    wrapperClassName="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy shadow-soft transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                    className="h-6 w-6"
                  />
                </div>

                {/* ---------- Text ---------- */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.short}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-sky">
                    See what&apos;s included
                    <Icon
                      name="ArrowRight"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <Button href="/services" variant="navy" size="lg">
            View All Services
            <Icon name="ArrowRight" className="h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
