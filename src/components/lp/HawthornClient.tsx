"use client";

import React from "react";
import {
  ChevronDown,
  ArrowRight,
  Star,
  CheckCircle2,
  Building,
  Home,
  MapPin,
  Users,
  UtensilsCrossed,
  Bath,
  Layers,
  Bed
} from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";

const faqData = [
  {
    question: "Do you clean share houses and rental properties in Hawthorn?",
    answer: "Yes - share houses and rentals are central to Hawthorn's residential profile. Fixed pricing per property, same cleaner, and property manager or landlord bookings all welcome."
  },
  {
    question: "How much does house cleaning cost in Hawthorn?",
    answer: "Pricing depends on property type and room count. A single-bedroom terrace and a four-bedroom share house are priced differently. Get an exact quote online in under a minute."
  },
  {
    question: "Can multiple tenants from one property share a booking?",
    answer: "Yes - one booking covers the whole property. Any occupant can manage the account; access arrangements are confirmed per property, not per individual tenant."
  },
  {
    question: "Do you service East Hawthorn and Hawthorn West as well?",
    answer: "Yes - our Hawthorn coverage includes East Hawthorn and Hawthorn West, as well as the full Sydney Road corridor from North Melbourne through to the Coburg boundary."
  },
  {
    question: "Are your products safe on period terrace surfaces?",
    answer: "Yes. We use products appropriate for original timber floors, heritage tiles, and period-era fittings. No abrasive or high-pH products on original surfaces."
  },
  {
    question: "What's the difference between a standard clean and a deep clean?",
    answer: "A standard clean covers maintenance - surfaces, floors, bathrooms, kitchen, bedrooms. A deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price."
  }
];

