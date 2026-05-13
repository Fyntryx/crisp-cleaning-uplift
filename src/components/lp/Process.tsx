import React from "react";

const steps = [
  {
    title: "Book in 30 seconds",
    description: "Fill in a few quick details and lock in your preferred time. No phone calls, no back-and-forth — your booking is confirmed instantly."
  },
  {
    title: "A cleaner is assigned",
    description: "We match you with a vetted, experienced Crisp cleaner. You'll get their name and profile before the day so you know exactly who to expect."
  },
  {
    title: "Day of the clean",
    description: "Your cleaner arrives on time, works through the full Crisp checklist room by room, and leaves nothing unchecked."
  },
  {
    title: "The Crisp Standard",
    description: "Every clean includes our signature finish — aromatic refresh, linen folds, chrome polish, and a reset that genuinely looks and feels different."
  },
  {
    title: "Final check and follow up",
    description: "Before leaving, your cleaner does a final walkthrough. You'll receive a summary after the clean and a direct line if anything needs attention."
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">How It Works</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            The 5-step system behind every clean.
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
