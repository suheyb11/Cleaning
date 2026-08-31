import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders a blog post's markdown body with the site's typography and brand
 * colors. A plain server component — react-markdown does its rendering
 * synchronously with no client-only APIs, so it works fine in a Server
 * Component and never ships its own JS to the browser.
 */
export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="mb-4 mt-8 text-2xl font-semibold sm:text-3xl" {...props} />
          ),
          h2: (props) => (
            <h2 className="mb-3 mt-8 text-xl font-semibold sm:text-2xl" {...props} />
          ),
          h3: (props) => (
            <h3 className="mb-2 mt-6 text-lg font-semibold" {...props} />
          ),
          p: (props) => (
            <p className="mb-4 leading-relaxed text-ink" {...props} />
          ),
          ul: (props) => (
            <ul className="mb-4 list-disc space-y-1.5 pl-5 text-ink" {...props} />
          ),
          ol: (props) => (
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-ink" {...props} />
          ),
          li: (props) => <li className="leading-relaxed" {...props} />,
          a: (props) => (
            <a
              className="font-medium text-sky underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: (props) => (
            <strong className="font-semibold text-navy" {...props} />
          ),
          blockquote: (props) => (
            <blockquote
              className="my-4 border-l-4 border-sky pl-4 italic text-muted"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="rounded bg-offwhite px-1.5 py-0.5 text-[0.85em] text-navy"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="my-4 overflow-x-auto rounded-2xl bg-navy p-4 text-sm text-white"
              {...props}
            />
          ),
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary markdown content, not a known-size asset
            <img className="my-4 w-full rounded-2xl" alt={props.alt ?? ""} {...props} />
          ),
          hr: (props) => <hr className="my-8 border-navy/10" {...props} />,
          table: (props) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border-b border-navy/15 px-3 py-2 text-left font-semibold text-navy"
              {...props}
            />
          ),
          td: (props) => (
            <td className="border-b border-navy/10 px-3 py-2 text-ink" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
