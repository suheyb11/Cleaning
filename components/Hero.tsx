"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { hero, heroText, site, whatsappLink, whatsappMessages } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Icon from "./ui/Icon";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // One shared "fade + slide up" used for each hero element, staggered by index.
  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* ---------- Gradient mesh ----------
          Three soft radial pools of colour over flat navy. This reads as a
          crafted background rather than the stock 135° linear gradient that
          every template ships with. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(60rem 40rem at 78% 8%, rgba(42,167,224,0.42), transparent 60%)",
            "radial-gradient(45rem 35rem at 8% 95%, rgba(42,167,224,0.22), transparent 62%)",
            "radial-gradient(38rem 30rem at 45% 40%, rgba(18,58,99,0.85), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ---------- Fine grid, for texture ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ---------- Floating accent shapes ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl animate-float" />
        <div className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float-slow" />
        <div className="absolute right-[12%] top-24 h-16 w-16 rounded-full border border-white/25 animate-float-slow" />
        <div className="absolute left-[8%] bottom-24 h-10 w-10 rounded-full border border-white/20 animate-float" />
      </div>

      {/* ---------- Continuously floating accent icons ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <AnimatedIcon
          name="Droplets"
          float
          delay={0.6}
          wrapperClassName="absolute left-[3%] top-1/3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-sky backdrop-blur-sm"
          className="h-7 w-7"
        />
        <AnimatedIcon
          name="Sparkles"
          float
          delay={1.1}
          wrapperClassName="absolute bottom-28 right-[6%] flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm"
          className="h-6 w-6"
        />
      </div>

      <div className="container-x relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* ---------- Text column ---------- */}
        <div className="lg:col-span-7">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:text-sm"
          >
            <Icon name="Sparkles" className="h-4 w-4 text-sky" />
            {heroText.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="max-w-2xl text-4xl font-semibold !text-white sm:text-5xl lg:text-[3.4rem]"
          >
            {heroText.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {heroText.subtext}
          </motion.p>

          {/* ---------- Buttons ---------- */}
          <motion.div
            {...fadeUp(0.35)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky px-7 py-3.5 font-heading text-base font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:bg-skyDark"
            >
              {heroText.primaryCta}
              <Icon name="ArrowRight" className="h-5 w-5" />
            </Link>

            {/* TODO: set the real WhatsApp number in data/content.ts (WHATSAPP_NUMBER). */}
            <a
              href={whatsappLink(whatsappMessages.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-7 py-3.5 font-heading text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              {heroText.secondaryCta}
            </a>
          </motion.div>

          {/* ---------- Trust row ---------- */}
          <motion.p
            {...fadeUp(0.45)}
            className="mt-8 text-sm font-medium text-sky"
          >
            {heroText.trustRow}
          </motion.p>

          {/* ---------- Small trust points ---------- */}
          <motion.ul
            {...fadeUp(0.5)}
            className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/80"
          >
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="CheckCircle2" className="h-4 w-4 text-sky" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- Visual column ---------- */}
        <motion.div {...fadeUp(0.3)} className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 shadow-lift">
            {/* TODO: replace with a real Bilic Cleaning photo (see data/content.ts). */}
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-cover"
            />

            {/* Navy overlay so the caption stays readable over any photo. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/10"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 text-center">
              <p className="font-heading text-lg font-semibold text-white">
                {site.tagline}
              </p>
              <p className="mt-1 text-sm text-white/80">{site.serviceArea}</p>
            </div>
          </div>

          {/* Small floating badge over the panel */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-white px-5 py-3 shadow-lift"
          >
            <Icon name="ShieldCheck" className="h-5 w-5 text-sky" />
            <span className="font-heading text-sm font-semibold text-navy">
              Trusted &amp; Professional
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- Soft wave divider into the next section ---------- */}
      <div aria-hidden="true" className="relative -mb-px">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-14 w-full sm:h-20"
        >
          {/* Fill matches the background of the section that follows the hero. */}
          <path
            fill="#FFFFFF"
            d="M0,64 C240,96 480,16 720,32 C960,48 1200,96 1440,64 L1440,90 L0,90 Z"
          />
        </svg>
      </div>
    </section>
  );
}
