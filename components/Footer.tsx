import Link from "next/link";

import { contact, navLinks, services, site } from "@/data/content";
import Icon from "./ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/75">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* ---------- Brand ---------- */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky text-white">
              <Icon name="Droplets" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-semibold text-white">
                BILIC
              </span>
              <span className="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-sky">
                Cleaning Company
              </span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed">{site.subBrand}</p>
          <p className="mt-3 text-sm italic text-sky">
            &ldquo;{site.tagline}&rdquo;
          </p>
          <p className="mt-4 text-sm leading-relaxed">{site.promise}</p>
        </div>

        {/* ---------- Quick links ---------- */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] !text-white">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-sky"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Services ---------- */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] !text-white">
            Our Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="transition-colors hover:text-sky"
                >
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="font-semibold text-sky transition-colors hover:text-white"
              >
                View all services →
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------- Contact ---------- */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] !text-white">
            Get in Touch
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3">
              <Icon name="MapPin" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              <span>
                {contact.address}
                <br />
                {contact.addressLine2}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="Phone" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              <a href={contact.phoneHref} className="hover:text-sky">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon
                name="MessageCircle"
                className="mt-0.5 h-4 w-4 shrink-0 text-sky"
              />
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky"
              >
                {contact.whatsapp}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="Mail" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              <a href={contact.emailHref} className="break-all hover:text-sky">
                {contact.email}
              </a>
            </li>
          </ul>

          {/* ---------- Socials ---------- */}
          <div className="mt-5 flex gap-3">
            {contact.socials.map((social) => (
              // TODO: replace the "#" placeholder links in data/content.ts
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-sky"
              >
                <Icon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-center text-xs sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.nameMeaning}</p>
        </div>
      </div>
    </footer>
  );
}
