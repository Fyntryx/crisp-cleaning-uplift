"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

const tabs = ["Standard", "Deep", "Vacate", "Add-ons"];

const tabDescriptions = {
  "Standard": "Every Crisp clean follows a defined room-by-room checklist so nothing gets missed and nothing gets glossed over.",
  "Deep": "A meticulous reset — built for first cleans, seasonal refreshes and special occasions.",
  "Vacate": "Bond-back ready cleans aligned to Australian end-of-lease standards.",
  "Add-ons": "Customise any clean with extra detail where it counts most."
};

type ServiceType = "Standard" | "Deep" | "Vacate";

interface MasterItem {
  text: string;
  includedIn: ServiceType[];
}

interface MasterCategory {
  category: string;
  items: MasterItem[];
}

const masterChecklist: MasterCategory[] = [
  {
    category: "GENERAL AREAS / WHOLE HOME",
    items: [
      { text: "Light dust all reachable surfaces (benches, tables, sills)", includedIn: ["Standard"] },
      { text: "Full dust + wipe all surfaces", includedIn: ["Deep", "Vacate"] },
      { text: "Wipe benches, tables, and high-touch surfaces", includedIn: ["Standard"] },
      { text: "Light tidy (surfaces, couches, loose items)", includedIn: ["Standard"] },
      { text: "Spot wipe door handles / switches (if visibly dirty)", includedIn: ["Standard"] },
      { text: "Clean skirting boards", includedIn: ["Deep", "Vacate"] },
      { text: "Clean door frames, doors, and handles", includedIn: ["Deep", "Vacate"] },
      { text: "Clean light switches + power points", includedIn: ["Deep", "Vacate"] },
      { text: "Spot clean all walls", includedIn: ["Deep", "Vacate"] },
      { text: "Clean internal windows + sills", includedIn: ["Deep", "Vacate"] },
      { text: "Clean sliding door tracks", includedIn: ["Vacate"] },
      { text: "Clean mirrors (streak-free)", includedIn: ["Deep"] },
      { text: "Dust blinds", includedIn: ["Deep"] },
      { text: "Move light furniture (safe to move only)", includedIn: ["Deep"] },
      { text: "Remove visible cobwebs", includedIn: ["Standard", "Deep", "Vacate"] },
      { text: "Edge vacuuming throughout", includedIn: ["Deep", "Vacate"] },
      { text: "Vacuum under furniture (accessible areas)", includedIn: ["Deep"] },
      { text: "Vacuum all accessible floors", includedIn: ["Standard", "Deep", "Vacate"] },
      { text: "Mop hard floors", includedIn: ["Standard", "Deep", "Vacate"] },
      { text: "Empty small bins", includedIn: ["Standard"] }
    ]
  },
  {
    category: "KITCHEN",
    items: [
      { text: "Wipe benches & splashback", includedIn: ["Standard"] },
      { text: "Scrub splashback", includedIn: ["Deep", "Vacate"] },
      { text: "Light wipe stovetop", includedIn: ["Standard"] },
      { text: "Clean stovetop thoroughly / Degrease", includedIn: ["Deep", "Vacate"] },
      { text: "Sink rinse + light wipe", includedIn: ["Standard"] },
      { text: "Deep clean sink + drain", includedIn: ["Deep", "Vacate"] },
      { text: "Wipe microwave exterior", includedIn: ["Standard"] },
      { text: "Clean appliance exteriors (fridge, microwave, oven, dishwasher)", includedIn: ["Deep"] },
      { text: "Spot clean fridge exterior", includedIn: ["Standard"] },
      { text: "Clean fridge interior (if empty)", includedIn: ["Vacate"] },
      { text: "Clean rangehood exterior", includedIn: ["Deep"] },
      { text: "Clean rangehood + remove grease", includedIn: ["Vacate"] },
      { text: "Deep clean oven (interior)", includedIn: ["Vacate"] },
      { text: "Clean dishwasher interior", includedIn: ["Vacate"] },
      { text: "Wipe cupboards (exterior)", includedIn: ["Deep"] },
      { text: "Clean cupboards (interior + exterior)", includedIn: ["Vacate"] },
      { text: "Polish benches and surfaces", includedIn: ["Deep"] },
      { text: "Remove rubbish if full", includedIn: ["Standard"] },
      { text: "Vacuum + mop floor", includedIn: ["Standard", "Deep", "Vacate"] },
    ]
  },
  {
    category: "BATHROOM",
    items: [
      { text: "Toilet quick clean (seat, bowl, exterior)", includedIn: ["Standard"] },
      { text: "Deep clean toilet (incl. hinges, base) / Full scrub", includedIn: ["Deep", "Vacate"] },
      { text: "Wipe sink + vanity surface", includedIn: ["Standard"] },
      { text: "Deep clean vanity (surface + detail)", includedIn: ["Deep"] },
      { text: "Clean vanity (interior + exterior)", includedIn: ["Vacate"] },
      { text: "Light wipe shower (no scrubbing)", includedIn: ["Standard"] },
      { text: "Deep scrub shower, bath, sink", includedIn: ["Deep", "Vacate"] },
      { text: "Clean shower glass (streak-free)", includedIn: ["Deep"] },
      { text: "Remove soap scum + grime", includedIn: ["Deep"] },
      { text: "Clean tiles + grout (spot treatment)", includedIn: ["Deep"] },
      { text: "Remove mould from grout", includedIn: ["Vacate"] },
      { text: "Clean mirror (quick wipe)", includedIn: ["Standard"] },
      { text: "Light wipe taps", includedIn: ["Standard"] },
      { text: "Polish tapware + shower head", includedIn: ["Deep", "Vacate"] },
      { text: "Clean exhaust fan (external)", includedIn: ["Deep"] },
      { text: "Clean exhaust fan thoroughly", includedIn: ["Vacate"] },
      { text: "Empty bin", includedIn: ["Standard"] },
      { text: "Mop and disinfect floors", includedIn: ["Standard", "Deep", "Vacate"] },
    ]
  },
  {
    category: "BEDROOMS / LIVING",
    items: [
      { text: "Straighten bed (no full bed making)", includedIn: ["Standard"] },
      { text: "Fluff pillows (if applicable)", includedIn: ["Standard"] },
      { text: "Light dust surfaces", includedIn: ["Standard"] },
      { text: "Thoroughly wipe all surfaces", includedIn: ["Deep"] },
      { text: "Light tidy (floors + surfaces)", includedIn: ["Standard"] },
      { text: "Dust blinds", includedIn: ["Deep"] },
      { text: "Clean internal windows", includedIn: ["Deep"] },
      { text: "Clean light switches + door frames", includedIn: ["Deep"] },
      { text: "Vacuum under beds (accessible)", includedIn: ["Deep"] },
      { text: "Vacuum / mop floors", includedIn: ["Standard", "Deep"] }
    ]
  },
  {
    category: "LAUNDRY",
    items: [
      { text: "Wipe bench + sink", includedIn: ["Vacate"] },
      { text: "Clean lint filter area", includedIn: ["Vacate"] },
      { text: "Mop floor", includedIn: ["Vacate"] }
    ]
  }
];

