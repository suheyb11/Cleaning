"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { processSteps } from "@/data/content";
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
 * The SVG uses a fixed viewBox stretched to fill the container, so the HTML
 * cells can be placed with a plain CSS grid and still line up with the curve.
 * Keep GUTTER in sync with the `px-[7%]` padding on the grid wrapper.
 * ----------------------------------------------------------------------- */

const COLS = 4; // steps per row
const ROW_H = 290; // vertical space per row, in pixels
const VIEW_WIDTH = 1000; // viewBox width — arbitrary units, not pixels
const GUTTER = 70; // clear space each side, reserved for the U-turns
const NODE_Y = 58; // y of the line (and the icon centres) within a row

// The U-turns run out into the gutters: `TURN_*` is where the horizontal
// stretch ends, `CTRL_*` is the bezier control point that rounds it off.
const TURN_R = VIEW_WIDTH - GUTTER - 5;
const TURN_L = GUTTER + 5;
const CTRL_R = VIEW_WIDTH - 10;
const CTRL_L = 10;

const COL_WIDTH = (VIEW_WIDTH - GUTTER * 2) / COLS;

/** Horizontal centre of column `col`, in viewBox units. */
function colCentre(col: number) {
  return GUTTER + COL_WIDTH * (col + 0.5);
}

/** Which grid cell step `index` occupies, and where it sits on the curve. */
function nodePosition(index: number) {
  const row = Math.floor(index / COLS);
  const slot = index % COLS;
  // Odd rows run backwards, which is what makes the layout snake.
  const col = row % 2 === 0 ? slot : COLS - 1 - slot;

  return { row, col, x: colCentre(col), y: NODE_Y + row * ROW_H };
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

/** The card shown for a single step. Shared by the mobile and desktop layouts. */
function StepCard({
  step,
  index,
  centred = false,
  className = "",
}: {
  step: (typeof processSteps)[number];
  index: number;
  centred?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-navy/10 bg-white p-4 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-sky/30 group-hover:shadow-lift sm:p-5 ${
        centred ? "text-center" : ""
      } ${className}`}
    >
      <span className="font-heading text-xs font-semibold uppercase tracking-wide text-sky">
        Step {index + 1}
      </span>
      <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
    </div>
  );
}

/** The numbered icon bubble that sits on the line. */
function StepNode({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  return (
    <div className="relative">
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
  );
}

export default function ProcessTimeline() {
  const snakeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The curve draws itself in as the section scrolls through the viewport.
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
  const totalHeight = rows * ROW_H;
  const snakePath = buildSnakePath(processSteps.length);

  return (
    <section id="process" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Service Process"
          subtitle="Eight clear steps, from your first message to the feedback that helps us improve."
        />

        {/* ================= Desktop: the snake chart ================= */}
        <div
          ref={snakeRef}
          className="relative mx-auto hidden w-full max-w-5xl lg:block"
          style={{ height: totalHeight }}
        >
          {/* ---------- The curve itself ---------- */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${VIEW_WIDTH} ${totalHeight}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
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

          {/* ---------- Steps laid out on a grid that matches the curve ---------- */}
          {/* px-[7%] mirrors GUTTER, and the columns are gapless so their
              centres land exactly on the nodes of the path above. */}
          <ol
            className="absolute inset-0 grid grid-cols-4 px-[7%]"
            style={{ gridTemplateRows: `repeat(${rows}, ${ROW_H}px)` }}
          >
            {processSteps.map((step, index) => {
              const { row, col } = nodePosition(index);

              return (
                <li
                  key={step.title}
                  className="group flex flex-col items-center px-3"
                  style={{
                    gridColumn: col + 1,
                    gridRow: row + 1,
                    paddingTop: NODE_Y - 28, // centres the 56px bubble on the line
                  }}
                >
                  <StepNode step={step} index={index} />

                  <Reveal delay={index * 0.05} y={18} className="mt-4 flex w-full flex-1">
                    <StepCard step={step} index={index} centred className="w-full" />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ================= Mobile / tablet: simple straight line ================= */}
        <div className="relative mx-auto max-w-2xl lg:hidden">
          <div
            aria-hidden="true"
            className="absolute left-7 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-sky via-sky/40 to-transparent"
          />

          <ol className="space-y-6">
            {processSteps.map((step, index) => (
              <li key={step.title} className="group">
                <Reveal delay={index * 0.05} y={20}>
                  <div className="grid grid-cols-[3.5rem_1fr] items-start gap-x-4">
                    <div className="flex justify-center">
                      <StepNode step={step} index={index} />
                    </div>
                    <StepCard step={step} index={index} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
