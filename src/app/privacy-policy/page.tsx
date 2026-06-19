import { Metadata } from "next";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  alternates: {
    canonical: '/privacy-policy',
  },
};


export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Legal"
          title="Privacy Policy"
          description="Last Updated: 16th April 2026"
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            {/* Introduction */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Introduction</h2>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning (“we”, “us”, “our”) is committed to protecting your personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
              </p>
              <p className="text-gray-700 text-lg mb-4">
                This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information when you interact with us online or use our cleaning services.
              </p>
              <p className="text-gray-700 text-lg">
                By using our website or booking a service, you agree to the terms of this Privacy Policy.
              </p>
            </div>

            {/* What Personal Information We Collect */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">What Personal Information We Collect</h2>
              <p className="text-gray-700 mb-6 text-lg font-medium">We may collect the following types of information:</p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">2.1 Personal Information</h3>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Residential or business address</li>
                    <li>Billing information</li>
                    <li>Cleaning service details (property type, service requirements)</li>
                  </ul>
                  <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                    We may collect non-identifiable photos of service areas for quality assurance, training, and operational purposes. These images will not include personal or identifying information unless explicitly consented to.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">2.2 Payment Information</h3>
                  <p className="text-gray-700 text-lg">
                    Payments are processed through Stripe. We do not store credit card details ourselves. Stripe’s privacy policy applies to payment data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">2.3 Service & Operational Information</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                    <li>Booking history</li>
                    <li>Communication records</li>
                    <li>Notes relating to your cleaning preferences</li>
                    <li>Contractor notes (for service execution)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">2.4 Technical Information (Website & Digital Analytics)</h3>
                  <p className="text-gray-700 mb-3 text-lg font-medium">Collected automatically via cookies:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Website usage patterns</li>
                    <li>Analytics data (Google Analytics, Meta Pixel)</li>
                  </ul>
                  <p className="text-gray-700 text-lg">
                    You can control or disable cookies through your browser settings. Disabling cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Collect Your Information */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">How We Collect Your Information</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">We collect personal information through:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Website booking forms</li>
                <li>Quote and contact forms</li>
                <li>Cookies and analytics tools</li>
                <li>Email, SMS, or phone communication</li>
                <li>Contractor input after a service</li>
                <li>Internal databases (MongoDB dashboard, Stripe records)</li>
              </ul>
              <p className="text-gray-700 text-lg mb-4">
                We may collect information from your interactions with our website, advertisements, and marketing campaigns.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                Some of our service providers may store or process data outside Australia. By using our services, you consent to the transfer of your information to overseas recipients in accordance with the Australian Privacy Principles.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4 text-lg font-medium">We use your information for:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Processing bookings and payments</li>
                <li>Communicating regarding your service</li>
                <li>Assigning contractors to jobs</li>
                <li>Managing your account, loyalty rewards, or Cleaners Pass</li>
                <li>Improving our website, customer experience, and operations</li>
                <li>Marketing emails, service updates, and promotions (you may opt-out anytime)</li>
                <li>Legal compliance and dispute resolution</li>
              </ul>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                We retain personal information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce agreements. When no longer required, data is securely deleted or de-identified.
              </p>
            </div>

            {/* Disclosure of Personal Information */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-8 uppercase tracking-wide">Disclosure of Personal Information</h2>
              <p className="text-gray-700 mb-6 text-lg font-medium">We may disclose your information to:</p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">5.1 Cleaning Contractors</h3>
                  <p className="text-gray-700 text-lg">
                    Contractors are only provided with the minimum information required to perform the service and are not permitted to use customer data for any purpose outside service delivery. They are bound by confidentiality obligations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">5.2 Service Providers</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                    <li>Stripe (payments)</li>
                    <li>Database/hosting platforms (e.g., MongoDB)</li>
                    <li>Email and SMS communication tools</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-[#FB8C42]/30 pb-2 inline-block">5.3 Legal or Safety Obligations</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    We may disclose information when legally required (fraud, safety risk, unlawful activity).
                  </p>
                  <p className="text-base font-semibold text-gray-900 bg-white/60 p-4 rounded-xl border border-[#FB8C42]/10">
                    We do not sell, rent, or trade your personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* Storage & Security */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">Storage & Security</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Storage</h3>
              <p className="text-gray-700 text-lg mb-3">We store your data in:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Stripe</li>
                <li>MongoDB (cleaning job database)</li>
                <li>Internal password-protected systems</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Security Measures</h3>
              <p className="text-gray-700 text-lg mb-3">We implement:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Encryption</li>
                <li>Access controls</li>
                <li>Limited contractor visibility</li>
                <li>Secure payment processing</li>
                <li>Routine data audits</li>
              </ul>
              <p className="text-sm text-gray-500 italic mb-4">However, no online system is completely risk-free.</p>
              <p className="text-gray-700 text-lg">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.
              </p>
            </div>

            {/* Additional Info */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Marketing Communications</h3>
                  <p className="text-gray-700 text-lg mb-3">By using our services, you may receive:</p>
                  <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                    <li>Service reminders</li>
                    <li>Promotions</li>
                    <li>Loyalty updates</li>
                    <li>Important operational communications</li>
                  </ul>
                  <p className="text-gray-700 text-lg">
                    You can opt out at any time by selecting “unsubscribe” or emailing us.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Access & Correction</h3>
                  <p className="text-gray-700 text-lg">
                    You may request access to, or correction of, your personal information by contacting: <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-semibold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Complaints</h3>
                  <p className="text-gray-700 text-lg">
                    If you believe your privacy has been breached, contact us directly. We will investigate and respond within 30 days.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Updates to This Policy</h3>
                  <p className="text-gray-700 text-lg">
                    We may update this policy as our business evolves. The latest version will always be published on our website.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <CTASection 
          heading="Have questions?"
          description="If you have any questions or concerns about our privacy policy, feel free to reach out to our support team."
          primaryAction={{ text: "Contact Us", href: "/contact" }}
          secondaryAction={{ text: "Book Now", href: "/#booking" }}
        />
      </div>
      <Footer />
    </>
  );
}
