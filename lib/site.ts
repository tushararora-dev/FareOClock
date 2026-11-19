/**
 * Single source of truth for site copy.
 * Everything editorial lives here — edit this file and the page updates.
 */

export const site = {
  name: "FareO'Clock",
  legalName: "FareO'Clock",
  domain: "budgetbanda.com",
  url: "https://budgetbanda.com",
  tagline: "More world, less money.",
  mission: "Everyone should see the whole world — on a small budget.",
  description:
    "Custom travel itineraries for people who want to see more of the world without spending like they're made of money. Every plan is built around your budget, not a package price.",
  email: "tushar.ai.dev@gmail.com",
  location: "India · planning trips worldwide",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/tushar.oclock/" },
  ],
};

export const nav = [
  { label: "Home", href: "#top", icon: "Home" },
  { label: "Trips", href: "#achievements", icon: "Plane" },
  { label: "A hundred tips", href: "#tips", icon: "Lightbulb" },
  { label: "A Plan", href: "#plan", icon: "Compass" },
  { label: "Services", href: "#services", icon: "Luggage" },
  { label: "Contact", href: "#contact", icon: "Mail" },
] as const;

export const stats = [
  { value: "48h", label: "First draft of your plan" },
  { value: 99, label: "The Top 100 tips PDF" },
  { value: 999, label: "Custom itinerary" },
  { value: 0, label: "Mark-ups on your flights" },
];

/**
 * Landmark photos. Files live in `public/places/<slug>.jpg`,
 * attribution in `lib/place-credits.json` (shown on /credits).
 */
export const places = [
  {
    slug: "india",
    name: "Taj Mahal",
    country: "Agra, India",
    lat: 27.1751,
    lon: 78.0421,
    alt: "The Taj Mahal in Agra, mirrored in its long reflecting pool.",
  },
  {
    slug: "nepal",
    name: "Boudhanath",
    country: "Kathmandu, Nepal",
    lat: 27.7215,
    lon: 85.362,
    alt: "Boudhanath stupa in Kathmandu with prayer flags around its white dome.",
  },
  {
    slug: "uae",
    name: "Burj Khalifa",
    country: "Dubai, UAE",
    lat: 25.1972,
    lon: 55.2744,
    alt: "The Burj Khalifa rising above the Dubai skyline at dusk.",
  },
  {
    slug: "malaysia",
    name: "Petronas Towers",
    country: "Kuala Lumpur, Malaysia",
    lat: 3.1579,
    lon: 101.7116,
    alt: "The twin Petronas Towers in Kuala Lumpur seen from street level.",
  },
  {
    slug: "singapore",
    name: "Marina Bay",
    country: "Singapore",
    lat: 1.2834,
    lon: 103.8607,
    alt: "Marina Bay Sands and the ArtScience Museum across Singapore's waterfront.",
  },
  {
    slug: "vietnam",
    name: "Ha Long Bay",
    country: "Vietnam",
    lat: 20.9101,
    lon: 107.1839,
    alt: "Limestone islands of Ha Long Bay seen from Titov Island.",
  },
  {
    slug: "hongkong",
    name: "Victoria Harbour",
    country: "Hong Kong",
    lat: 22.293,
    lon: 114.1694,
    alt: "The Hong Kong skyline across Victoria Harbour.",
  },
  {
    slug: "macau",
    name: "Senado Square",
    country: "Macau",
    lat: 22.1936,
    lon: 113.5397,
    alt: "The wave-patterned pavement of Senado Square in Macau.",
  },
  {
    slug: "philippines",
    name: "Chocolate Hills",
    country: "Bohol, Philippines",
    lat: 9.9194,
    lon: 124.1631,
    alt: "The green cone-shaped Chocolate Hills stretching to the horizon in Bohol.",
  },
  {
    slug: "thailand",
    name: "Wat Arun",
    country: "Bangkok, Thailand",
    lat: 13.7437,
    lon: 100.4889,
    alt: "The decorated spires of Wat Arun temple beside the Chao Phraya river.",
  },
  {
    slug: "banahills",
    name: "Golden Bridge, Ba Na Hills",
    country: "Da Nang, Vietnam",
    lat: 16.0194,
    lon: 108.0327,
    alt: "The Golden Bridge held by two giant stone hands at Ba Na Hills, Da Nang.",
  },
  {
    slug: "disneyland-day",
    name: "Sleeping Beauty Castle",
    country: "Disneyland, California",
    lat: 33.8121,
    lon: -117.919,
    alt: "Sleeping Beauty Castle at Disneyland, California.",
  },
];

