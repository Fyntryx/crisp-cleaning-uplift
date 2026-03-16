"use client";

import React from "react";
import Services from "./Services";
import { CheckCircle2 } from "lucide-react";

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
  seoKeyword = "cleaning",
}: QuoteRequestPanelProps) {
  // Default content if none is provided via props
  const defaultHeadline = (
    <>
      Get Your <span className="text-primary">Instant</span> Price in Seconds
    </>
  );

  const defaultSubheadline =
    "Transparent pricing. No hidden fees. Book online immediately.";

  const defaultContextPoints = [
    `Top-rated ${seoKeyword} professionals in your area.`,
    "Flexible scheduling to fit your needs.",
    "100% Satisfaction Guarantee.",
  ];

  const renderHeadline = headline || defaultHeadline;
  const renderSubheadline = subheadline || defaultSubheadline;
  const renderContextPoints = contextPoints || defaultContextPoints;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gray-50/50">
      {/* Subtle Background Pattern & Gradient */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Panel: Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-in fade-in slide-in-from-left duration-700">
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              
              {/* Subtle animated element to draw the eye */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6 animate-bounce shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-bold leading-tight text-gray-900 mb-6 tracking-tight">
                {renderHeadline}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
                {renderSubheadline}
              </p>

              <div className="space-y-4 text-left inline-block lg:block mx-auto">
                {renderContextPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right duration-700 delay-150">
            {/* 
              We wrap Services in a container that handles the shadow and shaping. 
              Services itself manages the inner padding and max-width now.
            */}
            <div className="relative w-full max-w-2xl mx-auto lg:max-w-none lg:ml-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-50 z-0"></div>
              <div className="relative z-10 w-full">
                <Services />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
