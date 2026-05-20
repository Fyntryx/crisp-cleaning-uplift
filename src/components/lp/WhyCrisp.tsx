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
    description: "Not happy? We'll re-clean within 72 hours, no questions asked. If we can't make it right, you don't pay."
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
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-[#F97316] font-bold tracking-widest text-[11px] uppercase mb-4">Why Crisp</h4>
          <h2 className="text-4xl md:text-[42px] font-bold text-gray-900 tracking-tight mb-6">
            It isn't one thing. It's everything.
          </h2>
        </div>

        {/* Increased gap from gap-6 to gap-8 for more breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              /* Upgraded padding to p-10, radius to rounded-[32px], and softened the border */
              <div key={i} className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 relative group">

                <div className="w-12 h-12 bg-orange-50 group-hover:bg-[#F97316] transition-colors duration-300 rounded-[14px] flex items-center justify-center mb-6">
                  {i === 5 ? (
                    <img
                      src="/workflow.png?v=2"
                      alt={feature.title}
                      /* Reduced custom icon size slightly to match Lucide icons */
                      className="w-5 h-5 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                  ) : (
                    /* Reduced Lucide icon size from w-6 to w-5 for a more delicate, premium look */
                    <Icon className="w-5 h-5 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                  )}
                </div>

                {/* Fixed Typography: Down to text-[17px] and font-semibold to remove the "heavy" look */}
                <h3 className="text-[17px] font-semibold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>

                {/* Fixed Body Text: Standardized to 14px with relaxed line height */}
                <p className="text-[14px] text-gray-500 leading-relaxed font-normal">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}