import React from "react";
import { ClipboardList, Sparkles, UserCheck, ShieldCheck, Headset, CalendarDays } from "lucide-react";

interface ServiceDifferenceProps {
  title?: string;
  subtitle?: string;
}

export default function ServiceDifference({ title, subtitle }: ServiceDifferenceProps = {}) {
  const features = [
    {
      icon: <ClipboardList className="w-5 h-5 text-[#FB8C42]" />,
      title: "Cleaned to inspection standard",
      description: "We follow the exact checklist property managers use for exit inspections. Nothing is missed, nothing is guessed."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#FB8C42]" />,
      title: "Defined SOPs, every time",
      description: "Every Vacate Clean follows the same comprehensive checklist. The result doesn't depend on who shows up — it depends on the system."
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#FB8C42]" />,
      title: "Vetted, insured, and professional",
      description: "Every cleaner is background checked, insured, and trained to Crisp's standards. They treat your property with care."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FB8C42]" />,
      title: "Bond-back guarantee",
      description: "If anything is missed, we come back within 48 hours and fix it free. Your bond is our responsibility."
    },
    {
      icon: <Headset className="w-5 h-5 text-[#FB8C42]" />,
      title: "Clear communication throughout",
      description: "ETA messages, post-clean summaries, and follow-up confirmation. You always know exactly where things stand."
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-[#FB8C42]" />,
      title: "Flexible scheduling",
      description: "We work around your move-out timeline. Book with 48 hours notice and we'll be there exactly when you need us."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-8 md:px-6 max-w-[1216px] relative z-10">

        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              WHY CRISP
            </span>
          </div>
          <h2
            style={{ maxWidth: "896px", letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            {title || "Why Melbourne tenants and property managers choose Crisp."}
          </h2>
          {subtitle && (
            <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
              {subtitle}
            </p>
          )}
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
