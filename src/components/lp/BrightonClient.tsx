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
  Star,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Bath,
  TreePine,
  Layers,
} from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import Services from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";

// ─── Animation Helpers ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: typeof fadeUp;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variant}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const heritageCards = [
  {
    icon: Home,
    tag: "Golden Mile & Bayside",
    title: "Victorian & Edwardian Properties",
    body: "The streets closest to the bay between Brighton Beach and Middle Brighton station are among Melbourne's most tightly held — heritage homes with polished timber floors, formal living and dining rooms, and multiple bathrooms across multi-storey layouts. Our fixed pricing accounts for the genuine scope of these larger homes; there's no hourly ambiguity when your property has five rooms and two staircases.",
    accent: "#FB8C42",
  },
  {
    icon: TreePine,
    tag: "Tree-Lined Streets",
    title: "Californian Bungalows & Period Homes",
    body: "The brick Californian bungalows and 1920s–30s properties on Brighton's quieter residential streets have a different cleaning profile to the bayside mansions — fewer formal rooms, but the same heritage surfaces and original finishes that benefit from consistent, surface-appropriate care. Our eco-friendly product selection accounts for original timber, heritage tiles, and period-era fixings throughout.",
    accent: "#22c55e",
  },
  {
    icon: Sparkles,
    tag: "Church St & Bay St",
    title: "Renovated & Contemporary Homes",
    body: "Brighton's main commercial strips anchor a ring of renovated and newly built properties sitting alongside the suburb's heritage stock. Stone benchtops, engineered timber floors, and larger contemporary bathrooms have a different scope to a period home, and our pricing reflects your property's actual requirement — not a uniform Brighton rate applied regardless of home type.",
    accent: "#6366f1",
  },
];

const cleanCovers = [
  {
    icon: Bath,
    title: "Kitchen Surfaces & Bathroom Detailing",
    body: "Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors are cleaned and wiped on every visit. Bathrooms — shower screens, tub or shower recess, basin, toilet including base, mirror, taps, and tiled floor — are sanitised and polished throughout. Brighton's larger homes with two or three bathrooms have all covered within the standard scope.",
    checks: [
      "Stovetop, rangehood & splashback",
      "All bathroom surfaces & screens",
      "Toilet base to cistern",
      "Mirrors & taps polished",
    ],
  },
  {
    icon: Layers,
    title: "Timber Floors, Polished Surfaces & Formal Rooms",
    body: "Hardwood timber floors are swept and mopped with appropriate, low-moisture products — not steam or excess water on original floorboards. Polished and formal surfaces are dusted, mirrors and glass wiped, skirting boards and cornices attended to. Formal living and dining rooms receive the same level of attention as everyday living spaces, which matters significantly in Brighton's larger heritage homes.",
    checks: [
      "Low-moisture mop on hardwood",
      "Skirting boards & cornices",
      "Formal dining & living areas",
      "Mirrors & glass wiped",
    ],
  },
  {
    icon: Home,
    title: "Bedrooms, Additional Rooms & Laundry",
    body: "All bedrooms are vacuumed, surfaces dusted, and furniture-accessible areas addressed. A Brighton home with four or five bedrooms isn't treated identically to a two-bedroom apartment — your room count and layout determine the price and the time your cleaner spends. The laundry is included as standard: surfaces wiped, appliance exteriors cleaned, floor swept or mopped.",
    checks: [
      "All bedrooms vacuumed & dusted",
      "Room count sets pricing",
      "Laundry included as standard",
      "Furniture-accessible areas done",
    ],
  },
];

