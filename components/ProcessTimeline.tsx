"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { processSteps, sectionText } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/**
 * A single vertical timeline that always reads top-to-bottom in step order
 * (1 → 8), on every screen size.
 *
 * On desktop the steps alternate left/right of a center line. On mobile the
 * line moves to the left edge and every card stacks to its right — still the
 * same order, just no alternating. It is the same <ol> at both sizes
 * (Tailwind responsive classes just move the grid columns around), so the
 * step list is never duplicated in the DOM.
 */
/** `showHeading={false}` on the standalone /process page, where the page
 *  banner already carries the same title. */
export default function ProcessTimeline({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  // The line fills in with brand blue as the section scrolls through the
  // viewport — a subtle progress cue, not the main way the steps are read.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.7"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="section-y bg-offwhite">
      <div className="container-x">
        {showHeading && <SectionHeading text={sectionText.process} />}

        <ol
          ref={timelineRef}
          className="relative mx-auto max-w-3xl md:max-w-4xl"
        >
          {/* Faint full-length track. Positioned to line up with the badge
              column: flush left on mobile, centered on desktop. */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-1 h-[calc(100%-0.5rem)] w-px bg-sky/20 md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-5 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-sky md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: reduceMotion ? 1 : drawn }}
          />

          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[2.5rem_1fr] items-start gap-x-4 pb-10 last:pb-0 md:grid-cols-[1fr_2.5rem_1fr] md:items-center md:gap-x-6 md:pb-14"
              >
                {/* ---------- Numbered badge — always sits on the line ---------- */}
                <div className="relative col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <AnimatedIcon
                    name={step.icon}
                    delay={index * 0.08}
                    wrapperClassName="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white shadow-soft ring-4 ring-offwhite md:h-12 md:w-12"
                    className="h-5 w-5"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky font-heading text-[10px] font-bold text-white ring-2 ring-offwhite">
                    {index + 1}
                  </span>

                  {/* Short connector from the badge to its card (desktop only) */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 hidden h-px w-6 -translate-y-1/2 bg-sky/40 md:block ${
                      isLeft ? "right-full" : "left-full"
                    }`}
                  />
                </div>

                {/* ---------- Card — slides in from its side ---------- */}
                <Reveal
                  delay={index * 0.08}
                  y={0}
                  x={isLeft ? -24 : 24}
                  className={`row-start-1 col-start-2 ${
                    isLeft ? "md:col-start-1 md:text-right" : "md:col-start-3"
                  }`}
                >
                  <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:shadow-lift sm:p-6">
                    <span className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-1 text-base font-semibold sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
