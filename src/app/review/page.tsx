import React from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { Metadata } from "next";

import { ReviewItem } from "@/components/ReviewsCards";
import ReviewClient from "@/components/ReviewsClient";

export const metadata: Metadata = {
  title: "Client Reviews | Crisp Cleaning",
  description: "See what our happy customers have to say...",
};

const pageQuery = groq`{
  "reviews": *[_type == "review"] | order(_createdAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    avatarInitials,
    featured,
    showInHero,
    _createdAt
  },
  "cta": *[_type == "Imageeffect"][0] {
    heading,
    subheading,
    buttonText,
    buttonLink,
    floatingImages[]{
      _key,
      label,
      image
    }
  }
}`;

interface PageData {
  reviews: ReviewItem[];
  cta: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonLink: string;
    floatingImages: any[];
  } | null;
}

export default async function ReviewsPage() {
  const data = await client.fetch<PageData>(
    pageQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <main className="min-h-screen">
      <ReviewClient reviews={data.reviews} cta={data.cta} />
    </main>
  );
}
