import { Metadata } from "next";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  alternates: {
    canonical: '/terms-conditions',
  },
};


export default function TermsConditionsPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Legal"
          title="Terms & Conditions"
          description="Last Updated: 10 July 2026"
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            {/* Intro */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <p className="text-gray-700 text-lg mb-6">
                These Terms & Conditions (“Terms”) govern all cleaning services (“Services”) provided by Crisp Cleaning (ABN: [to be inserted]) (“we”, “us”, “our”) to the customer (“you”, “your”). By booking a Service with Crisp Cleaning, you agree to these Terms.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to These Terms</h2>
              <p className="text-gray-700 text-lg mb-8">
                These Terms apply to all bookings made via our website, phone, or email. Please read them carefully before booking. If you do not agree, please do not book a Service with us.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li><strong>“Crisp Cleaning”, “we”, “us”, “our”</strong> means Crisp Cleaning.</li>
                <li><strong>“Customer”, “you”, “your”</strong> means the person or entity booking a Service.</li>
                <li><strong>“Cleaner” or “Contractor”</strong> means the independent cleaning contractor who performs the Service.</li>
                <li><strong>“Service”</strong> means the cleaning service booked, including any confirmed add-ons and uplifts.</li>
                <li><strong>“Add-On”</strong> means an optional extra task booked in addition to the base Service (e.g. oven interior, interior windows, fridge interior).</li>
                <li><strong>“Uplift”</strong> means an additional charge to bring an out-of-scope or excessively built-up area within the depth of cleaning required.</li>
                <li><strong>“Condition Level”</strong> means the assessed condition of the property (Level 1 – Lived-in, Level 2 – Overdue, or Level 3 – Heavy Build-up), which informs the applicable Service and pricing. See our Condition Assessment Guide.</li>
                <li><strong>“Flat-Rate Booking”</strong> means a Service quoted at a fixed price based on the property's size and condition, delivered against the full Service checklist.</li>
                <li><strong>“Hourly Booking”</strong> means a Service booked by the hour for specific tasks or areas, where you purchase our time rather than a defined end-result or completed checklist.</li>
                <li><strong>“Service Fee”</strong> means the total amount payable for a Service, including any add-ons, uplifts, parking costs, and other applicable charges.</li>
                <li><strong>“Call-Out Fee”</strong> means the fixed fee of $45 covering travel, arrival, setup, walk-through, quality closeoff, and administrative coordination.</li>
                <li><strong>“Saved payment method” or “card on file”</strong> means the payment method you securely save via our payment provider, Stripe, to secure your booking.</li>
              </ul>
            </div>

            {/* Scope & Responsibilities */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">3. Scope of Services</h2>
              <p className="text-gray-700 mb-4 text-lg">Crisp Cleaning provides residential and commercial cleaning services including, but not limited to:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>General cleaning (dusting, vacuuming, mopping, wiping surfaces)</li>
                <li>Bathroom and kitchen cleaning</li>
                <li>Deep cleans</li>
                <li>Vacate / End of Lease (Bond) cleans (when disclosed at booking)</li>
                <li>Add-ons and additional services where requested (e.g. oven cleaning, interior windows, fridge cleaning)</li>
              </ul>
              <p className="text-gray-700 text-lg mb-8">
                Each Service type has a defined set of inclusions and exclusions. These are set out in full in our Service Scope, Inclusions & Uplift Policy, which forms part of these Terms (see Section 6). Crisp Cleaning delivers Services with professionalism, punctuality, and care, in line with industry standards.
              </p>

              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">4. Independent Contractors</h2>
              <p className="text-gray-700 text-lg mb-8">
                Crisp Cleaning operates as a platform connecting customers with independent cleaning contractors. All cleaners engaged through Crisp Cleaning are independent contractors and are not employees, agents, or representatives of Crisp Cleaning. While we set service standards, contractors are responsible for the execution of Services and hold their own public liability insurance.
              </p>

              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">5. Customer Responsibilities</h2>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Provide accurate property details at the time of booking</li>
                <li>Notify us if a Vacate / End of Lease Clean is required (additional fees apply)</li>
                <li>Provide safe and unrestricted access to the premises</li>
                <li>Secure pets where necessary</li>
                <li>Remove or safely store fragile and valuable items from cleaning areas</li>
                <li>Provide safe working conditions (no hazards, infestations, or unsafe environments)</li>
                <li>Ensure a valid payment method is saved before your clean and free, accessible parking is available</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">5.1 Accurate representation of property condition</h3>
              <p className="text-gray-700 text-lg mb-4">
                You must provide a truthful and accurate representation of your property's size and condition at booking. This allows us to prepare properly, quote accurately, and allocate the right time and cleaner to your job. Our cleaner will carry out a brief condition assessment on arrival, before starting, to confirm the quote and pricing.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Where the property's condition or size is materially different from what was represented at booking, we may adjust the price, request an uplift, or modify the scope of the Service to match the true condition. Where the difference is significant and the Service cannot reasonably proceed as booked, we may cancel the Service on arrival; in that case a Call-Out Fee of $45 remains payable, covering travel and administrative coordination.
              </p>
            </div>

            {/* Service Scope, Inclusions & Uplift Policy */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">6. Service Scope, Inclusions & Difficult Clean Uplift Policy</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">6.1 Defined scope for each Service</h3>
              <p className="text-gray-700 text-lg mb-6">
                Each Service type — Standard Clean, Deep Clean, and Vacate (End of Lease) Clean — has a defined set of inclusions and exclusions, set out in full in our Service Scope, Inclusions & Uplift Policy, which forms part of these Terms. Please review it before booking so you understand exactly what is and is not included in your chosen Service.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">6.2 Clear expectations</h3>
              <p className="text-gray-700 text-lg mb-6">
                Crisp Cleaning's services are not limited to this scope; each home is unique, and the checklists act as guidelines and may not capture the specifics of your individual home. Our cleaners maintain open communication and will set clear expectations of specific inclusions and exclusions.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">6.3 Difficult clean uplift</h3>
              <p className="text-gray-700 text-lg mb-3">
                Some areas may fall outside the scope of your chosen Service — for example, an area with clear excessive build-up, or a task beyond the defined checklist. Where this occurs, the cleaner may request an uplift:
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li><strong>If you accept the uplift,</strong> the additional charge is added to your Service Fee and the area is treated accordingly.</li>
                <li><strong>If you decline the uplift,</strong> the area will be treated only using the methods within the scope of your chosen Service, and a complete or spotless result for that area cannot be guaranteed. Where an area is so excessively dirty that it cannot be safely treated, it may be skipped entirely.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">6.4 Standard Clean — important exclusions</h3>
              <p className="text-gray-700 text-lg mb-3">A Standard Clean is designed to maintain cleanliness and refresh a reasonably maintained home. It does not include:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Extensive decluttering or organisation;</li>
                <li>Treatment for excessive build-up, mould, grime, grease, dirt, pet hair, stains, rust, or similar, that requires deep scrubbing or specialised treatment;</li>
                <li>Signature touches; tapware, chrome, or stainless-steel polish, deodorise, home presentation;</li>
                <li>Comprehensive cleaning of high-detail areas: sills, doors, skirting, door frames, window tracks, interior windows, ceilings, under furniture, or similar. Touch-ups or general dusting may be included.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">6.5 Add-ons and extra requests</h3>
              <p className="text-gray-700 text-lg mb-6">
                Add-ons and extra requests are only performed where booked and confirmed. The same uplift principle applies: if an add-on is requested after the 48-hour window, the cleaner may request an uplift; otherwise, the area will be treated only within the scope of the chosen Service type.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">6.6 Condition assessment and pricing</h3>
              <p className="text-gray-700 text-lg">
                Deep and Vacate Cleans are priced at a baseline (Overdue) condition. Where the assessed Condition Level is higher (Heavy Build-up), a condition multiplier applies to reflect the additional time and treatment required. See our Condition Assessment Guide for how levels are determined.
              </p>
            </div>

            {/* Bookings, Changes & Extra Work */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">7. Bookings, Changes & Extra Work</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">7.1 Flat-rate and hourly bookings</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Flat-Rate Booking (recommended):</h4>
                  <p className="text-gray-700 text-lg">One fixed price for a complete result. We follow the full Service checklist and stay as long as it takes; your quote is based on your home's size and condition and is backed by our Satisfaction Guarantee.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Hourly Booking:</h4>
                  <p className="text-gray-700 text-lg">Book a set number of hours for specific tasks or areas. You set the task priorities and we work through your list for the booked time. Hourly bookings purchase our time and care, not a defined end-result.</p>
                  <p className="text-gray-700 text-lg mt-2 italic">Hourly terms: our current hourly rate is $199 for the first 2 hours, then $95 per hour (charged in 30minute blocks). You confirm your requested tasks and their priority order at booking, and we work them in order. The Satisfaction Guarantee and bond back guarantee does not apply to hourly bookings.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">7.2 Changes and extra work</h3>
              <p className="text-gray-700 text-lg mb-3">For flat rate bookings, cleaners are required to perform the tasks included in your booking. For changes or extra tasks:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2 text-lg">
                <li><strong>48 hours or more before the clean:</strong> adjustments may be possible.</li>
                <li><strong>Within 48 hours:</strong> changes are not guaranteed, and a Short-Notice Fee may apply.</li>
                <li><strong>At the door:</strong> cleaners may decline extra tasks, or additional charges (including uplifts) may apply.</li>
              </ul>
              <p className="text-gray-700 text-lg">While we aim to provide consistency, we do not guarantee the same cleaner for every visit.</p>
            </div>

            {/* Payment Terms */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">8. Payment Terms</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">8.1 Payment method required to secure your booking</h3>
              <p className="text-gray-700 text-lg mb-4">
                A valid payment method must be added prior to your scheduled Service to secure your booking. Your payment details are stored securely by our payment provider, Stripe. The cleaning fee is charged only after your clean is complete.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">8.2 When payment is due and failed payments</h3>
              <p className="text-gray-700 text-lg mb-6">
                Payment is due within 24 hours of completion of the Service. If an automatic charge is unsuccessful, or where no valid payment method is saved, you must ensure the outstanding amount is paid within 24 hours of completion. We may re-attempt the charge and will contact you to arrange payment.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">8.3 Late payment and debt recovery</h3>
              <p className="text-gray-700 text-lg mb-3">If payment remains outstanding 14 days after completion of the Service, Crisp Cleaning reserves the right to take any of the following steps:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Refer the outstanding debt to a registered debt collection agency and/or law firm. All associated collection costs, interest, and agency fees will become payable by you.</li>
                <li>Lodge a claim with the Victorian Civil and Administrative Tribunal (VCAT), or the appropriate court or tribunal.</li>
                <li>Where lawfully entitled to do so, report the overdue amount to a credit reporting body, which may negatively affect your credit rating.</li>
              </ul>

              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">8.4 Pricing & GST</h3>
                  <p className="text-gray-700 text-base">Prices displayed or quoted may vary depending on property size, cleaning condition, add-ons, uplifts, and specialised requirements. All prices are inclusive of GST.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">8.5 Chargebacks</h3>
                  <p className="text-gray-700 text-base">Initiating a chargeback for a validly owed amount without first attempting resolution with us may be treated as a breach of these Terms, and we may recover the disputed amount.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">8.7 Additional fees</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li><strong>Out-of-Area Fee —</strong> $50. Applies where your property is outside our normal service area.</li>
                <li><strong>Short-Notice Fee —</strong> $30. For bookings or changes made with less than 48 hours' notice.</li>
                <li><strong>Call-Out Fee —</strong> $45. Applies where set out in Section 9 (late cancellations and access issues).</li>
                <li><strong>Parking costs —</strong> as set out in Section 10.</li>
              </ul>
            </div>

            {/* Cancellations & Parking */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">9. Cancellations, Rescheduling & Access</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">9.1 Customer cancellations</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li><strong>48 hours or more notice:</strong> no cancellation fee.</li>
                <li><strong>Less than 48 hours notice:</strong> a Call-Out Fee of $45 applies.</li>
                <li><strong>Cancellation at the door:</strong> a fee of 50% of the Service Fee applies.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">9.2 Access & lockouts</h3>
              <p className="text-gray-700 text-lg mb-6">
                If our cleaner cannot gain access, they will attempt to contact you. If you do not respond within 15 minutes, the Service is cancelled and a 50% fee applies. If contact is established but access is still not provided within 15 minutes, the clean must be rescheduled and a Call-Out Fee of $45 applies.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">9.3 Rescheduling</h3>
                  <p className="text-gray-700 text-base">Requests to reschedule with 48 hours or more notice will be accommodated where possible at no charge. Requests within 48 hours are treated as a late cancellation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">9.4 Cleaner cancellations</h3>
                  <p className="text-gray-700 text-base">If your cleaner must cancel, a 100% refund is processed for any amount paid, and we will make all reasonable efforts to reschedule promptly.</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight border-t pt-8">10. Parking</h2>
              <p className="text-gray-700 text-lg mb-4">
                You must ensure free, safe, and accessible parking is available for our cleaner at or near the property for the duration of the Service.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                If free parking is not available on-site or nearby, you are responsible for covering all parking costs, including metered parking, paid parking, and any required permits. Any parking costs incurred by the cleaner will be added to your Service Fee.
              </p>
              <p className="text-gray-700 text-lg bg-gray-50 p-4 rounded-xl border border-gray-100">
                If suitable parking cannot be arranged and the cleaner is unable to park, the clean may be cancelled or shortened, and a cancellation fee of up to 50% may apply.
              </p>
            </div>

            {/* Complaints */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">11. Complaints & Quality Assurance</h2>
              <p className="text-gray-700 mb-4 text-lg">We aim to deliver the highest cleaning standards. If you are unsatisfied:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li><strong>Complaints must be submitted within 24 hours</strong> of completion of a clean.</li>
                <li>Clear photo and video evidence must be included, along with a description of the issue and your expected outcome.</li>
                <li>Send complaints to: <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-semibold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a></li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Re-service or remedy may apply for:</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Incomplete or missed cleaning</li>
                <li>Substandard quality</li>
                <li>Damage caused by the cleaner</li>
                <li>Failure to attend a scheduled appointment</li>
                <li>Ignoring confirmed special requests</li>
                <li>Breach of the Code of Conduct</li>
                <li>Health or safety risks caused by improper cleaning methods</li>
              </ul>
              <p className="text-gray-700 text-lg">
                Our standard remedy is to return and rectify the issue. Credits or refunds may be offered at our discretion based on the circumstances of each case, and where required under the Australian Consumer Law.
              </p>
            </div>

            {/* Damage & Liability */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">12. Damage, Loss & Liability</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">12.1 Independent contractor insurance</h3>
              <p className="text-gray-700 text-lg mb-6">
                Cleaners engaged through Crisp Cleaning are independent contractors and are responsible for holding their own public liability insurance. Claims for accidental loss or damage are the responsibility of the cleaner who performed the Service.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">12.2 Accidental damage claims</h3>
              <p className="text-gray-700 text-lg mb-3">If accidental damage is caused during a Service, please report it within 24 hours. Crisp Cleaning will facilitate the claim. The following are excluded:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Pre-existing damage and normal wear and tear;</li>
                <li>Fragile or high-value items not safely stored away;</li>
                <li>Items sensitive to moisture or chemicals where care instructions were not provided;</li>
                <li>Damage arising from customer-provided products or equipment.</li>
              </ul>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">12.3 Theft</h3>
                  <p className="text-gray-700 text-base">Where theft is alleged, the customer must file a police report and Crisp Cleaning will cooperate fully. Crisp Cleaning is not liable for personal disputes between a customer and a cleaner.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">12.4 Limit of liability</h3>
                  <p className="text-gray-700 text-base">Crisp Cleaning's liability for any approved claim is limited to the value of the Service provided or the reasonable cost of repair or replacement, whichever is lower, except where required by law.</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight border-t pt-8 mt-8">13. Cleaning Methods & Material Sensitivity</h2>
              <p className="text-gray-700 text-lg mb-8">
                We use industry-standard cleaning products and methods. You must notify us of delicate materials, high-value items, surfaces requiring special care, and any manufacturer-specific cleaning instructions. Crisp Cleaning is not responsible for damage where instructions were not provided.
              </p>

              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight border-t pt-8">14. Access, Safety & Working Conditions</h2>
              <p className="text-gray-700 text-lg mb-3">Cleaners must not be expected to:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Move heavy furniture;</li>
                <li>Clean areas that pose a safety risk;</li>
                <li>Remove mould, infestations, biohazards, or bodily fluids;</li>
                <li>Clean or clear hoarding-level accumulation or remove excessive rubbish;</li>
                <li>Work in extreme clutter or hoarding conditions unless pre-disclosed.</li>
              </ul>
            </div>

            {/* Loyalty & Programs */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6 uppercase tracking-wide">15. Code of Conduct</h2>
              <p className="text-gray-700 mb-8 text-lg">
                We maintain a strict zero-tolerance policy for inappropriate behaviour. Both parties must treat each other respectfully and professionally. A Service may be terminated immediately if either party engages in abuse, harassment, or intimidation; discrimination or offensive behaviour; or unsafe, threatening, or hostile conduct.
              </p>

              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6 uppercase tracking-wide border-t border-[#FB8C42]/20 pt-8">16. Regular Cleaning — Cleaner's Pass</h2>
              <p className="text-gray-700 mb-4 text-lg">Our loyalty program offers discounted rates for recurring customers (weekly, fortnightly, or monthly cleans).</p>
              <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2 text-lg">
                <li>If the Cleaner's Pass is cancelled within the first 2 scheduled cleans, a fee equal to the discounted amount will be charged.</li>
                <li>Cancelling 2 consecutive recurring cleans results in a fee equivalent to the total discount received.</li>
                <li>Repeated cancellations or misuse may result in termination of membership and reset of loyalty rewards.</li>
              </ul>

              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6 uppercase tracking-wide border-t border-[#FB8C42]/20 pt-8">17. Loyalty Rewards</h2>
              <p className="text-gray-700 mb-6 text-lg">Cleaner's Pass holders and eligible customers may receive rewards and lifetime discounts based on the criteria below.</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
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

              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-4 uppercase tracking-wide border-t border-[#FB8C42]/20 pt-8">18. Referral Program</h2>
              <p className="text-gray-700 text-lg mb-3">Referring customers receive $10 credit for each successful referral, provided the new customer uses the correct referral code at sign-up and completes and pays for at least one clean.</p>
            </div>

            {/* Guarantees */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">19. Guarantees – Flat Rate Bookings Only</h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">19.1 Vacate Clean — Bond-Back Guarantee</h3>
              <p className="text-gray-700 text-lg mb-4">
                Crisp Cleaning guarantees that the cleanliness of the property will not be the reason your bond is withheld. If your real estate agent or property manager flags a cleanliness issue that falls within the scope of your Vacate Clean, Crisp Cleaning will return to address all flagged concerns at no extra cost.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                <strong>Important:</strong> bond return decisions are made by your agent or property manager and may be affected by factors outside cleanliness, including the property's condition, existing damage, wear and tear, or agent-specific expectations. This guarantee covers the cleanliness component of your bond outcome only.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">19.2 Satisfaction Guarantee (All Services)</h3>
              <p className="text-gray-700 text-lg">
                If any task within the scope of your chosen Service is not completed to standard, Crisp Cleaning will return to fix it at no extra cost. This guarantee applies to Flat-Rate Bookings only — Hourly Bookings purchase time, not a defined result, so completeness is not guaranteed.
              </p>
            </div>

            {/* Final Legal */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">20. Photo & Media Use</h3>
                  <p className="text-gray-700 text-lg">By using our Services, you consent to the use of non-identifiable before-and-after images for quality assurance, training, and marketing purposes.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">21. Force Majeure</h3>
                  <p className="text-gray-700 text-lg">Crisp Cleaning is not liable for delays or cancellations caused by events outside our control.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">22. Termination of Service</h3>
                  <p className="text-gray-700 text-lg">Crisp Cleaning may terminate Services at any time if the customer breaches these Terms, the environment is unsafe, payment fails or is disputed, misrepresentation of property conditions occurs, or repeated cancellations or misconduct arise.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">23. Your Consumer Rights (Australian Consumer Law)</h3>
                  <p className="text-gray-700 text-lg">Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy you may have under the Australian Consumer Law or other laws that cannot lawfully be excluded.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">24. Governing Law</h3>
                    <p className="text-gray-700 text-base">These Terms are governed by the laws of Victoria, Australia.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">25. Amendments</h3>
                    <p className="text-gray-700 text-base">Crisp Cleaning may update these Terms at any time. The most recent version will always be available on our website.</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">26. Contact Us</h3>
                  <p className="text-gray-700 text-lg">
                    Crisp Cleaning — <a href="mailto:crispcleaningmelbourne@gmail.com" className="font-semibold text-primary hover:underline">crispcleaningmelbourne@gmail.com</a>
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
