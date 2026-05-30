import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function DeepCleanPlans() {
  return (
    <section className="py-20 md:py-32 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px]">
        
        {/* Header */}
        <div className="mb-14 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              CHOOSE YOUR PLAN
            </span>
          </div>
          <h2 
            style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Pick the right Deep Clean for you.
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            One-off reset or recurring monthly — same defined system, same trusted cleaner.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          
          {/* Left Card: One-Off Deep Clean */}
          <div className="relative flex flex-col bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-[18px] font-semibold text-gray-900 leading-[28px] mb-8">
              One-Off Deep Clean
            </h3>

            <div className="flex flex-col gap-2.5 mb-auto pb-10">
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                BEST FOR
              </span>
              <p className="text-[15px] text-gray-500 font-normal leading-[24px]">
                A complete reset before regular maintenance resumes
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <Link
                href="/#booking"
                className="flex items-center justify-center gap-2 w-full rounded-full px-5 py-3.5 text-[15px] font-bold bg-gray-50 text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all"
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Card: Monthly Deep Clean */}
          <div className="relative flex flex-col bg-[#1A1209] rounded-[24px] p-8 shadow-xl shadow-orange-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -top-3 left-6 bg-[#FB8C42] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-[0.1em] uppercase shadow-md">
              <Star className="w-3 h-3 fill-current" /> POPULAR
            </div>
            
            <h3 className="text-[18px] font-semibold text-white leading-[28px] mb-8 mt-2">
              Monthly Deep Clean
            </h3>

            <div className="flex flex-col gap-2.5 mb-auto pb-10">
              <span className="text-[10px] font-bold text-[#FB8C42] tracking-[0.15em] uppercase">
                BEST FOR
              </span>
              <p className="text-[15px] text-gray-300 font-normal leading-[24px]">
                Keeping your home reset to the right standard, every month
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <Link
                href="/#booking"
                className="flex items-center justify-center gap-2 w-full rounded-full px-5 py-3.5 text-[15px] font-bold bg-[#FB8C42] text-white hover:bg-[#ea6309] transition-all shadow-md shadow-[#FB8C42]/20 hover:shadow-[#FB8C42]/30"
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
