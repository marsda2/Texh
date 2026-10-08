import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  alternates: { canonical: "/terms" },
};

// Text carried over unchanged from the previous texhco.com (English version).
// Section 1 still lists mobile apps and social media, which are no longer the
// current services: review it with whoever handles the legal side.
const sections = [
  {
    heading: "1. Purpose of Our Services",
    body: "Texh Co. provides professional services for modern web development, digital ecosystem architecture, mobile application development (iOS/Android), social media management, and general maintenance for business optimization in the digital era.",
  },
  {
    heading: "2. Intellectual Property",
    body: "Unless contractually stated otherwise, all source code, brand manuals, graphic assets (UI/UX), and backend architectures developed by Texh Co. remain the property of the agency until the project fees are paid in full, following which the commercial license is entirely transferred to the client.",
  },
  {
    heading: "3. Estimates and Billing",
    body: "The prices shown in our estimators and online catalogs are commercial budget references and do not replace a formal contract or binding direct quote. Any commencement of a corporate project will require the signing of a final agreement (Statement of Work) with defined payment progress guidelines.",
  },
  {
    heading: "4. Modifications",
    body: "We reserve the right to modify these commercial terms as well as the technical structure of our portals at any time, always guaranteeing to notify retroactively within a 30-day margin.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="Effective: April 2026" sections={sections} />
  );
}
