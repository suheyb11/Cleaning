import { coreValues, mission, sectionText, vision } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function VisionValues() {
  return (
    <section id="vision" className="section-y bg-offwhite">
      <div className="container-x">
        <SectionHeading text={sectionText.vision} />

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

        {/* ---------- Core values ----------
            A wrapping row of compact chips rather than a seven-column grid of
            boxes: seven one-word values do not each need a card, and the chips
            centre and re-wrap cleanly at every width. */}
        <Reveal className="mb-8 mt-14 text-center">
          <h3 className="text-2xl font-semibold sm:text-3xl">Our Core Values</h3>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {coreValues.map((value, index) => (
              <li key={value.title}>
                <div className="group flex items-center gap-2.5 rounded-full border border-navy/10 bg-white py-2 pl-2 pr-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:shadow-lift">
                  <AnimatedIcon
                    name={value.icon}
                    delay={index * 0.05}
                    wrapperClassName="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                    className="h-[18px] w-[18px]"
                  />
                  <span className="font-heading text-sm font-semibold text-navy">
                    {value.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
