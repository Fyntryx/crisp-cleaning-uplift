"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Services from "./Services";

interface QuoteRequestPanelProps {
  headline?: React.ReactNode;
  subheadline?: string;
  contextPoints?: string[];
  seoKeyword?: string;
  variant?: "form" | "cta";
}

export default function QuoteRequestPanel({
  headline,
  subheadline,
  variant = "form",
}: QuoteRequestPanelProps) {
  const defaultHeadline = (
    <>
      Get Your <span className="text-primary">Instant</span> Price in Seconds
    </>
  );

  const defaultSubheadline =
    "Transparent pricing. No hidden fees. Book online immediately.";

  const renderHeadline = headline || defaultHeadline;
  const renderSubheadline = subheadline !== undefined ? subheadline : defaultSubheadline;

  return (
    <section id="booking" className="relative py-12 md:py-20 overflow-hidden bg-gray-50/30">
      {/* Subtle Background Pattern & Gradient */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom duration-700">
          
          {/* Headline */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-bold leading-tight text-gray-900 mb-4 tracking-tight">
              {renderHeadline}
            </h2>
            {renderSubheadline && (
              <p className="text-[15px] md:text-[16px] text-gray-600 font-medium leading-[24px] font-sans antialiased">
                {renderSubheadline}
              </p>
            )}
          </div>

          {variant === "cta" ? (
            /* Standalone Dark CTA Box */
            <div className="w-full max-w-md mx-auto bg-[#14120F] rounded-[32px] p-8 text-center text-white border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-3 relative z-10">
                <span>Takes 30 seconds</span>
                <span>·</span>
                <span>No lock-in contracts</span>
              </div>

              <p className="text-base font-semibold text-white mb-8 relative z-10">
                Your quote is calculated instantly based on your home size.
              </p>

              <Link href="/#booking" className="inline-flex w-full items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all group relative z-10">
                Get a quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            /* Interactive Booking Form */
            <div className="relative w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-[#FB8C42]/10 rounded-[2.5rem] blur-xl opacity-40 z-0"></div>
              <div className="relative z-10 w-full">
                <Services />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
