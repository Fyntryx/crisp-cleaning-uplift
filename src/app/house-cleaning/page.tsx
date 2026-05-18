"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Check,
  X,
  Shield,
  Clock,
  Star,
  Sparkles,
  Heart,
  Smile,
  CheckCircle2,
  DollarSign,
  Calendar,
  ThumbsUp,
  MapPin,
  ChevronDown,
  UserCheck
} from "lucide-react";

// --- DATA STRUCTURES ---
const trustIndicators = [
  { text: "30 second instant quote", icon: Clock },
  { text: "no lock-in contract", icon: Shield },
  { text: "insured & vetted", icon: UserCheck }
];

const audiences = [
  {
    title: "Busy Professionals",
    description: "Get your weekends back. Let us handle the cleaning while you focus on your career, hobbies, and personal time.",
    icon: Sparkles,
    tag: "POPULAR"
  },
  {
    title: "Growing Families",
    description: "Keep your home hygienic, clean, and safe for your little ones and pets without adding more chores to your daily to-do list.",
    icon: Heart,
    tag: "RECOMMENDED"
  },
  {
    title: "NDIS & Seniors",
    description: "Reliable, fully vetted, and caring cleaning assistance tailored perfectly to maintain your comfort, safety, and independence at home.",
    icon: Smile,
    tag: "COMPLIANT"
  }
];

const crispDifferences = [
  {
    num: "01",
    title: "Vetted & Insured Cleaners",
    description: "Every professional undergoes strict police background checks and is fully insured for complete peace of mind."
  },
  {
    num: "02",
    title: "100% Happiness Guarantee",
    description: "If something isn't perfect, just tell us within 24 hours and we'll come back to reclean it completely free."
  },
  {
    num: "03",
    title: "Seamless Online Booking",
    description: "Book, schedule, customize, and pay completely online in under 60 seconds. Zero phone tag required."
  },
  {
    num: "04",
    title: "Transparent Flat-Rate Pricing",
    description: "No hourly milkers. No hidden fees. We price transparently based on bedrooms and bathrooms."
  },
  {
    num: "05",
    title: "Premium Cleaning Tools",
    description: "We bring high-end eco-friendly products and advanced vacuums that are highly safe for pets and kids."
  },
  {
    num: "06",
    title: "No Lock-in Contracts",
    description: "Cancel, pause, or reschedule your cleans with absolute flexibility. You only pay for what you receive."
  }
];

const inclusionCategories = [
  { id: "kitchen", label: "Kitchen" },
  { id: "bathroom", label: "Bathrooms" },
  { id: "bedrooms", label: "Bedrooms & Living" },
  { id: "exclusions", label: "Exclusions" }
];

const inclusionsData = {
  kitchen: [
    { text: "Wiping exterior of all cupboards & drawers", included: true },
    { text: "Sanitising countertops & kitchen benches", included: true },
    { text: "Scrubbing stovetop, burners & knobs", included: true },
    { text: "Polishing sink, tapware & splashback", included: true },
    { text: "Wiping microwave interior & exterior", included: true },
    { text: "Emptying rubbish bins & relining", included: true },
    { text: "Vacuuming & mopping floors", included: true },
    { text: "Interior oven deep scrub", included: false }
  ],
  bathroom: [
    { text: "Scrubbing & sanitising toilets", included: true },
    { text: "Descaling & scrubbing shower screens & tiles", included: true },
    { text: "Scrubbing bath, basin, & vanity surfaces", included: true },
    { text: "Polishing mirrors & tapware", included: true },
    { text: "Wiping cabinet exteriors", included: true },
    { text: "Emptying rubbish bins", included: true },
    { text: "Vacuuming & mopping floors", included: true },
    { text: "Deep grout mould removal & remediation", included: false }
  ],
  bedrooms: [
    { text: "Dusting all flat surfaces & furniture", included: true },
    { text: "Vacuuming carpets & rugs", included: true },
    { text: "Mopping hard floors", included: true },
    { text: "Making beds & changing 1 set of linen", included: true },
    { text: "Emptying bins", included: true },
    { text: "Dusting skirting boards & doors", included: true },
    { text: "Cleaning accessible glass panels", included: true },
    { text: "Moving heavy furniture (>15kg)", included: false }
  ],
  exclusions: [
    { text: "Wet-wiping high lightbulbs or ceiling fans", included: false },
    { text: "Deep mould remediation or biohazard cleanup", included: false },
    { text: "Professional carpet steam cleaning", included: false },
    { text: "Exterior window cleaning", included: false },
    { text: "Wall washing or scrub downs", included: false }
  ]
};

const processSteps = [
  {
    step: "1",
    title: "Get an Instant Price",
    description: "Enter your bedrooms, bathrooms, and preferred schedule using our instant booking wizard."
  },
  {
    step: "2",
    title: "Customise Your Clean",
    description: "Add special instructions, tell us about pets, or select optional premium extras to suit your home."
  },
  {
    step: "3",
    title: "Vetted Professional Arrives",
    description: "Our fully insured, police-checked professional arrives equipped with premium tools to clean your home."
  },
  {
    step: "4",
    title: "Experience the Sparkle",
    description: "Walk into a meticulously cleaned home that smells fresh, hygienic, and perfectly ordered."
  }
];

