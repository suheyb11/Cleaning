"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import { contact, services, site } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/** The empty state of the form — also used to reset it after a send. */
const emptyForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: connect form to email/WhatsApp.
    // Options: a Next.js route handler that sends an email (Resend / Nodemailer),
    // a form service such as Formspree, or simply build a WhatsApp message and
    // open `${contact.whatsappHref}?text=...`.
    // For now the form is front-end only and just shows a success message.
    setSubmitted(true);
    setForm(emptyForm);
  }

  /** Shared styling for all form inputs. */
  const fieldClasses =
    "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-sky focus:outline-none";

  const labelClasses = "mb-1.5 block text-sm font-medium text-navy";

  return (
    <section id="contact" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Our Team"
          subtitle="Tell us about your space and the services you need. We will reply with a clear quotation based on the agreed scope of work."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ---------------- Contact details ---------------- */}
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-3xl bg-navy p-8 text-white shadow-soft sm:p-9">
              <h3 className="text-xl font-semibold !text-white">{site.name}</h3>
              <p className="mt-1 text-sm text-sky">{site.subBrand}</p>

              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex gap-4">
                  <AnimatedIcon
                    name="MapPin"
                    delay={0}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    className="h-5 w-5"
                  />
                  <div>
                    <p className="font-heading font-semibold !text-white">
                      Location
                    </p>
                    <p className="mt-0.5 text-white/75">
                      {contact.address}
                      <br />
                      {contact.addressLine2}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <AnimatedIcon
                    name="Phone"
                    delay={0.08}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    className="h-5 w-5"
                  />
                  <div>
                    <p className="font-heading font-semibold !text-white">
                      Phone
                    </p>
                    {/* TODO: replace the placeholder phone number in data/content.ts */}
                    <a
                      href={contact.phoneHref}
                      className="mt-0.5 block text-white/75 transition-colors hover:text-sky"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <AnimatedIcon
                    name="MessageCircle"
                    delay={0.16}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    className="h-5 w-5"
                  />
                  <div>
                    <p className="font-heading font-semibold !text-white">
                      WhatsApp
                    </p>
                    {/* TODO: replace the placeholder WhatsApp number in data/content.ts */}
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-white/75 transition-colors hover:text-sky"
                    >
                      {contact.whatsapp}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <AnimatedIcon
                    name="Mail"
                    delay={0.24}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    className="h-5 w-5"
                  />
                  <div>
                    <p className="font-heading font-semibold !text-white">
                      Email
                    </p>
                    {/* TODO: replace the placeholder email address in data/content.ts */}
                    <a
                      href={contact.emailHref}
                      className="mt-0.5 block break-all text-white/75 transition-colors hover:text-sky"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <AnimatedIcon
                    name="Clock"
                    delay={0.32}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    className="h-5 w-5"
                  />
                  <div>
                    <p className="font-heading font-semibold !text-white">
                      Availability
                    </p>
                    <p className="mt-0.5 text-white/75">{contact.hours}</p>
                  </div>
                </li>
              </ul>

              {/* ---------- Socials ---------- */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-sm font-medium text-white/75">
                  Follow us
                </p>
                <div className="flex gap-3">
                  {contact.socials.map((social) => (
                    // TODO: replace the "#" placeholder links in data/content.ts
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition-colors hover:bg-sky"
                    >
                      <Icon name={social.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------------- Quote form ---------------- */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <div className="h-full rounded-3xl border border-navy/10 bg-white p-8 shadow-soft sm:p-9">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ---------- Success message ---------- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col items-center justify-center py-10 text-center"
                  >
                    <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky/10 text-sky">
                      <Icon name="CheckCircle2" className="h-8 w-8" />
                    </span>
                    <h3 className="text-2xl font-semibold">Thank you!</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      Your request has been received. Our team will contact you
                      shortly to discuss your cleaning requirements and prepare
                      a quotation.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-sky px-6 py-3 font-heading text-sm font-semibold text-white shadow-soft transition-colors hover:bg-skyDark"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  /* ---------- The form ---------- */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          Full name <span className="text-sky">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={fieldClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClasses}>
                          Phone <span className="text-sky">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className={fieldClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={fieldClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className={labelClasses}>
                        Service needed <span className="text-sky">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={fieldClasses}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {services.map((service) => (
                          <option key={service.slug} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        Message <span className="text-sky">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your space: type of property, size, number of rooms, how often you need cleaning..."
                        className={`${fieldClasses} resize-y`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky px-7 py-3.5 font-heading text-base font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-skyDark hover:shadow-lift sm:w-auto"
                    >
                      <Icon name="Send" className="h-5 w-5" />
                      Request a Free Quote
                    </button>

                    <p className="text-xs text-muted">
                      Prefer to talk? Message us directly on{" "}
                      <a
                        href={contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-sky hover:underline"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
