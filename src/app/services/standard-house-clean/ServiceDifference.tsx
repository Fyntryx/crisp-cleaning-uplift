import React from "react";
import { Users, CircleDollarSign, ClipboardList, ShieldCheck, Headset, Leaf } from "lucide-react";

interface ServiceDifferenceProps {
  title?: string;
  subtitle?: string;
}

export default function ServiceDifference({ title, subtitle }: ServiceDifferenceProps = {}) {
  const features = [
    {
      icon: <Users className="w-5 h-5 text-[#FB8C42]" />,
      title: "Same cleaner, every visit",
      description: "We assign you a dedicated cleaner who learns your home. 90% same-cleaner consistency rate. No re-explaining. No surprises."
    },
    {
      icon: <CircleDollarSign className="w-5 h-5 text-[#FB8C42]" />,
      title: "Flat rate pay, not hourly",
      description: "Unlike competitors who pay hourly and incentivise rushing, we pay flat rate. Your cleaner's incentive is quality, not speed."
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-[#FB8C42]" />,
      title: "Standardised SOPs, not guesswork",
      description: "Every clean follows a defined checklist. The result is identical whether it's your first clean or your fiftieth."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FB8C42]" />,
      title: "Vetted, insured, and trained",
      description: "Every cleaner is background checked, insured, and trained to Crisp's service and customer standards before entering your home."
    },
    {
      icon: <Headset className="w-5 h-5 text-[#FB8C42]" />,
      title: "A single point of contact",
      description: "You deal with one person, always. Your cleaner handles only the clean. All communication, changes, and support go through us directly."
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#FB8C42]" />,
      title: "Eco-friendly by default",
      description: "Non-toxic, kid and pet-safe products as standard. If something stronger is needed, your cleaner will ask first."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div style={{ maxWidth: "1216px", paddingLeft: "-0px", paddingRight: "32px" }} className="mx-auto relative z-10">

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
                  style={{ fontSize: "18px", fontWeight: 600, lineHeight: "28px", width: "514.667px", maxWidth: "100%" }}
                  className="text-gray-900"
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