import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const frequencies = [
  {
    id: "one-off",
    title: "One-Off Clean",
    description: "First-time clients, special occasions, or filling a gap",
    isPopular: false,
    dark: false,
  },
  {
    id: "monthly",
    title: "Monthly Clean",
    description: "Maintaining a clean home with minimal effort",
    isPopular: true,
    dark: true,
  },
  {
    id: "fortnightly",
    title: "Fortnightly Clean",
    description: "Busy households who want consistent upkeep",
    isPopular: false,
    dark: false,
  },
  {
    id: "weekly",
    title: "Weekly Clean",
    description: "High-traffic homes, families, or those who want hands-off maintenance",
    isPopular: false,
    dark: false,
  }
];

export default function FrequencyCards() {
  return (
    <section className="py-20 md:py-32 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-4 max-w-[1216px]">
        
        {/* Header */}
        <div className="mb-14 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              SERVICE OPTIONS
            </span>
          </div>
          <h2 
            style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Choose how often you need us.
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            Regular Cleans are available on your schedule. The more frequently you book, the more you save.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {frequencies.map((freq) => (
            <div 
              key={freq.id} 
              className={`relative flex flex-col rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                freq.dark 
                  ? 'bg-[#1A1814] text-white shadow-xl shadow-orange-900/10' 
                  : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
              }`}
            >
              {freq.isPopular && (
                <div className="absolute -top-3 left-6 bg-[#FB8C42] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-[0.1em] uppercase shadow-md">
                  <Star className="w-3 h-3 fill-current" /> POPULAR
                </div>
              )}
              
              <h3 className={`text-[18px] font-semibold leading-[28px] mb-8 ${freq.dark ? 'text-white' : 'text-gray-900'}`}>
                {freq.title}
              </h3>

              <div className="flex flex-col gap-2.5 mb-auto pb-10">
                <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${freq.dark ? 'text-[#FB8C42]' : 'text-gray-400'}`}>
                  BEST FOR
                </span>
                <p className={`text-[15px] font-normal leading-[24px] ${freq.dark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {freq.description}
                </p>
              </div>

              <div className={`mt-auto pt-6 border-t ${freq.dark ? 'border-white/10' : 'border-gray-100'}`}>
                <Link
                  href="/#booking"
                  className={`flex items-center justify-center gap-2 w-full rounded-full px-5 py-3.5 text-[15px] font-bold transition-all ${
                    freq.dark 
                      ? 'bg-[#FB8C42] text-white hover:bg-[#ea6309]' 
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                  }`}
                >
                  <span>Get a Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-[14px] text-gray-500">
          All prices are based on a standard home configuration. Your exact quote is calculated by bedrooms and bathrooms — get yours in 30 seconds.
        </div>
      </div>
    </section>
  );
}
