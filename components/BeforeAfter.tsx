"use client";

import Image from "next/image";
import { useState } from "react";

import { beforeAfter, sectionText } from "@/data/content";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/**
 * Before / after image comparison.
 *
 * The wipe is driven by a real <input type="range"> laid transparently over
 * the photos. That one decision gets us drag, tap, touch and full keyboard
 * control (arrows, Home, End) from the browser, with correct screen-reader
 * semantics — none of which we would get from a hand-rolled pointer handler.
 * The visible handle is purely decorative and ignores pointer events.
 */
export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <section id="before-after" className="section-y bg-white">
      <div className="container-x">
        <SectionHeading text={sectionText.beforeAfter} />

        <Reveal className="mx-auto max-w-4xl">
          <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-navy/10 shadow-lift">
            {/* ---------- After (the base layer) ---------- */}
            {/* TODO: replace with real Bilic before/after photos (see data/content.ts). */}
            <Image
              src={beforeAfter.after.image}
              alt={beforeAfter.after.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />

            {/* ---------- Before, clipped to the left of the handle ---------- */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={beforeAfter.before.image}
                alt={beforeAfter.before.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            {/* ---------- Corner labels ---------- */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/85 px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
            >
              Before
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 rounded-full bg-sky px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-white"
            >
              After
            </span>

            {/* ---------- The visible handle ---------- */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift"
              style={{ left: `${position}%` }}
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lift ring-4 ring-white/40">
                <Icon name="MoveHorizontal" className="h-5 w-5" />
              </span>
            </div>

            {/* ---------- The real control ---------- */}
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label="Reveal more of the before or the after photo"
              aria-valuetext={`${position}% before, ${100 - position}% after`}
              className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
            />
          </div>

          <p className="mt-4 text-center text-sm text-muted">
            Drag the handle — or focus it and use the arrow keys.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
