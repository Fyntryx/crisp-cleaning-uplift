import { Metadata } from "next";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import ServiceHero from "./ServiceHero";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Services from "@/components/Services";
import Testimonials from "@/components/lp/Testimonials";
import FrequencyCards from "@/components/lp/FrequencyCards";
import WhoItsFor from "./WhoItsFor";
import BuiltForYou from "@/components/lp/BuiltForYou";
import ServiceDifference from "./ServiceDifference";
import BeforeAfter from "./BeforeAfter";
import ServiceAreas from "@/components/lp/ServiceAreas";
import { Sparkles, Clock, Shield, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Regular House Cleaning Melbourne | Weekly & Fortnightly",
  description: "Consistent, detailed house cleaning across Melbourne. Same cleaner every visit, fully vetted, 72hr re-clean guarantee. Book your regular clean today.",
  alternates: {
    canonical: '/house-cleaning-melbourne',
  },
};


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
        Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay. You can view our full terms <a href="/terms-conditions" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  },
  {
    question: "How much notice do I need to give?",
    answer: (
      <>
        We require at least 72 hours notice to book. The booking form won't allow same-day or next-day scheduling. Need something urgent? <a href="tel:0451433786" className="font-semibold text-primary hover:underline transition-colors">Call us</a> directly and we'll do our best.
      </>
    )
  }
];

// Plain-text version for JSON-LD (strips JSX/links)
const faqsForSchema = [
  { question: "What's actually included in a Standard Clean?", answer: "Everything your home needs on a regular basis to maintain overall cleanliness and restore order. Every room gets a tidy and freshen up, including general areas." },
  { question: "How is a Standard Clean different from a Deep Clean?", answer: "A Standard Clean keeps your home maintained on a consistent basis. A Deep Clean goes further — skirting boards wiped, edge vacuuming, wall spot cleaning, under-bed vacuum, deep bathroom scrub, and more. If it's been a while since your last professional clean, a Deep Clean would be the move." },
  { question: "Will I get the same cleaner every time?", answer: "Yes — we assign you a dedicated cleaner who keeps notes on your home so nothing needs re-explaining. We hit 97% same-cleaner consistency across all our bookings. If your cleaner is ever unavailable, we'll let you know in advance." },
  { question: "How long does a Standard Clean take?", answer: "Depends on your home. A standard 3-bedroom house typically takes around 2–3 hours. You'll get a time estimate when you book." },
  { question: "Do I need to be home during the clean?", answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done." },
  { question: "What products do you use?", answer: "Eco-friendly, non-toxic, and kid and pet safe products are the standard. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it." },
  { question: "What if I'm not happy with the result?", answer: "Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay." },
  { question: "How much notice do I need to give?", answer: "We require at least 72 hours notice to book. The booking form won't allow same-day or next-day scheduling. Need something urgent? Call us directly and we'll do our best." }
];

export default async function HouseCleaningPage() {
  const { data: siteSettings } = await sanityFetch({
    query: `*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }`
  });
  
  const googleReviewCount = siteSettings?.googleReviewCount || 14;
  const googleRatingValue = siteSettings?.googleRatingValue || 4.9;

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "serviceType": "Standard House Cleaning",
                "provider": {
                  "@id": "https://crispcleaning.com.au/#localbusiness"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqsForSchema.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.crispcleaning.com.au"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Standard House Cleaning",
                    "item": "https://www.crispcleaning.com.au/house-cleaning-melbourne"
                  }
                ]
              },
              {
                "@type": "HowTo",
                "name": "How to Book a House Clean",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Get a Quote",
                    "text": "Fill out our online form to get an instant quote."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Schedule Your Clean",
                    "text": "Choose a date and time that works for you."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Relax and Enjoy",
                    "text": "Our professionals will clean your home to perfection."
                  }
                ]
              }
            ]
          })
        }}
      />
      <Navbar bookingLink="#booking?service=Standard" />

      {/* 1. Hero */}
      <ServiceHero googleRatingValue={googleRatingValue} />

      {/* Wrap remaining sections to reduce vertical gap by ~20% */}
      <div className="[&>section]:!py-16 lg:[&>section]:!py-20">
        {/* 2. Frequency Cards */}
        <FrequencyCards bookingLink="#booking?service=Standard" />

      {/* 3. Before/After */}
      <BeforeAfter />

      {/* 4. Checklist */}
      <Checklist 
        defaultTab="Standard" 
        title="Nothing is assumed. Everything is covered." 
        topTitle="What's Included"
        layout="left"
        subtitle="Every Regular Clean follows a defined room-by-room checklist. Not a vibe — a system. Here's exactly what gets done."
        availableTabs={["Standard", "Deep"]}
      />

      {/* 5. Who It's For (4 Cards) */}
      <WhoItsFor />

      {/* 6. Difference */}
      <ServiceDifference 
        title="Why Crisp isn't like every other cleaning service you've tried."
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
        topTitle="Testimonials"
        hideBeforeAfter={true}
        layout="left"
        googleRatingValue={googleRatingValue}
        googleReviewCount={googleReviewCount}
      />

      {/* 9. Our Promise / Satisfaction Guarantee */}
      <Guarantee bookingLink="#booking?service=Standard" />

      {/* 10. Service Areas Section */}
      <ServiceAreas />

      {/* 11. FAQs Accordion */}
      <FAQ data={faqs} title="Common questions about standard house cleaning" />

        {/* 12. Final CTA Section */}
        <FinalCTA 
          bookingLink="#booking?service=Standard" 
          title={
            <>
              Your home won't clean itself. <span className="text-primary">But we will.</span>
            </>
          }
        />
      </div>

      <Services hiddenInline />
      <Footer googleRatingValue={googleRatingValue} />
    </main>
  );
}
