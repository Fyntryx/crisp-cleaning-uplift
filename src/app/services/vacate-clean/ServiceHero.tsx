"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Key, ShieldCheck } from "lucide-react";

const trustItems = [
  "Bond-Back Guarantee",
  "Cleaned to Inspection Standard",
  "Insured & Vetted",
  "4.9 ★ on Google",
];

export default function ServiceHero() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#FB8C42] w-full py-4 relative z-20 mt-[76px] md:mt-[84px]">
        <div className="container mx-auto px-6 md:px-8 max-w-[1216px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3 text-white text-[14px] font-medium leading-relaxed">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 md:mt-0" />
            <p>
              <strong>BOND-BACK GUARANTEE — </strong> 
              Cleaned to rental inspection standard. If your property manager isn't satisfied, we come back <br className="hidden md:block" />
              and fix it free within 48 hours.
            </p>
          </div>
          <div className="text-white/90 text-[12px] whitespace-nowrap hidden md:flex items-center gap-4">
            <div className="w-[1px] h-8 bg-white/20"></div>
            <span>Conditions apply · Full terms at booking</span>
          </div>
        </div>
      </div>

      <section className="relative bg-[#FDFBF9] overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-[1216px] pt-20 md:pt-28 pb-20">

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

            {/* Left Column — Copy */}
            <div className="flex-1 w-full max-w-[750px]">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FB8C42]/30 text-[#FB8C42] bg-[#FB8C42]/5">
                <Key className="w-3.5 h-3.5" />
                <span className="font-bold text-[10px] uppercase tracking-[0.1em]">
                  END OF LEASE & VACATE CLEANING · MELBOURNE
                </span>
              </div>

              <h1
                style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }}
                className="text-[48px] md:text-[64px] font-semibold text-gray-900 mb-6"
              >
                Get your bond back. <br className="hidden md:block" />
                <span className="text-[#FB8C42]">Without the stress.</span>
              </h1>

              {/* Description */}
              <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[800px] mb-10">
                Moving out is stressful enough. Crisp's Vacate Clean covers every room, <br className="hidden lg:block" />
                every corner, and every item on the property manager's checklist — so you <br className="hidden lg:block" />
                don't have to worry about a thing.
              </p>

              {/* Trust Items Grid */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 max-w-[600px]">
                {trustItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-[13px] text-[#1c1917] font-medium leading-[19.5px]">
                    <CheckCircle2 className="w-4 h-4 text-[#FB8C42]" strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — CTA Box */}
            <div className="w-full lg:w-[420px] shrink-0">
              {/* White CTA Card */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative">
                <Link
                  href="/#booking?service=Vacate"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#FB8C42] hover:bg-[#ea6309] text-white px-8 py-4 font-bold text-[16px] shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all group"
                >
                  Get an Instant Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="mt-4 flex items-center justify-center text-[12px] text-gray-400">
                  <span>Takes 30 seconds · No lock-in contracts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
