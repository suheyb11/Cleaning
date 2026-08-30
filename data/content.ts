/**
 * ============================================================================
 *  BILIC CLEANING COMPANY — ALL WEBSITE CONTENT
 * ============================================================================
 *  This is the only file you need to edit to change the text on the website.
 *  Every section (services, values, process steps, industries, contact
 *  details...) is defined below in plain, readable objects.
 *
 *  The `icon` field is just a name. The list of allowed names lives in
 *  components/ui/Icon.tsx — if you use a name that is not in that list you
 *  will simply get the default sparkle icon.
 *
 *  PHOTOS: every `image` field currently points at a free Unsplash photo used
 *  as a placeholder. To use your own photo, drop the file into
 *  /public/images and change the value to "/images/your-photo.jpg".
 *  Each one is marked with a TODO below.
 * ============================================================================
 */

/**
 * Helper that builds an Unsplash URL at a sensible size and quality.
 * TODO: replace every photo below with a real Bilic Cleaning photo.
 */
function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

/**
 * Same idea for Pexels, whose free library has better photography of African
 * cleaning staff. `id` is the number in the pexels.com/photo/...-<id>/ URL.
 * TODO: replace with a real Bilic Cleaning photo.
 */
function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/* --------------------------------------------------------------------------
 * 1. BRAND + CONTACT DETAILS
 * ----------------------------------------------------------------------- */

export const site = {
  name: "Bilic Cleaning Company",
  shortName: "Bilic",
  tagline: "Clean Spaces. Better Living. Better Business.",
  subBrand: "Professional Cleaning & Facility Services",
  promise: "Professional People. Reliable Service. Quality Results.",
  location: "Mogadishu, Somalia",
  serviceArea: "Serving Mogadishu & Surrounding Areas",
  nameMeaning:
    "Bilic represents cleanliness, beauty, appearance, and excellence.",
  description:
    "Professional, reliable and high-quality cleaning and facility services for homes, offices, businesses, institutions and corporate clients in Mogadishu, Somalia.",
  // Used for Open Graph / metadata. TODO: replace with your real domain once deployed.
  url: "https://bilic-cleaning.example.com",
};

/* --------------------------------------------------------------------------
 * WhatsApp — ONE place to change the number.
 * ----------------------------------------------------------------------- */

/**
 * TODO: Insert the real WhatsApp number — country code first, digits only,
 * no "+", spaces or dashes. Example for Somalia: "252612345678".
 * This single value drives every WhatsApp link on the site.
 */
export const WHATSAPP_NUMBER = "000000000000";

/** The pre-filled message used by each WhatsApp entry point. */
export const whatsappMessages = {
  general: "Hello Bilic Cleaning, I'd like a quote for a cleaning service.",
  hero: "Hello Bilic Cleaning, I'd like a free quote for cleaning my ",
  booking: "Hello Bilic Cleaning, I'd like to book a cleaning service for ",
  quote:
    "Hello Bilic Cleaning, I'd like a free quotation. Property type, size and how often: ",
};

/** Builds a wa.me link that opens the chat with `message` already typed in. */
export function whatsappLink(message: string = whatsappMessages.general) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  // TODO: Insert the real phone number (used for the "tel:" link).
  phone: "[Insert Phone Number]",
  phoneHref: "tel:+000000000000", // TODO: Insert real phone number in international format.

  // TODO: Insert the real WhatsApp number (display text only — links use WHATSAPP_NUMBER above).
  whatsapp: "[Insert WhatsApp Number]",
  whatsappHref: whatsappLink(),

  // TODO: Insert the real email address.
  email: "[Insert Email Address]",
  emailHref: "mailto:info@example.com", // TODO: Insert real email address.

  address: "Mogadishu, Somalia",
  addressLine2: "Mogadishu & Surrounding Areas",

  hours: "Flexible schedules — including evenings and weekends",

  socials: [
    // TODO: Insert the real Facebook page link.
    { label: "Facebook", href: "#", icon: "Facebook", value: "[Insert Facebook Link]" },
    // TODO: Insert the real Instagram profile link.
    { label: "Instagram", href: "#", icon: "Instagram", value: "[Insert Instagram Link]" },
  ],
};

