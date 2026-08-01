"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { searchPosts } from "@/lib/search";
import { useAllPosts } from "@/lib/useAllPosts";

const SUGGESTIONS = [
  "SSC CGL 2025",
  "NEET UG admit card",
  "Bank PO jobs",
  "CBSE 10th result",
  "UPSC answer key",
  "scholarships for graduates",
];

export default function ChatWidget() {
  const posts = useAllPosts();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm NaukariGPT Assistant. Ask me about jobs, admit cards, results, scholarships or anything on this site.",
    },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = (text) => {
    const query = (text ?? q).trim();
    if (!query) return;
    const results = searchPosts(posts, query, 4);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      {
        role: "bot",
        text: results.length
          ? `I found ${results.length} matching ${
              results.length === 1 ? "result" : "results"
            } on NaukariGPT:`
          : "I couldn't find a direct match. Try one of these popular categories or refine your keywords.",
        results,
      },
    ]);
    setQ("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        data-testid="chat-widget-open-button"
        className="fixed bottom-4 right-4 z-[60] grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elev-2)] hover:shadow-[var(--shadow-glow-blue)] transition-shadow"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            data-testid="chat-widget-panel"
            className="fixed bottom-4 right-4 z-[70] flex h-[70vh] max-h-[560px] w-[92vw] sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 backdrop-blur shadow-[var(--shadow-elev-2)]"
          >
            <div className="flex items-center justify-between border-b border-border/70 bg-background/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-none">NaukariGPT</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Assistant • online
                  </p>
                </div>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                data-testid="chat-widget-close-button"
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div key={i}>
                    {m.role === "bot" ? (
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border/70 bg-background/60 px-3 py-2 text-sm">
                        {m.text}
                        {m.results && m.results.length > 0 && (
                          <div className="mt-2 space-y-1.5">
                            {m.results.map((r, idx) => (
                              <Link
                                key={r.id}
                                href={`/category/${r.category}/${r.slug}`}
                                onClick={() => setOpen(false)}
                                data-testid={`chat-widget-result-${idx}`}
                                className="group flex items-center justify-between gap-2 rounded-md border border-border/70 bg-card/70 px-2.5 py-1.5 hover:border-primary/50"
                              >
                                <span className="line-clamp-1 text-xs">
                                  {r.title}
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                        {m.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {messages.length === 1 && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Try asking
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        data-testid={`chat-widget-suggestion-${s.replace(/\s+/g, "-").toLowerCase()}`}
                        className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/70 bg-background/50 p-2">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask NaukariGPT…"
                  data-testid="chat-widget-input"
                  className="h-10 flex-1"
                />
                <Button
                  onClick={() => submit()}
                  size="icon"
                  data-testid="chat-widget-send-button"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1.5 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Powered by on-site search • no cost, no signup
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
