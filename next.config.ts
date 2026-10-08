import type { NextConfig } from "next";

const PLATFORM = "https://app.texhco.com";
const platformLive = process.env.PLATFORM_LIVE === "1";
// Same path on the platform host (query strings are kept).
const platformRoutes = [
  "/portal/:path*",
  "/welcome",
  "/generator",
  "/build",
  "/templates/:path*",
  "/contact/:username",
];

const nextConfig: NextConfig = {
  // The Vercel project already defines VITE_META_PIXEL_ID (from the old Vite
  // site). Next only exposes NEXT_PUBLIC_* to the browser, so map it here and
  // nothing has to be renamed in Vercel.
  env: {
    NEXT_PUBLIC_META_PIXEL_ID:
      process.env.NEXT_PUBLIC_META_PIXEL_ID ?? process.env.VITE_META_PIXEL_ID ?? "",
    // Tracking is on only for the real production deployment on Vercel (preview
    // builds are production builds too, so NODE_ENV alone isn't enough). Set
    // NEXT_PUBLIC_ANALYTICS=1 on a preview to test events with META_TEST_EVENT_CODE.
    NEXT_PUBLIC_ANALYTICS:
      process.env.NEXT_PUBLIC_ANALYTICS ?? (process.env.VERCEL_ENV === "production" ? "1" : ""),
  },
  images: {
    // Used by the services illustration (Unsplash License).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Old texhco.com URLs that are indexed or linked from ads and cards.
  async redirects() {
    return [
      { source: "/services/premium-web-design", destination: "/services/web-development", permanent: true },
      { source: "/services/local-seo", destination: "/services/digital-growth", permanent: true },
      { source: "/services/business-automation", destination: "/services/automation", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/audit", destination: "/#contact", permanent: true },
      { source: "/estimator", destination: "/#contact", permanent: true },
      // The client platform (portal, generator, contact cards) is moving to
      // app.texhco.com. Until PLATFORM_LIVE=1 is set in Vercel (after that host
      // is deployed) these routes fall back to the contact section, so nothing
      // loops while *.texhco.com still points at this project. Printed QR/NFC
      // cards point at /contact/<name>.
      ...platformRoutes.map((source) => ({
        source,
        destination: platformLive ? `${PLATFORM}${source}` : "/#contact",
        permanent: false,
        // Never redirect on app.texhco.com itself.
        ...(platformLive ? { has: [{ type: "host" as const, value: "(www\\.)?texhco\\.com" }] } : {}),
      })),
    ];
  },
};

export default nextConfig;
