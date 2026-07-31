import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategoryBySlug } from "@/data/site";
import { getPostsByCategory } from "@/data/demo";
import CategoryListClient from "@/components/site/CategoryListClient";
import AdSlot from "@/components/site/AdSlot";
import Breadcrumb from "@/components/site/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug);

  return (
    <section className="container-wide py-8 sm:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: cat.title },
        ]}
      />

      <header className="mt-4 rounded-[var(--radius-lg)] card-elev p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          {cat.short}
        </p>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
          {cat.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-muted-foreground">
          {cat.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">
            {posts.length} posts
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px]">
            Updated {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </Badge>
        </div>
      </header>

      <div className="mt-8">
        <CategoryListClient posts={posts} />
      </div>

      <div className="mt-10">
        <AdSlot slot="banner" label="Advertisement" />
      </div>

      <div className="mt-10 flex items-center justify-between rounded-[var(--radius-lg)] card-elev p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Continue exploring
          </p>
          <p className="mt-1 text-sm">Browse other categories on NaukariGPT.</p>
        </div>
        <Button asChild variant="outline" size="sm" data-testid="category-home-link">
          <Link href="/">
            All categories <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
