import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingCards() {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <p className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] uppercase text-stone-500 mb-2">
            TWO SIMPLE WAYS TO PRICE
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            How would you like to be priced?
          </h2>
          <p className="text-stone-500 text-[15px] md:text-[16px] leading-relaxed">
            Pick one to start building your quote — you can compare inside the calculator too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Flat Rate Card */}
          <div className="bg-[#FFF9F5] rounded-3xl p-8 md:p-10 border-2 border-[#FB8C42] shadow-2xl relative flex flex-col h-full transform transition-all hover:-translate-y-1">
            <div className="inline-block px-4 py-1.5 bg-[#FB8C42] text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-6 w-fit shadow-sm">
              Most Popular — Best Value
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Flat Rate</h3>
            <p className="text-stone-500 text-[14.5px] leading-relaxed mb-8">
              A fixed price for a complete result. Define the size and condition, and we'll stay as long as it takes to leave your space shining.
            </p>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-stone-700 font-medium">Price locked before we arrive — no surprises</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-stone-700 font-medium">No time limit - we follow the full Crisp checklist until it's done</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-stone-700 font-medium">Satisfaction guarantee included</span>
              </li>
            </ul>
            <Link 
              href="/book" 
              className="inline-flex self-start px-8 py-3.5 bg-[#FB8C42] hover:bg-[#FB8C42]/90 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg mt-auto"
            >
              Continue with Flat Rate →
            </Link>
          </div>

          {/* Hourly Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-lg flex flex-col h-full transition-all hover:border-[#FB8C42]/30 hover:shadow-xl hover:-translate-y-1">
            <div className="inline-block px-4 py-1.5 bg-orange-50 text-[#FB8C42] border border-[#FB8C42]/20 text-[11px] font-bold uppercase tracking-wider rounded-full mb-6 w-fit">
              For Targeted Jobs
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hourly</h3>
            <p className="text-stone-500 text-[14.5px] leading-relaxed mb-8">
              For specific tasks or targeted areas. You set the priorities and we'll make sure to make the most of each minute!
            </p>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-stone-700 font-medium">Perfect for a few rooms or specific tasks</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FB8C42] shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-stone-700 font-medium">You control the time — and the budget</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-stone-400 font-bold text-xl leading-none">-</span>
                <span className="text-stone-500">Result depends on the hours you book</span>
              </li>
            </ul>
            <Link 
              href="/book" 
              className="inline-flex self-start px-8 py-3.5 bg-white border border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 font-bold rounded-full transition-all mt-auto"
            >
              Continue with Hourly →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
