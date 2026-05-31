"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "./ServiceHero";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Services from "@/components/Services";
import Testimonials from "@/components/lp/Testimonials";
import DeepCleanPlans from "./DeepCleanPlans";
import WhoItsFor from "./WhoItsFor";
import BuiltForYou from "@/components/lp/BuiltForYou";
import ServiceDifference from "./ServiceDifference";
import BeforeAfter from "./BeforeAfter";
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
    question: "What's actually included in a Deep Clean?",
    answer: (
      <>
        The real question is what isn't? Everything in a Standard Clean, plus the detail work that builds up over time — skirting boards, interior windows, edge vacuuming, wall spot cleaning, under-bed vacuum, deep bathroom scrub, mould removal, polish tapware, deep mop, and more. Check the full room-by-room checklist <a href="#checklist" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  },
  {
    question: "How is a Deep Clean different from a Standard Clean?",
    answer: "A Standard Clean maintains your home on a consistent basis. A Deep Clean is a thorough reset — it covers everything a Standard Clean does, plus all the detail work to ensure your space is truly shining!"
  },
  {
    question: "How long does a Deep Clean take?",
    answer: "A deep clean can take up to twice the length of a standard clean. A 3-bedroom home typically takes around 3–5 hours. You'll get a time estimate when you book."
  },
  {
    question: "Should I start with a Deep Clean before switching to Standard Cleans?",
    answer: "Honestly, yes — we'd strongly recommend it. A Deep Clean sets the right baseline so your Standard Cleans can maintain it efficiently from there. Trying to maintain a home that hasn't had a proper reset just won't get that shine you're looking for."
  },
  {
    question: "Will I get the same cleaner every time?",
    answer: "Yes. We assign you a dedicated cleaner who keeps notes on your home. We hold a 97% same-cleaner consistency across all our bookings. If your cleaner is ever unavailable, you'll hear from us in advance."
  },
  {
    question: "Do I need to be home?",
    answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done."
  },
  {
    question: "What products do you use?",
    answer: "Eco-friendly, non-toxic, and kid and pet safe products are the standard. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it."
  },
  {
    question: "What if I'm not happy?",
    answer: (
      <>
        Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay. You can view our full terms <a href="/terms" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  }
];

const deepCleanReviews = [
  { text: "I must say this was the most streamlined service I have experienced — from the quoting, to the scheduling, and not to mention the service quality. 5 stars.", author: "Adnan S" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
  { text: "Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" },
  { text: "Team took great care. Really appreciated the communication — the small details don't go unnoticed. Keep it up Crisp.", author: "Natch L" }
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
      <Navbar bookingLink="#booking?service=Deep" />

      {/* 1. Hero */}
      <ServiceHero />

      {/* Wrap remaining sections to reduce vertical gap by ~20% */}
      <div className="[&>section]:!py-16 lg:[&>section]:!py-20">
        {/* 2. Choose Your Plan */}
        <DeepCleanPlans />

      {/* 3. Before/After */}
      <BeforeAfter />

      {/* 4. Checklist */}
      <Checklist 
        defaultTab="Deep" 
        title="Nothing is assumed. Everything is covered." 
        topTitle="What's Included"
        layout="left"
        subtitle="Every Deep Clean follows a defined room-by-room checklist. Not a vibe — a system. Here's exactly what gets done."
        availableTabs={["Deep", "Standard"]}
      />

      {/* 5. Who It's For (4 Cards) */}
      <WhoItsFor />

      {/* 6. Difference */}
      <ServiceDifference 
        title="Why this isn't like every other deep clean you've had."
        subtitle=""
      />

      {/* 7. Process Section (How It Works) */}
      <Process 
        title="From quote to clean — here's exactly what happens."
        subtitle=""
        layout="left"
      />

      {/* 8. Reviews */}
      <Testimonials 
        title="What Melbourne homeowners are saying."
        subtitle=""
        topTitle="SOCIAL PROOF"
        hideBeforeAfter={true}
        layout="left"
        reviews={deepCleanReviews}
      />

      {/* 9. Our Promise / Satisfaction Guarantee */}
      <Guarantee bookingLink="#booking?service=Deep" />

      {/* 10. Service Areas Section */}
      <ServiceAreas />

      {/* 11. FAQs Accordion */}
      <FAQ data={faqs} title="Thinking too deeply? We got you" />

        {/* 12. Final CTA Section */}
        <FinalCTA bookingLink="#booking?service=Deep" discountText="Let us make it even crispier!" />
      </div>

      <Services hiddenInline />
      <Footer />
    </main>
  );
}
