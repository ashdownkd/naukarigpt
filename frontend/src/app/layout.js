import "./globals.css";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from 'next/script';
import { SITE } from "@/data/site";
import SiteChrome from "@/components/site/SiteChrome";
import OrganizationJsonLd from "@/components/site/OrganizationJsonLd";
import AdSenseScript from "@/components/site/AdSenseScript";
import GoogleAnalytics from "@/components/site/GoogleAnalytics";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "sarkari result",
    "government jobs",
    "latest notifications",
    "admit card",
    "result",
    "scholarships",
    "answer key",
    "jobs India",
    "admission",
    "naukarigpt",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@naukarigpt",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0F",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script src='https://push.aplu.io/push-notify.js' strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <OrganizationJsonLd />
        <AdSenseScript />
        <GoogleAnalytics />
        <SiteChrome>{children}</SiteChrome>
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