/** Teaser cards — the chapter names, never the actual tips. */
export const tips = [
  {
    tag: "Flights",
    title: "Flights, sorted",
    body: "Finding, tracking and booking flights without overpaying.",
    image: "hongkong",
  },
  {
    tag: "Points",
    title: "Points that pay",
    body: "Cards, transfers and miles — turned into nearly free seats.",
    image: "thailand",
  },
  {
    tag: "Visas",
    title: "Visas without panic",
    body: "The paperwork, timing and order that actually gets approved.",
    image: "uae",
  },
  {
    tag: "Stays",
    title: "Stays on pocket money",
    body: "Clean, safe beds for a fraction of the room rate.",
    image: "nepal",
  },
  {
    tag: "Transport",
    title: "Moving between cities",
    body: "Trains, buses and local tricks for getting around cheap.",
    image: "vietnam",
  },
  {
    tag: "Money",
    title: "Money that lasts",
    body: "Cards, cash and currency moves that keep the trip cheap.",
    image: "singapore",
  },
  {
    tag: "Food",
    title: "Eat well, pay little",
    body: "How to find the good food and skip the tourist bill.",
    image: "malaysia",
  },
  {
    tag: "Safety",
    title: "Cheap, not careless",
    body: "Insurance, offline maps and the rules that keep you safe.",
    image: "philippines",
  },
];

export const services = [
  {
    id: "tips-pdf",
    icon: "FileText",
    kicker: "Service 01",
    title: "The Top 100 tips",
    price: 99,
    unit: "PDF",
    summary:
      "A hundred money moves I use on every trip — flights, stays, visas, food and the small stuff — in one PDF you can read on the flight.",
    items: [
      "100 tips across flights, stays, visas and food",
      "Points and transfer tricks, explained simply",
      "Works for any country and any budget",
      "Solo-trip safety checklist included",
      "One-bag packing list included",
      "Airport and first-flight survival guide",
      "Read offline, on any device",
      "Lifetime updates included",
    ],
    cta: "Get the PDF",
    badge: null,
  },
  {
    id: "travel-talk",
    icon: "PhoneCall",
    kicker: "Service 02",
    title: "1:1 Travel secrets",
    price: 499,
    unit: "45-min call",
    summary:
      "A 45-minute consultation to review your route, budget numbers, and answer your exact travel questions 1:1.",
    items: [
      "45-minute 1:1 call on Google Meet / WhatsApp",
      "Route sanity check & realistic timings",
      "Budget review and line-by-line cuts",
      "Visa & documentation questions answered",
      "Points & card redemption advice",
      "Solo travel safety & neighbourhood tips",
      "Recording & action notes shared after call",
      "Follow-up chat support for 48 hours",
    ],
    cta: "Book 1:1 secrets",
    badge: null,
  },
  {
    id: "itinerary-session",
    icon: "Video",
    kicker: "Service 03",
    title: "Custom itinerary",
    price: 999,
    unit: "per trip",
    summary:
      "A day-by-day plan built around your dates and budget — visas, points and the route sorted before you book anything.",
    items: [
      "Day-by-day route with realistic timings",
      "Budget sheet, line by line",
      "Booking links and the cheapest dates",
      "Visa + documents checklist",
      "Points and miles plan for your route",
      "Packing and carry-on checklist",
      "Google Maps list and an offline PDF",
      "WhatsApp support while you travel",
    ],
    cta: "Book my trip plan",
    badge: "Most booked",
  },
];

