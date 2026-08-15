import React from "react";
import BookingPageFlow from "@/components/BookingPageFlow";
import MinimalNavbar from "@/components/MinimalNavbar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Book a Clean | Crisp Cleaning",
  description: "Book your professional house or commercial clean instantly online.",
};

export default async function BookPage() {
  let isBookingFlowActive = false;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/api/public/pricing-config`, {
      next: { revalidate: 60 }
    });
    
    if (res.ok) {
      const data = await res.json();
      isBookingFlowActive = data.oldBookingFlowActive === true;
    }
  } catch (error) {
    console.error('Failed to fetch pricing config for booking flow state:', error);
  }

  if (!isBookingFlowActive) {
    redirect("/request-quote");
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white booking-scale-root">
      <MinimalNavbar />
      <main className="flex-1 min-h-0 mt-[calc(3.5*var(--scale-unit))]">
        <BookingPageFlow hiddenInline={true} />
      </main>
    </div>
  );
}
