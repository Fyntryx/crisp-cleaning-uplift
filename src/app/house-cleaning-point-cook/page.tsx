import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PointCookClient from "@/components/lp/PointCookClient";

export const metadata: Metadata = {
  title: "House Cleaning Point Cook | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Point Cook. Estate homes across Sanctuary Lakes, Saltwater Coast, The Circuit, and Boardwalk. Flat pricing. Same cleaner every time.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-point-cook",
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
        "name": "Point Cook"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you service all Point Cook estates including Sanctuary Lakes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - we service all Point Cook estates including Sanctuary Lakes, Saltwater Coast, The Circuit, Boardwalk, and all residential precincts across the suburb."
          }
        },
        {
          "@type": "Question",
          "name": "How much does house cleaning cost in Point Cook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing is based on your home's room count. A four-bedroom family home is priced differently to a five-bedroom Sanctuary Lakes property. Get an exact quote online in under a minute."
          }
        },
        {
          "@type": "Question",
          "name": "Which estate are you in? Why this matters for your booking.",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Advising your estate when you book helps us match the right cleaner - one already familiar with your precinct. It doesn't change your pricing, which is set by room count, not location within the suburb."
          }
        },
        {
          "@type": "Question",
          "name": "Can I book a regular weekly or fortnightly clean in Point Cook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - select your frequency when you book. Weekly and fortnightly bookings attract loyalty rewards from the second month, reducing the ongoing cost significantly over time."
          }
        },
        {
          "@type": "Question",
          "name": "Do you bring your own cleaning products?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes - all eco-friendly cleaning products are included in the price. Nothing is required from you."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a minimum booking requirement in Point Cook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No minimum recurring commitment is required. Fortnightly or weekly bookings include loyalty pricing that doesn't apply to one-off cleans, but there's no lock-in period."
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
          "name": "House Cleaning Point Cook",
          "item": "https://crispcleaning.com.au/house-cleaning-point-cook/"
        }
      ]
    }
  ]
};

export default function PointCookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <PointCookClient />
      <Footer />
    </>
  );
}