/** What the itinerary actually covers. */
export const inclusions = [
  {
    icon: "Stamp",
    title: "Visas, step by step",
    body: "Which visa you need, the exact document list, how to fill the form, what to carry to the appointment — and what to do if it comes back rejected.",
  },
  {
    icon: "CreditCard",
    title: "Points that actually pay",
    body: "Which card for what, when to move points to airline miles, and the redemptions that quietly turn a ₹40,000 flight into ₹6,000 plus taxes.",
  },
  {
    icon: "HeartHandshake",
    title: "Volunteer travel",
    body: "Work-exchange hosts, free stays in return for a few hours a day, and how to spot a real host from a scam before you send anyone money.",
  },
  {
    icon: "Wallet",
    title: "The budget maths",
    body: "A realistic per-day number for your destination, where the money actually goes, and the three line items worth cutting first.",
  },
  {
    icon: "Route",
    title: "More places, less travel",
    body: "City order, night trains, open-jaw tickets and the one-way tricks that fit four countries into a two-week trip.",
  },
  {
    icon: "ShieldCheck",
    title: "Cheap, not careless",
    body: "Insurance, scam red flags, safe neighbourhoods — and the moments where spending ₹2,000 more is genuinely the smarter call.",
  },
];

export const tripCountries = [
  {
    slug: "india",
    name: "India",
    flag: "/flags/in.svg",
    amount: 30000,
    details: "4 states · flights included",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "/flags/my.svg",
    amount: 21000,
    details: "3 days · from India",
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "/flags/sg.svg",
    amount: 21000,
    details: "3 days · from India",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    flag: "/flags/vn.svg",
    amount: 21000,
    details: "3 days · from India",
  },
  {
    slug: "nepal",
    name: "Nepal",
    flag: "/flags/np.svg",
    amount: 7000,
    details: "5 days · from India",
  },
  {
    slug: "uae",
    name: "UAE",
    flag: "/flags/ae.svg",
    amount: 15000,
    details: "4 days · from India",
  },
  {
    slug: "hong-kong",
    name: "Hong Kong",
    flag: "/flags/hk.svg",
    amount: 30000,
    details: "3 days · from India",
  },
  {
    slug: "macau",
    name: "Macau",
    flag: "/flags/mo.svg",
    amount: 30000,
    details: "3 days · from India",
  },
  {
    slug: "philippines",
    name: "Philippines",
    flag: "/flags/ph.svg",
    amount: 30000,
    details: "3 days · from India",
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "/flags/th.svg",
    amount: 30000,
    details: "3 days · from India",
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Tell me the trip",
    description:
      "A five-minute form: where, when, who's coming, and the number you want to stay under.",
    meta: "Day 0",
    image: "india",
  },
  {
    step: "02",
    title: "First draft in 48 hours",
    description:
      "Route, rough costs, and the two or three decisions that change everything — dates, city order, and where not to save money.",
    meta: "24–48 hrs",
    image: "singapore",
  },
  {
    step: "03",
    title: "We edit it together",
    description:
      "One full revision round. Swap a city, add a day, drop a hotel tier. The budget stays honest the whole way through.",
    meta: "2–3 days",
    image: "uae",
  },
  {
    step: "04",
    title: "You book. I stay around.",
    description:
      "Final PDF with links, a saved Google Maps list, and a WhatsApp window for the week you land — for the things nobody plans for.",
    meta: "Before you fly",
    image: "macau",
  },
];

export const budgets = [
  "Under ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
];

export const enquiryServices = [
  "Top 100 tips PDF",
  "1:1 travel talk",
  "Custom itinerary",
  "Both / not sure",
];
