import { Metadata } from "next";
import CheltenhamClient from "@/components/lp/CheltenhamClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Cheltenham │ Same Cleaner Every Visit │ Crisp Cleaning",
  description: "House cleaning in Cheltenham. Established family homes across the Sandbelt corridor, same cleaner every visit, fixed pricing. Book instantly online.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-cheltenham",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-cheltenham",
  "description": "House cleaning in Cheltenham. Established family homes across the Sandbelt corridor, same cleaner every visit, fixed pricing. Book instantly online.",
  "areaServed": [
    { "@type": "City", "name": "Cheltenham" },
    { "@type": "City", "name": "Brighton" },
    { "@type": "City", "name": "Hampton" },
    { "@type": "City", "name": "Sandringham" },
    { "@type": "City", "name": "Mentone" },
    { "@type": "City", "name": "Bentleigh East" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default function CheltenhamPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <CheltenhamClient googleRatingValue={5.0} />
      <Footer />
    </main>
  );
}
