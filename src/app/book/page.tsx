import React from "react";
import BookingPageFlow from "@/components/BookingPageFlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book a Clean | Crisp Cleaning",
  description: "Book your professional house or commercial clean instantly online.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="flex-1 mt-20 md:mt-24">
        <BookingPageFlow hiddenInline={true} />
      </main>
      <Footer />
    </div>
  );
}
