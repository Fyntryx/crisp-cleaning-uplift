"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden bg-[#FB8C42]/5 md:bg-[#1E1915] px-6 md:px-4 pt-32 pb-20 text-center flex flex-col items-center justify-center min-h-screen">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="hidden md:block w-full h-full object-cover object-center opacity-85">
          <source src="/hero.webm" type="video/webm" />
        </video>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center justify-center px-5 py-2 mb-10 rounded-full bg-[#FB8C42]/10 text-[#FB8C42] border border-[#FB8C42]/20 md:bg-white/10 md:text-white md:border-white/20 text-sm font-semibold tracking-[0.12em] uppercase shadow-lg md:shadow-none">
          Melbourne's most consistent home clean
        </div>

        {/* Headline */}
        <h1 className="max-w-[1150px] text-[40px] md:text-[40px] font-extrabold text-gray-900 md:text-white tracking-[-0.03em] leading-[1.1] mb-8">
          Walk in. Breathe out.
          <br />
          <span>Your home is exactly </span>
          <span className="text-[#FB8C42] relative inline-block">
            how it should be.
          </span>
        </h1>

        {/* Sub Copy */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 md:text-neutral-200 leading-relaxed mb-10">
          You shouldn't have to supervise your cleaner, explain things twice,
          or wonder if they actually showed up. Crisp delivers a consistent,
          detailed clean — every visit, without the mental load.
        </p>

        {/* CTA */}
        <Button
          size="xl"
          className="w-[calc(100%-2rem)] sm:w-auto rounded-full px-4 py-4 md:px-10 md:py-7 text-[15px] sm:text-base md:text-lg font-bold bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white shadow-[0_10px_35px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.45)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
        >
          Book Your First Clean — 15% Off
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Sub CTA */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm font-medium text-gray-500 md:text-white/70 mb-10">
          <span>Trusted by Melbourne households</span>
          <span>·</span>
          <span>Insured & vetted cleaners</span>
          <span>·</span>
          <span>30 second booking</span>
        </div>

        {/* Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-100 md:bg-white/10 md:border-white/20 rounded-full shadow-sm text-sm font-semibold text-gray-700 md:text-white">
            <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-4 h-4" />
            <span className="font-bold">4.9</span> Google
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-100 md:bg-white/10 md:border-white/20 rounded-full shadow-sm text-sm font-semibold text-gray-700 md:text-white">
            <span className="text-[#FB8C42] md:text-white font-bold">97%</span>
            same cleaner
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-100 md:bg-white/10 md:border-white/20 rounded-full shadow-sm text-sm font-semibold text-gray-700 md:text-white">
            <span className="text-[#FB8C42] md:text-white font-bold">100%</span>
            insured
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-100 md:bg-white/10 md:border-white/20 rounded-full shadow-sm text-sm font-semibold text-gray-700 md:text-white">
            <span className="text-[#FB8C42] md:text-white font-bold">30sec</span>
            booking
          </div>

        </div>
      </div>
    </section>
  );
}