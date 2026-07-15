import { Metadata } from "next";

import React from "react";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  alternates: {
    canonical: '/uplift-policy',
  },
};

export default function UpliftPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <PageHero
          badge="Our Scope"
          title="Service Scope & Uplift Policy"
          description="Last Updated: 10 July 2026"
        />

        <section className="relative py-20 -mt-10 z-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-8">
            
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <p className="text-gray-700 text-lg">
                This document sets out what is and is not included in each of our cleaning Services, how condition-based pricing and the Difficult Clean Uplift Policy work, and which extras are available as add-ons. It forms part of our Terms & Conditions. Please review it before booking so you know exactly what to expect.
              </p>
            </div>

            {/* How Our Cleans Work */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">1. How Our Cleans Work</h2>
              <p className="text-gray-700 mb-4 text-lg">
                We offer three core Services — Standard Clean, Deep Clean, and Vacate (End of Lease) Clean — plus optional add-ons. Each Service has a defined checklist. Our cleaners maintain open communication, set clear expectations in line with your chosen Service, and take all reasonable steps to complete the full checklist. The checklists below are a guide to scope; each home is unique and they may not capture every specific of your property.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                <strong>Choosing the right Service:</strong> a Standard Clean maintains an already well-kept home; a Deep Clean resets an overdue home, cutting through built-up grease, grime, soap scum and surface mould; a Vacate Clean delivers bond-inspection standard in an empty home, including the detail agents check, backed by our Bond-Back Guarantee.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">1a. Two Ways to Book</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Flat Rate — recommended.</h4>
                  <p className="text-gray-700 text-lg">One fixed price for a complete result. We follow a detailed checklist and stay as long as it takes; your quote is based on your home's size and condition, and it's backed by our Satisfaction Guarantee. Flat rate is the most value per dollar for a full clean, and the scope and condition policies below apply so we can quote accurately and guarantee a complete result.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Hourly.</h4>
                  <p className="text-gray-700 text-lg">Have a few specific requests and don't need the full checklist? Book the hours, set your priorities, and we'll work through your list — perfect for targeted areas and smaller tasks. From $199 for the first 2 hours, then $95 per hour. Hourly bookings buy our time and care, not a defined result, so the completeness guarantee applies to flat-rate cleans only, and end-of-lease (Vacate) cleans are flat-rate only. The exclusions in Section 8 still apply; condition-based pricing and uplifts do not (hourly already prices effort by the hour).</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic mt-4">
                Hourly can be cheaper for specific requests or smaller tasks, but for a full clean, flat rate is more cost-effective and the only option that guarantees a complete, spotless result.
              </p>
            </div>

            {/* Condition-Based Pricing */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">2. Condition-Based Pricing</h2>
              <p className="text-gray-700 mb-4 text-lg">Deep and Vacate Cleans are priced against the assessed condition of your home:</p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li><strong>Level 1 — Lived-in:</strong> a well-kept home; a Standard Clean is designed for exactly this.</li>
                <li><strong>Level 2 — Overdue:</strong> established build-up a Standard Clean cannot shift; the baseline for a Deep or Vacate Clean.</li>
                <li><strong>Level 3 — Heavy Build-up:</strong> widespread heavy build-up requiring scrapers and repeated treatment; a condition multiplier applies to reflect the added time.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                Condition is assessed from your booking answers or photos and confirmed by the cleaner on arrival. Please represent your home's condition accurately so we can quote correctly and allocate enough time. Homes beyond Level 3 are quoted individually. See our Condition Assessment Guide for how levels are determined.
              </p>
            </div>

            {/* Difficult Clean Uplift Policy */}
            <div className="rounded-3xl p-8 md:p-12 shadow-lg border border-[#FB8C42]/20 bg-[#FB8C42]/5 backdrop-blur-md">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-6 uppercase tracking-wide">3. Difficult Clean Uplift Policy</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Some areas may fall outside the scope of your chosen Service — for example, an area with clear excessive build-up, or a task beyond the defined checklist. Where this happens, the cleaner may request an uplift: an additional charge to bring the depth of cleaning required for that specific area within scope.
              </p>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-4 text-lg">
                <li><strong>If you accept the uplift,</strong> the additional charge is added to your Service Fee and the area is treated to the required depth.</li>
                <li><strong>If you decline the uplift,</strong> the area will be treated only using the methods within the scope of your chosen Service, and a complete or spotless result for that area cannot be guaranteed. Where an area is so excessively dirty that it cannot be adequately or safely treated within the scope of your chosen Service, it may be skipped entirely.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                The same principle applies to add-ons and extra requests. Uplifts are always discussed with you, with photo evidence and justification where relevant, before any additional charge applies.
              </p>
            </div>

            {/* Standard Clean */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-3 tracking-tight">4. Standard Clean</h2>
              <p className="text-gray-600 mb-6 italic text-lg">Goal: maintain a well-kept home — remove everyday dirt and dust, restore order, and leave it fresh. Designed for regularly maintained (Level 1) homes.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Included</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Light tidy / organisation of surfaces, couches and loose items</li>
                <li>Remove visible cobwebs; empty all accessible bins</li>
                <li>Dust / light wipe all reachable surfaces (benches, tables, high-touch areas)</li>
                <li>Dust sills, doors, skirting boards and switches</li>
                <li>Mirrors cleaned; blinds light dust; air freshen / deodorise</li>
                <li>Beds straightened and made; linen changed where fresh linen is left out</li>
                <li>Kitchen: benches, splashback and surfaces wiped; stovetop and rangehood exterior light wipe; sink; appliance and cupboard exteriors light wipe; loading existing dishes into the dishwasher</li>
                <li>Bathroom: single-pass clean of bath, shower, sink and toilet (seat, bowl, exterior); mirrors; benches and vanity wiped; cupboard exteriors; floor vacuumed, mopped and disinfected</li>
                <li>Vacuum all accessible floors; mop all hard floors</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Not included (available as an add-on, an uplift, or a higher-tier clean)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Extensive decluttering or organisation; handwashing dishes</li>
                <li>Treatment of excessive build-up, mould, grease, soap scum, limescale, pet hair, stains or rust needing deep scrubbing or specialised treatment</li>
                <li>Appliance interiors (oven, fridge, microwave, dishwasher) — add-ons</li>
                <li>Interior windows, tracks and screens — add-on, per window; detailed blinds — add-on, per blind</li>
                <li>Wall spot or full cleaning — add-on; deep cleaning of sills, doors and skirting</li>
                <li>Under-furniture / under-bed vacuuming; edge vacuuming; floor scrubbing</li>
                <li>Cabinet, drawer and wardrobe interiors — add-on</li>
                <li>Ceilings, ceiling fans, cornices and top-edge dusting — add-on; exhaust fans — add-on</li>
                <li>Tapware / chrome / stainless descale and polish — add-on (a quick sink chrome shine buff is included)</li>
              </ul>
            </div>

            {/* Deep Clean */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-3 tracking-tight">5. Deep Clean</h2>
              <p className="text-gray-600 mb-6 italic text-lg">Goal: reset an overdue home — cut through built-up grease, grime, soap scum and mould in the places routine cleaning misses, restoring every included surface to an easily maintained state. Baseline: Level 2 (Overdue).</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Included (everything in a Standard Clean, plus)</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>Remove all cobwebs; full dust / wipe of all reachable surfaces</li>
                <li>Sills, doors and skirting boards wiped (not just dusted); door frames and detailed surfaces wiped</li>
                <li>Light switches and power points wiped and disinfected</li>
                <li>Under-bed and under-furniture vacuum (vacuum-tool reach; furniture not moved); edge vacuuming throughout</li>
                <li>Bathroom: deep scrub of shower, bath and sink; shower screen soap-scum removal; grout and tile scrubbing including surface mould treatment; full toilet clean (seat, bowl, hinges, base); drains cleared (surface level); tapware light descale and buff; floor edge-vacuumed, disinfected and mopped</li>
                <li>Kitchen: benches, splashback and stovetop degreased (trivets lifted); rangehood exterior degreased; sink and drain deep cleaned; tapware and stainless light descale and buff; appliance exteriors full wipe incl. oven door glass; cupboard fronts degreased around handles</li>
                <li>Floors: vacuum including under furniture (tool reach) and edges; mop hard floors with spot scrubbing of marks and spills</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Not included (available as an add-on or an uplift)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Interior windows, tracks and screens — add-on, per window; detailed blinds — add-on, per blind (light dust included)</li>
                <li>Cabinet, drawer, wardrobe and pantry interiors — add-on</li>
                <li>Appliance interiors (oven, fridge, microwave, dishwasher) — add-ons</li>
                <li>Rangehood filters (exterior degrease is included) — Vacate only</li>
                <li>Wall spot or full cleaning — add-on; adhesive, tape or scuff removal</li>
                <li>Ceilings, ceiling fans, cornices and top-edge dusting — add-on; exhaust fans — add-on</li>
                <li>Full descale and polish of chrome / stainless throughout — Vacate only (light descale and buff of wet-room tapware is included)</li>
                <li>Moving furniture; garage sweep (add-on)</li>
              </ul>
            </div>

            {/* Vacate Clean */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-3 tracking-tight">6. Vacate (End of Lease) Clean</h2>
              <p className="text-gray-600 mb-6 italic text-lg">Goal: bond-inspection standard, top to bottom — every detail agents check, in an empty home, finished with an Inspection Evidence Report and backed by our Bond-Back Guarantee. Baseline: Level 2 (Overdue). The home must be empty and unfurnished on arrival.</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Included (everything in a Deep Clean, plus)</h3>
              <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">
                <li>All storage interiors — wardrobes, kitchen cupboards, drawers and pantry (empty)</li>
                <li>Rangehood degreased including removable filters (soaked and scrubbed)</li>
                <li>Wall spot cleaning; adhesive, tape and scuff removal</li>
                <li>Ceilings, ceiling fans, cornices and top edges dusted; light fittings and shades dusted / wiped (reachable); air vents and grilles dusted / wiped</li>
                <li>Interior windows, sills, tracks and blinds — the first 10 window sets and blinds are included; additional windows and blinds are charged per item (confirmed before starting)</li>
                <li>Doors both sides including tops; switch plates and door handles washed; sliding door tracks cleaned</li>
                <li>Behind and beside the toilet; exposed appliance cavities; kickboards and cupboard tops</li>
                <li>Full descale and polish of all tapware, chrome and stainless throughout</li>
                <li>Light furniture moved where safe; bins emptied, washed and dried; front entry presentation</li>
                <li>Laundry: bench, sink and splashback; cupboard interiors (empty) and exteriors; lint filter area; exposed appliance cavity; floor</li>
                <li>Inspection Evidence Report — before/after photos of every agent hotspot, sent to you</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Not included (available as an add-on unless stated)</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Organisation, bed-making or tidying — the home must be empty on arrival</li>
                <li>Appliance interiors (oven, fridge, microwave, dishwasher) — add-ons, your choice</li>
                <li>Windows and blinds beyond the first 10 — charged per additional item</li>
                <li>Full wall wash — add-on (wall spot cleaning is included)</li>
                <li>Garage — sweep available as an add-on</li>
                <li>Balcony / outdoor areas — add-on</li>
              </ul>
            </div>

            {/* Add-Ons Table */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md overflow-x-auto">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">7. Add-Ons (Only If Booked)</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Add-ons are only performed where booked and confirmed. The Difficult Clean Uplift Policy (Section 3) also applies to add-ons. An add-on is only offered on a Service where the task is not already included — for example, cabinet interiors and detailed blinds are core Vacate inclusions, so they are not Vacate add-ons.
              </p>
              
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 font-bold text-gray-900">Add-on</th>
                    <th className="py-4 px-4 font-bold text-gray-900">What is done</th>
                    <th className="py-4 px-4 font-bold text-gray-900">Available on</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-lg">
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Oven interior</td><td className="py-4 px-4">Racks soaked; door glass, cavity and seals degreased; exterior buffed</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Fridge / freezer interior</td><td className="py-4 px-4">Shelves and drawers washed; interior sanitised (empty & defrosted &ge; 24h)</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Dishwasher interior</td><td className="py-4 px-4">Filter, spray arms, seals and interior cleaned (empty)</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Microwave interior</td><td className="py-4 px-4">Interior degreased; turntable washed; seals wiped</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Interior windows</td><td className="py-4 px-4">Interior glass, frame, sill, track and fly screen brushed in place (per window)</td><td className="py-4 px-4">Standard, Deep (core in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Detailed blinds</td><td className="py-4 px-4">Both faces wiped/dusted; delicate materials dusted only (per blind)</td><td className="py-4 px-4">Standard, Deep (core in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Cabinet / drawer / wardrobe interiors</td><td className="py-4 px-4">Interior shelves, drawers, rails and tracks wiped (customer-emptied)</td><td className="py-4 px-4">Standard, Deep (incl. in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Full wall wash</td><td className="py-4 px-4">Full-surface wash of the room's walls (per room)</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Wall spot cleaning</td><td className="py-4 px-4">Individual marks, scuffs, adhesive and tape removal (per room)</td><td className="py-4 px-4">Standard, Deep (incl. in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Ceiling, fans & cornices</td><td className="py-4 px-4">Fan blades and housing, cornices and top edges dusted/wiped (per room)</td><td className="py-4 px-4">Standard, Deep (incl. in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Exhaust fans</td><td className="py-4 px-4">Cover removed and washed where removable, else detailed wipe (per fan)</td><td className="py-4 px-4">Standard, Deep (incl. in Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Tapware descale & polish</td><td className="py-4 px-4">All wet-room tapware, chrome and stainless descaled and polished</td><td className="py-4 px-4">Standard (buff incl. Deep; full incl. Vacate)</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Balcony / outdoor</td><td className="py-4 px-4">Swept; cobwebs; rails wiped; door glass wiped (no pressure washing)</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-4 px-4 font-semibold">Garage sweep</td><td className="py-4 px-4">Floor swept; cobwebs removed (no pressure washing or scrubbing)</td><td className="py-4 px-4">Standard, Deep, Vacate</td></tr>
                  <tr><td className="py-4 px-4 font-semibold">Organisation / decluttering</td><td className="py-4 px-4">Tidying and organising to an agreed plan (not hoarding)</td><td className="py-4 px-4">Standard, Deep (empty for Vacate)</td></tr>
                </tbody>
              </table>
            </div>

            {/* What We Don't Do */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-6 tracking-tight">8. What We Don't Do (All Services)</h2>
              <p className="text-gray-700 mb-4 text-lg">
                For safety, insurance, and scope reasons, the following are not performed on any Service. Where a partner exists, we're happy to refer you:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
                <li>Paint removal or over-painting — light spot cleaning of marks only</li>
                <li>Rubbish or waste removal beyond emptying accessible bins; clearing hoarding-level accumulation</li>
                <li>Washing or stain removal of ceilings and cornices — dusting only (reachable light wipe of fittings and vents is included in Vacate)</li>
                <li>Full grout restoration on floors or outside wet areas — spot cleaning only</li>
                <li>Removing fly screens — brushed in place only</li>
                <li>Curtain cleaning or laundering — light dusting only</li>
                <li>High-pressure cleaning of any surface</li>
                <li>Anything on the exterior of the property — pools, gardens, BBQs, outdoor furniture, driveways, or the building exterior (except a booked balcony or garage-sweep add-on)</li>
                <li>Exterior windows and carpet steam cleaning — not offered; partner referral available</li>
                <li>Washing dishes by hand (loading existing dishes into the dishwasher is included on Standard and Deep)</li>
                <li>Mould remediation beyond surface treatment of grout and silicone; pest control; biohazard or bodily-fluid cleaning; anything unsafe or above a two-step ladder</li>
              </ul>
            </div>

            {/* Final Notes */}
            <div className="glass-card rounded-3xl p-8 md:p-10 shadow-lg border border-border/50 bg-white/80 backdrop-blur-md">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">9. Your Part in a Great Result</h3>
                  <p className="text-gray-700 text-lg">
                    To help us deliver the best possible result, please let us know at booking about any areas needing particular attention, any delicate materials or surfaces requiring special care, and the overall condition of the property. Where the condition is beyond the scope of your chosen Service, we'll discuss an uplift or recommend a more suitable Service before we begin.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h3>
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