/* --------------------------------------------------------------------------
 * 2. NAVIGATION
 * ----------------------------------------------------------------------- */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

/* --------------------------------------------------------------------------
 * 3. HERO
 * ----------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Professional Cleaning & Facility Services · Mogadishu, Somalia",
  headline: "Professional Cleaning You Can Trust",
  subtext:
    "At Bilic Cleaning Company, we provide professional, reliable, and high-quality cleaning and facility services for homes, offices, businesses, institutions, and corporate clients. We create clean, hygienic, comfortable, and professional environments through dependable service, attention to detail, and customer-focused solutions.",
  primaryCta: { label: "Get a Quote", href: "/contact" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
  // TODO: replace with a real Bilic Cleaning photo.
  // Alternatives if this one doesn't suit — swap the number below:
  //   6197124  young woman in overalls cleaning a glass window
  //   6496047  young woman vacuuming a modern living room
  //   6195121  a full cleaning team in uniform, posed
  //   6195197  gloved hands wiping down a marble table (no face)
  image: pexels(6196694, 1000),
  imageAlt:
    "A cleaner in work overalls vacuuming a bright, modern interior",
  // Small trust points shown under the hero buttons.
  highlights: [
    "Homes & Apartments",
    "Offices & Businesses",
    "Schools & Clinics",
    "Post-Construction",
  ],
};

/* --------------------------------------------------------------------------
 * 4. ABOUT
 * ----------------------------------------------------------------------- */

export const about = {
  heading: "About Bilic Cleaning Company",
  intro:
    "Bilic Cleaning Company is a professional cleaning and facility services company established to provide reliable, efficient, and high-quality cleaning solutions for residential, commercial, institutional, and corporate clients.",
  paragraphs: [
    "Our objective is to transform ordinary spaces into clean, hygienic, comfortable, and professional environments.",
    "Cleanliness is essential to a healthy and productive environment. For homes it brings comfort and peace of mind; for businesses it supports a positive image, employee productivity, customer satisfaction, and workplace hygiene.",
  ],
  // Shown as a light two-column checklist next to the About photo — not as boxes.
  points: [
    "Reliable, efficient and high-quality cleaning solutions",
    "Residential, commercial, institutional and corporate clients",
    "Clean, hygienic and comfortable environments",
    "Comfort and peace of mind at home",
    "A positive image for your business",
    "Better employee productivity and workplace hygiene",
  ],
  // TODO: replace with a real Bilic Cleaning photo.
  image: unsplash("photo-1577412647305-991150c7d163", 1100),
  imageAlt: "A bright, clean and tidy open-plan office ready for the working day",
  // TODO: replace with a real Bilic Cleaning photo (used on the /about page).
  secondaryImage: unsplash("photo-1642505172378-a6f5e5b15580", 1100),
  secondaryImageAlt: "A cleaner wiping down a kitchen sink until it shines",
};

