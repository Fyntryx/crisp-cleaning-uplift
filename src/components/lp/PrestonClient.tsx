"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import FAQ from "@/components/lp/FAQ";

const faqData = [
  { question: "Do you clean rental properties along Preston's High Street corridor?", answer: "Yes - rental properties near the High Street corridor, Plenty Road, and across all Preston residential streets are within the standard service area." },
  { question: "How much does house cleaning cost in Preston?", answer: "Pricing depends on property type and room count. A two-bedroom unit and a four-bedroom family home are priced differently. Get an exact quote online in under a minute." },
  { question: "Can multiple tenants from one property share a booking?", answer: "Yes - one booking covers the whole property. Any tenant or the property manager can manage the account; access arrangements are confirmed per property." },
  { question: "Do I need to be home when the cleaner visits?", answer: "No - most Preston clients arrange key safe access or a key handover. Access details are confirmed at booking and stored for every visit." },
  { question: "What's included in a standard clean versus a deep clean?", answer: "Standard: floors, bathrooms, kitchen, surfaces, bedrooms. Deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price." },
  { question: "Can I book recurring weekly cleans for a rental property in Preston?", answer: "Yes - landlords and property managers can set up weekly or fortnightly recurring cleans, with invoicing managed from a single account across multiple properties if needed." }
];

const tramStops = [
  { num: "01", name: "Northcote Border", desc: "—", highlighted: false },
  { num: "02", name: "Tyler St", desc: "Residential East", highlighted: false },
  { num: "03", name: "Preston Market", desc: "★ Community Hub", highlighted: true },
  { num: "04", name: "High St Shops", desc: "Shopping Strip", highlighted: false },
  { num: "05", name: "St Georges Rd", desc: "Tram Corridor", highlighted: false },
  { num: "06", name: "Bell St", desc: "Mid-Preston", highlighted: true },
  { num: "07", name: "Plenty Rd", desc: "Eastern Spine", highlighted: false },
  { num: "08", name: "Northland", desc: "Shopping Centre", highlighted: false },
  { num: "09", name: "Reservoir Border", desc: "—", highlighted: false }
];

const propertyData = {
  brick: {
    tag: "High Street · Established",
    h3: "Brick Family Homes Near the High Street Shopping Corridor",
    body: "The residential streets running east and west of High Street - from the Preston Market in the south to the Northland Shopping Centre precinct further north - are predominantly post-war and mid-century brick homes on flat, established blocks. Long-tenure owner-occupier families and newer arrivals share the same streets; our consistent, fixed-price cleaning service suits both equally.",
    tags: ["Post-war homes", "Mid-century brick", "Owner-occupiers", "All room counts"]
  },
  rental: {
    tag: "Plenty Rd · St Georges Rd",
    h3: "Rental Properties and Multi-Bedroom Houses",
    body: "Preston's proximity to the CBD, tram connectivity, and relatively accessible rental prices make it a high-demand rental suburb. Multi-bedroom rental properties near the Plenty Road and St Georges Road corridors form a significant part of the local housing market. Our per-property, fixed pricing applies regardless of occupant count, with common areas receiving appropriate attention within the standard scope.",
    tags: ["Share houses", "Common areas", "Property manager friendly", "Fixed per-property"]
  },
  townhouse: {
    tag: "Tram Corridor · Newer Builds",
    h3: "Units and Townhouses Along the Plenty Road and St Georges Road Tram Corridor",
    body: "Newer unit and townhouse development is concentrated along Preston's tram corridors - compact, modern layouts with open-plan living, smaller footprints, and contemporary fittings. These properties are priced within the fixed-scope framework at the rate appropriate for their actual room count, not at the same rate as a larger brick family home on an established residential street.",
    tags: ["Open-plan", "Compact layouts", "Room-count pricing", "Contemporary fittings"]
  },
  heritage: {
    tag: "Californian Bungalows · Art Deco",
    h3: "Californian Bungalows and Art Deco Heritage Homes",
    body: "Preston features a diverse mix of housing styles, where Californian bungalows and Art Deco homes are found alongside modern townhouse developments. These period properties represent a key architectural element of the suburb's housing stock, requiring appropriate, low-moisture care for original timber floors and heritage surfaces. Our fixed-pricing model adapts to these properties, ensuring their unique cleaning requirements are met safely without the need for a separate quotation process.",
    tags: ["Heritage surfaces", "Low-moisture care", "Original timber floors", "Period properties"]
  }
};

