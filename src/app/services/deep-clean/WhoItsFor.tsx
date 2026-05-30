import React from "react";
import { Sparkles, RotateCcw, Truck, CalendarHeart } from "lucide-react";

const audiences = [
  {
    icon: Sparkles,
    title: "New to professional cleaning",
    description: "Start with a Deep Clean to establish a proper baseline, then switch to a Regular Clean to maintain it. The right way to begin."
  },
  {
    icon: RotateCcw,
    title: "Getting back on track",
    description: "Life gets busy. If it's been a while since your last professional clean, a Deep Clean gets everything back to standard before regular maintenance resumes."
  },
  {
    icon: Truck,
    title: "Just moved in",
    description: "Before you unpack, make sure the home is genuinely clean — not just surface clean. A Deep Clean covers everything the previous occupants left behind."
  },
  {
    icon: CalendarHeart,
    title: "Hosting or recovering",
    description: "Preparing for family, an inspection, or recovering after a renovation. A Deep Clean handles the detail work so you don't have to."
  }
];

export default function WhoItsFor() {
  return (
    <section className="py-24 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px]">
        
        {/* Header Section */}
        <div className="mb-14 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              WHO IT'S FOR
            </span>
          </div>
          <h2 
            style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Is a Deep Clean right for you?
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            A Deep Clean isn't just for messy homes. It's the smart starting point for anyone who wants a genuine reset.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#FFF5EE] rounded-xl flex items-center justify-center text-[#FB8C42] shrink-0 mb-6 transition-colors duration-300">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-[18px] font-semibold leading-[28px] text-gray-900 mb-2">
                  {audience.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-[24px] font-normal">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
