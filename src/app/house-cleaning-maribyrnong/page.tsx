import { Metadata } from "next";
import MaribyrnongClient from "@/components/lp/MaribyrnongClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Maribyrnong │ Same Cleaner Every Visit │ Crisp Cleaning",
  description: "House cleaning in Maribyrnong. Period homes near Mitchell Street and Edgewater riverside apartments. Same cleaner, fixed pricing. Instant quote online.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-maribyrnong",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-maribyrnong",
  "description": "House cleaning in Maribyrnong. Period homes near Mitchell Street and Edgewater riverside apartments. Same cleaner, fixed pricing. Instant quote online.",
  "areaServed": [
    { "@type": "City", "name": "Maribyrnong" },
    { "@type": "City", "name": "Essendon" },
    { "@type": "City", "name": "Footscray" },
    { "@type": "City", "name": "Moonee Ponds" },
    { "@type": "City", "name": "Strathmore" },
    { "@type": "City", "name": "Yarraville" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default function MaribyrnongPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <MaribyrnongClient />
      <Footer />
    </main>
  );
}
