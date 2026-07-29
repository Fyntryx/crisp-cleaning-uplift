"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import FAQ from "@/components/lp/FAQ";

// Example FAQ Data
const faqData = [
  {
    question: "Do you clean heritage and contemporary homes in Toorak?",
    answer: "Yes - both heritage Edwardian and Victorian properties and contemporary architect-designed homes in Toorak are serviced. Product selection is appropriate to each home's specific surface types.",
  },
  {
    question: "How much does house cleaning cost in Toorak?",
    answer: "Pricing is set by your home's actual room count and scope. Toorak's larger properties are quoted accurately for their genuine requirements - not at a standard rate. Get an exact price online.",
  },
  {
    question: "Can I request a consistent cleaner familiar with my home?",
    answer: "Yes. Your cleaner is assigned at the initial booking and returns on every scheduled visit. 97% of recurring clients receive the same cleaner. Familiarity with your home's layout and requirements builds from the second visit onward.",
  },
  {
    question: "How are products selected for premium and heritage surfaces?",
    answer: "Our product kit is curated for surface compatibility across materials common in Toorak properties - original timber, stone, polished concrete, heritage tiles, and premium fittings. No abrasive or high-pH products on sensitive surfaces.",
  },
  {
    question: "What's included in a standard clean for a larger Toorak home?",
    answer: "Kitchen, all bathrooms in scope, floors throughout, formal and informal living areas, all bedrooms, dressing rooms, and laundry. Additional rooms are included within the agreed scope. Your quote confirms exactly what's covered before you commit.",
  },
  {
    question: "Can I start with a deep clean before beginning a regular service?",
    answer: "Yes - a one-off deep clean is available to establish a high baseline standard before beginning recurring visits. Many new Toorak clients use this approach. Get a separate deep clean quote online.",
  }
];

