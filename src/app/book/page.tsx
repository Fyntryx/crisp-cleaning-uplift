import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";

export const metadata = {
  title: "Book Your Clean | Crisp Cleaning",
  description: "Get your instant price and book your clean in seconds. Transparent pricing, no hidden fees.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] selection:bg-primary/20 selection:text-primary relative w-full overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <QuoteRequestPanel />
      </div>

      <Footer />
    </main>
  );
}
