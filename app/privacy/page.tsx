import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Texhco. LLC (Texh Co) collects, uses and shares personal information, and the privacy rights you have in the United States and New Jersey.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={privacy.intro}
      sections={privacy.sections}
      other={{ href: "/terms", label: "Terms of Service" }}
    />
  );
}
