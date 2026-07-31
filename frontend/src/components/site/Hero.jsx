import Link from "next/link";
import { Search, Send, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE, CATEGORIES } from "@/data/site";

export default function Hero({ latestCount = 0 }) {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="hero-radial absolute inset-0" aria-hidden="true" />
      <div className="container-wide relative py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="font-mono uppercase tracking-widest">
                Verified sources • Updated daily
              </span>
            </div>
            <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
              Every <span className="text-primary">sarkari</span> update.
              <br className="hidden sm:block" /> Zero clutter.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
              {SITE.name} is a modern, premium hub for the latest government
              notifications, jobs, admit cards, results & scholarships —
              designed for aspirants who value speed and clarity.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="btn-glow-hover" data-testid="hero-browse-jobs">
                <Link href="/category/jobs">
                  Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="hero-telegram">
                <a href={SITE.telegram} target="_blank" rel="noreferrer">
                  <Send className="mr-2 h-4 w-4" /> Join Telegram
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  data-testid={`hero-chip-${c.slug}`}
                  className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  {c.short}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Today at a glance
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <Stat value={`${latestCount}`} label="Latest posts" />
                <Stat value="9" label="Categories" />
                <Stat value="24/7" label="Curated" />
              </div>
              <div className="mt-4 rounded-[var(--radius)] border border-primary/25 bg-primary/5 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Pro tip
                </p>
                <p className="mt-1 text-sm text-foreground/90">
                  Join our Telegram channel to receive instant alerts within
                  minutes of a new notification going live.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Free</Badge>
                  <Badge variant="outline">No spam</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/50 p-3">
      <p className="font-display text-xl font-semibold">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
