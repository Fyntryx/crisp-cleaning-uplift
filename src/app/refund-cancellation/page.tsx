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
              <h2>Cancellation Refunds</h2>
              <ul>
                <li>More than or equal to 48 hours of notice before service: <strong>100% refund</strong></li>
                <li>Less than 48 hours of notice before service: <strong>50% refund</strong></li>
              </ul>
              <p>
                <em>No other refund arrangements apply except where required under Australian Consumer Law.</em>
              </p>

              <h2>Disputes & Pro-Rata Refunds</h2>
              <p>Where a dispute exists:</p>
              <ul>
                <li>Complaints must be lodged within 24 hours</li>
                <li>Photo and video evidence required</li>
                <li>Resolution team will assess within 72 hours</li>
              </ul>
              <p>Pro-rata refunds may be granted if service was incomplete or inadequate.</p>

              <h2>Parking Issues</h2>
              <p>Customers must provide free/unrestricted parking. If not provided:</p>
              <ul>
                <li>Cleaner may cancel the service</li>
                <li>Customer may receive a partial refund (up to 50%)</li>
                <li>Determined by resolution specialists on a case-by-case basis</li>
              </ul>

              <hr />

              <h1>Complaints & Dispute Resolution Policy</h1>

              <h2>1. Complaint Window</h2>
              <p>Complaints must be submitted within 24 hours of job completion.</p>

              <h2>2. Submission Requirements</h2>
              <p>Must include:</p>
              <ul>
                <li>Photos AND video</li>
                <li>Detailed description of issue</li>
                <li>Expected outcome</li>
              </ul>
              <p>Send to: <a href="mailto:crispcleaningmelbourne@gmail.com">crispcleaningmelbourne@gmail.com</a></p>

              <h2>3. Resolution Timeline</h2>
              <ul>
                <li>Acknowledgement within 24 hours</li>
                <li>Full review within 72 hours</li>
                <li>Outcome communicated via email</li>
              </ul>

              <h2>4. Possible Outcomes</h2>
              <ul>
                <li>Re-clean</li>
                <li>Pro-rata refund</li>
                <li>Full refund (severe cases)</li>
                <li>Credit for future services</li>
                <li>Assignment of a new cleaner</li>
              </ul>
              <p>
                <em>All resolutions comply with Australian Consumer Law.</em>
              </p>            </div>
          </div>
        </section>

        <CTASection 
          heading="Ready for a Crisp Clean?"
          description="Book your next clean in under 60 seconds and experience the difference."
          primaryAction={{ text: "Book Now", href: "/#booking" }}
        />
      </div>
      <Footer />
    </>
  );
}
