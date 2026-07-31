"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, Bell } from "lucide-react";
import { SITE } from "@/data/site";

const DELAY_MS = 12000;
const SUBSCRIBED_KEY = "ngpt_subscribed";
const DISMISSED_KEY = "ngpt_subscribe_dismissed";

const readLS = (k) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
};
const writeLS = (k, v) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, v);
  } catch {}
};
const removeLS = (k) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(k);
  } catch {}
};

const isSubscribed = () => readLS(SUBSCRIBED_KEY) === "true";
const getDismissed = () => readLS(DISMISSED_KEY) === "true";

export default function SubscribeModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initial timer. Runs once per full page load.
  // Rules:
  // - Subscribed: never show.
  // - Previously dismissed (hard-reload to a new page): show quickly on this
  //   new page and clear the dismissed flag.
  // - Fresh visitor: show 12 seconds after page load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSubscribed()) {
      setInitialized(true);
      return;
    }
    if (getDismissed()) {
      removeLS(DISMISSED_KEY);
      const t = setTimeout(() => {
        if (!isSubscribed()) setOpen(true);
        setInitialized(true);
      }, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (!isSubscribed()) setOpen(true);
      setInitialized(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // On client-side route change (after initialization): if user had
  // dismissed the modal on the previous page, show again on the new page.
  useEffect(() => {
    if (!initialized) return;
    if (typeof window === "undefined") return;
    if (isSubscribed()) return;
    if (getDismissed()) {
      // Consume the dismissed flag so we don't loop
      removeLS(DISMISSED_KEY);
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [pathname, initialized]);

  const handleSubscribe = (url) => {
    writeLS(SUBSCRIBED_KEY, "true");
    removeLS(DISMISSED_KEY);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  const handleOpenChange = (v) => {
    if (!v && !isSubscribed()) {
      writeLS(DISMISSED_KEY, "true");
    }
    setOpen(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="subscribe-modal"
        className="max-w-md border-border/70 bg-card/85 backdrop-blur"
      >
        <DialogHeader className="text-left">
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Bell className="h-3.5 w-3.5" />
            <span className="font-mono uppercase tracking-widest">Alerts</span>
          </div>
          <DialogTitle className="font-display text-2xl font-semibold tracking-tight">
            Never miss a government job again.
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Join our Telegram & WhatsApp channel to receive instant
            notifications for jobs, results and admit cards — free forever.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            onClick={() => handleSubscribe(SITE.telegram)}
            data-testid="subscribe-modal-telegram-button"
            className="btn-glow-hover"
          >
            <Send className="mr-2 h-4 w-4" /> Join Telegram
          </Button>
          <Button
            onClick={() => handleSubscribe(SITE.whatsapp)}
            variant="secondary"
            data-testid="subscribe-modal-whatsapp-button"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Join WhatsApp
          </Button>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          You can unsubscribe anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}
