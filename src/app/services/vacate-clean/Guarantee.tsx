import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function VacateGuarantee() {
  const coveredItems = [
    "All items on the standard exit checklist",
    "Any areas flagged by property manager post-inspection",
    "Re-clean within 48 hours at no cost",
    "Refunds and credits where applicable"
  ];

  const conditions = [
    "Claim must be made within 32 hours of clean",
    "Photo evidence required",
    "Property must be vacant and accessible",
    "Scope must match original booking"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px]">
        
        {/* Guarantee Card */}
        <div
          className="relative overflow-hidden text-white flex flex-col items-center text-center p-8 md:p-[64px]"
          style={{
            backgroundColor: "rgb(251, 140, 66)",
            borderRadius: "32px",
            boxShadow: "rgba(251, 140, 66, 0.32) 0px 8px 24px 0px, rgba(251, 140, 66, 0.18) 0px 2px 6px 0px",
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none" />

          <div className="relative z-10 w-full flex flex-col items-center">
            
            {/* Shield Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            {/* Tag */}
            <div className="mb-4">
              <span className="text-white font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                THE BOND-BACK GUARANTEE
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }}
              className="text-[30px] md:text-[56px] font-semibold text-white mb-6"
            >
              We guarantee your bond back.
            </h2>

            <p className="text-[18px] text-white/95 font-normal leading-[28px] max-w-[800px] mb-12">
              If your property manager identifies anything that wasn't cleaned to standard, contact us within <span className="font-bold underline underline-offset-4 decoration-white/50">24 hours</span> with a photo and we'll be back within <span className="font-bold underline underline-offset-4 decoration-white/50">72 hours</span> to fix it — completely free. No arguments, no re-booking fees.
            </p>

            {/* Boxes Grid */}
            <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
              
              {/* Box 1: What's Covered */}
              <div className="rounded-[24px] border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
                <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.15em] mb-6 border-b border-white/20 pb-4">
                  WHAT'S COVERED
                </h4>
                <ul className="flex flex-col gap-4">
                  {coveredItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" fill="white" stroke="#FB8C42" />
                      <span className="text-[15px] font-medium text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Conditions */}
              <div className="rounded-[24px] border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
                <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.15em] mb-6 border-b border-white/20 pb-4">
                  CONDITIONS
                </h4>
                <ul className="flex flex-col gap-4">
                  {conditions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" fill="white" stroke="#FB8C42" />
                      <span className="text-[15px] font-medium text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <Link
              href="/#booking?service=Vacate"
              className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-8 py-4 font-bold text-[16px] hover:bg-white/90 transition-all shadow-lg mb-6"
            >
              Book Your Vacate Clean
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Disclaimer */}
            <p className="text-[13px] text-white/80 font-normal">
              Full terms available at booking.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
