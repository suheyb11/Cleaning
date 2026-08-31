# Bilic Cleaning Company — Website

A modern, animated marketing website for **Bilic Cleaning Company**, a professional cleaning & facility services business in Mogadishu, Somalia.

> _Clean Spaces. Better Living. Better Business._

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react · Resend · Supabase · react-markdown
Most pages are still static. A database-backed blog, a password-protected admin
portal, and the quote form (which saves to the database and emails both the
owner and the customer) all need the env vars in §10 to work.

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
| 13 | **Contact form delivery** | `.env.local` (create it) | The form already sends real email via Resend and saves to Supabase — you just need to add your own env vars. See §4 and §10. |
| 14 | **Database + admin password** | `.env.local` (create it) | Run the SQL in §10.1, then set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY` and `ADMIN_PASSWORD`. Nothing in the blog or `/admin` works without these. |

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
18. Section headings — `heroText`, `uiText`, `sectionText`

The site is **English only**. There is no language switcher and no translation layer.

Change the text there and it updates everywhere on the site — home page, inner pages and footer.

**The one exception is the blog.** Blog posts live in the Supabase
`blog_posts` table, not in this file — write and publish them from `/admin`
instead (see §10.5).

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

The "Request a Free Quote" form in `components/ContactSection.tsx` POSTs
`name`, `phone`, `email`, `service` and `message` as JSON (plus a hidden
`company` honeypot field for spam) to `app/api/quote/route.ts`, which — in
order — saves it to Supabase (so it shows up in `/admin`), emails the owner
via [Resend](https://resend.com), then emails the customer an automatic
thank-you if they gave an email address. The button shows a "Sending…" state
while the request is in flight, and a friendly success or error message
depending on the result. On error, whatever the visitor typed is kept so they
can just hit send again.

**Full setup (Resend + Supabase) is in [§10 below](#10-database-blog--admin-portal).**
The short version: create a free Resend account and a free Supabase project,
run the SQL in §10, copy `.env.example` to `.env.local` and fill in the six
env vars, then add the same six in Vercel → Project → Settings → Environment
Variables before deploying.

If Resend doesn't work for you, the simplest no-backend alternative for the
owner-notification email is [Web3Forms](https://web3forms.com) — though
you'd then need to save to Supabase separately, since that part no longer
goes through Resend.

---

## 5. Project structure

```
app/
  layout.tsx        Fonts, metadata; renders SiteChrome around every page
  page.tsx          Home page — composes the sections in order
  about/page.tsx    About Us
  services/page.tsx Full services listing (with anchors per service)
  contact/page.tsx  Contact page
  blog/page.tsx     Blog listing — published posts, newest first
  blog/[slug]/      Single blog post (Markdown body)
  admin/            Password-protected admin portal — see §10
  api/quote/        Saves + emails a quote request (see §4 and §10)
  api/admin/        Admin login/logout + quote reply + blog CRUD (see §10)
  not-found.tsx     404 page
  globals.css       Tailwind + base styles + reduced-motion rules

