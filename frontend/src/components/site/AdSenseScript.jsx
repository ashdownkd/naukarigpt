import Script from "next/script";
import { SITE } from "@/data/site";

export default function AdSenseScript() {
  const client = SITE.adsense.client;
  if (!client) return null;
  return (
    <Script
      id="adsbygoogle-script"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ca-pub-xxxxxxxxxxxxxxxx"}`}
    />
  );
}
