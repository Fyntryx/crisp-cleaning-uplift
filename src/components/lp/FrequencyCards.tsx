import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const frequencies = [
  {
    id: "monthly",
    title: "Monthly",
    subtitle: "BEST FOR",
    description: "Consistent maintenance.",
    isPopular: false,
    dark: false,
  },
  {
    id: "fortnightly",
    title: "Fortnightly",
    subtitle: "BEST FOR",
    description: "Most households.",
    isPopular: false,
    dark: true,
  },
  {
    id: "weekly",
    title: "Weekly",
    subtitle: "BEST FOR",
    description: "Busy families.",
    isPopular: false,
    dark: false,
  },
  {
    id: "one-off",
    title: "One-Off",
    subtitle: "BEST FOR",
    description: "A one-time reset, a special occasion, or just trying us out before committing to anything.",
    isPopular: false,
    dark: false,
  }
];

export default function FrequencyCards() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h4 className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4">
            FLEXIBLE FREQUENCY
          </h4>
          <h2 className="text-3xl md:text-[40px] font-bold text-foreground tracking-tight">
            Choose how often you need us.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {frequencies.map((freq) => (
            <div 
              key={freq.id} 
              className={`relative flex flex-col rounded-[32px] p-8 transition-transform duration-300 hover:-translate-y-1 ${
                freq.dark 
                  ? 'bg-[#1A1814] text-white shadow-xl shadow-orange-900/10' 
                  : 'bg-white text-foreground border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }`}
            >
              {freq.isPopular && (
                <div className="absolute -top-3 left-8 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-md shadow-orange-500/20">
                  Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-8">
                {freq.title}
              </h3>

              <div className="flex flex-col gap-1.5 mb-auto pb-10">
                <span className={`text-[11px] font-bold tracking-widest uppercase ${freq.dark ? 'text-gray-400' : 'text-gray-400'}`}>
                  {freq.subtitle}
                </span>
                <p className={`text-sm font-medium leading-relaxed ${freq.dark ? 'text-white' : 'text-gray-900'}`}>
                  {freq.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-dashed border-gray-200/20">
                <Link
                  href="/#booking"
                  className={`flex items-center justify-between w-full rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    freq.dark 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-gray-50 text-gray-900 hover:bg-orange-50 hover:text-primary'
                  }`}
                >
                  <span>Get a Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
