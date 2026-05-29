import React from "react";
import { UserCheck, CircleDollarSign, ClipboardList, ShieldCheck, Leaf, Sprout } from "lucide-react";

interface ServiceDifferenceProps {
  title?: string;
  subtitle?: string;
}

export default function ServiceDifference({ title, subtitle }: ServiceDifferenceProps = {}) {
  const features = [
    {
      icon: <UserCheck className="w-5 h-5 text-[#FB8C42]" />,
      title: "Same cleaner assigned to you",
      description: "You'll know exactly who's coming. We maintain notes on your home so nothing gets missed and nothing needs re-explaining."
    },
    {
      icon: <CircleDollarSign className="w-5 h-5 text-[#FB8C42]" />,
      title: "Flat rate pay, not hourly",
      description: "Competitors pay hourly and incentivise rushing. We pay flat rate. Your cleaner's incentive is quality, not speed."
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-[#FB8C42]" />,
      title: "Standardised SOPs",
      description: "Every Deep Clean follows an identical checklist. The result doesn't depend on who shows up — it depends on the system."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FB8C42]" />,
      title: "Vetted, insured, and trained",
      description: "Background checked, insured, and trained to Crisp's standards before entering your home. Customer service is part of the KPIs."
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#FB8C42]" />,
      title: "Eco-friendly by default",
      description: "Non-toxic, kid and pet-safe products as standard. Stronger chemicals only used if needed and approved by you first."
    },
    {
      icon: <Sprout className="w-5 h-5 text-[#FB8C42]" />,
      title: "48hr re-clean guarantee",
      description: "Not satisfied? We come back within 48 hours and fix it. Free. No arguments."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 max-w-[1216px] relative z-10">

        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              THE CRISP DIFFERENCE
            </span>
          </div>
          <h2
            style={{ maxWidth: "896px", letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            {title || "Why this isn't like every other cleaning service you've tried."}
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            {subtitle || "Most cleaners are inconsistent because the model incentivises it. Crisp is built differently."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ columnGap: "0px", rowGap: "0px" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-5 py-6 px-4 w-full group rounded-2xl border border-transparent hover:border-orange-100 hover:bg-orange-50/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 bg-[#FFF5EE] group-hover:bg-[#FB8C42] rounded-xl flex items-center justify-center mt-0.5 transition-colors duration-300">
                {React.cloneElement(feature.icon, {
                  className: "w-5 h-5 text-[#FB8C42] group-hover:text-white transition-colors duration-300"
                })}
              </div>
              <div className="flex flex-col gap-1">
                <h3
                  className="text-[18px] font-semibold leading-[28px] text-gray-900"
                >
                  {feature.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-[24px] font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}