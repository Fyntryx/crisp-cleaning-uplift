"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import ParallaxBubbles from "@/components/ParallaxBubbles";

const getNumberStrip = (
  target: number,
  start: number,
  direction: "up" | "down"
) => {
  const strip: number[] = [];
  let current = start;
  strip.push(current);
  const needsFullLoop = start === target;
  do {
    if (direction === "up") {
      current = current === 9 ? 0 : current + 1;
    } else {
      current = current === 0 ? 9 : current - 1;
    }
    strip.push(current);
  } while (needsFullLoop ? current !== start : current !== target);
  if (needsFullLoop && current !== target) strip.push(target);
  return strip;
};

const RollingDigit = ({ char, index, delay, controls }: any) => {
  if (isNaN(Number(char)))
    return (
      <span className="h-[1em] flex items-center text-primary">{char}</span>
    );
  const target = Number(char);
  const start = index % 2 === 0 ? 0 : 9;
  const direction = start === 0 ? "up" : "down";
  const strip =
    direction === "down"
      ? getNumberStrip(target, start, direction).reverse()
      : getNumberStrip(target, start, direction);
  const finalY =
    direction === "up" ? -((strip.length - 1) * 1) : (strip.length - 1) * 1;

  return (
    <div className="relative h-[1em] w-[0.50em] overflow-hidden inline-block">
      <motion.div
        initial={{ y: 0 }}
        animate={controls}
        custom={{ finalY, delay }}
        className={`absolute left-0 w-full ${direction === "up" ? "top-0" : "bottom-0"}`}
      >
        {strip.map((n, i) => (
          <div
            key={i}
            className="h-[1em] flex items-center justify-center leading-none"
          >
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StatCard = ({ number, label, delay = 0, controls }: any) => {
  const chars = number.split("");
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-h-[100px] shadow-lg">
      <div className="text-4xl font-display font-bold leading-none flex tabular-nums">
        {chars.map((char: string, index: number) => (
          <RollingDigit
            key={index}
            char={char}
            index={index}
            delay={delay + index * 0.12}
            controls={controls}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-medium text-lg mt-3">{label}</p>
    </div>
  );
};

export const StatsSection = () => {
  const stats = [
    { number: "10+", label: "Years of experience" },
    { number: "10+", label: "Amazing customers" },
    { number: "300+", label: "Hours of cleaning" },
    { number: "100+", label: "Projects done" },
  ];

  const controls = useAnimationControls();
  
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start((custom) => ({
          y: ["0em", `${custom.finalY}em`],
          transition: {
            delay: custom.delay, 
            duration: 1.5,
            ease: [0.25, 1, 0.5, 1],
            times: [0, 0.85, 1],
          },
        }));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [controls, isInView]);

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <ParallaxBubbles />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="max-w-xl relative z-30">
            <span className="inline-block px-6 py-2 bg-[#FF8C42] text-white text-sm font-semibold rounded-full mb-6 shadow-md">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
              Creating A <span className="text-primary">Cleaner Future</span>{" "}
              Through Our Reliable Services
            </h2>
          </div>

          <div 
            ref={sectionRef} 
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 relative z-20"
          >
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                number={stat.number}
                label={stat.label}
                delay={i * 0.15}
                controls={controls}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
