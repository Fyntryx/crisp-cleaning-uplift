"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  Home,
  Building2,
  Building,
  Key,
  ShieldCheck,
  UtensilsCrossed,
  Bath,
  Layers,
  CheckCircle2,
  XCircle,
  Star,
  UserCheck,
  MapPin
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";

/* ══════════════════════════════════════════════════════
   1. DATA ARRAYS
══════════════════════════════════════════════════════ */

const faqData = [
  {
    question: "Do you service Edgewater Estate and the riverside apartment precincts?",
    answer: "Yes — including Edgewater Estate apartment buildings and the Waterford Green and Riverbank Estate townhouses. Building access details collected at booking and managed for every subsequent visit."
  },
  {
    question: "How much does house cleaning cost in Maribyrnong?",
    answer: "Pricing depends on your property type and room count. A bungalow near Mitchell Street and an Edgewater apartment are priced differently. Get an exact quote online in under a minute."
  },
  {
    question: "Can I get the same cleaner for my Californian bungalow near Mitchell Street?",
    answer: "Yes. Your cleaner is assigned to your property at the first booking and returns on every visit. 97% of recurring clients receive the same cleaner at every scheduled appointment."
  },
  {
    question: "How do you manage building access for Edgewater apartments?",
    answer: "Building access details — fob codes, lobby access, security requirements — are collected at initial booking, stored against your property, and used by your cleaner on every visit without you resending them."
  },
  {
    question: "Are your products eco-friendly and safe on period surfaces?",
    answer: "Yes — eco-friendly products are used throughout. Appropriate low-moisture methods are applied on original timber floors and heritage surfaces in Maribyrnong's period homes."
  },
  {
    question: "Do you offer end-of-lease cleaning in Maribyrnong?",
    answer: "Yes — vacate and end-of-lease cleaning is available across Maribyrnong, including Edgewater Estate apartments. Fixed pricing and a bond-back guarantee. Get a separate vacate quote online."
  }
];

