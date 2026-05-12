import React from "react";
import { UserCheck, FileText, ShieldCheck, Clock, ThumbsUp, Smartphone } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Same Cleaner, Every Time",
    description: "We assign you a dedicated cleaner and maintain detailed notes on your home. No explaining yourself again. Ever."
  },
  {
    icon: FileText,
    title: "Standardised SOPs",
    description: "Every Crisp clean follows a defined checklist. Not a vibe. A system. So the result is identical whether it's your first clean or your fiftieth."
  },
  {
    icon: ShieldCheck,
    title: "Vetted, Insured & Professional",
    description: "Every cleaner is background checked, insured, and trained to represent the Crisp standard — in their work and in how they treat your home."
  },
  {
    icon: Clock,
    title: "30 Second Booking",
    description: "Instant quote, immediate confirmation, zero back and forth. Book online in seconds or call us and we'll set everything up on the spot."
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll re-clean within 48 hours, no questions asked. If we can't make it right, you don't pay."
  },
  {
    icon: Smartphone,
    title: "A Service That Runs Itself",
    description: "ETA messages, post-clean summaries, feedback requests, next booking reminders. You stay informed without having to ask."
  }
];

export default function WhyCrisp() {
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Why Crisp</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            It isn't one thing. It's everything.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-orange-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group">
                <span className="absolute top-6 right-8 text-muted-foreground/30 font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-primary transition-colors duration-300 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
