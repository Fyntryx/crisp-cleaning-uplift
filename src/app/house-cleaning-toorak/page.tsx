import { Metadata } from "next";
import ToorakClient from "@/components/lp/ToorakClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Toorak │ Premium Service, Same Cleaner Every Visit │ Crisp Cleaning",
  description: "Premium house cleaning in Toorak. Heritage and contemporary homes near Toorak Village, cleaned with discretion and same-cleaner consistency. Instant quote.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-toorak",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-toorak",
  "description": "Premium house cleaning in Toorak. Heritage and contemporary homes near Toorak Village, cleaned with discretion and same-cleaner consistency. Instant quote.",
  "areaServed": [
    { "@type": "City", "name": "Toorak" },
    { "@type": "City", "name": "South Yarra" },
    { "@type": "City", "name": "Malvern" },
    { "@type": "City", "name": "Hawthorn" },
    { "@type": "City", "name": "Armadale" },
    { "@type": "City", "name": "Glen Iris" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default function ToorakPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ToorakClient />
      <Footer />
    </main>
  );
}
