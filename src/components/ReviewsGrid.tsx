"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
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
    case 5:
    case 2:
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

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const ITEMS_PER_PAGE = 10;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerTerm) ||
        item.content.toLowerCase().includes(lowerTerm) ||
        (item.role && item.role.toLowerCase().includes(lowerTerm))
    );
  }, [data, searchTerm]);

  const visibleData = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className="relative py-24 min-h-[800px] overflow-hidden">
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

          <div className="relative w-full md:w-80 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative bg-background/80 rounded-lg flex items-center px-3 border border-border/50 shadow-sm focus-within:border-primary/50 transition-colors">
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              <Input
                placeholder="Search reviews..."
                className="border-none shadow-none focus-visible:ring-0 px-0 h-12 bg-transparent placeholder:text-muted-foreground/50"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(10);
                }}
              />
            </div>
          </div>
        </div>

        {visibleData.length > 0 ? (
          <>
            <div
              className="
                flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-6
                md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0 md:px-0 md:grid-flow-dense
              ">
              {visibleData.map((review, index) => {
                const gridClasses = getGridSpans(index);
                return (
                  <ReviewGridCard
                    key={`${review._id}-${index}`}
                    review={review}
                    index={index}
                    gridClasses={gridClasses}
                  />
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-8 md:mt-16 text-center px-6 md:px-0 hidden md:block">
                <div className="relative inline-block group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200" />
                  <Button
                    onClick={handleLoadMore}
                    size="lg"
                    className="relative bg-background hover:bg-background/90 text-foreground border border-input rounded-full px-8 h-12 font-medium">
                    Load More Stories
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {visibleData.length} of {filteredData.length} reviews
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mx-6 md:mx-0 text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-sm mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reviews found
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We couldn't find any reviews matching "{searchTerm}". Try
              searching for a different keyword.
            </p>
            <Button
              variant="link"
              onClick={() => setSearchTerm("")}
              className="mt-4 text-primary">
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