const addonsChecklistData = [
  {
    category: "AVAILABLE ADD-ONS",
    items: [
      "Windows (interior / exterior)", "Full wall cleaning", "Inside cabinets / drawers (non-vacate)", "Deep blinds cleaning",
      "Oven / rangehood (non-vacate)", "Fridge interior (non-vacate)", "Dishwasher interior (non-vacate)", "Microwave interior",
      "Balcony / outdoor areas", "Garage", "Ceiling fans"
    ]
  }
];

export default function Checklist({ defaultTab = "Standard", title, topTitle }: { defaultTab?: string, title?: string, topTitle?: string }) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <section id="checklist" className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">
            {topTitle !== undefined ? topTitle : "The Checklist"}
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            {title || "Nothing is assumed. Everything is covered."}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto min-h-[56px]">
            {tabDescriptions[activeTab as keyof typeof tabDescriptions]}
          </p>
        </div>

        {/* Tabs Container */}
        <div className="inline-flex items-center p-1.5 bg-white border border-orange-100 rounded-full mb-10 shadow-sm overflow-x-auto max-w-full">
          {tabs.map((tab) => (
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

        {/* Content */}
        <div className="bg-transparent animate-fade-in">
          {activeTab === "Add-ons" ? (
            // ADD-ONS TAB RENDERING
            addonsChecklistData.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-orange-100/50 pb-4 mb-6">
                  {section.category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12 text-foreground/80 text-sm font-medium">
                  {section.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // MASTER CHECKLIST RENDERING (Standard, Deep, Vacate)
            masterChecklist.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-orange-100/50 pb-4 mb-6">
                  {section.category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12 text-sm font-medium">
                  {section.items.map((item, i) => {
                    const isIncluded = item.includedIn.includes(activeTab as ServiceType);

                    return (
                      <li key={i} className={`flex items-start gap-3 transition-opacity duration-300 ${isIncluded ? 'opacity-100' : 'opacity-60'}`}>
                        {isIncluded ? (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-200/50 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-muted-foreground" strokeWidth={3} />
                          </div>
                        )}
                        <span className={isIncluded ? 'text-foreground' : 'text-muted-foreground'}>
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-sm text-muted-foreground/80">
          Want to add something specific? Just mention it when you book. We'll take care of it.
        </div>
      </div>
    </section>
  );
}
