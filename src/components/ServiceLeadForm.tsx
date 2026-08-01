"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface ServiceLeadFormProps {
  layout?: "vertical" | "horizontal";
  theme?: "light" | "dark";
  serviceType: "Standard" | "Deep" | "Vacate";
  buttonText?: string;
}

export default function ServiceLeadForm({ 
  layout = "vertical", 
  theme = "light",
  serviceType,
  buttonText = "Get My Instant Quote →"
}: ServiceLeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [discountContent, setDiscountContent] = useState({
    subheading: "Takes 30 seconds · No lock-in contracts"
  });

  // Depending on if they want the discount text everywhere, we can leave this or customize it.
  // For the service pages, the hero usually says "Takes 30 seconds · No lock-in contracts"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError("Please enter a valid phone number (min 10 digits).");
      return;
    }
    
    setIsSubmitting(true);

    const API_BASE_URL = (
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
    ).replace(/\/$/, "");

    let appliedPromoDetails = {
      code: "WELCOME5",
      type: "PERCENT_OFF",
      value: 5,
      source: "discount_step"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/discount-promo`);
      if (res.ok) {
        const data = await res.json();
        appliedPromoDetails = data;
      }
    } catch (e) {
      console.warn("Failed to fetch default promo, proceeding with default");
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email,
      phone: formData.phone,
      source: `Service Page Hero - ${serviceType}`,
      offer: appliedPromoDetails.code,
      bedrooms: 0,
      bathrooms: 0,
      kitchen: 0,
      other: 0,
      serviceType: serviceType,
      address: "",
      addons: "None",
      jobValue: 0
    };

    const handleRedirect = () => {
      sessionStorage.setItem("crisp_lead_captured", "true");
      const parts = formData.fullName.trim().split(/\s+/);
      const fName = parts[0] || "";
      const lName = parts.slice(1).join(" ");
      
      sessionStorage.setItem("crisp_lead_first_name", fName);
      sessionStorage.setItem("crisp_lead_last_name", lName);
      sessionStorage.setItem("crisp_lead_email", formData.email);
      sessionStorage.setItem("crisp_lead_phone", formData.phone);
      
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = `/book?service=${serviceType}`;
      }, 1000);
    };

    try {
      await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_source: `Service Page Hero - ${serviceType}`,
          offer: appliedPromoDetails.code,
          offer_source: appliedPromoDetails.source
        });
        handleRedirect();
        return;
      }
    } catch (err) {
      console.error("Failed to submit lead", err);
      // Still show success state and open the booking modal if it fails
      handleRedirect();
      return;
    }
  };

  const isDark = theme === "dark";
  
  const labelClass = `text-[10.5px] font-semibold tracking-[0.09em] uppercase mb-1.5 pl-1 ${
    isDark ? "text-white/70" : "text-gray-500"
  }`;
  
  const inputClass = `w-full px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/50 font-medium text-[14px] shadow-sm transition-all ${
    isDark 
      ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15" 
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FB8C42]"
  } border`;

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] font-medium p-3 rounded-xl w-full mb-3 text-left border border-red-100">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className={`w-full flex ${layout === "horizontal" ? "flex-col md:flex-row md:items-end gap-4" : "flex-col gap-4"}`}>
      <div className={`w-full flex ${layout === "horizontal" ? "flex-col md:flex-row gap-4 flex-1" : "flex-col gap-3"}`}>
        <div className="flex flex-col flex-1 w-full text-left">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            required
            placeholder="Jane Doe"
            className={inputClass}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div className="flex flex-col flex-1 w-full text-left">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            placeholder="jane@example.com"
            className={inputClass}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col flex-1 w-full text-left">
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            required
            placeholder="0400 000 000"
            className={inputClass}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      
      <div className={`w-full ${layout === "horizontal" ? "w-auto md:w-[220px] shrink-0" : ""}`}>
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full text-white text-[15px] font-bold rounded-xl px-6 py-3.5 transition-all shadow-md flex justify-center items-center gap-2 ${
            isSuccess 
              ? "bg-emerald-500 hover:bg-emerald-600 shadow-[0_8px_25px_rgba(16,185,129,0.3)]" 
              : "bg-[#FB8C42] hover:bg-[#ea6309] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 shadow-[0_4px_14px_rgba(249,115,22,0.3)]"
          }`}
        >
          {isSuccess ? (
            "Let's go! ✨"
          ) : isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            buttonText
          )}
        </button>
      </div>
    </form>
    </div>
  );
}
