"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const tabs = ["Regular", "Deep", "Vacate", "Add-ons"];

const tabDescriptions = {
  "Regular": "Every Crisp clean follows a defined room-by-room checklist so nothing gets missed and nothing gets glossed over.",
  "Deep": "A meticulous reset — built for first cleans, seasonal refreshes and special occasions.",
  "Vacate": "Bond-back ready cleans aligned to Australian end-of-lease standards.",
  "Add-ons": "Customise any clean with extra detail where it counts most."
};

const regularChecklistData = [
  {
    category: "GENERAL AREAS",
    items: [
      "Light dust all reachable surfaces (benches, tables, sills)", "Wipe benches, tables, and high-touch surfaces", "Light tidy (surfaces, couches, loose items)", "Remove visible cobwebs",
      "Empty small bins", "Vacuum all accessible floors", "Mop hard floors", "Spot wipe door handles / switches (if visibly dirty)"
    ]
  },
  {
    category: "BEDROOMS / LIVING / OTHER",
    items: [
      "Straighten bed (no full bed making)", "Fluff pillows (if applicable)", "Light dust surfaces", "Light tidy (floors + surfaces)", "Vacuum / mop floors"
    ]
  },
  {
    category: "BATHROOM",
    items: [
      "Toilet quick clean (seat, bowl, exterior)", "Wipe sink + vanity surface", "Light wipe shower (no scrubbing)", "Clean mirror (quick wipe)",
      "Light wipe taps", "Empty bin", "Mop floor"
    ]
  },
  {
    category: "KITCHEN",
    items: [
      "Wipe benches & splashback", "Light wipe stovetop", "Wipe microwave exterior", "Sink rinse + light wipe",
      "Spot clean fridge exterior", "Remove rubbish if full", "Vacuum + mop floor"
    ]
  }
];

const deepChecklistData = [
  {
    category: "GENERAL AREAS",
    items: [
      "Full dust + wipe all surfaces", "Clean skirting boards", "Clean door frames, doors, and handles", "Clean light switches + power points",
      "Clean internal windows + sills", "Clean mirrors (streak-free)", "Dust blinds", "Move light furniture (safe to move only)",
      "Vacuum under furniture (accessible areas)", "Edge vacuuming throughout", "Remove cobwebs", "Wall spot cleaning", "Deep mop floors"
    ]
  },
  {
    category: "KITCHEN",
    items: [
      "Deep clean sink + drain", "Clean appliance exteriors (fridge, microwave, oven, dishwasher)", "Scrub splashback", "Clean rangehood exterior",
      "Clean stovetop thoroughly", "Wipe cupboards (exterior)", "Polish benches and surfaces", "Polish stainless steel (if applicable)"
    ]
  },
  {
    category: "BATHROOM",
    items: [
      "Deep scrub shower, bath, sink", "Remove soap scum + grime", "Clean shower glass (streak-free)", "Clean tiles + grout (spot treatment)",
      "Clean exhaust fan (external)", "Deep clean toilet (incl. hinges, base)", "Deep clean vanity (surface + detail)", "Polish tapware",
      "Disinfect and mop floor"
    ]
  },
  {
    category: "BEDROOMS / LIVING / OTHER",
    items: [
      "Dust blinds", "Thoroughly wipe all surfaces", "Vacuum under beds (accessible)", "Clean internal windows", "Clean light switches + door frames"
    ]
  }
];

const vacateChecklistData = [
  {
    category: "WHOLE HOME",
    items: [
      "Full dust and wipe all surfaces", "Clean skirting boards", "Clean door frames, doors, handles", "Clean light switches + power points",
      "Spot clean all walls", "Clean internal windows + sills", "Clean sliding door tracks", "Remove all cobwebs",
      "Edge vacuum entire property", "Vacuum all floors", "Mop all hard floors thoroughly"
    ]
  },
  {
    category: "KITCHEN",
    items: [
      "Deep clean oven (interior)", "Degrease stovetop", "Clean rangehood + remove grease", "Clean cupboards (interior + exterior)",
      "Clean splashback", "Clean dishwasher interior", "Clean fridge interior (if empty)", "Deep clean sink + drain"
    ]
  },
  {
    category: "BATHROOM",
    items: [
      "Remove mould from grout", "Deep clean shower, tiles, screen", "Clean exhaust fan thoroughly", "Full toilet scrub",
      "Clean vanity (interior + exterior)", "Polish taps + shower head", "Mop and disinfect floors"
    ]
  },
  {
    category: "LAUNDRY",
    items: [
      "Wipe bench + sink", "Clean lint filter area", "Mop floor"
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

const checklistMap: Record<string, any[]> = {
  "Regular": regularChecklistData,
  "Deep": deepChecklistData,
  "Vacate": vacateChecklistData,
  "Add-ons": addonsChecklistData
};

export default function Checklist() {
  const [activeTab, setActiveTab] = useState("Regular");

  const currentData = checklistMap[activeTab] || regularChecklistData;

  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">The Checklist</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Nothing is assumed. Everything is covered.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto min-h-[56px]">
            {tabDescriptions[activeTab as keyof typeof tabDescriptions]}
          </p>
        </div>

        {/* Tabs Container */}
        <div className="inline-flex items-center p-1.5 bg-white border border-orange-100 rounded-full mb-10 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
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
          {currentData.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-orange-100/50 pb-4 mb-6 flex justify-between items-center">
                <span>{section.category}</span>
                <span className="text-muted-foreground/60 text-xs font-semibold">{section.items.length} ITEMS</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 text-foreground/80 text-sm font-medium">
                {section.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 fill-orange-50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-muted-foreground/80">
          Want to add something specific? Just mention it when you book. We'll take care of it.
        </div>
      </div>
    </section>
  );
}
