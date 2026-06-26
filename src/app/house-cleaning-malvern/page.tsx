import { Metadata } from "next";
import MalvernClient from "@/components/lp/MalvernClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Malvern │ Heritage Homes, Same Cleaner Every Visit │ Crisp Cleaning",
  description: "House cleaning in Malvern. Heritage properties near Glenferrie Road cleaned with the right products and same-cleaner consistency. Instant quote.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-malvern",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-malvern",
  "description": "House cleaning in Malvern. Heritage properties near Glenferrie Road cleaned with the right products and same-cleaner consistency. Instant quote.",
  "areaServed": [
    { "@type": "City", "name": "Malvern" },
    { "@type": "City", "name": "Toorak" },
    { "@type": "City", "name": "Glen Iris" },
    { "@type": "City", "name": "Armadale" },
    { "@type": "City", "name": "Hawthorn" },
    { "@type": "City", "name": "South Yarra" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default function MalvernPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <MalvernClient googleRatingValue={4.9} googleReviewCount={47} />
      <Footer />
    </main>
  );
}
