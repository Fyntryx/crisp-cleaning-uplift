import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { getLiveSuburbs } from "@/lib/suburbs";
import Link from "next/link";

export default function ServiceAreas() {
  const liveSuburbs = getLiveSuburbs();

  if (liveSuburbs.length === 0) return null;

  return (
    <section id="service-area" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4 block">
            Where We Clean
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Service Areas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are expanding our local cleaning teams across Melbourne. Here are our currently active featured areas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {liveSuburbs.slice(0, 8).map((suburb) => (
            <Link
              key={suburb.slug}
              href={`/service-areas/${suburb.slug}`}
              className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-[15px] text-gray-800 group-hover:text-primary transition-colors">
                  {suburb.name}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
