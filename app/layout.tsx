import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@/components/site/Analytics";
import { Providers } from "@/components/site/Providers";
import { SITE_URL } from "@/lib/analytics/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const description =
  "Texh Co builds websites, custom software and automation for local businesses in New Jersey and New York. Your business. Connected.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Texh Co | Websites, software & automation for local businesses",
    template: "%s | Texh Co",
  },
  description,
  applicationName: "Texh Co",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/brand/texhco-x.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Texh Co",
    locale: "en_US",
    url: SITE_URL,
    title: "Texh Co | Your business. Connected.",
    description: "Websites, software and automation. Built to grow your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texh Co | Your business. Connected.",
    description: "Websites, software and automation. Built to grow your business.",
  },
};

// Same organization the old site declared, so search engines keep one entity.
const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Texh Co",
  legalName: "Texhco. LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description,
  email: "hello@texhco.com",
  areaServed: [
    { "@type": "State", name: "New Jersey" },
    { "@type": "State", name: "New York" },
  ],
  serviceType: ["Web development", "Custom software", "Automation", "Local SEO"],
  knowsLanguage: ["en", "es"],
  sameAs: ["https://www.linkedin.com/company/texhco", "https://www.instagram.com/texhco"],
};

export const viewport: Viewport = {
  themeColor: "#faf7ef",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} antialiased`}
    >
      <body className="min-h-svh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
