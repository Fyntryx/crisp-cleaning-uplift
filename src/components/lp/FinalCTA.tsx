import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tag, Clock, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  title?: React.ReactNode;
  discountText?: string;
}

export default function FinalCTA({ title, discountText }: FinalCTAProps) {
  return (
    <section className="pt-12 pb-24 bg-[#FAF9F6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {/* Rounded Charcoal/Grid Card */}
        <div 
          className="relative rounded-[32px] md:rounded-[40px] bg-[#14120F] text-white p-12 md:p-20 overflow-hidden shadow-2xl border border-white/5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        >
          {/* Radial Ambient Corner Glows */}
          <div className="absolute -bottom-36 -right-36 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-36 -left-36 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pre-header */}
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-[0.2em] uppercase mb-6">
              LIMITED WEEKLY SLOTS
            </span>

            {/* Main Header with orange accent */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-2xl">
              {title || (
                <>
                  Your home won't clean itself. <span className="text-primary">But we will.</span>
                </>
              )}
            </h2>
            
            {/* Subtext */}
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Every week without a system is another week of catching up. Crisp has limited weekly slots per cleaner — once they're gone, they're gone.
            </p>

            {/* Configured Promo and Info Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl sm:rounded-full px-5 py-2.5 mb-10 text-xs md:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span>{discountText || "15% off your first clean. Use code"}</span>
                <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide">WELCOME15</span>
              </div>
              <span className="hidden sm:inline text-white/20">|</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Limited slots available this week across Melbourne.</span>
              </div>
            </div>

            {/* Glowing Action Button */}
            <Link href="/#booking" className="mb-8 inline-block">
              <Button size="xl" className="rounded-full px-8 md:px-12 py-7 text-[16px] md:text-lg font-bold bg-primary hover:bg-primary/95 text-white shadow-[0_0_30px_rgba(249,115,22,0.45)] hover:shadow-[0_0_40px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group w-auto mx-auto">
                Claim Your First Clean
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            {/* Bottom trust footer */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-white/40 font-medium">
              <span>Takes 30 seconds</span>
              <span className="hidden sm:inline text-white/10">·</span>
              <span>No lock-in contracts</span>
              <span className="hidden sm:inline text-white/10">·</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
