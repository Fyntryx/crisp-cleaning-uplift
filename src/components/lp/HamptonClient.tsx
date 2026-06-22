"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
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

// ─── Data ──────────────────────────────────────────────────────────

const faqData = [
  {
    question: "Do you service homes near Hampton Beach and the foreshore reserve?",
    answer: "Yes — all of Hampton, including the streets closest to Hampton Beach, the foreshore reserve, and the full Hampton Street corridor from the station to the beach.",
  },
  {
    question: "How much does house cleaning cost in Hampton?",
    answer: "Pricing is based on your home's room count. Beach cottages and larger period homes are priced accurately for their actual scope. Get an exact quote online in under a minute.",
  },
  {
    question: "Can I book a regular weekly or fortnightly cleaner in Hampton?",
    answer: "Yes — select your preferred frequency when you book. The same cleaner returns on that schedule. Weekly and fortnightly bookings include loyalty rewards from the second month of regular service.",
  },
  {
    question: "Are your products safe for beach cottages and period home surfaces?",
    answer: "Yes. Our eco-friendly product selection is appropriate for original timber, period-era tiles, and coastal-adjacent materials. No steam or abrasive methods on original floorboards.",
  },
  {
    question: "Do I need to be home when the cleaner arrives?",
    answer: "No — most Hampton clients arrange key safe access and aren't home during the clean. Access arrangements are confirmed at booking and stored for every visit without you resending details.",
  },
  {
    question: "What's the difference between a standard and a deep clean?",
    answer: "A standard clean covers regular maintenance — floors, bathrooms, kitchen, surfaces, bedrooms. A deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price.",
  },
];

