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
  "Standardised procedures to ensure detail on every clean",
  "Better paid cleaners + real experience = more accountability + superior service",
  "Dedicated point of contact, always responsive",
  "You walk in. It's Done"
];

export default function Difference() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">The Difference</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Most cleaning companies are inconsistent by design.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hourly pay means rushed jobs. No SOPs mean missed details. No accountability means you chase them. Crisp is built differently.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Industry Average Box */}
          <div className="flex-1 bg-[#F5F3ED] p-8 md:p-9 rounded-3xl border border-orange-100/50 flex flex-col justify-center relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-foreground">Other Cleaners</h3>
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">INDUSTRY AVERAGE</span>
            </div>
            <ul className="space-y-5">
              {industryPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-gray-200/50 rounded-full flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-muted-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-muted-foreground font-medium text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisp Cleaning Box (Visually Bigger) */}
          <div className="flex-[1.2] bg-primary p-8 md:p-9 rounded-3xl shadow-2xl flex flex-col justify-center text-white transform lg:-translate-y-4 relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-white">Crisp Cleaning</h3>
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">THE NEW STANDARD</span>
            </div>
            <ul className="space-y-6">
              {crispPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" strokeWidth={4} />
                  </div>
                  <span className="text-white font-semibold text-[15px] leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
