import React from "react";
import { Button } from "@/components/ui/button";

export default function Guarantee() {
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Our Promise</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-12">
          If it's not right, we make it right. Simple.
        </h2>

        <div className="bg-primary p-10 md:p-16 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">100% Satisfaction Guarantee</h3>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Not satisfied with your clean? Contact us within <span className="underline underline-offset-4 decoration-white/40 font-semibold">24 hours</span>, send us a photo, and we'll be back within <span className="underline underline-offset-4 decoration-white/40 font-semibold">72 hours</span> to fix it — at no extra cost. No arguments, no awkward conversations.
            </p>
            
            <Button size="xl" className="rounded-full px-10 py-7 text-lg font-bold bg-white text-primary hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all mb-8">
              Book With Confidence
            </Button>

            <p className="text-sm text-white/80 max-w-lg mx-auto">
              Re-clean subject to access, scope and reasonable conditions.<br className="hidden sm:block" /> Full terms available at booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
