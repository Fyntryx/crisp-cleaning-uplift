"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const trustItems = [
  "Insured & Vetted",
  "Same Cleaner Every Visit",
  "48hr Re-clean Guarantee",
  "Eco-Friendly Products",
  "4.9 ★ on Google",
];

export default function ServiceHero() {
  return (
    <section className="relative bg-[#FDF8F4] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px] pt-32 md:pt-40 pb-8">

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Column — Copy */}
          <div className="flex-1 max-w-[750px]">
            {/* Badge */}
            <div className="mb-6">
              <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                REGULAR HOUSE CLEANING · MELBOURNE
              </span>
            </div>

            <h1
              style={{ maxWidth: "896px", letterSpacing: "-1.2px", lineHeight: "1.2" }}
              className="text-[40px] md:text-[40px] font-extrabold text-gray-900 mb-5 mt-3"
            >
              A consistent, detailed clean — every visit, without the mental load.
            </h1>

            {/* Description */}
            <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
              Crisp's Regular House Clean is designed for busy Melbourne households who want their home maintained to a high standard on their schedule. Weekly, fortnightly, monthly, or one-off — same cleaner, same checklist, same result every time.
            </p>
          </div>

          {/* Right Column — CTA Box */}
          <div className="w-full lg:w-[480px] shrink-0 flex flex-col gap-5 lg:mt-16">
            {/* Dark CTA Card */}
            <div 
              className="text-[#FDFAF7] border-0 relative overflow-hidden"
              style={{ backgroundColor: "rgb(26, 18, 9)", borderRadius: "16px", padding: "20px", width: "480px", maxWidth: "100%" }}
            >
              <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] bg-primary/20 rounded-full blur-[70px] pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#FB8C42] mb-4 block leading-[16px]">
                  INSTANT PRICING
                </span>

                <Link
                  href="/#booking"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#FB8C42] hover:bg-[#ea6309] text-white px-8 py-4 font-bold text-[17px] shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all group mb-5"
                >
                  Get an Instant Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[13px] text-white/50">
                  <span>Takes 30 seconds</span>
                  <span>·</span>
                  <span>No lock-in contracts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Ribbon */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-[13px] text-gray-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FB8C42]" strokeWidth={2.5} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
