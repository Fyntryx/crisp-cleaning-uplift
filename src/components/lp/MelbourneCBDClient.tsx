'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Building2, Waves, Anchor, UserCheck, Key, ArrowUpDown, Layout, CheckCircle2 } from 'lucide-react';
import FAQ from "@/components/lp/FAQ";

// Removed ScrollReveal

function ElevatorCounter() {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;
    const el = counterRef.current;
    const target = 32;
    const duration = 2000;
    let start = performance.now();
    let animationFrameId: number;

    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const current = Math.floor(eased * target);
      if (el) el.textContent = String(current).padStart(2, '0');
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        if (el) el.textContent = String(target).padStart(2, '0');
      }
    };
    
    animationFrameId = requestAnimationFrame(update);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex items-center">
      <div ref={counterRef} className="text-[120px] font-[900] text-[#ffffff] leading-[1] tracking-[-8px] tabular-nums">
        01
      </div>
      <div className="text-[120px] leading-[1] text-[#3B82F6]" style={{ animation: 'blink 1s step-end infinite' }}>_</div>
    </div>
  );
}

function ProcessFlow({ steps }: { steps: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll('.process-step');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt((entry.target as HTMLElement).dataset.index || "0");
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {steps.map((step, i) => (
        <div key={i} className="process-step relative flex mb-[40px] last:mb-0" data-index={i}>
          {/* Left col: Dot & Line */}
          <div className="relative w-[32px] shrink-0 flex flex-col items-center">
            <div className="node-dot w-[16px] h-[16px] shrink-0 rounded-full border-[2px] border-[#3B82F6] bg-[#050D1A] transition-all duration-300 z-10 mt-[2px]"></div>
            {i !== steps.length - 1 && (
              <div className="absolute top-[18px] bottom-[-40px] w-[1px]" style={{ 
                background: 'linear-gradient(180deg, #3B82F6 0%, rgba(59,130,246,0.3) 100%)' 
              }}></div>
            )}
          </div>
          
          {/* Right col: Content */}
          <div className="flex-1 pb-0">
            <div className="step-num text-[10px] text-[rgba(59,130,246,0.5)] font-[700] tracking-[0.15em] mb-[4px] transition-colors duration-300">STEP {step.num}</div>
            <div className="step-title text-[15px] font-[700] text-[rgba(255,255,255,0.5)] mb-[4px] transition-colors duration-300">{step.title}</div>
            <div className="step-body text-[13px] text-[rgba(255,255,255,0.3)] leading-[1.6] transition-colors duration-300">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FloorPlan({ activeRoom, setActiveRoom }: { activeRoom: string | null, setActiveRoom: (room: string) => void }) {
  const getRoomClass = (roomKey: string) => {
    return `floor-room group ${activeRoom === roomKey ? 'active' : ''}`;
  };

  return (
    <svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="500" height="420" fill="#F8FAFC" rx="0"/>
      <rect x="20" y="20" width="460" height="380" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="2"/>

      {/* LIVING & DINING */}
      <g onClick={() => setActiveRoom('LIVING & DINING')} data-room="LIVING & DINING" className={getRoomClass('LIVING & DINING')}>
        <rect x="20" y="20" width="270" height="180" rx="0" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" className="room-fill"/>
        <text x="155" y="95" textAnchor="middle" fontSize="9" fill="#93C5FD" fontWeight="600" letterSpacing="0.12em">
          LIVING & DINING
        </text>
        <rect x="70" y="110" width="80" height="30" rx="4" fill="none" stroke="#BFDBFE" strokeWidth="1"/>
        <rect x="95" y="148" width="30" height="20" rx="2" fill="none" stroke="#BFDBFE" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="155" cy="75" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* KITCHEN */}
      <g onClick={() => setActiveRoom('KIT')} data-room="KIT" className={getRoomClass('KIT')}>
        <rect x="20" y="200" width="130" height="140" rx="0" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" className="room-fill"/>
        <text x="85" y="268" textAnchor="middle" fontSize="9" fill="#F97316" fontWeight="600" letterSpacing="0.12em">KITCHEN</text>
        <rect x="30" y="210" width="110" height="18" rx="2" fill="none" stroke="#FED7AA" strokeWidth="1"/>
        <rect x="30" y="210" width="18" height="80" rx="2" fill="none" stroke="#FED7AA" strokeWidth="1"/>
        <circle cx="130" cy="219" r="5" fill="none" stroke="#FED7AA" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="85" cy="248" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* BATHROOM */}
      <g onClick={() => setActiveRoom('BATHROOM')} data-room="BATHROOM" className={getRoomClass('BATHROOM')}>
        <rect x="150" y="200" width="140" height="140" rx="0" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" className="room-fill"/>
        <text x="220" y="268" textAnchor="middle" fontSize="9" fill="#38BDF8" fontWeight="600" letterSpacing="0.12em">BATHROOM</text>
        <rect x="165" y="215" width="60" height="28" rx="8" fill="none" stroke="#BAE6FD" strokeWidth="1"/>
        <ellipse cx="255" cy="228" rx="12" ry="15" fill="none" stroke="#BAE6FD" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="220" cy="248" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* MASTER BED */}
      <g onClick={() => setActiveRoom('BED 1')} data-room="BED 1" className={getRoomClass('BED 1')}>
        <rect x="290" y="20" width="190" height="170" rx="0" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" className="room-fill"/>
        <text x="385" y="90" textAnchor="middle" fontSize="9" fill="#A78BFA" fontWeight="600" letterSpacing="0.12em">MASTER BED</text>
        <rect x="315" y="50" width="140" height="80" rx="4" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <rect x="325" y="58" width="40" height="22" rx="3" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <rect x="395" y="58" width="40" height="22" rx="3" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="385" cy="70" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* ENSUITE */}
      <g onClick={() => setActiveRoom('ENSUITE')} data-room="ENSUITE" className={getRoomClass('ENSUITE')}>
        <rect x="290" y="190" width="190" height="80" rx="0" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" className="room-fill"/>
        <text x="385" y="234" textAnchor="middle" fontSize="9" fill="#38BDF8" fontWeight="600" letterSpacing="0.12em">ENSUITE</text>
        <rect x="420" y="200" width="48" height="58" rx="2" fill="none" stroke="#BAE6FD" strokeWidth="1"/>
        <circle cx="444" cy="214" r="4" fill="none" stroke="#BAE6FD" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="385" cy="214" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* BED 2 */}
      <g onClick={() => setActiveRoom('BED 2')} data-room="BED 2" className={getRoomClass('BED 2')}>
        <rect x="290" y="270" width="190" height="110" rx="0" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1.5" className="room-fill"/>
        <text x="385" y="322" textAnchor="middle" fontSize="9" fill="#A78BFA" fontWeight="600" letterSpacing="0.12em">BEDROOM 2</text>
        <rect x="305" y="285" width="155" height="70" rx="4" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <rect x="315" y="293" width="35" height="18" rx="3" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <rect x="370" y="293" width="35" height="18" rx="3" fill="none" stroke="#DDD6FE" strokeWidth="1"/>
        <circle className="tick-bg pointer-events-none" cx="385" cy="302" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* ENTRY / HALL */}
      <g onClick={() => setActiveRoom('ENTRY')} data-room="ENTRY" className={getRoomClass('ENTRY')}>
        <rect x="20" y="340" width="270" height="60" rx="0" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" className="room-fill"/>
        <text x="155" y="374" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600" letterSpacing="0.12em">ENTRY / HALL</text>
        <line x1="20" y1="370" x2="20" y2="400" stroke="#CBD5E1" strokeWidth="2"/>
        <path d="M20 370 Q40 370 40 390" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,2"/>
        <circle className="tick-bg pointer-events-none" cx="155" cy="354" r="10" fill="#3B82F6" opacity="0"/>
      </g>

      {/* Door gaps via white overlays */}
      <rect x="135" y="20" width="40" height="3" fill="#F8FAFC"/>
      <rect x="200" y="198.5" width="40" height="3" fill="#F8FAFC"/>
      <rect x="288.5" y="100" width="3" height="40" fill="#F8FAFC"/>
      <rect x="288.5" y="210" width="3" height="40" fill="#F8FAFC"/>
      <rect x="288.5" y="310" width="3" height="40" fill="#F8FAFC"/>
      <rect x="180" y="338.5" width="40" height="3" fill="#F8FAFC"/>

      <text x="470" y="405" fontSize="8" fill="#CBD5E1" textAnchor="end">
        2-BED · CBD APARTMENT
      </text>
      <text x="30" y="408" fontSize="7" fill="#CBD5E1" letterSpacing="0.1em">
        CRISP CLEANING
      </text>
    </svg>
  );
}

