import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Vercel project already defines VITE_META_PIXEL_ID (from the old Vite
  // site). Next only exposes NEXT_PUBLIC_* to the browser, so map it here and
  // nothing has to be renamed in Vercel.
  env: {
    NEXT_PUBLIC_META_PIXEL_ID:
      process.env.NEXT_PUBLIC_META_PIXEL_ID ?? process.env.VITE_META_PIXEL_ID ?? "",
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
    ];
  },
};

export default nextConfig;
