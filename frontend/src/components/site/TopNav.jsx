"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Send, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES, SITE } from "@/data/site";
import { searchPosts } from "@/data/demo";

const NAV_ITEMS = CATEGORIES.slice(0, 6);
const MORE_ITEMS = CATEGORIES.slice(6);

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchPosts(q, 6), [q]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const submit = (e) => {
    e?.preventDefault?.();
    if (results[0]) {
      router.push(`/category/${results[0].category}/${results[0].slug}`);
      setQ("");
    }
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50"
      data-testid="top-nav"
    >
      <div className="container-wide flex h-16 items-center gap-3">
        <Link
          href="/"
          data-testid="topnav-logo-link"
          className="flex items-center gap-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30">
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-foreground">Naukari</span>
            <span className="text-primary">GPT</span>
          </span>
        </Link>

        <nav className="ml-6 hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                data-testid={`topnav-cat-${c.slug}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.short}
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                data-testid="topnav-more-button"
              >
                More <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {MORE_ITEMS.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link href={`/category/${c.slug}`} data-testid={`topnav-more-${c.slug}`}>
                    {c.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form
            onSubmit={submit}
            className="relative hidden md:block"
            role="search"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs, results, admit cards…"
              className="h-10 w-[260px] xl:w-[360px] pl-9 pr-3"
              data-testid="topnav-search-input"
            />
            {q && results.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-[360px] rounded-lg border border-border/70 bg-popover/95 p-1 shadow-lg backdrop-blur">
                {results.map((r) => (
                  <Link
                    key={r.id}
                    href={`/category/${r.category}/${r.slug}`}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                    onClick={() => setQ("")}
                    data-testid={`topnav-search-result-${r.slug}`}
                  >
                    <div className="line-clamp-1 font-medium">{r.title}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {r.category}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </form>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex btn-glow-hover"
            data-testid="topnav-telegram-link"
          >
            <a href={SITE.telegram} target="_blank" rel="noreferrer">
              <Send className="mr-1.5 h-4 w-4" /> Join Telegram
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                data-testid="topnav-mobile-menu-button"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="font-display text-xl">
                  Naukari<span className="text-primary">GPT</span>
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={submit} className="mt-4 relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="pl-9"
                  data-testid="topnav-mobile-search-input"
                />
              </form>
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Categories
                </p>
                <div className="mt-2 grid grid-cols-1 gap-1">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-secondary"
                      data-testid={`topnav-mobile-cat-${c.slug}`}
                    >
                      <span>{c.title}</span>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {c.short}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Pages
                </p>
                <div className="mt-2 grid grid-cols-1 gap-1">
                  {["about", "privacy-policy", "disclaimer", "terms", "report-bug"].map((p) => (
                    <Link
                      key={p}
                      href={`/${p}`}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                      data-testid={`topnav-mobile-page-${p}`}
                    >
                      {p.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
              <Button asChild className="mt-6 w-full btn-glow-hover" data-testid="topnav-mobile-telegram">
                <a href={SITE.telegram} target="_blank" rel="noreferrer">
                  <Send className="mr-2 h-4 w-4" /> Join Telegram Channel
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
