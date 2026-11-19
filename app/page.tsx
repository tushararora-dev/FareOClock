import { Achievements } from "@/components/site/achievements";
import { Contact } from "@/components/site/contact";
import { FloatingInstagram } from "@/components/site/floating-instagram";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { MapBackdrop } from "@/components/site/map-backdrop";
import { Nav } from "@/components/site/nav";
import { Plan } from "@/components/site/plan";
import { Services } from "@/components/site/services";
import { Tips } from "@/components/site/tips";
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
      price: "99",
      priceCurrency: "INR",
      itemOffered: {
        "@type": "Service",
        name: "Top 100 tips PDF",
        description:
          "A hundred budget-travel tips across flights, stays, visas, food, safety and packing.",
      },
    },
    {
      "@type": "Offer",
      price: "999",
      priceCurrency: "INR",
      itemOffered: {
        "@type": "Service",
        name: "Custom travel itinerary",
        description:
          "A day-by-day itinerary with a budget sheet, booking links and visa checklist.",
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
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <Nav />
      <FloatingInstagram />

      <main
        id="main"
        className="relative overflow-x-clip pt-12 sm:pt-14 lg:pt-[60px]"
      >
        <MapBackdrop />

        <div className="pointer-events-none relative z-10">
          <Hero />
          <Achievements />
          <Tips />
          <Plan />
          <Services />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
