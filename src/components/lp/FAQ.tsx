import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be home during the clean?",
    answer: "It's entirely up to you. Many of our clients prefer to provide access to their space and continue with their daily activities. Rest assured, our team is professional and trustworthy, and we'll treat your space with the utmost respect and care. You will receive an ETA before arriving and a summary when we're done."
  },
  {
    question: "What is your policy on cancellations and refunds?",
    answer: "We understand if you ever need to reschedule, that’s why if you cancel with more than 48 hours of from your booking, you will receive a 100% refund! Unfortunately, if you cancel within 48 hours a 50% refund will be applicable, as our cleaners have already been assigned to your home."
  },
  {
    question: "Are your cleaning products safe for family and pets?",
    answer: "Absolutely. We use high-quality, eco-friendly cleaning solutions that are tough on dirt but completely safe for your children and pets. If something stronger is needed for a particular job, your cleaner will assess and ask your permission before using it. If you have specific product requirements or allergies, simply let us know."
  },
  {
    question: "What if I'm not happy?",
    answer: (
      <>
        Get in touch within 24 hours, send us a photo and video of what wasn't right, and we'll be back within 72 hours to fix it — no charge. If we can't make it right, you don't pay. You can view our full terms <a href="/terms-conditions" className="font-semibold text-primary hover:underline transition-colors">here</a>.
      </>
    )
  },
  {
    question: "Are you fully insured and licensed?",
    answer: "Yes, Crisp Cleaning is fully insured and licensed. Our company is committed to operating with the highest standards of professionalism and integrity. Every cleaner undergoes a rigorous background check, giving you complete peace of mind when we enter your home."
  },
  {
    question: "How do you ensure security of my property?",
    answer: "We take your security very seriously. Our team members undergo thorough background checks, and we have stringent protocols in place to safeguard your property. Your home is always locked and secured upon completion of the clean"
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
    <section id="faqs" className="pt-24 pb-12 bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
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
