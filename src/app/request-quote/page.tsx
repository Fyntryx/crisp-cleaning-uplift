import React from "react";
import QuoteRequestFlow from "@/components/QuoteRequestFlow";
import MinimalNavbar from "@/components/MinimalNavbar";
import { client } from "@/sanity/lib/client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Request a Quote | Crisp Cleaning",
  description: "Request a free quote for your professional house or commercial clean.",
};

export default async function RequestQuotePage() {
  const query = `*[_type == "siteSettings"][0]{ isBookingFlowActive }`;
  const settings = await client.fetch(query, {}, { next: { revalidate: 60 } });

  if (settings?.isBookingFlowActive === false) {
    redirect("/"); // Or a dedicated offline page
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white booking-scale-root">
      <MinimalNavbar />
      <main className="flex-1 min-h-0 mt-[calc(3.5*var(--scale-unit))]">
        <QuoteRequestFlow />
      </main>
    </div>
  );
}
