"use client";

import React from "react";
import { MissionStorySection } from "@/components/MissionStorySection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { PageHero } from "@/components/PageHero";
import { StatsSection } from "@/components/StatsSection";
import { CTASection } from "@/components/CTASection";
import TeamSection from "./TeamSection";
import ImageEffect from "./ImageEffect";

interface CtaData {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  floatingImages: any[];
}

interface AboutClientProps {
  cta: CtaData | null;
}

const AboutClient = ({ cta }: AboutClientProps) => {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <PageHero
          badge="Who We Are"
          title="About Crisp Cleaning"
          description="Learn more about our journey, our values, and the team dedicated to making your space shine."
        />

        <StatsSection />

        <MissionStorySection />

        <BeforeAfterSection />

        {/* Sanity-connected floating images gallery */}
        {cta && <ImageEffect data={cta} />}

        {cta && (
          <CTASection
            heading={cta.heading}
            description={cta.subheading}
            primaryAction={{ text: cta.buttonText, href: cta.buttonLink }}
          />
        )}
      </div>
    </>
  );
};

export default AboutClient;
