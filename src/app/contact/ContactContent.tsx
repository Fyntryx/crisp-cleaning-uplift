"use client";

import React from "react";
import useScrollScale from "@/hooks/useScrollScale";

export default function ContactContent({ children }: { children: React.ReactNode }) {
  const { ref: contactContentRef, style: contactContentStyle } = useScrollScale(
    { threshold: 0.1 }
  );

  return (
    <div
      ref={contactContentRef as React.RefObject<HTMLDivElement>}
      style={contactContentStyle}
      className="container mx-auto px-6"
    >
      {children}
    </div>
  );
}