/* --------------------------------------------------------------------------
 * 5. SERVICES (10 main services)
 * ----------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  /** Card / section photo. TODO: swap each one for a real Bilic photo. */
  image: string;
  imageAlt: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    short: "Homes, apartments and villas cleaned to a comfortable, healthy standard.",
    icon: "Home",
    image: unsplash("photo-1524758631624-e2822e304c36"),
    imageAlt: "A spotless, tidy living room with a sofa and floor lamp",
    items: [
      "General house cleaning",
      "Apartment cleaning",
      "Villa cleaning",
      "Kitchen cleaning",
      "Bathroom cleaning",
      "Bedroom cleaning",
      "Living room cleaning",
      "Dusting and wiping",
      "Sweeping and mopping",
      "Vacuum cleaning",
      "Window cleaning",
      "Deep cleaning",
      "Move-in / move-out cleaning",
    ],
  },
  {
    slug: "office-commercial-cleaning",
    title: "Office & Commercial Cleaning",
    short: "Professional workspaces that support your image and your team.",
    icon: "Building2",
    image: unsplash("photo-1631193816258-28b44b21e78b"),
    imageAlt: "A clean open-plan office with rows of tidy desks and bright lighting",
    items: [
      "Office cleaning",
      "Reception area cleaning",
      "Workstation cleaning",
      "Meeting and conference room cleaning",
      "Kitchen and staff area cleaning",
      "Restroom cleaning",
      "Floor cleaning",
      "Window and glass cleaning",
      "Waste collection",
      "Common area cleaning",
      "Regular janitorial services",
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    short: "A thorough, detailed clean that reaches everything a routine clean misses.",
    icon: "Sparkles",
    image: unsplash("photo-1585421514284-efb74c2b69ba"),
    imageAlt: "Gloved hands carefully wiping down a surface during a deep clean",
    items: [
      "Detailed floor cleaning",
      "Kitchen deep cleaning",
      "Bathroom deep cleaning",
      "Surface cleaning",
      "Door and frame cleaning",
      "Window and glass cleaning",
      "Furniture cleaning",
      "Hard-to-reach area cleaning",
      "Detailed dust removal",
      "General sanitation",
    ],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    short: "Turning a finished building site into a clean, ready-to-use space.",
    icon: "HardHat",
    image: unsplash("photo-1634586648651-f1fb9ec10d90"),
    imageAlt: "A newly built room being cleared of construction dust and debris",
    items: [
      "Construction dust removal",
      "Floor cleaning",
      "Window and glass cleaning",
      "Surface cleaning",
      "Bathroom and kitchen cleaning",
      "Residue removal",
      "Final building cleaning",
    ],
  },
  {
    slug: "window-glass-cleaning",
    title: "Window & Glass Cleaning",
    short: "Streak-free glass that brightens every room and storefront.",
    icon: "AppWindow",
    image: unsplash("photo-1524803504179-6d7ae4d283f7"),
    imageAlt: "A team cleaning the large glass windows of a building",
    items: [
      "Office windows",
      "Residential windows",
      "Glass doors",
      "Glass partitions",
      "Storefront glass",
      "Mirrors",
      "Interior glass surfaces",
    ],
  },
  {
    slug: "floor-cleaning-maintenance",
    title: "Floor Cleaning & Maintenance",
    short: "Clean, protected and well-maintained floors throughout your property.",
    icon: "LayoutGrid",
    image: unsplash("photo-1740657254989-42fe9c3b8cce"),
    imageAlt: "A cleaner in protective gloves scrubbing and polishing a floor",
    items: [
      "Sweeping",
      "Vacuuming",
      "Mopping",
      "Scrubbing",
      "Stain removal",
      "Floor polishing",
      "Tile cleaning",
      "Routine floor maintenance",
    ],
  },
  {
    slug: "carpet-upholstery-cleaning",
    title: "Carpet & Upholstery Cleaning",
    short: "Refreshing carpets, rugs and soft furniture back to their best.",
    icon: "Sofa",
    image: unsplash("photo-1686178827149-6d55c72d81df"),
    imageAlt: "A cleaner vacuuming an upholstered footstool to lift dust from the fabric",
    items: [
      "Office carpets",
      "Residential carpets",
      "Rugs",
      "Sofas",
      "Chairs",
      "Fabric furniture",
      "Upholstered surfaces",
    ],
  },
  {
    slug: "restroom-sanitation",
    title: "Restroom & Sanitation",
    short: "Hygienic, fresh and properly sanitised restroom facilities.",
    icon: "Droplets",
    image: unsplash("photo-1584622650111-993a426fbf0a"),
    imageAlt: "A spotless modern bathroom with a clean shower and vanity",
    items: [
      "Toilet cleaning",
      "Sink cleaning",
      "Mirror cleaning",
      "Floor cleaning",
      "Surface sanitation",
      "Waste removal",
      "Odor control",
      "General restroom maintenance",
    ],
  },
  {
    slug: "janitorial-services",
    title: "Janitorial Services",
    short: "Ongoing daily support that keeps your facility consistently clean.",
    icon: "SprayCan",
    image: unsplash("photo-1580256081112-e49377338b7f"),
    imageAlt: "A janitorial trolley and vacuum ready for a daily cleaning round",
    items: [
      "Daily cleaning",
      "Common area maintenance",
      "Waste collection",
      "Restroom cleaning",
      "Kitchen area cleaning",
      "Office cleaning",
      "Facility support services",
    ],
  },
  {
    slug: "customized-cleaning",
    title: "Customized Cleaning",
    short: "A plan built around your building, your schedule and your budget.",
    icon: "SlidersHorizontal",
    image: unsplash("photo-1563453392212-326f5e854473"),
    imageAlt: "Cleaning supplies being prepared for a customised cleaning plan",
    items: [
      "Building size",
      "Facility type",
      "Number of rooms",
      "Cleaning frequency",
      "Required services",
      "Operating hours",
      "Budget",
    ],
  },
];

