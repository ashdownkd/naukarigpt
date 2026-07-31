import { SITE } from "@/data/site";

export default function ArticleJsonLd({ post }) {
  const url = `${SITE.url}/category/${post.category}/${post.slug}`;
  const isJob = post.category === "jobs";
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.png` },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const jobPosting = isJob
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: post.title,
        description: post.excerpt,
        datePosted: post.date,
        validThrough: post.lastDate,
        hiringOrganization: {
          "@type": "Organization",
          name: post.org,
          sameAs: SITE.url,
        },
        employmentType: "FULL_TIME",
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: post.location || "All India",
            addressCountry: "IN",
          },
        },
        directApply: false,
        url,
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      {jobPosting && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }}
        />
      )}
    </>
  );
}
