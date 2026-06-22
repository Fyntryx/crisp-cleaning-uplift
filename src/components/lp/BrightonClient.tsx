"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Leaf,
  Sparkles,
  UserCheck,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Bath,
  Layers,
  TreePine,
  Star,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import FAQ from "@/components/lp/FAQ";
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
const heroStats = [
  { value: "97%", label: "Same-cleaner, every visit" },
  { value: "100%", label: "Eco-friendly no heritage surfaces" },
  { value: "72hr", label: "Re-clean guarantee, every clean" },
];

const metricStrip = [
  { value: "4.9 ★", label: "Average rating of homes" },
  { value: "850+", label: "Homes completed" },
  { value: "3.2yr", label: "Average tenure Brighton" },
  { value: "Fixed", label: "Pricing — no hourly estimates" },
];

const heritageCards = [
  {
    icon: Home,
    tag: "GOLDEN MILE · BAYSIDE",
    title: "Victorian & Edwardian properties",
    body: "The streets closest to the bay between Brighton Beach and Middle Brighton station are among Melbourne's most tightly held — heritage homes with polished timber floors, formal living and dining rooms, and multiple bathrooms across multi-storey layouts. Our fixed pricing accounts for the genuine scope of these larger homes; there's no hourly ambiguity when your property has five rooms and two staircases.",
  },
  {
    icon: TreePine,
    tag: "TREE-LINED STREETS",
    title: "Californian bungalows & period homes",
    body: "The brick Californian bungalows and 1920s–30s properties on Brighton's quieter residential streets have a different cleaning profile to the bayside mansions — fewer formal rooms, but the same heritage surfaces and original finishes that benefit from consistent, surface-appropriate care. Our eco-friendly product selection accounts for original timber, heritage tiles, and period-era fixings throughout.",
  },
  {
    icon: Sparkles,
    tag: "CHURCH ST · BAY ST",
    title: "Renovated & contemporary homes",
    body: "Brighton's main commercial strips anchor a ring of renovated and newly built properties sitting alongside the suburb's heritage stock. Stone benchtops, engineered timber floors, and larger contemporary bathrooms have a different scope to a period home, and our pricing reflects your property's actual requirement — not a uniform Brighton rate applied regardless of home type.",
  },
];

const cleanCovers = [
  {
    icon: Bath,
    title: "Kitchen & Bathrooms",
    h3: "Kitchen Surfaces and Bathroom Detailing",
    body: "Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors cleaned every visit. Bathrooms — shower screens, basin, toilet, mirror, taps, and tiled floors — sanitised and polished. Brighton's larger homes with two or three bathrooms all covered within the standard scope.",
    checks: [
      "Benchtop, stovetop, rangehood, sink, splashback, appliance exteriors cleaned",
      "All bathrooms sanitised — all included",
      "Toilet base to cistern",
      "Mirrors & taps polished",
    ],
  },
  {
    icon: Layers,
    title: "Floors & Formal Rooms",
    h3: "Timber Floors, Polished Surfaces and Formal Living Areas",
    body: "Hardwood timber floors swept and mopped with low-moisture products — not steam on original floorboards. Polished and formal surfaces dusted, mirrors wiped, skirting boards and cornices attended to. Formal living and dining rooms get the same attention as everyday spaces.",
    checks: [
      "Low-moisture mop on original timber",
      "Skirting boards & cornices",
      "Mirrors & glass surfaces wiped",
      "Formal dining & living areas",
    ],
  },
  {
    icon: Home,
    title: "Bedrooms & Laundry",
    h3: "Bedrooms, Additional Rooms and Laundry",
    body: "All bedrooms vacuumed, surfaces dusted, and furniture-accessible areas addressed. A Brighton home with four or five bedrooms isn't treated identically to a two-bedroom apartment — your room count and layout determine the price and the time your cleaner spends.",
    checks: [
      "All bedrooms vacuumed & dusted",
      "All bedroom surfaces wiped",
      "Room count attains pricing standard",
      "Furniture-accessible areas done",
    ],
  },
];

