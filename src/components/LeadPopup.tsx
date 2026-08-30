"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";


export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  
  const [content, setContent] = useState({
    heading: "5% OFF your first clean!",
    subheading: "Expires soon! Let's catch it"
  });

  useEffect(() => {
    client.fetch(`*[_type == "leadFormSettings"][0]`).then((data) => {
      if (data) {
        setContent({
          heading: data.heading || "5% OFF your first clean!",
          subheading: data.subheading || "Expires soon! Let's catch it"
        });
      }
    }).catch(console.error);
  }, []);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError("Please enter a valid phone number (min 10 digits).");
      return;
    }

    // ── Save contact info to sessionStorage so the quote flow can
    //    pre-fill Step 1 and skip straight to Step 2. We intentionally
    //    do NOT submit to the backend here — the quote flow's own
    //    handleDiscountSubmit will create the lead with the full
    //    booking data, avoiding duplicate entries. ──────────────────
    const parts = formData.fullName.trim().split(/\s+/);
    const first = parts[0] || "";
    const last = parts.slice(1).join(" ");

    sessionStorage.setItem("crisp_lead_first_name", first);
    sessionStorage.setItem("crisp_lead_last_name", last);
    sessionStorage.setItem("crisp_lead_email", formData.email);
    sessionStorage.setItem("crisp_lead_phone", formData.phone);
    sessionStorage.setItem("crisp_lead_captured", "true");

    // GTM event — fire immediately, no backend needed
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "popup_lead_captured",
        lead_source: "Popup Lead Form",
        offer: "5% off expiry"
      });
    }

    // Close the popup first
    setIsOpen(false);

    // Navigate to the quote flow. If the booking form is embedded on
    // this page scroll to it; the form's useEffect will detect
    // crisp_lead_captured and jump straight to Step 2.
    // If it's on a dedicated page, navigate there.
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/request-quote";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1E1915]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[420px] rounded-[32px] p-8 md:p-10 relative shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        


        {/* 3D Image (User needs to upload this to public/images/crisp-cleaning-house-popup.webp) */}
        <div className="relative w-48 h-48 -mt-16 mb-2">
          <Image 
            src="/images/crisp-cleaning-house-popup.webp" 
            alt="Crisp Cleaning House" 
            fill 
            className="object-contain drop-shadow-xl"
            onError={(e) => {
              // Fallback if image not uploaded yet
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <>
            <h2 className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-3">
              {content.heading}
            </h2>
            <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6 px-2">
              {content.subheading}
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-[13px] font-medium p-3 rounded-xl w-full mb-3 text-left border border-red-100">
                {error}
              </div>
            )}

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
                className="w-full bg-black hover:bg-gray-900 text-white font-bold rounded-xl py-4 mt-2 transition-all shadow-lg flex justify-center items-center"
              >
                Claim Now!
              </button>
            </form>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 font-semibold text-xs mt-5 hover:text-gray-600 transition-colors uppercase tracking-wider"
            >
              No thanks, I don&apos;t want to save
            </button>
        </>
      </div>
    </div>
  );
}
