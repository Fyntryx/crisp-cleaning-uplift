"use client";

import React from "react";
import { ReviewItem, MarqueeReviewCard } from "@/components/ReviewsCards";

interface ReviewsHeroProps {
  data: ReviewItem[];
}

export const ReviewsHero = ({ data }: ReviewsHeroProps) => {
  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);

  const ensureLength = (arr: ReviewItem[]) => {
    if (!arr.length) return [];
    let res = [...arr];
    while (res.length < 10) {
      res = [...res, ...arr];
    }
    return res.slice(0, 15);
  };
  const col1 = ensureLength(firstHalf);
  const col2 = ensureLength(secondHalf);

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-30 max-w-xl text-center lg:text-left mx-auto lg:mx-0 order-1">
            <span className="inline-block px-6 py-2 bg-[#FF8C42] text-white text-sm font-semibold rounded-full mb-6 lg:mb-8 shadow-md animate-fade-up">
              Crisp Cleaning is for you
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 lg:mb-8 text-foreground animate-fade-up"
              style={{ animationDelay: "100ms" }}>
              <span className="text-[#FF8C42]">Success stories</span> from real
              <br />
              Crisp Cleaning
              <br />
              customers
            </h1>
            <div
              className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-up"
              style={{ animationDelay: "200ms" }}>
              <p>
                As we showcase the results achieved through these partnerships,
                we invite you to explore the success stories that have unfolded
                across various industries.
              </p>
            </div>
          </div>

          <div className="relative w-full order-2 marquee-container z-20">
            <div className="block lg:hidden space-y-6">
              <div className="relative w-screen -ml-6 overflow-hidden mask-gradient-x">
                <div className="flex gap-4 animate-scroll-left w-max pl-6">
                  {[...col1, ...col1].map((review, i) => (
                    <MarqueeReviewCard
                      key={`m-r1-${i}`}
                      review={review}
                      className="w-[280px]"
                    />
                  ))}
                </div>
              </div>
              <div className="relative w-screen -ml-6 overflow-hidden mask-gradient-x">
                <div className="flex gap-4 animate-scroll-right w-max pl-6 -ml-[100%]">
                  {[...col2, ...col2].map((review, i) => (
                    <MarqueeReviewCard
                      key={`m-r2-${i}`}
                      review={review}
                      className="w-[280px]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6 h-[650px] overflow-hidden relative mask-gradient-y-2">
              <div className="relative h-full overflow-hidden">
                <div className="flex flex-col gap-6 animate-scroll-up py-4">
                  {[...col1, ...col1].map((review, i) => (
                    <MarqueeReviewCard
                      key={`d-c1-${i}`}
                      review={review}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="relative h-full overflow-hidden">
                <div className="flex flex-col gap-6 animate-scroll-down -mt-[100%] py-4">
                  {[...col2, ...col2].map((review, i) => (
                    <MarqueeReviewCard
                      key={`d-c2-${i}`}
                      review={review}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
