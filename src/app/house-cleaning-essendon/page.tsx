import { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import EssendonClient from "@/components/lp/EssendonClient";

export const metadata: Metadata = {
  title: "House Cleaning Essendon │ Period Homes, Same Cleaner Every Visit │ Crisp Cleaning",
  description:
    "House cleaning in Essendon. Californian bungalows and Federation homes on generous blocks near Buckley Street. Same cleaner, fixed pricing. Instant quote.",
  alternates: {
    canonical: "/house-cleaning-essendon/",
  },
};

const faqsForSchema = [
  {
    question: "Do you clean Californian bungalows and large period homes in Essendon?",
    answer: "Yes — period homes including Californian bungalows and Federation properties are cleaned with products and methods appropriate for original surfaces. We don't use steam or abrasives on heritage timber or original tiles.",
  },
  {
    question: "How much does house cleaning cost in Essendon?",
    answer: "Pricing is based on your home's actual room count — Essendon's larger period homes are quoted accurately for their scope. Get an exact fixed price online in under a minute.",
  },
  {
    question: "Are your products safe for original timber floors?",
    answer: "Yes. We use low-moisture, eco-friendly products on timber floors. Steam and high-water-volume methods aren't used on original boards where the risk of warping or damage over time is real.",
  },
  {
    question: "Can I book a regular cleaner near the Buckley Street precinct?",
    answer: "Yes — we service all Essendon streets including those nearest Buckley Street and Keilor Road. Your cleaner is assigned to the property from the first booking and returns on your chosen schedule.",
  },
  {
    question: "How long does a full Essendon home clean typically take?",
    answer: "Duration depends on your home's room count. Your instant quote confirms the scope; larger period homes are allocated appropriate time, not squeezed into a generic hourly slot.",
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer: "We return within 72 hours to address anything that didn't meet your standard — at no additional charge. The guarantee applies from the very first booking and maintains across all subsequent visits.",
  },
];

export default async function HouseCleaningEssendon() {
  const settingsQuery = `*[_type == "settings"][0]{ googleRatingValue }`;
  let googleRatingValue = 5.0;

  try {
    const settings = await sanityFetch({ query: settingsQuery });
    if (settings?.data?.googleRatingValue) {
      googleRatingValue = settings.data.googleRatingValue;
    }
  } catch (error) {
    console.error("Failed to fetch settings for Essendon:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsForSchema.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">
          <EssendonClient googleRatingValue={googleRatingValue} />
        </main>
        <Footer />
      </div>
    </>
  );
}
