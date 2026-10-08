// All page copy lives here so it can be edited without touching components.

export const site = {
  name: "Texh Co",
  email: "hello@texhco.com", // same inbox the old site sent from (Resend)
  location: "New Jersey / New York",
};

// Absolute hashes so the links also work from the service pages.
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

export const hero = {
  eyebrow: "Software & digital growth studio",
  title: ["Your business.", "Connected."],
  subtitle: "Websites, software and automation. Built to grow your business.",
  primaryDesktop: "Build with Texh Co",
  primaryMobile: "Let’s build together",
  secondary: "Explore our work",
};

export const servicesIntro = {
  eyebrow: "Services",
  title: ["We build systems,", "not just websites."],
  subtitle: "The engine behind your business.",
  body: "The website is the part people see. The engine underneath (bookings, follow-ups, Google, tracking) is what brings clients in while you run the business.",
};

export type CardTheme = "ink" | "lime" | "paper" | "graphite";

export const services = [
  {
    id: "web",
    slug: "web-development",
    label: "Web development",
    short: "Web",
    theme: "ink" as CardTheme,
    card: {
      title: ["Websites that book.", "Not brochures."],
      blurb: "Your own site. Clear pricing. Bookings built in.",
    },
    detail: {
      intro:
        "Most local sites are online brochures: nice photos, no way to act. We build mobile-first sites on your own domain where people see what you offer, what it costs, and book or request a quote in a few taps.",
      showcase: {
        eyebrow: "See it work",
        title: "A booking in four taps.",
        body: "This is what a visitor goes through on a site we build. No calls, no waiting for a reply, no app to download.",
      },
      shift: [
        { before: "Photos and a phone number.", after: "Services, prices and a Book button." },
        { before: "Clients call during business hours.", after: "Clients book at 11pm from their phone." },
        { before: "No idea where visitors come from.", after: "Every call, tap and form is tracked." },
      ],
      timeline: [
        { when: "Days 1 to 2", title: "Content & access", body: "You send photos, services and prices. We handle the domain, hosting and everything technical." },
        { when: "Days 3 to 5", title: "Design & build", body: "We design it mobile-first, connect bookings and tracking, and show you a live preview." },
        { when: "Days 6 to 7", title: "Launch", body: "We test on real phones, go live, and show you how to change prices and hours yourself." },
      ],
      included: [
        { title: "Mobile-first design", body: "Built for the phone first, because that\u2019s where your clients find you." },
        { title: "Bookings & quote requests", body: "Online booking or a quote form on your own site, not rented from an app." },
        { title: "Clear services and prices", body: "Service pages that answer the questions people would otherwise call about." },
        { title: "Click-to-call & directions", body: "One tap to call, text or get directions from any page." },
        { title: "Owner panel", body: "Change prices, hours and services from your phone in about 30 seconds." },
        { title: "Tracking from day one", body: "Calls, clicks and forms measured, so you know what\u2019s working." },
      ],
      forWho: ["Restaurants & caf\u00E9s", "Barbershops & salons", "Contractors", "Clinics & studios"],
      faqs: [
        { q: "Do I own the site?", a: "Yes. The domain, the content and the client data are yours. If you ever leave, you take everything with you." },
        { q: "I already use Booksy or Square. Do I have to switch?", a: "No. We can connect what you already pay for, or move bookings onto your own site when it makes sense. The free audit tells you which." },
        { q: "How long does it take?", a: "Most sites are set up in about 7 days once we have your content and access." },
      ],
    },
  },
  {
    id: "software",
    slug: "custom-software",
    label: "Custom software",
    short: "Software",
    theme: "lime" as CardTheme,
    card: {
      title: ["Tools that fit", "how you work."],
      blurb: "Owner panels and client portals. Goodbye, spreadsheets.",
    },
    detail: {
      intro:
        "When the business runs on a spreadsheet, a WhatsApp group and sticky notes, things slip. We build simple tools around how your team already works, so jobs, clients and payments live in one place.",
      showcase: {
        eyebrow: "See it work",
        title: "Three apps become one screen.",
        body: "Jobs, clients and payments stop living in a spreadsheet, a WhatsApp group and a notebook. Watch a day of work move through one panel.",
      },
      shift: [
        { before: "Jobs in a spreadsheet, texts in WhatsApp.", after: "Every job, client and payment in one place." },
        { before: "Chasing clients for photos and payments.", after: "Clients upload and pay from their own portal." },
        { before: "Double bookings and forgotten follow-ups.", after: "A clear schedule that flags conflicts." },
      ],
      timeline: [
        { when: "Week 1", title: "Map how you work", body: "We follow a real job from first call to payment and list every place things slip." },
        { when: "Weeks 2 to 3", title: "Build the first screen", body: "One focused tool first. You use it on real work and tell us what to change." },
        { when: "Week 4 and on", title: "Grow it", body: "We add pieces as you need them: client portal, invoices, integrations. You own the code." },
      ],
      included: [
        { title: "Owner dashboard", body: "Today\u2019s jobs, bookings and payments on one screen." },
        { title: "Client portal", body: "Clients check status, upload files and pay without calling you." },
        { title: "Scheduling & dispatch", body: "Assign jobs, see who\u2019s where, avoid double-booking." },
        { title: "Quotes & invoices", body: "Send a quote, turn it into an invoice, get paid online." },
        { title: "Integrations", body: "Connected to the calendar, payment and accounting tools you already use." },
        { title: "Yours to keep", body: "You own the code and the data. No per-seat lock-in." },
      ],
      forWho: ["Home services", "Clinics", "Multi-location shops", "Growing teams"],
      faqs: [
        { q: "Is custom software only for big companies?", a: "No. We build small, focused tools, often one screen that replaces three apps." },
        { q: "Can it work with what I already use?", a: "Usually, yes. We connect to common calendar, payment and accounting tools instead of replacing them." },
        { q: "What happens after launch?", a: "We stay on for fixes and improvements, and you get the code and documentation either way." },
      ],
    },
  },
  {
    id: "automation",
    slug: "automation",
    label: "Automation",
    short: "Automation",
    theme: "paper" as CardTheme,
    card: {
      title: ["The follow-up", "runs itself."],
      blurb: "Reminders, reviews and lead routing. Day and night.",
    },
    detail: {
      intro:
        "Every missed reminder, unanswered DM and forgotten review request costs you a client. We automate the follow-up so it happens on time, every time, without you typing a thing.",
      showcase: {
        eyebrow: "See it work",
        title: "The follow-up that never forgets.",
        body: "Flip any switch to see what a client would miss without it. Every automation can be turned on or off from your panel, and you approve every message.",
      },
      shift: [
        { before: "You text reminders by hand, when you remember.", after: "Reminders go out on time, every time." },
        { before: "Reviews depend on you remembering to ask.", after: "Every happy client gets a friendly ask." },
        { before: "DMs after hours wait until morning.", after: "Replies and bookings happen at 11:01 pm." },
      ],
      timeline: [
        { when: "Day 1", title: "Pick the moments", body: "We list where clients hear from you and where they fall through the cracks." },
        { when: "Days 2 to 4", title: "Write it in your voice", body: "We draft each message with you. Nothing goes out until you approve it." },
        { when: "Days 5 to 7", title: "Switch on and watch", body: "Automations go live one at a time, with a weekly count of what was sent for you." },
      ],
      included: [
        { title: "Booking confirmations", body: "Instant confirmation by text or email the moment someone books." },
        { title: "Reminders", body: "Automatic reminders before each appointment to cut no-shows." },
        { title: "Review requests", body: "A friendly ask for a Google review after every visit." },
        { title: "Lead routing", body: "New inquiries land in your CRM and on your phone, tagged by source." },
        { title: "After-hours replies", body: "Auto-replies for DMs and forms. DM at 11pm. Booked by 11:01." },
        { title: "Win-back messages", body: "Gentle nudges for clients who haven\u2019t been back in a while." },
      ],
      forWho: ["Salons & spas", "Barbershops", "Clinics", "Home services"],
      faqs: [
        { q: "Will it sound like a robot?", a: "No. We write the messages with you, in your voice, and you approve every one." },
        { q: "Do I need new software?", a: "Usually not. We build on the tools you already use wherever we can." },
        { q: "Can I turn things off?", a: "Anytime. Every automation has an on/off switch in your panel." },
      ],
    },
  },
  {
    id: "growth",
    slug: "digital-growth",
    label: "Digital growth",
    short: "Growth",
    theme: "graphite" as CardTheme,
    card: {
      title: ["Show up when", "locals search."],
      blurb: "Google profile, local SEO and reports you can read.",
    },
    detail: {
      intro:
        "People pick whoever shows up first on Google Maps. We set up your profile, pages and tracking so you show up for the searches that matter in the towns you serve, and you can see what it brings in.",
      showcase: {
        eyebrow: "See it work",
        title: "From page two to the top of the map.",
        body: "People pick whoever shows up first. A complete profile, service pages and fresh reviews are what earn that climb. The numbers below are sample data.",
      },
      shift: [
        { before: "Wrong hours and no photos on Google.", after: "A complete, active Google Business Profile." },
        { before: "One page for every service and every town.", after: "A page for each service in each town you serve." },
        { before: "You guess which marketing works.", after: "A 2-minute weekly report, by source." },
      ],
      timeline: [
        { when: "Week 1", title: "Fix the foundation", body: "Profile, listings and tracking, plus a baseline report of where you stand today." },
        { when: "Weeks 2 to 6", title: "Build the pages", body: "Service and town pages, review requests and fresh posts go live in steps." },
        { when: "Every Monday", title: "Read the report", body: "Calls, bookings and leads by source, and what we do next." },
      ],
      included: [
        { title: "Google Business Profile", body: "Complete, accurate and active: hours, services, photos and posts." },
        { title: "Local SEO by service", body: "A page for each service people search for, written to be found." },
        { title: "Pages for every town", body: "Show up in the cities you actually serve, not just your zip code." },
        { title: "Reviews strategy", body: "More recent reviews, answered on time." },
        { title: "Ready for AI search", body: "Structured so Google\u2019s AI results and ChatGPT can understand and recommend you." },
        { title: "Weekly report", body: "Calls, bookings and leads by source, in a summary you can read in 2 minutes." },
      ],
      forWho: ["Contractors", "Restaurants", "Salons", "Clinics"],
      faqs: [
        { q: "How long until I see results?", a: "Profile fixes can show up within weeks; local SEO builds over months. Your weekly report shows the trend from day one." },
        { q: "Do you run ads too?", a: "When it makes sense. We set up the pages and tracking first, so every ad dollar is measurable." },
        { q: "Do you guarantee #1 on Google?", a: "Nobody honestly can. We guarantee the work is done right and that you\u2019ll see exactly what it brings in." },
      ],
    },
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceId = (typeof services)[number]["id"];

// Real projects, taken from the previous texhco.com. Cover images are the
// projects' own photos and brand assets, stored in /public/work. Names, copy
// and links can be edited here without touching the component.
export const work = [
  {
    name: "Kanda",
    kind: "Specialty café",
    place: "El Vedado",
    domain: "kandacafe.com",
    summary:
      "A calm, editorial site for a specialty café: the full menu with prices, locations, the story and a members’ club in one place.",
    tags: ["Website", "Menu", "Club"],
    cover: "image",
    image: "/work/kanda.jpg",
    focus: "50% 30%",
    alt: "Kanda dishes: a berry shake, a focaccia sandwich, fresh bread and cakes",
    href: "https://www.kandacafe.com/",
  },
  {
    name: "Centralburg",
    kind: "Restaurant",
    place: "Sant Cugat",
    domain: "centralburg.es",
    summary:
      "A full rebrand and redesign for a burger restaurant: a bolder identity, signature burgers, the venue and a club, on one warm, confident site.",
    tags: ["Rebrand", "Redesign", "Menu"],
    cover: "burgers",
    image: "",
    focus: "50% 50%",
    alt: "Centralburg's signature burgers over the brand's yellow",
    href: "https://www.centralburg.es/",
  },
  {
    name: "WashAcoholic",
    kind: "Mobile detailing",
    place: "Miami, FL",
    domain: "washacoholic.com",
    summary:
      "A booking system, monthly memberships with Square, automatic messages and Google Calendar sync, for a detailing service that comes to you.",
    tags: ["Bookings", "Square memberships", "Auto messages", "Google Calendar"],
    cover: "wash",
    image: "",
    focus: "50% 50%",
    alt: "A black Camaro before and after a WashAcoholic detail",
    href: "https://www.washacoholic.com/",
  },
  {
    name: "Isabel Ávila",
    kind: "Portfolio",
    place: "Makeup artist",
    domain: "mariaisabelavila.com",
    summary:
      "A cinematic, bilingual portfolio for a professional makeup artist: a decade of work, services and contact in one dark, visual page.",
    tags: ["Portfolio", "Bilingual", "Brand"],
    cover: "image",
    image: "/work/isabel.jpg",
    focus: "50% 40%",
    alt: "Three portraits from the portfolio: editorial makeup, backstage at a show and a bridal look",
    href: "https://mariaisabelavila.com/",
  },
];

// Cover assets that are drawn in code instead of a single photo.
export const washCover = {
  before: "/work/wash/before.jpg",
  after: "/work/wash/after.jpg",
};

export const burgerCover = [
  { src: "/work/centralburg/carbonara.webp", alt: "La Carbonara burger" },
  { src: "/work/centralburg/comtesa.webp", alt: "La Comtesa burger" },
  { src: "/work/centralburg/centralburg.webp", alt: "Central Burg burger" },
];

// A product we build and run ourselves, shown under the client work.
export const inHouse = {
  eyebrow: "Built by Texh Co",
  name: "BackSoon",
  tagline: "Digital loyalty cards in Apple & Google Wallet.",
  body: "Our own product for local shops. Customers scan a QR at the counter, add the card to their phone and start collecting stamps, with no app to download. The owner sends push notifications to their lock screen and follows visits and rewards on a live dashboard.",
  tags: ["Apple Wallet", "Google Wallet", "Push notifications", "Live dashboard"],
  cta: "Visit BackSoon",
  href: "https://backsoon.us/",
  // The sample passes from backsoon.us, fanned out left to right.
  passes: [
    { src: "/work/backsoon/luna.webp", alt: "Luna beauty club card" },
    { src: "/work/backsoon/crumb.webp", alt: "Crumb & Co. bakery club card" },
    { src: "/work/backsoon/noria.webp", alt: "Noria neighborhood kitchen card" },
    { src: "/work/backsoon/oliva.webp", alt: "Café Oliva coffee club card" },
    { src: "/work/backsoon/trazo.webp", alt: "Trazo barber club card" },
  ],
};

export const ownership = {
  eyebrow: "Why Texh Co",
  title: "Stop renting your business from apps.",
  body: "When we’re done, the system is yours. Your domain, your clients, your data.",
  // The three things that end up in your hands (marquee).
  owned: [{ label: "Your domain" }, { label: "Your clients" }, { label: "Your data" }],
  rows: [
    {
      short: "Booksy",
      them: "Booksy & Fresha",
      themSays: "Bookings on a platform that owns your client list.",
      us: "Bookings on your own domain, in your own database.",
    },
    {
      short: "Angi",
      them: "Angi & Thumbtack",
      themSays: "Paid leads shared with five other companies.",
      us: "Quote requests that come straight to you. No lead fees.",
    },
    {
      short: "DIY sites",
      them: "DIY site builders",
      themSays: "A pretty brochure nobody updates.",
      us: "A live system you control from your phone.",
    },
  ],
  leave: "If you ever want to leave, you take everything with you.",
};

export const process = {
  eyebrow: "How it works",
  title: "From audit to booked calendar.",
  steps: [
    {
      n: "01",
      title: "Free local audit",
      body: "A 15-minute call, then a report in 48 hours: how you show up on Google Maps, what’s broken, and what it’s likely costing you.",
    },
    {
      n: "02",
      title: "Set up in 7 days",
      body: "We build the site and connect it to your bookings, calendar and CRM. You keep running the business.",
    },
    {
      n: "03",
      title: "Measured every Monday",
      body: "A short weekly summary: new bookings, calls and leads, and exactly where each one came from.",
    },
  ],
  // The animated "one lead through the system" strip under the steps.
  flow: [
    { label: "Website", event: "New visitor from Google Maps" },
    { label: "Bookings", event: "Booked · Fri 3:00 pm" },
    { label: "CRM", event: "Contact saved & tagged" },
    { label: "Reviews", event: "Review request sent" },
    { label: "Weekly report", event: "+1 booking · source: Maps" },
  ],
};

export const letsBuild = {
  audit: {
    eyebrow: "New Jersey / New York",
    title: ["Let\u2019s build", "together."],
    offer: "Your free Local Visibility Audit.",
    body: "A 15-minute call. A report in 48 hours. No obligation.",
    button: "Get my free audit",
  },
  eyebrow: "Let\u2019s build",
  title: ["Tell us what", "you", "need."],
  lead: ["What\u2019s slowing your business down?", "Tell us in your own words."],
  sub: "Bookings, automation, a new website, anything.",
  note: "Tell us the problem. We\u2019ll help shape the solution.",
  signoff: "Systems, not just websites.",
  recorder: {
    label: "Your voice note",
    idleHint: "No technical terms needed.",
    recordingHint: "Speak naturally. Tap stop when you\u2019re done.",
    reviewHint: "Have a listen. Happy with it?",
    record: "Record a voice note",
    stop: "Stop recording",
    belowIdle: "Listen and re-record before sending.",
    upload: "Upload audio",
    typing: "Prefer typing?",
    voice: "Prefer a voice note?",
    textPlaceholder:
      "e.g. We miss calls after 6pm and most bookings still come through Instagram DMs\u2026",
    success: "Got it. We\u2019ll listen and get back to you shortly.",
  },
};
