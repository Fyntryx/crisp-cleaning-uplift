"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import Breadcrumbs from "@/components/Breadcrumbs";

const faqData = [
  { question: "Do you clean share houses and rental properties in North Melbourne?", answer: "Yes - share houses and rentals are central to North Melbourne's housing mix. Fixed pricing per property, same cleaner every visit, and property manager or landlord bookings are all welcome." },
  { question: "How much does house cleaning cost in North Melbourne?", answer: "Pricing depends on property type and room count. A two-bedroom apartment and a four-bedroom share house are priced differently. Get an exact online quote based on your specific layout." },
  { question: "Can multiple tenants arrange a shared cleaning booking?", answer: "Yes - one booking covers the whole property. Any occupant can manage the account on behalf of the household; access arrangements are confirmed per property, not per tenant." },
  { question: "Do you service the Arden precinct and new apartment developments?", answer: "Yes - including buildings near the Arden Metro Tunnel precinct and along Flemington Road. Provide building access requirements when you book and we coordinate everything ahead of the first clean." },
  { question: "Are cleaning products included for all property types?", answer: "Yes - eco-friendly products are included in every clean. No additional charge for share houses or properties that require higher product volume." },
  { question: "What's the difference between a standard clean and a deep clean?", answer: "A standard clean covers maintenance - surfaces, floors, bathrooms, kitchen, bedrooms. A deep clean adds oven interior, inside cabinets, grout scrubbing, and harder-to-reach areas. Both at a fixed, pre-confirmed price." }
];

const styles = `
  .hero-bg {
    background-image: radial-gradient(circle, #E5E7EB 1px, transparent 1px);
    background-size: 28px 28px;
    background-color: #ffffff;
  }
  .hero-left-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      #d97706 20%,
      #d97706 80%,
      transparent 100%
    );
  }
  .split-screen {
    position: relative;
    width: 100%;
    height: 640px;
    overflow: hidden;
    user-select: none;
  }
  .split-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1C1C1C;
    clip-path: inset(0 50% 0 0);
    transition: clip-path 0s;
  }
  .split-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #F8FAFC;
    clip-path: inset(0 0 0 50%);
    transition: clip-path 0s;
  }
  .split-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: ew-resize;
    z-index: 10;
  }
  .handle-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #d97706;
    transform: translateX(-50%);
  }
  .handle-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #d97706;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(217,119,6,0.4);
    position: relative;
    z-index: 1;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .split-handle:hover .handle-circle {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(217,119,6,0.5);
  }
  .split-handle:active .handle-circle {
    transform: scale(0.95);
  }
  .drag-hint {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 6px 16px;
    border-radius: 99px;
    font-size: 11px;
    letter-spacing: 0.1em;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.5s ease;
    z-index: 20;
  }
  .drag-hint.hidden { opacity: 0; }
  
  .errol-st-text {
    font-size: clamp(52px, 7vw, 88px);
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px #1C1C1C;
    letter-spacing: -0.04em;
    line-height: 0.9;
    display: block;
  }
  .arden-text {
    font-size: clamp(52px, 7vw, 88px);
    font-weight: 900;
    color: #1C1C1C;
    letter-spacing: -0.04em;
    line-height: 0.9;
    display: block;
  }
  .hero-bottom-rule {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e5e7eb 30%, #e5e7eb 70%, transparent);
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .cta-btn-primary {
    background: #d97706;
    color: white;
    border-radius: 99px;
    padding: 14px 32px;
    transition: all 0.2s;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .cta-btn-primary:hover {
    background: #b45309;
    transform: translateY(-1px);
  }
  .cta-btn-secondary {
    border: 1.5px solid #e5e7eb;
    color: #374151;
    border-radius: 99px;
    padding: 14px 32px;
    transition: all 0.2s;
    display: inline-block;
    font-weight: 600;
  }
  .cta-btn-secondary:hover {
    border-color: #d97706;
    color: #d97706;
  }
  .pill-link {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    color: #6b7280;
    border-radius: 99px;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
  }
  .pill-link:hover {
    border-color: #d97706;
    color: #d97706;
  }
  .pill-link .arrow-icon {
    opacity: 0;
    margin-left: -8px;
    transition: all 0.2s ease;
    width: 0;
    height: 12px;
  }
  .pill-link:hover .arrow-icon {
    opacity: 1;
    margin-left: 6px;
    width: 12px;
  }
`;

