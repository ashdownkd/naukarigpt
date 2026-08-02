import Breadcrumb from "@/components/site/Breadcrumb";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="container-tight py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
      <h1 className="font-display mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        Terms & Conditions
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
      </p>

      <div className="prose-post mt-6">
        <p>
          By accessing or using {SITE.domain}, you agree to be bound by these
          Terms & Conditions. If you do not agree, please do not use the
          website.
        </p>
        <h2>Content usage</h2>
        <p>
          All content on {SITE.name} — including text, layouts, logos and
          artwork — is the property of {SITE.name} unless otherwise stated.
          You may reference our articles with proper attribution and a
          backlink to the original page.
        </p>
        <h2>User conduct</h2>
        <ul>
          <li>Do not attempt to disrupt or overload our infrastructure.</li>
          <li>Do not use automated scrapers that ignore robots.txt or rate limits.</li>
          <li>Do not submit false or misleading bug reports.</li>
        </ul>
        <h2>Advertisements</h2>
        <p>
          We may display advertisements, sponsorships or affiliate links on
          the site. These do not influence our editorial coverage.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          {SITE.name} shall not be liable for any direct, indirect, incidental
          or consequential damages arising from the use of, or inability to
          use, this website.
        </p>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes means you accept the revised terms.
        </p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India.</p>
      </div>
    </section>
  );
}
