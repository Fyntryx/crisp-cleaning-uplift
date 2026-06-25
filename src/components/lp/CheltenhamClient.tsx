"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle2, Star, ArrowRightLeft } from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import Breadcrumbs from "@/components/Breadcrumbs";

// ─── Scroll Reveal Helper ──────────────────────────────────────────
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  fromY = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fromY?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: fromY }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: fromY }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const faqData = [
  {
    question: "Do you service homes across the full Cheltenham and Sandbelt corridor?",
    answer: "Yes — all of Cheltenham, including properties toward the Kingston Heath and Victoria Golf Club precincts and the streets near Cheltenham Station and Charman Road.",
  },
  {
    question: "How much does house cleaning cost in Cheltenham?",
    answer: "Pricing is set by your home's room count and service type. Cheltenham's larger family homes are priced proportionally. Get an exact quote online in under a minute.",
  },
  {
    question: "Can I book a regular fortnightly cleaner in Cheltenham?",
    answer: "Yes. Select your preferred frequency when you book and the same cleaner returns on that schedule. Weekly, fortnightly, and monthly options are all available at fixed pricing.",
  },
  {
    question: "Do you clean larger family homes?",
    answer: "Yes — larger four and five-bedroom homes are priced accurately for their scope within our fixed pricing system, not squeezed into a standard hourly rate that doesn't scale appropriately.",
  },
  {
    question: "Are products supplied for every clean?",
    answer: "Yes — eco-friendly products are included in every clean at no additional charge. If you have specific product preferences or sensitivities, advise us at booking.",
  },
  {
    question: "What's included in a standard house clean?",
    answer: "Kitchen surfaces, all bathrooms, floors throughout, bedrooms, living areas, and laundry. Your instant quote specifies exactly what's covered for your home's layout before you confirm.",
  },
];

const CheltenhamBeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 shadow-sm border border-gray-200 select-none cursor-ew-resize touch-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/sparkling-clean-kitchen.webp" 
          alt="After cleaning" 
          fill 
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#d97706] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          After
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src="/images/dirty-kitchen-before-cleaning.webp" 
          alt="Before cleaning" 
          fill 
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Before
        </div>
      </div>

      {/* Orange Divider Line */}
      <div className="absolute top-0 bottom-0 w-[3px] bg-[#d97706] z-20 pointer-events-none transform -translate-x-1/2" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#d97706] rounded-full flex items-center justify-center shadow-lg transition-transform text-white">
          <ArrowRightLeft className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default function CheltenhamClient({
  googleRatingValue = 5.0,
}: {
  googleRatingValue?: number;
}) {
  const tickerText = "Same Cleaner Every Visit · Fixed Pricing · Eco-Friendly Products · 72hr Guarantee · Established Families · Sandbelt Corridor · Cheltenham · No Hourly Surprises · Book in 60 Seconds · ";

  return (
    <div className="overflow-x-hidden text-gray-900 bg-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-ticker {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }
        @media (prefers-reduced-motion) {
          .animate-ticker { animation-play-state: paused; }
        }
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .bento-large-1 { grid-column: 1; grid-row: 1; }
          .bento-small-1 { grid-column: 2; grid-row: 1; }
          .bento-small-2 { grid-column: 1; grid-row: 2; }
          .bento-large-2 { grid-column: 2; grid-row: 2; }
        }
        .nearby-pill .arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.15s ease;
        }
        .nearby-pill:hover .arrow {
          opacity: 1;
        }
        .hero-gradient {
          background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.2) 100%);
        }
        @media (min-width: 768px) {
          .hero-gradient {
            background: linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%);
          }
        }
      `}} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex min-h-[85vh]">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/House-Cleaning Cheltenham.jpg"
            alt="Warm modern bright Australian home interior"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 hero-gradient" />

        {/* Vertical Ghost Text */}
        <div className="absolute top-0 right-4 md:right-12 h-full flex items-center z-10 pointer-events-none select-none opacity-[0.15] overflow-hidden">
          <span 
            className="font-[900] tracking-tighter leading-none"
            style={{ 
              writingMode: 'vertical-rl', 
              fontSize: 'min(160px, 15vw)',
              WebkitTextStroke: '2px #d97706',
              color: 'transparent'
            }}
          >
            CHELTENHAM
          </span>
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-20 flex flex-col justify-center w-full pt-[120px] pb-[100px]">
          <div className="max-w-[600px] text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d97706]/15 border border-[#d97706]/30 text-[#d97706] text-[10px] font-bold tracking-[0.18em] uppercase mb-8 max-w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
              House Cleaning · Cheltenham · Sandbelt
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-[44px] md:text-[64px] font-[800] text-white leading-[1.05] tracking-[-0.03em]"
            >
              <span className="block">House Cleaning</span>
              <span className="relative inline-block text-[#d97706] z-10">
                Cheltenham
              </span>
              <span className="block mt-2">Melbourne</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] text-white/65 leading-[1.75] mt-[24px]"
            >
              Cheltenham sits in Melbourne's Sandbelt corridor — a family suburb of established brick homes, generous blocks, and a quiet residential character built around the railway station and the Charman Road shopping strip. It doesn't generate the headlines that Brighton or Toorak do, but it has a consistent, owner-occupier-heavy demographic that values reliable cleaning over cheap cleaning. Crisp services Cheltenham homes with fixed, scope-based pricing set by your actual room count, the same cleaner returning every visit, and an instant online quote that takes under a minute to generate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4 mt-[32px] mb-4"
            >
              <a
                href="/#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-[28px] py-[12px] rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-[15px] transition-all duration-300"
              >
                Get an Instant Quote
              </a>
              <a
                href="#checklist"
                className="w-full sm:w-auto inline-flex items-center justify-center px-[28px] py-[12px] rounded-full bg-transparent border border-white/20 text-white font-semibold text-[15px] hover:bg-white/5 transition-all duration-300"
              >
                See what's included
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-[12px] text-white/40 font-medium"
            >
              15% off your first clean. Fixed price, no hourly surprises.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — SCROLLING TICKER
      ══════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#111111] border-b border-white/10 py-[16px] overflow-hidden flex items-center">
        <div className="whitespace-nowrap">
          <div className="animate-ticker text-[12px] font-[500] text-gray-400 tracking-[0.08em] uppercase flex items-center">
            {/* Render exactly 1 copy as requested */}
            {[...Array(1)].map((_, i) => (
              <span key={i} className="flex items-center">
                {tickerText.split('·').map((part, j, arr) => (
                  part.trim() ? (
                    <React.Fragment key={j}>
                      {part}
                      <span className="text-[#d97706] mx-3">·</span>
                    </React.Fragment>
                  ) : null
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — PROOF STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-[32px] border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200/50 gap-y-6 md:gap-y-0">
            <div className="text-center flex flex-col items-center justify-center">
              <span className="text-[24px] font-[700] text-[#d97706] leading-none mb-1.5">4.9 ★</span>
              <span className="text-[12px] text-gray-500">Google</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center">
              <span className="text-[24px] font-[700] text-[#d97706] leading-none mb-1.5">97%</span>
              <span className="text-[12px] text-gray-500">Same Cleaner</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center border-t md:border-t-0 border-gray-200/50 pt-6 md:pt-0">
              <span className="text-[24px] font-[700] text-[#d97706] leading-none mb-1.5">100%</span>
              <span className="text-[12px] text-gray-500">Eco-Friendly</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center border-t md:border-t-0 border-gray-200/50 pt-6 md:pt-0">
              <span className="text-[24px] font-[700] text-[#d97706] leading-none mb-1.5">72hr</span>
              <span className="text-[12px] text-gray-500">Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — HERITAGE HOMES (Asymmetric)
      ══════════════════════════════════════════════════════ */}
      <section className="py-[80px] bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Cheltenham's Housing Stock
            </p>
            <h2 className="text-[36px] font-[700] text-gray-900 tracking-tight mb-5 max-w-[600px] mx-auto leading-tight">
              Cleaning Cheltenham's Family Homes — Sandbelt to the Station
            </h2>
            <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cheltenham's residential streets are predominantly established family homes built across several distinct decades — from immediate post-war brick to 1980s suburban development — with the Sandbelt golf corridor to its west and the bay suburbs to the south. The range of build year and property size is why scope-based, room-count pricing produces more accurate results here than a generic suburb-wide rate.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {/* Row 1: Large Featured Card */}
            <ScrollReveal>
              <div className="relative w-full rounded-[24px] p-8 md:p-12 overflow-hidden bg-[#1a1a1a]">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-[#d97706] rounded-[2px]" />
                <div className="absolute -bottom-6 -right-4 text-[140px] font-black text-white opacity-5 leading-none select-none pointer-events-none z-0">
                  01
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-[44px] h-[44px] rounded-xl bg-[#d97706]/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d97706]">
                      Cheltenham Residential · Post-War
                    </span>
                  </div>
                  <h3 className="text-[24px] font-[800] text-white mb-4 max-w-2xl leading-tight">
                    Established Brick Homes on Cheltenham's Residential Streets
                  </h3>
                  <p className="text-[16px] text-white/65 leading-relaxed max-w-3xl">
                    The suburb's dominant housing type is the 1950s–70s double-brick family home on a generous block — solid construction, a practical layout, and often a separate laundry or rear utility space that sits outside a standard cleaning estimate. Our fixed pricing covers the full home based on your actual room count, including utility spaces when they're within scope.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Row 2: Two Small Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Small Card 2 */}
              <ScrollReveal delay={0.1}>
                <div className="relative bg-[#fafaf8] border border-gray-200/50 rounded-[24px] p-8 overflow-hidden h-full">
                  <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-[#1a1a1a] opacity-[0.04] leading-none select-none pointer-events-none z-0">
                    02
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-[44px] h-[44px] rounded-xl bg-white border border-gray-200/50 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6"/><path d="M7 22v-4"/><path d="M17 22v-4"/><path d="M12 16a4 4 0 0 0 4-4c0-2.2-2-4-4-6-2 2-4 3.8-4 6a4 4 0 0 0 4 4z"/></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                        Sandbelt Golf Corridor
                      </span>
                    </div>
                    <h3 className="text-[16px] font-[800] text-gray-900 mb-4 leading-tight">
                      Larger Family Properties Across the Sandbelt Corridor
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      Properties near the Kingston Heath and Victoria Golf Club corridor tend toward larger footprints: four and five-bedroom homes with double garages, separate living zones, and larger kitchens. Crisp's pricing adjusts accurately to these configurations; a larger Cheltenham home is quoted proportionally, not at the same rate as a two-bedroom terrace.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Small Card 3 */}
              <ScrollReveal delay={0.2}>
                <div className="relative bg-[#fafaf8] border border-gray-200/50 rounded-[24px] p-8 overflow-hidden h-full">
                  <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-[#1a1a1a] opacity-[0.04] leading-none select-none pointer-events-none z-0">
                    03
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-[44px] h-[44px] rounded-xl bg-white border border-gray-200/50 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="15" y1="22" x2="15" y2="22"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="15" y2="14"/></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                        Charman Road · Station Precinct
                      </span>
                    </div>
                    <h3 className="text-[16px] font-[800] text-gray-900 mb-4 leading-tight">
                      Newer Townhouses and Dual-Occupancy Builds Near Charman Road
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      The Charman Road corridor and the streets near Cheltenham Station have seen progressive townhouse and dual-occupancy development. These newer builds with stone benchtops, open-plan living, and engineered floors have a different cleaning profile to the suburb's established brick homes, priced accurately within the same fixed-scope framework.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — PULL QUOTE
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#d97706] w-full py-[64px] px-[32px] text-center">
        <ScrollReveal>
          <p className="text-[24px] md:text-[32px] font-[700] text-white max-w-[800px] mx-auto leading-[1.4] italic tracking-tight">
            "Cheltenham's owner-occupier families value reliable cleaning over cheap cleaning. The same cleaner, every fortnight, who knows your home — that's what Crisp delivers."
          </p>
          <div className="mt-[16px] flex flex-wrap items-center justify-center gap-3 text-[13px] text-white/70 uppercase tracking-wider font-semibold">
            <span>Fixed pricing</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>Same cleaner</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>72hr guarantee</span>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — BENTO GRID
      ══════════════════════════════════════════════════════ */}
      <section id="checklist" className="py-[80px] bg-[#fafaf8]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Scope & Checklist
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-4">
              What Every Cheltenham Clean Includes
            </h2>
            <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed">
              Cheltenham cleans follow a fixed, documented checklist across all home types. The scope is agreed and confirmed before the cleaner arrives — there's no relying on the cleaner's judgment about what constitutes a complete job.
            </p>
          </ScrollReveal>

          <div className="bento-grid">
            {/* Cell 1: Kitchen (Large) */}
            <ScrollReveal delay={0} className="bento-large-1 h-full">
              <div className="bg-white border border-gray-200/60 rounded-[16px] p-8 h-full flex flex-col">
                <svg className="w-7 h-7 text-[#d97706] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Kitchen Surfaces and Bathroom Sanitisation</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed flex-grow">
                  Benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned to a consistent standard on every visit. All bathrooms are sanitised — shower or bath recess, toilet, basin, mirror, taps, and tiled floor scrubbed and polished. For Cheltenham's larger family homes with two bathrooms, both are included in the standard scope without an additional charge.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["All surfaces sanitised", "Both bathrooms included", "Taps & mirrors polished", "Splashback & rangehood"].map(t => (
                    <span key={t} className="px-3 py-1 bg-[#F0F7FF] border border-[#bcd4f0] text-gray-700 text-[12px] font-semibold rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Cell 2: Floors (Small) */}
            <ScrollReveal delay={0.1} className="bento-small-1 h-full">
              <div className="bg-[#1a1a1a] rounded-[16px] p-8 h-full flex flex-col">
                <svg className="w-7 h-7 text-[#d97706] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 0 0 12 2v10z"/><path d="M12 22A10 10 0 1 0 12 2v10z"/></svg>
                <h3 className="text-[18px] font-bold text-white mb-3">Vacuum, Mop and Floor Care Throughout</h3>
                <p className="text-[14px] text-white/65 leading-relaxed">
                  All carpeted rooms are vacuumed including under accessible furniture. Hard floors swept and mopped with appropriate products. Cheltenham's older homes often have a mix of carpet in bedrooms and hard floors through living areas; our scope handles both floor types within the standard clean.
                </p>
              </div>
            </ScrollReveal>

            {/* Cell 3: Entry Areas (Small) */}
            <ScrollReveal delay={0.2} className="bento-small-2 h-full">
              <div className="bg-[#fef3c7] rounded-[16px] p-8 h-full flex flex-col">
                <svg className="w-7 h-7 text-[#92400e] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>
                <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-3">Outdoor-Transition Spaces and Entry Areas</h3>
                <p className="text-[14px] text-[#78350f] leading-relaxed">
                  Entry halls, front porches, and covered transition areas between outside and inside are swept and tidied as part of the standard scope. These spaces accumulate tracked-in material faster in properties with larger blocks and they're the first thing a homeowner notices on returning.
                </p>
              </div>
            </ScrollReveal>

            {/* Cell 4: Bedrooms & Laundry (Large) */}
            <ScrollReveal delay={0.3} className="bento-large-2 h-full">
              <div className="bg-white border border-gray-200/60 rounded-[16px] p-8 h-full flex flex-col">
                <svg className="w-7 h-7 text-[#d97706] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                <h3 className="text-[20px] font-bold text-gray-900 mb-3">Bedrooms, Living Areas and Laundry</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed flex-grow">
                  Every bedroom in scope is vacuumed, surfaces dusted, and the room left to a presented standard. Living and dining areas receive the same treatment. The laundry is included as standard: surfaces wiped, appliance exteriors cleaned, floor swept or mopped. Studies or rumpus rooms are scoped and priced at booking.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["All bedrooms vacuumed", "Laundry included", "Living & dining areas", "Studies scoped at booking"].map(t => (
                    <span key={t} className="px-3 py-1 bg-[#F0F7FF] border border-[#bcd4f0] text-gray-700 text-[12px] font-semibold rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — WHY CRISP (Numbered List)
      ══════════════════════════════════════════════════════ */}
      <section className="py-[80px] bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              The Crisp Difference
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-4">
              Why Cheltenham Homeowners Choose Crisp
            </h2>
            <p className="text-[16px] text-gray-600 max-w-2xl leading-relaxed">
              Cheltenham isn't a suburb that attracts the same cleaning-market attention as Brighton or Malvern — which is exactly why the competition here is lower. That creates a genuine opportunity for a consistently quality local service. Crisp provides that consistency through three operational commitments.
            </p>
          </ScrollReveal>

          <div className="flex flex-col border-b border-gray-200/60">
            {[
              {
                num: "01",
                title: "Same Cleaner Every Fortnight — Never Starting From Scratch",
                body: "Cheltenham's homeowners tend toward long tenures — established households where the same cleaner every fortnight matters over time. Your cleaner is assigned from the first booking and returns on your schedule. They know your home's access arrangement, your preferences, and your layout by the second visit.",
                stat: "97%", label: "same-cleaner rate"
              },
              {
                num: "02",
                title: "Transparent, Fixed Pricing for Every Home Size",
                body: "Pricing is confirmed online before the first clean — based on your actual room count, not a generic Cheltenham average. A two-bedroom townhouse near the station and a five-bedroom home toward the Sandbelt are quoted accurately for what each genuinely requires.",
                stat: "Fixed", label: "pricing always"
              },
              {
                num: "03",
                title: "Eco-Friendly Products Included as Standard",
                body: "All cleaning products are eco-friendly and included in the price. No surcharge for product supply, no request to use your own materials. Particularly relevant for families with children or pets — which describes a significant proportion of Cheltenham's demographic.",
                stat: "100%", label: "eco-friendly"
              },
              {
                num: "04",
                title: "Fast Online Booking — No Phone Calls Needed",
                body: "Quote, schedule, and confirmation happen entirely online in under 60 seconds. No phone call, no email chain, no waiting for an availability response. 15% off the first clean; loyalty rewards accumulate from the second month of regular bookings.",
                stat: "60sec", label: "to book online"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col md:flex-row items-start md:items-center w-full py-[32px] border-t border-gray-200/60">
                  <div className="w-full md:w-[15%] text-[80px] font-[800] text-[#d97706] opacity-20 group-hover:opacity-60 transition-opacity duration-200 leading-none pb-4 md:pb-0">
                    {item.num}
                  </div>
                  <div className="w-full md:w-[55%] pr-0 md:pr-8">
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                  <div className="w-full md:w-[30%] flex justify-start md:justify-end mt-6 md:mt-0">
                    <div className="bg-[#fef3c7] text-[#92400e] px-5 py-2.5 rounded-full flex items-center gap-2 border border-[#f59e0b]/20">
                      <span className="font-bold text-[18px]">{item.stat}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">/ {item.label}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="py-[80px] bg-[#fafaf8]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-4">
              Cheltenham House Cleaning Prices
            </h2>
            <p className="text-[16px] text-gray-600 max-w-xl mx-auto leading-relaxed">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Regular Clean */}
            <ScrollReveal delay={0}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <p className="text-[12px] font-black uppercase tracking-widest text-gray-800 mb-3">Regular clean</p>
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="text-[14px] text-gray-500 font-medium">From </span>
                  <span className="text-[40px] font-extrabold text-gray-900 leading-none">$180</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Up to 3 bed</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> All bathrooms</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Eco products included</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Deep Clean — featured */}
            <ScrollReveal delay={0.1} className="z-10">
              <div 
                className="bg-[#14120F] rounded-[24px] p-8 relative overflow-hidden"
                style={{
                  transform: 'scale(1.04)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div 
                  className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                >
                  Most popular in Cheltenham
                </div>
                <p className="text-[12px] font-black uppercase tracking-widest text-white/70 mb-3">Deep clean</p>
                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-[14px] text-white/60 font-medium">From </span>
                  <span className="text-[40px] font-extrabold text-white leading-none">$320</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Full property scope</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Oven & inside cabinets</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Grout & hard-to-reach areas</li>
                </ul>
                <a href="/#booking" className="w-full py-3.5 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-colors">
                  Get a quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

            {/* End of Lease */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <p className="text-[12px] font-black uppercase tracking-widest text-gray-800 mb-3">End of lease</p>
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="text-[32px] font-extrabold text-gray-900 leading-tight block">Fixed quote</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Bond-back standard</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> All rooms & surfaces</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><CheckCircle2 className="w-4 h-4 text-[#d97706]" /> Inspection ready</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — LOCAL TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="py-[100px] bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 tracking-tight text-left">
              What Cheltenham Homeowners Say
            </h2>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            {/* Left Column: Before/After Image (45%) */}
            <div className="w-full md:w-[45%] shrink-0">
              <ScrollReveal delay={0.1} className="h-full">
                <CheltenhamBeforeAfterSlider />
              </ScrollReveal>
            </div>

            {/* Right Column: Reviews (55%) */}
            <div className="w-full md:w-[55%] flex flex-col gap-6 justify-center">
              {[
                { text: "Honestly felt like a brand new home.", author: "Andre B" },
                { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L" },
                { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" }
              ].map((review, idx) => (
                <ScrollReveal key={idx} delay={0.2 + (idx * 0.1)}>
                  <div className="bg-[#fafaf8] border border-gray-200/60 rounded-[20px] p-8 shadow-sm">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d97706] text-[#d97706]" />
                      ))}
                    </div>
                    <p className="text-[16px] text-gray-700 leading-relaxed font-medium italic mb-6">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900">{review.author}</p>
                      <p className="text-[13px] text-gray-500 font-medium mt-0.5">Cheltenham</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FAQ
      ══════════════════════════════════════════════════════ */}
      <FAQ data={faqData} title="Frequently Asked Questions" />

      {/* ══════════════════════════════════════════════════════
          SECTION 11 — FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-[80px] px-[32px] text-center text-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-4">
              Ready to Book
            </p>
            <h2 className="text-[48px] font-[800] leading-tight mb-6">
              Book a Cleaner in <br />
              <span className="text-[#d97706]">Cheltenham</span>
            </h2>
            <p className="text-[15px] text-white/65 max-w-xl mx-auto mb-6">
              Get an instant fixed quote for your Cheltenham home and book online in under a minute. Same cleaner every visit.
            </p>
            <p className="text-[15px] font-[600] text-[#d97706] mb-10">
              15% off your first clean.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mx-auto mb-16">
              <a
                href="/#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-[28px] py-[14px] rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-[15px] transition-all duration-300"
              >
                Get an Instant Quote
              </a>
              <a
                href="tel:0451423786"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[28px] py-[14px] rounded-full bg-transparent border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call us: 0451 423 786
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {["Brighton", "Hampton", "Sandringham", "Mentone", "Bentleigh East"].map((suburb) => (
                <Link
                  key={suburb}
                  href={`/house-cleaning-${suburb.toLowerCase().replace(' ', '-')}`}
                  className="nearby-pill group px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#d97706] hover:border-[#d97706] hover:bg-white/10 text-[13px] font-medium transition-all duration-300 flex items-center gap-1"
                >
                  {suburb}
                  <ArrowRight className="arrow w-3 h-3" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
