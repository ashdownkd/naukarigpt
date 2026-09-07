"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/data/site";

// Reusable AdSense slot. If NEXT_PUBLIC_ADSENSE_CLIENT is unset, we render a
// subtle placeholder so publishers can visualise placement while developing.
// When the client id is present, we push an ad. Consent / lazy-loading can be
// added later per Google policy.
export default function AdSlot({
  slot = "inFeed",
  format = "auto",
  layout,
  fullWidthResponsive = true,
  className = "",
  label = "Advertisement",
}) {
  const client = SITE.adsense.client;
  const configuredSlot = SITE.adsense.slots?.[slot] || "";
  const ref = useRef(null);

  useEffect(() => {
    if (!client || !configuredSlot) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // swallow — avoid dev/HMR errors from double-push
    }
  }, [client, configuredSlot]);

  // Placeholder if not fully configured.
  if (!client || !configuredSlot) {
    return (
      <div
        data-testid={`ad-slot-${slot}`}
        className={`relative overflow-hidden rounded-[var(--radius)] border border-dashed border-border/60 bg-background/40 p-6 text-center ${className}`}
        aria-label={label}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Ad space — configure <code className="text-foreground">NEXT_PUBLIC_ADSENSE_CLIENT</code>{" "}
          & the <code className="text-foreground">{slot}</code> slot to enable.
        </p>
      </div>
    );
  }

  return (
    <div
      data-testid={`ad-slot-${slot}`}
      className={`relative overflow-hidden rounded-[var(--radius)] ${className}`}
      aria-label={label}
    >
      <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
        {label}
      </p>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={configuredSlot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
