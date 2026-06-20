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
import DeepCleanPlans from "./DeepCleanPlans";
import WhoItsFor from "./WhoItsFor";
import BuiltForYou from "@/components/lp/BuiltForYou";
import ServiceDifference from "./ServiceDifference";
import BeforeAfter from "./BeforeAfter";
import ServiceAreas from "@/components/lp/ServiceAreas";
import { Sparkles, Clock, Shield, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep House Cleaning Melbourne | Top-to-Bottom Reset",
  description: "Professional deep cleaning across Melbourne. Skirting boards, interior windows, edge vacuuming, and detailed bathroom scrubbing. Instant online quotes.",
  alternates: {
    canonical: '/deep-cleaning-melbourne',
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
        Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay. You can view our full terms <a href="/terms-conditions" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  }
];

// Plain-text version for JSON-LD (strips JSX/links)
const faqsForSchema = [
  { question: "What's actually included in a Deep Clean?", answer: "The real question is what isn't? Everything in a Standard Clean, plus the detail work that builds up over time — skirting boards, interior windows, edge vacuuming, wall spot cleaning, under-bed vacuum, deep bathroom scrub, mould removal, polish tapware, deep mop, and more." },
  { question: "How is a Deep Clean different from a Standard Clean?", answer: "A Standard Clean maintains your home on a consistent basis. A Deep Clean is a thorough reset — it covers everything a Standard Clean does, plus all the detail work to ensure your space is truly shining!" },
  { question: "How long does a Deep Clean take?", answer: "A deep clean can take up to twice the length of a standard clean. A 3-bedroom home typically takes around 3–5 hours. You'll get a time estimate when you book." },
  { question: "Should I start with a Deep Clean before switching to Standard Cleans?", answer: "Honestly, yes — we'd strongly recommend it. A Deep Clean sets the right baseline so your Standard Cleans can maintain it efficiently from there. Trying to maintain a home that hasn't had a proper reset just won't get that shine you're looking for." },
  { question: "Will I get the same cleaner every time?", answer: "Yes. We assign you a dedicated cleaner who keeps notes on your home. We hold a 97% same-cleaner consistency across all our bookings. If your cleaner is ever unavailable, you'll hear from us in advance." },
  { question: "Do I need to be home?", answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done." },
  { question: "What products do you use?", answer: "Eco-friendly, non-toxic, and kid and pet safe products are the standard. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it." },
  { question: "What if I'm not happy?", answer: "Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay." }
];

const deepCleanReviews = [
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
                "serviceType": "Deep Cleaning",
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
                    "name": "Deep Cleaning",
                    "item": "https://www.crispcleaning.com.au/deep-cleaning-melbourne"
                  }
                ]
              },
              {
                "@type": "HowTo",
                "name": "How to Book a Deep Clean",
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
      <Navbar bookingLink="#booking?service=Deep" />

      {/* 1. Hero */}
      <ServiceHero googleRatingValue={googleRatingValue} />

      {/* Wrap remaining sections to reduce vertical gap by ~20% */}
      <div className="[&>section]:!py-16 lg:[&>section]:!py-20">
        {/* 2. Choose Your Plan */}
        <DeepCleanPlans />

      {/* 3. Before/After */}
      <BeforeAfter />

      {/* 4. Checklist */}
      <Checklist 
        defaultTab="Deep" 
        title="We don't just clean around things. We reset the space." 
        topTitle="What's Included"
        layout="left"
        subtitle="A deep clean is about getting into the corners, the edges, and the spaces that get ignored. Here is the full room-by-room checklist."
        availableTabs={["Deep", "Standard"]}
      />

      {/* 4.5. Cross-Sell */}
      <section className="bg-[#FAF9F6] py-12 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg text-gray-700 font-medium">
            Looking for ongoing maintenance instead? <br className="hidden md:block" />
            Check out our <a href="/house-cleaning-melbourne" className="text-primary hover:underline font-bold">Standard House Cleaning service</a> to keep your home consistently fresh.
          </p>
        </div>
      </section>

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
        googleRatingValue={googleRatingValue}
        googleReviewCount={googleReviewCount}
      />

      {/* 9. Our Promise / Satisfaction Guarantee */}
      <Guarantee bookingLink="#booking?service=Deep" />

      {/* 10. Service Areas Section */}
      <ServiceAreas />

      {/* 11. FAQs Accordion */}
      <FAQ data={faqs} title="Thinking too deeply? We got you" />

        {/* 12. Final CTA Section */}
        <FinalCTA 
          bookingLink="#booking?service=Deep" 
          title={
            <>
              Time for a true reset. <span className="text-primary">Let's make it spotless.</span>
            </>
          }
          discountText="Let us make it even crispier!" 
        />
      </div>

      <Services hiddenInline />
      <Footer googleRatingValue={googleRatingValue} />
    </main>
  );
}
