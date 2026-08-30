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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Card className="border-navy/10 bg-offwhite/60">
                <div className="flex items-start gap-4">
                  <AnimatedIcon
                    name={item.icon}
                    delay={index * 0.06}
                    wrapperClassName="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-navy shadow-soft transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
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
          ))}
        </div>
      </div>
    </section>
  );
}
