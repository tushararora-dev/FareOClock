import { Ask } from "@/components/site/ask";
import { Contact } from "@/components/site/contact";
import { Destinations } from "@/components/site/destinations";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Postcards } from "@/components/site/postcards";
import { Pricing } from "@/components/site/pricing";
import { ScrollPlane } from "@/components/site/scroll-plane";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Trips } from "@/components/site/trips";
import { site } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.mission,
  areaServed: "Worldwide",
  priceRange: "₹₹",
  knowsAbout: [
    "Budget travel planning",
    "Custom travel itineraries",
    "Visa applications",
    "Credit card points and airline miles",
    "Volunteer travel",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      price: "2499",
      priceCurrency: "INR",
      itemOffered: {
        "@type": "Service",
        name: "Custom travel itinerary",
        description:
          "A day-by-day itinerary with a budget sheet, booking links, visa checklist and offline map list.",
      },
    },
    {
      "@type": "Offer",
      price: "999",
      priceCurrency: "INR",
      itemOffered: {
        "@type": "Service",
        name: "1:1 travel session",
        description:
          "A 60-minute call covering visas, credit points, volunteer travel and budget routing.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <Nav />
      <ScrollPlane />

      <main id="main">
        <Hero />
        <Destinations />
        <Trips />
        <Postcards />
        <Services />
        <Ask />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
