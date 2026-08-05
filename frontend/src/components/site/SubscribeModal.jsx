"use client";

import { useEffect, useState } from "react";
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

const DELAY_MS = 15000; // show after the visitor has stayed 15 seconds
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // don't nag again for 24h after a dismiss
const SUBSCRIBED_KEY = "ngpt_subscribed";
const DISMISSED_AT_KEY = "ngpt_subscribe_dismissed_at";

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

const isSubscribed = () => readLS(SUBSCRIBED_KEY) === "true";

const isInCooldown = () => {
  const raw = readLS(DISMISSED_AT_KEY);
  if (!raw) return false;
  const dismissedAt = Number(raw);
  if (Number.isNaN(dismissedAt)) return false;
  return Date.now() - dismissedAt < COOLDOWN_MS;
};

export default function SubscribeModal() {
  const [open, setOpen] = useState(false);

  // Runs once per full page load only — does NOT re-trigger on client-side
  // route changes, so it no longer nags on every page you click to.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSubscribed()) return;
    if (isInCooldown()) return;

    const t = setTimeout(() => {
      if (!isSubscribed() && !isInCooldown()) setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const handleSubscribe = (url) => {
    writeLS(SUBSCRIBED_KEY, "true");
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  const handleOpenChange = (v) => {
    if (!v && !isSubscribed()) {
      writeLS(DISMISSED_AT_KEY, String(Date.now()));
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
