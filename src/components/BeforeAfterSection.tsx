"use client";

import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const IMAGE_BEFORE = "/images/dirty-kitchen-before-cleaning.webp";
const IMAGE_AFTER = "/images/sparkling-clean-kitchen.webp";

export const BeforeAfterSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const isAfterView = sliderPosition > 50;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center min-h-[500px]">
          <div
            ref={containerRef}
            className="relative w-full lg:w-3/5 h-[400px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl cursor-col-resize group"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}>
            <img
              src={IMAGE_BEFORE}
              alt="Before Cleaning"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <span
              className={cn(
                "absolute top-4 left-4 px-4 py-1.5 text-xs font-bold tracking-wider rounded-full pointer-events-none z-30 transition-all duration-300",
                isAfterView
                  ? "bg-primary text-white shadow-lg scale-110"
                  : "bg-black/60 backdrop-blur-md text-white"
              )}>
              {isAfterView ? "AFTER" : "BEFORE"}
            </span>

            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <img
                src={IMAGE_AFTER}
                alt="After Cleaning"
                className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col justify-center text-foreground relative">
            <div className="w-16 h-16 rounded-full border-2 border-[#FB8C42]/30 flex items-center justify-center mb-6 bg-[#FB8C42]/5">
              <Sparkles className="w-8 h-8 text-[#FB8C42]" />
            </div>

            <div>
              <div className="mb-4">
                <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                  OUR MISSION
                </span>
              </div>
              <h2 
                style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }}
                className="text-[48px] font-semibold text-gray-900 mb-6"
              >
                We aim to <span className="text-[#FB8C42]">liberate you</span>{" "}
                from the burden of cleaning
              </h2>

              <div className="space-y-6 text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
                <p>
                  Our mission is simple yet powerful: to be your all-in-one
                  cleaning solution, taking the weight of cleaning
                  responsibilities off your shoulders so you can focus on what
                  truly matters.
                </p>
                <p>
                  We&apos;re not just a cleaning company; we&apos;re your
                  partners in maintaining a pristine and harmonious living and
                  working environment.
                </p>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
