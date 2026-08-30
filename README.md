# Bilic Cleaning Company — Website

A modern, animated marketing website for **Bilic Cleaning Company**, a professional cleaning & facility services business in Mogadishu, Somalia.

> _Clean Spaces. Better Living. Better Business._

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react
No database, no backend, no login — every page is static and fast.

---

## ⚠️ 0. BEFORE YOU GO LIVE — the replace-me checklist

**Nothing on this list is real yet.** Every item is a placeholder and every one is
marked with a `// TODO:` or `[Insert ...]` in the code. Work top to bottom.

| # | What | Where | Notes |
| - | ---- | ----- | ----- |
| 1 | **Phone number** | `data/content.ts` → `contact.phone` and `contact.phoneHref` | Two places: the display text and the `tel:` link. Use international format for the link (`tel:+252…`). |
| 2 | **WhatsApp number** | `data/content.ts` → `WHATSAPP_NUMBER` | **One value drives every WhatsApp link on the site** (floating button, hero, CTA band, FAQ, contact panel). Digits only, country code first, no `+`, spaces or dashes — e.g. `252612345678`. Also update `contact.whatsapp` for the display text. |
| 3 | **Email address** | `data/content.ts` → `contact.email` and `contact.emailHref` | Display text and the `mailto:` link. |
| 4 | **Facebook link** | `data/content.ts` → `contact.socials[0].href` | Currently `#`. Full URL. |
| 5 | **Instagram link** | `data/content.ts` → `contact.socials[1].href` | Currently `#`. Full URL. |
| 6 | **og:url / domain** | `data/content.ts` → `site.url` | Currently `https://bilic-cleaning.example.com`. This feeds `metadataBase`, Open Graph and Twitter cards — every social preview is wrong until you change it. |
| 7 | **Logo file** | `public/logo.svg` (add it), then `components/Navbar.tsx` + `components/Footer.tsx` | Both files currently show a text mark. See §3. |
| 8 | **Favicon** | `public/favicon.svg` | Placeholder droplet tile. |
| 9 | **All 18 photos** | `data/content.ts` | Free Unsplash / Pexels stock. See the photo table in §4. |
| 10 | **Before / after photos** | `data/content.ts` → `beforeAfter.before` / `beforeAfter.after` | Two unrelated stock rooms right now. Use the **same room, same angle, same lighting** or the slider looks dishonest. |
| 11 | **Testimonials** | `data/content.ts` → `testimonials` | Three realistic placeholders with `[Insert Client Name]`. **Do not publish invented reviews as real** — get permission and use real quotes. |
| 12 | **Map pin** | `data/content.ts` → `mapEmbed.src` | Currently a general Mogadishu view. Google Maps → search your address → Share → **Embed a map** → copy the `src`. |
| 13 | **Contact form delivery** | `components/ContactSection.tsx` | Front-end only — submitting sends nothing anywhere. See §4. |
| 14 | **Somali translations** | `data/content.ts` → `sectionText`, `heroText` | Navbar, hero and section headings are translated. Body copy is not. See §9. |

---

## 1. Running the site

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other commands:

| Command         | What it does                                 |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server (hot reload)    |
| `npm run build` | Build the production site                    |
| `npm start`     | Run the built production site                |
| `npm run lint`  | Check the code with ESLint                   |

---

## 2. Where to edit the content

**Almost everything you will want to change lives in one file:**

```
data/content.ts
```

That file holds, clearly labelled and in order:

1. Brand details + contact details (phone, WhatsApp, email, socials)
2. Navigation links
3. Hero text and buttons
4. About text
5. The 10 services (title, short description, icon, full item list)
6. "Why Choose Bilic" (7 cards)
7. The 8-step service process
8. Industries we serve (4 groups)
9. Vision, mission and the 7 core values
10. Stats / trust band numbers
11. Partnerships list
12. Call-to-action band text
13. Trust band — the 4 promises under the hero
14. Testimonials (3 client quotes)
15. Before & after photos
16. FAQ (6 questions and answers)
17. Map embed for the contact page
18. Language strings — `heroText`, `uiText`, `sectionText` (English + Somali)

Change the text there and it updates everywhere on the site — home page, inner pages and footer.

### Icons

