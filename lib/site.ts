/**
 * Single source of truth for site copy.
 * Replace the placeholder content here and the whole page updates.
 */

export const site = {
  name: "Auren",
  legalName: "Auren Studio",
  domain: "auren.studio",
  url: "https://auren.studio",
  description:
    "Auren is a design studio for ambitious teams. Brand identity, websites and product design that earn attention and convert.",
  email: "hello@auren.studio",
  location: "Mumbai · working worldwide",
  availability: "Booking projects for Q1 2027",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "X", href: "https://x.com" },
  ],
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { value: "40+", label: "Launches shipped" },
  { value: "3.2×", label: "Avg. conversion lift" },
  { value: "12", label: "Industries served" },
  { value: "98%", label: "Client retention" },
];

export const clients = [
  "Meridian",
  "Halcyon",
  "Northbeam",
  "Kestrel",
  "Versey",
  "Lumio",
  "Orbit Labs",
  "Ardent",
];

export const services = [
  {
    icon: "Sparkles",
    title: "Brand identity",
    description:
      "Positioning, naming, logo systems and guidelines that hold up everywhere — from a pitch deck to a billboard.",
    items: ["Strategy & positioning", "Visual identity", "Brand guidelines"],
  },
  {
    icon: "Layers",
    title: "Website design",
    description:
      "Conversion-focused marketing sites built on Next.js. Fast, accessible and easy for your team to extend.",
    items: ["UX & art direction", "Design to code", "CMS & analytics"],
  },
  {
    icon: "PenTool",
    title: "Product design",
    description:
      "Interfaces for SaaS and fintech products — from first flows to a full design system your engineers will thank you for.",
    items: ["Product discovery", "UI systems", "Prototyping"],
  },
  {
    icon: "Zap",
    title: "Motion & content",
    description:
      "Launch films, micro-interactions and social kits that make the brand feel alive instead of assembled.",
    items: ["Launch films", "Interaction design", "Content systems"],
  },
];

export const work = [
  {
    client: "Meridian",
    sector: "Fintech",
    title: "A rebrand that made a 14-year-old bank feel new",
    metric: "+184%",
    metricLabel: "qualified leads",
    year: "2026",
    tags: ["Brand", "Website"],
    gradient: "from-[#1b2a4a] via-[#101728] to-[#08090d]",
    accent: "#7aa2ff",
  },
  {
    client: "Halcyon",
    sector: "D2C skincare",
    title: "Packaging, site and launch campaign in six weeks",
    metric: "3.1×",
    metricLabel: "return on ad spend",
    year: "2026",
    tags: ["Identity", "Content"],
    gradient: "from-[#3a2430] via-[#1b1219] to-[#08090d]",
    accent: "#f0a6c0",
  },
  {
    client: "Northbeam",
    sector: "B2B SaaS",
    title: "Repositioning a analytics platform for enterprise buyers",
    metric: "+42%",
    metricLabel: "demo bookings",
    year: "2025",
    tags: ["Product", "Website"],
    gradient: "from-[#1d3327] via-[#111c16] to-[#08090d]",
    accent: "#8ee6a8",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    description:
      "A focused workshop with your team. We map the market, the buyer and the one idea the brand should own.",
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Define",
    description:
      "Positioning, messaging and art direction. You approve a clear direction before a single pixel is polished.",
    duration: "Week 2",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Weekly design reviews, no black boxes. Identity, site or product screens built in the open with your feedback.",
    duration: "Weeks 3–5",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Production build, QA, analytics and a handover session so your team can ship updates without us.",
    duration: "Week 6",
  },
];

export const testimonials = [
  {
    quote:
      "Auren understood our business faster than agencies we'd paid for six months. The new site paid for itself in five weeks.",
    name: "Priya Raman",
    role: "CEO, Meridian",
    initials: "PR",
  },
  {
    quote:
      "The most organised design partner we've worked with. Clear thinking, zero drama, and the craft is genuinely excellent.",
    name: "Daniel Okoye",
    role: "Head of Growth, Halcyon",
    initials: "DO",
  },
  {
    quote:
      "They rebuilt our positioning and the site in one sprint. Demo bookings jumped 42% in the first month.",
    name: "Sara Lindqvist",
    role: "VP Marketing, Northbeam",
    initials: "SL",
  },
];

export const pricing = [
  {
    name: "Sprint",
    price: "$4,800",
    cadence: "fixed project",
    description:
      "One clear outcome, shipped fast. Ideal for a landing page or a brand refresh.",
    features: [
      "1-week discovery",
      "Landing page design + build",
      "Mobile & accessibility pass",
      "2 revision rounds",
      "30 days of support",
    ],
    cta: "Start a sprint",
    featured: false,
  },
  {
    name: "Studio",
    price: "$9,500",
    cadence: "per month",
    description:
      "Your embedded design team. Brand, site and product work in parallel, with a standing weekly slot.",
    features: [
      "Dedicated designer + developer",
      "Weekly design reviews",
      "Brand system + website",
      "Unlimited revisions",
      "Slack channel, 24h replies",
    ],
    cta: "Book a call",
    featured: true,
  },
  {
    name: "Partner",
    price: "Custom",
    cadence: "quarterly",
    description:
      "For teams shipping a full rebrand or a product launch across multiple surfaces.",
    features: [
      "Full rebrand programme",
      "Design system + docs",
      "Motion & launch assets",
      "Quarterly strategy sessions",
      "Priority scheduling",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export const faqs = [
  {
    question: "How quickly can we start?",
    answer:
      "Usually within 2–3 weeks. If you have a hard launch date, tell us in the first call and we'll tell you honestly whether we can hit it.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. About a third of our work is pre-Series A. We scope to your budget and prioritise the assets that will actually move your next round.",
  },
  {
    question: "Who writes the copy?",
    answer:
      "We do. Positioning and messaging are part of the engagement — you get a story, not just a layout. Your team reviews and approves every word.",
  },
  {
    question: "What do you need from us?",
    answer:
      "A decision-maker in the weekly review, access to your analytics and customer insights, and honest feedback. That's it.",
  },
  {
    question: "Do we own the files?",
    answer:
      "Completely. Source files, Figma libraries, code and documentation are handed over on final payment. No lock-in.",
  },
  {
    question: "Can you maintain the site after launch?",
    answer:
      "Yes — either a monthly retainer or a paid handover session where your team learns to ship updates themselves.",
  },
];

export const budgets = [
  "Under $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
  "Not sure yet",
];
