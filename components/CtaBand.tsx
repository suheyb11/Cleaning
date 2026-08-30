import Image from "next/image";

import { ctaBand, whatsappLink, whatsappMessages } from "@/data/content";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

/**
 * Full-width call-to-action band with a photo behind a navy overlay,
 * so the white text stays perfectly readable.
 */
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      {/* ---------- Background photo ---------- */}
      {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
      <Image
        src={ctaBand.image}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Navy overlay for contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy/90 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-sky/40"
      />

      <div className="container-x relative py-20 text-center sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold !text-white sm:text-4xl">
              {ctaBand.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {ctaBand.text}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={ctaBand.primary.href} variant="white" size="lg">
                {ctaBand.primary.label}
                <Icon name="ArrowRight" className="h-5 w-5" />
              </Button>

              {/* Opens WhatsApp with the booking message pre-filled.
                  TODO: set the real number in data/content.ts (WHATSAPP_NUMBER). */}
              <a
                href={whatsappLink(whatsappMessages.booking)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-7 py-3.5 font-heading text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                <Icon name="MessageCircle" className="h-5 w-5" />
                {ctaBand.secondary.label}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
