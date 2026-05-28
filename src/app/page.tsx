import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/lp/Hero";
import QuoteRequestPanel from "@/components/QuoteRequestPanel";
import Testimonials from "@/components/lp/Testimonials";
import Difference from "@/components/lp/Difference";
import WhyCrisp from "@/components/lp/WhyCrisp";
import Process from "@/components/lp/Process";
import Checklist from "@/components/lp/Checklist";
import Stats from "@/components/lp/Stats";
import Guarantee from "@/components/lp/Guarantee";
import FAQ from "@/components/lp/FAQ";
import FinalCTA from "@/components/lp/FinalCTA";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

export const metadata = {
  title: "Crisp Cleaning | Melbourne's most consistent home clean",
  description: "Walk in. Breathe out. Your home is exactly how it should be. Book your consistent, detailed clean today.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary relative w-full overflow-x-hidden">
      <Navbar />
      
      <Hero />
      <QuoteRequestPanel />
      <Testimonials />
      <Difference />
      <WhyCrisp />
      <Process />
      <Checklist />
      <Stats />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      
      <LeadPopup />
      <Footer />
    </main>
  );
}
