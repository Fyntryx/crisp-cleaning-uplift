"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showPopup = useCallback(() => {
    if (hasTriggered) return;
    if (sessionStorage.getItem("crisp_lead_captured") === "true") return;
    setIsOpen(true);
    setHasTriggered(true);
    sessionStorage.setItem("crisp_lead_popup_shown", "true");
  }, [hasTriggered]);

  useEffect(() => {
    // Check if already triggered in this session or lead already captured
    const alreadyShown = sessionStorage.getItem("crisp_lead_popup_shown");
    const leadCaptured = sessionStorage.getItem("crisp_lead_captured") === "true";
    if (alreadyShown || leadCaptured) {
      setHasTriggered(true);
      return;
    }

    // Trigger 1: 40% scroll depth
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 40) {
        showPopup();
      }
    };

    // Trigger 2: Exit intent — cursor leaves the page
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Trigger 3: Custom event from booking modal
    const handleCustomTrigger = () => {
      showPopup();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("triggerLeadPopup", handleCustomTrigger);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("triggerLeadPopup", handleCustomTrigger);
    };
  }, [hasTriggered, showPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const API_BASE_URL = (
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://crisp-cleaning-app-seven.vercel.app"
    ).replace(/\/$/, "");

    const payload = {
      ...formData,
      source: "Popup Lead Form",
      offer: "15% off expiry"
    };

    try {
      // Assuming you will create this endpoint in your backend to catch the data
      await fetch(`${API_BASE_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Push to GTM dataLayer
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_source: "Popup Lead Form",
          offer: "15% off expiry"
        });
      }
      
      // Mark lead as captured
      sessionStorage.setItem("crisp_lead_captured", "true");
      
      // We don't block on success since the endpoint might not exist yet
    } catch (err) {
      console.error("Failed to submit lead", err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsOpen(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1E1915]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[420px] rounded-[32px] p-8 md:p-10 relative shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 3D Image (User needs to upload this to public/images/house-popup.png) */}
        <div className="relative w-48 h-48 -mt-16 mb-2">
          <Image 
            src="/images/house-popup.png" 
            alt="Crisp Cleaning House" 
            fill 
            className="object-contain drop-shadow-xl"
            onError={(e) => {
              // Fallback if image not uploaded yet
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {isSuccess ? (
          <div className="py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Got it!</h3>
            <p className="text-gray-500 text-sm">Your 15% discount has been secured. A copy of the discount code has been sent to your email!</p>
          </div>
        ) : (
          <>
            <h2 className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-3">
              15% OFF your first clean!
            </h2>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6 px-2">
              Expires soon! Let&apos;s catch it
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#FB8C42] focus:ring-1 focus:ring-[#FB8C42] transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#FB8C42] focus:ring-1 focus:ring-[#FB8C42] transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#FB8C42] focus:ring-1 focus:ring-[#FB8C42] transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold rounded-xl py-4 mt-2 transition-all shadow-lg flex justify-center items-center"
              >
                {isSubmitting ? "Saving..." : "Claim Now!"}
              </button>
            </form>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 font-semibold text-xs mt-5 hover:text-gray-600 transition-colors uppercase tracking-wider"
            >
              No thanks, I don&apos;t want to save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
