import React from "react";
import { Key, Building2, Home, Star } from "lucide-react";

const audiences = [
  {
    icon: Key,
    title: "Tenants moving out",
    description: "You need your bond back. We clean to the exact standard property managers expect — every room, every surface, every detail on the exit checklist. Our bond-back guarantee means if anything is missed, we come back and fix it free.",
    isMostCommon: true
  },
  {
    icon: Building2,
    title: "Property managers",
    description: "You need the property inspection-ready, fast. We work to your schedule, follow a defined checklist, and communicate clearly throughout. No chasing, no follow-up headaches."
  },
  {
    icon: Home,
    title: "Homeowners selling",
    description: "First impressions matter. A professionally cleaned home photographs better, presents better, and sells faster. We make sure every room is at its best before the agent or buyers walk through."
  }
];

export default function WhoItsFor() {
  return (
    <section className="py-24 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-4 max-w-[1216px]">
        
        {/* Header Section */}
        <div className="mb-14 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              WHO IT'S FOR
            </span>
          </div>
          <h2 
            style={{ maxWidth: "896px", letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Moving out, managing a <br className="hidden md:block"/> property, or selling up?
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            Crisp's Vacate Clean is built for every end-of-tenancy situation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index} 
                className={`rounded-[24px] p-8 relative flex flex-col transition-all duration-300 ${
                  audience.isMostCommon 
                    ? "bg-[#1A1209] text-white shadow-xl mt-4 md:mt-0" 
                    : "bg-white shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-gray-100 text-gray-900 hover:shadow-lg mt-4 md:mt-0"
                }`}
              >
                {audience.isMostCommon && (
                  <div className="absolute -top-3 left-8 bg-[#FB8C42] text-white px-3 py-1 rounded-md text-[10px] font-bold tracking-wider flex items-center gap-1.5 uppercase z-10 shadow-sm">
                    <Star className="w-3 h-3 fill-white" /> MOST COMMON
                  </div>
                )}

                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mb-8 transition-colors duration-300 ${
                  audience.isMostCommon ? "bg-[#FB8C42] text-white" : "bg-[#FFF5EE] text-[#FB8C42]"
                }`}>
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className={`text-[18px] font-bold leading-[28px] mb-3 ${
                  audience.isMostCommon ? "text-white" : "text-gray-900"
                }`}>
                  {audience.title}
                </h3>
                <p className={`text-[15px] leading-[26px] font-normal ${
                  audience.isMostCommon ? "text-white/80" : "text-gray-500"
                }`}>
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
