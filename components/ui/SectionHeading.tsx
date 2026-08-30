import type { SectionText } from "@/data/content";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** Heading text from data/content.ts (`sectionText.*`) — preferred. */
  text?: SectionText;
  /** Or pass the strings directly, for one-off headings. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Use on dark navy backgrounds. */
  light?: boolean;
};

export default function SectionHeading({
  text,
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const resolvedEyebrow = text?.eyebrow ?? eyebrow;
  const resolvedTitle = text?.title ?? title ?? "";
  const resolvedSubtitle = text?.subtitle ?? subtitle;

  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";

  return (
    <Reveal className={`${alignment} mb-12 sm:mb-14`}>
      {resolvedEyebrow && (
        <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-sky">
          {resolvedEyebrow}
        </p>
      )}

      <h2
        className={`text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] ${
          light ? "!text-white" : ""
        }`}
      >
        {resolvedTitle}
      </h2>

      {resolvedSubtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            light ? "text-white/80" : "text-muted"
          }`}
        >
          {resolvedSubtitle}
        </p>
      )}
    </Reveal>
  );
}
