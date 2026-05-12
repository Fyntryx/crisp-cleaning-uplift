import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#FAF9F6] flex flex-col items-center justify-center text-center px-4">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-orange-100 text-primary text-sm font-semibold tracking-wide uppercase">
          Melbourne's most consistent home clean
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
          Walk in. Breathe out.<br />
          Your home is exactly <span className="text-primary">how it should be.</span>
        </h1>

        {/* Sub-copy */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          You shouldn't have to supervise your cleaner, explain things twice, or wonder if they actually showed up. Crisp delivers a consistent, detailed clean — every visit, without the mental load.
        </p>

        {/* CTA Button */}
        <Button size="xl" className="rounded-full px-10 py-7 text-lg font-bold shadow-[0_8px_30px_rgb(249,115,22,0.3)] hover:shadow-[0_8px_40px_rgb(249,115,22,0.4)] hover:-translate-y-1 transition-all mb-6 bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          Book Your First Clean — 25% Off <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Sub CTA Text */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm font-medium text-muted-foreground mb-10">
          <span>Trusted by Melbourne households</span>
          <span>·</span>
          <span>Insured & vetted cleaners</span>
          <span>·</span>
          <span>30 second booking</span>
        </div>

        {/* Trust Indicators (Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-50 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <Star className="w-4 h-4 fill-primary text-primary" />
            4.9 Google
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-50 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">90%</span> same cleaner
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-50 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">48hr</span> re-clean
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-orange-50 rounded-full shadow-sm text-sm font-semibold text-foreground">
            <span className="text-primary">30sec</span> booking
          </div>
        </div>
      </div>
    </section>
  );
}
