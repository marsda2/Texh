import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using texhco.com, operated by Texhco. LLC (Texh Co), a New Jersey limited liability company.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={terms.intro}
      sections={terms.sections}
      other={{ href: "/privacy", label: "Privacy Policy" }}
    />
  );
}
