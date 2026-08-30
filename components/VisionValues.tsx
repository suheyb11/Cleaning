import { coreValues, mission, vision } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function VisionValues() {
  return (
    <section id="vision" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading
          eyebrow="What Drives Us"
          title="Vision, Mission & Core Values"
          subtitle="Clear standards guide every job we take on, large or small."
        />

        {/* ---------- Vision & Mission ---------- */}
        <div className="grid gap-6 lg:grid-cols-2">
          {[vision, mission].map((block, index) => (
            <Reveal key={block.title} delay={index * 0.1}>
              <div className="group h-full rounded-3xl bg-navy p-8 text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-10">
                <AnimatedIcon
                  name={block.icon}
                  delay={index * 0.1}
                  wrapperClassName="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-white"
                  className="h-7 w-7"
                />
                <h3 className="mb-3 text-2xl font-semibold !text-white">
                  {block.title}
                </h3>
                <p className="leading-relaxed text-white/80">{block.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Core values ---------- */}
        <Reveal className="mt-14 mb-8 text-center">
          <h3 className="text-2xl font-semibold sm:text-3xl">Our Core Values</h3>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {coreValues.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.05}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/30 hover:shadow-lift">
                <AnimatedIcon
                  name={value.icon}
                  delay={index * 0.05}
                  wrapperClassName="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                  className="h-6 w-6"
                />
                <span className="font-heading text-sm font-semibold text-navy">
                  {value.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
