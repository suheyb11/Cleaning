import { site, trustPoints } from "@/data/content";
import AnimatedIcon from "./ui/AnimatedIcon";
import Reveal from "./ui/Reveal";

/**
 * Slim promise band that sits directly under the hero, so the four things a
 * client actually worries about are answered before they scroll anywhere.
 */
export default function TrustBand() {
  return (
    <section className="border-b border-navy/5 bg-white py-10 sm:py-12">
      <div className="container-x">
        <Reveal className="mb-8 text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sky">
            {site.promise}
          </p>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 0.06} y={16}>
                <div className="group flex items-start gap-3.5">
                  <AnimatedIcon
                    name={point.icon}
                    delay={index * 0.06}
                    wrapperClassName="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky/10 text-navy transition-colors duration-300 group-hover:bg-sky group-hover:text-white"
                    className="h-5 w-5"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {point.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
