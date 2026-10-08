// Legal text for texhco.com. English only; written for a US (New Jersey) small
// business. It is a solid starting draft, not legal advice: have a New Jersey
// attorney review it, especially the items marked in the README.

export const LEGAL = {
  /** Exact name on the New Jersey Division of Revenue record. */
  entity: "Texhco. LLC",
  entityType: "a New Jersey limited liability company",
  brand: "Texh Co",
  email: "hello@texhco.com",
  updated: "October 2026",
} as const;

export type LegalBlock = string | { list: string[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };

const who = `${LEGAL.entity}, ${LEGAL.entityType} doing business as ${LEGAL.brand}`;

export const privacy: { intro: string; sections: LegalSection[] } = {
  intro: `This Privacy Policy explains how ${who} ("Texh Co", "we", "us"), collects, uses and shares personal information when you visit texhco.com (the "Site"), send us a message or a voice note, or use our services. If you become a client, our written agreement with you may add to this policy.`,
  sections: [
    {
      heading: "1. Who we are",
      blocks: [
        `${LEGAL.entity} is ${LEGAL.entityType}. We build websites, custom software and automation for local businesses. You can reach us at ${LEGAL.email}.`,
      ],
    },
    {
      heading: "2. Information we collect",
      blocks: [
        "Information you give us:",
        {
          list: [
            "Your name, and your email address or phone number.",
            "The message you type, and any voice recording or audio file you choose to send.",
            "Anything else you tell us in a message, call or meeting, and, if you become a client, the business details we need to do the work.",
          ],
        },
        "Information collected automatically when you use the Site: your IP address and approximate location, browser and device type, the pages you view, the page that referred you, and how you interact with the Site (for example, clicks and form submissions). We collect it with cookies, pixels and similar technologies.",
        "Information from advertising platforms: if you reach the Site from one of our ads, the platform that ran it may tell us which campaign it was.",
        "Voice recordings: we listen to recordings ourselves to understand your request and reply. We do not create voiceprints to identify you, and we do not use recordings to train artificial intelligence models.",
        "Please do not put sensitive information (such as Social Security numbers, payment card numbers or health information) in a message or recording.",
      ],
    },
    {
      heading: "3. How we use information",
      blocks: [
        {
          list: [
            "To answer your request, prepare audits and quotes, and follow up with you.",
            "To deliver and support our services, and to send service-related emails such as confirmations.",
            "To measure and improve the Site and our advertising.",
            "To keep the Site secure and prevent fraud and abuse.",
            "To comply with the law and enforce our terms.",
          ],
        },
        "If you contact us, we may reply by email, phone or text about your request. You can ask us to stop at any time. We do not send marketing text messages without your separate consent.",
      ],
    },
    {
      heading: "4. Cookies, analytics and advertising",
      blocks: [
        "The Site uses:",
        {
          list: [
            "Google Analytics, to understand how people use the Site.",
            "Meta Pixel and the Meta Conversions API, to measure the results of our ads and show ads to people who may be interested. When you submit a form, we may send Meta the event and a hashed (scrambled) version of your email address or phone number so it can match the result to its own users.",
            "Vercel Speed Insights, to measure how fast the Site loads.",
          ],
        },
        "How to opt out:",
        {
          list: [
            "We honor the Global Privacy Control (GPC) signal. When your browser sends it, we do not load the Meta Pixel or send events to Meta.",
            "You can block or delete cookies in your browser settings.",
            "Google Analytics opt-out add-on: tools.google.com/dlpage/gaoptout.",
            "Meta ad preferences: in your Facebook or Instagram account settings.",
            "Industry opt-outs: optout.aboutads.info and optout.networkadvertising.org.",
          ],
        },
        "There is no common standard for \"Do Not Track\" browser signals, so we do not respond to them. We do respond to GPC as described above.",
      ],
    },
    {
      heading: "5. How we share information",
      blocks: [
        "We do not sell your personal information for money. We share it only as follows:",
        {
          list: [
            "Service providers that help us run the Site and our business: Vercel (hosting), Supabase (database and file storage), Resend (email delivery), Google (analytics) and Meta (ad measurement). They may use the information only to provide their services to us, or, for Google and Meta, as described in their own policies.",
            "Professional advisers such as accountants and lawyers, when needed.",
            "Authorities, when we are required by law or to protect rights and safety.",
            "A buyer or successor, if our business is sold or reorganized.",
          ],
        },
        "Sharing information with advertising platforms to measure ads and show ads can count as a \"sale\", \"sharing\" or \"targeted advertising\" under some state privacy laws. You can opt out as described in section 4 or by emailing us.",
      ],
    },
    {
      heading: "6. How long we keep information",
      blocks: [
        "We keep personal information for as long as we need it for the purposes above, such as answering your request, running our relationship with you, and meeting legal and accounting duties. After that we delete or de-identify it. You can ask us to delete it sooner.",
      ],
    },
    {
      heading: "7. Security",
      blocks: [
        "We use reasonable safeguards, including encryption in transit and access controls, to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "8. Your privacy rights",
      blocks: [
        "Whether or not a particular law requires it, we offer these rights to every visitor in the United States:",
        {
          list: [
            "Access: ask whether we process your personal information and get a copy of it.",
            "Correction: ask us to fix information that is wrong.",
            "Deletion: ask us to delete the information we hold about you.",
            "Opt-out: ask us to stop using your information for targeted advertising, sale, or profiling that has legal or similarly significant effects.",
          ],
        },
        "New Jersey residents have these rights under the New Jersey Data Privacy Act, and California residents have similar rights under the California Consumer Privacy Act. We will not treat you differently for using any of these rights.",
        `To make a request, email ${LEGAL.email} with the subject \"Privacy request\" and the name and email or phone number you used with us. We may need to verify your identity. We will respond within 45 days, and may extend that once by up to 45 more days if we tell you why. You may use an authorized agent.`,
        `If we decline a request, you can appeal by replying with the subject \"Appeal\". We will answer within 45 days. If you are still not satisfied, New Jersey residents can contact the New Jersey Division of Consumer Affairs, part of the Office of the Attorney General.`,
      ],
    },
    {
      heading: "9. Children",
      blocks: [
        "The Site is meant for businesses and adults. It is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child sent us information, email us and we will delete it.",
      ],
    },
    {
      heading: "10. Where information is processed",
      blocks: [
        "We process information in the United States. If you visit from another country, you understand that your information will be transferred to and handled in the United States.",
      ],
    },
    {
      heading: "11. Links to other sites",
      blocks: [
        "The Site links to websites we do not control, such as the sites of our clients and our own products like BackSoon. Their privacy practices are described in their own policies.",
      ],
    },
    {
      heading: "12. Changes to this policy",
      blocks: [
        "We may update this policy. We will post the new version here with a new date, and if a change is significant we will make that clear on the Site.",
      ],
    },
    {
      heading: "13. Contact",
      blocks: [`${LEGAL.entity}, ${LEGAL.entityType}. Email: ${LEGAL.email}.`],
    },
  ],
};

export const terms: { intro: string; sections: LegalSection[] } = {
  intro: `These Terms of Service (the "Terms") govern your use of texhco.com (the "Site"), which is operated by ${who} ("Texh Co", "we", "us"). By using the Site you agree to these Terms and to our Privacy Policy. Our services to clients are governed by a separate written agreement (a proposal, statement of work or contract). If that agreement conflicts with these Terms, the signed agreement controls.`,
  sections: [
    {
      heading: "1. The Site and our services",
      blocks: [
        "We provide web development, custom software, automation and digital growth services (including Google Business Profile and local SEO work) for local businesses. The Site gives general information about them. Contacting us, sending a message or voice note, or requesting an audit does not create a client relationship or any obligation for either of us until we both sign an agreement.",
      ],
    },
    {
      heading: "2. Estimates, demos and no guarantee of results",
      blocks: [
        "Audits, estimates, prices shown on the Site and reports are informational. They are not binding offers. The demos on our service pages use sample data to show how a system works; they are not real client results.",
        "Results such as search rankings, calls, bookings, leads or revenue depend on many things outside our control, including your market, your reviews and what search engines and platforms decide. We do not guarantee any particular result or ranking.",
      ],
    },
    {
      heading: "3. Using the Site",
      blocks: [
        "You agree to use the Site only for lawful purposes. You will not:",
        {
          list: [
            "try to gain unauthorized access to the Site, our systems or other people's data;",
            "interfere with or overload the Site, or send malware;",
            "scrape the Site or use it to send spam, including through our forms;",
            "submit content that is unlawful, infringing, harassing or that includes someone else's personal information without their permission.",
          ],
        },
        "When you send us a message, voice note or file, you confirm that you have the right to send it, and you give us a limited, non-exclusive license to use it to respond to you and provide our services.",
      ],
    },
    {
      heading: "4. Communications",
      blocks: [
        "If you give us your phone number or email address, you agree that we may contact you about your request by phone, text message or email. Message and data rates may apply. You can tell us to stop at any time. We will not send marketing text messages without your separate consent.",
      ],
    },
    {
      heading: "5. Intellectual property",
      blocks: [
        "The Site and its content, including text, design, code, graphics and the Texh Co and BackSoon names and logos, belong to us or our licensors and are protected by law. We give you a limited, revocable license to view the Site for your own use. You may not copy, modify or reuse it without our written permission.",
        "Work we do for clients is covered by the client's agreement. Unless that agreement says otherwise, we keep ownership of the source code, design files and systems we create until the project fees are paid in full, and then the client receives the license or assignment the agreement describes.",
        "Names, logos, screenshots and other material from our clients' projects shown in our Selected work belong to their owners and appear only to describe our work. If you are an owner and want something changed or removed, email us.",
      ],
    },
    {
      heading: "6. Third-party sites and services",
      blocks: [
        "The Site links to sites and uses services that we do not control (for example hosting, analytics and email providers). We are not responsible for them, and your use of them is subject to their own terms.",
      ],
    },
    {
      heading: "7. Disclaimer of warranties",
      blocks: [
        "The Site and its content are provided \"as is\" and \"as available\". To the extent the law allows, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement, and we do not promise that the Site will be uninterrupted or error-free.",
      ],
    },
    {
      heading: "8. Limitation of liability",
      blocks: [
        "To the extent the law allows, Texh Co and its members, employees and contractors are not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue or data, arising from your use of the Site. For any claim relating to the Site itself, our total liability is limited to $100. Liability for our services is governed by the client's agreement.",
        "Some laws do not allow certain limits, so some of the above may not apply to you. Nothing in these Terms limits any right or remedy you have under New Jersey or federal law that cannot be waived or limited.",
      ],
    },
    {
      heading: "9. Indemnification",
      blocks: [
        "You agree to defend and hold us harmless from claims, losses and expenses (including reasonable attorney fees) that come from content you submit to us or your violation of these Terms or the law, to the extent the law allows.",
      ],
    },
    {
      heading: "10. Governing law and disputes",
      blocks: [
        "These Terms are governed by the laws of the State of New Jersey and applicable federal law, without regard to conflict-of-law rules. You and we agree that the state and federal courts located in New Jersey have exclusive jurisdiction over any dispute about the Site or these Terms, and you consent to their jurisdiction and venue.",
      ],
    },
    {
      heading: "11. Changes and termination",
      blocks: [
        "We may update these Terms or the Site at any time. We will post the new version here with a new date. If you keep using the Site after that, you accept the update. We may suspend or end your access to the Site at any time if you violate these Terms.",
      ],
    },
    {
      heading: "12. General",
      blocks: [
        "These Terms and the Privacy Policy are the entire agreement between you and us about the Site. If a part of them is found unenforceable, the rest stays in effect. Our not enforcing a right is not a waiver of it. You may not assign these Terms without our consent; we may assign them to a successor. You agree that we can give you notices electronically, including on the Site or by email.",
      ],
    },
    {
      heading: "13. Contact",
      blocks: [`${LEGAL.entity}, ${LEGAL.entityType}. Email: ${LEGAL.email}.`],
    },
  ],
};
