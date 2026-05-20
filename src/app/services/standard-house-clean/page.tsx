"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Testimonials from "@/components/lp/Testimonials";
import FrequencyCards from "@/components/lp/FrequencyCards";
import BuiltForYou from "@/components/lp/BuiltForYou";
import Difference from "@/components/lp/Difference";
import ServiceAreas from "@/components/lp/ServiceAreas";
import { Sparkles, Clock, Shield, UserCheck } from "lucide-react";

// --- DATA STRUCTURES ---
const trustIndicators = [
  { text: "30 second instant quote", icon: Clock },
  { text: "no lock-in contract", icon: Shield },
  { text: "insured & vetted", icon: UserCheck }
];

const faqs = [
  {
    question: "What's actually included in a Standard Clean?",
    answer: (
      <>
        Everything your home needs on a regular basis to maintain overall cleanliness and restore order. Every room gets a tidy and freshen up, including general areas. Check for full list of inclusions <a href="#checklist" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  },
  {
    question: "How is a Standard Clean different from a Deep Clean?",
    answer: "A Standard Clean keeps your home maintained on a consistent basis. A Deep Clean goes further — skirting boards wiped, edge vacuuming, wall spot cleaning, under-bed vacuum, deep bathroom scrub, and more. If it's been a while since your last professional clean, a Deep Clean would be the move."
  },
  {
    question: "Will I get the same cleaner every time?",
    answer: "Yes — we assign you a dedicated cleaner who keeps notes on your home so nothing needs re-explaining. We hit 97% same-cleaner consistency across all our bookings. If your cleaner is ever unavailable, we'll let you know in advance."
  },
  {
    question: "How long does a Standard Clean take?",
    answer: "Depends on your home. A standard 3-bedroom house typically takes around 2–3 hours. You'll get a time estimate when you book."
  },
  {
    question: "Do I need to be home during the clean?",
    answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done."
  },
  {
    question: "What products do you use?",
    answer: "Eco-friendly, non-toxic, and kid and pet safe products are the standard. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it."
  },
  {
    question: "What if I'm not happy with the result?",
    answer: (
      <>
        Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay. You can view our full terms <a href="/terms" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  },
  {
    question: "How much notice do I need to give?",
    answer: (
      <>
        We require at least 48 hours notice to book. The booking form won't allow same-day or next-day scheduling. Need something urgent? <a href="tel:0400000000" className="font-semibold text-primary hover:underline transition-colors">Call us</a> directly and we'll do our best.
      </>
    )
  }
];

export default function HouseCleaningPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": "https://crispcleaning.com.au/#localbusiness",
                "name": "Crisp Cleaning",
                "image": "https://crispcleaning.com.au/logo.png",
                "description": "Professional home and house cleaning service in Melbourne.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Melbourne",
                  "addressRegion": "VIC",
                  "addressCountry": "AU"
                },
                "areaServed": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -37.8136,
                    "longitude": 144.9631
                  },
                  "geoRadius": "50000"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "reviewCount": "250"
                }
              },
              {
                "@type": "Service",
                "serviceType": "Standard House Cleaning",
                "provider": {
                  "@id": "https://crispcleaning.com.au/#localbusiness"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }
            ]
          })
        }}
      />
      <Navbar />

      {/* 1. Hero / Quote Request Section */}
      <div className="pt-24 lg:pt-32">
        <QuoteRequestPanel
          headline={
            <>
              A consistent, detailed clean — every visit, without the mental load.
            </>
          }
          subheadline="Book Melbourne's most trusted home cleaning service in seconds. Premium service. Zero hassle."
          seoKeyword="house cleaning"
          contextPoints={[
            "Top-rated house cleaning professionals in Melbourne.",
            "Instant booking and online schedule management.",
            "100% Satisfaction Guarantee.",
          ]}
          variant="cta"
        />
      </div>

      {/* 2. Frequency Cards */}
      <FrequencyCards />

      {/* 3. Testimonials (Before/After slider) */}
      <Testimonials 
        title="Real results from Melbourne homes."
        subtitle=""
        topTitle={null}
        hideReviews={true}
      />

      {/* 4. Checklist */}
      <Checklist 
        defaultTab="Standard" 
        title="Nothing is assumed. Everything is cleaned." 
        topTitle="The Checklist"
      />

      {/* 5. Built for You (4 Cards) */}
      <BuiltForYou />

      {/* 6. Difference */}
      <Difference 
        title="Why Crisp isn't like every other cleaning service you've tried."
        subtitle=""
      />

      {/* 7. Process Section (How It Works) */}
      <Process 
        title="From quote to clean — here's exactly what happens."
        subtitle=""
      />

      {/* 8. Reviews */}
      <Testimonials 
        title="What Melbourne homeowners are saying."
        subtitle=""
        topTitle={null}
        hideBeforeAfter={true}
      />

      {/* 9. Our Promise / Satisfaction Guarantee */}
      <Guarantee />

      {/* 10. Service Areas Section */}
      <ServiceAreas />

      {/* 11. FAQs Accordion */}
      <FAQ data={faqs} title="Common questions about standard house cleaning" />

      {/* 12. Final CTA Section */}
      <FinalCTA />

      <Footer />
    </main>
  );
}