/* --------------------------------------------------------------------------
 * 6. WHY CHOOSE BILIC
 * ----------------------------------------------------------------------- */

export const whyChoose = [
  {
    title: "Professional Service",
    text: "Structured and professional cleaning solutions.",
    icon: "BadgeCheck",
  },
  {
    title: "Reliable Team",
    text: "Punctuality, responsibility, and consistency.",
    icon: "Users",
  },
  {
    title: "Quality Results",
    text: "Focus on details and customer expectations.",
    icon: "Sparkles",
  },
  {
    title: "Flexible Schedules",
    text: "Arranged around your requirements.",
    icon: "CalendarClock",
  },
  {
    title: "Competitive Pricing",
    text: "Professional services at fair prices.",
    icon: "CircleDollarSign",
  },
  {
    title: "Customer Focus",
    text: "Customers at the center of everything.",
    icon: "HeartHandshake",
  },
  {
    title: "Local Experience",
    text: "We understand the needs and environment of customers in Somalia.",
    icon: "MapPin",
  },
];

/* --------------------------------------------------------------------------
 * 7. OUR SERVICE PROCESS (8 steps)
 * ----------------------------------------------------------------------- */

export const processSteps = [
  {
    title: "Customer Inquiry",
    text: "The client contacts us and explains their cleaning requirements.",
    icon: "MessageCircle",
  },
  {
    title: "Site Assessment",
    text: "Where needed, our team assesses the property and identifies required services.",
    icon: "Search",
  },
  {
    title: "Cleaning Plan",
    text: "We develop a plan based on size, condition, schedule, and requirements.",
    icon: "ClipboardList",
  },
  {
    title: "Quotation",
    text: "A clear quotation based on the agreed scope of work.",
    icon: "FileText",
  },
  {
    title: "Scheduling",
    text: "Date, time, frequency, and requirements agreed with the client.",
    icon: "CalendarCheck",
  },
  {
    title: "Service Delivery",
    text: "Our professional team performs the agreed services.",
    icon: "SprayCan",
  },
  {
    title: "Quality Inspection",
    text: "Completed work reviewed against agreed standards.",
    icon: "ShieldCheck",
  },
  {
    title: "Customer Feedback",
    text: "We welcome feedback and use it to keep improving.",
    icon: "ThumbsUp",
  },
];

/* --------------------------------------------------------------------------
 * 8. INDUSTRIES WE SERVE
 * ----------------------------------------------------------------------- */

/**
 * The sub-items here are short keywords, so they are rendered as small
 * rounded chips rather than one box per item.
 */