const reasonCards = [
  {
    icon: UserCheck,
    stat: "97%",
    statSub: "same-cleaner rate",
    title: "Same cleaner every shift",
    body: "When your cleaner returns, they already know which bathroom needs extra attention around the tile grout, that the kitchen splashback requires more care after cooking-heavy weeks, and that you prefer the upstairs rooms addressed first. Continuity makes this structurally reliable, not a matter of luck.",
  },
  {
    icon: DollarSign,
    stat: "Fixed",
    statSub: "pricing always",
    title: "Fixed pricing for larger properties",
    body: "A five-bedroom heritage home in Brighton requires meaningfully more time than the average Melbourne house clean. Pricing set by your actual room count — not a suburb-wide hourly rate — so your cost reflects your home specifically, not a one-size figure that underdelivers on larger ones.",
  },
  {
    icon: Leaf,
    stat: "100%",
    statSub: "eco-friendly",
    title: "Eco-friendly on heritage surfaces",
    body: "Brighton's period homes have original timber floors, heritage-era tiles, and leadlight fittings that respond badly to harsh chemicals over time. Our product selection is chosen for effective cleaning without the surface deterioration that commercial-grade chemicals cause on older materials.",
  },
  {
    icon: ShieldCheck,
    stat: "72hr",
    statSub: "re-clean guarantee",
    title: "Satisfaction guarantee on every clean",
    body: "If anything doesn't meet your standard after a clean, contact us within 72 hours and we'll return to address it at no charge. This guarantee applies from your very first booking with Crisp and maintains across every subsequent visit — it doesn't diminish after a year.",
  },
];

const brightonStreets = [
  { name: "The Esplanade & Dendy St", tag: "Bayside beachfront" },
  { name: "Church St corridor", tag: "66% of residents in period" },
  { name: "Bay St precinct", tag: "Contemporary & original" },
  { name: "Nepean Hwy Fringe", tag: "Californian bungalows" },
  { name: "Golden Mile (New, Middle)", tag: "Prestige along the bay" },
];

const testimonials = [
  {
    stars: 5,
    quote:
      "We've been with Crisp for over two years. The fact that the same person comes every fortnight makes such a difference — she knows the house and doesn't need to be told anything.",
    name: "Sarah G.",
    suburb: "Dendy Street, Brighton",
  },
  {
    stars: 5,
    quote:
      "I finally found a cleaner who knows not to use steam on the floorboards. Heritage home owners will understand — this matters more than it sounds.",
    name: "James M.",
    suburb: "The Esplanade, Brighton",
  },
  {
    stars: 5,
    quote:
      "Transparent pricing was the first thing that got me — Efficient getting hourly quotes for a 5-bedroom home and dreading the final number. Fixed price, done.",
    name: "Rachel D.",
    suburb: "Church Street, Brighton",
  },
  {
    stars: 5,
    quote:
      "Used the 72hr guarantee after my first clean and had them back the next day, no questions. That's when I signed up for fortnightly.",
    name: "Andrew K.",
    suburb: "Bay Street, Brighton",
  },
];

const faqData = [
  {
    question: "Do you service homes near Dendy Street Beach and Church Street?",
    answer: (
      <p>
        Yes — we cover all of Brighton including the Esplanade, Dendy Street,
        and the pockets around Church Street and Bay Street.
      </p>
    ),
  },
  {
    question: "Are your products safe for the original timber floors and period finishes?",
    answer: (
      <p>
        Yes. Our product selection is specifically chosen for heritage surfaces
        including original hardwood floors, polished finishes, and period-era
        fittings. We don't use steam or high-moisture methods on original
        floorboards.
      </p>
    ),
  },
  {
    question: "How is pricing calculated for a large Brighton home?",
    answer: (
      <p>
        Pricing is set by your home's room count and service type. Brighton's
        larger period homes are quoted accurately for their actual scope, not at
        a generic rate applied across the suburb. Get an exact price online in
        under a minute.
      </p>
    ),
  },
  {
    question: "Can I book the same cleaner every fortnight?",
    answer: (
      <p>
        Yes. Your cleaner is assigned from your first booking and returns on
        your chosen schedule — weekly, fortnightly, or monthly. 97% of
        recurring clients receive the same cleaner every visit.
      </p>
    ),
  },
  {
    question: "What if I'm not satisfied after the clean?",
    answer: (
      <p>
        Contact us within 72 hours and we'll return to address anything that
        fell short — at no charge. The re-clean guarantee applies from your very
        first booking.
      </p>
    ),
  },
];

