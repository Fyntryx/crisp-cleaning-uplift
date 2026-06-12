"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ArrowLeft,
  X, 
  Sparkles, 
  Sliders, 
  Calendar, 
  FileText, 
  CreditCard, 
  Home, 
  Layers, 
  Key,
  Check
} from "lucide-react";

export default function BookingStepOne() {
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  const plans = [
    { 
      id: "Standard", 
      label: "Standard Clean",
      description: "Consistent, detailed maintenance on your schedule",
      icon: Home
    },
    { 
      id: "Deep", 
      label: "Deep Clean",
      description: "A full reset for every room, every corner",
      icon: Layers,
      badge: "MOST THOROUGH"
    },
    { 
      id: "Vacate", 
      label: "Vacate Clean",
      description: "Cleaned to rental inspection standard",
      icon: Key,
      badge: "BOND BACK GUARANTEE"
    }
  ];

  const handleContinue = () => {
    // Ensure dataLayer exists
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'service_selected',
        service_type: selectedPlan.toLowerCase(), // 'standard' | 'deep' | 'vacate'
      });
    }

    // Delay navigation slightly to ensure GTM tag fires before page unloads
    setTimeout(() => {
      // Update hash to #booking-step-2 so GTM can also use URL/hash trigger
      window.location.href = `/?plan=${selectedPlan.toLowerCase()}#booking-step-2`;
    }, 300);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("checklist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="booking" className="relative -mt-12 z-20 px-1.5 md:px-4 mb-20">
      <div className="max-w-4xl mx-auto bg-white rounded-[24px] md:rounded-[40px] p-4 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        
        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center">
            <img src="/logo.png?v=3" alt="Crisp Cleaning" className="h-8 md:h-10 object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-extrabold tracking-widest text-muted-foreground/50 uppercase">STEP 1 OF 5</span>
            <button className="w-7 h-7 rounded-full bg-gray-100/70 hover:bg-gray-200/70 flex items-center justify-center text-gray-500 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Steps Tracker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto mb-8 pb-6 border-b border-gray-50 text-[10px] md:text-[12px] font-bold text-muted-foreground/50">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-6 h-6 rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <Check className="w-3 h-3" strokeWidth={3} />
            </div>
            <span>Service</span>
          </div>
          
          <div className="hidden sm:block h-px flex-1 bg-gray-100 max-w-[60px]" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50/50 flex items-center justify-center text-gray-400 shrink-0">
              <Sliders className="w-3 h-3" />
            </div>
            <span>Customise</span>
          </div>

          <div className="hidden sm:block h-px flex-1 bg-gray-100 max-w-[60px]" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50/50 flex items-center justify-center text-gray-400 shrink-0">
              <Calendar className="w-3 h-3" />
            </div>
            <span>Schedule</span>
          </div>

          <div className="hidden sm:block h-px flex-1 bg-gray-100 max-w-[60px]" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50/50 flex items-center justify-center text-gray-400 shrink-0">
              <FileText className="w-3 h-3" />
            </div>
            <span>Details</span>
          </div>

          <div className="hidden sm:block h-px flex-1 bg-gray-100 max-w-[60px]" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50/50 flex items-center justify-center text-gray-400 shrink-0">
              <CreditCard className="w-3 h-3" />
            </div>
            <span>Confirm</span>
          </div>
        </div>

        {/* Content Header */}
        <div className="mb-8 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-100 text-primary text-[9px] font-bold tracking-wider uppercase mb-2 bg-orange-50/50">
            <Sparkles className="w-2.5 h-2.5" /> Service
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">What type of clean do you need?</h2>
          <p className="text-xs text-muted-foreground mt-1">Select a service to get started.</p>
        </div>
        
        {/* Service Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map(plan => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-5 md:p-6 rounded-2xl border md:border-2 min-h-[176px] md:min-h-auto transition-all duration-300 flex flex-col items-start text-left group ${
                  isSelected 
                    ? "border-primary bg-white shadow-[0_12px_25px_rgba(249,115,22,0.06)]" 
                    : "border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm"
                }`}
              >
                {/* Special thorough badge for Deep Clean */}
                {plan.badge && (
                  <span className="absolute -top-2.5 left-5 bg-primary text-white text-[8px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                )}

                {/* Top Row: Icon Container and Checkmark */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50/70 text-primary flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {isSelected && (
                    <div className="w-4.5 h-4.5 rounded-full bg-primary text-white flex items-center justify-center shadow-sm scale-110 transition-transform">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3 className="font-extrabold text-base md:text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {plan.label}
                </h3>
                <p className="text-[15px] font-sans antialiased leading-[24px] text-muted-foreground font-medium">
                  {plan.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer actions bar */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-4">
          <button onClick={handleCompare} className="text-sm font-bold text-primary hover:underline transition-all">
            Compare all plans →
          </button>
          
          <Button 
            id="btn-initiate-booking"
            onClick={handleContinue} 
            size="lg" 
            className="rounded-full px-8 py-5 text-sm font-bold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-[#FB8C42]/10 hover:shadow-[#FB8C42]/20 transition-all flex items-center gap-2 group"
          >
            Continue
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>
    </section>
  );
}
