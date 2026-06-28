import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BundooraClient from "@/components/lp/BundooraClient";

export const metadata: Metadata = {
  title: "House Cleaning Bundoora | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Bundoora. Family homes and rental properties near La Trobe University. Same cleaner every visit, fixed pricing. Book instantly online.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-bundoora",
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
        "name": "Bundoora"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you clean rental properties near La Trobe University in Bundoora?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - rental properties near La Trobe's Kingsbury Drive campus are a core part of the Bundoora catchment. Fixed pricing, same cleaner, and landlord or property manager bookings all welcome."
          }
        },
        {
          "@type": "Question",
          "name": "How much does house cleaning cost in Bundoora?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing depends on room count and property type. A one-bedroom unit near RMIT is priced differently to a four-bedroom family home. Get an exact quote online in under a minute."
          }
        },
        {
          "@type": "Question",
          "name": "Can landlords and property managers set up recurring cleans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - landlords and property managers can book and manage recurring cleans for investment properties. Invoicing and scheduling can be managed from a single account across multiple properties."
          }
        },
        {
          "@type": "Question",
          "name": "Are cleaning supplies included for rental properties?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - all eco-friendly products are included in every clean. No requirement for tenants or landlords to supply anything."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer end-of-lease cleaning in Bundoora?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - vacate and end-of-lease cleaning is available across Bundoora with fixed pricing, inspection-ready standard, and a bond-back guarantee. Get a separate vacate quote online."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a regular fortnightly clean in Bundoora?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Select fortnightly as your frequency when getting your online quote. The same cleaner is assigned and confirmed at booking. 15% off the first clean."
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
          "name": "House Cleaning Bundoora",
          "item": "https://crispcleaning.com.au/house-cleaning-bundoora/"
        }
      ]
    }
  ]
};

export default function BundooraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <BundooraClient />
      <Footer />
    </>
  );
}
