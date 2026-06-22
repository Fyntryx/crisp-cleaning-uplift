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
} from "lucide-react";
import FAQ from "@/components/lp/FAQ";
import Testimonials from "@/components/lp/Testimonials";
import Services from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";

// ─── Animation Helpers ────────────────────────────────────────────
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  fromY = 24,
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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Heritage Property Cards ───────────────────────────────────────
const heritageCards = [
  {
    icon: Home,
    tag: "Golden Mile & Bayside",
    title: "Victorian & Edwardian Properties",
    body: "The streets closest to the bay between Brighton Beach and Middle Brighton station are among Melbourne's most tightly held — heritage homes with polished timber floors, formal living and dining rooms, and multiple bathrooms across multi-storey layouts. Our fixed pricing accounts for the genuine scope of these larger homes; there's no hourly ambiguity when your property has five rooms and two staircases.",
  },
  {
    icon: TreePine,
    tag: "Tree-Lined Streets",
    title: "Californian Bungalows & Period Homes",
    body: "The brick Californian bungalows and 1920s–30s properties on Brighton's quieter residential streets have a different cleaning profile to the bayside mansions — fewer formal rooms, but the same heritage surfaces and original finishes that benefit from consistent, surface-appropriate care. Our eco-friendly product selection accounts for original timber, heritage tiles, and period-era fixings throughout.",
  },
  {
    icon: Sparkles,
    tag: "Church St & Bay St",
    title: "Renovated & Contemporary Homes",
    body: "Brighton's main commercial strips anchor a ring of renovated and newly built properties sitting alongside the suburb's heritage stock. Stone benchtops, engineered timber floors, and larger contemporary bathrooms have a different scope to a period home, and our pricing reflects your property's actual requirement — not a uniform Brighton rate applied regardless of home type.",
  },
];

// ─── What Every Clean Covers (condensed grid) ─────────────────────
const cleanCovers = [
  {
    icon: Bath,
    title: "Kitchen & Bathrooms",
    h3: "Kitchen Surfaces and Bathroom Detailing",
    body: "Kitchen benchtops, stovetop, rangehood, splashback, sink, and accessible appliance exteriors cleaned every visit. Bathrooms — shower screens, basin, toilet, mirror, taps, and tiled floors — sanitised and polished. Brighton's larger homes with two or three bathrooms all covered within the standard scope.",
    checks: [
      "Stovetop, rangehood & splashback",
      "All bathrooms sanitised",
      "Toilet base to cistern",
      "Mirrors & taps polished",
    ],
  },
  {
    icon: Layers,
    title: "Floors & Formal Rooms",
    h3: "Timber Floors, Polished Surfaces and Formal Living Areas",
    body: "Hardwood timber floors swept and mopped with low-moisture products — not steam on original floorboards. Polished surfaces dusted, mirrors wiped, skirting boards and cornices attended to. Formal living and dining rooms get the same attention as everyday spaces — which matters in Brighton's larger heritage homes.",
    checks: [
      "Low-moisture mop on hardwood",
      "Skirting boards & cornices",
      "Formal dining & living areas",
      "Mirrors & glass wiped",
    ],
  },
  {
    icon: Home,
    title: "Bedrooms & Laundry",
    h3: "Bedrooms, Additional Rooms and Laundry",
    body: "All bedrooms vacuumed, surfaces dusted, and furniture-accessible areas addressed. A Brighton home with four or five bedrooms isn't treated identically to a two-bedroom apartment — your room count and layout determine the price and the time your cleaner spends. Laundry included as standard.",
    checks: [
      "All bedrooms vacuumed & dusted",
      "Room count sets pricing",
      "Laundry included as standard",
      "Furniture-accessible areas done",
    ],
  },
];

