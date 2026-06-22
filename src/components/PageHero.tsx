"use client";

import React from "react";
import Navbar from "@/components/Navbar";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
}

export const PageHero = ({
  badge = "Who We Are",
  title,
  description,
}: PageHeroProps) => {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-0" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-40 pb-20 text-center">
        {badge && (
          <div className="mb-4">
            <span className="text-white font-semibold text-[12px] uppercase tracking-[0.22em] leading-[16px] animate-fade-up">
              {badge}
            </span>
          </div>
        )}

        <h1
          style={{ letterSpacing: "-1.2px", lineHeight: "1.1", animationDelay: "100ms" }}
          className="text-[48px] md:text-[64px] font-semibold text-white drop-shadow-md animate-fade-up mb-6 max-w-[896px] mx-auto"
        >
          {title}
        </h1>

        <p
          className="text-[18px] md:text-[20px] text-white/90 max-w-2xl mx-auto animate-fade-up font-normal"
          style={{ animationDelay: "200ms", lineHeight: "1.6" }}>
          {description}
        </p>
      </div>
    </section>
  );
};
