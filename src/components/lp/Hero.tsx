import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-4 pt-32 pb-20 text-center flex flex-col items-center justify-center">

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center justify-center px-5 py-2 mb-10 rounded-full bg-orange-100 text-primary text-sm font-semibold tracking-[0.12em] uppercase">
          Melbourne's most consistent home clean
        </div>

        {/* Headline */}
        <h1 className="max-w-[1150px] text-[46px] md:text-[72px] font-extrabold text-[#140B05] tracking-[-0.03em] leading-[0.9] mb-8">
          Walk in. Breathe out.
          <br />
          <span className="whitespace-nowrap">Your home is exactly{" "}<span className="text-primary">how it</span></span>
          <br />
          <span className="text-primary">should be.</span>
        </h1>

        {/* Sub Copy */}
        <p className="max-w-2xl text-lg md:text-xl text-[#5E5A57] leading-relaxed mb-10">
          You shouldn't have to supervise your cleaner, explain things twice,
          or wonder if they actually showed up. Crisp delivers a consistent,
          detailed clean — every visit, without the mental load.
        </p>

        {/* CTA */}
        <Button
          size="xl"
          className="rounded-full px-10 py-7 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-[0_10px_35px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.45)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mb-6"
        >
          Book Your First Clean — 25% Off
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Sub CTA */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm font-medium text-[#6B6763] mb-10">
          <span>Trusted by Melbourne households</span>
          <span>·</span>
          <span>Insured & vetted cleaners</span>
          <span>·</span>
          <span>30 second booking</span>
        </div>

        {/* Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <Star className="w-4 h-4 fill-primary text-primary" />
            4.9 Google
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">97%</span>
            same cleaner
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">100%</span>
            insured
          </div>

          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">30sec</span>
            booking
          </div>

        </div>
      </div>
    </section>
  );
}