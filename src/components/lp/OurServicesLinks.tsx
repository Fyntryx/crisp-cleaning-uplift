import React from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Sparkles, Key, Building2 } from "lucide-react";

const services = [
  {
    title: "Standard House Clean",
    description: "Consistent, detailed maintenance on a schedule that suits you. The Crisp standard.",
    icon: RefreshCw,
    href: "/house-cleaning-melbourne",
  },
  {
    title: "Deep Clean",
    description: "A comprehensive reset for every room. Perfect for first-time cleans or seasonal refreshes.",
    icon: Sparkles,
    href: "/deep-cleaning-melbourne",
  },
  {
    title: "Vacate Clean",
    description: "Built strictly to real estate inspection standards with a 72-hour bond back guarantee.",
    icon: Key,
    href: "/end-of-lease-cleaning-melbourne",
  },
  {
    title: "Apartment Clean",
    description: "Specialized cleaning designed for the unique requirements of units and apartments.",
    icon: Building2,
    href: "/apartment-cleaning-melbourne",
  },
];

export default function OurServicesLinks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Cleaning built for your needs.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From regular upkeep to full bond recoveries, we deliver a consistent standard across every service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                href={service.href}
                className="group flex flex-col p-8 rounded-3xl bg-[#FAF9F6] border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-primary font-bold text-[14px]">
                  View Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
