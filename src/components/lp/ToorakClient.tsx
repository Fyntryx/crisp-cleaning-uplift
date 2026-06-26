"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import FAQ from "@/components/lp/FAQ";

// Example FAQ Data
const faqData = [
  {
    question: "Do you clean heritage and contemporary homes in Toorak?",
    answer: "Yes — both heritage Edwardian and Victorian properties and contemporary architect-designed homes in Toorak are serviced. Product selection is appropriate to each home's specific surface types.",
  },
  {
    question: "How much does house cleaning cost in Toorak?",
    answer: "Pricing is set by your home's actual room count and scope. Toorak's larger properties are quoted accurately for their genuine requirements — not at a standard rate. Get an exact price online.",
  },
  {
    question: "Can I request a consistent cleaner familiar with my home?",
    answer: "Yes. Your cleaner is assigned at the initial booking and returns on every scheduled visit. 97% of recurring clients receive the same cleaner. Familiarity with your home's layout and requirements builds from the second visit onward.",
  },
  {
    question: "How are products selected for premium and heritage surfaces?",
    answer: "Our product kit is curated for surface compatibility across materials common in Toorak properties — original timber, stone, polished concrete, heritage tiles, and premium fittings. No abrasive or high-pH products on sensitive surfaces.",
  },
  {
    question: "What's included in a standard clean for a larger Toorak home?",
    answer: "Kitchen, all bathrooms in scope, floors throughout, formal and informal living areas, all bedrooms, dressing rooms, and laundry. Additional rooms are included within the agreed scope. Your quote confirms exactly what's covered before you commit.",
  },
  {
    question: "Can I start with a deep clean before beginning a regular service?",
    answer: "Yes — a one-off deep clean is available to establish a high baseline standard before beginning recurring visits. Many new Toorak clients use this approach. Get a separate deep clean quote online.",
  }
];

