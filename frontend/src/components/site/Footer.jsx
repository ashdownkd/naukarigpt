import Link from "next/link";
import { SITE, CATEGORIES } from "@/data/site";
import { Send, MessageCircle, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-background/60">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            <span className="text-foreground">Naukari</span>
            <span className="text-primary">GPT</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            {SITE.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              data-testid="footer-telegram-link"
              className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-primary"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              data-testid="footer-whatsapp-link"
              className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              data-testid="footer-twitter-link"
              className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              data-testid="footer-facebook-link"
              className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              data-testid="footer-email-link"
              className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Categories
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-1.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid={`footer-cat-${c.slug}`}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Company
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-1.5">
            {[
              { slug: "about", label: "About Us" },
              { slug: "privacy-policy", label: "Privacy Policy" },
              { slug: "disclaimer", label: "Disclaimer" },
              { slug: "terms", label: "Terms & Conditions" },
              { slug: "report-bug", label: "Report a Bug" },
            ].map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid={`footer-page-${p.slug}`}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Newsletter
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Get the latest job alerts & results directly to your Telegram —
            zero spam.
          </p>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-telegram-cta"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elev-1)] hover:shadow-[var(--shadow-glow-blue)]"
          >
            <Send className="h-4 w-4" /> Join Telegram
          </a>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Made with care for aspirants across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
