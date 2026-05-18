"use client";

import React from "react";
import Services from "./Services";

interface QuoteRequestPanelProps {
  headline?: React.ReactNode;
  subheadline?: string;
  contextPoints?: string[];
  seoKeyword?: string;
}

export default function QuoteRequestPanel({
  headline,
  subheadline,
  contextPoints,
  seoKeyword,
}: QuoteRequestPanelProps) {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gray-50/30">
      {/* Subtle Background Pattern & Gradient */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom duration-700">
          
          {/* If custom headline is passed, render a sleek centered header block */}
          {headline && (
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight text-gray-900 mb-4 tracking-tight">
                {headline}
              </h2>
              {subheadline && (
                <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                  {subheadline}
                </p>
              )}
            </div>
          )}

          <div className="relative w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-[2.5rem] blur-xl opacity-40 z-0"></div>
            <div className="relative z-10 w-full">
              <Services />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
