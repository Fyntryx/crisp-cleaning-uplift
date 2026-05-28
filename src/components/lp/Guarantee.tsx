import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Guarantee() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[1216px]">

        {/* Guarantee Card */}
        <div
          className="relative overflow-hidden text-white"
          style={{
            backgroundColor: "rgb(251, 140, 66)",
            borderRadius: "32px",
            padding: "64px",
            boxShadow: "rgba(251, 140, 66, 0.32) 0px 8px 24px 0px, rgba(251, 140, 66, 0.18) 0px 2px 6px 0px",
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">

            {/* Shield Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 max-w-[700px] flex flex-col items-center">
              {/* Tag */}
              <div className="mb-3">
                <span className="text-white font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                  THE CRISP GUARANTEE
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
                className="text-[48px] font-semibold text-white mb-5 mt-3"
              >
                Not satisfied? We'll make it right. No questions asked.
              </h2>

              {/* Description */}
              <p className="text-[18px] text-white/90 font-normal leading-[28px] max-w-[600px] mb-8">
                Contact us within <span className="font-bold underline underline-offset-4 decoration-white/50">24 hours</span> of your clean with a photo and a description. We'll be back within <span className="font-bold underline underline-offset-4 decoration-white/50">72 hours</span> to fix it — completely free. If we can't make it right, you don't pay.
              </p>

              {/* CTA Button */}
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-8 py-4 font-bold text-[16px] hover:bg-white/90 transition-all shadow-lg mb-6"
              >
                Book With Confidence — 15% Off Your First Clean
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Disclaimer */}
              <p className="text-[14px] text-white/70 font-normal">
                Re-clean subject to access, scope, and reasonable conditions. Full terms at booking.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