const faqs = [
  {
    question: "What is exactly included in a standard house cleaning?",
    answer: "Our standard house cleaning includes dusting all surfaces, vacuuming carpets, mopping hard floors, and fully sanitizing your kitchen and bathrooms."
  },
  {
    question: "Do I need to be home while the cleaners are there?",
    answer: "Not at all! You can simply provide entry instructions (like a hidden key or lockbox code) when you book online."
  },
  {
    question: "Are your cleaners background-checked and insured?",
    answer: "Yes, 100%. Every single Crisp Cleaning professional undergoes a strict police background check and is fully insured for your peace of mind."
  },
  {
    question: "What kind of cleaning products do you use?",
    answer: "We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your pets and children."
  }
];

export default function HouseCleaningPage() {
  const [activeTab, setActiveTab] = useState<"kitchen" | "bathroom" | "bedrooms" | "exclusions">("kitchen");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-orange-50/50 via-white to-white overflow-hidden flex flex-col items-center text-center px-6">
        {/* Glow ambient meshes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/5 via-orange-500/0 to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 text-primary text-[10px] font-extrabold tracking-wider uppercase mb-5 bg-orange-50">
            <Sparkles className="w-3 h-3" /> REGULAR HOUSE CLEANING
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-6">
            Walk in. Breathe out.<br />
            Your home <span className="text-primary">exactly</span> how it should be.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl font-medium leading-relaxed mb-8">
            Book Melbourne's most trusted home cleaning service in seconds. Premium service. Zero hassle.
          </p>

          {/* Centered CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full justify-center">
            <Link href="/booking" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4.5 bg-primary hover:bg-primary/95 text-white rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all">
                Get Your Instant Price
              </button>
            </Link>
          </div>

          {/* Trust Indicators Row below Hero */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 border-t border-gray-100 pt-8 w-full max-w-3xl">
            {trustIndicators.map((t, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-primary">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <span className="text-xs font-bold text-gray-700 capitalize tracking-tight">
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AUDIENCES SECTION --- */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">WHO IS THIS FOR?</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">A spotless home, shaped for your lifestyle.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((aud, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[28px] border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[8px] font-black uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
                    {aud.tag}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-primary mb-6">
                    <aud.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">{aud.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{aud.description}</p>
                </div>
                <div className="mt-8 border-t border-gray-50 pt-5">
                  <Link href="/booking" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline">
                    Book Clean Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CRISP DIFFERENCES --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">WHY US</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
              What makes Crisp different?<br />
              <span className="text-gray-400 font-extrabold">(spoiler: it's everything)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {crispDifferences.map((diff, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-3xl font-black text-orange-200 leading-none">{diff.num}</span>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 mb-2">{diff.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INCLUSIONS / EXCLUSIONS CHECKLIST --- */}
      <section className="py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">OUR DETAILED CHECKLIST</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">Nothing is a secret. Everything is cleared.</h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">See exactly what we do (and what we leave to specialists).</p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex gap-2 pb-1 overflow-x-auto justify-center mb-8 custom-scrollbar">
            {inclusionCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  activeTab === cat.id
                    ? "bg-[#111827] text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Inclusions / Exclusions List Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-md p-6 md:p-10">
            <div className="space-y-4">
              {inclusionsData[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-4 p-4.5 rounded-2xl border transition-all duration-300 ${
                    item.included
                      ? "bg-orange-50/20 border-orange-100/50 hover:bg-orange-50/30"
                      : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    item.included ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {item.included ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : (
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    )}
                  </div>
                  <span className={`text-xs md:text-sm font-extrabold ${
                    item.included ? "text-gray-800" : "text-gray-400 line-through"
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">HOW IT WORKS</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">Book in 60 seconds — here's exactly what happens.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((p, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-[28px] border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-primary border border-orange-100 shadow-sm mb-6">
                    {p.step}
                  </span>
                  <h3 className="text-sm font-black text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQS SECTION --- */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">Everything you might be wondering</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-xs md:text-sm font-black text-gray-800">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-gray-500 font-semibold leading-relaxed border-t border-gray-50 animate-in slide-in-from-top duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- BOTTOM BANNER / FINAL CTA --- */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-[#F97316] text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[9px] font-black tracking-widest uppercase mb-4 text-white">
              MELBOURNE'S BEST CLEAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-4">
              The right clean makes things bright & simple.
            </h2>
            <p className="text-xs text-white/90 font-medium leading-relaxed max-w-md">
              Book a regular professional cleaning service today and experience the fresh feel of a pristine home.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link href="/booking">
              <button className="px-8 py-4.5 bg-white hover:bg-gray-50 text-primary rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all">
                Book in 60 Seconds
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}