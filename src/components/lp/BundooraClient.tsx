"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";

type AudienceMode = 'family' | 'renter';

const faqData = [
  { question: "Do you clean rental properties near La Trobe University in Bundoora?", answer: "Yes - rental properties near La Trobe's Kingsbury Drive campus are a core part of the Bundoora catchment. Fixed pricing, same cleaner, and landlord or property manager bookings all welcome." },
  { question: "How much does house cleaning cost in Bundoora?", answer: "Pricing depends on room count and property type. A one-bedroom unit near RMIT is priced differently to a four-bedroom family home. Get an exact quote online in under a minute." },
  { question: "Can landlords and property managers set up recurring cleans?", answer: "Yes - landlords and property managers can book and manage recurring cleans for investment properties. Invoicing and scheduling can be managed from a single account across multiple properties." },
  { question: "Are cleaning supplies included for rental properties?", answer: "Yes - all eco-friendly products are included in every clean. No requirement for tenants or landlords to supply anything." },
  { question: "Do you offer end-of-lease cleaning in Bundoora?", answer: "Yes - vacate and end-of-lease cleaning is available across Bundoora with fixed pricing, inspection-ready standard, and a bond-back guarantee. Get a separate vacate quote online." },
  { question: "How do I book a regular fortnightly clean in Bundoora?", answer: "Select fortnightly as your frequency when getting your online quote. The same cleaner is assigned and confirmed at booking. 5% off the first clean." }
];

