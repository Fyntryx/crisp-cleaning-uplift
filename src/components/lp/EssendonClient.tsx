"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import Breadcrumbs from "@/components/Breadcrumbs";

const globalStyles = `
  @keyframes revealUp {
    0% {
      transform: translateY(110%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

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
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: fromY }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: fromY }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat Counter Component ───────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
      };

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutQuart(progress);
        setCurrent(Math.floor(easedProgress * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrent(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{current}</span>;
}

// ─── Data Arrays ──────────────────────────────────────────────────
const faqData = [
  {
    question: "Do you clean Californian bungalows and large period homes in Essendon?",
    answer: "Yes — period homes including Californian bungalows and Federation properties are cleaned with products and methods appropriate for original surfaces. We don't use steam or abrasives on heritage timber or original tiles.",
  },
  {
    question: "How much does house cleaning cost in Essendon?",
    answer: "Pricing is based on your home's actual room count — Essendon's larger period homes are quoted accurately for their scope. Get an exact fixed price online in under a minute.",
  },
  {
    question: "Are your products safe for original timber floors?",
    answer: "Yes. We use low-moisture, eco-friendly products on timber floors. Steam and high-water-volume methods aren't used on original boards where the risk of warping or damage over time is real.",
  },
  {
    question: "Can I book a regular cleaner near the Buckley Street precinct?",
    answer: "Yes — we service all Essendon streets including those nearest Buckley Street and Keilor Road. Your cleaner is assigned to the property from the first booking and returns on your chosen schedule.",
  },
  {
    question: "How long does a full Essendon home clean typically take?",
    answer: "Duration depends on your home's room count. Your instant quote confirms the scope; larger period homes are allocated appropriate time, not squeezed into a generic hourly slot.",
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer: "We return within 72 hours to address anything that didn't meet your standard — at no additional charge. The guarantee applies from the very first booking and maintains across all subsequent visits.",
  },
];

// ─── Before/After Testimonial Card ─────────────────────────────────
function BeforeAfterCard({ 
  beforeImg, 
  afterImg, 
  reviewer, 
  suburb, 
  quote, 
  initials 
}: any) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start: number | null = null;
          const duration = 1200;
          const animate = (time: number) => {
            if (!start) start = time;
            const progress = (time - start) / duration;
            if (progress > 1) {
              setPosition(50);
              return;
            }
            const pos = 50 + Math.sin(progress * Math.PI * 2) * 20;
            setPosition(pos);
            requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: any) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    }
  }, []);

  return (
    <div 
      className="bg-[#ffffff] border border-[#e5e7eb] rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)")}
    >
      {/* Slider Area */}
      <div 
        ref={containerRef}
        className="h-[240px] relative overflow-hidden cursor-ew-resize select-none shrink-0"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        role="img"
        aria-label="Before and after cleaning comparison. Drag to reveal."
      >
        {/* Before Image */}
        <div className="absolute inset-0 w-full h-full">
          <img src={beforeImg} alt="Before" className="w-full h-full object-cover pointer-events-none" />
          <div className="absolute top-[12px] left-[12px] bg-[rgba(0,0,0,0.5)] text-white text-[10px] font-bold tracking-[0.15em] px-2 py-1 rounded-[4px] z-10">BEFORE</div>
        </div>
        
        {/* After Image */}
        <div 
          className="absolute inset-0 w-full h-full z-20"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={afterImg} alt="After" className="w-full h-full object-cover pointer-events-none" />
          <div className="absolute top-[12px] right-[12px] bg-[rgba(0,0,0,0.5)] text-white text-[10px] font-bold tracking-[0.15em] px-2 py-1 rounded-[4px] z-10">AFTER</div>
        </div>

        {/* Drag Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[3px] bg-[#ffffff] pointer-events-none z-30"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] md:w-[36px] md:h-[36px] rounded-full bg-[#FB8C42] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 12 4-4v8z"/><path d="m21 12-4-4v8z"/><path d="M7 12h10"/></svg>
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="p-6 grow flex flex-col">
        <div className="text-[#FB8C42] text-[14px] mb-3 tracking-widest">★★★★★</div>
        <div className="text-[#FB8C42] text-[48px] leading-[0] opacity-30 mb-2 font-serif block">"</div>
        <p className="text-[14px] text-[#374151] leading-[1.7] italic mb-4 grow">
          {quote}
        </p>
        <div className="flex items-center gap-[10px] mt-4 pt-4 border-t border-gray-100">
          <div className="w-[32px] h-[32px] rounded-full bg-[#fef3c7] flex items-center justify-center text-[12px] font-bold text-[#92400e] shrink-0">
            {initials}
          </div>
          <div className="flex-grow">
            <div className="text-[13px] font-semibold text-[#1a1a1a]">{reviewer}</div>
            <div className="text-[12px] text-[#9ca3af]">{suburb}</div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] text-[#9ca3af] font-medium flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#9ca3af] fill-current"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
              Google Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const essendonReviews = [
  {
    beforeImg: "/images/dirty-bathroom-before-service.webp",
    afterImg: "/images/clean-bathroom-after-service.webp",
    quote: "Honestly felt like a brand new home.",
    reviewer: "Andre B.",
    suburb: "Essendon",
    initials: "AB"
  },
  {
    beforeImg: "/images/gas-stove-before-cleaning-melbourne.webp",
    afterImg: "/images/gas-stove-after-cleaning-melbourne.webp",
    quote: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.",
    reviewer: "Kaan S.",
    suburb: "Essendon North",
    initials: "KS"
  },
  {
    beforeImg: "/images/dirty-kitchen-before-cleaning.webp",
    afterImg: "/images/sparkling-clean-kitchen.webp",
    quote: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.",
    reviewer: "Ardi T.",
    suburb: "Essendon",
    initials: "AT"
  }
];

// ─── Main Component ────────────────────────────────────────────────
export default function EssendonClient({
  googleRatingValue = 5.0,
  googleReviewCount = 14,
}: {
  googleRatingValue?: number;
  googleReviewCount?: number;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="overflow-x-hidden text-gray-900 bg-white">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden flex items-center pt-[100px] pb-[60px]">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/images/houseclaning-seesendon.jpg" 
            alt="Essendon Period Home Interior"
            fill
            className="object-cover object-[30%_center]"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Frosted Glass Card on Left */}
        <div 
          className="relative z-10 hidden md:flex flex-col w-[480px] rounded-[20px] p-[40px_40px] ml-[40px] lg:ml-[80px] selection:bg-[#FB8C42]/30 selection:text-white"
          style={{
            background: "rgba(15, 15, 15, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}
        >
          {/* Orange vertical accent line */}
          <div className="absolute left-[-1px] top-[40px] w-[3px] h-[48px] bg-[#FB8C42] rounded-[2px]" />

          <ScrollReveal delay={0}>
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{
                background: "rgba(217, 119, 6, 0.2)",
                border: "1px solid rgba(217, 119, 6, 0.4)",
                color: "#FB8C42"
              }}
            >
              ● House Cleaning · Essendon · Period Homes
            </div>
          </ScrollReveal>

          <h1 className="text-[48px] font-[800] text-white leading-[1.1] tracking-[-0.04em] text-left mb-0">
            <span className="hero-line block overflow-hidden pb-1">
              <span className="block" style={{ animation: "revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards", animationDelay: "0s", transform: "translateY(110%)" }}>House Cleaning</span>
            </span>
            <span className="hero-line block overflow-hidden pb-1">
              <span className="block text-[#FB8C42]" style={{ 
                animation: "revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards", 
                animationDelay: "0.12s", 
                transform: "translateY(110%)"
              }}>Essendon</span>
            </span>
            <span className="hero-line block overflow-hidden pb-2">
              <span className="block" style={{ animation: "revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards", animationDelay: "0.24s", transform: "translateY(110%)" }}>Melbourne</span>
            </span>
          </h1>

          <ScrollReveal delay={0.6}>
            <div className="flex items-start gap-6 mt-8 pb-6 border-b border-white/20">
              <div className="text-left">
                <div className="text-[32px] font-extrabold text-[#FB8C42] leading-none mb-2">97%</div>
                <div className="text-[12px] text-white leading-[1.5]">Same cleaner<br/>every visit</div>
              </div>
              <div className="w-[1px] h-12 bg-white/20 mt-2"></div>
              <div className="text-left">
                <div className="text-[32px] font-extrabold text-[#FB8C42] leading-none mb-2">100%</div>
                <div className="text-[12px] text-white leading-[1.5]">Eco-friendly<br/>surfaces</div>
              </div>
              <div className="w-[1px] h-12 bg-white/20 mt-2"></div>
              <div className="text-left">
                <div className="text-[32px] font-extrabold text-[#FB8C42] leading-none mb-2">72hr</div>
                <div className="text-[12px] text-white leading-[1.5]">Re-clean<br/>guarantee</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <p className="text-justify text-[15px] text-white/90 leading-[1.7] mt-6">
              Essendon's residential streets are defined by their housing stock — Californian bungalows and Federation homes on generous blocks, particularly in the streets running north and south of the Buckley Street precinct, give the suburb a heritage-rich character maintained by long-tenure, owner-occupier families. These properties show the quality of a cleaner quickly: original timber floors, heritage tiles, and period-era fittings benefit from a cleaner who knows the home rather than encounters it fresh each fortnight. Crisp services Essendon homes with fixed, scope-based pricing, eco-friendly products appropriate for period surfaces, and the same cleaner every visit.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8} className="mt-8 flex flex-col items-start">
            <div className="flex flex-col sm:flex-row gap-4 mb-3 w-full">
              <a
                href="/#booking"
                className="inline-flex justify-center items-center px-6 py-2.5 rounded-full bg-[#FB8C42] hover:bg-[#ea6309] text-white font-semibold text-[15px] transition-colors whitespace-nowrap"
              >
                Get an Instant Quote
              </a>
              <a
                href="#checklist"
                className="inline-flex justify-center items-center px-6 py-2.5 rounded-full border-[1.5px] border-white/40 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                See what's included
              </a>
            </div>
            <p className="text-[12px] text-white/70">
              5% off your first clean. Fixed price, no hourly surprises.
            </p>
          </ScrollReveal>
        </div>

        {/* Mobile version (fallback so it isn't broken on small screens) */}
        <div className="relative z-10 md:hidden w-full px-6 pt-[120px] pb-[80px] bg-black/50 backdrop-blur-md min-h-[90vh] flex flex-col justify-center selection:bg-[#FB8C42]/30 selection:text-white">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold tracking-[0.12em] uppercase mb-8">
              House Cleaning · Essendon
            </div>
          </ScrollReveal>
          <h1 className="text-[48px] font-extrabold text-white leading-[1.0] tracking-[-0.04em] text-left mb-8">
            House Cleaning <br/><span className="text-[#FB8C42]">Essendon</span> <br/>Melbourne
          </h1>
          <div className="flex flex-col gap-4">
            <a href="/#booking" className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-[#FB8C42] text-white font-semibold text-[15px]">Get an Instant Quote</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — SCROLLING TICKER
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#1a1a1a] py-3.5 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="inline-flex items-center gap-6"
        >
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Same Cleaner Every Visit</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Fixed Pricing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Eco-Friendly Products</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">72hr Guarantee</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Californian Bungalows</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Federation Homes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Buckley Street</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Period Surfaces</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">Book in 60 Seconds</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — PERIOD HOMES (Property Type Selector)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal>
            <p className="text-[#6b7280] font-medium tracking-[0.1em] text-[12px] uppercase mb-4">
              Essendon's Housing Stock
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1a1a1a] leading-[1.1] mb-6 max-w-[560px]">
              Cleaning Essendon's Period Homes Properly
            </h2>
            <p className="text-[15px] text-[#6b7280] leading-[1.7] max-w-[720px] mb-12">
              Essendon's appeal is largely its housing stock — and that stock demands a cleaning approach that respects it. Californian bungalows with their original timber floors, brick fireplaces, and leadlight windows have different surface requirements to a 2010s townhouse, and the difference between appropriate and inappropriate product choices shows quickly on heritage materials.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-16">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/2">
                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Californian Bungalows and Federation Properties on Generous Blocks</h3>
                  <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                    The Californian bungalows lining Essendon's residential streets — many with original leadlight windows, red brick facades, and interior timber panelling — are among Melbourne's most characterful period homes. Crisp's eco-friendly product selection is specifically chosen for surfaces like these; our cleaners understand appropriate methods for original timber, heritage tiles, and leadlight before working in these properties.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-7">
                    <span className="inline-block px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-semibold text-gray-600 mb-6">
                      Tag: Buckley Street Precinct
                    </span>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Original timber floors — low moisture products only</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Heritage tiles — no abrasive or high-pH products</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Leadlight windows — surface-appropriate care</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Red brick facades — eco-friendly throughout</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/2">
                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Larger Heritage Homes Near the Buckley Street Precinct</h3>
                  <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                    The streets closest to the Buckley Street shopping precinct — Essendon's main commercial strip alongside Keilor Road — include some of the suburb's largest period properties: multiple living rooms, formal dining, four or five bedrooms, and generous bathrooms that reflect the area's affluent-family character. Pricing accounts for the actual scope of these homes; they are quoted accurately, not at a blanket rate.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-7">
                    <span className="inline-block px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-semibold text-gray-600 mb-6">
                      Tag: Keilor Road Corridor
                    </span>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Multiple formal living rooms in scope</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">4–5 bedrooms priced accurately</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Generous bathrooms — all included</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Fixed pricing — no blanket rate</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/2">
                  <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Newer Townhouses and Dual-Occupancy Builds Across the Suburb</h3>
                  <p className="text-[15px] text-[#6b7280] leading-[1.8]">
                    Essendon's more recent residential development has introduced townhouses and dual-occupancy builds, particularly on subdivided blocks near transport corridors. These modern properties — stone benchtops, engineered floors, open-plan living — have a different cleaning profile to the suburb's heritage stock. Both are handled within the same fixed-pricing framework at the rate appropriate for their actual room count.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-[16px] p-7">
                    <span className="inline-block px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-semibold text-gray-600 mb-6">
                      Tag: Transport Corridors · New Builds
                    </span>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Stone benchtops — appropriate products</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Engineered floors — correct methods</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Open-plan living — full scope</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" /><span className="text-[14px] text-gray-700">Same fixed-pricing framework</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — WHAT'S INCLUDED
      ══════════════════════════════════════════════════════ */}
      <section id="checklist" className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal>
            <p className="text-[#FB8C42] font-medium tracking-[0.1em] text-[12px] uppercase mb-4">
              Scope & Checklist
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#ffffff] leading-[1.1] mb-6 max-w-[600px]">
              What's Included in Every Essendon Clean
            </h2>
            <p className="text-[15px] text-white/60 leading-[1.7] max-w-[720px] mb-12">
              Every Essendon clean follows a fixed, documented scope covering all rooms in your booking. The checklist doesn't change between visits — consistent application of the same scope to the same property is the operational foundation of a genuinely consistent result.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <ScrollReveal delay={0.1}>
              <div className="group bg-[#222222] border border-[#333333] hover:border-[#FB8C42] transition-colors duration-200 rounded-[16px] p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#FB8C42]/15 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#FB8C42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21V11"/><path d="M8 21v-5"/><path d="M16 21v-5"/><path d="M12 4v4"/><path d="M8 4v4"/><path d="M16 4v4"/></svg>
                </div>
                <h3 className="text-[18px] font-bold text-white mb-4">Kitchen Degreasing and Appliance Surface Care</h3>
                <p className="text-[14px] text-white/60 leading-[1.7] mb-6">
                  Benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are degreased and cleaned on every visit. Essendon's period kitchens often feature tiled splashbacks and older appliances that accumulate differently to modern surfaces; the same scope addresses both property types without a separate add-on for the heritage kitchen.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Benchtops & splashback", "Stovetop & rangehood", "Heritage kitchens", "Appliance exteriors"].map(pill => (
                    <span key={pill} className="px-3 py-1 rounded-full bg-[#FB8C42]/10 border border-[#FB8C42]/20 text-[#fbbf24] text-[12px]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <div className="group bg-[#222222] border border-[#333333] hover:border-[#FB8C42] transition-colors duration-200 rounded-[16px] p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#FB8C42]/15 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#FB8C42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/></svg>
                </div>
                <h3 className="text-[18px] font-bold text-white mb-4">Bathroom Sanitisation and Tile Scrubbing</h3>
                <p className="text-[14px] text-white/60 leading-[1.7] mb-6">
                  All bathrooms are sanitised on every visit — shower or bath recess, toilet including base and behind, basin, mirror, tapware, and tiled floors scrubbed and polished. Heritage bathrooms in Essendon's period homes often have original encaustic or tessellated tiles; we use appropriate products rather than abrasives that damage original glazing over time.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["All bathrooms sanitised", "Tessellated tiles", "Toilet base to cistern", "Tapware polished"].map(pill => (
                    <span key={pill} className="px-3 py-1 rounded-full bg-[#FB8C42]/10 border border-[#FB8C42]/20 text-[#fbbf24] text-[12px]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3}>
              <div className="group bg-[#222222] border border-[#333333] hover:border-[#FB8C42] transition-colors duration-200 rounded-[16px] p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#FB8C42]/15 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#FB8C42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4-4-4"/><path d="M3.5 9h11.2"/><path d="m12 22-4-4 4-4"/><path d="M20.5 18H9.3"/></svg>
                </div>
                <h3 className="text-[18px] font-bold text-white mb-4">Timber Floors, Polished Surfaces and Formal Living Rooms</h3>
                <p className="text-[14px] text-white/60 leading-[1.7] mb-6">
                  Timber floors throughout the home are swept and mopped with low-moisture products appropriate for original and refinished boards — not steam or excess moisture that risks original floorboards. Formal living and dining rooms receive the same level of attention as everyday living spaces; surfaces dusted, glass and mirrors wiped.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Low-moisture on timber", "No steam on boards", "Formal living areas", "Mirrors & glass"].map(pill => (
                    <span key={pill} className="px-3 py-1 rounded-full bg-[#FB8C42]/10 border border-[#FB8C42]/20 text-[#fbbf24] text-[12px]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.4}>
              <div className="group bg-[#222222] border border-[#333333] hover:border-[#FB8C42] transition-colors duration-200 rounded-[16px] p-8 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#FB8C42]/15 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#FB8C42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                </div>
                <h3 className="text-[18px] font-bold text-white mb-4">Bedrooms, Laundry and Secondary Living Areas</h3>
                <p className="text-[14px] text-white/60 leading-[1.7] mb-6">
                  Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left to a presented standard. The laundry, study, and any additional rooms within your booking are addressed within the standard scope. Secondary living areas — rumpus rooms, sunrooms common in Essendon's older homes — are scoped at booking and priced accordingly.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["All bedrooms vacuumed", "Laundry included", "Sunrooms scoped", "Studies included"].map(pill => (
                    <span key={pill} className="px-3 py-1 rounded-full bg-[#FB8C42]/10 border border-[#FB8C42]/20 text-[#fbbf24] text-[12px]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — LARGE TYPOGRAPHIC STATS ROW
      ══════════════════════════════════════════════════════ */}
      <section className="py-[60px] bg-[#ffffff] border-y border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-7xl">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e5e7eb]">
              <div className="text-center py-4 flex flex-col items-center justify-center min-h-[120px]">
                <div className="text-[40px] md:text-[56px] font-black text-[#1a1a1a] tracking-[-0.03em] leading-none mb-3">
                  <AnimatedNumber value={97} />%
                </div>
                <div className="text-[13px] text-[#6b7280] leading-[1.6]">Same cleaner<br/>every visit</div>
              </div>
              <div className="text-center py-4 flex flex-col items-center justify-center min-h-[120px]">
                <div className="text-[40px] md:text-[56px] font-black text-[#1a1a1a] tracking-[-0.03em] leading-none mb-3">
                  <AnimatedNumber value={100} />%
                </div>
                <div className="text-[13px] text-[#6b7280] leading-[1.6]">Eco-friendly<br/>products</div>
              </div>
              <div className="text-center py-4 flex flex-col items-center justify-center min-h-[120px]">
                <div className="text-[40px] md:text-[56px] font-black text-[#1a1a1a] tracking-[-0.03em] leading-none mb-3">
                  <AnimatedNumber value={72} />hr
                </div>
                <div className="text-[13px] text-[#6b7280] leading-[1.6]">Re-clean<br/>guarantee</div>
              </div>
              <div className="text-center py-4 flex flex-col items-center justify-center min-h-[120px]">
                <div className="text-[40px] md:text-[56px] font-black text-[#1a1a1a] tracking-[-0.03em] leading-none mb-3">
                  Fixed
                </div>
                <div className="text-[13px] text-[#6b7280] leading-[1.6]">Pricing<br/>always</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — WHY CRISP (Horizontal Timeline)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal>
            <p className="text-[#FB8C42] font-medium tracking-[0.1em] text-[12px] uppercase mb-4">
              The Crisp Difference
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#ffffff] leading-[1.1] mb-6 max-w-[600px]">
              Why Essendon Homeowners Trust Crisp
            </h2>
            <p className="text-[15px] text-white/60 leading-[1.7] max-w-[720px] mb-8">
              Essendon homeowners tend to stay — the suburb has a strong long-tenure, owner-occupier culture. That's the demographic that benefits most from a cleaning relationship that builds over time rather than resets with each booking. Crisp's model is built around exactly that preference.
            </p>
          </ScrollReveal>

          {/* Timeline Bar */}
          <ScrollReveal delay={0.2} className="relative mt-12 mb-8 hidden md:block">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#333333] -translate-y-1/2"></div>
            <div className="relative z-10 grid grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#FB8C42] hover:scale-150 transition-transform duration-200 cursor-pointer"></div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Timeline Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mt-8 md:mt-0">
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#FB8C42] tracking-[0.1em] mb-3">01</span>
                <h3 className="text-[16px] font-bold text-white mb-3">Same Cleaner Every Visit — Your Home's Specifics Are Remembered</h3>
                <p className="text-[13px] text-white/55 leading-[1.7] mb-5 grow">
                  Your Essendon cleaner is assigned from the first booking and returns every time. By the second visit, they know where the original timber needs careful treatment, which bathroom has the older tile grout that requires extra attention, and how your home's formal layout flows. That accumulated knowledge is why 97% of Crisp's recurring clients see the same face every fortnight.
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FB8C42]/15 text-[#fbbf24] text-[12px] font-bold">97%</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#FB8C42] tracking-[0.1em] mb-3">02</span>
                <h3 className="text-[16px] font-bold text-white mb-3">Fixed Pricing That Accounts for Larger Period-Home Floorplans</h3>
                <p className="text-[13px] text-white/55 leading-[1.7] mb-5 grow">
                  Essendon's Californian bungalows and Federation homes are larger than Melbourne's average residential footprint. Pricing is set by your actual room count and layout — not a flat Essendon rate applied regardless of whether your home has three rooms or seven. Larger homes are quoted proportionally; you're not undercharged on scope that can't be delivered.
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FB8C42]/15 text-[#fbbf24] text-[12px] font-bold">Fixed</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#FB8C42] tracking-[0.1em] mb-3">03</span>
                <h3 className="text-[16px] font-bold text-white mb-3">Products Safe for Heritage Surfaces, Timber Floors and Original Finishes</h3>
                <p className="text-[13px] text-white/55 leading-[1.7] mb-5 grow">
                  Harsh chemical products damage original timber finishes, strip heritage tile glazing, and discolour period-era fittings over time. Our eco-friendly product selection is chosen with surface compatibility in mind — effective cleaning without the cumulative deterioration that the wrong products cause on Essendon's period homes.
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FB8C42]/15 text-[#fbbf24] text-[12px] font-bold">100%</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#FB8C42] tracking-[0.1em] mb-3">04</span>
                <h3 className="text-[16px] font-bold text-white mb-3">Loyalty Rewards for Regular Customers</h3>
                <p className="text-[13px] text-white/55 leading-[1.7] mb-5 grow">
                  Regular Crisp clients accumulate loyalty rewards from their second month of bookings — discounts that grow the longer you stay with the service. Weekly and fortnightly clients receive the most meaningful ongoing savings, reflecting the operational value that consistent recurring bookings provide to both sides.
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FB8C42]/15 text-[#fbbf24] text-[12px] font-bold">From month 2</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#FB8C42] font-medium tracking-[0.1em] text-[12px] uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1a1a1a] leading-[1.1] mb-4">
              Essendon House Cleaning Prices
            </h2>
            <p className="text-[15px] text-[#6b7280] max-w-[600px] mx-auto">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Regular Clean */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white border border-[#e5e7eb] rounded-3xl p-8 shadow-sm flex flex-col h-full">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-3">Standard</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[14px] text-[#6b7280] font-medium">From </span>
                  <span className="text-[40px] font-extrabold text-[#1a1a1a] leading-none">$145</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Up to 3 bed</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All bathrooms</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Eco products included</li>
                </ul>
                <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
              </div>
            </ScrollReveal>

            {/* Deep Clean */}
            <ScrollReveal delay={0.2} className="z-10">
              <div 
                className="bg-[#1a1a1a] rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative flex flex-col h-full"
                style={{ transform: "scale(1.04)" }}
              >
                <div className="absolute top-0 right-0 px-4 py-2 rounded-tr-[24px] rounded-bl-[16px] bg-[#fef3c7] text-[#92400e] text-[10px] font-extrabold uppercase tracking-wider z-10">
                  Most popular in Essendon
                </div>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70 mb-3 mt-2">Deep</p>
                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-[14px] text-white/60 font-medium">From </span>
                  <span className="text-[40px] font-extrabold text-white leading-none">$235</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Full property scope</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Oven & inside cabinets</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-white/80 font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Grout & hard-to-reach areas</li>
                </ul>
                <a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
              </div>
            </ScrollReveal>

            {/* End of Lease */}
            <ScrollReveal delay={0.3}>
              <div className="bg-white border border-[#e5e7eb] rounded-3xl p-8 shadow-sm flex flex-col h-full">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-3">Vacate</p>
                <div className="mb-6 pb-6 border-b border-[#f3f4f6]">
                  <span className="text-[40px] font-extrabold text-[#1a1a1a] leading-none block">From $380</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Bond-back standard</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> All rooms & surfaces</li>
                  <li className="flex items-center gap-2.5 text-[13px] text-[#4b5563] font-medium"><CheckCircle2 className="w-4 h-4 text-[#FB8C42]" /> Inspection ready</li>
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
          SECTION 8 — TESTIMONIALS (The Crisp Effect)
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#fafafa] py-[80px]">
        <div className="container mx-auto px-6 max-w-7xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#FB8C42] font-medium tracking-[0.1em] text-[12px] uppercase mb-4">
              The Crisp Effect
            </p>
            <h2 className="text-[40px] font-[800] text-[#1a1a1a] leading-[1.1] mb-2">
              See the Difference. Hear From Homeowners.
            </h2>
            <p className="text-[15px] text-[#6b7280] mt-2">
              Real results from real Essendon homes. Drag to see the difference.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            {essendonReviews.map((review, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx}>
                <BeforeAfterCard {...review} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-[40px]">
            <div className="inline-flex items-center gap-3">
              <span className="text-[#FB8C42] text-[14px] tracking-widest">★★★★★</span>
              <span className="text-[14px] text-[#6b7280]">
                Rated {googleRatingValue} on Google · {googleReviewCount} verified reviews
              </span>
              <Link href="/reviews" className="text-[#FB8C42] text-[14px] font-medium hover:underline ml-1">
                View all reviews →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — FAQ
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#ffffff] py-20">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#ffffff] pt-[100px] pb-[100px] px-8 text-center">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-[11px] font-semibold text-[#FB8C42] tracking-[0.15em] uppercase mb-4">
              Ready to Book
            </p>
            <h2 className="text-[48px] md:text-[64px] font-extrabold text-[#1a1a1a] leading-[1.05] tracking-[-0.03em] mb-4">
              Book a Cleaner<br />
              <span className="relative inline-block" style={{ WebkitTextStroke: "2px #1a1a1a", color: "transparent" }}>
                in Essendon
              </span>
            </h2>
            <p className="text-[16px] text-[#6b7280] max-w-[480px] mx-auto mt-4 mb-8 leading-[1.6]">
              Get an instant fixed quote for your Essendon home — period property or modern build. Book online in under a minute, same cleaner every visit.
            </p>
            <span className="text-[#FB8C42] font-semibold text-[15px] block mb-8">
              5% off your first clean.
            </span>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="/#booking"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-[#FB8C42] hover:bg-[#ea6309] text-white font-semibold text-[15px] transition-colors"
              >
                Get an Instant Quote
              </a>
              <a
                href="tel:0451423786"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full border-[1.5px] border-[#1a1a1a] text-[#1a1a1a] font-semibold text-[15px] hover:bg-gray-50 transition-colors"
              >
                Call us: 0451 423 786
              </a>
            </div>

            <div className="w-full h-[1px] my-8" style={{ background: "linear-gradient(90deg, transparent, #FB8C42, transparent)" }} />

            <p className="text-[11px] font-semibold text-[#9ca3af] tracking-[0.15em] uppercase mb-4">
              Nearby Areas We Also Service
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              { [{ name: 'Maribyrnong', isBuilt: true }, { name: 'Moonee Ponds', isBuilt: true }, { name: 'Strathmore', isBuilt: true }, { name: 'Ascot Vale', isBuilt: false }, { name: 'Flemington', isBuilt: false }].map(({ name: suburb, isBuilt }) => (
              isBuilt 
                ? <Link
                  key={suburb}
                  href={`/house-cleaning-${suburb.toLowerCase().replace(" ", "-")}`}
                  className="group px-4 py-1.5 rounded-full bg-[#f9fafb] border border-[#e5e7eb] text-[#374151] hover:text-[#FB8C42] hover:border-[#FB8C42] text-[13px] transition-all duration-200 flex items-center gap-1"
                >
                  {suburb}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
                : <span
                  key={suburb}
                  
                  className="group px-4 py-1.5 rounded-full bg-[#f9fafb] border border-[#e5e7eb] text-[#374151]   text-[13px] transition-all duration-200 flex items-center gap-1"
                >
                  {suburb}
                  
                </span>
            )) }
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
