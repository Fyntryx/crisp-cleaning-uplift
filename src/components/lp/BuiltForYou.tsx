import React from "react";
import { Package, ShieldCheck, Smartphone, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "We supply everything."
  },
  {
    icon: ShieldCheck,
    title: "Insured, vetted & trained."
  },
  {
    icon: Smartphone,
    title: "Book & manage online."
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction guarantee."
  }
];

export default function BuiltForYou() {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="mb-12">
          <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4 block">
            Why Crisp
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-foreground tracking-tight max-w-xl">
            Built for Melbourne households like yours.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col gap-6"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
