"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

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
}

export default function Process({ title, subtitle }: ProcessProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 bg-white" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">How It Works</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            {title || "The 5-step system behind every clean."}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="relative pl-8 md:pl-16">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[15px] md:left-[35px] top-8 bottom-12 w-px bg-orange-100/50"></div>
          
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-[15px] md:left-[35px] top-8 bottom-12 w-px bg-primary origin-top"
            style={{ scaleY }}
          ></motion.div>

          <div className="space-y-16 relative z-10">
            {steps.map((step, index) => {
              const circleVariants = {
                inactive: {
                  backgroundColor: "rgba(255, 247, 237, 0.8)", // bg-orange-50/80
                  color: "#f97316", // text-primary
                  scale: 1,
                },
                active: {
                  backgroundColor: "#f97316", // bg-primary (solid orange)
                  color: "#ffffff", // text-white
                  scale: 1.15,
                  transition: { type: "spring" as const, stiffness: 300, damping: 20 }
                }
              };

              return (
                <div key={index} className="relative group">
                  {/* Number Indicator (fills with bg-primary when line enters circle) */}
                  <motion.div 
                    variants={circleVariants}
                    initial="inactive"
                    whileInView="active"
                    whileHover={{ scale: 1.25 }}
                    viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                    className="absolute -left-[32px] md:-left-[52px] top-8 w-10 h-10 rounded-full font-bold text-base flex items-center justify-center shadow-sm border-[4px] border-white ring-1 ring-orange-100 z-20 transition-transform leading-none pt-0.5 cursor-default"
                  >
                    {index + 1}
                  </motion.div>

                  <div className="pl-6 md:pl-4 py-2">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-orange-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                        Step {index + 1} — {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