const roomData: Record<string, any> = {
  'KIT': {
    title: "Kitchen Sanitisation and Appliance Surfaces",
    body: "Benchtops, stovetop, rangehood exterior, splashback, sink, and accessible appliance exteriors are cleaned and wiped on every visit. Interior oven and fridge cleaning are available as add-ons; your instant quote sets out exactly what's included as standard and what can be added separately.",
    tags: ["Benchtops", "Stovetop & rangehood", "Splashback", "Add-ons available"]
  },
  'BATHROOM': {
    title: "Bathroom Scrubbing and Fixture Polishing",
    body: "Shower screen and recess, bath or tub, toilet including base and behind, basin, mirror, all tapware, and tiled floors are scrubbed, sanitised, and polished. For apartments with two bathrooms, both are covered within the standard scope - no additional charge for the second bathroom in a two-bed configuration.",
    tags: ["Shower screen", "Toilet base to cistern", "Both bathrooms included", "Tapware polished"]
  },
  'ENSUITE': {
    title: "Bathroom Scrubbing and Fixture Polishing",
    body: "Shower screen and recess, bath or tub, toilet including base and behind, basin, mirror, all tapware, and tiled floors are scrubbed, sanitised, and polished. For apartments with two bathrooms, both are covered within the standard scope - no additional charge for the second bathroom in a two-bed configuration.",
    tags: ["Shower screen", "Toilet base to cistern", "Both bathrooms included", "Tapware polished"]
  },
  'LIVING & DINING': {
    title: "Floors, Surfaces and Living Areas",
    body: "Hard floors throughout are swept and mopped; carpeted areas vacuumed including under accessible furniture. All surfaces, skirting boards, window sills, and door handles are dusted and wiped. Living and dining areas are left to a consistent, presented standard after every visit.",
    tags: ["Hard floors mopped", "Surfaces dusted", "Skirting boards", "Consistent standard"]
  },
  'BED 1': {
    title: "Bedrooms",
    body: "Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left to a presented standard. Furniture-accessible areas throughout are addressed within the standard scope.",
    tags: ["Vacuumed", "Surfaces dusted", "Furniture-accessible", "All bedrooms"]
  },
  'BED 2': {
    title: "Bedrooms",
    body: "Every bedroom in scope is vacuumed or mopped, surfaces dusted, and the room left to a presented standard. Furniture-accessible areas throughout are addressed within the standard scope.",
    tags: ["Vacuumed", "Surfaces dusted", "Furniture-accessible", "All bedrooms"]
  },
  'ENTRY': {
    title: "Entry and Balcony Areas",
    body: "Balcony cleaning - floor sweep, surface wipe, and glass or balustrade wipe-down - is available as an add-on for CBD apartments. Some strata schemes restrict external balcony cleaning; we flag any such limitations when you book and work within your building's requirements.",
    tags: ["Entry included", "Balcony add-on", "Strata compliant", "Flagged at booking"]
  }
};

