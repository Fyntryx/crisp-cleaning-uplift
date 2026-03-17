"use client";

import { useEffect, useState } from "react";

interface BubbleConfig {
  id: number;
  size: number;
  left: string;
  top: number;
  speed: number;
  opacity: number;
  blur: number;
}

const BUBBLES_MAP: BubbleConfig[] = [
  {
    id: 1,
    size: 350,
    left: "-8%",
    top: 15,
    speed: 0.5,
    opacity: 0.15,
    blur: 20,
  },
  {
    id: 2,
    size: 450,
    left: "92%",
    top: 55,
    speed: 0.6,
    opacity: 0.12,
    blur: 25,
  },
  {
    id: 3,
    size: 300,
    left: "-5%",
    top: 90,
    speed: 0.45,
    opacity: 0.15,
    blur: 15,
  },

  { id: 10, size: 100, left: "15%", top: 5, speed: 0.2, opacity: 0.1, blur: 6 },
  {
    id: 11,
    size: 120,
    left: "60%",
    top: 18,
    speed: 0.25,
    opacity: 0.08,
    blur: 8,
  },
  {
    id: 12,
    size: 90,
    left: "35%",
    top: 35,
    speed: 0.22,
    opacity: 0.09,
    blur: 5,
  },
  {
    id: 13,
    size: 140,
    left: "80%",
    top: 45,
    speed: 0.28,
    opacity: 0.07,
    blur: 9,
  },
  {
    id: 14,
    size: 110,
    left: "10%",
    top: 65,
    speed: 0.2,
    opacity: 0.1,
    blur: 6,
  },
  {
    id: 15,
    size: 85,
    left: "50%",
    top: 75,
    speed: 0.23,
    opacity: 0.08,
    blur: 4,
  },
  {
    id: 16,
    size: 130,
    left: "25%",
    top: 95,
    speed: 0.26,
    opacity: 0.09,
    blur: 7,
  },
  {
    id: 17,
    size: 95,
    left: "70%",
    top: 110,
    speed: 0.21,
    opacity: 0.1,
    blur: 5,
  },
  {
    id: 18,
    size: 115,
    left: "5%",
    top: 125,
    speed: 0.24,
    opacity: 0.08,
    blur: 6,
  },
  {
    id: 19,
    size: 105,
    left: "90%",
    top: 140,
    speed: 0.29,
    opacity: 0.07,
    blur: 8,
  },
  {
    id: 20,
    size: 125,
    left: "40%",
    top: 160,
    speed: 0.25,
    opacity: 0.09,
    blur: 7,
  },
  {
    id: 21,
    size: 80,
    left: "65%",
    top: 185,
    speed: 0.22,
    opacity: 0.1,
    blur: 4,
  },
  {
    id: 22,
    size: 135,
    left: "20%",
    top: 210,
    speed: 0.27,
    opacity: 0.08,
    blur: 9,
  },
  {
    id: 23,
    size: 90,
    left: "85%",
    top: 235,
    speed: 0.23,
    opacity: 0.09,
    blur: 5,
  },
  {
    id: 24,
    size: 110,
    left: "55%",
    top: 260,
    speed: 0.21,
    opacity: 0.1,
    blur: 6,
  },

  { id: 30, size: 40, left: "5%", top: 8, speed: 0.1, opacity: 0.06, blur: 2 },
  {
    id: 31,
    size: 25,
    left: "28%",
    top: 12,
    speed: 0.08,
    opacity: 0.08,
    blur: 1,
  },
  {
    id: 32,
    size: 55,
    left: "45%",
    top: 25,
    speed: 0.12,
    opacity: 0.05,
    blur: 3,
  },
  {
    id: 33,
    size: 30,
    left: "75%",
    top: 32,
    speed: 0.09,
    opacity: 0.07,
    blur: 2,
  },
  {
    id: 34,
    size: 45,
    left: "95%",
    top: 40,
    speed: 0.14,
    opacity: 0.06,
    blur: 2,
  },
  {
    id: 35,
    size: 20,
    left: "18%",
    top: 52,
    speed: 0.06,
    opacity: 0.08,
    blur: 1,
  },
  {
    id: 36,
    size: 60,
    left: "62%",
    top: 58,
    speed: 0.11,
    opacity: 0.05,
    blur: 3,
  },
  {
    id: 37,
    size: 35,
    left: "32%",
    top: 70,
    speed: 0.09,
    opacity: 0.07,
    blur: 2,
  },
  {
    id: 38,
    size: 50,
    left: "88%",
    top: 82,
    speed: 0.13,
    opacity: 0.06,
    blur: 2,
  },
  {
    id: 39,
    size: 28,
    left: "2%",
    top: 98,
    speed: 0.07,
    opacity: 0.08,
    blur: 1,
  },
  {
    id: 40,
    size: 42,
    left: "52%",
    top: 105,
    speed: 0.1,
    opacity: 0.05,
    blur: 2,
  },
  {
    id: 41,
    size: 58,
    left: "22%",
    top: 118,
    speed: 0.12,
    opacity: 0.06,
    blur: 3,
  },
  {
    id: 42,
    size: 32,
    left: "78%",
    top: 135,
    speed: 0.08,
    opacity: 0.07,
    blur: 2,
  },
  {
    id: 43,
    size: 48,
    left: "12%",
    top: 155,
    speed: 0.11,
    opacity: 0.05,
    blur: 2,
  },
  {
    id: 44,
    size: 22,
    left: "38%",
    top: 175,
    speed: 0.06,
    opacity: 0.08,
    blur: 1,
  },
  {
    id: 45,
    size: 52,
    left: "92%",
    top: 195,
    speed: 0.13,
    opacity: 0.06,
    blur: 3,
  },
  {
    id: 46,
    size: 36,
    left: "68%",
    top: 215,
    speed: 0.09,
    opacity: 0.07,
    blur: 2,
  },
  {
    id: 47,
    size: 44,
    left: "42%",
    top: 230,
    speed: 0.1,
    opacity: 0.05,
    blur: 2,
  },
  {
    id: 48,
    size: 26,
    left: "8%",
    top: 255,
    speed: 0.07,
    opacity: 0.08,
    blur: 1,
  },
  {
    id: 49,
    size: 54,
    left: "82%",
    top: 280,
    speed: 0.12,
    opacity: 0.06,
    blur: 3,
  },
];

const ParallaxBubbles = ({ className = "fixed inset-0" }: { className?: string }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${className} pointer-events-none overflow-hidden z-0`}>
      {BUBBLES_MAP.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-primary will-change-transform"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            top: `${bubble.top}vh`,
            opacity: bubble.opacity,
            filter: `blur(${bubble.blur}px)`,

            transform: `translate3d(0, ${-scrollY * bubble.speed}px, 0)`,
            transition: "transform 0.1s linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBubbles;
