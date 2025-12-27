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

const reviewsQuery = groq`
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    avatarInitials,
    featured,
    showInHero,
    _createdAt
  }
`;

export default async function ReviewsPage() {
  const data = await client.fetch<ReviewItem[]>(
    reviewsQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <main className="min-h-screen">
      <ReviewClient data={data} />
    </main>
  );
}
