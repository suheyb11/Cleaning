"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { processSteps, sectionText } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/* --------------------------------------------------------------------------
 * Snake chart maths (desktop only)
 *
 * The steps are laid out boustrophedon-style: the first row reads left to
 * right, the next row reads right to left, and so on. A single continuous
 * line threads through every step and U-turns in the side gutters, so the
 * whole process reads as one unbroken path.
 *
 * IMPORTANT: there is exactly ONE <ol> on the page. Mobile and desktop are the
 * same list restyled by Tailwind breakpoints — never two copies with one of
 * them hidden, which would read every step twice to a screen reader and
 * duplicate the content for search engines.
 *
 * Keep GUTTER in sync with the `lg:px-[7%]` padding on the list, and ROW_H in
 * sync with the `lg:h-[290px]` on each item.
 * ----------------------------------------------------------------------- */

const COLS = 4; // steps per row on desktop
const ROW_H = 290; // must match `lg:h-[290px]` below
const VIEW_WIDTH = 1000; // viewBox width — arbitrary units, not pixels
const GUTTER = 70; // must match `lg:px-[7%]` below
const NODE_Y = 58; // y of the line (and the icon centres) within a row

// The U-turns run out into the gutters: `TURN_*` is where the horizontal
// stretch ends, `CTRL_*` is the bezier control point that rounds it off.
const TURN_R = VIEW_WIDTH - GUTTER - 5;
const TURN_L = GUTTER + 5;
const CTRL_R = VIEW_WIDTH - 10;
const CTRL_L = 10;

const COL_WIDTH = (VIEW_WIDTH - GUTTER * 2) / COLS;

// Written out in full so Tailwind can see the class names when it scans this
// file — building them with a template string would leave them out of the CSS.
const COL_START = [
  "lg:col-start-1",
  "lg:col-start-2",
  "lg:col-start-3",
  "lg:col-start-4",
];
const ROW_START = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3"];

/** Horizontal centre of column `col`, in viewBox units. */
function colCentre(col: number) {
  return GUTTER + COL_WIDTH * (col + 0.5);
}

/** Which grid cell step `index` occupies on desktop. */
function nodePosition(index: number) {
  const row = Math.floor(index / COLS);
  const slot = index % COLS;
  // Odd rows run backwards, which is what makes the layout snake.
  const col = row % 2 === 0 ? slot : COLS - 1 - slot;

  return { row, col };
}

/** Builds the snaking path that links every step together. */
function buildSnakePath(count: number) {
  const rows = Math.ceil(count / COLS);

  const segments = Array.from({ length: rows }, (_, row) => {
    const rightwards = row % 2 === 0;
    const filled = Math.min(COLS, count - row * COLS);

    // First and last node of this row *in reading order*.
    const firstNodeX = colCentre(rightwards ? 0 : COLS - 1);
    const lastNodeX = colCentre(rightwards ? filled - 1 : COLS - filled);

    return {
      y: NODE_Y + row * ROW_H,
      // The very first row starts on a node; later rows start at a U-turn.
      startX: row === 0 ? firstNodeX : rightwards ? TURN_L : TURN_R,
      // The last row stops on a node; earlier rows run out to a U-turn.
      endX: row === rows - 1 ? lastNodeX : rightwards ? TURN_R : TURN_L,
      turnsRight: rightwards,
    };
  });

  let d = `M ${segments[0].startX} ${segments[0].y}`;

  segments.forEach((segment, row) => {
    d += ` L ${segment.endX} ${segment.y}`;

    const next = segments[row + 1];
    if (!next) return;

    // Both control points share an x out in the gutter, giving horizontal
    // tangents at each end and therefore a smooth, rounded U-turn.
    const cx = segment.turnsRight ? CTRL_R : CTRL_L;
    d += ` C ${cx} ${segment.y}, ${cx} ${next.y}, ${next.startX} ${next.y}`;
  });

  return d;
}

export default function ProcessTimeline() {
  const snakeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The curve draws itself in as the section scrolls through the viewport.
  // The target is always rendered (never `display: none`), otherwise framer
  // cannot measure it and warns about the container's position.
  const { scrollYProgress } = useScroll({
    target: snakeRef,
    offset: ["start 0.85", "end 0.65"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const rows = Math.ceil(processSteps.length / COLS);
  const snakePath = buildSnakePath(processSteps.length);

  return (
    <section id="process" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading text={sectionText.process} />

        <div
          ref={snakeRef}
          className="relative mx-auto w-full max-w-2xl lg:max-w-5xl"
        >
          {/* ---------- Desktop: the snake curve ---------- */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${VIEW_WIDTH} ${rows * ROW_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {/* Faint track showing the whole path */}
            <path
              d={snakePath}
              fill="none"
              stroke="#0B2545"
              strokeOpacity={0.12}
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* The light-blue snake that fills in on scroll */}
            <motion.path
              d={snakePath}
              fill="none"
              stroke="#2AA7E0"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduceMotion ? 1 : drawn }}
            />
          </svg>

          {/* ---------- Mobile / tablet: the straight spine ---------- */}
          <div
            aria-hidden="true"
            className="absolute left-7 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-sky via-sky/40 to-transparent lg:hidden"
          />

          {/* ---------- The one and only step list ---------- */}
          <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-0 lg:px-[7%]">
            {processSteps.map((step, index) => {
              const { row, col } = nodePosition(index);

              return (
                <li
                  key={step.title}
                  className={`group flex gap-4 lg:h-[290px] lg:flex-col lg:items-center lg:gap-0 lg:px-3 lg:pt-[30px] ${COL_START[col]} ${ROW_START[row]}`}
                >
                  {/* Numbered icon bubble, centred on the curve at lg */}
                  <div className="relative shrink-0">
                    <AnimatedIcon
                      name={step.icon}
                      delay={index * 0.08}
                      wrapperClassName="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-soft ring-4 ring-offwhite"
                      className="h-6 w-6"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-sky font-heading text-[11px] font-bold text-white ring-2 ring-offwhite">
                      {index + 1}
                    </span>
                  </div>

                  <Reveal
                    delay={index * 0.05}
                    y={18}
                    className="flex min-w-0 flex-1 lg:mt-4 lg:w-full"
                  >
                    <div className="w-full rounded-2xl border border-navy/10 bg-white p-4 text-left shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sky/30 group-hover:shadow-lift sm:p-5 lg:text-center">
                      <span className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
                        Step {index + 1}
                      </span>
                      <h3 className="mt-1 text-base font-semibold">
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
      </div>
    </section>
  );
}