Each item in `data/content.ts` has an `icon` field, which is just a name like `"Sparkles"` or `"HardHat"`.
The list of allowed names lives in `components/ui/Icon.tsx`. To use a new icon, import it from `lucide-react` and add it to the `icons` object in that file. (An unknown name safely falls back to a sparkle icon.)

Icon **motion** is defined in exactly one place — `components/ui/AnimatedIcon.tsx`. Every animated icon on the site uses it, so the behaviour is consistent:

- **Entrance** — springs from 0.6 → 1 scale the first time it scrolls into view, staggered across a grid via the `delay` prop.
- **Hover** — when the parent card (any element with the `group` class) is hovered, the icon scales up 1.1 and tilts, and its badge shifts from navy to light blue.
- **Float** — pass `float` for a slow, continuous up-and-down drift (used for the two accent icons in the hero).
- All of it is disabled automatically for anyone with `prefers-reduced-motion` enabled.

### Photos

Every `image` field in `data/content.ts` is built by a small `unsplash()` helper at the top of the file. To use your own photo instead, drop the file into `public/images/` and set the value to a plain path:

```ts
// before (placeholder)
image: unsplash("photo-1524758631624-e2822e304c36"),
// after (your photo)
image: "/images/residential-cleaning.jpg",
```

Nothing else needs to change — `next/image` handles both.

### Layout rule: cards vs. lists

To stop the page becoming an endless grid of identical boxes, the site follows one rule:

