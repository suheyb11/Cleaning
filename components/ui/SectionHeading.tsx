import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** Small coloured label above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Use on dark navy backgrounds. */
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";

  return (
    <Reveal className={`${alignment} mb-12 sm:mb-14`}>
      {eyebrow && (
        <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sky">
          {eyebrow}
        </p>
      )}

      <h2
        className={`text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] ${
          light ? "!text-white" : ""
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            light ? "text-white/80" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
