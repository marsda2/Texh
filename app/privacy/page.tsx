import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

// Text carried over from the previous texhco.com (English version). The voice
// note sentence in section 1 is new, because this site collects recordings.
const sections = [
  {
    heading: "1. Information We Collect",
    body: "When you use Texh Co. services, whether by browsing our website, submitting inquiries through our forms, sending us a voice note, interacting with our commercial campaigns, or hiring our services, we collect personal information (such as name, email, phone number and any voice recording you choose to send, all voluntarily provided) and usage information (through Google Analytics, tracking pixels, and cookies).",
  },
  {
    heading: "2. How We Use the Information",
    body: "We use the collected information exclusively to communicate with you regarding your projects or quotes, provide technical support, anonymously personalize the user experience through geo-tags in Analytics, measure conversion rates from our advertising affiliations, and to improve our design and delivery processes.",
  },
  {
    heading: "3. Data Management and Third Parties",
    body: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include web hosting partners (e.g., Vercel) and secure databases (Supabase) who assist us in operating our digital infrastructure, as long as those parties enforce confidentiality and encryption protocols.",
  },
  {
    heading: "4. Your Rights",
    body: "You have the right to access, rectify, or erase your confidential information stored in our systems at any time. You can send a request to hello@texhco.com to have your file completely deleted from our commercial databases.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: April 2026" sections={sections} />
  );
}
