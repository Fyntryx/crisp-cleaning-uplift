"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";


interface ComparisonCardProps {
  beforeImage: string;
  afterImage: string;
  label: string;
}

function ComparisonCard({ beforeImage, afterImage, label }: ComparisonCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="w-full h-full aspect-[4/5] bg-muted rounded-3xl overflow-hidden relative shadow-sm group select-none cursor-ew-resize"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      }}
    >
      <div className="absolute inset-0 z-10">
        <Image src={afterImage} alt="After clean" fill className="object-cover pointer-events-none" />
        <div className="absolute top-4 right-4 bg-[#FB8C42] text-white text-[12px] font-bold px-3 py-1.5 rounded-full pointer-events-none">After</div>
      </div>
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={beforeImage} alt="Before clean" fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[12px] font-bold px-3 py-1.5 rounded-full pointer-events-none">Before</div>
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize pointer-events-none z-30" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
          <ArrowLeftRight className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      {label && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-4 py-2 rounded-full z-30 shadow-sm pointer-events-none whitespace-nowrap">
          {label.replace(' · Before/After', '').replace(' — BEFORE/AFTER', '')}
        </div>
      )}
    </div>
  );
}

  export default function BeforeAfter() {
    const [beforeAfterRef, beforeAfterApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    watchDrag: false, 
    breakpoints: { '(min-width: 768px)': { active: false } } 
  });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!beforeAfterApi || isInteracting) return;
    const interval = setInterval(() => {
      // Only scroll automatically if viewport is mobile (embla is active)
      if (window.innerWidth < 768) {
        beforeAfterApi.scrollNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [beforeAfterApi, isInteracting]);

  const comparisons = [
    {
      beforeImage: "/images/cabinet-before-cleaning-melbourne.webp",
      afterImage: "/images/cabinet-after-cleaning-melbourne.webp",
      label: "CABINET BOTTOM"
    },
    {
      beforeImage: "/images/toilet-before-cleaning-melbourne.webp",
      afterImage: "/images/toilet-after-cleaning-melbourne.webp",
      label: "TOILET"
    },
    {
      beforeImage: "/images/drawer-before-cleaning-melbourne.webp",
      afterImage: "/images/drawer-after-cleaning-melbourne.webp",
      label: "DRAWERS"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-6 md:px-8 max-w-[1216px]">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-20 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              BEFORE / AFTER
            </span>
          </div>
          <h2 
            style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3 max-w-[650px]"
          >
            Real results from Melbourne <br className="hidden md:block" /> homes.
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            Drag to compare.
          </p>
        </div>

        {/* Comparisons Grid */}
        <div 
          className="-mx-6 px-6 md:mx-0 md:px-0 overflow-hidden mb-8 md:mb-12" 
          ref={beforeAfterRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 touch-pan-y">
            {comparisons.map((comp, index) => (
              <div key={index} className={`flex-[0_0_85%] md:flex-none min-w-0 ${index === comparisons.length - 1 ? "pr-6 md:pr-0" : ""}`}>
                <ComparisonCard
                  beforeImage={comp.beforeImage}
                  afterImage={comp.afterImage}
                  label={comp.label}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
