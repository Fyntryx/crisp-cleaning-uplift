import React from "react";

const steps = [
  {
    title: "1. Arrival",
    description: "We arrive 5 minutes early, send an \"Arrived!\" text, wear our Crisp uniform, and introduce ourselves politely. We always ask: \"Is there anything you want me to focus on today?\""
  },
  {
    title: "2. Walk-Through",
    description: "A quick tour of the home to identify priority areas, confirm extras, note any fragile items, and identify our \"before\" photo areas."
  },
  {
    title: "3. Set Up",
    description: "We place our cleaning kit safely out of the way, put on gloves, open windows if appropriate to air out the space, and start our timers."
  },
  {
    title: "4. Strict Cleaning Order",
    description: "Chemical Applications → Kitchen → Bedrooms → Living areas → Bathroom(s) → Floors last. This exact order ensures no cross-contamination, maximum efficiency, and predictable timing."
  },
  {
    title: "5. Quality Control",
    description: "Before leaving each room, we check: all surfaces are streak-free, no visible dust, no product residue, no missed corners, floors are perfectly vacuumed, and zero fingerprints on glass or stainless steel."
  },
  {
    title: "6. Signature Crisp Touch",
    description: "In every room: Crisp aromatic finish, toilet paper & towel triangle folds, Crisp card placement, perfect couch & bed reset, sink chrome polish, and an entryway refresh."
  },
  {
    title: "7. Final Walkthrough & Photos",
    description: "We take \"after\" photos for our system and politely ask you to view the results to address any reasonable concerns right then and there."
  },
  {
    title: "8. Customer Close-Off",
    description: "Your clean is complete! We send a digital report and review request, making sure you're entirely thrilled before we leave."
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Our SOP</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            The 8-step system behind every perfect clean.
          </h2>
        </div>

        <div className="relative pl-8 md:pl-16">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[15px] md:left-[35px] top-4 bottom-4 w-px bg-orange-200/50"></div>

          <div className="space-y-16 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Number Indicator */}
                <div className="absolute -left-[32px] md:-left-[52px] top-0 w-10 h-10 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shadow-md border-4 border-white">
                  {index + 1}
                </div>

                <div className="pt-1.5">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-xl italic text-muted-foreground font-medium">
            No supervision required. No explanations repeated. Just a reliably clean home.
          </p>
        </div>
      </div>
    </section>
  );
}