export default function BundooraClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<AudienceMode>('family');
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  
  const heroBottomRef = useRef<HTMLDivElement>(null);
  
  // Removed visibleRows state
  
  useEffect(() => {
    setIsMounted(true);
    
    // Sticky header observer
    if (heroBottomRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStickyVisible(!entry.isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(heroBottomRef.current);
      return () => observer.disconnect();
    }
  }, []);

  if (!isMounted) return null;

  const styles = `
    .hero-bundoora::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url('/noise.png');
      opacity: 0.04;
      pointer-events: none;
      z-index: 0;
    }
    .hero-bundoora::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        ellipse 120% 80% at 70% 50%,
        rgba(45,74,45,0.6) 0%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 0;
    }
    .sticky-toggle {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(26,46,26,0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 50;
      transform: translateY(-100%);
      transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .sticky-toggle.visible {
      transform: translateY(0);
    }
    .mode-fade {
      transition: opacity 0.2s ease;
    }
  `;

  return (
    <main className="min-h-screen bg-white selection:bg-[#d97706] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* STICKY MINI-TOGGLE */}
      <div className={`sticky-toggle ${isStickyVisible ? 'visible' : ''}`}>
        <div className="text-[11px] font-bold text-white/50 tracking-[0.15em]">
          CRISP CLEANING
        </div>
        <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
          <button 
            onClick={() => setMode('family')}
            className={`rounded-full px-[14px] py-[6px] text-[11px] font-semibold tracking-[0.06em] transition-all duration-200 border-none whitespace-nowrap ${mode === 'family' ? 'bg-[#d97706] text-white shadow-[0_2px_8px_rgba(217,119,6,0.4)]' : 'bg-transparent text-white/45'}`}
          >
            🏡 Family Home
          </button>
          <button 
            onClick={() => setMode('renter')}
            className={`rounded-full px-[14px] py-[6px] text-[11px] font-semibold tracking-[0.06em] transition-all duration-200 border-none whitespace-nowrap ${mode === 'renter' ? 'bg-[#d97706] text-white shadow-[0_2px_8px_rgba(217,119,6,0.4)]' : 'bg-transparent text-white/45'}`}
          >
            🎓 Student / Rental
          </button>
        </div>
      </div>

      {/* SECTION 1 — HERO */}
      <section className="hero-bundoora relative bg-[#1A2E1A] min-h-[92vh] overflow-hidden flex flex-col md:grid md:grid-cols-[1.1fr_1fr] items-center">
        {/* Left Column */}
        <div className="relative z-10 w-full pt-[100px] pb-12 px-8 md:pt-[120px] md:pr-[64px] md:pb-[80px] md:pl-[80px]">
          <div className="text-[12px] text-white/20 mb-8">
            <Link href="/" className="hover:text-white/40 transition-colors">Home</Link> › House Cleaning Bundoora
          </div>
          
          <div className="bg-[#d97706]/15 border border-[#d97706]/30 text-[#F59E0B] text-[11px] font-semibold tracking-[0.12em] rounded-full px-4 py-[6px] mb-6 inline-block">
            ● Bundoora Park · La Trobe · Northern Suburbs
          </div>

          <h1 className="text-[44px] md:text-[68px] font-extrabold text-white leading-[1.0] tracking-tight mb-7 flex flex-wrap gap-x-4">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>House</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>Cleaning</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-[#d97706] w-full mt-1">Bundoora</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="w-full mt-1">Melbourne</motion.span>
          </h1>

          {/* THE TOGGLE */}
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 gap-1 mb-5">
            <button 
              onClick={() => setMode('family')}
              className={`rounded-full px-[20px] py-[10px] text-[12px] font-semibold tracking-[0.06em] transition-all duration-200 border-none whitespace-nowrap ${mode === 'family' ? 'bg-[#d97706] text-white shadow-[0_2px_8px_rgba(217,119,6,0.4)]' : 'bg-transparent text-white/45'}`}
            >
              🏡 Family Home
            </button>
            <button 
              onClick={() => setMode('renter')}
              className={`rounded-full px-[20px] py-[10px] text-[12px] font-semibold tracking-[0.06em] transition-all duration-200 border-none whitespace-nowrap ${mode === 'renter' ? 'bg-[#d97706] text-white shadow-[0_2px_8px_rgba(217,119,6,0.4)]' : 'bg-transparent text-white/45'}`}
            >
              🎓 Student / Rental
            </button>
          </div>

          <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className="text-[15px] text-white/50 leading-[1.8] max-w-[480px]">
              {mode === 'family' ? "Bundoora's established residential streets — including the Mt Cooper estate and the quieter pockets away from the main arterial roads — contain larger, multi-bedroom family homes on generous blocks. These properties require a consistent service that handles multiple living areas without an hourly rate overrunning. Crisp's fixed, room-count pricing ensures family homes are quoted accurately based on their actual scope, with the same cleaner returning on every visit to build familiarity with the property." : "Bundoora's proximity to La Trobe University and the RMIT campus makes it a major hub for share houses and student rentals. Our fixed-pricing model works per-property, not per-occupant, avoiding the punitive surcharges traditional cleaners often apply to multi-tenant homes. High-traffic common areas — shared kitchens, bathrooms, and hallways — accumulate usage quickly in student housing and receive systematic, thorough attention within our standard service scope."}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-white/5 border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-white/55">
              {Number(googleRatingValue).toFixed(1)} ★ Google
            </span>
            <span className="bg-white/5 border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-white/55">
              97% Same Cleaner
            </span>
            <span className="bg-white/5 border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-white/55">
              Eco-Friendly
            </span>
            <span className="bg-white/5 border border-white/10 rounded-full px-[14px] py-[6px] text-[12px] text-white/55">
              72hr Guarantee
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/book" className="bg-[#d97706] text-white rounded-full px-[28px] py-[14px] font-semibold hover:bg-[#b46305] transition-colors">
              Get an Instant Quote →
            </Link>
            <a href="#whats-included" className="border border-white/15 text-white rounded-full px-[28px] py-[14px] hover:bg-white/5 transition-colors">
              See what's included
            </a>
          </div>
          <div className="text-[12px] text-white/25 mt-[10px]">
            5% off your first clean.
          </div>
        </div>

        {/* Right Column - SVG Map */}
        <div className="hidden md:flex relative z-10 p-[80px_48px_80px_32px] items-center justify-center w-full h-full">
          <svg viewBox="0 0 480 420" className="w-full max-w-[480px]">
            <rect width="480" height="420" fill="rgba(255,255,255,0.02)" rx="20"/>
            
            {/* Road surface */}
            <rect x="0" y="185" width="480" height="50" fill="#C8C4BC" opacity="0.6"/>
            {/* Centre dashes */}
            <line x1="0" y1="210" x2="480" y2="210" stroke="#d97706" strokeWidth="2" strokeDasharray="20,14" opacity="1.0"/>
            {/* Road label */}
            <text x="240" y="218" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" fontWeight="600" letterSpacing="0.2em">
              PLENTY ROAD
            </text>

            {/* Connecting segment */}
            <line x1="172" y1="130" x2="308" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="6,6"/>

            {/* Left node — Bundoora Park */}
            <circle cx="100" cy="130" r="72" fill="#2D4A2D" stroke="#7C9A6E" strokeWidth="2.5" strokeOpacity="1.0"/>
            <circle cx="78" cy="110" r="6" fill="rgba(124,154,110,0.8)"/>
            <circle cx="98" cy="100" r="8" fill="rgba(124,154,110,0.7)"/>
            <circle cx="120" cy="112" r="5" fill="rgba(124,154,110,0.8)"/>
            <circle cx="88" cy="130" r="7" fill="rgba(124,154,110,0.6)"/>
            <circle cx="112" cy="128" r="6" fill="rgba(124,154,110,0.7)"/>
            <circle cx="100" cy="148" r="5" fill="rgba(124,154,110,0.6)"/>
            <text x="100" y="164" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" fontWeight="700" letterSpacing="0.15em">
              BUNDOORA PARK
            </text>

            {/* House icons — scattered west of road */}
            <g opacity="1.0">
            <g transform="translate(28,240)">
              <rect x="0" y="6" width="20" height="16" rx="1" fill="rgba(217,119,6,0.7)"/>
              <polygon points="10,0 20,7 0,7" fill="#d97706"/>
            </g>
            <g transform="translate(56,258)">
              <rect x="0" y="6" width="20" height="16" rx="1" fill="rgba(217,119,6,0.5)"/>
              <polygon points="10,0 20,7 0,7" fill="rgba(217,119,6,0.7)"/>
            </g>
            <g transform="translate(20,278)">
              <rect x="0" y="6" width="20" height="16" rx="1" fill="rgba(217,119,6,0.6)"/>
              <polygon points="10,0 20,7 0,7" fill="rgba(217,119,6,0.8)"/>
            </g>
            <g transform="translate(54,290)">
              <rect x="0" y="6" width="18" height="14" rx="1" fill="rgba(217,119,6,0.4)"/>
              <polygon points="9,0 18,6 0,6" fill="rgba(217,119,6,0.6)"/>
            </g>
            </g>
            <text x="50" y="330" textAnchor="middle" fontSize="8" fill="#d97706" opacity="1" fontWeight="700" letterSpacing="0.15em">
              FAMILY HOMES
            </text>

            {/* Right node — La Trobe University */}
            <circle cx="380" cy="130" r="72" fill="#243824" stroke="#d97706" strokeWidth="2.5" strokeOpacity="0.9"/>
            <line x1="340" y1="95" x2="340" y2="165" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="380" y1="95" x2="380" y2="165" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="420" y1="95" x2="420" y2="165" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="340" y1="115" x2="420" y2="115" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <line x1="340" y1="145" x2="420" y2="145" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <rect x="348" y="100" width="20" height="14" rx="1" fill="rgba(255,255,255,0.3)"/>
            <rect x="376" y="100" width="20" height="14" rx="1" fill="rgba(255,255,255,0.3)"/>
            <rect x="348" y="122" width="20" height="18" rx="1" fill="rgba(255,255,255,0.25)"/>
            <rect x="376" y="122" width="20" height="18" rx="1" fill="rgba(255,255,255,0.25)"/>
            <rect x="404" y="100" width="14" height="32" rx="1" fill="rgba(255,255,255,0.2)"/>
            <text x="380" y="164" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" fontWeight="700" letterSpacing="0.12em">
              LA TROBE UNIVERSITY
            </text>

            {/* Apartment/unit icons — east of road */}
            <g opacity="1.0">
            <g transform="translate(310,240)">
              <rect x="0" y="0" width="16" height="28" rx="1" fill="rgba(124,154,110,0.6)"/>
              <rect x="3" y="3" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="9" y="3" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="3" y="11" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="9" y="11" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="3" y="19" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="9" y="19" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
            </g>
            <g transform="translate(334,250)">
              <rect x="0" y="0" width="16" height="24" rx="1" fill="rgba(124,154,110,0.5)"/>
              <rect x="3" y="3" width="4" height="4" fill="rgba(255,255,255,0.35)"/>
              <rect x="9" y="3" width="4" height="4" fill="rgba(255,255,255,0.35)"/>
              <rect x="3" y="11" width="4" height="4" fill="rgba(255,255,255,0.35)"/>
              <rect x="9" y="11" width="4" height="4" fill="rgba(255,255,255,0.35)"/>
            </g>
            <g transform="translate(358,244)">
              <rect x="0" y="0" width="16" height="32" rx="1" fill="rgba(124,154,110,0.7)"/>
              <rect x="3" y="3" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="9" y="3" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="3" y="11" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="9" y="11" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="3" y="19" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="9" y="19" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
              <rect x="3" y="27" width="4" height="4" fill="rgba(255,255,255,0.45)"/>
            </g>
            </g>
            <text x="340" y="330" textAnchor="middle" fontSize="8" fill="#7C9A6E" opacity="1" fontWeight="700" letterSpacing="0.15em">
              RENTALS / UNITS
            </text>

            {/* Kingsbury Drive label */}
            <text x="450" y="210" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.2)" fontWeight="600" letterSpacing="0.15em" transform="rotate(-90, 450, 210)">
              KINGSBURY DR
            </text>

            {/* Crisp branding watermark bottom */}
            <text x="24" y="408" fontSize="7" fill="rgba(255,255,255,0.1)" letterSpacing="0.1em">CRISP CLEANING</text>
            <text x="456" y="408" fontSize="7" fill="rgba(255,255,255,0.1)" letterSpacing="0.1em" textAnchor="end">BUNDOORA</text>
          </svg>
        </div>
        
        {/* Bottom amber gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#d97706] to-transparent bg-[length:100%_3px] bg-[position:30%_0] " style={{ backgroundImage: 'linear-gradient(90deg, transparent, #d97706 30%, #F59E0B 70%, transparent)' }} />
      </section>

      {/* Hero Sentinel for Sticky Nav */}
      <div ref={heroBottomRef} className="hero-bottom-sentinel w-full h-[1px]" />

      {/* SECTION 2 — PROOF STRIP */}
      <section className="bg-[#1C1C1C] py-[22px]">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-[48px] flex-wrap text-[13px] text-white/50 tracking-[0.08em]">
            <div><span className="text-[#d97706] font-bold">{googleRatingValue} ★</span> Google</div>
            <div><span className="text-[#d97706] font-bold">97%</span> Same Cleaner</div>
            <div><span className="text-[#d97706] font-bold">100%</span> Eco-Friendly</div>
            <div><span className="text-[#d97706] font-bold">72hr</span> Guarantee</div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROPERTY TYPES */}
      <section className="bg-white py-[80px]">
        <div className="container mx-auto px-6 max-w-[1100px] md:px-[48px]">
          <div className="text-[11px] font-semibold text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">
            Bundoora's Housing Mix
          </div>
          <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <h2 className="text-[36px] font-bold text-[#1C1C1C] max-w-[720px] leading-tight mb-[12px]">
              {mode === 'family' 
                ? "Bundoora Home Cleaning - Families and Rental Properties Welcome" 
                : "Rental Properties and Units Near La Trobe and RMIT"}
            </h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[660px]">
              {mode === 'family'
                ? "Bundoora's two distinct residential populations - long-term owner-occupier families on established streets and renters near La Trobe and RMIT - don't require different services. They both need the same things: reliable cleaning, a consistent cleaner, and transparent pricing confirmed before anyone arrives. Crisp provides this across both segments."
                : "The streets adjacent to La Trobe University's main campus on Kingsbury Drive have a high concentration of rental properties - townhouses, older homes converted to multi-room rentals, and newer units. Fixed, pre-confirmed pricing works particularly well for rentals: tenants know exactly what's covered, landlords know the standard being maintained, and neither party deals with hourly-rate ambiguity."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[48px]">
            {/* Card 1 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[20px] p-[32px] relative overflow-hidden group hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d97706] to-transparent" />
              <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] text-[9px] font-bold tracking-[0.15em] uppercase rounded-full px-[10px] py-[3px] inline-block mb-6">
                FAMILY
              </div>
              <svg width="32" height="32" viewBox="0 0 32 32" className="block mb-4">
                <rect x="4" y="14" width="24" height="16" rx="1" fill="#fff7ed" stroke="#d97706" strokeWidth="1.5"/>
                <polygon points="16,2 30,14 2,14" fill="#d97706"/>
                <rect x="12" y="22" width="8" height="8" rx="1" fill="#d97706" opacity="0.5"/>
              </svg>
              <h3 className="text-[18px] font-bold text-[#1C1C1C] my-[12px] leading-[1.3]">
                Established Family Homes Across Bundoora's Residential Streets
              </h3>
              <p className="text-[13px] text-[#6b7280] leading-[1.75] mb-4">
                The established residential pockets - particularly in the streets west of Plenty Road and around Bundoora Park - are predominantly 1970s-80s brick homes on generous suburban blocks, occupied by families with school-age children. Families booking fortnightly cleaning are among Crisp's most consistent client segment, and Bundoora's family-residential streets are exactly this profile.
              </p>
              <div className="text-[11px] font-medium text-[#9ca3af] flex flex-wrap gap-x-2 gap-y-1">
                <span>Fortnightly recurring</span> · <span>1970s–80s brick</span> · <span>Bundoora Park precinct</span> · <span>Generous blocks</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[20px] p-[32px] relative overflow-hidden group hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C9A6E] to-transparent" />
              <div className="bg-[#f0f7f0] border border-[#b8d4b8] text-[#4a7a4a] text-[9px] font-bold tracking-[0.15em] uppercase rounded-full px-[10px] py-[3px] inline-block mb-6">
                RENTAL
              </div>
              <svg width="32" height="32" viewBox="0 0 32 32" className="block mb-4">
                <rect x="4" y="6" width="24" height="24" rx="1" fill="#f0f7f0" stroke="#7C9A6E" strokeWidth="1.5"/>
                <rect x="8" y="10" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="18" y="10" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="8" y="19" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="18" y="19" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="12" y="22" width="8" height="8" rx="0.5" fill="#7C9A6E" opacity="0.4"/>
              </svg>
              <h3 className="text-[18px] font-bold text-[#1C1C1C] my-[12px] leading-[1.3]">
                Rental Properties and Townhouses Near La Trobe University
              </h3>
              <p className="text-[13px] text-[#6b7280] leading-[1.75] mb-4">
                The streets adjacent to La Trobe University's main campus on Kingsbury Drive have a high concentration of rental properties - townhouses, older homes converted to multi-room rentals, and newer units. Fixed, pre-confirmed pricing works particularly well for rentals: tenants know exactly what's covered, landlords know the standard being maintained, and neither party deals with hourly-rate ambiguity.
              </p>
              <div className="text-[11px] font-medium text-[#9ca3af] flex flex-wrap gap-x-2 gap-y-1">
                <span>La Trobe precinct</span> · <span>Landlord-friendly</span> · <span>Property managers</span> · <span>Per-property pricing</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[20px] p-[32px] relative overflow-hidden group hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C9A6E] to-transparent" />
              <div className="bg-[#f0f7f0] border border-[#b8d4b8] text-[#4a7a4a] text-[9px] font-bold tracking-[0.15em] uppercase rounded-full px-[10px] py-[3px] inline-block mb-6">
                RENTAL
              </div>
              <svg width="32" height="32" viewBox="0 0 32 32" className="block mb-4">
                <rect x="4" y="6" width="24" height="24" rx="1" fill="#f0f7f0" stroke="#7C9A6E" strokeWidth="1.5"/>
                <rect x="8" y="10" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="18" y="10" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="8" y="19" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="18" y="19" width="5" height="5" rx="0.5" fill="#7C9A6E" opacity="0.6"/>
                <rect x="12" y="22" width="8" height="8" rx="0.5" fill="#7C9A6E" opacity="0.4"/>
              </svg>
              <h3 className="text-[18px] font-bold text-[#1C1C1C] my-[12px] leading-[1.3]">
                Units and Smaller Properties Near the RMIT Bundoora Campus
              </h3>
              <p className="text-[13px] text-[#6b7280] leading-[1.75] mb-4">
                The RMIT University Bundoora campus on Plenty Road South attracts a smaller but distinct rental population across its nearby streets. Units and smaller properties in this zone are priced within the same fixed-scope framework at the rate appropriate for their actual layout - a one-bedroom unit near RMIT is quoted as such, not at the same rate as a four-bedroom family home on a residential street.
              </p>
              <div className="text-[11px] font-medium text-[#9ca3af] flex flex-wrap gap-x-2 gap-y-1">
                <span>RMIT precinct</span> · <span>Unit pricing</span> · <span>One-bedroom</span> · <span>Fixed scope</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED */}
      <section id="whats-included" className="bg-[#F5F2EC] py-[80px]">
        <div className="container mx-auto px-6 max-w-[1100px] md:px-[48px]">
          <div className="text-[11px] font-semibold text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">
            Scope & Checklist
          </div>
          <h2 className="text-[36px] font-bold text-[#1C1C1C] leading-tight mb-[12px]">
            What Every Bundoora Clean Covers
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[580px]">
            Every Bundoora clean covers the core home-maintenance scope - kitchen, bathrooms, floors, bedrooms, and living areas - with room count determining your exact price. The scope is documented before arrival; there's no guesswork about what's included on the day.
          </p>

          {/* Parallel Layout */}
          <div className="mt-[48px] rounded-[20px] overflow-hidden border border-[#E5E0D8]">
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#1C1C1C] p-[20px_32px]">
                <div className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                  🏡 Family Home
                </div>
              </div>
              <div className="bg-[#2D4A2D] p-[20px_32px]">
                <div className="text-[10px] font-bold text-white/80 tracking-[0.2em] uppercase">
                  🎓 Student / Rental
                </div>
              </div>
            </div>

            {/* Row A */}
            <div className="bg-[#F5F2EC] p-[12px_32px] border-t border-[#E5E0D8] text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase">
              KITCHEN & BATHROOMS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#E5E0D8]">
              <div className="bg-white p-[28px_32px]">
                <h3 className="text-[14px] font-bold text-[#374151] mb-2">Kitchen and Bathroom Sanitisation</h3>
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Kitchen surfaces, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned on every visit. All bathrooms - shower or bath, toilet, basin, mirror, taps, and tiled floor - are sanitised and polished.
                </p>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Kitchen benchtops & stovetop
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Rangehood & splashback
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Sink & appliance exteriors
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> All bathrooms — shower or bath
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Toilet (base to cistern)
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Basin, mirror & tapware
                  </div>
                </div>
              </div>
              <div className="bg-[#fafaf8] p-[28px_32px] border-t md:border-t-0 md:border-l-[2px] border-[#E5E0D8]">
                <h3 className="text-[14px] font-bold text-[#374151] mb-2">Kitchen and Bathroom Sanitisation</h3>
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Kitchen surfaces, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned on every visit. All bathrooms - shower or bath, toilet, basin, mirror, taps, and tiled floor - are sanitised and polished.
                </p>
                <div className="bg-[#f0f7f0] border border-[#b8d4b8] rounded-[8px] p-[12px_16px] text-[12px] text-[#4a7a4a] leading-[1.6] mb-4">
                  For rental properties with multiple bathrooms, all are covered within the standard scope without an additional charge per bathroom.
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Kitchen benchtops & stovetop
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Rangehood & splashback
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Sink & appliance exteriors
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> All bathrooms — shower or bath
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Toilet (base to cistern)
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Basin, mirror & tapware
                  </div>
                </div>
              </div>
            </div>

            {/* Row B */}
            <div className="bg-[#F5F2EC] p-[12px_32px] border-t border-[#E5E0D8] text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase">
              FLOORS & SURFACES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#E5E0D8]">
              <div className="bg-white p-[28px_32px]">
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Carpeted areas are vacuumed and hard floors swept and mopped. All accessible surfaces - shelving, skirting boards, door handles, window sills - are dusted and wiped.
                </p>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Carpeted rooms vacuumed
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Hard floors swept & mopped
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Surfaces & skirting boards
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Door handles & window sills
                  </div>
                </div>
              </div>
              <div className="bg-[#fafaf8] p-[28px_32px] border-t md:border-t-0 md:border-l-[2px] border-[#E5E0D8]">
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Carpeted areas are vacuumed and hard floors swept and mopped. All accessible surfaces - shelving, skirting boards, door handles, window sills - are dusted and wiped.
                </p>
                <div className="bg-[#f0f7f0] border border-[#b8d4b8] rounded-[8px] p-[12px_16px] text-[12px] text-[#4a7a4a] leading-[1.6] mb-4">
                  In higher-traffic rental properties and share houses, these surfaces accumulate considerably faster; the same scope and standard is applied regardless of occupancy type.
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Carpeted rooms vacuumed
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Hard floors swept & mopped
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Surfaces & skirting boards
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Door handles & window sills
                  </div>
                </div>
              </div>
            </div>

            {/* Row C */}
            <div className="bg-[#F5F2EC] p-[12px_32px] border-t border-[#E5E0D8] text-[9px] font-bold text-[#d97706] tracking-[0.2em] uppercase">
              BEDROOMS & LIVING
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#E5E0D8]">
              <div className="bg-white p-[28px_32px]">
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Every bedroom in scope is vacuumed or mopped, surfaces addressed, and the room left to a tidy standard. Living and dining areas receive the same treatment.
                </p>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> All bedrooms — vacuumed / mopped
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Bedroom surfaces dusted
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Living & dining areas
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Laundry
                  </div>
                </div>
              </div>
              <div className="bg-[#fafaf8] p-[28px_32px] border-t md:border-t-0 md:border-l-[2px] border-[#E5E0D8]">
                <p className="text-[14px] text-[#374151] leading-[1.75] mb-4">
                  Every bedroom in scope is vacuumed or mopped, surfaces addressed, and the room left to a tidy standard. Living and dining areas receive the same treatment.
                </p>
                <div className="bg-[#f0f7f0] border border-[#b8d4b8] rounded-[8px] p-[12px_16px] text-[12px] text-[#4a7a4a] leading-[1.6] mb-4">
                  For share houses where common areas accumulate more than individual rooms, those spaces receive appropriate attention within the agreed scope.
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> All bedrooms — vacuumed / mopped
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Bedroom surfaces dusted
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Living & dining areas
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Laundry
                  </div>
                  <div className="text-[13px] text-[#374151] flex items-baseline gap-[8px]">
                    <span className="text-[#d97706] font-bold shrink-0">✓</span> Common areas (share houses)
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom total row */}
            <div className="bg-[#1C1C1C] p-[20px_32px] flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[11px] font-bold text-white/60 tracking-[0.1em]">
                SCOPE: ALL ROOMS CONFIRMED
              </div>
              <div className="text-[11px] font-bold text-[#d97706] tracking-[0.1em]">
                PRICE: FIXED BEFORE BOOKING · SAME CLEANER EVERY VISIT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP */}
      <section className="bg-[#1C1C1C]">
        <div className="p-[80px_48px_56px_48px]">
          <div className="text-[11px] font-semibold text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">
            The Crisp Difference
          </div>
          <h2 className="text-[36px] font-bold text-white mb-[12px]">
            Why Bundoora Residents Choose Crisp
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '560px',
            lineHeight: '1.8',
            marginTop: '12px'
          }}>
            The Bundoora house cleaning keyword carries a low competition index - very few 
            established cleaning services actively target this suburb. A quality, locally 
            committed service here can establish strong organic rankings relatively quickly. 
            More relevantly to residents, it means there's a genuine service gap that Crisp 
            is filling.
          </p>
        </div>

        {/* Row 1 */}
        <div className="why-crisp-row grid grid-cols-1 md:grid-cols-2 w-full min-h-[200px] overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-[#1A2E1A] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center">
            <div className="text-[96px] font-black text-white leading-none tracking-[-6px]">97%</div>
            <div className="text-[10px] text-white/30 tracking-[0.2em] mt-2 uppercase">SAME-CLEANER RATE</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} className="bg-[#F5F2EC] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>
              Same Cleaner Every Visit - for Families and Landlords Alike
            </h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75', maxWidth: '420px' }}>
              Families on Bundoora's residential streets benefit from a cleaner who knows the home 
              and its specific requirements over time. Landlords benefit from a cleaner assigned to 
              the property who maintains a consistent standard without a re-briefing each visit. 
              Our 97% same-cleaner continuity applies across all property types and booking structures.
            </p>
            <span style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#d97706',
              borderRadius: '99px',
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              marginTop: '16px',
              display: 'inline-block',
              alignSelf: 'flex-start'
            }}>
              97% continuity rate
            </span>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="why-crisp-row grid grid-cols-1 md:grid-cols-2 w-full min-h-[200px] overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} className="bg-[#ffffff] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center order-2 md:order-1">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>
              Fixed, Transparent Pricing With No Hidden Extras
            </h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75', maxWidth: '420px' }}>
              Every price is confirmed online before the first cleaner arrives - based on the 
              property's actual scope, not a suburb-wide estimate. No additional travel charges 
              within Bundoora, no per-room extras that weren't discussed at booking, no call-out 
              fees charged on top of the service price.
            </p>
            <span style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#d97706',
              borderRadius: '99px',
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              marginTop: '16px',
              display: 'inline-block',
              alignSelf: 'flex-start'
            }}>
              Price confirmed online
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-[#1C1C1C] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center order-1 md:order-2">
            <div className="text-[80px] font-black text-[#d97706] leading-none tracking-[-3px]">Fixed</div>
            <div className="text-[10px] text-[#d97706]/50 tracking-[0.2em] mt-2 uppercase">PRICING</div>
          </motion.div>
        </div>

        {/* Row 3 */}
        <div className="why-crisp-row grid grid-cols-1 md:grid-cols-2 w-full min-h-[200px] overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-[#1A2E1A] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center">
            <div className="text-[120px] font-black text-white leading-none">=</div>
            <div className="text-[10px] text-white/30 tracking-[0.2em] mt-2 uppercase">QUALITY</div>
            <div className="text-[14px] font-bold text-white/60 tracking-[0.05em] mt-2 uppercase">FAMILY HOME = RENTAL</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} className="bg-[#F5F2EC] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>
              Consistent Results Whether It's a Family Home or a Rental Property
            </h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75', maxWidth: '420px' }}>
              The same checklist, the same eco-friendly products, and the same quality standard 
              is applied to a family home near Bundoora Park and a rental unit near La Trobe 
              University. The scope adjusts for room count and layout; the quality bar doesn't 
              adjust for property type.
            </p>
            <span style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#d97706',
              borderRadius: '99px',
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              marginTop: '16px',
              display: 'inline-block',
              alignSelf: 'flex-start'
            }}>
              Same standard always
            </span>
          </motion.div>
        </div>

        {/* Row 4 */}
        <div className="why-crisp-row grid grid-cols-1 md:grid-cols-2 w-full min-h-[200px] overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} className="bg-[#ffffff] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center order-2 md:order-1">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1C1C1C', marginBottom: '12px' }}>
              Book Online in Under a Minute - No Phone Calls Required
            </h3>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75', maxWidth: '420px' }}>
              Get an exact quote and complete your booking in under 60 seconds online. Cleaner 
              assignment is confirmed by return. 5% off the first clean; loyalty discounts 
              accumulate from the second month of regular bookings.
            </p>
            <span style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#d97706',
              borderRadius: '99px',
              padding: '5px 14px',
              fontSize: '11px',
              fontWeight: 700,
              marginTop: '16px',
              display: 'inline-block',
              alignSelf: 'flex-start'
            }}>
              60 second booking
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-[#1C1C1C] p-[56px_40px] md:p-[56px_80px] flex flex-col justify-center order-1 md:order-2">
            <div className="text-[96px] font-black text-[#d97706] leading-none tracking-[-3px]">60s</div>
            <div className="text-[10px] text-[#d97706]/50 tracking-[0.2em] mt-2 uppercase">BOOKING PROCESS</div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="bg-[#F5F2EC] py-[80px]">
        <div className="container mx-auto px-6 max-w-[1100px] md:px-[48px]">
          <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-[12px] text-center">
            Client Stories
          </div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] leading-tight mb-12 text-center">
            What Bundoora Residents Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] max-w-[1100px] mx-auto">
            {/* Review 1 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[16px] p-[28px] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A2E1A]" />
              <div className="text-[48px] text-[#d97706] opacity-20 font-serif leading-[0.5] mb-4 mt-2">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-6 flex-grow">
                Honestly felt like a brand new home. Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.
              </p>
              <div>
                <div className="text-[#d97706] tracking-widest text-[14px] mb-1">★★★★★</div>
                <div className="font-semibold text-[#1C1C1C] text-[14px] flex items-center gap-2">
                  Andre B. <span className="bg-[#f0f7f0] border border-[#b8d4b8] text-[#4a7a4a] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Google</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[16px] p-[28px] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A2E1A]" />
              <div className="text-[48px] text-[#d97706] opacity-20 font-serif leading-[0.5] mb-4 mt-2">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-6 flex-grow">
                Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp
              </p>
              <div>
                <div className="text-[#d97706] tracking-widest text-[14px] mb-1">★★★★★</div>
                <div className="font-semibold text-[#1C1C1C] text-[14px] flex items-center gap-2">
                  Natch L. <span className="bg-[#f0f7f0] border border-[#b8d4b8] text-[#4a7a4a] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Google</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-[#E5E0D8] rounded-[16px] p-[28px] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A2E1A]" />
              <div className="text-[48px] text-[#d97706] opacity-20 font-serif leading-[0.5] mb-4 mt-2">"</div>
              <p className="text-[14px] text-[#374151] italic leading-[1.7] mb-6 flex-grow">
                One of the best decisions we've made. Coming home to a clean house every week has made life much easier.
              </p>
              <div>
                <div className="text-[#d97706] tracking-widest text-[14px] mb-1">★★★★★</div>
                <div className="font-semibold text-[#1C1C1C] text-[14px] flex items-center gap-2">
                  Aiden A. <span className="bg-[#f0f7f0] border border-[#b8d4b8] text-[#4a7a4a] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Google</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-[32px] text-[13px] text-[#6b7280]">
            ★★★★★ Rated {googleRatingValue} on Google · {googleReviewCount} verified reviews
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section className="bg-white py-[80px]">
        <div className="container mx-auto px-6 max-w-[1100px] md:px-[48px]">
          <div className="text-center mb-[48px]">
            <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">
              Transparent Pricing
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] leading-tight mb-4">
              Bundoora House Cleaning Prices
            </h2>
            <p className="text-[16px] text-[#6b7280]">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard */}
            <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Standard</h3>
              <div className="text-[14px] text-[#6b7280] mb-6">Up to 3 bed · All bathrooms · Eco products included</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">
                <span className="text-[16px] text-[#6b7280] font-normal align-top mt-2 inline-block">From</span> $145
              </div>
              <Link href="/book" className="w-full text-center border border-[#e5e7eb] text-[#1C1C1C] rounded-full py-3 font-semibold hover:bg-gray-50 transition-colors mt-auto">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Deep */}
            <div className="bg-white border-2 border-[#d97706] rounded-[24px] p-8 shadow-md relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d97706] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                MOST POPULAR IN BUNDOORA
              </div>
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Deep</h3>
              <div className="text-[14px] text-[#6b7280] mb-6">Full property scope · Oven & inside cabinets · Grout & hard-to-reach areas</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">
                <span className="text-[16px] text-[#6b7280] font-normal align-top mt-2 inline-block">From</span> $235
              </div>
              <Link href="/book" className="w-full text-center bg-[#d97706] text-white rounded-full py-3 font-semibold hover:bg-[#b46305] transition-colors mt-auto shadow-sm">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Vacate */}
            <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Vacate</h3>
              <div className="text-[14px] text-[#6b7280] mb-6">Bond-back standard · All rooms & surfaces · Inspection ready</div>
              <div className="text-[36px] font-bold text-[#1C1C1C] mb-8">
                <span className="text-[16px] text-[#6b7280] font-normal align-top mt-2 inline-block">From</span> $380
              </div>
              <Link href="/book" className="w-full text-center border border-[#e5e7eb] text-[#1C1C1C] rounded-full py-3 font-semibold hover:bg-gray-50 transition-colors mt-auto">
                Get an Instant Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <div className="bg-[#F5F2EC] py-[80px]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
        <style dangerouslySetInnerHTML={{__html:`
          details[open] { border-left: 3px solid #d97706 !important; padding-left: 1rem; }
        `}} />
      </div>

      {/* SECTION 9 — FINAL CTA */}
      <section className="hero-bundoora relative bg-[#1A2E1A] py-[80px] px-8 text-center overflow-hidden">
        <div className="relative z-10 container mx-auto max-w-[800px]">
          <div className="w-[40px] h-[1px] bg-[#d97706] mx-auto mb-[32px]" />
          
          <div className="text-[11px] text-white/30 tracking-[0.2em] uppercase mb-[16px]">
            Ready to Book
          </div>
          
          <h2 className="text-[36px] md:text-[48px] font-extrabold text-white leading-[1.1] mb-6">
            Book a Cleaner in <span className="text-[#d97706]">Bundoora</span>
          </h2>
          
          <p className="text-[16px] text-white/50 max-w-[460px] mx-auto my-[16px]">
            Get an instant fixed quote for your Bundoora home or rental property. Book online in under a minute - families, landlords and property managers welcome.
          </p>
          
          <span className="text-[#d97706] font-semibold text-[14px] block mb-[32px]">
            5% off your first clean.
          </span>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="bg-[#d97706] text-white rounded-full px-[32px] py-[14px] font-semibold hover:bg-[#b46305] transition-colors w-full sm:w-auto">
              Get an Instant Quote
            </Link>
            <a href="tel:0451423786" className="border border-white/15 text-white rounded-full px-[32px] py-[14px] font-semibold hover:bg-white/5 transition-colors w-full sm:w-auto">
              Call us: 0451 423 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-[#F59E0B]/30 mx-auto mt-[40px] mb-[28px]" />

          <div className="text-[11px] text-white/20 tracking-[0.15em] uppercase mb-[14px]">
            Nearby Areas We Also Service
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            { [{ name: 'Greensborough', isBuilt: true }, { name: 'Reservoir', isBuilt: true }, { name: 'Preston', isBuilt: true }, { name: 'Mernda', isBuilt: true }, { name: 'Mill Park', isBuilt: false }].map(({ name: area, isBuilt }, i) => (
              isBuilt 
                ? <Link 
                key={i} 
                href={`/house-cleaning-${area.toLowerCase().replace(' ', '-')}`}
                className="bg-white/5 border border-white/10 text-white/45 rounded-full px-[16px] py-[6px] text-[13px] hover:border-[#d97706] hover:text-[#d97706] transition-colors"
              >
                {area}
              </Link>
                : <span 
                key={i} 
                
                className="bg-white/5 border border-white/10 text-white/45 rounded-full px-[16px] py-[6px] text-[13px]   transition-colors"
              >
                {area}
              </span>
            )) }
          </div>
        </div>
      </section>
    </main>
  );
}
