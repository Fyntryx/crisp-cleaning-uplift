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
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20 animate-fade-up">
            {badge}
          </span>
        )}

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-md animate-fade-up"
          style={{ animationDelay: "100ms" }}>
          {title}
        </h1>

        <p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up font-medium"
          style={{ animationDelay: "200ms" }}>
          {description}
        </p>
      </div>
    </section>
  );
};
