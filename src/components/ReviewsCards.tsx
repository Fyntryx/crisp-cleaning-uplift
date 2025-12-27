"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ReviewItem {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarInitials?: string;
  featured?: boolean;
  showInHero?: boolean;
  _createdAt: string;
  imageUrl?: string;
}

export const MarqueeReviewCard = React.memo(
  ({ review, className }: { review: ReviewItem; className?: string }) => (
    <div
      className={cn(
        "bg-white/80 rounded-2xl p-6 shadow-sm border border-gray-100/50 flex-shrink-0 whitespace-normal",
        className
      )}>
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-10 w-10 ring-2 ring-white">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`}
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {review.avatarInitials || review.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
          <span className="text-xs text-gray-400">{review.role}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        "{review.content}"
      </p>
    </div>
  )
);

export const ReviewGridCard = React.memo(
  ({
    review,
    index,
    gridClasses,
  }: {
    review: ReviewItem;
    index: number;
    gridClasses: string;
  }) => {
    const isBigCard = gridClasses.includes("row-span-2");

    if (isBigCard) {
      return (
        <div
          className={cn(
            "relative flex-shrink-0 w-[300px] md:w-auto snap-start h-full",
            gridClasses
          )}>
          <Card
            className={cn(
              "border-none shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full min-h-[400px]",
              "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            )}
            style={{ animationDelay: `${(index % 9) * 100}ms` }}>
            <img
              src={review.imageUrl || "./before.png"}
              alt="Client Story"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </Card>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative flex-shrink-0 w-[300px] md:w-auto snap-start",
          gridClasses
        )}>
        <Card
          className={cn(
            "border-none shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white/70 relative overflow-hidden h-full flex flex-col justify-between",
            "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:-translate-y-1 hover:bg-white/90"
          )}
          style={{ animationDelay: `${(index % 9) * 100}ms` }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none" />

          <div>
            <CardHeader className="flex flex-row items-center gap-4 pb-4 relative z-10">
              <Quote className="absolute top-2 right-2 text-primary/10 w-10 h-10 transition-all duration-500 group-hover:text-primary/20 group-hover:rotate-12" />
              <Avatar className="border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all h-10 w-10">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`}
                  alt={review.name}
                />
                <AvatarFallback>
                  {review.avatarInitials || review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-base">
                  {review.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {review.role || "Verified Customer"}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4 transition-all duration-300",
                      i < (review.rating || 5)
                        ? "fill-yellow-400 text-yellow-400 group-hover:scale-110"
                        : "fill-gray-200 text-gray-200"
                    )}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed italic text-sm line-clamp-4">
                "{review.content}"
              </p>
            </CardContent>
          </div>

          <div className="p-6 pt-0 relative z-10 mt-4">
            <span className="text-xs text-muted-foreground/60 font-medium bg-gray-100/50 px-3 py-1 rounded-full inline-block">
              {new Date(review._createdAt || Date.now()).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                }
              )}
            </span>
          </div>
        </Card>
      </div>
    );
  }
);
