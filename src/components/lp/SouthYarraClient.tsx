"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ArrowRight, Star, CheckCircle2, Building2, Home, MapPin, Key, UserCheck, ClipboardCheck, Building, Bath, Layers, CheckCircle } from "lucide-react";
import FAQ from "@/components/lp/FAQ";

const defaultReviews = [
  { text: "Honestly felt like a brand new home.", author: "Andre B" },
  { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
  { text: "One of the best decisions we've made. Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" }
];

const faqData = [
  {
    question: "Do you clean high-rise apartments near Chapel Street?",
    answer: "Yes - high-rise and mid-rise apartments near Chapel Street and Toorak Road are central to our South Yarra service. Building access is coordinated at the initial booking for every property.",
  },
  {
    question: "How much does apartment cleaning cost in South Yarra?",
    answer: "Pricing is based on your apartment's actual room count. A studio and a three-bedroom apartment are priced differently. Get an exact fixed quote online in under a minute.",
  },
  {
    question: "Can you coordinate concierge and fob access for my building?",
    answer: "Yes - access details are collected at the initial booking and managed for every visit. Your cleaner arrives knowing the building's sign-in process without you coordinating it before each appointment.",
  },
  {
    question: "Do you offer end-of-lease cleaning in South Yarra?",
    answer: "Yes - vacate cleaning is available across all South Yarra property types including apartments. Fixed pricing, inspection-ready standard, bond-back guarantee. Get a separate vacate quote online.",
  },
  {
    question: "Can I get the same cleaner for my apartment every fortnight?",
    answer: "Yes. Your cleaner is assigned at booking and returns on your chosen schedule. 97% of recurring Crisp clients receive the same cleaner at every visit.",
  },
  {
    question: "Are cleaning products included for all South Yarra property types?",
    answer: "Yes - eco-friendly products are included in every clean. For heritage terrace properties, appropriate low-moisture products are used on original floors and period surfaces.",
  }
];

const ScrambleText = ({ text, color = "#ffffff" }: { text: string, color?: string }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [hasScrambled, setHasScrambled] = useState(false);
  
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasScrambled) {
          setHasScrambled(true);
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          const steps = 12;
          const duration = 600;
          const stepDuration = duration / steps;
          let step = 0;
          
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            el.textContent = text;
            return;
          }

          const interval = setInterval(() => {
            if (step >= steps) {
              el.textContent = text;
              clearInterval(interval);
              return;
            }
            el.textContent = text
              .split('')
              .map((char, i) => 
                i < (step / steps) * text.length 
                  ? char 
                  : chars[Math.floor(Math.random() * chars.length)]
              )
              .join('');
            step++;
          }, stepDuration);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, hasScrambled]);

  return (
    <div ref={elRef} style={{ color, fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>
      {text}
    </div>
  );
}

const AnimatedRatingBar = ({ percentage, label, delay = 0 }: { percentage: number, label: string, delay?: number }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elRef} className="w-full">
      <div className="rating-bar">
        <div className="rating-fill" style={{ width: inView ? `${percentage}%` : '0%' }} />
      </div>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#d97706' }}>{label}</div>
    </div>
  );
}