export const industries = [
  {
    title: "Residential",
    icon: "Home",
    // TODO: replace with a real Bilic Cleaning photo.
    image: unsplash("photo-1583847268964-b28dc8f51f92", 800),
    imageAlt: "A bright, clean family living room with a large window",
    items: [
      "Homeowners",
      "Families",
      "Tenants",
      "Apartment residents",
      "Property owners",
    ],
  },
  {
    title: "Commercial",
    icon: "Store",
    // TODO: replace with a real Bilic Cleaning photo.
    image: unsplash("photo-1518455027359-f3f8164ba6bd", 800),
    imageAlt: "A tidy commercial office desk and chair ready for the working day",
    items: [
      "Offices",
      "Companies",
      "Retail stores",
      "Restaurants",
      "Hotels",
      "Warehouses",
      "Commercial buildings",
    ],
  },
  {
    title: "Institutional",
    icon: "GraduationCap",
    // TODO: replace with a real Bilic Cleaning photo.
    image: unsplash("photo-1669101602108-fa5ba89507ee", 800),
    imageAlt: "A cleaner mopping the corridor of a clinic to keep it hygienic",
    items: [
      "Schools",
      "Universities",
      "Clinics",
      "Healthcare facilities",
      "NGOs",
      "Government institutions",
      "Community organizations",
    ],
  },
  {
    title: "Property & Facility",
    icon: "KeyRound",
    // TODO: replace with a real Bilic Cleaning photo.
    image: unsplash("photo-1624204386084-dd8c05e32226", 800),
    imageAlt: "A modern apartment building managed as a residential property",
    items: [
      "Property management companies",
      "Real estate companies",
      "Residential compounds",
      "Apartment buildings",
      "Building owners",
    ],
  },
];

/* --------------------------------------------------------------------------
 * 9. VISION, MISSION & CORE VALUES
 * ----------------------------------------------------------------------- */

export const vision = {
  title: "Our Vision",
  text: "To become one of the most trusted and respected cleaning and facility service companies in Somalia — recognized for professional standards, reliable service, quality results, and excellent customer care.",
  icon: "Eye",
};

export const mission = {
  title: "Our Mission",
  text: "To provide dependable, professional, and affordable cleaning services that create healthier, safer, cleaner, and more welcoming environments.",
  icon: "Target",
};

export const coreValues = [
  { title: "Professionalism", icon: "BadgeCheck" },
  { title: "Quality", icon: "Sparkles" },
  { title: "Reliability", icon: "Clock" },
  { title: "Integrity", icon: "ShieldCheck" },
  { title: "Customer Satisfaction", icon: "Smile" },
  { title: "Safety", icon: "HardHat" },
  { title: "Respect", icon: "HeartHandshake" },
];

/* --------------------------------------------------------------------------
 * 10. STATS / TRUST BAND (animated counters)
 *     Keep these honest — they describe the offering, not invented numbers.
 * ----------------------------------------------------------------------- */

/**
 * A stat is either a number that counts up (`value`, with an optional
 * `suffix` glued on the end) or a fixed phrase that must not be counted
 * (`display`). "24/7" is a phrase, not a quantity — counting to 24 and
 * sticking "/7" on the end would animate a number that means nothing.
 */
export type Stat = {
  label: string;
  /** Counts up from 0 to this number. */
  value?: number;
  /** Appended after the counted number, e.g. "+" or "%". */
  suffix?: string;
  /** Rendered as-is, with no count-up. Wins over `value` if both are set. */
  display?: string;
};

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Cleaning Services" },
  { value: 4, label: "Sectors Served" },
  { display: "24/7", label: "Support & Scheduling" },
  { value: 100, suffix: "%", label: "Satisfaction Focus" },
];

/* --------------------------------------------------------------------------
 * 11. PARTNERSHIPS
 * ----------------------------------------------------------------------- */

export const partnerships = {
  heading: "Partnerships & Contracts",
  text: "We offer both short-term project services and long-term cleaning contracts, and we welcome partnerships with organisations that need a dependable cleaning partner.",
  partners: [
    "Companies",
    "Property managers",
    "Construction companies",
    "Hotels",
    "Restaurants",
    "Schools",
    "NGOs",
    "Government institutions",
    "Healthcare organizations",
    "Facility management companies",
  ],
};

