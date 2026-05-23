"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, X, Plus } from "lucide-react";

const tabs = ["Standard", "Deep", "Vacate"];

const tabDescriptions = {
  "Standard": "Every Crisp clean follows a defined room-by-room checklist so nothing gets missed and nothing gets glossed over.",
  "Deep": "A meticulous reset — built for first cleans, seasonal refreshes and special occasions.",
  "Vacate": "Bond-back ready cleans aligned to Australian end-of-lease standards.",
  "Add-ons": "Customise any clean with extra detail where it counts most."
};

type ChecklistData = {
  inclusions: Record<string, string[]>;
  exclusions: string[];
};

const checklistData: Record<string, ChecklistData> = {
  Standard: {
    inclusions: {
      "General Areas": [
        "Light organisation / tidy up",
        "Cobweb removal",
        "Empty bins",
        "Dust/wipe reachable surfaces",
        "Dust sills, doors, skirting, and switches",
        "Mirrors cleaned",
        "Blinds (light dust)",
        "Air freshen / deodorise"
      ],
      "Floors": [
        "Vacuum accessible floors",
        "Mop hard floors"
      ],
      "Bedrooms": [
        "Light tidy & bed straighten",
        "Dust / wipe all surfaces",
        "Vacuum / mop floors",
        "Light switches & power points",
        "Dust Blinds"
      ],
      "Bathroom": [
        "Clean bath, shower, sink, toilet",
        "Mirrors cleaned",
        "Benches & surfaces wiped",
        "Cupboards (exterior)",
        "Empty bins"
      ],
      "Kitchen": [
        "Benches, splashback, surfaces",
        "Light stovetop / rangehood wipe",
        "Sink cleaned",
        "Appliances (exterior)",
        "Cupboards (exterior)"
      ]
    },
    exclusions: [
      "Extensive organisation / declutter",
      "Deep clean of sills, doors, and skirting",
      "Extensive wall spot cleaning / adhesive removal",
      "Detailed window tracks / sills",
      "Windows (interior)",
      "Ceiling fan / top edge dusting",
      "Deep floor cleaning and scrubbing (incl. edges)",
      "Under furniture / bed vacuum",
      "Door frames & detailed surfaces",
      "Interior windows",
      "Deep scrub (shower, bath, sink, toilet)",
      "Tapware/chrome polished",
      "Grout/tile scrubbing (incl. complete mould removal)",
      "Exhaust fan cleaning",
      "Tapware polished",
      "Stainless steel polished"
    ]
  },
  Deep: {
    inclusions: {
      "General Areas": [
        "Wipe sills, doors, and skirting",
        "Move light furniture",
        "Wall spot cleaning",
        "Window tracks / sills (detailed)",
        "Light organisation / tidy up",
        "Cobweb removal",
        "Empty bins",
        "Dust/wipe reachable surfaces",
        "Dust sills, doors, skirting, and switches",
        "Mirrors cleaned",
        "Blinds (light dust)",
        "Air freshen / deodorise"
      ],
      "Floors": [
        "Vacuum accessible floors (incl. under furniture)",
        "Mop hard floors",
        "Deep floor cleaning (incl. edges)"
      ],
      "Bedrooms": [
        "Under-bed / furniture vacuum",
        "Door frames & detailed surfaces",
        "Interior windows / sills",
        "Light tidy & bed straighten",
        "Dust / wipe all surfaces",
        "Vacuum / mop floors",
        "Light switches & power points",
        "Dust Blinds"
      ],
      "Bathroom": [
        "Deep scrub (shower, bath, sink)",
        "Grout / tile scrubbing (incl. mould removal)",
        "Tapware/Chrome polished",
        "Mirrors cleaned",
        "Benches & surfaces wiped",
        "Cupboards (exterior)",
        "Empty bins"
      ],
      "Kitchen": [
        "Tapware polished",
        "Stainless steel polished",
        "Benches, splashback, surfaces",
        "Light stovetop / rangehood wipe",
        "Sink cleaned",
        "Appliances (exterior)",
        "Cupboards (exterior)"
      ]
    },
    exclusions: [
      "Detailed interior windows (light wipe down included)",
      "Ceiling fan / top edge dusting",
      "Adhesive / tape / scuff removal",
      "Exhaust fan cleaning"
    ]
  },
  Vacate: {
    inclusions: {
      "General Areas": [
        "Windows (interior)",
        "Laundry",
        "Adhesive/tape/scuff removal",
        "Ceiling fan / top edge dusting",
        "Garages - light sweep",
        "Cobweb removal",
        "Empty bins",
        "Dust/wipe reachable surfaces",
        "Dust sills, doors, skirting, and switches",
        "Mirrors cleaned",
        "Blinds (light dust)",
        "Air freshen / deodorise",
        "Wipe sills, doors, and skirting",
        "Move light furniture",
        "Wall spot cleaning",
        "Window tracks / sills (detailed)"
      ],
      "Floors": [
        "Vacuum accessible floors (incl. under furniture)",
        "Mop hard floors",
        "Deep floor cleaning (incl. edges)"
      ],
      "Bedrooms": [
        "Inside drawers / cabinets / wardrobes",
        "Under-bed / furniture vacuum",
        "Door frames & detailed surfaces",
        "Interior windows / sills",
        "Dust / wipe all surfaces",
        "Vacuum / mop floors",
        "Light switches & power points",
        "Dust Blinds"
      ],
      "Bathroom": [
        "Exhaust fan cleaning",
        "Inside drawers / cabinets",
        "Deep scrub (shower, bath, sink)",
        "Grout / tile scrubbing (incl. mould removal)",
        "Tapware/Chrome polished",
        "Mirrors cleaned",
        "Benches & surfaces wiped",
        "Cupboards (exterior)",
        "Empty bins"
      ],
      "Kitchen": [
        "Microwave (interior)",
        "Inside drawers / cabinets",
        "Light stovetop / rangehood wipe (incl. vent dusting)",
        "Tapware polished",
        "Stainless steel polished",
        "Benches, splashback, surfaces",
        "Light stovetop / rangehood wipe",
        "Sink cleaned",
        "Appliances (exterior)",
        "Cupboards (exterior)"
      ]
    },
    exclusions: [
      "Organisation (home should be empty)",
      "Deep garage clean (light clean included)",
      "Tidy / straighten bed (home should be empty)"
    ]
  },
  "Add-ons": {
    inclusions: {
      "AVAILABLE ADD-ONS": [
        "Steam Cleaning",
        "Windows",
        "Walls",
        "Cabinets (interior)",
        "Organisation",
        "Blinds",
        "Oven/stovetop",
        "Fridge",
        "Dishwasher",
        "Microwave",
        "Balcony",
        "Ceiling (incl. fans)"
      ]
    },
    exclusions: []
  }
};

