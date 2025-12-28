"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

const POSITIONS = [
  { x: "-20vw", y: "-30vh", scale: 0.8, labelPos: "bottom" },
  { x: "13vw", y: "-30vh", scale: 0.8, labelPos: "bottom" },
  { x: "-35vw", y: "-5vh", scale: 0.85, labelPos: "bottom" },
  { x: "-35vw", y: "25vh", scale: 0.85, labelPos: "top-right" },
  { x: "37vw", y: "-10vh", scale: 0.85, labelPos: "top-left" },
  { x: "-20vw", y: "45vh", scale: 0.8, labelPos: "top-right" },
  { x: "0vw", y: "48vh", scale: 0.8, labelPos: "top-middle" },
  { x: "30vw", y: "42vh", scale: 0.8, labelPos: "top-left" },
];

interface CtaProps {
  data: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonLink: string;
    floatingImages: any[];
  };
}

const FloatingCard = ({
  item,
  index,
  progress,
}: {
  item: any;
  index: number;
  progress: MotionValue<number>;
}) => {
  const pos = POSITIONS[index] || POSITIONS[1];

  const x = useTransform(progress, [0, 1], ["0%", pos.x]);
  const y = useTransform(progress, [0, 1], ["0%", pos.y]);

  const END_SCALE_FACTOR = 0.4;
  const targetScale = (pos.scale ?? 1) * END_SCALE_FACTOR;
  const scale = useTransform(progress, [0, 1], [1, targetScale]);

  const labelOpacity = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <motion.div
      style={{ x, y, scale, translateX: "-50%", translateY: "-50%" }}
      className="absolute left-0 top-0 z-10 flex flex-col items-center justify-center">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: "30vw", height: "52vh" }}>
        {item.image && (
          <Image
            src={urlFor(item.image).width(400).url()}
            alt={item.label || "CTA Image"}
            fill
            className="object-cover"
            sizes="200px"
          />
        )}
      </div>

      {item.label && (
        <motion.div
          style={{ opacity: labelOpacity }}
          className={`
              absolute w-max rounded-md bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-800
              ${pos.labelPos === "top-right" ? "-right-4 -top-8" : ""}
              ${pos.labelPos === "top-left" ? "-left-4 -top-8" : ""}
              ${pos.labelPos === "bottom" ? "-bottom-8" : ""}
              ${pos.labelPos === "top-middle" ? "-top-8" : ""}
            `}>
          {item.label}
        </motion.div>
      )}
    </motion.div>
  );
};

const ImageEffect = ({ data }: CtaProps) => {
  const { heading, subheading, buttonText, buttonLink, floatingImages } = data;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.7, 0.9], [0.95, 1]);
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] pb-16">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          {floatingImages?.slice(0, 9).map((item, index) => (
            <FloatingCard
              key={item._key || index}
              item={item}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-30 mx-auto max-w-2xl text-center px-6">
          <h2 className="mb-6 text-3xl md:text-5xl font-display font-bold">
            {heading.split(" ").map((word, i) =>
              ["space", "is", "just"].includes(word.toLowerCase()) ? (
                <span key={i} className="text-gradient">
                  {" "}
                  {word}{" "}
                </span>
              ) : (
                <span key={i}> {word} </span>
              )
            )}
          </h2>

          <p className="max-w-lg mx-auto text-lg text-muted-foreground leading-relaxed mb-10">
            {subheading}
          </p>

          <Link href={buttonLink || "/"}>
            <Button variant="hero">{buttonText}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageEffect;
