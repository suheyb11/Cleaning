import Reveal from "./ui/Reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/** The compact navy banner shown at the top of the inner pages. */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-sky py-16 text-white sm:py-20">
      {/* Decorative bubbles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky/25 blur-3xl animate-float" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float-slow" />
      </div>

      <div className="container-x relative">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sky">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-3xl font-semibold !text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