/* --------------------------------------------------------------------------
 * 12. CALL TO ACTION BAND
 * ----------------------------------------------------------------------- */

export const ctaBand = {
  heading: "Request a Free Quote",
  text: "Tell us about your space and we will prepare a clear, fair quotation based on the scope of work you need.",
  primary: { label: "Request a Free Quote", href: "/contact" },
  secondary: { label: "Book a Cleaning Service", href: "/contact" },
  // Background photo, shown behind a navy overlay.
  // TODO: replace with a real Bilic Cleaning photo.
  image: unsplash("photo-1497366754035-f200968a6e72", 1600),
  imageAlt: "",
};

/* --------------------------------------------------------------------------
 * 13. TRUST BAND — slim row of promises, sits directly under the hero.
 * ----------------------------------------------------------------------- */

export const trustPoints = [
  {
    title: "Vetted & Professional Staff",
    text: "Trained, punctual and accountable teams.",
    icon: "BadgeCheck",
  },
  {
    title: "Reliable Scheduling",
    text: "Times we agree are times we keep.",
    icon: "CalendarClock",
  },
  {
    title: "Quality-Inspected Work",
    text: "Every job checked against agreed standards.",
    icon: "ShieldCheck",
  },
  {
    title: "Free Quotation",
    text: "Clear pricing before any work begins.",
    icon: "FileText",
  },
];

/* --------------------------------------------------------------------------
 * 14. TESTIMONIALS
 * ----------------------------------------------------------------------- */

/**
 * TODO: replace with real client reviews.
 * These are realistic placeholders written to match the services Bilic
 * actually offers — swap the quote, name and role for genuine ones before
 * going live. Do not publish invented reviews as if they were real.
 */
export const testimonials = [
  {
    quote:
      "We moved into a newly finished office and the dust was everywhere. Bilic handled the post-construction clean in a single day and we opened on schedule.",
    name: "[Insert Client Name]",
    role: "Office Manager, [Insert Company]",
    rating: 5,
  },
  {
    quote:
      "They come every week, always on time, and the building has never looked better. The team is polite and we never have to chase them.",
    name: "[Insert Client Name]",
    role: "Property Manager, [Insert Company]",
    rating: 5,
  },
  {
    quote:
      "I booked a deep clean before a family event. The kitchen and bathrooms looked brand new and the quotation was exactly what we agreed.",
    name: "[Insert Client Name]",
    role: "Homeowner, Mogadishu",
    rating: 5,
  },
];

/* --------------------------------------------------------------------------
 * 15. BEFORE & AFTER
 * ----------------------------------------------------------------------- */

export const beforeAfter = {
  // Heading text lives in `sectionText.beforeAfter` further down, so the
  // EN / SO toggle reaches it.
  // TODO: replace with real Bilic before/after photos — ideally the SAME room,
  // same angle and same lighting, so the slider reads as one honest comparison.
  before: {
    image: pexels(6555454, 1400),
    alt: "A cluttered, untidy living room before cleaning",
  },
  after: {
    image: pexels(7546721, 1400),
    alt: "A bright, spotless living room after cleaning",
  },
};

/* --------------------------------------------------------------------------
 * 16. FAQ
 * ----------------------------------------------------------------------- */

export const faqs = [
  {
    question: "What areas do you cover?",
    answer:
      "We serve Mogadishu and the surrounding areas. If you are just outside the city, contact us anyway — we will tell you honestly whether we can reach you.",
  },
  {
    question: "Do you bring your own equipment and supplies?",
    answer:
      "Yes. Our teams arrive with the equipment and cleaning supplies needed for the job. If your site requires specific products, tell us in advance and we will arrange it.",
  },
  {
    question: "Can I book a one-time clean or a recurring contract?",
    answer:
      "Both. We handle one-off jobs such as deep cleans, move-in / move-out and post-construction cleaning, as well as recurring daily, weekly or monthly schedules.",
  },
  {
    question: "How do you price a job?",
    answer:
      "Pricing is based on the size and condition of the space, how often you need us, and the exact scope of work. We assess first, then give you a clear quotation — the quote is free.",
  },
  {
    question: "Do you offer office and commercial contracts?",
    answer:
      "Yes. We work with offices, retail, hotels, restaurants, schools, clinics, NGOs and property managers on both short-term projects and long-term cleaning contracts.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Send us the details through the contact form on this site, or message us on WhatsApp. Tell us the property type, rough size and how often you need cleaning, and we will come back to you.",
  },
];

