import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import Checklist from "@/components/lp/Checklist";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Testimonials from "@/components/lp/Testimonials";
import { Shield, Star, CheckCircle2, UserCheck, Droplets, Clock, ArrowRight, MapPin } from "lucide-react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export const metadata = {
  title: "House Cleaning Glen Iris | Fixed Scope, Same Cleaner | Crisp Cleaning",
  description: "House cleaning in Glen Iris. Family homes near the Gardiners Creek corridor serviced with transparent fixed pricing and same cleaner continuity. Instant online quote.",
  alternates: {
    canonical: "/house-cleaning-glen-iris/",
  },
};

const faqs = [
  { question: "Do you service Glen Iris?", answer: "Yes, we provide professional house cleaning services throughout Glen Iris and surrounding areas. Your quote is calculated instantly based on your home size." },
  { question: "How much does house cleaning cost in Glen Iris?", answer: "Pricing is fixed and transparent, based on your home's actual room count and scope, not hourly estimates. Get an exact price in under 60 seconds online." },
  { question: "Can I request the same cleaner every time?", answer: "Yes. Our model assigns the same dedicated cleaner for every recurring visit, so they learn your home, your preferences, and your specific requirements." },
  { question: "Do I need to be home during the clean?", answer: "No. Most of our clients in Glen Iris provide a keybox code, leave keys with concierge, or let our cleaners in before heading out for the day." },
  { question: "Are cleaning supplies included?", answer: "Yes, 100%. We bring all necessary equipment and premium, eco-friendly cleaning products required to complete the clean." },
  { question: "What's the difference between a standard clean and a deep clean?", answer: "A standard clean covers your recurring maintenance needs (surfaces, floors, bathrooms, kitchens). A deep clean is a meticulous reset adding extras like detailed skirting boards, spot-cleaning walls, and window tracks." }
];

