import { Metadata } from "next";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  alternates: {
    canonical: '/refund-cancellation',
  },
};


export default function RefundCancellationPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Our Policy"
          title="Refund & Cancellation"
          description="Clear, transparent, and fair policies for your peace of mind."
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            {/* Card 1 */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Cancellation Refunds</h2>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>More than or equal to 48 hours of notice before service: <strong>100% refund</strong></li>
                <li>Less than 48 hours of notice before service: <strong>50% refund</strong></li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                No other refund arrangements apply except where required under Australian Consumer Law.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Disputes & Pro-Rata Refunds</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">Where a dispute exists:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Complaints must be lodged within 24 hours</li>
                <li>Photo and video evidence required</li>
                <li>Resolution team will assess within 72 hours</li>
              </ul>
              <p className="text-base font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-100">
                Pro-rata refunds may be granted if service was incomplete or inadequate.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Parking Issues</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">Customers must provide free/unrestricted parking. If not provided:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Cleaner may cancel the service</li>
                <li>Customer may receive a partial refund (up to 50%)</li>
                <li>Determined by resolution specialists on a case-by-case basis</li>
              </ul>
            </div>

            {/* Card 4 - Larger / Slightly tinted */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-10 uppercase tracking-wide">COMPLAINTS & DISPUTE RESOLUTION POLICY</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">1. Complaint Window</h3>
                  <p className="text-gray-700 text-lg">Complaints must be submitted within 24 hours of job completion.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">2. Submission Requirements</h3>
                  <p className="text-gray-700 mb-3 text-lg font-medium">Must include:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>Photos AND video</li>
                    <li>Detailed description of issue</li>
                    <li>Expected outcome</li>
                  </ul>
                  <p className="text-gray-700 text-lg bg-white/60 p-4 rounded-xl border border-[#FB8C42]/10">Send to: <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-bold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a></p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">3. Resolution Timeline</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                    <li>Acknowledgement within 24 hours</li>
                    <li>Full review within 72 hours</li>
                    <li>Outcome communicated via email</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">4. Possible Outcomes</h3>
                  <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 text-lg">
                    <li>Re-clean</li>
                    <li>Pro-rata refund</li>
                    <li>Full refund (severe cases)</li>
                    <li>Credit for future services</li>
                    <li>Assignment of a new cleaner</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic pt-6 border-t border-gray-200">
                    All resolutions comply with Australian Consumer Law.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <CTASection 
          heading="Need help with a booking change?"
          description="If you want to reschedule or need a refund, contact our support team and we'll help you through the process."
          primaryAction={{ text: "Contact Us", href: "/contact" }}
          secondaryAction={{ text: "Book Again", href: "/#booking" }}
        />
      </div>
      <Footer />
    </>
  );
}