const reviews = [
  {
    text: "Crisp's attention to detail is exceptional. They understand how to handle the original timber and marble surfaces in our home without us needing to supervise or explain.",
    name: "Eleanor W.",
    suburb: "Toorak"
  },
  {
    text: "Having the same cleaner every fortnight makes a significant difference. They know the property perfectly and the standard has remained consistently high since the first visit.",
    name: "Michael R.",
    suburb: "Toorak"
  },
  {
    text: "The fixed room-count pricing is transparent and the cleaning quality is the best we've experienced in Melbourne. Extremely professional service.",
    name: "Sarah T.",
    suburb: "Toorak"
  }
];

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default function ToorakClient() {
  const [activeReview, setActiveReview] = useState(0);

  const nextReview = () => setActiveReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <>
      {/* SECTION 1 — HERO (Architectural Grid V2) */}
      <section className="bg-[#ffffff] min-h-[90vh] flex flex-col border-b border-[#e5e7eb]">
        {/* Top Bar - Very subtle */}
        <div className="w-full border-b border-[#e5e7eb] px-[40px] md:px-[80px] py-[16px] flex justify-between items-center bg-[#fafafa]">
          <div className="text-[11px] text-[#6b7280] tracking-[0.2em] uppercase font-[500] hidden sm:block">
            Melbourne / Premium Service
          </div>
          <div className="text-[11px] text-[#6b7280] tracking-[0.2em] uppercase font-[500] flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
            <span>4.9 ★ Google</span>
            <span className="w-[1px] h-[10px] bg-[#d1d5db]"></span>
            <span>97% Retention</span>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* Left Column (Text) - 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-center px-[40px] md:px-[80px] py-[80px] lg:border-r border-[#e5e7eb] relative">
            
            {/* The Deliberate Orange Moment */}
            <div className="w-[12px] h-[12px] bg-[#d97706] mb-[40px]" />

            <h1 className="text-[64px] md:text-[96px] lg:text-[110px] font-[800] text-[#1a1a1a] leading-[0.9] tracking-[-0.04em] mb-[40px]">
              <span className="block text-[#9ca3af] text-[16px] md:text-[20px] tracking-[0.3em] font-[500] uppercase mb-[24px] ml-[4px]">
                House Cleaning
              </span>
              TOORAK
            </h1>
            
            <p className="text-[16px] text-[#4b5563] leading-[1.9] max-w-[500px] mb-[48px] font-[400]">
              Toorak's residential streets represent Melbourne's most demanding cleaning market. Silent luxury, absolute precision, and the exact same cleaner every single visit.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-[32px]">
              <a href="/#booking" className="group relative bg-[#1a1a1a] text-[#ffffff] px-[40px] py-[18px] text-[13px] font-[600] tracking-[0.1em] uppercase overflow-hidden hover:bg-[#d97706] transition-colors duration-500 inline-flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-3">
                  Exact Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a href="#included" className="text-[13px] text-[#1a1a1a] font-[600] tracking-[0.1em] uppercase border-b border-[#1a1a1a] pb-1 hover:text-[#d97706] hover:border-[#d97706] transition-colors inline-block w-fit">
                View Scope
              </a>
            </div>
          </div>

          {/* Right Column (Image + Stats) - 5 cols */}
          <div className="lg:col-span-5 flex flex-col relative min-h-[500px] lg:h-auto">
            {/* Image Box */}
            <div className="flex-1 relative bg-[#f3f4f6] overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale mix-blend-multiply opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                style={{ backgroundImage: "url('/images/housecleaning-Toorak.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.2)] to-transparent" />
            </div>
            
            {/* Stats Box (Bottom right) */}
            <div className="grid grid-cols-2 bg-[#1a1a1a] text-[#ffffff] border-t border-[#333]">
              <div className="p-[32px] md:p-[48px] border-r border-[#333]">
                <div className="text-[32px] md:text-[48px] font-[400] leading-none mb-2">97<span className="text-[20px] text-[#d97706]">%</span></div>
                <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.1em] uppercase">Same Cleaner</div>
              </div>
              <div className="p-[32px] md:p-[48px]">
                <div className="text-[32px] md:text-[48px] font-[400] leading-none mb-2">72<span className="text-[20px] text-[#d97706]">h</span></div>
                <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.1em] uppercase">Guarantee</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — PROPERTY TYPES */}
      <section className="bg-[#ffffff] py-[100px] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.2em] uppercase text-center mb-[16px]">
            TOORAK · PROPERTY TYPES
          </div>
          <h2 className="text-[44px] font-[700] text-[#1a1a1a] text-center max-w-[600px] mx-auto mb-[16px] leading-[1.1]">
            Premium Home Cleaning Across Toorak
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] text-center max-w-[640px] mx-auto mb-[64px]">
            Toorak's housing market has no direct equivalent in Melbourne — the suburb 
            contains some of the largest, most ornate, and most meticulously maintained 
            private residential properties in the country. Cleaning at this level isn't 
            about speed or price; it's about precision, surface knowledge, and the kind 
            of cleaner-client relationship that develops when the same professional 
            returns repeatedly to the same home.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#e5e7eb]">
            <div className="bg-[#ffffff] p-[48px_36px] hover:bg-[#fafafa] transition-colors duration-200">
              <div className="text-[11px] font-[700] text-[#9ca3af] tracking-[0.15em] mb-[20px]">01</div>
              <h3 className="text-[20px] font-[700] text-[#1a1a1a] leading-[1.3] mb-[16px]">
                Heritage and Edwardian Homes Near Toorak Village
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.8]">
                The streets within walking distance of Toorak Village — the suburb's 
                commercial centre on Toorak Road — contain some of Melbourne's finest 
                Edwardian and Victorian-era private residences. Multiple formal reception 
                rooms, original decorative ceilings, polished timber throughout, heritage 
                fireplaces, and ornamental fittings define these properties. Crisp's 
                product selection is specifically chosen for compatibility with period 
                surfaces; damage to original finishes in a Toorak home is unacceptable 
                and our product kit is built around preventing it.
              </p>
              <div className="text-[11px] text-[#9ca3af] mt-[24px]">
                Toorak Village · Heritage Surfaces
              </div>
            </div>

            <div className="bg-[#ffffff] p-[48px_36px] hover:bg-[#fafafa] transition-colors duration-200">
              <div className="text-[11px] font-[700] text-[#9ca3af] tracking-[0.15em] mb-[20px]">02</div>
              <h3 className="text-[20px] font-[700] text-[#1a1a1a] leading-[1.3] mb-[16px]">
                Contemporary and Architect-Designed Properties
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.8]">
                Toorak's newer properties — contemporary architect-designed homes and 
                significant renovations — present a different surface profile to the 
                suburb's heritage stock. Polished concrete, Italian stone benchtops, 
                feature-tiled bathrooms, bespoke joinery, and expansive glass require 
                an approach as precise on modern materials as on period ones. Our scope 
                and product selection adjusts to the specific surfaces in each property.
              </p>
              <div className="text-[11px] text-[#9ca3af] mt-[24px]">
                Contemporary · Architect-Designed
              </div>
            </div>

            <div className="bg-[#ffffff] p-[48px_36px] hover:bg-[#fafafa] transition-colors duration-200">
              <div className="text-[11px] font-[700] text-[#9ca3af] tracking-[0.15em] mb-[20px]">03</div>
              <h3 className="text-[20px] font-[700] text-[#1a1a1a] leading-[1.3] mb-[16px]">
                Larger Multi-Room Homes on Toorak's Private Tree-Lined Streets
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.8]">
                The largest residential properties in Toorak — often six to nine rooms 
                across multiple levels, with formal and informal living zones, multiple 
                bathrooms, and ancillary spaces including home offices and entertaining 
                rooms — require careful scope management at booking. Pricing is based on 
                the rooms included in the agreed scope; the cost reflects the actual work 
                required, not a rough estimate for a home that wasn't properly accounted for.
              </p>
              <div className="text-[11px] text-[#9ca3af] mt-[24px]">
                Orrong Road · Fawkner Park Fringe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT'S INCLUDED */}
      <section id="included" className="bg-[#f9fafb] py-[100px] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.2em] uppercase text-center mb-[16px]">
            SCOPE & CHECKLIST
          </div>
          <h2 className="text-[44px] font-[700] text-[#1a1a1a] text-center max-w-[560px] mx-auto mb-[16px] leading-[1.1]">
            What Every Toorak Clean Includes
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] text-center max-w-[600px] mx-auto mb-[64px]">
            Every Toorak clean is delivered against a fixed, documented scope. At this 
            property tier, the checklist isn't a formality — it's the mechanism that 
            produces a consistent result across a home where inconsistency is 
            immediately noticeable.
          </p>

          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] py-[56px] border-b border-[#e5e7eb] max-w-[1100px] mx-auto items-center">
              <div>
                <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.15em] uppercase mb-[16px]">
                  Kitchen & Bathroom Detailing
                </div>
                <h3 className="text-[24px] font-[700] text-[#1a1a1a] mb-[16px]">
                  Kitchen and Bathroom Detailing to a Premium Standard
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Kitchen surfaces — stone benchtops, premium appliance exteriors, rangehood, 
                  splashback, sink, and cabinetry exteriors — are cleaned and wiped to a 
                  premium finish on every visit. All bathrooms within scope, including 
                  ensuites, family bathrooms, and powder rooms, are sanitised, scrubbed, and 
                  polished. Frameless screens, stone surrounds, and feature tiles are handled 
                  with products appropriate to their specific material.
                </p>
              </div>
              <div className="border-l border-[#e5e7eb] pl-[40px]">
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Stone benchtops & appliance surfaces</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">All bathrooms including ensuites</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Powder rooms & family bathrooms</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Frameless screens & feature tiles</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Rangehood, splashback & sink</div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] py-[56px] border-b border-[#e5e7eb] max-w-[1100px] mx-auto items-center">
              <div className="order-2 md:order-1 border-l border-[#e5e7eb] pl-[40px]">
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Low-moisture mop on polished timber</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Formal reception rooms & libraries</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Mirrors, glass & accessible shelving</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Polished concrete & natural stone</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Sitting rooms & dining areas</div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-[24px] font-[700] text-[#1a1a1a] mb-[16px]">
                  Polished Floors, Formal Living Areas and Feature Surfaces
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Timber floors are swept and mopped with low-moisture products appropriate 
                  for polished and heritage-grade boards. Formal reception rooms, sitting 
                  rooms, and libraries receive the same level of attention as everyday living 
                  spaces — surfaces dusted, mirrors and glass polished, accessible shelf areas 
                  addressed. Feature surfaces, including polished concrete and premium natural 
                  stone, are cleaned with material-appropriate products.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] py-[56px] border-b border-[#e5e7eb] max-w-[1100px] mx-auto items-center">
              <div>
                <h3 className="text-[24px] font-[700] text-[#1a1a1a] mb-[16px]">
                  Bedrooms, Dressing Rooms and Secondary Living Spaces
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room 
                  presented. Dressing rooms — standard in many Toorak homes — are included 
                  within the agreed scope as a defined room. Secondary living spaces, home 
                  offices, media rooms, and any additional rooms in the booking are treated 
                  with the same systematic attention as primary rooms throughout.
                </p>
              </div>
              <div className="border-l border-[#e5e7eb] pl-[40px]">
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">All bedrooms vacuumed & presented</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Dressing rooms as defined rooms</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Home offices & media rooms</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Laundry included as standard</div>
                <div className="text-[15px] text-[#1a1a1a] py-[14px] border-b border-[#f3f4f6] font-[500]">Secondary living spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LARGE TYPOGRAPHIC STAT ROW */}
      <section className="bg-[#ffffff] py-[80px] border-t border-b border-[#e5e7eb]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#e5e7eb]">
            <div className="p-[48px_32px] flex flex-col items-center justify-center text-center">
              <div className="text-[56px] font-[900] text-[#1a1a1a] tracking-[-0.03em] leading-none">97%</div>
              <div className="text-[13px] text-[#6b7280] mt-[8px]">Same cleaner</div>
              <div className="text-[13px] text-[#9ca3af]">every visit</div>
            </div>
            <div className="p-[48px_32px] flex flex-col items-center justify-center text-center">
              <div className="text-[56px] font-[900] text-[#1a1a1a] tracking-[-0.03em] leading-none">100%</div>
              <div className="text-[13px] text-[#6b7280] mt-[8px]">Eco-friendly</div>
              <div className="text-[13px] text-[#9ca3af]">products</div>
            </div>
            <div className="p-[48px_32px] flex flex-col items-center justify-center text-center">
              <div className="text-[56px] font-[900] text-[#1a1a1a] tracking-[-0.03em] leading-none">72hr</div>
              <div className="text-[13px] text-[#6b7280] mt-[8px]">Re-clean</div>
              <div className="text-[13px] text-[#9ca3af]">guarantee</div>
            </div>
            <div className="p-[48px_32px] flex flex-col items-center justify-center text-center">
              <div className="text-[56px] font-[900] text-[#1a1a1a] tracking-[-0.03em] leading-none">Fixed</div>
              <div className="text-[13px] text-[#6b7280] mt-[8px]">Pricing</div>
              <div className="text-[13px] text-[#9ca3af]">always</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP */}
      <section className="bg-[#ffffff] py-[100px] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.2em] uppercase mb-[16px]">
            THE CRISP DIFFERENCE
          </div>
          <h2 className="text-[44px] font-[700] text-[#1a1a1a] max-w-[560px] leading-[1.1] mb-[24px]">
            Why Toorak Homeowners Choose Crisp
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[600px] mb-[64px]">
            Toorak's cleaning keyword carries a high competition index at a meaningful 
            search volume. The market is contested and the expected service standard is 
            the highest of any suburb in the portfolio. Crisp's advantage in Toorak is 
            operational — not a promotional headline.
          </p>

          <div className="max-w-[800px] mx-auto flex flex-col">
            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-[20px] md:gap-[32px] py-[48px] border-b border-[#e5e7eb]">
              <div className="text-[48px] md:text-[72px] font-[900] text-[#f3f4f6] leading-none select-none">01</div>
              <div>
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-[12px] leading-[1.3]">
                  Same Cleaner Every Visit — Discretion and Consistency as Standard
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Your Toorak cleaner is assigned at the first booking and returns on every 
                  scheduled visit. At a property level where familiarity with your home's 
                  specific requirements, access arrangements, and preferences matters 
                  significantly, the same professional every time isn't optional — it's a 
                  baseline requirement. Our 97% same-cleaner continuity rate is the 
                  operational commitment that makes this consistent rather than aspirational.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-[20px] md:gap-[32px] py-[48px] border-b border-[#e5e7eb]">
              <div className="text-[48px] md:text-[72px] font-[900] text-[#f3f4f6] leading-none select-none">02</div>
              <div>
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-[12px] leading-[1.3]">
                  Fixed Pricing for Larger, More Complex Home Configurations
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  A six-room Toorak home with three bathrooms and two formal reception rooms 
                  requires a pricing model that accounts for its genuine scope. Our fixed, 
                  room-count pricing provides an accurate, confirmed cost before any cleaner 
                  arrives — not a per-hour estimate that grows as the home turns out to be 
                  larger or more detailed than assumed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-[20px] md:gap-[32px] py-[48px] border-b border-[#e5e7eb]">
              <div className="text-[48px] md:text-[72px] font-[900] text-[#f3f4f6] leading-none select-none">03</div>
              <div>
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-[12px] leading-[1.3]">
                  Eco-Friendly Products Selected for Premium and Heritage Surfaces
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Premium and heritage surfaces in Toorak properties — polished concrete, 
                  Italian stone, original timber, heritage tiles, and bespoke joinery — are 
                  sensitive to inappropriate product choices. Our eco-friendly product kit is 
                  curated for surface compatibility across all material types common in this 
                  suburb, cleaning effectively without compromising the surfaces through 
                  repeated inappropriate treatment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-[20px] md:gap-[32px] py-[48px]">
              <div className="text-[48px] md:text-[72px] font-[900] text-[#f3f4f6] leading-none select-none">04</div>
              <div>
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-[12px] leading-[1.3]">
                  Satisfaction Guarantee on Every Clean
                </h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                  Every Crisp clean carries a 72-hour re-clean guarantee — if anything 
                  doesn't meet your standard, we return to address it at no additional charge. 
                  At a premium property level, this guarantee is the minimum expression of 
                  what the service standard should be. Crisp stands behind it from the first 
                  visit and across every subsequent booking without exception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PRICING */}
      <section className="bg-[#f9fafb] py-[100px] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.2em] uppercase block mb-3">
              TRANSPARENT PRICING
            </div>
            <h2 className="text-[32px] md:text-[44px] font-[700] text-[#1a1a1a] mb-4 leading-[1.1]">
              Toorak House Cleaning Prices
            </h2>
            <p className="text-[16px] text-[#6b7280] max-w-[600px] mx-auto">
              Fixed pricing based on your home's actual room count. Confirmed before any 
              cleaner arrives. No hourly estimates, no surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">Regular clean</p>
              <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                <span className="text-[14px] text-[#6b7280] font-[500]">From </span>
                <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none">$180</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Up to 3 bed
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> All bathrooms
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Eco products included
                </li>
              </ul>
            </div>

            <div className="bg-[#ffffff] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-100 md:scale-[1.04] border border-[#e5e7eb] relative z-10">
              <div className="absolute top-4 right-4 bg-[#f3f4f6] text-[#374151] text-[10px] font-[800] uppercase tracking-wider px-3 py-1.5 rounded-full">
                Most popular in Toorak
              </div>
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#1a1a1a] mb-3">Deep clean</p>
              <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                <span className="text-[14px] text-[#6b7280] font-[500]">From </span>
                <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none">$320</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Full property scope
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Oven & inside cabinets
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Grout & hard-to-reach areas
                </li>
              </ul>
            </div>

            <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">End of lease</p>
              <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none text-[28px] mt-1 block">Fixed quote</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Bond-back standard
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> All rooms & surfaces
                </li>
                <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]">
                  <span className="text-[#1a1a1a] font-bold">✓</span> Inspection ready
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TESTIMONIALS */}
      <section className="bg-[#ffffff] py-[100px] border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6">
          <div className="text-[11px] font-[600] text-[#9ca3af] tracking-[0.2em] uppercase text-center mb-[16px]">
            CLIENT STORIES
          </div>
          <h2 className="text-[44px] font-[700] text-[#1a1a1a] text-center max-w-[600px] mx-auto leading-[1.1]">
            What Toorak Homeowners Say
          </h2>
          
          <div className="max-w-[760px] mx-auto mt-[48px] text-center relative">
            <div className="text-[100px] text-[#f3f4f6] leading-[0.8] font-serif mb-[24px]">"</div>
            <div className="h-[200px] md:h-[160px] relative flex justify-center w-full">
              {reviews.map((review, i) => (
                <div 
                  key={i} 
                  className={`absolute w-full transition-opacity duration-300 ease-in-out ${i === activeReview ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <p className="text-[20px] md:text-[22px] font-[400] text-[#1a1a1a] leading-[1.7] italic">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-[16px] flex flex-col items-center">
              <div className="text-[15px] font-[600] text-[#1a1a1a] mb-[8px]">
                {reviews[activeReview].name}, {reviews[activeReview].suburb}
              </div>
              <div className="flex gap-[4px] mb-[32px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-[16px] h-[16px] fill-[#d97706] text-[#d97706]" />
                ))}
              </div>
              
              <div className="flex gap-[12px] justify-center mb-[40px]">
                <button 
                  onClick={prevReview}
                  className="w-[44px] h-[44px] rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                  aria-label="Previous review"
                >
                  <ArrowRight className="w-[16px] h-[16px] rotate-180" />
                </button>
                <button 
                  onClick={nextReview}
                  className="w-[44px] h-[44px] rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
                  aria-label="Next review"
                >
                  <ArrowRight className="w-[16px] h-[16px]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-[8px] text-[14px] text-[#6b7280]">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[14px] h-[14px] fill-[#d97706] text-[#d97706]" />
                  ))}
                </div>
                Rated 4.9 on Google
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-[#f9fafb] py-[100px] border-t border-[#e5e7eb]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-[#1a1a1a] py-[100px] px-[32px] text-center text-[#ffffff]">
        <div className="container mx-auto max-w-[800px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[24px]">
            READY TO BOOK
          </div>
          <h2 className="text-[40px] md:text-[56px] font-[800] text-[#ffffff] leading-[1.05] mb-[16px]">
            Book a Cleaner in Toorak
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.6)] max-w-[460px] mx-auto mb-[12px] leading-[1.6]">
            Book a Toorak house cleaner — same professional every visit, fixed pricing 
            for your home's actual scope, 72-hour guarantee on every clean.
          </p>
          <div className="text-[#d97706] font-[600] mb-[36px]">
            15% off your first clean.
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-[12px]">
            <a href="/#booking" className="bg-[#d97706] text-[#ffffff] rounded-full px-[36px] py-[15px] text-[15px] font-[600] shadow-[0_8px_28px_rgba(217,119,6,0.20)] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
              Get an Instant Quote
            </a>
            <a href="tel:0451423786" className="border border-[rgba(255,255,255,0.2)] text-[#ffffff] bg-transparent rounded-full px-[36px] py-[15px] text-[15px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              Call us: 0451 423 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-[#d97706] mx-auto mt-[48px] mb-[28px]" />

          <div className="text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.15em] mb-[14px]">
            NEARBY AREAS WE ALSO SERVICE
          </div>
          <div className="flex flex-wrap justify-center gap-[8px]">
            {['South Yarra', 'Malvern', 'Hawthorn', 'Armadale', 'Glen Iris'].map((suburb) => (
              <a 
                key={suburb} 
                href={`/house-cleaning-${suburb.toLowerCase().replace(' ', '-')}`}
                className="group relative px-[16px] py-[6px] text-[12px] font-[500] text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full hover:border-[#d97706] hover:text-[#d97706] transition-colors flex items-center overflow-hidden"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">{suburb}</span>
                <ArrowRight className="w-3 h-3 absolute right-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
