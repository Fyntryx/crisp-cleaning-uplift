import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { getLiveSuburbs } from "@/lib/suburbs";

export default function ServiceAreas() {
  const liveSuburbs = getLiveSuburbs();

  if (liveSuburbs.length === 0) {
    return null;
  }

  return (
    <section id="service-area" className="w-full bg-[#FAFAFA] py-24 md:py-32 relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase mb-4 block">
            Where We Clean
          </span>
          <h2 className="text-3xl md:text-[40px] font-extrabold text-gray-900 tracking-tight max-w-xl leading-tight mb-6">
            Servicing Melbourne.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            We provide consistent, detailed house cleaning to the following areas. Click your suburb to see availability and book.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
          {liveSuburbs.map((suburb) => (
            <Link
              key={suburb.slug}
              href={suburb.path ? suburb.path : `/house-cleaning-${suburb.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group"
            >
              <div className="bg-primary/5 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                <MapPin className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                {suburb.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
