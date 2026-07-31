import Breadcrumb from "@/components/site/Breadcrumb";
import { SITE } from "@/data/site";
import { Send, MessageCircle, Mail, ShieldCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: `Learn more about ${SITE.name} — India's premium hub for jobs, results and admit cards.`,
};

export default function AboutPage() {
  return (
    <section className="container-tight py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <h1 className="font-display mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        About {SITE.name}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {SITE.name} is an independent editorial portal built for India's job
        seekers and students. We curate the latest government job
        notifications, admit cards, results, admissions, scholarships and
        answer keys — with a clean, mobile-first experience that respects your
        time.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card icon={ShieldCheck} title="Verified">
          We reference official government portals for every notification we
          publish.
        </Card>
        <Card icon={Sparkles} title="Premium UX">
          A modern, fast, black-and-blue interface designed to work on any
          device.
        </Card>
        <Card icon={Users} title="For everyone">
          Whether you’re a fresher, working professional, or repeat aspirant,
          NaukariGPT is for you.
        </Card>
      </div>

      <div className="mt-10 space-y-4 prose-post">
        <h2>Our mission</h2>
        <p>
          Millions of Indians rely on scattered, cluttered websites to check
          their next big career opportunity. We believe you deserve better — a
          single, well-organised hub where every listing is easy to read,
          share and act on.
        </p>
        <h2>What we cover</h2>
        <ul>
          <li>Latest sarkari notifications & private-sector openings</li>
          <li>Admit cards, hall tickets, exam city intimations</li>
          <li>Results, cutoffs & merit lists</li>
          <li>Admission alerts, entrance exams & counselling</li>
          <li>Scholarships & education loans</li>
          <li>Official & unofficial answer keys</li>
          <li>Free tools & preparation guides</li>
        </ul>
        <h2>Get in touch</h2>
        <p>Have a suggestion, correction, or partnership request? We’d love to hear from you.</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <a
          href={SITE.telegram}
          target="_blank"
          rel="noreferrer"
          data-testid="about-telegram"
          className="rounded-[var(--radius)] card-elev card-elev-hover p-5"
        >
          <Send className="h-5 w-5 text-primary" />
          <p className="mt-2 font-medium">Telegram</p>
          <p className="text-sm text-muted-foreground">Join our channel</p>
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-testid="about-whatsapp"
          className="rounded-[var(--radius)] card-elev card-elev-hover p-5"
        >
          <MessageCircle className="h-5 w-5 text-primary" />
          <p className="mt-2 font-medium">WhatsApp</p>
          <p className="text-sm text-muted-foreground">Chat with our team</p>
        </a>
        <Link
          href="/report-bug"
          data-testid="about-report-bug"
          className="rounded-[var(--radius)] card-elev card-elev-hover p-5"
        >
          <Mail className="h-5 w-5 text-primary" />
          <p className="mt-2 font-medium">Report a bug</p>
          <p className="text-sm text-muted-foreground">Help us improve</p>
        </Link>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-[var(--radius-lg)] card-elev p-5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-3 font-display font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
