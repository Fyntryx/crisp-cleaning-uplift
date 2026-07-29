import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import HamptonClient from "@/components/lp/HamptonClient";

export const metadata: Metadata = {
  title: "House Cleaning Hampton │ Bayside Homes, Same Cleaner Every Visit │ Crisp Cleaning",
  description:
    "House cleaning in Hampton. Beach cottages and period homes near Hampton Street village and the foreshore. Same cleaner every visit, fixed pricing. Instant quote.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/house-cleaning-hampton/",
  },
};

const faqsForSchema = [
  {
    question: "Do you service homes near Hampton Beach and the foreshore reserve?",
    answer: "Yes — all of Hampton, including the streets closest to Hampton Beach, the foreshore reserve, and the full Hampton Street corridor from the station to the beach.",
  },
  {
    question: "How much does house cleaning cost in Hampton?",
    answer: "Pricing is based on your home's room count. Beach cottages and larger period homes are priced accurately for their actual scope. Get an exact quote online in under a minute.",
  },
  {
    question: "Can I book a regular weekly or fortnightly cleaner in Hampton?",
    answer: "Yes — select your preferred frequency when you book. The same cleaner returns on that schedule. Weekly and fortnightly bookings include loyalty rewards from the second month of regular service.",
  },
  {
    question: "Are your products safe for beach cottages and period home surfaces?",
    answer: "Yes. Our eco-friendly product selection is appropriate for original timber, period-era tiles, and coastal-adjacent materials. No steam or abrasive methods on original floorboards.",
  },
  {
    question: "Do I need to be home when the cleaner arrives?",
    answer: "No — most Hampton clients arrange key safe access and aren't home during the clean. Access arrangements are confirmed at booking and stored for every visit without you resending details.",
  },
  {
    question: "What's the difference between a standard and a deep clean?",
    answer: "A standard clean covers regular maintenance — floors, bathrooms, kitchen, surfaces, bedrooms. A deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price.",
  },
];

export default async function HouseCleaningHamptonPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`,
  });

  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

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
                serviceType: "House Cleaning Hampton",
                provider: {
                  "@id": "https://crispcleaning.com.au/#localbusiness",
                },
                areaServed: {
                  "@type": "City",
                  name: "Hampton",
                  sameAs: "https://en.wikipedia.org/wiki/Hampton,_Victoria",
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

      <Navbar bookingLink="/book?service=Standard" />

      <HamptonClient googleRatingValue={googleRatingValue} />

      <Footer />
    </main>
  );
}
