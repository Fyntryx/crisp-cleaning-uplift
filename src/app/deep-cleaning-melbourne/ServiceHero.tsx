"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceLeadForm from "@/components/ServiceLeadForm";

interface ServiceHeroProps {
  googleRatingValue?: number;
}

export default function ServiceHero({ googleRatingValue = 5.0 }: ServiceHeroProps = {}) {
  const trustItems = [
    "Insured & Vetted",
    "Same Cleaner Every Visit",
    "72hr Re-clean Guarantee",
    "Eco-Friendly Products",
    `${googleRatingValue} ★ on Google`,
  ];

  return (
    <section className="relative bg-[#FDF8F4] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px] pt-32 md:pt-40 pb-8">

        {/* Main Content */}
        <div className="max-w-[896px] mx-auto text-center mb-12">
          <div className="flex justify-center w-full mb-4">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Deep Cleaning", href: "/deep-cleaning-melbourne" }
            ]} />
          </div>

          {/* Badge */}
          <div className="mb-6 mt-4">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              DEEP HOUSE CLEANING · MELBOURNE
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }}
            className="text-[48px] md:text-[64px] font-semibold text-gray-900 mb-5 mt-3 mx-auto"
          >
            Your home, reset to the <br className="hidden md:block" />
            standard <span className="text-[#FB8C42]">it deserves.</span>
          </h1>

          {/* Description */}
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[800px] mx-auto">
            A Crisp Deep Clean goes beyond the surface. Every room. Every corner. <br className="hidden md:block" />
            Every detail — done properly, with a defined system and a cleaner who<br className="hidden md:block" />
            takes pride in the result.
          </p>
        </div>

        {/* CTA Box (Wide White Bar) */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col max-w-5xl mx-auto mb-12 relative overflow-visible">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-[14px] py-[6px] rounded-full bg-[#FB8C42] text-white text-[10px] font-bold tracking-[0.08em] uppercase shadow-md whitespace-nowrap z-10">
            First Clean — 5% Off
          </div>

          <ServiceLeadForm 
            serviceType="Deep" 
            theme="light" 
            layout="horizontal" 
            buttonText="Get My Instant Quote" 
          />
        </div>

        {/* Trust Ribbon */}
        <div className="pt-8 border-t border-gray-200/60">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-[13px] text-[#1c1917] font-medium leading-[19.5px]">
                <CheckCircle2 className="w-4 h-4 text-[#FB8C42]" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
