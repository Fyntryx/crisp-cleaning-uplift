import React from "react";
import { Briefcase, PawPrint, Home, UserCheck } from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "Busy professionals",
    description: "You work long hours. The last thing you want is to spend your weekend cleaning. A fortnightly Crisp clean means you come home to a house that's already done."
  },
  {
    icon: PawPrint,
    title: "Families with kids or pets",
    description: "High-traffic homes need more frequent attention. We use eco-friendly, non-toxic products that are safe for kids and pets — no compromises."
  },
  {
    icon: Home,
    title: "Rental properties",
    description: "Keep your property in top condition between tenancies or for regular inspections. Consistent cleaning protects your asset and your tenant relationship."
  },
  {
    icon: UserCheck,
    title: "Never had a cleaner before",
    description: "Not sure what to expect? We handle everything — same cleaner every time, clear communication, and a guarantee if anything isn't right. Zero stress from the start."
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
            Built for Melbourne households like yours.
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            A Regular Clean isn't just for people with big homes. It's for anyone who wants their time back.
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
