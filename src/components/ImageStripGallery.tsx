"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    src: "/before.png",
    alt: "Expert Care",
    title: "Expert Care",
  },
  {
    id: 2,
    src: "/after.jpg",
    alt: "Freshness Delivered",
    title: "Freshness",
  },
  {
    id: 3,
    src: "/before.png",
    alt: "Eco Solutions",
    title: "Eco-Friendly",
  },
  {
    id: 4,
    src: "/after.jpg",
    alt: "Detail Oriented",
    title: "Detailed",
  },
  {
    id: 5,
    src: "/before.png",
    alt: "Clean World",
    title: "Quality",
  },
  {
    id: 6,
    src: "/after.jpg",
    alt: "Detail Oriented",
    title: "Detailed",
  },
  {
    id: 7,
    src: "/before.png",
    alt: "Clean World",
    title: "Quality",
  },
];

export const ImageStripGallery = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500px] bg-secondary/5 rounded-full pointer-events-none -z-10 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-foreground">
            Where every garment gets{" "}
            <span className="text-primary">expert care</span>
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-foreground">
            Freshness delivered straight{" "}
            <span className="text-accent">to your door</span>
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-foreground">
            Eco-friendly solutions for a{" "}
            <span className="text-primary">cleaner world</span>
          </motion.h3>
        </div>

        <div className="flex flex-row h-[600px] w-full gap-1 overflow-hidden">
          {items.map((item, index) => {
            const isBottomAligned = index % 2 === 0;
            const DURATION = 0.5;
            const STAGGER = 0.05;
      
            let visibilityClass = "block";
            if (index >= 5) {
              visibilityClass = "hidden lg:block";
            } else if (index >= 3) {
              visibilityClass = "hidden md:block";
            }

            return (
              <motion.div
                key={item.id}
                initial={{ y: isBottomAligned ? "100%" : "-100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{
                  duration: DURATION,
                  ease: "circOut",
                  delay: isBottomAligned
                    ? index * STAGGER
                    : DURATION + index * STAGGER,
                }}
                className={`relative flex-1 group overflow-hidden rounded-2xl cursor-pointer h-[580px] 
                  ${isBottomAligned ? "self-end" : "self-start"} 
                  ${visibilityClass}`}
                whileHover={{ flexGrow: 3.5 }}
                style={{ flexBasis: "0%" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute bottom-6 left-6 z-20">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium rounded-full mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    0{index + 1}
                  </span>
                  <p className="text-white font-display font-bold text-xl md:text-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150 break-all">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
