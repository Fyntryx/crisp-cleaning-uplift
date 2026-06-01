"use client";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

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
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 prose prose-lg prose-gray max-w-none">
              
              <h2>1. Cancellations & Rescheduling</h2>
              <p>
                We understand that plans can change. If you need to cancel or reschedule your clean, please provide us with at least <strong>24 hours' notice</strong>. 
                Cancellations made within 24 hours of your scheduled booking may incur a late cancellation fee.
              </p>

              <h2>2. Refunds & Our Guarantee</h2>
              <p>
                We are committed to delivering a high-quality clean every time. While we do not typically offer cash refunds after a service has been completed, we stand by our <strong>Satisfaction Guarantee</strong>. 
              </p>
              <p>
                If you are not entirely satisfied with your clean, please contact us within 24 hours (or 48 hours for Vacate Cleans). We will return to your property and re-clean the specific areas of concern at no additional cost.
              </p>

              <h2>3. Booking Deposits</h2>
              <p>
                Any deposits paid to secure a booking will be fully refunded if the cancellation is made with more than 24 hours' notice.
              </p>

              <h2>4. Contact Us</h2>
              <p>
                If you have any questions regarding our policies or need to adjust an upcoming booking, please reach out to our team at <a href="mailto:crispcleaningmelbourne@gmail.com">crispcleaningmelbourne@gmail.com</a>.
              </p>

            </div>
          </div>
        </section>

        <CTASection />
      </div>
      <Footer />
    </>
  );
}
