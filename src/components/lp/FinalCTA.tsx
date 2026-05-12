import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#1E1915] text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Your home won't clean itself.<br />
          <span className="text-primary">But we will.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Every week without a system is another week of catching up. Crisp has limited weekly slots per cleaner — once they're gone, they're gone.
        </p>

        <div className="inline-flex items-center justify-center px-6 py-2 mb-8 rounded-full bg-orange-100/10 text-orange-200 text-sm font-semibold tracking-wide border border-orange-500/30">
          25% off your first clean — code WELCOME25
        </div>

        <Button size="xl" className="rounded-full px-12 py-7 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all mb-8 w-full sm:w-auto">
          Claim Your First Clean
        </Button>

        <div className="flex items-center gap-2 text-sm text-orange-300 font-medium mb-8">
          <Zap className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span>Limited slots available this week across Melbourne</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/60 font-medium">
          <span>Takes 30 seconds</span>
          <span className="hidden sm:inline">·</span>
          <span>No lock-in contracts</span>
          <span className="hidden sm:inline">·</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
