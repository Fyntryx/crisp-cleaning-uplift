"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CONTENT = {
  mission: {
    heading: "Our mission is to help people everywhere to have a clean space",
    text: (
      <>
        <p className="mb-6">
          At the core of our commitment lies a simple yet profound mission: to
          empower individuals worldwide in achieving and maintaining a clean and
          organised living or working environment.
        </p>
        <p className="mb-6">
          Recognising the transformative impact of cleanliness on overall
          well-being, productivity, and peace of mind, we have dedicated
          ourselves to providing accessible solutions for people everywhere.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <div className="h-1 w-12 bg-[#FB8C42] rounded-full" />
          <span className="font-semibold text-gray-900 italic">
            Redefining excellence since 2023.
          </span>
        </div>
      </>
    ),
    mainImage: "/images/house-cleaning-melbourne-bedroom.webp",
    secondaryImage: "/images/house-cleaning-melbourne-living-room.webp",
  },
  story: {
    heading: "From a humble vision to a pioneering force in cleaning",
    text: (
      <>
        <p className="mb-6">
          Established with a passion for making life easier and spaces more
          beautiful, <strong>Crisp Cleaning</strong> was founded in
          2023. What began as a vision to redefine the cleaning industry has
          evolved into a pioneering force.
        </p>
        <p className="mb-6">
          We integrate exceptional cleaning services with unmatched convenience,
          ensuring that every client feels the difference of a truly
          professional touch in their daily lives.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <div className="h-1 w-12 bg-[#FB8C42] rounded-full" />
          <span className="font-semibold text-gray-900 italic">
            Redefining excellence since 2023.
          </span>
        </div>
      </>
    ),
    mainImage: "/images/our-story-cleaning-company-melbourne.webp",
    secondaryImage: "/images/clean-living-room-melbourne.webp",
  },
};

export const MissionStorySection = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "story">("mission");
  const activeContent = CONTENT[activeTab];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative z-10">
            <div className="mb-6">
              <span className="text-[#FB8C42] font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px]">
                ABOUT US
              </span>
            </div>

            <div className="relative min-h-[300px] mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}>
                  <h3 
                    style={{ letterSpacing: "-1.2px", lineHeight: "1.1" }}
                    className="text-[48px] font-semibold text-gray-900 mb-6"
                  >
                    {activeContent.heading}
                  </h3>
                  <div className="text-[18px] text-gray-500 font-normal leading-[28px] max-w-[600px]">
                    {activeContent.text}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setActiveTab("mission")}
                variant={activeTab === "mission" ? "default" : "secondary"}
                size="lg"
                className="rounded-full px-8">
                OUR MISSION
              </Button>
              <Button
                onClick={() => setActiveTab("story")}
                variant={activeTab === "story" ? "default" : "secondary"}
                size="lg"
                className="rounded-full px-8">
                OUR STORY
              </Button>
            </div>
          </div>

          <div className="relative h-[600px] w-full hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-main"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 right-0 w-[85%] h-[80%] rounded-3xl overflow-hidden shadow-2xl z-10">
                <img
                  src={activeContent.mainImage}
                  alt="Main"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-secondary"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-10 left-0 w-[45%] h-[40%] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white z-20">
                <img
                  src={activeContent.secondaryImage}
                  alt="Secondary"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
