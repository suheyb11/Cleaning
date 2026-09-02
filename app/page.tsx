import AboutSection from "@/components/AboutSection";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import ServicesSection from "@/components/ServicesSection";
import StatsBand from "@/components/StatsBand";
import Testimonials from "@/components/Testimonials";
import TrustBand from "@/components/TrustBand";
import VisionValues from "@/components/VisionValues";

/**
 * Home page — simply composes the sections in order.
 * Edit the text of any section in data/content.ts.
 *
 * "Why Us", "Process" and "Contact" are NOT on the home page — they each have
 * their own route (/why-us, /process, /contact) and the navbar links there.
 * The section components still live in /components because those pages import
 * them; only their usage here was removed.
 *
 * Two rules govern this order:
 *  1. Narrative — promise, who we are, what we do, proof, trust, ask.
 *  2. Rhythm — backgrounds alternate white / off-white so no two full sections
 *     of the same colour sit next to each other. The only deliberate exception
 *     is TrustBand + AboutSection, which read as one white zone split by a
 *     hairline rule.
 */
export default function HomePage() {
  return (
    <>
      <Hero /> {/* navy     — gradient mesh + photo */}
      <TrustBand /> {/* white    — slim promise band */}
      <AboutSection /> {/* white    — split image / text + checklist */}
      <ServicesSection /> {/* offwhite — card grid with photos */}
      <BeforeAfter /> {/* white    — draggable comparison slider */}
      <Testimonials /> {/* offwhite — client quotes */}
      <Industries /> {/* white    — image banners + chips */}
      <VisionValues /> {/* offwhite — two panels + value cards */}
      <StatsBand /> {/* navy     — counters */}
      <Faq /> {/* white    — accordion */}
      <CtaBand /> {/* photo + navy overlay — request a free quote */}
    </>
  );
}
