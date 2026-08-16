import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/lp/HeroV2";
import QuoteRequestPanel from "@/components/QuoteRequestPanelV2";
import PricingCards from "@/components/lp/PricingCards";
import Testimonials from "@/components/lp/Testimonials";
import Difference from "@/components/lp/Difference";
import WhyCrisp from "@/components/lp/WhyCrisp";
import Process from "@/components/lp/Process";
import Checklist from "@/components/lp/Checklist";
import Stats from "@/components/lp/Stats";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata = {
  alternates: {
    canonical: '/',
  },
  title: "Home Cleaning Melbourne | Same Cleaner Every Visit | Crisp Cleaning",
  description: "Professional home cleaning across Melbourne. Same cleaner continuity, transparent pricing and fast online quotes. Book in minutes.",
};

export default async function LandingPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`
  });
  
  const googleReviewCount = siteSettings?.googleReviewCount || 14;
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary relative w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "serviceType": "House Cleaning",
                "provider": {
                  "@id": "https://crispcleaning.com.au/#localbusiness"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Do I need to be home during the clean?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is your policy on cancellations and refunds?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We understand if you ever need to reschedule, that’s why if you cancel with more than 48 hours of from your booking, you will receive a 100% refund! Unfortunately, if you cancel within 48 hours a 50% refund will be applicable, as our cleaners have already been assigned to your home."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are your cleaning products safe for family and pets?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your children and pets. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it. If you have specific product requirements or allergies, simply let us know."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What if I'm not happy?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are you fully insured and licensed?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Crisp Cleaning is fully insured and licensed. Our company is committed to operating with the highest standards of professionalism and integrity. Every cleaner undergoes a rigorous background check, giving you complete peace of mind when we enter your home."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do you ensure security of my property?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We take your security very seriously. Our team members undergo thorough background checks, and we have stringent protocols in place to safeguard your property. Your home is always locked and secured upon completion of the clean"
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <Navbar />
      
      <Hero googleRatingValue={googleRatingValue} />
      <QuoteRequestPanel />
      {/* <PricingCards /> */}
      <Testimonials layout="center" googleReviewCount={googleReviewCount} googleRatingValue={googleRatingValue} />
      <Difference />
      <WhyCrisp />
      <Process />
      <Checklist />
      <Stats googleRatingValue={googleRatingValue} />
      <Guarantee />
      <FAQ />
      <FinalCTA description="Every week without a cleaner is another week of catching up. Crisp has limited weekly slots per cleaner — once they're gone, they're gone." />
      
      <LeadPopup />
      <Footer />
    </main>
  );
}
