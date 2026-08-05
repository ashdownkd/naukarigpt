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

// Posts now come from the live backend — always render fresh, never
// pre-build a frozen snapshot at build time.
export const dynamic = "force-dynamic";
export const revalidate = 0;
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

          {(post.examName || post.eligibility) && (
            <div className="mt-6 rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Exam / Eligibility
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {post.examName && <InfoRow label="Exam Name" value={post.examName} />}
                {post.eligibility && <InfoRow label="Eligibility Criteria" value={post.eligibility} />}
              </div>
            </div>
          )}

          {(post.feeGeneral || post.feeScSt || post.feePh || post.fee) && (
            <div className="mt-6 rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Application Fee
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {post.feeGeneral && <InfoRow label="Fee — General/OBC" value={post.feeGeneral} />}
                {post.feeScSt && <InfoRow label="Fee — SC/ST" value={post.feeScSt} />}
                {post.feePh && <InfoRow label="Fee — PH (Differently-abled)" value={post.feePh} />}
                {!post.feeGeneral && !post.feeScSt && !post.feePh && post.fee && (
                  <p className="text-sm">{post.fee}</p>
                )}
                {post.feePaymentModes?.length > 0 && (
                  <InfoRow label="Payment Modes" value={post.feePaymentModes.join(", ")} />
                )}
              </div>
            </div>
          )}

          {(post.ageMin || post.ageMax || post.ageRelaxationNote || post.ageLimit) && (
            <div className="mt-6 rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Age Limit
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {post.ageMin != null && <InfoRow label="Minimum Age" value={`${post.ageMin} years`} />}
                {post.ageMax != null && <InfoRow label="Maximum Age" value={`${post.ageMax} years`} />}
                {!post.ageMin && !post.ageMax && post.ageLimit && (
                  <p className="text-sm">{post.ageLimit}</p>
                )}
                {post.ageRelaxationNote && (
                  <InfoRow label="Age Relaxation" value={post.ageRelaxationNote} />
                )}
                {post.ageAsOnDate && <InfoRow label="As On" value={post.ageAsOnDate} />}
              </div>
            </div>
          )}

          {(post.vacancies > 0 || post.selectionProcess) && (
            <div className="mt-6 rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Vacancy &amp; Selection
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoRow
                  label="Total Post / Vacancies"
                  value={post.vacancies > 0 ? post.vacancies.toLocaleString("en-IN") : "N/A"}
                />
                {post.selectionProcess && (
                  <InfoRow label="Mode of Selection" value={post.selectionProcess} />
                )}
              </div>
            </div>
          )}

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

          {(post.applyLink || post.officialLink || post.resultLink || post.officialWebsite || post.whatsappLink || post.telegramLink) && (
            <div className="mt-8 rounded-[var(--radius-lg)] card-elev p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Important Links
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {post.applyLink && (
                  <LinkRow label="Apply Online" href={post.applyLink} />
                )}
                {post.officialLink && (
                  <LinkRow label="Official Notification (PDF)" href={post.officialLink} />
                )}
                {post.resultLink && <LinkRow label="Check Result" href={post.resultLink} />}
                {post.officialWebsite && (
                  <LinkRow label="Official Website" href={post.officialWebsite} />
                )}
                {post.whatsappLink && (
                  <LinkRow label="WhatsApp Channel" href={post.whatsappLink} />
                )}
                {post.telegramLink && (
                  <LinkRow label="Telegram Channel" href={post.telegramLink} />
                )}
              </div>
            </div>
          )}

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
                You May Also Check
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

function LinkRow({ label, href }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md border border-border/70 bg-background/40 px-3 py-2 text-sm hover:border-primary/40"
    >
      <span>{label}</span>
      <span className="text-muted-foreground">↗</span>
    </Link>
  );
}
