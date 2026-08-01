import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, SITE } from "@/data/site";
import { getPostBySlug, getPostsByCategory } from "@/lib/posts";
import Breadcrumb from "@/components/site/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import ApplyCTA from "@/components/site/ApplyCTA";
import StickyMobileApplyBar from "@/components/site/StickyMobileApplyBar";
import SocialShareBar from "@/components/site/SocialShareBar";
import ArticleJsonLd from "@/components/site/ArticleJsonLd";
import PostCard from "@/components/site/PostCard";
import AdSlot from "@/components/site/AdSlot";
import { Calendar, MapPin, Clock } from "lucide-react";

// Posts now come from the live backend, so pages render on-demand per
// request instead of being pre-built from a static list at build time.
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug, params.postSlug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/category/${post.category}/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug, params.postSlug);
  if (!post) notFound();
  const cat = getCategoryBySlug(post.category);
  const categoryPosts = await getPostsByCategory(post.category);
  const related = categoryPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 4);

  return (
    <section className="container-wide py-8 pb-24 sm:py-10 sm:pb-16">
      <ArticleJsonLd post={post} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: cat.title, href: `/category/${cat.slug}` },
          { label: post.title },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className="bg-primary text-primary-foreground uppercase tracking-widest text-[10px]">
              {cat.short}
            </Badge>
            {post.isNew && (
              <Badge variant="outline" className="border-primary/40 text-primary text-[10px] uppercase">
                New
              </Badge>
            )}
            {(post.tags || []).slice(0, 3).map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">
                #{t}
              </Badge>
            ))}
          </div>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Posted {fmtDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Last date {fmtDate(post.lastDate)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {post.location}
            </span>
            <span>By {post.org}</span>
          </div>

          <div className="mt-6 grid gap-3 rounded-[var(--radius-lg)] card-elev p-5 sm:grid-cols-2">
            <InfoRow label="Eligibility" value={post.eligibility} />
            <InfoRow label="Age Limit" value={post.ageLimit} />
            <InfoRow label="Application Fee" value={post.fee} />
            {post.vacancies > 0 && (
              <InfoRow label="Total Vacancies" value={post.vacancies.toLocaleString("en-IN")} />
            )}
          </div>

          {post.importantDates?.length > 0 && (
            <div className="mt-6 rounded-[var(--radius-lg)] card-elev overflow-hidden">
              <div className="border-b border-border/70 bg-background/40 px-5 py-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Important Dates
                </p>
              </div>
              <table className="w-full text-sm" data-testid="important-dates-table">
                <tbody>
                  {post.importantDates.map((d, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0 ? "bg-transparent" : "bg-background/40"
                      }
                    >
                      <td className="px-5 py-2.5 text-muted-foreground">{d.label}</td>
                      <td className="px-5 py-2.5 font-mono text-right sm:text-left">
                        {d.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            className="prose-post mt-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-8">
            <AdSlot slot="inArticle" label="Advertisement" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] card-elev p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Share this post
            </p>
            <div className="ml-auto">
              <SocialShareBar
                url={`${SITE.url}/category/${post.category}/${post.slug}`}
                title={post.title}
              />
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                More in {cat.title}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {related.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-20 space-y-4">
            <ApplyCTA post={post} />
            <AdSlot slot="sidebar" label="Advertisement" />
          </div>
        </aside>
      </div>

      <StickyMobileApplyBar post={post} />
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
