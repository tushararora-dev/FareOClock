import { PassportSection } from "@/components/passport-section";
import { ContactForm } from "@/components/site/contact-form";

export function Contact() {
  return (
    <section id="contact" className="pointer-events-auto pt-6 sm:pt-8 pb-0">
      <PassportSection
        number="05"
        eyebrow="05 · Start here"
        title={<>Tell me the trip.</>}
        description={
          <>
            Share your{" "}
            <span className="marker-yellow font-semibold text-ink">
              route ideas
            </span>
            , dates, or what you want out of it. Even if you&apos;re not sure, we
            can figure out the{" "}
            <span className="marker-yellow font-semibold text-ink">
              first step
            </span>{" "}
            together.
          </>
        }
        hideStamp
        className="border-b-0"
      >
        <ContactForm />
      </PassportSection>
    </section>
  );
}
