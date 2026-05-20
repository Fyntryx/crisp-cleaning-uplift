"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import Checklist from "@/components/lp/Checklist";
import Process from "@/components/lp/Process";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Testimonials from "@/components/lp/Testimonials";
import { Shield, Star, CheckCircle2 } from "lucide-react";

// --- DATA OBJECT ---
const vacateCleaningData = {
  hero: {
    headline: "Professional Vacate Cleaning in Melbourne",
    subheadline: "Reliable cleaners. Instant online quote. Book in 60 seconds.",
  },
  trustBar: [
    { text: "4.9 Google Rating", icon: Star },
    { text: "Fully Insured Cleaners", icon: Shield },
    { text: "100% Satisfaction Guarantee", icon: CheckCircle2 },
  ],
  faqs: [
    {
      question: "What is exactly included in a vacate cleaning?",
      answer: "Our vacate cleaning is designed to meet strict Australian end-of-lease standards. It includes a deep scrub of kitchens (oven, rangehood, stovetop, cabinets inside/out), full bathroom sanitisation, skirting boards, window tracks, internal windows, door frames, wall spot cleaning, and exhaustive vacuuming and mopping throughout.",
    },
    {
      question: "Do you guarantee I will get my bond back?",
      answer: "Yes! We offer a 100% Bond-Back Guarantee. If your landlord or property manager raises any issues regarding the cleanliness of the property within 72 hours of our service, we will return to re-clean the flagged areas at absolutely no extra cost to you.",
    },
    {
      question: "Are your cleaners background-checked and insured?",
      answer: "Yes, 100%. Every single Crisp Cleaning professional undergoes a strict police background check and is fully insured for your complete peace of mind.",
    },
    {
      question: "Do I need to be home during the clean?",
      answer: "Not at all! You can simply provide entry instructions (like a key box code or key release details) when you book online. Our cleaners are completely vetted and secure, so you can trust us to lock up when done.",
    },
  ],
};

export default function VacateCleaningPage() {
  const { hero, trustBar, faqs } = vacateCleaningData;

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
                "description": "Professional vacate cleaning service in Melbourne.",
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
                "serviceType": "Vacate Cleaning",
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
              {hero.headline.split("Melbourne")[0]}
              <span className="text-primary">Melbourne</span>
              {hero.headline.split("Melbourne")[1]}
            </>
          }
          subheadline={hero.subheadline}
          seoKeyword="vacate cleaning"
          contextPoints={[
            "Top-rated vacate cleaning professionals in Melbourne.",
            "Bond-back guarantee for ultimate peace of mind.",
            "Fully equipped and insured cleaners.",
          ]}
          variant="cta"
        />
      </div>

      {/* 2. Trust Indicators Bar */}
      <section className="bg-primary/5 border-y border-primary/10 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-12">
            {trustBar.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-foreground text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Testimonials (Google reviews & Before/After slider) */}
      <Testimonials />

      {/* 4. Process Section (How It Works) */}
      <Process />

      {/* 5. Inclusions Checklist Tabbed Section */}
      <Checklist defaultTab="Vacate" />

      {/* 6. Our Promise / Satisfaction Guarantee */}
      <Guarantee />

      {/* 7. Service Areas Card Section */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Service Areas</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              Where we clean in Melbourne
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide premium end of lease and vacate cleaning across Melbourne and surrounding suburbs within a 50km radius.
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-[2rem] border border-orange-100/70 p-8 md:p-12 shadow-sm relative overflow-hidden grid md:grid-cols-12 gap-8 items-center">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="md:col-span-6 relative z-10 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Melbourne Metropolitan Coverage</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Crisp Cleaning covers all suburbs in metropolitan Melbourne. Our professional teams service areas from Melbourne CBD, South Yarra, Richmond, Fitzroy, and St Kilda to outer growth zones like Box Hill, Doncaster, Glen Waverley, Frankston, and Craigieburn.
              </p>
              <div>
                <a
                  href="https://maps.app.goo.gl/Uz5ANCsisxJQEnc6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold bg-primary text-white hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-lg"
                >
                  View Service Area Map
                </a>
              </div>
            </div>

            <div className="md:col-span-6 w-full h-[350px] relative rounded-2xl overflow-hidden border border-orange-100/50 shadow-sm bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531688!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0456760532d400!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625584852925!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs Accordion */}
      <FAQ data={faqs} />

      {/* 9. Final CTA Section */}
      <FinalCTA />

      <Footer />
    </main>
  );
}
