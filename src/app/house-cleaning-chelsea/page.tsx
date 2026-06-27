import { Metadata } from "next";
import ChelseaClient from "@/components/lp/ChelseaClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "House Cleaning Chelsea | Same Cleaner Every Visit | Crisp Cleaning",
  description: "House cleaning in Chelsea. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.crispcleaning.com.au/house-cleaning-chelsea",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Crisp Cleaning",
  "url": "https://www.crispcleaning.com.au/house-cleaning-chelsea",
  "description": "House cleaning in Chelsea. Sydney Road terraces, share houses and rental apartments. Same cleaner every visit, fixed pricing, instant quotes. Book now.",
  "areaServed": [
    { "@type": "City", "name": "Chelsea" },
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

export default function ChelseaPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ChelseaClient />
      <Footer />
    </main>
  );
}
