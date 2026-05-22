"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";

interface ComparisonCardProps {
  beforeImage: string;
  afterImage: string;
  label: string;
}

function ComparisonCard({ beforeImage, afterImage, label }: ComparisonCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden group select-none shadow-sm">
        
        {/* After Image (Background) & Badge */}
        <div className="absolute inset-0">
          <Image 
            src={afterImage} 
            alt="After clean" 
            fill 
            className="object-cover pointer-events-none" 
          />
          <div className="absolute top-5 right-5 bg-[#FB8C42] text-white text-[12px] font-bold px-4 py-1.5 rounded-full tracking-wide z-10 pointer-events-none shadow-sm">
            After
          </div>
        </div>

        {/* Before Image (Clipped) & Badge */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image 
            src={beforeImage} 
            alt="Before clean" 
            fill 
            className="object-cover" 
          />
          <div className="absolute top-5 left-5 bg-[#2A2A2A] text-white text-[12px] font-bold px-4 py-1.5 rounded-full tracking-wide z-10 pointer-events-none shadow-sm">
            Before
          </div>
        </div>

        {/* Slider Line & Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-20 pointer-events-none flex items-center justify-center transition-transform duration-75"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700">
            <ArrowLeftRight size={18} />
          </div>
        </div>

        {/* Invisible Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-pan-y"
        />
      </div>

      {/* Label */}
      <div className="text-center mt-6">
        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const comparisons = [
    {
      beforeImage: "/images/StoveTopBefore.jpg",
      afterImage: "/images/StoveTopAfter.jpg",
      label: "Stovetop · Before/After"
    },
    {
      beforeImage: "/images/BathtubeBefore.jpg",
      afterImage: "/images/BathTubeAfter.jpg",
      label: "Bathtub · Before/After"
    },
    {
      beforeImage: "/images/WindowBefore.jpg",
      afterImage: "/images/WindowAfter.jpg",
      label: "Window · Before/After"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-4 max-w-[1216px]">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-20 max-w-[896px]">
          <div className="mb-3">
            <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
              BEFORE / AFTER
            </span>
          </div>
          <h2 
            style={{ letterSpacing: "-1.2px", lineHeight: "48px" }}
            className="text-[48px] font-semibold text-gray-900 mb-5 mt-3"
          >
            Real results from Melbourne <br className="hidden md:block" />
            homes.
          </h2>
          <p className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
            Drag to compare.
          </p>
        </div>

        {/* Comparisons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comparisons.map((comp, index) => (
            <ComparisonCard
              key={index}
              beforeImage={comp.beforeImage}
              afterImage={comp.afterImage}
              label={comp.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