middleware.ts       Protects every /admin page and /api/admin/* route

lib/
  supabase.ts       The one Supabase client (server-only, secret key)
  admin-auth.ts     The admin password/cookie check, shared by the login
                     route and middleware.ts
  email.ts          Shared escapeHtml() + brandedEmailHtml() for every outgoing email
  format.ts         formatDate(), slugify(), customerWhatsAppLink()
  useToast.ts        Tiny local-toast hook used by the admin portal

components/
  SiteChrome.tsx      Navbar/Footer/WhatsApp button — hidden under /admin
  Navbar.tsx          Sticky nav, blur-on-scroll, active-link underline
  Footer.tsx          Navy footer with links + contact details
  Hero.tsx            Gradient-mesh hero, floating shapes, trust row, wave divider
  TrustBand.tsx       Slim 4-promise band under the hero
  AboutSection.tsx    Split image / text + light checklist (static, no motion)
  PageHeader.tsx      Navy banner used at the top of inner pages
  ServicesSection.tsx 10 service cards, each with a photo thumbnail
  BeforeAfter.tsx     Draggable before/after comparison slider
  WhyChoose.tsx       7 reason cards
  ProcessTimeline.tsx 8-step vertical timeline — ONE list, restyled per breakpoint
  Testimonials.tsx    3 client quotes; auto-rotating carousel on mobile
  Industries.tsx      4 image banners + keyword chips
  VisionValues.tsx    Vision, mission + 7 core values
  StatsBand.tsx       Animated count-up numbers
  Faq.tsx             Animated accordion, one panel open at a time
  CtaBand.tsx         "Request a Free Quote" band over a photo + navy overlay
  ContactSection.tsx  Contact details + quote form
  WhatsAppButton.tsx  Floating WhatsApp button (pre-filled message)
  ScrollProgress.tsx  Thin accent bar showing scroll position
  MarkdownContent.tsx Renders a blog post's Markdown with brand typography
  admin/
    AdminHeader.tsx          Navy top bar: tab nav (Quote Requests / Blog Posts) + log out
    QuoteRequestsView.tsx    Stat cards + responsive list + the detail/reply modal
    BlogPostsList.tsx        Responsive list with status pills + Edit/Delete
    BlogPostForm.tsx         The New Post / Edit Post form (shared), with cover preview
    Toast.tsx                The small bottom-corner success/error notification
  ui/
    AnimatedIcon.tsx   All icon motion (entrance spring, hover, float)
    Button.tsx         Shared button (5 variants, plus a `loading` spinner state)
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

## 8. Section headings & the stats band

**Headings.** Every section's eyebrow / title / intro lives in `sectionText` in
`data/content.ts`, so the wording is changed in one place:

```tsx
<SectionHeading text={sectionText.services} />
```

`SectionHeading` also still accepts plain `eyebrow` / `title` / `subtitle`
strings for one-off headings (the inner page headers use this).

**Stats.** A stat is either a number that counts up or a fixed phrase that must
not be counted:

```ts
{ value: 10, suffix: "+", label: "Cleaning Services" }   // counts 0 → 10, renders "10+"
{ value: 4,               label: "Sectors Served"    }   // counts 0 → 4
{ display: "24/7",        label: "Support & Scheduling" } // rendered as-is, no count
{ value: 100, suffix: "%", label: "Satisfaction Focus" } // counts 0 → 100, renders "100%"
```

Use `display` for anything that is not a quantity. `"24/7"` is a phrase — counting
to 24 and gluing `/7` on the end animates a number that means nothing.

The count runs once on `whileInView` with `viewport={{ once: true }}` over 1.5s,
and `onComplete` writes the exact target value, so an interrupted animation can
never leave the number stranded part-way.

---

## 9. Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add every env var from §10 below in the Vercel import screen (or after,
   under Project → Settings → Environment Variables) — the site builds fine
   without them, but the quote form, blog and admin portal all need them at
   runtime.
4. Vercel detects Next.js automatically — no other configuration needed. Click **Deploy**.
5. After deploying, update `site.url` in `data/content.ts` to your real domain so the SEO metadata is correct.

### 9.1 Deploying to Cloudflare (Workers, via OpenNext)

Cloudflare runs this through the [OpenNext](https://opennext.js.org/cloudflare)
adapter (`@opennextjs/cloudflare`), which needs **Next.js 15+**. The adapter and
its config are committed to the repo:

- `open-next.config.ts` — adapter config (defaults; nothing to change)
- `wrangler.jsonc` — Worker name, `compatibility_date`, and the `nodejs_compat`
  flag (required)

In the Cloudflare dashboard → **Workers & Pages → the project → Settings →
Build**, set:

| Setting          | Value                                                              |
| ---------------- | ----------------------------------------------------------------- |
| Build command    | `npm run build`                                                    |
| Deploy command   | `npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy` (or `npm run deploy`) |

Add the same env vars from §10 under **Settings → Variables and Secrets** (mark
`SUPABASE_SECRET_KEY`, `RESEND_API_KEY` and `ADMIN_PASSWORD` as encrypted/secret).

To test the exact Cloudflare build locally before pushing:

```bash
npm run build                    # plain Next build
npx opennextjs-cloudflare build  # what Cloudflare actually runs
npm run preview                  # optional: run the built Worker locally
```

---

## 10. Database, blog & admin portal

Three things run on this: **Supabase** (a free hosted Postgres database) holds
quote requests and blog posts, **Resend** (already set up in §4) sends email,
and a single password protects `/admin`.

### 10.1 Create the database tables

1. Create a free project at [supabase.com](https://supabase.com).
2. Open your project → **SQL Editor** → **New query**, paste the SQL below, and run it.

```sql
-- Quote requests submitted through the contact form
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text not null,
  message text not null,
  status text not null default 'new',   -- 'new' | 'replied'
  created_at timestamptz not null default now()
);

-- Blog posts
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  cover_image text,
  body_markdown text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

3. Get your project's API values:
   - **Project URL** (Project Settings → API) → `NEXT_PUBLIC_SUPABASE_URL`
   - **Secret key** → Supabase Dashboard → **Settings → API Keys → API Keys
     tab → Secret keys** (click **Create new API keys** first if you don't
     have one yet) → `SUPABASE_SECRET_KEY`. This `sb_secret_...` key is
     Supabase's current server-side key, replacing the older `service_role`
     key. The legacy `service_role` key still works — this project falls
     back to it automatically if `SUPABASE_SECRET_KEY` isn't set (see
     `lib/supabase.ts`) — but Supabase is deprecating it (end of 2026), so
     new projects should use the secret key.

   ⚠️ **This key bypasses every permission check in the database.** It is
   read only by `lib/supabase.ts`, which is only ever imported from server
   code (route handlers, server components, middleware) — never from a
   `"use client"` component. Never put it in `NEXT_PUBLIC_*`, never log it,
   and if it ever leaks, roll it in Supabase immediately.

### 10.2 All the env vars, in one place

Set all six locally in `.env.local` (copy `.env.example` to start) **and** in
Vercel → Project → Settings → Environment Variables before deploying —
they're two separate places and both need every value. If you're also
running this on Cloudflare (Pages/Workers), add the same values there under
**Settings → Variables and Secrets**, marking `SUPABASE_SECRET_KEY` as an
encrypted **Secret** (not a plain variable).

| Variable | Where to get it | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | resend.com → API Keys | |
| `QUOTE_TO_EMAIL` | your own business inbox | Receives new quote requests |
| `QUOTE_FROM_EMAIL` | resend.com → Domains | `onboarding@resend.dev` for testing; see caveat below for production |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Not secret, but only read server-side here |
| `SUPABASE_SECRET_KEY` | Supabase → Settings → API Keys → Secret keys | **Secret — server only, never exposed to the browser.** Mark it encrypted wherever you set it (Vercel/Cloudflare). |
| `ADMIN_PASSWORD` | pick your own | The one password that unlocks `/admin` |

### 10.3 The Resend domain-verification caveat

Resend's test sender `onboarding@resend.dev` can **only deliver to the email
address of the Resend account owner** — that's a Resend restriction, not a
bug here. In practice that means:

- The owner-notification email (to `QUOTE_TO_EMAIL`) works immediately if
  `QUOTE_TO_EMAIL` *is* the Resend account owner's address.
- The **customer auto-reply** (sent right after they submit the form) and
  the **admin's reply-to-customer email** (sent from `/admin`) will not
  reach any other real customer inbox until you verify your own domain:
  1. Resend → **Domains** → **Add Domain** → enter your domain.
  2. Resend shows a set of DNS records (SPF/DKIM, etc.) — add exactly those
     in **Cloudflare → DNS** for that domain (Cloudflare is where this
     project's DNS is managed).
  3. Wait for Resend to show the domain as **Verified**, then set
     `QUOTE_FROM_EMAIL` to an address on it, e.g. `quotes@bilic.com`.
- Until then: the customer auto-reply fails **silently** (logged only —
  never shown to the visitor, so a lead is never lost over it), but the
  **admin reply is different** — if it fails to send, the admin sees a
  clear error in `/admin` and the typed message is kept so they can retry.
  Either way, nothing crashes: every Resend call is wrapped in try/catch.

### 10.4 The blog

- Public pages (`/blog`, `/blog/[slug]`) only ever show posts where
  `published = true`, fetched server-side straight from Supabase — nothing
  Supabase-related ships to the browser.
- A missing slug and an unpublished slug both render the normal 404 page.
- Cover images are plain URLs typed into the admin form, so
  `next.config.mjs` allows `next/image` to load from any HTTPS host (see the
  comment there). If you'd rather lock that down, host cover images
  somewhere specific and narrow `remotePatterns` to that host.

### 10.5 The admin portal

Go to `/admin`, log in with `ADMIN_PASSWORD`.

- **Quote Requests** — stat cards for Total / New / Replied, then every
  submission newest-first as a responsive list (stacks into cards on a
  phone). Click one to open the full request in a modal: the message,
  quick call/email/WhatsApp links, and either a reply box (emails the
  customer via Resend and marks the row **Replied** — see the domain
  caveat above for reaching real customers) or, if they left no email, a
  **Reply on WhatsApp** button built from their phone number. **Mark as
  Replied** is always available too, for requests handled by phone.
- **Blog Posts** — every post, published or draft, as the same kind of
  responsive list. **New Post** opens a plain form: title, an
  auto-generated (editable) slug, excerpt, a cover image URL (with a small
  live preview), the body as Markdown in a plain textarea, and a Published
  toggle. Edit and Delete work the same way from the list.

**How the login works:** one password (`ADMIN_PASSWORD`), no user accounts.
Logging in sets an `httpOnly` cookie holding a hash of the password (never
the password itself); `middleware.ts` checks that cookie on every `/admin`
page and `/api/admin/*` request and bounces anyone without it to
`/admin/login`. This is intentionally simple because there's a single owner
— if the team ever grows, swap this for
[Supabase Auth](https://supabase.com/docs/guides/auth) (email/password or
magic links, with per-user rows) instead of adding more passwords.