- **Cards/boxes** are only for *top-level* items — the 10 services, the 7 "Why Choose" features, the 4 industry groups and the 7 core values.
- **Long sub-lists** (what's included in a service, the About points) are rendered as a light two-column checklist — a small blue tick plus text, no border, no shadow.
- **Short keyword lists** (industry sub-items, partnership types) are rendered as small rounded chips.

Sections also alternate deliberately: white → soft off-white → navy, and split image/text → card grid → timeline → image banners, so no two neighbouring sections look the same.

---

## 3. Where to add the logo

Right now the logo is a **text mark** ("BILIC / Cleaning Company") next to a droplet icon. It appears in two places:

- `components/Navbar.tsx` — look for the `// TODO: replace this text mark with the real Bilic logo` comment
- `components/Footer.tsx` — same mark, repeated in the footer

To use the real logo:

1. Drop the file into `public/` (e.g. `public/logo.svg` or `public/logo.png`).
2. Replace the text mark with:
   ```tsx
   import Image from "next/image";
   <Image src="/logo.svg" alt="Bilic Cleaning Company" width={150} height={40} priority />
   ```

**Favicon:** `public/favicon.svg` is a placeholder (navy tile + light-blue droplet). Replace it with the real logo mark and update `icons` in `app/layout.tsx` if you change the filename.

---

## 4. Placeholders you still need to fill in

All of these are marked with `// TODO:` comments in the code. They are **all** in `data/content.ts` unless noted.

| Placeholder                | Where                                   | What to put                                              |
| -------------------------- | --------------------------------------- | -------------------------------------------------------- |
| `[Insert Phone Number]`    | `contact.phone`                         | The display phone number                                  |
| `tel:+000000000000`        | `contact.phoneHref`                     | Same number in international format, e.g. `tel:+252...`   |
| `[Insert WhatsApp Number]` | `contact.whatsapp`                      | The display WhatsApp number                               |
| `"000000000000"`           | `WHATSAPP_NUMBER`                       | **The one that matters** — drives every WhatsApp link. Digits only, no `+`/spaces |
| `[Insert Email Address]`   | `contact.email`                         | The display email address                                 |
| `mailto:info@example.com`  | `contact.emailHref`                     | The same email address                                    |
| `[Insert Facebook Link]`   | `contact.socials[0].href`               | Full Facebook page URL                                    |
| `[Insert Instagram Link]`  | `contact.socials[1].href`               | Full Instagram profile URL                                |
| `site.url`                 | `site.url`                              | The real domain, once deployed (og:url / SEO / Open Graph) |
| `[Insert Client Name]`     | `testimonials[n].name` / `.role`        | Real, permitted client quotes only                        |
| `mapEmbed.src`             | `mapEmbed.src`                          | Google Maps embed URL for your exact address              |
| Logo                       | `components/Navbar.tsx`, `Footer.tsx`   | The real Bilic logo                                       |
| Favicon                    | `public/favicon.svg`                    | The real logo mark                                        |

### WhatsApp links

Every WhatsApp entry point opens the chat with a message already typed in, so the
client does not have to think of an opening line. It is all driven by two things
in `data/content.ts`:

```ts
export const WHATSAPP_NUMBER = "000000000000";   // ← change this one value

export const whatsappMessages = {
  general: "Hello Bilic Cleaning, I'd like a quote for a cleaning service.",
  hero:    "Hello Bilic Cleaning, I'd like a free quote for cleaning my ",
  booking: "Hello Bilic Cleaning, I'd like to book a cleaning service for ",
  quote:   "Hello Bilic Cleaning, I'd like a free quotation. Property type, size and how often: ",
};

whatsappLink(whatsappMessages.booking);  // → https://wa.me/<number>?text=<encoded>
```

Used by the floating button, the hero's second button, the "Book a Cleaning
Service" CTA, the FAQ footer and the contact panel.

### Photo placeholders

**All 17 photos on the site are free Unsplash stock images used as placeholders.** Every one is marked `// TODO: replace with a real Bilic Cleaning photo` and every one lives in `data/content.ts`.

| # | Content field                | Where it shows                                | Photo you need                              |
| - | ---------------------------- | --------------------------------------------- | ------------------------------------------- |
| 1 | `hero.image`                 | Home hero, right-hand panel                   | A Bilic cleaner at work                     |
| 2 | `about.image`                | Home "About" split section                    | A clean office or home you have cleaned     |
| 3 | `about.secondaryImage`       | `/about` page, top section                    | Your team cleaning                          |
| 4–13 | `services[n].image`        | Service cards (home) + service rows (`/services`) | One photo per service — see the `imageAlt` text next to each for what the shot should show |
| 14–17 | `industries[n].image`     | "Industries We Serve" banners                 | Residential / commercial / institutional / property |
| 18 | `ctaBand.image`             | "Request a Free Quote" band background        | A wide shot of a clean space                |
| 19 | `beforeAfter.before.image`  | "Before & After" slider, left of the handle   | **The messy room, before you started**      |
| 20 | `beforeAfter.after.image`   | "Before & After" slider, right of the handle  | **The same room, same angle, after**        |

> The two before/after photos are the only pair where the shot itself matters:
> if the angle or lighting changes between them, the wipe stops reading as the
> same room and the section undermines the trust it is meant to build.

Unsplash **and Pexels** are allowed in `next.config.mjs` via `remotePatterns`. Once every photo is a local file in `public/images/`, you can delete both entries.

**Verify any stock URL you swap in.** Pexels serves a small ~12 KB PNG placeholder for IDs that do not exist rather than a 404, so a broken ID looks like a working image until you view it. A real photo at `w=1200` is roughly 100–250 KB.

### Contact form

The quote form in `components/ContactSection.tsx` is **front-end only** for now — submitting it shows a success message and nothing is sent anywhere. Look for:

```ts
// TODO: connect form to email/WhatsApp.
```

Three easy ways to wire it up later:

- **WhatsApp** — build a message string and open `${contact.whatsappHref}?text=${encodeURIComponent(...)}`
- **Email** — add a Next.js route handler (`app/api/contact/route.ts`) using Resend or Nodemailer
- **A form service** — point the `<form>` at Formspree / Getform, no backend code needed

---

## 5. Project structure

```
app/
  layout.tsx        Fonts, metadata, Navbar, Footer, floating WhatsApp button
  page.tsx          Home page — composes the sections in order
  about/page.tsx    About Us
  services/page.tsx Full services listing (with anchors per service)
  contact/page.tsx  Contact page
  not-found.tsx     404 page
  globals.css       Tailwind + base styles + reduced-motion rules

components/
  Navbar.tsx          Sticky nav, blur-on-scroll, active-link underline, EN/SO toggle
  Footer.tsx          Navy footer with links + contact details
  Hero.tsx            Gradient-mesh hero, floating shapes, trust row, wave divider
  TrustBand.tsx       Slim 4-promise band under the hero
  AboutSection.tsx    Split image / text + light checklist (static, no motion)
  PageHeader.tsx      Navy banner used at the top of inner pages
  ServicesSection.tsx 10 service cards, each with a photo thumbnail
  BeforeAfter.tsx     Draggable before/after comparison slider
  WhyChoose.tsx       7 reason cards
  ProcessTimeline.tsx 8-step snake chart — ONE list, restyled per breakpoint
  Testimonials.tsx    3 client quotes; auto-rotating carousel on mobile
  Industries.tsx      4 image banners + keyword chips
  VisionValues.tsx    Vision, mission + 7 core values
  StatsBand.tsx       Animated count-up numbers
  Faq.tsx             Animated accordion, one panel open at a time
  CtaBand.tsx         "Request a Free Quote" band over a photo + navy overlay
  ContactSection.tsx  Contact details + quote form
  WhatsAppButton.tsx  Floating WhatsApp button (pre-filled message)
  ScrollProgress.tsx  Thin accent bar showing scroll position
  LanguageProvider.tsx EN/SO context + the toggle button
  ui/
    AnimatedIcon.tsx   All icon motion (entrance spring, hover, float)
    Button.tsx         Shared button (4 variants)
    Card.tsx           Shared white card with hover lift
    Icon.tsx           Name → lucide icon lookup
    Reveal.tsx         The standard scroll-reveal animation
    SectionHeading.tsx Eyebrow + title + subtitle

data/
  content.ts        ALL website text — edit this file
```

---

## 6. Brand colours

Defined once in `tailwind.config.ts`:

| Tailwind class | Hex       | Used for                                |
| -------------- | --------- | --------------------------------------- |
| `navy`         | `#0B2545` | Headings, navbar, footer, dark sections |
| `sky`          | `#2AA7E0` | Buttons, links, icons, highlights       |
| `skyDark`      | `#1E86C7` | Button hover                            |
| `offwhite`     | `#F5F9FC` | Alternating section backgrounds         |
| `ink`          | `#0F1B2D` | Body text                               |
| `muted`        | `#5A6B7B` | Secondary / supporting text             |

Fonts are loaded with `next/font` in `app/layout.tsx`: **Poppins** for headings, **Inter** for body text.

---

## 7. Accessibility & motion

- Semantic HTML, labelled form fields, `aria-label` on every icon-only button
- "Skip to content" link for keyboard users, visible focus rings throughout
- Meaningful `alt` text on every photo; purely decorative images and overlays are `aria-hidden`
- All animations respect `prefers-reduced-motion` — icon entrances, floating loops, count-ups and scroll reveals all switch off, and `globals.css` neutralises CSS transitions too
- Images are lazy-loaded below the fold; only the hero photo uses `priority`. Every image has fixed dimensions or `fill` with `sizes`, so there is no layout shift

---

## 8. Language toggle (EN / SO)

There is a small **EN / SO** switch in the navbar. No i18n library — just a React
context in `components/LanguageProvider.tsx` and `{ en, so }` string pairs in
`data/content.ts`. The choice is remembered in `localStorage` and `<html lang>`
is updated to match.

**What is translated today:** the navbar links and CTA, the whole hero, and every
section heading (eyebrow + title + subtitle).

**What is not:** body copy — service descriptions, About paragraphs, FAQ answers,
form labels, the footer, testimonials. These are English only and marked with
`// TODO: extend translations`.

To translate one more string:

```ts
// 1. give it both languages in data/content.ts
export const sectionText = {
  myNewSection: {
    eyebrow: { en: "…", so: "…" },
    title:   { en: "…", so: "…" },
    subtitle:{ en: "…", so: "…" },
  },
};
```

```tsx
// 2. pass it to SectionHeading instead of the plain props
<SectionHeading text={sectionText.myNewSection} />
```

For anything that is not a heading, read it through the hook — the component
must be a client component (`"use client"`):

```tsx
const { t } = useLang();
<p>{t(someBilingualString)}</p>
```

`SectionHeading` still accepts plain `eyebrow` / `title` / `subtitle` strings, so
untranslated headings keep working unchanged.

---

## 9. Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel detects Next.js automatically — no configuration needed. Click **Deploy**.
4. After deploying, update `site.url` in `data/content.ts` to your real domain so the SEO metadata is correct.
