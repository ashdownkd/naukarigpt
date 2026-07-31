import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { CATEGORIES } from "@/data/site";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

export default function PostCard({ post, variant = "list" }) {
  const cat = CATEGORIES.find((c) => c.slug === post.category);
  const href = `/category/${post.category}/${post.slug}`;
  const isDeadlineSoon =
    new Date(post.lastDate).getTime() - Date.now() < 5 * 24 * 60 * 60 * 1000;
  return (
    <article
      data-testid={`post-card-${post.slug}`}
      className="group rounded-[var(--radius)] card-elev card-elev-hover p-4 sm:p-5 transition-shadow"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {cat && (
          <Badge
            variant="outline"
            className="border-primary/30 text-primary uppercase tracking-widest text-[10px]"
          >
            {cat.short}
          </Badge>
        )}
        {post.isNew && (
          <Badge className="bg-primary text-primary-foreground text-[10px] uppercase">
            New
          </Badge>
        )}
        {isDeadlineSoon && (
          <Badge
            variant="outline"
            className="border-destructive/50 text-destructive text-[10px] uppercase"
          >
            Last date soon
          </Badge>
        )}
        {post.vacancies > 0 && post.category === "jobs" && (
          <Badge
            variant="outline"
            className="border-border/70 text-muted-foreground text-[10px] uppercase"
          >
            {post.vacancies.toLocaleString("en-IN")} vacancies
          </Badge>
        )}
      </div>

      <h3 className="font-display mt-3 text-base sm:text-lg font-semibold leading-snug tracking-tight line-clamp-2">
        <Link href={href} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h3>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {fmtDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {post.location}
        </span>
        <span className="text-foreground/60">•</span>
        <span>Last date: {fmtDate(post.lastDate)}</span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button asChild size="sm" data-testid={`post-card-open-${post.slug}`} className="btn-glow-hover">
          <Link href={href}>
            View Details
          </Link>
        </Button>
        {post.applyLink && (
          <Button
            asChild
            size="sm"
            variant="outline"
            data-testid={`post-card-apply-${post.slug}`}
          >
            <a
              href={post.applyLink}
              target={post.applyLink.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
            >
              {post.applyLinkLabel} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}
