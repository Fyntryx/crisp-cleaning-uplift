"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

// --- 1. DATA STRUCTURE ---
const POSITIONS = [
  /* DESKTOP (0-7) | Base: 361.38 */
  {
    x: "-18vw",
    y: "-42vh",
    iS: 0.6369,
    tS: 0.3539,
    lPos: "top-left",
    base: 361.38,
  },
  { x: "15vw", y: "-40vh", iS: 1.0, tS: 0.4, lPos: "top", base: 361.38 },
  { x: "-38vw", y: "-11vh", iS: 0.72, tS: 0.4, lPos: "left-top", base: 361.38 },
  {
    x: "-38vw",
    y: "32vh",
    iS: 0.6092,
    tS: 0.3384,
    lPos: "left-bottom",
    base: 361.38,
  },
  { x: "38vw", y: "-15vh", iS: 0.72, tS: 0.4, lPos: "right", base: 361.38 },
  {
    x: "-20vw",
    y: "53vh",
    iS: 0.4985,
    tS: 0.2769,
    lPos: "bottom-left",
    base: 361.38,
  },
  {
    x: "10vw",
    y: "48vh",
    iS: 0.6092,
    tS: 0.3384,
    lPos: "bottom-middle",
    base: 361.38,
  },
  {
    x: "38vw",
    y: "55vh",
    iS: 0.4985,
    tS: 0.2769,
    lPos: "bottom-right",
    base: 361.38,
  },

  /* TABLET (8-13) | Dynamic Calculation logic will override 'base' */
  { x: "-30vw", y: "-45vh", iS: 0.63, tS: 0.35, lPos: "top-left", base: 454 },
  { x: "25vw", y: "-42vh", iS: 1.0, tS: 0.4, lPos: "top-right", base: 454 },
  { x: "-41vw", y: "7vh", iS: 0.504, tS: 0.28, lPos: "left", base: 454 },
  { x: "40vw", y: "0vh", iS: 0.504, tS: 0.28, lPos: "right", base: 454 },
  {
    x: "-35vw",
    y: "57vh",
    iS: 0.504,
    tS: 0.28,
    lPos: "bottom-left",
    base: 454,
  },
  { x: "18vw", y: "60vh", iS: 0.72, tS: 0.4, lPos: "bottom-right", base: 454 },

  /* MOBILE (14-17) | Dynamic Calculation logic will override 'base' */
  {
    x: "-35vw",
    y: "-45vh",
    iS: 0.6417,
    tS: 0.3565,
    lPos: "top-left",
    base: 317,
  },
  { x: "25vw", y: "-42vh", iS: 1.0, tS: 0.4, lPos: "top-right", base: 317 },
  {
    x: "-37vw",
    y: "50vh",
    iS: 0.4382,
    tS: 0.2435,
    lPos: "bottom-left",
    base: 317,
  },
  { x: "20vw", y: "60vh", iS: 0.72, tS: 0.4, lPos: "bottom-right", base: 317 },
];

const LAYOUT_CONFIG = {
  mobile: [
    { imgIdx: 0, posIdx: 14 },
    { imgIdx: 2, posIdx: 16 },
    { imgIdx: 3, posIdx: 17 },
    { imgIdx: 1, posIdx: 15 },
  ],
  tablet: [
    { imgIdx: 0, posIdx: 8 },
    { imgIdx: 2, posIdx: 10 },
    { imgIdx: 3, posIdx: 11 },
    { imgIdx: 4, posIdx: 12 },
    { imgIdx: 5, posIdx: 13 },
    { imgIdx: 1, posIdx: 9 },
  ],
  desktop: [
    { imgIdx: 0, posIdx: 0 },
    { imgIdx: 2, posIdx: 2 },
    { imgIdx: 3, posIdx: 3 },
    { imgIdx: 4, posIdx: 4 },
    { imgIdx: 5, posIdx: 5 },
    { imgIdx: 6, posIdx: 6 },
    { imgIdx: 7, posIdx: 7 },
    { imgIdx: 1, posIdx: 1 },
  ],
};

const ANIMATION_END = 0.85;