export default function SouthYarraClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [activePropertyState, setActivePropertyState] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIncluded, setActiveIncluded] = useState<number | null>(0);
  const [activeBoardRow, setActiveBoardRow] = useState<number | null>(null);

  // Intersection Observer for the numbered rows
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.numbered-row').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Sticky Left Panel
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActivePropertyState(Number(entry.target.getAttribute('data-state')));
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.property-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Carousel Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const getLeftPanelBackground = () => {
    if (activePropertyState === 2) return '#0c4a6e';
    return '#1a1a1a';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .sy-hero-pattern {
          background-image: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 40px,
            rgba(0,0,0,0.015) 40px,
            rgba(0,0,0,0.015) 41px
          );
        }
        
        .sy-split-text-solid {
          color: #1a1a1a;
          font-weight: 900;
        }
        
        .sy-split-text-outline {
          color: transparent;
          -webkit-text-stroke: 3px #1a1a1a;
          font-weight: 900;
        }
        
        @media (max-width: 768px) {
          .sy-split-text-outline {
            -webkit-text-stroke: 2px #1a1a1a;
          }
        }

        .sy-hero-address {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          text-align: right;
          line-height: 0.9;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .sy-hero-accent-line {
          position: absolute;
          left: 48px;
          top: 15%;
          bottom: 15%;
          width: 3px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            #d97706 20%,
            #d97706 80%,
            transparent 100%
          );
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .sy-hero-address { display: none; }
          .sy-hero-accent-line { display: none; }
        }

        .board-headers {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 180px;
          gap: 24px;
          padding: 12px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 0;
        }
        @media (max-width: 640px) {
          .board-headers { display: none; }
        }
        .row-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 44px;
          gap: 24px;
          padding: 28px 32px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .row-header {
            grid-template-columns: 1fr 44px;
            padding: 24px;
          }
          .hide-on-mobile { display: none; }
        }
        .rating-bar {
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .rating-fill {
          height: 100%;
          background: #d97706;
          border-radius: 99px;
          width: 0%;
          transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .rating-fill { transition: none; }
        }
        .row-body {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: 
            max-height 0.5s cubic-bezier(0.22,1,0.36,1),
            opacity 0.3s ease 0.1s;
        }
        .board-row.open .row-body {
          max-height: 300px;
          opacity: 1;
        }
        @media (max-width: 640px) {
          .board-row.open .row-body {
            max-height: 500px;
          }
        }

        .item-body {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: 
            max-height 0.4s cubic-bezier(0.22,1,0.36,1),
            opacity 0.3s ease;
        }
        .item.open .item-body {
          max-height: 400px;
          opacity: 1;
        }

        .numbered-row {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .numbered-row.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .numbered-row:nth-child(1) { transition-delay: 0s; }
        .numbered-row:nth-child(2) { transition-delay: 0.15s; }
        .numbered-row:nth-child(3) { transition-delay: 0.3s; }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
          .numbered-row { opacity: 1; transform: none; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* FAQ Border Override for South Yarra */
        .group[open] > summary > div { border-left-color: #d97706 !important; }
      `}} />

      {/* SECTION 1 — HERO */}
      <section className="bg-[#111111] min-h-[92vh] relative overflow-hidden flex items-center">
        
        {/* Address watermark */}
        <div className="sy-hero-address text-[clamp(60px,9vw,110px)] font-[900] text-[#ffffff] opacity-[0.05] tracking-[-0.03em]" aria-hidden="true">
          <div>CHAPEL ST</div>
          <div>SOUTH YARRA</div>
          <div>VIC 3141</div>
        </div>

        {/* Thin vertical orange line */}
        <div className="sy-hero-accent-line" />

        {/* Content block */}
        <div className="relative z-10 pt-[120px] pb-[80px] px-[32px] md:pl-[96px] md:pr-[80px] max-w-[640px]">
          
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mb-[32px]">
            Home › House Cleaning South Yarra
          </div>
          
          <div className="inline-block bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] text-[11px] font-[600] tracking-[0.12em] uppercase rounded-[99px] px-[16px] py-[6px] mb-[24px]">
            ● Apartments & Heritage Homes · South Yarra
          </div>
          
          <h1 className="text-[42px] md:text-[64px] font-[800] text-[#ffffff] leading-[1.0] tracking-[-0.03em] flex flex-col">
            <span>House Cleaning</span>
            <span className="text-[#d97706]">South Yarra</span>
            <span>Melbourne</span>
          </h1>
          
          <p className="mt-[20px] text-[16px] text-[rgba(255,255,255,0.5)] leading-[1.7] max-w-[420px]">
            Apartments near Chapel Street. <br />
            Period homes near the Yarra.<br />
            Same cleaner. Fixed pricing.
          </p>
          
          <div className="mt-[28px] flex flex-wrap gap-[8px]">
            {[`${googleRatingValue} ★ Google`, '97% Same Cleaner', 'Eco-Friendly', '72hr Guarantee'].map(pill => (
              <span key={pill} className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-[99px] px-[14px] py-[6px] text-[12px] text-[rgba(255,255,255,0.6)]">
                {pill}
              </span>
            ))}
          </div>
          
          <div className="mt-[32px] flex gap-[12px] flex-wrap">
            <a href="/#booking" className="bg-[#d97706] text-white rounded-[99px] px-[28px] py-[14px] font-[600] transition-all hover:bg-[#b45309]">
              Get an Instant Quote
            </a>
            <a href="#included" className="border border-[rgba(255,255,255,0.2)] text-white rounded-[99px] px-[28px] py-[14px] transition-colors hover:border-[#d97706] hover:text-[#d97706]">
              See what's included
            </a>
          </div>
          
          <div className="text-[12px] text-[rgba(255,255,255,0.25)] mt-[10px]">
            15% off your first clean. Fixed price, no hourly surprises.
          </div>
        </div>

        {/* Bottom edge thin orange line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d97706]" />
      </section>

            {/* MERGED SECTION 2 & 3 — PAGE INTRO & PROPERTY TYPES */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[56px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[16px]">
            South Yarra's Housing Stock
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1a1a1a] mb-[32px] leading-[1.2]">
            Cleaning Every Property Type in South Yarra
          </h2>
          <p className="text-[17px] text-[#374151] leading-[1.9] max-w-[720px]">
            South Yarra's residential profile is defined by two overlapping realities: an exceptionally dense apartment stock near Chapel Street and Toorak Road, and a pocket of period heritage homes on the suburb's quieter streets closer to the Yarra River. The apartment density is significant - many buildings have concierge access, visitor registration requirements, and lift booking windows that need coordinating before a cleaning visit. The heritage homes near Como House have surface requirements entirely different to the modern apartment stock. Crisp services both property types across South Yarra with fixed, scope-based pricing, pre-coordinated building access, and the same cleaner returning every visit.
          </p>
          <div className="w-[40px] h-[2px] bg-[#d97706] mt-[28px]" />
        </div>

        <div className="property-grid grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-[16px] max-w-[1100px] mx-auto px-[24px] md:px-[48px] mt-[48px]">
          
          {/* Card 1 — Chapel Street (LARGE) */}
          <div className="property-card property-card-dark bg-[#111111] rounded-[20px] p-[32px] md:p-[44px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(217,119,6,0.15)]">
            <div className="absolute bottom-[-20px] right-[-10px] text-[180px] font-[900] text-[rgba(255,255,255,0.03)] leading-none pointer-events-none select-none">
              01
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Chapel Street · High-Rise
                </div>
                <Building2 className="text-[#d97706] w-[24px] h-[24px]" />
              </div>
              
              <h3 className="text-[22px] font-[700] text-[#ffffff] mb-[12px] leading-[1.3]">
                High-Rise and Mid-Rise Apartments Near Chapel Street
              </h3>
              
              <p className="text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.75]">
                The apartment towers along and around Chapel Street and Toorak Road form the dominant residential form in central South Yarra - buildings of 15 to 30-plus storeys with concierge desks, managed access systems, and visitor registration requirements. We coordinate building access details at the initial booking and manage the process for every subsequent visit, so the resident isn't handling access logistics before each clean.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Concierge managed', 'Fob & intercom', 'Lift bookings', 'Same process every visit'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[12px] py-[5px] text-[12px] text-[rgba(255,255,255,0.55)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — Heritage Homes (small) */}
          <div className="property-card bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[24px] md:p-[32px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute bottom-[-10px] right-[-8px] text-[120px] font-[900] text-[rgba(0,0,0,0.03)] leading-none pointer-events-none select-none">
              02
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[14px]">
                <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Domain Road · Yarra River
                </div>
                <Home className="text-[#d97706] w-[20px] h-[20px]" />
              </div>
              
              <h3 className="text-[17px] font-[700] text-[#1a1a1a] mb-[10px] leading-[1.35]">
                Period Terraces and Heritage Homes Near the Yarra River Corridor
              </h3>
              
              <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                The streets between Domain Road and the Yarra River - including properties near Como House on the suburb's southern edge - contain period terraces, Victorian homes, and established townhouses representing a residential character entirely distinct from the Chapel Street high-rise density. These heritage properties have original surfaces, period fittings, and established gardens that reflect long-tenure ownership rather than high-turnover apartment living.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Period terraces', 'Victorian homes', 'Original surfaces', 'Low-moisture products'].map(tag => (
                  <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-[99px] px-[10px] py-[4px] text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 — Prahran (small) */}
          <div className="property-card bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[24px] md:p-[32px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute bottom-[-10px] right-[-8px] text-[120px] font-[900] text-[rgba(0,0,0,0.03)] leading-none pointer-events-none select-none">
              03
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[14px]">
                <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Commercial Road · Prahran
                </div>
                <MapPin className="text-[#d97706] w-[20px] h-[20px]" />
              </div>
              
              <h3 className="text-[17px] font-[700] text-[#1a1a1a] mb-[10px] leading-[1.35]">
                Properties Near the Prahran Market on Commercial Road
              </h3>
              
              <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                The Prahran Market on Commercial Road sits within South Yarra's suburb boundary - a local landmark that anchors the properties on the suburb's western edge near the Prahran and Windsor residential streets. The mix of apartments and period properties in this precinct reflects South Yarra's broader housing diversity, serviced within the same fixed-scope framework as the rest of the suburb.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Apartments', 'Period properties', 'Fixed-scope framework', 'Mixed precinct'].map(tag => (
                  <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-[99px] px-[10px] py-[4px] text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INCLUDED */}
      <section className="bg-[#ffffff] py-[100px]">
        {/* Section header */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[48px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">Scope & Checklist</div>
          <h2 className="text-[40px] font-[700] text-[#1a1a1a]">What Every South Yarra Clean Covers</h2>
          <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[580px] mt-[12px]">
            Every South Yarra clean follows a fixed, documented scope for your property's room count and type. For apartments, the scope includes building-access coordination. For period properties, product selection is appropriate for the surfaces involved. Both are delivered by the same cleaner on the same schedule.
          </p>
        </div>

        {/* Expandable menu */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px]">
          <div className="border border-[#e5e7eb] rounded-[20px] overflow-hidden">
            
            {/* Item 1 */}
            <div className={`item group border-b border-[#f3f4f6] bg-[#ffffff] transition-colors hover:bg-[#fafafa] ${activeIncluded === 0 ? 'open border-l-[3px] border-l-[#d97706]' : ''}`}>
              <div 
                className="grid grid-cols-[64px_1fr_44px] items-center px-[24px] md:px-[32px] py-[28px] cursor-pointer"
                onClick={() => setActiveIncluded(activeIncluded === 0 ? null : 0)}
              >
                <div className="w-[44px] h-[44px] rounded-[12px] bg-[#fff7ed] flex items-center justify-center">
                  <Building className="text-[#d97706] w-[20px] h-[20px]" />
                </div>
                <h3 className="text-[17px] font-[600] text-[#1a1a1a]">Apartment Interiors, Balcony Surfaces and Outdoor Areas</h3>
                <ChevronDown className={`text-[#9ca3af] w-[18px] h-[18px] transition-transform duration-300 ${activeIncluded === 0 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
              <div className="item-body px-[24px] md:px-[32px] pb-[28px] pl-[88px] md:pl-[96px]">
                <p className="text-[14px] text-[#6b7280] leading-[1.8] max-w-[640px]">
                  Apartment interiors - kitchen, bathrooms, living areas, bedrooms, and laundry where present - are cleaned to the standard scope on every visit. Balcony wipe-downs are available as an add-on for South Yarra apartments where strata restrictions permit external cleaning; limitations are confirmed and flagged at booking.
                </p>
                <div className="mt-[16px] flex flex-wrap gap-[8px]">
                  {['Balcony add-on available', 'Strata compliant', 'Laundry included', 'All rooms in scope'].map(pill => (
                    <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[14px] py-[5px] text-[12px] text-[#92400e]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className={`item group border-b border-[#f3f4f6] bg-[#fafafa] transition-colors hover:bg-[#fafafa] ${activeIncluded === 1 ? 'open border-l-[3px] border-l-[#d97706]' : ''}`}>
              <div 
                className="grid grid-cols-[64px_1fr_44px] items-center px-[24px] md:px-[32px] py-[28px] cursor-pointer"
                onClick={() => setActiveIncluded(activeIncluded === 1 ? null : 1)}
              >
                <div className="w-[44px] h-[44px] rounded-[12px] bg-[#fff7ed] flex items-center justify-center">
                  <Bath className="text-[#d97706] w-[20px] h-[20px]" />
                </div>
                <h3 className="text-[17px] font-[600] text-[#1a1a1a]">Kitchen Sanitisation and Bathroom Polishing</h3>
                <ChevronDown className={`text-[#9ca3af] w-[18px] h-[18px] transition-transform duration-300 ${activeIncluded === 1 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
              <div className="item-body px-[24px] md:px-[32px] pb-[28px] pl-[88px] md:pl-[96px]">
                <p className="text-[14px] text-[#6b7280] leading-[1.8] max-w-[640px]">
                  Kitchen benchtops, stovetop, rangehood, sink, splashback, and accessible appliance exteriors are cleaned on every visit. Bathrooms - shower screens and recess, toilet, basin, mirror, tapware, and tiled floors - are sanitised, scrubbed, and polished. South Yarra's newer apartment bathrooms with floor-to-ceiling tiles and frameless screens are held to the same standard as the period bathrooms in the suburb's heritage properties.
                </p>
                <div className="mt-[16px] flex flex-wrap gap-[8px]">
                  {['Frameless screens', 'Floor-to-ceiling tiles', 'Period bathrooms', 'Tapware polished'].map(pill => (
                    <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[14px] py-[5px] text-[12px] text-[#92400e]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className={`item group border-b border-[#f3f4f6] bg-[#ffffff] transition-colors hover:bg-[#fafafa] ${activeIncluded === 2 ? 'open border-l-[3px] border-l-[#d97706]' : ''}`}>
              <div 
                className="grid grid-cols-[64px_1fr_44px] items-center px-[24px] md:px-[32px] py-[28px] cursor-pointer"
                onClick={() => setActiveIncluded(activeIncluded === 2 ? null : 2)}
              >
                <div className="w-[44px] h-[44px] rounded-[12px] bg-[#fff7ed] flex items-center justify-center">
                  <Layers className="text-[#d97706] w-[20px] h-[20px]" />
                </div>
                <h3 className="text-[17px] font-[600] text-[#1a1a1a]">Floors, Surfaces and Living Areas</h3>
                <ChevronDown className={`text-[#9ca3af] w-[18px] h-[18px] transition-transform duration-300 ${activeIncluded === 2 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
              <div className="item-body px-[24px] md:px-[32px] pb-[28px] pl-[88px] md:pl-[96px]">
                <p className="text-[14px] text-[#6b7280] leading-[1.8] max-w-[640px]">
                  All hard floors are swept and mopped; carpeted areas vacuumed. Surfaces, skirting boards, door handles, and accessible shelf areas are dusted and wiped throughout. Living and dining areas are left to a consistent, presented standard. For South Yarra's heritage terrace properties with original timber floors, low-moisture products are used to avoid warping or surface damage over time.
                </p>
                <div className="mt-[16px] flex flex-wrap gap-[8px]">
                  {['Low-moisture on timber', 'Hard floors mopped', 'Skirting boards', 'Living & dining'].map(pill => (
                    <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[14px] py-[5px] text-[12px] text-[#92400e]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className={`item group bg-[#fafafa] transition-colors hover:bg-[#fafafa] ${activeIncluded === 3 ? 'open border-l-[3px] border-l-[#d97706]' : ''}`}>
              <div 
                className="grid grid-cols-[64px_1fr_44px] items-center px-[24px] md:px-[32px] py-[28px] cursor-pointer"
                onClick={() => setActiveIncluded(activeIncluded === 3 ? null : 3)}
              >
                <div className="w-[44px] h-[44px] rounded-[12px] bg-[#fff7ed] flex items-center justify-center">
                  <Key className="text-[#d97706] w-[20px] h-[20px]" />
                </div>
                <h3 className="text-[17px] font-[600] text-[#1a1a1a]">Building Access Coordination for South Yarra Apartments</h3>
                <ChevronDown className={`text-[#9ca3af] w-[18px] h-[18px] transition-transform duration-300 ${activeIncluded === 3 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
              <div className="item-body px-[24px] md:px-[32px] pb-[28px] pl-[88px] md:pl-[96px]">
                <p className="text-[14px] text-[#6b7280] leading-[1.8] max-w-[640px]">
                  Building access requirements - concierge sign-in, fob or intercom codes, lift booking windows, visitor parking - are collected at the initial booking and managed by Crisp for every subsequent visit. Residents don't coordinate access before each clean; the same cleaner follows the same documented process automatically on the scheduled date.
                </p>
                <div className="mt-[16px] flex flex-wrap gap-[8px]">
                  {['Concierge sign-in', 'Fob & intercom stored', 'Lift bookings', 'Zero day-of coordination'].map(pill => (
                    <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[14px] py-[5px] text-[12px] text-[#92400e]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Amber Strip Bottom */}
            <div className="bg-[#fff7ed] border-t border-[#fed7aa] px-[24px] md:px-[32px] py-[20px] flex flex-col sm:flex-row items-center justify-between gap-[12px]">
              <div className="flex items-center gap-[8px] text-[14px] font-[600] text-[#92400e]">
                <CheckCircle className="w-[18px] h-[18px] text-[#d97706]" /> Every item above is included in your fixed quote.
              </div>
              <a href="/#booking" className="text-[13px] text-[#d97706] font-[600] hover:underline whitespace-nowrap">
                Get an Instant Quote &rarr;
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CRISP */}
      <section className="bg-[#111111] py-[100px]">
        {/* Section header */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[56px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[12px]">The Crisp Difference</div>
          <h2 className="text-[40px] font-[700] text-[#ffffff]">Why South Yarra Residents Choose Crisp</h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.45)] leading-[1.8] max-w-[560px] mt-[12px]">
            South Yarra carries both a high competition index and a high renter proportion - the combination that makes consistent service hardest to find and most valued when it exists. Crisp's three operational commitments are the direct response to what this market requires.
          </p>
        </div>

        {/* Board Headers */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px]">
          <div className="board-headers">
            <div className="text-[10px] font-[700] text-[rgba(255,255,255,0.25)] tracking-[0.2em] uppercase">COMMITMENT</div>
            <div className="text-[10px] font-[700] text-[rgba(255,255,255,0.25)] tracking-[0.2em] uppercase">STATUS</div>
            <div className="text-[10px] font-[700] text-[rgba(255,255,255,0.25)] tracking-[0.2em] uppercase">RATING</div>
            <div></div>
          </div>
        </div>

        {/* Board Rows */}
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px]">
          
          {/* Row 1 */}
          <div className={`board-row group border-b border-[rgba(255,255,255,0.06)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)] ${activeBoardRow === 0 ? 'open bg-[rgba(255,255,255,0.03)] border-l-[3px] border-l-[#d97706]' : ''}`}>
            <div className="row-header" onClick={() => setActiveBoardRow(activeBoardRow === 0 ? null : 0)}>
              <div>
                <div className="text-[18px] font-[700] text-[#ffffff]">Building Access</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.35)] mt-[4px]">Chapel Street · Edgewater · All buildings</div>
              </div>
              <div className="hide-on-mobile">
                <ScrambleText text="COORDINATED" color="#4ade80" />
              </div>
              <div className="hide-on-mobile pr-[24px]">
                <AnimatedRatingBar percentage={100} label="100% managed" delay={0} />
              </div>
              <div className="flex justify-end pr-[8px]">
                <ChevronDown className={`text-[rgba(255,255,255,0.3)] w-[16px] h-[16px] transition-transform duration-300 group-hover:text-white ${activeBoardRow === 0 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
            </div>
            <div className="row-body">
              <div className="px-[24px] md:px-[32px] pb-[32px]">
                <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[640px]">
                  Building access requirements - concierge sign-in, fob or intercom codes, lift booking windows, visitor parking - are collected at the initial booking and managed by Crisp for every subsequent visit. Residents don't coordinate access before each clean; the same cleaner follows the same documented process automatically on the scheduled date.
                </p>
                <div className="inline-block bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[16px] py-[6px] text-[12px] font-[700] mt-[16px]">
                  Zero day-of coordination
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className={`board-row group border-b border-[rgba(255,255,255,0.06)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)] ${activeBoardRow === 1 ? 'open bg-[rgba(255,255,255,0.03)] border-l-[3px] border-l-[#d97706]' : ''}`}>
            <div className="row-header" onClick={() => setActiveBoardRow(activeBoardRow === 1 ? null : 1)}>
              <div>
                <div className="text-[18px] font-[700] text-[#ffffff]">Same Cleaner</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.35)] mt-[4px]">Assigned from first booking</div>
              </div>
              <div className="hide-on-mobile">
                <ScrambleText text="ASSIGNED" color="#d97706" />
              </div>
              <div className="hide-on-mobile pr-[24px]">
                <AnimatedRatingBar percentage={97} label="97% continuity rate" delay={100} />
              </div>
              <div className="flex justify-end pr-[8px]">
                <ChevronDown className={`text-[rgba(255,255,255,0.3)] w-[16px] h-[16px] transition-transform duration-300 group-hover:text-white ${activeBoardRow === 1 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
            </div>
            <div className="row-body">
              <div className="px-[24px] md:px-[32px] pb-[32px]">
                <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[640px]">
                  Your cleaner is assigned to your South Yarra property from the first booking. By the second visit, they know your apartment's layout, your building's access procedure, and any preferences specific to your property. Our 97% same-cleaner continuity rate means this assignment is operationally stable - you're not receiving a different person each month with a new briefing required.
                </p>
                <div className="inline-block bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[16px] py-[6px] text-[12px] font-[700] mt-[16px]">
                  97% same-cleaner rate
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className={`board-row group border-b border-[rgba(255,255,255,0.06)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)] ${activeBoardRow === 2 ? 'open bg-[rgba(255,255,255,0.03)] border-l-[3px] border-l-[#d97706]' : ''}`}>
            <div className="row-header" onClick={() => setActiveBoardRow(activeBoardRow === 2 ? null : 2)}>
              <div>
                <div className="text-[18px] font-[700] text-[#ffffff]">Fixed Pricing</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.35)] mt-[4px]">Studio to full-floor — priced accurately</div>
              </div>
              <div className="hide-on-mobile">
                <ScrambleText text="CONFIRMED" color="#d97706" />
              </div>
              <div className="hide-on-mobile pr-[24px]">
                <AnimatedRatingBar percentage={100} label="Always pre-confirmed" delay={200} />
              </div>
              <div className="flex justify-end pr-[8px]">
                <ChevronDown className={`text-[rgba(255,255,255,0.3)] w-[16px] h-[16px] transition-transform duration-300 group-hover:text-white ${activeBoardRow === 2 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
            </div>
            <div className="row-body">
              <div className="px-[24px] md:px-[32px] pb-[32px]">
                <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[640px]">
                  A studio apartment in a Chapel Street high-rise and a three-bedroom penthouse are priced differently - they have different scopes and that difference should be reflected in the cost. Pricing is set by your actual room count, confirmed online before any cleaner visits. No surprise billing for a clean that took longer than a competitor estimated.
                </p>
                <div className="inline-block bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[16px] py-[6px] text-[12px] font-[700] mt-[16px]">
                  Fixed / confirmed online
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className={`board-row group border-b border-[rgba(255,255,255,0.06)] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)] ${activeBoardRow === 3 ? 'open bg-[rgba(255,255,255,0.03)] border-l-[3px] border-l-[#d97706]' : ''}`}>
            <div className="row-header" onClick={() => setActiveBoardRow(activeBoardRow === 3 ? null : 3)}>
              <div>
                <div className="text-[18px] font-[700] text-[#ffffff]">End of Lease</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.35)] mt-[4px]">All South Yarra property types</div>
              </div>
              <div className="hide-on-mobile">
                <ScrambleText text="AVAILABLE" color="rgba(255,255,255,0.6)" />
              </div>
              <div className="hide-on-mobile pr-[24px]">
                <AnimatedRatingBar percentage={100} label="Bond-back guarantee" delay={300} />
              </div>
              <div className="flex justify-end pr-[8px]">
                <ChevronDown className={`text-[rgba(255,255,255,0.3)] w-[16px] h-[16px] transition-transform duration-300 group-hover:text-white ${activeBoardRow === 3 ? 'rotate-180 text-[#d97706]' : ''}`} />
              </div>
            </div>
            <div className="row-body">
              <div className="px-[24px] md:px-[32px] pb-[32px]">
                <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[640px]">
                  South Yarra's high renter proportion makes it one of the portfolio's clearest opportunities for cross-promoting the vacate cleaning service. End-of-lease cleaning is available for all South Yarra property types - apartments and period homes - with an inspection-ready standard and a bond-back guarantee. Get a separate vacate quote online.
                </p>
                <div className="inline-block bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[16px] py-[6px] text-[12px] font-[700] mt-[16px]">
                  Inspection-ready standard
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS (Horizontal Drag) */}
      <section className="bg-[#ffffff] py-[100px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px]">
          <div className="text-[11px] text-[#d97706] tracking-[0.2em] uppercase mb-[12px] font-bold">Client Stories</div>
          <h2 className="text-[40px] font-[700] text-[#1a1a1a] mb-[20px]">What South Yarra Residents Say</h2>
          <div className="text-[11px] text-[#9ca3af] tracking-[0.15em] uppercase mb-[32px]">&larr; drag to explore &rarr;</div>
          
          <div 
            ref={carouselRef}
            className="flex gap-[24px] overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-8"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {defaultReviews.map((review, i) => (
              <div key={i} className="min-w-[360px] bg-[#fafafa] border border-[#e5e7eb] border-t-[3px] border-t-[#d97706] rounded-[20px] p-[32px] select-none">
                <div className="text-[56px] text-[#d97706] opacity-[0.2] leading-[0.5] font-serif mb-[16px]">"</div>
                <p className="text-[15px] text-[#374151] leading-[1.7] font-serif italic mb-[24px] line-clamp-4">
                  "{review.text}"
                </p>
                <div className="text-[#d97706] text-[14px] tracking-widest mb-[12px]">★★★★★</div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#e5e7eb] flex items-center justify-center font-bold text-[#6b7280]">
                    {review.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[14px] font-[700] text-[#1a1a1a]">{review.author}</div>
                    <div className="text-[12px] text-[#6b7280] flex items-center gap-1">
                      <Star className="w-[10px] h-[10px] fill-current" /> Verified Customer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-[16px] text-[14px] text-[#6b7280]">
            <span className="text-[#d97706]">★★★★★</span> Rated {googleRatingValue} on Google · {googleReviewCount} verified reviews
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section className="bg-[#fafafa] py-[100px]">
        <div className="text-center mb-[64px] px-6">
          <div className="text-[11px] text-[#d97706] font-[600] tracking-[0.2em] uppercase mb-[16px]">Transparent Pricing</div>
          <h2 className="text-[40px] font-[700] text-[#1a1a1a] mb-[16px]">South Yarra House Cleaning Prices</h2>
          <p className="text-[16px] text-[#6b7280] max-w-[560px] mx-auto">
            Fixed pricing based on your room count. No hourly estimates, no surprise charges.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-8 border border-[#e5e7eb] shadow-sm flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-2">Standard</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $145</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Up to 3 bed</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All bathrooms</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Eco products included</li>
            </ul>
            <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>

          {/* Card 2 - Featured */}
          <div className="bg-white rounded-[24px] p-8 shadow-xl flex flex-col relative border-2 border-[#d97706] transform scale-100 md:scale-[1.04] z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fff7ed] text-[#d97706] border border-[#fed7aa] rounded-full px-4 py-1 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
              Most popular in South Yarra
            </div>
            <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-2 mt-4">Deep</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $235</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151] font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Full property scope</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151] font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Oven & inside cabinets</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151] font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Grout & hard-to-reach areas</li>
            </ul>
            <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-8 border border-[#e5e7eb] shadow-sm flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a1a1a] mb-2">Vacate</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $380</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Bond-back standard</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All rooms & surfaces</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Inspection ready</li>
            </ul>
            <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-[#ffffff] py-[100px]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="py-[100px] px-[32px] text-center border-t-[2px] border-[#fed7aa]" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fff7ed 100%)' }}>
        <div className="max-w-[600px] mx-auto flex flex-col items-center">
          
          <div className="text-[11px] font-[600] text-[#92400e] tracking-[0.2em] uppercase mb-[16px]">
            Ready to Book
          </div>
          
          <h2 className="text-[40px] md:text-[52px] font-[800] text-[#1a1a1a] leading-[1.1] flex flex-col items-center gap-y-2 mb-[16px]">
            <span>Book a Cleaner in</span>
            <div className="flex gap-x-4">
              <span className="sy-split-text-solid">South</span>
              <span className="sy-split-text-outline">Yarra</span>
            </div>
          </h2>
          
          <p className="text-[16px] text-[#6b7280] max-w-[460px] mx-auto mt-[16px] mb-[8px]">
            Get an instant fixed quote for your South Yarra apartment or home. Book online in under a minute - building access coordinated at booking, same cleaner every visit.
          </p>
          
          <span className="text-[#d97706] font-[600] text-[14px] block mb-[32px]">
            15% off your first clean.
          </span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px]">
            <a href="/#booking" className="bg-[#d97706] text-white rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[#b45309] transition-colors w-full sm:w-auto">
              Get an Instant Quote
            </a>
            <a href="tel:0451423786" className="border-[1.5px] border-[#d97706] text-[#d97706] rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[rgba(217,119,6,0.05)] transition-colors w-full sm:w-auto">
              Call us: 0451 423 786
            </a>
          </div>
          
          <div className="w-[40px] h-[1px] bg-[#d97706] mx-auto my-[40px]" />
          
          <div className="text-[11px] text-[#9ca3af] tracking-[0.15em] uppercase mb-[14px]">
            Nearby Areas We Also Service
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Toorak', 'Windsor', 'Malvern', 'Richmond', 'Melbourne CBD'].map(area => (
              <a key={area} href={`/house-cleaning-${area.toLowerCase().replace(' ', '-')}`} className="group bg-[rgba(255,255,255,0.7)] border border-[#fed7aa] text-[#92400e] rounded-[99px] px-[16px] py-[6px] text-[12px] hover:bg-[#ffffff] hover:border-[#d97706] hover:text-[#d97706] transition-colors flex items-center gap-2">
                {area}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
