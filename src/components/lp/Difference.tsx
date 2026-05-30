import React from "react";
import { X, Check } from "lucide-react";

const industryPoints = [
  "No standard process, inconsistent quality",
  "Different cleaner every visit",
  "Hard to reach, slow to respond",
  "Hourly pay = rushed results",
  "Hidden fees and re-clean charges",
  "You supervise. They clean (barely)."
];

const crispPoints = [
  "Transparent pricing, no surprises",
  "Standardised procedures for consistent quality",
  "Highly vetted cleaners & active training",
  "Better paid cleaners = superior service",
  "Dedicated support, always responsive",
  "Lifetime discounts and loyalty rewards",
  "Eco-friendly, non-toxic, and kid/pet safe chemicals"
];

interface DifferenceProps {
  title?: string;
  subtitle?: string;
}

export default function Difference({ title, subtitle }: DifferenceProps = {}) {
  return (
    <section id="difference-section" className="py-28 bg-white overflow-visible">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20 shadow-sm">
              The Difference
            </span>
          </div>
          <h2 className="text-[28px] md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-6 lg:whitespace-nowrap">
            {title || "Most cleaning companies are inconsistent by design."}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle || "Hourly pay means rushed jobs. No SOPs mean missed details. No accountability means you chase them. Crisp is built differently."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-16 overflow-visible pt-10 pb-8">
          {/* Industry Average Box */}
          <div className="w-full lg:w-[460px] bg-[#F5F3ED] p-7 md:p-9 rounded-3xl border border-orange-100/30 flex flex-col relative overflow-hidden shadow-none min-h-[480px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-foreground">Other Cleaners</h3>
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">INDUSTRY AVERAGE</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-[18px]">
                {industryPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-gray-200/50 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={3} />
                    </div>
                    <span className="font-sans font-medium text-[15px] leading-relaxed text-muted-foreground antialiased text-left">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Crisp Cleaning Box (3D Popped Out Floating Card) */}
          <div className="w-full lg:w-[460px] bg-primary p-7 md:p-10 rounded-3xl shadow-[0_25px_60px_rgba(249,115,22,0.35)] flex flex-col justify-between text-white relative overflow-visible transform lg:scale-110 lg:z-10 border-4 border-orange-400/40 min-h-[480px] mt-8 lg:mt-0">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-white">Crisp Cleaning</h3>
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">THE NEW STANDARD</span>
              </div>
              <ul className="space-y-[18px]">
                {crispPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-primary" strokeWidth={4} />
                    </div>
                    <span className="font-sans font-medium text-[15px] leading-relaxed text-white antialiased">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