const comparisons = [
  {
    leftHead: "A different cleaner every time",
    leftBody: "No familiarity with your property. Re-briefing required every visit. Common in Preston's rental market.",
    rightHead: "Same Cleaner Assigned From Your Very First Booking",
    rightBody: "Your cleaner is matched to your property at the first booking and returns on your schedule. For rental properties where tenants change over time, the assigned cleaner maintains consistency with the property regardless of occupancy - they know the home, not just the current residents. Our 97% same-cleaner continuity rate applies to all property types.",
    stat: "97% continuity rate"
  },
  {
    leftHead: "Hourly rates that overrun",
    leftBody: "You book a 3-hour clean. The home takes 4. The invoice grows. No fixed price, no certainty.",
    rightHead: "Fixed Pricing - No Hourly Rate Surprises for Any Property Type",
    rightBody: "Whether it's a two-bedroom brick home near the Preston Market or a four-bedroom rental near High Street, pricing is set by the actual scope of the property before any cleaner arrives. No overrunning hourly rate, no ambiguity about which rooms are and aren't within the service.",
    stat: "Fixed pricing always"
  },
  {
    leftHead: "Services that don't accommodate renters",
    leftBody: "Landlords and property managers turned away. Tenants have to book separately. Multiple accounts for one property.",
    rightHead: "Rental and Share-House Bookings Welcome",
    rightBody: "Preston's high renter proportion means landlords, property managers, and tenants are all common booking sources. All configurations are welcome - single-occupant homes, share houses, and landlord-managed investment properties can all be booked and managed through the same online account without different processes for each.",
    stat: "All tenancy types"
  },
  {
    leftHead: "Days wait for a quote callback",
    leftBody: "Phone calls, callbacks, site inspection requests. Three days later you still don't have a confirmed price.",
    rightHead: "Book Instantly Online in Under a Minute",
    rightBody: "Get an exact quote and complete the booking in under 60 seconds online. The same cleaner is confirmed by return email. 15% off the first clean; loyalty rewards accumulate from the second month of regular bookings.",
    stat: "60 second booking"
  }
];

const styles = `
  .preston-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/noise.png');
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
  }
  .preston-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 24px,
      rgba(255,255,255,0.015) 24px,
      rgba(255,255,255,0.015) 25px
    );
    pointer-events: none;
    z-index: 0;
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
  .amber-pulse {
    animation: pulse 2s infinite;
  }
  .tram-spine {
    position: absolute;
    width: 2px;
    background: linear-gradient(
      180deg,
      #F59E0B 0%,
      rgba(245,158,11,0.3) 60%,
      rgba(245,158,11,0.08) 100%
    );
    pointer-events: none;
    z-index: 0;
  }
  .tram-stop {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tram-stop-node {
    position: relative;
    z-index: 1;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #2D1B0E;
    border: 2px solid rgba(245,158,11,0.35);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.07);
    flex-shrink: 0;
  }
  .tram-stop.featured .tram-stop-node {
    border-color: #F59E0B;
    background: rgba(245,158,11,0.15);
    box-shadow: 0 0 0 4px rgba(245,158,11,0.1);
  }
  .property-group .lot-fill {
    transition: fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease;
  }
  .property-group:hover .lot-fill {
    stroke-width: 2;
    filter: brightness(0.96);
  }
  .property-group[data-property="brick"].active .lot-fill {
    fill: #FFE4C4;
    stroke: #d97706;
    stroke-width: 2.5;
  }
  .property-group[data-property="rental"].active .lot-fill {
    fill: #FFD4A0;
    stroke: #C17B3E;
    stroke-width: 2.5;
  }
  .property-group[data-property="townhouse"].active .lot-fill {
    fill: #EDD8BE;
    stroke: #A06A3A;
    stroke-width: 2.5;
  }
  .property-group.active .house-fill {
    filter: brightness(1.08);
  }
  .property-group .select-dot {
    transition: opacity 0.2s ease;
  }
  .property-group.active .select-dot {
    opacity: 1;
    animation: pinPulse 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes pinPulse {
    from { r: 0; opacity: 0; }
    to   { r: 4; opacity: 1; }
  }
  .property-group.dimmed {
    opacity: 0.55;
    transition: opacity 0.25s ease;
  }
  .receipt-edge::after {
    content: '';
    display: block;
    height: 16px;
    background: 
      radial-gradient(circle at 0% 0%, 
        transparent 10px, #FDFAF6 10px) -5px 0,
      radial-gradient(circle at 100% 0%, 
        transparent 10px, #FDFAF6 10px) right -5px top 0;
    background-size: 20px 16px;
    background-repeat: repeat-x;
    background-color: #ffffff;
  }
  .faq-preston .border-primary {
    border-color: #d97706 !important;
  }
`;

