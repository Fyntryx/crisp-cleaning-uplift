import React from "react";
import BookingPageFlow from "@/components/BookingPageFlow";
import MinimalNavbar from "@/components/MinimalNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a Clean | Crisp Cleaning",
  description: "Book your professional house or commercial clean instantly online.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MinimalNavbar />
      <main className="flex-1 mt-[65px]">
        <BookingPageFlow hiddenInline={true} />
      </main>
      <Footer />
    </div>
  );
}
