"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ServicesV2 from "./ServicesV2";
import { client } from "@/sanity/lib/client";
import { getTrackingPayload } from "@/lib/trackingUtils";

export default function QuoteRequestPanelV2() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [discountContent, setDiscountContent] = useState({
    heading: "Claim 5% OFF your FIRST clean!",
    subheading: "Enter your details and save!"
  });

  useEffect(() => {
    client.fetch(`*[_type == "discountStepSettings"][0]`).then((data) => {
      if (data) {
        setDiscountContent({
          heading: data.heading || "Claim 5% OFF your FIRST clean!",
          subheading: data.subheading || "Enter your details and save!"
        });
      }
    }).catch(console.error);
  }, []);

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

    const { source, trackingData } = getTrackingPayload("Booking Flow Discount Step");

    const existingLeadId = typeof window !== "undefined" ? sessionStorage.getItem("crisp_lead_id") : null;

    const payload = {
      ...(existingLeadId ? { id: existingLeadId } : {}),
      fullName: formData.fullName.trim(),
      email: formData.email,
      phone: formData.phone,
      source,
      trackingData,
      offer: appliedPromoDetails.code,
      bedrooms: 0,
      bathrooms: 0,
      kitchen: 0,
      other: 0,
      serviceType: "Standard",
      address: "",
      addons: "None",
      jobValue: 0
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: existingLeadId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.lead?.id) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("crisp_lead_id", data.lead.id);
        }
      }

      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_source: "Booking Flow Discount Step",
          offer: appliedPromoDetails.code,
          offer_source: appliedPromoDetails.source
        });
        sessionStorage.setItem("crisp_lead_captured", "true");
        const parts = formData.fullName.trim().split(/\s+/);
        const fName = parts[0] || "";
        const lName = parts.slice(1).join(" ");
        
        sessionStorage.setItem("crisp_lead_first_name", fName);
        sessionStorage.setItem("crisp_lead_last_name", lName);
        sessionStorage.setItem("crisp_lead_email", formData.email);
        sessionStorage.setItem("crisp_lead_phone", formData.phone);
        
        // Show success state briefly before redirecting to booking page step 2
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/book?service=Standard";
          setIsSubmitting(false);
        }, 1500);
        return; // Return early to prevent setIsSubmitting(false) from finally block
      }
    } catch (err) {
      console.error("Failed to submit lead", err);
      // Still show success state and open the booking modal if it fails (likely due to local CORS)
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
        window.location.href = "/book?service=Standard";
        setIsSubmitting(false);
      }, 1500);
      return;
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <section className="relative z-20 w-full bg-transparent px-4 md:px-6 pb-12">
        <div className="relative -mt-12 md:-mt-16 bg-white rounded-[20px] border-0 px-7 pt-8 pb-[18px] animate-in fade-in slide-in-from-bottom duration-700 max-w-5xl mx-auto flex flex-col items-center gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          
          {/* Top Pill */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-[14px] py-[6px] rounded-full bg-brand text-white text-[10px] font-bold tracking-[0.08em] uppercase shadow-md whitespace-nowrap z-10">
            First Clean — 5% Off
          </div>

          {/* Form */}
          <div className="w-full flex flex-col items-center">
            {error && (
              <div className="bg-red-50 text-red-600 text-[12px] font-medium p-2 rounded-lg w-full mb-3 text-center border border-red-100">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
                <div className="flex flex-col space-y-1 w-full flex-1">
                  <label className="text-[10px] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 text-center md:text-left pl-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3.5 py-[11px] bg-white border-[1.5px] border-tan rounded-xl outline-none focus:ring-2 focus:ring-brand/10 text-ink font-normal text-[13px] shadow-sm transition-all text-center md:text-left"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full flex-1">
                  <label className="text-[10px] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 text-center md:text-left pl-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-[11px] bg-white border-[1.5px] border-tan rounded-xl outline-none focus:ring-2 focus:ring-brand/10 text-ink font-normal text-[13px] shadow-sm transition-all text-center md:text-left"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full flex-1">
                  <label className="text-[10px] font-semibold text-ink-soft tracking-[0.09em] uppercase mb-1.5 text-center md:text-left pl-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0400 000 000"
                    className="w-full px-3.5 py-[11px] bg-white border-[1.5px] border-tan rounded-xl outline-none focus:ring-2 focus:ring-brand/10 text-ink font-normal text-[13px] shadow-sm transition-all text-center md:text-left"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full md:w-auto whitespace-nowrap text-white text-[13.5px] font-semibold rounded-full px-6 py-[11px] transition-all shadow-none flex justify-center items-center gap-2 ${
                    isSuccess 
                      ? "bg-emerald-500 hover:bg-emerald-600 shadow-[0_8px_25px_rgba(16,185,129,0.3)]" 
                      : "bg-brand hover:bg-brand/90 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                  }`}
                >
                  {isSuccess ? (
                    "Discount Claimed! ✨"
                  ) : isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Get My Instant Quote →"
                  )}
                </button>
                <p className="text-gray-400 text-[11px] mt-2 font-medium text-center">
                  {discountContent.subheading}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Render the full booking modal invisibly until triggered */}
      <ServicesV2 hiddenInline={true} />
    </>
  );
}