export default function Checklist({ 
  defaultTab = "Standard", 
  title, 
  topTitle,
  subtitle,
  layout = "center",
  availableTabs
}: { 
  defaultTab?: string; 
  title?: string; 
  topTitle?: string; 
  subtitle?: string;
  layout?: "center" | "left";
  availableTabs?: string[];
}) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const currentData = checklistData[activeTab];

  return (
    <section id="checklist" className="py-24 bg-[#FAF9F6]">
      <div className={`container mx-auto px-4 ${layout === "left" ? "max-w-[1216px]" : "max-w-5xl"}`}>
        <div className={`mb-12 ${layout === "left" ? "max-w-[896px]" : "text-center"}`}>
          {layout === "left" ? (
            <div className="mb-3">
              <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                {topTitle !== undefined ? topTitle : "WHAT'S INCLUDED"}
              </span>
            </div>
          ) : (
            <h4 className="text-[#FB8C42] font-bold tracking-[0.2em] text-[11px] uppercase mb-4">
              {topTitle !== undefined ? topTitle : "The Checklist"}
            </h4>
          )}
          <h2 
            style={layout === "left" ? { letterSpacing: "-1.2px", lineHeight: "48px" } : undefined}
            className={`text-4xl md:text-[48px] text-gray-900 mb-5 ${layout === "left" ? "font-semibold mt-3" : "font-extrabold tracking-tight leading-[1.15]"}`}
          >
            {title || "Nothing is assumed. Everything is covered."}
          </h2>
          <p className={`${layout === "left" ? "text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]" : "text-lg md:text-[19px] text-gray-500 max-w-[700px] leading-relaxed min-h-[56px] mx-auto"}`}>
            {subtitle || tabDescriptions[activeTab as keyof typeof tabDescriptions]}
          </p>
        </div>

        {/* Tabs Container */}
        {(!availableTabs || availableTabs.length > 1) && (
          <div className="inline-flex items-center p-1.5 bg-white border border-orange-100 rounded-full mb-10 shadow-sm overflow-x-auto max-w-full">
            {(availableTabs ? tabs.filter(t => availableTabs.includes(t)) : tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-sm"
                    : "bg-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-transparent animate-fade-in flex flex-col md:flex-row gap-12">
          
          {/* Inclusions Column */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
              Inclusions
            </h3>
            
            <div className="flex flex-col gap-10">
              {Object.entries(currentData.inclusions).map(([category, items], idx) => (
                <div key={idx}>
                  <h4 className="text-[13px] font-bold text-primary uppercase tracking-[0.1em] mb-5">
                    {category}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] text-gray-700">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 relative">
            {/* Exclusions */}
            {currentData.exclusions.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Exclusions
                </h3>
                <ul className="flex flex-col gap-4 text-[14px] text-gray-500">
                  {currentData.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-gray-400" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add-ons */}
            {isHomePage && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Add-ons
                </h3>
                <ul className="flex flex-col gap-4 text-[14px] text-gray-500">
                  {checklistData["Add-ons"].inclusions["AVAILABLE ADD-ONS"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Plus className="w-3 h-3 text-primary" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        <div className="mt-16 text-center text-sm font-medium text-gray-500 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          Want to add something specific? Just mention it when you book. We'll take care of it.
        </div>
      </div>
    </section>
  );
}
