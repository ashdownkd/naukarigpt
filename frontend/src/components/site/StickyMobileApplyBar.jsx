"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Send } from "lucide-react";
import { SITE } from "@/data/site";

export default function StickyMobileApplyBar({ post }) {
  if (!post?.applyLink) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/90 backdrop-blur sm:hidden">
      <div className="flex items-center gap-2 p-3">
        <a
          href={SITE.telegram}
          target="_blank"
          rel="noreferrer"
          data-testid="sticky-telegram-button"
          className="grid h-11 w-11 place-items-center rounded-md border border-border/70 text-primary"
          aria-label="Join Telegram"
        >
          <Send className="h-4 w-4" />
        </a>
        <Button
          asChild
          className="flex-1 btn-glow-hover"
          data-testid="sticky-apply-button"
        >
          <a
            href={post.applyLink}
            target={post.applyLink.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
          >
            {post.applyLinkLabel} <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
