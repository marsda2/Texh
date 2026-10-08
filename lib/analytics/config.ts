// Public tracking IDs. Both already appear in texhco.com's page source, so they
// are safe to keep as defaults; override them with env vars per environment.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-GF2P833R0D";

// next.config.ts maps the existing Vercel var VITE_META_PIXEL_ID to
// NEXT_PUBLIC_META_PIXEL_ID, so nothing has to be renamed in Vercel.
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "26038822599128166";

export const SITE_URL = "https://texhco.com";

/** Real production traffic only; see NEXT_PUBLIC_ANALYTICS in next.config.ts. */
export const ANALYTICS_ON = process.env.NEXT_PUBLIC_ANALYTICS === "1";
