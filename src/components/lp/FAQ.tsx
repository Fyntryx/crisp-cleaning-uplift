import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be present?",
    answer: "No, you do not need to be present. Many of our clients provide entry instructions (like a hidden key or lockbox code) or let us in before heading to work. Our cleaners are fully vetted and insured, so you can trust them with your home while you're away."
  },
  {
    question: "Cancellation and refund policy",
    answer: "You can cancel or reschedule your booking penalty-free up to 24 hours before your scheduled clean. For cancellations within 24 hours, a small fee may apply. If you're not satisfied with the clean, we will re-clean the area at no extra cost rather than issuing a refund."
  },
  {
    question: "Safe for family and pets?",
    answer: "Absolutely. We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your children and pets. If you have specific product requirements or allergies, simply let us know."
  },
  {
    question: "Not satisfied?",
    answer: "Our 100% Satisfaction Guarantee means that if you're not happy with the clean, simply contact us within 24 hours and send a photo. We will return within 72 hours to fix it at no extra cost to you."
  },
  {
    question: "Insured and licensed?",
    answer: "Yes, Crisp Cleaning is fully insured and licensed. Every cleaner undergoes a rigorous background check and is fully covered, giving you complete peace of mind when we enter your home."
  },
  {
    question: "Security of property?",
    answer: "We take your security very seriously. Key management protocols are strict, and our vetted cleaners respect your privacy and property. Your home is always locked and secured upon completion of the clean."
  }
];

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  data?: FAQItem[];
  title?: string;
}

export default function FAQ({ data, title }: FAQProps) {
  const currentFaqs = data || faqs;
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Common Questions</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            {title || "Everything you might be wondering."}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {currentFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-orange-50 rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-primary/30 transition-all">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
