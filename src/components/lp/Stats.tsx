import React from "react";
import { Star, ExternalLink } from "lucide-react";

const reviews = [
  { text: "Team took great care. Really appreciated the communication — the small details don't go unnoticed. Keep it up Crisp.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "Didn't realise how much time I spent cleaning until I started the standard service. Great value for money.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "Super easy to sign up — clear pricing, got a booking in a few clicks. Quick and easy.", author: "VERIFIED GOOGLE REVIEW" },
  { text: "They've done an amazing job on our home. Incredibly detailed, didn't miss a single crook.", author: "VERIFIED GOOGLE REVIEW" }
];

export default function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h4 className="text-[#FB8C42] font-bold tracking-widest text-sm uppercase mb-4">By The Numbers</h4>
          <h2 className="text-4xl md:text-[42px] font-bold text-gray-900 tracking-tight mb-12">
            The numbers behind the standard.
          </h2>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Google Review Card - Entire Card is Clickable */}
          <a
            href="https://g.page/r/CZeiP3EqDt4xEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 shadow-sm flex flex-col justify-between relative hover:-translate-y-1 transition-all duration-300 hover:shadow-md hover:border-orange-200 group"
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-5 h-5" />
              <span className="font-bold text-sm tracking-wide text-gray-800">GOOGLE REVIEWS</span>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-[#FB8C42] transition-colors" />
            </div>
            <div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-gray-800 leading-none">4.9</span>
                <Star className="w-6 h-6 fill-[#FB8C42] text-[#FB8C42] mb-1" />
              </div>
              <p className="text-gray-500 text-sm font-medium mb-4">Average rating across all reviews</p>
              <span className="text-[#FB8C42] text-sm font-semibold hover:underline">Read on Google →</span>
            </div>
          </a>

          {/* Other Stats */}
          <div className="bg-white p-6 rounded-2xl border border-orange-50 shadow-sm flex flex-col justify-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">FULLY INSURED</p>
            <span className="text-5xl font-bold text-[#FB8C42] mb-2">100%</span>
            <p className="text-gray-500 text-sm font-medium">All cleaners fully insured</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-50 shadow-sm flex flex-col justify-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">BOOKING TIME</p>
            <span className="text-5xl font-bold text-[#FB8C42] mb-2">30<span className="text-3xl">sec</span></span>
            <p className="text-gray-500 text-sm font-medium">Average booking time</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-50 shadow-sm flex flex-col justify-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">CONSISTENCY</p>
            <span className="text-5xl font-bold text-[#FB8C42] mb-2">97%</span>
            <p className="text-gray-500 text-sm font-medium">Same cleaner consistency rate</p>
          </div>
        </div>

        {/* Review Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[#FAF9F6] p-8 rounded-2xl border border-orange-50 shadow-sm flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#FB8C42] text-[#FB8C42]" />
                ))}
              </div>
              <p className="text-gray-800 font-medium leading-relaxed flex-grow mb-6">"{review.text}"</p>
              <p className="font-bold text-gray-400 text-xs tracking-wider uppercase">{review.author}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