const faqData = [
  { question: "Do you service apartments in Southbank and Docklands?", answer: "Yes - we service apartments across Melbourne CBD, Southbank and Docklands. Building access requirements vary by precinct and individual building; we coordinate these at the initial booking for every property." },
  { question: "How do you handle concierge access and visitor registration?", answer: "Building access requirements - concierge protocols, fob codes, lift booking windows, visitor parking - are collected at your first booking, stored against your property, and used by your cleaner on every subsequent visit without you resending them." },
  { question: "How much does apartment cleaning cost in the CBD?", answer: "Pricing is based on your apartment's room count and the service type you select. Get an exact fixed quote online in under a minute - no call-backs, no walkthroughs, no hourly-rate uncertainty." },
  { question: "Can I get the same cleaner for my apartment every fortnight?", answer: "Yes. Your cleaner is assigned to your apartment at the first booking and returns on your chosen schedule. 97% of recurring Crisp clients receive the same cleaner at every visit." },
  { question: "Are cleaning products included for CBD apartment cleans?", answer: "Yes - eco-friendly cleaning products are included in every clean. If your building or strata specifies product restrictions, advise us at booking and we'll accommodate them." },
  { question: "Do you offer end-of-lease cleaning for CBD apartments?", answer: "Yes - end-of-lease cleaning is available for CBD apartments, including building-access coordination. Get a separate vacate clean quote online; bond-back confidence included as standard." }
];

