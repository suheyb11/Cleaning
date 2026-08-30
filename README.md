# Bilic Cleaning Company — Website

A modern, animated marketing website for **Bilic Cleaning Company**, a professional cleaning & facility services business in Mogadishu, Somalia.

> _Clean Spaces. Better Living. Better Business._

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react
No database, no backend, no login — every page is static and fast.

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
| `https://wa.me/000000000000` | `contact.whatsappHref`                | `https://wa.me/252XXXXXXXXX` (digits only, no `+`/spaces) |
| `[Insert Email Address]`   | `contact.email`                         | The display email address                                 |
| `mailto:info@example.com`  | `contact.emailHref`                     | The same email address                                    |
| `[Insert Facebook Link]`   | `contact.socials[0].href`               | Full Facebook page URL                                    |
| `[Insert Instagram Link]`  | `contact.socials[1].href`               | Full Instagram profile URL                                |
| `site.url`                 | `site.url`                              | The real domain, once deployed (used for SEO / Open Graph) |
| Logo                       | `components/Navbar.tsx`, `Footer.tsx`   | The real Bilic logo                                       |
| Favicon                    | `public/favicon.svg`                    | The real logo mark                                        |

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

Unsplash is allowed in `next.config.mjs` via `remotePatterns`. Once every photo is a local file in `public/images/`, you can delete that `remotePatterns` entry.

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
  Navbar.tsx          Sticky nav, blur-on-scroll, mobile hamburger menu
  Footer.tsx          Navy footer with links + contact details
  Hero.tsx            Hero photo + gradient overlay, floating icons, wave divider
  AboutSection.tsx    Split image / text + light checklist (home page)
  PageHeader.tsx      Navy banner used at the top of inner pages
  ServicesSection.tsx 10 service cards, each with a photo thumbnail
  WhyChoose.tsx       7 reason cards
  ProcessTimeline.tsx 8-step timeline, icons spring in sequentially
  Industries.tsx      4 image banners + keyword chips
  VisionValues.tsx    Vision, mission + 7 core values
  StatsBand.tsx       Animated count-up numbers
  CtaBand.tsx         "Request a Free Quote" band over a photo + navy overlay
  ContactSection.tsx  Contact details + quote form
  WhatsAppButton.tsx  Floating WhatsApp button
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

## 8. Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel detects Next.js automatically — no configuration needed. Click **Deploy**.
4. After deploying, update `site.url` in `data/content.ts` to your real domain so the SEO metadata is correct.