const FloatingCard = ({
  item,
  positionIndex,
  progress,
  dynamicBase, // Receive the calculated size
}: {
  item: any;
  positionIndex: number;
  progress: MotionValue<number>;
  dynamicBase: number;
}) => {
  const pos = POSITIONS[positionIndex] || POSITIONS[0];

  const x = useTransform(progress, [0, ANIMATION_END], ["0%", pos.x]);
  const y = useTransform(progress, [0, ANIMATION_END], ["0%", pos.y]);
  const scale = useTransform(progress, [0, ANIMATION_END], [pos.iS, pos.tS]);
  const labelOpacity = useTransform(
    progress,
    [ANIMATION_END - 0.1, ANIMATION_END],
    [0, 1]
  );

  return (
    <motion.div
      style={{ x, y, scale, translateX: "-50%", translateY: "-50%" }}
      className="absolute left-0 top-0 z-10 flex flex-col items-center justify-center">
      <div
        className="relative overflow-hidden rounded-3xl shadow-lg"
        style={{ width: `${dynamicBase}px`, aspectRatio: "1/1" }}>
        {item.image && (
          <Image
            src={urlFor(item.image).width(600).url()}
            alt={item.label || "CTA Image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 400px, 450px"
          />
        )}
      </div>

      {item.label && (
        <motion.div
          style={{ opacity: labelOpacity }}
          className={`absolute w-max rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800
            ${pos.lPos === "top-right" ? "-right-4 -top-8" : ""}
            ${pos.lPos === "top-left" ? "-left-4 -top-8" : ""}
            ${pos.lPos === "bottom-left" ? "-left-4 -bottom-8" : ""}
            ${pos.lPos === "top-middle" ? "-top-8" : ""}
          `}>
          {item.label}
        </motion.div>
      )}
    </motion.div>
  );
};

const ImageEffect = ({ data }: { data: any }) => {
  const { heading, subheading, buttonText, buttonLink, floatingImages } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const [deviceType, setDeviceType] =
    useState<keyof typeof LAYOUT_CONFIG>("desktop");
  const [dynamicBase, setDynamicBase] = useState(361.38); // Initial state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;

      let type: keyof typeof LAYOUT_CONFIG = "desktop";
      let baseSize = 361.38;

      if (width < 768) {
        type = "mobile";
        // Linear Interpolation: 317px (at 767px) to 200px (at 375px)
        // Formula: minSize + (currentWidth - minWidth) * (maxSize - minSize) / (maxWidth - minWidth)
        const calcMobile = 200 + ((width - 375) * (317 - 200)) / (767 - 375);
        baseSize = Math.max(200, calcMobile);
      } else if (width < 990) {
        type = "tablet";
        // Linear Interpolation: 344.78px (at 768px) to 454px (at 990px)
        const calcTablet =
          344.78 + ((width - 768) * (454 - 344.78)) / (990 - 768);
        baseSize = calcTablet;
      } else {
        type = "desktop";
        baseSize = 361.38;
      }

      setDeviceType(type);
      setDynamicBase(baseSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  });

  const textOpacity = useTransform(
    smoothProgress,
    [0.7, ANIMATION_END],
    [0, 1]
  );
  const textScale = useTransform(
    smoothProgress,
    [0.7, ANIMATION_END],
    [0.95, 1]
  );
  const textY = useTransform(smoothProgress, [0.7, ANIMATION_END], [40, 0]);

  const activeConfig = isMounted
    ? LAYOUT_CONFIG[deviceType]
    : LAYOUT_CONFIG["desktop"];

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] pb-16 max-[990px]:mb-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          {floatingImages &&
            activeConfig.map((config, i) => (
              <FloatingCard
                key={`${i}-${deviceType}`}
                item={floatingImages[config.imgIdx]}
                positionIndex={config.posIdx}
                progress={smoothProgress}
                dynamicBase={dynamicBase}
              />
            ))}
        </div>

        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-30 mx-auto w-full px-6 flex flex-col items-center text-center">
          {/* The inline-block wrapper ensures the paragraph width matches the heading width */}
          <div className="inline-block max-w-4xl">
            <h2
              className="mb-6 font-display font-bold leading-[1.1] 
                   text-[clamp(2rem,8vw,4.8rem)] tracking-tight">
              <span className="block">Your clean happy</span>

              <span className="block">
                <span className="text-gradient">space</span>{" "}
                <span className="text-gradient">is</span>{" "}
                <span className="text-gradient">just</span> one
              </span>

              <span className="block">click away</span>
            </h2>

            <p className="mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              {subheading}
            </p>

            <Link href={buttonLink || "/"}>
              <Button variant="hero" className="px-8 py-6 text-lg">
                {buttonText}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageEffect;
