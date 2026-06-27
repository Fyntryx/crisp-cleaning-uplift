import { Metadata } from "next";
import PointCookClient from "@/components/lp/PointCookClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Point Cook | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Point Cook. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-point-cook",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-point-cook",
  "description": "House cleaning in Point Cook. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  "areaServed": [
    { "@type": "City", "name": "Point Cook" },
    { "@type": "City", "name": "Coburg" },
    { "@type": "City", "name": "Preston" },
    { "@type": "City", "name": "North Melbourne" },
    { "@type": "City", "name": "Moonee Ponds" },
    { "@type": "City", "name": "Carlton" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  }
};

export default function PointCookPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <PointCookClient />
      <Footer />
    </main>
  );
}