// ─── Main Component ────────────────────────────────────────────────
export default function BrightonClient({
  googleRatingValue = 5.0,
}: {
  googleRatingValue?: number;
}) {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO — 2-column layout
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FDFAF6] overflow-hidden pt-28 pb-0">
        {/* Subtle dot pattern right side */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none opacity-[0.06]" 
          style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,140,66,0.09) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "House Cleaning Brighton", href: "/house-cleaning-brighton" },
            ]} />
          </div>

          {/* Two-column hero */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start pb-10">

            {/* LEFT — copy */}
            <div className="flex-1 max-w-[560px]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FB8C42]/10 text-[#FB8C42] text-[10px] font-bold tracking-[0.18em] uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
                House Cleaning · Brighton · Melbourne
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-[40px] md:text-[52px] font-extrabold text-gray-900 leading-[1.06] tracking-[-0.03em] mb-6"
              >
                House Cleaning{" "}
                <span className="text-[#FB8C42] relative inline-block z-10">
                  Brighton
                  <svg 
                    className="absolute -bottom-1 left-[-2%] w-[104%] h-[16px] pointer-events-none -z-10"
                    viewBox="0 0 100 20" 
                    preserveAspectRatio="none"
                  >
                    <motion.path 
                      d="M 2 16 Q 50 4 98 16" 
                      fill="none" 
                      stroke="#d97706" 
                      strokeWidth="4.5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    />
                  </svg>
                </span>
                <br />Melbourne
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[480px]"
              >
                Brighton's Victorian and Edwardian homes have a different cleaning profile to the average Melbourne house. The same cleaner, every visit, with a scope built for your actual room count.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3 mb-5"
              >
                <a
                  href="/#booking"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-[14px] shadow-[0_6px_24px_rgba(251,140,66,0.28)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get an instant quote
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#checklist"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-[14px] hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  See what's included
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="text-[12px] text-gray-400"
              >
                15% off your first clean. Fixed price, no hourly estimates.
              </motion.p>
            </div>

            {/* RIGHT — stat boxes */}
            <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-3 lg:mt-2">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-gray-100 border-l-[3px] border-l-[#d97706] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4"
                >
                  <div className="text-2xl font-extrabold text-[#FB8C42] w-16 shrink-0 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-gray-500 leading-snug">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Metric strip */}
        <div className="border-t border-gray-100 bg-white">
          <div className="container mx-auto px-6 md:px-10 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {metricStrip.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                  className="py-5 px-6 text-center"
                >
                  <div className="text-[28px] font-extrabold text-gray-900 leading-none mb-1">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HERITAGE HOMES
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              Brighton's Housing Stock
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight mb-4">
              Cleaning Brighton's heritage homes the right way
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl leading-relaxed">
              Brighton's housing stock is predominantly period — Victorian mansions, Edwardian family homes, and Californian bungalows on the streets between the bay and the Nepean Highway define the suburb's residential character. Getting a consistently high standard across these properties requires a cleaner who knows your home.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heritageCards.map((card, i) => {
              const Icon = card.icon;
              const isFeatured = i === 0;

              return (
                <ScrollReveal key={i} delay={i * 0.09} className={isFeatured ? "md:col-span-2" : ""}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.07)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={`border border-gray-100 rounded-2xl shadow-sm h-full ${
                      isFeatured ? "bg-[#fef3c7]/40 p-8 md:p-10" : "bg-white p-6"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`rounded-lg bg-[#FB8C42]/10 flex items-center justify-center shrink-0 ${
                          isFeatured ? "w-11 h-11" : "w-8 h-8"
                        }`}
                      >
                        <Icon
                          className="text-[#FB8C42]"
                          style={{ width: isFeatured ? 20 : 15, height: isFeatured ? 20 : 15 }}
                        />
                      </div>
                      <span
                        className={`font-black uppercase tracking-[0.18em] text-[#FB8C42] ${
                          isFeatured ? "text-[11px]" : "text-[9px]"
                        }`}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <h3
                      className={`font-bold text-gray-900 leading-snug ${
                        isFeatured ? "text-[22px] md:text-[24px] mb-4" : "text-[15px] mb-3"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-gray-500 leading-relaxed ${
                        isFeatured ? "text-[15px] max-w-4xl" : "text-[13px]"
                      }`}
                    >
                      {card.body}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT EVERY CLEAN COVERS
      ══════════════════════════════════════════════════════ */}
      <section id="checklist" className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              Scope & Checklist
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight mb-4">
              What every Brighton clean covers
            </h2>
            <p className="text-[15px] text-gray-500 max-w-xl leading-relaxed">
              Every clean follows a documented checklist confirmed before the cleaner arrives. That's what makes a fixed price possible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cleanCovers.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.09}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.07)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#FB8C42]/10 flex items-center justify-center shrink-0">
                        <Icon className="text-[#FB8C42]" style={{ width: 15, height: 15 }} />
                      </div>
                      <h3 className="text-[14px] font-bold text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{item.body}</p>
                    <ul className="space-y-2">
                      {item.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-[12px] font-medium text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FB8C42] shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY BRIGHTON HOMEOWNERS CHOOSE CRISP
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              The Crisp Difference
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight mb-3">
              Why Brighton homeowners choose Crisp
            </h2>
            <p className="text-[15px] text-gray-500 max-w-xl leading-relaxed">
              The same cleaner, a documented checklist, and pricing calibrated to what your home actually requires.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reasonCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.07)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#FB8C42]/10 flex items-center justify-center">
                        <Icon className="text-[#FB8C42]" style={{ width: 16, height: 16 }} />
                      </div>
                      <div className="text-right">
                        <div className="text-[22px] font-extrabold text-[#FB8C42] leading-none">
                          {card.stat}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                          {card.statSub}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-2.5">{card.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{card.body}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WE KNOW BRIGHTON'S STREETS — 2-col layout
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              Local Knowledge
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight">
              We know Brighton's streets
            </h2>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Left — street list */}
            <ScrollReveal className="md:w-[340px] shrink-0 space-y-3" delay={0.05}>
              {brightonStreets.map((street, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#FAFAF8] border border-gray-100 group cursor-default"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{street.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{street.tag}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FB8C42]/10 text-[#FB8C42] whitespace-nowrap">
                    Brighton
                  </span>
                </motion.div>
              ))}
            </ScrollReveal>

            {/* Right — body text */}
            <ScrollReveal className="flex-1" delay={0.1}>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-5">
                Brighton's period housing doesn't behave like a uniform suburb. A four-bedroom Victorian on the Esplanade and a three-bedroom bungalow near the Nepean Highway have different cleaning profiles — different floor types, different bathroom counts, different formal room layouts.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-5">
                Our cleaners who work in Brighton have cleaned enough of these properties to know the difference without being told: LeadLight windows, original floorboard gaps, ornate coving — the kind of detail that matters in Brighton homes and goes missed in a standard clean.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Your cleaner is assigned to your property from the first booking. They build a working knowledge of your home specifically, not just a suburb-level familiarity.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING — 3-card row
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-10">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              Transparent Pricing
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight mb-3">
              Brighton house cleaning prices
            </h2>
            <p className="text-[15px] text-gray-500 max-w-xl leading-relaxed">
              Fixed pricing based on your room count. No hourly estimates, no surprise charges after the clean.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Regular Clean */}
            <ScrollReveal delay={0}>
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Regular Clean</p>
                <div className="mb-1">
                  <span className="text-[13px] text-gray-400 font-medium">From </span>
                  <span className="text-[34px] font-extrabold text-gray-900 leading-none">$180</span>
                </div>
                <p className="text-[12px] text-gray-400 mb-4">per visit · Start cleaning</p>
                <p className="text-[12px] font-semibold text-[#FB8C42]">Weekly & fortnightly</p>
              </div>
            </ScrollReveal>

            {/* Deep Clean — featured */}
            <ScrollReveal delay={0.08}>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-7 shadow-xl h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#FB8C42] text-white text-[9px] font-bold uppercase tracking-widest">
                  Most popular in Brighton
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Deep Clean</p>
                <div className="mb-1">
                  <span className="text-[34px] font-extrabold text-white leading-none">Get a quote</span>
                </div>
                <p className="text-[12px] text-gray-400 mb-4">scope-based pricing</p>
                <a
                  href="/#booking"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FB8C42] text-white text-[13px] font-bold hover:bg-[#e07a34] transition-colors"
                >
                  Get a quote <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </ScrollReveal>

            {/* End of Lease */}
            <ScrollReveal delay={0.16}>
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">End of Lease</p>
                <div className="mb-1">
                  <span className="text-[34px] font-extrabold text-gray-900 leading-none">Get a quote</span>
                </div>
                <p className="text-[12px] text-gray-400 mb-4">scope-based pricing</p>
                <p className="text-[12px] font-semibold text-[#FB8C42]">Fixed price guaranteed</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="text-[12px] text-gray-400 text-center">
              Exact pricing takes 40 seconds online — enter your room count and get a fixed price immediately.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — 2×2 grid
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <ScrollReveal className="mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[10px] uppercase mb-2">
              Client Stories
            </p>
            <h2 className="text-3xl md:text-[36px] font-extrabold text-gray-900 tracking-tight">
              What Brighton homeowners say
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 12px 36px rgba(0,0,0,0.07)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#FB8C42] text-[#FB8C42]" />
                    ))}
                  </div>
                  <p className="text-[14px] text-gray-700 leading-relaxed mb-5 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FB8C42]/15 flex items-center justify-center text-[#FB8C42] font-bold text-[12px]">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">{t.name}</p>
                      <p className="text-[11px] text-gray-400">{t.suburb}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQs
      ══════════════════════════════════════════════════════ */}
      <FAQ data={faqData} title="Questions about cleaning in Brighton" />

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — warm dark
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#1A1209] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(251,140,66,0.12) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 max-w-2xl text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[#FB8C42] text-[9px] font-bold tracking-[0.2em] uppercase mb-7">
              Ready to Book
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Book a cleaner in Brighton
            </h2>
            <p className="text-[15px] text-white/50 mb-3 leading-relaxed">
              Get an instant fixed quote for your Brighton home.
            </p>
            <p className="text-[13px] text-[#FB8C42] font-semibold mb-9">
              15% off your first clean.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/#booking"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-[14px] shadow-[0_8px_28px_rgba(251,140,66,0.35)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Get an instant quote <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="tel:0451433786"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/8 border border-white/15 text-white font-semibold text-[14px] hover:bg-white/12 transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5" />
                Call us: 0451 433 786
              </a>
            </div>
          </ScrollReveal>

          {/* Suburb links */}
          <ScrollReveal delay={0.15} className="mt-16">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-4">
              Nearby areas we also service
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {["Hampton", "Cheltenham", "Sandringham", "Albert Park", "Malvern"].map((suburb) => (
                <Link
                  key={suburb}
                  href="#"
                  className="px-4 py-2 rounded-full bg-white/6 border border-white/10 text-white/50 hover:text-[#FB8C42] hover:border-[#FB8C42]/20 text-[12px] font-medium transition-all duration-200"
                >
                  {suburb}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