// ─── Why Choose Crisp ─────────────────────────────────────────────
const reasonCards = [
  {
    icon: UserCheck,
    stat: "97%",
    statLabel: "same-cleaner rate",
    title: "Same Cleaner Every Visit",
    body: "When your cleaner returns, they already know which bathroom needs extra attention, that the kitchen splashback needs more care after cooking-heavy weeks, and that you prefer the upstairs rooms first. Our 97% same-cleaner continuity rate makes this consistency structurally reliable, not a matter of luck.",
  },
  {
    icon: DollarSign,
    stat: "Fixed",
    statLabel: "pricing always",
    title: "Fixed Pricing for Larger Properties",
    body: "A five-bedroom heritage home in Brighton requires meaningfully more time than the average Melbourne house clean. Our pricing is set by your actual room count — not a suburb-wide hourly rate — so your cost reflects your home specifically.",
  },
  {
    icon: Leaf,
    stat: "100%",
    statLabel: "eco-friendly",
    title: "Eco-Friendly on Heritage Surfaces",
    body: "Brighton's period homes have original timber floors, heritage-era tiles, and leadlight fittings that respond badly to harsh chemicals over time. Our product selection is chosen for effective cleaning without the surface deterioration that commercial-grade chemicals cause on older materials.",
  },
  {
    icon: ShieldCheck,
    stat: "72hr",
    statLabel: "re-clean guarantee",
    title: "Satisfaction Guarantee on Every Clean",
    body: "If anything doesn't meet your standard after a clean, contact us within 72 hours and we'll return to address it at no charge. This guarantee applies from your very first booking and maintains across every subsequent visit.",
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
        booking and stored for every subsequent visit.
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
      {/* ══════════════════════════════════════════════════════
          HERO — Light, warm, airy
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FDFAF6] overflow-hidden">
        {/* Warm, soft ambient glow — top right */}
        <div
          className="absolute top-[-60px] right-[-80px] w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,140,66,0.10) 0%, transparent 65%)",
          }}
        />
        {/* Subtle bottom-left warmth */}
        <div
          className="absolute bottom-0 left-[-40px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,140,66,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-6 md:px-8 max-w-[960px] pt-32 md:pt-40 pb-20 text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "House Cleaning Brighton", href: "/house-cleaning-brighton" },
              ]}
            />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FB8C42]/10 border border-[#FB8C42]/20 text-[#FB8C42] text-[11px] font-bold tracking-[0.18em] uppercase mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB8C42]" />
            House Cleaning · Brighton Melbourne
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-[60px] font-extrabold text-gray-900 leading-[1.08] tracking-[-0.03em] mb-6"
          >
            House Cleaning Brighton Melbourne
          </motion.h1>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-[17px] md:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto mb-10"
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#booking"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-[15px] shadow-[0_8px_30px_rgba(251,140,66,0.30)] hover:shadow-[0_12px_40px_rgba(251,140,66,0.40)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get an Instant Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-gray-400 text-sm font-medium">
              15% off your first clean
            </span>
          </motion.div>

          {/* Trust strips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {[
              { label: `${googleRatingValue} ★ on Google` },
              { label: "97% Same Cleaner" },
              { label: "Eco-Friendly Products" },
              { label: "72hr Re-clean Guarantee" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 text-[13px] font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FB8C42]" />
                {pill.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="flex justify-center pb-8 text-gray-300"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Heritage Homes Bento Grid
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-3">
              Brighton's Housing Stock
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Cleaning Brighton's Heritage Homes the Right Way
            </h2>
            <p className="mt-4 text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Brighton's housing stock is predominantly period — Victorian
              mansions, Edwardian family homes, and Californian bungalows on
              the streets between the bay and the Nepean Highway. Getting a
              consistently high standard requires a cleaner who knows your
              home, not a different person starting from scratch every fortnight.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {heritageCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FB8C42]/10 flex items-center justify-center mb-5">
                      <Icon className="w-4.5 h-4.5 text-[#FB8C42]" style={{ width: 18, height: 18 }} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FB8C42] mb-2">
                      {card.tag}
                    </p>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
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
          SECTION 2 — What Every Clean Covers (tight 3-column)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-3">
              Scope & Checklist
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              What Every Brighton Clean Covers
            </h2>
            <p className="mt-4 text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Every Brighton clean follows a documented checklist covering all
              main rooms and surfaces within your booking scope. The scope is
              confirmed before the cleaner arrives — which is what makes a fixed
              price possible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cleanCovers.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.07)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#FB8C42]/10 flex items-center justify-center shrink-0">
                        <Icon className="text-[#FB8C42]" style={{ width: 18, height: 18 }} />
                      </div>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                        {item.h3}
                      </h3>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                      {item.body}
                    </p>
                    <ul className="space-y-2">
                      {item.checks.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-[13px] font-medium text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FB8C42] shrink-0 mt-0.5" />
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
          SECTION 3 — Why Brighton Homeowners Choose Crisp
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-3">
              The Crisp Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Why Brighton Homeowners Choose Crisp
            </h2>
            <p className="mt-4 text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Brighton's cleaning market offers plenty of options. Crisp's
              advantage is specific: the same cleaner, a documented checklist,
              and pricing calibrated to what your home genuinely requires.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reasonCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm h-full"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#FB8C42]/10 flex items-center justify-center">
                        <Icon className="text-[#FB8C42]" style={{ width: 18, height: 18 }} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-[#FB8C42]">
                          {card.stat}
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {card.statLabel}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
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
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Brighton House Cleaning Prices
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-[15px]">
              Fixed pricing based on your actual room count. No hourly
              estimates, no surprise charges.
            </p>
          </ScrollReveal>
          <Services hiddenInline />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-3">
              Client Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              What Brighton Homeowners Say
            </h2>
          </ScrollReveal>
          <Testimonials googleRatingValue={googleRatingValue} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQs
      ══════════════════════════════════════════════════════ */}
      <FAQ data={faqData} title="Frequently Asked Questions" />

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — warm, light
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FDF8F4] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(251,140,66,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-[#FB8C42] font-bold tracking-widest text-[11px] uppercase mb-5">
              Ready to Book
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              Book a Cleaner in Brighton
            </h2>
            <p className="text-gray-500 text-[16px] mb-9 max-w-xl mx-auto leading-relaxed">
              Get an instant, fixed quote for your Brighton home and book online
              in under a minute.{" "}
              <span className="text-[#FB8C42] font-semibold">
                15% off your first clean.
              </span>
            </p>
            <a
              href="/#booking"
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#FB8C42] hover:bg-[#e07a34] text-white font-bold text-[15px] shadow-[0_8px_30px_rgba(251,140,66,0.30)] hover:shadow-[0_14px_40px_rgba(251,140,66,0.40)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get an Instant Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </ScrollReveal>

          {/* Nearby suburbs */}
          <ScrollReveal delay={0.15} className="mt-16">
            <h2 className="text-[16px] font-bold text-gray-400 mb-5 uppercase tracking-widest text-[11px]">
              Nearby Areas We Also Service
            </h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {["Hampton", "Cheltenham", "Albert Park", "Sandringham", "Malvern"].map(
                (suburb) => (
                  <Link
                    key={suburb}
                    href="#"
                    className="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#FB8C42]/40 hover:text-[#FB8C42] text-[13px] font-medium shadow-sm transition-all duration-200"
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
