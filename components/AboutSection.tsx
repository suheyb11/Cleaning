import Image from "next/image";

import { about, site } from "@/data/content";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

/**
 * Two-column "image + text" section.
 * The supporting points are a light checklist — deliberately NOT cards, so the
 * page does not become an endless grid of identical boxes.
 *
 * This section is intentionally static: no scroll reveal, no icon spring, no
 * hover zoom. It renders fully on the server and ships no JavaScript.
 */
export default function AboutSection() {
  return (
    <section id="about" className="section-y bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---------- Image side ---------- */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lift">
            {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover"
            />
          </div>

          {/* Small badge overlapping the photo */}
          <div className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl bg-navy px-5 py-4 shadow-lift sm:right-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky text-white">
              <Icon name="Sparkles" className="h-5 w-5" />
            </span>
            <span className="font-heading text-sm font-semibold leading-tight text-white">
              Professional People
              <span className="block text-xs font-normal text-white/70">
                Reliable service, quality results
              </span>
            </span>
          </div>
        </div>

        {/* ---------- Text side ---------- */}
        <div>
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sky">
            About Us
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            {about.heading}
          </h2>

          <p className="mt-5 leading-relaxed text-muted">{about.intro}</p>
          <p className="mt-4 leading-relaxed text-muted">
            {about.paragraphs[1]}
          </p>

          {/* Lightweight two-column checklist — no borders, no boxes. */}
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/about" size="lg">
              More About Us
              <Icon name="ArrowRight" className="h-5 w-5" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Browse Services
            </Button>
          </div>

          <p className="mt-6 text-sm italic text-muted">{site.nameMeaning}</p>
        </div>
      </div>
    </section>
  );
}
