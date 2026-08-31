import { sectionText, whyChoose } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Card from "./ui/Card";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function WhyChoose() {
  return (
    <section id="why-us" className="section-y bg-white">
      <div className="container-x">
        <SectionHeading text={sectionText.whyUs} />

        {/* Seven cards do not divide evenly into three columns, so a plain
            grid leaves the last one stranded on the left. A centred flex-wrap
            with explicit widths keeps the same 1 / 2 / 3 per row but centres
            whatever is left over on the final row. The widths subtract the
            gaps so the rows still line up like a grid. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {whyChoose.map((item, index) => (
            <li
              key={item.title}
              className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <Reveal delay={index * 0.06} className="h-full">
                <Card className="border-navy/10 bg-offwhite/60">
                  <div className="flex items-start gap-4">
                    <AnimatedIcon
                      name={item.icon}
                      delay={index * 0.06}
                      wrapperClassName="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                      className="h-6 w-6"
                    />
                    <div>
                      <h3 className="mb-1.5 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
