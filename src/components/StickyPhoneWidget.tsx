"use client";

import { Phone } from "lucide-react";

export default function StickyPhoneWidget() {
  const trackPhoneClick = () => {
    // Placeholder for Meta/Google click_call conversion event
    console.log("Phone button clicked! Tracking event...");
    // e.g., window.gtag('event', 'click_call', { ... });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="tel:1300123456"
        onClick={trackPhoneClick}
        className="relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Call us"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></span>
        <Phone className="w-6 h-6 relative z-10" />
      </a>
    </div>
  );
}
