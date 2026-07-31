import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function TrendingList({ posts = [] }) {
  return (
    <aside className="rounded-[var(--radius-lg)] card-elev p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary">
          <TrendingUp className="h-4 w-4" />
        </span>
        <h3 className="font-display text-base font-semibold">Trending now</h3>
      </div>
      <ol className="mt-4 space-y-3">
        {posts.map((p, i) => (
          <li key={p.id} className="flex gap-3">
            <span className="font-mono text-xs text-muted-foreground w-5 pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`/category/${p.category}/${p.slug}`}
              data-testid={`trending-item-${p.slug}`}
              className="text-sm hover:text-primary line-clamp-2"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
