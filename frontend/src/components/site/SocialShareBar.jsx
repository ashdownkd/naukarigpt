"use client";

import { toast } from "sonner";
import { Facebook, Twitter, Linkedin, Send, MessageCircle, Copy } from "lucide-react";

export default function SocialShareBar({ url, title }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : url;

  const links = [
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
    },
    {
      key: "telegram",
      icon: Send,
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      key: "facebook",
      icon: Facebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      key: "twitter",
      icon: Twitter,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      key: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div data-testid="social-share-bar" className="flex flex-wrap items-center gap-1.5">
      {links.map(({ key, icon: Icon, label, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${label}`}
          data-testid={`share-${key}-button`}
          className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        data-testid="share-copylink-button"
        className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
