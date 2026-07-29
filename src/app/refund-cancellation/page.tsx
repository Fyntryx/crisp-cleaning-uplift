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
          description="Last Updated: 4 July 2026"
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <p className="text-gray-700 text-lg mb-4">
                This policy explains how cancellations, refunds, late or non-payment, parking, and complaints are handled. It should be read together with our Terms & Conditions, which prevail in the event of any inconsistency.
              </p>
            </div>

            {/* Cancellations */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">1. Cancellations</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Cancellation charges apply as a fee to your saved payment method. Where there are no saved payment details, the amount remains payable; Crisp Cleaning will provide a tax invoice and relevant payment instructions. Payment is due within 24 hours of the scheduled service, if payment remains outstanding 14 days after the scheduled service; late or non-payment policy applies.
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li><strong>48 hours or more notice</strong> before the scheduled start: no cancellation fee. Any amount already paid is refunded in full.</li>
                <li><strong>Less than 48 hours notice</strong> before the scheduled start: a Call-Out Fee of $45 applies. Where you have already paid, the full amount is refunded except for the $45 Call-Out Fee.</li>
                <li><strong>Cancellation at the door</strong> (on arrival, before the clean begins): a fee of 50% of the Service Fee applies. Where you have already paid, 50% of the Service Fee is refunded.</li>
                <li><strong>No access or parking available at the scheduled time (lockout):</strong> treated as a late cancellation; a 50% cancellation fee applies.</li>
              </ul>
              <p className="text-gray-700 mb-4 text-lg">
                Where a payment has already been made in advance (for example, a prepaid arrangement), the equivalent refund is calculated on the same basis. No other refund or fee arrangements apply except where required under the Australian Consumer Law.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cleaner cancellations</h3>
              <p className="text-gray-700 text-lg">
                If a cleaner must cancel, we will attempt to reschedule promptly or arrange an alternative cleaner. If we are unable to do so, no cancellation fee applies, and any amount charged for that clean will be refunded.
              </p>
            </div>

            {/* Late & Non-Payment */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">2. Late & Non-Payment</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Payment is due within 24 hours of completion of your clean and is automatically charged to your saved payment method. If payment details are not provided, or an automatic charge fails, you must ensure payment is made within 24 hours of completion.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                If payment remains outstanding 14 days after completion, Crisp Cleaning reserves the right to:
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Refer the debt to a registered debt collection agency, with all collection costs, interest, and agency fees added to the amount owing and payable by you;</li>
                <li>Lodge a claim with VCAT, or the appropriate court or tribunal, for recovery of the outstanding amount plus costs; and/or</li>
                <li>Where lawfully entitled, report the overdue amount to a credit reporting body, which may negatively affect your credit rating.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                Full details are set out in our Terms & Conditions.
              </p>
            </div>

            {/* Disputes & Pro-Rata Refunds */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">3. Disputes & Pro-Rata Refunds</h2>
              <p className="text-gray-700 mb-4 text-lg">Where a dispute exists:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Complaints must be lodged within 24 hours of job completion;</li>
                <li>Clear photo and video evidence is required; and</li>
                <li>Our resolution team will assess within 72 hours.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                Pro-rata refunds or credits may be granted where a Service was incomplete or inadequate. Raising a complaint does not remove your obligation to pay any validly owed amount; where a refund, credit, or pro-rata adjustment is agreed, it will be applied to or refunded from your account.
              </p>
            </div>

            {/* Parking */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">4. Parking</h2>
              <p className="text-gray-700 mb-4 text-lg">
                You must ensure free, safe, and accessible parking is available for our cleaner at or near the property for the duration of the Service.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                If parking is not provided by the customer, Crisp Cleaning will take all reasonable efforts to arrange parking – although the responsibility is ultimately with the you.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                If free parking is not available on-site or nearby, you are responsible for covering all parking costs, including metered parking, paid parking, and any required permits. Any parking costs incurred by the cleaner will be added to your Service Fee and charged to your saved payment method.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                If suitable parking cannot be arranged and the cleaner is unable to park, the clean may be cancelled or shortened. Where this occurs, a cancellation fee of up to 50% of the quoted Service Fee may apply, assessed on a case-by-case basis by our resolution specialists.
              </p>
            </div>

            {/* Complaints & Dispute Resolution */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-10 uppercase tracking-wide">5. Complaints & Dispute Resolution Policy</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Complaint Window</h3>
                  <p className="text-gray-700 text-lg">Complaints must be submitted within 24 hours of job completion.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Submission Requirements</h3>
                  <p className="text-gray-700 mb-3 text-lg">Your complaint must include:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>Clear photos AND video;</li>
                    <li>A detailed description of the issue; and</li>
                    <li>Your expected outcome.</li>
                  </ul>
                  <p className="text-gray-700 text-lg bg-white/60 p-4 rounded-xl border border-[#FB8C42]/10">Send to: <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-bold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a></p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Resolution Timeline</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                    <li>Acknowledgement within 24 hours;</li>
                    <li>Full review within 72 hours; and</li>
                    <li>Outcome communicated via email.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Possible Outcomes</h3>
                  <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 text-lg">
                    <li>Re-clean;</li>
                    <li>Pro-rata refund or credit;</li>
                    <li>Full refund (severe cases);</li>
                    <li>Credit for future services; or</li>
                    <li>Assignment of a new cleaner.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final Legal */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">6. Your Consumer Rights</h3>
                  <p className="text-gray-700 text-lg">
                    All resolutions comply with the Australian Consumer Law. Nothing in this policy excludes, restricts, or modifies any consumer guarantee, right, or remedy that cannot lawfully be excluded.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h3>
                  <p className="text-gray-700 text-lg">
                    Crisp Cleaning — <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-semibold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a>
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
          secondaryAction={{ text: "Book Again", href: "/book" }}
        />
      </div>
      <Footer />
    </>
  );
}