export default function PrestonClient() {
  const handlePropertyClick = (property: string) => {
    setActiveProperty(property as "brick" | "rental" | "townhouse" | "heritage");
    // Handle dimmed class via state/CSS instead of direct DOM manipulation
  };
  const [activeProperty, setActiveProperty] = useState<"brick" | "rental" | "townhouse" | "heritage">("brick");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const alignTramSpine = () => {
      const spine = document.querySelector('.tram-spine') as HTMLElement;
      const stops = document.querySelectorAll('.tram-stop');
      
      if (!spine || stops.length === 0) return;
      
      const firstStop = stops[0] as HTMLElement;
      const lastStop = stops[stops.length - 1] as HTMLElement;
      const panelRect = spine.parentElement?.getBoundingClientRect();
      
      if (!panelRect) return;

      const firstRect = firstStop.getBoundingClientRect();
      const lastRect = lastStop.getBoundingClientRect();
      
      const topOffset = firstRect.top + firstRect.height / 2 - panelRect.top;
      const bottomOffset = panelRect.bottom - (lastRect.top + lastRect.height / 2);
      
      spine.style.top = topOffset + 'px';
      spine.style.bottom = bottomOffset + 'px';
      spine.style.height = 'auto';

      const firstNode = firstStop.querySelector('.tram-stop-node');
      if (firstNode) {
        const nodeRect = firstNode.getBoundingClientRect();
        const leftOffset = nodeRect.left + nodeRect.width / 2 - panelRect.left;
        spine.style.left = leftOffset + 'px';
      }
    };

    // Small timeout to ensure DOM is fully rendered
    setTimeout(alignTramSpine, 50);
    window.addEventListener('resize', alignTramSpine);

    return () => {
      window.removeEventListener('resize', alignTramSpine);
    };
  }, []);

  const titleWords = ["House Cleaning", "Preston", "Melbourne"];
  
  if (!isMounted) return null;

  return (
    <main className="w-full font-sans antialiased bg-[#FDFAF6]">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* SECTION 1 — HERO */}
      <section className="preston-hero relative min-h-[92vh] overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_1fr] items-center bg-[#2D1B0E]">
        {/* Left Column */}
        <div className="relative z-10 px-6 pt-32 pb-16 md:px-16 md:py-[120px] md:pl-20">
          <div className="text-[12px] text-white/25 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span>House Cleaning Preston</span>
          </div>

          <div className="bg-[#d97706]/15 border border-[#d97706]/30 text-[#F59E0B] text-[11px] font-semibold tracking-[0.12em] rounded-full px-4 py-1.5 mb-6 inline-block uppercase">
            ● High Street · Preston · Inner North
          </div>

          <h1 className="text-[44px] md:text-[68px] font-extrabold text-white leading-[1.0] tracking-[-0.03em] flex flex-col">
            {titleWords.map((word, index) => (
              <span key={index} className="block overflow-hidden pb-2 -mb-2">
                <motion.span 
                  className={`block ${word === "Preston" ? "text-[#d97706]" : ""}`}
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 max-w-[480px] text-[15px] text-white/50 leading-[1.8]"
          >
            Preston's character is built along its corridors - High Street runs through the suburb's heart as one of Melbourne's longest multicultural shopping strips, with Vietnamese and Greek communities that have shaped the area's food culture and retail identity over decades. The residential streets running east and west of High Street and Plenty Road contain a mix of post-war brick homes, more recent townhouse infill, and a significant proportion of rental properties near the tram lines. Crisp services Preston homes, share houses, and rentals with fixed, scope-based pricing, the same cleaner on every visit, and online booking that requires no phone call or site visit.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["4.9 ★ Google", "97% Same Cleaner", "Eco-Friendly", "72hr Guarantee"].map((pill, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-[12px] text-white/55">
                {pill}
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/booking" className="bg-[#d97706] text-white rounded-full px-7 py-3.5 font-semibold hover:bg-[#b46205] transition-colors flex items-center">
              Get an Instant Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="#pricing" className="border border-white/15 text-white rounded-full px-7 py-3.5 font-medium hover:bg-white/5 transition-colors">
              See what's included
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[12px] text-white/25 mt-2.5"
          >
            15% off your first clean.
          </motion.div>
        </div>

        {/* Right Column (Tram Panel) */}
        <div className="hidden md:block relative z-10 p-8 pl-8 pr-12 lg:py-20 lg:pr-12 lg:pl-8">
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-8 relative overflow-hidden backdrop-blur-sm">
            {/* Header row */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-[9px] font-bold text-white/25 tracking-[0.3em] uppercase">High Street Corridor</span>
              <div className="flex items-center gap-1">
                <div className="w-[6px] h-[6px] rounded-full bg-[#F59E0B] amber-pulse" />
                <span className="text-[9px] text-[#F59E0B] font-semibold tracking-wider">NORTHBOUND</span>
              </div>
            </div>

            {/* Vertical Line Spine */}
            <div className="tram-spine" />

            {/* Stops */}
            <div className="mt-5 flex flex-col relative z-10">
              {tramStops.map((stop, i) => (
                <div 
                  key={i} 
                  className={`tram-stop ${stop.highlighted ? 'featured' : ''}`}
                >
                  <div className="w-8 text-right text-[9px] text-white/15 font-variant-numeric: tabular-nums shrink-0">
                    {stop.num}
                  </div>
                  
                  {/* Stop Node */}
                  <div className="tram-stop-node" />

                  <div className="ml-2 flex flex-col">
                    <span className="text-[13px] font-semibold text-white">{stop.name}</span>
                    <span className="text-[10px] text-white/30 tracking-[0.08em] mt-0.5">{stop.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] text-[10px] text-white/20 tracking-[0.12em] uppercase text-center">
              All Preston streets serviced
            </div>
          </div>
        </div>

        {/* Bottom Hero Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F59E0B] via-30% to-[#d97706] to-70% opacity-80" />
      </section>

      {/* SECTION 2 — PROOF STRIP */}
      <section className="bg-[#1C1C1C] py-[22px] border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap items-center text-[13px] text-white/50 tracking-[0.08em] font-medium text-center">
            <span><span className="text-[#d97706] font-bold">4.9★</span> Google</span>
            <span className="text-[#F59E0B]">·</span>
            <span><span className="text-[#d97706] font-bold">97%</span> Same Cleaner</span>
            <span className="text-[#F59E0B]">·</span>
            <span><span className="text-[#d97706] font-bold">100%</span> Eco-Friendly</span>
            <span className="text-[#F59E0B]">·</span>
            <span><span className="text-[#d97706] font-bold">72hr</span> Guarantee</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROPERTY TYPES */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="mb-12">
            <span className="text-[#d97706] font-semibold text-[11px] uppercase tracking-[0.2em] mb-3 block">Preston's Housing Stock</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] tracking-tight max-w-[680px] mb-4 leading-tight">
              Preston's Family Homes and Rentals - Cleaned Consistently
            </h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[660px]">
              Preston's residential stock is more varied than its postcode might suggest - post-war brick homes on established streets coexist with newer townhouse development and converted larger properties in the rental market near the Plenty Road and St Georges Road tram routes. Fixed, scope-specific pricing handles each configuration accurately without a separate quotation process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left SVG Selector (Hidden on mobile) */}
            <div className="hidden lg:block bg-[#fafafa] border border-[#E8E0D5] rounded-[20px] p-7 select-none">
              <svg viewBox="0 0 400 420" width="100%" className="w-full h-auto drop-shadow-sm">
                <rect width="400" height="420" fill="#F8F9FA"/>
                
                {/* Road surface */}
                <rect x="160" y="0" width="80" height="420" fill="#E8E0D5"/>
                {/* Road centreline dashes */}
                <line x1="200" y1="0" x2="200" y2="420" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="16,12" opacity="0.6"/>
                {/* Kerb lines */}
                <line x1="160" y1="0" x2="160" y2="420" stroke="#C4B5A0" strokeWidth="1"/>
                <line x1="240" y1="0" x2="240" y2="420" stroke="#C4B5A0" strokeWidth="1"/>
                
                {/* Footpaths both sides */}
                <rect x="130" y="0" width="30" height="420" fill="#F5EFE6"/>
                <rect x="240" y="0" width="30" height="420" fill="#F5EFE6"/>

                {/* Property 1 — Brick family home */}
                <g data-property="brick" className={`property-group cursor-pointer ${activeProperty === 'brick' ? 'active' : activeProperty ? 'dimmed' : ''}`} onClick={() => handlePropertyClick('brick')}>
                  {/* Lot */}
                  <rect x="20" y="30" width="110" height="110" fill="#FEF0E0" stroke="#F5D5B0" strokeWidth="1" className="lot-fill"/>
                  {/* House footprint */}
                  <rect x="35" y="50" width="75" height="70" rx="2" fill="#E8A870" stroke="#C17B3E" strokeWidth="1.5" className="house-fill"/>
                  {/* Roof */}
                  <rect x="35" y="50" width="75" height="14" rx="2" fill="#2D1B0E"/>
                  {/* Door */}
                  <rect x="68" y="100" width="12" height="20" rx="1" fill="#2D1B0E"/>
                  {/* Windows */}
                  <rect x="42" y="68" width="14" height="12" rx="1" fill="white" opacity="0.7"/>
                  <rect x="82" y="68" width="14" height="12" rx="1" fill="white" opacity="0.7"/>
                  {/* Lawn */}
                  <rect x="20" y="122" width="110" height="18" fill="#D4E8C2" stroke="#B5D49A" strokeWidth="0.5"/>
                  {/* Chimney */}
                  <rect x="90" y="42" width="8" height="14" fill="#2D1B0E"/>
                  {/* Label */}
                  <text x="75" y="158" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="700" letterSpacing="0.1em">BRICK HOME</text>
                  <circle className="select-dot" cx="75" cy="170" r="4" fill="#d97706" opacity="0"/>
                </g>

                {/* Property 2 — Rental/share house */}
                <g data-property="rental" className={`property-group cursor-pointer ${activeProperty === 'rental' ? 'active' : activeProperty ? 'dimmed' : ''}`} onClick={() => handlePropertyClick('rental')}>
                  {/* Lot */}
                  <rect x="20" y="210" width="110" height="110" fill="#FFF3E0" stroke="#FFCC80" strokeWidth="1" className="lot-fill"/>
                  {/* House main */}
                  <rect x="30" y="225" width="90" height="75" rx="2" fill="#FFB347" stroke="#d97706" strokeWidth="1.5" className="house-fill"/>
                  {/* Roof */}
                  <rect x="30" y="225" width="90" height="14" rx="2" fill="#92400E"/>
                  {/* Multiple doors */}
                  <rect x="42" y="278" width="10" height="22" rx="1" fill="#5C2A00"/>
                  <rect x="70" y="278" width="10" height="22" rx="1" fill="#5C2A00"/>
                  <rect x="98" y="278" width="10" height="22" rx="1" fill="#5C2A00"/>
                  {/* Windows — more per floor, multi-occupant */}
                  <rect x="36" y="243" width="11" height="9" rx="1" fill="white" opacity="0.75"/>
                  <rect x="56" y="243" width="11" height="9" rx="1" fill="white" opacity="0.75"/>
                  <rect x="76" y="243" width="11" height="9" rx="1" fill="white" opacity="0.75"/>
                  <rect x="96" y="243" width="11" height="9" rx="1" fill="white" opacity="0.75"/>
                  {/* Label */}
                  <text x="75" y="338" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="700" letterSpacing="0.1em">RENTAL / SHARE</text>
                  <circle className="select-dot" cx="75" cy="350" r="4" fill="#d97706" opacity="0"/>
                </g>

                {/* Property 3 — Townhouse/unit */}
                <g data-property="townhouse" className={`property-group cursor-pointer ${activeProperty === 'townhouse' ? 'active' : activeProperty ? 'dimmed' : ''}`} onClick={() => handlePropertyClick('townhouse')}>
                  {/* Lot */}
                  <rect x="270" y="120" width="110" height="160" fill="#F5EDE0" stroke="#E0C9A8" strokeWidth="1" className="lot-fill"/>
                  {/* Ground floor */}
                  <rect x="282" y="182" width="86" height="78" rx="2" fill="#C4956A" stroke="#A06A3A" strokeWidth="1.5" className="house-fill"/>
                  {/* Upper floor — darker, taller */}
                  <rect x="290" y="142" width="70" height="44" rx="2" fill="#A06A3A" stroke="#7A4A20" strokeWidth="1.5"/>
                  {/* Roof */}
                  <rect x="290" y="142" width="70" height="12" rx="2" fill="#2D1B0E"/>
                  {/* Ground floor: door + garage */}
                  <rect x="295" y="230" width="18" height="30" rx="1" fill="#2D1B0E"/>
                  <rect x="324" y="222" width="30" height="38" rx="1" fill="#5C3010" opacity="0.7"/>
                  {/* Upper floor windows */}
                  <rect x="298" y="155" width="13" height="10" rx="1" fill="white" opacity="0.75"/>
                  <rect x="320" y="155" width="13" height="10" rx="1" fill="white" opacity="0.75"/>
                  <rect x="342" y="155" width="13" height="10" rx="1" fill="white" opacity="0.75"/>
                  {/* Ground floor windows */}
                  <rect x="298" y="200" width="13" height="10" rx="1" fill="white" opacity="0.6"/>
                  <rect x="320" y="200" width="13" height="10" rx="1" fill="white" opacity="0.6"/>
                  {/* Label */}
                  <text x="325" y="292" textAnchor="middle" fontSize="8" fill="#7A4A20" fontWeight="700" letterSpacing="0.1em">UNIT / TOWNHOUSE</text>
                  <circle className="select-dot" cx="325" cy="304" r="4" fill="#d97706" opacity="0"/>
                </g>

                {/* Property 4 — Heritage */}
                <g data-property="heritage" className={`property-group cursor-pointer ${activeProperty === 'heritage' ? 'active' : activeProperty ? 'dimmed' : ''}`} onClick={() => handlePropertyClick('heritage')}>
                  {/* Lot */}
                  <rect x="270" y="10" width="110" height="100" fill="#FDF8F5" stroke="#E8D5C4" strokeWidth="1" className="lot-fill"/>
                  {/* House footprint (Art Deco/Bungalow style) */}
                  <rect x="285" y="25" width="80" height="65" rx="2" fill="#D4A373" stroke="#A06A3A" strokeWidth="1.5" className="house-fill"/>
                  {/* Roof */}
                  <rect x="285" y="25" width="80" height="15" rx="2" fill="#8B5A2B"/>
                  {/* Door */}
                  <rect x="320" y="70" width="14" height="20" rx="1" fill="#5C3A21"/>
                  {/* Windows */}
                  <rect x="295" y="45" width="16" height="14" rx="1" fill="white" opacity="0.8"/>
                  <rect x="340" y="45" width="16" height="14" rx="1" fill="white" opacity="0.8"/>
                  {/* Heritage porch detail */}
                  <rect x="315" y="65" width="24" height="5" fill="#E8D5C4"/>
                  {/* Lawn */}
                  <rect x="270" y="90" width="110" height="20" fill="#D4E8C2" stroke="#B5D49A" strokeWidth="0.5"/>
                  {/* Label */}
                  <text x="325" y="132" textAnchor="middle" fontSize="8" fill="#8B5A2B" fontWeight="700" letterSpacing="0.1em">HERITAGE HOME</text>
                  <circle className="select-dot" cx="325" cy="144" r="4" fill="#d97706" opacity="0"/>
                </g>

                {/* Street label */}
                <text x="200" y="210" textAnchor="middle" fontSize="8" fill="#C4A882" fontWeight="600" letterSpacing="0.2em" transform="rotate(-90, 200, 210)">
                  HIGH STREET
                </text>

                {/* Tram icon on road */}
                <rect x="182" y="186" width="36" height="22" rx="2" fill="#d97706"/>
                <rect x="186" y="190" width="8" height="8" rx="1" fill="rgba(255,255,255,0.6)"/>
                <rect x="200" y="190" width="8" height="8" rx="1" fill="rgba(255,255,255,0.6)"/>
                <circle cx="191" cy="209" r="3" fill="#2D1B0E"/>
                <circle cx="211" cy="209" r="3" fill="#2D1B0E"/>
                <text x="200" y="228" textAnchor="middle" fontSize="7" fill="#d97706" fontWeight="700" letterSpacing="0.05em">ROUTE 86</text>
                
                {/* Branding watermark */}
                <text x="30" y="412" fontSize="7" fill="#C4A882" letterSpacing="0.1em">CRISP CLEANING</text>
                <text x="370" y="412" fontSize="7" fill="#C4A882" letterSpacing="0.1em" textAnchor="end">PRESTON</text>
              </svg>
              <div className="text-[11px] text-[#9ca3af] text-center mt-3 font-medium">Select a property type</div>
            </div>

            {/* Mobile Property Selector Tabs */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {Object.keys(propertyData).map((key) => (
                <button
                  key={key}
                  onClick={() => handlePropertyClick(key)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors border ${
                    activeProperty === key 
                      ? 'bg-[#d97706] text-white border-[#d97706]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {key === 'brick' ? 'Brick Home' : key === 'rental' ? 'Rental / Share' : key === 'townhouse' ? 'Townhouse' : 'Heritage'}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="bg-white border border-[#E8E0D5] rounded-[20px] p-7 md:p-9 min-h-[380px] relative overflow-hidden">
              <motion.div
                key={activeProperty}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-block bg-[#fff7ed] border border-[#fed7aa] rounded-full text-[#92400e] px-4 py-1.5 text-[12px] font-semibold mb-3">
                  {propertyData[activeProperty].tag}
                </div>
                <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2.5 leading-tight">
                  {propertyData[activeProperty].h3}
                </h3>
                <p className="text-[14px] text-[#6b7280] line-height-[1.75] mb-6">
                  {propertyData[activeProperty].body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {propertyData[activeProperty].tags.map((tag, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-100 text-gray-500 text-[11px] px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED (Receipt layout) */}
      <section className="bg-[#FDFAF6] py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <span className="text-[#d97706] font-semibold text-[11px] uppercase tracking-[0.2em] mb-3 block">Scope & Checklist</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] tracking-tight mb-3">
              What's Included in Every Preston Clean
            </h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[580px] mx-auto">
              Every Preston clean covers the standard home-maintenance scope - kitchen, bathrooms, floors, bedrooms, and living areas. Room count determines the price. The scope is confirmed before the first visit so there's no ambiguity about what's covered on the day.
            </p>
          </div>

          <div className="max-w-[640px] mx-auto">
            <div className="receipt receipt-edge bg-white border border-[#E8E0D5] rounded-[4px] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_0_4px_#FDFAF6,0_0_0_5px_#E8E0D5] overflow-hidden">
              {/* Receipt Header */}
              <div className="bg-[#2D1B0E] p-6 text-center">
                <div className="text-[10px] font-bold text-white/80 tracking-[0.3em] uppercase">
                  CRISP CLEANING<br/>SCOPE CONFIRMATION
                </div>
                <div className="h-[1px] bg-[#F59E0B] opacity-40 mt-3 max-w-[120px] mx-auto" />
              </div>

              <div className="px-8 pt-2 pb-1 text-[10px] text-[#9ca3af] tracking-[0.08em] flex justify-between uppercase">
                <span>Date: Every Visit</span>
                <span>Service: Standard Clean</span>
              </div>

              {/* Receipt Body */}
              <div className="px-8 pb-4">
                <div className="border-t-2 border-dashed border-[#E8E0D5] my-2" />

                {/* Section A */}
                <div className="py-2">
                  <div className="text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase pt-4 pb-2">
                    Kitchen and Bathroom Sanitisation
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {[
                      "Kitchen benchtops & stovetop",
                      "Rangehood & splashback",
                      "Sink & appliance exteriors",
                      "All bathrooms — shower/bath",
                      "Toilet (base to cistern)",
                      "Basin, mirror & tapware",
                      "Bathroom tiled floors"
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="flex items-baseline justify-between py-1.5 border-b border-dotted border-gray-100"
                      >
                        <span className="text-[13px] text-[#1C1C1C] font-medium">✓ {item}</span>
                        <span className="text-[10px] text-[#9ca3af] tracking-[0.08em] uppercase">INCLUDED</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-[12px] text-[#9ca3af] leading-[1.6] mt-3 mb-4 pl-4 border-l-2 border-[#E8E0D5]">
                    Kitchen surfaces, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned on every visit. All bathrooms - shower or bath, toilet, basin, mirror, taps, and tiled floor - are sanitised and polished. For Preston's rental properties with multiple bathrooms, all are covered in the standard scope without additional charge.
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-[#E8E0D5] my-2" />

                {/* Section B */}
                <div className="py-2">
                  <div className="text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase pt-4 pb-2">
                    Vacuuming, Mopping and Surface Wiping Throughout
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {[
                      "Carpeted rooms vacuumed",
                      "Hard floors swept & mopped",
                      "Surfaces & skirting boards wiped",
                      "Door handles & window sills"
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="flex items-baseline justify-between py-1.5 border-b border-dotted border-gray-100"
                      >
                        <span className="text-[13px] text-[#1C1C1C] font-medium">✓ {item}</span>
                        <span className="text-[10px] text-[#9ca3af] tracking-[0.08em] uppercase">INCLUDED</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-[12px] text-[#9ca3af] leading-[1.6] mt-3 mb-4 pl-4 border-l-2 border-[#E8E0D5]">
                    Carpeted rooms are vacuumed and hard floors swept and mopped. All surfaces, skirting boards, door handles, and window sills are dusted and wiped. Preston's established brick homes often have a mix of carpet and timber or tile flooring; the scope covers all floor types within the one standard clean.
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-[#E8E0D5] my-2" />

                {/* Section C */}
                <div className="py-2">
                  <div className="text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase pt-4 pb-2">
                    Bedrooms, Living Areas and Shared Spaces
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {[
                      "All bedrooms — vacuumed/mopped",
                      "Bedroom surfaces dusted",
                      "Living & dining areas",
                      "Common areas (share houses)",
                      "Laundry"
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="flex items-baseline justify-between py-1.5 border-b border-dotted border-gray-100"
                      >
                        <span className="text-[13px] text-[#1C1C1C] font-medium">✓ {item}</span>
                        <span className="text-[10px] text-[#9ca3af] tracking-[0.08em] uppercase">INCLUDED</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-[12px] text-[#9ca3af] leading-[1.6] mt-3 mb-2 pl-4 border-l-2 border-[#E8E0D5]">
                    Every bedroom in scope is vacuumed or mopped and surfaces dusted. Living, dining, and family areas receive the same treatment. For rental share houses where common areas accumulate considerably faster than individual rooms, appropriate attention is given to kitchens, bathrooms, and living spaces within the agreed scope.
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-[#E8E0D5] mt-4" />
              </div>

              {/* Receipt Total */}
              <div className="bg-[#1C1C1C] px-8 py-5 text-[11px] font-bold text-white tracking-[0.1em] uppercase flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span>TOTAL SCOPE:</span>
                  <span>ALL ROOMS CONFIRMED</span>
                </div>
                <div className="flex justify-between">
                  <span>PRICE:</span>
                  <span>FIXED BEFORE BOOKING</span>
                </div>
                <div className="flex justify-between">
                  <span>SURPRISE CHARGES:</span>
                  <span className="text-[#d97706]">NONE</span>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="px-8 py-4 text-center text-[10px] text-[#9ca3af] tracking-[0.1em] uppercase">
                Thank you. 15% off your first clean.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP (Comparison table) */}
      <section className="bg-[#1C1C1C] py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-[1100px] mx-auto mb-14 text-center md:text-left">
            <span className="text-[#F59E0B] font-semibold text-[11px] uppercase tracking-[0.2em] mb-3 block">The Crisp Difference</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-white tracking-tight mb-4">
              Why Preston Residents Choose Crisp
            </h2>
            <p className="text-[16px] text-white/45 leading-[1.8] max-w-[560px]">
              Preston sits at a medium competition level for house cleaning searches - more contested than Hampton or North Melbourne but significantly less competitive than the bayside and inner-south suburbs. A quality, locally differentiated presence here builds strong organic positions at a meaningful pace.
            </p>
          </div>

          <div className="max-w-[900px] mx-auto border border-white/[0.08] rounded-[20px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Header row */}
              <div className="bg-white/[0.05] p-5 md:px-8 border-r border-white/[0.08] text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase hidden md:block">
                WITHOUT A CONSISTENT SERVICE
              </div>
              <div className="bg-[#d97706]/10 p-5 md:px-8 text-[10px] font-bold text-[#d97706] tracking-[0.2em] uppercase hidden md:block">
                WITH CRISP
              </div>

              {/* Rows */}
              {comparisons.map((row, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06] hover:bg-white/[0.015] transition-colors group"
                >
                  <div className="p-6 md:py-7 md:px-8 border-r border-white/[0.06] flex flex-col">
                    <div className="text-[16px] text-white/20 mb-2 font-bold">✗</div>
                    <div className="text-[15px] font-bold text-white/50 mb-1.5">{row.leftHead}</div>
                    <div className="text-[13px] text-white/30 line-height-[1.6]">{row.leftBody}</div>
                  </div>
                  <div className="p-6 md:py-7 md:px-8 bg-[#d97706]/[0.04] flex flex-col">
                    <div className="text-[16px] text-[#d97706] mb-2 font-bold">✓</div>
                    <h3 className="text-[15px] font-bold text-white mb-1.5">{row.rightHead}</h3>
                    <div className="text-[13px] text-white/55 line-height-[1.6]">{row.rightBody}</div>
                    <div className="mt-3">
                      <span className="bg-[#d97706]/10 border border-[#d97706]/25 text-[#F59E0B] rounded-full px-3 py-1 text-[11px] font-bold inline-block">
                        {row.stat}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS (Custom Layout) */}
      <section className="bg-[#FDFAF6] py-20 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#d97706] font-semibold text-[11px] uppercase tracking-[0.2em] mb-3 block">Client Stories</span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] tracking-tight mb-12">
            What Preston Residents Say
          </h2>
          
          <div className="max-w-[1100px] mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              {/* Top Card 1 */}
              <div className="bg-white border border-[#E8E0D5] border-l-4 border-l-[#d97706] rounded-[16px] p-7 flex flex-col">
                <span className="text-[48px] text-[#d97706] opacity-20 leading-[0.8] font-serif mb-2">"</span>
                <p className="text-[14px] text-[#374151] font-style-italic leading-[1.7] flex-grow">
                  Coming home to a clean house every week has made life much easier. The team is super reliable and always respectful of our space.
                </p>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex gap-0.5 text-[#d97706]"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                  <div className="text-[12px] font-bold text-[#1C1C1C] mt-1">Aiden A. <span className="text-gray-400 font-normal ml-1">· Verified Booking</span></div>
                </div>
              </div>

              {/* Top Card 2 */}
              <div className="bg-white border border-[#E8E0D5] border-l-4 border-l-[#d97706] rounded-[16px] p-7 flex flex-col">
                <span className="text-[48px] text-[#d97706] opacity-20 leading-[0.8] font-serif mb-2">"</span>
                <p className="text-[14px] text-[#374151] font-style-italic leading-[1.7] flex-grow">
                  Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp
                </p>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex gap-0.5 text-[#d97706]"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                  <div className="text-[12px] font-bold text-[#1C1C1C] mt-1">Natch L. <span className="text-gray-400 font-normal ml-1">· Verified Booking</span></div>
                </div>
              </div>
            </div>

            {/* Wide Feature Card */}
            <div className="bg-[#2D1B0E] rounded-[16px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
              <p className="text-[18px] md:text-[22px] text-white/85 font-style-italic leading-[1.5] max-w-[560px]">
                "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home. Fixed pricing made it so easy to book."
              </p>
              <div className="flex flex-col md:items-end text-left md:text-right shrink-0">
                <div className="flex gap-0.5 text-[#d97706] mb-2"><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /></div>
                <div className="text-[14px] font-bold text-white">Ardi T.</div>
                <div className="text-[12px] text-white/50">Google Review</div>
              </div>
            </div>
            
            <div className="text-[14px] text-[#6b7280] text-center mt-8 font-medium">
              <span className="text-[#d97706] mr-1">★★★★★</span> Rated 4.9 on Google · 47 verified reviews
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section id="pricing" className="bg-white py-20 lg:py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d97706] font-semibold text-[11px] uppercase tracking-[0.2em] mb-3 block">Transparent Pricing</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] tracking-tight mb-4">
              Preston House Cleaning Prices
            </h2>
            <p className="text-[16px] text-[#6b7280] max-w-[500px] mx-auto">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </div>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Standard Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col shadow-sm">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Standard</h3>
              <div className="text-[14px] text-gray-500 mb-6">Regular upkeep</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">From $145</div>
              <div className="flex flex-col gap-4 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Up to 3 bed</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All bathrooms</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Eco products included</div>
              </div>
              <Link href="/booking" className="block text-center w-full bg-gray-50 text-gray-900 border border-gray-200 font-semibold py-3.5 rounded-full hover:bg-gray-100 transition-colors text-[14px]">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Deep Card */}
            <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[24px] p-8 flex flex-col shadow-md relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d97706] text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full whitespace-nowrap shadow-sm">
                Most popular in Preston
              </div>
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Deep Clean</h3>
              <div className="text-[14px] text-[#92400e] mb-6">Thorough reset</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">From $235</div>
              <div className="flex flex-col gap-4 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-[14px] text-gray-800"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Full property scope</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-800"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Oven & inside cabinets</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-800"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Grout & hard-to-reach areas</div>
              </div>
              <Link href="/booking" className="block text-center w-full bg-[#d97706] text-white font-semibold py-3.5 rounded-full hover:bg-[#b46205] transition-colors text-[14px] shadow-sm">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Vacate Card */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col shadow-sm">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">End of Lease</h3>
              <div className="text-[14px] text-gray-500 mb-6">Moving out</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">From $380</div>
              <div className="flex flex-col gap-4 mb-8 flex-grow">
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Bond-back standard</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All rooms & surfaces</div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Inspection ready</div>
              </div>
              <Link href="/booking" className="block text-center w-full bg-gray-50 text-gray-900 border border-gray-200 font-semibold py-3.5 rounded-full hover:bg-gray-100 transition-colors text-[14px]">
                Get an Instant Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-[#FDFAF6] py-20 lg:py-24 faq-preston">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="preston-hero relative bg-[#2D1B0E] py-20 px-8 text-center overflow-hidden">
        <div className="relative z-10 max-w-[600px] mx-auto flex flex-col items-center">
          <div className="w-[40px] h-[1px] bg-[#F59E0B] mb-8" />
          
          <span className="text-[11px] text-white/35 font-bold uppercase tracking-[0.2em] mb-4 block">
            Ready to Book
          </span>
          
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
            Book a Cleaner in <span className="text-[#d97706]">Preston</span>
          </h2>
          
          <p className="text-[16px] text-white/55 max-w-[460px] mx-auto mb-2 leading-[1.6]">
            Get an instant fixed quote for your Preston home, share house or rental property. Book online in under a minute - 15% off the first clean.
          </p>
          
          <span className="text-[#d97706] font-semibold text-[14px] block mb-8">
            15% off your first clean.
          </span>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking" className="bg-[#d97706] text-white rounded-full px-8 py-3.5 font-semibold hover:bg-[#b46205] transition-colors w-full sm:w-auto shadow-sm">
              Get an Instant Quote
            </Link>
            <a href="tel:0451423786" className="border border-white/15 text-white rounded-full px-8 py-3.5 font-medium hover:bg-white/5 transition-colors w-full sm:w-auto">
              Call us: 0451 423 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-[#F59E0B]/30 mt-10 mb-7" />

          <span className="text-[11px] text-white/20 font-bold uppercase tracking-[0.15em] mb-3 block">
            Nearby Areas We Also Service
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {["Reservoir", "Brunswick", "Coburg", "Thornbury", "Northcote"].map((area, i) => (
              <Link 
                key={i} 
                href={`/house-cleaning-${area.toLowerCase()}`}
                className="bg-white/5 border border-white/10 text-white/50 text-[12px] px-4 py-1.5 rounded-full hover:border-[#d97706] hover:text-[#d97706] transition-colors flex items-center group"
              >
                {area}
                <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
