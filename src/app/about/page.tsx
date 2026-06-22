import React from "react";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import AboutClient from "@/components/AboutClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: '/about',
  },
  title: "About Us | Crisp Cleaning",
  description:
    "Learn about our 10+ years of experience and our commitment to cleaner futures.",
};

const ctaQuery = groq`*[_type == "Imageeffect"][0] {
  heading,
  subheading,
  buttonText,
  buttonLink,
  floatingImages[]{
    _key,
    label,
    image
  }
}`;

export default async function AboutPage() {
  const cta = await client.fetch(ctaQuery, {}, { next: { revalidate: 60 } });

  return (
    <main>
      <AboutClient cta={cta} />
      <Footer />
    </main>
  );
}
