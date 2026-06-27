import { Metadata } from "next";
import ArmadaleClient from "@/components/lp/ArmadaleClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Armadale | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Armadale. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-armadale",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-armadale",
  "description": "House cleaning in Armadale. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  "areaServed": [
    { "@type": "City", "name": "Armadale" },
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

export default function ArmadalePage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ArmadaleClient />
      <Footer />
    </main>
  );
}
