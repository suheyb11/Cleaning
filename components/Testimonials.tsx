"use client";

import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { sectionText, testimonials } from "@/data/content";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const ROTATE_MS = 6000;
const MOBILE_QUERY = "(max-width: 767px)";

/** Five-star row. `rating` is 1–5. */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="Star"
          className={`h-4 w-4 ${
            i < rating ? "fill-sky text-sky" : "text-navy/20"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Social proof.
 *
 * There is exactly ONE list of quotes in the DOM. Desktop lays it out as a
 * three-column grid; mobile turns the same list into a scroll-snap carousel
 * that auto-advances. Rendering a separate mobile copy behind `md:hidden`
 * would read every quote twice to a screen reader and duplicate the content
 * for search engines — the same mistake the process timeline used to make.
 *
 * The carousel is native overflow scrolling, so swipe, momentum and keyboard
 * scrolling come from the browser rather than from a gesture library.
 */
export default function Testimonials() {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Don't rotate quotes nobody is looking at. Beyond being wasteful, rotating
  // off-screen used to leave a card scrolled out of the carousel before its
  // entrance animation had ever run — so it stayed invisible for good.
  const inView = useInView(listRef, { amount: 0.3 });

  // Only auto-rotate while the list is actually a carousel.
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const scrollTo = useCallback((next: number, smooth = true) => {
    const list = listRef.current;
    const card = list?.children[next] as HTMLElement | undefined;
    if (!list || !card) return;

    list.scrollTo({
      left: card.offsetLeft - list.offsetLeft,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Keep the dots in step with wherever the visitor has scrolled to.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onScroll = () => {
      const card = list.children[0] as HTMLElement | undefined;
      if (!card) return;
      setIndex(Math.round(list.scrollLeft / card.clientWidth));
    };

    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile || paused || !inView) return;

    const id = setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % testimonials.length;
        scrollTo(next);
        return next;
      });
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [isMobile, paused, inView, scrollTo]);

  const go = (next: number) => {
    setPaused(true); // the visitor has taken over
    const clamped = (next + testimonials.length) % testimonials.length;
    setIndex(clamped);
    scrollTo(clamped);
  };

  return (
    <section id="testimonials" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading text={sectionText.testimonials} />

        {/* One Reveal around the whole list, not one per card. A per-card
            reveal cannot fire for a card that is scrolled outside the
            carousel, which would leave that quote invisible. */}
        <Reveal>
          <ul
            ref={listRef}
            onPointerDown={() => setPaused(true)}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
          >
            {testimonials.map((item) => (
              <li
                key={item.quote}
                className="w-[85%] shrink-0 snap-start md:w-auto"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:shadow-lift sm:p-7">
                  <Icon
                    name="Quote"
                    className="mb-4 h-7 w-7 shrink-0 text-sky/30"
                  />

                  <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-6 border-t border-navy/10 pt-5">
                    <Stars rating={item.rating} />
                    <p className="mt-3 font-heading text-sm font-semibold text-navy">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{item.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Carousel controls (mobile only) ---------- */}
        <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy/15 bg-white text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.quote}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-sky" : "w-2 bg-navy/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy/15 bg-white text-navy transition-colors hover:border-sky hover:text-sky"
          >
            <Icon name="ChevronRight" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
