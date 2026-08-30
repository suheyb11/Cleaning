import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServicesSection from "@/components/ServicesSection";
import StatsBand from "@/components/StatsBand";
import VisionValues from "@/components/VisionValues";
import WhyChoose from "@/components/WhyChoose";

/**
 * Home page — simply composes the sections in order.
 * Edit the text of any section in data/content.ts.
 *
 * The sections deliberately alternate in both background colour and layout
 * (split image/text → card grid → cards → timeline → image banners → …)
 * so the page never reads as one long wall of identical boxes.
 */
export default function HomePage() {
  return (
    <>
      <Hero /> {/* navy  — image + gradient */}
      <AboutSection /> {/* white — split image / text + checklist */}
      <ServicesSection /> {/* offwhite — card grid with photos */}
      <WhyChoose /> {/* white — feature cards */}
      <ProcessTimeline /> {/* offwhite — timeline */}
      <Industries /> {/* white — image banners + chips */}
      <VisionValues /> {/* offwhite — two panels + value cards */}
      <StatsBand /> {/* navy  — counters */}
      <CtaBand /> {/* photo + navy overlay */}
      <ContactSection /> {/* offwhite — form */}
    </>
  );
}
