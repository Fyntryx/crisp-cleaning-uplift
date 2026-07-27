"use client";

import React, { useState, useEffect } from "react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Star, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ChefHat, 
  Layers, 
  BedDouble,
  Droplets,
  Clock,
  UserCheck
} from "lucide-react";
import Link from "next/link";

const estateData = {
  sanctuary: {
    id: "sanctuary",
    tag: "Sanctuary Lakes · Golf & Lakeside",
    title: "Sanctuary Lakes and Lakeside Estate Properties",
    body: "Sanctuary Lakes sits in Point Cook's northern section and has a distinctly different residential character - a golfing and lakeside community with larger executive homes, more formal interior layouts, and properties that often include additional formal rooms and generous outdoor-transition areas. Pricing at Sanctuary Lakes accounts for the increased scope of these larger homes, not the same rate as a standard four-bedroom estate home further south.",
    features: ["Executive homes", "Formal rooms", "Golf community", "Larger scope"],
    markerPos: { x: 120, y: 90 }
  },
  saltwater: {
    id: "saltwater",
    tag: "Saltwater Coast · Southern Estate",
    title: "Saltwater Coast, The Circuit and Boardwalk Estate Homes",
    body: "The southern estates - Saltwater Coast, The Circuit, and Boardwalk - contain newer development with a predominantly young-family demographic and modern home layouts: open-plan living areas, alfresco access, larger kitchen footprints, and master suites with ensuites that make the bathroom count higher than the bedroom count alone would suggest. Pricing reflects each home's actual configuration.",
    features: ["Young families", "Open-plan living", "Alfresco access", "Modern layouts"],
    markerPos: { x: 110, y: 245 }
  },
  circuit: {
    id: "circuit",
    tag: "The Circuit · Family Precinct",
    title: "Family Homes Across Point Cook's Major Estate Precincts",
    body: "Point Cook's residential core is predominantly the four and five-bedroom family home on a 400-600sqm block - the defining housing format of Melbourne's western growth corridor. Similar layouts repeat across The Circuit, Boardwalk, and Saltwater Coast, which makes fixed, room-count pricing particularly efficient here: the same scope applies to comparable homes across estates, with pricing reflecting each property's actual room count.",
    features: ["4-5 bedroom homes", "400-600sqm blocks", "Fixed pricing", "Room-count accurate"],
    markerPos: { x: 290, y: 215 }
  },
  boardwalk: {
    id: "boardwalk",
    tag: "Boardwalk · New Development",
    title: "Saltwater Coast, The Circuit and Boardwalk Estate Homes",
    body: "The southern estates - Saltwater Coast, The Circuit, and Boardwalk - contain newer development with a predominantly young-family demographic and modern home layouts: open-plan living areas, alfresco access, larger kitchen footprints, and master suites with ensuites that make the bathroom count higher than the bedroom count alone would suggest. Pricing reflects each home's actual configuration.",
    features: ["Young families", "Open-plan living", "Alfresco access", "Modern layouts"],
    markerPos: { x: 290, y: 335 }
  },
  lakeside: {
    id: "lakeside",
    tag: "Lakeside · Residential Core",
    title: "Family Homes Across Point Cook's Major Estate Precincts",
    body: "Point Cook's residential core is predominantly the four and five-bedroom family home on a 400-600sqm block - the defining housing format of Melbourne's western growth corridor. Similar layouts repeat across The Circuit, Boardwalk, and Saltwater Coast, which makes fixed, room-count pricing particularly efficient here: the same scope applies to comparable homes across estates, with pricing reflecting each property's actual room count.",
    features: ["4-5 bedroom homes", "400-600sqm blocks", "Fixed pricing", "Room-count accurate"],
    markerPos: { x: 110, y: 405 }
  }
};

const faqData = [
  { question: "Do you service all Point Cook estates including Sanctuary Lakes?", answer: "Yes - we service all Point Cook estates including Sanctuary Lakes, Saltwater Coast, The Circuit, Boardwalk, and all residential precincts across the suburb." },
  { question: "How much does house cleaning cost in Point Cook?", answer: "Pricing is based on your home's room count. A four-bedroom family home is priced differently to a five-bedroom Sanctuary Lakes property. Get an exact quote online in under a minute." },
  { question: "Which estate are you in? Why this matters for your booking.", answer: "Advising your estate when you book helps us match the right cleaner - one already familiar with your precinct. It doesn't change your pricing, which is set by room count, not location within the suburb." },
  { question: "Can I book a regular weekly or fortnightly clean in Point Cook?", answer: "Yes - select your frequency when you book. Weekly and fortnightly bookings attract loyalty rewards from the second month, reducing the ongoing cost significantly over time." },
  { question: "Do you bring your own cleaning products?", answer: "Yes - all eco-friendly cleaning products are included in the price. Nothing is required from you." },
  { question: "Is there a minimum booking requirement in Point Cook?", answer: "No minimum recurring commitment is required. Fortnightly or weekly bookings include loyalty pricing that doesn't apply to one-off cleans, but there's no lock-in period." }
];