const defaultReviews = [
  { text: "Honestly felt like a brand new home.", author: "Andre B" },
  { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L" },
  { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
  { text: "One of the best decisions we've made. Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
  { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
  { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" }
];


export default function ToorakClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [activePanel, setActivePanel] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isHoveringReview, setIsHoveringReview] = useState(false);
  const [fadeReview, setFadeReview] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHoveringReview) return;
    const interval = setInterval(() => {
      setFadeReview(true);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % defaultReviews.length);
        setFadeReview(false);
      }, 400); // 400ms fade transition
    }, 5000);
    return () => clearInterval(interval);
  }, [isHoveringReview]);

  const nextReview = () => {
    setFadeReview(true);
    setTimeout(() => {
      setCurrentReview((prev) => (prev + 1) % defaultReviews.length);
      setFadeReview(false);
    }, 400);
  };

  const prevReview = () => {
    setFadeReview(true);
    setTimeout(() => {
      setCurrentReview((prev) => (prev - 1 + defaultReviews.length) % defaultReviews.length);
      setFadeReview(false);
    }, 400);
  };

  // Intersection Observer for Timeline
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .toorak-noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/noise.png'); /* Assuming noise.png exists, otherwise it fails gracefully */
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }
        
        @keyframes wordUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .word { overflow: hidden; display: inline-block; vertical-align: top; }
        .word span {
          display: inline-block;
          animation: wordUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
          opacity: 0;
        }
        
        @keyframes fadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to   { width: 40px; }
        }

        .accordion-panel {
          transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .accordion-panel.active {
          border-left: 3px solid #d97706;
          width: 60%;
        }
        .accordion-panel:not(.active) {
          width: 20%;
        }
        @media (max-width: 768px) {
          .accordion-panel.active, .accordion-panel:not(.active) {
            width: 100% !important;
            height: auto;
          }
        }
        
        .panel-label {
          position: absolute;
          bottom: 40px;
          left: 24px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: opacity 0.3s;
        }
        .accordion-panel.active .panel-label {
          opacity: 0;
        }

        .panel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 48px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
          pointer-events: none;
        }
        .accordion-panel.active .panel-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        @media (max-width: 768px) {
          .panel-content {
            position: relative;
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .panel-label { display: none; }
        }

        .timeline-item {
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .timeline-item.left-side {
          transform: translateX(-30px);
        }
        .timeline-item.right-side {
          transform: translateX(30px);
        }
        .timeline-item.visible .timeline-dot {
          box-shadow: 0 0 0 6px rgba(217,119,6,0.1);
        }
        .timeline-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        @keyframes bounce-small {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce-small {
          animation: bounce-small 1.8s infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
          .word span { opacity: 1; transform: none; }
          .timeline-item { opacity: 1; transform: none; }
        }
        
        /* Override FAQ active border color for Toorak */
        .group[open] > summary > div { 
          border-left: 3px solid #d97706 !important; 
          padding-left: 16px !important;
          transition: all 0.2s ease;
        }
        .group[open] > summary > div > h3 { color: #d97706 !important; }
        .group[open] > summary svg { color: #d97706 !important; transform: rotate(180deg); }
      `}} />

      {/* SECTION 1 — HERO */}
      <section className="toorak-noise relative w-full flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="relative z-10 w-full max-w-[900px] px-[32px] text-center flex flex-col items-center justify-center pt-20">
          
          {/* Step 1: Reveal line */}
          <div className="text-[15px] font-[400] text-[rgba(255,255,255,0.45)] tracking-[0.15em] uppercase opacity-0 animate-[fadeIn_0.8s_ease_0.2s_forwards] mt-[12px]">
            Melbourne's most demanding homes.
          </div>
          
          {/* Step 2: Gold rule */}
          <div className="w-0 h-[1px] bg-[#d97706] my-[28px] mx-auto animate-[expandWidth_0.6s_ease_0.8s_forwards]" style={{ maxWidth: '40px' }} />
          
          {/* Step 3: H1 */}
          <h1 className="text-[48px] md:text-[80px] font-[800] text-[#ffffff] leading-[1.0] tracking-[-0.04em] flex flex-col items-center">
            <div className="flex gap-4">
              <span className="word"><span style={{ animationDelay: '1.2s' }}>House</span></span>
              <span className="word"><span style={{ animationDelay: '1.28s' }}>Cleaning</span></span>
            </div>
            <div className="flex gap-4">
              <span className="word"><span style={{ animationDelay: '1.36s', color: '#d97706' }}>Toorak</span></span>
            </div>
            <div className="flex gap-4">
              <span className="word"><span style={{ animationDelay: '1.44s' }}>Melbourne</span></span>
            </div>
          </h1>
          
          {/* Step 4: Subheading */}
          <p className="text-[16px] text-[rgba(255,255,255,0.4)] tracking-[0.08em] mt-[28px] opacity-0 animate-[fadeIn_0.6s_ease_2.2s_forwards]">
            Fixed pricing. Same cleaner. Heritage-safe products.
          </p>
          
          {/* Step 5: CTA Row */}
          <div className="mt-[36px] flex flex-wrap justify-center gap-[12px] opacity-0 animate-[fadeUp_0.6s_ease_2.6s_forwards]">
            <a href="/book" className="bg-[#d97706] text-white rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[#d97706] transition-colors">
              Get an Instant Quote
            </a>
            <a href="#included" className="border border-[rgba(255,255,255,0.2)] text-white rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              See what's included
            </a>
          </div>
          
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-[10px] opacity-0 animate-[fadeIn_0.6s_ease_2.8s_forwards]">
            5% off your first clean. Fixed price, no surprises.
          </div>
          
          <div className="flex items-center gap-[8px] sm:gap-[16px] mt-[20px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[16px] py-[6px] text-[10px] sm:text-[12px] text-[rgba(255,255,255,0.55)] opacity-0 animate-[fadeIn_0.6s_ease_3.0s_forwards] flex-wrap justify-center">
            <span>97% Same Cleaner</span>
            <span className="text-[#d97706]">·</span>
            <span>Eco-Friendly Products</span>
            <span className="text-[#d97706]">·</span>
            <span>72hr Guarantee</span>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-[fadeIn_0.6s_ease_3.5s_forwards]">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.25)] mb-2">scroll</span>
          <ChevronDown className="w-5 h-5 text-[#d97706] animate-bounce-small" />
        </div>
      </section>

      {/* SECTION 2 — PROOF BAR */}
      <section className="bg-[#d97706] w-full py-[20px]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-[16px] sm:gap-[32px] md:gap-[64px] text-[11px] sm:text-[13px] font-[600] text-[#ffffff] text-center uppercase tracking-[0.1em]">
            <span>4.9 ★ Google</span>
            <span className="hidden sm:inline text-[rgba(255,255,255,0.4)]">·</span>
            <span>97% Same Cleaner</span>
            <span className="hidden sm:inline text-[rgba(255,255,255,0.4)]">·</span>
            <span>100% Eco-Friendly</span>
            <span className="hidden sm:inline text-[rgba(255,255,255,0.4)]">·</span>
            <span>72hr Guarantee</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PAGE INTRO */}
      <section className="bg-[#ffffff] py-[100px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[40px] md:gap-[80px]">
          {/* Left col */}
          <div className="hidden md:flex justify-end">
            <div className="text-[72px] font-[900] text-[#f3f4f6] tracking-[-0.03em] leading-[1] select-none pointer-events-none" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} aria-hidden="true">
              TOORAK
            </div>
          </div>
          {/* Right col */}
          <div>
            <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[20px]">
              Toorak · Melbourne
            </div>
            <p className="text-[16px] md:text-[18px] text-[#374151] leading-[1.9] max-w-[620px]">
              Toorak's residential streets - the private roads running off Toorak Road and Orrong Road, the tree-lined blocks around Toorak Village, and the larger properties on the suburb's eastern fringe near Fawkner Park - represent Melbourne's most demanding residential cleaning market. Large homes with multiple formal rooms, polished timber and heritage floors, premium finishes throughout, and a household demographic that notices detail quickly. Delivering a consistent, high standard across properties like these requires a cleaner who knows your home, uses the right products on the right surfaces, and produces the same result every visit without oversight. Crisp services Toorak properties with fixed, scope-based pricing, eco-friendly products appropriate for premium and heritage surfaces, and the same cleaner assigned from the first booking.
            </p>
            <div className="w-[48px] h-[2px] bg-[#d97706] mt-[32px]" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROPERTY TYPE HORIZONTAL ACCORDION */}
      <section className="bg-[#0A0A0A] p-0 w-full">
        <div className="pt-[64px] px-[24px] md:px-[48px] pb-[48px] max-w-[1200px] mx-auto">
          <div className="text-[11px] text-[#d97706] tracking-[0.2em] uppercase mb-[16px]">
            Premium Home Cleaning Across Toorak
          </div>
          <p className="text-[16px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[640px]">
            Toorak's housing market has no direct equivalent in Melbourne - the suburb contains some of the largest, most ornate, and most meticulously maintained private residential properties in the country. Cleaning at this level isn't about speed or price; it's about precision, surface knowledge, and the kind of cleaner-client relationship that develops when the same professional returns repeatedly to the same home.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full h-auto md:h-[520px] overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
          {/* Panel 1 */}
          <div 
            className={`accordion-panel relative overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] min-h-[300px] md:min-h-0 bg-[#0f0f0f] hover:bg-[#141414] ${activePanel === 0 ? 'active' : ''}`}
            onClick={() => setActivePanel(0)}
          >
            <div className="absolute top-[32px] left-[24px] text-[11px] text-[#d97706] font-[700]">01</div>
            <div className="panel-label">Heritage</div>
            
            <div className="panel-content flex flex-col justify-end">
              <div className="w-[32px] h-[2px] bg-[#d97706] mb-[20px]" />
              <div className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] w-fit mb-3">
                Toorak Village · Heritage
              </div>
              <h3 className="text-[22px] font-[700] text-[#ffffff] leading-[1.3] my-[12px]">
                Heritage and Edwardian Homes Near Toorak Village
              </h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.75] max-w-[480px] mb-6">
                The streets within walking distance of Toorak Village - the suburb's commercial centre on Toorak Road - contain some of Melbourne's finest Edwardian and Victorian-era private residences. Multiple formal reception rooms, original decorative ceilings, polished timber throughout, heritage fireplaces, and ornamental fittings define these properties. Crisp's product selection is specifically chosen for compatibility with period surfaces; damage to original finishes in a Toorak home is unacceptable and our product kit is built around preventing it.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Heritage fireplaces', 'Original ceilings', 'Polished timber', 'Period surfaces'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[rgba(255,255,255,0.55)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div 
            className={`accordion-panel relative overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] min-h-[300px] md:min-h-0 bg-[#0f0f0f] hover:bg-[#141414] ${activePanel === 1 ? 'active' : ''}`}
            onClick={() => setActivePanel(1)}
          >
            <div className="absolute top-[32px] left-[24px] text-[11px] text-[#d97706] font-[700]">02</div>
            <div className="panel-label">Contemporary</div>
            
            <div className="panel-content flex flex-col justify-end">
              <div className="w-[32px] h-[2px] bg-[#d97706] mb-[20px]" />
              <div className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] w-fit mb-3">
                Architect-Designed · Contemporary
              </div>
              <h3 className="text-[22px] font-[700] text-[#ffffff] leading-[1.3] my-[12px]">
                Contemporary and Architect-Designed Properties
              </h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.75] max-w-[480px] mb-6">
                Toorak's newer properties - contemporary architect-designed homes and significant renovations - present a different surface profile to the suburb's heritage stock. Polished concrete, Italian stone benchtops, feature-tiled bathrooms, bespoke joinery, and expansive glass require an approach as precise on modern materials as on period ones. Our scope and product selection adjusts to the specific surfaces in each property.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Italian stone', 'Polished concrete', 'Bespoke joinery', 'Feature tiles'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[rgba(255,255,255,0.55)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div 
            className={`accordion-panel relative overflow-hidden cursor-pointer bg-[#0f0f0f] hover:bg-[#141414] min-h-[300px] md:min-h-0 ${activePanel === 2 ? 'active' : ''}`}
            onClick={() => setActivePanel(2)}
          >
            <div className="absolute top-[32px] left-[24px] text-[11px] text-[#d97706] font-[700]">03</div>
            <div className="panel-label">Multi-Room</div>
            
            <div className="panel-content flex flex-col justify-end">
              <div className="w-[32px] h-[2px] bg-[#d97706] mb-[20px]" />
              <div className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] w-fit mb-3">
                Private Streets · Multi-Room
              </div>
              <h3 className="text-[22px] font-[700] text-[#ffffff] leading-[1.3] my-[12px]">
                Larger Multi-Room Homes on Toorak's Private Tree-Lined Streets
              </h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.75] max-w-[480px] mb-6">
                The largest residential properties in Toorak - often six to nine rooms across multiple levels, with formal and informal living zones, multiple bathrooms, and ancillary spaces including home offices and entertaining rooms - require careful scope management at booking. Pricing is based on the rooms included in the agreed scope; the cost reflects the actual work required, not a rough estimate for a home that wasn't properly accounted for.
              </p>
              <div className="flex flex-wrap gap-2">
                {['6–9 room homes', 'Multiple bathrooms', 'Formal zones', 'Accurate pricing'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[rgba(255,255,255,0.55)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT'S INCLUDED */}
      <section className="bg-[#ffffff] py-[100px]">
        <div className="text-center mb-[72px] px-6">
          <div className="text-[11px] text-[#d97706] font-[600] tracking-[0.2em] uppercase mb-[16px]">Scope & Checklist</div>
          <h2 className="text-[40px] font-[700] text-[#0A0A0A] mb-[16px]">What Every Toorak Clean Includes</h2>
          <p className="text-[16px] text-[#6b7280] max-w-[560px] mx-auto leading-[1.8]">
            Every Toorak clean is delivered against a fixed, documented scope. At this property tier, the checklist isn't a formality - it's the mechanism that produces a consistent result across a home where inconsistency is immediately noticeable.
          </p>
        </div>

        <div className="relative max-w-[900px] mx-auto px-[24px] md:px-[48px]">
          {/* Center Spine */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px]" style={{ background: 'linear-gradient(180deg, #d97706 0%, rgba(217,119,6,0.2) 100%)' }} />

          {/* Item 1 - Left */}
          <div className="timeline-item left-side flex flex-col md:grid md:grid-cols-[1fr_40px_1fr] gap-6 md:gap-0 mb-[64px] items-start relative">
            <div className="md:text-right pl-[40px] md:pl-0 pr-0 md:pr-[24px]">
              <h3 className="text-[18px] font-[700] text-[#0A0A0A] mb-[10px]">Kitchen and Bathroom Detailing to a Premium Standard</h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Kitchen surfaces - stone benchtops, premium appliance exteriors, rangehood, splashback, sink, and cabinetry exteriors - are cleaned and wiped to a premium finish on every visit. All bathrooms within scope, including ensuites, family bathrooms, and powder rooms, are sanitised, scrubbed, and polished. Frameless screens, stone surrounds, and feature tiles are handled with products appropriate to their specific material.
              </p>
              <div className="flex flex-wrap md:justify-end gap-[6px] mt-[14px]">
                {['Stone benchtops', 'All bathrooms', 'Frameless screens', 'Cabinetry exteriors'].map(pill => (
                  <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[#92400e]">{pill}</span>
                ))}
              </div>
            </div>
            {/* Dot */}
            <div className="absolute md:relative left-[18px] md:left-auto top-[6px] md:top-0 w-[12px] h-[12px] timeline-dot rounded-full bg-[#d97706] border-[3px] border-[#ffffff] shadow-[0_0_0_3px_rgba(217,119,6,0.2)] transition-shadow duration-500 mx-auto z-10" />
            <div className="hidden md:block"></div>
          </div>

          {/* Item 2 - Right */}
          <div className="timeline-item right-side flex flex-col md:grid md:grid-cols-[1fr_40px_1fr] gap-6 md:gap-0 mb-[64px] items-start relative">
            <div className="hidden md:block"></div>
            {/* Dot */}
            <div className="absolute md:relative left-[18px] md:left-auto top-[6px] md:top-0 w-[12px] h-[12px] timeline-dot rounded-full bg-[#d97706] border-[3px] border-[#ffffff] shadow-[0_0_0_3px_rgba(217,119,6,0.2)] transition-shadow duration-500 mx-auto z-10" />
            <div className="text-left pl-[40px] md:pl-[24px] pr-0">
              <h3 className="text-[18px] font-[700] text-[#0A0A0A] mb-[10px]">Polished Floors, Formal Living Areas and Feature Surfaces</h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Timber floors are swept and mopped with low-moisture products appropriate for polished and heritage-grade boards. Formal reception rooms, sitting rooms, and libraries receive the same level of attention as everyday living spaces - surfaces dusted, mirrors and glass polished, accessible shelf areas addressed. Feature surfaces, including polished concrete and premium natural stone, are cleaned with material-appropriate products.
              </p>
              <div className="flex flex-wrap gap-[6px] mt-[14px]">
                {['Low-moisture on timber', 'Formal reception rooms', 'Libraries', 'Natural stone'].map(pill => (
                  <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[#92400e]">{pill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Item 3 - Left */}
          <div className="timeline-item left-side flex flex-col md:grid md:grid-cols-[1fr_40px_1fr] gap-6 md:gap-0 mb-0 items-start relative">
            <div className="md:text-right pl-[40px] md:pl-0 pr-0 md:pr-[24px]">
              <h3 className="text-[18px] font-[700] text-[#0A0A0A] mb-[10px]">Bedrooms, Dressing Rooms and Secondary Living Spaces</h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">
                Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room presented. Dressing rooms - standard in many Toorak homes - are included within the agreed scope as a defined room. Secondary living spaces, home offices, media rooms, and any additional rooms in the booking are treated with the same systematic attention as primary rooms throughout.
              </p>
              <div className="flex flex-wrap md:justify-end gap-[6px] mt-[14px]">
                {['All bedrooms', 'Dressing rooms', 'Home offices', 'Media rooms'].map(pill => (
                  <span key={pill} className="bg-[#fff7ed] border border-[#fed7aa] rounded-[99px] px-[12px] py-[4px] text-[12px] text-[#92400e]">{pill}</span>
                ))}
              </div>
            </div>
            {/* Dot */}
            <div className="absolute md:relative left-[18px] md:left-auto top-[6px] md:top-0 w-[12px] h-[12px] timeline-dot rounded-full bg-[#d97706] border-[3px] border-[#ffffff] shadow-[0_0_0_3px_rgba(217,119,6,0.2)] transition-shadow duration-500 mx-auto z-10" />
            <div className="hidden md:block"></div>
          </div>

        </div>
      </section>

      {/* SECTION 6 — WHY CRISP */}
      <section className="bg-[#0A0A0A] p-0">
        <div className="pt-[80px] px-[24px] md:px-[48px] pb-0">
          <div className="text-[11px] text-[#d97706] tracking-[0.2em] uppercase mb-[16px]">The Crisp Difference</div>
          <h2 className="text-[40px] font-[700] text-[#ffffff] mb-[12px]">Why Toorak Homeowners Choose Crisp</h2>
          <p className="text-[16px] text-[rgba(255,255,255,0.5)] max-w-[560px] leading-[1.8] mb-[64px] mt-[12px]">
            Toorak's cleaning keyword carries a high competition index at a meaningful search volume. The market is contested and the expected service standard is the highest of any suburb in the portfolio. Crisp's advantage in Toorak is operational - not a promotional headline.
          </p>
        </div>

        <div className="w-full border-t border-[rgba(255,255,255,0.06)] flex flex-col">
          {/* Block 01 */}
          <div className="group grid grid-cols-1 md:grid-cols-[80px_1fr_280px] gap-6 md:gap-[48px] p-[24px] md:p-[48px] items-start border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.02)] hover:border-l-[2px] hover:border-l-[rgba(217,119,6,0.4)] transition-all duration-200">
            <div className="text-[64px] md:text-[80px] font-[900] text-[rgba(255,255,255,0.06)] leading-[1] group-hover:text-[#d97706] group-hover:opacity-60 transition-all duration-200">
              01
            </div>
            <div>
              <h3 className="text-[20px] font-[700] text-[#ffffff] mb-[12px]">Same Cleaner Every Visit - Discretion and Consistency as Standard</h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.75]">
                Your Toorak cleaner is assigned at the first booking and returns on every scheduled visit. At a property level where familiarity with your home's specific requirements, access arrangements, and preferences matters significantly, the same professional every time isn't optional - it's a baseline requirement. Our 97% same-cleaner continuity rate is the operational commitment that makes this consistent rather than aspirational.
              </p>
            </div>
            <div className="md:text-right md:justify-self-end w-full md:w-auto">
              <span className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[20px] py-[8px] text-[14px] font-[700] whitespace-nowrap">
                97% same-cleaner rate
              </span>
            </div>
          </div>

          {/* Block 02 */}
          <div className="group grid grid-cols-1 md:grid-cols-[80px_1fr_280px] gap-6 md:gap-[48px] p-[24px] md:p-[48px] items-start border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.02)] hover:border-l-[2px] hover:border-l-[rgba(217,119,6,0.4)] transition-all duration-200">
            <div className="text-[64px] md:text-[80px] font-[900] text-[rgba(255,255,255,0.06)] leading-[1] group-hover:text-[#d97706] group-hover:opacity-60 transition-all duration-200">
              02
            </div>
            <div>
              <h3 className="text-[20px] font-[700] text-[#ffffff] mb-[12px]">Fixed Pricing for Larger, More Complex Home Configurations</h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.75]">
                A six-room Toorak home with three bathrooms and two formal reception rooms requires a pricing model that accounts for its genuine scope. Our fixed, room-count pricing provides an accurate, confirmed cost before any cleaner arrives - not a per-hour estimate that grows as the home turns out to be larger or more detailed than assumed.
              </p>
            </div>
            <div className="md:text-right md:justify-self-end w-full md:w-auto">
              <span className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[20px] py-[8px] text-[14px] font-[700] whitespace-nowrap">
                Fixed pricing always
              </span>
            </div>
          </div>

          {/* Block 03 */}
          <div className="group grid grid-cols-1 md:grid-cols-[80px_1fr_280px] gap-6 md:gap-[48px] p-[24px] md:p-[48px] items-start border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.02)] hover:border-l-[2px] hover:border-l-[rgba(217,119,6,0.4)] transition-all duration-200">
            <div className="text-[64px] md:text-[80px] font-[900] text-[rgba(255,255,255,0.06)] leading-[1] group-hover:text-[#d97706] group-hover:opacity-60 transition-all duration-200">
              03
            </div>
            <div>
              <h3 className="text-[20px] font-[700] text-[#ffffff] mb-[12px]">Eco-Friendly Products Selected for Premium and Heritage Surfaces</h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.75]">
                Premium and heritage surfaces in Toorak properties - polished concrete, Italian stone, original timber, heritage tiles, and bespoke joinery - are sensitive to inappropriate product choices. Our eco-friendly product kit is curated for surface compatibility across all material types common in this suburb, cleaning effectively without compromising the surfaces through repeated inappropriate treatment.
              </p>
            </div>
            <div className="md:text-right md:justify-self-end w-full md:w-auto">
              <span className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[20px] py-[8px] text-[14px] font-[700] whitespace-nowrap">
                100% eco-friendly
              </span>
            </div>
          </div>

          {/* Block 04 */}
          <div className="group grid grid-cols-1 md:grid-cols-[80px_1fr_280px] gap-6 md:gap-[48px] p-[24px] md:p-[48px] items-start border-b border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.02)] hover:border-l-[2px] hover:border-l-[rgba(217,119,6,0.4)] transition-all duration-200">
            <div className="text-[64px] md:text-[80px] font-[900] text-[rgba(255,255,255,0.06)] leading-[1] group-hover:text-[#d97706] group-hover:opacity-60 transition-all duration-200">
              04
            </div>
            <div>
              <h3 className="text-[20px] font-[700] text-[#ffffff] mb-[12px]">Satisfaction Guarantee on Every Clean</h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.75]">
                Every Crisp clean carries a 72-hour re-clean guarantee - if anything doesn't meet your standard, we return to address it at no additional charge. At a premium property level, this guarantee is the minimum expression of what the service standard should be. Crisp stands behind it from the first visit and across every subsequent booking without exception.
              </p>
            </div>
            <div className="md:text-right md:justify-self-end w-full md:w-auto">
              <span className="inline-block bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.25)] text-[#d97706] rounded-[99px] px-[20px] py-[8px] text-[14px] font-[700] whitespace-nowrap">
                72hr re-clean
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TESTIMONIALS */}
      <section className="bg-[#ffffff] py-[100px]">
        <div 
          className="max-w-[800px] mx-auto px-[24px] md:px-[48px] text-center"
          onMouseEnter={() => setIsHoveringReview(true)}
          onMouseLeave={() => setIsHoveringReview(false)}
        >
          <span className="text-[140px] text-[#d97706] opacity-[0.12] leading-[0.7] block mb-[32px] font-serif" style={{ fontFamily: 'Georgia, serif' }}>"</span>
          <p className={`text-[24px] md:text-[28px] font-[400] text-[#0A0A0A] leading-[1.6] italic transition-opacity duration-400 ease-in-out ${fadeReview ? 'opacity-0' : 'opacity-100'}`}>
            "{defaultReviews[currentReview].text}"
          </p>
          <div className={`flex flex-col items-center mt-[40px] transition-opacity duration-400 ease-in-out ${fadeReview ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-[48px] h-[48px] bg-[#fef3c7] text-[#92400e] rounded-full flex items-center justify-center font-bold text-[18px] mb-4">
              {defaultReviews[currentReview].author.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-[15px] font-[600] text-[#0A0A0A]">{defaultReviews[currentReview].author}</div>
            <div className="text-[13px] text-[#9ca3af] mb-2 flex items-center gap-1 justify-center">
              <Star className="w-3 h-3 fill-current" /> Google Review
            </div>
            <div className="text-[#d97706] tracking-widest text-[14px]">★★★★★</div>
          </div>
          
          
          <div className="flex justify-center gap-4 mt-8 items-center">
            <button 
              onClick={prevReview}
              className="w-[44px] h-[44px] rounded-full border border-[#e5e7eb] text-[#9ca3af] flex items-center justify-center hover:border-[#d97706] hover:text-[#d97706] transition-colors"
            >
              &larr;
            </button>
            <div className="flex gap-2 mx-4">
              {defaultReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`h-[8px] rounded-full transition-all duration-300 ${idx === currentReview ? 'w-[24px] bg-[#d97706]' : 'w-[8px] bg-[#e5e7eb]'}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextReview}
              className="w-[44px] h-[44px] rounded-full border border-[#e5e7eb] text-[#9ca3af] flex items-center justify-center hover:border-[#d97706] hover:text-[#d97706] transition-colors"
            >
              &rarr;
            </button>
          </div>


          <div className="text-[14px] text-[#6b7280] mt-[48px]">
            ★★★★★ Rated {googleRatingValue} on Google
          </div>
        </div>
      </section>

      {/* SECTION 8 — PRICING */}
      <section className="bg-[#fafafa] py-[100px]">
        <div className="text-center mb-[64px] px-6">
          <div className="text-[11px] text-[#d97706] font-[600] tracking-[0.2em] uppercase mb-[16px]">Transparent Pricing</div>
          <h2 className="text-[40px] font-[700] text-[#0A0A0A] mb-[16px]">Toorak House Cleaning Prices</h2>
          <p className="text-[16px] text-[#6b7280] max-w-[560px] mx-auto">
            Fixed pricing based on your room count. No hourly estimates, no surprise charges.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-8 border border-[#e5e7eb] shadow-sm flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#0A0A0A] mb-2">Standard</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $145</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Up to 3 bed</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All bathrooms</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Eco products included</li>
            </ul>
            <a href="/book" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>

          {/* Card 2 - Featured */}
          <div className="bg-white rounded-[24px] p-8 shadow-xl flex flex-col relative border border-[#e5e7eb] border-t-[3px] border-t-[#d97706] transform scale-100 md:scale-[1.04] z-10">
              <div className="absolute top-0 right-0 px-4 py-2 rounded-tr-[24px] rounded-bl-[16px] bg-[rgba(217,119,6,0.08)] text-[#d97706] border border-[rgba(217,119,6,0.2)] text-[10px] font-extrabold uppercase tracking-wider z-10">
                Most popular in Toorak
              </div>
            <h3 className="text-[20px] font-[700] text-[#0A0A0A] mb-2">Deep</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $235</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Full property scope</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Oven & inside cabinets</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Grout & hard-to-reach areas</li>
            </ul>
            <a href="/book" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-8 border border-[#e5e7eb] shadow-sm flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#0A0A0A] mb-2">Vacate</h3>
            <div className="text-[#6b7280] text-[14px] mb-6">From $380</div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Bond-back standard</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All rooms & surfaces</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Inspection ready</li>
            </ul>
            <a href="/book" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="bg-[#ffffff] py-[100px]">
        <FAQ data={faqData} title="Frequently Asked Questions" />
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="toorak-noise relative bg-[#0A0A0A] py-[100px] px-[32px] text-center overflow-hidden">
        <div className="relative z-10 max-w-[600px] mx-auto flex flex-col items-center">
          <div className="w-[40px] h-[1px] bg-[#d97706] mb-[32px]" />
          
          <div className="text-[11px] text-[#d97706] tracking-[0.2em] uppercase mb-[16px]">
            Ready to Book
          </div>
          
          <h2 className="text-[52px] font-[800] text-[#ffffff] leading-[1.1] mb-[16px]">
            Book a Cleaner in <span className="text-[#d97706]">Toorak</span>
          </h2>
          
          <p className="text-[16px] text-[rgba(255,255,255,0.55)] max-w-[460px] mx-auto mt-[16px] mb-[8px]">
            Book a Toorak house cleaner - same professional every visit, fixed pricing for your home's actual scope, 72-hour guarantee on every clean.
          </p>
          
          <span className="text-[#d97706] font-[600] text-[14px] block mb-[32px]">
            5% off your first clean.
          </span>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px] mb-[48px]">
            <a href="/book" className="bg-[#d97706] text-white rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[#d97706] transition-colors w-full sm:w-auto">
              Get an Instant Quote
            </a>
            <a href="tel:0451423786" className="border border-[rgba(255,255,255,0.15)] text-white rounded-[99px] px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors w-full sm:w-auto">
              Call us: 0451 423 786
            </a>
          </div>
          
          <div className="w-[40px] h-[1px] bg-[#d97706] mb-[28px]" />
          
          <div className="text-[11px] text-[rgba(255,255,255,0.25)] tracking-[0.15em] uppercase mb-[14px]">
            Nearby Areas We Also Service
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            { [{ name: 'South Yarra', isBuilt: true }, { name: 'Malvern', isBuilt: true }, { name: 'Hawthorn', isBuilt: true }, { name: 'Armadale', isBuilt: false }, { name: 'Glen Iris', isBuilt: true }].map(({ name: area, isBuilt }) => (
              isBuilt 
                ? <a key={area} href={`/house-cleaning-${area.toLowerCase().replace(' ', '-')}`} className="group bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)] rounded-[99px] px-[16px] py-[6px] text-[12px] hover:border-[#d97706] hover:text-[#d97706] transition-colors flex items-center gap-2">
                {area}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-150" />
              </a>
                : <span key={area}  className="group bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)] rounded-[99px] px-[16px] py-[6px] text-[12px]   transition-colors flex items-center gap-2">
                {area}
                
              </span>
            )) }
          </div>
        </div>
      </section>
    </>
  );
}
