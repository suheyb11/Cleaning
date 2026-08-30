import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="section-y bg-offwhite">
      <div className="container-x flex flex-col items-center py-16 text-center">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky/10 text-sky">
          <Icon name="Search" className="h-8 w-8" />
        </span>
        <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you are looking for does not exist. Let us take you back to
          the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
