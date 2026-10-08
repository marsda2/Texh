"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GA_ID, META_PIXEL_ID } from "@/lib/analytics/config";
import { trackPageView } from "@/lib/analytics/track";

/**
 * GA4 + Meta Pixel + Vercel Speed Insights. Only runs in production builds so
 * local development and previews don't pollute the real numbers.
 */
export function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  // The base snippets fire the first PageView. Every later route change
  // (Next navigations don't reload the page) is reported here.
  const live = process.env.NODE_ENV === "production";
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (live) trackPageView();
  }, [pathname, live]);

  if (!live) return null;

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's noscript fallback */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <SpeedInsights />
    </>
  );
}
