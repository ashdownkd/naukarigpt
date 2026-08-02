import Breadcrumb from "@/components/site/Breadcrumb";
import ReportBugForm from "@/components/site/ReportBugForm";
import { SITE } from "@/data/site";
import { Bug } from "lucide-react";

export const metadata = {
  title: "Report a Bug",
  description: `Found something broken on ${SITE.name}? Let us know and we'll fix it fast.`,
  alternates: { canonical: "/report-bug" },
};

export default function ReportBugPage() {
  return (
    <section className="container-tight py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Report a Bug" }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary">
          <Bug className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Report a Bug
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spotted a broken link, wrong info, or UI glitch? Send us the
            details and we’ll fix it fast.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ReportBugForm />
      </div>
    </section>
  );
}
