import Breadcrumb from "@/components/site/Breadcrumb";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <section className="container-tight py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="font-display mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
      </p>

      <div className="prose-post mt-6">
        <p>
          At {SITE.name} ("we", "our", "us"), we respect your privacy. This
          Privacy Policy explains how we collect, use and safeguard your
          information when you visit {SITE.domain}.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Usage data:</strong> anonymised analytics such as pages
            visited, browser type and referring source (via privacy-friendly
            analytics).
          </li>
          <li>
            <strong>Voluntary data:</strong> details you share via the report
            bug form (name, email, description).
          </li>
        </ul>
        <h2>How we use information</h2>
        <ul>
          <li>To improve site quality and content curation.</li>
          <li>To respond to your bug reports and messages.</li>
          <li>To send optional updates via Telegram / WhatsApp — only if you subscribe.</li>
        </ul>
        <h2>Cookies</h2>
        <p>
          We use a small amount of browser storage (localStorage) to remember
          your subscription preferences so we do not repeatedly show you the
          subscribe modal. We do not track you across other websites.
        </p>
        <h2>Third-party links</h2>
        <p>
          Job listings and results link to third-party official portals. We
          are not responsible for the privacy practices or content of those
          websites. Please review their policies separately.
        </p>
        <h2>Data retention</h2>
        <p>
          Bug report submissions may be retained for up to 12 months to help
          us track patterns and resolve issues.
        </p>
        <h2>Your rights</h2>
        <p>
          You can request deletion of any personal data you have submitted by
          emailing us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy? Reach out at {SITE.email}.</p>
      </div>
    </section>
  );
}
