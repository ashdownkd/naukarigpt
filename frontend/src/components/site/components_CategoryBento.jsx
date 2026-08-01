import Link from "next/link";
import { CATEGORIES } from "@/data/site";
import {
  Bell,
  Briefcase,
  IdCard,
  Trophy,
  GraduationCap,
  Coins,
  KeyRound,
  Wrench,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

const ICONS = {
  Bell,
  Briefcase,
  IdCard,
  Trophy,
  GraduationCap,
  Coins,
  KeyRound,
  Wrench,
  BookOpen,
};

export default function CategoryBento({ counts = {} }) {
  return (
    <section className="container-wide py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Explore
          </p>
          <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
            All 9 categories, one home.
          </h2>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => {
          const Icon = ICONS[c.icon] || Bell;
          const featured = c.featured;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              data-testid={`category-tile-${c.slug}`}
              className={`group relative overflow-hidden rounded-[var(--radius-lg)] card-elev card-elev-hover p-5 transition-shadow ${
                featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/25 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {counts[c.slug] ?? 0} posts
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <h3 className="font-display mt-4 text-lg sm:text-xl font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className={`mt-1 text-sm text-muted-foreground ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
                {c.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