export default function PointCookClient({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {
  const [activeEstate, setActiveEstate] = useState<string>("sanctuary");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const estate = estateData[activeEstate as keyof typeof estateData];

  return (
    <main className="min-h-screen font-sans bg-white selection:bg-[#16A34A]/20 selection:text-[#16A34A] overflow-x-hidden">

      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[92vh] bg-[#111111] overflow-hidden flex items-center pt-24 pb-[120px]">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />
        
        {/* Estate Watermark */}
        <div className="absolute -right-[60px] top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-[11px] font-bold text-white/5 tracking-[0.3em] uppercase pointer-events-none z-0 hidden lg:block">
          SANCTUARY LAKES · SALTWATER COAST · THE CIRCUIT · BOARDWALK · LAKESIDE
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1200px] mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column */}
            <div className="flex flex-col items-start w-full">
              
              <div className="text-[12px] text-white/30 mb-7 font-medium tracking-wide">
                <Link href="/" className="hover:text-white/60 transition-colors">Home</Link> › House Cleaning Point Cook
              </div>
              
              <div className="bg-[#d97706]/15 border border-[#d97706]/30 text-[#d97706] text-[11px] font-semibold tracking-[0.12em] rounded-full px-4 py-1.5 mb-6 inline-block uppercase">
                ● Point Cook · Melbourne's West · All Estates
              </div>

              <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-5">
                <span className="block overflow-hidden pb-2 -mb-2">
                  <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="block">House Cleaning</motion.span>
                </span>
                <span className="block overflow-hidden pb-2 -mb-2">
                  <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="block text-[#d97706]">Point Cook</motion.span>
                </span>
                <span className="block overflow-hidden pb-2 -mb-2">
                  <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }} className="block">Melbourne</motion.span>
                </span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-[15px] text-white/55 leading-[1.8] max-w-[460px] font-medium"
              >
                Point Cook is Australia's most populous suburb by resident count - a fact that reflects both its scale and the pace of its growth since the early 2000s. That scale means significant complexity for a cleaning service: the suburb spans multiple distinct estate precincts, from the lakeside Sanctuary Lakes golf and residential community in the north to the Saltwater Coast, The Circuit, and Boardwalk estates further south. Different estates have different housing profiles, build years, and layouts. A cleaning service that works across all of Point Cook needs to price by individual home, not apply a suburb-wide rate across one of Australia's most geographically diverse residential areas.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {[`${googleRatingValue} ★ Google`, '97% Same Cleaner', 'Eco-Friendly', '72hr Guarantee'].map((pill, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-[12px] text-white/60 font-medium whitespace-nowrap">
                    {pill}
                  </span>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link href="/booking" className="w-full sm:w-auto text-center bg-[#d97706] hover:bg-[#d97706]/90 text-white rounded-full px-7 py-3.5 font-semibold text-[15px] transition-colors shadow-lg shadow-[#d97706]/20">
                  Get an Instant Quote
                </Link>
                <Link href="#scope" className="w-full sm:w-auto text-center bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full px-7 py-3.5 font-semibold text-[15px] transition-colors">
                  See what's included
                </Link>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[12px] text-white/30 mt-3 ml-2 font-medium">
                5% off your first clean.
              </motion.p>

            </div>

            {/* Right Column - Estate Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="hidden lg:flex flex-col bg-white/5 border border-white/10 rounded-[20px] p-8 w-full max-w-[480px] ml-auto relative z-10"
            >
              <h4 className="text-[10px] font-bold text-white/30 tracking-[0.25em] uppercase mb-6">
                ALL ESTATES SERVICED
              </h4>
              
              <div className="flex flex-col">
                {[
                  { name: "Sanctuary Lakes", desc: "Golf & Lakeside" },
                  { name: "Saltwater Coast", desc: "Southern Estate" },
                  { name: "The Circuit", desc: "Family Precinct" },
                  { name: "Boardwalk", desc: "New Development" },
                  { name: "Lakeside", desc: "Residential Core" }
                ].map((est, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                      <span className="text-[15px] font-semibold text-white">{est.name}</span>
                    </div>
                    <span className="text-[11px] text-white/35 italic font-medium">{est.desc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/5">
                <span className="text-[11px] text-white/25 tracking-[0.1em] font-medium">
                  Australia's most populous suburb
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden rotate-180 z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* SECTION 2 - PROOF STRIP */}
      <section className="bg-white py-7 border-b border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x-0 md:divide-x md:divide-[#e5e7eb]">
            {[
              { num: `${googleRatingValue}`, unit: "★ Google" },
              { num: "97%", unit: "Same Cleaner" },
              { num: "100%", unit: "Eco-Friendly" },
              { num: "72hr", unit: "Guarantee" }
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center justify-center text-center ${i % 2 !== 0 ? 'border-l border-[#e5e7eb] md:border-0' : ''}`}>
                <div className="flex items-baseline gap-1">
                  <span className="text-[24px] md:text-[28px] font-extrabold text-[#d97706] leading-none tracking-tight">{stat.num}</span>
                </div>
                <span className="text-[11px] md:text-[12px] text-gray-500 font-semibold uppercase tracking-wider mt-1.5">{stat.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - ESTATES (Interactive) */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-6">
          
          <div className="max-w-[680px] mx-auto text-center mb-12">
            <span className="text-[#16A34A] font-bold text-[11px] uppercase tracking-[0.15em] mb-4 block">Point Cook's Estate Precincts</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Cleaning Point Cook's Estates - Sanctuary Lakes to Saltwater Coast
            </h2>
            <p className="text-[16px] text-gray-500 leading-[1.8] max-w-[660px] mx-auto font-medium">
              Point Cook's estate structure means that a cleaner who services the suburb regularly learns the differences between precincts - Sanctuary Lakes' larger executive homes around the golf course, the Saltwater Coast and Boardwalk estates' family homes on the suburb's southern edge, and the transition streets between them. Crisp assigns the same cleaner to your property from the first booking so that geographic and property-specific familiarity compounds over time.
            </p>
          </div>

          <div className="max-w-[1100px] mx-auto mt-12">
            
            {/* Mobile Tabs */}
            <div className="flex md:hidden flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'sanctuary', label: 'Sanctuary Lakes' },
                { id: 'saltwater', label: 'Saltwater + Circuit' },
                { id: 'boardwalk', label: 'Boardwalk' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveEstate(tab.id)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors border ${activeEstate === tab.id || (tab.id === 'saltwater' && activeEstate === 'circuit') ? 'bg-[#fff7ed] border-[#fed7aa] text-[#92400e]' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-start">
              
              {/* Left: SVG Map (Hidden on mobile) */}
              <div className="hidden md:block bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-6 w-full">
                <div className="w-full relative">
                  <svg viewBox="0 0 500 480" className="w-full h-auto drop-shadow-sm group/map" role="img">
                    <title>Point Cook estate map. Select an estate to see property details.</title>
                    <style>{`
                      .estate-cluster {
                        transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
                        transform-origin: center bottom;
                        opacity: 0.6;
                        cursor: pointer;
                      }
                      .estate-cluster.active {
                        transform: translateY(-8px);
                        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));
                        opacity: 1;
                      }
                      .estate-cluster:hover:not(.active) {
                        opacity: 0.85;
                      }
                      .estate-cluster:hover polygon {
                        filter: brightness(1.05);
                      }
                      .estate-cluster.active polygon:first-child {
                        filter: brightness(1.15);
                      }
                      .crisp-pin {
                        opacity: 0;
                        pointer-events: none;
                      }
                      .estate-cluster.active .crisp-pin {
                        opacity: 1;
                        animation: pinDrop 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
                      }
                      @keyframes pinDrop {
                        from { transform: translateY(-20px); opacity: 0; }
                        to   { transform: translateY(0); opacity: 1; }
                      }
                      @media (prefers-reduced-motion: reduce) {
                        .estate-cluster.active {
                          transform: none;
                        }
                        .estate-cluster.active .crisp-pin {
                          animation: none;
                        }
                      }
                    `}</style>

                    {/* BACKGROUND - ground plane */}
                    <polygon points="250,40 460,240 250,440 40,240" fill="#F8F9FA" stroke="#E2E8F0" strokeWidth="1" />
                    
                    {/* LAKE (Sanctuary Lakes area) */}
                    <ellipse cx="320" cy="150" rx="60" ry="30" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
                    <path d="M 290 145 Q 310 135 330 145" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
                    <path d="M 300 155 Q 320 145 340 155" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
                    <path d="M 310 165 Q 330 155 350 165" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />

                    {/* ROADS - isometric flat paths */}
                    <line x1="145" y1="140" x2="355" y2="340" stroke="#E2E8F0" strokeWidth="2" />
                    <line x1="145" y1="340" x2="355" y2="140" stroke="#E2E8F0" strokeWidth="2" />
                    <line x1="250" y1="40" x2="250" y2="440" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="40" y1="240" x2="460" y2="240" stroke="#E2E8F0" strokeWidth="1" />

                    {/* TREES */}
                    {[
                      {x: 180, y: 160}, {x: 220, y: 120}, {x: 350, y: 220}, {x: 310, y: 280},
                      {x: 280, y: 360}, {x: 150, y: 300}, {x: 120, y: 240}, {x: 200, y: 280}
                    ].map((t, i) => (
                      <g key={`tree-${i}`}>
                        <polygon points={`${t.x},${t.y} ${t.x+8},${t.y-12} ${t.x+16},${t.y}`} fill="#16A34A" />
                        <rect x={t.x+6} y={t.y} width="4" height="8" fill="#15803D" />
                      </g>
                    ))}

                    {/* SANCTUARY LAKES */}
                    <g 
                      className={`estate-cluster ${activeEstate === 'sanctuary' ? 'active' : ''}`}
                      onClick={() => setActiveEstate('sanctuary')}
                      aria-label="Sanctuary Lakes"
                    >
                      {/* House 1 */}
                      <g transform="translate(240, 60)">
                        <polygon points="0,20 30,5 60,20 30,35" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5"/>
                        <polygon points="0,20 30,35 30,65 0,50" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.5"/>
                        <polygon points="30,35 60,20 60,50 30,65" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
                        <rect x="48" y="12" width="6" height="10" fill="#D97706"/>
                      </g>
                      {/* House 2 */}
                      <g transform="translate(280, 80)">
                        <polygon points="0,20 30,5 60,20 30,35" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5"/>
                        <polygon points="0,20 30,35 30,65 0,50" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.5"/>
                        <polygon points="30,35 60,20 60,50 30,65" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
                      </g>
                      {/* House 3 */}
                      <g transform="translate(260, 110)">
                        <polygon points="0,20 30,5 60,20 30,35" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.5"/>
                        <polygon points="0,20 30,35 30,65 0,50" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.5"/>
                        <polygon points="30,35 60,20 60,50 30,65" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
                      </g>
                      <text x="290" y="180" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="800" letterSpacing="0.1em">SANCTUARY LAKES</text>
                      
                      {/* Crisp Pin */}
                      <g className="crisp-pin" transform="translate(290, 80)">
                        <circle cx="0" cy="-20" r="10" fill="#d97706"/>
                        <polygon points="-5,-14 5,-14 0,-4" fill="#d97706"/>
                        <circle cx="0" cy="-20" r="4" fill="white"/>
                      </g>
                    </g>

                    {/* SALTWATER COAST */}
                    <g 
                      className={`estate-cluster ${activeEstate === 'saltwater' ? 'active' : ''}`}
                      onClick={() => setActiveEstate('saltwater')}
                      aria-label="Saltwater Coast"
                    >
                      {/* House 1 */}
                      <g transform="translate(100, 200)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#93C5FD" stroke="#60A5FA" strokeWidth="0.5"/>
                      </g>
                      {/* House 2 */}
                      <g transform="translate(130, 220)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#93C5FD" stroke="#60A5FA" strokeWidth="0.5"/>
                      </g>
                      {/* House 3 */}
                      <g transform="translate(100, 240)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#93C5FD" stroke="#60A5FA" strokeWidth="0.5"/>
                      </g>
                      <text x="140" y="300" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontWeight="800" letterSpacing="0.1em">SALTWATER COAST</text>

                      {/* Crisp Pin */}
                      <g className="crisp-pin" transform="translate(140, 210)">
                        <circle cx="0" cy="-20" r="10" fill="#d97706"/>
                        <polygon points="-5,-14 5,-14 0,-4" fill="#d97706"/>
                        <circle cx="0" cy="-20" r="4" fill="white"/>
                      </g>
                    </g>

                    {/* THE CIRCUIT */}
                    <g 
                      className={`estate-cluster ${activeEstate === 'circuit' ? 'active' : ''}`}
                      onClick={() => setActiveEstate('circuit')}
                      aria-label="The Circuit"
                    >
                      {/* House 1 */}
                      <g transform="translate(200, 160)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#FED7AA" stroke="#FB923C" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#FB923C" stroke="#F97316" strokeWidth="0.5"/>
                      </g>
                      {/* House 2 */}
                      <g transform="translate(230, 180)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#FED7AA" stroke="#FB923C" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#FB923C" stroke="#F97316" strokeWidth="0.5"/>
                      </g>
                      {/* House 3 */}
                      <g transform="translate(190, 200)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#FED7AA" stroke="#FB923C" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#FB923C" stroke="#F97316" strokeWidth="0.5"/>
                      </g>
                      <text x="235" y="250" textAnchor="middle" fontSize="9" fill="#9A3412" fontWeight="800" letterSpacing="0.1em">THE CIRCUIT</text>

                      {/* Crisp Pin */}
                      <g className="crisp-pin" transform="translate(235, 170)">
                        <circle cx="0" cy="-20" r="10" fill="#d97706"/>
                        <polygon points="-5,-14 5,-14 0,-4" fill="#d97706"/>
                        <circle cx="0" cy="-20" r="4" fill="white"/>
                      </g>
                    </g>

                    {/* BOARDWALK */}
                    <g 
                      className={`estate-cluster ${activeEstate === 'boardwalk' ? 'active' : ''}`}
                      onClick={() => setActiveEstate('boardwalk')}
                      aria-label="Boardwalk"
                    >
                      {/* House 1 */}
                      <g transform="translate(280, 240)">
                        <polygon points="0,18 28,2 56,18 28,34" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,18 28,34 28,60 0,44" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
                        <polygon points="28,34 56,18 56,44 28,60" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                      </g>
                      {/* House 2 */}
                      <g transform="translate(320, 260)">
                        <polygon points="0,18 28,2 56,18 28,34" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,18 28,34 28,60 0,44" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
                        <polygon points="28,34 56,18 56,44 28,60" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                      </g>
                      {/* House 3 */}
                      <g transform="translate(280, 280)">
                        <polygon points="0,18 28,2 56,18 28,34" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,18 28,34 28,60 0,44" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.5"/>
                        <polygon points="28,34 56,18 56,44 28,60" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                      </g>
                      <text x="325" y="345" textAnchor="middle" fontSize="9" fill="#334155" fontWeight="800" letterSpacing="0.1em">BOARDWALK</text>

                      {/* Crisp Pin */}
                      <g className="crisp-pin" transform="translate(325, 250)">
                        <circle cx="0" cy="-20" r="10" fill="#d97706"/>
                        <polygon points="-5,-14 5,-14 0,-4" fill="#d97706"/>
                        <circle cx="0" cy="-20" r="4" fill="white"/>
                      </g>
                    </g>

                    {/* LAKESIDE */}
                    <g 
                      className={`estate-cluster ${activeEstate === 'lakeside' ? 'active' : ''}`}
                      onClick={() => setActiveEstate('lakeside')}
                      aria-label="Lakeside"
                    >
                      {/* House 1 */}
                      <g transform="translate(130, 310)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#94A3B8" stroke="#64748B" strokeWidth="0.5"/>
                      </g>
                      {/* House 2 */}
                      <g transform="translate(160, 330)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#94A3B8" stroke="#64748B" strokeWidth="0.5"/>
                      </g>
                      {/* House 3 */}
                      <g transform="translate(110, 350)">
                        <polygon points="0,15 25,2 50,15 25,28" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5"/>
                        <polygon points="0,15 25,28 25,50 0,37" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5"/>
                        <polygon points="25,28 50,15 50,37 25,50" fill="#94A3B8" stroke="#64748B" strokeWidth="0.5"/>
                      </g>
                      <text x="160" y="415" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="800" letterSpacing="0.1em">LAKESIDE</text>

                      {/* Crisp Pin */}
                      <g className="crisp-pin" transform="translate(160, 320)">
                        <circle cx="0" cy="-20" r="10" fill="#d97706"/>
                        <polygon points="-5,-14 5,-14 0,-4" fill="#d97706"/>
                        <circle cx="0" cy="-20" r="4" fill="white"/>
                      </g>
                    </g>

                    {/* COMPASS ROSE - Bottom Right */}
                    <g transform="translate(440, 430)">
                      <polygon points="0,-12 -4,0 0,2 4,0" fill="#94A3B8"/>
                      <polygon points="0,-12 4,0 0,2" fill="#64748B"/>
                      <text x="0" y="-16" textAnchor="middle" fontSize="8" fill="#94A3B8" fontWeight="700">N</text>
                      <text x="0" y="12" textAnchor="middle" fontSize="8" fill="#94A3B8" fontWeight="700">S</text>
                      <text x="12" y="3" textAnchor="middle" fontSize="8" fill="#94A3B8" fontWeight="700">E</text>
                      <text x="-12" y="3" textAnchor="middle" fontSize="8" fill="#94A3B8" fontWeight="700">W</text>
                    </g>

                    {/* CRISP BRANDING - Bottom Left */}
                    <text x="50" y="440" fontSize="7" fill="#CBD5E1" letterSpacing="0.1em" fontWeight="600">
                      POINT COOK · ALL ESTATES
                    </text>

                  </svg>
                </div>
                <div className="text-[11px] text-[#9ca3af] text-center mt-3 font-medium">Tap an estate to explore</div>
              </div>

              {/* Right: Content Panel */}
              <div className="bg-white border border-gray-200 rounded-[20px] p-8 md:p-10 min-h-[360px] md:min-h-[400px] shadow-sm flex flex-col items-start relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEstate}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col w-full h-full"
                  >
                    <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-full px-3 py-1 text-[11px] font-bold inline-flex mb-4 w-fit">
                      {estate.tag}
                    </div>
                    
                    <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-3 leading-[1.3] tracking-tight">
                      {estate.title}
                    </h3>
                    
                    <p className="text-[14px] md:text-[15px] text-gray-500 leading-[1.75] mb-8 font-medium">
                      {estate.body}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {estate.features.map((feat, i) => (
                        <span key={i} className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-3 py-1 text-[11px] text-[#92400e] font-semibold whitespace-nowrap">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 - WHAT'S INCLUDED */}
      <section id="scope" className="bg-[#fafafa] py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-[1100px]">
          
          <div className="text-center md:text-left mb-16 border-b border-[#e5e7eb] pb-12">
            <span className="text-[#d97706] font-bold text-[11px] uppercase tracking-[0.15em] mb-4 block">Scope & Checklist</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              What Every Point Cook Clean Includes
            </h2>
            <p className="text-[16px] text-gray-600 leading-[1.8] max-w-[580px] font-medium mx-auto md:mx-0">
              Every Point Cook clean follows a fixed, documented scope applied on every visit by the same cleaner - producing a standard that's consistent across your home's size and estate location, visit after visit.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {/* Row 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-12 border-b border-[#e5e7eb]">
              <div className="order-2 md:order-1 bg-white border border-[#e5e7eb] rounded-[20px] p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <ChefHat className="w-16 h-16 text-[#d97706] mb-6 stroke-[1.5]" />
                <span className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 text-[12px] text-[#92400e] font-bold">3 bathrooms covered</span>
              </div>
              <div className="order-1 md:order-2 flex flex-col">
                <span className="text-[#d97706] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">Every Visit</span>
                <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">Kitchen and Bathroom Sanitisation</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75] font-medium mb-6">
                  Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned on every visit. All bathrooms in scope - ensuite, main bathroom, and powder room - are sanitised, scrubbed, and polished throughout. Point Cook's modern homes commonly have three bathrooms across a four-bedroom layout; all are included in the standard scope.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Ensuite included", "Powder room", "3 bathrooms standard", "Modern kitchens"].map(t => <span key={t} className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-2.5 py-1 text-[11px] text-[#92400e] font-semibold">{t}</span>)}
                </div>
              </div>
            </motion.div>

            {/* Row 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-12 border-b border-[#e5e7eb]">
              <div className="flex flex-col">
                <span className="text-[#d97706] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">Every Room</span>
                <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">Vacuuming, Mopping and Floor Care Throughout</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75] font-medium mb-6">
                  All carpeted areas are vacuumed including under accessible furniture. Tile and hard floors are swept and mopped. Point Cook's newer homes typically have a mix of carpet in bedrooms and large-format tile through open-plan living areas; the scope covers both floor types without differentiation within the one standard clean.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Carpet vacuumed", "Large-format tile", "Under furniture", "Open-plan covered"].map(t => <span key={t} className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-2.5 py-1 text-[11px] text-[#92400e] font-semibold">{t}</span>)}
                </div>
              </div>
              <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <Layers className="w-16 h-16 text-[#d97706] mb-6 stroke-[1.5]" />
                <span className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 text-[12px] text-[#92400e] font-bold">All floor types</span>
              </div>
            </motion.div>

            {/* Row 3 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-12 border-b border-[#e5e7eb]">
              <div className="order-2 md:order-1 bg-white border border-[#e5e7eb] rounded-[20px] p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <BedDouble className="w-16 h-16 text-[#d97706] mb-6 stroke-[1.5]" />
                <span className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-4 py-1.5 text-[12px] text-[#92400e] font-bold">Studies included</span>
              </div>
              <div className="order-1 md:order-2 flex flex-col">
                <span className="text-[#d97706] text-[11px] font-bold tracking-[0.15em] uppercase mb-2">Full Scope</span>
                <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">Bedrooms, Living Areas and Laundry</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75] font-medium mb-6">
                  Every bedroom in scope is vacuumed, surfaces dusted, and the room presented to a consistent standard. Living, dining, and family rooms receive the same treatment. The laundry is included as standard. Studies and home offices - common in Point Cook's larger family homes - are included within the confirmed scope at booking.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["All bedrooms", "Family rooms", "Laundry included", "Home offices"].map(t => <span key={t} className="bg-[#fff7ed] border border-[#fed7aa] rounded-full px-2.5 py-1 text-[11px] text-[#92400e] font-semibold">{t}</span>)}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 5 - WHY CRISP */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-[1100px]">
          
          <div className="mb-12">
            <span className="text-[#d97706] font-bold text-[11px] uppercase tracking-[0.15em] mb-4 block">The Crisp Difference</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Why Point Cook Families Choose Crisp
            </h2>
            <p className="text-[16px] text-gray-500 leading-[1.8] max-w-[560px] font-medium">
              Point Cook's demographic is predominantly dual-income families with school-age children - the household type that benefits most from reliable, recurring home cleaning and suffers most from inconsistent, rotating services that require re-briefing. Crisp's model is built for exactly this.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            
            {/* Banner 1 */}
            <div className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-center p-8 md:p-10 bg-[#1B4332] rounded-[16px] hover:translate-x-1 transition-transform duration-200">
              <div className="flex flex-col text-white">
                <span className="text-[48px] md:text-[56px] font-black leading-none tracking-tight">97%</span>
                <span className="text-[10px] text-white/40 tracking-[0.2em] font-bold mt-2">SAME CLEANER</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] md:text-[20px] font-bold text-white mb-2">Consistent Cleaning Across One of Melbourne's Largest Suburbs</h3>
                <p className="text-[13px] md:text-[14px] text-white/60 leading-[1.7] font-medium max-w-[700px]">
                  Servicing Point Cook effectively requires a cleaner who knows the suburb's estate geography and knows your property specifically. The same cleaner assigned at booking builds that familiarity over time - which matters meaningfully in a suburb where estates and street layouts don't follow inner-city patterns. Your cleaner is assigned from the first booking and returns on your schedule. Access arrangements, your home's layout, rooms in scope, and any household preferences are recorded at booking and referenced on every subsequent visit.
                </p>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-center p-8 md:p-10 bg-[#fff7ed] border border-[#fed7aa] rounded-[16px] hover:translate-x-1 transition-transform duration-200 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[42px] md:text-[48px] font-black leading-none tracking-tight text-[#d97706]">Fixed</span>
                <span className="text-[10px] text-[#d97706] tracking-[0.2em] font-bold mt-2">PRICING</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">Fixed, Scope-Based Pricing for Every Estate Type and Home Configuration</h3>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-[1.7] font-medium max-w-[700px]">
                  A four-bedroom home in The Circuit and a five-bedroom home at Sanctuary Lakes are priced differently because they have different scopes - as they should be. Pricing is set by your actual room count and home configuration, not a single Point Cook rate applied regardless of what the property requires.
                </p>
              </div>
            </div>

            {/* Banner 3 */}
            <div className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-center p-8 md:p-10 bg-white border border-gray-200 rounded-[16px] hover:translate-x-1 transition-transform duration-200 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[42px] md:text-[48px] font-black leading-none tracking-tight text-[#d97706]">100%</span>
                <span className="text-[10px] text-[#d97706]/70 tracking-[0.2em] font-bold mt-2 uppercase">Eco-Friendly</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">Safe For Your Family and Pets</h3>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-[1.7] font-medium max-w-[700px]">
                  We use premium eco-friendly, non-toxic products that are tough on dirt but safe for your family and pets. You don't need to supply anything - our cleaners arrive fully equipped with all necessary supplies and high-filtration vacuums.
                </p>
              </div>
            </div>

            {/* Banner 4 */}
            <div className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-center p-8 md:p-10 bg-[#FFF7ED] border border-[#FED7AA] rounded-[16px] hover:translate-x-1 transition-transform duration-200 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[42px] md:text-[48px] font-black leading-none tracking-tight text-[#d97706]">5%</span>
                <span className="text-[10px] text-[#d97706]/70 tracking-[0.2em] font-bold mt-2 uppercase">FIRST CLEAN</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">Weekly and Fortnightly Loyalty Discounts for Busy Families</h3>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-[1.7] font-medium max-w-[700px]">
                  Recurring weekly and fortnightly bookings accumulate loyalty rewards from the second month onward. For Point Cook's dual-income families managing busy household schedules, the combination of a reliable recurring clean and compounding loyalty savings makes the ongoing service cost meaningfully lower than the initial first-clean price.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 - TESTIMONIALS & BEFORE/AFTER */}
      <Testimonials googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} 
        topTitle="Client Stories"
        title="What Point Cook Families Say"
        subtitle="Real results and experiences from Point Cook homes."
        reviews={[
          { text: "We live in Sanctuary Lakes and have struggled to find a service that properly manages a larger home without charging an absolute fortune. Crisp has been fantastic. Same cleaner every fortnight, they know the house perfectly now, and the standard hasn't dropped since day one.", author: "Sarah M. — Sanctuary Lakes" },
          { text: "Finally a service that just works. We're in Saltwater Coast with two young kids and a dog. The eco-friendly products are a huge plus for us, and the fact that we get the same cleaner every week means we don't have to explain the dog's routine or the alarm system anymore.", author: "James T. — Saltwater Coast" },
          { text: "Honestly felt like a brand new home. Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.", author: "Kaan S. — Point Cook" }
        ]}
      />

      {/* SECTION 7 - PRICING */}
      <section className="bg-white py-20 lg:py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-[1100px] text-center mb-16">
          <span className="text-[#16A34A] font-bold text-[11px] uppercase tracking-[0.15em] mb-4 block">Transparent Pricing</span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-gray-900 tracking-tight mb-4">
            Point Cook House Cleaning Prices
          </h2>
          <p className="text-[15px] text-gray-500 max-w-[500px] mx-auto font-medium">
            Fixed pricing based on your room count. No hourly estimates, no surprise charges.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            
            {/* Standard */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col hover:border-gray-300 transition-colors">
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">Standard</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[14px] text-gray-500 font-medium">From</span>
                <span className="text-[36px] font-black tracking-tight text-gray-900">$145</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow text-[14px] text-gray-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Up to 3 bed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> All bathrooms</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Eco products included</li>
              </ul>
              <Link href="/booking" className="w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-full py-3.5 font-bold text-[14px] transition-colors">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Deep (Featured) */}
            <div className="bg-white border-2 border-[#16A34A] rounded-[24px] p-8 flex flex-col relative shadow-xl shadow-[#16A34A]/5 md:-mt-4 md:mb-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap uppercase tracking-wider">
                Most popular in Point Cook
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">Deep</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[14px] text-gray-500 font-medium">From</span>
                <span className="text-[36px] font-black tracking-tight text-gray-900">$235</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow text-[14px] text-gray-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Full property scope</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Oven & inside cabinets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Grout & hard-to-reach areas</li>
              </ul>
              <Link href="/booking" className="w-full text-center bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full py-3.5 font-bold text-[14px] transition-colors shadow-lg shadow-[#16A34A]/20">
                Get an Instant Quote →
              </Link>
            </div>

            {/* Vacate */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 flex flex-col hover:border-gray-300 transition-colors">
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">Vacate</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[14px] text-gray-500 font-medium">From</span>
                <span className="text-[36px] font-black tracking-tight text-gray-900">$380</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-grow text-[14px] text-gray-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Bond-back standard</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> All rooms & surfaces</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Inspection ready</li>
              </ul>
              <Link href="/booking" className="w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-full py-3.5 font-bold text-[14px] transition-colors">
                Get an Instant Quote →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 - FAQ */}
      <section className="bg-[#fafafa] py-20 lg:py-24 border-t border-[#e5e7eb]">
        <div className="container mx-auto px-6 max-w-[800px]">
          <FAQ title="Frequently Asked Questions" data={faqData} customTheme="default" />
        </div>
      </section>

      {/* SECTION 9 - FINAL CTA */}
      <section className="relative bg-[#1B4332] py-20 lg:py-24 text-center overflow-hidden border-t-4 border-[#d97706]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-[11px] text-white/40 tracking-[0.2em] font-bold uppercase block mb-4">Ready to Book</span>
          <h2 className="text-[36px] md:text-[48px] font-extrabold text-white tracking-tight mb-4 leading-tight">
            Book a Cleaner in <span className="text-[#d97706]">Point Cook</span>
          </h2>
          <p className="text-[15px] md:text-[16px] text-white/60 max-w-[460px] mx-auto mb-3 font-medium leading-[1.7]">
            Get an instant fixed quote for your Point Cook home - any estate, any size. Book online in under a minute, same cleaner every visit.
          </p>
          <p className="text-[15px] text-[#d97706] font-bold mb-10">
            5% off your first clean.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/booking" className="w-full sm:w-auto px-8 py-4 bg-[#d97706] hover:bg-[#d97706]/90 text-white font-bold text-[15px] rounded-full transition-colors shadow-lg shadow-[#d97706]/20">
              Get an Instant Quote
            </Link>
            <a href="tel:0451423786" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold text-[15px] rounded-full transition-colors">
              Call us: 0451 423 786
            </a>
          </div>

          <div className="w-[40px] h-[1px] bg-white/20 mx-auto mt-12 mb-8" />

          <div className="flex flex-wrap justify-center gap-2 max-w-[600px] mx-auto">
            {['Werribee', 'Caroline Springs', 'Altona North', 'Hoppers Crossing', 'Williams Landing'].map((area, i) => (
              <span key={i} className="text-[12px] text-white/60 bg-white/5 border border-white/10 hover:border-[#d97706] hover:text-[#d97706] px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
