"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useScrollScale from "@/hooks/useScrollScale";
import { cn } from "@/lib/utils";

import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: "booking" | "safety";
}

interface FAQsClientProps {
  data: FAQItem[];
}

const FAQsClient = ({ data }: FAQsClientProps) => {
  const { ref: FAQsContentRef, style: FAQsContentStyle } = useScrollScale({
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<"booking" | "safety">("booking");

  const currentFAQs = data.filter((faq) => faq.category === activeTab);

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Have a Question?"
          title="Frequently Asked Questions"
          description="Explore the answers to these frequently asked questions to learn more about how we can make your cleaning experience smooth and hassle-free."
        />

        <section className="relative py-20 -mt-10 mb-auto z-20">
          <div
            ref={FAQsContentRef as React.RefObject<HTMLDivElement>}
            style={FAQsContentStyle}
            className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-center items-center mb-12 border-b border-border/40">
                <button
                  onClick={() => setActiveTab("booking")}
                  className={cn(
                    "px-10 py-4 text-lg font-bold transition-colors relative w-full sm:w-auto text-center",
                    activeTab === "booking"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}>
                  Booking & Services
                  {activeTab === "booking" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("safety")}
                  className={cn(
                    "px-10 py-4 text-lg font-bold transition-colors relative w-full sm:w-auto text-center",
                    activeTab === "safety"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}>
                  Safety & Satisfaction
                  {activeTab === "safety" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>
              </div>

              <div key={activeTab} className="h-auto w-full">
                <Accordion type="single" collapsible className="space-y-4">
                  {currentFAQs.length > 0 ? (
                    currentFAQs.map((faq, index) => (
                      <AccordionItem
                        key={faq._id}
                        value={faq._id}
                        className={cn(
                          "bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300",
                          "animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}>
                        <AccordionTrigger className="text-left font-semibold text-foreground/90 hover:text-primary py-6 text-lg hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed whitespace-pre-line text-gray-700">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-10 bg-card/50 rounded-xl border border-dashed border-border animate-in fade-in zoom-in-95 duration-300">
                      No questions found for this category.
                    </div>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          heading="Seeking Further Assistance?"
          description="Click on the links below to explore additional resources or to get in touch with us directly"
          primaryAction={{
            text: "Get a Free Quote",
            href: "/#services",
          }}
          secondaryAction={{
            text: "Contact Us",
            href: "/contact",
          }}
        />
      </div>

      <Footer />
    </>
  );
};

export default FAQsClient;
