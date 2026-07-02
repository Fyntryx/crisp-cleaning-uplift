"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ChevronDown, 
  UtensilsCrossed, 
  Bed, 
  Layers, 
  Shirt, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Star
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/lp/FAQ";

/* ════════════════════════════════════════════════════════════════
   1. DATA ARRAYS
════════════════════════════════════════════════════════════════ */

const faqData = [
  {
    question: "Do you clean large heritage homes in Malvern?",
    answer: <p>Yes — large Victorian, Edwardian, and Federation homes with multiple formal rooms are a core part of the Malvern service. Pricing is set by actual room count for accurate scoping.</p>
  },
  {
    question: "How much does house cleaning cost in Malvern?",
    answer: <p>Pricing is based on your home's room count and scope. Malvern's larger period homes are quoted accurately for their genuine requirements. Get an exact fixed price online in under a minute.</p>
  },
  {
    question: "Are your products safe for polished timber and period surface finishes?",
    answer: <p>Yes. We use low-moisture, eco-friendly products on original timber floors and period-era finishes — not steam or abrasive methods that damage heritage surfaces over time.</p>
  },
  {
    question: "Can I start with a one-off deep clean before switching to a regular service?",
    answer: <p>Yes — a one-off deep clean is available to establish a high baseline before beginning recurring visits. Many new Malvern clients start this way. Get a separate deep clean quote online.</p>
  },
  {
    question: "What's included in a standard clean for a larger Malvern home?",
    answer: <p>Kitchen, all bathrooms, all floors throughout, every bedroom in scope, formal living and dining areas, and laundry. Additional formal rooms are included within the agreed scope. Your instant quote confirms exactly what's covered.</p>
  },
  {
    question: "Can I pause or adjust my cleaning schedule?",
    answer: <p>Yes — frequency can be adjusted through your online account at any time. Recurring bookings can be paused, rescheduled, or changed in frequency without penalty.</p>
  }
];

const reviews = [
  { text: "Honestly felt like a brand new home.", author: "Andre B", suburb: "Malvern" },
  { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L", suburb: "Malvern" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S", suburb: "Malvern" }
];