const reasonCards = [
  {
    icon: UserCheck,
    title: "Same Cleaner Every Visit — Your Home's Details Are Never Reset",
    body: "When your cleaner returns, they already know which bathroom needs extra attention around the tile grout, that the kitchen splashback requires more care after cooking-heavy weeks, and that you prefer the upstairs rooms addressed first. That accumulated knowledge doesn't transfer to a rotating cleaner. Our 97% same-cleaner continuity rate makes this consistency structurally reliable, not a matter of luck.",
    stat: "97%",
    statLabel: "same-cleaner rate",
  },
  {
    icon: DollarSign,
    title: "Fixed Pricing That Accounts for Larger Brighton Properties",
    body: "A five-bedroom heritage home in Brighton requires meaningfully more time and effort than the average Melbourne house clean. Our pricing — set by your actual room count and scope rather than a suburb-wide hourly rate — means your cost reflects your home specifically, not a one-size figure that undercharges compact properties and underdelivers on larger ones.",
    stat: "0",
    statLabel: "surprise charges",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products Safe on Heritage Surfaces",
    body: "Brighton's period homes have original timber floors, heritage-era tiles, and leadlight or glass fittings that respond badly to harsh chemical cleaning products over time. Our eco-friendly product selection is chosen for effective cleaning without the surface deterioration that commercial-grade chemicals cause on older materials — important in a suburb where original finishes are a significant part of the property's value.",
    stat: "100%",
    statLabel: "eco-friendly",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guarantee on Every Clean",
    body: "If anything doesn't meet your standard after a clean, contact us within 72 hours and we'll return to address it at no charge. This guarantee applies from your very first booking with Crisp and maintains across every subsequent visit — it doesn't diminish after a year of regular service.",
    stat: "72hr",
    statLabel: "re-clean guarantee",
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
    question: "Are your products safe for original timber floors and period finishes?",
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
    question: "How much does house cleaning cost in Brighton?",
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
    question: "Can I book the same cleaner for a fortnightly clean?",
    answer: (
      <p>
        Yes. Your cleaner is assigned from your first booking and returns on
        your chosen schedule — weekly, fortnightly, or monthly. 97% of
        recurring clients receive the same cleaner every visit.
      </p>
    ),
  },
  {
    question: "Do I need to be home when the cleaner arrives?",
    answer: (
      <p>
        No. Most Brighton clients arrange key safe access or leave a key and
        aren't home during the clean. Access arrangements are confirmed at
        booking and stored for every subsequent visit without you resending
        instructions.
      </p>
    ),
  },
  {
    question: "What if I'm not satisfied with the clean?",
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
      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1A1209] overflow-hidden">
        {/* Animated ambient blobs */}
        <motion.div
          className="absolute top-[-120px] right-[-80px] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,140,66,0.18) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-100px] left-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,140,66,0.10) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 max-w-[1000px] pt-36 pb-20 text-center">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                {
                  label: "House Cleaning Brighton",
                  href: "/house-cleaning-brighton",
                },
              ]}
            />
          </div>

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-[#FB8C42] text-xs font-semibold tracking-[0.18em] uppercase mb-8 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42] animate-pulse" />
            House Cleaning · Brighton · Melbourne
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-8"
          >
            House Cleaning{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-[#FB8C42] to-[#f59e0b] bg-clip-text text-transparent">
                Brighton
              </span>
            </span>{" "}
            Melbourne
          </motion.h1>

          {/* Intro paragraph */}
          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Brighton homes are among Melbourne's most demanding to clean
            consistently — large Victorian and Edwardian houses on generous
            blocks, original timber floors, leadlight windows, and the kind of
            surface detail that reveals the quality of a cleaner quickly. The
            streets between Church Street and Dendy Street Beach are lined with
            properties that reward a consistent, familiar cleaner and suffer
            noticeably when that consistency isn't there. Crisp services
            Brighton homes with a fixed, scope-defined checklist applied the
            same way on every visit, by the same cleaner, at transparent
            pricing set by your home's actual room count.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#booking"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-base shadow-[0_12px_40px_rgba(251,140,66,0.4)] hover:shadow-[0_16px_50px_rgba(251,140,66,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get an Instant Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-white/40 text-sm">15% off your first clean</span>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {[
              { emoji: "⭐", label: `${googleRatingValue} on Google` },
              { emoji: "🔁", label: "97% Same Cleaner" },
              { emoji: "🌿", label: "Eco-Friendly Products" },
              { emoji: "🛡️", label: "72hr Re-clean Guarantee" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-white/70 text-sm font-medium backdrop-blur-sm"
              >
                <span>{pill.emoji}</span>
                {pill.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ══════════════ SECTION 1: HERITAGE HOMES — BENTO GRID ══════════════ */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-4">
              Brighton's Housing Stock
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Cleaning Brighton's Heritage Homes the Right Way
            </h2>
            <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Brighton's housing stock is predominantly period — Victorian
              mansions, Edwardian family homes, and Californian bungalows on the
              streets between the bay and the Nepean Highway define the suburb's
              residential character. Getting a consistently high standard across
              these properties requires a cleaner who knows your home, not a
              different person starting from scratch every fortnight.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heritageCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-shadow duration-300 h-full overflow-hidden"
                  >
                    {/* Top accent glow */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px] opacity-80"
                      style={{ background: card.accent }}
                    />
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${card.accent}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.accent }} />
                    </div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3 block"
                      style={{ color: card.accent }}
                    >
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {card.body}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 2: WHAT EVERY BRIGHTON CLEAN COVERS ══════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal className="text-center mb-20">
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-4">
              Scope & Checklist
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              What Every Brighton Clean Covers
            </h2>
            <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Every Brighton clean follows a documented checklist covering all
              main rooms and surfaces within your booking scope. The scope is
              confirmed before the cleaner arrives — which is what makes a fixed
              price possible and what prevents the ambiguity that hourly
              services routinely produce.
            </p>
          </ScrollReveal>

          <div className="space-y-16">
            {cleanCovers.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}
                >
                  {/* Text */}
                  <ScrollReveal
                    className="flex-1"
                    variant={isEven ? fadeLeft : fadeRight}
                    delay={0.05}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#FB8C42]/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[#FB8C42]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
                      {item.body}
                    </p>
                    <ul className="space-y-2.5">
                      {item.checks.map((c) => (
                        <li key={c} className="flex items-center gap-3 text-[14px] font-medium text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#FB8C42] shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {/* Decorative panel */}
                  <ScrollReveal
                    className="flex-1 w-full"
                    variant={isEven ? fadeRight : fadeLeft}
                    delay={0.15}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-[32px] bg-gradient-to-br from-[#FDF8F4] to-[#FAF3E8] border border-orange-100 overflow-hidden flex items-center justify-center">
                      {/* Floating number accent */}
                      <div className="absolute top-6 right-6 text-[80px] font-black text-[#FB8C42]/8 leading-none select-none">
                        0{i + 1}
                      </div>
                      <div className="text-center px-8">
                        <div className="w-20 h-20 rounded-full bg-[#FB8C42]/10 flex items-center justify-center mx-auto mb-5">
                          <Icon className="w-9 h-9 text-[#FB8C42]" />
                        </div>
                        <p className="text-[#FB8C42] font-bold text-sm uppercase tracking-widest">
                          Every Visit
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Documented. Consistent. Yours.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 3: WHY BRIGHTON HOMEOWNERS CHOOSE CRISP ══════════════ */}
      <section className="py-24 bg-[#1A1209] relative overflow-hidden">
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(251,140,66,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-4">
              The Crisp Difference
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Why Brighton Homeowners Choose Crisp
            </h2>
            <p className="mt-5 text-lg text-white/50 max-w-3xl mx-auto leading-relaxed">
              Brighton's cleaning market offers plenty of options. Crisp's
              operational advantage is specific: the same cleaner, a fixed and
              documented checklist, and pricing calibrated to what your home
              genuinely requires.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasonCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group relative bg-white/5 border border-white/10 rounded-[28px] p-8 backdrop-blur-sm hover:bg-white/8 hover:border-[#FB8C42]/30 transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#FB8C42]/15 flex items-center justify-center group-hover:bg-[#FB8C42] transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#FB8C42] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-[#FB8C42]">
                          {card.stat}
                        </div>
                        <div className="text-[11px] text-white/40 font-medium">
                          {card.statLabel}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-[16px] font-bold text-white mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-white/50 leading-relaxed">
                      {card.body}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-4">
              Transparent Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Brighton House Cleaning Prices
            </h2>
            <p className="mt-5 text-gray-500 max-w-xl mx-auto">
              Fixed pricing based on your actual room count. No hourly
              estimates, no surprise charges.
            </p>
          </ScrollReveal>
          <Services hiddenInline />
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-4">
              Client Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              What Brighton Homeowners Say
            </h2>
          </ScrollReveal>
          <Testimonials googleRatingValue={googleRatingValue} />
        </div>
      </section>

      {/* ══════════════ FAQs ══════════════ */}
      <FAQ data={faqData} title="Frequently Asked Questions" />

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="py-28 bg-[#1A1209] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(251,140,66,0.14) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-[#FB8C42] font-bold tracking-widest text-xs uppercase mb-6">
              Ready to Book
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Book a Cleaner in Brighton
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
              Get an instant, fixed quote for your Brighton home and book online
              in under a minute.{" "}
              <span className="text-[#FB8C42] font-semibold">
                15% off your first clean.
              </span>
            </p>
            <a
              href="/#booking"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-lg shadow-[0_16px_50px_rgba(251,140,66,0.4)] hover:shadow-[0_20px_60px_rgba(251,140,66,0.55)] hover:-translate-y-1 transition-all duration-300"
            >
              Get an Instant Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>

          {/* Nearby suburbs */}
          <ScrollReveal delay={0.2} className="mt-20">
            <h2 className="text-xl font-bold text-white/60 mb-6">
              Nearby Areas We Also Service
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Hampton", "Cheltenham", "Albert Park", "Sandringham", "Malvern"].map(
                (suburb) => (
                  <Link
                    key={suburb}
                    href="#"
                    className="px-5 py-2.5 rounded-full bg-white/6 border border-white/10 text-white/50 hover:text-[#FB8C42] hover:border-[#FB8C42]/30 text-sm font-medium transition-all duration-200"
                  >
                    {suburb}
                  </Link>
                )
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
