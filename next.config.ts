import type { NextConfig } from "next";

const PLATFORM = "https://app.texhco.com";

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
      // The client platform (portal, generator, contact cards) now lives on
      // app.texhco.com. Temporary (307) until that host is confirmed working.
      // Printed QR codes and NFC cards point at /contact/<name>.
      { source: "/portal/:path*", destination: `${PLATFORM}/portal/:path*`, permanent: false },
      { source: "/welcome", destination: `${PLATFORM}/welcome`, permanent: false },
      { source: "/generator", destination: `${PLATFORM}/generator`, permanent: false },
      { source: "/build", destination: `${PLATFORM}/build`, permanent: false },
      { source: "/templates/:path*", destination: `${PLATFORM}/templates/:path*`, permanent: false },
      { source: "/contact/:username", destination: `${PLATFORM}/contact/:username`, permanent: false },
    ];
  },
};

export default nextConfig;
