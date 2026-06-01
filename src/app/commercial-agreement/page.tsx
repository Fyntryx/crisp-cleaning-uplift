"use client";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export default function CommercialAgreementPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Commercial"
          title="Commercial Service Agreement"
          description="Agreement between Crisp Cleaning (Provider) and Commercial Client (Client). This agreement governs all B2B services."
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            {/* Services */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Services</h2>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning agrees to provide commercial cleaning services, including but not limited to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                  <li>Offices</li>
                  <li>Gyms</li>
                  <li>Strata & body corp common areas</li>
                  <li>Retail & showroom spaces</li>
                </ul>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                  <li>Childcare centres</li>
                  <li>Medical practices</li>
                  <li>Schools & education spaces</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 italic">
                Targeted services will be defined in writing for each client.
              </p>
            </div>

            {/* Payment Terms */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Payment Terms</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>All commercial invoices are to be paid prior to the service.</li>
                <li>For ongoing arrangements, payment is strictly net-30 days processed via direct debit or bank transfer (as agreed).</li>
                <li>Invoices are due immediately unless otherwise agreed in writing.</li>
                <li><strong>Failure to pay results in automatic suspension of services.</strong></li>
              </ul>
            </div>

            {/* Cancellations */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Cancellations</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Commercial clients must provide <strong>24 hours written notice</strong> to cancel or modify a scheduled service.</li>
                <li>Cancellations with less than 24 hours notice may incur up to <strong>50% of the scheduled service fee</strong>.</li>
              </ul>
            </div>

            {/* Access */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Access</h2>
              <p className="text-gray-700 text-lg mb-3">The client must provide:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li>Clear access</li>
                <li>Keys</li>
                <li>Security access codes</li>
                <li>Parking arrangements (if required)</li>
              </ul>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                Crisp Cleaning is not liable for delays or cancellations caused by lack of access.
              </p>
            </div>

            {/* Parking Requirements */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Parking Requirements</h2>
              <p className="text-gray-700 text-lg">
                Where parking is unavailable or inaccessible to cleaner, the clean may be terminated or alternatively the actual parking fees are payable by the customer.
              </p>
            </div>

            {/* Workplace Health & Safety Obligations */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Workplace Health & Safety Obligations</h2>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning contractors must be provided with a safe working environment.
              </p>
              <p className="text-gray-700 text-lg mb-3">Clients must inform us of:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Hazardous materials</li>
                <li>Restricted areas</li>
                <li>Safety risks</li>
                <li>Special cleaning instructions</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                Crisp Cleaning is not responsible for injuries caused by unsafe premises.
              </p>
            </div>

            {/* Liability */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Liability</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">We are responsible for:</h3>
              <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 text-lg">
                <li>Damage caused through negligence</li>
                <li>Loss of property directly caused by cleaners</li>
                <li>Failure to deliver agreed services</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">We are not responsible for:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Pre-existing damage</li>
                <li>Items that degrade due to age or fragility</li>
                <li>Issues arising from unclear instructions</li>
                <li>Missing/stolen goods unless directly caused by cleaner</li>
                <li>Losses caused by incorrect access information</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Termination</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Either party may terminate with <strong>14 days' written notice</strong>.</li>
                <li><strong>Immediate termination</strong> applies for misconduct, safety risks, or non-payment.</li>
              </ul>
            </div>

          </div>
        </section>

        <CTASection 
          heading="Need a business cleaning quote?"
          description="Our team can tailor a commercial cleaning plan that fits your business schedule and standards."
          primaryAction={{ text: "Request a Quote", href: "/contact" }}
          secondaryAction={{ text: "Contact Us", href: "/contact" }}
        />
      </div>
      <Footer />
    </>
  );
}
