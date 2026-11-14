import { Clients } from "@/components/site/clients";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Pricing } from "@/components/site/pricing";
import { Process } from "@/components/site/process";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Work } from "@/components/site/work";
import { site } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: "Worldwide",
  knowsAbout: [
    "Brand identity",
    "Website design",
    "Product design",
    "Motion design",
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Clients />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
