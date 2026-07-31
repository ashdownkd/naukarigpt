"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

export default function Ticker({ items = [] }) {
  if (!items.length) return null;
  const list = [...items, ...items];
  return (
    <div className="relative border-y border-border/70 bg-background/60">
      <div className="container-wide flex items-center gap-3 py-2">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
          <Bell className="h-3 w-3" /> Live
        </span>
        <div className="relative flex-1 overflow-hidden ticker-mask">
          <div className="flex min-w-max gap-10 animate-marquee">
            {list.map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                href={`/category/${p.category}/${p.slug}`}
                className="whitespace-nowrap text-xs text-muted-foreground hover:text-foreground"
                data-testid={`ticker-item-${i}—${p.slug}`}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {p.category.replace(/-/g, " ")}
                </span>
                <span className="mx-2 text-foreground/40">|</span>
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
