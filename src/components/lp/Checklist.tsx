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
  exclusions: Record<string, string[]>;
  addons?: string[];
};

const standardAddons = [
  "Windows",
  "Walls",
  "Cabinets (interior)",
  "Blinds (detailed cleanse)",
  "Organisation",
  "Fridge (empty + defrosted)",
  "Oven (interior)",
  "Dishwasher (interior)",
  "Microwave (interior)",
  "Balcony",
  "Ceiling (incl. fans and vents)"
];

const checklistData: Record<string, ChecklistData> = {
  Standard: {
    addons: standardAddons,
    inclusions: {
      "General Areas": [
        "Light organisation / tidy up",
        "Empty bins",
        "Dust sills, doors, skirting, switches",
        "Blinds (light dust)",
        "Cobweb removal",
        "Dust/spot wipe reachable surfaces",
        "Mirrors cleaned streak-free",
        "Air freshen / deodorise"
      ],
      "Floors": [
        "Vacuum accessible floors",
        "Mop hard floors"
      ],
      "Bedrooms": [
        "Light tidy & bed straighten",
        "Bed made (if linen provided)",
        "Vacuum / mop floors",
        "Dust blinds",
        "Dust / wipe all surfaces",
        "Light switches & powerpoints"
      ],
      "Bathrooms": [
        "Descale bath, shower, sink, toilet (no scrubbing)",
        "Benches & surfaces wiped",
        "Empty bins",
        "Mirrors cleaned",
        "Cupboards (exterior)"
      ],
      "Kitchen": [
        "Benches, splashback, surfaces",
        "Sink cleaned",
        "Cupboards (exterior)",
        "Light stovetop / rangehood wipe",
        "Appliances (exterior)",
        "Bin emptied"
      ]
    },
    exclusions: {
      "General Areas": [
        "Extensive organisation / declutter",
        "Deep clean of sills, doors, and skirting",
        "Wall spot cleaning / adhesive removal",
        "Detailed window tracks / sills",
        "Windows",
        "Ceiling fan / top edge dusting",
        "Excessive build up - mould, grease, soap scum, limescale, pet hair, stains, rust"
      ],
      "Floors": [
        "Deep floor cleaning and scrubbing (incl. edges)",
        "Under furniture"
      ],
      "Bedrooms": [
        "Under furniture / bed vacuum",
        "Door frames & detailed surfaces"
      ],
      "Bathrooms": [
        "Deep scrub (shower, bath, sink, toilet)",
        "Tapware/chrome polish",
        "Grout/tile scrubbing (incl. mould removal)",
        "Exhaust fan cleaning"
      ],
      "Kitchen": [
        "Tapware polish",
        "Stainless steel polish",
        "Full degrease and exhaust fans",
        "Pantry interior",
        "Cabinet & appliances (interior)",
        "Dishwashing"
      ]
    }
  },
  Deep: {
    addons: standardAddons,
    inclusions: {
      "General Areas": [
        "Light tidy / organisation",
        "Remove all cobwebs",
        "Empty all accessible bins",
        "Bin exterior",
        "Sills, doors, & skirting boards wiped",
        "Door frames & detailed surfaces",
        "Light switches & power points",
        "Mirrors cleaned streak-free",
        "Blinds - light dust",
        "Air freshen / deodorise"
      ],
      "Floors": [
        "Vacuum all accessible floors, including under furniture",
        "Edge vacuuming throughout",
        "Mop all hard floors & spot scrubbing"
      ],
      "Bedrooms": [
        "Light tidy and presentation",
        "Change beds (where linen provided)",
        "Thorough wipe / dust all reachable surfaces",
        "Door frames & detailed surfaces",
        "Light switches & power points",
        "Blinds - light dust",
        "Under bed vacuum"
      ],
      "Bathrooms": [
        "Deep scrub - shower, bath, sink",
        "Full toilet clean and disinfect - seat, bowl, hinges, and base",
        "Shower screen / glass - soap scum removal",
        "Grout and tile scrubbing (incl. surface mould treatment)",
        "Drains cleared (no plumbing)",
        "Tapware descaled and buffed",
        "Mirrors cleaned streak free",
        "Benches and vanity surfaces"
      ],
      "Kitchen": [
        "Light tidy (incl. loading existing dishes into dishwasher)",
        "Benches and splashback degreased",
        "Stovetop degreased (trivets/grates lifted)",
        "Rangehood exterior degreased",
        "Sink and drain deep cleaned",
        "Appliance exteriors",
        "Cupboard and draw fronts",
        "Bins emptied & exterior wiped"
      ]
    },
    exclusions: {
      "General Areas": [
        "Moving light furniture",
        "Wall spot cleaning",
        "Interior windows & detailed blinds (add-on)",
        "Ceilings, fans, vents, & top edge dusting (add-on)",
        "Garage"
      ],
      "Bathrooms": [
        "Full descale & polish of all chrome/stainless"
      ],
      "Kitchen": [
        "Dishwashing",
        "Rangehood filter/vents",
        "Cabinet, cupboard, drawer interior",
        "Pantry interior",
        "Appliance interior (oven, fridge, microwave, etc)"
      ]
    }
  },
  Vacate: {
    addons: [
      "Windows (discounted)",
      "Walls",
      "Blinds (detailed cleanse)",
      "Fridge (empty + defrosted)",
      "Oven (interior)",
      "Dishwasher (interior)",
      "Microwave (interior)",
      "Balcony"
    ],
    inclusions: {
      "General Areas": [
        "Light tidy / organisation",
        "Remove all cobwebs",
        "Empty all accessible bins",
        "Bin exterior & emptied",
        "Sills, doors, & skirting boards wiped",
        "Door frames & detailed surfaces",
        "Light switches, power points, and door handles",
        "Mirrors cleaned streak-free",
        "Blinds - light dust",
        "Air freshen / deodorise",
        "Full dust / wipe all reachable surfaces",
        "Light fittings & shades dusted/wiped",
        "Air vents & return-air grilles",
        "Ceiling fans, cornices, & top edge dusted",
        "Wall spot cleaning",
        "Windows and blinds as itemised at booking",
        "Sliding door tracks",
        "Move furniture (where safe)",
        "Front entry presentation"
      ],
      "Floors": [
        "Vacuum all accessible floors, including under remaining furniture",
        "Edge vacuuming throughout",
        "Mop all hard floors thoroughly, grout-line attention & spot scrubbing"
      ],
      "Bedrooms": [
        "Light tidy and presentation",
        "Change beds (where linen provided)",
        "Thorough wipe / dust all reachable surfaces",
        "Doors, door frames & detailed surfaces",
        "Door handles, light switches & power points",
        "Blinds - light dust",
        "Under bed vacuum",
        "Wardrobe & interiors"
      ],
      "Bathrooms": [
        "Deep scrub - shower, bath, sink",
        "Full toilet clean and disinfect - seat, bowl, hinges, and base",
        "Shower screen / glass - soap scum removal",
        "Grout and tile scrubbing (incl. surface mould treatment)",
        "Drains cleared (no plumbing)",
        "Tapware and chrome - full descale and polish",
        "Mirrors cleaned streak free",
        "Benches and vanity surfaces",
        "Cupboard exteriors full wipe",
        "Skirting, door, and frame wiped",
        "Behind & beside toilet - cistern, floor, and reachable wall",
        "Cabinet & drawer interiors and exterior",
        "Exhaust fan & air vents"
      ],
      "Kitchen": [
        "Benches and splashback degreased",
        "Stovetop degreased (trivets/grates lifted)",
        "Rangehood exterior degreased (incl. removable filters)",
        "Sink and drain deep cleaned",
        "Appliance exteriors",
        "Cupboard and draw fronts",
        "Bins emptied & exterior wiped",
        "Cupboard, drawer, & pantry interior (empty)",
        "Cupboard tops & kickboards",
        "Tapware & stainless steel - full descale and polish"
      ]
    },
    exclusions: {
      "General Areas": [
        "Organisation, bed-making, or tidying (home should be empty)",
        "Windows (add-on)",
        "Full walls (spot cleaning included)",
        "Ceiling stain removal",
        "Deep garage clean (light sweep included)"
      ],
      "Kitchen": [
        "Oven, fridge, microwave, dishwasher interior (add-ons)"
      ]
    }
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
      <div className={`container mx-auto px-6 md:px-8 ${layout === "left" ? "max-w-[1216px]" : "max-w-5xl"}`}>
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
            style={layout === "left" ? { letterSpacing: "-1.2px", lineHeight: "1.2" } : undefined}
            className={`text-[30px] font-extrabold text-gray-900 mb-5 tracking-tight ${layout === "left" ? "mt-3" : ""}`}
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

            {/* Add-ons (Moved from sidebar) */}
            {currentData.addons && currentData.addons.length > 0 && (
              <div className="mt-12">
                <div className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                  <h3 className="text-[15px] font-bold text-gray-900">
                    Add-ons
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] text-gray-700">
                  {currentData.addons.map((item, idx) => (
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

          {/* Sidebar Column */}
          <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 relative">
            {/* Exclusions */}
            {Object.keys(currentData.exclusions).length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Exclusions
                </h3>
                <div className="flex flex-col gap-6">
                  {Object.entries(currentData.exclusions).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-3 uppercase tracking-wider">{category}</h4>
                      <ul className="flex flex-col gap-3 text-[14px] text-gray-500">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="w-3 h-3 text-gray-400" strokeWidth={3} />
                            </div>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