export default function HawthornClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .brunswick-word {
          overflow: hidden;
        }
        .brunswick-word span {
          display: block;
          opacity: 0;
          animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.1s;
        }
        
        .faq-brunswick-override .group[open] > summary > div {
          border-left-color: #d97706 !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .brunswick-word span {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}} />

      {/* SECTION 1 — HERO */}
      <section className="bg-[#F5F0E8] min-h-[88vh] relative overflow-hidden flex flex-col justify-center">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none z-0 mix-blend-overlay" />
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[24px] md:px-[48px] pt-[80px] pb-[60px] flex-grow flex flex-col justify-center">
          
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-[48px]">
            <div className="text-[12px] text-[#9ca3af]">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "House Cleaning Hawthorn", href: "/house-cleaning-brunswick" },
                ]}
              />
            </div>
            <div className="inline-block bg-[rgba(193,123,62,0.12)] border border-[rgba(193,123,62,0.3)] text-[#C17B3E] text-[11px] font-[600] tracking-[0.12em] uppercase rounded-[99px] px-[16px] py-[6px]">
              ● Sydney Road · Hawthorn · Inner North
            </div>
          </div>

          {/* Row 1 */}
          <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-[-8px] gap-1 md:gap-0">
            <div className="text-[18px] font-[400] text-[#9ca3af] tracking-[0.2em] uppercase">
              House Cleaning
            </div>
            <div className="text-[18px] font-[400] text-[#9ca3af] tracking-[0.2em] uppercase text-left md:text-right">
              Melbourne
            </div>
          </div>

          {/* Row 2 — The Headline */}
          <h1 className="brunswick-word text-[clamp(64px,13vw,172px)] font-[900] text-[#1C1C1C] leading-[0.9] tracking-[-0.04em] block w-full text-left">
            <span>BRUNSWICK</span>
          </h1>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row justify-between items-start mt-[24px] gap-[32px]">
            <div className="max-w-[480px]">
              <p className="text-[16px] text-[#6b7280] leading-[1.7]">
                Sydney Road terraces. Share houses.<br />
                Rental apartments. Same cleaner.<br />
                Fixed pricing.
              </p>
            </div>
            
            <div className="w-full md:w-auto text-left md:text-right flex flex-col items-start md:items-end">
              <a href="/#booking" className="inline-block bg-[#d97706] text-white rounded-[99px] px-[28px] py-[14px] text-[15px] font-[600] w-full md:w-auto text-center hover:bg-[#b45309] transition-colors">
                Get an Instant Quote →
              </a>
              <a href="#included" className="inline-block border-[1.5px] border-[#E0D8CC] text-[#6b7280] rounded-[99px] px-[28px] py-[14px] text-[15px] font-[600] w-full md:w-auto text-center mt-[8px] hover:bg-white transition-colors">
                See what's included
              </a>
              <div className="text-[12px] text-[#9ca3af] mt-[8px] w-full text-center md:text-right">
                15% off your first clean.
              </div>
            </div>
          </div>

          {/* Trust pills */}
          <div className="mt-[48px] flex justify-center flex-wrap gap-[8px]">
            {['4.9 ★ Google', '97% Same Cleaner', 'Eco-Friendly', '72hr Guarantee'].map(pill => (
              <span key={pill} className="bg-[rgba(255,255,255,0.7)] border border-[#E0D8CC] rounded-[99px] px-[16px] py-[6px] text-[12px] text-[#374151]">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom terracotta line */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#C17B3E]" />
      </section>

      {/* SECTION 2 — PROOF STRIP */}
      <section className="bg-[#1C1C1C] py-[20px] px-[24px]">
        <div className="max-w-[1200px] mx-auto flex justify-center gap-[16px] md:gap-[48px] flex-wrap items-center">
          <div className="text-[13px] text-[rgba(255,255,255,0.5)] tracking-[0.08em]">
            <span className="text-[#d97706] font-[700]">4.9★</span> Google
          </div>
          <div className="text-[#C17B3E] font-[900]">·</div>
          <div className="text-[13px] text-[rgba(255,255,255,0.5)] tracking-[0.08em]">
            <span className="text-[#d97706] font-[700]">97%</span> Same Cleaner
          </div>
          <div className="text-[#C17B3E] font-[900]">·</div>
          <div className="text-[13px] text-[rgba(255,255,255,0.5)] tracking-[0.08em]">
            <span className="text-[#d97706] font-[700]">100%</span> Eco-Friendly
          </div>
          <div className="text-[#C17B3E] font-[900]">·</div>
          <div className="text-[13px] text-[rgba(255,255,255,0.5)] tracking-[0.08em]">
            <span className="text-[#d97706] font-[700]">72hr</span> Guarantee
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROPERTY TYPES */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[48px]">
          <div className="text-[11px] font-[600] text-[#C17B3E] tracking-[0.2em] uppercase mb-[12px]">
            Hawthorn's Housing Stock
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1C1C1C] max-w-[660px] leading-[1.2] mb-[16px]">
            Hawthorn's Terraces, Share Houses and Rentals - Cleaned Properly
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[660px]">
            Hawthorn's housing isn't dominated by any single property type - Victorian and Edwardian terraces near Sydney Road sit alongside brick-veneer homes on quieter streets, share houses in converted larger properties, and apartments near the Jewell and Anstey station precincts. Each has a distinct cleaning profile. Fixed, scope-specific pricing handles all of them without a separate quote for each configuration.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] mt-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E0D8CC] rounded-[20px] overflow-hidden">
            
            {/* Card 1 */}
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#E0D8CC] hover:bg-[#fafafa] transition-colors duration-200">
              <div className="h-[8px] w-full bg-[#C17B3E]" />
              <div className="p-[36px_32px] flex-grow flex flex-col">
                <Home className="text-[#C17B3E] w-[20px] h-[20px] mb-[16px]" />
                <div className="inline-block bg-[rgba(193,123,62,0.1)] border border-[rgba(193,123,62,0.2)] text-[#C17B3E] rounded-[99px] px-[10px] py-[4px] text-[11px] font-[600] mb-[14px] self-start">
                  Sydney Road · Heritage
                </div>
                <h3 className="text-[18px] font-[700] text-[#1C1C1C] leading-[1.3] mb-[12px]">
                  Victorian and Edwardian Terraces Near Sydney Road
                </h3>
                <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                  The terrace streets running east and west of Sydney Road are the defining residential fabric of Hawthorn - narrow single and double-fronted Victorian and Edwardian terraces with original timber floors, compact kitchens, and often a rear extension adding a second living space. Our cleaners are experienced with these layouts: the scope accounts for both the original heritage shell and any modern additions without requiring a separate quote for the rear extension.
                </p>
                <div className="mt-[20px] flex flex-wrap gap-[6px]">
                  {['Original timber floors', 'Heritage shell', 'Rear extensions', 'Period surfaces'].map(tag => (
                    <span key={tag} className="bg-[#F5F0E8] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#E0D8CC] hover:bg-[#fafafa] transition-colors duration-200">
              <div className="h-[8px] w-full bg-[#1C1C1C]" />
              <div className="p-[36px_32px] flex-grow flex flex-col">
                <Users className="text-[#d97706] w-[20px] h-[20px] mb-[16px]" />
                <div className="inline-block bg-[rgba(217,119,6,0.1)] border border-[rgba(217,119,6,0.2)] text-[#d97706] rounded-[99px] px-[10px] py-[4px] text-[11px] font-[600] mb-[14px] self-start">
                  Share Houses · Rentals
                </div>
                <h3 className="text-[18px] font-[700] text-[#1C1C1C] leading-[1.3] mb-[12px]">
                  Share Houses and Multi-Room Rental Properties
                </h3>
                <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                  Hawthorn has one of Melbourne's highest share-house concentrations - proximity to universities, RMIT, and the CBD combined with relatively affordable rental stock makes it a natural share-house suburb. Our per-property, fixed pricing applies regardless of occupant count, without the punitive hourly surcharges that traditional cleaning services often apply to multi-tenant bookings. Common areas - kitchens, bathrooms, living rooms, hallways - accumulate markedly faster in shared housing and receive appropriate attention within the standard scope.
                </p>
                <div className="mt-[20px] flex flex-wrap gap-[6px]">
                  {['Per-property pricing', 'Common areas', 'Any occupant count', 'RMIT precinct'].map(tag => (
                    <span key={tag} className="bg-[#F5F0E8] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col hover:bg-[#fafafa] transition-colors duration-200">
              <div className="h-[8px] w-full bg-[#d97706]" />
              <div className="p-[36px_32px] flex-grow flex flex-col">
                <Building className="text-[#d97706] w-[20px] h-[20px] mb-[16px]" />
                <div className="inline-block bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-[99px] px-[10px] py-[4px] text-[11px] font-[600] mb-[14px] self-start">
                  Jewell · Anstey · Apartments
                </div>
                <h3 className="text-[18px] font-[700] text-[#1C1C1C] leading-[1.3] mb-[12px]">
                  Apartments and Units Near the Jewell and Anstey Station Precincts
                </h3>
                <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                  The Jewell and Anstey station areas on Sydney Road have seen progressive apartment development over the past decade, adding a newer residential profile to Hawthorn's existing terrace stock. These apartments - open-plan, stone benchtops, modern bathrooms - are handled within the same fixed-pricing framework as the surrounding terrace properties, with pricing reflecting their actual room count rather than a blanket inner-north rate, and building access logistics coordinated directly with the cleaner before arrival.
                </p>
                <div className="mt-[20px] flex flex-wrap gap-[6px]">
                  {['Stone benchtops', 'Open-plan', 'Fixed pricing', 'Inner-north rate'].map(tag => (
                    <span key={tag} className="bg-[#F5F0E8] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED */}
      <section id="included" className="bg-[#F5F0E8] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-[48px] md:gap-[80px] items-start">
          
          {/* Left Column (Sticky) */}
          <div className="md:sticky md:top-[40px]">
            <div className="text-[11px] font-[600] text-[#C17B3E] tracking-[0.2em] uppercase mb-[12px]">
              Scope & Checklist
            </div>
            <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1C1C1C] leading-[1.1]">
              What's Included in Every Hawthorn Clean
            </h2>
            <p className="text-[15px] text-[#6b7280] leading-[1.8] mt-[16px]">
              Every Hawthorn clean covers the same documented scope regardless of property type - kitchen, all bathrooms, floors throughout, bedrooms, and living areas. Room count determines the price. The scope is agreed before the cleaner arrives so there's no ambiguity about what's included on the day.
            </p>
            <div className="hidden md:block w-[36px] h-[2px] bg-[#C17B3E] mt-[24px]" />
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col">
            
            {/* Item 1 */}
            <div className="py-[28px] border-b border-[#E0D8CC] first:pt-0">
              <div className="flex items-center gap-[12px] mb-[10px]">
                <div className="bg-[rgba(217,119,6,0.1)] rounded-[8px] w-[36px] h-[36px] flex items-center justify-center">
                  <UtensilsCrossed className="text-[#d97706] w-[18px] h-[18px]" />
                </div>
                <h3 className="text-[17px] font-[700] text-[#1C1C1C]">Kitchen Sanitisation and Appliance Surfaces</h3>
              </div>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Kitchen surfaces, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned to a hygienic standard on every visit. Hawthorn's terrace kitchens are often compact and high-traffic - particularly in share houses - and accumulate cooking residue faster than a single-occupant kitchen. The same thorough scope applies regardless of occupancy volume or kitchen size.
              </p>
              <div className="mt-[14px] flex flex-wrap gap-[6px]">
                {['Stovetop & rangehood', 'Share house kitchens', 'Splashback & sink', 'Appliance surfaces'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.8)] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Item 2 */}
            <div className="py-[28px] border-b border-[#E0D8CC]">
              <div className="flex items-center gap-[12px] mb-[10px]">
                <div className="bg-[rgba(217,119,6,0.1)] rounded-[8px] w-[36px] h-[36px] flex items-center justify-center">
                  <Bath className="text-[#d97706] w-[18px] h-[18px]" />
                </div>
                <h3 className="text-[17px] font-[700] text-[#1C1C1C]">Bathroom Cleaning and Tile Scrubbing</h3>
              </div>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                All bathrooms are sanitised, scrubbed, and polished on every visit - shower or bath recess, toilet including base and behind, basin, mirror, tapware, and tiled floors. For Hawthorn's older terrace properties with original hexagonal floor tiles and heritage fittings, appropriate products are used that clean effectively without stripping original tile surfaces or altering period-era grout.
              </p>
              <div className="mt-[14px] flex flex-wrap gap-[6px]">
                {['Heritage tiles', 'Toilet base to cistern', 'Tapware polished', 'Period-era grout'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.8)] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Item 3 */}
            <div className="py-[28px] border-b border-[#E0D8CC]">
              <div className="flex items-center gap-[12px] mb-[10px]">
                <div className="bg-[rgba(217,119,6,0.1)] rounded-[8px] w-[36px] h-[36px] flex items-center justify-center">
                  <Layers className="text-[#d97706] w-[18px] h-[18px]" />
                </div>
                <h3 className="text-[17px] font-[700] text-[#1C1C1C]">Hard Floors, Surfaces and Common Areas</h3>
              </div>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Timber, tile, and vinyl floors are swept and mopped throughout. Particular care is taken with original Baltic pine floorboards common in Hawthorn's unrenovated terraces, using only low-moisture methods. All surfaces, skirting boards, door handles, and window sills are dusted and wiped. For share houses, common areas - hallways, stairwells, shared living rooms - receive the same systematic attention as individual rooms, which is where Hawthorn's high-traffic rental properties accumulate most visibly between cleans.
              </p>
              <div className="mt-[14px] flex flex-wrap gap-[6px]">
                {['Common areas', 'Hallways & stairwells', 'Skirting boards', 'All floor types'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.8)] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Item 4 */}
            <div className="py-[28px]">
              <div className="flex items-center gap-[12px] mb-[10px]">
                <div className="bg-[rgba(217,119,6,0.1)] rounded-[8px] w-[36px] h-[36px] flex items-center justify-center">
                  <Bed className="text-[#d97706] w-[18px] h-[18px]" />
                </div>
                <h3 className="text-[17px] font-[700] text-[#1C1C1C]">Bedrooms and Living Areas</h3>
              </div>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left to a presented standard. Living and dining areas receive the same treatment. For Hawthorn's terrace properties with an open living arrangement extending through to a rear addition, the scope covers the full connected space within the confirmed room count.
              </p>
              <div className="mt-[14px] flex flex-wrap gap-[6px]">
                {['All bedrooms', 'Rear extensions covered', 'Living & dining', 'Open-plan layouts'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.8)] border border-[#E0D8CC] rounded-[99px] px-[10px] py-[4px] text-[11px] text-[#6b7280]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP */}
      <section className="bg-[#1C1C1C] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[48px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">
            The Crisp Difference
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#ffffff] leading-[1.1]">
            Why Hawthorn Residents Choose Crisp
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.45)] leading-[1.8] max-w-[560px] mt-[12px]">
            Hawthorn's house cleaning keyword sits at a high competition index - the suburb's density and search volume make it one of the more contested markets in the inner north. Crisp's operational advantage is consistent regardless of competitive intensity: fixed pricing, a documented scope, and the same cleaner returning every time.
          </p>
        </div>

        {/* Statement Strip */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] mb-[48px]">
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-[24px_32px]">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-[16px] gap-y-[8px] text-[14px] text-[rgba(255,255,255,0.6)] font-[500] line-height-[1.8]">
              <span>Same cleaner every visit</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>Fixed pricing</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>No hourly rate</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>Property managers welcome</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>97% continuity</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>Instant quote</span>
              <span className="text-[#C17B3E] font-[900]">·</span>
              <span>15% off first clean</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px]">
            
            {/* Card 1 */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] border-t-[3px] border-t-[#d97706] rounded-[16px] p-[28px_24px] hover:bg-[rgba(255,255,255,0.07)] transition-colors duration-200">
              <div className="text-[32px] font-[900] text-[#d97706] leading-none mb-[4px]">97%</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em]">same-cleaner rate</div>
              <h3 className="text-[15px] font-[700] text-[#ffffff] mt-[12px] mb-[8px]">Same Cleaner Every Visit - Even Across Share Houses and Rentals</h3>
              <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.6]">
                Your cleaner is assigned to the property from the first booking. For share houses where occupants change over time, the assigned cleaner maintains consistency with the property even as the tenancy does not - they know the home, not just the current residents. Our 97% same-cleaner rate applies to all Hawthorn property types.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] border-t-[3px] border-t-[#C17B3E] rounded-[16px] p-[28px_24px] hover:bg-[rgba(255,255,255,0.07)] transition-colors duration-200">
              <div className="text-[32px] font-[900] text-[#d97706] leading-none mb-[4px]">Fixed</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em]">pricing always</div>
              <h3 className="text-[15px] font-[700] text-[#ffffff] mt-[12px] mb-[8px]">Fixed Pricing for Terraces, Houses and Apartments - No Hourly Rate</h3>
              <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.6]">
                Whether it's a single-fronted terrace on one of Hawthorn's classic residential streets or a two-bedroom apartment near Anstey station, pricing is confirmed online before any cleaner arrives. No hourly rate that overruns, no ambiguity about which rooms are and aren't included.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] border-t-[3px] border-t-[rgba(255,255,255,0.2)] rounded-[16px] p-[28px_24px] hover:bg-[rgba(255,255,255,0.07)] transition-colors duration-200">
              <div className="text-[32px] font-[900] text-[#d97706] leading-none mb-[4px]">All</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em]">tenancy types</div>
              <h3 className="text-[15px] font-[700] text-[#ffffff] mt-[12px] mb-[8px]">Property Manager and Landlord Bookings Welcome</h3>
              <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.6]">
                Hawthorn is a high-rental suburb - landlords, property managers, and joint tenant-landlord arrangements are all common. Crisp handles bookings from all configurations; scheduling, invoicing, and access arrangements can be managed from a single account regardless of who holds the tenancy.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] border-t-[3px] border-t-[#d97706] rounded-[16px] p-[28px_24px] hover:bg-[rgba(255,255,255,0.07)] transition-colors duration-200">
              <div className="text-[32px] font-[900] text-[#d97706] leading-none mb-[4px]">60sec</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em]">to book online</div>
              <h3 className="text-[15px] font-[700] text-[#ffffff] mt-[12px] mb-[8px]">Instant Quotes Online in Under a Minute</h3>
              <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.6]">
                Get an exact price based on your Hawthorn property's room count and service type in under 60 seconds. No call-back, no site inspection, no three-day wait for a quote email. The price confirmed in your instant quote is the price in your booking confirmation. 15% off the first clean.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="bg-[#F5F0E8] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] text-center">
          <div className="text-[11px] font-[600] text-[#C17B3E] tracking-[0.2em] uppercase mb-[12px]">
            Client Stories
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1C1C1C]">
            What Hawthorn Residents Say
          </h2>
        </div>

        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] mt-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            
            {/* Card 1 */}
            <div className="bg-[#ffffff] border border-[#E0D8CC] border-l-[4px] border-l-[#C17B3E] rounded-[16px] p-[28px]">
              <div className="text-[48px] text-[#C17B3E] opacity-25 leading-[0.8] mb-[8px] font-serif">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-[20px]">
                Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.
              </p>
              <div className="flex gap-[2px] mb-[8px]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-[14px] h-[14px] fill-[#d97706] text-[#d97706]" />)}
              </div>
              <div className="text-[14px] font-[600] text-[#1a1a1a]">Kaan S</div>
              <div className="text-[12px] text-[#6b7280]">Hawthorn</div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#ffffff] border border-[#E0D8CC] border-l-[4px] border-l-[#1C1C1C] rounded-[16px] p-[28px]">
              <div className="text-[48px] text-[#C17B3E] opacity-25 leading-[0.8] mb-[8px] font-serif">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-[20px]">
                Honestly felt like a brand new home. Coming home to a clean house every week has made life much easier.
              </p>
              <div className="flex gap-[2px] mb-[8px]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-[14px] h-[14px] fill-[#d97706] text-[#d97706]" />)}
              </div>
              <div className="text-[14px] font-[600] text-[#1a1a1a]">Andre B</div>
              <div className="text-[12px] text-[#6b7280]">Hawthorn</div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#ffffff] border border-[#E0D8CC] border-l-[4px] border-l-[#d97706] rounded-[16px] p-[28px]">
              <div className="text-[48px] text-[#C17B3E] opacity-25 leading-[0.8] mb-[8px] font-serif">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-[20px]">
                Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp.
              </p>
              <div className="flex gap-[2px] mb-[8px]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-[14px] h-[14px] fill-[#d97706] text-[#d97706]" />)}
              </div>
              <div className="text-[14px] font-[600] text-[#1a1a1a]">Natch L</div>
              <div className="text-[12px] text-[#6b7280]">Hawthorn</div>
            </div>
            
          </div>

          <div className="text-center mt-[32px] text-[14px] text-[#6b7280]">
            <span className="text-[#d97706]">★★★★★</span> Rated 4.9 on Google · 47 verified reviews
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] text-center mb-[48px]">
          <div className="text-[11px] font-[600] text-[#C17B3E] tracking-[0.2em] uppercase mb-[12px]">
            Transparent Pricing
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1C1C1C] mb-[12px]">
            Hawthorn House Cleaning Prices
          </h2>
          <p className="text-[16px] text-[#6b7280]">
            Fixed pricing based on your room count. No hourly estimates, no surprise charges.
          </p>
        </div>

        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            
            {/* Card 1 */}
            <div className="bg-[#ffffff] border border-[#E0D8CC] rounded-[24px] p-[32px] shadow-sm">
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-[12px]">Standard</p>
              <div className="mb-[24px] pb-[24px] border-b border-[#E0D8CC]">
                <span className="text-[14px] text-[#6b7280] font-[500]">From </span>
                <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none">$145</span>
              </div>
              <ul className="space-y-[12px]">
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> Up to 3 bed</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> All bathrooms</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> Eco products included</li>
              </ul>
              <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[24px] hover:bg-[#b45309] hover:-translate-y-1 transition-all duration-200">
                Get an Instant Quote
              </a>
            </div>

            {/* Card 2 - Featured */}
            <div className="bg-[#1C1C1C] rounded-[24px] p-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] md:scale-105 border border-[rgba(255,255,255,0.1)] relative z-10">
              <div className="absolute top-[16px] right-[16px] bg-[#fff7ed] text-[#C17B3E] text-[10px] font-[800] uppercase tracking-wider px-[12px] py-[6px] rounded-full">
                Most popular in Hawthorn
              </div>
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[rgba(255,255,255,0.7)] mb-[12px]">Deep</p>
              <div className="mb-[24px] pb-[24px] border-b border-[rgba(255,255,255,0.1)]">
                <span className="text-[14px] text-[rgba(255,255,255,0.6)] font-[500]">From </span>
                <span className="text-[40px] font-[800] text-[#ffffff] leading-none">$235</span>
              </div>
              <ul className="space-y-[12px]">
                <li className="flex items-center gap-[12px] text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#d97706]" /> Full property scope</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#d97706]" /> Oven & inside cabinets</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#d97706]" /> Grout & hard-to-reach areas</li>
              </ul>
              <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[24px] hover:bg-[#b45309] hover:-translate-y-1 transition-all duration-200">
                Get an Instant Quote
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-[#ffffff] border border-[#E0D8CC] rounded-[24px] p-[32px] shadow-sm">
              <p className="text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-[12px]">Vacate</p>
              <div className="mb-[24px] pb-[24px] border-b border-[#E0D8CC]">
                <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none block">From $380</span>
              </div>
              <ul className="space-y-[12px]">
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> Bond-back standard</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> All rooms & surfaces</li>
                <li className="flex items-center gap-[12px] text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-[16px] h-[16px] text-[#C17B3E]" /> Inspection ready</li>
              </ul>
              <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[24px] hover:bg-[#b45309] hover:-translate-y-1 transition-all duration-200">
                Get an Instant Quote
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-[#F5F0E8] py-[80px] faq-brunswick-override">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-[#C17B3E] py-[80px] px-[32px] text-center">
        <div className="max-w-[800px] mx-auto">
          <div className="text-[11px] font-[600] text-[rgba(255,255,255,0.6)] tracking-[0.2em] uppercase mb-[16px]">
            Ready to Book
          </div>
          <h2 className="text-[36px] md:text-[48px] font-[800] text-[#ffffff] leading-[1.1]">
            Book a Cleaner in Hawthorn
          </h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.75)] max-w-[460px] mx-auto mt-[16px] mb-[8px]">
            Get an instant fixed quote for your Hawthorn terrace, share house or apartment. Book online in under a minute - 15% off your first clean.
          </p>
          <div className="text-[#ffffff] font-[700] text-[14px] block mb-[32px]">
            15% off your first clean.
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-[16px]">
            <a href="/#booking" className="bg-[#1C1C1C] text-white rounded-[99px] px-[32px] py-[14px] font-[600] w-full sm:w-auto hover:bg-[#d97706] transition-colors">
              Get an Instant Quote
            </a>
            <a href="tel:0451423786" className="border border-[rgba(255,255,255,0.3)] text-white rounded-[99px] px-[32px] py-[14px] font-[600] w-full sm:w-auto hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              Call us: 0451 423 786
            </a>
          </div>
          
          <div className="w-[40px] h-[1px] bg-[rgba(255,255,255,0.3)] mx-auto mt-[40px] mb-[28px]" />
          
          <div className="text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.15em] uppercase mb-[14px]">
            Nearby Areas We Also Service
          </div>
          
          <div className="flex flex-wrap justify-center gap-[8px]">
            {['Coburg', 'Preston', 'North Melbourne', 'Moonee Ponds', 'Carlton'].map(suburb => (
              <a key={suburb} href={`/house-cleaning-${suburb.toLowerCase().replace(/ /g, '-')}`} className="bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.2)] text-[#ffffff] rounded-[99px] px-[16px] py-[6px] text-[12px] hover:bg-[rgba(255,255,255,0.25)] transition-colors group flex items-center gap-[4px]">
                {suburb}
                <ArrowRight className="w-[12px] h-[12px] opacity-0 -ml-[4px] group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
