import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrestonClient from "@/components/lp/PrestonClient";

export const metadata: Metadata = {
  title: "House Cleaning Preston | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Preston. Family homes and rentals along the High Street corridor. Same cleaner every visit, fixed pricing. Instant quote online.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-preston",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "House Cleaning",
      "provider": {
        "@id": "https://crispcleaning.com.au/#localbusiness"
      },
      "areaServed": {
        "@type": "City",
        "name": "Preston"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you clean rental properties along Preston's High Street corridor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - rental properties near the High Street corridor, Plenty Road, and across all Preston residential streets are within the standard service area."
          }
        },
        {
          "@type": "Question",
          "name": "How much does house cleaning cost in Preston?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing depends on property type and room count. A two-bedroom unit and a four-bedroom family home are priced differently. Get an exact quote online in under a minute."
          }
        },
        {
          "@type": "Question",
          "name": "Can multiple tenants from one property share a booking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - one booking covers the whole property. Any tenant or the property manager can manage the account; access arrangements are confirmed per property."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to be home when the cleaner visits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No - most Preston clients arrange key safe access or a key handover. Access details are confirmed at booking and stored for every visit."
          }
        },
        {
          "@type": "Question",
          "name": "What's included in a standard clean versus a deep clean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard: floors, bathrooms, kitchen, surfaces, bedrooms. Deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price."
          }
        },
        {
          "@type": "Question",
          "name": "Can I book recurring weekly cleans for a rental property in Preston?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - landlords and property managers can set up weekly or fortnightly recurring cleans, with invoicing managed from a single account across multiple properties if needed."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://crispcleaning.com.au/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "House Cleaning Preston",
          "item": "https://crispcleaning.com.au/house-cleaning-preston/"
        }
      ]
    }
  ]
};

export default async function PrestonPage() {
  
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`,
  });
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <PrestonClient googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} />
      <Footer />
    </>
  );
}
