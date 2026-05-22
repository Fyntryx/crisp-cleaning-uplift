"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

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
      <div className="container mx-auto px-4 max-w-[1216px] pt-32 md:pt-40 pb-8">

        {/* Main Content */}
        <div className="max-w-[896px] mb-12">
          {/* Badge */}
          <div className="mb-6">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              DEEP HOUSE CLEANING · MELBOURNE
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{ maxWidth: "896px", letterSpacing: "-1.2px", lineHeight: "1.1" }}
            className="text-[48px] md:text-[64px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Your home, reset to the <br className="hidden md:block" />
            standard <span className="text-[#FB8C42]">it deserves.</span>
          </h1>

          {/* Description */}
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[800px]">
            A Crisp Deep Clean goes beyond the surface. Every room. Every corner.<br className="hidden md:block" />
            Every detail — done properly, with a defined system and a cleaner who<br className="hidden md:block" />
            takes pride in the result.
          </p>
        </div>

        {/* CTA Box (Wide White Bar) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mb-12">
          
          {/* Booking Info */}
          <div className="flex-1 flex flex-col gap-1 w-full text-center md:text-left">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
              BOOKING
            </span>
            <div className="text-[18px] font-bold text-gray-900">
              30 seconds · Instant quote
            </div>
            <div className="text-[14px] text-gray-500">
              No lock-in contracts
            </div>
          </div>

          {/* Button Area */}
          <div className="flex-1 flex flex-col items-center md:items-end w-full">
            <Link
              href="/#booking"
              className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-[#FB8C42] hover:bg-[#ea6309] text-white px-8 py-4 font-bold text-[16px] shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all group mb-3"
            >
              Get an Instant Quote — 25% Off
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="text-[12px] text-gray-400 font-medium">
              Takes 30 seconds · No lock-in contracts
            </div>
          </div>
        </div>

        {/* Trust Ribbon */}
        <div className="pt-8 border-t border-gray-200/60">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-[13px] text-[#1c1917] font-medium leading-[19.5px]">
                <CheckCircle2 className="w-4 h-4 text-[#FB8C42]" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
