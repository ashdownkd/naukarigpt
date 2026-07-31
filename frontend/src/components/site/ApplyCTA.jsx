import { ArrowUpRight, Calendar, FileText, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ApplyCTA({ post }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[var(--radius-lg)] card-elev p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Take action
        </p>
        <h3 className="font-display mt-1 text-lg font-semibold">
          Ready to apply?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete your application on the official portal before the last
          date.
        </p>
        {post.applyLink && (
          <Button
            asChild
            className="mt-4 w-full btn-glow-hover"
            data-testid="apply-cta-apply-now-button"
          >
            <a
              href={post.applyLink}
              target={post.applyLink.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              data-testid="apply-cta-apply-link"
            >
              {post.applyLinkLabel} <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        )}
        {post.officialLink && (
          <Button
            asChild
            variant="outline"
            className="mt-2 w-full"
            data-testid="apply-cta-official-notification"
          >
            <a href={post.officialLink} target="_blank" rel="noreferrer">
              <FileText className="mr-2 h-4 w-4" /> Official Notification
            </a>
          </Button>
        )}
      </div>

      <div className="rounded-[var(--radius-lg)] card-elev p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          At a glance
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
            <span>
              <span className="text-muted-foreground">Location: </span>
              {post.location}
            </span>
          </li>
          {post.vacancies > 0 && (
            <li className="flex items-start gap-2">
              <Users className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>
                <span className="text-muted-foreground">Vacancies: </span>
                {post.vacancies.toLocaleString("en-IN")}
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 text-primary shrink-0" />
            <span>
              <span className="text-muted-foreground">Last date: </span>
              {new Date(post.lastDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(post.tags || []).slice(0, 4).map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              #{t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
