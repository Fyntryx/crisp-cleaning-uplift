"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  {
    title: "Book in 30 seconds",
    description: "Fill in a few quick details and lock in your preferred time. No phone calls, no back-and-forth — your booking is confirmed instantly."
  },
  {
    title: "A cleaner is assigned",
    description: "We match you with a vetted, experienced Crisp cleaner. You'll get their name and profile before the day so you know exactly who to expect."
  },
  {
    title: "Day of the clean",
    description: "Your cleaner arrives on time, works through the full Crisp checklist room by room, and leaves nothing unchecked."
  },
  {
    title: "The Crisp Standard",
    description: "Every clean includes our signature finish — aromatic refresh, linen folds, chrome polish, and a reset that genuinely looks and feels different."
  },
  {
    title: "Final check and follow up",
    description: "Before leaving, your cleaner does a final walkthrough. You'll receive a summary after the clean and a direct line if anything needs attention."
  }
];

interface ProcessProps {
  title?: string;
  subtitle?: string;
  layout?: "center" | "left";
}

function StepCircle({ index, totalSteps, scrollYProgress }: {
  index: number;
  totalSteps: number;
  scrollYProgress: any;
}) {
  // Each step activates when the line reaches it
  // Step threshold is evenly distributed across 0-1 scroll range
  const threshold = index === totalSteps - 1 ? 0.9 : index / (totalSteps - 1);

  const backgroundColor = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold + 0.05],
    ["rgba(255, 247, 237, 0.8)", "#FB8C42"]
  );

  const color = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold + 0.05],
    ["#FB8C42", "#ffffff"]
  );

  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold + 0.05],
    [1, 1.15]
  );

  return (
    <motion.div
      style={{ backgroundColor, color, scale }}
      className="absolute -left-[32px] md:-left-[52px] top-14 w-10 h-10 rounded-full font-bold text-base flex items-center justify-center shadow-sm border-[4px] border-white ring-1 ring-orange-100 z-20 leading-none pt-0.5"
    >
      {index + 1}
    </motion.div>
  );
}

export default function Process({ title, subtitle, layout = "center" }: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className={`container mx-auto px-4 ${layout === "left" ? "max-w-[1216px]" : "max-w-4xl"}`}>
        <div className={`mb-16 ${layout === "left" ? "max-w-[896px]" : "text-center"}`}>
          {layout === "left" ? (
            <div className="mb-3">
              <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                How It Works
              </span>
            </div>
          ) : (
            <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">How It Works</h4>
          )}
          <h2
            style={layout === "left" ? { letterSpacing: "-1.2px", lineHeight: "48px" } : undefined}
            className={`mb-5 ${layout === "left" ? "text-[48px] font-semibold text-gray-900 mt-3" : "text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6"}`}
          >
            {title || "The 5-step system behind every clean."}
          </h2>
          {subtitle && (
            <p className={`${layout === "left" ? "text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]" : "text-lg text-muted-foreground"}`}>{subtitle}</p>
          )}
        </div>

        <div className="relative pl-8 md:pl-16">
          {/* Background line */}
          <div className="absolute left-[20px] md:left-[32px] top-8 bottom-12 w-px bg-orange-100/50"></div>

          {/* Animated fill line — tied to scroll */}
          <motion.div
            className="absolute left-[20px] md:left-[32px] top-8 bottom-12 w-px bg-[#FB8C42] origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-16 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <StepCircle
                  index={index}
                  totalSteps={steps.length}
                  scrollYProgress={scaleY}
                />
                <div className="pl-6 md:pl-4 py-2">
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-orange-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                      Step {index + 1} — {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-xl italic text-muted-foreground font-medium">
            No supervision required. No explanations repeated. Just a reliably clean home.
          </p>
        </div>
      </div>
    </section>
  );
}