const testimonials = [
  { text: "Honestly felt like a brand new home.", author: "Andre B", suburb: "Maribyrnong" },
  { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L", suburb: "Maribyrnong" },
  { text: "Fantastic service, very thorough and professional. The team was punctual and left the place spotless.", author: "Kaan S", suburb: "Maribyrnong" },
  { text: "The cleaner always does an amazing job on our hardwood floors. Highly recommend.", author: "Sarah M", suburb: "Edgewater Estate" },
  { text: "So easy to deal with and they manage the apartment building access perfectly.", author: "James T", suburb: "Maribyrnong" }
];

/* ══════════════════════════════════════════════════════
   2. HELPER COMPONENTS
══════════════════════════════════════════════════════ */

const ScrollReveal = ({ children, className = "", delay = 0, y = 30 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideInCard = ({ children, className = "", direction = "left", delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════════════════════
   3. DRAG CAROUSEL
══════════════════════════════════════════════════════ */
const DragCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDown(true);
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown || !trackRef.current) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full">
      <div className="text-[11px] text-[#9ca3af] tracking-[0.15em] uppercase text-center mb-4">
        ← drag to explore →
      </div>
      <div 
        ref={trackRef}
        className={`flex gap-[20px] overflow-x-hidden relative py-4 px-4 -mx-4 ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {testimonials.map((review, idx) => (
          <div 
            key={idx} 
            className="bg-[#ffffff] border border-[#e5e7eb] rounded-[16px] p-[28px] border-t-[3px] border-t-[#FB8C42] min-w-[340px] flex-shrink-0 shadow-sm"
          >
            <div className="text-[48px] text-[#FB8C42] opacity-20 font-serif leading-none h-[30px]">"</div>
            <p className="text-justify text-[15px] text-[#374151] line-height-[1.7] italic mb-6">
              {review.text}
            </p>
            <div className="mt-auto">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FB8C42] text-[#FB8C42]" />
                ))}
              </div>
              <p className="text-justify text-[14px] font-[600] text-[#1a1a1a]">{review.author}</p>
              <p className="text-justify text-[12px] text-[#6b7280]">{review.suburb}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   4. MAIN COMPONENT
══════════════════════════════════════════════════════ */

const mapContentData = {
  1: {
    tag: "Mitchell Street · Period Homes",
    h3: "Californian Bungalows and Established Homes Near Mitchell Street",
    body: "The Californian bungalows concentrated near Mitchell Street and Chifley Drive — many built in the post-war period on land associated with the former Maribyrnong ordnance factory estate — have original timber floors, brick construction, and a residential character typical of Melbourne's better inner-western suburbs. These homes benefit from a cleaner who knows the property; period surfaces respond better to consistent, knowledgeable care than to rotating service.",
    tags: ["Original timber floors", "Period surfaces", "Brick construction", "Consistent care"]
  },
  2: {
    tag: "Edgewater Boulevard · Riverside",
    h3: "Edgewater Estate Apartments and Riverfront Townhouses",
    body: "Edgewater Estate — the riverside residential precinct on Edgewater Boulevard — contains apartments, townhouses, and a self-contained commercial precinct facing the Maribyrnong River valley. Building access coordination is required for apartment buildings within the estate; we manage this in advance of every visit so residents aren't handling access logistics themselves before each clean. Stone benchtops, modern bathrooms, and open-plan layouts define the interiors.",
    tags: ["Building access managed", "Stone benchtops", "Open-plan layouts", "Riverfront views"]
  },
  3: {
    tag: "Waterford Green · New Builds",
    h3: "Waterford Green and Newer Riverside Development Properties",
    body: "Waterford Green and the Riverbank Estate represent the suburb's most recent residential development — townhouses and larger family homes built on former defence land with modern specifications throughout. These newer builds have a different cleaning profile to the established Mitchell Street bungalows; the same fixed-pricing framework handles both with pricing that reflects each property's actual room count and layout.",
    tags: ["Modern specifications", "Fixed-pricing framework", "Former defence land", "Family townhouses"]
  }
};

export default function MaribyrnongClient() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .cta-left-panel { clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); }
        .cta-right-panel { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); }
        .hero-line { overflow: hidden; }
        .hero-line span { display: block; animation: revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; transform: translateY(100%); }
        .line-1 span { animation-delay: 0s; }
        .line-2 span { animation-delay: 0.12s; }
        .line-3 span { animation-delay: 0.24s; }
        @keyframes revealUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FDFAF6] min-h-[90vh] flex flex-col justify-center relative">
        <div className="container mx-auto px-6 max-w-7xl pt-[120px] pb-[80px]">
          <div className="flex flex-col md:flex-row items-center gap-[48px]">
            {/* Left Column */}
            <div className="w-full md:w-[55%]">
              <div className="text-[12px] text-[#9ca3af] mb-[24px]">
                Home › House Cleaning Maribyrnong
              </div>

              <div className="inline-block bg-[#fff7ed] border border-[#fed7aa] text-[#FB8C42] text-[11px] font-[600] tracking-[0.12em] uppercase rounded-full px-4 py-1.5 mb-[20px]">
                ● House Cleaning · Maribyrnong · Melbourne's West
              </div>

              <h1 className="text-[38px] md:text-[56px] font-[800] text-[#1a1a1a] leading-[1.05] tracking-[-0.03em] flex flex-col">
                <span className="hero-line line-1"><span>Professional House</span></span>
                <span className="hero-line line-2"><span>Cleaning in</span></span>
                <span className="hero-line line-3"><span className="text-[#FB8C42]">Maribyrnong</span></span>
              </h1>

              <p className="text-justify text-[16px] text-[#6b7280] leading-[1.7] mt-[24px] max-w-[540px]">
                Maribyrnong's housing tells two distinct stories. The Californian bungalows and established homes on the flat residential streets near Mitchell Street represent the suburb's original character — generous blocks, period detailing, long-tenure families who value consistency in their home maintenance. The Edgewater Estate apartments and Waterford Green townhouses along the Maribyrnong River represent the suburb's transformation — modern layouts, riverfront views, younger professional households. Crisp Cleaning services all of Maribyrnong with fixed pricing by actual room count, eco-friendly products appropriate for each surface type, and the same cleaner every visit across both the established and the newer residential precincts.
              </p>

              <div className="mt-[24px] flex flex-wrap gap-[8px]">
                {["⭐ 4.9 on Google", "97% Same Cleaner", "Eco-Friendly Products", "72hr Re-clean Guarantee"].map((pill, i) => (
                  <div key={i} className="bg-[#ffffff] border border-[#e5e7eb] rounded-full px-[14px] py-[6px] text-[12px] text-[#374151] shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-1.5">
                    {i > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-[#FB8C42]" />}
                    {pill}
                  </div>
                ))}
              </div>

              <div className="mt-[28px] flex flex-col sm:flex-row items-start sm:items-center gap-[12px]">
                <a href="/#booking" className="group bg-[#FB8C42] text-white rounded-full px-[28px] py-[14px] text-[15px] font-[600] shadow-[0_8px_24px_rgba(217,119,6,0.25)] hover:bg-[#ea6309] hover:-translate-y-[1px] transition-all duration-200 flex items-center gap-2">
                  Get an Instant Quote 
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
                <a href="#included" className="border-[1.5px] border-[#e5e7eb] text-[#374151] rounded-full px-[24px] py-[14px] text-[15px] hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors">
                  See what's included
                </a>
              </div>
              <div className="text-[12px] text-[#9ca3af] mt-[10px]">
                15% off your first clean. Fixed price, no hourly surprises.
              </div>
            </div>

            {/* Right Column */}
            <div className="hidden md:block w-full md:w-[45%]">
              <div className="w-full h-[520px] relative">
                <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                  <img 
                    src="/images/house-cleaning-maribyrnong.png" 
                    alt="Clean home interior in Maribyrnong Melbourne"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <div className="absolute bottom-[-20px] left-[-20px] bg-[#ffffff] rounded-[16px] p-[16px_20px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] flex items-center gap-[12px] z-10">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#fff7ed] flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-5 h-5 text-[#FB8C42]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-[800] text-[#1a1a1a] leading-none mb-1">97%</div>
                    <div className="text-[12px] text-[#6b7280] leading-none">Same cleaner, every visit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #FB8C42, transparent)' }}></div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — PROOF STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[40px] border-b border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e5e7eb]">
            <div className="text-center px-4">
              <div className="text-[32px] font-[800] text-[#1a1a1a] leading-none mb-1">4.9 ★</div>
              <div className="text-[12px] text-[#6b7280]">Google rating</div>
              <div className="text-[11px] text-[#FB8C42] font-[600] mt-1">Maribyrnong</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[32px] font-[800] text-[#1a1a1a] leading-none mb-1">97%</div>
              <div className="text-[12px] text-[#6b7280]">Same cleaner</div>
              <div className="text-[11px] text-[#FB8C42] font-[600] mt-1">every visit</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[32px] font-[800] text-[#1a1a1a] leading-none mb-1">100%</div>
              <div className="text-[12px] text-[#6b7280]">Eco-friendly</div>
              <div className="text-[11px] text-[#FB8C42] font-[600] mt-1">products</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[32px] font-[800] text-[#1a1a1a] leading-none mb-1">Fixed</div>
              <div className="text-[12px] text-[#6b7280]">Pricing</div>
              <div className="text-[11px] text-[#FB8C42] font-[600] mt-1">always</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — DUAL TRACK PROPERTY LAYOUT (MAP HOTSPOT)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-[80px] overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <ScrollReveal>
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Maribyrnong's Housing Stock
            </span>
            <h2 className="text-[36px] font-[700] text-[#1a1a1a] mb-[24px]">
              Cleaning Every Property Type in Maribyrnong — Period Homes to Riverside Apartments
            </h2>
            <p className="text-justify text-[16px] text-[#6b7280] leading-[1.7] max-w-[800px] mb-[48px]">
              The Maribyrnong River corridor separates the suburb's two residential characters geographically — the period-home streets in the established residential zone east of the river, and the Edgewater and Waterford Green estate developments facing the river valley. Crisp services properties across both sides with pricing and product selection appropriate to each.
            </p>
          </ScrollReveal>

          {/* Map & Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] items-center rounded-[20px] bg-[#ffffff] md:bg-transparent shadow-sm md:shadow-none border border-[#e5e7eb] md:border-none overflow-hidden">
            
            {/* LEFT — SVG Map panel */}
            <div className="hidden md:block bg-[#f1f5f9] rounded-[20px] p-[40px] h-[500px] relative overflow-hidden">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <style>
                  {`
                    @keyframes riverFlow {
                      to { stroke-dashoffset: -30; }
                    }
                    @keyframes pulse {
                      0% { r: 12px; opacity: 0.6; }
                      100% { r: 24px; opacity: 0; }
                    }
                  `}
                </style>
                {/* Suburb boundary outline */}
                <path 
                  d="M 50 100 Q 150 50 250 80 T 450 150 Q 480 300 400 450 T 150 480 Q 50 400 50 100 Z" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="1.5"
                />

                {/* River path — animated */}
                <path 
                  d="M250,0 C220,100 280,150 250,200 C220,250 280,300 250,350 C220,400 250,500 250,500"
                  fill="none"
                  stroke="#bfdbfe"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="20 10"
                  style={{ animation: 'riverFlow 3s linear infinite' }}
                />

                {/* River label */}
                <text x="210" y="50" fontSize="10" fill="#93c5fd" letterSpacing="0.1em" transform="rotate(75, 210, 50)">
                  Maribyrnong River
                </text>

                {/* Street labels */}
                <text x="100" y="220" fontSize="9" fill="#94a3b8">Mitchell Street</text>
                <text x="340" y="150" fontSize="9" fill="#94a3b8">Edgewater Blvd</text>
                <text x="130" y="320" fontSize="9" fill="#94a3b8">Chifley Drive</text>
                <text x="310" y="380" fontSize="9" fill="#94a3b8">Waterford Green</text>

                {/* Pins */}
                {[
                  { id: 1, cx: 160, cy: 200, label: "Mitchell Street" },
                  { id: 2, cx: 320, cy: 180, label: "Edgewater Estate" },
                  { id: 3, cx: 290, cy: 340, label: "Waterford Green" }
                ].map((pin) => (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer map-pin" 
                    onClick={() => setActivePin(pin.id)}
                    style={{ 
                      transform: activePin === pin.id ? 'scale(1.3)' : 'scale(1)', 
                      transformOrigin: `${pin.cx}px ${pin.cy}px`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <circle 
                      cx={pin.cx} 
                      cy={pin.cy} 
                      style={{ animation: activePin === pin.id ? 'pulse 1s infinite' : 'pulse 2s infinite' }}
                      fill="rgba(217,119,6,0.2)"
                    />
                    <circle cx={pin.cx} cy={pin.cy} r="8" fill="#FB8C42"/>
                    <g transform={`translate(${pin.cx - 30}, ${pin.cy - 25})`}>
                      <rect width="60" height="16" rx="8" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
                      <text x="30" y="11" fontSize="8" fontWeight="600" fill="#1a1a1a" textAnchor="middle">{pin.label}</text>
                    </g>
                  </g>
                ))}
              </svg>
            </div>

            {/* Mobile Nav Pills */}
            <div className="md:hidden flex gap-2 overflow-x-auto p-4 bg-[#f8fafc] border-b border-[#e5e7eb] snap-x">
              {[
                { id: 1, label: "Mitchell Street" },
                { id: 2, label: "Edgewater Estate" },
                { id: 3, label: "Waterford Green" }
              ].map(pin => (
                <button 
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-[600] snap-center transition-colors ${
                    activePin === pin.id ? 'bg-[#FB8C42] text-white' : 'bg-white border border-[#e5e7eb] text-[#374151]'
                  }`}
                >
                  {pin.label}
                </button>
              ))}
            </div>

            {/* RIGHT — Content reveal panel */}
            <div className="bg-[#ffffff] md:rounded-[20px] p-[32px] md:p-[40px] h-auto min-h-[400px] md:h-[500px] md:border border-[#e5e7eb] relative overflow-hidden flex flex-col justify-center w-full">
              
              {!activePin && (
                <div className="text-center flex flex-col items-center justify-center h-full opacity-60">
                  <MapPin className="w-16 h-16 text-[#f3f4f6] mb-4" />
                  <p className="text-justify text-[14px] text-[#9ca3af]">Select a location on the map<br/>to explore property types</p>
                </div>
              )}

              {activePin && (
                <div 
                  className="content-panel h-full flex flex-col justify-center"
                  style={{
                    animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) forwards'
                  }}
                  key={activePin}
                >
                  <style>
                    {`
                      @keyframes slideInRight {
                        from { transform: translateX(30px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                      }
                      @media (prefers-reduced-motion: reduce) {
                        .content-panel { animation: none !important; opacity: 1 !important; transform: none !important; }
                      }
                    `}
                  </style>
                  <div>
                    <div className="inline-block bg-[#fff7ed] text-[#FB8C42] rounded-full px-[12px] py-[4px] text-[11px] font-[600] mb-[12px]">
                      {mapContentData[activePin as keyof typeof mapContentData].tag}
                    </div>
                    <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-[16px] leading-[1.3]">
                      {mapContentData[activePin as keyof typeof mapContentData].h3}
                    </h3>
                    <p className="text-justify text-[14px] text-[#6b7280] leading-[1.75] mb-[24px]">
                      {mapContentData[activePin as keyof typeof mapContentData].body}
                    </p>
                    <div className="flex flex-wrap gap-[8px]">
                      {mapContentData[activePin as keyof typeof mapContentData].tags.map((tag, i) => (
                        <span key={i} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-[12px] py-[4px] text-[12px] text-[#374151]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation dots at bottom */}
              <div className="absolute bottom-[24px] left-0 w-full flex justify-center gap-2">
                {[1, 2, 3].map((dot) => (
                  <button 
                    key={dot}
                    onClick={() => setActivePin(dot)}
                    className={`w-[8px] h-[8px] rounded-full transition-colors ${activePin === dot ? 'bg-[#FB8C42]' : 'bg-[#e5e7eb]'}`}
                    aria-label={`View location ${dot}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — WHAT'S INCLUDED
      ══════════════════════════════════════════════════════ */}
      <section id="included" className="bg-[#ffffff] py-[80px]">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Scope & Checklist
            </span>
            <h2 className="text-[36px] font-[700] text-[#1a1a1a] mb-6">
              What's Included in Your Maribyrnong Clean
            </h2>
            <p className="text-justify text-[15px] text-[#6b7280] leading-[1.7] max-w-[700px] mb-[48px]">
              Every Maribyrnong clean covers the documented scope for your property's room count and service type. The checklist doesn't vary between visits — consistent application of the same scope to the same property is the operational foundation of a genuinely consistent result across both property types in this suburb.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[32px] h-full">
                <UtensilsCrossed className="w-[32px] h-[32px] text-[#FB8C42] mb-6" />
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-4 leading-[1.2]">
                  Kitchen Sanitisation and Appliance Surfaces
                </h3>
                <p className="text-justify text-[14px] text-[#6b7280] leading-[1.6] mb-6">
                  Benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned on every visit. Maribyrnong's period kitchens in the Mitchell Street bungalows differ significantly from the Edgewater apartments' modern stone-and-stainless configurations; the same scope applies correctly to both without a separate service tier for each.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Stovetop & rangehood", "Splashback & sink", "Period & modern kitchens", "Appliance exteriors"].map(p => (
                    <span key={p} className="bg-[#fef3c7] text-[#92400e] text-[11px] font-[600] px-3 py-1.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[#1a1a1a] rounded-[16px] p-[32px] h-full text-white">
                <Bath className="w-[32px] h-[32px] text-[#FB8C42] mb-6" />
                <h3 className="text-[20px] font-[700] text-white mb-4 leading-[1.2]">
                  Bathroom Cleaning and Fixture Polishing
                </h3>
                <p className="text-justify text-[14px] text-[rgba(255,255,255,0.65)] leading-[1.6] mb-6">
                  All bathrooms — shower or bath recess, toilet, basin, mirror, tapware, and tiled floor — are sanitised and polished on every visit. For Edgewater apartments with contemporary tiled bathrooms and for older Maribyrnong homes with period-era fittings, appropriate cleaning methods and product choices are applied to each surface type.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["All bathrooms sanitised", "Contemporary tiles", "Period-era fittings", "Tapware polished"].map(p => (
                    <span key={p} className="bg-[rgba(217,119,6,0.15)] text-[#fbbf24] text-[11px] font-[600] px-3 py-1.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#0c4a6e] rounded-[16px] p-[32px] h-full text-white">
                <Layers className="w-[32px] h-[32px] text-[#FB8C42] mb-6" />
                <h3 className="text-[20px] font-[700] text-white mb-4 leading-[1.2]">
                  Floor Care, Living Areas and Laundry
                </h3>
                <p className="text-justify text-[14px] text-[rgba(255,255,255,0.65)] leading-[1.6] mb-6">
                  Hard floors throughout are swept and mopped; carpeted areas are vacuumed including under accessible furniture. Living and dining areas, surfaces, skirting boards, and accessible shelf areas are dusted and wiped. The laundry is included as standard across all Maribyrnong property types — standalone laundry room or apartment laundry cupboard.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Hard floors swept & mopped", "Carpets vacuumed", "Living & dining areas", "Laundry included"].map(p => (
                    <span key={p} className="bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)] text-[11px] font-[600] px-3 py-1.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.4}>
              <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-[32px] h-full">
                <Key className="w-[32px] h-[32px] text-[#FB8C42] mb-6" />
                <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-4 leading-[1.2]">
                  Building Access Coordination for Edgewater Apartments
                </h3>
                <p className="text-justify text-[14px] text-[#6b7280] leading-[1.6] mb-6">
                  Edgewater Estate apartment buildings have varying access requirements. Access details — fob codes, lobby entry, security requirements — are collected at the initial booking, stored against the property, and used by the same cleaner on every subsequent visit without you resending instructions or coordinating access manually before each appointment.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Fob codes stored", "Access coordinated", "No repeat instructions", "Every visit managed"].map(p => (
                    <span key={p} className="bg-[#fef3c7] text-[#92400e] text-[11px] font-[600] px-3 py-1.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — RIVER DIVIDER
      ══════════════════════════════════════════════════════ */}
      <section className="w-full h-[80px] bg-[#ffffff] p-0 m-0 relative overflow-hidden">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
          <path d="M0,20 C240,60 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z" fill="#fafafa"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-[#FB8C42] tracking-[0.2em] uppercase font-[600]">Maribyrnong River</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — WHY CRISP
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-[80px] overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <ScrollReveal>
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              The Crisp Difference
            </span>
            <h2 className="text-[36px] font-[700] text-[#1a1a1a] mb-6">
              Why Maribyrnong Residents Choose Crisp
            </h2>
            <p className="text-justify text-[15px] text-[#6b7280] leading-[1.7] max-w-[700px]">
              Maribyrnong carries 500 annual searches at a medium competition index — the strongest data profile of the suburbs promoted to Tier A. There is genuine, measurable search demand here, and the suburb's diversity of housing types means there's a real gap for a service that prices and operates accurately across all of them.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mt-[48px]">
            <SlideInCard direction="left" delay={0}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[16px] p-[24px] border-t-[3px] border-t-[#FB8C42] h-full shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[28px] font-[800] text-[#FB8C42] leading-none">97%</span>
                  <span className="text-[11px] text-[#9ca3af]">same-cleaner rate</span>
                </div>
                <h3 className="text-[14px] font-[700] text-[#1a1a1a] mb-[8px] mt-[12px] leading-[1.4]">
                  Same Cleaner for Period Homes and Modern Riverside Apartments Alike
                </h3>
                <p className="text-justify text-[13px] text-[#6b7280] leading-[1.6]">
                  Your cleaner is matched to your property at booking and returns on every scheduled visit — whether it's a Californian bungalow near Mitchell Street or a riverfront apartment in Edgewater. Both types of Maribyrnong resident benefit from the same-cleaner model: consistent knowledge of the property without re-briefing each time. Our 97% same-cleaner continuity rate applies across both property segments.
                </p>
              </div>
            </SlideInCard>

            <SlideInCard direction="right" delay={0.1}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[16px] p-[24px] border-t-[3px] border-t-[#0c4a6e] h-full shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[28px] font-[800] text-[#0c4a6e] leading-none">Fixed</span>
                </div>
                <h3 className="text-[14px] font-[700] text-[#1a1a1a] mb-[8px] mt-[12px] leading-[1.4]">
                  Fixed, Room-Count Pricing That Handles Every Property Type Accurately
                </h3>
                <p className="text-justify text-[13px] text-[#6b7280] leading-[1.6]">
                  A two-bedroom Edgewater apartment is priced differently to a four-bedroom period home on Chifley Drive — because they require different amounts of time and scope. Pricing is set by your home's actual layout, not a single Maribyrnong rate applied regardless of what the property requires. Get an exact quote online.
                </p>
              </div>
            </SlideInCard>

            <SlideInCard direction="left" delay={0.2}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[16px] p-[24px] border-t-[3px] border-t-[#FB8C42] h-full shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[28px] font-[800] text-[#FB8C42] leading-none">Zero</span>
                  <span className="text-[11px] text-[#9ca3af]">access hassle</span>
                </div>
                <h3 className="text-[14px] font-[700] text-[#1a1a1a] mb-[8px] mt-[12px] leading-[1.4]">
                  Edgewater and Waterford Green Estate Access Managed Before Every Visit
                </h3>
                <p className="text-justify text-[13px] text-[#6b7280] leading-[1.6]">
                  Building access in Edgewater Estate doesn't require manual coordination by residents before each clean. Access details are collected at your initial booking and managed as a standing arrangement for the assigned cleaner on every visit — no access codes to resend, no instructions to repeat, no logistics to manage on the morning of the clean.
                </p>
              </div>
            </SlideInCard>

            <SlideInCard direction="right" delay={0.3}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[16px] p-[24px] border-t-[3px] border-t-[#1a1a1a] h-full shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[28px] font-[800] text-[#1a1a1a] leading-none">60sec</span>
                  <span className="text-[11px] text-[#9ca3af]">to book online</span>
                </div>
                <h3 className="text-[14px] font-[700] text-[#1a1a1a] mb-[8px] mt-[12px] leading-[1.4]">
                  Instant Online Booking in Under a Minute
                </h3>
                <p className="text-justify text-[13px] text-[#6b7280] leading-[1.6]">
                  Get an exact quote and complete your booking in under 60 seconds online. Cleaner assignment confirmed by return. 15% off the first clean, and loyalty rewards that accumulate from the second month of regular bookings onward.
                </p>
              </div>
            </SlideInCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase block mb-3">
              Transparent Pricing
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#1a1a1a] mb-4 leading-[1.1]">
              Maribyrnong House Cleaning Prices
            </h2>
            <p className="text-justify text-[16px] text-[#6b7280]">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <ScrollReveal delay={0.1}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
                <p className="text-justify text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">Regular clean</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[14px] text-[#6b7280] font-[500]">From </span>
                  <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none">$180</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Up to 3 bed</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All bathrooms</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Eco products included</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative z-10">
              <div className="bg-[#0f172a] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-100 md:scale-[1.04] border border-[rgba(255,255,255,0.1)]">
                <div className="absolute top-4 right-4 bg-[#fef3c7] text-[#92400e] text-[10px] font-[800] uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Most popular in Maribyrnong
                </div>
                <p className="text-justify text-[12px] font-[900] uppercase tracking-[0.15em] text-[rgba(255,255,255,0.7)] mb-3">Deep clean</p>
                <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.1)]">
                  <span className="text-[14px] text-[rgba(255,255,255,0.6)] font-[500]">From </span>
                  <span className="text-[40px] font-[800] text-[#ffffff] leading-none">$320</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Full property scope</li>
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Oven & inside cabinets</li>
                  <li className="flex items-center gap-3 text-[13px] text-[rgba(255,255,255,0.8)] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Grout & hard-to-reach areas</li>
                </ul>
                <a href="/#booking" className="block w-full text-center mt-8 bg-[#FB8C42] text-white rounded-full py-3 text-[14px] font-[600] hover:bg-[#ea6309] transition-colors">
                  Get quote
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[24px] p-8 shadow-sm">
                <p className="text-justify text-[12px] font-[900] uppercase tracking-[0.15em] text-[#374151] mb-3">End of lease</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[40px] font-[800] text-[#1a1a1a] leading-none text-[28px] mt-1 block">Fixed quote</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Bond-back standard</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All rooms & surfaces</li>
                  <li className="flex items-center gap-3 text-[13px] text-[#4b5563] font-[500]"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Inspection ready</li>
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — TESTIMONIALS (BESPOKE)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-[120px] text-white">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-[64px] items-start">
            
            {/* Sticky Left Column */}
            <div className="w-full md:w-[40%] md:sticky md:top-[120px]">
              <ScrollReveal>
                <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.2em] uppercase block mb-4">
                  Client Stories
                </span>
                <h2 className="text-[40px] md:text-[48px] font-[800] text-[#ffffff] mb-8 leading-[1.1] tracking-[-0.02em]">
                  Trusted by<br/>Maribyrnong.
                </h2>
                <p className="text-[16px] text-[rgba(255,255,255,0.6)] leading-[1.6] mb-8 max-w-[340px]">
                  See why local residents choose Crisp for their regular cleaning.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FB8C42] text-[#FB8C42]" />
                    ))}
                  </div>
                  <div className="text-[14px] font-[600] text-[#ffffff]">
                    4.9/5 <span className="text-[rgba(255,255,255,0.4)] font-[400] ml-1">Google Reviews</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column Scrolling Reviews */}
            <div className="w-full md:w-[60%] flex flex-col gap-[24px]">
              {[
                { 
                  text: "Crisp has been cleaning our home for over a year. The same cleaner comes every fortnight and does a brilliant job every single time. Incredibly consistent.", 
                  author: "Sarah M.", 
                  area: "Verified Customer", 
                  delay: 0.1 
                },
                { 
                  text: "Living in an apartment, it's always a pain coordinating access for trades. Crisp just handles it. They have our building codes on file and just show up and get straight to work. The flat pricing is a breath of fresh air.", 
                  author: "James L.", 
                  area: "Verified Customer", 
                  delay: 0.2 
                },
                { 
                  text: "Switched to Crisp after our last cleaner kept sending different people. The 97% same-cleaner guarantee is real. Highly recommend them for anyone looking for a reliable service.", 
                  author: "Emma T.", 
                  area: "Verified Customer", 
                  delay: 0.3 
                }
              ].map((review, i) => (
                <ScrollReveal key={i} delay={review.delay}>
                  <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-[40px] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#FB8C42] text-[#FB8C42]" />
                      ))}
                    </div>
                    <p className="text-[18px] md:text-[20px] text-[rgba(255,255,255,0.9)] leading-[1.6] font-[500] mb-8 text-justify">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-[48px] h-[48px] rounded-full bg-[rgba(217,119,6,0.2)] flex items-center justify-center text-[#FB8C42] font-[700] text-[18px]">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[15px] font-[700] text-[#ffffff]">{review.author}</div>
                        <div className="text-[13px] text-[rgba(255,255,255,0.4)]">{review.area}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] py-[80px]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] p-[80px_32px] w-full flex flex-col items-center text-center">
        <ScrollReveal className="flex flex-col items-center w-full">
          <span className="text-[11px] font-[600] text-[#FB8C42] tracking-[0.15em] uppercase mb-[16px] block">
            Ready to Book
          </span>
          
          <h2 className="text-[48px] font-[800] text-[#ffffff] leading-[1.1] mb-[16px]">
            Book a Cleaner in <span className="text-[#FB8C42]">Maribyrnong</span>
          </h2>

          <p className="text-justify text-[16px] text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-[8px] text-center leading-[1.6]">
            Get an instant fixed quote for your Maribyrnong home or apartment — period home, Edgewater estate, or anything in between. Book online in under a minute.
          </p>

          <span className="text-[#FB8C42] font-[600] text-[14px] block mb-[28px]">
            15% off your first clean.
          </span>

          <div className="flex flex-col sm:flex-row gap-[12px] justify-center">
            <a href="/#booking" className="bg-[#FB8C42] text-white rounded-full px-[28px] py-[14px] text-[14px] font-[600] hover:bg-[#ea6309] transition-colors inline-block">
              Get an Instant Quote
            </a>
            <a href="tel:0451433786" className="border border-[rgba(255,255,255,0.2)] text-white rounded-full px-[28px] py-[14px] text-[14px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors inline-block">
              Call us: 0451 433 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-[#FB8C42] mx-auto mt-[40px] mb-[24px]"></div>

          <span className="text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.15em] uppercase mb-[14px] block">
            Nearby Areas We Also Service
          </span>

          <div className="flex flex-wrap justify-center gap-[8px]">
            {["Essendon", "Footscray", "Moonee Ponds", "Strathmore", "Yarraville"].map(suburb => (
              <a 
                key={suburb} 
                href={`/house-cleaning-${suburb.toLowerCase().replace(' ', '-')}`}
                className="group relative px-[16px] py-[6px] text-[13px] font-[500] text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full hover:border-[#FB8C42] hover:text-[#FB8C42] transition-colors flex items-center overflow-hidden"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-2">{suburb}</span>
                <ArrowRight className="w-3 h-3 absolute right-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