/* ════════════════════════════════════════════════════════════════
   2. HELPER COMPONENTS
════════════════════════════════════════════════════════════════ */

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="max-w-[800px] mx-auto mt-12 text-center">
      <span className="text-[120px] text-[#FB8C42] opacity-15 leading-[0.8] block mb-6 font-serif">"</span>
      
      <div className="relative h-[180px] md:h-[140px]">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className={`absolute top-0 left-0 w-full transition-all duration-300 ease-in-out ${
              idx === currentIndex ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-2 z-0 pointer-events-none"
            }`}
          >
            <p className="text-[20px] md:text-[24px] font-[400] text-[#1a1a1a] leading-[1.6] italic">
              "{review.text}"
            </p>
            <div className="flex flex-col items-center justify-center mt-8">
              <div className="w-12 h-12 rounded-full bg-[#fef3c7] text-[#92400e] flex items-center justify-center text-[15px] font-bold mb-3">
                {review.author.charAt(0)}
              </div>
              <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">{review.author}</p>
              <p className="text-[13px] text-[#9ca3af] mt-0.5">{review.suburb}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FB8C42] text-[#FB8C42]" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-6 mt-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-[#e5e7eb] text-[#6b7280] flex items-center justify-center hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-2">
            {reviews.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-[#FB8C42] w-6" : "bg-[#e5e7eb] w-2"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-[#e5e7eb] text-[#6b7280] flex items-center justify-center hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════════
   4. MAIN PAGE COMPONENT
════════════════════════════════════════════════════════════════ */

export default function MalvernClient({ googleRatingValue = 5.0, googleReviewCount = 14 }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-sm {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce-sm {
          animation: bounce-sm 2s infinite ease-in-out;
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-revealUp {
          animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ticker, .animate-bounce-sm, .animate-revealUp { 
            animation: none !important; 
            transform: none !important;
            opacity: 1 !important;
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .text-stroke-2 {
          -webkit-text-stroke: 2px #1a1a1a;
        }
        .text-stroke-white {
          -webkit-text-stroke: 2px #ffffff;
        .hero-crossing-lines {
          background-image: 
            linear-gradient(to bottom right, transparent calc(50% - 1px), #f0f0f0 calc(50% - 1px), #f0f0f0 calc(50% + 1px), transparent calc(50% + 1px)),
            linear-gradient(to top right, transparent calc(50% - 1px), #f0f0f0 calc(50% - 1px), #f0f0f0 calc(50% + 1px), transparent calc(50% + 1px));
        }
      `}} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#FDF8F4] pt-[120px] pb-[80px] border-b border-[#e5e7eb] overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Column */}
            <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
              <ScrollReveal>
                <div className="inline-flex items-center bg-[rgba(217,119,6,0.1)] border border-[rgba(217,119,6,0.2)] rounded-full px-[14px] py-[6px] mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#FB8C42] mr-2"></span>
                  <span className="text-[12px] font-[600] text-[#FB8C42] tracking-[0.1em] uppercase">
                    Serving Malvern
                  </span>
                </div>

                <h1 className="flex flex-col mb-6 text-[48px] md:text-[72px] font-[800] leading-[1.05] tracking-[-0.03em]">
                  <span className="text-[#1a1a1a]">House Cleaning</span>
                  <span className="text-[#FB8C42]">Malvern</span>
                  <span className="text-[#1a1a1a]">Melbourne</span>
                </h1>

                <p className="text-[16px] text-[#4b5563] leading-[1.8] mb-10 max-w-[540px]">
                  Malvern's tree-lined residential streets — running between Glenferrie Road and Wattletree Road — contain some of Melbourne's finest period housing stock. Victorian mansions, Federation-era homes, and Californian bungalows on generous blocks define the suburb's character, maintained by long-tenure families who are exacting about their properties. Getting a consistently high standard across homes like these requires more than a rotating cleaner following a generic checklist. Crisp services Malvern properties with eco-friendly products appropriate for heritage surfaces, fixed pricing calibrated to larger floor plans, and the same cleaner who builds genuine knowledge of your home over time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a href="/#booking" className="w-full sm:w-auto bg-[#FB8C42] text-white rounded-full px-[36px] py-[16px] text-[15px] font-[600] hover:bg-[#ea6309] transition-colors duration-300 text-center shadow-lg">
                    Get an Instant Quote
                  </a>
                  <a href="#included" className="w-full sm:w-auto border border-[#d1d5db] text-[#1a1a1a] rounded-full px-[36px] py-[16px] text-[15px] font-[600] hover:bg-white transition-colors duration-300 text-center bg-[rgba(255,255,255,0.5)]">
                    See what's included
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[55%] flex flex-col z-10">
              <ScrollReveal delay={0.2} className="w-full relative">
                {/* Image */}
                <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[16/10] mb-6 border border-[rgba(0,0,0,0.05)] bg-white">
                  <img 
                    src="/images/housecleaning-Malvern.jpg" 
                    alt="Heritage home in Malvern, Melbourne" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Stats Row Below Image */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-[20px] p-6 shadow-sm border border-[#e5e7eb]">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[32px] font-[900] text-[#1a1a1a] leading-none mb-1">97%</span>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-[0.1em] font-[600]">Same<br/>cleaner</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[32px] font-[900] text-[#1a1a1a] leading-none mb-1">100%</span>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-[0.1em] font-[600]">Eco-<br/>friendly</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[32px] font-[900] text-[#1a1a1a] leading-none mb-1">72hr</span>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-[0.1em] font-[600]">Re-clean<br/>guarantee</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[32px] font-[900] text-[#1a1a1a] leading-none mb-1">Fixed</span>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-[0.1em] font-[600]">Pricing<br/>always</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 4 — HORIZONTAL PROPERTY SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-[80px] overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          
          <ScrollReveal>
            <div className="mb-8">
              <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
                Malvern's Housing Stock
              </span>
              <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] max-w-[600px] leading-[1.1] mb-4">
                Cleaning Malvern's Heritage Properties With Consistency and Care
              </h2>
              <p className="text-[16px] text-[#6b7280] leading-[1.7] max-w-[700px]">
                Malvern's housing stock rewards careful, consistent cleaning and reveals inconsistency quickly. Heritage surfaces — polished timber floors, tessellated entry tiles, leadlight windows, cornices, and period-era bathroom fittings — require a cleaner who understands what they are working with and returns regularly enough to maintain a standard rather than reset one.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid Wrapper */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            
            {/* Card 1 */}
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-white border border-[#e5e7eb] rounded-[20px] overflow-hidden flex flex-col shadow-sm">
                <div className="bg-[#0f172a] p-[32px] h-[200px] relative">
                  <div className="absolute bottom-[-20px] right-[10px] text-[120px] font-[900] text-[rgba(255,255,255,0.04)] leading-none select-none">
                    01
                  </div>
                  <span className="inline-block bg-[rgba(217,119,6,0.2)] text-[#FB8C42] rounded-full px-[12px] py-[4px] text-[11px] mb-3 relative z-10 font-[600]">
                    Glenferrie Road · High Street
                  </span>
                  <h3 className="text-[#ffffff] text-[18px] font-[700] leading-tight relative z-10 max-w-[280px]">
                    Victorian and Edwardian Homes Near Glenferrie Road
                  </h3>
                </div>
                <div className="p-[28px] flex-grow flex flex-col">
                  <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                    The streets between Glenferrie Road and High Street — Malvern's two main commercial strips — contain some of the suburb's finest Victorian and Edwardian properties. Large formal floor plans, multiple living rooms, and original fittings throughout are common here. Our fixed pricing accounts for the genuine scope of these larger homes; a five-bedroom Edwardian with two formal reception rooms is quoted for what it actually requires, not a standard rate.
                  </p>
                  <div className="mt-[16px] flex flex-wrap gap-[8px]">
                    {["Multiple formal rooms", "Fixed scope pricing", "Original fittings", "Heritage surfaces"].map(tag => (
                      <span key={tag} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-[12px] py-[4px] text-[12px] text-[#374151]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <div className="h-full bg-white border border-[#e5e7eb] rounded-[20px] overflow-hidden flex flex-col shadow-sm">
                <div className="bg-[#1a1a1a] p-[32px] h-[200px] relative">
                  <div className="absolute bottom-[-20px] right-[10px] text-[120px] font-[900] text-[rgba(255,255,255,0.04)] leading-none select-none">
                    02
                  </div>
                  <span className="inline-block bg-[rgba(217,119,6,0.2)] text-[#FB8C42] rounded-full px-[12px] py-[4px] text-[11px] mb-3 relative z-10 font-[600]">
                    Tree-Lined Residential Streets
                  </span>
                  <h3 className="text-[#ffffff] text-[18px] font-[700] leading-tight relative z-10 max-w-[280px]">
                    Period Properties on Malvern's Tree-Lined Residential Streets
                  </h3>
                </div>
                <div className="p-[28px] flex-grow flex flex-col">
                  <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                    Away from the main strips, Malvern's residential streets are characterised by Federation and interwar-era homes on generous, immaculately maintained blocks. These properties often have formal and informal living zones, original timber floors throughout, and multiple bathrooms renovated around original structural features. The same cleaner every visit is particularly valuable here — specific layout knowledge and surface requirements are accumulated rather than relearned each time.
                  </p>
                  <div className="mt-[16px] flex flex-wrap gap-[8px]">
                    {["Federation era homes", "Original timber floors", "Multiple bathrooms", "Same cleaner every visit"].map(tag => (
                      <span key={tag} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-[12px] py-[4px] text-[12px] text-[#374151]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3}>
              <div className="h-full bg-white border border-[#e5e7eb] rounded-[20px] overflow-hidden flex flex-col shadow-sm">
                <div className="bg-[#FB8C42] p-[32px] h-[200px] relative">
                  <div className="absolute bottom-[-20px] right-[10px] text-[120px] font-[900] text-[rgba(255,255,255,0.2)] leading-none select-none">
                    03
                  </div>
                  <span className="inline-block bg-[rgba(0,0,0,0.15)] text-[#ffffff] rounded-full px-[12px] py-[4px] text-[11px] mb-3 relative z-10 font-[600]">
                    Contemporary · Architect-Designed
                  </span>
                  <h3 className="text-[#ffffff] text-[18px] font-[700] leading-tight relative z-10 max-w-[280px]">
                    Contemporary and Renovated Homes Alongside Heritage Stock
                  </h3>
                </div>
                <div className="p-[28px] flex-grow flex flex-col">
                  <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                    Malvern's period stock sits alongside a growing number of architect-designed and substantially renovated properties — large open-plan layouts, stone and concrete surfaces, and contemporary bathrooms presenting a different scope to the suburb's original housing. These are handled within the same fixed-pricing framework at pricing that reflects their actual room count and surface requirements.
                  </p>
                  <div className="mt-[16px] flex flex-wrap gap-[8px]">
                    {["Stone & concrete surfaces", "Open-plan layouts", "Contemporary bathrooms", "Fixed-pricing framework"].map(tag => (
                      <span key={tag} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-[12px] py-[4px] text-[12px] text-[#374151]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — WHAT'S INCLUDED (Staggered)
      ══════════════════════════════════════════════════════ */}
      <section id="included" className="bg-[#ffffff] py-[80px]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="mb-16">
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Scope & Checklist
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] max-w-[600px] leading-[1.1] mb-4">
              What Every Malvern Clean Covers
            </h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.7] max-w-[700px]">
              Every Malvern clean follows a documented scope covering all main rooms and surfaces within your booking. Nothing is left to interpretation on the day — which is what makes a fixed, pre-confirmed price possible for homes at this level of complexity and scale.
            </p>
          </ScrollReveal>

          {/* Staggered Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            
            {/* LEFT COLUMN (Starts at y=0) */}
            <div className="flex flex-col gap-[24px]">
              
              {/* Item 1 */}
              <ScrollReveal delay={0.1}>
                <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[32px]">
                  <div className="w-[40px] h-[40px] rounded-lg bg-orange-50 flex items-center justify-center mb-6">
                    <UtensilsCrossed className="w-5 h-5 text-[#FB8C42]" />
                  </div>
                  <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-4">
                    Kitchen and Bathroom Detailing
                  </h3>
                  <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-6">
                    Malvern's kitchens range from period-era designs with original cabinetry to contemporary renovations with premium stone benchtops. All benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned to a consistent standard on every visit. All bathrooms — including original and renovated — are sanitised, scrubbed, and polished on every booking.
                  </p>
                  <div className="flex flex-wrap gap-[8px]">
                    {["All benchtops & surfaces", "Period & contemporary kitchens", "All bathrooms sanitised", "Frameless screens polished"].map(tag => (
                      <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[500]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Item 2 */}
              <ScrollReveal delay={0.2}>
                <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[32px]">
                  <div className="w-[40px] h-[40px] rounded-lg bg-orange-50 flex items-center justify-center mb-6">
                    <Bed className="w-5 h-5 text-[#FB8C42]" />
                  </div>
                  <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-4">
                    Bedrooms, Formal Dining Rooms and Additional Spaces
                  </h3>
                  <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-6">
                    Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left to a tidy standard. Formal dining rooms, studies, libraries, and sitting rooms are included within the agreed scope. Malvern's larger homes with six or more rooms are scoped and priced at booking; additional rooms not included initially can be added with a corresponding price adjustment.
                  </p>
                  <div className="flex flex-wrap gap-[8px]">
                    {["All bedrooms vacuumed", "Formal dining included", "Studies & libraries", "6+ room homes scoped"].map(tag => (
                      <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[500]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT COLUMN (Starts offset down by 60px on desktop) */}
            <div className="flex flex-col gap-[24px] md:mt-[60px]">
              
              {/* Item 3 */}
              <ScrollReveal delay={0.3}>
                <div className="bg-[#0f172a] rounded-[20px] p-[32px]">
                  <div className="w-[40px] h-[40px] rounded-lg bg-[rgba(217,119,6,0.15)] flex items-center justify-center mb-6">
                    <Layers className="w-5 h-5 text-[#FB8C42]" />
                  </div>
                  <h3 className="text-[20px] font-[700] text-[#ffffff] mb-4">
                    Original Timber Floors, Polished Surfaces and Formal Living Areas
                  </h3>
                  <p className="text-[15px] text-[rgba(255,255,255,0.65)] leading-[1.7] mb-6">
                    Timber floors throughout the home are swept and mopped with low-moisture, eco-friendly products appropriate for both original and refinished boards — not steam methods that risk warping original floorboards over time. Formal living and dining rooms — often the defining spaces in Malvern's Victorian and Edwardian homes — are given the same attention as everyday areas. Polished surfaces, mirrors, glass, and accessible shelf areas are dusted and wiped on every visit.
                  </p>
                  <div className="flex flex-wrap gap-[8px]">
                    {["Low-moisture on timber", "No steam on boards", "Formal reception rooms", "Feature surfaces"].map(tag => (
                      <span key={tag} className="bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.2)] text-[#fbbf24] rounded-full px-[12px] py-[4px] text-[12px] font-[500]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>



            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — LARGE QUOTE BREAK
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0f172a] py-[80px] px-[32px]">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <div className="w-[40px] h-[2px] bg-[#FB8C42] mx-auto mb-[32px]" />
            <p className="text-[24px] md:text-[28px] font-[500] text-[#ffffff] leading-[1.6] italic max-w-[760px] mx-auto">
              "Malvern's homeowner demographic values quality and consistency. The medium competition index here reflects a market where established trust matters and a new provider needs to demonstrate quality before winning recurring clients. Crisp's model — same cleaner, fixed scope, heritage-appropriate products — is specifically suited to earning and keeping that trust."
            </p>
            
            <div className="mt-[48px] flex flex-col md:flex-row justify-center gap-[32px] md:gap-[64px]">
              <div>
                <div className="text-[40px] font-[800] text-[#FB8C42] leading-none mb-1">97%</div>
                <div className="text-[12px] text-[rgba(255,255,255,0.5)] leading-tight">Same cleaner<br/>every visit</div>
              </div>
              <div>
                <div className="text-[40px] font-[800] text-[#FB8C42] leading-none mb-1">100%</div>
                <div className="text-[12px] text-[rgba(255,255,255,0.5)] leading-tight">Eco-friendly<br/>products</div>
              </div>
              <div>
                <div className="text-[40px] font-[800] text-[#FB8C42] leading-none mb-1">72hr</div>
                <div className="text-[12px] text-[rgba(255,255,255,0.5)] leading-tight">Re-clean<br/>guarantee</div>
              </div>
            </div>
            
            <div className="w-[40px] h-[2px] bg-[#FB8C42] mx-auto mt-[48px]" />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — WHY CRISP (Comparison Table)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <ScrollReveal>
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3 text-center">
              The Crisp Difference
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] leading-[1.1] mb-6 text-center">
              Why Malvern Homeowners Choose Crisp
            </h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.7] max-w-[700px] mx-auto text-center">
              Malvern's homeowner demographic values quality and consistency. The medium competition index here reflects a market where established trust matters and a new provider needs to demonstrate quality before winning recurring clients. Crisp's model — same cleaner, fixed scope, heritage-appropriate products — is specifically suited to earning and keeping that trust.
            </p>
          </ScrollReveal>

          {/* 2x2 Grid of Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] mt-[48px]">
            {/* Block 1 */}
            <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[28px] hover:border-[#FB8C42] transition-colors duration-200">
              <CheckCircle2 className="w-[20px] h-[20px] text-[#FB8C42] mb-[12px]" />
              <h3 className="text-[16px] font-[700] text-[#1a1a1a] mb-[12px]">
                Same Cleaner — Familiar With Your Home From the Second Visit Onward
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.7] mb-4">
                Your Malvern cleaner is assigned at the first booking and returns on every scheduled visit. By visit two, they know where your home's original floorboards need particular care, which bathroom has the tessellated entry tile, and how your formal rooms are arranged. This accumulated knowledge is what makes the second year of regular cleaning better than the first. Our 97% same-cleaner continuity rate makes this reliable.
              </p>
              <span className="bg-[#fef3c7] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[700] inline-block">
                97%
              </span>
            </div>

            {/* Block 2 */}
            <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[28px] hover:border-[#FB8C42] transition-colors duration-200">
              <CheckCircle2 className="w-[20px] h-[20px] text-[#FB8C42] mb-[12px]" />
              <h3 className="text-[16px] font-[700] text-[#1a1a1a] mb-[12px]">
                Fixed Pricing Based on What Your Home Actually Requires
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.7] mb-4">
                Malvern's period homes range from manageable three-bedroom properties to substantial seven-room homes with multiple formal spaces. Pricing is set by your actual room count and scope, confirmed online before any cleaner arrives. Larger homes are quoted accurately — you're not underpaying for a scope that can't be delivered at that price.
              </p>
              <span className="bg-[#fef3c7] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[700] inline-block">
                Fixed
              </span>
            </div>

            {/* Block 3 */}
            <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[28px] hover:border-[#FB8C42] transition-colors duration-200">
              <CheckCircle2 className="w-[20px] h-[20px] text-[#FB8C42] mb-[12px]" />
              <h3 className="text-[16px] font-[700] text-[#1a1a1a] mb-[12px]">
                Products Selected for Heritage Surfaces and Original Finishes
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.7] mb-4">
                The wrong products on Malvern's heritage surfaces cause visible deterioration over time — stripped timber finishes, dulled polished floors, discoloured grout, and etched stone are all avoidable. Our eco-friendly product selection is specifically chosen for surface compatibility with original and heritage materials, cleaning effectively without cumulative deterioration across visits.
              </p>
              <span className="bg-[#fef3c7] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[700] inline-block">
                100%
              </span>
            </div>

            {/* Block 4 */}
            <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[28px] hover:border-[#FB8C42] transition-colors duration-200">
              <CheckCircle2 className="w-[20px] h-[20px] text-[#FB8C42] mb-[12px]" />
              <h3 className="text-[16px] font-[700] text-[#1a1a1a] mb-[12px]">
                Satisfaction Guaranteed on Every Clean
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.7] mb-4">
                Every Crisp clean is backed by a 72-hour re-clean guarantee — if anything doesn't meet your standard after a visit, contact us and we return to address it at no charge. This applies from the first booking and holds across all subsequent visits without diminishing over time.
              </p>
              <span className="bg-[#fef3c7] text-[#92400e] rounded-full px-[12px] py-[4px] text-[12px] font-[700] inline-block">
                72hr
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-[80px]">
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center">
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Client Stories
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] leading-[1.1]">
              What Malvern Homeowners Say
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TestimonialSlider />
            <div className="text-center mt-[48px] text-[14px] text-[#6b7280] flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FB8C42] text-[#FB8C42]" />
                ))}
              </div>
              <span>Rated {googleRatingValue} on Google · {googleReviewCount} verified reviews</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Transparent Pricing
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] mb-4 leading-[1.1]">
              Malvern House Cleaning Prices
            </h2>
            <p className="text-[16px] text-[#6b7280]">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <ScrollReveal delay={0.1}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
                <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">Standard</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[14px] text-[#6b7280] font-[500]">From </span>
                  <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none">$145</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Up to 3 bed</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All bathrooms</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Eco products included</li>
                </ul>
                <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative z-10">
              <div className="bg-[#0f172a] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-[1.04] border border-[rgba(255,255,255,0.1)]">
                <div className="absolute top-4 right-4 bg-[#fef3c7] text-[#92400e] text-[10px] font-[800] uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Most popular in Malvern
                </div>
                <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[rgba(255,255,255,0.7)] mb-3">Deep</p>
                <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.1)]">
                  <span className="text-[14px] text-[rgba(255,255,255,0.6)] font-[500]">From </span>
                  <span className="text-[40px] font-[800] text-[#ffffff] leading-none">$235</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Full property scope</li>
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Oven & inside cabinets</li>
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Grout & hard-to-reach areas</li>
                </ul>
                <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
                <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">Vacate</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none text-[28px] mt-1 block">From $380</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Bond-back standard</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All rooms & surfaces</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Inspection ready</li>
                </ul>
                <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-[80px]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 11 — FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[100px] px-[32px] flex flex-col items-center text-center overflow-hidden">
        <ScrollReveal>
          <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-[24px]">
            Ready to Book
          </span>
          
          <h2 className="flex flex-col items-center w-full max-w-[1000px] mx-auto">
            <span className="text-[48px] font-[800] text-[#1a1a1a] leading-tight block">
              Book a Cleaner
            </span>
            <span className="text-[24px] font-[400] text-[#9ca3af] tracking-[0.2em] block my-2">
              in
            </span>
            <span 
              className="font-[900] text-transparent text-stroke-2 hover:text-[#1a1a1a] transition-colors duration-400 ease-in-out cursor-default leading-[0.9]"
              style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
            >
              MALVERN
            </span>
          </h2>

          <div className="w-[1px] h-[48px] bg-[#FB8C42] mx-auto my-[24px]" />

          <p className="text-[16px] text-[#6b7280] max-w-[440px] mx-auto mb-[16px] leading-[1.6]">
            Get an instant fixed quote for your Malvern home — period property or contemporary renovation. Book online in under a minute, same cleaner every visit.
          </p>

          <span className="text-[#FB8C42] font-[600] block mb-[32px]">
            15% off your first clean.
          </span>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#booking" className="bg-[#1a1a1a] text-white rounded-full px-[32px] py-[13px] text-[14px] font-[600] hover:bg-[#FB8C42] transition-colors">
              Get an Instant Quote
            </a>
            <a href="tel:0451433786" className="border border-[#e5e7eb] text-[#6b7280] rounded-full px-[32px] py-[13px] text-[14px] font-[600] hover:bg-[#f9fafb] transition-colors">
              Call us: 0451 433 786
            </a>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent mt-[48px] mb-[32px]" />

          <div className="flex flex-wrap justify-center gap-2 max-w-[800px]">
            { [{ name: 'Toorak', isBuilt: true }, { name: 'Glen Iris', isBuilt: true }, { name: 'Armadale', isBuilt: false }, { name: 'Hawthorn', isBuilt: true }, { name: 'South Yarra', isBuilt: true }].map(({ name: suburb, isBuilt }) => (
              isBuilt 
                ? <a 
                key={suburb} 
                href={`/house-cleaning-${suburb.toLowerCase().replace(' ', '-')}`}
                className="group relative px-[16px] py-[6px] text-[12px] font-[500] text-[#6b7280] border border-[#e5e7eb] rounded-full hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors flex items-center overflow-hidden"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">{suburb}</span>
                <ArrowRight className="w-3 h-3 absolute right-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
                : <span 
                key={suburb} 
                
                className="group relative px-[16px] py-[6px] text-[12px] font-[500] text-[#6b7280] border border-[#e5e7eb] rounded-full   transition-colors flex items-center overflow-hidden"
              >
                <span className="transition-transform duration-200 group-">{suburb}</span>
                
              </span>
            )) }
          </div>
        </ScrollReveal>
      </section>

    </>
  );
}
