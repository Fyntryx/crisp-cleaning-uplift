import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import SouthYarraClient from "@/components/lp/SouthYarraClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning South Yarra | Same Cleaner Every Visit | Crisp Cleaning",
  description: "Apartment and home cleaning in South Yarra. High-rise properties near Chapel Street and period homes near the Yarra. Fixed pricing, same cleaner. Instant quote.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-south-yarra",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-south-yarra",
  "description": "Apartment and home cleaning in South Yarra. High-rise properties near Chapel Street and period homes near the Yarra. Fixed pricing, same cleaner. Instant quote.",
  "areaServed": [
    { "@type": "City", "name": "South Yarra" },
    { "@type": "City", "name": "Toorak" },
    { "@type": "City", "name": "Windsor" },
    { "@type": "City", "name": "Malvern" },
    { "@type": "City", "name": "Richmond" },
    { "@type": "City", "name": "Melbourne CBD" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default async function SouthYarraPage() {
  
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`,
  });
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

  return (
    <main className="min-h-screen bg-[#FDFAF6] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <SouthYarraClient googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} />
      <Footer />
    </main>
  );
}
