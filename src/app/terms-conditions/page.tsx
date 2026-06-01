"use client";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export default function TermsConditionsPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Legal"
          title="Terms & Conditions"
          description="Last Updated: 17/5/26"
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            {/* Intro */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <p className="text-gray-700 text-lg">
                These Terms & Conditions (“Terms”) govern all cleaning services (“Services”) provided by Crisp Cleaning (“we”, “us”, “our”) to the customer (“you”, “your”). By booking a service with Crisp Cleaning, you agree to these Terms.
              </p>
            </div>

            {/* Scope of Services */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Scope of Services</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">Crisp Cleaning provides residential and commercial cleaning services including, but not limited to:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>General cleaning (dusting, vacuuming, mopping, wiping surfaces)</li>
                <li>Bathroom and kitchen cleaning</li>
                <li>End of Lease / Bond Clean (when disclosed at booking)</li>
                <li>Additional services where requested (oven cleaning, fridge cleaning, etc.)</li>
              </ul>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning is responsible for delivering services with professionalism, punctuality, and care, in line with industry standards.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning operates as a platform connecting customers with independent cleaning contractors. All cleaners engaged through Crisp Cleaning are independent contractors and not employees, agents, or representatives of Crisp Cleaning. While we set service standards, contractors are responsible for the execution of services.
              </p>
              <p className="text-gray-700 text-lg">
                These Terms apply to all bookings made via our website, phone, or email.
              </p>
            </div>

            {/* Customer Responsibilities */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Customer Responsibilities</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">To ensure a successful clean, customers must:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Provide accurate property details during booking</li>
                <li>Notify us if an End of Lease Clean is required (additional fees apply)</li>
                <li>Provide safe and unrestricted access to the premises</li>
                <li>Secure pets where necessary</li>
                <li>Remove fragile or valuable items from cleaning areas</li>
                <li>Provide safe working conditions (no hazards, infestations, or unsafe environments)</li>
              </ul>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning reserves the right to refuse or terminate a clean if the environment is unsafe or significantly different from the provided description. Additional fees may apply if the job requires more time, labour, or specialised effort due to inaccurate or incomplete information.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                If the condition of the property differs significantly from the information provided at booking, we reserve the right to: Adjust pricing, Modify the scope of service, Reschedule the clean, or decline the service.
              </p>
            </div>

            {/* Code of Conduct */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Code of Conduct</h2>
              <p className="text-gray-700 mb-6 text-lg font-medium">We maintain a strict zero-tolerance policy for inappropriate behaviour.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cleaner and Customer Behaviour</h3>
              <p className="text-gray-700 text-lg mb-4">Both parties must treat each other respectfully and professionally. Service may be terminated immediately if either party engages in:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Abuse, harassment, or intimidation</li>
                <li>Discrimination or offensive behaviour</li>
                <li>Unsafe, threatening, or hostile conduct</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                If a service is terminated due to the customer’s behaviour, no refund will be provided. If terminated due to the cleaner’s behaviour, a pro-rata refund may be issued.
              </p>
            </div>

            {/* Complaints & Quality Assurance */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Complaints & Quality Assurance</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">We aim to deliver the highest cleaning standards. If you are unsatisfied:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Complaints must be submitted within 24 hours after completion of a clean.</li>
                <li>Photo/video evidence must be included</li>
                <li>Send complaints to: <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-semibold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a></li>
              </ul>
              <p className="text-gray-700 text-lg mb-6">All complaints are reviewed within 72 hours by our Resolution Specialists.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Refund or Compensation May Apply for:</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Incomplete or missed cleaning</li>
                <li>Substandard quality</li>
                <li>Damage caused by the cleaner</li>
                <li>Failure to attend a scheduled appointment</li>
                <li>Ignoring confirmed special requests</li>
                <li>Breach of Code of Conduct</li>
                <li>Health/safety risks caused by improper cleaning methods</li>
              </ul>
              <p className="text-gray-700 text-lg mb-4">
                Refunds, partial refunds, or re-cleans may be offered at our discretion based on the circumstances of each case. Where appropriate, we may prioritise re-service over monetary refunds. All decisions are made in line with our quality assurance process.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                Complaints submitted outside of the 24 hour time frame will not be eligible for compensation, and review of the complaint is at sole discretion of Crisp Cleaning.
              </p>
            </div>

            {/* Cancellations & Refund Policy */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Cancellations & Refund Policy</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Cancellations</h3>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li>&gt;48 hours notice: 100% refund</li>
                <li>&lt;48 hours notice: 50% refund</li>
              </ul>
              <p className="text-gray-700 text-lg mb-6">Our cleaners schedule their days around your booking - last-minute cancellations significantly impact their income.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cleaner Cancellations</h3>
              <p className="text-gray-700 text-lg mb-2">If a cleaner must cancel, we will:</p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-lg">
                <li>Attempt to reschedule promptly</li>
                <li>Offer a full refund if rescheduling is not possible</li>
              </ol>
            </div>

            {/* Regular Cleaning – Cleaner’s Pass & Loyalty */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-8 uppercase tracking-wide">Regular Cleaning – Cleaner’s Pass</h2>
              <p className="text-gray-700 mb-6 text-lg font-medium">Our loyalty program offers discounted rates for recurring customers.</p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Terms</h3>
                  <ol className="list-decimal pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>If the Cleaner’s Pass is cancelled within the first 2 scheduled cleans, a fee equal to the discounted amount will be charged.</li>
                    <li>Cancelling 2 consecutive recurring cleans results in a fee equivalent to the total discount received.</li>
                    <li>Repeated cancellations or misuse may result in termination of membership and reset of loyalty rewards.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Misuse Includes:</h3>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>Booking cleans for properties other than your own</li>
                    <li>Behaviour violations</li>
                    <li>Repeated cancellations</li>
                    <li>Attempting to exploit discounted rates intentionally</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Loyalty Rewards System</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    “Cleaner’s pass” holders (those who schedule either weekly/fortnightly/monthly cleans), and eligible customers may receive rewards, and lifetime discounts based on below criteria. Crisp Cleaning reserves the right to remove loyalty rewards if Terms are breached.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/60 p-6 rounded-xl border border-[#FB8C42]/10">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Challenges:</h4>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-base">
                        <li>Refer 1 friend / 5 friends / 10 friends</li>
                        <li>Schedule 5 cleans / 20 cleans / 50 cleans</li>
                        <li>Leave a positive review</li>
                        <li>Tip a cleaner</li>
                        <li>Add an extra service to a clean</li>
                      </ul>
                    </div>
                    <div className="bg-white/60 p-6 rounded-xl border border-[#FB8C42]/10">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Rewards:</h4>
                      <ul className="space-y-2 text-gray-700 text-base">
                        <li><strong>1 challenge:</strong> $10 discount code</li>
                        <li><strong>2 challenges:</strong> 25% off next clean</li>
                        <li><strong>3 challenges:</strong> +2.5% Lifetime discount</li>
                        <li><strong>4 challenges:</strong> $15 discount code</li>
                        <li><strong>5 challenges:</strong> Free Clean</li>
                        <li><strong>6 challenges:</strong> +2.5% Lifetime discount</li>
                        <li><strong>7 challenges:</strong> $20 discount code</li>
                        <li><strong>8 challenges:</strong> Free Clean</li>
                        <li><strong>9 challenges:</strong> +5% Lifetime discount</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Credits are issued as one-time digital discount codes via email. Lifetime discounts will apply automatically to all future cleans.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">Referral Program</h3>
                  <p className="text-gray-700 text-lg mb-3">Referring customers receive $10 credit for each successful referral, provided:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>The new customer uses the correct referral code at sign-up</li>
                    <li>They complete and pay for at least one clean</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic">Credits are issued as digital discount codes via email.</p>
                </div>
              </div>
            </div>

            {/* Payment & Booking Conditions */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Payment Terms & Booking Conditions</h2>
              
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>All services must be paid in full before the clean begins</li>
                <li>Payments are processed via Stripe</li>
                <li>If a payment fails, the booking will not proceed</li>
              </ul>
              
              <p className="text-gray-700 text-lg mb-3">Prices displayed on the website may vary depending on:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Property size</li>
                <li>Cleaning condition</li>
                <li>Additional tasks or add-ons</li>
                <li>Specialised cleaning requirements</li>
              </ul>
              <p className="text-gray-700 text-lg mb-8">We reserve the right to adjust pricing if the actual condition differs significantly from the booking description.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extra Work & Adjustments</h3>
              <p className="text-gray-700 text-lg mb-3">Cleaners are only required to perform tasks included in the booking. Requests made:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li><strong>Before 48 hours:</strong> Adjustments may be possible</li>
                <li><strong>Within 48 hours:</strong> Changes are not guaranteed</li>
                <li><strong>At the door:</strong> Cleaners may decline extra tasks, or additional charges may apply</li>
              </ul>
              <p className="text-gray-700 text-lg">While we aim to provide consistency, we do not guarantee the same cleaner for each visit.</p>
            </div>

            {/* Parking Requirements */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Parking Requirements</h2>
              <p className="text-gray-700 text-lg mb-3">Customers must ensure:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li>Easily accessible parking</li>
                <li>Any required permits</li>
                <li>Coverage of metered parking costs</li>
              </ul>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                If the cleaner cannot park, the clean may be cancelled and 50% refunded, subject to review.
              </p>
            </div>

            {/* Damage, Loss, and Liability */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Damage, Loss, and Liability</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accidental Damage</h3>
              <p className="text-gray-700 text-lg mb-3">If accidental damage is caused by a cleaner, Crisp Cleaning will cover repair or replacement of the affected item, excluding:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Pre-existing damage</li>
                <li>Wear and tear</li>
                <li>Fragile items not safely stored away</li>
                <li>Items sensitive to moisture/chemicals where instructions were not provided</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Theft</h3>
              <p className="text-gray-700 text-lg mb-3">Where theft is alleged:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>The customer must file a police report</li>
                <li>Crisp Cleaning will cooperate fully</li>
                <li>Crisp Cleaning is not liable for personal disputes between customer and cleaner</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Limit of Liability</h3>
              <p className="text-gray-700 text-lg mb-3">Crisp Cleaning is not liable for:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Indirect or consequential losses</li>
                <li>Emotional distress or dissatisfaction not related to service quality</li>
                <li>Damage resulting from customer-provided products or equipment</li>
              </ul>
              <p className="text-gray-700 text-lg mb-4">
                The customer agrees that further compensation beyond approved repair/replacement must be pursued directly with the cleaner if applicable.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                Liability for any approved damage claim is limited to the value of the service provided or the cost of repair/replacement (whichever is lower), unless otherwise required by law.
              </p>
            </div>

            {/* Methods & Access */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Cleaning Methods & Working Conditions</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Material Sensitivity</h3>
              <p className="text-gray-700 text-lg mb-3">We use industry-standard cleaning products and methods. Customers must notify us of:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li>Delicate materials</li>
                <li>High-value items</li>
                <li>Surfaces requiring special care</li>
                <li>Manufacturer-specific cleaning instructions</li>
              </ul>
              <p className="text-gray-700 text-lg mb-3">Crisp Cleaning is not responsible for damage where:</p>
              <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 text-lg">
                <li>Instructions were not provided</li>
                <li>The material is naturally sensitive (e.g., porous stone, untreated timber, oxidised metals)</li>
                <li>Damage occurred due to wear, age, or degradation</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Access & Safety</h3>
              <p className="text-gray-700 text-lg mb-4">
                If access to the property is not provided at the scheduled time, the booking may be treated as a late cancellation and fees may apply.
              </p>
              <p className="text-gray-700 text-lg mb-3">Cleaners must not be expected to:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Move heavy furniture</li>
                <li>Clean areas that pose a safety risk</li>
                <li>Remove mould, infestations, biohazards, or bodily fluids (specialised services required)</li>
                <li>Work in extreme clutter or hoarding conditions unless pre-disclosed (additional fee applies)</li>
              </ul>
            </div>

            {/* Final Legal */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Force Majeure</h3>
                  <p className="text-gray-700 text-lg">
                    Crisp Cleaning is not liable for delays or cancellations caused by events outside our control, including extreme weather, natural disasters, illness, accidents, sudden loss of access, or public emergencies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Photo & Media Use</h3>
                  <p className="text-gray-700 text-lg">
                    By using our services, you consent to the use of non-identifiable before and after images for quality assurance, training, and marketing purposes. No personal or identifying information will be shared.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Termination of Service</h3>
                  <p className="text-gray-700 text-lg mb-3">Crisp Cleaning may terminate services at any time if:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>The customer breaches these Terms</li>
                    <li>The environment is unsafe</li>
                    <li>Payment fails or is disputed</li>
                    <li>Misrepresentation of property conditions occurs</li>
                    <li>Repeated cancellations or misconduct arise</li>
                  </ul>
                  <p className="text-sm text-gray-500 italic">Refunds for terminated services are at our discretion.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Governing Law & Amendments</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    These Terms are governed by the laws of Victoria, Australia. Any disputes will be handled under this jurisdiction.
                  </p>
                  <p className="text-gray-700 text-lg">
                    Crisp Cleaning may update these Terms at any time. The most recent version will always be available on our website.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <CTASection 
          heading="Ready to book a service?"
          description="Schedule your next clean in under 60 seconds with Crisp Cleaning."
          primaryAction={{ text: "Book Now", href: "/#booking" }}
          secondaryAction={{ text: "Contact Us", href: "/contact" }}
        />
      </div>
      <Footer />
    </>
  );
}