export default function MelbourneCBDClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [activeRoom, setActiveRoom] = useState<string>('LIVING & DINING');

  return (
    <>
      <main className="font-sans">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes pulse-blue {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
            50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(59,130,246,0); }
          }
          @keyframes pulse-green {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0); }
          }
          .cbd-faq .faq-item.open {
            border-left-color: #3B82F6 !important;
          }
          .room-content {
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .room-content.active {
            opacity: 1;
            transform: translateY(0);
          }
          .process-step.active .node-dot {
            background-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
          }
          .process-step.active .step-num {
            color: #3B82F6;
          }
          .process-step.active .step-title {
            color: #ffffff;
          }
          .process-step.active .step-body {
            color: rgba(255,255,255,0.7);
          }
          .floor-room .room-fill {
            transition: fill 0.2s ease, stroke 0.2s ease;
            cursor: pointer;
          }
          .floor-room:hover .room-fill {
            fill-opacity: 0.8;
            stroke-width: 2;
          }
          .floor-room[data-room="LIVING & DINING"].active .room-fill { fill: #DBEAFE; stroke: #3B82F6; stroke-width: 2.5; }
          .floor-room[data-room="KIT"].active .room-fill { fill: #FFEDD5; stroke: #d97706; stroke-width: 2.5; }
          .floor-room[data-room="BATHROOM"].active .room-fill,
          .floor-room[data-room="ENSUITE"].active .room-fill { fill: #E0F2FE; stroke: #0EA5E9; stroke-width: 2.5; }
          .floor-room[data-room="BED 1"].active .room-fill,
          .floor-room[data-room="BED 2"].active .room-fill { fill: #EDE9FE; stroke: #7C3AED; stroke-width: 2.5; }
          .floor-room[data-room="ENTRY"].active .room-fill { fill: #F1F5F9; stroke: #64748B; stroke-width: 2.5; }
          .floor-room.active .tick-bg {
            opacity: 1;
            transition: opacity 0.2s ease 0.1s;
          }
          .featured-card {
            padding-top: 16px;
          }
          .popular-badge {
            display: inline-block;
            margin-bottom: 16px;
            background: rgba(59,130,246,0.08);
            border: 1px solid rgba(59,130,246,0.2);
            color: #3B82F6;
            border-radius: 99px;
            padding: 4px 12px;
            font-size: 11px;
            font-weight: 600;
          }
        `}} />

        {/* SECTION 1 — HERO */}
        <section className="relative min-h-[100vh] bg-[#050D1A] overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] items-center">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('/noise.png')" }}></div>
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ 
            backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}></div>

          <div className="relative z-10 h-[140px] md:h-[100vh] flex flex-col md:flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <div className="text-[10px] font-[700] text-[rgba(255,255,255,0.25)] tracking-[0.3em] uppercase md:mb-[16px] mb-2 hidden md:block">FLOOR</div>
            <div className="hidden md:block w-[40px] h-[1px] bg-[#C9A84C] mb-[24px]"></div>
            <ElevatorCounter />
            <div className="hidden md:block w-[40px] h-[1px] bg-[#C9A84C] mt-[24px]"></div>
            <div className="text-[10px] font-[700] text-[rgba(255,255,255,0.25)] tracking-[0.2em] uppercase mt-[16px] hidden md:block">FLOORS SERVICED</div>
          </div>

          <div className="relative z-10 px-6 md:pl-[80px] md:pr-[80px] pt-12 md:pt-[120px] pb-16 md:pb-[80px]">
            <div className="text-[12px] text-[rgba(255,255,255,0.25)] mb-[32px]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link> › Apartment Cleaning Melbourne CBD
            </div>
            
            <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-[#3B82F6] text-[11px] font-[600] tracking-[0.12em] rounded-full px-[16px] py-[6px] mb-[28px] inline-flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-[#3B82F6] animate-pulse"></div>
              APARTMENTS · CBD · SOUTHBANK · DOCKLANDS
            </div>

            <h1 className="leading-[1.0] tracking-[-0.03em] mb-[24px]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-[52px] font-[800] text-[#ffffff]">Apartment Cleaning</motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-[64px] font-[800] text-[#3B82F6]">Melbourne CBD</motion.div>
            </h1>

            <p className="text-[15px] text-[rgba(255,255,255,0.55)] leading-[1.8] max-w-[500px] line-clamp-3">
              Cleaning a CBD apartment involves logistics that most residential cleaning services aren't structured for. Lift bookings, concierge sign-in procedures, visitor parking windows, and building-access requirements all need to be resolved before the cleaner reaches your floor - not worked out at the front desk. Crisp Cleaning's Melbourne CBD service is built around this operational reality. We coordinate building access in advance of every clean, work within your tower's visitor policies, and send the same cleaner to your apartment every visit. Whether you're in a one-bedroom near Southbank or a two-bedroom in a Docklands high-rise, fixed pricing based on your apartment's actual configuration means you know the exact cost before you confirm.
            </p>

            <div className="mt-[32px] flex flex-wrap gap-[32px]">
              {[
                "Building access coordinated",
                "Same cleaner every visit",
                "Fixed pricing confirmed online"
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#3B82F6]" style={{ animation: 'pulse-blue 2s infinite' }}></div>
                  <span className="text-[13px] text-[rgba(255,255,255,0.5)] font-[500]">{fact}</span>
                </div>
              ))}
            </div>

            <div className="mt-[36px] flex flex-col items-start gap-3">
              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="bg-[#d97706] text-white rounded-full px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[#b46205] transition-colors">
                  Get an Instant Quote
                </Link>
                <Link href="#included" className="border border-[rgba(255,255,255,0.15)] text-white rounded-full px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  See what's included
                </Link>
              </div>
              <div className="text-[12px] text-[rgba(255,255,255,0.25)] mt-[10px]">
                5% off your first clean. Fixed price, no surprises.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — PROOF BAR */}
        <section className="bg-[#0A1628] py-0 border-t border-[rgba(255,255,255,0.06)] border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            {[
              { stat: `${googleRatingValue}★`, label: "Google" },
              { stat: "97%", label: "Same Cleaner" },
              { stat: "100%", label: "Eco-Friendly" },
              { stat: "72hr", label: "Re-clean" }
            ].map((item, i) => (
              <div key={i} className={`p-[28px] md:px-[32px] text-center ${i !== 3 ? 'border-r border-[rgba(255,255,255,0.06)]' : ''}`}>
                <div className="text-[28px] font-[800] text-white leading-none flex items-center justify-center gap-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#3B82F6]" style={{ animation: 'pulse-blue 2s infinite' }}></div>
                  {item.stat}
                </div>
                <div className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.1em] mt-[4px]">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — THREE PRECINCTS */}
        <section className="bg-[#F8FAFC] py-[80px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px] pb-[48px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">Apartment Cleaning Across CBD, Southbank and Docklands</div>
            <h2 className="text-[36px] font-[700] text-[#0A1628] leading-tight mb-6">Apartment Cleaning Across CBD, Southbank and Docklands</h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[620px]">
              Crisp services apartments across Melbourne's three central residential precincts - the Hoddle Grid, Southbank's riverside towers along the Yarra, and Docklands' waterfront complexes. Each has distinct building profiles and access requirements; we service all three with building-specific coordination arranged ahead of every clean.
            </p>
          </div>

          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px] mt-[48px]">
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#e2e8f0] rounded-[20px] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0] bg-white">
              {[
                {
                  left: "HODDLE GRID", right: "40+ FLOORS", icon: <Building2 className="w-5 h-5" />,
                  title: "Studio and One-Bedroom City Apartments",
                  body: "Studio and one-bedroom apartments make up the bulk of the CBD's residential stock - compact, high-turnover properties often occupied by time-poor professionals. Our fixed scope ensures thorough, efficient coverage of these layouts without the uncertainty of an hourly rate applied to a small footprint. Your exact price is confirmed before you book, every time.",
                  tags: ["Studio", "1-bed", "Fixed scope", "Time-poor professionals", "Exact price"]
                },
                {
                  left: "SOUTHBANK", right: "RIVERSIDE", icon: <Waves className="w-5 h-5" />,
                  title: "Two-Bedroom and Larger High-Rise Properties",
                  body: "Two-bedroom and larger CBD apartments have a meaningfully different scope - multiple bathrooms, distinct living and dining areas, and often a study or home-office that a standard one-bed checklist doesn't account for. Pricing adjusts to your actual room count, not a flat rate applied to all city apartments regardless of size or configuration.",
                  tags: ["2-bed+", "Multiple bathrooms", "Study included", "Room-count pricing"]
                },
                {
                  left: "DOCKLANDS", right: "WATERFRONT", icon: <Anchor className="w-5 h-5" />,
                  title: "Furnished and Serviced Apartments on Short-Stay Arrangements",
                  body: "Furnished and serviced apartments require a higher standard of surface condition between guests - oversights that long-term residents tolerate are immediately visible in a turnover situation. Crisp manages furnished CBD apartment cleans with a defined, repeatable scope on every changeover, so the standard doesn't drift between visits.",
                  tags: ["Furnished apts", "Short-stay", "Turnover standard", "Repeatable scope"]
                }
              ].map((panel, i) => (
                <div key={i} className="relative hover:bg-[#f8fafc] transition-colors duration-200">
                  <div className="flex justify-between items-center px-[28px] py-[20px] border-b border-[#e2e8f0]">
                    <span className="text-[11px] font-[700] text-[#0A1628] tracking-[0.15em] uppercase">{panel.left}</span>
                    <span className="text-[11px] font-[600] text-[#C9A84C] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-[4px] px-[8px] py-[2px]">{panel.right}</span>
                  </div>
                  <div className="p-[28px]">
                    <div className="text-[#3B82F6] mb-[16px]">
                      {panel.icon}
                    </div>
                    <h3 className="text-[17px] font-[700] text-[#0A1628] mb-[10px] leading-snug">{panel.title}</h3>
                    <p className="text-[13px] text-[#6b7280] leading-[1.7]">{panel.body}</p>
                    <div className="mt-[16px] flex flex-wrap gap-[6px]">
                      {panel.tags.map((tag, j) => (
                        <span key={j} className="bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.15)] rounded-full px-[10px] py-[4px] text-[11px] text-[#3B82F6]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — BUILDING ACCESS */}
        <section className="bg-[#050D1A] py-[100px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px] pb-[64px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">Building Access — How We Coordinate It</div>
            <h2 className="text-[36px] font-[700] text-[#ffffff] leading-tight mb-6">Building Access - How We Coordinate It Before Every Clean</h2>
            <p className="text-[16px] text-[rgba(255,255,255,0.45)] leading-[1.8] max-w-[580px]">
              Building access in Melbourne's high-rises is the most common point where professional cleaning services fall short. Requirements vary considerably: some buildings require visitor pre-registration with the concierge, others use fob or swipe lobby access, and some require lift bookings during trade hours. We collect all access details at your initial booking, coordinate with your building ahead of every clean, and ensure your cleaner has everything they need before arriving at reception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] max-w-[1100px] mx-auto px-6 md:px-[48px]">
              <ProcessFlow steps={[
                { num: "01", title: "You Book Online", body: "Your apartment's access requirements are collected at booking - building name, floor, access type." },
                { num: "02", title: "Access Stored", body: "Concierge protocols, fob codes, lift windows, visitor parking - all stored against your property." },
                { num: "03", title: "Building Coordinated", body: "We confirm your building's access procedure ahead of the clean - your cleaner arrives expected." },
                { num: "04", title: "Same Cleaner Arrives", body: "The same cleaner who knows your floor, your building, and your apartment layout arrives on time." },
                { num: "05", title: "Clean Complete", body: "Fixed scope delivered. Same standard, every visit. No re-briefing, no access issues, no surprises." }
              ]} />

            <div>
              {[
                { icon: <UserCheck />, title: "Concierge Sign-In and Visitor Registration", body: "For buildings with a staffed concierge desk, we register as a regular trade visitor under your name during the booking process. Your cleaner signs in at reception on each visit and is expected - removing the delay of an unregistered contractor arriving unannounced at a busy lobby on a weekday morning." },
                { icon: <Key />, title: "Fob, Swipe and Intercom Access Arrangements", body: "For buildings without on-site concierge, we establish a documented access arrangement - key safe codes, lobby fob handover, intercom entry protocols, or building-manager contact. These details are stored against your booking so the same cleaner follows the same process every visit without you resending instructions." },
                { icon: <ArrowUpDown />, title: "Lift Booking Windows and Loading Dock Scheduling", body: "Some Melbourne CBD towers require advance booking of a passenger or goods lift for trade access, or restrict work to certain building hours. We ask about this at your initial booking and schedule your clean within those permitted windows - strata-compliant access every time, without you needing to manage it." }
              ].map((card, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] border-l-[3px] border-l-[#3B82F6] rounded-[16px] p-[28px] mb-[16px] hover:bg-[rgba(255,255,255,0.07)] hover:border-l-[#3B82F6]/60 transition-colors">
                  <div className="text-[#3B82F6] mb-[12px]">{card.icon}</div>
                  <h3 className="text-[17px] font-[700] text-[#ffffff] mb-[8px] leading-snug">{card.title}</h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.45)] leading-[1.7]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — WHAT'S INCLUDED */}
        <section id="included" className="bg-[#F8FAFC] py-[100px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">Scope & Checklist</div>
            <h2 className="text-[36px] font-[700] text-[#0A1628] leading-tight mb-6">What's Included in Every CBD Apartment Clean</h2>
            <p className="text-[16px] text-[#6b7280] leading-[1.8] max-w-[560px]">
              Every CBD apartment clean follows a documented checklist covering all rooms and surfaces within your booking scope. Nothing is left to interpretation on the day - the scope is agreed before the cleaner arrives, which is what makes a fixed, pre-confirmed price possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] max-w-[1100px] mx-auto px-6 md:px-[48px] mt-[64px] items-start">
            <div className="order-2 md:order-1">
              <div className="bg-white border border-[#e2e8f0] rounded-[20px] p-[32px]">
                <FloorPlan activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
              </div>
              <div className="text-[12px] text-[#94a3b8] text-center mt-[16px]">Tap a room to see what's included</div>
            </div>

            <div className="order-1 md:order-2 bg-white border border-[#e2e8f0] rounded-[20px] p-[36px] min-h-[320px] flex flex-col justify-center relative overflow-hidden">
              {!activeRoom ? (
                <div className="flex flex-col items-center justify-center text-center opacity-100 transition-opacity">
                  <Layout className="w-[64px] h-[64px] text-[#e2e8f0] mb-4" />
                  <div className="text-[14px] text-[#9ca3af]">Select a room to see what's included</div>
                </div>
              ) : (
                <div className={`room-content ${activeRoom ? 'active' : ''}`} key={activeRoom}>
                  <div className="bg-[rgba(59,130,246,0.08)] text-[#3B82F6] rounded-full px-[12px] py-[4px] text-[11px] font-[600] inline-block uppercase tracking-wider">{activeRoom}</div>
                  <h3 className="text-[18px] font-[700] text-[#0A1628] mt-[12px] mb-[10px] leading-snug">{roomData[activeRoom].title}</h3>
                  <p className="text-[14px] text-[#6b7280] leading-[1.75] mb-[16px]">{roomData[activeRoom].body}</p>
                  <div className="flex flex-wrap gap-[6px]">
                    {roomData[activeRoom].tags.map((t: string, i: number) => (
                      <span key={i} className="bg-[#fff7ed] text-[#d97706] border border-[#ffedd5] rounded-full px-[10px] py-[4px] text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 6 — WHY CRISP */}
        <section className="bg-[#050D1A] py-[100px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">The Crisp Difference</div>
            <h2 className="text-[36px] font-[700] text-[#ffffff] leading-tight mb-6">Why Melbourne CBD Residents Choose Crisp</h2>
            <p className="text-[16px] text-[rgba(255,255,255,0.45)] leading-[1.8] max-w-[560px]">
              CBD apartment cleaning options are plentiful. What most services lack is operational consistency: the same cleaner who already knows your building, your floor, and your access procedure, showing up reliably. Crisp's model is built around that consistency - supported by fixed pricing and a documented service scope.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[48px]">
              {[
                {
                  stat: "97%", label: "SAME-CLEANER RATE",
                  title: "Same Cleaner Allocated to Your Building and Floor",
                  body: "Your cleaner is matched to your apartment from the first booking and returns on every subsequent visit. By the second clean, they already know your building's sign-in process, your floor, your layout, and any apartment-specific preferences - without you managing that briefing again. Our 97% same-cleaner continuity rate is the operational commitment behind this promise."
                },
                {
                  stat: "Fixed", label: "PRICING ALWAYS",
                  title: "Fixed Pricing for Every Apartment Configuration - No Surprises",
                  body: "CBD apartment cleaning is often quoted hourly by other providers - which creates uncertainty for compact apartments where two hours is either too much or not enough. Crisp's fixed, scope-based pricing gives you a confirmed cost based on your apartment's actual room count, confirmed online before you commit to anything."
                },
                {
                  stat: "Once", label: "ACCESS BRIEFING",
                  title: "No Re-Explaining Your Building's Access to a Different Cleaner Each Time",
                  body: "Access requirements for CBD high-rises aren't trivial - concierge protocols, fob codes, lift booking windows, and visitor parking all need to be communicated afresh whenever the cleaner changes. With the same cleaner every visit, that briefing happens once at your initial booking and never again."
                },
                {
                  stat: "97%", label: "CONTINUITY RATE",
                  title: "97% Same-Cleaner Continuity Rate",
                  body: "Across all recurring Crisp bookings in Melbourne, 97% of clients receive the same cleaner at every scheduled visit. This is an operational metric - backed by how we schedule, how we match cleaners to properties, and how we measure and report on it - not a marketing aspiration."
                }
              ].map((card, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-[36px] relative hover:bg-[rgba(255,255,255,0.06)] hover:border-[#3B82F6]/20 transition-colors group">
                  <div className="absolute top-[20px] right-[20px] flex items-center gap-[6px]">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" style={{ animation: 'pulse-green 2s infinite' }}></div>
                    <span className="text-[9px] text-[rgba(255,255,255,0.25)] tracking-[0.15em]">ACTIVE</span>
                  </div>
                  <div className="text-[40px] font-[900] text-white leading-none mb-[4px]">{card.stat}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-[20px]">{card.label}</div>
                  <h3 className="text-[17px] font-[700] text-white mb-[10px]">{card.title}</h3>
                  <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.7]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — TESTIMONIALS */}
        <section className="bg-[#F8FAFC] py-[80px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">Client Stories</div>
            <h2 className="text-[36px] font-[700] text-[#0A1628] leading-tight mb-6">What Melbourne CBD Residents Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] mt-[48px]">
              {[
                { text: "Honestly felt like a brand new home.", author: "Andre B" },
                { text: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp", author: "Natch L" },
                { text: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S" },
                { text: "One of the best decisions we've made. Coming home to a clean house every week has made life much easier.", author: "Aiden A" },
                { text: "Honestly the best cleaning service we've used. The house looked and smelled amazing when we got home.", author: "Ardi T" },
                { text: "Super impressed. Our place looked like a display home afterwards.", author: "Ben A" }
              ].map((review, i) => (
                <div key={i} className="bg-white border border-[#e2e8f0] rounded-[16px] p-[28px] flex flex-col justify-between h-full hover:border-[#3B82F6]/30 transition-colors">
                  <div>
                    <div className="flex text-[#d97706] mb-3 text-[14px]">★★★★★</div>
                    <div className="text-[14px] text-[#0A1628] italic leading-[1.6] mb-4">"{review.text}"</div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#f1f5f9]">
                    <div className="text-[13px] font-[600] text-[#0A1628]">{review.author}</div>
                    <div className="text-[11px] text-[#6b7280] flex items-center gap-1 font-[500]">
                      <svg className="w-3 h-3 text-[#3B82F6]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/></svg>
                      Google Review
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-[32px] text-[14px] text-[#6b7280]">
              ★★★★★ Rated {googleRatingValue} on Google · {googleReviewCount}+ verified reviews
            </div>
          </div>
        </section>

        {/* SECTION 8 — PRICING */}
        <section className="bg-[#ffffff] py-[80px]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-[48px]">
            <div className="text-[11px] font-[600] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px] text-center">Transparent Pricing</div>
            <h2 className="text-[36px] font-[700] text-[#0A1628] leading-tight mb-6 text-center">Melbourne CBD Apartment Cleaning Prices</h2>
            <p className="text-[16px] text-[#6b7280] text-center mb-[48px]">Fixed pricing based on your apartment's room count. No hourly estimates, no surprise charges.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* STANDARD */}
              <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col hover:shadow-xl transition-all duration-300">
                <h3 className="text-[20px] font-bold text-gray-900 mb-2">Standard</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[14px] text-gray-500 font-medium">From</span>
                  <span className="text-[36px] font-extrabold text-gray-900 tracking-tight">$145</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Up to 3 bed", "All bathrooms", "Eco products included"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                      <span className="text-[15px] text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="block w-full py-4 px-6 bg-[#fff7ed] hover:bg-[#ffedd5] text-[#d97706] text-center font-bold rounded-xl transition-colors">
                  Get an Instant Quote
                </Link>
              </div>

              {/* DEEP */}
              <div className="bg-[#050D1A] rounded-[24px] p-8 flex flex-col relative shadow-2xl transform md:-translate-y-4 featured-card">
                <div>
                  <span className="popular-badge">
                    Most popular in CBD
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-white mb-2">Deep</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[14px] text-white/70 font-medium">From</span>
                  <span className="text-[36px] font-extrabold text-white tracking-tight">$235</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Full apartment scope", "Oven & inside cabinets", "Grout & hard-to-reach areas"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span className="text-[15px] text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="block w-full py-4 px-6 bg-[#d97706] hover:bg-[#b46205] text-white text-center font-bold rounded-xl transition-colors">
                  Get an Instant Quote
                </Link>
              </div>

              {/* VACATE */}
              <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col hover:shadow-xl transition-all duration-300">
                <h3 className="text-[20px] font-bold text-gray-900 mb-2">Vacate</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[14px] text-gray-500 font-medium">From</span>
                  <span className="text-[36px] font-extrabold text-gray-900 tracking-tight">$380</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {["Bond-back standard", "All rooms & surfaces", "Inspection ready"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                      <span className="text-[15px] text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="block w-full py-4 px-6 bg-[#fff7ed] hover:bg-[#ffedd5] text-[#d97706] text-center font-bold rounded-xl transition-colors">
                  Get an Instant Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-[#F8FAFC] py-[80px]">
          <div className="cbd-faq">
            <FAQ data={faqData} title="Frequently Asked Questions" />
          </div>
        </section>

        {/* SECTION 10 — FINAL CTA */}
        <section className="relative bg-[#050D1A] py-[100px] px-8 text-center overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('/noise.png')" }}></div>
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ 
            backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}></div>

          <div className="relative z-10">
            <div className="text-[11px] text-[#3B82F6] tracking-[0.2em] uppercase mb-[12px]">Ready to Book</div>
            <h2 className="text-[48px] font-[800] text-white leading-tight mb-4">Book Your CBD Apartment Clean Online</h2>
            <p className="text-[16px] text-[rgba(255,255,255,0.5)] max-w-[460px] mx-auto mt-[16px] mb-[8px]">
              Book your CBD apartment clean online. Get an exact fixed quote based on your apartment's room count - building access details collected at booking, same cleaner every visit.
            </p>
            <div className="text-[#d97706] font-[600] text-[14px] mb-[32px]">5% off your first clean.</div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking" className="bg-[#d97706] text-white rounded-full px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[#b46205] transition-colors">
                Get an Instant Quote
              </Link>
              <a href="tel:0451423786" className="border border-[rgba(255,255,255,0.15)] text-white rounded-full px-[32px] py-[14px] text-[15px] font-[600] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                Call us: 0451 423 786
              </a>
            </div>

            <div className="w-[40px] h-[1px] bg-[#3B82F6] mx-auto mt-[40px] mb-[28px]"></div>
            
            <div className="text-[11px] text-[rgba(255,255,255,0.2)] tracking-[0.15em] mb-[16px]">NEARBY AREAS WE ALSO SERVICE</div>
            <div className="flex flex-wrap justify-center gap-[8px]">
              { [{ name: 'Southbank', isBuilt: false }, { name: 'Docklands', isBuilt: false }, { name: 'North Melbourne', isBuilt: true }, { name: 'South Yarra', isBuilt: true }, { name: 'Richmond', isBuilt: true }].map(({ name: area, isBuilt }, i) => (
              isBuilt 
                ? <Link key={i} href={`/house-cleaning-${area.toLowerCase().replace(/ /g, '-')}`} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:border-[#3B82F6] hover:text-[#3B82F6] rounded-full px-[16px] py-[6px] text-[12px] transition-colors">
                  {area}
                </Link>
                : <span key={i}  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)]   rounded-full px-[16px] py-[6px] text-[12px] transition-colors">
                  {area}
                </span>
            )) }
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