export default async function SuburbTemplatePage() {
  const SUBURB_NAME = "Glen Iris"; // Change this variable when cloning the page for a new city

  // Generate a deterministic SEO-friendly fallback text based on the suburb name
  const fallbackTexts = [
    `Professional home cleaning services dedicated to the ${SUBURB_NAME} community.`,
    `Top-rated residential cleaners servicing ${SUBURB_NAME} and surrounding areas.`,
    `Trusted, fully insured house cleaning tailored for homes in ${SUBURB_NAME}.`,
    `Expert cleaning teams delivering spotless results across ${SUBURB_NAME}.`,
    `Reliable, recurring domestic cleaning services for residents of ${SUBURB_NAME}.`
  ];
  const hash = SUBURB_NAME.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackText = fallbackTexts[hash % fallbackTexts.length];

  // Fetch the uploaded hero image for this suburb, if it exists
  let heroImageSrc: string | null = null;
  try {
    const query = groq`*[_type == "suburbImage" && suburbName == $suburbName][0]`;
    const suburbImageData = await client.fetch(query, { suburbName: SUBURB_NAME }, { next: { revalidate: 60 } });
    if (suburbImageData?.mainImage) {
      heroImageSrc = urlFor(suburbImageData.mainImage).url();
    }
  } catch (error) {
    console.warn("Sanity API fetch failed (likely missing credentials). Falling back to CSS placeholder.");
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      {/* Schema Injection */}
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
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Glen Iris"
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
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://crispcleaning.com.au/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "House Cleaning Glen Iris",
                    "item": "https://crispcleaning.com.au/house-cleaning-glen-iris/"
                  }
                ]
              }
            ]
          })
        }}
      />
      <Navbar />

      {/* 1. Custom Suburb Hero Section */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 relative overflow-hidden bg-gray-50/30">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
              {/* Breadcrumb / Location tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-[#FB8C42]"></div>
                <span className="text-[13px] font-semibold text-gray-700 tracking-wide uppercase">House Cleaning in Glen Iris</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-display font-bold leading-[1.1] text-gray-900 mb-6 tracking-tight">
                House cleaning in <span className="text-[#FB8C42]">Glen Iris</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Same cleaner continuity, transparent pricing, fast online quotes. Vetted, insured cleaners. Book your clean in minutes.
              </p>

              {/* Trust Stats Row */}
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#FB8C42]" fill="currentColor" />
                  </div>
                  <span className="font-semibold text-gray-800 text-[15px]">4.9 Google Rating</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="font-semibold text-gray-800 text-[15px]">Fully Insured Cleaners</span>
                </div>
              </div>

              {/* CTA Button */}
              <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold text-[17px] shadow-[0_10px_35px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                Get Your Instant Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Content (col-span-5) */}
            <div className="lg:col-span-5 order-1 lg:order-2 w-full">
              <div className="relative w-full aspect-[4/3] max-h-[40vh] lg:max-h-[600px] lg:aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl group">
                {/* Image or CSS Fallback */}
                {heroImageSrc ? (
                  <Image
                    src={heroImageSrc}
                    alt={`House cleaning in ${SUBURB_NAME}, Melbourne`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F6] to-white flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 group-hover:bg-gray-50 transition-colors duration-500">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#FB8C42]" />
                      </div>
                    </div>
                    <span className="text-[#FB8C42] text-[11px] font-bold tracking-widest uppercase mb-3">Dedicated Service Area</span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 tracking-tight leading-none">{SUBURB_NAME}</h3>
                    <p className="text-gray-500 max-w-[280px] text-sm leading-relaxed font-medium">{fallbackText}</p>
                  </div>
                )}

                {/* Top-left Overlay Pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  Glen Iris, VIC
                </div>


              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quote Widget */}
      <QuoteRequestPanel
        headline={
          <>
            Get your <span className="text-[#FB8C42]">Glen Iris</span> price in seconds
          </>
        }
        subheadline="Transparent pricing. No hidden fees. Book online immediately."
        seoKeyword="house cleaning glen-iris"
      />

      {/* Intro Paragraph (Text Only) */}
      <section className="pt-8 pb-12 md:pt-10 md:pb-16 relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-[800px] text-center">
          <div className="mb-6">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              WELCOME TO [SUBURB]
            </span>
          </div>

          <h3 style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }} className="text-[32px] md:text-[40px] font-semibold text-gray-900 mb-6">
            Local cleaners for local homes.
          </h3>

          <div className="text-[16px] md:text-[18px] text-gray-500 font-normal leading-[28px] mx-auto text-left md:text-center">
            <p className="mb-6">
              Glen Iris stretches between Malvern and Hawthorn along the Gardiners Creek Trail, with a local shopping strip on High Street that gives it a distinct identity from its better known neighbours. The housing stock is predominantly detached family homes — a mix of interwar properties and later brick veneer — on tree lined streets.
            </p>
            <p>
              Search interest in local cleaning services for this suburb has shown a notable upward trend in recent months, suggesting growing demand for quality focused alternatives to platform matched cleaners. Crisp services the full suburb from High Street through to the quieter residential blocks toward Gardiner station, with fixed pricing by room count and the same cleaner every visit.
            </p>
          </div>

          <div className="mt-10 md:mt-12 flex justify-center">
            <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white px-8 py-4 font-bold text-[16px] shadow-[0_10px_35px_rgba(249,115,22,0.3)] hover:-translate-y-1 transition-all duration-300 group">
              Book with Confidence
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      {/* 2. What's Included */}
      <Checklist topTitle="Service Inclusions" title="What's Included" defaultTab="Standard" availableTabs={["Standard", "Deep", "Add-ons"]} />

      {/* 3. Why Crisp is Glen Iris's Preferred Cleaning Service */}
      <section className="py-12 md:py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <div className="text-center mb-8 md:mb-20">
            <h4 className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-4">Why Crisp</h4>
            <h2 className="text-4xl md:text-[42px] font-bold text-gray-900 tracking-tight mb-6">
              Why Crisp is <span className="text-[#FB8C42]">Glen Iris's</span> Preferred Cleaning Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Same Cleaner, Every Visit", desc: "We assign you a dedicated cleaner and maintain detailed notes on your home. No explaining yourself again. Ever.", icon: UserCheck },
              { title: "Instant Online Quotes", desc: "Instant quote, immediate confirmation, zero back and forth. Book online in seconds or call us and we'll set everything up on the spot.", icon: Clock },
              { title: "Eco-Friendly Products", desc: "We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your children, pets, and the environment.", icon: Droplets },
              { title: "Fully Insured Cleaners", desc: "Every cleaner is background checked, insured, and trained to represent the Crisp standard — in their work and in how they treat your home.", icon: Shield },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-[#FB8C42]/5 hover:-translate-y-1 transition-all duration-300 relative group">
                  <div className="w-12 h-12 bg-orange-50 group-hover:bg-[#FB8C42] transition-colors duration-300 rounded-[14px] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-[#FB8C42] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed font-normal">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Glen Iris Cleaning Prices */}
      <section className="py-12 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-8 max-w-[1000px]">
          <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-4">Transparent Pricing</h4>
              <h2 className="text-3xl md:text-[36px] font-bold text-gray-900 tracking-tight mb-4">
                <span className="text-[#FB8C42]">Glen Iris</span> Cleaning Prices
              </h2>
              <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed font-normal mb-6">
                Unlike many cleaning services in Melbourne, we don't charge vague hourly rates. Our pricing is completely fixed based on your home's actual room count. You know exactly what you'll pay before we arrive.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] font-semibold text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Fixed Quotes</span>
                <span>·</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> No Contracts</span>
                <span>·</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Cancel Anytime</span>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto flex justify-center">
              <a href="/#booking" className="inline-flex items-center justify-center rounded-full bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white px-8 py-4 font-bold text-[15px] shadow-[0_10px_35px_rgba(249,115,22,0.35)] hover:-translate-y-1 transition-all duration-300">
                Get Your Instant Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Glen Iris Homeowners Say */}
      <Testimonials
        title={<>What <span className="text-[#FB8C42]">Glen Iris</span> Homeowners Say</>}
        subtitle="Here's what happened when they switched to Crisp."
        hideBeforeAfter={true}
      />

      {/* 6. Frequently Asked Questions */}
      <FAQ title="Frequently Asked Questions" data={faqs} />

      {/* 6. Nearby Areas We Also Service */}
      <section className="py-12 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-8 max-w-[900px] text-center">
          <h2 className="text-3xl md:text-[36px] font-bold text-gray-900 tracking-tight mb-6">
            Nearby Areas We Also Service
          </h2>
          <p className="text-[15px] md:text-[16px] text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Not in Glen Iris? We cover a wide range of surrounding suburbs across Melbourne.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {/* These will be replaced per suburb */}
            {['Malvern', 'Hawthorn', 'Camberwell', 'Carnegie', 'Toorak'].map((area, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 bg-[#FAF9F6] border border-gray-100 text-[14px] text-gray-600 font-semibold rounded-full hover:border-gray-200 hover:bg-gray-50 transition-colors duration-300 cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Book a Cleaner in Glen Iris */}
      <FinalCTA
        title={<>Book a Cleaner in <span className="text-primary">Glen Iris</span></>}
        description="Crisp has limited weekly slots in Glen Iris — secure your dedicated cleaner today."
      />

      <Footer />
    </main>
  );
}
