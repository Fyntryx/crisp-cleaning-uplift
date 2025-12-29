"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import useScrollScale from "@/hooks/useScrollScale";
import { ReviewItem, ReviewGridCard } from "@/components/ReviewsCards";

interface ReviewsGridProps {
  data: ReviewItem[];
}

const getGridSpans = (index: number) => {
  const mod = index % 10;
  switch (mod) {
    case 0:
      return "md:col-span-4 md:row-span-1";
    case 2:
    case 5:
      return "md:col-span-4 md:row-span-2";
    default:
      return "md:col-span-4 md:row-span-1";
  }
};

export const ReviewsGrid = ({ data }: ReviewsGridProps) => {
  const { ref: reviewsContentRef, style: reviewsContentStyle } = useScrollScale(
    {
      threshold: 0.05,
      scaleAmount: 1.02,
    }
  );

  const [visibleReviewCount, setVisibleReviewCount] = useState(10);
  const REVIEWS_PER_PAGE = 10;

  const currentReviews = data.slice(0, visibleReviewCount);
  const hasMore = visibleReviewCount < data.length;
  const isExpanded = visibleReviewCount > 10;

  const gridItems: Array<{
    type: "review" | "image";
    data?: ReviewItem;
    id: string;
  }> = [];

  let reviewIndex = 0;
  let gridIndex = 0;

  while (reviewIndex < currentReviews.length) {
    const mod = gridIndex % 10;

    if (mod === 2 || mod === 5) {
      gridItems.push({
        type: "image",
        id: `static-img-${gridIndex}`,
        data: { imageUrl: mod === 2 ? "/before.png" : "/after.jpg" } as any,
      });
    } else {
      gridItems.push({
        type: "review",
        id: currentReviews[reviewIndex]._id,
        data: currentReviews[reviewIndex],
      });
      reviewIndex++;
    }
    gridIndex++;
  }

  const handleToggleView = () => {
    if (hasMore) {
      setVisibleReviewCount((prev) => prev + REVIEWS_PER_PAGE);
    } else {
      // Reset to initial state
      setVisibleReviewCount(10);
      // Optional: Scroll back to top of grid if desired
      if (reviewsContentRef.current) {
        reviewsContentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative py-12 min-h-[800px] overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div
        ref={reviewsContentRef as React.RefObject<HTMLDivElement>}
        style={reviewsContentStyle}
        className="container mx-auto px-0 md:px-6">
        <div className="px-6 md:px-0 flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              All Client Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Learn how Crisp Cleaning customers save time, effort and money
            </p>
          </div>
        </div>

        {gridItems.length > 0 ? (
          <>
            <div
              className="
              flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-6
              md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0 md:px-0 md:grid-flow-dense
            ">
              {gridItems.map((item, index) => {
                const gridClasses = getGridSpans(index);
                return (
                  <ReviewGridCard
                    key={item.id}
                    review={item.data!}
                    index={index}
                    gridClasses={gridClasses}
                    // @ts-ignore: Prop 'variant' is missing in component definition but required for logic
                    variant={item.type}
                  />
                );
              })}
            </div>

            {/* Show button if there is more content OR if the grid is expanded (to show "See Less") */}
            {(hasMore || isExpanded) && (
              <div className="mt-8 md:mt-16 text-center px-6 md:px-0 hidden md:block">
                <Button
                  onClick={handleToggleView}
                  size="lg"
                  className="rounded-full px-8">
                  {hasMore ? "Load More Stories" : "See Less"}
                  {hasMore ? (
                    <ArrowRight className="ml-2 w-4 h-4" />
                  ) : (
                    <ArrowUp className="ml-2 w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mx-6 md:mx-0 text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-xl font-semibold">No reviews found</h3>
          </div>
        )}
      </div>
    </section>
  );
};