// ─── Main Component ────────────────────────────────────────────────
export default function HamptonClient({
  googleRatingValue = 5.0,
}: {
  googleRatingValue?: number;
}) {
  return (
    <div className="overflow-x-hidden text-gray-900">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F7F9FB] pt-[120px] pb-[80px] overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Column (58%) */}
            <div className="w-full md:w-[58%] text-left">
              <div className="mb-8">
                <Breadcrumbs items={[
                  { label: "Home", href: "/" },
                  { label: "House Cleaning Hampton", href: "/house-cleaning-hampton" },
                ]} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-[10px] font-bold tracking-[0.18em] uppercase mb-6 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
                House Cleaning · Hampton · Bayside
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-[38px] md:text-[56px] font-[800] text-[#1a1a1a] leading-[1.1] tracking-[-0.03em] mb-7"
              >
                <span className="block">House Cleaning</span>
                <span className="block text-[#d97706]">Hampton</span>
                <span className="block">Melbourne</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-[15px] text-gray-500 leading-[1.7] mb-10 max-w-[480px]"
              >
                Hampton earns its reputation quietly — the Hampton Street village strip, the foreshore reserve, and the beach cottages and period homes between them create a community character distinct from the larger bayside suburbs on either side. The same cleaner, every visit, with a scope built for your actual room count.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-center sm:justify-start gap-4 mb-4"
              >
                <a
                  href="/#booking"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-[15px] shadow-[0_6px_24px_rgba(251,140,66,0.28)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get an instant quote
                </a>
                <a
                  href="#checklist"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-gray-300 text-gray-700 font-semibold text-[15px] hover:border-gray-400 hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  See what's included
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="text-[12px] text-gray-500 font-medium text-center sm:text-left"
              >
                15% off your first clean. Fixed price, no hourly surprises.
              </motion.p>
            </div>

            {/* Right Column (42%) */}
            <div className="hidden md:flex w-[42%] flex-col items-end justify-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start -mr-[40px]"
              >
                <div 
                  className="text-[180px] font-[800] leading-[0.8] tracking-[-6px]"
                  style={{ color: '#d97706', opacity: 0.12 }}
                  aria-hidden="true"
                >
                  97%
                </div>
                <div className="flex items-start gap-2 mt-2 pl-4">
                  <ArrowRight className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <p className="text-[14px] text-gray-500 max-w-[200px] leading-snug font-medium text-left">
                    of Hampton clients get<br/>the same cleaner every visit
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Gentle SVG wave divider separating hero from trust strip */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px]">
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Trust strip (Below Wave) */}
      <section className="bg-white relative z-10 pb-16 pt-4">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-100 py-7"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200/30 gap-y-6 md:gap-y-0">
              <div className="text-center flex flex-col items-center justify-center">
                <span className="text-[22px] font-bold text-[#d97706] leading-none">4.9 ★</span>
                <span className="text-[12px] text-gray-500 mt-1.5">Google</span>
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <span className="text-[22px] font-bold text-[#d97706] leading-none">97%</span>
                <span className="text-[12px] text-gray-500 mt-1.5">Same Cleaner</span>
              </div>
              <div className="text-center flex flex-col items-center justify-center border-t md:border-t-0 border-gray-200/30 pt-6 md:pt-0">
                <span className="text-[22px] font-bold text-[#d97706] leading-none">100%</span>
                <span className="text-[12px] text-gray-500 mt-1.5">Eco-Friendly</span>
              </div>
              <div className="text-center flex flex-col items-center justify-center border-t md:border-t-0 border-gray-200/30 pt-6 md:pt-0">
                <span className="text-[22px] font-bold text-[#d97706] leading-none">72hr</span>
                <span className="text-[12px] text-gray-500 mt-1.5">Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Heritage Homes (Asymmetric)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Hampton's Housing Stock
            </p>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-5">
              Cleaning Hampton's Beachside Homes and Cottages Properly
            </h2>
            <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hampton's residential stock runs from original beach cottages on the streets closest to the foreshore through to larger family homes on the blocks toward Hampton East. The variety in property type, build era, and surface specification means a generic cleaning approach underserves most of them.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {/* Row 1: Large Featured Card */}
            <ScrollReveal>
              <div className="relative w-full rounded-[24px] p-8 md:p-12 overflow-hidden shadow-sm bg-[#F0F7FF] border border-[#bcd4f0]">
                <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-[#1a1a1a] opacity-10 leading-none select-none pointer-events-none transition-transform duration-500 hover:scale-110 z-0">
                  01
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-[44px] h-[44px] rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#bcd4f0]/50">
                      <svg className="w-5 h-5 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d97706]">
                      Hampton Beach · Foreshore
                    </span>
                  </div>
                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-gray-900 mb-4 max-w-2xl leading-tight">
                    Beach Cottages and Period Homes Near Hampton Beach and the Foreshore
                  </h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed max-w-3xl">
                    The streets directly adjacent to Hampton Beach and the foreshore reserve contain original beach cottages, interwar properties, and renovated period homes. Our eco-friendly products are chosen with coastal proximity in mind; salt air affects some surface materials over time and the product choices we make account for this in Hampton's foreshore-adjacent homes.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Row 2: Two Small Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Small Card 2 */}
              <ScrollReveal delay={0.1}>
                <div className="relative bg-white border border-gray-200 rounded-[24px] p-8 overflow-hidden shadow-sm hover:border-[#d97706]/50 transition-colors group h-full">
                  <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-[#1a1a1a] opacity-10 leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 z-0">
                    02
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-[44px] h-[44px] rounded-xl bg-[#F7F9FB] flex items-center justify-center shrink-0 border border-gray-100">
                        <svg className="w-5 h-5 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/><path d="M9 9v.01"/><path d="M9 13v.01"/><path d="M9 17v.01"/></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d97706]">
                        Hampton Street Village
                      </span>
                    </div>
                    <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 leading-tight">
                      Properties Along the Hampton Street Village Strip
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      The Hampton Street commercial strip runs from the railway station to the foreshore and defines the suburb's community character. The residential streets on either side contain a mix of original homes and renovations that reflect the suburb's evolution over decades.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Small Card 3 */}
              <ScrollReveal delay={0.2}>
                <div className="relative bg-white border border-gray-200 rounded-[24px] p-8 overflow-hidden shadow-sm hover:border-[#d97706]/50 transition-colors group h-full">
                  <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-[#1a1a1a] opacity-10 leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 z-0">
                    03
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-[44px] h-[44px] rounded-xl bg-[#F7F9FB] flex items-center justify-center shrink-0 border border-gray-100">
                        <svg className="w-5 h-5 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 9.5 12 4l9.5 5.5"/><path d="M12 20v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5"/><path d="M22 20H2"/><path d="M12 20v-9"/><path d="M12 11h9v9"/></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d97706]">
                        Between Beach & Station
                      </span>
                    </div>
                    <h3 className="text-[15px] font-extrabold text-gray-900 mb-4 leading-tight">
                      Contemporary and Renovated Homes Between the Beach and the Station
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      Hampton's mid-suburb residential streets contain a significant number of renovated and newly built properties — open-plan layouts, stone benchtops, and larger bathrooms alongside the suburb's period stock. Pricing calibrated to their actual room count, not grouped at a generic rate with the beach cottages.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Scope & Checklist (Alternating Rows)
      ══════════════════════════════════════════════════════ */}
      <section id="checklist" className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl mb-16 text-center">
          <ScrollReveal>
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Scope & Checklist
            </p>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-5">
              What Every Hampton Clean Includes
            </h2>
            <p className="text-[16px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every Hampton clean covers a documented, fixed scope — kitchen, bathrooms, floors, bedrooms, living areas, and laundry. The checklist is confirmed before the cleaner arrives and the price is fixed before you commit.
            </p>
          </ScrollReveal>
        </div>

        {/* Row 1 */}
        <div className="bg-white py-16 border-y border-gray-100">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <ScrollReveal className="flex flex-col md:flex-row gap-[48px] items-center justify-between">
              <div className="w-full md:w-[55%]">
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-7 h-7 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>
                  <h3 className="text-[22px] font-bold text-gray-900">Kitchen Surfaces and Bathroom Detailing</h3>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned and wiped on every visit. Bathrooms — shower screens, tub or shower recess, basin, toilet including base, mirror, taps, and tiled floor — are sanitised and polished throughout. Hampton's older beach cottages often have a single compact bathroom; larger renovated homes may have two or three, all covered within the standard scope.
                </p>
              </div>
              <div className="w-full md:w-[45%] flex flex-wrap gap-3">
                {["Stovetop & rangehood", "All bathrooms sanitised", "Toilet base to cistern", "Mirrors & taps polished"].map(item => (
                  <div key={item} className="px-4 py-1.5 text-[13px] font-semibold text-gray-700" style={{ backgroundColor: '#F0F7FF', border: '0.5px solid #bcd4f0', borderRadius: '99px' }}>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Row 2 */}
        <div className="py-16" style={{ backgroundColor: '#F0F4F8' }}>
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <ScrollReveal className="flex flex-col md:flex-row gap-[48px] items-center justify-between">
              <div className="w-full md:w-[55%]">
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-7 h-7 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4-4-4"/><path d="M3.5 9h11.2"/><path d="m12 22-4-4 4-4"/><path d="M20.5 18H9.3"/></svg>
                  <h3 className="text-[22px] font-bold text-gray-900">Timber Floors, Hard Surfaces and Living Areas</h3>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Original timber floors common in Hampton's period homes are swept and mopped with low-moisture products appropriate for older boards. Tiled and all other hard floors throughout are swept and mopped separately. Living and dining areas are left to a consistent, presented standard after every visit.
                </p>
              </div>
              <div className="w-full md:w-[45%] flex flex-wrap gap-3">
                {["Low-moisture mop on hardwood", "Skirting boards & cornices", "Formal dining & living", "Mirrors & glass wiped"].map(item => (
                  <div key={item} className="px-4 py-1.5 text-[13px] font-semibold text-gray-700" style={{ backgroundColor: '#F0F7FF', border: '0.5px solid #bcd4f0', borderRadius: '99px' }}>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Row 3 */}
        <div className="bg-white py-16 border-y border-gray-100">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <ScrollReveal className="flex flex-col md:flex-row gap-[48px] items-center justify-between">
              <div className="w-full md:w-[55%]">
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-7 h-7 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                  <h3 className="text-[22px] font-bold text-gray-900">Bedrooms and Laundry Spaces</h3>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left presented. The laundry is included as standard across all Hampton property types — standalone laundry room or compact beach cottage combined arrangement.
                </p>
              </div>
              <div className="w-full md:w-[45%] flex flex-wrap gap-3">
                {["All bedrooms vacuumed", "Room count sets pricing", "Laundry included", "Furniture-accessible areas"].map(item => (
                  <div key={item} className="px-4 py-1.5 text-[13px] font-semibold text-gray-700" style={{ backgroundColor: '#F0F7FF', border: '0.5px solid #bcd4f0', borderRadius: '99px' }}>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — The Crisp Difference
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F9FB]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-20">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              The Crisp Difference
            </p>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-5">
              Why Hampton Homeowners Choose Crisp
            </h2>
            <p className="text-[16px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hampton is a tightly held, predominantly owner-occupier suburb whose residents value consistency over price. The zero competition index here means a quality service establishes quickly — and the homeowner demographic makes them stay.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[48px] pt-[40px]">
            {[
              {
                stat: "97%", label: "same-cleaner rate",
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>,
                title: "Same Cleaner Every Single Visit — No Re-Explaining Your Home",
                body: "Your Hampton cleaner is matched to your property from the first booking and returns on every visit. By the second clean, they know your home's access arrangement, which floor type needs which product, and how your rooms are configured — without you managing that briefing again."
              },
              {
                stat: "Fixed", label: "pricing always",
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>,
                title: "Fixed, Scope-Based Pricing — Transparent Before You Commit",
                body: "A beach cottage on the foreshore end of a Hampton street and a four-bedroom renovated home near the station are quoted differently, as they should be. Your price is based on your home's actual room count, not an estimate."
              },
              {
                stat: "100%", label: "eco-friendly",
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
                title: "Eco-Friendly Products Safe on Period Home Surfaces",
                body: "Hampton's coastal character means some properties have period-era internal finishes that benefit from gentler product choices. All Crisp products are eco-friendly and surface-appropriate — chosen for effective cleaning without the cumulative damage that harsher products cause on older materials."
              },
              {
                stat: "72hr", label: "re-clean guarantee",
                icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: "Satisfaction Guaranteed on Every Clean",
                body: "Contact us within 72 hours of any clean if anything didn't meet your expectation and we'll return to address it at no additional charge. Applies from the very first visit and holds for the full duration of your Crisp bookings."
              }
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative bg-white border border-gray-200 rounded-[16px] px-8 pb-8 shadow-sm hover:border-[#d97706] transition-colors duration-200 group h-full">
                  <div className="absolute top-0 left-8 flex items-baseline gap-2 bg-[#F7F9FB] px-2" style={{ marginTop: '-24px' }}>
                    <span className="text-[28px] font-extrabold text-[#d97706] leading-none">{card.stat}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none">{card.label}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 mt-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] flex items-center justify-center shrink-0 text-[#d97706]">
                      {card.icon}
                    </div>
                    <h3 className="text-[17px] font-bold text-gray-900 leading-snug">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — Pricing
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#d97706] font-bold tracking-[0.15em] text-[11px] uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-4">
              Hampton House Cleaning Prices
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
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div 
                  className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                >
                  Most popular in Hampton
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
          SECTION 6 — Testimonials
      ══════════════════════════════════════════════════════ */}
      <Testimonials title="What Hampton homeowners say" googleRatingValue={googleRatingValue} />

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — FAQ
      ══════════════════════════════════════════════════════ */}
      <FAQ data={faqData} title="Frequently Asked Questions" />

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — Final CTA
      ══════════════════════════════════════════════════════ */}
      <section className="pt-12 pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <div 
            className="relative rounded-[32px] md:rounded-[40px] bg-[#14120F] text-white p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-white/5"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
            }}
          >
            <div className="absolute -bottom-36 -right-36 w-[450px] h-[450px] bg-[#d97706]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-36 -left-36 w-[450px] h-[450px] bg-[#d97706]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d97706] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                  Ready to Book
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-2xl text-white">
                  Book a cleaner in <span className="text-[#d97706]">Hampton</span>
                </h2>
                
                <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Book a cleaner in Hampton — instant quote online, zero wait, same cleaner every visit.
                </p>

                <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl sm:rounded-full px-5 py-2.5 mb-10 text-xs md:text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#d97706]">15% off your first clean.</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mx-auto mb-10">
                  <a
                    href="/#booking"
                    className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-[15px] shadow-[0_0_30px_rgba(217,119,6,0.45)] hover:shadow-[0_0_40px_rgba(217,119,6,0.65)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get an instant quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="tel:0451423786"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-[15px] hover:bg-white/10 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Call us: 0451 423 786
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className="mt-4 pt-8 border-t border-white/10 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
                  Nearby areas we also service
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Brighton", "Cheltenham", "Sandringham", "Albert Park", "Bentleigh East"].map((suburb) => (
                    <Link
                      key={suburb}
                      href="#"
                      className="group px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/50 hover:text-[#d97706] hover:border-[#d97706]/30 hover:bg-[#d97706]/5 text-[13px] font-medium transition-all duration-300 flex items-center gap-1"
                    >
                      {suburb}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
