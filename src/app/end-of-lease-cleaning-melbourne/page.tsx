import { Metadata } from "next";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import ServiceHero from "./ServiceHero";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "./Guarantee";
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
  title: "End of Lease Cleaning Melbourne | 100% Bond Back",
  description: "Melbourne's trusted vacate cleaning service. Real estate approved checklist, free 72hr re-clean guarantee, and instant online booking.",
  alternates: {
    canonical: '/end-of-lease-cleaning-melbourne',
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
        We require at least 72 hours notice to book. The booking form won't allow same-day or next-day scheduling. Need something urgent? <a href="tel:0400000000" className="font-semibold text-primary hover:underline transition-colors">Call us</a> directly and we'll do our best.
      </>
    )
  },
  {
    question: "Do you guarantee I will get my bond back?",
    answer: "Yes. Our Vacate Clean is backed by a 72-hour bond-back guarantee. If your property manager flags any cleaning issues on the exit report within 72 hours of our clean, we will return to fix them completely free of charge."
  }
];

// Plain-text version for JSON-LD (strips JSX/links)
const faqsForSchema = [
  { question: "What's actually included in a Vacate Clean?", answer: "Everything your home needs to pass the final exit inspection. Every room gets a detailed clean from top to bottom, including all general and high-touch areas." },
  { question: "How is a Vacate Clean different from a Deep Clean?", answer: "A Vacate Clean is specifically scoped for bond return — it targets every area a property manager will check on exit. A Deep Clean is a reset for occupied homes. If you're vacating, book the Vacate Clean." },
  { question: "Will I get the same cleaner every time?", answer: "Yes — we assign you a dedicated cleaner who keeps notes on your home so nothing needs re-explaining. We hit 97% same-cleaner consistency across all our bookings. If your cleaner is ever unavailable, we'll let you know in advance." },
  { question: "How long does a Standard Clean take?", answer: "Depends on your home. A standard 3-bedroom house typically takes around 2–3 hours. You'll get a time estimate when you book." },
  { question: "Do I need to be home during the clean?", answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done." },
  { question: "What products do you use?", answer: "Eco-friendly, non-toxic, and kid and pet safe products are the standard. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it." },
  { question: "What if I'm not happy with the result?", answer: "Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay." },
  { question: "How much notice do I need to give?", answer: "We require at least 72 hours notice to book. The booking form won't allow same-day or next-day scheduling. Need something urgent? Call us directly and we'll do our best." },
  { question: "Do you guarantee I will get my bond back?", answer: "Yes. Our Vacate Clean is backed by a 72-hour bond-back guarantee. If your property manager flags any cleaning issues on the exit report within 72 hours of our clean, we will return to fix them completely free of charge." }
];

const vacateCleanReviews = [
  { text: "I must say this was the most streamlined service I have experienced — from the quoting, to the scheduling, and not to mention the service quality. 5 stars.", author: "Adnan S" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
  { text: "Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" },
  { text: "Team took great care. Really appreciated the communication — the small details don't go unnoticed. Keep it up Crisp.", author: "Natch L" }
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
                "serviceType": "End of Lease Cleaning",
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
                    "name": "End of Lease Cleaning",
                    "item": "https://www.crispcleaning.com.au/end-of-lease-cleaning-melbourne"
                  }
                ]
              },
              {
                "@type": "HowTo",
                "name": "How to Book an End of Lease Clean",
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
      <Navbar bookingLink="#booking?service=Vacate" />

      {/* 1. Hero */}
      <ServiceHero googleRatingValue={googleRatingValue} />

      {/* Wrap remaining sections to reduce vertical gap by ~20% */}
      <div className="[&>section]:!py-16 lg:[&>section]:!py-20">
      
      {/* 2. Who It's For (3 Cards) */}
      <WhoItsFor />

      {/* 3. Before/After */}
      <BeforeAfter />

      {/* 4. Checklist */}
      <Checklist 
        defaultTab="Vacate" 
        title="Nothing is assumed. Everything is covered." 
        topTitle="What's Included"
        layout="left"
        subtitle="Every Vacate Clean follows a defined room-by-room checklist. Not a vibe — a system. Here's exactly what gets done."
        availableTabs={["Vacate"]}
      />

      {/* 4.5. Cross-Sell */}
      <section className="bg-[#FAF9F6] py-12 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg text-gray-700 font-medium">
            Moving into a new place that needs a reset? <br className="hidden md:block" />
            Check out our <a href="/deep-cleaning-melbourne" className="text-primary hover:underline font-bold">Deep Cleaning service</a> to make your new home move-in ready.
          </p>
        </div>
      </section>

      {/* 6. Difference */}
      <ServiceDifference 
        title="Why Melbourne tenants and property managers choose Crisp."
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
        title="Bound beyond the bond"
        subtitle=""
        topTitle="SOCIAL PROOF"
        hideBeforeAfter={true}
        layout="left"
        reviews={vacateCleanReviews}
        googleRatingValue={googleRatingValue}
        googleReviewCount={googleReviewCount}
      />

      {/* 9. Our Promise / Satisfaction Guarantee */}
      <Guarantee />

      {/* 10. Service Areas Section */}
      <ServiceAreas />

      {/* 11. FAQs Accordion */}
      <FAQ data={faqs} title="Second thoughts? Let's vacate them" />

        {/* 12. Final CTA Section */}
        <FinalCTA bookingLink="#booking?service=Vacate" title={
          <>
            Why not leave the place <span className="text-primary">crisp-ier</span> than you found it?
          </>
        } />
      </div>

      <Services hiddenInline />
      <Footer googleRatingValue={googleRatingValue} />
    </main>
  );
}