/* --------------------------------------------------------------------------
 * 17. MAP (Contact page)
 * ----------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * 18. SECTION HEADINGS
 * --------------------------------------------------------------------------
 *  The site is English only. Every section's eyebrow / title / intro lives
 *  here so the wording can be changed in one place rather than hunted for
 *  across a dozen components.
 * ----------------------------------------------------------------------- */

/** Eyebrow + title + one-line intro for a section. */
export type SectionText = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export const heroText = {
  eyebrow: "Professional Cleaning & Facility Services · Mogadishu, Somalia",
  headline: "Professional Cleaning You Can Trust",
  subtext:
    "Bilic Cleaning Company delivers reliable, high-quality cleaning and facility services for homes, offices, businesses and institutions across Mogadishu — with trained teams, agreed schedules and a clear quotation before we start.",
  primaryCta: "Get a Free Quote",
  secondaryCta: "Chat on WhatsApp",
  trustRow: "Serving Mogadishu · 10+ services · Free quotes",
};

export const uiText = {
  quote: "Get a Quote",
  menu: "Menu",
};

/**
 * Heading text for every section, keyed by the section it belongs to.
 * Pass one of these to <SectionHeading text={...} />.
 */
export const sectionText: Record<string, SectionText> = {
  services: {
    eyebrow: "What We Do",
    title: "Our Cleaning Services",
    subtitle:
      "Ten professional services covering homes, offices, institutions and construction projects — delivered by a reliable team with attention to detail.",
  },
  whyUs: {
    eyebrow: "Why Bilic",
    title: "Why Choose Bilic Cleaning Company",
    subtitle: "Professional People. Reliable Service. Quality Results.",
  },
  process: {
    eyebrow: "How We Work",
    title: "Our Service Process",
    subtitle:
      "Eight clear steps, from your first message to the feedback that helps us improve.",
  },
  industries: {
    eyebrow: "Who We Serve",
    title: "Industries We Serve",
    subtitle:
      "From family homes to hotels, schools and managed properties — we adapt our service to the type of space you run.",
  },
  vision: {
    eyebrow: "What Drives Us",
    title: "Vision, Mission & Core Values",
    subtitle: "Clear standards guide every job we take on, large or small.",
  },
  testimonials: {
    eyebrow: "Client Feedback",
    title: "What Our Clients Say",
    subtitle:
      "Homes, offices and managed buildings across Mogadishu that trust us with their space.",
  },
  beforeAfter: {
    eyebrow: "See The Difference",
    title: "Before & After",
    subtitle: "Drag the handle to see what a Bilic clean actually changes.",
  },
  faq: {
    eyebrow: "Good To Know",
    title: "Frequently Asked Questions",
    subtitle:
      "The things clients ask us most before booking. Anything else — just ask.",
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Contact Our Team",
    subtitle:
      "Tell us about your space and the services you need. We will reply with a clear quotation based on the agreed scope of work.",
  },
};

export const mapEmbed = {
  title: "Bilic Cleaning Company service area — Mogadishu, Somalia",
  /**
   * TODO: set the exact location / pin.
   * Open Google Maps → search your address → Share → Embed a map → copy the
   * `src` from the <iframe> it gives you and paste it here. The URL below is a
   * general Mogadishu view, not a pinned business location.
   */
  src: "https://www.google.com/maps?q=Mogadishu,Somalia&z=12&output=embed",
};
