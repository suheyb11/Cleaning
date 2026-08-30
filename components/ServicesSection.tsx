import Image from "next/image";
import Link from "next/link";

import { sectionText, services } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function ServicesSection() {
  return (
    <section id="services" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading text={sectionText.services} />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            // A small staggered delay makes the grid appear row by row.
            <Reveal key={service.slug} delay={index * 0.06} className="h-full">
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift"
                aria-label={`${service.title} — see full details`}
              >
                {/* ---------- Thumbnail ----------
                    `overflow-hidden` lives on the image, not on the card, so
                    the icon badge below can hang over the image's bottom edge
                    without being clipped while the zoom stays inside its box. */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
                  {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Slight navy tint so the photo settles behind the badge. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/45 via-navy/5 to-transparent"
                  />
                </div>

                {/* ---------- Text ----------
                    No top padding: the badge's -mt-7 is what positions it, so
                    exactly half of its 56px sits over the photo. */}
                <div className="flex flex-1 flex-col px-6 pb-6">
                  <AnimatedIcon
                    name={service.icon}
                    delay={index * 0.06}
                    // `relative z-10` is load-bearing: the thumbnail above is
                    // position:relative, so it paints over later in-flow
                    // siblings. Without its own stacking context the badge
                    // sits in front only while framer's entrance transform is
                    // still applied, then drops behind the photo.
                    wrapperClassName="relative z-10 -mt-7 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-soft ring-4 ring-white transition-colors duration-300 group-hover:bg-sky"
                    className="h-6 w-6"
                  />

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
