/**
 * Single source of truth for site copy.
 * Everything editorial lives here — edit this file and the page updates.
 */

export const site = {
  name: "Budget Banda",
  legalName: "Budget Banda",
  domain: "budgetbanda.com",
  url: "https://budgetbanda.com",
  tagline: "Kam kharch, zyada duniya.",
  mission: "Sab log ghoomein poori duniya — kam budget me.",
  description:
    "Custom travel itineraries and 1:1 sessions for people who want to see more of the world without spending like they're made of money. Real trips from ₹7,000, planned around your budget.",
  email: "hello@budgetbanda.com",
  location: "India · planning trips worldwide",
  availability: "Booking this month · 2 itinerary slots left",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export const nav = [
  { label: "Trips", href: "#trips" },
  { label: "Postcards", href: "#postcards" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { value: "48h", label: "First draft, after the call" },
  { value: "₹999", label: "Flat 1:1 session fee" },
  { value: "₹7,000", label: "Cheapest trip I've costed" },
  { value: "0", label: "Mark-ups on your flights" },
];

/** Places that appear on the site — used for the marquee, not a tally. */
export const destinations = [
  "India",
  "Nepal",
  "UAE",
  "Malaysia",
  "Singapore",
  "Vietnam",
  "Hong Kong",
  "Macau",
  "Philippines",
  "Thailand",
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
    note: "Four states in twelve days",
    cost: "₹30,000",
  },
  {
    slug: "nepal",
    name: "Boudhanath",
    country: "Kathmandu, Nepal",
    lat: 27.7215,
    lon: 85.3620,
    alt: "Boudhanath stupa in Kathmandu with prayer flags around its white dome.",
    note: "A week, no flights",
    cost: "₹7,000",
  },
  {
    slug: "uae",
    name: "Burj Khalifa",
    country: "Dubai, UAE",
    lat: 25.1972,
    lon: 55.2744,
    alt: "The Burj Khalifa rising above the Dubai skyline at dusk.",
    note: "Four days on points",
    cost: "₹15,000",
  },
  {
    slug: "malaysia",
    name: "Petronas Towers",
    country: "Kuala Lumpur, Malaysia",
    lat: 3.1579,
    lon: 101.7116,
    alt: "The twin Petronas Towers in Kuala Lumpur seen from street level.",
    note: "Three countries, eleven days",
    cost: "₹65,000",
  },
  {
    slug: "singapore",
    name: "Marina Bay",
    country: "Singapore",
    lat: 1.2834,
    lon: 103.8607,
    alt: "Marina Bay Sands and the ArtScience Museum across Singapore's waterfront.",
    note: "Two nights, walked everywhere",
    cost: "₹65,000",
  },
  {
    slug: "vietnam",
    name: "Ha Long Bay",
    country: "Vietnam",
    lat: 20.9101,
    lon: 107.1839,
    alt: "Limestone islands of Ha Long Bay seen from Titov Island.",
    note: "Hanoi to Da Nang by train",
    cost: "₹65,000",
  },
  {
    slug: "hongkong",
    name: "Victoria Harbour",
    country: "Hong Kong",
    lat: 22.2930,
    lon: 114.1694,
    alt: "The Hong Kong skyline across Victoria Harbour.",
    note: "Skyline from the Star Ferry",
    cost: "₹1,00,000",
  },
  {
    slug: "macau",
    name: "Senado Square",
    country: "Macau",
    lat: 22.1936,
    lon: 113.5397,
    alt: "The wave-patterned pavement of Senado Square in Macau.",
    note: "A day trip across the water",
    cost: "₹1,00,000",
  },
  {
    slug: "philippines",
    name: "Chocolate Hills",
    country: "Bohol, Philippines",
    lat: 9.9194,
    lon: 124.1631,
    alt: "The green cone-shaped Chocolate Hills stretching to the horizon in Bohol.",
    note: "Island hopping on a scooter",
    cost: "₹1,00,000",
  },
  {
    slug: "thailand",
    name: "Wat Arun",
    country: "Bangkok, Thailand",
    lat: 13.7437,
    lon: 100.4889,
    alt: "The decorated spires of Wat Arun temple beside the Chao Phraya river.",
    note: "Bangkok on a points flight",
    cost: "₹1,00,000",
  },
];

export const trips = [
  {
    place: "Nepal",
    route: "Kathmandu · Pokhara · Chitwan",
    days: 7,
    cost: 7000,
    image: "nepal",
    tags: ["Bus + hostel", "No flights"],
  },
  {
    place: "UAE",
    route: "Dubai · Abu Dhabi",
    days: 4,
    cost: 15000,
    image: "uae",
    tags: ["Points flight", "Metro + bus"],
  },
  {
    place: "India",
    route: "Four states, one loop",
    days: 12,
    cost: 30000,
    image: "india",
    tags: ["Trains", "Homestays"],
  },
  {
    place: "Malaysia · Singapore · Vietnam",
    route: "Kuala Lumpur · Singapore · Hanoi · Da Nang",
    days: 11,
    cost: 65000,
    image: "malaysia",
    tags: ["Points hotel", "Budget airlines"],
  },
  {
    place: "Hong Kong · Macau · Philippines · Thailand",
    route: "Hong Kong · Macau · Manila · Bangkok",
    days: 14,
    cost: 100000,
    image: "thailand",
    tags: ["Multi-city", "Hostels + points"],
  },
];

export const principles = [
  {
    title: "Go more often, not fancier",
    body: "A week in Nepal for ₹7,000 teaches you more than a week in a resort for ₹70,000.",
  },
  {
    title: "Points before packages",
    body: "A ₹40,000 flight and a ₹6,000 flight land at the same gate. The difference is knowing where to look.",
  },
  {
    title: "Ask before you book",
    body: "One honest conversation before you pay saves a week of wrong turns, wrong visas and wrong dates.",
  },
];

/**
 * The actual service, in the user's own words.
 * Every answer is something a 1:1 call covers — no upsell, no fluff.
 */
export const questions = [
  {
    question: "Visa reject ho gaya. Ab kya?",
    answer:
      "Most refusals come down to one weak document or unclear funds proof. We read the refusal letter line by line, fix that one spot, and pick the right window to re-apply.",
  },
  {
    question: "Points se flight kaise book karun?",
    answer:
      "Which card for your spending, when to move points to airline miles, and the exact redemption that turns a ₹40,000 flight into ₹6,000 plus taxes.",
  },
  {
    question: "Free stay kaise milta hai?",
    answer:
      "Work-exchange: a few hours a day in return for a bed. How to find real hosts, what a fair exchange looks like, and the red flags to check before you send anyone money.",
  },
  {
    question: "10 din me 3 countries possible hai?",
    answer:
      "Yes — with the right order. Night trains, open-jaw tickets and one budget airline hop. We build the route around your dates, not around the map.",
  },
  {
    question: "Solo trip safe rahega?",
    answer:
      "It depends on the city, the neighbourhood inside that city, and the hour. You get the areas I'd stay in, the ones I wouldn't, and the habits that keep a solo trip uneventful.",
  },
  {
    question: "Sach me kitne paise chahiye?",
    answer:
      "A per-day number for your destination, split into stay, food, transport and buffer. Then the three line items to cut first — and the ones never to cut.",
  },
  {
    question: "Pehli baar flight hai, kya bhool jaunga?",
    answer:
      "The full airport sequence, documents, baggage rules, and the one thing most first-timers get wrong at immigration. We rehearse it before you fly.",
  },
  {
    question: "Itinerary khud bana sakta hoon?",
    answer:
      "You can, and you should try. If you'd rather have it in 48 hours — with prices, booking links and a visa checklist — that's exactly what the itinerary service is for.",
  },
];

export const services = [
  {
    id: "itinerary",
    icon: "MapPinned",
    kicker: "Service 01",
    title: "A custom itinerary",
    price: "₹2,499",
    unit: "per trip",
    summary:
      "A day-by-day plan built around your dates, your budget and how fast you actually want to move — not a copy-paste blog list.",
    items: [
      "Day-by-day route with realistic timings",
      "Budget sheet in ₹, line by line",
      "Booking links and the cheapest dates",
      "Visa + documents checklist",
      "Google Maps list and an offline PDF",
    ],
    cta: "Get my itinerary",
    badge: "Most booked",
  },
  {
    id: "session",
    icon: "Video",
    kicker: "Service 02",
    title: "A 1:1 session",
    price: "₹999",
    unit: "60 minutes",
    summary:
      "Bring the trip you're stuck on. We solve it live — visa paperwork, credit points, volunteering, or all three in one call.",
    items: [
      "Visa application walkthrough",
      "Credit points and cheap bookings",
      "Volunteer and work-exchange travel",
      "More places on the same money",
      "Recording and notes after the call",
    ],
    cta: "Book a session",
    badge: null,
  },
];

/** What a 1:1 session actually covers. */
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

export const process = [
  {
    step: "01",
    title: "Tell me the trip",
    description:
      "A five-minute form: where, when, who's coming, and the number you want to stay under. No call needed if you don't want one.",
    meta: "Day 0",
  },
  {
    step: "02",
    title: "First draft in 48 hours",
    description:
      "Route, rough costs, and the two or three decisions that change everything — dates, city order, and where not to save money.",
    meta: "24–48 hrs",
  },
  {
    step: "03",
    title: "We edit it together",
    description:
      "One full revision round. Swap a city, add a day, drop a hotel tier. The budget stays honest the whole way through.",
    meta: "2–3 days",
  },
  {
    step: "04",
    title: "You book. I stay around.",
    description:
      "Final PDF with links, a saved Google Maps list, and a WhatsApp window for the week you land — for the things nobody plans for.",
    meta: "Before you fly",
  },
];

export const testimonials = [
  {
    quote:
      "I had nine days, ₹70,000 and three countries in my head. The plan fit all three and I still came home with money left.",
    name: "Ritika S.",
    role: "Malaysia · Singapore · Vietnam",
    initials: "RS",
  },
  {
    quote:
      "The visa section alone was worth the fee. I'd been stuck on the same form for two weeks and we finished it in twenty minutes.",
    name: "Aman K.",
    role: "First trip to the UAE",
    initials: "AK",
  },
  {
    quote:
      "Booked the session for credit points, left with a full itinerary. Used 32,000 points for a return flight to Bangkok.",
    name: "Neha D.",
    role: "Thailand, on points",
    initials: "ND",
  },
];

export const pricing = [
  {
    name: "Session",
    price: "₹999",
    cadence: "60 min · online",
    description: "One call, one problem, solved properly.",
    features: [
      "Live 60-minute video call",
      "Visa and documents walkthrough",
      "Points and cheap-booking plan",
      "Recording plus written notes",
      "7 days of follow-up questions",
    ],
    cta: "Book the session",
    featured: false,
  },
  {
    name: "Itinerary",
    price: "₹2,499",
    cadence: "per trip",
    description: "The full plan, built for your budget.",
    features: [
      "Day-by-day route with timings",
      "Budget sheet in ₹",
      "Booking links and cheapest dates",
      "Visa and documents checklist",
      "Google Maps list and offline PDF",
      "One full revision round",
    ],
    cta: "Start my itinerary",
    featured: true,
  },
  {
    name: "Trip partner",
    price: "₹4,999",
    cadence: "itinerary + 2 calls",
    description: "For the big one — multi-country, or first time abroad.",
    features: [
      "Everything in Itinerary",
      "Two 1:1 calls",
      "Multi-country routing",
      "Points redemption plan",
      "WhatsApp support while you travel",
    ],
    cta: "Go all in",
    featured: false,
  },
];

export const faqs = [
  {
    question: "Main pehli baar bahar jaa raha hoon. Kaam aayega?",
    answer:
      "That's exactly who this is for. First trips fail on paperwork and timing, not on money. You get the visa checklist, the airport sequence, and a plan that assumes you've never done this before.",
  },
  {
    question: "How fast will I get my itinerary?",
    answer:
      "First draft within 48 hours of the brief. The final version lands 2–3 days after your revision notes. If you're flying sooner than that, say so in the form — rush slots exist.",
  },
  {
    question: "Do you book flights and hotels for me?",
    answer:
      "No. You book everything yourself, in your own accounts, with your own cards. That keeps you in control of refunds, points and changes — and it means I never mark up a price. You get the exact links and dates.",
  },
  {
    question: "How much visa help do you give?",
    answer:
      "Guidance, not agency work. I tell you which visa fits, check your documents, and walk you through the form and appointment. I don't submit applications on your behalf and nobody can guarantee an approval.",
  },
  {
    question: "I don't have credit cards or points. Is a session still useful?",
    answer:
      "Yes. Points are one lever out of five. We'll work on dates, city order, transport, stays and food — the parts that save money whether or not you have a single mile.",
  },
  {
    question: "What does a trip actually cost?",
    answer:
      "Every itinerary is priced from actual costs, not package rates. The cheapest week abroad I've costed came to ₹7,000; a 14-day multi-country route can reach ₹1,00,000. Your number depends on where you go and how you fly — the plan is always built around the budget you give me.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer:
      "Reschedule free once with 48 hours' notice. If I haven't started the itinerary, cancel for a full refund. Once the first draft is sent, the work is done and the fee isn't refundable.",
  },
  {
    question: "Where are you based? Is everything online?",
    answer:
      "Based in India, working online. Sessions happen on Google Meet or WhatsApp video, and itineraries arrive as a PDF plus a shared doc you can edit.",
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
  "Custom itinerary",
  "1:1 session",
  "Both / not sure",
];
