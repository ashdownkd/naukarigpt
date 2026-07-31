import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-foreground">
              {it.label}
            </Link>
          ) : (
            <span className="text-foreground/80">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
