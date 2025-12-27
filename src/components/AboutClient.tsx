"use client";

import React from "react";
import Footer from "@/components/Footer";
import { MissionStorySection } from "@/components/MissionStorySection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { PageHero } from "@/components/PageHero";
import { StatsSection } from "@/components/StatsSection";
import { ImageStripGallery } from "@/components/ImageStripGallery";
import { CTASection } from "@/components/CTASection";
import TeamSection from "./TeamSection";

const AboutClient = () => {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
        <PageHero
          badge="Who We Are"
          title="About Crisp Cleaning"
          description="Learn more about our journey, our values, and the team dedicated to making your space shine."
        />

        <StatsSection />

        <MissionStorySection />

        <ImageStripGallery />

        <BeforeAfterSection />

        <TeamSection />

        <CTASection
          heading="Ready to experience the difference?"
          description="Join hundreds of satisfied customers who have reclaimed their time and space."
          primaryAction={{
            text: "Get a Quote",
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

export default AboutClient;
