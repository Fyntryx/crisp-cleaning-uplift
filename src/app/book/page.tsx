import React from "react";
import BookingPageFlow from "@/components/BookingPageFlow";
import MinimalNavbar from "@/components/MinimalNavbar";

export const metadata = {
  title: "Book a Clean | Crisp Cleaning",
  description: "Book your professional house or commercial clean instantly online.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white booking-scale-root">
      <MinimalNavbar />
      <main className="flex-1 min-h-0 mt-[calc(4.0625*var(--scale-unit))]">
        <BookingPageFlow hiddenInline={true} />
      </main>
    </div>
  );
}
