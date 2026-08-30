"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { contact, faqs, sectionText, whatsappLink, whatsappMessages } from "@/data/content";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Faq() {
  const reduceMotion = useReducedMotion();
  // Only one panel open at a time; `null` means everything is closed.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y bg-white">
      <div className="container-x">
        <SectionHeading text={sectionText.faq} />

        <div className="mx-auto max-w-3xl">
          <ul className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <li key={item.question}>
                  <Reveal delay={index * 0.04} y={14}>
                    <div
                      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                        isOpen
                          ? "border-sky/40 shadow-soft"
                          : "border-navy/10 hover:border-sky/25"
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : index)}
                          className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                        >
                          <span className="font-heading text-base font-semibold text-navy">
                            {item.question}
                          </span>

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                              isOpen
                                ? "rotate-180 bg-sky text-white"
                                : "bg-sky/10 text-navy"
                            }`}
                          >
                            <Icon name="ChevronDown" className="h-4 w-4" />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={
                              reduceMotion ? false : { height: 0, opacity: 0 }
                            }
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                              reduceMotion
                                ? undefined
                                : { height: 0, opacity: 0 }
                            }
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* ---------- Still stuck? ---------- */}
          <Reveal delay={0.1} className="mt-8 text-center">
            <p className="text-sm text-muted">
              Still have a question?{" "}
              <a
                href={whatsappLink(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky hover:underline"
              >
                Ask us on WhatsApp
              </a>{" "}
              or{" "}
              <a
                href={contact.emailHref}
                className="font-semibold text-sky hover:underline"
              >
                send an email
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