function AnimatedRow({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedStatBlock({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function NorthMelbourneClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hideHint, setHideHint] = useState(false);
  const splitScreenRef = useRef<HTMLDivElement>(null);

  // Calculate opacities to prevent ugly text chopping
  const leftOpacity = splitPercent > 45 ? 1 : Math.max(0, (splitPercent - 20) / 25);
  const rightOpacity = splitPercent < 55 ? 1 : Math.max(0, (80 - splitPercent) / 25);

  useEffect(() => {
    setIsMounted(true);

    // Hint animation on load — nudge handle left then settle
    const t1 = setTimeout(() => {
      setSplitPercent(38);
      const t2 = setTimeout(() => {
        if (!isDragging) setSplitPercent(50);
      }, 600);
      return () => clearTimeout(t2);
    }, 1200);

    const t3 = setTimeout(() => {
      setHideHint(true);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t3);
    };
  }, []);

  const updateSplit = (clientX: number) => {
    if (!splitScreenRef.current) return;
    const rect = splitScreenRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(15, Math.min(85, percent));
    setSplitPercent(percent);
    setHideHint(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSplit(e.clientX);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updateSplit(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const titleWords = ["House", "Cleaning"];

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-white selection:bg-[#d97706] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* SECTION 1 — HERO */}
      <section className="hero-bg relative min-h-[92vh] overflow-hidden flex flex-col md:grid md:grid-cols-[1.1fr_1fr] items-center">
        <div className="hero-left-accent hidden md:block" />
        
        {/* Left Column */}
        <div className="relative z-10 w-full px-6 pt-[120px] pb-12 md:pl-[80px] md:pr-[48px] md:py-[80px]">
          <div className="mb-[32px]">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "House Cleaning North Melbourne", href: "/house-cleaning-north-melbourne" }
              ]} 
            />
          </div>

          <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] text-[11px] font-semibold tracking-[0.12em] rounded-full px-4 py-1.5 mb-6 inline-block uppercase">
            ● Errol Street · Arden · Inner North
          </div>

          <h1 className="text-[48px] md:text-[72px] font-extrabold text-[#1C1C1C] leading-[1.0] tracking-[-0.04em]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="inline-block text-[#d97706]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              North Melbourne
            </motion.span>
          </h1>

          <motion.p 
            className="mt-5 text-[15px] text-[#6b7280] leading-[1.8] max-w-[480px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            North Melbourne's housing stock is more genuinely varied than almost any other inner-ring suburb - Victorian single and double-storey terraces and workers' cottages near Errol Street sit alongside newer apartment developments near the Arden Metro Tunnel precinct and renovated townhouses across the suburb's eastern fringe. A cleaning service that works here has to price accurately for every configuration. Crisp's fixed, checklist-based model does exactly that: your price is set by your home's actual scope, your cleaner is the same person every visit, and the entire booking takes under a minute online.
          </motion.p>

          <motion.div 
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3.5 py-1.5 text-[12px] text-[#374151]">4.9 ★ Google</div>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3.5 py-1.5 text-[12px] text-[#374151]">97% Same Cleaner</div>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3.5 py-1.5 text-[12px] text-[#374151]">Eco-Friendly</div>
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3.5 py-1.5 text-[12px] text-[#374151]">72hr Guarantee</div>
          </motion.div>

          <motion.div 
            className="mt-8 flex gap-3 flex-wrap items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="/booking" className="cta-btn-primary flex items-center whitespace-nowrap w-fit">
              Get an Instant Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a href="#whats-included" className="cta-btn-secondary">
              See what's included
            </a>
            <div className="w-full mt-2">
              <span className="text-[12px] text-[#9ca3af]">15% off your first clean.</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Typographic Panel) */}
        <div className="relative z-10 w-full h-full hidden md:flex flex-col justify-center px-[80px] py-[80px] pl-[32px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <span className="errol-st-text">ERROL ST</span>
              <div className="text-[11px] text-[#9ca3af] tracking-[0.1em] text-right mt-2">
                Victorian terraces · Workers' cottages
              </div>
            </div>

            <div className="w-full h-[2px] bg-[#d97706] my-6 relative">
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[9px] font-bold text-[#d97706] tracking-[0.25em] uppercase">
                NORTH MELBOURNE
              </div>
            </div>

            <div>
              <span className="arden-text">ARDEN</span>
              <div className="text-[11px] text-[#9ca3af] tracking-[0.1em] text-right mt-2">
                Metro Tunnel · New apartments
              </div>
            </div>

            <div className="text-[10px] text-[#d1d5db] text-right mt-5 tracking-[0.08em]">
              Est. 1850s  ·  Arden 2025+
            </div>
          </motion.div>
        </div>

        <div className="hero-bottom-rule" />
      </section>

      {/* SECTION 2 — PROOF STRIP */}
      <section className="bg-[#1C1C1C] py-[22px]">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap items-center text-[13px] text-white/45 tracking-[0.08em] font-medium text-center">
            <span><span className="text-[#d97706] font-bold">{googleRatingValue} ★</span> Google</span>
            <span className="text-[#F59E0B] opacity-50">·</span>
            <span><span className="text-[#d97706] font-bold">97%</span> Same Cleaner</span>
            <span className="text-[#F59E0B] opacity-50">·</span>
            <span><span className="text-[#d97706] font-bold">100%</span> Eco-Friendly</span>
            <span className="text-[#F59E0B] opacity-50">·</span>
            <span><span className="text-[#d97706] font-bold">72hr</span> Guarantee</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROPERTY TYPES */}
      <section className="relative">
        {/* Intro Paragraph */}
        <div className="container mx-auto px-6 max-w-[1100px] py-12 md:pt-20 md:pb-12 text-center md:text-left">
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[900px] mx-auto md:mx-0">
            Most cleaning services apply a single pricing template across all suburbs. North Melbourne doesn't fit one template - the gap between a double-fronted terrace near Errol Street and a one-bedroom apartment on Flemington Road is significant in scope, layout, access requirements, and what a thorough clean actually involves. Crisp prices each property on its own terms.
          </p>
        </div>

        {/* Desktop Split Screen */}
        <div className="hidden md:block split-screen" ref={splitScreenRef}>
          {/* Left Panel */}
          <div className="split-left" style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}>
            <div 
              className="px-[80px] py-[64px] pl-[64px] h-full flex flex-col justify-center max-w-[560px]"
              style={{ opacity: leftOpacity, transition: isDragging ? 'none' : 'opacity 0.3s ease' }}
            >
              <div className="text-[9px] font-bold text-white/25 tracking-[0.3em] uppercase mb-6">
                ERROL STREET PRECINCT
              </div>
              <div className="w-[32px] h-[2px] bg-[#d97706] mb-6" />
              <div className="bg-[#d97706]/15 border border-[#d97706]/30 text-[#d97706] rounded-full px-3 py-1 text-[11px] font-semibold mb-4 inline-block self-start">
                Heritage · Victorian
              </div>
              <h3 className="text-[26px] font-bold text-white leading-[1.25] mb-[14px]">
                Victorian Terraces and Workers' Cottages Near Errol Street
              </h3>
              <p className="text-[14px] text-white/55 leading-[1.75]">
                The period terraces and workers' cottages concentrated near Errol Street are single or double-fronted Victorian-era properties with original timber floors, compact kitchens, and often a rear extension that adds a modern living space behind the heritage shell. Our scope accounts for both the original and extended sections of these layouts without a separate quote for the addition.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Original timber floors</div>
                <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Heritage shell</div>
                <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Rear extensions</div>
                <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Victorian era</div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="split-right" style={{ clipPath: `inset(0 0 0 ${splitPercent}%)` }}>
            <div 
              className="px-[64px] py-[64px] pr-[80px] h-full flex flex-col justify-center max-w-[560px] ml-auto"
              style={{ opacity: rightOpacity, transition: isDragging ? 'none' : 'opacity 0.3s ease' }}
            >
              <div className="text-[9px] font-bold text-[#9ca3af] tracking-[0.3em] uppercase mb-6">
                ARDEN & FLEMINGTON RD PRECINCT
              </div>
              <div className="w-[32px] h-[2px] bg-[#d97706] mb-6" />
              <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-full px-3 py-1 text-[11px] font-semibold mb-4 inline-block self-start">
                Arden · New Build
              </div>
              <h3 className="text-[26px] font-bold text-[#1C1C1C] leading-[1.25] mb-[14px]">
                Apartments and Townhouses Near the Arden and Flemington Road Fringe
              </h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                The western fringe along Flemington Road and toward the Arden Metro Tunnel precinct has seen significant apartment and townhouse development. New-build properties in this zone - stone benchtops, engineered floors, modern bathrooms - sit in the same suburb as heritage terraces and are handled within the same fixed-pricing system, correctly scoped for their specific layout.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Stone benchtops</div>
                <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Engineered floors</div>
                <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Modern bathrooms</div>
                <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Fixed pricing</div>
              </div>
            </div>
          </div>

          <div 
            className="split-handle" 
            style={{ left: `${splitPercent}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="handle-line" />
            <div className="handle-circle">
              <span>←→</span>
            </div>
          </div>

          <div className={`drag-hint ${hideHint ? 'hidden' : ''}`}>
            ← drag to explore →
          </div>
        </div>

        {/* Mobile Stacked View */}
        <div className="md:hidden">
          {/* Heritage Card */}
          <div className="bg-[#1C1C1C] px-6 py-12">
            <div className="text-[9px] font-bold text-white/25 tracking-[0.3em] uppercase mb-6">
              ERROL STREET PRECINCT
            </div>
            <div className="w-[32px] h-[2px] bg-[#d97706] mb-6" />
            <div className="bg-[#d97706]/15 border border-[#d97706]/30 text-[#d97706] rounded-full px-3 py-1 text-[11px] font-semibold mb-4 inline-block">
              Heritage · Victorian
            </div>
            <h3 className="text-[26px] font-bold text-white leading-[1.25] mb-[14px]">
              Victorian Terraces and Workers' Cottages Near Errol Street
            </h3>
            <p className="text-[14px] text-white/55 leading-[1.75]">
              The period terraces and workers' cottages concentrated near Errol Street are single or double-fronted Victorian-era properties with original timber floors, compact kitchens, and often a rear extension that adds a modern living space behind the heritage shell. Our scope accounts for both the original and extended sections of these layouts without a separate quote for the addition.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Original timber floors</div>
              <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Heritage shell</div>
              <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[12px] text-white/55">Rear extensions</div>
            </div>
          </div>

          {/* Arden Card */}
          <div className="bg-[#F8FAFC] px-6 py-12">
            <div className="text-[9px] font-bold text-[#9ca3af] tracking-[0.3em] uppercase mb-6">
              ARDEN & FLEMINGTON RD PRECINCT
            </div>
            <div className="w-[32px] h-[2px] bg-[#d97706] mb-6" />
            <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-full px-3 py-1 text-[11px] font-semibold mb-4 inline-block">
              Arden · New Build
            </div>
            <h3 className="text-[26px] font-bold text-[#1C1C1C] leading-[1.25] mb-[14px]">
              Apartments and Townhouses Near the Arden and Flemington Road Fringe
            </h3>
            <p className="text-[14px] text-[#6b7280] leading-[1.75]">
              The western fringe along Flemington Road and toward the Arden Metro Tunnel precinct has seen significant apartment and townhouse development. New-build properties in this zone - stone benchtops, engineered floors, modern bathrooms - sit in the same suburb as heritage terraces and are handled within the same fixed-pricing system, correctly scoped for their specific layout.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Stone benchtops</div>
              <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Engineered floors</div>
              <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Modern bathrooms</div>
            </div>
          </div>
        </div>

        {/* Third Property Type (Share Houses) */}
        <div className="bg-white py-12 md:py-[48px] px-6 border-t border-[#f3f4f6]">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-[32px] items-start">
            <div className="text-[64px] md:text-[80px] font-black text-[#f3f4f6] leading-[1]">
              03
            </div>
            <div>
              <div className="text-[#1C1C1C] text-[13px] font-semibold mb-2">Shared · Near Uni</div>
              <h3 className="text-[22px] md:text-[26px] font-bold text-[#1C1C1C] mb-3">Share Houses and Multi-Room Rental Properties</h3>
              <p className="text-[15px] text-[#6b7280] leading-[1.75] max-w-[600px] mb-5">
                North Melbourne's proximity to the University of Melbourne, RMIT, and the CBD makes it a significant share-house suburb. Our pricing works per property rather than per occupant, and we're experienced with the higher-traffic common areas - kitchens, bathrooms, and hallways - that accumulate considerably faster in shared living than in single-occupant homes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[12px] text-[#6b7280] bg-[#f8fafc] border border-[#e5e7eb] px-3 py-1 rounded-full">Per-property pricing</span>
                <span className="text-[12px] text-[#6b7280] bg-[#f8fafc] border border-[#e5e7eb] px-3 py-1 rounded-full">Common areas</span>
                <span className="text-[12px] text-[#6b7280] bg-[#f8fafc] border border-[#e5e7eb] px-3 py-1 rounded-full">Near Uni Melbourne</span>
                <span className="text-[12px] text-[#6b7280] bg-[#f8fafc] border border-[#e5e7eb] px-3 py-1 rounded-full">RMIT precinct</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED (Field notes) */}
      <section id="whats-included" className="bg-[#F8FAFC] py-20">
        <div className="container mx-auto px-6 max-w-[1100px] mb-14">
          <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-4">
            Scope & Checklist
          </div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] leading-tight mb-3">
            What's Included in Your North Melbourne Clean
          </h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[580px]">
            Every North Melbourne clean covers the same core scope - kitchen, bathrooms, floors, bedrooms, and living areas - with your property type and room count setting the price. The checklist is confirmed before the cleaner arrives; there's no ambiguity about what's included on the day.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="border-t border-[#e5e7eb]">
            <AnimatedRow delay={0.1}>
              <div className="py-10 border-b border-[#e5e7eb] flex flex-col md:grid md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start">
                <svg width="80" height="80" viewBox="0 0 80 80" className="hidden md:block">
                  <text x="4" y="68" fontSize="72" fontWeight="900" fill="none" stroke="#E5E7EB" strokeWidth="2" fontFamily="system-ui, sans-serif">01</text>
                </svg>
                <div className="md:hidden text-[48px] font-black text-transparent [-webkit-text-stroke:2px_#E5E7EB] leading-none mb-2">01</div>
                <div>
                  <div className="text-[10px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-2">EVERY VISIT</div>
                  <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2.5">Kitchen and Bathroom Sanitisation</h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.75] max-w-[580px] mb-4">
                    Kitchen surfaces, stovetop, rangehood, splashback, sink, and bench areas are cleaned to a hygienic standard on every visit. All bathrooms - shower or bath, toilet, basin, mirror, taps, and tiled floor - are sanitised and polished. For share houses with two or more bathrooms, all are covered within the standard scope.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Stovetop & rangehood</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">All bathrooms</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Share house bathrooms</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Tiled floors</span>
                  </div>
                </div>
              </div>
            </AnimatedRow>

            <AnimatedRow delay={0.2}>
              <div className="py-10 border-b border-[#e5e7eb] flex flex-col md:grid md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start">
                <svg width="80" height="80" viewBox="0 0 80 80" className="hidden md:block">
                  <text x="4" y="68" fontSize="72" fontWeight="900" fill="none" stroke="#E5E7EB" strokeWidth="2" fontFamily="system-ui, sans-serif">02</text>
                </svg>
                <div className="md:hidden text-[48px] font-black text-transparent [-webkit-text-stroke:2px_#E5E7EB] leading-none mb-2">02</div>
                <div>
                  <div className="text-[10px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-2">EVERY ROOM</div>
                  <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2.5">Hard Floors, Surfaces and Shared Common Areas</h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.75] max-w-[580px] mb-4">
                    Timber, tile, and vinyl floors throughout the property are swept and mopped. Skirting boards, window sills, accessible surfaces, and door handles are dusted and wiped. For share houses, common areas - hallways, stairwells, and shared living rooms - receive the same systematic attention as individual bedrooms within the agreed scope.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Hallways & stairwells</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">All floor types</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Skirting boards</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Window sills</span>
                  </div>
                </div>
              </div>
            </AnimatedRow>

            <AnimatedRow delay={0.3}>
              <div className="py-10 border-b border-[#e5e7eb] flex flex-col md:grid md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start">
                <svg width="80" height="80" viewBox="0 0 80 80" className="hidden md:block">
                  <text x="4" y="68" fontSize="72" fontWeight="900" fill="none" stroke="#E5E7EB" strokeWidth="2" fontFamily="system-ui, sans-serif">03</text>
                </svg>
                <div className="md:hidden text-[48px] font-black text-transparent [-webkit-text-stroke:2px_#E5E7EB] leading-none mb-2">03</div>
                <div>
                  <div className="text-[10px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-2">FULL SCOPE</div>
                  <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2.5">Bedrooms and Living Spaces</h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.75] max-w-[580px] mb-4">
                    Every bedroom is vacuumed or mopped depending on floor type, surfaces dusted, and accessible areas addressed. Living and dining areas receive the same treatment. Your quote specifies exactly which rooms are covered before the first cleaner arrives, so there's no question about scope on the day.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">All bedrooms</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Living & dining</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Accessible areas</span>
                    <span className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-[12px] text-[#374151]">Scope confirmed</span>
                  </div>
                </div>
              </div>
            </AnimatedRow>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP (Editorial Typographic) */}
      <section className="bg-[#1C1C1C] py-24">
        <div className="container mx-auto px-6 max-w-[1100px] mb-16">
          <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-4">
            The Crisp Difference
          </div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-white leading-tight mb-3">
            Why North Melbourne Residents Choose Crisp
          </h2>
          <p className="text-[16px] text-white/40 leading-[1.8] max-w-[560px]">
            North Melbourne's house cleaning keyword carries the lowest competition index in the dataset - 1 out of 100. There is no entrenched dominant provider here. A quality, locally committed service can establish top rankings quickly and hold them. That's the market context; here's the operational one that matters to residents.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="border-t border-white/5">
            <AnimatedStatBlock delay={0.15}>
              <div className="py-12 border-b border-white/5 flex flex-col md:grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 md:align-items-baseline">
                <div>
                  <div className="text-[64px] md:text-[80px] font-black text-white leading-[1] tracking-[-4px]">Fixed</div>
                  <div className="text-[10px] font-bold text-white/25 tracking-[0.2em] uppercase mt-2">PRICING ALWAYS</div>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2.5">Fixed Pricing - No Hourly Rate Surprises for Any Property Type</h3>
                  <p className="text-[14px] text-white/50 leading-[1.75] max-w-[540px]">
                    Whether it's a compact one-bedroom apartment near the Arden precinct or a four-bedroom share house near the Town Hall, pricing is set by the actual scope of the property before any cleaner arrives. No overrunning hourly rate, no ambiguity about which rooms are and aren't included.
                  </p>
                  <div className="bg-[#d97706]/10 border border-[#d97706]/25 text-[#d97706] rounded-full px-3.5 py-1 text-[11px] font-bold mt-4 inline-block">
                    Price confirmed online
                  </div>
                </div>
              </div>
            </AnimatedStatBlock>

            <AnimatedStatBlock delay={0.3}>
              <div className="py-12 border-b border-white/5 flex flex-col md:grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 md:align-items-baseline">
                <div>
                  <div className="text-[64px] md:text-[80px] font-black text-white leading-[1] tracking-[-4px]">97%</div>
                  <div className="text-[10px] font-bold text-white/25 tracking-[0.2em] uppercase mt-2">SAME-CLEANER RATE</div>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2.5">Same Cleaner Every Visit for Homes, Rentals and Share Houses Alike</h3>
                  <p className="text-[14px] text-white/50 leading-[1.75] max-w-[540px]">
                    Your cleaner is assigned at the first booking and returns on your schedule. For share houses where occupants change over time, the assigned cleaner maintains consistency with the property regardless - they know the layout, the access arrangement, and which areas need the most attention by the second visit. Our 97% same-cleaner continuity rate applies to all property types.
                  </p>
                  <div className="bg-[#d97706]/10 border border-[#d97706]/25 text-[#d97706] rounded-full px-3.5 py-1 text-[11px] font-bold mt-4 inline-block">
                    97% continuity rate
                  </div>
                </div>
              </div>
            </AnimatedStatBlock>

            <AnimatedStatBlock delay={0.45}>
              <div className="py-12 border-b border-white/5 flex flex-col md:grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 md:align-items-baseline">
                <div>
                  <div className="text-[64px] md:text-[80px] font-black text-white leading-[1] tracking-[-4px]">60s</div>
                  <div className="text-[10px] font-bold text-white/25 tracking-[0.2em] uppercase mt-2">TO BOOK ONLINE</div>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2.5">Instant Quotes Online - No Phone Calls, No Walkthroughs</h3>
                  <p className="text-[14px] text-white/50 leading-[1.75] max-w-[540px]">
                    North Melbourne's variety of property types is exactly why our online quoting system works: enter your room count and service type, receive a fixed price in real time. No site visit required, no quote request form, no waiting three days for an email response.
                  </p>
                  <div className="bg-[#d97706]/10 border border-[#d97706]/25 text-[#d97706] rounded-full px-3.5 py-1 text-[11px] font-bold mt-4 inline-block">
                    Real-time pricing
                  </div>
                </div>
              </div>
            </AnimatedStatBlock>

            <AnimatedStatBlock delay={0.6}>
              <div className="py-12 border-b border-white/5 flex flex-col md:grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 md:align-items-baseline">
                <div>
                  <div className="text-[64px] md:text-[80px] font-black text-white leading-[1] tracking-[-4px]">72hr</div>
                  <div className="text-[10px] font-bold text-white/25 tracking-[0.2em] uppercase mt-2">RE-CLEAN GUARANTEE</div>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2.5">Booking in Under a Minute, Any Time</h3>
                  <p className="text-[14px] text-white/50 leading-[1.75] max-w-[540px]">
                    The entire process - quote, schedule, cleaner assignment, confirmation - is completed online in under 60 seconds. Your first clean includes 15% off. The same cleaner returns on whichever schedule works for your household.
                  </p>
                  <div className="bg-[#d97706]/10 border border-[#d97706]/25 text-[#d97706] rounded-full px-3.5 py-1 text-[11px] font-bold mt-4 inline-block">
                    15% off first clean
                  </div>
                </div>
              </div>
            </AnimatedStatBlock>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-4 text-center">
            Client Stories
          </div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] leading-tight mb-12 text-center">
            What North Melbourne Residents Say
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 max-w-[1100px] mx-auto">
            {/* Large Card Left */}
            <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-8 md:p-12 border-l-4 border-l-[#d97706] flex flex-col justify-center">
              <div className="text-[80px] text-[#d97706] opacity-15 leading-[0.7] font-serif mb-4">"</div>
              <p className="text-[18px] md:text-[22px] text-[#1C1C1C] font-serif italic leading-[1.6] mb-6">
                Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.
              </p>
              <div>
                <div className="font-bold text-[#1C1C1C]">Kaan S.</div>
                <div className="text-[14px] text-[#6b7280]">Regular Fortnightly Client</div>
              </div>
            </div>

            {/* Two Stacked Cards Right */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#1C1C1C] rounded-[16px] p-7 flex-1 flex flex-col justify-center">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-white/80 leading-[1.6] mb-4">
                  "One of the best decisions we've made. Coming home to a clean house every week has made life much easier."
                </p>
                <div className="font-semibold text-white text-[13px]">Aiden A.</div>
              </div>

              <div className="bg-[#1C1C1C] rounded-[16px] p-7 flex-1 flex flex-col justify-center">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#d97706]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-white/80 leading-[1.6] mb-4">
                  "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp"
                </p>
                <div className="font-semibold text-white text-[13px]">Natch L.</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-[13px] text-[#6b7280]">
            ★★★★★ Rated {googleRatingValue} on Google · {googleReviewCount} verified reviews
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="text-[11px] font-bold text-[#d97706] tracking-[0.2em] uppercase mb-4 text-center">
            Transparent Pricing
          </div>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1C1C1C] leading-tight mb-4 text-center">
            North Melbourne House Cleaning Prices
          </h2>
          <p className="text-[16px] text-[#6b7280] max-w-[600px] mx-auto text-center mb-12">
            Fixed pricing based on your room count. No hourly estimates, no surprise charges.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard */}
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[20px] p-8 flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Standard</h3>
              <div className="text-[32px] font-black text-[#1C1C1C] mb-6">From $145</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Up to 3 bed</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>All bathrooms</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Eco products included</span>
                </li>
              </ul>
              <Link href="/booking" className="w-full py-3.5 bg-white border border-[#e5e7eb] text-[#374151] rounded-full text-center font-semibold hover:border-[#d97706] hover:text-[#d97706] transition-colors">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Deep Clean */}
            <div className="bg-white border-2 border-[#d97706] rounded-[20px] p-8 flex flex-col relative shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d97706] text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase whitespace-nowrap">
                Most popular in North Melbourne
              </div>
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Deep</h3>
              <div className="text-[32px] font-black text-[#1C1C1C] mb-6">From $235</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span className="font-medium">Full property scope</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Oven & inside cabinets</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Grout & hard-to-reach areas</span>
                </li>
              </ul>
              <Link href="/booking" className="w-full py-3.5 bg-[#d97706] text-white rounded-full text-center font-semibold hover:bg-[#b45309] transition-colors">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Vacate */}
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[20px] p-8 flex flex-col">
              <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-2">Vacate</h3>
              <div className="text-[32px] font-black text-[#1C1C1C] mb-6">From $380</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Bond-back standard</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>All rooms & surfaces</span>
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#374151]">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" />
                  <span>Inspection ready</span>
                </li>
              </ul>
              <Link href="/booking" className="w-full py-3.5 bg-white border border-[#e5e7eb] text-[#374151] rounded-full text-center font-semibold hover:border-[#d97706] hover:text-[#d97706] transition-colors">
                Get an Instant Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-[#F8FAFC] py-24">
        <style dangerouslySetInnerHTML={{__html: `
          .faq-open-border { border-left-color: #d97706 !important; }
        `}} />
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-white py-[80px] px-8 text-center border-t border-[#f3f4f6] relative overflow-hidden">
        {/* Subtle dot texture */}
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        
        <div className="relative z-10">
          <div className="w-[40px] h-[2px] bg-[#d97706] mx-auto mb-8" />
          
          <div className="text-[11px] text-[#9ca3af] font-bold uppercase tracking-[0.2em] mb-4">
            Ready to Book
          </div>
          
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-[#1C1C1C] leading-[1.1] mb-4">
            Book a Cleaner in <span className="text-[#d97706]">North Melbourne</span>
          </h2>
          
          <p className="text-[16px] text-[#6b7280] max-w-[460px] mx-auto mt-4 mb-2 leading-[1.6]">
            Get an instant fixed quote for your North Melbourne home, share house or apartment. Book online in under a minute - 15% off your first clean.
          </p>
          
          <span className="text-[#d97706] font-semibold text-[14px] block mb-8">
            15% off your first clean.
          </span>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking" className="cta-btn-primary w-full sm:w-auto shadow-sm">
              Get an Instant Quote
            </Link>
            <a href="tel:0451423786" className="cta-btn-secondary w-full sm:w-auto bg-white">
              Call us: 0451 423 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-[#fed7aa] mx-auto mt-10 mb-7" />

          <span className="text-[11px] text-[#9ca3af] font-bold uppercase tracking-[0.15em] mb-3 block">
            Nearby Areas We Also Service
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            { [{ name: 'Brunswick', isBuilt: true }, { name: 'Melbourne CBD', isBuilt: true }, { name: 'Maribyrnong', isBuilt: true }, { name: 'Coburg', isBuilt: true }, { name: 'Carlton', isBuilt: false }].map(({ name: area, isBuilt }, i) => (
              isBuilt 
                ? <Link 
                key={i} 
                href={`/house-cleaning-${area.toLowerCase().replace(' ', '-')}`}
                className="pill-link group"
              >
                {area}
                <ArrowRight className="arrow-icon" />
              </Link>
                : <span 
                key={i} 
                
                className="pill-link group"
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
