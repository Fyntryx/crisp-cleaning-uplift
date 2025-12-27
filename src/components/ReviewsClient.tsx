"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";

import { ReviewsHero } from "@/components/ReviewsHero";
import { ReviewsGrid } from "@/components/ReviewsGrid";
import { CTASection } from "@/components/CTASection";
import { ReviewItem } from "@/components/ReviewsCards";

interface ReviewsClientProps {
  data: ReviewItem[];
}

const ReviewsClient = ({ data }: ReviewsClientProps) => {
  return (
    <>
      <style jsx global>{`
        @keyframes scrollUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollDown {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0%);
          }
        }
        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }

        .animate-scroll-up {
          animation: scrollUp 120s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 120s linear infinite;
        }
        .animate-scroll-left {
          animation: scrollLeft 120s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 120s linear infinite;
        }

        .marquee-container:hover .animate-scroll-up,
        .marquee-container:hover .animate-scroll-down,
        .marquee-container:hover .animate-scroll-left,
        .marquee-container:hover .animate-scroll-right {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="min-h-screen bg-background">
        <ParallaxBubbles />
        <Navbar />

        <ReviewsHero data={data} />

        <ReviewsGrid data={data} />

        <CTASection
          heading="Streamline your cleaning experience"
          description="Your cleaning solutions are just a click away."
          primaryAction={{
            text: "Get a Free Quote",
            href: "/#services",
          }}
          secondaryAction={{
            text: "Contact Us",
            href: "/contact",
          }}
        />
      </div>

      <Footer />
    </>
  );
};

export default ReviewsClient;
