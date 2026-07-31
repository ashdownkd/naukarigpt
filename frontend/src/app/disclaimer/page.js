import Breadcrumb from "@/components/site/Breadcrumb";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${SITE.name}. All information is provided for reference only.`,
};

export default function DisclaimerPage() {
  return (
    <section className="container-tight py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="font-display mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        Disclaimer
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
      </p>

      <div className="prose-post mt-6">
        <p>
          {SITE.name} is an <strong>unofficial editorial website</strong>. We
          do our best to curate accurate, timely information from official
          government sources, but we do not represent, own, or operate any
          government or recruitment authority.
        </p>
        <h2>Reference only</h2>
        <p>
          All notifications, results, admit cards, dates and eligibility
          criteria published on this site are for <strong>reference
          only</strong>. Please always verify the details from the official
          website / notification PDF before applying.
        </p>
        <h2>External links</h2>
        <p>
          Apply Now and Official Notification buttons take you to third-party
          government / recruitment portals. We are not responsible for the
          content, availability or accuracy of those websites.
        </p>
        <h2>No employment guarantee</h2>
        <p>
          {SITE.name} does not conduct any exams, sell any admit cards, or
          guarantee employment. If anyone asks for money in the name of {SITE.name},
          please report it to us immediately.
        </p>
        <h2>Errors & omissions</h2>
        <p>
          Despite our best efforts, occasional errors may occur. If you spot
          an inaccuracy, please use the <a href="/report-bug">Report a Bug</a>
          page and we’ll fix it as soon as possible.
        </p>
      </div>
    </section>
  );
}
