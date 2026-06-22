import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import BrightonClient from "@/components/lp/BrightonClient";

export const metadata: Metadata = {
  title: "House Cleaning Brighton | Same Cleaner Every Visit | Crisp Cleaning",
  description:
    "House cleaning in Brighton. Victorian and Edwardian homes near Dendy Street Beach and Church Street, same cleaner every visit, fixed pricing. Instant quote.",
  alternates: {
    canonical: "/house-cleaning-brighton/",
  },
};

const faqsForSchema = [
  {
    question: "Do you service homes near Dendy Street Beach and Church Street?",
    answer:
      "Yes — we cover all of Brighton including the Esplanade, Dendy Street, and the pockets around Church Street and Bay Street.",
  },
  {
    question:
      "Are your products safe for original timber floors and period finishes?",
    answer:
      "Yes. Our product selection is specifically chosen for heritage surfaces including original hardwood floors, polished finishes, and period-era fittings. We don't use steam or high-moisture methods on original floorboards.",
  },
  {
    question: "How much does house cleaning cost in Brighton?",
    answer:
      "Pricing is set by your home's room count and service type. Brighton's larger period homes are quoted accurately for their actual scope, not at a generic rate applied across the suburb. Get an exact price online in under a minute.",
  },
  {
    question: "Can I book the same cleaner for a fortnightly clean?",
    answer:
      "Yes. Your cleaner is assigned from your first booking and returns on your chosen schedule — weekly, fortnightly, or monthly. 97% of recurring clients receive the same cleaner every visit.",
  },
  {
    question: "Do I need to be home when the cleaner arrives?",
    answer:
      "No. Most Brighton clients arrange key safe access or leave a key and aren't home during the clean. Access arrangements are confirmed at booking and stored for every subsequent visit without you resending instructions.",
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer:
      "Contact us within 72 hours and we'll return to address anything that fell short — at no charge. The re-clean guarantee applies from your very first booking.",
  },
];

export default async function HouseCleaningBrightonPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`,
  });

  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                serviceType: "House Cleaning Brighton",
                provider: {
                  "@id": "https://crispcleaning.com.au/#localbusiness",
                },
                areaServed: {
                  "@type": "City",
                  name: "Brighton",
                  sameAs:
                    "https://en.wikipedia.org/wiki/Brighton,_Victoria",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqsForSchema.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <Navbar bookingLink="#booking?service=Standard" />

      <BrightonClient googleRatingValue={googleRatingValue} />

      <Footer />
    </main>
  );
}
