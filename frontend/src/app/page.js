import Hero from "@/components/site/Hero";
import CategoryBento from "@/components/site/CategoryBento";
import PostCard from "@/components/site/PostCard";
import TrendingList from "@/components/site/TrendingList";
import Ticker from "@/components/site/Ticker";
import AdSlot from "@/components/site/AdSlot";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/site";
import {
  getFeaturedPosts,
  getLatestPosts,
  getTrendingPosts,
  getPostsByCategory,
  getAllPosts,
} from "@/lib/posts";

export const metadata = {
  title: "Latest Jobs, Results & Admit Cards — NaukariGPT",
  description:
    "Latest sarkari jobs, results, admit cards, admissions, scholarships & answer keys — curated daily on NaukariGPT.",
};

// Posts now come from the live backend — always render fresh, never
// pre-build a frozen snapshot at build time.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [latest, featured, trending, toolPosts, allPosts] = await Promise.all([
    getLatestPosts(12),
    getFeaturedPosts(6),
    getTrendingPosts(6),
    getPostsByCategory("tools"),
    getAllPosts(),
  ]);

  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.slug] = allPosts.filter((p) => p.category === c.slug).length;
    return acc;
  }, {});

  return (
    <>
      <Hero latestCount={allPosts.length} />
      <Ticker items={featured} />
      <CategoryBento counts={counts} />

      <section className="container-wide pb-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Feed
                </p>
                <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
                  Latest across categories
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm" data-testid="home-view-all-jobs">
                <Link href="/category/jobs">
                  All jobs <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {latest.map((p, i) => (
                <div key={p.id} className="contents">
                  <PostCard post={p} />
                  {i === 5 && (
                    <div className="md:col-span-2">
                      <AdSlot slot="inFeed" label="Sponsored" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <TrendingList posts={trending} />

            <AdSlot slot="sidebar" label="Advertisement" />

            <aside className="rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Quick access
              </p>
              <h3 className="font-display mt-1 text-base font-semibold">Popular tools</h3>
              <ul className="mt-3 space-y-2">
                {toolPosts
                  .slice(0, 5)
                  .map((t) => (
                    <li key={t.id}>
                      <Link
                        href={`/category/${t.category}/${t.slug}`}
                        data-testid={`home-tool-${t.slug}`}
                        className="flex items-center justify-between rounded-md border border-transparent bg-background/40 px-3 py-2 text-sm hover:border-border/70"
                      >
                        <span className="line-clamp-1">{t.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
