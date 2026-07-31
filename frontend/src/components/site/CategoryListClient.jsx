"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "@/components/site/PostCard";
import AdSlot from "@/components/site/AdSlot";
import FilterBar from "@/components/site/FilterBar";
import { filterPosts } from "@/data/demo";
import { Info } from "lucide-react";

export default function CategoryListClient({ posts = [] }) {
  const searchParams = useSearchParams();

  const filters = {
    state: searchParams.get("state") || "all",
    department: searchParams.get("department") || "all",
    qualification: searchParams.get("qualification") || "all",
  };

  const filtered = useMemo(
    () => filterPosts(posts, filters),
    [posts, filters.state, filters.department, filters.qualification]
  );

  const AD_EVERY = 6;

  return (
    <>
      <FilterBar totalCount={posts.length} resultCount={filtered.length} />

      {filtered.length === 0 ? (
        <div
          data-testid="filter-empty-state"
          className="mt-8 rounded-[var(--radius-lg)] card-elev p-8 text-center"
        >
          <Info className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 font-display text-lg font-semibold">
            No posts match your filters.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try loosening a filter or clearing them to see all posts in this
            category.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => {
            const showAdAfter = (i + 1) % AD_EVERY === 0 && i !== filtered.length - 1;
            return (
              <div key={p.id} className="contents">
                <PostCard post={p} />
                {showAdAfter && (
                  <div className="md:col-span-2 xl:col-span-3">
                    <AdSlot slot="inFeed" label="Sponsored" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
